import { Pagination } from "@material-ui/lab";
import { fetchData } from "api";
import { AppAlert, ConfirmDialog } from "components/admin";
import DialogProduct from "components/admin/product/DialogProduct";
import TableProduct from "components/admin/product/TableProduct";
import { ApiConstant, AppConstant } from "const";
import { HeaderLayout, ManageLayout } from "layouts";
import React, { useEffect, useState } from "react";
import getImgUrl from "utils/getImgUrl";

const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataProduct, setDataProduct] = useState({
    data: [],
    page: 1,
    total: 0,
  });
  const [data, setData] = useState();
  const [shops, setShops] = useState();
  const [messageData, setMessageData] = useState({
    type: "error",
    message: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchDataShop = async () => {
    let url = ApiConstant.MN_SHOP;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setShops({
        ...response,
        data: response.data.map(({ id, name }) => ({
          id,
          name: name,
          value: id,
        })),
      });
    }
  };

  useEffect(() => {
    fetchDataShop();
  }, []);

  const submitProduct = async (data) => {
    setLoading(true);
    let url = ApiConstant.MN_PRODUCT;

    // upload image to cloudinary
    let images_url = [];
    await Promise.all(
      data.images.map(async (item) => {
        let image_url;
        if (!item.image.toString().startsWith("https://res.cloudinary.com")) {
          image_url = await getImgUrl(item.image);
        } else {
          image_url = item.image;
        }
        images_url.push({ image: image_url });
      })
    );

    const requestBody = {
      name: data.name,
      summary: data.summary,
      description: data.description,
      story: data.story,
      images: images_url,
      // images: data.images,
      price: data.price,
      type: data.type,
      made_in: data.made_in,
      details: data.details,
      vectary_link: data.vectary_link,
      sold: data.sold,
      in_stock: data.in_stock,
      status: parseInt(data.status),
      shop_id: data.shop_id,
    };

    if (data.id) {
      url += `/${data.id}`;
    }

    const response = await fetchData(
      url,
      data.id ? ApiConstant.METHOD.put : ApiConstant.METHOD.post,
      requestBody
    );

    if (
      response.status &&
      [AppConstant.STATUS_OK, AppConstant.STATUS_CREATED].includes(
        response.status
      )
    ) {
      await fetchDataProduct(dataProduct.page);
      setMessageData({
        type: "success",
        message: response.message,
      });
      setLoading(false);
      setIsOpen(false);
    } else {
      setMessageData({
        type: "error",
        message:
          response?.message !== "OK" ? response?.message : "Có lỗi xảy ra!",
      });
      setLoading(false);
    }
    // console.log(requestBody);
  };

  const deleteProduct = async () => {
    let url = ApiConstant.MN_PRODUCT + `/${deleteDialog.data.id}`;
    const response = await fetchData(url, ApiConstant.METHOD.delete);
    if (response.status && response.status === AppConstant.STATUS_OK) {
      await fetchDataProduct(dataProduct.page);
      setMessageData({
        type: "success",
        message: `Xóa thành công!`,
      });
      setDeleteDialog({
        isOpen: false,
        data: null,
      });
    } else {
      setMessageData({
        type: "error",
        message:
          response?.message !== "OK" ? response?.message : "Có lỗi xảy ra!",
      });
    }
  };

  const fetchDataProduct = async (page, search = "", shop_id = null) => {
    let url =
      ApiConstant.MN_PRODUCT +
      `?paging=${1}&page=${page}&size=${10}&search=${search}`;
    if (shop_id) {
      url += `&shop_id=${shop_id}`;
    }
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setDataProduct({
        ...response,
        data: response.data,
      });
    }
  };

  const onChangePage = (page) => {
    fetchDataProduct(page);
  };

  useEffect(() => {
    fetchDataProduct(dataProduct.page);
  }, []);

  return (
    <ManageLayout>
      <HeaderLayout
        title="Quản lý sản phẩm"
        onCreateNew={() => setIsOpen(true)}
      />
      <TableProduct
        productData={dataProduct}
        onEdit={(data) => {
          setData(data);
          setIsOpen(true);
        }}
        onDelete={(data) => {
          setDeleteDialog({
            isOpen: true,
            data: data,
          });
        }}
      />
      <Pagination
        page={dataProduct.page}
        count={parseInt((dataProduct.total - 1) / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogProduct
          shops={shops?.data}
          isShow={isOpen}
          data={data}
          onClose={() => {
            setIsOpen(false);
            setData();
          }}
          onSubmit={(data) => submitProduct(data)}
          loading={loading}
        />
      )}
      {deleteDialog.isOpen && (
        <ConfirmDialog
          isShow={deleteDialog.isOpen}
          title={`Xóa sản phẩm "${deleteDialog.data.title}"`}
          message={`Bạn có chắc chắn muốn xóa "${deleteDialog.data.title}" không?`}
          onClose={() => setDeleteDialog({ isOpen: false, data: null })}
          onSubmit={deleteProduct}
        />
      )}
      {!!messageData?.message && (
        <AppAlert
          isOpen={!!messageData.message}
          onClose={() =>
            setMessageData({
              type: "error",
              message: "",
            })
          }
          severity={messageData.type}
        >
          {messageData.message}
        </AppAlert>
      )}
    </ManageLayout>
  );
};

export default Product;

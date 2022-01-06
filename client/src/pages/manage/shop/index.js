import { Pagination } from "@material-ui/lab";
import { fetchData } from "api";
import { AppAlert, ConfirmDialog } from "components/admin";
import DialogShop from "components/admin/shop/DialogShop";
import TableShop from "components/admin/shop/TableShop";
import { ApiConstant, AppConstant } from "const";
import { HeaderLayout, ManageLayout } from "layouts";
import React, { useEffect, useState } from "react";
import getImgUrl from "utils/getImgUrl";

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataShop, setDataShop] = useState({
    data: [],
    page: 1,
    total: 0,
  });
  const [data, setData] = useState();
  const [messageData, setMessageData] = useState({
    type: "error",
    message: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const submitShop = async (data) => {
    setLoading(true);
    let url = ApiConstant.MN_SHOP;

    // upload image to cloudinary
    let avatar_url, cover_url;
    if (data.avatar) {
      if (!data.avatar.toString().startsWith("https://res.cloudinary.com")) {
        avatar_url = await getImgUrl(data.avatar);
      } else {
        avatar_url = data.avatar;
      }
    }
    if (data.cover) {
      if (!data.cover.toString().startsWith("https://res.cloudinary.com")) {
        cover_url = await getImgUrl(data.cover);
      } else {
        cover_url = data.cover;
      }
    }

    const requestBody = {
      name: data.name,
      description: data.description,
      address: data.address,
      status: parseInt(data.status),
      avatar: avatar_url,
      cover: cover_url,
      details: data.details,
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
      await fetchDataShop(dataShop.page);
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
  };

  const deleteShop = async () => {
    let url = ApiConstant.MN_SHOP + `/${deleteDialog.data.id}`;
    const response = await fetchData(url, ApiConstant.METHOD.delete);
    if (response.status && response.status === AppConstant.STATUS_OK) {
      await fetchDataShop(dataShop.page);
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

  const fetchDataShop = async (page, search = "", shop_id = null) => {
    let url =
      ApiConstant.MN_SHOP +
      `?paging=${1}&page=${page}&size=${10}&search=${search}`;
    if (shop_id) {
      url += `&shop_id=${shop_id}`;
    }
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setDataShop({
        ...response,
        data: response.data,
      });
    }
  };

  const onChangePage = (page) => {
    fetchDataShop(page);
  };

  useEffect(() => {
    fetchDataShop(dataShop.page);
  }, []);

  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý shop" onCreateNew={() => setIsOpen(true)} />
      <TableShop
        shopData={dataShop}
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
        page={dataShop.page}
        count={parseInt((dataShop.total - 1) / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogShop
          isShow={isOpen}
          data={data}
          onClose={() => {
            setIsOpen(false);
            setData();
          }}
          onSubmit={(data) => submitShop(data)}
          loading={loading}
        />
      )}
      {deleteDialog.isOpen && (
        <ConfirmDialog
          isShow={deleteDialog.isOpen}
          title={`Xóa shop "${deleteDialog.data.name}"`}
          message={`Bạn có chắc chắn muốn xóa "${deleteDialog.data.name}" không?`}
          onClose={() => setDeleteDialog({ isOpen: false, data: null })}
          onSubmit={deleteShop}
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

export default Shop;

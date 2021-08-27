/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Button, Image, message, Popconfirm, Spin, Table, Form } from "antd";
import Text from "antd/lib/typography/Text";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import stylesBasic from "../../../styles/BasicContainer.module.css";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../utils/fetchData";
import { getImgUrls } from "../../../utils/getImgUrls";
import Link from "next/link";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";

export default function ProductManagement() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [updateTable, setUpdatTable] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [products, setProducts] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/login");
    return;
  }, [auth]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingTable(true);
      const res = await getData(`products/user/${auth.user.id}`);

      if (res.products) {
        res.products.forEach((product) => (product.key = product._id));

        setProducts(res.products);
        setLoadingTable(false);
      }
    };

    if (!auth.user) {
      return null;
    } else {
      fetchProducts();
    }
  }, [updateTable, auth]);

  const onCreate = async (values) => {
    setVisibleCreate(false);

    const {
      title,
      images,
      summary,
      story,
      price,
      details,
      vectary_link,
      category,
      in_stock,
    } = values;

    message.warning("Đang tiến hành upload lên server...");

    let picture_urls = [];

    if (images) {
      picture_urls = await getImgUrls(images, "memoravel_product-images");
    }

    // call create service
    const res = await postData("products", {
      title,
      images: picture_urls,
      summary,
      story,
      price,
      details,
      vectary_link,
      category,
      in_stock,
      user: auth.user.id,
    });

    if (res.msg) {
      message.success(res.msg);
      setUpdatTable(!updateTable);
    } else {
      message.success(res.err);
    }
  };

  const onUpdate = async (values) => {
    setVisibleUpdate(false);

    const {
      title,
      images,
      summary,
      story,
      price,
      details,
      vectary_link,
      category,
      in_stock,
      id,
    } = values;

    message.warning("Đang tiến hành upload lên server...");

    let picture_urls = [];

    if (images) {
      picture_urls = await getImgUrls(images, "memoravel_product-images");
    }

    // call update service
    const res = await putData(`products/${id}`, {
      title,
      images: picture_urls,
      summary,
      story,
      price,
      details,
      vectary_link,
      category,
      in_stock,
    });

    if (res.msg) {
      message.success(res.msg);
      setUpdatTable(!updateTable);
    } else {
      message.success(res.err);
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const confirm = async () => {
    setLoading(true);

    const deleteById = async (id) => {
      await deleteData(`products/${id}`);
    };

    message.warning("Đang xoá...");
    let count = 0;
    selectedRowKeys.map((id) => {
      deleteById(id);
      ++count;
    });

    message.success("Xoá thành công");
    setUpdatTable(!updateTable);
    setLoading(false);
    setSelectedRowKeys([]);
  };

  const cancel = () => {
    setLoading(false);
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Sửa",
      dataIndex: "",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            setVisibleUpdate(true);
            setUpdateItem(record);
          }}
        ></Button>
      ),
    },
    {
      title: "Ảnh SP",
      dataIndex: `images`,
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          {record.images ? (
            <Image
              src={record.images[0]}
              alt="Ảnh SP"
              style={{ maxHeight: "150px", width: "auto" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "title",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          <a
            target="_blank"
            rel="noreferrer"
            href={`/products/${record._id}`}
            title={record.title}
          >
            {record.title}
          </a>
        </>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
    },
    {
      title: "Còn trong kho",
      dataIndex: "in_stock",
    },
  ];

  if (!auth.user) return null;

  return (
    <>
      <div className={stylesBasic.container}>
        <h1 className="title">Quản lý sản phẩm</h1>
        <>
          {!loadingTable ? (
            <>
              <div style={{ marginBottom: 16 }} className="table-header">
                <div
                  className="left"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="delete-zone">
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xoá các mục đã chọn?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        className="delete-btn"
                        type="default"
                        disabled={!hasSelected}
                        loading={loading}
                        icon={<DeleteOutlined />}
                      >
                        Xoá
                      </Button>
                    </Popconfirm>
                    <span style={{ marginLeft: 8, color: "#fff" }}>
                      {hasSelected ? (
                        <Text>{selectedRowKeys.length} đã chọn </Text>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="add-zone">
                    <Button
                      type="primary"
                      className="add-btn"
                      icon={<FileAddOutlined />}
                      onClick={() => {
                        setVisibleCreate(true);
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Thêm mới
                    </Button>
                  </div>
                </div>
                <div className="right"></div>
              </div>
              <Table
                pagination={{ pageSize: 5 }}
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
                showSorterTooltip={true}
              />
              <CreateForm
                visible={visibleCreate}
                onCreate={onCreate}
                onCancel={() => {
                  setVisibleCreate(false);
                }}
                loading={loadingCreate}
              />
              <UpdateForm
                visible={visibleUpdate}
                onUpdate={onUpdate}
                onCancel={() => {
                  setVisibleUpdate(false);
                }}
                updateItem={updateItem}
                loading={loadingUpdate}
              />
            </>
          ) : (
            <Spin />
          )}
        </>
      </div>
    </>
  );
}

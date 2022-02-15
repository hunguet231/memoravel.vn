import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import { ManageLayout, HeaderLayout } from "layouts";
import { AppAlert, ConfirmDialog } from "components/admin";
import DialogUser from "components/admin/user/DialogUser";
import TableUser from "components/admin/user/TableUser";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataUser, setDataUser] = useState({
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

  const submitUser = async (data) => {
    try {
      if (data.id) {
        delete data["username"];
      }
      const response = await fetchData(
        data.id
          ? ApiConstant.ADMIN_USER + "/" + data.id
          : ApiConstant.ADMIN_USER,
        data.id ? ApiConstant.METHOD.put : ApiConstant.METHOD.post,
        data
      );

      if (
        response.status &&
        [AppConstant.STATUS_OK, AppConstant.STATUS_CREATED].includes(
          response.status
        )
      ) {
        await fetchDataUser(dataUser.page);
        setMessageData({
          type: "success",
          message: response.message,
        });
        setIsOpen(false);
      } else {
        setMessageData({
          type: "error",
          message:
            response?.message !== "OK" ? response?.message : "Có lỗi xảy ra!",
        });
      }
    } catch (error) {
      setMessageData({
        type: "error",
        message: "Có lỗi xảy ra!",
      });
    }
  };

  const fetchDataUser = async (page, search = "") => {
    let url =
      ApiConstant.ADMIN_USER +
      `?paging=${1}&page=${page}&size=${10}&search=${search}`;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setDataUser(response);
    }
  };

  const deleteUser = async () => {
    let url = ApiConstant.ADMIN_USER + `/${deleteDialog.data.id}`;
    const response = await fetchData(url, ApiConstant.METHOD.delete);
    if (response.status && response.status === AppConstant.STATUS_OK) {
      await fetchDataUser(dataUser.page);
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

  const onChangePage = (page) => {
    if (page) {
      fetchDataUser(page);
    }
  };

  useEffect(() => {
    fetchDataUser(dataUser.page);
  }, []);

  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý User" onCreateNew={() => setIsOpen(true)} />
      <TableUser
        userData={dataUser}
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
        page={dataUser.page}
        count={parseInt((dataUser.total - 1) / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogUser
          isShow={isOpen}
          data={data}
          onClose={() => {
            setIsOpen(false);
            setData();
          }}
          onSubmit={(data) => submitUser(data)}
        />
      )}
      {deleteDialog.isOpen && (
        <ConfirmDialog
          isShow={deleteDialog.isOpen}
          title={`Xóa chủ đề "${deleteDialog.data.username}"`}
          message={`Bạn có chắc chắn muốn xóa "${deleteDialog.data.username}" không?`}
          onClose={() => setDeleteDialog({ isOpen: false, data: null })}
          onSubmit={deleteUser}
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

export default User;

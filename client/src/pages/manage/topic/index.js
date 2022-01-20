import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { ManageLayout, HeaderLayout } from "layouts";
import { AppAlert, ConfirmDialog } from "components/admin";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import DialogTopic from "components/admin/topic/DialogTopic";
import TableTopic from "components/admin/topic/TableTopic";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataTopic, setDataTopic] = useState({
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

  const submitTopic = async (data) => {
    let url = ApiConstant.MN_TOPIC;
    const requestBody = {
      title: {
        vi: data.title,
        en: "",
      },
      description: {
        vi: data.description,
        en: "",
      },
      status: data.status,
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
      await fetchDataTopic(dataTopic.page);
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
  };

  const deleteTopic = async () => {
    let url = ApiConstant.MN_TOPIC + `/${deleteDialog.data.id}`;
    const response = await fetchData(url, ApiConstant.METHOD.delete);
    if (response.status && response.status === AppConstant.STATUS_OK) {
      await fetchDataTopic(dataTopic.page);
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

  const fetchDataTopic = async (page, search = "", topic_id = null) => {
    let url =
      ApiConstant.MN_TOPIC +
      `?paging=${1}&page=${page}&size=${10}&search=${search}`;
    if (topic_id) {
      url += `&topic_id=${topic_id}`;
    }
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setDataTopic({
        ...response,
        data: response.data.map((item) => ({
          ...item,
          title: item.title.vi,
          description: item.description.vi,
          alias: item.alias.vi,
        })),
      });
    }
  };

  const onChangePage = (page) => {
    fetchDataTopic(page);
  };

  useEffect(() => {
    fetchDataTopic(dataTopic.page);
  }, []);

  return (
    <ManageLayout>
      <HeaderLayout
        title="Quản lý chủ đề bài viết"
        onCreateNew={() => setIsOpen(true)}
      />
      <TableTopic
        topicData={dataTopic}
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
        page={dataTopic.page}
        count={parseInt((dataTopic.total - 1) / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogTopic
          isShow={isOpen}
          data={data}
          onClose={() => {
            setIsOpen(false);
            setData();
          }}
          onSubmit={(data) => submitTopic(data)}
        />
      )}
      {deleteDialog.isOpen && (
        <ConfirmDialog
          isShow={deleteDialog.isOpen}
          title={`Xóa chủ đề "${deleteDialog.data.title}"`}
          message={`Bạn có chắc chắn muốn xóa "${deleteDialog.data.title}" không?`}
          onClose={() => setDeleteDialog({ isOpen: false, data: null })}
          onSubmit={deleteTopic}
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

export default Topic;

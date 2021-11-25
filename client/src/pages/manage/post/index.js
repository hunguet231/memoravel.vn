import { Pagination } from "@material-ui/lab";
import { fetchData } from "api";
import {
  AppAlert,
  ConfirmDialog,
  DialogPost,
  TablePost,
} from "components/admin";
import { ApiConstant, AppConstant } from "const";
import { HeaderLayout, ManageLayout } from "layouts";
import React, { useEffect, useState } from "react";
import getImgUrl from "utils/getImgUrl";

const Post = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataPost, setDataPost] = useState({
    data: [],
    page: 1,
    total: 0,
  });
  const [data, setData] = useState();
  const [topics, setTopics] = useState();
  const [messageData, setMessageData] = useState({
    type: "error",
    message: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchDataTopic = async () => {
    let url = ApiConstant.MN_TOPIC;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setTopics({
        ...response,
        data: response.data.map(({ id, title }) => ({
          id,
          label: title,
          value: title,
        })),
      });
    }
  };

  useEffect(() => {
    fetchDataTopic();
  }, []);

  const submitPost = async (data) => {
    setLoading(true);
    let url = ApiConstant.MN_POST;

    // upload image to cloudinary
    let background_url;
    if (data.background) {
      if (
        !data.background.toString().startsWith("https://res.cloudinary.com")
      ) {
        background_url = await getImgUrl(data.background);
      } else {
        background_url = data.background;
      }
    }
    const requestBody = {
      title: {
        vi: data.title,
        en: "",
      },
      description: {
        vi: data.description,
        en: "",
      },
      content: {
        vi: data.content,
        en: "",
      },
      status: parseInt(data.status),
      background: background_url,
      topic_ids: data.topic_ids,
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
      await fetchDataPost(dataPost.page);
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
    }
  };

  const deletePost = async () => {
    let url = ApiConstant.MN_POST + `/${deleteDialog.data.id}`;
    const response = await fetchData(url, ApiConstant.METHOD.delete);
    if (response.status && response.status === AppConstant.STATUS_OK) {
      await fetchDataPost(dataPost.page);
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

  const fetchDataPost = async (page, search = "", topic_id = null) => {
    let url =
      ApiConstant.MN_POST +
      `?paging=${1}&page=${page}&size=${10}&search=${search}`;
    if (topic_id) {
      url += `&topic_id=${topic_id}`;
    }
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setDataPost({
        ...response,
        data: response.data.map((item) => ({
          ...item,
          title: item.title.vi,
          description: item.description.vi,
          content: item.content.vi,
          alias: item.alias.vi,
        })),
      });
    }
  };

  const onChangePage = (page) => {
    fetchDataPost(page);
  };

  useEffect(() => {
    fetchDataPost(dataPost.page);
  }, []);

  return (
    <ManageLayout>
      <HeaderLayout
        title="Quản lý bài viết"
        onCreateNew={() => setIsOpen(true)}
      />
      <TablePost
        postData={dataPost}
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
        page={dataPost.page}
        count={parseInt((dataPost.total - 1) / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogPost
          topics={topics.data}
          isShow={isOpen}
          data={data}
          onClose={() => {
            setIsOpen(false);
            setData();
          }}
          onSubmit={(data) => submitPost(data)}
          loading={loading}
        />
      )}
      {deleteDialog.isOpen && (
        <ConfirmDialog
          isShow={deleteDialog.isOpen}
          title={`Xóa bài viết "${deleteDialog.data.title}"`}
          message={`Bạn có chắc chắn muốn xóa "${deleteDialog.data.title}" không?`}
          onClose={() => setDeleteDialog({ isOpen: false, data: null })}
          onSubmit={deletePost}
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

export default Post;

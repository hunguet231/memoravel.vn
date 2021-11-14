import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { ManageLayout, HeaderLayout } from "layouts";
import { DialogTopic, TableTopic, AppAlert } from "components/admin";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataTopic, setDataTopic] = useState({
    data: [],
    page: 1,
    total: 0,
  });
  const [message, setMessage] = useState("");

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
      setMessage(response.message);
      setIsOpen(false);
    } else {
      setMessage(
        response?.message !== "OK" ? response?.message : "Có lỗi xảy ra!"
      );
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
      setDataTopic(response);
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
      <TableTopic topicData={dataTopic} />
      <Pagination
        page={dataTopic.page}
        count={parseInt(dataTopic.total / 10) + 1}
        onChange={(_, page) => onChangePage(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      {isOpen && (
        <DialogTopic
          isShow={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => submitTopic(data)}
        />
      )}
      {message && (
        <AppAlert
          isOpen={!!message}
          onClose={() => setMessage("")}
          severity="error"
        >
          {message}
        </AppAlert>
      )}
    </ManageLayout>
  );
};

export default Topic;

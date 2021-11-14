import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { ManageLayout, HeaderLayout } from "layouts";
import { DialogTopic, TableTopic } from "components/admin";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataTopic, setDataTopic] = useState({
    data: [],
    page: 1,
    total: 0,
  });

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
        count={dataTopic.total / 10 + 1}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      <DialogTopic
        isShow={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log(data)}
      />
    </ManageLayout>
  );
};

export default Topic;

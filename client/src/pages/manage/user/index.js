import React, { useState } from "react";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import { ManageLayout, HeaderLayout } from "layouts";
import { DialogUser } from "components/admin";

const User = () => {
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

  const submitUser = async (data) => {};

  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý User" onCreateNew={() => setIsOpen(true)} />
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
    </ManageLayout>
  );
};

export default User;

import React, { useState } from "react";
import { ManageLayout, HeaderLayout } from "layouts";
import { DialogTopic } from "components/admin";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý chủ đề bài viết" />
      <DialogTopic isShow />
    </ManageLayout>
  );
};

export default Topic;

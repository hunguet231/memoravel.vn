import React, { useState } from "react";
import { ManageLayout, HeaderLayout } from "layouts";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý chủ đề bài viết" />
    </ManageLayout>
  );
};

export default Topic;

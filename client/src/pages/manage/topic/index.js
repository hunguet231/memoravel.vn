import React, { useState } from "react";
import { ManageLayout, HeaderLayout } from "layouts";
import { DialogTopic } from "components/admin";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ManageLayout>
      <HeaderLayout
        title="Quản lý chủ đề bài viết"
        onCreateNew={() => setIsOpen(true)}
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

import { AppConstant } from "const";
import React from "react";
import { CustomChat as Chat, FacebookProvider } from "react-facebook";

const CustomChat = () => {
  return (
    <FacebookProvider appId={AppConstant.FACEBOOK_APP_ID} chatSupport>
      <Chat pageId={AppConstant.FACEBOOK_PAGE_ID} minimized={false} />
    </FacebookProvider>
  );
};

export default CustomChat;

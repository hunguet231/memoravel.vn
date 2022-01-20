import React from "react";
import { FacebookProvider, CustomChat as Chat } from "react-facebook";

const CustomChat = () => {
  return (
    <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
      <Chat pageId={process.env.FACEBOOK_PAGE_ID} minimized={false} />
    </FacebookProvider>
  );
};

export default CustomChat;

import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";

export const useManageLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));

  const [isCloseWithMobile, setIsCloseWithMobile] = useState(isMobile);
  const [isOpenSidebar, setIsOpenSidebar] = useState(!isMobile);
  const [isShowSelectHeader, setIsShowHeader] = useState(false);

  useEffect(() => {
    setIsCloseWithMobile(isMobile);
    setIsOpenSidebar(!isMobile);
  }, [isMobile]);

  return {
    isCloseWithMobile,
    isOpenSidebar,
    setIsOpenSidebar,
    isShowSelectHeader,
    setIsShowHeader,
  };
};

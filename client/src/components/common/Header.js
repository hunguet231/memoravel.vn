import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  Badge,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Input, message } from "antd";
import clsx from "clsx";
import HomeFilter from "components/home/HomeFilter";
import { PathConstant } from "const";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useWindowSize from "utils/useWindowSize";
import { changeFilter } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import styles from "../../styles/Header.module.scss";
import Button from "./Button";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const size = useWindowSize();
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const { state, dispatch } = useContext(DataContext);
  const { cart, filter } = state;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const menuData = [
    {
      id: "0",
      text: "Giỏ hàng",
      path: "/cart",
      icon: "shopping_cart_outlined",
    },
    { id: "1", text: "Trang chủ", path: "/", icon: "home" },
    { id: "2", text: "Cửa hàng", path: "/shop", icon: "store" },
    { id: "3", text: "Tin tức", path: "/blogs", icon: "description" },
    { id: "4", text: "Liên hệ", path: "/contact", icon: "contact_support" },
    { id: "5", text: "Đơn mua", path: "/order", icon: "border_inner" },
  ];

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className="flex items-center justify-center flex-col">
          <Button
            onClick={() =>
              message.warning("Hiện tại MEMORAVEL chưa hỗ trợ chức năng này!")
            }
            type="outline"
            size="small"
            startIcon={<UserOutlined />}
          >
            Bán hàng
          </Button>
          <Button
            type="primary"
            size="small"
            startIcon={<UserOutlined />}
            onClick={() => router.push(PathConstant.MANAGE_LOGIN)}
          >
            Đăng nhập
          </Button>
        </div>
      </List>
      <Divider />
      <form onSubmit={handleSearch}>
        <Input
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className={styles.searchBox}
          placeholder="Tìm kiếm sản phẩm"
          suffix={<SearchOutlined onClick={handleSearch} />}
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      <List>
        {menuData.map(({ id, text, icon, path }) => (
          <Link href={path} key={id}>
            <ListItem button>
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText secondary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const active = (path) => {
    return path === router.pathname;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changeFilter({ ...filter, search: searchText }));
    setOpen(false);
    router.push(`/shop`);
  };

  const handleSearchChange = (e) => {
    const inputVal = e.target.value;
    setSearchText(inputVal);
  };

  return (
    <div className="wrapper">
      <div className={styles.headerWrapper}>
        <div className="container">
          <div className={styles.headerTop}>
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/images/logo-dark.svg" width={40} height={40} />
                <span className={styles.logoText}>MEMORAVEL</span>
              </div>
            </Link>
            {size.width >= 830 && (
              <div className="flex items-center">
                <Link href="/cart">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={cart.length} color="primary">
                      <ShoppingCartOutlinedIcon style={{ color: "#000" }} />
                    </Badge>
                  </IconButton>
                </Link>
                <Button
                  type="outline"
                  startIcon={<UserOutlined />}
                  onClick={() =>
                    message.warning(
                      "Hiện tại MEMORAVEL chưa hỗ trợ chức năng này!"
                    )
                  }
                >
                  Bán hàng
                </Button>
                <Button
                  type="primary"
                  startIcon={<UserOutlined />}
                  onClick={() => router.push(PathConstant.MANAGE_LOGIN)}
                >
                  Đăng nhập
                </Button>
              </div>
            )}
            {size.width < 830 && (
              <div className="flex items-center">
                <IconButton aria-label="Menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                >
                  <div className="list">{list()}</div>
                </Drawer>
              </div>
            )}
          </div>
        </div>
        {size.width >= 830 && (
          <div className={styles.menuWrapper}>
            <div className="container">
              <ul className="flex justify-between">
                <li>
                  Danh mục sản phẩm &nbsp;
                  <DownOutlined />
                  <div className={styles.filter}>{<HomeFilter />}</div>
                </li>
                <li>
                  <Link href="/">
                    <span className={active("/") ? styles.currentMenu : ""}>
                      Trang chủ
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop">
                    <span className={active("/shop") ? styles.currentMenu : ""}>
                      Cửa hàng
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blogs">
                    <span
                      className={active("/blogs") ? styles.currentMenu : ""}
                    >
                      Tin tức
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span
                      className={active("/contact") ? styles.currentMenu : ""}
                    >
                      {" "}
                      Liên hệ
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/order">
                    <span
                      className={active("/order") ? styles.currentMenu : ""}
                    >
                      {" "}
                      Đơn mua
                    </span>
                  </Link>
                </li>
                <li>
                  <form onSubmit={handleSearch}>
                    <Input
                      value={searchText}
                      onChange={handleSearchChange}
                      className={styles.searchBox}
                      placeholder="Tìm kiếm sản phẩm"
                      suffix={<SearchOutlined onClick={handleSearch} />}
                    />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

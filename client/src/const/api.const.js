import { LangConstant } from "const";

// Base Api
// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = "https://memoravel.online/api";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
  location: LangConstant.DEFAULT_LANG,
};
export const HEADER_FORM_DATA = {
  "Content-Type": "multipart/form-data;",
};
export const TIMEOUT = 30000;

export const METHOD = {
  post: "POST",
  put: "PUT",
  get: "GET",
  delete: "DELETE",
};

//Fixed value

// HTTP Status
export const STT_OK = 200;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_INTERNAL_SERVER = 500;
export const STT_NO_TOKEN = 600;

export const LOGIN = "/login";

export const PROFILE = "/profile";

// topic
export const MN_TOPIC = "/manage/topic";
export const GET_TOPIC = "/topic";

// post
export const MN_POST = "/manage/post";
export const GET_POST = "/post";

// shop
export const MN_SHOP = "/admin/shop";
export const GET_SHOP = "/shop";

// product
export const MN_PRODUCT = "/manage/product";
export const GET_PRODUCT = "/product";
export const GET_PRODUCT_HOT = "/product-hot";

// user
export const ADMIN_USER = "/admin/user";

// upload
export const UPLOAD = "/upload";

// shiment
export const SHIPMENT_FEE = "/shipment/fee";
export const SHIPMENT_ORDER = "/shipment/order";
export const SHIPMENT = "/shipment";

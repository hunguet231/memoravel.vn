import { LangConstant } from "const";

// Base Api
export const BASE_URL = "http://localhost:5000/api";
// export const BASE_URL = "https://memoravel.online/api";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
  location: LangConstant.DEFAULT_LANG,
};
export const HEADER_FORM_DATA = {
  "Content-Type": "multipart/form-data",
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

// user
export const ADMIN_USER = "/admin/user";

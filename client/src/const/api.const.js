import { LangConstant } from "const";

// Base Api
export const BASE_URL = "";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
  location: LangConstant.DEFAULT_LANG,
};
export const HEADER_FORM = {
  "Content-Type": "multipart/form-data",
};
export const TIMEOUT = 30000;

//Fixed value

// HTTP Status
export const STT_OK = 200;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_INTERNAL_SERVER = 500;
export const STT_NO_TOKEN = 600;

// KEY CONSTANTS
export const KEY_LANG = "lang";
export const APP_TOKEN = "token_memoravel";
export const USER_DATA = "user_data";

export const LANDING_URL = "http://localhost:3000";

export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_SERVER_ERROR = 500;

export const ROLE = {
  admin: 1,
  manage: 2,
};

export const GENDER = {
  male: 1,
  female: 2,
  other: 3,
};

export const STATUS = {
  publish: 1,
  draft: 2,
  delete: 3,
};

export const ARRAY_USER = [
  {
    value: STATUS.publish,
    name: "Hiển thị",
  },
  {
    value: STATUS.draft,
    name: "Bản nháp",
  },
];

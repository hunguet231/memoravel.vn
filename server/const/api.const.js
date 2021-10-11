export const ROOT = "/";

// common api
export const LOGIN = "/api/login";
export const CHANGE_PASSWORD = "/api/change-password";
export const PROFILE = "/api/profile";
export const UPLOAD = "/api/upload";
export const IMAGE = "/api/image/:image_name";

// user api
export const ADMIN_USER = "/api/admin/user";
export const ADMIN_USER_ID = "/api/admin/user/:user_id";

// post api
export const MANAGE_POST = "/api/manage/post";
export const MANAGE_POST_ID = "/api/manage/post/:post_id";
export const GET_POST = "/api/post";
export const GET_POST_BY_ALIAS = "/api/post/:alias";
export const GET_POST_HOT = "/api/post-hot";

// topic api
export const MANAGE_TOPIC = "/api/manage/topic";
export const MANAGE_TOPIC_ID = "/api/manage/topic/:topic_id";
export const GET_TOPIC = "/api/topic";
export const GET_TOPIC_BY_ALIAS = "/api/topic/:alias";

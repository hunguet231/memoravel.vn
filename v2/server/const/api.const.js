export const ROOT = '/';

// common api
export const LOGIN = '/api/login';
export const CHANGE_PASSWORD = '/api/change-password';
export const PROFILE = '/api/profile';
export const UPLOAD = '/api/upload';
export const IMAGE = '/api/image/:image_name';

// user api
export const ADMIN_USER = '/api/admin/user';
export const ADMIN_USER_ID = '/api/admin/user/:user_id';

// post api
export const MANAGE_POST = '/api/manage/post';
export const MANAGE_POST_ID = '/api/manage/post/:post_id';
export const GET_POST = '/api/post';
export const GET_POST_BY_ALIAS = '/api/post/:alias';
export const GET_POST_HOT = '/api/post-hot';

// topic api
export const MANAGE_TOPIC = '/api/manage/topic';
export const MANAGE_TOPIC_ID = '/api/manage/topic/:topic_id';
export const GET_TOPIC = '/api/topic';
export const GET_TOPIC_BY_ALIAS = '/api/topic/:alias';

// product api
export const MANAGE_PRODUCT = '/api/manage/product';
export const MANAGE_PRODUCT_ID = '/api/manage/product/:product_id';
export const PRODUCT_ALIAS = '/api/product/:alias';
export const PRODUCT = '/api/product';
export const PRODUCT_HOT = '/api/product-hot';
export const PRODUCT_RATING = '/api/product/rating';

// shop api
export const ADMIN_SHOP = '/api/admin/shop';
export const ADMIN_SHOP_ID = '/api/admin/shop/:shop_id';
export const SHOP_ALIAS = '/api/shop/:alias';
export const SHOP_HOT = '/api/shop-hot';
export const SHOP_RATING = '/api/shop/rating';

// order api
export const ORDER = '/api/order';
export const MANAGE_ORDER = '/api/manage/order';
export const MANAGE_ORDER_ID = '/api/manage/order/:order_id';

// GHTK api
export const SHIPMENT_GET_FEE = '/api/shipment/fee';
export const SHIPMENT_CREATE_ORDER = '/api/shipment/order';
export const SHIPMENT_GET_ORDER = '/api/shipment/order/:order_id';

import { message } from "antd";
export const ACTIONS = {
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  SHIPPING_ADDRESS: "SHIPPING_ADDRESS",
  SHIPMENTS: "SHIPMENTS",
  DELIVERS: "DELIVERS",
};

export const addToCart = (product, quantity, cart) => {
  if (product.in_stock === 0) return message.error("Sản phẩm đã hết hàng!");

  const checkInCart = cart.every((item) => {
    return item.id !== product.id;
  });

  if (!checkInCart) return message.error("Sản phẩm đã có trong giỏ hàng!");

  if (quantity < 1) return message.error("Số lượng đặt không hợp lệ!");

  message.success("Đã thêm sản phẩm vào giỏ hàng!");

  // const structedCart = cart.reduce((acc, cartItem) => {
  //   acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
  //   acc[cartItem.shop.name].push(cartItem);
  //   return acc;
  // }, {});

  return { type: "ADD_CART", payload: [...cart, { ...product, quantity }] };
  // return { type: "ADD_CART", payload: structedCart };
};

export const changeQty = (data, id, quantity) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item.id === id) {
      item.quantity = quantity;
    }
  });

  return { type: "ADD_CART", payload: newData };
};

export const deleteItem = (data, ids, type) => {
  const newData = data.filter((item) => !ids.includes(item.id));
  return { type, payload: newData };
};

export const shippingAddress = (address) => {
  return { type: "SHIPPING_ADDRESS", payload: address };
};

export const changeShipments = (shipments) => {
  return { type: "SHIPMENTS", payload: shipments };
};

export const changeDelivers = (delivers) => {
  return { type: "DELIVERS", payload: delivers };
};

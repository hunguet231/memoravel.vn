import { message } from "antd";
export const ACTIONS = {
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
};

export const addToCart = (product, cart) => {
  if (product.inStock === 0) return message.error("Sản phẩm đã hết hàng");

  const checkInCart = cart.every((item) => {
    return item._id != product._id;
  });

  if (!checkInCart) return message.error("Sản phẩm đã có trong giỏ hàng");

  message.success("Đã thêm sản phẩm vào giỏ hàng");
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};

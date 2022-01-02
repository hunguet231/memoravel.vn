import { message } from "antd";
export const ACTIONS = {
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
};

export const addToCart = (product, quantity, cart) => {
  if (product.in_stock === 0) return message.error("Sản phẩm đã hết hàng!");

  const checkInCart = cart.every((item) => {
    return item.id !== product.id;
  });

  if (!checkInCart) return message.error("Sản phẩm đã có trong giỏ hàng!");

  if (quantity < 1) return message.error("Số lượng đặt không hợp lệ!");

  message.success("Đã thêm sản phẩm vào giỏ hàng!");
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity }] };
};

// export const decrease = (data, id) => {
//   const newData = [...data];
//   newData.forEach((item) => {
//     if (item.id === id) {
//       const newAmount = item.quantity - 1;
//       if (newAmount <= 0) {
//         item.quantity = 1;
//       } else {
//         item.quantity -= 1;
//       }
//     }
//   });

//   return { type: "ADD_CART", payload: newData };
// };

// export const increase = (data, id) => {
//   const newData = [...data];
//   newData.forEach((item) => {
//     if (item.id === id) {
//       const newAmount = item.quantity + 1;
//       if (newAmount > item.in_stock) {
//         return message.error("Số lượng đặt vượt quá số lượng sản phẩm có sẵn!");
//       } else {
//         item.quantity += 1;
//       }
//     }
//   });

//   return { type: "ADD_CART", payload: newData };
// };

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

  // return { type: "ADD_CART", payload: newData };
};

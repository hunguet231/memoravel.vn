/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useReducer } from "react";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
<<<<<<< HEAD:v1/store/GlobalState.js
  const initialState = { auth: {}, cart: [], orders: [] };
=======
  const initialState = {
    auth: {},
    cart: [],
    shipping_address: {},
    searchText: "",
    filter: {
      search: "",
      price: [0, 1000000],
      made_in: "",
      type: "",
      name_sort: "",
      price_sort: "",
    },
  };
>>>>>>> develop:client/store/GlobalState.js
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const cart_item = JSON.parse(localStorage.getItem("cart_item"));
    if (cart_item) dispatch({ type: "ADD_CART", payload: cart_item });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_item", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("orders", auth.token).then((res) => {
        console.log(res.orders);
        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

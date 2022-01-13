/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useReducer } from "react";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    auth: {},
    cart: [],
    shipping_address: {},
    searchText: "",
    filter: {
      search: "",
      price: "",
      made_in: "",
      type: "",
    },
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const cart_item = JSON.parse(localStorage.getItem("cart_item"));
    if (cart_item) dispatch({ type: "ADD_CART", payload: cart_item });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_item", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

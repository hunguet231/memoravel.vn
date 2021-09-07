import { createContext, useEffect, useReducer } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { auth: {}, cart: [], orders: [] };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");

        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);

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

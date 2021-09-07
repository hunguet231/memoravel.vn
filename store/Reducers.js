import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };

    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ACTIONS.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

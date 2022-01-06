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

    case ACTIONS.SHIPPING_ADDRESS:
      return {
        ...state,
        shipping_address: action.payload,
      };

    case ACTIONS.EMPTY_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

import { SET_CART_LENGTH } from "../actions/actionType";

const initialState = {
  length: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART_LENGTH:
      return { length: action.payload };
    default:
      return state;
  }
}

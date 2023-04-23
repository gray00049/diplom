import { CHANGE_QUERY } from "../actions/actionType";

const initialState = {
  queryRequest: "",
};

export function queryReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_QUERY:
      return { queryRequest: action.payload };
    default:
      return state;
  }
}

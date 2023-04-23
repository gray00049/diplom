import {
  GET_TOP_SALES,
  GET_TOP_SALES_FAILED,
  GET_TOP_SALES_SUCCESS,
} from "../actions/actionType";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_SALES:
      return { ...state, loading: true, failed: false };
    case GET_TOP_SALES_SUCCESS:
      return { data: action.payload, loading: false, error: false };
    case GET_TOP_SALES_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

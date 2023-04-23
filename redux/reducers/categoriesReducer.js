import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS,
} from "../actions/actionType";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, loading: true, error: false };
    case GET_CATEGORIES_SUCCESS:
      return {
        data: [{ id: 1, title: "Все" }, ...action.payload],
        loading: false,
        error: false,
      };
    case GET_CATEGORIES_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

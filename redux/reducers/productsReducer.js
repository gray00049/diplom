import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  CHANGE_PRODUCTS_OFFSET,
  CHANGE_PRODUCTS_CATEGORY,
  GET_PRODUCTS_FULL,
} from '../actions/actionType';

const initialState = {
  oldData: [],
  data: [],
  loading: false,
  getMoreLoading: false,
  offset: 0,
  error: false,
  categoryId: 1,
  all: false,
};

export default function productsReducer(state = initialState, action) {
  let newData;
  switch (action.type) {
    case GET_PRODUCTS:
      if (state.getMoreLoading) {
        return {
          ...state,
          gwtMoreLoading: true,
          error: false,
          oldData: state.data,
        };
      }
      return {
        ...state, loading: true, error: false, oldData: state.data,
      };
    case GET_PRODUCTS_SUCCESS:
      newData = action.payload;
      if (state.getMoreLoading) {
        newData = [...state.oldData, ...newData];
      }
      return {
        ...state,
        data: newData,
        loading: false,
        getMoreLoading: false,
        error: false,
      };
    case GET_PRODUCTS_FAILED:
      return { ...state, error: true, loading: false };
    case CHANGE_PRODUCTS_OFFSET:
      return { ...state, offset: action.payload, getMoreLoading: true };
    case CHANGE_PRODUCTS_CATEGORY:
      return {
        ...state,
        offset: 0,
        data: [],
        categoryId: action.payload,
        all: false,
      };
    case GET_PRODUCTS_FULL:
      return { ...state, all: true };
    default:
      return state;
  }
}

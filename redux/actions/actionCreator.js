import * as actionTypes from './actionType';

// Creator for top sales
export const getTopSales = () => (
  { type: actionTypes.GET_TOP_SALES }
);

export const getTopSalesSuccess = (data) => (
  { type: actionTypes.GET_TOP_SALES_SUCCESS, payload: data }
);

export const getTopSalesFailed = () => (
  { type: actionTypes.GET_TOP_SALES_FAILED }
);

// Creator for categories
export const getCategories = () => (
  { type: actionTypes.GET_CATEGORIES }
);

export const getCategoriesSuccess = (data) => (
  { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: data }
);

export const getCategoriesFailed = () => (
  { type: actionTypes.GET_CATEGORIES_FAILED }
);

// Creator for products
export const getProducts = (query) => (
  { type: actionTypes.GET_PRODUCTS, payload: query }
);

export const getProductsSuccess = (data) => (
  { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data }
);

export const getProductsFailed = () => (
  { type: actionTypes.GET_PRODUCTS_FAILED }
);

export const changeProductsOffset = (offset) => (
  { type: actionTypes.CHANGE_PRODUCTS_OFFSET, payload: offset }
);

export const changeProductsCategory = (categoryId) => (
  { type: actionTypes.CHANGE_PRODUCTS_CATEGORY, payload: categoryId }
);

export const getProductsFull = () => (
  { type: actionTypes.GET_PRODUCTS_FULL }
);

export const getProductsSuccessForQuery = (data) => (
  { type: actionTypes.GET_PRODUCTS_SUCCESS_FOR_QUERY, payload: data }
);

// Creator for query
export const changeQuery = (query) => (
  { type: actionTypes.CHANGE_QUERY, payload: query }
);

// Creator for cart
export const addItemInCart = (item) => (
  { type: actionTypes.ADD_ITEM_IN_CART, payload: item }
);

export const deleteItemFromCart = (id) => (
  { type: actionTypes.DELETE_ITEM_FROM_CART, payload: id }
);

export const loadCartData = () => (
  { type: actionTypes.LOAD_CART_DATA }
);

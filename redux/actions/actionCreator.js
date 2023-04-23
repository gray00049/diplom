import * as actionTypes from "./actionType";

// Creator for top sales
export const getTopSales = () => {
  return { type: actionTypes.GET_TOP_SALES };
};

export const getTopSalesSuccess = (data) => {
  return { type: actionTypes.GET_TOP_SALES_SUCCESS, payload: data };
};

export const getTopSalesFailed = () => {
  return { type: actionTypes.GET_TOP_SALES_FAILED };
};

// Creator for categories
export const getCategories = () => {
  return { type: actionTypes.GET_CATEGORIES };
};

export const getCategoriesSuccess = (data) => {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: data };
};

export const getCategoriesFailed = () => {
  return { type: actionTypes.GET_CATEGORIES_FAILED };
};

// Creator for products
export const getProducts = (query) => {
  return { type: actionTypes.GET_PRODUCTS, payload: query };
};

export const getProductsSuccess = (data) => {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data };
};

export const getProductsFailed = () => {
  return { type: actionTypes.GET_PRODUCTS_FAILED };
};

export const changeProductsOffset = (offset) => {
  return { type: actionTypes.CHANGE_PRODUCTS_OFFSET, payload: offset };
};

export const changeProductsCategory = (categoryId) => {
  return { type: actionTypes.CHANGE_PRODUCTS_CATEGORY, payload: categoryId };
};

export const getProductsFull = () => {
  return { type: actionTypes.GET_PRODUCTS_FULL };
};

export const getProductsSuccessForQuery = (data) => {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS_FOR_QUERY, payload: data };
};

// Creator for query
export const changeQuery = (query) => {
  return { type: actionTypes.CHANGE_QUERY, payload: query };
};

// Creator for cart
export const setCartLength = (length) => {
  return { type: actionTypes.SET_CART_LENGTH, payload: length };
};

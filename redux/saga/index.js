import {
  spawn,
  retry,
  takeLatest,
  put,
  select,
} from "@redux-saga/core/effects";
import * as actionTypes from "../actions/actionType";
import * as actions from "../actions/actionCreator";
import loadTopSales from "../../api/loadTopSales";
import loadCategories from "../../api/loadCategories";
import loadProducts from "../../api/loadProducts";

// Top sales saga
function* workerTopSalesSaga() {
  try {
    const data = yield retry(3, 1000, loadTopSales);
    yield put(actions.getTopSalesSuccess(data));
  } catch {
    yield put(actions.getTopSalesFailed());
  }
}

function* handleTopSales() {
  yield takeLatest(actionTypes.GET_TOP_SALES, workerTopSalesSaga);
}

// Categores saga
function* workerCategories() {
  try {
    const data = yield retry(3, 1000, loadCategories);
    yield put(actions.getCategoriesSuccess(data));
  } catch {
    yield put(actions.getCategoriesFailed());
  }
}

function* handleCategories() {
  yield takeLatest(actionTypes.GET_CATEGORIES, workerCategories);
}

// Products saga
function* workerGetProducts() {
  try {
    const query = yield select((state) => state.query.queryRequest);
    const urlRequest = yield select((state) => {
      const offset = state.products.offset;
      const categoryId = state.products.categoryId;

      let url = import.meta.env.VITE_REQUEST_URL + "/api/items";

      let params = {};

      if (query) {
        params.q = query;
      }

      if (offset) {
        params.offset = offset;
      }

      if (categoryId != 1) {
        params.categoryId = categoryId;
      }

      Object.keys(params).map((item, index) => {
        let prefix = index == 0 ? "?" : "&";
        url += `${prefix}${item}=${params[item]}`;
      });

      return url;
    });
    const data = yield retry(3, 1000, () => loadProducts(urlRequest));
    if (data.length < 6) {
      yield put(actions.getProductsFull());
    }
    yield put(actions.getProductsSuccess(data));
  } catch {
    yield put(actions.getProductsFailed());
  }
}

function* handleProducts() {
  yield takeLatest(actionTypes.GET_PRODUCTS, workerGetProducts);
}

// Query saga
function* workerQuery() {}

function* handleQuery() {
  yield takeLatest(actionTypes.CHANGE_QUERY, workerQuery);
}

export default function* rootSaga() {
  yield spawn(handleTopSales);
  yield spawn(handleCategories);
  yield spawn(handleProducts);
  yield spawn(handleQuery);
}

import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import topSalesReducer from '../reducers/topSalesReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import productsReducer from '../reducers/productsReducer';
import rootSaga from '../saga';
import queryReducer from '../reducers/queryReducer';
import cartReducer from '../reducers/cartReducer';

const reducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  products: productsReducer,
  query: queryReducer,
  cart: cartReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;

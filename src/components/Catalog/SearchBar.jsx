import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductsCategory,
  changeProductsOffset,
  changeQuery,
  getProducts,
} from "../../../redux/actions/actionCreator";
import { useLocation } from "react-router";

export default function SearchBar() {
  let input = useRef();
  const searchParams = useLocation();

  useEffect(() => {
    if (searchParams?.search != "") {
      input.current.value = decodeURI(searchParams?.search.slice(3));
      handlerChangeQuery();
    }
  });

  const dispatch = useDispatch();

  const activeCategory = useSelector((state) => state.products.categoryId);

  const handlerChangeQuery = () => {
    const query = input.current.value;

    if (query != "") {
      dispatch(changeProductsCategory(activeCategory));
      dispatch(changeQuery(query));
    } else {
      dispatch(changeQuery(query));
      dispatch(changeProductsCategory(activeCategory));
    }

    dispatch(getProducts(query));
  };

  return (
    <form
      className="catalog-search-form form-inline"
      onSubmit={(evt) => {
        evt.preventDefault();
        handlerChangeQuery();
      }}
    >
      <input className="form-control" placeholder="Поиск" ref={input} />
    </form>
  );
}

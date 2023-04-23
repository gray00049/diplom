import { useEffect } from "react";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductsCategory,
  changeProductsOffset,
  getCategories,
  getProducts,
} from "../../../redux/actions/actionCreator";
import Categories from "./Categories";
import LoadMoreButton from "./LoadMoreButton";
import Loading from "../Loading";

export default function Catalog() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());

    return () => {
      dispatch(changeProductsCategory(1));
    };
  }, []);

  const handleLoadMore = () => {
    dispatch(changeProductsOffset(products.offset + 6));
    dispatch(getProducts());
  };

  const handleChangeCategory = (id) => {
    dispatch(changeProductsCategory(id));
    dispatch(getProducts());
  };

  let showContent = !(products.loading || categories.loading);
  return (
    <>
      {!categories.loading && (
        <Categories
          categoryList={categories.data}
          active={products.categoryId}
          onChange={handleChangeCategory}
        />
      )}

      {showContent && (
        <div className="row">
          {products.data.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.title}
              price={item.price}
              img={item.images[0]}
            />
          ))}
          {!products.data.length && (
            <h1 className="text-center text-secondary">
              По вашему запросу нет результатов
            </h1>
          )}
        </div>
      )}

      {products.getMoreLoading || !showContent ? (
        <Loading />
      ) : (
        <LoadMoreButton onClick={handleLoadMore} needLoadMore={!products.all} />
      )}
    </>
  );
}

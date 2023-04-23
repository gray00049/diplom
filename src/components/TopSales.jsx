import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getTopSales } from "../../redux/actions/actionCreator";

export default function TopSales() {
  const dispatch = useDispatch();

  let { data, loading, error } = useSelector((store) => store.topSales);

  useEffect(() => {
    dispatch(getTopSales());
  }, []);

  const preloader = (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  const items = (
    <div className="row" style={{ display: loading ? "none" : "flex" }}>
      {data.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.title}
          price={item.price}
          img={item.images[0]}
        />
      ))}
    </div>
  );

  let content = loading ? preloader : items;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {content}
    </section>
  );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { getTopSales } from '../../redux/actions/actionCreator';

export default function TopSales() {
  const dispatch = useDispatch();

  let { data, loading } = useSelector((store) => store.topSales);

  useEffect(() => {
    dispatch(getTopSales());
  }, []);

  const items = (
    <div className="row" style={{ display: loading ? 'none' : 'flex' }}>
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

  const content = loading ? <Loading /> : items;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {content}
    </section>
  );
}

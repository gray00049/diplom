import { Link } from 'react-router-dom';

export default function ProductCard({
  id, name, price, img,
}) {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={img} className="catalog-item-card__img" alt={name} />
        <div className="card-body">
          <p className="card-text">{name}</p>
          <p className="card-text">
            {`${new Intl.NumberFormat().format(Number(price))} руб.`}
          </p>
          <Link to={`/products/${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}

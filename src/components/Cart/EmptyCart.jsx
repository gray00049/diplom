import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="empty-cart text-center my-5">
      <h1>
        В корзине пока ничего нет.
        <br />
        Это отличная возможность заполнить ее!
      </h1>
      <p className="fs-3">
        Перейти на страницу
        <Link to="/catalog"> каталога</Link>
      </p>
    </div>
  );
}

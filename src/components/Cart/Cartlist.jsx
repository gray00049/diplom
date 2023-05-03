import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartList({ cartItems, onDelete }) {
  const [totalSum, setTotalSum] = useState(0);

  const calcTotalPrice = () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.count * item.price), 0);
    setTotalSum(totalPrice);
  };

  useEffect(() => {
    calcTotalPrice();
  }, [cartItems]);

  const formattedPrice = (price) => (
    `${new Intl.NumberFormat().format(Number(price))} руб.`
  );

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/products/${item?.id}`}>{item?.title}</Link>
              </td>
              <td>{item?.size}</td>
              <td>{item?.count}</td>
              <td>
                {formattedPrice(item?.price)}
              </td>
              <td>
                {formattedPrice(item.count * item.price)}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(index)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>
              {formattedPrice(totalSum)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

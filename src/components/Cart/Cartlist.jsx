import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartList({ cartItems, onDelete }) {
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    calcTotalPrice();
  }, [cartItems]);

  const calcTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.count * item.price;
    });
    setTotalSum(totalPrice);
  };

  const formattedPrice = price => {
    return new Intl.NumberFormat().format(Number(price))
  }

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
              <td scope="row">{index + 1}</td>
              <td>
                <Link to={`/products/${item?.id}`}>{item?.title}</Link>
              </td>
              <td>{item?.size}</td>
              <td>{item?.count}</td>
              <td>{formattedPrice(item?.price)} руб.</td>
              <td>{formattedPrice(item?.count * item?.price)} руб.</td>
              <td>
                <button
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
            <td>{formattedPrice(totalSum)} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

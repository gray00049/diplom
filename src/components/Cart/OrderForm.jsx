import { useState } from "react";

export default function OrderForm({ onSendOrder }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [address, setAddress] = useState("");

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: 30 + "rem", margin: "0 auto" }}>
        <form
          className="card-body"
          onSubmit={(evt) => {
            onSendOrder(evt, phoneNumber, address);
          }}
        >
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              value={phoneNumber}
              onChange={(evt) => {
                setPhoneNumber(evt.target.value);
              }}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={address}
              onChange={(evt) => {
                setAddress(evt.target.value);
              }}
            />
          </div>
          <div className="form-group form-check my-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!(phoneNumber && address)}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}

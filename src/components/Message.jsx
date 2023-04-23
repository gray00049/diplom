export default function Message({ type }) {
  let content;

  if (type == "loading") {
    content = (
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  } else if (type == "success") {
    content = (
      <div className="text-center">
        <h3>Ваш заказ успешно сформирован!</h3>
        <p>Скоро вы окажитесь на главной странице</p>
      </div>
    );
  } else if (type == "error") {
    content = (
      <div className="text-center">
        <h3>
          Возникла ошибка при формировании заказа. Повторите попытку позднее
        </h3>
      </div>
    );
  } else {
    return false;
  }

  return <div className="cart-info">{content}</div>;
}

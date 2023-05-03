import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteItemFromCart, loadCartData } from '../../redux/actions/actionCreator';
import Banner from '../components/Banner';
import CartList from '../components/Cart/Cartlist';
import OrderForm from '../components/Cart/OrderForm';
import EmptyCart from '../components/Cart/EmptyCart';
import Message from '../components/Message';

export default function Cart() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [messageType, setMessageType] = useState('');

  const handleDeleteProduct = (id) => {
    dispatch(deleteItemFromCart(id));
  };

  const viewSuccessMessage = () => {
    setMessageType('success');
    setTimeout(() => {
      navigate('/');
      dispatch(loadCartData());
    }, 3000);
  };

  const handleSendForm = (evt, phoneNumber, address) => {
    evt.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return false;
    }

    const order = {
      owner: {
        phone: phoneNumber,
        address,
      },
      items: [],
    };

    cart.map((item) => {
      const itemData = {
        id: +item.id,
        price: item.price,
        count: item.count,
      };

      order.items.push(itemData);
    });

    setMessageType('loading');

    fetch(`${import.meta.env.VITE_REQUEST_URL}/api/order`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        console.log(1);

        viewSuccessMessage();

        localStorage.setItem('cart', JSON.stringify([]));
      })
      .catch(() => {
        console.log(2);
        setMessageType('error');
        setTimeout(() => {
          setMessageType('');
        }, 2000);
      });
  };

  if (!cartItems.length) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <EmptyCart />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <CartList cartItems={cartItems} onDelete={handleDeleteProduct} />
          <OrderForm onSendOrder={handleSendForm} />
        </div>
      </div>
      <Message type={messageType} />
    </main>
  );
}

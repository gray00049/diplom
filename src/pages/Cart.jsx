import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import CartList from "../components/Cart/Cartlist";
import OrderForm from "../components/Cart/OrderForm";
import { useDispatch } from "react-redux";
import { setCartLength } from "../../redux/actions/actionCreator";
import EmptyCart from "../components/Cart/EmptyCart";
import { useNavigate } from "react-router";
import Message from "../components/Message";

export default function Cart() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    if (localStorage.getItem("cart")) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    } else {
      let initialCart = [];
      setCartItems(initialCart);
      localStorage.setItem("cart", JSON.stringify(initialCart));
    }
  };

  const handleDeleteProduct = (id) => {
    let cartProduct = JSON.parse(localStorage.getItem("cart"));
    cartProduct.splice(id, 1);
    localStorage.setItem("cart", JSON.stringify(cartProduct));
    setCartItems(cartProduct);

    dispatch(setCartLength(cartProduct.length));
  };

  const handleSendForm = (evt, phoneNumber, address) => {
    evt.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      return false;
    }

    let order = {
      owner: {
        phone: phoneNumber,
        address: address,
      },
      items: [],
    };

    cart.map((item) => {
      let itemData = {
        id: +item.id,
        price: item.price,
        count: item.count,
      };

      order.items.push(itemData);
    });

    setMessageType("loading");

    fetch(`${import.meta.env.VITE_REQUEST_URL}/api/order`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        viewSuccessMessage();

        dispatch(setCartLength(0));
        localStorage.setItem("cart", JSON.stringify([]));
      })
      .catch((error) => {
        setMessageType("error");
        setTimeout(() => {
          setMessageType("");
        }, 2000);
      });
  };

  const viewSuccessMessage = () => {
    setMessageType("success");
    setTimeout(() => {
      navigate("/");
    }, 3000);
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

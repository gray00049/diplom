import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setCartLength } from "../../redux/actions/actionCreator";
import Loading from "../components/Loading";

export default function Product() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    images: [],
    sizes: [],
  });

  const [selectedSize, changeSelectedSize] = useState(false);

  const [hasError, setError] = useState(false);

  const [countProduct, setCountProduct] = useState(1);

  const loadProductData = () => {
    const url = `${import.meta.env.VITE_REQUEST_URL}/api/items/${id}`;

    setError(false);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((data) => setProductData(data))
      .catch(() => {
        setError(true);
      });
  };

  const handleChangeSelectedSize = (evt) => {
    changeSelectedSize(evt.target.innerHTML);
  };

  const handleAddToCart = () => {
    let currentProduct = {
      id,
      title: productData?.title,
      size: selectedSize || "",
      count: countProduct,
      price: productData?.price,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let productId = checkCart(currentProduct, cart);

    if (productId == -1) {
      console.log("new item");
      cart.push(currentProduct);
    } else {
      console.log("update item");
      let oldProductData = cart[productId];
      cart[productId] = {
        ...oldProductData,
        count: oldProductData.count + currentProduct.count,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(setCartLength(cart.length));
    navigate("/cart");
  };

  const checkCart = (product, cart) => {
    return cart.findIndex(
      (item) => item.title == product.title && item.size == product.size
    );
  };

  useEffect(() => {
    loadProductData();
  }, []);

  if (hasError) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <div className="my-5 text-center">
              <h1>При загрузке произошла ошибка</h1>
              <button className="btn btn-danger" onClick={loadProductData}>
                Повторить
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!productData.sizes.length) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <div className="my-5">
              <Loading />
            </div>
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

          <section className="catalog-item">
            <h2 className="text-center">{productData?.title}</h2>
            <div className="row">
              <div className="col-5">
                <img
                  src={productData?.images[0]}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{productData?.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{productData?.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{productData?.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{productData?.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{productData?.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{productData?.reason}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <p>
                    Размеры в наличии:
                    {productData?.sizes.map((size, index) => {
                      if (size.available) {
                        return (
                          <span
                            key={index}
                            className={`catalog-item-size ${
                              size.size == selectedSize ? "selected" : ""
                            }`}
                            onClick={handleChangeSelectedSize}
                          >
                            {size.size}
                          </span>
                        );
                      }
                    })}
                  </p>
                  <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          if (countProduct != 1) {
                            setCountProduct(countProduct - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">
                        {countProduct}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          if (countProduct != 10) {
                            setCountProduct(countProduct + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </span>
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-block btn-lg w-100"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  В корзину
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

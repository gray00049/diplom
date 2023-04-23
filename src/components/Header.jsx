import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/header-logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const [searchBar, changeSearchBar] = useState({
    type: "invisible",
    value: "",
  });

  const navigate = useNavigate();

  const cartCount =
    useSelector((state) => state.cart.length) ||
    JSON.parse(localStorage.getItem("cart")).length;

  const handleChangeQuery = (evt) => {
    changeSearchBar({ ...searchBar, value: evt.target.value });
  };

  const handleCallSearchBar = () => {
    if (searchBar.type == "invisible") {
      changeSearchBar({ ...searchBar, type: "visible" });
    } else {
      handleSendQuery();
    }
  };

  const handleSendQuery = () => {
    if (searchBar.type == "visible" && searchBar.value == "") {
      changeSearchBar({ ...searchBar, type: "invisible" });
    } else {
      navigate(`/catalog?q=${searchBar.value}`);
      changeSearchBar({ type: "invisible", value: "" });
    }
  };

  const handleClickCart = () => {
    navigate("/cart");
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">
              <img src={logo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className="nav-link">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className="nav-link">
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleCallSearchBar}
                  ></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div
                    className="header-controls-pic header-controls-cart"
                    onClick={handleClickCart}
                  >
                    <div
                      className={`${
                        cartCount == 0 ? "d-none" : "header-controls-cart-full"
                      }`}
                    >
                      {cartCount}
                    </div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${searchBar.type}`}
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSendQuery();
                  }}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={searchBar.value}
                    onChange={handleChangeQuery}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

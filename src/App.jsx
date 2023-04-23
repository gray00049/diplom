import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Cart from "./pages/Cart.jsx";
import CatalogPage from "./pages/CatalogPage";
import Contacts from "./pages/Contacts";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/catalog" element={<CatalogPage />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products/:id" element={<Product />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

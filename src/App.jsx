import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Cart from './pages/Cart';
import CatalogPage from './pages/CatalogPage';
import Contacts from './pages/Contacts';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import banner from '../assets/banner.jpg';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog/Catalog';

export default function Main() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <TopSales />
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <Catalog />
          </section>
        </div>
      </div>
    </main>
  );
}

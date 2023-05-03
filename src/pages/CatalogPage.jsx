import Banner from '../components/Banner';
import Catalog from '../components/Catalog/Catalog';
import SearchBar from '../components/Catalog/SearchBar';

export default function CatalogPage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <SearchBar />
            <Catalog />
          </section>
        </div>
      </div>
    </main>
  );
}

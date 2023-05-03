export default function Categories({ categoryList, active, onChange }) {
  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoryList.map((item) => (
        <li className="nav-item" key={item.id}>
          <button
            type="button"
            className={
              item.id === active ? 'nav-link active' : 'nav-link text-secondary'
            }
            style={{ border: 'none', background: 'none' }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(item.id);
            }}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

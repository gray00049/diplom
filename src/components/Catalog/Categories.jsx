export default function Categories({ categoryList, active, onChange }) {
  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoryList.map((item) => (
        <li className="nav-item" key={item.id}>
          <a
            className={
              item.id == active ? "nav-link active" : "nav-link text-secondary"
            }
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(item.id);
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

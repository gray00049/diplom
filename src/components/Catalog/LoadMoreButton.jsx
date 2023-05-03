export default function LoadMoreButton({ onClick, needLoadMore }) {
  return (
    <div className={needLoadMore ? 'text-center' : 'd-none'}>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={onClick}
      >
        Загрузить ещё
      </button>
    </div>
  );
}

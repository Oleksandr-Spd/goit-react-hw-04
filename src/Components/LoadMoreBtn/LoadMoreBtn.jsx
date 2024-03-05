import css from "./LoadMoreBtn.module.css";
export const LoadMore = ({ onClick }) => {
  return (
    <button className={css.loadMore} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

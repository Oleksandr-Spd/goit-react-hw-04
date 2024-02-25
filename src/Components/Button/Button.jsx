import css from "./Button.module.css";
export const LoadMore = ({ onClick }) => {
  return (
    <button className={css.loadMore} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

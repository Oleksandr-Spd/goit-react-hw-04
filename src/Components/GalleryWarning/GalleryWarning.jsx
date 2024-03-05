import { Loader } from "../Loader/Loader";
import css from "./GalleryWarning.module.css";

export const GalleryWarning = ({ query }) => {
  return (
    <div className={css.textBox}>
      <p className={css.text}>
        {query.length === 0
          ? "Start typing to find something...👍"
          : "Oops! Your search returned 0 results. Try again...☝️"}
      </p>
      {query.length === 0 && <Loader />}
    </div>
  );
};


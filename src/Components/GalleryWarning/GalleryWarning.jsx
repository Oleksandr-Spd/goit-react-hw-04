import { Loader } from "../Loader/Loader";
import css from "./GalleryWarning.module.css";

export const GalleryWarning = () => {
  return (
    <div className={css.textBox}>
      <p className={css.text}>Start typing to find something...👍</p>
      <Loader />
    </div>
  );
};

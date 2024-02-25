import { CirclesWithBar } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <CirclesWithBar
        height={200}
        width={200}
        color="#303f9f"
        outerCircleColor="#303f9f"
        innerCircleColor="#303f9f"
        barColor="#303f9f"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

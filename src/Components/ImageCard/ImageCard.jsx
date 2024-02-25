import css from "./ImageCard.module.css";

export const ImageCard = ({ item, onClick }) => {
  return (
    <li className={css.galleryItem} key={item.id}>
      <div className={css.imageContainer}>
        <img
          className={css.image}
          src={item.urls.small}
          alt={item.alt_description}
          onClick={() => onClick(item.urls.regular)}
        />
      </div>
    </li>
  );
};

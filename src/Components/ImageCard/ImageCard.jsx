import css from "./ImageCard.module.css";

export const ImageCard = ({ item, onClick }) => {
  const altText = item.alt_description || "Something interesting...";

  return (
    <li className={css.galleryItem}>
      <div className={css.imageContainer}>
        <img
          className={css.image}
          src={item.urls.small}
          alt={altText}
          onClick={() => onClick(item)}
        />
        <p className={css.imgAlt}>{altText}</p>
      </div>
    </li>
  );
};

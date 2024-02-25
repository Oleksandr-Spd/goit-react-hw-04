import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <ImageCard key={item.id} item={item} onClick={() => openModal(item)} />
      ))}
    </ul>
  );
};
``;

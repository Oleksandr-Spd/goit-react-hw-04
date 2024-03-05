import "./App.css";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getImages } from "./Components/Api";
import { SearchBar } from "./Components/SearchBar/SearchBar";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import { LoadMore } from "./Components/LoadMoreBtn/LoadMoreBtn";

import { Loader } from "./Components/Loader/Loader";
import { GalleryWarning } from "./Components/GalleryWarning/GalleryWarning";
import { Error } from "./Components/Error/Error";
import { ModalWindow } from "./Components/ImageModal/ImageModal";
import { nanoid } from "nanoid";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoadMore(true);
    setLoading(true);
    setSearchClick(true);
    async function fetchData() {
      try {
        const { results, total, total_pages } = await getImages(
          query.split("/")[1],
          page
        );
        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPage(total_pages);
        if (!searchClick) {
          if (total === 0) {
            toast(`Oops! Your search returned 0 results.`);
          } else {
            toast.success(`Hooray! We found ${total} images.`);
          }
          setSearchClick(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  const handleSubmit = (query) => {
    setQuery(`${nanoid()}/${query}`);
    setPage(1);
    setImages([]);
    setSearchClick(false);
  };

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (images) => {
    setSelectedImg(images);
    setIsOpen(true);
    console.log(selectedImg);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSubmit} />
      {error && <Error />}
      {images.length === 0 && !loading && !error && (
        <GalleryWarning query={query} />
      )}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {loadMore && !loading && page < totalPage && (
        <LoadMore onClick={onLoadMore} />
      )}
      <Toaster />
      {modalIsOpen && (
        <ModalWindow
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageUrl={selectedImg.urls.regular}
          imageAlt={selectedImg.alt_description}
        />
      )}
    </div>
  );
};

export default App;

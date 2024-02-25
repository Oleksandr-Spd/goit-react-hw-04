import "./App.css";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getImages } from "./Components/Api";
import { SearchBar } from "./Components/SearchBar/SearchBAr";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import { LoadMore } from "./Components/Button/Button";

import { Loader } from "./Components/Loader/Loader";
import { GalleryWarning } from "./Components/GalleryWarning/GalleryWarning";
import { Error } from "./Components/Error/Error";
import { ModalWindow } from "./Components/ImageModal/ImageModal";

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
  const [modalImageUrl, setModalImageUrl] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoadMore(true);
    setLoading(true);
    setSearchClick(true);
    async function fetchData() {
      try {
        setError(false);
        const { results, total, total_pages } = await getImages(
          query.split("/")[1],
          page
        );
        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPage(total_pages);
        if (!searchClick && total > 0) {
          toast.success(`Hooray! We found ${total} images.`);
          setSearchClick(true);
        } else {
          toast.error(
            `Sorry, but we couldn't find any images based on your request. Try again.`
          );
          setSearchClick(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    fetchData();
  }, [query, page]);

  const handleSubmit = (query) => {
    setQuery(`${Date.now()}/${query}`);
    setPage(1);
    setImages([]);
    setSearchClick(false);
  };

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (largeImageUrl) => {
    setModalImageUrl(largeImageUrl);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSubmit} />
      {error && <Error />}
      {images.length === 0 && !loading && !error && <GalleryWarning />}
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
          imageUrl={modalImageUrl}
        />
      )}
    </div>
  );
};

export default App;

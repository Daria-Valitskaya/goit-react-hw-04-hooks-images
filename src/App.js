import "./App.css";
import { useState, useEffect } from "react";
import ApiServise from "./Components/API";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Modal from "./Components/Modal/Modal";
import LoadMoreBtn from "./Components/Button/Button";
import MyLoader from "./Components/Loader/MyLoader";
import Section from "./Components/Section/Section";
import ErrorView from "./Components/ErrorView/Error";

export default function App() {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!imageName) {
      return;
    }
    function fetchApiService() {
      setStatus("pending");

      ApiServise(imageName, page)
        .then((images) => {
          if (images.length === 0) {
            setError("Ooops, something went wrong");
            setStatus("rejected");
            return;
          }
          if (images.length <= 12) {
            setImages((prevState) => [...prevState, ...images]);
            setStatus("resolved");
          }

          if (page !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        })
        .catch((error) => {
          setError("Ooops, something went wrong");
          setStatus("rejected");
        });
    }
    fetchApiService();
  }, [imageName, page]);

  const onLoadMoreClick = () => {
    setPage((prevState) => prevState + 1);
    setStatus("resolved");
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = (imageName) => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setStatus("pending");
  };

  const openBigImage = (event) => {
    setLargeImageURL(event.target.dataset.url);
    setTags(event.target.alt);
    toggleModal();
  };

  return (
    <Section className="App">
      <Searchbar onSubmit={onSubmit} />
      {status === "resolved" && (
        <>
          <ImageGallery images={images} onClick={openBigImage} />
          {images.length >= 12 && <LoadMoreBtn onBtnClick={onLoadMoreClick} />}
        </>
      )}

      {status === "pending" && <MyLoader />}
      {status === "rejected" && <ErrorView textError={error} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </Section>
  );
}

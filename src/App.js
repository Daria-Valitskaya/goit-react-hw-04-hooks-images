import "./App.css";
import { Component } from "react";
import ApiServise from "./Components/API";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Modal from "./Components/Modal/Modal";
import LoadMoreBtn from "./Components/Button/Button";
import MyLoader from "./Components/Loader/MyLoader";
import Section from "./Components/Section/Section";
import ErrorView from "./Components/ErrorView/Error";

export default class App extends Component {
  state = {
    images: [],

    imageName: "",
    page: 1,
    error: null,
    showModal: false,
    largeImageURL: "",
    tags: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      this.setState({ status: "pending" });
      this.fetchApiService(imageName, page);
    }
  }

  fetchApiService = () => {
    const { imageName, page } = this.state;

    ApiServise(imageName, page)
      .then((images) => {
        if (images.length === 0) {
          this.setState({
            status: "rejected",
            error: "Ooops, something went wrong",
          });

          return;
        }
        if (images.length <= 12) {
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          status: "resolved",
        }));
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) =>
        this.setState({
          error: "Ooops, something went wrong",
          status: "rejected",
        })
      );
  };

  onLoadMoreClick = () => {
    this.fetchApiService();
    this.setState({
      status: "resolved",
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onSubmit = (imageName) => {
    this.setState({
      imageName,
      page: 1,
      images: [],
      status: "pending",
    });
  };

  openBigImage = (event) => {
    this.setState({
      largeImageURL: event.target.dataset.url,
      tags: event.target.alt,
    });
    this.toggleModal();
  };

  render() {
    const { showModal, largeImageURL, tags, images, status, error } =
      this.state;

    return (
      <Section className="App">
        <Searchbar onSubmit={this.onSubmit} state={this.state} />
        {status === "resolved" && (
          <>
            <ImageGallery images={images} onClick={this.openBigImage} />
            {images.length >= 12 && (
              <LoadMoreBtn onBtnClick={this.onLoadMoreClick} />
            )}
          </>
        )}

        {status === "pending" && <MyLoader />}
        {status === "rejected" && <ErrorView textError={error} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </Section>
    );
  }
}

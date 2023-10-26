import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    apiKey: '38684202-1b965ae9aa77d23174a7bb28f',
    noImagesFound: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ currentPage: 1, images: [], noImagesFound: false });
      this.fetchImages();
    } else if (prevState.currentPage !== this.state.currentPage) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, currentPage, apiKey } = this.state;
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    this.setState({ isLoading: true });

    fetch(
      `${baseUrl}?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length > 0) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
          }));
        } else {
          this.setState({ noImagesFound: true });
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, noImagesFound } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !noImagesFound && (
          <Button onClick={this.handleLoadMore} />
        )}
        {noImagesFound && <p>No images found.</p>}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}

export default App;

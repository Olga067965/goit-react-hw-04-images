import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../configApi';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [noImagesFound, setNoImagesFound] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    setIsLoading(true);

    fetchImages(searchQuery, currentPage)
      .then(data => {
        if (data.length > 0) {
          setImages(prevImages => [...prevImages, ...data]);
        } else {
          setNoImagesFound(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, currentPage]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setNoImagesFound(false);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !noImagesFound && (
        <Button onClick={handleLoadMore} />
      )}
      {noImagesFound && <p>No images found.</p>}
      {showModal && (
        <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};

export default App;

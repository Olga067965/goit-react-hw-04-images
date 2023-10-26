import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [noImagesFound, setNoImagesFound] = useState(false);

  const apiKey = '38684202-1b965ae9aa77d23174a7bb28f';

  const fetchImages = () => {
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    setIsLoading(true);

    fetch(
      `${baseUrl}?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.hits.length > 0) {
          setImages(prevImages => [...prevImages, ...data.hits]);
        } else {
          setNoImagesFound(true);
        }
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchQuery !== '') {
      setCurrentPage(1);
      setImages([]);
      setNoImagesFound(false);
      fetchImages();
    }
  }, [searchQuery, fetchImages]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchImages();
    }
  }, [currentPage, fetchImages]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
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

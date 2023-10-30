import React, { useEffect } from 'react';

const Modal = ({ largeImageURL, onClose }) => {
  const handleCloseClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDownEvent = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={handleCloseClick}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;

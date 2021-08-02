import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(image => (
        <li
          key={image.id}
          onClick={() => onClick(image.largeImageURL, image.tags)}
          className="ImageGalleryItem"
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

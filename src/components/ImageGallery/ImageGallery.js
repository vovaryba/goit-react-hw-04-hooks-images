import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import imagesAPI from '../../services/images-api';
import './ImageGallery.css';

const URL = 'https://pixabay.com/api/';
const API_KEY = '22634984-1ce924b253c51d48f10b47cfd';
const per_page = 12;
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
let modalImg;
let modalAlt;

function ImageGallery({ imageKeyword, startPage }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imageKeyword) {
      return;
    }
    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(URL, imageKeyword, startPage, API_KEY, per_page)
      .then(images => {
        setImages(images.hits);
        setPage(startPage + 1);
        setStatus(Status.RESOLVED);
        setLoading(true);
      }, scrollWindow())
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => setLoading(false));
  }, [imageKeyword, startPage]);

  const buttonClick = () => {
    imagesAPI
      .fetchImages(URL, imageKeyword, page, API_KEY, per_page)
      .then(image => {
        setImages([...images, ...image.hits]);
        setPage(page + 1);
        setStatus(Status.RESOLVED);
        setLoading(false);
        scrollWindow();
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(setLoading(!loading));
  };

  function scrollWindow() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const toggleModal = (url, alt) => {
    setShowModal(!showModal);
    modalImg = url;
    modalAlt = alt;
  };

  const renderButton = images.length > 0 && !loading;

  if (status === Status.IDLE) {
    return <div>Введите ключевое слово</div>;
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <h1>{error}</h1>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem images={images} onClick={toggleModal} />
        </ul>
        {renderButton && <Button onClick={buttonClick} />}
        {showModal && (
          <Modal
            onClose={toggleModal}
            modalImg={modalImg}
            modalAlt={modalAlt}
          ></Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageKeyword: PropTypes.string.isRequired,
  startPage: PropTypes.number.isRequired,
};

export default ImageGallery;

import React, { Component } from 'react';
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

class ImageGallery extends Component {
  static propTypes = {
    imageKeyword: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    loading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevProps.imageKeyword;
    const nextKeyword = this.props.imageKeyword;
    const { page } = this.props;

    if (prevKeyword !== nextKeyword) {
      this.setState({ status: 'pending', loading: true });

      imagesAPI
        .fetchImages(URL, nextKeyword, page, API_KEY, per_page)
        .then(images => {
          if (images.length === 0) {
            this.setState({
              error: `Нет картинки с кодовым словом ${nextKeyword}`,
              loading: true,
              status: 'rejected',
            });
            return;
          } else {
            this.setState({
              images: images.hits,
              page: this.props.page + 1,
              status: 'resolved',
              loading: true,
            });
          }
          this.scrollWindow();
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  buttonClick = () => {
    const nextKeyword = this.props.imageKeyword;
    const { page } = this.state;
    imagesAPI
      .fetchImages(URL, nextKeyword, page, API_KEY, per_page)
      .then(image => {
        this.setState(prevState => ({
          images: [...prevState.images, ...image.hits],
          page: this.state.page + 1,
          status: 'resolved',
          loading: !prevState.loading,
        }));
        this.scrollWindow();
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(
        this.setState(prevState => ({
          loading: !prevState.loading,
        })),
      );
  };

  scrollWindow() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal = (url, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: url,
      modalAlt: alt,
    }));
  };

  render() {
    const { images, error, status, showModal, modalImg, modalAlt, loading } =
      this.state;
    const renderButton = images.length > 0 && !loading;

    if (status === 'idle') {
      return <div>Введите ключевое слово</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} onClick={this.toggleModal} />
          </ul>
          {renderButton && <Button onClick={this.buttonClick} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;

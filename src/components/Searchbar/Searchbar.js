import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './Searchbar.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imageKeyword: '',
  };

  handleTagChange = event => {
    this.setState({ imageKeyword: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageKeyword.trim() === '') {
      toast.warn('Введите ключевое слово в строку поиска');
      return;
    }
    this.props.onSubmit(this.state.imageKeyword);
    this.setState({ imageKeyword: '' });
  };

  render() {
    const { imageKeyword } = this.state;
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={imageKeyword}
            onChange={this.handleTagChange}
            name="imageKeyword"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

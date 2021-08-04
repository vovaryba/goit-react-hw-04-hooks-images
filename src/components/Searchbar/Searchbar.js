import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './Searchbar.css';

function Searchbar({ onSubmit }) {
  const [imageKeyword, setImageKeyword] = useState('');

  const handleTagChange = event => {
    setImageKeyword(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageKeyword.trim() === '') {
      toast.warn('Введите ключевое слово в строку поиска');
      return;
    }
    onSubmit(imageKeyword);
    setImageKeyword('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={imageKeyword}
          onChange={handleTagChange}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

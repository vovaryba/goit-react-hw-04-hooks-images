import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [imageKeyword, setImageKeyword] = useState('');
  const [page] = useState(1);

  return (
    <div className="App">
      <Searchbar onSubmit={setImageKeyword} />
      <ImageGallery imageKeyword={imageKeyword} startPage={page} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;

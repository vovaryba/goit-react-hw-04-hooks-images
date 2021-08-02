import React from 'react';
import LoaderDots from 'react-loader-spinner';
import './Loader.css';

function Loader() {
  return (
    <>
      <LoaderDots
        type="ThreeDots"
        color="#3ebb2e"
        height={50}
        width={50}
        timeout={0}
        display="block"
      />
    </>
  );
}

export default Loader;

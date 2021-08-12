import React from 'react';
import styles from './styles.module.css';

const FullScreenBannerImage = ({ imageUrl }) => {
  return (
    <>
      <img
        className={styles.fullScreenBannerAd}
        src={imageUrl}
        alt="fullscreenbanner"
      />
    </>
  );
};

export default FullScreenBannerImage;

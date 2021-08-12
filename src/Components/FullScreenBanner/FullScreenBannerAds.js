import React from 'react';
import styles from './styles.module.css';

const FullScreenBannerAds = ({ videoUrl }) => {
  return (
    <>
      <div>
        <video
          src={videoUrl}
          className={styles.fullScreenBannerAd}
          autoPlay
          loop
        ></video>
      </div>
    </>
  );
};

export default FullScreenBannerAds;

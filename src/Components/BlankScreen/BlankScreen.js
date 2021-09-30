import React from 'react';
import {
  getBannerSize,
  getBannerUrl,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';
import styles from './styles.module.css';

const BlankScreen = ({ gameStateData }) => {
  return (
    <>
      {isSizeBannerVisible(gameStateData) && (
        <img
          className={styles[getBannerSize(gameStateData)]}
          src={getBannerUrl(gameStateData)}
          alt="banner"
        />
      )}
    </>
  );
};

export default BlankScreen;

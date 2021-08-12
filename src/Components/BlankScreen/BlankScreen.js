import React from 'react';
import styles from './styles.module.css';

const BlankScreen = ({ gameStateData }) => {
  console.log('gamee', gameStateData.current_ads);
  return (
    gameStateData.current_ads.banner_ad_url !== '' &&
    gameStateData.current_ads.banner_ad_size !== 'banner_full_screen' &&
    gameStateData.current_ads.is_banner_ad_visible && (
      <>
        <img
          className={styles[gameStateData.current_ads.banner_ad_size]}
          src={gameStateData.current_ads.banner_ad_url}
          alt="blankbanner"
        />
      </>
    )
  );
};

export default BlankScreen;

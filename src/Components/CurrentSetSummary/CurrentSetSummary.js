import React, { useContext } from 'react';
import CurrentSetSummaryImage from '../../Assets/CurrentSetSummary.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import {
  getAwaySideCurrentSetPoints,
  getAwaySideName,
  getBannerSize,
  getBannerUrl,
  getHomeSideCurrentSetPoints,
  getHomeSideName,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const CurrentSetSummary = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  return (
    <>
      <img
        className={styles.currentSummaryImage}
        src={CurrentSetSummaryImage}
        alt="bottomScoreImage"
      />

      <div className={styles.homeTeamName}>
        {' '}
        {getHomeSideName(gameStateData, streamData)}
      </div>
      <div className={styles.awayTeamName}>
        {getAwaySideName(gameStateData, streamData)}
      </div>
      <div className={styles.currentPoints}>
        {' '}
        {getHomeSideCurrentSetPoints(gameStateData)} -{' '}
        {getAwaySideCurrentSetPoints(gameStateData)}
      </div>

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

export default CurrentSetSummary;

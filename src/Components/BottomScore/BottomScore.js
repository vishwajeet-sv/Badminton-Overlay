import React, { useContext } from 'react';
import BottomScoreImage from '../../Assets/BottomScoreSetPoints.png';
import BottomScorePointsImage from '../../Assets/BottomScorePoints.png';
import BottomScoreTeamImage from '../../Assets/BottomScoreName.png';
import IndicatorImage from '../../Assets/Indicator.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import {
  getAwaySideCurrentSetPoints,
  getAwaySideName,
  getAwaySideSetWonPoints,
  getBannerSize,
  getBannerUrl,
  getHomeSideCurrentSetPoints,
  getHomeSideName,
  getHomeSideSetWonPoints,
  isHomeSideServing,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const BottomScore = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  console.log('dvjbdsvidj', streamData);
  return (
    <>
      <img
        className={styles.bottomScoreImage}
        src={BottomScoreImage}
        alt="bottomScoreImage"
      />
      <img
        className={styles.bottomScoreTeamImage}
        src={BottomScoreTeamImage}
        alt="bottomScoreImage"
      />
      <img
        className={styles.bottomScorePointsImage}
        src={BottomScorePointsImage}
        alt="bottomScoreImage"
      />
      {isHomeSideServing(gameStateData) && (
        <img className={styles.p1IndicatorImage} src={IndicatorImage} alt="i" />
      )}
      {!isHomeSideServing(gameStateData) && (
        <img className={styles.p2IndicatorImage} src={IndicatorImage} alt="i" />
      )}

      <div className={styles.homeTeamName}>
        {' '}
        {getHomeSideName(gameStateData, streamData)}
      </div>
      <div className={styles.p1SetPoints}>
        {' '}
        {getHomeSideSetWonPoints(gameStateData)}
      </div>
      <div className={styles.p1CurrentPoints}>
        {' '}
        {getHomeSideCurrentSetPoints(gameStateData)}
      </div>

      <div className={styles.awayTeamName}>
        {getAwaySideName(gameStateData, streamData)}
      </div>

      <div className={styles.p2SetPoints}>
        {' '}
        {getAwaySideSetWonPoints(gameStateData)}
      </div>
      <div className={styles.p2CurrentPoints}>
        {' '}
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

export default BottomScore;

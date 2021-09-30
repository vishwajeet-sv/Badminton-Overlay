import React, { useContext } from 'react';
import MatchSummaryImage from '../../Assets/MatchSummary.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import {
  getAwaySideName,
  getAwaySideSetWonPoints,
  getBannerSize,
  getBannerUrl,
  getHomeSideName,
  getHomeSideSetWonPoints,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const MatchSummary = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  return (
    gameStateData.mode === 'LAYER_1' && (
      <>
        <img
          className={styles.matchSummaryImage}
          src={MatchSummaryImage}
          alt="ms"
        />

        <div className={styles.homeTeamName}>
          {' '}
          {getHomeSideName(gameStateData, streamData)}
        </div>
        <div className={styles.awayTeamName}>
          {getAwaySideName(gameStateData, streamData)}
        </div>
        <div className={styles.homePoints}>
          {' '}
          {getHomeSideSetWonPoints(gameStateData)}
        </div>
        <div className={styles.awayPoints}>
          {' '}
          {getAwaySideSetWonPoints(gameStateData)}
        </div>

        <div className={styles.row1Points}>
          <span className={styles.rowPoints}>
            {gameStateData.home_side_stats.points_won.off_regular}
          </span>
          <div className={styles.rowHeading}>Regular</div>{' '}
          <span className={styles.rowPoints}>
            {gameStateData.away_side_stats.points_won.off_regular}
          </span>
        </div>
        <div className={styles.row2Points}>
          <span className={styles.rowPoints}>
            {gameStateData.home_side_stats.points_won.off_smash_shots}
          </span>
          <div className={styles.rowHeading}>Smash shot</div>{' '}
          <span className={styles.rowPoints}>
            {gameStateData.away_side_stats.points_won.off_smash_shots}
          </span>
        </div>
        <div className={styles.row3Points}>
          <span className={styles.rowPoints}>
            {gameStateData.home_side_stats.points_won.off_drop_shots}
          </span>
          <div className={styles.rowHeading}>Drop Shot</div>{' '}
          <span className={styles.rowPoints}>
            {gameStateData.away_side_stats.points_won.off_drop_shots}
          </span>
        </div>
        <div className={styles.row4Points}>
          <span className={styles.rowPoints}>
            {gameStateData.home_side_stats.points_won.off_unforced_errors}
          </span>
          <div className={styles.rowHeading}>Unforced error</div>{' '}
          <span className={styles.rowPoints}>
            {gameStateData.away_side_stats.points_won.off_unforced_errors}
          </span>
        </div>
        {isSizeBannerVisible(gameStateData) && (
          <img
            className={styles[getBannerSize(gameStateData)]}
            src={getBannerUrl(gameStateData)}
            alt="banner"
          />
        )}
      </>
    )
  );
};

export default MatchSummary;

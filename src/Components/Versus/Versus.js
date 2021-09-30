import React, { useContext } from 'react';
import VersusBasicImage from '../../Assets/VersusBasic.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import {
  getAwaySideName,
  getBannerSize,
  getBannerUrl,
  getHomeSideName,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const Versus = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  return (
    <>
      <div>
        {true && (
          <>
            {' '}
            <img
              className={styles.versusBasicImage}
              src={VersusBasicImage}
              alt="bottomScoreImage"
            />
            <div className={styles.homeTeamName}>
              {' '}
              {getHomeSideName(gameStateData, streamData)}
            </div>
            <div className={styles.awayTeamName}>
              {getAwaySideName(gameStateData, streamData)}
            </div>
            {isSizeBannerVisible(gameStateData) && (
              <img
                className={styles[getBannerSize(gameStateData)]}
                src={getBannerUrl(gameStateData)}
                alt="banner"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Versus;

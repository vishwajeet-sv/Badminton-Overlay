import React, { useContext } from 'react';
import VersusBasicImage from '../../Assets/VersusBasic.png';
import VersusDetailedImage from '../../Assets/VersusDetailed.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import DefaultPlayerImage from '../../Assets/DefaultPlayer.png';
import styles from './styles.module.css';
import {
  getAwaySideName,
  getBannerSize,
  getBannerUrl,
  getHomeSideName,
  getPlayersProfilePic,
  isPlayerProfilePicVisible,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const Versus = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  return (
    <>
      <div>
        {!isPlayerProfilePicVisible(gameStateData, streamData) && (
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
        {isPlayerProfilePicVisible(gameStateData, streamData) && (
          <>
            {' '}
            <img
              className={styles.versusDetailedImage}
              src={VersusDetailedImage}
              alt="vsDetailed"
            />
            <div className={styles.homeTeamNameDetailed}>
              {' '}
              {getHomeSideName(gameStateData, streamData)}
            </div>
            <div className={styles.awayTeamNameDetailed}>
              {getAwaySideName(gameStateData, streamData)}
            </div>
            <div className={styles.homeTeamImageContainer}>
              {' '}
              {getPlayersProfilePic(
                gameStateData.configure.home_side.player_one_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={`https://fhp-news-bucket.s3.amazonaws.com/${getPlayersProfilePic(
                    gameStateData.configure.home_side.player_one_id,
                    streamData,
                  )}`}
                  alt="vsDetailed"
                />
              )}
              {!getPlayersProfilePic(
                gameStateData.configure.home_side.player_one_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={DefaultPlayerImage}
                  alt="vsDetailed"
                />
              )}
              {getPlayersProfilePic(
                gameStateData.configure.home_side.player_two_id,
                streamData,
              ) &&
                gameStateData.configure.is_doubles && (
                  <img
                    className={styles.playerImage}
                    src={`https://fhp-news-bucket.s3.amazonaws.com/${getPlayersProfilePic(
                      gameStateData.configure.home_side.player_two_id,
                      streamData,
                    )}`}
                    alt="vsDetailed"
                  />
                )}
              {!getPlayersProfilePic(
                gameStateData.configure.home_side.player_two_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={DefaultPlayerImage}
                  alt="vsDetailed"
                />
              )}
            </div>
            <div className={styles.awayTeamImageContainer}>
              {' '}
              {getPlayersProfilePic(
                gameStateData.configure.away_side.player_one_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={`https://fhp-news-bucket.s3.amazonaws.com/${getPlayersProfilePic(
                    gameStateData.configure.away_side.player_one_id,
                    streamData,
                  )}`}
                  alt="vsDetailed"
                />
              )}
              {!getPlayersProfilePic(
                gameStateData.configure.away_side.player_one_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={DefaultPlayerImage}
                  alt="vsDetailed"
                />
              )}
              {getPlayersProfilePic(
                gameStateData.configure.away_side.player_two_id,
                streamData,
              ) &&
                gameStateData.configure.is_doubles && (
                  <img
                    className={styles.playerImage}
                    src={`https://fhp-news-bucket.s3.amazonaws.com/${getPlayersProfilePic(
                      gameStateData.configure.away_side.player_two_id,
                      streamData,
                    )}`}
                    alt="vsDetailed"
                  />
                )}
              {!getPlayersProfilePic(
                gameStateData.configure.away_side.player_two_id,
                streamData,
              ) && (
                <img
                  className={styles.playerImage}
                  src={DefaultPlayerImage}
                  alt="vsDetailed"
                />
              )}
            </div>
            {isSizeBannerVisible(gameStateData) && (
              <img
                className={styles[`detailed_${getBannerSize(gameStateData)}`]}
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

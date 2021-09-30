import React, { useContext } from 'react';
import CurrentSetSummaryImage from '../../Assets/CurrentSetSummary.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import DefaultPlayerImage from '../../Assets/DefaultPlayer.png';
import styles from './styles.module.css';
import {
  getAwaySideCurrentSetPoints,
  getAwaySideName,
  getBannerSize,
  getBannerUrl,
  getHomeSideCurrentSetPoints,
  getHomeSideName,
  getPlayersProfilePic,
  isPlayerProfilePicVisible,
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
      {isPlayerProfilePicVisible(gameStateData, streamData) && (
        <>
          {gameStateData.configure.is_doubles && (
            <>
              <div className={styles.homeSidePlayerTwoImage}>
                {' '}
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
              <div className={styles.awaySidePlayerTwoImage}>
                {' '}
                {getPlayersProfilePic(
                  gameStateData.configure.away_side.player_two_id,
                  streamData,
                ) && (
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
            </>
          )}

          <div className={styles.homeSidePlayerOneImage}>
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
          </div>
          <div className={styles.awaySidePlayerOneImage}>
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
          </div>
        </>
      )}

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

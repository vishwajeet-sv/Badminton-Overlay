import React, { useContext } from 'react';
import PlayerStatsImage from '../../Assets/PlayerStats.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import DefaultPlayerImage from '../../Assets/DefaultPlayer.png';
import styles from './styles.module.css';
import {
  getBannerSize,
  getBannerUrl,
  getFullPlayerName,
  getPlayersProfilePic,
  isSizeBannerVisible,
} from '../../globalServices/BadmintonGameServices';

const PlayerSpecificContribution = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  return (
    gameStateData.visual_flags.specific_player_contribution_id !== '' &&
    gameStateData.player_stats_map &&
    gameStateData.player_stats_map[
      gameStateData.visual_flags.specific_player_contribution_id
    ] && (
      <>
        <img
          className={styles.playerStatsImage}
          src={PlayerStatsImage}
          alt="bottomScoreImage"
        />
        <div className={styles.playerStatsHeading}>PLAYER STATS</div>
        <div className={styles.playerName}>
          {' '}
          {getFullPlayerName(
            gameStateData.visual_flags.specific_player_contribution_id,
            streamData,
          )}
        </div>
        <div className={styles.row1}>
          <div className={styles.rowInfo}>total points</div>{' '}
          <span className={styles.rowPoints}>
            {
              gameStateData.player_stats_map[
                gameStateData.visual_flags.specific_player_contribution_id
              ].points_won.total
            }
          </span>
        </div>

        <div className={styles.row2}>
          <div className={styles.rowInfo}>smash points</div>{' '}
          <span className={styles.rowPoints}>
            {
              gameStateData.player_stats_map[
                gameStateData.visual_flags.specific_player_contribution_id
              ].points_won.total
            }
          </span>
        </div>
        <div className={styles.row3}>
          <div className={styles.rowInfo}>drop points</div>{' '}
          <span className={styles.rowPoints}>
            {
              gameStateData.player_stats_map[
                gameStateData.visual_flags.specific_player_contribution_id
              ].points_won.total
            }
          </span>
        </div>
        <div className={styles.row4}>
          <div className={styles.rowInfo}>UNFORCED ERRORS</div>{' '}
          <span className={styles.rowPoints}>
            {
              gameStateData.player_stats_map[
                gameStateData.visual_flags.specific_player_contribution_id
              ].points_won.total
            }
          </span>
        </div>
        <div className={styles.playerProfileImage}>
          {getPlayersProfilePic(
            gameStateData.visual_flags.specific_player_contribution_id,
            streamData,
          ) && (
            <img
              className={styles.playerImage}
              src={`https://fhp-news-bucket.s3.amazonaws.com/${getPlayersProfilePic(
                gameStateData.visual_flags.specific_player_contribution_id,
                streamData,
              )}`}
              alt="vsDetailed"
            />
          )}
          {!getPlayersProfilePic(
            gameStateData.visual_flags.specific_player_contribution_id,
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
            className={styles[getBannerSize(gameStateData)]}
            src={getBannerUrl(gameStateData)}
            alt="banner"
          />
        )}
      </>
    )
  );
};

export default PlayerSpecificContribution;

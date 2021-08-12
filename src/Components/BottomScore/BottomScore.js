import React, { useContext } from 'react';
import BottomScoreImage from '../../Assets/BottomScoreSetPoints.png';
import BottomScorePointsImage from '../../Assets/BottomScorePoints.png';
import BottomScoreTeamImage from '../../Assets/BottomScoreName.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import { TeamNameAbrivation } from '../../globalServices/StreamDataServices';

const BottomScore = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);

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
      <div className={styles.homeTeamName}>
        {' '}
        {gameStateData.layer_zero_game_state.p1_name}
      </div>
      <div className={styles.homeScoreGoals}>
        {' '}
        {gameStateData.layer_zero_game_state.home_team_goals}
      </div>
      <div className={styles.awayScoreGoals}>
        {' '}
        {gameStateData.layer_zero_game_state.away_team_goals}
      </div>

      <div className={styles.homeScoreBehinds}>
        {' '}
        {gameStateData.layer_zero_game_state.home_team_behind}
      </div>
      <div className={styles.awayScoreBehinds}>
        {' '}
        {gameStateData.layer_zero_game_state.away_team_behind}
      </div>

      <div className={styles.homeScore}>
        {' '}
        {gameStateData.layer_zero_game_state.home_team_total}
      </div>
      <div className={styles.awayScore}>
        {' '}
        {gameStateData.layer_zero_game_state.away_team_total}
      </div>

      <div className={styles.awayTeamName}>
        {gameStateData.layer_zero_game_state.p2_name}
      </div>
      {gameStateData.current_ads.banner_ad_url !== '' &&
        gameStateData.current_ads.banner_ad_size !== 'banner_full_screen' &&
        gameStateData.current_ads.is_banner_ad_visible && (
          <img
            className={styles[gameStateData.current_ads.banner_ad_size]}
            src={gameStateData.current_ads.banner_ad_url}
            alt="blankbanner"
          />
        )}
    </>
  );
};

export default BottomScore;

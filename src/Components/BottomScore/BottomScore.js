import React, { useContext } from 'react';
import BottomScoreImage from '../../Assets/BottomScoreSetPoints.png';
import BottomScorePointsImage from '../../Assets/BottomScorePoints.png';
import BottomScoreTeamImage from '../../Assets/BottomScoreName.png';
import IndicatorImage from '../../Assets/Indicator.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import styles from './styles.module.css';

const BottomScore = () => {
  const { gameStateData } = useContext(GameStateDataContext);

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
      {gameStateData.layer_zero_game_state.is_p1_serving && (
        <img className={styles.p1IndicatorImage} src={IndicatorImage} alt="i" />
      )}
      {!gameStateData.layer_zero_game_state.is_p1_serving && (
        <img className={styles.p2IndicatorImage} src={IndicatorImage} alt="i" />
      )}
      <div className={styles.homeTeamName}>
        {' '}
        {gameStateData.layer_zero_game_state.p1_name}
      </div>
      <div className={styles.p1SetPoints}>
        {' '}
        {gameStateData.layer_zero_game_state.p1_sets_won}
      </div>
      <div className={styles.p1CurrentPoints}>
        {' '}
        {gameStateData.layer_zero_game_state.p1_current_set_points}
      </div>

      <div className={styles.awayTeamName}>
        {gameStateData.layer_zero_game_state.p2_name}
      </div>

      <div className={styles.p2SetPoints}>
        {' '}
        {gameStateData.layer_zero_game_state.p2_current_set_points}
      </div>
      <div className={styles.p2CurrentPoints}>
        {' '}
        {gameStateData.layer_zero_game_state.p2_current_set_points}
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

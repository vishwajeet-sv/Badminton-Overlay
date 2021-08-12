import React, { useContext } from 'react';
import BottomScoreTeamImage from '../../Assets/MatchSummary.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';

const MatchSummary = () => {
  const { gameStateData } = useContext(GameStateDataContext);
  const { streamData } = useContext(StreamDataContext);
  const getCurrentQuerter = () => {
    if (gameStateData.layer_zero_game_state.quarter_number === 1) {
      return 'Q1';
    }
    if (gameStateData.layer_zero_game_state.quarter_number === 2) {
      return 'Q2';
    }
    if (gameStateData.layer_zero_game_state.quarter_number === 3) {
      return 'Q3';
    }
    if (gameStateData.layer_zero_game_state.quarter_number === 4) {
      return 'Q4';
    }
    return '';
  };

  return (
    <>
      {' '}
      <img
        className={styles.matchSummaryImage}
        src={BottomScoreTeamImage}
        alt="ms"
      />
      {streamData.teams_info.home_team.logo !== '' && (
        <img
          className={styles.homeTeamLogo}
          src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.home_team.logo}`}
          alt="bottomScoreImage"
        />
      )}
      <div className={styles.homeTeamName}>
        {streamData.teams_info.home_team.name}{' '}
      </div>
      <div className={styles.homeTeamScore}>
        {gameStateData.layer_zero_game_state.home_team_total}
      </div>
      {streamData.teams_info.away_team.logo !== '' && (
        <img
          className={styles.awayTeamLogo}
          src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.away_team.logo}`}
          alt="bottomScoreImage"
        />
      )}
      <div className={styles.awayTeamName}>
        {streamData.teams_info.away_team.name}{' '}
      </div>
      <div className={styles.awayTeamScore}>
        {gameStateData.layer_zero_game_state.away_team_total}
      </div>
      {gameStateData.layer_zero_game_state.quarter_number !== 4 && (
        <div className={styles.quarter}>{getCurrentQuerter()}</div>
      )}
      {gameStateData.layer_zero_game_state.quarter_number === 4 && (
        <div className={styles.finalQuarter}>
          {' '}
          <span>FINAL </span>
          <span>SCORE</span>
        </div>
      )}
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

export default MatchSummary;

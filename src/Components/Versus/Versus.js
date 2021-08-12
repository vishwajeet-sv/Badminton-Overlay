import React, { useContext } from 'react';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import EventDataContext from '../../contexts/EventDataContext';
import VersusTopImage from '../../Assets/VersusTop.png';
import VersusImage from '../../Assets/Versus.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';

const Versus = () => {
  const { streamData } = useContext(StreamDataContext);
  const { eventData } = useContext(EventDataContext);
  const { gameStateData } = useContext(GameStateDataContext);

  return (
    <>
      <div className={styles.homeVersusContainer}>
        {eventData && (
          <>
            <img
              className={styles.versusTopImage}
              src={VersusTopImage}
              alt="VersusLogoBar"
            />
            <div className={styles.eventName}>
              {eventData && eventData.name}
            </div>
            {/*<div className={styles.sportvotInfo}>www.sportvot.com</div>*/}
            <div className={styles.eventLocation}>
              {eventData && eventData.location}
            </div>
          </>
        )}
        <img
          className={styles.versusImage}
          src={VersusImage}
          alt="VersusLogoBar"
        />
        {streamData.teams_info.home_team.logo !== '' && (
          <img
            className={styles.homeVersusLogo}
            src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.home_team.logo}`}
            alt="bottomScoreImage"
          />
        )}

        {streamData.teams_info.away_team.logo !== '' && (
          <img
            className={styles.awayVersusLogo}
            src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.away_team.logo}`}
            alt="bottomScoreImage"
          />
        )}

        <div className={styles.homeTeamName}>
          {' '}
          {streamData.teams_info.home_team.name}
        </div>
        <div className={styles.awayTeamName}>
          {' '}
          {streamData.teams_info.away_team.name}
        </div>
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

export default Versus;

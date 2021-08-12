import React, { useContext } from 'react';
import StreamDataContext from '../../contexts/StreamDataContext';
import styles from './styles.module.css';
import LineupTitle from '../../Assets/LineupTitle.png';
import LineupsBackground from '../../Assets/LineupsBackground.png';
import HomeTeamPlayerLineup from '../../Assets/HomeTeamPlayerLineup.png';
import AwayTeamPlayerLineup from '../../Assets/Lineup.png';
import GameStateDataContext from '../../contexts/GameStateDataContext';

function TeamsLineup() {
  const { streamData } = useContext(StreamDataContext);
  const { gameStateData } = useContext(GameStateDataContext);

  return (
    <div className={styles.teamsLineup}>
      <img
        className={styles.backgroundImage}
        src={LineupsBackground}
        alt="lineupHead"
      />
      <img
        className={styles.teamsLineupTitleImage}
        src={LineupTitle}
        alt="lineupHead"
      />

      <div className={styles.teamsLineupTeamHeadingName}>
        {gameStateData.layer_zero_game_state.visual_flags
          .is_away_team_lineup_visible
          ? streamData.teams_info.away_team.name
          : streamData.teams_info.home_team.name}
      </div>

      {streamData.teams_info.home_team.logo !== '' && (
        <img
          className={styles.homeTeamLogo}
          src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.home_team.logo}`}
          alt="bottomScoreImage"
        />
      )}
      {streamData.teams_info.away_team.logo !== '' && (
        <img
          className={styles.awayTeamLogo}
          src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.teams_info.away_team.logo}`}
          alt="bottomScoreImage"
        />
      )}
      {gameStateData.layer_zero_game_state.visual_flags
        .is_home_team_lineup_visible && (
        <div className={styles.teamsLineupTeamContainer}>
          {Object.getOwnPropertyNames(
            streamData.teams_info.home_team.lineup,
          ).map(e => {
            if (streamData.teams_info.home_team.lineup[e] !== 'STARTING')
              return null;
            if (
              streamData.teams_info.home_team.team_players[e].is_dummy_plr &&
              !streamData.teams_info.home_team.team_players[e]
                .is_dummy_plr_edited
            )
              return null;
            return (
              <div key={e}>
                <div className={styles.teamLineupMapInfo}>
                  <img src={AwayTeamPlayerLineup} alt="player" />
                  <p>
                    {streamData.teams_info.home_team.team_players[e].first_name}{' '}
                    {streamData.teams_info.home_team.team_players[e].last_name}
                  </p>
                  {/* <span>
                    {streamData.teams_info.home_team.team_players[e].jersey_num}
                 </span>*/}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {gameStateData.layer_zero_game_state.visual_flags
        .is_away_team_lineup_visible && (
        <div className={styles.teamsLineupTeamContainer}>
          {Object.getOwnPropertyNames(
            streamData.teams_info.away_team.lineup,
          ).map(e => {
            if (streamData.teams_info.away_team.lineup[e] !== 'STARTING')
              return null;
            if (
              streamData.teams_info.away_team.team_players[e].is_dummy_plr &&
              !streamData.teams_info.away_team.team_players[e]
                .is_dummy_plr_edited
            )
              return null;
            return (
              <div key={e}>
                <div className={styles.teamLineupMapInfo}>
                  <img src={AwayTeamPlayerLineup} alt="player" />
                  <p>
                    {streamData.teams_info.away_team.team_players[e].first_name}{' '}
                    {streamData.teams_info.away_team.team_players[e].last_name}
                  </p>
                  {/* <span>
                    {streamData.teams_info.away_team.team_players[e].jersey_num}
                 </span>*/}
                </div>
              </div>
            );
          })}
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
    </div>
  );
}

export default TeamsLineup;

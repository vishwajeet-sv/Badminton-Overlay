const getNameAbr = teamName => {
  const words = teamName.split(' ');

  if (words.length === 1) {
    const name = teamName.toUpperCase();
    return name.substring(0, 3);
  }
  const abbr = [];

  for (let i = 0; i < words.length; i += 1) {
    abbr.push(words[i].charAt(0));
  }
  return abbr.join('').toUpperCase();
};
const TeamNameAbrivation = (id, streamData) => {
  if (!streamData.teams_info) return '';
  const homeTeamid = streamData.teams_info.home_team.team_id;

  if (id === homeTeamid) {
    const teamName = streamData.teams_info.home_team.name;
    return getNameAbr(teamName);
  }
  const teamName = streamData.teams_info.away_team.name;
  return getNameAbr(teamName);
};

const getFirstPlayerName = (playerId, teamsInfoData) => {
  if (!playerId) return '';
  if (teamsInfoData.teams_info.home_team.team_players[playerId]) {
    return `${teamsInfoData.teams_info.home_team.team_players[playerId].first_name}`;
  }
  if (!teamsInfoData.teams_info.away_team.team_players[playerId]) return '';
  return `${teamsInfoData.teams_info.away_team.team_players[playerId].first_name}`;
};

const getLastPlayerName = (playerId, teamsInfoData) => {
  if (!playerId) return '';
  if (teamsInfoData.teams_info.home_team.team_players[playerId]) {
    return `${teamsInfoData.teams_info.home_team.team_players[playerId].last_name}`;
  }
  if (!teamsInfoData.teams_info.away_team.team_players[playerId]) return '';
  return `${teamsInfoData.teams_info.away_team.team_players[playerId].last_name}`;
};

const getFullPlayerName = (playerId, teamsInfoData) => {
  if (!playerId) return '';
  if (
    !teamsInfoData.teams_info.home_team.team_players[playerId] &&
    !teamsInfoData.teams_info.away_team.team_players[playerId]
  )
    return '';

  const playerName = teamsInfoData.teams_info.home_team.team_players[playerId]
    ? teamsInfoData.teams_info.home_team.team_players[playerId]
    : teamsInfoData.teams_info.away_team.team_players[playerId];

  return `${playerName.first_name} ${playerName.last_name}`;
};

const getPlayersProfilePic = (playerId, teamsInfoData) => {
  if (!playerId) return '';
  if (
    !teamsInfoData.teams_info.home_team.team_players[playerId] &&
    !teamsInfoData.teams_info.away_team.team_players[playerId]
  )
    return '';
  const playerInfo = teamsInfoData.teams_info.home_team.team_players[playerId]
    ? teamsInfoData.teams_info.home_team.team_players[playerId]
    : teamsInfoData.teams_info.away_team.team_players[playerId];

  return playerInfo.profile_image;
};

const isHomeSideServing = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.is_p1_serving;
  return gameState.set_data.is_home_side_serving;
};

const isAwaySideServing = gameState => {
  if (gameState.mode === 'LAYER_0')
    return !gameState.layer_zero_game_state.is_p1_serving;
  return !gameState.set_data.is_home_side_serving;
};
const getIsBlankVisible = gameState => {
  const visualFlags =
    gameState.mode === 'LAYER_0'
      ? gameState.layer_zero_game_state.visual_flags
      : gameState.visual_flags;
  return visualFlags.is_blank;
};
const getIsBottomScoreVisible = gameState => {
  const visualFlags =
    gameState.mode === 'LAYER_0'
      ? gameState.layer_zero_game_state.visual_flags
      : gameState.visual_flags;
  return visualFlags.is_score_visible;
};

const getIsVersusVisible = gameState => {
  const visualFlags =
    gameState.mode === 'LAYER_0'
      ? gameState.layer_zero_game_state.visual_flags
      : gameState.visual_flags;
  return visualFlags.is_versus_visible;
};

const getCurrentSetSummaryVisible = gameState => {
  return gameState.mode === 'LAYER_0'
    ? gameState.layer_zero_game_state.visual_flags.is_match_summary_visible
    : gameState.visual_flags.is_current_set_summary_visible;
};

const getPlayerSpecificInfoVisible = gameState => {
  return gameState.mode === 'LAYER_0'
    ? false
    : gameState.visual_flags.is_specific_player_contribution_visible;
};

const getIsMatchSummaryVisible = gameState => {
  return gameState.mode === 'LAYER_0'
    ? false
    : gameState.visual_flags.is_match_summary_visible;
};

const getHomeSideName = (gameState, streamData) => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_name;
  if (!gameState.configure.is_doubles) {
    return getFirstPlayerName(
      gameState.configure.home_side.player_one_id,
      streamData,
    );
  }
  if (gameState.configure.is_doubles) {
    return `${getFirstPlayerName(
      gameState.configure.home_side.player_one_id,
      streamData,
    )}/${getFirstPlayerName(
      gameState.configure.home_side.player_two_id,
      streamData,
    )}`;
  }
  return '';
};
const getAwaySideName = (gameState, streamData) => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_name;
  if (!gameState.configure.is_doubles) {
    return getFirstPlayerName(
      gameState.configure.away_side.player_one_id,
      streamData,
    );
  }
  if (gameState.configure.is_doubles) {
    return `${getFirstPlayerName(
      gameState.configure.away_side.player_one_id,
      streamData,
    )}/${getFirstPlayerName(
      gameState.configure.away_side.player_two_id,
      streamData,
    )}`;
  }
  return '';
};

const getHomeSideSetWonPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_sets_won;
  if (!gameState.set_data) return 0;
  return gameState.set_data.home_side_sets_won;
};

const getAwaySideSetWonPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_sets_won;
  if (!gameState.set_data) return 0;
  return gameState.set_data.away_side_sets_won;
};

const getHomeSideCurrentSetPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_current_set_points;
  if (
    !gameState.set_data ||
    !gameState.set_data.sets[gameState.set_data.current_set_number]
  )
    return 0;
  return gameState.set_data.sets[gameState.set_data.current_set_number]
    .home_side_points;
};

const getAwaySideCurrentSetPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_current_set_points;
  if (
    !gameState.set_data ||
    !gameState.set_data.sets[gameState.set_data.current_set_number]
  )
    return 0;
  return gameState.set_data.sets[gameState.set_data.current_set_number]
    .away_side_points;
};

const isSizeBannerVisible = gameStateData => {
  return (
    gameStateData.current_ads.banner_ad_size !== 'banner_full_screen' &&
    gameStateData.current_ads.is_banner_ad_visible
  );
};

const getBannerSize = gameStateData => {
  return gameStateData.current_ads.banner_ad_size;
};
const getBannerUrl = gameStateData => {
  return gameStateData.current_ads.banner_ad_url;
};

const isPlayerProfilePicVisible = (gameState, streamData) => {
  if (gameState.mode === 'LAYER_0') return false;
  if (!gameState.configure.is_doubles) {
    if (
      !getPlayersProfilePic(
        gameState.configure.home_side.player_one_id,
        streamData,
      ) ||
      !getPlayersProfilePic(
        gameState.configure.away_side.player_one_id,
        streamData,
      )
    )
      return false;
    return true;
  }
  if (gameState.configure.is_doubles) {
    if (
      (!getPlayersProfilePic(
        gameState.configure.home_side.player_one_id,
        streamData,
      ) ||
        !getPlayersProfilePic(
          gameState.configure.away_side.player_one_id,
          streamData,
        )) &&
      (!getPlayersProfilePic(
        gameState.configure.home_side.player_two_id,
        streamData,
      ) ||
        !getPlayersProfilePic(
          gameState.configure.away_side.player_two_id,
          streamData,
        ))
    )
      return false;
    return true;
  }
  return false;
};

export default getIsBlankVisible;
export {
  TeamNameAbrivation,
  isAwaySideServing,
  getFirstPlayerName,
  getLastPlayerName,
  getFullPlayerName,
  getPlayersProfilePic,
  getIsBlankVisible,
  getIsBottomScoreVisible,
  getHomeSideName,
  getAwaySideName,
  getHomeSideSetWonPoints,
  getAwaySideSetWonPoints,
  getHomeSideCurrentSetPoints,
  getAwaySideCurrentSetPoints,
  isSizeBannerVisible,
  getBannerSize,
  getBannerUrl,
  isHomeSideServing,
  isPlayerProfilePicVisible,
  getIsVersusVisible,
  getIsMatchSummaryVisible,
  getCurrentSetSummaryVisible,
  getPlayerSpecificInfoVisible,
};

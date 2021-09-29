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

const getHomeSideName = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_name;
  return 'df';
};
const getAwaySideName = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_name;
  return 'df';
};

const getHomeSideSetWonPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_sets_won;
  if (!gameState.set_data) return 0;
  return 'df';
};

const getAwaySideSetWonPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_sets_won;
  if (!gameState.set_data) return 0;
  return 'df';
};

const getHomeSideCurrentSetPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p1_current_set_points;
  if (!gameState.set_data) return 0;
  return 'df';
};

const getAwaySideCurrentSetPoints = gameState => {
  if (gameState.mode === 'LAYER_0')
    return gameState.layer_zero_game_state.p2_current_set_points;
  if (!gameState.set_data) return 0;
  return 'df';
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

export default getIsBlankVisible;
export {
  TeamNameAbrivation,
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
};

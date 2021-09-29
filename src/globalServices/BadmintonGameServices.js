const getTeamId = (playerId, streamData) => {
  if (streamData.teams_info.home_team.team_players[playerId])
    return streamData.teams_info.home_team.team_id;
  return streamData.teams_info.away_team.team_id;
};
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

export default getTeamId;
export {
  getTeamId,
  TeamNameAbrivation,
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

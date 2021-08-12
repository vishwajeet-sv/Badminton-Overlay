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

export default getTeamId;
export { getTeamId, TeamNameAbrivation };

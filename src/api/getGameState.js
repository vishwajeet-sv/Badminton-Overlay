import { BASE_URL } from '../constants';

const getGameState = async id => {
  const response = await fetch(
    `${BASE_URL}/api/v2/scoring/game-state/badminton/${id}`,
  );
  const data = await response.json();

  return data;
};

export default getGameState;

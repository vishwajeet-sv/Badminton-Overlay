import { BASE_URL } from '../constants';

const getEventInfo = async id => {
  const response = await fetch(`${BASE_URL}/api/v2/events/${id}`);
  const data = await response.json();

  return data;
};

export default getEventInfo;

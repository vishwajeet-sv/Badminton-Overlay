import { BASE_URL } from '../constants';

const getStreamInfo = async id => {
  const response = await fetch(`${BASE_URL}/api/v2/streams/${id}`);
  const data = await response.json();
  return data;
};

export default getStreamInfo;

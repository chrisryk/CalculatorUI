import { getData } from './apiService';

const path = '/operations/history';

const getHistory = async () => {
  return await getData(path)
    .then((data) => data)
    .catch((error) => `Error: ${error.message}`);
};

export default getHistory;

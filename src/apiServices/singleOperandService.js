import { postData } from './apiService';

const path = '/operations/single-operand';

const postSingleOperand = async (value, operator) => {
  return await postData(path, {
    value: value,
    operator: operator,
  })
    .then((data) => data)
    .catch((error) => `Error: ${error.message}`);
};

export default postSingleOperand;

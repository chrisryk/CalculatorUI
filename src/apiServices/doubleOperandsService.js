import { postData } from './apiService';

const path = '/operations/double-operands';

const postDoubleOperands = async (firstOperand, secondOperand, operator) => {
  return await postData(path, {
    firstOperand: firstOperand,
    secondOperand: secondOperand,
    operator: operator,
  })
    .then((data) => data)
    .catch((error) => `Error: ${error.message}`);
};

export default postDoubleOperands;

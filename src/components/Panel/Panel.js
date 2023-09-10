import { useState } from 'react';
import styles from './Panel.module.scss';
import Button from '../Button/Button';
import Display from '../Display/Display';
import postDoubleOperands from '../../apiServices/doubleOperandsService';
import postSingleOperand from '../../apiServices/singleOperandService';
import buttonValues from './constants/buttonValues';

const Panel = () => {
  const [firstOperand, setFirstOperand] = useState('');
  const [secondOperand, setSecondOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');

  const clearOperation = () => {
    setFirstOperand('');
    setSecondOperand('');
    setOperator('');
  };

  const handleSingleOperandOperatorClick = (operator) => {
    if (secondOperand) {
      setResult('Use only one operand');
      return;
    }

    postSingleOperand(firstOperand, operator).then((data) => setResult(data));
    clearOperation();
  };

  const handleEqualsClick = () => {
    postDoubleOperands(firstOperand, secondOperand, operator).then((data) =>
      setResult(data),
    );
    clearOperation();
  };

  return (
    <div className={styles.panel}>
      <Display
        firstOperand={firstOperand}
        secondOperand={secondOperand}
        operator={operator}
        result={result}
      />
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonsDigitsContainer}>
          {buttonValues.digits.map((value, index) => (
            <Button
              value={value}
              key={index}
              onClick={() => {
                operator
                  ? setSecondOperand((prev) => prev + value)
                  : setFirstOperand((prev) => prev + value);
              }}
            />
          ))}
        </div>
        <div>
          {buttonValues.doubleOperandsOperators.map((operator, index) => (
            <Button
              value={operator}
              key={index}
              onClick={() => setOperator(operator)}
            />
          ))}
          {buttonValues.singleOperandOperators.map((operator, index) => (
            <Button
              value={operator}
              key={index}
              onClick={() => handleSingleOperandOperatorClick(operator)}
            />
          ))}
          <Button
            value={buttonValues.equals}
            onClick={() => handleEqualsClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;

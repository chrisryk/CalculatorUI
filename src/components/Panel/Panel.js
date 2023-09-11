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
    setResult('');
  };

  const handleSingleOperandOperatorClick = (operator) => {
    if (secondOperand) {
      setResult('Use only one operand');
      return;
    }

    postSingleOperand(firstOperand, operator).then((data) => setResult(data));
    clearOperation();
  };

  const checkOperand = (currentValue, clickedValue) => {
    if (
      clickedValue === buttonValues.changeSign &&
      currentValue[0] === buttonValues.minus
    ) {
      return currentValue.substring(1);
    } else if (
      clickedValue === buttonValues.changeSign &&
      currentValue[0] !== buttonValues.minus
    ) {
      return buttonValues.minus + currentValue;
    } else if (
      clickedValue === buttonValues.comma &&
      currentValue.includes('.')
    ) {
      return currentValue;
    } else if (
      clickedValue === buttonValues.comma &&
      (!currentValue || currentValue === buttonValues.zero)
    ) {
      return buttonValues.zero + buttonValues.comma;
    } else if (
      clickedValue === buttonValues.zero &&
      currentValue === buttonValues.zero
    ) {
      return currentValue;
    } else if (
      clickedValue !== buttonValues.zero &&
      currentValue === buttonValues.zero
    ) {
      return clickedValue;
    }
    return currentValue + clickedValue;
  };

  const handleDigitsPanelClick = (value) => {
    !operator
      ? setFirstOperand((prev) => checkOperand(prev, value))
      : setSecondOperand((prev) => checkOperand(prev, value));
  };

  const handleOperatorClick = (operator) => {
    if (firstOperand.endsWith(buttonValues.comma)) {
      setFirstOperand((prev) => prev.slice(0, -1));
    } else if (!firstOperand) {
      setFirstOperand(buttonValues.zero);
    }

    setOperator(operator);
  };

  const handleBackspaceClick = () => {
    !operator
      ? setFirstOperand((prev) => prev.slice(0, -1))
      : setSecondOperand((prev) => prev.slice(0, -1));
  };

  const handleEqualsClick = () => {
    if (!secondOperand) {
      clearOperation();
      setResult(firstOperand);
      return;
    }

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
          {[
            ...buttonValues.digits,
            buttonValues.changeSign,
            buttonValues.zero,
            buttonValues.comma,
          ].map((value, index) => (
            <Button
              value={value}
              key={index}
              onClick={() => handleDigitsPanelClick(value)}
            />
          ))}
        </div>

        <div className={styles.operationsContainer}>
          <div>
            <Button
              value={buttonValues.clear}
              onClick={() => clearOperation()}
            />
            <Button
              value={buttonValues.backspace}
              onClick={() => handleBackspaceClick()}
            />
          </div>

          <div>
            {buttonValues.doubleOperandsOperators.map((operator, index) => (
              <Button
                value={operator}
                key={index}
                onClick={() => handleOperatorClick(operator)}
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
    </div>
  );
};

export default Panel;

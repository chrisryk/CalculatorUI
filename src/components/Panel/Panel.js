import { useState } from 'react';
import styles from './Panel.module.scss';
import Button from '../Button/Button';
import Display from '../Display/Display';
import postDoubleOperands from '../../apiServices/doubleOperandsService';
import postSingleOperand from '../../apiServices/singleOperandService';
import buttonValues from './constants/buttonValues';
import { checkOperand } from './helpers/panelHelpers';
import {
  incorrectInput,
  tooManyOperands,
  valueInteger,
} from './constants/messages';

const Panel = ({ setDataWasPosted }) => {
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

  const handleSingleOperandOperatorClick = (operator) => {
    if (secondOperand) {
      clearOperation();
      setResult(tooManyOperands);
      return;
    } else if (!firstOperand) {
      clearOperation();
      setResult(incorrectInput);
      return;
    } else if (firstOperand.includes(buttonValues.comma)) {
      setResult(valueInteger);
      return;
    }

    postSingleOperand(firstOperand, operator).then((data) => {
      setResult(data);
      setDataWasPosted(true);
    });
    clearOperation();
  };

  const handleEqualsClick = () => {
    if (!secondOperand) {
      clearOperation();
      setResult(incorrectInput);
      return;
    }

    postDoubleOperands(firstOperand, secondOperand, operator).then((data) =>
      setResult(data),
    );
    clearOperation();
    setDataWasPosted(true);
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

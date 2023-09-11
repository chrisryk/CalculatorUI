import buttonValues from '../constants/buttonValues';

export const checkOperand = (currentValue, clickedValue) => {
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

import styles from './Display.module.scss';

const Display = ({ firstOperand, secondOperand, operator, result }) => {
  return (
    <div className={styles.display}>
      <span>
        {result ? result : `${firstOperand}${operator}${secondOperand}`}
      </span>
    </div>
  );
};

export default Display;

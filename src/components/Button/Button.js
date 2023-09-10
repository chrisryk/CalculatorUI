import styles from './Button.module.scss';

const Button = ({ value, onClick }) => {
  return <input type="button" value={value} onClick={onClick} className={styles.button} />;
};

export default Button;

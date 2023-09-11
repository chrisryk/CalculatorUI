import { useState, useEffect } from 'react';
import getHistory from '../../apiServices/historyService';
import styles from './History.module.scss';

const History = ({ dataWasPosted, setDataWasPosted }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFetchSucces, setInitialFetchSuccess] = useState(false);

  useEffect(() => {
    if (!initialFetchSucces || dataWasPosted) {
      getHistory()
        .then((result) => {
          setData(result.value);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });

      setDataWasPosted(false);
      !initialFetchSucces || setInitialFetchSuccess(true);
    }
  }, [dataWasPosted]);

  return (
    <div className={styles.data}>
      <span className={styles.title}>Operation history:</span>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((r, index) => (
          <div key={index}>{`${r.firstValue}${r.operator}${
            r.secondValue || ''
          }=${r.result}`}</div>
        ))
      )}
    </div>
  );
};

export default History;

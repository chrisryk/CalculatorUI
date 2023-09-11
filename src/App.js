import { useState } from 'react';
import Panel from './components/Panel/Panel';
import History from './components/History/History';
import styles from './App.module.scss';

function App() {
  const [dataWasPosted, setDataWasPosted] = useState(false);

  return (
    <div className={styles.contentContainer}>
      <Panel setDataWasPosted={setDataWasPosted} />
      <History
        dataWasPosted={dataWasPosted}
        setDataWasPosted={setDataWasPosted}
      />
    </div>
  );
}

export default App;

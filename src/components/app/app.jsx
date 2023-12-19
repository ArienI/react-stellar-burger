import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Header from '../Header';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //  isLoading в false.
    //  таймаут:
    setTimeout(() => {
      setIsLoading(false);
      // 3 секунды задержки
    }, 3000);
  }, []);

  if (isLoading) {
    return <div className={styles.preloader}>... =^.^=❤meow❤=^.^= ...</div>;
  }

  return (
    <div className={styles.app}>
      <Header />
      <pre style={{ margin: 'auto', fontSize: '1.5rem' }}>
        ...=^.^=❤meow❤=^.^=...
      </pre>
    </div>
  );
}

export default App;

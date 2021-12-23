import React, { useState } from 'react';

import styles from './styles.module.scss';

const ProgressBar = ({ value }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${value}%`,
    };

    setStyle(newStyle);
  }, 50);

  return (
    <div className={styles.progress}>
      <div className={styles['progress-value']} style={style} />
    </div>
  );
};

export default ProgressBar;

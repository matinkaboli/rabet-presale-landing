import React from 'react';

import WalletLayout from 'src/components/Layout';
import ProgressBar from 'src/components/ProgressBar';

import styles from './styles.module.scss';

const classNames = require('classnames')

const PreSaleProgress = () => {
  const points = Array(7).fill(
    {
      id: Math.floor(Math.random() * 100),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  );

  return (
    <WalletLayout>
      <div className={classNames('base-padding', styles.layout)}>
        <h1 className={styles.title}>
          RBT Pre-sale is Live
          <span className={classNames(styles.status, styles['status-success'])} />
        </h1>
        <p className={styles.par}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas
          purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus
          aenean vel elit scelerisque
        </p>

        <div className={styles.card}>
          <div className={styles.progress}>
            <span>$120,000 </span>
            <span className={styles['progress-letter']}>of </span>
            <span>$400,000 </span>
            <span className={styles['progress-separator']}>| </span>
            <span className={classNames(styles['progress-success'], styles['progress-status-success'])}>
              (20%)
            </span>
          </div>
          <div className={styles['progress-bar']}><ProgressBar value={20} /></div>
        </div>

        <div className={styles.card}>
          <h2 className={styles['card-title']}>How to participate?</h2>
          <ul className={styles.list}>
            {points.map((point) => (
              <li key={point.id}>
                <span className={styles['bullet-point']} />{point.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </WalletLayout>
  );
};

export default PreSaleProgress;

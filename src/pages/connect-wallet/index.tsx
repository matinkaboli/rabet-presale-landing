import React from 'react';

import WalletLayout from 'src/components/Layout';
import FingerPrint from 'src/svgs/fingerPrint';
import Loading from 'src/svgs/Loading';

import styles from './styles.module.scss';

const classNames = require('classnames')

const ConnectWallet = () => {
  // const sampleStatus = 'error';
  let sampleStatus = 'default';
  const btnText = sampleStatus === 'error' ? 'Try Again' : 'Connect wallet';

  return (
    <WalletLayout basic>
      <div className={classNames('base-padding', styles.layout)}>
        <div className="flex flex-column items-center">
          <div className={styles.card}>
            <div className={
              classNames(
                styles['svg-container'],
                sampleStatus === 'error' && styles['svg-danger'],
              )
            }
            >
              <FingerPrint />
            </div>
            <div className={styles['card-text']}>Please connect your Rabet</div>
            <button
              type="button"
              className={classNames('btn-primary', styles.btn)}
            >
              {btnText}
            </button>
          </div>

          <div className={classNames(styles.card, 'flex justify-center items-center')}>
            <div className={styles.loading}>
              <Loading />
            </div>
          </div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default ConnectWallet;

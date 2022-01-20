import React, { useState } from 'react';
import { useRouter } from 'next/router';

import useConnect from 'src/hooks/userConnect';
import WalletLayout from 'src/components/Layout';
import FingerPrint from 'src/svgs/fingerPrint';
import Loading from 'src/svgs/Loading';

import styles from './styles.module.scss';

const classNames = require('classnames');

const ConnectWallet = () => {
  const router = useRouter();
  const { isConnected } = useConnect();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('default');

  if (isConnected) {
    router.push('/dashboard');
    return <p>loading.</p>;
  }

  const handleClick = () => {
    setLoading(true);

    global.rabet.connect()
      .then((r) => {
        global.sessionStorage.setItem('connect', 'y');
        setLoading(false);
        router.push('/dashboard');
      })
      .catch(() => {
        setStatus('error');
        setLoading(false);
      });
  };

  const btnText = status === 'error' ? 'Try Again' : 'Connect wallet';

  return (
    <WalletLayout basic useWallet={false}>
      <div className={classNames('base-padding', styles.layout)}>
        <div className="flex flex-column items-center">
          {loading
            ? (
              <div className={classNames(styles.card, 'flex justify-center items-center')}>
                <div className={styles.loading}>
                  <Loading />
                </div>
              </div>
            ) : (
              <div className={styles.card}>
                <div className={
                  classNames(
                    styles['svg-container'],
                    status === 'error' && styles['svg-danger'],
                  )
                }
                >
                  <FingerPrint />
                </div>
                <div className={styles['card-text']}>
                  {status === 'error'
                    ? 'Please connect your Rabet'
                    : 'Please connect your Rabet'}
                </div>
                <button
                  type="button"
                  onClick={handleClick}
                  className={classNames('btn-primary', styles.btn)}
                >
                  {btnText}
                </button>
              </div>
            )}
        </div>
      </div>
    </WalletLayout>
  );
};

export default ConnectWallet;

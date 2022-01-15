import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import WalletLayout from 'src/components/Layout';
import PresaleProgress from 'src/blocks/Presale/Progress';
import PresaleOver from 'src/blocks/Presale/Over';
import PresaleCountDown from 'src/blocks/Presale/CountDown';
import { Presale, AssetType } from 'src/models';
import Loading from 'src/components/Loading';

import styles from './styles.module.scss';

const classNames = require('classnames');

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setPresaleStatus] = useState<Presale>('unstarted');

  const { data: startTime, error: error1 } = useSWR('/v1/get-timer');
  const { data: progressData, error: error2 } = useSWR('/v1/landing');

  useEffect(() => {
    const presaleDate = new Date(startTime?.PresaleStart);
    const nowPlus7days = new Date(startTime?.PresaleStart);
    nowPlus7days.setDate(presaleDate.getDate() + 7);
  
    const now = new Date();
  
    const isInProgress = +now > +presaleDate;
    const isOver = +now > +nowPlus7days;
    
    if (isOver) {
      setPresaleStatus('over');
    } else if (isInProgress) {
      setPresaleStatus('progress');
    }

    (async () => {
      if (isInProgress) {
        if (progressData) {
          const { data: result } = await axios.get(`https://horizon.stellar.org/accounts/${progressData.Address}`);
          const foundAsset = result.balances.find((x: AssetType) =>
            x.asset_code === progressData.AssetCode && x.asset_issuer === progressData.AssetIssuer);

          if (foundAsset) {
            if (parseFloat(foundAsset.balance) >= progressData.TotalRBT) {
              setPresaleStatus('over');
            }
          }
        }
      }
    })();
  }, [startTime, progressData]);

  if (!startTime && !error1) {
    return (
      <WalletLayout basic={false} useWallet={false}>
        <div className={classNames('base-padding', styles.layout)}>
          <Loading />
        </div>
      </WalletLayout>
    );
  }

  const generatePresale = () => {
    if (status === 'over') {
      return <PresaleOver />;
    }

    if (status === 'unstarted') {
      return (
        <PresaleCountDown
          setPresaleStatus={setPresaleStatus}
          startingTime={startTime?.PresaleStart}
        />
      );
    }

    return <PresaleProgress />;
  };

  return (
    <WalletLayout basic={status === 'over'} useWallet={status === 'over'}>
      <div className={classNames('base-padding', styles.layout)}>
        {generatePresale()}
      </div>
    </WalletLayout>
  );
};

export default Home;

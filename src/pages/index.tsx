import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { DateTime } from 'luxon';

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
    const presaleDate = DateTime.fromISO(startTime?.PresaleStart, { zone: 'utc' });
    const startingTimeAfterWeek = presaleDate.plus({ weeks: 1 });
    const now = DateTime.utc();

    const isInProgress = now.valueOf() > presaleDate.valueOf();
    const isOver = now.valueOf() > startingTimeAfterWeek.valueOf();

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
    <WalletLayout basic={status === 'over'} useWallet>
      <div className={classNames('base-padding', styles.layout)}>
        {generatePresale()}
      </div>
    </WalletLayout>
  );
};

export default Home;

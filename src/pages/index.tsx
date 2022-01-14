import type { NextPage } from 'next';
import { useState } from 'react';

import WalletLayout from 'src/components/Layout';
import PresaleProgress from 'src/blocks/Presale/Progress';
import PresaleOver from 'src/blocks/Presale/Over';
import PresaleCountDown from 'src/blocks/Presale/CountDown';
import { Presale } from 'src/models';
import useFetch from 'src/hooks/useFetch';
import Loading from 'src/components/Loading';

import styles from './styles.module.scss';

const classNames = require('classnames');

const Home: NextPage = () => {
  const { data, error, loading } = useFetch('/v1/get-timer');
  const [status, setPresaleStatus] = useState<Presale>('unstarted');

  if (error) {
    return <p>Error! Please try again</p>;
  }

  const generatePresale = () => {
    if (status === 'over') {
      return <PresaleOver />;
    }

    if (status === 'unstarted') {
      return (
        <PresaleCountDown
          setPresaleStatus={setPresaleStatus}
          startingTime={data?.PresaleStart}
        />
      );
    }

    return <PresaleProgress />;
  };

  return (
    <WalletLayout basic={status === 'over'} useWallet={status === 'over'}>
      <div className={classNames('base-padding', styles.layout)}>
        {loading ?
          <Loading />
          : generatePresale()
        }
      </div>
    </WalletLayout>
  );
};

export default Home;

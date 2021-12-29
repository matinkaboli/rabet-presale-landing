import type { NextPage } from 'next';
import { useState } from 'react';

import WalletLayout from 'src/components/Layout';
import PresaleProgress from 'src/blocks/Presale/Progress';
import PresaleOver from 'src/blocks/Presale/Over';
import PresaleCountDown from 'src/blocks/Presale/CountDown';
import { Presale } from 'src/models';

import styles from './styles.module.scss';

const classNames = require('classnames');

const Home: NextPage = () => {
  const [status, setStatus] = useState<Presale>('unstarted');

  const generatePresale = () => {
    if (status === 'over') {
      return <PresaleOver />;
    }

    if (status === 'unstarted') {
      return <PresaleCountDown />;
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

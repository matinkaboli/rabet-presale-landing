import type { NextPage } from 'next';

import WalletLayout from 'src/components/Layout';
import PresaleProgress from 'src/blocks/Presale/Progress';
import PresaleOver from 'src/blocks/Presale/Over';
import PresaleCountDown from 'src/blocks/Presale/CountDown';

import styles from './styles.module.scss';

const classNames = require('classnames');

const Home: NextPage = () => (
  <WalletLayout>
    <div className={classNames('base-padding', styles.layout)}>
      {/* <PresaleOver /> */}
      {/* <PresaleProgress /> */}
      <PresaleCountDown />
    </div>
  </WalletLayout>
);

export default Home;

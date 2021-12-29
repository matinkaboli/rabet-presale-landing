import React from 'react';
import Image from 'next/image';

import DateCountdown from 'src/components/DateCountdown';
import assetsSrc from 'public/images/buy-assets.png';

import styles from './styles.module.scss';

const classNames = require('classnames');

const PresaleCountdown = () => (
  <div className={classNames('row justify-center items-center', styles.row)}>
    <div className={classNames('col-lg-5 col-md-6 col-sm-12 col-xs-12', styles.col)}>
      <h1 className={styles.title}>RBT Pre-sale will be live in</h1>
      <DateCountdown end="12/29/2021 3:00:00 PM" />
    </div>
    <div className={classNames('col-lg-4 col-md-6 col-sm-12 col-xs-12', styles.col)}>
      <Image src={assetsSrc} height={250} width={484} />
    </div>
  </div>
);

export default PresaleCountdown;

import React from 'react';
import Image from 'next/image';

import DateCountdown from 'src/components/DateCountdown';
import assetsSrc from 'public/images/buy-assets.png';

import styles from './styles.module.scss';

const PresaleCountdown = () => (
  <div className="row justify-center items-center">
    <div className="col-5">
      <h1 className={styles.title}>RBT Pre-sale will be live in</h1>
      <DateCountdown end="12/29/2021 3:00:00 PM" />
    </div>
    <div className="col-4">
      <Image src={assetsSrc} height={250} width={484} />
    </div>
  </div>
);

export default PresaleCountdown;

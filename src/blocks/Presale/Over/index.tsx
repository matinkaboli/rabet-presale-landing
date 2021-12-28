import React from 'react';
import Image from 'next/image';

import tokenSrc from 'public/images/rabet-token.png';

import styles from './styles.module.scss';

const PresaleOver = () => (
  <div className="flex justify-center">
    <div className={styles.card}>
      <Image src={tokenSrc} width={48} height={48} />
      <h4 className={styles['card-title']}>RBT Pre-sale Is Over</h4>
      <p className={styles['card-para']}>
        We’d like to thank everyone who participated in the RBT pre-sale.
        We’ll soon publish more information about the level of participation.
      </p>
    </div>
  </div>
);

export default PresaleOver;

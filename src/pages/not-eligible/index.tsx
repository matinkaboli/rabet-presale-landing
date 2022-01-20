import React from 'react';
import Image from 'next/image';

import WalletLayout from 'src/components/Layout';
import rabetSrc from 'public/images/rabet-token.png';
import CopyText from 'src/components/CopyText';

import styles from './styles.module.scss';

const classNames = require('classnames');

const EligiblePayment = () => (
  <WalletLayout basic>
    <div className={classNames('base-padding', styles.layout)}>
      <div className="flex flex-column items-center">
        <div className={styles.card}>
          <Image src={rabetSrc} width={48} height={48} alt="rabet" />
          <div className={styles['ineligible-title']}>
            Welcome to the Rabet pre-sale portal.
          </div>
          <div className={styles['ineligible-text']}>
          Unfortunately, you didn’t participate in the pre-sale.
          To buy RBT, you can try your luck in the auction that will be held soon.
          To stay up-to-date, please follow our Twitter page.
          </div>
        </div>
      </div>
    </div>
  </WalletLayout>
);

export default EligiblePayment;

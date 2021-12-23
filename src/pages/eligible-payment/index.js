import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import WalletLayout from 'src/components/Layout';
import rabetSrc from 'public/images/rabet-token.png';
import CopyText from 'src/components/CopyText';

import styles from './styles.module.scss';

const EligiblePayment = () => {
  const isEligible = true;
  return (
    <WalletLayout basic>
      <div className={classNames('base-padding', styles.layout)}>
        <div className="flex flex-column items-center">
          {isEligible
            ? (
              <div>
                <div className={styles.card}>
                  <Image src={rabetSrc} width={48} height={48} alt="rabet" />
                  <div className={styles['card-text']}>
                    Congratulations, you are eligible to participate in the Rabet pre-sale.
                  </div>

                  <hr className={styles.hr} />

                  <div className={styles['card-msg']}>Please send <span>2,000 XLM</span> to below address</div>

                  <div className={styles.box}>
                    <div className={styles['copy-text']}>
                      GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0
                    </div>
                    <div className={styles['copy-btn']}>
                      <CopyText
                        copyButton
                        text="GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0"
                      />
                    </div>
                  </div>

                  <div className={styles.box}>
                    <div className={styles.amount}>
                      <div className={styles['amount-title']}>Amount</div>
                      <div className={styles['amount-copy']}>
                        <div className="mr1">2,000 XLM</div>
                        <CopyText
                          copyButton
                          text="2,000 XLM"
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className={styles.note}>
                  <span>Note:</span> After sending the transaction, there is no need to do anything
                  and we check it manually, which may take several hours, then we will
                  update your status.
                </div>
              </div>
            )
            : (
              <div className={styles.card}>
                <Image src={rabetSrc} width={48} height={48} alt="rabet" />
                <div className={styles['ineligible-title']}>
                  Welcome to the Rabet pre-sale portal.
                </div>
                <div className={styles['ineligible-text']}>
                  Unfortunately, You are not currently eligible to
                  participate in the Rabet pre-sale.
                </div>
              </div>
            )}
        </div>
      </div>
    </WalletLayout>
  );
};

export default EligiblePayment;

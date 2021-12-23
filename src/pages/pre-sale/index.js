import React from 'react';
import classNames from 'classnames';

import WalletLayout from 'src/components/Layout';
import LongArrowRight from 'src/svgs/LongArrowRight';
import Table from 'src/components/Table';

import styles from './styles.module.scss';

const PreSale = () => {
  const tableHeader = ['TXN Hash', 'Date', 'Part', 'Amount'];
  const tableRows = Array(8).fill(
    <tr>
      <td width="30%"><a href="/">kobfks80…Kh964Y8I</a></td>
      <td width="25%">1 min ago</td>
      <td width="20%">3</td>
      <td width="25%">200 RBT</td>
    </tr>,
  );
  return (
    <WalletLayout>
      <div className={classNames('base-padding', styles.layout)}>
        <h1 className={styles.title}>Pre-sale</h1>
        <p className={styles.par}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas
          purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus
          aenean vel elit scelerisque
        </p>

        <div className={styles.details}>
          <div className={classNames(styles.box, 'flex justify-center flex-column justify-center')}>
            <div className={styles['box-value']}>
              2,000,000 RBT
              <LongArrowRight />
              2,000,000 RBT
            </div>
            <div className={classNames(styles['box-subject'], 'mt1')}>Purchased amount</div>
          </div>
          <div className={styles.box}>
            <div className="row justify-center" style={{ width: '100%' }}>
              <div className={classNames(styles.receive, 'col-lg-3 col-md-4 col-sm-6 col-6 flex justify-center flex-column justify-center')}>
                <div className={styles['box-value']}>123 RBT</div>
                <div className={styles['box-subject']}>Remaining amount</div>
              </div>
              <div className={classNames(styles.remain, 'col-lg-3 col-md-4 col-sm-6 col-6 flex justify-center flex-column justify-center')}>
                <div className={styles['box-value']}>45 RBT</div>
                <div className={styles['box-subject']}>Recived amount</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt3">
          <Table tableRows={tableRows} tableHeader={tableHeader} />
        </div>
      </div>
    </WalletLayout>
  );
};

export default PreSale;

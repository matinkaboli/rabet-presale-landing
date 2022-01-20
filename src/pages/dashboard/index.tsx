import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { DateTime } from 'luxon';

import { TransactionType } from 'src/models';
import configs from 'src/configs';
import shorter from 'src/utils/shorter';
import useConnect from 'src/hooks/userConnect';
import WalletLayout from 'src/components/Layout';
import LongArrowRight from 'src/svgs/LongArrowRight';
import Table from 'src/components/Table';

import styles from './styles.module.scss';

const classNames = require('classnames');

const fetcher = (resource: string) => {
  const URL = `${configs.SERVER}${resource}`;

  return axios.get(URL).then((res) => {
    return res.data;
  });
};

const Dashboard = () => {
  const { isConnected, publicKey } = useConnect();
  const [showData, setShowData] = useState(false);
  const { data, error } = useSWR(`/v1/dashboard/${publicKey}`, fetcher);

  useEffect(() => {
    if (isConnected) {
      setShowData(true);
    }
  }, [isConnected, publicKey]);

  if (!showData) {
    return (
      <WalletLayout>
        <div className={classNames('base-padding', styles.layout)}>
          <h1 className={styles.title}>Not connected?</h1>
          <p className={styles.par}>
            Connect your wallet to use dashboard panel.
          </p>
        </div>
      </WalletLayout>
    );
  }

  if (!data && !error) {
    return (
      <WalletLayout>
        <div className={classNames('base-padding', styles.layout)}>
          <h1 className={styles.title}>Loading..</h1>
        </div>
      </WalletLayout>
    );
  }

  if (error) {
    if (error.message.includes('404')) {
      return (
        <WalletLayout>
          <div className={classNames('base-padding', styles.layout)}>
            <h1 className={styles.title}>Address not found in presale server.</h1>
          </div>
        </WalletLayout>
      );
    }

    return (
      <WalletLayout>
        <div className={classNames('base-padding', styles.layout)}>
          <h1 className={styles.title}>Error.</h1>
        </div>
      </WalletLayout>
    );
  }

  const { account, transactions } = data;

  const paid = transactions.reduce((prev: number, now: TransactionType) => prev + now.Amount, 0);

  const purchasedAmount = account.Amount / 0.02;
  const remainingAmount = (account.Amount - paid) / 0.02;
  const paidAmount = paid / 0.02;

  const tableHeader = ['TXN Hash', 'Date', 'Part', 'Amount'];

  const tableRows = transactions.map((x: TransactionType, i: number) => (
    <tr key={x.Hash}>
      <td width="30%">
        <a
          href={`https://stellar.expert/explorer/public/tx/${x.Hash}`}
          target="_blank"
          rel="noreferrer"
        >
          {shorter(x.Hash)}
        </a>
      </td>
      <td width="25%">{DateTime.fromISO(x.UpdatedAt).toRelativeCalendar()}</td>
      <td width="20%">
        {transactions.length - i}
      </td>
      <td width="25%">
        {x.Amount / 0.02}
        {' '}
        RBT
      </td>
    </tr>
  ));

  return (
    <WalletLayout>
      <div className={classNames('base-padding', styles.layout)}>
        <h1 className={styles.title}>Pre-sale</h1>
        <p className={styles.par}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas
          purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus
          aenean vel elit scelerisque
        </p>

        <div className={styles.details}>
          <div className={classNames(styles.box, 'flex justify-center flex-column justify-center')}>
            <div className={styles['box-value']}>
              {account.Amount}
              {' '}
              USDC
              <LongArrowRight />
              {purchasedAmount}
              {' '}
              RBT
            </div>
            <div className={classNames(styles['box-subject'], 'mt1')}>Purchased amount</div>
          </div>
          <div className={styles.box}>
            <div className="row justify-center" style={{ width: '100%' }}>
              <div className={classNames(styles.receive, 'col-lg-3 col-md-4 col-sm-6 col-6 flex justify-center flex-column justify-center')}>
                <div className={styles['box-value']}>
                  {remainingAmount}
                  {' '}
                  RBT
                </div>
                <div className={styles['box-subject']}>Remaining amount</div>
              </div>
              <div className={classNames(styles.remain, 'col-lg-3 col-md-4 col-sm-6 col-6 flex justify-center flex-column justify-center')}>
                <div className={styles['box-value']}>
                  {paidAmount}
                  {' '}
                  RBT
                </div>
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

export default Dashboard;
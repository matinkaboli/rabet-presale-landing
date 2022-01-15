import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ProgressBar from 'src/components/ProgressBar';
import CopyText from 'src/components/CopyText';
import { ParticipateItem } from 'src/models';
import fetcher from 'src/utils/fetcher';
import Loading from 'src/components/Loading';

import styles from './styles.module.scss';
import PresaleOver from '../Over';

const classNames = require('classnames');

const PresaleProgress = () => {
  const { data, error } = useSWR('/v1/landing', fetcher, { refreshInterval: 5000 });

  const [asset, setAsset] = useState({});

  useEffect(() => {
    (async () => {
      if (data) {
        const { data: result } = await axios.get(`https://horizon.stellar.org/accounts/${data.Address}`);
        const foundAsset = result.balances.find((x) =>
          x.asset_code === data.AssetCode && x.asset_issuer === data.AssetIssuer);

        if (foundAsset) {
          setAsset(foundAsset);
        }
      }
    })();

    const p = setInterval(() => {
      (async () => {
        if (data) {
          const { data: result } = await axios.get(`https://horizon.stellar.org/accounts/${data.Address}`);
          const foundAsset = result.balances.find((x) =>
            x.asset_code === data.AssetCode && x.asset_issuer === data.AssetIssuer);

          if (foundAsset) {
            setAsset(foundAsset);
          }
        }
      })();
    }, 5000);

    return () => {
      clearInterval(p);
    };
  }, [data]);

  if (!error && !data) {
    return <Loading />;
  }

  if (error) {
    return <p>Presale has not started yet.</p>;
  }

  if (!asset) {
    return <Loading />;
  }

  const percent = parseInt(parseFloat(asset.balance) * 100 / data.TotalRBT);

  const items: ParticipateItem[] = [
    {
      id: 1,
      text: (
        <span>
          Users can only send
          {' '}
          <a
            href="https://stellar.expert/explorer/public/asset/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1"
            target="_blank"
            rel="noreferrer"
          >
            USDC
          </a>
          {' '}
          to the pre-sale address.
        </span>
      ),
    },
    {
      id: 0,
      text: (
        <div className={styles['address-box']}>
          <div>
            This is the pre-sale address:
          </div>
          <div className="flex">
            <div className={classNames(styles.address)}>
              {data.Address}
            </div>
            <div className="ml1">
              <CopyText text={data.Address} copyButton />
            </div>
          </div>
          <div>
            sent to other addresses will be lost.
          </div>
        </div>
      ),
    },
    { id: 5, text: `The hardcap is set to ${data.TotalRBT} ${data.AssetCode}, and the pre-sale will end as soon as that limit is reached.` },
    {
      id: 2,
      text: `The minimum and maximum investment amounts are 500 ${data.AssetCode} and 30,000 ${data.AssetCode}, respectively. If your transferred amount falls outside that range, you’ll lose your funds.`,
    },
    {
      id: 88,
      text: 'RBT’s pre-sale price is $0.02 while the base price at the public sale will be $0.04.',
    },
    { id: 3, text: 'There are no KYC requirements; all Stellar addresses can participate.' },
    {
      id: 6,
      text: 'The pre-sale will end on January 23, 14:00 UTC unless the hardcap is reached before that date, in which case the pre-sale will end immediately.',
    },
    {
      id: 89,
      text: (
        <span>
          DO NOT send funds via an exchange or wallet
          that doesn’t support Stellar assets because
          you’ll receive no RBT tokens and you’ll lose your funds.
          (We recommend the network’s native wallets such as
          {' '}
          <a
            href="https://rabet.io"
            target="_blank"
            rel="noreferrer"
          >
            Rabet
          </a>
          {', '}
          <a
            href="https://www.freighter.app"
            target="_blank"
            rel="noreferrer"
          >
            Freighter
          </a>
          {', '}
          <a
            href="https://lobstr.co"
            target="_blank"
            rel="noreferrer"
          >
            LOBSTR
          </a>
          {', '}
          <a
            href="https://xbull.app"
            target="_blank"
            rel="noreferrer"
          >
            xBull
          </a>
          ).
        </span>
      ),
    },
    { id: 7, text: 'The portion of the tokens that remain unsold until the end of the pre-sale will be reallocated to the public sale (auction).' },
    { id: 8, text: 'The pre-sale tokens will be locked for 3 months after the TGE. After that period, 5% of the tokens will be released each month. The released tokens will be transferred to the investors’ addresses on the first day of each month.' },
  ];

  if (percent >= 99) {
    return <PresaleOver />;
  }

  return (
    <>
      <h1 className={styles.title}>
        RBT Pre-sale is Live
        {' '}
        <span className={classNames(styles.status, styles['status-success'])} />
      </h1>

      <div className={styles.card}>
        <div className={styles.progress}>
          <span>
            {parseInt(asset.balance, 10)}
            {' '}
          </span>
          <span className={styles['progress-letter']}>of </span>
          <span>
            {data.TotalRBT}
            {' '}
            {data.AssetCode}
            {' '}
          </span>
          <span className={styles['progress-separator']}>| </span>
          <span className={classNames(styles['progress-success'], styles['progress-status-success'])}>
            (
            {percent}
            %)
          </span>
        </div>
        <div className={styles['progress-bar']}><ProgressBar value={percent} /></div>
      </div>

      <div className={styles.card}>
        <h2 className={styles['card-title']}>How to participate?</h2>
        <p className={styles['card-desc']}>
          To participate in the presale, you must transfer your desired amount to
          the presale address. Please, read the following requirements to avoid losing
          your assets:
        </p>
        <ul className={styles.list}>
          {items.map((item: ParticipateItem) => (
            <li key={item.id}>
              <span className={styles['bullet-point']} />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PresaleProgress;

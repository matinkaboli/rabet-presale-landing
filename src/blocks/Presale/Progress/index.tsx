import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ProgressBar from 'src/components/ProgressBar';
import CopyText from 'src/components/CopyText';
import { ParticipateItem } from 'src/models';
import useFetch from 'src/hooks/useFetch';
import fetcher from 'src/utils/fetcher';

import styles from './styles.module.scss';
import PresaleOver from '../Over';

const classNames = require('classnames');

const PresaleProgress = () => {
  const { data, error } = useSWR('https://presale-api.rabet.io/v1/landing', fetcher, { refreshInterval: 5000 });
  // const { data, error, loading } = useFetch('/v1/landing');

  console.log(data, error);

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
  }, [data]);

  if (!error && !data) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Presale has not started yet.</p>;
  }

  if (!asset) {
    return <p>Loading</p>;
  }

  const percent = parseInt(parseFloat(asset.balance) * 100 / data.TotalRBT);

  const items: ParticipateItem[] = [
    {
      id: 1,
      text: (
        <div className={styles['address-box']}>
          <div>
            This is the presale address:
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
            Assets sent to other addresses will be lost.
          </div>
        </div>
      ),
    },
    {
      id: 2,
      text: `The minimum and maximum investment amounts are 500 ${data.AssetCode} and 30,000 ${data.AssetCode}, respectively. If your transferred amount falls outside that range, you’ll lose your funds.`
    },
    { id: 3, text: 'There are no KYC requirements; all Stellar addresses can participate.' },
    { id: 4, text: 'DO NOT send funds via an exchange or wallet that doesn’t support Stellar assets because you’ll receive no tokens and you’ll lose your funds. (We recommend the network’s native wallets such as Rabet, Freighter, LOBSTR, xBull  ….).' },
    { id: 5, text: `The hardcap is set to ${data.TotalRBT} ${data.AssetCode}, and the pre-sale will end as soon as that limit is reached.` },
    { id: 6, text: `Users can only send ${data.AssetCode} to the pre-sale address, which will be announced on X. Other assets sent to this address will be lost.` },
    { id: 7, text: 'The portion of the tokens that remain unsold until the end of the pre-sale will be reallocated to the public sale (auction).' },
    { id: 8, text: 'To protect the community and prevent sudden dumps, the pre-sale tokens will be locked for 3 months after the TGE. After that period, 5% of the tokens will be released each month. The released tokens will be transferred to the investors’ addresses on the first day of each month' },
  ];

  if (percent === 100) {
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
          <span>{parseInt(asset.balance)} {' '}</span>
          <span className={styles['progress-letter']}>of </span>
          <span>{data.TotalRBT} {data.AssetCode} {' '}</span>
          <span className={styles['progress-separator']}>| </span>
          <span className={classNames(styles['progress-success'], styles['progress-status-success'])}>
            ({percent}%)
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

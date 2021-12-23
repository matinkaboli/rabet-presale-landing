import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import circle from 'public/images/combined-circle.png';
import * as dir from 'src/static/directories';
import Logo from 'src/svgs/LogoText';

import styles from './styles.module.scss';

const WalletHeader = ({ basic }) => {
  const [connected, setConnected] = useState(true);

  return (
    <>
      {!basic && <div className={styles.circleImg}><Image src={circle} width={340} height={331} alt="circle" /></div>}
      <div className="clearfix base-padding mt3">
        <ul className={classNames('list-reset', styles.list)}>
          <li className="inline-block">
            <Link href={dir.homeDir}>
              <a className={styles.logo}>
                <Logo />
              </a>
            </Link>
          </li>

          <li className={classNames('inline-block ml-auto flex', styles.connect)}>
            {connected
              ? (
                <div className={styles.wallet}>G123d4…89y42w</div>
              )
              : (
                <button
                  type="button"
                  className={classNames(styles.btn, 'btn-primary')}
                  onClick={() => setConnected(true)}
                >
                  Connect wallet
                </button>
              )}
          </li>

        </ul>
      </div>
    </>
  );
};

export default WalletHeader;

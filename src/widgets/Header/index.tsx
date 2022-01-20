import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import shorter from 'src/utils/shorter';
import useConnect from 'src/hooks/userConnect';

import circle from 'public/images/combined-circle.png';
import * as dir from 'src/static/directories';
import Logo from 'src/svgs/LogoText';

import styles from './styles.module.scss';

const classNames = require('classnames');

type AppProps = {
  basic?: boolean
  useWallet?: boolean
};

const defaultProps = {
  basic: false,
  useWallet: true,
};

const WalletHeader = ({ basic, useWallet }: AppProps) => {
  const router = useRouter();
  const { isConnected, publicKey } = useConnect();

  const navigate = () => {
    router.push('/connect');
  };

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

          {useWallet
          && (
            <li className={classNames('inline-block ml-auto flex', styles.connect)}>
              {isConnected
                ? (
                  <div className={styles.wallet}>{shorter(publicKey)}</div>
                )
                : (
                  <button
                    type="button"
                    className={classNames(styles.btn, 'btn-primary')}
                    onClick={navigate}
                  >
                    Connect wallet
                  </button>
                )}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

WalletHeader.defaultProps = defaultProps;

export default WalletHeader;

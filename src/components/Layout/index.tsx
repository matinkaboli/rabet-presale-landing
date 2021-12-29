import React from 'react';
import Footer from 'src/widgets/Footer';
import WalletHeader from 'src/widgets/Header';

type AppProps = {
    basic?: boolean
    children?: JSX.Element
    useWallet?: boolean
};

const defaultProps = {
  basic: false,
  children: undefined,
  useWallet: true,
};

const WalletLayout = ({ children, basic, useWallet }: AppProps) => (
  <div style={{ paddingBottom: basic ? '160px' : '0' }}>
    <WalletHeader basic={basic} useWallet={useWallet} />
    {children}
    {!basic && <Footer />}
  </div>
);

WalletLayout.defaultProps = defaultProps;

export default WalletLayout;

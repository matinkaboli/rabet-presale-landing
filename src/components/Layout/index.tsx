import React from 'react';
import Footer from 'src/widgets/Footer';
import WalletHeader from 'src/widgets/Header';

type AppProps = {
    basic?: boolean
    children?: JSX.Element
};

const defaultProps: AppProps = {
  basic: false,
  children: undefined,
};

const WalletLayout = ({ children, basic }: AppProps) => (
  <div style={{ paddingBottom: basic ? '160px' : '0' }}>
    <WalletHeader basic={basic} />
    {children}
    {!basic && <Footer />}
  </div>
);

WalletLayout.defaultProps = defaultProps;

export default WalletLayout;

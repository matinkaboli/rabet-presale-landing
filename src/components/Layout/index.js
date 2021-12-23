import React from 'react';
import Footer from 'src/widgets/Footer';
import WalletHeader from 'src/widgets/Header';

const WalletLayout = ({ children, basic }) => (
  <div style={{ paddingBottom: basic ? '160px' : '0' }}>
    <WalletHeader basic={basic} />
    {children}
    {!basic && <Footer />}
  </div>
);

export default WalletLayout;

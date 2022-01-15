import { SWRConfig } from 'swr';

import type { AppProps } from 'next/app';

import fetcher from 'src/utils/fetcher';

import 'basscss/css/basscss.min.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import 'react-popper-tooltip/dist/styles.css';
import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const value = {
    refreshInterval: 5000,
    fetcher,
  };

  return (
    <SWRConfig
      value={value}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;

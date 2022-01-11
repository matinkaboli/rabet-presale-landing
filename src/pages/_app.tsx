import type { AppProps } from 'next/app';
import 'basscss/css/basscss.min.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import 'react-popper-tooltip/dist/styles.css';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;

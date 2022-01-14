import LoadingSvg from 'src/svgs/Loading';

import styles from './styles.module.scss';

const Loading = () => (
  <div className={styles.loading}>
    <LoadingSvg />
  </div>
);

export default Loading;

import React from 'react';

import styles from './styles.module.scss';

const classNames = require('classnames');

type AppProps = {
  tableHeader: string[]
  tableRows: JSX.Element[]
  className?: string
  verticalScrollHeight?: number | undefined
};

const defaultProps = {
  className: '',
  verticalScrollHeight: undefined,
};

const Table = ({
  tableHeader, tableRows, className, verticalScrollHeight,
}: AppProps) => (
  <div
    className={classNames(
      styles['table-scroll'],
      verticalScrollHeight && styles['vertical-scroll'],
      className,
    )}
    style={{ height: verticalScrollHeight ? `${verticalScrollHeight}px` : '100%' }}
  >
    <table className={classNames('table', styles.table)}>
      <thead>
        <tr>
          {tableHeader.map((head) => (
            <th key={head.trim().toLowerCase()} scope="col">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  </div>
);

Table.defaultProps = defaultProps;

export default Table;

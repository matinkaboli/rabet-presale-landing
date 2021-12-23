import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Table = ({
  tableHeader, tableRows, className, verticalScrollHeight,
}) => (
  <div
    className={classNames(
      styles['table-scroll'],
      verticalScrollHeight && styles['vertical-scroll'],
      className,
    )}
    style={verticalScrollHeight && { height: `${verticalScrollHeight}px` }}
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

export default Table;

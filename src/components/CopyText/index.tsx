import React, { useState } from 'react';

import Tooltip from 'src/components/Tooltip';
import IconSheet from 'src/svgs/Sheet';

import styles from './styles.module.scss';

const { CopyToClipboard } = require('react-copy-to-clipboard');
const classNames = require('classnames');

type AppProps = {
  text: string
  button?: boolean
  copyButton?: boolean
}

const defaultProps = {
  button: false,
  copyButton: false,
};

const CopyText = ({ text, button, copyButton }: AppProps) => {
  const [visible, setVisible] = useState(false);

  const [tooltipText, setText] = useState('Copy to clipboard');

  const toggle = () => {
    setText('Copied!');
    setVisible(true);
  };

  const setCopyBtn = () => {
    if (button) {
      return <span>{button}</span>;
    }

    if (copyButton) {
      return (
        <div className={styles.btn}>
          <IconSheet />
          Copy
        </div>
      );
    }

    return <span className="icon-sheet" />;
  };

  return (
    <span
      onMouseEnter={() => { setVisible(true); }}
      onMouseLeave={() => { setVisible(false); setText('Copy to clipboard'); }}
      onClick={() => { toggle(); }}
      className={classNames(styles.container, copyButton && styles.block)}
    >
      <Tooltip tooltip={tooltipText} placement="top">
        <CopyToClipboard text={text}>
          {setCopyBtn()}
        </CopyToClipboard>
      </Tooltip>
    </span>
  );
};

CopyText.defaultProps = defaultProps;

export default CopyText;

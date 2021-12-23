import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import styles from './styles.module.scss';

type AppProps = {
  children: JSX.Element,
  tooltip: string | JSX.Element
  placement: 'auto' | 'auto-start' | 'auto-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'
}

const Tooltip = ({ children, tooltip, placement }: AppProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement,
  });

  return (
    <>
      <span className={styles.container} ref={setTriggerRef}>{children}</span>
      {visible && (
        <span
          ref={setTooltipRef}
          {...getTooltipProps(
            { className: 'tooltip-container' },
          )}
        >
          <span {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltip}
        </span>
      )}
    </>
  );
};

export default Tooltip;

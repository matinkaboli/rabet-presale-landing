import React, { useEffect, useState } from 'react';

import { Presale } from 'src/models';

import styles from './styles.module.scss';

type AppProps = {
  end: string
  setPresaleStatus: (arg: Presale) => void
}

const DateCountdown = ({ end, setPresaleStatus } : AppProps) => {
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  const future = new Date(end);
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const updateTimer = () => {
    const now = new Date();
    const nowUTC = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    );

    const distance = new Date(future).getTime() - new Date(nowUTC).getTime();

    if (distance < 0) {
      setExpired(true);
    } else {
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      setDate({
        days, hours, minutes, seconds,
      });
    }
  };

  useEffect(() => {
    let intervalID: ReturnType<typeof setInterval>;
    setPresaleStatus('progress');
    if (!expired) {
      intervalID = setInterval(() => updateTimer(), 1000);
      setPresaleStatus('unstarted');
    }
    return () => clearInterval(intervalID);
  }, [expired, end]);

  const dateItems = [
    { name: 'Days', value: date.days },
    { name: 'Hours', value: date.hours },
    { name: 'Minutes', value: date.minutes },
    { name: 'Seconds', value: date.seconds },
  ];

  return (
    <div>
      {expired ? 'Expired' : (
        <div className={styles.date}>
          {dateItems.map((item) => (
            <div key={item.name} className={styles['date-item']}>
              <span>
                <span className={styles['date-item-value']}>
                  {(`0${item.value}`).slice(-2)}
                </span>
                <span className={styles['date-item-name']}>
                  {item.name.toUpperCase()}
                </span>
              </span>
              <span className={styles['date-item-symbol']}>:</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateCountdown;

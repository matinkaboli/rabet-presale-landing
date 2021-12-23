import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { privacyPolicyDir, featuresDir, downloadDir } from 'static/directories';
import { twitterLink, discordLink, telegramLink } from 'static/links';
import Discord from 'svgs/Discord';
import Twitter from 'svgs/Twitter';
import Telegram from 'svgs/Telegram';

import styles from './styles.module.scss';

const customLink = (link) => {
  if (link.external) {
    return <a href={link.link} target="_blank" rel="noreferrer">{link.text}</a>;
  }

  return <Link href={link.link}><a>{link.text}</a></Link>;
};

const links = [
  [
    { text: 'Extension', link: `${downloadDir}?device=extension` },
    { text: 'Desktop', link: `${downloadDir}?device=desktop` },
    { text: 'Phone', link: `${downloadDir}?device=mobile` },
  ],
  [
    { text: 'Privacy', link: privacyPolicyDir },
    { text: 'Support', link: discordLink, external: true },
    { text: 'Features', link: featuresDir },
  ],
  [
    { text: <><Twitter /><span>Twitter</span></>, link: twitterLink, external: true },
    { text: <><Telegram /><span>Telegram</span></>, link: telegramLink, external: true },
    { text: <><Discord /><span>Discord</span></>, link: discordLink, external: true },
  ],
];

const Footer = () => (
  <div className={classNames('base-padding', styles.footer)}>
    <div className="row justify-between">
      <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
        <h5 className={styles.title}>Products</h5>
        <ul className={styles.ul}>
          {links[0].map((link, index) => (
            <li key={index}>{customLink(link)}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
        <h5 className={styles.title}>About</h5>
        <ul className={styles.ul}>
          <ul className={styles.ul}>
            {links[1].map((link, index) => (
              <li key={index}>{customLink(link)}</li>
            ))}
          </ul>
        </ul>
      </div>
      <div className="col-lg-2 col-md-4 col-sm-4 col-xs-12">
        <h5 className={styles.title}>Social <span>network</span></h5>
        <ul className={classNames(styles.ul, styles.social)}>
          <ul className={styles.ul}>
            {links[2].map((link, index) => (
              <li key={index}>{customLink(link)}</li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
    <div className={styles.copyright}>
      © RABET TEAM. ALL RIGHTS RESERVED
    </div>
  </div>
);

export default Footer;

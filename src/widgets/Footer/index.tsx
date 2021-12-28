import React from 'react';
import Link from 'next/link';

import { privacyPolicyDir, featuresDir, downloadDir } from 'src/static/directories';
import { twitterLink, discordLink, telegramLink } from 'src/static/links';
import Discord from 'src/svgs/Discord';
import Twitter from 'src/svgs/Twitter';
import Telegram from 'src/svgs/Telegram';
import { CustomLink } from 'src/models';

import styles from './styles.module.scss';

const classNames = require('classnames');

const customLink = (link: CustomLink) => {
  if (link.external) {
    return <a href={link.link} target="_blank" rel="noreferrer">{link.text}</a>;
  }

  return <Link href={link.link}><a>{link.text}</a></Link>;
};

const links = [
  [
    {
      id: 0, text: 'Extension', link: `${downloadDir}?device=extension`, external: false,
    },
    {
      id: 1, text: 'Desktop', link: `${downloadDir}?device=desktop`, external: false,
    },
    {
      id: 2, text: 'Phone', link: `${downloadDir}?device=mobile`, external: false,
    },
  ],
  [
    {
      id: 3, text: 'Privacy', link: privacyPolicyDir, external: false,
    },
    {
      id: 4, text: 'Support', link: discordLink, external: true,
    },
    {
      id: 5, text: 'Features', link: featuresDir, external: false,
    },
  ],
  [
    {
      id: 6,
      text: (
        <>
          <Twitter />
          <span>Twitter</span>
        </>
      ),
      link: twitterLink,
      external: true,
    },
    {
      id: 7,
      text: (
        <>
          <Telegram />
          <span>Telegram</span>
        </>
      ),
      link: telegramLink,
      external: true,
    },
    {
      id: 8,
      text: (
        <>
          <Discord />
          <span>Discord</span>
        </>
      ),
      link: discordLink,
      external: true,
    },
  ],
];

const Footer = () => (
  <div className={classNames('base-padding', styles.footer)}>
    <div className="row justify-between">
      <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
        <h5 className={styles.title}>Products</h5>
        <ul className={styles.ul}>
          {links[0].map((link) => (
            <li key={link.id}>{customLink(link)}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
        <h5 className={styles.title}>About</h5>
        <ul className={styles.ul}>
          <ul className={styles.ul}>
            {links[1].map((link) => (
              <li key={link.id}>{customLink(link)}</li>
            ))}
          </ul>
        </ul>
      </div>
      <div className="col-lg-2 col-md-4 col-sm-4 col-xs-12">
        <h5 className={styles.title}>
          Social
          <span>network</span>
        </h5>
        <ul className={classNames(styles.ul, styles.social)}>
          <ul className={styles.ul}>
            {links[2].map((link) => (
              <li key={link.id}>{customLink(link)}</li>
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

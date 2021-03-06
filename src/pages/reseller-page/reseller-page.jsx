import React from 'react';
import { Helmet } from 'react-helmet';
import './reseller-page.scss';
const ResellerPage = () => {
  return (
    <div className="reseller-page">
      <Helmet>
        <title>Wholesale Program | REMEDI</title>
        <meta property="og:title" content="Wholesale Program | Remedi" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Cleaning When your clothes need a wash, don’t simply stick them in the washer as you might do usually; follow these guidelines. Use a gentle cleaning cycle, and opt for an eco-friendly detergent; not only is that better for the environment, it is more gentle for the bamboo fabric too and keeps everything as fresh and neat"
        />
        <meta property="og:site_name" content="REMEDI" />
        <meta property="og:url" content="https://www.remedi.store/reseller" />
      </Helmet>
      <h3>Remedi Wholesale Program</h3>
      <div className="block">
        <h4>What Is The Remedi Wholesale Program?</h4>
        <p>
          It is with profound pleasure that we welcome your decision to become a
          registered Reseller for Remedi products. Ours is a fashion brand a lot
          of people are eager to be associated with, both in terms of usage and
          the rewarding entrepreneurial benefits that come with being a
          reseller. Our Wholesale Program is such that encourages people at all
          levels of business to transact with us, so whether or not you have an
          established physical or online fashion store, you can purchase our
          products at wholesale prices. Arguably one of Africa’s up-comming
          fastest growing fashion brands, Remedi is focused on mainstreaming
          tried and tested business practices as the Company strives to deliver
          sustainable economic growth that’s profitable, environmentally
          responsible and socially relevant.
        </p>
      </div>
      <div className="block">
        <h4>What Are the Benefits Of Joining The Remedi Wholesale Program?</h4>
        <ul>
          <li>Inexpensive wholesale pricing</li>
          <li>Convenient online wholesale order placement</li>
          <li>Acceptance of credit and debit cards and</li>
        </ul>
      </div>
      <div className="block">
        <h4>How Do I Place A Bulk Order?</h4>
        <p>
          you may send an email to officialremediorder@gmail.com, or contact us
          via any of our social messaging platforms.
        </p>
      </div>
      <br />
      <br />
      <h3>ONLINE BULK ORDER IS COMING SOON</h3>
    </div>
  );
};

export default ResellerPage;

import React from 'react';
import { DescriptionList } from '@shopify/polaris';

const FaqTab = () => (
  <div className="container tab-main">
    <DescriptionList
      items={[
        {
          term: 'Does it cost anything?',
          description:
            `No, the integration is free of charge, as a service to
            Swatches's customers!`,
        },
        {
          term: 'Is it difficult to integrate?',
          description:
            `No, just follow the simple setup steps and you're up and
            running in minutes!`,
        },
        {
          term: 'How long does it take?',
          description:
            `After you have enabled the integration, data will start streaming
            to Swatches in real time. You will see your next order in Swatches.`,
        },
        {
          term: 'Will I also get historical data?',
          description:
            `No, this integration includes all future data, but not
            historical`,
        },
        {
          term: 'How can I use this in Swatches?',
          description:
            `After enabling the integration, your Shopify data will start sending
            to Swatches. With this data you can enable many e-commerce communication
            flows like order follow up, shipping follow up, retention, winback,
            welcome etc. You can also send newsletters to your Shopify customers.
            Email of course, but also SMS.`,
        },
        {
          term: 'Which data is included?',
          description:
            `The integration includes the data related to a purchase, cart in
            progress (order created), order completed (after captured payment),
            order shipped (after fullfilment). The subscriber (your customer) will
            be added to relevant tags in Swatches, and data about them saved as custom
            fields, e.g. name, address, email. Data about the order is also saved
            e.g. order date, price, discount, product name, shipping date and much more`,
        },
        {
          term: 'Do I need an account in Swatches?',
          description:
            `Yes, in order to use the Shopify-Swatches integration, you first need an
            account in Swatches. Don't have an account in Swatches yet? No problem, here
            you can start a free trial today: https://www.swatches.se/order/`,
        },
      ]}
    />
  </div>
);

FaqTab.propTypes = {
};

FaqTab.defaultProps = {
};

export default FaqTab;

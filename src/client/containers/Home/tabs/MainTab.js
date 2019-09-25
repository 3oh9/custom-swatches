import React, { Fragment } from 'react';
import { TextContainer, Heading, Button } from '@shopify/polaris';
import { func } from 'prop-types';

const HomeTab = ({ onGetStartedClick }) => (
  <Fragment>
    <div className="section image-background-home flex justify-center items-center direction-column">
      <div className="text-container">
        <h2>ABOUT SWATCHES</h2>
      </div>
    </div>
    <div className="container tab-main centered">
      <TextContainer>
        <Heading>We develop smart communication</Heading>
        <p>
        But I must explain to you how all this mistaken idea of denouncing pleasure
        and praising pain was born and I will give you a complete account of the system,
        and expound the actual teachings of the great explorer of the truth, the master-builder
        of human happiness. No one rejects, dislikes, or avoids pleasure itself,
        because it is pleasure
        </p>
      </TextContainer>
      <TextContainer>
        <Heading>No one rejects</Heading>
        <p>
          But I must explain to you how all this mistaken idea of denouncing pleasure
        and praising pain was born and I will give you a complete account of the system,
        </p>
      </TextContainer>
      <section className="section flex justify-center">
        <Button
          onClick={onGetStartedClick}
          primary
        >GET STARTED
        </Button>
      </section>
    </div>
  </Fragment>
);

HomeTab.propTypes = {
  onGetStartedClick: func,
};

HomeTab.defaultProps = {
  onGetStartedClick: null,
};

export default HomeTab;

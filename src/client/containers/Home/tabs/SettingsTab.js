import React from 'react';
import { TextContainer, Heading, TextField, Button } from '@shopify/polaris';
import { string, func, bool } from 'prop-types';

const SettingsTab = ({
  apiKey, onChange, disabled,
  onSubmit, refreshWebhooks,
}) => (
  <div className="container tab-main">
    <div className="message-container mb15">
      <TextContainer>
        <Heading>Integrating Shopify with your account in Swatches is simple!</Heading>
        <p>To integrate your Shopify account with your Swatches account, just follow these steps:</p>
        <ol>
          <li>Login to your account in Swatches to the developer <b><a target="_blank" rel="noopener noreferrer" href="https://app.swatches.io/#/settings/developer">settings page</a></b></li>
          <li>Click "New API-key"</li>
          <li>Click "Copy" - the API key is now added to your computer's clipboard</li>
          <li>Go to the Swatches-Shopify app, settings page</li>
          <li>Copy the API-key from your clipboard to the field "Swatches API-key"</li>
          <li>Click save</li>
        </ol>
        <p>Now you're done - great job! Shortly you will see your Shopify data start appearing in Swatches.</p>
      </TextContainer>
    </div>

    <div className="message-container mb15">
      <TextContainer>
        <Heading>Setup the Swatches API key</Heading>
        <p>
          To be able to use the API you first have
          to obtain an api key from your accounts settings page.
          Once the api key has been generated it can be used
          in the following ways when making requests.
        </p>
        <p>You can obtain an API key <b><a target="_blank" rel="noopener noreferrer" href="https://app.swatches.io/#/settings/developer">here</a></b></p>
      </TextContainer>
      <section className="flex items-end section field-mini-form">
        <TextField
          label="Swatches API key"
          value={apiKey}
          onChange={onChange}
          placeholder="From Swatches admin panel"
        />
        <Button onClick={onSubmit} primary disabled={disabled}>Save</Button>
      </section>
    </div>

    <div className="message-container mb15 flex direction-column justify-center">
      <TextContainer>
        <Heading>Refresh the webhooks list</Heading>
        <p>
          If Shopify webhooks installed incorrectly
          - reinstall them by clicking <b>Reinstall</b> button.
        </p>
      </TextContainer>
      <div className="button-large mt15">
        <Button
          onClick={refreshWebhooks}
          disabled={!apiKey}
          primary
        >Reinstall
        </Button>
      </div>
    </div>
  </div>
);

SettingsTab.propTypes = {
  apiKey: string,
  onChange: func,
  disabled: bool,
  onSubmit: func,
  refreshWebhooks: func,
};

SettingsTab.defaultProps = {
  apiKey: '',
  onChange: null,
  disabled: false,
  onSubmit: null,
  refreshWebhooks: null,
};

export default SettingsTab;

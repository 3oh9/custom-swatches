import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  arrayOf,
  bool,
  string,
  shape,
  func,
  number,
} from 'prop-types';
import {
  ResourceList,
  Thumbnail,
  Modal,
  Heading,
  TextStyle,
  Tooltip,
  Icon,
} from '@shopify/polaris';
import { DeleteMinor } from '@shopify/polaris-icons';
import '@shopify/polaris/styles.css';

import ImageCrop from '../ImageCrop';
import './style.scss';

class OptionsList extends Component {
  static propTypes = {
    options: arrayOf(shape()).isRequired,
    variants: arrayOf(shape()).isRequired,
    images: arrayOf(shape()).isRequired,
    metafields: arrayOf(shape()).isRequired,
    loading: bool.isRequired,
    fetchAssetByKey: func.isRequired,
    fetchProductMetafields: func.isRequired,
    updateProductMetafields: func.isRequired,
    deleteProductMetafield: func.isRequired,
    createAsset: func.isRequired,
    deleteAsset: func.isRequired,
    shop: string.isRequired,
    productId: number.isRequired,
    themeId: number.isRequired,
    imageCrop: shape().isRequired,
    updateImageCrop: func.isRequired,
    asset: shape().isRequired,
    product: shape().isRequired,
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      optionItem: shape({
        name: string,
      }),
      variantOptionName: '',
      optionItems: [],
    };
  }

  componentDidMount() {
    this.initial();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.initial();
    }
  }

  setBasicOptionConfiguration(colorOptionNames, variantOptionName) {
    this.setState({
      variantOptionName,
    });
    const { metafields, shop, themeId } = this.props;

    const optionItems = [];

    colorOptionNames.forEach((colorOptionName) => {
      const colorOptionNameAsKey = colorOptionName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      const metafieldItem = metafields.find(metafield => metafield.key === colorOptionNameAsKey);
      if (metafieldItem) {
        const filePath = metafieldItem.value.split('/');
        this.props.fetchAssetByKey(shop, themeId, filePath[0], filePath[1], (asset) => {
          optionItems.push({
            name: colorOptionName,
            keyName: metafieldItem.key,
            image: asset.public_url,
          });
          this.setState({
            optionItems,
          });
        });
      } else {
        optionItems.push({
          name: colorOptionName,
          keyName: colorOptionNameAsKey,
          image: '',
        });
        this.setState({
          optionItems,
        });
      }
    });
  }

  initial = () => {
    const { options, loading } = this.props;
    let variantOptionName = null;
    const colorOption = !loading && options.find((optionItem, index) => {
      const isOption = optionItem.name === 'Color';
      if (isOption) {
        variantOptionName = `option${index + 1}`;
      }
      return isOption;
    });
    this.setBasicOptionConfiguration(colorOption.values, variantOptionName);
  }

  handleModalOpen = (optionName) => {
    const { variantOptionName } = this.state;
    const { variants, images } = this.props;

    const optionVariants = variants.filter(variant => variant[variantOptionName] === optionName);

    const optionsImages = images.filter((image) => {
      let selectedImage = null;
      optionVariants.forEach((optionVariant) => {
        if (optionVariant.image_id === image.id && image.variant_ids.includes(optionVariant.id)) {
          selectedImage = image;
        }
      });
      return selectedImage;
    });

    this.setState({
      optionItem: {
        name: optionName,
        images: optionsImages,
      },
      modalActive: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalActive: false,
    });
  }

  handleModalSave = (optionName) => {
    const {
      updateProductMetafields,
      shop,
      productId,
      createAsset,
      themeId,
      imageCrop,
    } = this.props;

    // make lovercase and remove all non digit and non char
    const optionNameToSave = optionName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    const asset = {
      key: `assets/${productId}_${optionNameToSave}.jpeg`,
      attachment: imageCrop.imageCropBase64String,
    };

    createAsset(shop, themeId, asset, (res) => {
      const metafield = {
        namespace: 'custom-swatch',
        key: optionNameToSave,
        value: res.key,
        value_type: 'string',
      };
      updateProductMetafields(shop, productId, metafield, () => {
        const { optionItems } = this.state;

        const newOptionItems = optionItems.map((option) => {
          if (option.keyName === metafield.key) {
            option.image = `data:image/jpeg;base64,${asset.attachment}`;
          }
          return option;
        });

        // update redux metafields
        this.props.fetchProductMetafields(shop, productId);

        this.setState({
          modalActive: false,
          optionItems: newOptionItems,
        });
      });
    });
  }

  handleRemoveSwatch = (optionItem, event) => {
    event.preventDefault();
    event.stopPropagation();
    const {
      shop,
      themeId,
      metafields,
      productId,
    } = this.props;
    const { optionItems } = this.state;

    if (!optionItem.keyName) {
      optionItem = optionItems.find(item => item.name === optionItem.name);
    }

    this.props.deleteAsset(shop, themeId, `assets/${productId}_${optionItem.keyName}.jpeg`, () => {
      const metafieldToDelete = metafields.filter(metafield =>
        metafield.key === optionItem.keyName).pop();

      this.props.deleteProductMetafield(shop, productId, metafieldToDelete.id, () => {
        const newOptionItems = optionItems.map((item) => {
          if (item.keyName === optionItem.keyName) {
            item.image = '';
          }
          return item;
        });
        this.setState({
          optionItems: newOptionItems,
        });
        this.props.fetchProductMetafields(shop, productId);
      });
    });
  }

  renderItem = (item) => {
    const { variantOptionName } = this.state;
    const { variants, images } = this.props;
    const optionVariants = variants.filter(variant => variant[variantOptionName] === item.name);

    const optionsImages = images.filter((image) => {
      let selectedImage = null;
      optionVariants.forEach((optionVariant) => {
        if (optionVariant.image_id === image.id && image.variant_ids.includes(optionVariant.id)) {
          selectedImage = image;
        }
      });
      return selectedImage;
    });

    if (!images.length) {
      item.image = false;
    }

    const media = item.image ?
      (<Thumbnail size="small" source={item.image} alt={`Photo of ${item.name}`} />)
      : (<Thumbnail size="small" source="https://cdn.shopify.com/s/images/admin/no-image-large.gif" alt={`Photo of ${item}`} />);

    const resourceItem = (
      <ResourceList.Item
        id={item.name}
        media={media}
        accessibilityLabel={`Edit option ${item.name}`}
        persistActions
        onClick={optionsImages.length ? this.handleModalOpen : false}
      >
        <div className="listContainer">
          <div className="listWrapper">
            {item.name}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {optionsImages.length === 0 && <TextStyle variation="subdued">Variant image is not set</TextStyle>}
              {item.image && (
                <button
                  className="shopifyEditLink"
                  onClick={event => this.handleRemoveSwatch(item, event)}
                >
                  <Tooltip
                    className="shopifyEditLink"
                    content={`Remove "${item.name}" swatch`}
                  >
                    <Icon
                      source={DeleteMinor}
                      color="red"
                      accessibilityLabel={`Remove "${item.name}" swatch`}
                    />
                  </Tooltip>
                </button>
              )}
            </div>
          </div>
        </div>
      </ResourceList.Item>
    );

    return resourceItem;
  };

  render() {
    const {
      imageCrop,
      updateImageCrop,
      product,
      asset,
    } = this.props;

    const {
      fetchingOne,
      fetchedOne,
      fetchingMetafields,
      fetchedMetafields,
      updatingMetafields,
      updatedMetafields,
      deletingMetafields,
      deletedMetafields,
    } = product;

    const {
      fetchingAssetByKey,
      fetchedAssetByKey,
      updatingAsset,
      updatedAsset,
      deletingAsset,
      deletedAsset,
    } = asset;

    const loading = (fetchingOne && !fetchedOne)
      || (fetchingMetafields && !fetchedMetafields)
      || (fetchingAssetByKey && !fetchedAssetByKey)
      || (updatingMetafields && !updatedMetafields)
      || (updatingAsset && !updatedAsset)
      || (deletingMetafields && !deletedMetafields)
      || (deletingAsset && !deletedAsset);

    const savingSwatch = (updatingMetafields && !updatedMetafields)
      || (updatingAsset && !updatedAsset);

    const removingSwatch = (deletingMetafields && !deletedMetafields)
      || (deletingAsset && !deletedAsset);

    const {
      modalActive,
      optionItem,
      optionItems,
    } = this.state;

    const resourceName = {
      singular: 'option',
      plural: 'options',
    };

    const secondaryActions = [
      {
        content: 'Cancel',
        onAction: this.handleModalClose,
      },
    ];

    if (optionItems.find(option => option.name === optionItem.name && option.image)) {
      secondaryActions.push({
        content: 'Remove swatch image',
        destructive: true,
        onAction: (event) => {
          this.handleRemoveSwatch(optionItem, event);
        },
        disabled: removingSwatch || savingSwatch,
        loading: removingSwatch,
      });
      secondaryActions.reverse();
    }

    return (
      <Fragment>
        <Heading>Swatches</Heading>
        <ResourceList
          resourceName={resourceName}
          items={optionItems}
          renderItem={this.renderItem}
          loading={loading}
        />
        <Modal
          open={modalActive}
          onClose={this.handleModalClose}
          title={`Edit Swatch image for "${optionItem.name}" color`}
          primaryAction={{
            content: 'Save',
            onAction: () => {
              this.handleModalSave(optionItem.name);
            },
            disabled: savingSwatch || removingSwatch,
            loading: savingSwatch,
          }}
          secondaryActions={secondaryActions}
          sectioned
          large="true"
        >
          <Modal.Section>
            <ImageCrop
              data={optionItem}
              currentImage={null}
              imageCrop={imageCrop}
              updateImageCrop={updateImageCrop}
            />
          </Modal.Section>
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(OptionsList);

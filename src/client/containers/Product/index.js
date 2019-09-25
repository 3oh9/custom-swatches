import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { shape, func, bool, string, number, arrayOf } from 'prop-types';
import { Card, Frame, Loading, Layout, Page } from '@shopify/polaris';
import { ViewMinor, EditMinor } from '@shopify/polaris-icons';

import { homePath } from '../../utils/paths';

import {
  fetchProduct,
  fetchProductMetafields,
  updateProductMetafields,
  deleteProductMetafield,
} from '../../actions/product';
import {
  fetchAssets,
  fetchAssetByKey,
  createAsset,
  deleteAsset,
} from '../../actions/asset';
import { fetchMainTheme } from '../../actions/theme';
import { updateImageCrop } from '../../actions/imageCrop';

import OptionsList from '../../components/OptionsList';

class ProductContainer extends Component {
  static propTypes = {
    fetchProduct: func.isRequired,
    fetchProductMetafields: func.isRequired,
    updateProductMetafields: func.isRequired,
    deleteProductMetafield: func.isRequired,
    fetchMainTheme: func.isRequired,
    fetchAssets: func.isRequired,
    fetchAssetByKey: func.isRequired,
    createAsset: func.isRequired,
    deleteAsset: func.isRequired,
    updateImageCrop: func.isRequired,

    imageCrop: shape({
      imageCropBase64String: string,
      updatingImageCrop: bool,
      updatedImageCrop: bool,
    }).isRequired,

    product: shape({
      item: shape({
        image: shape({
          id: number,
          src: string,
        }),
      }),
      fetchingOne: bool,
      fetchedOne: bool,
      metafields: arrayOf(shape()),
    }).isRequired,

    theme: shape({
      mainTheme: shape({
        id: number,
        name: string,
      }),
      fetchingMainTheme: bool,
      fetchedMainTheme: bool,
    }).isRequired,

    asset: shape().isRequired,

    match: shape({
      params: shape({
        id: string,
      }),
    }).isRequired,

    history: shape().isRequired,
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      shop: cookie.load('shop'),
    };
  }

  componentDidMount() {
    const { shop } = this.state;
    const { match } = this.props;

    this.props.fetchMainTheme(shop);
    this.props.fetchProduct(shop, match.params.id);
    this.props.fetchProductMetafields(shop, match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme.mainTheme !== this.props.theme.mainTheme) {
      const { theme } = this.props;
      const { shop } = this.state;

      // fetchAssets(shop, theme.mainTheme.id);
      // fetchAssetByKey(shop, theme.mainTheme.id, 'assets', 'ajax-loader.gif');
    }
  }

  handleBreadcrumbsClick = () => {
    this.props.history.push(`${homePath}`);
  };

  render() {
    const {
      product,
      theme,
      imageCrop,
    } = this.props;
    const { shop } = this.state;
    const {
      item,
      fetchingOne,
      fetchedOne,
      fetchedMetafields,
      fetchingMetafields,
      metafields,
    } = product;
    const {
      options,
      variants,
      images,
      id,
      handle,
    } = item;

    return (
      <Frame>
        {fetchingOne && fetchingMetafields && <Loading />}
        {fetchedOne && fetchedMetafields && (
          <Page
            breadcrumbs={[{
              content: 'Products',
              onAction: () => { this.handleBreadcrumbsClick(); },
            }]}
            title={item.title}
            secondaryActions={[
              {
                content: 'View',
                icon: ViewMinor,
                onAction: () => {
                  window.open(`https://${shop}/products/${handle}`, '_blank');
                },
              },
              {
                content: 'Edit',
                icon: EditMinor,
                onAction: () => {
                  window.open(`https://${shop}/admin/products/${id}`, '_blank');
                },
              },
            ]}
          >
            <Layout>
              <Layout.Section
                title="title"
                description="description"
              >
                <Card>
                  <OptionsList
                    productId={id}
                    shop={shop}
                    options={options}
                    variants={variants}
                    images={images}
                    metafields={metafields}
                    loading={fetchingOne}
                    fetchAssetByKey={this.props.fetchAssetByKey}
                    fetchProductMetafields={this.props.fetchProductMetafields}
                    updateProductMetafields={this.props.updateProductMetafields}
                    deleteProductMetafield={this.props.deleteProductMetafield}
                    createAsset={this.props.createAsset}
                    deleteAsset={this.props.deleteAsset}
                    themeId={theme.mainTheme.id}
                    imageCrop={imageCrop}
                    updateImageCrop={this.props.updateImageCrop}
                    asset={this.props.asset}
                    product={this.props.product}
                  />
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        )}
      </Frame>
    );
  }
}

const mapStateToProps = ({
  product, theme, asset, imageCrop,
}) => ({
  product,
  theme,
  asset,
  imageCrop,
});

const mapDispatchToProps = {
  fetchProduct,
  fetchProductMetafields,
  updateProductMetafields,
  deleteProductMetafield,
  fetchAssets,
  fetchAssetByKey,
  createAsset,
  deleteAsset,
  fetchMainTheme,
  updateImageCrop,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductContainer));

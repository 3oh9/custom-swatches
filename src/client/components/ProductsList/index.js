/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, arrayOf, func, bool, string, number } from 'prop-types';
import {
  ResourceList,
  TextStyle,
  Tooltip,
  Thumbnail,
  Icon,
} from '@shopify/polaris';

import { ViewMinor } from '@shopify/polaris-icons';

import '@shopify/polaris/styles.css';
import './style.scss';

class ProductsList extends Component {
  static propTypes = {
    list: arrayOf(shape()),
    onProductClick: func.isRequired,
    loading: bool,
    shop: string,
    handleSearch: func.isRequired,
    limit: number,
  }

  static defaultProps = {
    list: [],
    loading: true,
    shop: '',
    limit: 50,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleSearchChange = (searchValue) => {
    this.setState({ searchValue });
  };

  handleSearchSubmit = () => {
    const { searchValue } = this.state;
    const { shop, limit, handleSearch } = this.props;

    handleSearch(shop, limit, searchValue);
  }

  renderItem = (item) => {
    const {
      id,
      title,
      image,
      options,
    } = item;

    const { shop } = this.props;

    let media;
    if (!image) {
      media = (
        <Thumbnail
          size="small"
          source="https://cdn.shopify.com/s/images/admin/no-image-large.gif"
          alt={`Photo of ${title}`}
        />);
    } else {
      media = (<Thumbnail size="small" source={image.src} alt={`Photo of ${title}`} />);
    }

    const colorOption = options.find((optionItem) => {
      const isOption = optionItem.name === 'Color';
      return isOption;
    });

    const resourceItemWithoutColor = (
      <ResourceList.Item
        id={id}
        media={media}
        accessibilityLabel={`View details for ${title}`}
        persistActions
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            {title}
            <div className="shopifyEditLink">
              <Tooltip
                className="shopifyEditLink"
                content={`View ${title} in shopify admin`}
              >
                <a
                  href={`https://${shop}/admin/products/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    source={ViewMinor}
                    color="black"
                    accessibilityLabel={`View ${title} in shopify admin`}
                  />
                </a>
              </Tooltip>
            </div>
          </div>
          <TextStyle variation="subdued">Color is not set</TextStyle>
        </div>
      </ResourceList.Item>
    );

    const resourceWithColor = (
      <ResourceList.Item
        id={id}
        media={media}
        accessibilityLabel={`View details for ${title}`}
        persistActions
        onClick={this.props.onProductClick}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            <p className="product__title">{title}</p>
            <div className="shopifyEditLink">
              <Tooltip
                content={`View ${title} in shopify admin`}
              >
                <a
                  href={`https://${shop}/admin/products/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(event.currentTarget.href, '_blank');
                  }}
                >
                  <Icon
                    source={ViewMinor}
                    color="black"
                    accessibilityLabel={`View ${title} in shopify admin`}
                  />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </ResourceList.Item>
    );

    return colorOption ? resourceWithColor : resourceItemWithoutColor;
  };

  render() {
    const { list, loading } = this.props;
    const { handleSearchSubmit, handleSearchChange } = this;

    const resourceName = {
      singular: 'product',
      plural: 'products',
    };

    const filterControl = (
      <ResourceList.FilterControl
        searchValue={this.state.searchValue}
        onSearchChange={handleSearchChange}
        additionalAction={{
          content: 'Search',
          onAction: () => {
            console.log('handleSearchSubmit');
            handleSearchSubmit();
          },
        }}
      />
    );
    return (
      <ResourceList
        resourceName={resourceName}
        items={list}
        renderItem={this.renderItem}
        filterControl={filterControl}
        loading={loading}
      />
    );
  }
}

export default withRouter(ProductsList);

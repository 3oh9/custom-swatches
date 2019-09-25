import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { shape, func, array, bool, string } from 'prop-types';
import {
  Pagination,
  Card,
  Frame,
  Layout,
  Page,
} from '@shopify/polaris';

import { productsPath } from '../../utils/paths';

import ProductsList from '../../components/ProductsList';

import { fetchProducts, searchProducts } from '../../actions/product';
import { fetchMainTheme } from '../../actions/theme';

class Products extends Component {
  static propTypes = {
    fetchProducts: func.isRequired,
    searchProducts: func.isRequired,
    fetchMainTheme: func.isRequired,

    product: shape({
      list: array,
      fetching: bool,
      fetched: bool,
      pageToken: string,
      // next: {href, rel, token} or ''
      // prev: {href, rel, token} or ''
    }).isRequired,

    history: shape().isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isFirstPage: true,
      isLastPage: false,
      limit: 50,
      shop: cookie.load('shop'),
    };
  }

  componentDidMount() {
    const { fetched } = this.props.product;
    const { shop, limit } = this.state;

    if (!fetched) {
      this.props.fetchMainTheme(shop);
      this.props.fetchProducts(shop, limit);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.fetching && this.props.product.fetched) {
      const { next, prev } = this.props.product;

      this.setPagination(prev, next);
    }
  }

  setPagination = (prev, next) => {
    this.setState({
      isFirstPage: !prev,
      isLastPage: !next,
    });
  }

  handleProductClick = (productId) => {
    this.props.history.push(`${productsPath}/${productId}`);
  };

  handlePagination = (key) => {
    const { shop, limit } = this.state;
    const { next, prev } = this.props.product;

    this.props.fetchProducts(shop, limit, key === 'next' ? next.token : prev.token);
  }

  handlePreviousPage = () => {
    this.handlePagination('prev');
  }

  handleNextPage = () => {
    this.handlePagination('next');
    this.setState({
      isFirstPage: false,
    });
  }

  render() {
    const { product } = this.props;
    const { list, hasNextPage } = product;
    const { isFirstPage, isLastPage, shop } = this.state;
    const { handleProductClick, handlePagination } = this;

    const paginationMarkup =
      list.length > 0 ? (
        <Pagination
          hasPrevious={!isFirstPage}
          hasNext={!isLastPage}
          onPrevious={this.handlePreviousPage}
          onNext={this.handleNextPage}
        />) : null;

    const loading = product.fetching;

    return (
      <Frame>
        {/* {loading && <Loading />} */}
        <Page title="Custom Swatches">
          <Layout>
            <Layout.Section
              title="title"
              description="description"
            >
              <Card>
                <Card>
                  <ProductsList
                    list={list}
                    onProductClick={handleProductClick}
                    handlePagination={handlePagination}
                    hasNextPage={hasNextPage}
                    loading={loading}
                    shop={shop}
                    handleSearch={this.props.searchProducts}
                  />
                </Card>
                {!loading && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '24px 16px',
                      borderTop: '1px solid #dfe4e8',
                    }}
                  >
                    {paginationMarkup}
                  </div>)
                }
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  product,
});

const mapDispatchToProps = {
  fetchProducts,
  searchProducts,
  fetchMainTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));

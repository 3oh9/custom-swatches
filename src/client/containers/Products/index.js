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

import { fetchGqlProducts } from '../../actions/product';
import { fetchMainTheme } from '../../actions/theme';

class Products extends Component {
  static propTypes = {
    fetchGqlProducts: func.isRequired,
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
      limit: 20,
      shop: cookie.load('shop'),
      title: '',
    };
  }

  componentDidMount() {
    const { fetched } = this.props.product;
    const { shop, limit } = this.state;

    if (!fetched) {
      this.props.fetchMainTheme(shop);
      this.props.fetchGqlProducts(shop, limit);
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
    const { shop, limit, title } = this.state;
    const { next, prev } = this.props.product;

    this.props.fetchGqlProducts(shop, limit, title, key === 'next' ? next : null, key === 'prev' ? prev : null);
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

  handleSearch = (shop, limit, string) => {
    this.setState({
      title: string
    });
    this.props.fetchGqlProducts(shop, this.state.limit, string);
  }

  render() {
    const { product } = this.props;
    const { list, next } = product;
    const { isFirstPage, isLastPage, shop } = this.state;
    const { handleProductClick, handlePagination, handleSearch, handlePreviousPage, handleNextPage } = this;

    const paginationMarkup =
      list.length > 0 ? (
        <Pagination
          hasPrevious={!isFirstPage}
          hasNext={!isLastPage}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />) : null;

    const loading = product.fetching;
    const hasNextPage = next ? true : false;

    return (
      <Frame>
        {list && (
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
                        handleSearch={handleSearch}
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
        )}
      </Frame>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  product,
});

const mapDispatchToProps = {
  fetchGqlProducts,
  fetchMainTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));

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
      title: string,
      prev: string,
      next: string,
      fetching: bool,
      fetched: bool,
      pageToken: string,
    }).isRequired,

    history: shape().isRequired,
  }

  constructor(props) {
    super(props);
    const { next, prev } = this.props.product;
    this.state = {
      limit: 20,
      shop: cookie.load('shop'),
    };
  }

  componentDidMount() {
    const { fetched, title } = this.props.product;
    const { shop, limit } = this.state;

    if (!fetched) {
      this.props.fetchMainTheme(shop);
      this.props.fetchGqlProducts(shop, limit, title);
    }
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
  }

  handleSearch = (shop, limit, string) => {
    this.setState({
      title: string
    });
    this.props.fetchGqlProducts(shop, this.state.limit, string);
  }

  render() {
    const { product } = this.props;
    const { list, next, title, limit, prev } = product;
    const { shop } = this.state;
    const { handleProductClick, handlePagination, handleSearch, handlePreviousPage, handleNextPage } = this;

    const paginationMarkup =
      list.length > 0 ? (
        <Pagination
          hasPrevious={prev}
          hasNext={next}
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
                        title={title}
                        limit={limit}
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

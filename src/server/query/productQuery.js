import gql from 'graphql-tag';

export const searchProducts = (limit, title, after, before) => gql`
  {
    products(
      first:${limit},
      ${title ? `query:"title=${title}"` : ''},
      ${after ? `after:${after}` : ''}
      ${before ? `after:${before}` : ''}
    ){
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges{
        cursor
        node{
          id
          title
          featuredImage {
            id
          }
          handle
          images(first: 5) {
            edges {
              node {
                id
                src
              }
            }
          }
          metafields(first: 10) {
            edges {
              node {
                description
                key
                value
                namespace
              }
            }
          }
          tags
          variants(first: 20) {
            edges {
              node {
                id
                sku
                title
                displayName
              }
            }
          }
        }
      }
    }
  }
`;

export const getProducts = (limit, after, before) => gql`
  {
    products(
      first:${limit},
      ${after ? `after:${after}` : ''}
      ${before ? `after:${before}` : ''}
    ){
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges{
        cursor
        node{
          id
          title
          featuredImage {
            id
          }
          handle
          images(first: 5) {
            edges {
              node {
                id
                src
              }
            }
          }
          metafields(first: 10) {
            edges {
              node {
                description
                key
                value
                namespace
              }
            }
          }
          tags
          variants(first: 20) {
            edges {
              node {
                id
                sku
                title
                displayName
              }
            }
          }
        }
      }
    }
  }
`;

export default {
  searchProducts,
  getProducts,
};

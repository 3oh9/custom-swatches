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

export const getProducts = (limit, title, after, before) => gql`
  {
    products(
      ${!after && !before ? `first:${limit}` : ''}
      ${after ? `first:${limit}, after:"${after}"` : ''}
      ${before ? `last:${limit}, before:"${before}"` : ''}
      ${title ? `query:"*${title}*"` : ''}
    ){
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          legacyResourceId
          id
          title
          featuredImage {
            src
          }
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
          options(first: 5) {
            name
          }
          metafields(first: 1, namespace: "custom-swatch") {
            edges {
              node {
                key
                value
                namespace
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

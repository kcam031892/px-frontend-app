import { gql } from 'graphql-request';
export const GET_POSTS = gql`
  query Posts {
    posts {
      data {
        id
        title
      }
    }
  }
`;
export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

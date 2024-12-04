import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($productId: ID!, $review: String!, $rating: Int!) {
    addReview(productId: $productId, review: $review, rating: $rating) {
      reviews {
        username
        review
        rating
      }
    }
  }
`;

export const ADD_TO_BASKET = gql`
  mutation AddToBasket($productId: ID!, $quantity: Int!) {
    addToBasket(productId: $productId, quantity: $quantity) {
      _id
      product {
        name
        description
        price
        stock
      }
      quantity
    }
  }
`;

export const REMOVE_FROM_BASKET = gql`
  mutation RemoveFromBasket($productId: ID!) {
    removeFromBasket(productId: $productId) {
      _id
      product {
        name
        description
        price
        stock
      }
      quantity
    }
  }
`;


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
  mutation AddBasketItem($productId: ID!, $quantity: Int!) {
    addBasketItem(productId: $productId, quantity: $quantity) {
      _id
      basket {
        product {
          _id
        }
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_BASKET = gql`
  mutation RemoveBasketItem($productId: ID!) {
    removeBasketItem(productId: $productId) {
      _id
      basket {
        product {
          _id
        }
      }
    }
  }
`;

export const DECREMENT_BASKET_ITEM = gql`
  mutation DecrementBasketItem($productId: ID!) {
    decrementBasketItem(productId: $productId) {
      _id
      basket {
        product {
          _id
        }
      }
    }
  }
`;

export const CLEAR_BASKET = gql`
  mutation ClearBasket {
    clearBasket {
      _id
      basket {
        product {
          _id
        }
      }
    }
  }
`;

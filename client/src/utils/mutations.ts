import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        blogCount
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
        blogCount
      }
    }
  }
`;

export const ADD_BLOG = gql`
  mutation AddBlog($blogData: BlogInput) {
    addBlog(blogData: $blogData) {
      _id
      username
      title
      content
      dateCreated
      comments {
        _id
        username
        comment
        dateCreated
      }
      commentCount
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($blogId: ID!, $comment: String!) {
    addComment(blogId: $blogId, comment: $comment) {
      _id
      username
      title
      content
      dateCreated
      comments {
        _id
        username
        comment
        dateCreated
      }
      commentCount
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation RemoveBlog($blogId: ID!) {
    removeBlog(blogId: $blogId) {
      _id
      username
      title
      content
      dateCreated
      comments {
        _id
        username
        comment
        dateCreated
      }
      commentCount
    }
  }
`;

export const EDIT_BLOG = gql`
  mutation EditBlog($blogId: ID!, $title: String!, $content: String!) {
    editBlog(blogId: $blogId, title: $title, content: $content) {
      _id
      username
      title
      content
      dateCreated
      comments {
        _id
        username
        comment
        dateCreated
      }
      commentCount
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($productData: ProductInput) {
    addProduct(productData: $productData) {
      name
      description
      price
      stock
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

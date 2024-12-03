import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      blogCount
      blogs {
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
        basket {
          product {
            _id
            name
            description
            imageUrl
            price
            stock
          }
          quantity
        }
        basketCount
        basketTotal
      }
    }
  }
`;

export const GET_BLOGS = gql`
  query Blogs {
    blogs {
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

export const GET_BLOG = gql`
  query Blog($blogId: ID!) {
    blog(blogId: $blogId) {
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

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      description
      imageUrl
      price
      stock
      reviews {
        _id
        username
        review
        rating
        dateCreated
      }
      reviewCount
      rating
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      name
      description
      imageUrl
      price
      stock
      reviews {
        _id
        username
        review
        rating
        dateCreated
      }
      reviewCount
      rating
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
      imageUrl
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($categoryId: ID!) {
    category(categoryId: $categoryId) {
      _id
      name
      imageUrl
      products {
        _id
        name
        description
        imageUrl
        price
        stock
        reviews {
          _id
          username
          review
          rating
          dateCreated
        }
        reviewCount
        rating
      }
    }
  }
`;

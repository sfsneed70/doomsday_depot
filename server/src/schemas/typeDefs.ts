import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    blogCount: Int
    blogs: [Blog]
  }

  type Blog {
    _id: ID
    username: String!
    title: String!
    content: String!
    dateCreated: String
    comments: [Comment]
    commentCount: Int
  }

  type Comment {
    _id: ID
    username: String!
    comment: String!
    dateCreated: String
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
    reviews: [Review]
    reviewCount: Int
    rating: Float
  }

  input ProductInput {
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
  }

  type Review {
    _id: ID
    username: String!
    review: String!
    rating: Int!
    dateCreated: String
  }

  type BasketItem {
    _id: ID
    product: Product!
    quantity: Int
    dateAdded: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BlogInput {
    title: String!
    content: String!
  }

  type Query {
    me: User
    blogs: [Blog]
    blog(blogId: ID!): Blog

    // TODO
    getStock(_id: ID!): Product
    // TODO
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBlog(blogData: BlogInput): Blog
    addComment(blogId: ID!, comment: String!): Blog
    removeBlog(blogId: ID!): Blog
    editBlog(blogId: ID!, title: String!, content: String!): Blog
    addProduct(productData: ProductInput): Product

    // TODO
    removeProduct(_id: ID!): Product
    addStock(_id: ID!, quantity: Int!): Product
    removeStock(_id: ID!, quantity: Int!): Product
    // TODO

    addReview(productId: ID!, review: String!, rating: Int!): Product
    addBasketItem(productId: ID!, quantity: Int!): User
  }
`;

export default typeDefs;

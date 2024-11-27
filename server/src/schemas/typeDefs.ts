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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBlog(blogData: BlogInput): Blog
    addComment(blogId: ID!, comment: String!): Blog
    removeBlog(blogId: ID!): Blog
    editBlog(blogId: ID!, title: String!, content: String!): Blog
  }
`;

export default typeDefs;

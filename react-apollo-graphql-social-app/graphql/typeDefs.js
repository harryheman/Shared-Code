// Определения типов

// Утилита для формирования запросов и мутаций GraphQL
const gql = require('graphql-tag')

// Типы, запросы, мутации и подписка
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    avatar: String
    comments: [Comment]!
    likes: [Like]!
    createdAt: String!
    commentCount: Int!
    likeCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    avatar: String
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    avatar: String
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!

    createPost(body: String!): Post!
    deletePost(postId: ID!): String!

    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!

    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`

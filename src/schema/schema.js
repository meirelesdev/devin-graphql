const { gql } = require("apollo-server");

const schema = gql`
# Root Types
type Query {
    # Root Fields
    "Retorna um array de usuarios"
    users: [User!]!
    user(id: ID, name: String): User
    feed(last: Int): [Post!]!
  }
  
  type Mutation {
    createPost(content: String, userId: ID!): Post!
  }
  
  type Subscription {
    newPost: Post
  }
  
  # Object Types
  type User {
    id: ID!
    name: String!
    posts: [Post]
    followers: [User]
    following: [User]
  }
  type Post {
    id: ID
    title: String
    description: String
    content: String
    isPublished: Boolean
    author: User
    createdAt: Date
  }
  # Custom scalars
  scalar Date  
`
module.exports = schema
const { gql } = require("apollo-server");

const schema = gql`
  type Query {
    "O campo 'search' é um texto livre para busca, o campo 'order' pode receber somente duas opções: 'data' ou 'likes'"
    posts(search: String, order: String): [Post]!
    post(id: ID): Post
    users: [User]!
    user(id: ID): User!
  }

  type Mutation {
    createPost(postData: PostInputType): Post!
    updatePost(postId: ID, postData: PostInputType): Post!
    removePost(id: ID): Post
    addLikePost(id: ID): Post!
    removeLikePost(id: ID): Post!

    createUser(name: String, email: String, password: String): UserMutationResposen
    updateUser(id: ID, name: String, email: String): User!
    followUser(id: ID, followerId: ID): User!
    removeUser(id: ID): User

    login(email: String, password: String): UserMutationResposen!
  }

  interface MutationRespose {
    code: String!
    success: Boolean!
    message: String!
  }

  type UserMutationResposen implements MutationRespose {
    code: String!
    success: Boolean!
    message: String!
    token: String
  }

  input PostInputType {
    title: String
    description: String
    body: String
    authorId: ID
  }
  type Post {
    id: ID
    title: String
    description: String
    body: String
    author: User
    likes: Int
    createdAt: Date
  }
  type User {
    id: ID
    name: String
    email: String
    followers: [User!]
    posts: [Post!]
  }
  scalar Date
`;
module.exports = schema;

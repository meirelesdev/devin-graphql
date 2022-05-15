const { gql } = require("apollo-server");

const schema = gql`
  type Query {
    posts( search: String, order: String ): [Post!],
    post(id: ID): Post!
    users: [User!],
    user(id: ID): User!
  }

  type Mutation {
      createPost(title: String, description: String, body: String, authorId: ID): Post!
      updatePost(id: ID, title: String, description: String, body: String, authorId: ID): Post!
      removePost(id: ID): Post!
      addLikePost(id: ID): Post!
      removeLikePost(id: ID): Post!

      createUser(name: String): User!
      updateUser(id: ID, title: String, description: String, body: String, authorId: ID): User!
      followUser(id: ID, followerId: ID): User!
      removeUser(id: ID): Post!
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
      followers: [User!]
      posts: [Post!]
  }
  scalar Date
`;
module.exports = schema;
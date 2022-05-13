const { users, posts } = require('../data');

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    feed: () => posts
  },
  Mutation: {
    createPost:(_, args) => {
      const post = {
        id: `post-${posts.length + 1}`,
        title: "Novo post cadastrado",
        content: args.content,
        author: args.userId,
        createdAt: new Date(),
      }
      posts.push(post)
      return post
    }
  },
  User: {
    posts: (parent) => posts.filter(post => parent.id == post.author),
    followers: (parent) => users.filter(user => user.followers.includes(parent.id)),
    following: (parent) => users.filter(user => user.following.includes(parent.id)),
  },
  Post: {
    author: (parent) => users.find(user => user.id === parent.author)
  }
};
module.exports = resolvers;

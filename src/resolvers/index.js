const { users, posts } = require('../data');

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === Number(id)),
    feed: () => posts
  },
  User: {
    posts: (parent) => posts.filter(post => parent.id == post.author),
  },
  Post: {
    author: (parent) => users.find(user => user.id === Number(parent.author))
  }
};
module.exports = resolvers;

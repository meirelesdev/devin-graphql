const { users, posts } = require("../db");

const getPosts = (_, { search, order }) => {
  let result = [];
  if (search) {
    result = posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
      post.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    );
  } else {
      result = posts
  }
  if(order) {
      if(order === "data") {
          result = result.sort((a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            }
            return 1
          })
      }
      if(order === "likes") {
        result = result.sort((a, b) => {
            if(a.likes > b.likes) {
                return -1
            }
            return 1
        })
    }
  }
  return result;
};

const resolvers = {
  Query: {
    posts: getPosts,
    post: (_, { id }) => posts.find((post) => post.id === Number(id)),
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === Number(id)),
  },
  Post: {
      author: (parent) => users.find(user => user.id === Number(parent.author))
  },
  User: {
    posts: (parent) => posts.filter(post => parent.posts.includes(post.id)),
    followers: (parent) => users.filter(follower => parent.followers.includes(follower.id))
  }
};

module.exports = resolvers;

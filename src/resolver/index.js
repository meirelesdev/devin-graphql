const { users, posts } = require("../db");

const getPosts = (_, { search, order }) => {
  let result = [];
  if (search) {
    result = posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
      post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  if(order) {
      if(order === "data") {
          result = result.sort((a, b) => {
              return a.createAd < b.createAd
          })
      }
      if(order === "likes") {
        result = result.sort((a, b) => {
            return a.likes > b.likes
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
  }
};

module.exports = resolvers;

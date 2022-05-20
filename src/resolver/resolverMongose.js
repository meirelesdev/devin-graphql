const resolverMongoose = {
  Query: {
    posts: (_, __, { dataSources: { posts } }) => posts.getAllPosts(),
    post: (_, { id }, { dataSources: { posts } }) => posts.getPostById(id),
    users: (_, __, { dataSources: { users }}) => users.getAllUsers(),
    user: (_, { id }, { dataSources: { users } } ) => users.getUserById(id),
  },
  Mutation: {
    createPost: async (_, {postData}, { dataSources: { posts, users } } ) => {
      const user = await users.getUserById(postData.authorId)
      if(!user) throw new Error("Author not found.")
      return posts.create(postData)
    },
    createUser: (_, {name}, {dataSources: { users}}) => users.createUser(name),
    updatePost: () => console.log("update post"),
    removePost: () => console.log("remover post"),
    addLikePost: () => console.log("like post"),
    removeLikePost: () => console.log("deslike post"),
    updateUser: (_, { id }, {dataSources: { users}}) => console.log("Update user"),
    followUser: (_, { id, followerId }, {dataSources: { users}}) => console.log("Add follower user"),
    removeUser: (_, { id }, {dataSources: { users}}) => console.log("remover user"),
  },
  Post: {
    author: async (post, _, { dataSources: { users } } ) => {
     const user = await users.getUserById(post.author)
     console.log(post)
    },
  },
  User: {
    posts: (user, _, { dataSources: { posts } } ) => posts.getByAuthor(user.id),
    followers: (user, _, { dataSources: { users } }) => users.getFollowers(user.id),
  },
};

module.exports = resolverMongoose;

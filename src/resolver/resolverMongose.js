const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const resolverMongoose = {
  Query: {
    posts: (_, __, { dataSources: { posts } }) => posts.getAll(),
    post: (_, { id }, { dataSources: { posts } }) => posts.getById(id),
    users: (_, __, { dataSources: { users } }) => users.getAll(),
    user: (_, { id }, { dataSources: { users } }) => users.getById(id),
  },
  Mutation: {
    createPost: async (_, { postData }, { dataSources: { posts, users } }) => {
      const user = await users.getById(postData.authorId);
      if (!user) throw new Error("Author not found.");
      const post = {
        title: postData.title,
        description: postData.description,
        body: postData.body,
        author: user._id,
        likes: 0,
      };
      return posts.create(post);
    },
    updatePost: async (
      _,
      { postId, postData: { title, description, body, authorId } },
      { dataSources: { posts, users } }
    ) => {
      const user = await users.getById(authorId);
      if (!user) throw new Error("Author not found.");
      const post = await posts.getById(postId);
      post.author = user._id;
      post.title = title || post.title;
      post.description = description || post.description;
      post.body = body || post.body;
      return post.save();
    },
    createUser: async (_,{ name, email, password }, { dataSources: { users } }) => {
      const newUser = await users.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      const token = jwt.sign({ userId: newUser._id }, process.env.APP_SECRET);
      return {
        code: "200",
        success: true,
        message: "Usuario criado com sucesso.",
        token,
      };
    },
    removePost: async (_, { id }, { dataSources: { posts } }) => {
      return posts.model.deleteOne({ _id: id });
    },
    addLikePost: async (_, { id }, { dataSources: { posts } }) => {
      const post = await posts.getById(id);
      post.likes++;
      return post.save();
    },
    removeLikePost: async (_, { id }, { dataSources: { posts } }) => {
      const post = await posts.getById(id);
      post.likes--;
      return post.save();
    },
    updateUser: async (_, { id, name }, { dataSources: { users } }) => {
      const user = await users.getById(id);
      user.name = name || user.name;
      return user.save();
    },
    followUser: async (_, { id, followerId }, { dataSources: { users } }) => {
      const user = await users.getById(id);
      if (!user) throw new Error("User not found.");
      const follower = await users.getById(followerId);
      if (!follower) throw new Error("Follower not found.");
      // console.log(user)
      user.followers.push(follower._id);
      return user.save();
    },
    removeUser: async (_, { id }, { dataSources: { users } }) => {
      return users.model.deleteOne({ _id: id });
    },
    login: async (_, {email, password}, {dataSources: { users }}) => {
      const [ user ] = await users.getByEmail(email)
      if (!user) throw new Error("E-mail e/ou Senha inválido(a).")
      
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("E-mail e/ou Senha inválido(a).")
      
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      
      return {
        code: "200",
        success: true,
        message: "Login efetuado com sucesso.",
        token,
      };
    }
  },
  Post: {
    author: async (post, _, { dataSources: { users } }) => {
      return users.getById(post.author);
    },
  },
  User: {
    posts: (user, _, { dataSources: { posts } }) => posts.getByAuthor(user.id),
    followers: async (user, _, { dataSources: { users } }) =>
      users.getFollowers(user.followers),
  },
};

module.exports = resolverMongoose;

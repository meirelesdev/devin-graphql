require("dotenv").config();
const mongoose = require("mongoose");

const { ApolloServer, PubSub } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolver");
const Users = require("./dataSources/users");
const Posts = require("./dataSources/posts");
const userSchema = require("./mongooseSchema/userSchema");
const postSchema = require("./mongooseSchema/postSchema");
const { getUserId } = require('./utils')

const pubsub = new PubSub()

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};

const dsn = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/?authMechanism=DEFAULT`;

mongoose
  .connect(dsn)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log("Database failed:", err));

const server = new ApolloServer({
  typeDefs: schema,
  // resolvers: resolvers.resolverStatic,
  resolvers: resolvers.resolverMongoose,
  subscriptions: {
    path: '/subscritions'
  },
  context: (args) => {
      return {
        pubsub,
        userId: args.req && args.req.headers.authorization ? getUserId(args.req) : null,
      };
  },
  dataSources: () => {
    return {
      users: new Users(userSchema),
      posts: new Posts(postSchema),
    };
  },
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

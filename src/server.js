
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers')
const schema = require('./schema')

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  await server.start();

  const app = express();

  // Additional middleware can be mounted at this point to run before Apollo.
//   app.use('*', jwtCheck, requireAuth, checkScope);

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/graphql' });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer()
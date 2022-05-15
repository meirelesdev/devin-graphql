const { ApolloServer, gql } = require('apollo-server')

// Schema
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!! Meu primeiro servidor GraphQL!!"
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
server.listen(3000, () => console.log(`Server is running on `))
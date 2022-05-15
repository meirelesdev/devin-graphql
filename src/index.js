const { ApolloServer, gql } = require('apollo-server')
const schema = require('./schema')


const resolvers = {
    Query: {
        posts: () => [],
        users: () => [],
    },
}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
})
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
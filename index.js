const { ApolloServer, gql } = require('apollo-server')


const users = [
    {id: 1, name: "Daniel" },
    {id: 2, name: "Maria" },
    {id: 3, name: "Meireles" },
    {id: 4, name: "Gisele" },
]
// Schema
const typeDefs = gql`
    type Query {
        hello: String
        allUsers: [User!]
        user(id: ID, name: String): User
    }

    type User {
        id: ID!
        name: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!! Meu primeiro servidor GraphQL!!",
        allUsers: () => users,
        user: (_, { id, name}) => users.find(user => user.id === Number(id) || user.name === name),
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
server.listen(3000, () => console.log(`Server is running on `))
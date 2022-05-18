require("dotenv").config()

const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server')

const Users = require('./models/dataSourceUser')
const Posts = require('./models/dataSourcePost')
const user = require('./models/user')
const post = require('./models/post')


const schema = require('./schema')
const resolvers = require('./resolver')
const db = {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
}
mongoose
.connect(`mongodb://${db.host}/${db.name}?retryWrites=true&w=majority`)
.then(() => console.log("Database is connected"))
.catch((err)=> console.log("Database failed:", err))

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    tracing: true,
    context: ({req}) => {
        return req
    },
    dataSources: () => {
        return { 
            users: new Users(user),
            posts: new Posts(post)
         }
    }
})
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
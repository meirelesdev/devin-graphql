require("dotenv").config()
const mongoose = require("mongoose")

const { ApolloServer } = require('apollo-server')
const schema = require('./schema')
const resolvers = require('./resolver')
const Users = require("./dataSoures/users")
const Posts = require("./dataSoures/posts")
const userSchema = require("./mongooseSchema/userSchema")
const postSchema = require("./mongooseSchema/postSchema")

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
    context: ({req}) => {

    },
    dataSources: () => {
        return { 
            users: new Users(userSchema),
            posts: new Posts(postSchema)
         }
    }
})
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
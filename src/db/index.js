const users = [
    {
        id: 1,
        name: "Daniel",
        followers: [],
        posts: [],
    }
]
const posts = [
    {
        id: 1,
        title: "",
        description: "",
        body: "",
        author: 1,
        likes: 0,
        createdAt: new Date()
    }
]

module.exports = {
    users,
    posts
}
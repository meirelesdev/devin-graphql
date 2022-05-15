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
        title: "Meu primeiro post",
        description: "Descrição legal do primeiro post",
        body: "Conteudo legal do primeiro post",
        author: 1,
        likes: 0,
        createdAt: new Date()
    },
    {
        id: 2,
        title: "Meu segundo post",
        description: "Descrição legal do segundo post",
        body: "Conteudo legal do segundo post",
        author: 1,
        likes: 20,
        createdAt: new Date()
    },
    {
        id: 3,
        title: "Meu terceiro post",
        description: "Descrição legal do terceiro post",
        body: "Conteudo legal do terceiro post",
        author: 1,
        likes: 15,
        createdAt: new Date()
    }
]

module.exports = {
    users,
    posts
}
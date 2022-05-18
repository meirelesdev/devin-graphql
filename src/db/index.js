const users = [
    ,
    {
        id: 2,
        name: "Gisele",
        followers: [],
        posts: [3],
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
        createdAt: new Date("2020-01-01")
    },
    {
        id: 2,
        title: "Meu segundo post",
        description: "Descrição legal do segundo post",
        body: "Conteudo legal do segundo post",
        author: 1,
        likes: 20,
        createdAt: new Date("2019-01-01")
    },
    {
        id: 3,
        title: "Meu terceiro post",
        description: "Descrição legal do terceiro post",
        body: "Conteudo legal do terceiro post",
        author: 1,
        likes: 15,
        createdAt: new Date("2022-01-01")
    },
    {
        id: 4,
        title: "Meu quarto post",
        description: "Descrição legal do quarto post",
        body: "Conteudo legal do quarto post",
        author: 1,
        likes: 5,
        createdAt: new Date("2021-01-01")
    }
]

module.exports = {
    users,
    posts
}
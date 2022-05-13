const users = [
  {
    id: "1",
    name: "Daniel",
    followers: ["3", "4"],
    following: ["4", "2"],
  },
  {
    id: "2",
    name: "Maria",
    followers: ["2", "4"],
    following: ["1", "3"],
  },
  {
    id: "3",
    name: "Meireles",
    followers: ["1", "2"],
    following: ["1", "4"],
  },
  {
    id: "4",
    name: "Gisele",
    followers: ["1", "2"],
    following: ["3", "1"],
  },
];

const posts = [
  {
    id: "12",
    title: "Meu primeiro Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: "1",
    createdAt: new Date(),
  },
  {
    id: "13",
    title: "Meu segundo Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: "1",
    createdAt: new Date(),
  },
  {
    id: "14",
    title: "Meu Terceiro Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: "4",
    createdAt: new Date(),
  },
];

module.exports = {
  users,
  posts,
};

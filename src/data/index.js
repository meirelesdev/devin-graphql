const users = [
  { id: 1, name: "Daniel" },
  { id: 2, name: "Maria" },
  { id: 3, name: "Meireles" },
  { id: 4, name: "Gisele" },
];

const posts = [
  {
    id: 12,
    title: "Meu primeiro Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: 1,
    createdAt: new Date(),
  },
  {
    id: 13,
    title: "Meu segundo Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: 1,
    createdAt: new Date(),
  },
  {
    id: 14,
    title: "Meu Terceiro Post",
    description: "Um post bem legal para treinar GraphQL",
    content: "Um texto legal para o conteudo do post legal.",
    isPublished: false,
    author: 4,
    createdAt: new Date(),
  },
];

module.exports = {
  users,
  posts,
};

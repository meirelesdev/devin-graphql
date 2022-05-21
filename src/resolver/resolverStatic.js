const { users, posts } = require("../db");

const getPosts = (_, { search, order }) => {
  let result = [];
  if (search) {
    result = posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
      post.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    );
  } else {
      result = posts
  }
  if(order) {
      if(order === "data") {
          result = result.sort((a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            }
            return 1
          })
      }
      if(order === "likes") {
        result = result.sort((a, b) => {
            if(a.likes > b.likes) {
                return -1
            }
            return 1
        })
    }
  }
  return result;
};

const likeOrDesLikePost = (id, like) =>{
  const index = posts.findIndex(post => post.id === Number(id))
  if(like) {
    posts[index].likes++
    return posts[index]
  }
  posts[index].likes--
    return posts[index]
}
const addFollower = (id, follower) => {
  const index = users.findIndex(user => user.id === Number(id))
  if(index > -1) {
    users[index].followers.push(Number(follower))
  }
  return users[index]
}
const resolvers = {
  Query: {
    posts: getPosts,
    post: (_, { id }) => posts.find((post) => post.id === Number(id)),
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === Number(id)),
  },
  Mutation: {
    createPost: (_, {title, description, body, authorId}) => {
      const user = users.find(user => user.id === Number(authorId))
      const post = {
        id: posts.length + 1,
        title,
        description,
        body,
        author: user.id,
        likes: 0,
        createdAt: new Date()
      }
      user.posts.push(post.id)
      posts.push(post)
      return post
    },
    updatePost:(_, {id, title, description, body, authorId}) => {
      const post  = posts.find(post => post.id === Number(id))
      if(post) {
        post.title = title || post.title
        post.description = description || post.description
        post.body = body || post.body
        post.author = Number(authorId) || post.author
      }
      return post      
    },
    removePost:(_, { id }) => {
      const index = posts.findIndex((post)=> post.id === Number(id))
      if(index > -1) {
        const [ deletePost ] = posts.splice(index, 1)
        return deletePost
      }      
    },
    addLikePost:(_, { id } ) => {
      return likeOrDesLikePost(id, true)
    },
    removeLikePost:(_, { id }) => {
      return likeOrDesLikePost(id, false)
    },
    createUser:(_, { name }) => {
      const user = {
        id: users.length + 1,
        name,
        followers: [],
        posts: []
      }
      users.push(user)
      return users
    },
    updateUser:(_, { id, name }) => {
        const index = users.findIndex(user => user.id === Number(id))
        if(index > -1 ){
          users[index].name = name || users[index].name
        }
        return users[index]
    },
    followUser:(_, {id, followerId }) => {
      return addFollower(id, followerId)      
    },
    removeUser:(_, { id }) => {
      const index = users.findIndex(user => user.id === Number(id))
      if (index > -1 ) {
        const userDeleted = users[index]
        users.slice(index, 1)
        return userDeleted
      }      
    },
  },
  Post: {
      author: (parent) => users.find(user => user.id === Number(parent.author))
  },
  User: {
    posts: (parent) => {
      return posts.filter(post => parent.posts.includes(post.id))
    },
    followers: (parent) => users.filter(follower => parent.followers.includes(follower.id))
  }
};

module.exports = resolvers;

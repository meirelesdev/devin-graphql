const { MongoDataSource } = require("apollo-datasource-mongodb");

class Posts extends MongoDataSource {
  async getAllPosts() {
    return this.model.find({});
  }
  async getPostById(postId) {
    return this.findOneById(postId)
  }
  async create(post){
    return this.model.create(post)
  }
  async getByAuthor(authorId) {
    return this.findByFields({author:authorId})
  }
}
module.exports = Posts;

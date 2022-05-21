const { MongoDataSource } = require("apollo-datasource-mongodb");

class Posts extends MongoDataSource {
  async getAll() {
    return this.model.find({});
  }
  async getById(postId) {
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

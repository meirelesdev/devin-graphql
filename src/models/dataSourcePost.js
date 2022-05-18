const { MongoDataSource } = require("apollo-datasource-mongodb");

class Posts extends MongoDataSource {
  getUser(postId) {
    return this.findOneById(postId);
  }
}
module.exports = Posts;

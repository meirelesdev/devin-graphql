const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  async getById(userId) {
    return this.model.findById(userId);
  }

  async getAll() {
    return this.model.find()
  }
  async create(name) {
    return this.model.create({name})
  }
  async getFollowers(followersArr) {
    return this.model.find( { _id : { $in : followersArr } } );
  }
}
module.exports = Users;

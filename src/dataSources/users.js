const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  async getUserById(userId) {
    return this.model.findById(userId);
  }

  async getAllUsers() {
    return this.model.find()
  }
  async createUser(name) {
    return this.model.create({name})
  }
  async getFollowers(userId) {
    return this.findByFields({followers: userId})
  }
}
module.exports = Users;

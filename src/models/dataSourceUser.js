const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId);
  }

  async findAll() {
    return this.model.find()
  }
}
module.exports = Users;

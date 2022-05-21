const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  async getById(userId) {
    return this.model.findById(userId);
  }

  async getAll() {
    return this.model.find()
  }
  async create(user) {
    return this.model.create(user)
  }
  async getFollowers(followersArr) {
    return this.model.find( { _id : { $in : followersArr } } );
  }
  async getByEmail(email) {
    return this.model.find({email})
  }
}
module.exports = Users;

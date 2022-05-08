const db = require('../models');
const User = db.users;

class UserController {
  async createUser(req, res) {
    const user = {
      type: 'adminn',
      password: 'pass',
      login: 'new login',
      fullName: 'fFFF lfsd',
    };
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error user create',
        });
      });
  }
}

module.exports = new UserController();

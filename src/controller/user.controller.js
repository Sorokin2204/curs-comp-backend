const db = require('../models');
const User = db.users;

class UserController {
  async createUser(req, res) {
    const user = {
      type: 'client',
      password: 'pass',
      login: 'new_login',
      fullName: 'Лутько Владимир Петрович',
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

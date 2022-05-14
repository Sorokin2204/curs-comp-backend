const db = require('../models');
const userService = require('../services/user.service');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class UserController {
  async registerUser(req, res) {
    try {
      const { login, phone, password, fullName } = req.body;
      const findUser = await User.findOne({ where: { login } });
      if (findUser) {
        throw new Error('Такой пользователь уже существует');
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({ login, phone, fullName, password: hashPassword, type: 'client' });
      const accessToken = jwt.sign({ id: user.id, login: user.login, phone: user.phone, fullName: user.fullName, type: user.type }, 'access-secret', { expiresIn: '24h' });

      return res.json({ token: accessToken });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async loginUser(req, res) {
    try {
      const { login, password } = req.body;
      const userFind = await User.findOne({ raw: true, where: { login } });
      if (!userFind) {
        throw new Error('Неправильный логин или пароль');
      }

      const validPassword = bcrypt.compareSync(password, userFind.password);
      if (!validPassword) {
        throw new Error('Неправильный логин или пароль');
      }
      const payload = {
        id: userFind.id,
        login: userFind.login,
        phone: userFind.phone,
        fullName: userFind.fullName,
        type: userFind.type,
      };
      const token = jwt.sign(payload, 'access-secret', { expiresIn: '24h' });
      res.json({ token });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async checkAuth(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }
      const decodedData = jwt.verify(token, 'access-secret');
      res.json({ message: 'Success', login: decodedData.login, id: decodedData.id, phone: decodedData.phone, fullName: decodedData.fullName, type: decodedData.type });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new UserController();

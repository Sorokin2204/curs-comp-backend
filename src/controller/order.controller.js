const db = require('../models');
const OrderService = require('../services/order.service');
const Order = db.orders;
const User = db.users;

class OrderController {
  async createOrder(req, res) {
    try {
      const { userId, products } = req.body;
      const userFind = await User.findOne({ where: { id: userId } });
      if (!userFind) {
        throw new Error('Такого пользователя не существует');
      }
      if (!Array.isArray(products) || products?.length === 0) {
        throw new Error('Неправильный формат входных данных');
      }
      const newOrder = await OrderService.createOrder(userId, products);
      res.json(newOrder);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async changeStatusOrder(req, res) {
    try {
      const { id, status } = req.body;
      const updateOrder = await Order.update({ status }, { where: { id } });
      res.json(updateOrder);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new OrderController();
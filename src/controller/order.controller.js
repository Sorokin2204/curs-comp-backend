const db = require('../models');
const OrderService = require('../services/order.service');
const Order = db.orders;
const User = db.users;
const Product = db.products;
const _ = require('lodash');
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
  async updateStatusOrder(req, res) {
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
  async getOrderSingle(req, res) {
    try {
      const { orderId } = req.params;
      const orders = await Order.findOne({ where: { id: orderId }, include: [{ model: Product }, { model: User }] }).then((doc) => {
        const response = {
          id: doc.id,
          number: doc.number,
          status: doc.status,
          products: doc.products,
          user: doc.user,
          total: _.sum(doc.products.map((prod) => prod.productOrder.price * prod.productOrder.quantity)),
        };

        return response;
      });
      res.json(orders);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Product, attributes: ['id'] }, { model: User }],
      }).then((docs) => {
        const response = docs.map((doc) => ({
          id: doc.id,
          number: doc.number,
          status: doc.status,
          user: doc.user.fullName,
          total: _.sum(doc.products.map((prod) => prod.productOrder.price * prod.productOrder.quantity)),
          quantity: _.sum(doc.products.map((prod) => prod.productOrder.quantity)),
        }));

        return response;
      });
      res.json(orders);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new OrderController();

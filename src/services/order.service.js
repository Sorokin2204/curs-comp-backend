const db = require('../models');
const Order = db.orders;
const ProductOrder = db.productOrders;

class OrderService {
  async createOrder(userId, products) {
    const randomNumber = Math.random() * (999999 - 1000) + 1000;

    const order = {
      userId,
      number: randomNumber,
    };
    const newOrder = await Order.create(order);
    await this.createProductOrders(newOrder.id, products);
    return newOrder;
  }

  async createProductOrders(orderId, products) {
    for (let product of products) {
      const productOrder = {
        productId: product.id,
        price: product.price,
        quantity: product.quantity,
        orderId,
      };
      await ProductOrder.create(productOrder);
    }
  }
}

module.exports = new OrderService();

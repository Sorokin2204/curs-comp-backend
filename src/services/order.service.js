const db = require('../models');
const Order = db.orders;
const ProductOrder = db.productOrders; 
const Product = db.products; 

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
      const findProduct = await Product.findOne({ where: { id: product.id } });
      const productOrder = {
        productId: product.id,
        price: findProduct.price,
        quantity: product.quantity,
        orderId,
      };
      await ProductOrder.create(productOrder);
    }
  }
}

module.exports = new OrderService();

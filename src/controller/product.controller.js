const db = require('../models');
const productService = require('../services/product.service');
const { Op } = require('sequelize');
const Product = db.products;
const Category = db.categories;
const Brand = db.brands;

class ProductController {
  async createProduct(req, res) {
    try {
      const { attributes, ...productRest } = req.body;

      // if (attributes === '[]') {
      //   throw new Error('Неправильный формат входных данных');
      // }
      const image = req?.file?.filename ?? '';
      const findProduct = await Product.findOne({ where: { name: productRest.name } });
      const findCategory = await Category.findOne({ where: { id: productRest.categoryId } });
      const findBrand = await Brand.findOne({ where: { id: productRest.brandId } });
      if (findProduct) {
        throw new Error('Товар с таким именем уже существует');
      }
      if (!findCategory) {
        throw new Error('Такой категории не существует');
      }
      if (!findBrand) {
        throw new Error('Такого бренда не существует');
      }
      const productObj = { ...productRest, price: parseInt(productRest.price), image };
      const product = await Product.create(productObj);
      if (attributes !== '[]') {
        await productService.createAttributesProduct(product.id, JSON.parse(attributes));
      }
      res.json(product);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const { attributes, id, ...productRest } = req.body;
      const image = req?.file?.filename ?? '';
      const findProduct = await Product.findOne({ where: { id } });
      if (!findProduct) {
        throw new Error('Такого товара несуществует');
      }
      const updateProduct = await Product.update({ ...productRest, image, price: parseInt(productRest.price) }, { where: { id } });
      await productService.deleteAttributesProduct(id);
      if (attributes !== '[]') {
        await productService.createAttributesProduct(id, JSON.parse(attributes));
      }

      res.json(updateProduct);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.body;
      const deleteProduct = await Product.update({ deleted: true }, { where: { id } });
      res.json({ message: 'Success' });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async getProducts(req, res) {
    try {
      const { categoryId, limit, exclude, include, sort } = req.query;
      const products = await Product.findAll({
        include: [Category, Brand],
        where: { deleted: false },
        ...(categoryId && { where: { deleted: false, categoryId, ...(exclude && { id: { [Op.not]: exclude } }) } }),
        ...(limit && { limit: parseInt(limit) }),
        ...(include && { where: { deleted: false, id: include } }),
        ...(sort && { order: [['createdAt', 'DESC']] }),
      });
      res.json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async getSingleProduct(req, res) {
    try {
      const { productId } = req.params;
      const productFind = await Product.findOne({ include: [Brand, Category], where: { id: productId, deleted: false } });
      res.json(productFind);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async searchProducts(req, res) {
    try {
      const { searchText } = req.params;
      const searchProducts = await Product.findAll({ where: { deleted: false, name: { [Op.like]: `%${searchText}%` } } });

      res.json(searchProducts);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new ProductController();

const db = require('../models');
const productService = require('../services/product.service');
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
      res.json(deleteProduct);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async getProducts(req, res) {
    try {
      const products = await Product.findAll({ include: [Category, Brand] });
      res.json(products);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new ProductController();

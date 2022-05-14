const db = require('../models');
const Brand = db.brands;
const Product = db.products;

class BrandController {
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const findBrand = await Brand.findOne({ where: { name } });
      if (findBrand) {
        throw new Error('Бренд с таким именем уже существует');
      }
      const brand = {
        name,
      };
      const newBrand = await Brand.create(brand);
      res.send(newBrand);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async updateBrand(req, res) {
    try {
      const { id, name } = req.body;
      const findBrand = await Brand.findOne({ where: { id } });
      if (!findBrand) {
        throw new Error('Такого бренд не существует');
      }
      const updateBrand = await Brand.update({ name }, { where: { id } });
      res.send(updateBrand);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async deleteBrand(req, res) {
    try {
      const { id } = req.body;
      await Brand.update({ deleted: true }, { where: { id } });
      const deleteProduct = await Product.update({ deleted: true }, { where: { brandId: id } });
      res.json(deleteProduct);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }

  async getBrands(req, res) {
    try {
      const brands = await Brand.findAll({ where: { deleted: false } });
      res.json(brands);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new BrandController();

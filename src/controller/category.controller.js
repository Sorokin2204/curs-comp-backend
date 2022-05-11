const db = require('../models');
const Category = db.categories;

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const findCategory = await Category.findOne({ where: { name } });
      if (findCategory) {
        throw new Error('Категория с таким именем уже существует');
      }
      const category = {
        name,
      };
      const newCategory = await Category.create(category);
      res.send(newCategory);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const { id, name } = req.body;
      const findCategory = await Category.findOne({ where: { id } });
      if (!findCategory) {
        throw new Error('Такой категории не существует');
      }
      const updateCategory = await Category.update({ name }, { where: { id } });
      res.send(updateCategory);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { id } = req.body;
      const deleteProduct = await Product.update({ deleted: true }, { where: { categoryId: id } });
      res.json(deleteProduct);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new CategoryController();

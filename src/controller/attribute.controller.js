const db = require('../models');
const attributeService = require('../services/attribute.service');
const Attribute = db.attributes;
const Category = db.attributes;

class AttributeController {
  async createAttribute(req, res) {
    try {
      const { id, attributes } = req.body;
      const findCategory = await Category.findOne({ where: { id } });
      if (!findCategory) {
        throw new Error('Такой категории не существует');
      }
      if (!Array.isArray(attributes) || attributes?.length === 0) {
        throw new Error('Неправильный формат входных данных');
      }

      await attributeService.createAllAttributes(id, attributes);
      res.send(findCategory);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
  async updateAttribute(req, res) {
    try {
      const { id, attributes } = req.body;
      const findCategory = await Category.findOne({ where: { id } });
      if (!findCategory) {
        throw new Error('Такой категории не существует');
      }
      if (!Array.isArray(attributes) || attributes?.length === 0) {
        throw new Error('Неправильный формат входных данных');
      }
      await attributeService.updateAllAttributes(id, attributes);

      res.send(true);
    } catch (error) {
      res.status(500).send({
        message: error.stack || 'Непредвиденная ошибка',
      });
    }
  }
}

module.exports = new AttributeController();

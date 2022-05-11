const db = require('../models');
const attributeService = require('../services/attribute.service');
const Attribute = db.attributes;
const AttributeText = db.attributeTexts;
const AttributeCheckbox = db.attributeCheckboxes;
const AttributeSelect = db.attributeSelects;
const AttributeNumber = db.attributeNumbers;
const AttributeOption = db.attributeOptions;
const Category = db.categories;
const _ = require('lodash');
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

  async getCategoryAttributes(req, res) {
    try {
      const { categoryId } = req.params;
      const findCategory = await Category.findOne({ where: { id: categoryId } });
      if (!findCategory) {
        throw new Error('Такой категории не существует');
      }
      let categoryAttributes = await Attribute.findAll({ include: AttributeOption, attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { categoryId } });

      res.send(categoryAttributes);
    } catch (error) {
      res.status(500).send({
        message: error.stack || 'Непредвиденная ошибка',
      });
    }
  }

  async getProductAttributes(req, res) {
    try {
      const productId = req.query.productId;
      let productAttributes = [];
      if (productId) {
        const textAttributes = await AttributeText.findAll({ raw: true, where: { productId } });
        const checkboxAttributes = await AttributeCheckbox.findAll({ raw: true, where: { productId } });
        let selectAttributes = await AttributeSelect.findAll({ raw: true, where: { productId } });
        const numberAttributes = await AttributeNumber.findAll({ raw: true, where: { productId } });

        const findOptions = await AttributeOption.findAll({ raw: true, where: { id: selectAttributes.map((attrSelect) => attrSelect.optionId) } });
        selectAttributes = selectAttributes.map((attrSelect) => ({ id: findOptions.find((optFind) => optFind.id === attrSelect.optionId).attributeId, value: attrSelect.optionId }));
        productAttributes = [...convertToSimpleAttributes(textAttributes), ...convertToSimpleAttributes(checkboxAttributes), ...selectAttributes, ...convertToSimpleAttributes(numberAttributes)];
        res.send(productAttributes);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: error.message || 'Непредвиденная ошибка',
      });
    }
  }
}
function convertToSimpleAttributes(attrs) {
  return attrs.map((attr) => ({ id: attr.attributeId, value: attr.value }));
}
module.exports = new AttributeController();

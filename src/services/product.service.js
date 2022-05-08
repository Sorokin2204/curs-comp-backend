const attributeCheckboxService = require('./attributeCheckbox.service');
const attributeNumberService = require('./attributeNumber.service');
const attributeTextService = require('./attributeText.service');
const db = require('../models');
const AttributeText = db.attributeTexts;
const AttributeNumber = db.attributeNumbers;
const AttributeSelect = db.attributeSelects;
const AttributeCheckbox = db.attributeCheckboxes;
const AttributeOption = db.attributeOptions;
class ProductService {
  async createAttributesProduct(productId, attributes) {
    try {
    } catch (error) {}
    for (let { id: attributeId, value, type } of attributes) {
      if (!attributeId || value === undefined) {
        throw new Error('Неправильный формат входных данных');
      }
      switch (type) {
        case 'text':
          AttributeText.create({ productId, attributeId, value });
          break;
        case 'select': {
          const attributeOptionFind = await AttributeOption.findOne({ where: { id: value } });

          if (!attributeOptionFind) {
            throw new Error('Такой опции не существует');
          }
          AttributeSelect.create({ productId, optionId: value });
          break;
        }

        case 'number':
          AttributeNumber.create({ productId, attributeId, value });
          break;
        case 'checkbox':
          AttributeCheckbox.create({ productId, attributeId, value });
          break;
        default:
          break;
      }
    }
  }

  async deleteAttributesProduct(productId) {
    await AttributeText.destroy({
      where: {
        productId,
      },
    });
    await AttributeNumber.destroy({
      where: {
        productId,
      },
    });
    await AttributeSelect.destroy({
      where: {
        productId,
      },
    });
    await AttributeCheckbox.destroy({
      where: {
        productId,
      },
    });
  }
}

module.exports = new ProductService();

const attributeCheckboxService = require('./attributeCheckbox.service');
const attributeNumberService = require('./attributeNumber.service');
const attributeOptionService = require('./attributeOption.service');
const attributeTextService = require('./attributeText.service');

const db = require('../models');
const Attribute = db.attributes;
const AttributeText = db.attributeTexts;
const AttributeNumber = db.attributeNumbers;
const AttributeSelect = db.attributeSelects;
const AttributeCheckbox = db.attributeCheckboxes;
const AttributeOption = db.attributeOptions;

class AttributeService {
  async createAllAttributes(id, attributes) {
    for (let { type, name, options } of attributes) {
      if (!type) {
        throw new Error('Неправильный формат данных');
      }
      const attribute = {
        type,
        name,
        categoryId: id,
      };
      const newAttribute = await Attribute.create(attribute);
      if (type == 'select') {
        await attributeOptionService.createAttributeOption(newAttribute.id, options);
      }
    }
  }
  async updateAllAttributes(categoryId, attributes) {
    for (let { id: attributeId, name, type, options, status } of attributes) {
      switch (status) {
        case 'added': {
          const attribute = {
            type,
            name,
            categoryId,
          };
          const newAttribute = await Attribute.create(attribute);
          if (type == 'select') {
            await attributeOptionService.createAttributeOption(newAttribute.id, options);
          }
          break;
        }
        case 'updated': {
          if (type == 'select') {
            await attributeOptionService.updateAttributeOption(attributeId, options);
          }
          await Attribute.update(
            { name },
            {
              where: {
                id: attributeId,
              },
            },
          );
          break;
        }
        case 'deleted': {
          await this.deleteAttributeType(attributeId, type);
          await Attribute.destroy({
            where: {
              id: attributeId,
            },
          });
          break;
        }
        default:
          break;
      }
    }
  }

  async deleteAttributeType(attributeId, type) {
    switch (type) {
      case 'text': {
        await AttributeText.destroy({
          where: {
            attributeId,
          },
        });
        break;
      }
      case 'number': {
        await AttributeNumber.destroy({
          where: {
            attributeId,
          },
        });
        break;
      }
      case 'select': {
        const attributeOptionsFind = await AttributeOption.findAll({ where: { attributeId } });
        for (attributeOption of attributeOptionsFind) {
          await AttributeSelect.destroy({
            where: {
              optionId: attributeOption.id,
            },
          });
          await AttributeOption.destroy({ where: { id: attributeOption.id } });
        }

        break;
      }
      case 'checkbox': {
        await AttributeCheckbox.destroy({
          where: {
            attributeId,
          },
        });
        break;
      }
      default:
        break;
    }
  }
}

module.exports = new AttributeService();

const db = require('../models');

const AttributeOption = db.attributeOptions;
const AttributeSelect = db.attributeSelects;

class AttributeOptionService {
  async createAttributeOption(id, options) {
    const selectOptions = options.map((option) => ({ name: option.name, attributeId: id }));
    await AttributeOption.bulkCreate(selectOptions);
  }

  async updateAttributeOption(attributeId, options) {
    for (let option of options) {
      switch (option.status) {
        case 'added': {
          const newOption = {
            name: option.name,
            attributeId,
          };
          await AttributeOption.create(newOption);
          break;
        }
        case 'updated': {
          await AttributeOption.update({ name: option.name }, { where: { id: option.id } });
          break;
        }
        case 'deleted': {
          await AttributeOption.destroy({ where: { id: option.id } });
          await AttributeSelect.destroy({ where: { optionId: option.id } });
          break;
        }
        default:
          break;
      }
    }
  }

  async deleteAttributeOption(attributeId) {}
}

module.exports = new AttributeOptionService();

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contactDetail.belongsTo(models.contact, {
        foreignKey: 'contact_id'
        
      })
    }
  }
  contactDetail.init({
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    contactId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'contactDetail',
    underscored: true,
    paranoid:true
  });
  return contactDetail;
};
// models/auditions.js - Model for "Auditions"
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const auditions = sequelize.define('auditions', {
    audition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    audition_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_production_id: { // Add the public_id column
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  auditions.associate = (models) => {
    auditions.belongsTo(models.job, {
      foreignKey: 'public_id',
      allowNull: false,
    });
  };

  return auditions;
};

module.exports = (sequelize, DataTypes) => {
  const subUser = sequelize.define('subuser', {
    subuser_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,   //maintain unique values
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    super_user_id: {
      type: DataTypes.UUID,  // Assuming UUID is used as primary key in superUser table
      allowNull: false,
      references: {
        model: 'superuser',
        key: 'user_id',
      },
    },
  },
  {
    tableName: 'subUser', // Set the desired table name here
  });

  subUser.associate = (models) => {
    subUser.belongsTo(models.superuser, { foreignKey: 'super_user_id', as: 'superUser' });
  };

  return subUser;
};
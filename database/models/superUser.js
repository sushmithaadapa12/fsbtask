module.exports = (sequelize, DataTypes) => {
    const superUser = sequelize.define('superuser', {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'superuser', // Set the desired table name here
    });
  
    superUser.associate = (models) => {
      superUser.hasMany(models.subuser, { foreignKey: 'super_user_id', as: 'subAccounts' });
      superUser.hasOne(models.permissions, { foreignKey: 'super_user_id', as: 'permissions' });
    };
  
    return superUser;
  };
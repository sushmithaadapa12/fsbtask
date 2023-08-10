  // permission.js
  module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define('permissions', {
      permission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      super_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'superuser',
          key: 'user_id',
        },
      },
      subuser_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'subuser',
          key: 'subuser_id',
        },
      },
      can_create_job: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,          //create mutiple permissions
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
    });
  
    permission.associate = (models) => {

      permission.belongsTo(models.subuser, { foreignKey: 'subuser_id', as: 'subUser' });
      
      permission.belongsTo(models.superuser, { foreignKey: 'super_user_id', as: 'superuser' });
    };
  
    return permission;
  };
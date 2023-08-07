// subAccount.js
module.exports = (sequelize, DataTypes) => {
    const SubAccount = sequelize.define('SubAccount', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Add other fields like name, phone number, etc.
    });
  
    SubAccount.associate = (models) => {
      SubAccount.belongsTo(models.User, { foreignKey: 'mainUserId', as: 'mainUser' });
    };
  
    return SubAccount;
  };
  
  // user.js
  module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Add other fields like password, userType, etc.
    });
  
    User.associate = (models) => {
      User.hasMany(models.SubAccount, { foreignKey: 'mainUserId', as: 'subAccounts' });
      User.hasOne(models.Permission, { foreignKey: 'userId', as: 'permissions' });
    };
  
    return User;
  };
  
  // permission.js
  module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // Define specific permission fields, e.g., canAccessJobs, canAccessReports, etc.
    });
  
    Permission.associate = (models) => {
      Permission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Permission;
  };
  
const { DataTypes } = require('sequelize');

module.exports= (sequelize)=>{
    const shoots = sequelize.define('shoots', {
        shoot_id: {
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
        shootocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_production_id: { // Add the public_id column  //change as per table reference
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    shoots.associate = (models) => {
        shoots.belongsTo(models.job, {
          foreignKey: 'public_id',
          allowNull: false,
        });
    };
    return shoots;
};
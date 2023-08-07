const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports= (sequelize, DataTypes)=>{
    const roles = sequelize.define('roles', {
        public_id: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false 
        },
        job_production_id: { type: DataTypes.UUID, allowNull: false,
        references: {
            model: 'job',
            key: 'public_id'
        } },
        ratesperunitoftime:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        agency_fee_checked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        agency_fee_percentage: {
            type: DataTypes.FLOAT,
        },
        recall_fees: {
            type: DataTypes.FLOAT,
        },
        travel: {
            type: DataTypes.FLOAT,
        },
        accommodation: {
            type: DataTypes.FLOAT,
        },
        expenses: {
            type: DataTypes.FLOAT,
        },
        usage_fee: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Non-Binary', 'Trans male', 'Trans female'),
        },
        playingage_start: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        playing_age_end: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        age_requirement: {
            type: DataTypes.ENUM('18+', '21+'),
        },
        childlicense_required: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        nudity_clause: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sensitive_contentmessage: {
            type: DataTypes.TEXT,
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
        // timestamps: true,
        tableName:'roles'
    }
    );
    roles.associate = (models) => {
        roles.belongsTo(models.job, {
            foreignKey: 'job_production_id',
            allowNull: false,
        });
    };
    return roles;
};

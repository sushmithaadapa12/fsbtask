const Sequelize = require('sequelize');
module.exports= (sequelize, DataTypes)=>{
  const job = sequelize.define('job', {
    // Model for "Job"
    public_id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false 
    },
    jobname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobstatus: {
      type: DataTypes.ENUM('draft', 'publish'),
      allowNull: false,
    },
    submissiondeadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectspecifications: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    productionclientname: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'job', 
  }
  );
  job.associate= (models)=>{
    job.hasMany(models.roles, { as: 'roles', foreignKey: 'public_id' });
    job.hasMany(models.shoots, { as: 'shoots', foreignKey: 'public_id' });
    job.hasMany(models.auditions, { as: 'auditions', foreignKey: 'public_id' });
  }
  return job;
}

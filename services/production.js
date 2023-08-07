const {  job,roles,shoots,auditions,sequelize, Sequelize: { Op }} = require('../database');

const createJob = async (jobDetails) => {
  const t = await sequelize.transaction();
  try {
    const {
      jobname, jobstatus, submissiondeadline, synopsis,
      projectspecifications, budget, productionclientName,
    } = jobDetails;

    const existingJob = await job.findOne({
      where: { jobname },
      transaction: t,
    });

    if (existingJob) {
      await t.rollback();
      return { error: 'Job with the same name already exists' };
    }

    const newJob = await job.create({
      jobname,
      jobstatus,
      submissiondeadline,
      synopsis,
      projectspecifications,
      budget,
      productionclientName,
    }, { transaction: t });

    await t.commit();
    return { message: 'Job created successfully', job: newJob };
  } catch (error) {
    await t.rollback();
    console.error('Error creating job:', error);
    return { error: 'Error creating job' };
  }
};

const createRoles = async (roleList, newJobPublicId) => {
  const t = await sequelize.transaction();

  try {
    const rolesData = roleList.map(({
      ratesperunitoftime, agency_fee_checked, agency_fee_percentage,
      recall_fees, travel, accommodation, expenses, usage_fee, gender,
      playingage_start, playing_age_end, age_requirement, childLicense_required,
      nudity_clause, sensitive_contentmessage
    }) => ({
      ratesperunitoftime,
      agency_fee_checked,
      agency_fee_percentage,
      recall_fees,
      travel,
      accommodation,
      expenses,
      usage_fee,
      gender,
      playingage_start,
      playing_age_end,
      age_requirement,
      childLicense_required,
      nudity_clause,
      sensitive_contentmessage,
      job_production_id: newJobPublicId,
    }));
    await roles.bulkCreate(rolesData, { transaction: t });

    await t.commit();
    return { success: true };
  } catch (error) {
    console.error('Error creating roles:', error);
    await t.rollback();
    return { errors: 'Error creating roles' };
  }
};

const createAuditions = async (auditionList, newJobPublicId) => {
  const t = await sequelize.transaction();

  try {
    const auditionsData = auditionList.map(({ from_date, to_date, audition_location }) => ({
      from_date,
      to_date,
      audition_location,
      public_id: newJobPublicId,
    }));
    await auditions.bulkCreate(auditionsData, { transaction: t });

    await t.commit();
    return { success: true };
  } catch (error) {
    console.error('Error creating auditions:', error);
    await t.rollback();
    return { errors: 'Error creating auditions' };
  }
};

const createShoots = async (shootList, newJobPublicId) => {
  const t = await sequelize.transaction();

  try {
    const shootsData = shootList.map(({ from_date, to_date, shoot_location }) => ({
      from_date,
      to_date,
      shoot_location,
      public_id: newJobPublicId,
    }));
    await shoots.bulkCreate(shootsData, { transaction: t });

    await t.commit();
    return { success: true };
  } catch (error) {
    console.error('Error creating shoots:', error);
    await t.rollback();
    return { errors: 'Error creating shoots' };
  }
};

const updateJobStatus = async (publicId, jobStatus) => {
  const t = await sequelize.transaction();
  try {
    const existingJob = await job.findOne({
      where: { public_id: publicId },
      transaction: t,
    });

    if (!existingJob) {
      await t.rollback();
      return { error: 'Job not found' };
    }

    existingJob.jobStatus = jobStatus;
    await existingJob.save({ transaction: t });

    await t.commit();
    return {};
  } catch (error) {
    await t.rollback();
    console.log(error);
    return { error: 'Failed to update job status' };
  }
};


module.exports = {
  createJob,
  createShoots,
  createAuditions,
  createRoles,
  updateJobStatus
};








const {addJobSchema,updateSchema,roleSchema,shootSchema,auditionSchema}= require('./../schemas');

const {production} = require('../services');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv);

const createJob = async (req, res) => {
  try {
    const jobDetails = {...req.body};
    const valid = ajv.validate(addJobSchema, jobDetails);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }

    const result = await production.createJob(jobDetails);

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ error: 'Error creating job' });
  }
};

const createRoles = async (req, res) => {
  try {
    const jobDetails = {...req.body};
    const valid = ajv.validate(roleSchema, jobDetails);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }

    const { jobPublicId, roles } = req.body;
    
    // Call RolesService function to create roles
    await production.createRoles(roles, jobPublicId);

    return res.status(201).json({ message: 'Roles created successfully' });
  } catch (error) {
    console.error('Error creating roles:', error);
    return res.status(500).json({ error: 'Error creating roles' });
  }
};

const createAuditions = async (req, res) => {
  try {
    const jobDetails = {...req.body};
    const valid = ajv.validate(auditionSchema, jobDetails);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }

    const { jobPublicId, auditions } = req.body;
    
    // Call AuditionsService function to create auditions
    await production.createAuditions(auditions, jobPublicId);

    return res.status(201).json({ message: 'Auditions created successfully' });
  } catch (error) {
    console.error('Error creating auditions:', error);
    return res.status(500).json({ error: 'Error creating auditions' });
  }
};

const createShoots = async (req, res) => {
  try {
    const jobDetails = {...req.body};
    const valid = ajv.validate(shootSchema, jobDetails);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }


    const { jobPublicId, shoots } = req.body;
    
    // Call ShootsService function to create shoots
    await production.createShoots(shoots, jobPublicId);

    return res.status(201).json({ message: 'Shoots created successfully' });
  } catch (error) {
    console.error('Error creating shoots:', error);
    return res.status(500).json({ error: 'Error creating shoots' });
  }
};

const updateJobStatus = async (req, res) => {
  const { public_id, jobStatus } = req.body;

  const { errors } = Validator.isSchemaValid({ data: req.body, schema: updateSchema });
  if (errors) {
    return res.status(400).json({ error: errors });
  }

  try {
    const result = await production.updateJobStatus(public_id, jobStatus);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    return res.status(200).json({ message: 'Job status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update job status' });
  }
};
// subAccountController.js
const SubAccountService = require('../services/subAccountService');

const createSubAccount = async (req, res) => {
  const { mainUserId, ...subAccountData } = req.body;
  try {
    const subAccount = await SubAccountService.createSubAccount(mainUserId, subAccountData);
    res.status(201).json({ message: 'Subaccount created successfully', subAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create subaccount' });
  }
};

// authController.js
const AuthService = require('../services/authService');

const signup = async (req, res) => {
  const userData = req.body;
  try {
    const user = await AuthService.signup(userData);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// jobController.js
const JobService = require('../services/jobService');

const createJobdd = async (req, res) => {
  const jobDetails = req.body;
  try {
    const job = await JobService.createJob(jobDetails);
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};


module.exports={createJob,updateJobStatus,createRoles,createAuditions,createShoots}
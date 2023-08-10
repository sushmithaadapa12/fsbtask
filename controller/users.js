const {signupSchema,loginSchema,subAccountSchema,assignPermissionsSchema}= require('./../schemas');

const {productionService,usersService,} = require('../services');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv);

const createSubAccount = async (req, res) => {
  try {
    const userDetails = { ...req.body };
    const valid = ajv.validate(subAccountSchema, userDetails);

    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }

    const { errors: err, response } = await usersService.createSubAccount(userDetails);

    if (response) {
      res.setHeader('message', 'Subaccount created successfully.');
      return res.status(201).json(response);
    }

    return res.status(400).json( err);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server occured' });
  }
};
  
const superUserSignUp = async (req, res) => {
  const userDetails = {...req.body};
  const valid = ajv.validate(signupSchema, userDetails);

  if (!valid) {
    return res.status(400).json({ error: ajv.errorsText() });
  }

  try {
    const {dupSuperUser,dupSubUser} = await usersService.checkExistingUser(req.body.email, req.body.user_name);

    if (dupSuperUser || dupSubUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    const userObj = await usersService.signup(userDetails);
    
    return res.status(201).json({ message: 'User created successfully', userObj });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'Failed to create user' });
  }
};
  
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const valid = ajv.validate(loginSchema, req.body);
  if (!valid) {
    return res.status(400).json({ error: ajv.errorsText() });
  }

  try {
    const {error,response} = await usersService.loginUser(email, password);

    if(error){
      return res.status(404).json(error )
    }
    return res.status(200).json({ message: 'Login successful', role:response.user_role,user_id:response.user_id,user_type:response.user_type});
  } catch (error) {
    
    return res.status(500).json({ error: 'Failed to login' });
  }
};

const assignPermissionsToSubAccount = async (req, res) => {
  try {
    const data = { ...req.body };                         //change distructuring
    const valid = ajv.validate(assignPermissionsSchema, req.body);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }

    const { errors: err, response } = await usersService.assignPermissionsToSubAccount(data);

    if (response) {
      res.status(201).json({ message: 'Permissions created successfully', response });
    }
    if(err){
      return res.status(404).json(err )
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Error Occured' });
  }
};
const createJob1 = async (jobDetails, user) => {
  const t = await sequelize.transaction();

  try {
    const {
      jobname, jobstatus, submissiondeadline, synopsis,
      projectspecifications, budget, productionclientName, can_create_job, user_id
    } = jobDetails;

    const existingJob = await job.findOne({
      where: { jobname },
      transaction: t,
    });

    if (existingJob) {
      await t.rollback();
      return { error: 'Job with the same name already exists' };
    }

    // Check user role and permission
    if (user_role === 'superuser' || (user_role === 'subuser' && can_create_job)) {
      const newJob = await job.create({
        jobname,
        jobstatus,
        submissiondeadline,
        synopsis,
        projectspecifications,
        budget,
        productionclientName,
        created_by: user_id, // Assign the user_id to created_by
        created_by_type: user.role, // Save the user type (superuser/subuser)
      }, { transaction: t });

      await t.commit();
      return { message: 'Job created successfully', job: newJob };
    } else {
      await t.rollback();
      return { error: 'Access denied. You do not have permission to create a job.' };
    }
  } catch (error) {
    await t.rollback();
    console.error('Error creating job:', error);
    return { error: 'Error creating job' };
  }
};

module.exports = {
    createSubAccount,
    superUserSignUp,
    createJob1,
    loginUser,
    assignPermissionsToSubAccount
}
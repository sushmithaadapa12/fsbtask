// subAccountService.js
const { SubAccount } = require('../models');

const createSubAccount = async (mainUserId, subAccountData) => {
  // Create subaccount and associate with main user
  return SubAccount.create({ ...subAccountData, mainUserId });
};

// authService.js (for signup and login)
const { User, Permission } = require('../models');

const signup = async (userData) => {
  // Create user and permission records
  return User.create({
    email: userData.email,
    // Add other fields like password, userType, etc.
    permissions: {
      // Initialize permission fields
    },
  }, {
    include: [{ model: Permission, as: 'permissions' }],
  });
};

// jobService.js
const { Job } = require('../models');

const createJob = async (jobDetails) => {
  // Create job record
  return Job.create(jobDetails);
};

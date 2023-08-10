// subAccountService.js
const {permissions,subuser,superuser,sequelize, Sequelize: { Op }} = require('../database');
const {encryptPassword,comparePassword} = require('../utils/helpers')

const assignPermissionsToSubAccount = async (subAccountPermissions) => {
  const { subuser_id, super_user_id, can_create_job } = subAccountPermissions;

  const transaction = await sequelize.transaction();

  try {
    const existingSubAccount = await subuser.findByPk(subuser_id, { transaction });
    if (!existingSubAccount) {
      await transaction.rollback();
      return { errors: [{ name: 'sub_account_id', message: 'Invalid sub_account_id' }] };
    }

    const existingSuperUser = await superuser.findByPk(super_user_id, { transaction });
    if (!existingSuperUser) {
      await transaction.rollback();
      return { errors: [{ name: 'super_user_id', message: 'Invalid super_user_id' }] };
    }

    if (existingSubAccount.super_user_id !== super_user_id) {
      await transaction.rollback();
      return { errors: [{ name: 'super_user_id', message: 'Subaccount is not linked to the provided super_user_id' }] };
    }

    const permissionExists = await permissions.findOne({
      where: {
        subuser_id,
        super_user_id,
      },
      transaction,
    });

    if (permissionExists) {
      await transaction.rollback();
      return { errors: [{ name: 'Permission already exists', message: 'Permission already granted to the subuser by the superuser.' }] };
    }

    const createdPermissions = await permissions.create({
      subuser_id,
      super_user_id,
      can_create_job,
    }, { transaction });

    await transaction.commit();

    return { response: createdPermissions };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return { errors: [{ name: 'Internal server error', message: 'Transaction failed.' }] };
  }
};
const createSubAccount = async (subAccountDetails) => {
  const { user_name, email, is_verified, super_user_id } = subAccountDetails;

  const transaction = await sequelize.transaction();

  try {
    
    const existingSuperUser = await superuser.findByPk(super_user_id, { transaction });
    if (!existingSuperUser) {
      await transaction.rollback();
      return { errors: [{ message: 'Invalid super_user_id' }] };
    }

    // Check if the email is associated with a superuser or subuser
    const existingSuperUserEmail = await superuser.findOne({
      where: { email },
      transaction,
    });

    if (existingSuperUserEmail) {
      await transaction.rollback();
      return { errors: [{ message: 'Email is already exists' }] };
    }
    const existingSubAccount = await subuser.findOne({
      where: { super_user_id,email },
      transaction,
    });
    console.log(existingSubAccount);
    if (existingSubAccount) {
      await transaction.rollback();
      return { errors: [{ message: 'Subaccount with the same id already exists for this super user' }] };
    }

    const createdSubAccount = await subuser.create({
      user_name,
      email,
      is_verified,
      super_user_id,
    }, { transaction });

    await transaction.commit();

    return { response: createdSubAccount };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return { errors: [{ name: 'Internal server error', message: 'Transaction failed.' }] };
  }
};



const signup = async (userData) => {
  const t = await sequelize.transaction();
  const password = userData.password;
  const hashedPassword = await encryptPassword(password)
  try {
    const user = await superuser.create({...userData, password: hashedPassword,created_at: new Date(),
      updated_at: new Date(),}, {transaction: t});
    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const checkExistingUser = async (email, user_name) => {
  const t = await sequelize.transaction();
  try {
    const dupSuperUser = await superuser.findOne({
      where: { [Op.or]: [{ email }, { user_name }] },  //only email not user_name
      transaction: t,                                  // combine the tables 
    });

    const dupSubUser = await subuser.findOne({
      where: { [Op.or]: [{ email }, { user_name }] },
      transaction: t,
    });
    
    return { dupSuperUser, dupSubUser };

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const loginUser = async (email,password) => {
  try {

    const superUser = await superuser.findOne({
      where: { email },
    });

    if (superUser && await comparePassword(password, superUser.password)) {
      if (!superUser.is_verified) {
        return { error: [{ message: 'Unverified Superuser' }] };
      }
      return { response:{user: superUser, role: 'superuser'} };
    }

    // Check if the user exists in the subuser table
    const subUser = await subuser.findOne({
      where: { email},
    });

    if (subUser) {
      if (!subUser.is_verified) {
        return { error: [{ message: 'Unverified Subuser' }] };
      }
      return { response:{user: subUser, role: 'subuser', can_create_job: subUser.can_create_job }};
    }

    return { error: [{ message: 'Invalid credentials' }] };
  } catch (error) {
    console.error('Error during login:', error);
    return { error: 'Error during login' };
  }
};
module.exports = {
  createSubAccount,
  signup,
  checkExistingUser,
  loginUser,
  assignPermissionsToSubAccount
}
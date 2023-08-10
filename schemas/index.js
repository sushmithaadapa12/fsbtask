const addJobSchema = require('./addJob');
const updateSchema = require('./updateSchema');
const roleSchema = require('./roles')
const shootSchema = require('./shoots')
const auditionSchema = require('./auditions')
const signupSchema = require('./signUp');
const loginSchema = require('./login')
const subAccountSchema = require('./subUser');
const assignPermissionsSchema = require('./permission');

module.exports= {
    addJobSchema,
    updateSchema,
    roleSchema,
    shootSchema,
    auditionSchema,
    signupSchema,
    loginSchema,
    subAccountSchema,
    assignPermissionsSchema
}
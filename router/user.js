const {createSubAccount,superUserSignUp,createJob1,loginUser,assignPermissionsToSubAccount} = require('../controller/users');

module.exports = (router)=>{
    router.post('/creatSubaccount',createSubAccount);
    
    router.post('/signup', superUserSignUp);

    router.post('/createJob',createJob1);

    router.post('/login',loginUser);

    router.post('/grant_permissions',assignPermissionsToSubAccount)

}
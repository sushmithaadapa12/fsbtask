const SubAccountController = require('../controllers/subAccountController');
const AuthController = require('../controllers/authController');
const JobController = require('../controllers/jobController');

router.post('/subaccounts', SubAccountController.createSubAccount);
router.post('/signup', AuthController.signup);
router.post('/createJob', JobController.createJob);
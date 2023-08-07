const { createJob,updateJobStatus,createRoles,createAuditions,createShoots } = require('../controller/production');

module.exports = (router)=>{
  router.post('/', async (req, res) => {
    res.send('hello from router :)');
  });
  
  router.post('/createJob', createJob);

  router.post('/create-shoots', createShoots);

  router.post('/create-auditions', createAuditions);

  router.post('/create-roles', createRoles);

  router.post('/statusUpdate', updateJobStatus);
}

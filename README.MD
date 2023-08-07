Implement sample Production APIS using ORM sequelize
creation job API,
o jobname
o jobStatus(draft/publish)
o Submission deadline (date/time)
o Shoot
    ▪ Dates (range and/or specific dates)
    ▪ Locations (multiple)
o Audition
    ▪ Dates (range and/or specific dates)
    ▪ Locations (multiple)
o Budget
o Synopsis - Project description (text field)
o Project specifications (text field)
o Production client name
● Roles - additional information
o Rates per unit of time (mandatory field)
    ▪ Agency fee (checkbox if it is included, if checked enter percentage)
    ▪ Recall fees
    ▪ Travel
    ▪ Accommodation
    ▪ Expenses
o Usage fee (only for certain project types, tbd)
o Gender (Male, Female, Non-Binary, Trans male, Trans female)
o Playing age (choose starting and ending number, for 0 to 2 years, starting
and ending in months)
o Age requirement (checkbox - legal requirement 18+ or 21+)
o Child license required (checkbox)
o Nudity clause (checkbox)
o Sensitive content message (text box)

2updateJobStauts



postapi: addjob: 
{
  "jobname": "Sample Job",
  "jobstatus": "draft",
  "submissiondeadline": "2023-08-15T12:00:00Z", 
  "synopsis": "Sample job synopsis",
  "projectspecifications": "Sample project specifications", 
  "budget": 5000,
  "productionclientname": "Sample Client", 
  "shoots": [
    {
      "from_date": "2023-09-10T10:00:00Z",
      "to_date": "2023-09-12T10:00:00Z",
      "shoot_location": "Shoot Location 1"
    },
    {
      "from_date": "2023-09-15T10:00:00Z",
      "to_date": "2023-09-16T10:00:00Z",
      "shoot_location": "Shoot Location 2"
    }
  ],
  "auditions": [
    {
      "from_date": "2023-08-25T09:00:00Z",
      "to_date": "2023-08-26T09:00:00Z",
      "audition_location": "Audition Location 1"
    },
    {
      "from_date": "2023-08-29T09:00:00Z",
      "to_date": "2023-08-30T09:00:00Z",
      "audition_location": "Audition Location 2"
    }
  ],
  "roles": [
    {
      "ratesperunitoftime": 100, 
      "agency_fee_checked": true, 
      "agency_fee_percentage": 10,
      "recall_fees": 50,
      "travel": 200,
      "accommodation": 300,
      "expenses": 100,
      "usage_fee": false,
      "gender": "Male",
      "playingage_start": 25, 
      "playing_age_end": 40, 
      "age_requirement": "18+", 
      "childlicense_required": false, 
      "nudity_clause": false, 
      "sensitive_contentmessage": "No sensitive content"
    },
    {
      "ratesperunitoftime": 120,
      "agency_fee_checked": false,
      "agency_fee_percentage": 54,
      "recall_fees": 60,
      "travel": 180,
      "accommodation": 250,
      "expenses": 80,
      "usage_fee": true,
      "gender": "Female",
      "playingage_start": 20,
      "playing_age_end": 30,
      "age_requirement": "21+",
      "childlicense_required": true,
      "nudity_clause": true,
      "sensitive_contentmessage": "Contains sensitive content"
    }
  ]
}
// const createJob = async (req, res) => {
//   req.body.budget = parseInt(req.body.budget, 10);
//   req.body.playingAgeStart = parseInt(req.body.budget, 10);
//   req.body.playingAgeEnd = parseInt(req.body.budget, 10);
//   req.body.agencyFee = parseInt(req.body.agencyFee, 10);
//   req.body.recallFees = parseInt(req.body.recallFees, 10);
//   req.body.travel = parseInt(req.body.travel, 10);
//   req.body.accommodation = parseInt(req.body.accommodation, 10);
//   req.body.expenses = parseInt(req.body.expenses, 10);
//   req.body.usageFee = parseInt(req.body.usageFee, 10);

//   req.body.ageRequirement = req.body.ageRequirement.toLowerCase() === 'true';
//   req.body.childLicenseRequired = req.body.childLicenseRequired.toLowerCase() === 'true';
//   req.body.nudityClause = req.body.nudityClause.toLowerCase() === 'true';

//   const valid = ajv.validate(jobSchema, req.body);
//   if (!valid) {
//     return res.status(400).json({ error: ajv.errorsText() });
//   }
  
//   try {
//     const existingJob = await job.findOne({
//       where: { jobname: req.body.jobname },
//     });

//     if (existingJob) {
//       return res.status(400).json({ error: 'Job with the same name already exists' });
//     }

//     const Job = await job.create(req.body);
//     return res.status(201).json(Job);

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: 'Failed to create job' });
//   }
// };

const existingJob = await job.findOne({
        where: { jobname },
      });
  
      if (existingJob) {
        return res.status(400).json({ error: 'Job with the same name already exists' });
      }
      const newJob = await job.create({
        jobname,
        jobstatus,
        submissiondeadline,
        synopsis,
        projectspecifications,
        budget,
        productionclientName,
      });

      const shootsData = req.body.shoots.map(shoot => ({
        from_date: shoot.from_date,
        to_date: shoot.to_date,
        shoot_location: shoot.shoot_location,
        public_id: newJob.public_id,           
      }));
      await shoots.bulkCreate(shootsData);

      const auditionsData = req.body.auditions.map(audition => ({
        from_date: audition.from_date,
        to_date: audition.to_date,
        audition_location: audition.audition_location,
        public_id: newJob.public_id,
      }));
      await auditions.bulkCreate(auditionsData);

      const rolesData = req.body.roles.map(role => ({
        ratesperunitoftime: role.ratesperunitoftime,
        agency_fee_checked: role.agency_fee_checked,
        agency_fee_percentage: role.agency_fee_percentage,
        recall_fees: role.recall_fees,
        travel: role.travel,
        accommodation: role.accommodation,
        expenses: role.expenses,
        usage_fee: role.usage_fee,
        gender: role.gender,
        playingage_start: role.playingage_start,
        playing_age_end: role.playing_age_end,
        age_requirement: role.age_requirement,
        childLicense_required: role.childLicense_required,
        nudityClause: role.nudity_clause,
        sensitive_contentmessage: role.sensitive_contentmessage,
        job_production_id: newJob.public_id,
      }));
      await roles.bulkCreate(rolesData);

      const createJob = async(req,res)=>{
  const valid = ajv.validate(addJobSchema, req.body);
    if (!valid) {
      return res.status(400).json({ error: ajv.errorsText() });
    }
    try {
      // const  { body:{ jobname, jobstatus, submissiondeadline, synopsis, projectspecifications, budget, productionclientName} } = req;
      const data = { ...req.body };
      
      const existingJob = await production.existingJob(data);
  
      if (existingJob) {
        return res.status(400).json({ error: 'Job with the same name already exists' });
      }
      const newJob = await job.create({
        jobname,
        jobstatus,
        submissiondeadline,
        synopsis,
        projectspecifications,
        budget,
        productionclientName,
      });

      const shootsData = req.body.shoots.map(shoot => ({
        from_date: shoot.from_date,
        to_date: shoot.to_date,
        shoot_location: shoot.shoot_location,
        public_id: newJob.public_id,           
      }));
      await shoots.bulkCreate(shootsData);

      const auditionsData = req.body.auditions.map(audition => ({
        from_date: audition.from_date,
        to_date: audition.to_date,
        audition_location: audition.audition_location,
        public_id: newJob.public_id,
      }));
      await auditions.bulkCreate(auditionsData);

      const rolesData = req.body.roles.map(role => ({
        ratesperunitoftime: role.ratesperunitoftime,
        agency_fee_checked: role.agency_fee_checked,
        agency_fee_percentage: role.agency_fee_percentage,
        recall_fees: role.recall_fees,
        travel: role.travel,
        accommodation: role.accommodation,
        expenses: role.expenses,
        usage_fee: role.usage_fee,
        gender: role.gender,
        playingage_start: role.playingage_start,
        playing_age_end: role.playing_age_end,
        age_requirement: role.age_requirement,
        childLicense_required: role.childLicense_required,
        nudityClause: role.nudity_clause,
        sensitive_contentmessage: role.sensitive_contentmessage,
        job_production_id: newJob.public_id,
      }));
      await roles.bulkCreate(rolesData);

      res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Error creating job' });
    }
};


const updateJobStatus = async (req, res) => {
  const { public_id } = req.body;
  const { jobStatus } = req.body;

  const valid = ajv.validate(updateSchema, req.body);
  if (!valid) {
    return res.status(400).json({ error: ajv.errorsText() });
  }
  try {
    const existingJob = await job.findOne({
      where: { public_id },
    });

    if (!existingJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

   
    existingJob.jobStatus = jobStatus;
    await existingJob.save();

    return res.status(200).json({ message: 'Job status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update job status' });
  }
};

//   const addJobSchema = {
//     type: 'object',
//     properties: {
//       jobname: {
//         type: 'string',
//         maxLength: 255,
//         minLength: 2,
//       },
//       jobstatus: {
//         type: 'string',
//         enum: ['draft', 'publish'],
//       },
//       submissiondeadline: {
//         type: 'string',
//         format: 'date-time',
//       },
//       synopsis: {
//         type: 'string',
//       },
//       projectspecifications: {
//         type: 'string',
//       },
//       budget: {
//         type: 'number',
//       },
//       productionclientname: {
//         type: 'string',
//       },
//       shoots: {
//         type: 'array',
//         items: {
//           type: 'object',
//           properties: {
//             from_date: {
//               type: 'string',
//               format: 'date-time',
//             },
//             to_date: {
//               type: 'string',
//               format: 'date-time',
//             },
//             shoot_location: {
//               type: 'string',
//             },
//           },
//           required: ['from_date', 'to_date', 'shoot_location'],
//         },
//       },
//       auditions: {
//         type: 'array',
//         items: {
//           type: 'object',
//           properties: {
//             from_date: {
//               type: 'string',
//               format: 'date-time',
//             },
//             to_date: {
//               type: 'string',
//               format: 'date-time',
//             },
//             audition_location: {
//               type: 'string',
//             },
//           },
//           required: ['from_date', 'to_date', 'audition_location'],
//         },
//       },
//       roles: {
//         type: 'array',
//         items: {
//           type: 'object',
//           properties: {
//             ratesperunitoftime: {
//               type: 'number',
//             },
//             agency_fee_checked: {
//               type: 'boolean',
//             },
//             agency_fee_percentage: {
//               type: 'number',
//             },
//             recall_fees: {
//               type: 'number',
//             },
//             travel: {
//               type: 'number',
//             },
//             accommodation: {
//               type: 'number',
//             },
//             expenses: {
//               type: 'number',
//             },
//             usage_fee: {
//               type: 'boolean',
//             },
//             gender: {
//               type: 'string',
//               enum: ['Male', 'Female', 'Non-Binary', 'Trans male', 'Trans female'],
//             },
//             playingage_start: {
//               type: 'integer',
//             },
//             playing_age_end: {
//               type: 'integer',
//             },
//             age_requirement: {
//               type: 'string',
//               enum:['18+', '21+']
//             },
//             childLicense_required: {
//               type: 'boolean',
//             },
//             nudity_clause: {
//               type: 'boolean',
//             },
//             sensitive_contentmessage: {
//               type: 'string',
//             },
//           },
//           required: ['ratesperunitoftime'],
//         },
//       },
//     },
//     required: ['jobname', 'jobstatus', 'submissiondeadline'],
// }

// module.exports = addJobSchema;
const addJobSchema = {
  type: 'object',
  properties: {
    jobname: { type: 'string', minLength: 1 },
    jobstatus: { type: 'string', minLength: 1 },
    submissiondeadline: { type: 'string', format: 'date-time' },
    synopsis: { type: 'string', minLength: 1 },
    projectspecifications: { type: 'string', minLength: 1 },
    budget: { type: 'number', minimum: 0 },
    productionclientName: { type: 'string', minLength: 1 },
  },
  required: ['jobname', 'jobstatus', 'submissiondeadline', 'synopsis', 'projectspecifications', 'budget', 'productionclientName'],
};

module.exports = addJobSchema;
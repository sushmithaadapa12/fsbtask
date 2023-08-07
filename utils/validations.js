const { default: Ajv } = require('ajv');
const Helper = require('./helpers');
const ajv = new Ajv({
  verbose: true, allErrors: true, $data: true, coerceTypes: true 
});

require('ajv-formats')(ajv);
require('ajv-errors')(ajv, { singleError: true });
require('ajv-keywords')(ajv);

const isValidUuid = (uuid) => {
  
  const expression = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return expression.test(uuid);
};

const isSchemaValid = ({ schema, data }) => {
  const validator = ajv.compile(schema);
  const isValid = validator(data);
  const errors = [];

  if (!isValid) {
    validator.errors.forEach((error) => {
      console.log(error);
      const {
        message,
        params: { errors: paramErrors },
      } = error;

      let errorDetails;

      let errorParams;

      if (paramErrors && paramErrors.length) {
        errorParams = { ...paramErrors[0] };
      } else {
        errorParams = error;
      }
      const { params: { missingProperty: name, additionalProperty }, instancePath } = errorParams;

      if (name) {
        errorDetails = {
          name,
          message,
        };
      } else {
        errorDetails = {
          name: Helper.sanitizeStr(/[#_.'"/\\]/g, instancePath, '') || additionalProperty || 'type',
          message,
        };
      }

      errors.push(errorDetails);
    });

    return { errors };
  }

  return { data };
};

module.exports = {
  isValidUuid,
  isSchemaValid,
};

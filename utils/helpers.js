const bcrypt = require('bcrypt');

const sanitizeStr = (regex, str, data) => {
    const sanitizedStr = str.replace(regex, data);
  
    return sanitizedStr;
};

const encryptPassword = async (password) => {
    const saltRounds = 10;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
};

const comparePassword = async (providedPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

module.exports = {
    sanitizeStr,
    encryptPassword,
    comparePassword
};
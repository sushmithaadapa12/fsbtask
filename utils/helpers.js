const sanitizeStr = (regex, str, data) => {
    const sanitizedStr = str.replace(regex, data);
  
    return sanitizedStr;
};

module.exports = sanitizeStr;
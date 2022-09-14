import constants from "../../../constants.js";

const userBlankData = () => {
  const obj = {};
  constants.user.permittedProperties.forEach(prop => (obj[prop] = ""));
  return obj;
};

export default userBlankData;

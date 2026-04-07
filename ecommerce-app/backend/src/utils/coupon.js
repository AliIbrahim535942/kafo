const { v4: uuidv4 } = require("uuid");

const generateCouponCode = () => {
  return `CPN-${uuidv4().split("-")[0].toUpperCase()}`;
};

module.exports = {
  generateCouponCode,
};

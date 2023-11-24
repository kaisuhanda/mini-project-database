const jwt = require("jsonwebtoken");

module.exports = {
  validateRegis: async (req, res, next) => {
    const { username, password, confirmPassword, email, phone } = req.body;

    if (!username || !password || !confirmPassword || !email || !phone) {
      console.log("Validation failed");
      return res.status(400).send({
        success: false,
        message: "Semua kolom harus diisi.",
      });
    }

    if (password.length < 8 || password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Password is not valid. Please ensure it's at least 8 characters long and matches the confirm password.",
      });
    }

    // Continue to the next middleware or route handler
    next();
  },

  validateToken: (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(400).send({
          success: false,
          message: "You do not have a token",
        });
      } else {
        const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
        if (!verifyData) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized request",
          });
        }
        req.userData = verifyData;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Invalid Token");
    }
  },
};






const adminAuth = (req, res, next) => {
  // Logic of Checking if the request is authorized
  console.log("Admin AUTH is getting checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  // Logic of Checking if the request is authorized
  console.log("User AUTH is getting checked");
  const token = "abcz";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(res.status(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.SECRETKEY || "secretkey", (err, user) => {
    if (err) return next(res.status(403).json("Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.superAdmin) {
      next();
    } else {
      return next(res.status(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin || req.user.superAdmin) {
      next();
    } else {
      return next(res.status(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.superAdmin) {
      next();
    } else {
      return next(res.status(403, "You are not authorized"));
    }
  });
};

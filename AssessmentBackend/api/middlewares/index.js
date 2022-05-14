import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const token = req.headers['token'] ? req.headers['token'] : '';

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
      if (!err) next();
      else {
        res.status(403).send();
      }
    });
  } else {
    res.status(403).send();
  }
};

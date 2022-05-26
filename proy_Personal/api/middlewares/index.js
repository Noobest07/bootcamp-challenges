import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.headers['token'] ? req.headers['token'] : '';

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, authData) => {
      if (!err) {
        const user = await User.find({ email: authData.email });
        req.user = user[0];
        next();
      } else {
        res.status(403).send();
      }
    });
  } else {
    res.status(403).send();
  }
};

import { User } from '../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const info = async (req, res) => {
  res.status(200).send();
  return;
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });
  const userDB = user[0];

  if (user.length === 0) {
    res.status(403).send();
    return;
  }

  const passToHash = `${password}${userDB.email}`;
  bcrypt.compare(passToHash, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid) {
      jwt.sign(
        { email: userDB.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token,
            });
          } else {
            res.status(403).send();
          }
        }
      );
    } else {
      res.status(403).send();
    }
  });
};

export const createUser = async (req, res) => {
  const { password, email, name } = req.body;

  if (!isValidString(name)) {
    return res.status(404).json({ error: 'Invalid name' });
  }
  if (!isValidString(email)) {
    return res.status(404).json({ error: 'Invalid email' });
  }
  if (!isValidString(password)) {
    return res.status(404).json({ error: 'Invalid password' });
  }
  if (!isPasswordStrong(password)) {
    return res.status(400).json({ error: 'Weak password' });
  }
  const user = await User.find({ email });
  if (user[0]) {
    return res.status(400).json({ error: 'Email already in use' });
  }
  const passToHash = `${password}${email}`;
  const hash = await bcrypt.hash(passToHash, 10);

  const newUser = new User({ name, email, password: hash });

  try {
    await newUser.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const isValidString = (str) => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return true;
};

const isPasswordStrong = (pass) => {
  if (pass.length < 10) {
    return false;
  }
  return true;
};

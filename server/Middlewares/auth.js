const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const isUser = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(403).send({ error: 'Access denied.' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(403).send({ error: 'Access denied.' });
  }
};

module.exports = { auth, isUser, isAdmin };

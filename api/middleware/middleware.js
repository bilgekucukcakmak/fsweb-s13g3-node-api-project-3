const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`);
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'kullanıcı bulunamadı' });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  if (!req.body || !req.body.name) {
    res.status(400).json({ message: 'gerekli name alanı eksik' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body || !req.body.text) {
    res.status(400).json({ message: 'gerekli text alanı eksik' });
  } else {
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

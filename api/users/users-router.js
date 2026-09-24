const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  Users.update(req.params.id, req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Users.remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  Posts.insert({ text: req.body.text, user_id: req.params.id })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// routerı dışa aktarmayı unutmayın
module.exports = router;

const express = require('express');
const usersRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use(logger);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = server;

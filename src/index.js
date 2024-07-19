const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
//-------------rrrrrrrrrrrrrrrrr2222222222222
const logger = require('./config/logger');
//first change222
// second change222
// yash ois my friend but i don't have time to talk with him wi=hich is bad
//-------------------------------
//..............>>>>>>
//11111111111111
//222222
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connectedgit  to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

'use strict';

require('dotenv').config();
const app = require('./auth-server/src/server.js');
const { db } = require('./auth-server/src/auth/models');

db.sync().then(() => {
  app.start(process.env.PORT || 3002);
});

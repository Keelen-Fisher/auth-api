'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundHandler = require('../../auth-server/src/error-handlers/404.js.js.js');
const errorHandler = require('../../auth-server/src/error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRouter = require('./auth/routes');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(logger);

app.use(authRouter);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) { throw new Error('Missing PORT'); }
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    console.log(`Server Up on ${PORT}`);
  },
};

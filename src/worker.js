const express = require('express');
const errorHandler = require('errorhandler');
const router = require('./router');
const passportInitalize = require('./config/passport');
const db = require('./config/db');
const middlewares = require('./config/middlewares');
const {gracefulExit} = require('./utils/gracefulExit');

const app = express();


passportInitalize();

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

/**
 * Adding Middleware(s)
 */
middlewares(app, db);


app.use('/', router);

/**
 * Starting server
 */

db
    .sync({force: true})
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
    });


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

/**
 * Graceful exit
 * Clear connections on PM2 process end
 */
process
    .on('SIGINT', () => gracefulExit(db))
    .on('SIGTERM', () => gracefulExit(db));

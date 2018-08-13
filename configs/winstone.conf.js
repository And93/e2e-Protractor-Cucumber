const winston = require('winston');

const path = './artifacts/logs/';

const logger = winston.createLogger({
    transports: [
        new (winston.transports.File) ({
            filename: `${path}combined.log`,
            timestamp: function() {
                const currentMoment = new Date(Date.now()); 
                return currentMoment.toLocaleString('ru', { timeZone: 'Europe/Minsk'});
            }
        }),
        new (winston.transports.File)({
            name: `${path}error-log`,
            filename: `${path}error.log`,
            level: 'error'
        })
    ],
});

module.exports = {
    logger
}
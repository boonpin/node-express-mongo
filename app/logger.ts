import * as winston from "winston";

export class Logger {

    static __logger: winston.Logger;

    static logger(): winston.Logger {
        if (!Logger.__logger) {
            Logger.__logger = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.errors({stack: true}),
                    winston.format.splat(),
                    winston.format.json()
                ),
                exitOnError: false,
                transports: [
                    new winston.transports.Console({
                        handleExceptions: true
                    }),
                    new winston.transports.File({
                        filename: 'storage/logs/error.log',
                        level: 'error'
                    }),
                    new winston.transports.File({
                        filename: 'storage/logs/overall.log'
                    })
                ]
            });
        }
        return Logger.__logger;
    }
}

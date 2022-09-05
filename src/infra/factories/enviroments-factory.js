const CONFIG = Object.freeze({
    DEVELOPMENT: {
        cache: process.env.CACHE || 'memory',
        database: {
            driver: 'mongodb',
            host: process.env.HOST || 'localhost',
            dbName: process.env.DB_NAME || 'universities',
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'root',
            port: process.env.DB_PORT || '27017',
        },
    },
    PRODUCTION: {
        cache: process.env.CACHE,
        database: {
            driver: 'mongodb',
            host: process.env.HOST || 'localhost',
            dbName: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || '27017',
        },
    },
});

const ENVIROMENTS = Object.freeze({
    development: CONFIG.DEVELOPMENT,
    production: CONFIG.PRODUCTION,
});

const enviromentsFactory = () => {
    const enviroment = process.env.NODE_ENV || 'development';
    const resolver = ENVIROMENTS[enviroment];
    if (!resolver) throw new Error('Unknown environment: ', enviroment);
    return resolver;
};

module.exports = { enviromentsFactory };

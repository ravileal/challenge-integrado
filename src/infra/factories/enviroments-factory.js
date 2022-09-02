const CONFIG = Object.freeze({
    LOCAL: {
        driver: 'mongodb',
        cache: process.env.CACHE || 'memory',
        database: process.env.DB_NAME || 'universities',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        port: process.env.DB_PORT || '27017',
    },
    DEVELOPMENT: {
        driver: 'mongodb',
        cache: process.env.CACHE,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || '27017',
    },
    PRODUCTION: {
        driver: 'mongodb',
        cache: process.env.CACHE,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || '27017',
    },
});

const ENVIROMENTS = Object.freeze({
    local: CONFIG.LOCAL,
    development: CONFIG.DEVELOPMENT,
    production: CONFIG.PRODUCTION,
});

const enviromentsFactory = () => {
    const resolver = ENVIROMENTS[process.env.NODE_ENV];
    if (!resolver) throw new Error('Unknown environment: ', process.env.NODE_ENV);
    return resolver;
};

module.exports = { enviromentsFactory };

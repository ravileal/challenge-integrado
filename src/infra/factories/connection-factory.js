const { MongoAdapter } = require('../database/connections/MongoAdapter');

const CONNECTIONS = Object.freeze({
    mongodb: MongoAdapter,
});

const connectionFactory = (driver, configurations) => {
    const resolver = CONNECTIONS[driver];
    if (!resolver) throw new Error('Unknown driver connection: ', driver);
    return new resolver(configurations);
};

module.exports = { connectionFactory };

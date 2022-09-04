const universitySchema = require('../schemas/university-schema');

const SCHEMAS = Object.freeze({
    university: universitySchema,
});

const schemaFactory = schemaName => {
    const resolver = SCHEMAS[schemaName];
    if (!resolver) throw new Error('Unknown schema: ', schemaName);
    return resolver;
};

module.exports = { schemaFactory };

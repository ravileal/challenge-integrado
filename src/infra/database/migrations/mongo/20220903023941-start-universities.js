module.exports = {
    async up(db, client) {
        await db.createCollection('universities', {
            bsonType: 'object',
            properties: {
                id: { bsonType: 'string' },
                name: { bsonType: 'string' },
                country: { bsonType: 'string' },
                state: { bsonType: 'string' },
            },
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['id', 'name'],
                    properties: {
                        id: {
                            bsonType: 'string',
                        },
                        name: {
                            bsonType: 'string',
                        },
                    },
                },
            },
        });
        await db.collection('universities').createIndex({ id: 1 }, { unique: true });
        await db
            .collection('universities')
            .createIndex({ name: 1, state: 1, country: 1 }, { unique: true });
    },

    async down(db, client) {
        await db.collection('universities').drop();
    },
};

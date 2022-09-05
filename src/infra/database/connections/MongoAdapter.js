const { BaseAdapter } = require('./BaseAdapter');
const mongoose = require('mongoose');

class MongoAdapter extends BaseAdapter {
    async getConnection(cb) {
        let result;
        try {
            const { username, password, host, port, dbName } = this;
            const slicedURI = `${username}:${password}@${host}:${port}`;
            const uri = `mongodb://${slicedURI}`;
            await mongoose.connect(uri, { dbName });
            result = await cb();
        } catch (e) {
            result = e;
        }
        if (result instanceof Error) throw result;
        return result;
    }

    async close() {
        await mongoose.connection.close();
    }
}

module.exports = { MongoAdapter };

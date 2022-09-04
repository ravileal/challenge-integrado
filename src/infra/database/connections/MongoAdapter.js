const { BaseAdapter } = require('./BaseAdapter');
const mongoose = require('mongoose');

class MongoAdapter extends BaseAdapter {
    async getConnection(cb) {
        let result;
        try {
            const { username, password, host, port } = this;
            const slicedURI = `${username}:${password}@${host}:${port}`;
            const uri = `mongodb://${slicedURI}`;
            await mongoose.connect(uri);
            result = await cb();
        } catch (e) {
            result = e;
        } finally {
            await mongoose.connection.close();
        }
        if (result instanceof Error) throw result;
        return result;
    }

    // async getAll(filters, model) {
    //     // const getAll = async () => {
    //     const result = await model.find(filters);
    //     // const result = [];
    //     // for await (const item of cursor) result.push(item);
    //     return result;
    //     // };
    //     // return await this.getConnection(getAll);
    // }

    // async getOne(id, domain) {
    //     const getOne = async () => {
    //         const result = await this.database[domain].find({ id });
    //         return result;
    //     };
    //     return await this.getConnection(getOne);
    // }

    // async save(model, domain) {
    //     const save = async () => {
    //         const result = await this.database[domain].save(model);
    //         return result;
    //     };
    //     return await this.getConnection(save);
    // }
}

module.exports = { MongoAdapter };

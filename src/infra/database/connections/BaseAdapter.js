/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
class BaseAdapter {
    constructor({ dbName, host, username, password, port }) {
        this.dbName = dbName;
        this.host = host
        this.username = username
        this.password = password
        this.port = port
    }

    async getConnection(cb) {
        throw new Error('Method Not Implemented');
    }

    async getAll(filters, connection) {
        throw new Error('Method Not Implemented');
    }

    async getOne(id, connection) {
        throw new Error('Method Not Implemented');
    }

    async save(model, connection) {
        throw new Error('Method Not Implemented');
    }
}

module.exports = { BaseAdapter };

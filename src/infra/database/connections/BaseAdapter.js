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

    async close() {
        throw new Error('Method Not Implemented');
    }
}

module.exports = { BaseAdapter };

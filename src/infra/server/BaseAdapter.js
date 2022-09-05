/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const { ServerAdapter } = require('../../interface/Contracts/ServerAdapter');

class BaseAdapter extends ServerAdapter {
    set get(callback) {
        this.GET = callback;
    }

    set post(callback) {
        this.POST = callback;
    }

    set put(callback) {
        this.PUT = callback;
    }

    set delete(callback) {
        this.DELETE = callback;
    }

    OPTIONS = () => { };
}

module.exports = { BaseAdapter };

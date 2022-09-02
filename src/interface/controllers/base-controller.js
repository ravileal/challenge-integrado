class BaseController {
    constructor({ server, context, useCases, connection, view }) {
        this.server = server;
        this.context = context;
        this.view = view;
        this.useCases = useCases;
        this.connection = connection;
    }

    async get({ path: { paths }, query }) {
        this.server.get = (...args) => this.get(...args);
        const id = paths[0];
        const payload = {
            filters: { ...query, ...(id && { id }) },
        };
        const action = id ? 'getOne' : 'getAll';
        const result = await this.useCases[action](this.context, payload, this.connection);
        return result;
    }

    async post(payload) {
        this.server.post = (...args) => this.post(...args);
        const result = await this.useCases.create(this.context, payload, this.connection);
        return result || 'post';
    }

    async put(payload) {
        this.server.put = (...args) => this.put(...args);
        const result = await this.useCases.update(this.context, payload, this.connection);
        return result || 'put';
    }

    async delete({ path: { paths } }) {
        this.server.delete = (...args) => this.delete(...args);
        const payload = { id: paths[0] };
        const result = await this.useCases.delete(this.context, payload, this.connection);
        return result || 'delete';
    }
}
module.exports = { BaseController };

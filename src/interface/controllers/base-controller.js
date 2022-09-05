const { PaginationView } = require('../views');

class BaseController {
    constructor({ server, context, useCases, connection, view }) {
        this.server = server;
        this.context = context;
        this.view = view;
        this.useCases = useCases;
        this.connection = connection;
    }

    configureServer() {
        const actions = ['get', 'post', 'put', 'delete'];
        for (const action of actions)
            this.server[action] = async request => {
                const cbAction = async () => await this[action].call(this, request);
                const result = await this.connection.getConnection(cbAction);
                return result;
            };
    }

    async get({ path: { paths }, query }) {
        const [id] = paths;
        const action = id ? 'getById' : 'getAll';
        const data = await this[action](query, paths);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async getAll({ pageNumber, pageSize, ...query }) {
        const pagination = new PaginationView({ pageNumber, pageSize });
        const payload = { filters: { ...query, pagination } };
        const result = await this.useCases.getAll(this.context, payload);
        return {
            pagination: new PaginationView(result.pagination),
            data: result.data,
        };
    }

    async getById(query, paths) {
        const payload = { filters: { ...query, id: paths[0] } };
        const data = await this.useCases.getById(this.context, payload);
        return data;
    }

    async post({ data: payload }) {
        const payloadFormatted = { dataView: new this.view(payload) };
        const data = await this.useCases.create(this.context, payloadFormatted);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async put({ data: payload, path: { paths } }) {
        const payloadFormatted = { dataView: new this.view(payload), id: paths[0] };
        const data = await this.useCases.update(this.context, payloadFormatted);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async delete({ path: { paths } }) {
        const payload = { id: paths[0] };
        const data = await this.useCases.delete(this.context, payload);
        return { data };
    }
}
module.exports = { BaseController };

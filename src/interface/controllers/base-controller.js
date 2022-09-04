const { PaginationView } = require('../views');

class BaseController {
    constructor({ server, context, useCases, connection, view }) {
        this.server = server;
        this.context = context;
        this.view = view;
        this.useCases = useCases;
        this.connection = connection;
    }

    async get({ path: { paths }, query }) {
        const [id] = paths;
        const action = id ? 'getById' : 'getAll';
        const data = await this[action](query, paths);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async getAll({ pageNumber, pageSize, ...query }, paths) {
        const pagination = new PaginationView({ pageNumber, pageSize });
        const payload = { filters: { ...query, pagination, id: paths[0] } };
        const result = await this.useCases.getAll(this.context, payload);
        return {
            pagination: new PaginationView(result.pagination),
            data: result.data,
        };
    }

    async getById(query) {
        const payload = { filters: { ...query } };
        const data = await this.useCases.getById(this.context, payload);
        return data;
    }

    async post({ data: payload }) {
        const payloadFormatted = { dataView: this.view.fit(payload) };
        const data = await this.useCases.create(this.context, payloadFormatted);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async put({ data: payload, path: { paths } }) {
        const payloadFormatted = { dataView: this.view.fit(payload), id: paths[0] };
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

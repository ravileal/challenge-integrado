class BaseController {
    constructor({ server, context, useCases, connection, view }) {
        this.server = server;
        this.context = context;
        this.view = view;
        this.useCases = useCases;
        this.connection = connection;
    }

    async get({ path: { paths }, query }) {
        const id = paths[0];
        const payload = {
            filters: { ...query, ...(id && { id }) },
        };
        const action = id ? 'getById' : 'getAll';
        const data = await this.useCases[action](this.context, payload);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
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

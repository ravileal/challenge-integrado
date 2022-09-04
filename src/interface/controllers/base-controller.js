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
        const data = await await this.useCases[action](this.context, payload, this.connection);
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async post({ data: payload }) {
        const payloadFormatted = { dataView: this.view.fit(payload) };
        const data = await await this.useCases.create(
            this.context,
            payloadFormatted,
            this.connection,
        );
        const headers = { 'Content-Type': 'application/json' };
        return { data, headers };
    }

    async put({ data: payload, path: { paths } }) {
        const payloadFormatted = { dataView: this.view.fit(payload), id: paths[0] };
        const data = await await this.useCases.update(
            this.context,
            payloadFormatted,
            this.connection,
        );
        return { data };
    }

    async delete({ path: { paths } }) {
        const payload = { id: paths[0] };
        const data = await await this.useCases.delete(this.context, payload, this.connection);
        return { data };
    }
}
module.exports = { BaseController };

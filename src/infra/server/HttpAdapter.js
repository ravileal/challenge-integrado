const http = require('node:http');
const url = require('node:url');
const { BaseAdapter } = require('./BaseAdapter');

class HttpAdapter extends BaseAdapter {
    async start() {
        const server = http.createServer();
        server.on('request', (request, response) => this.#handlerRequest(request, response));
        server.listen(process.env.PORT || 3000);
    }

    async #handlerRequest(request, response) {
        const formattedRequest = await this.#formatRequest(request);
        await this.onRequest(formattedRequest.path.resource);
        const result = await this.#execute(request.method, formattedRequest);
        response.write(`${result}\n`);
        response.end();
    }

    async #formatRequest(request) {
        const { pathname, query } = url.parse(request.url);
        const formattedQueies = this.#formatQuery(query);
        const formattedPaths = this.#formatPath(pathname);
        const formattedData = await this.#formatData(request);
        return {
            query: formattedQueies,
            path: formattedPaths,
            data: formattedData,
            headers: request.headers,
        };
    }

    async #formatData(request) {
        const data = await this.#dataFromRequest(request);
        const foramttedData = this.#formatFromContentType(data, request.headers['content-type']);
        return foramttedData;
    }

    #dataFromRequest(stream) {
        const bufferChunks = [];
        const bufferToString = () => Buffer.concat(bufferChunks).toString('utf8');
        const addChunk = chunk => bufferChunks.push(Buffer.from(chunk));

        return new Promise((resolve, reject) => {
            stream.on('data', addChunk);
            stream.on('error', err => reject(err));
            stream.on('end', () => resolve(bufferToString()));
        });
    }

    #formatFromContentType(data, contentType) {
        if (!data) return null;
        switch (contentType) {
            case 'application/json':
                return JSON.parse(data);
            default:
                return data;
        }
    }

    #formatQuery(query) {
        if (!query) return null;
        const queries = query.split('&');
        const objectQueries = queries.reduce((acc, query) => {
            const [key, value] = query.split('=');
            Object.assign(acc, { [key]: value });
            return acc;
        }, {});
        return objectQueries;
    }

    #formatPath(pathname) {
        if (!pathname) return null;
        const [, resource, ...paths] = pathname.split('/');
        return {
            resource,
            paths,
        };
    }

    async #execute(method, request) {
        const result = await this.instanceAction[method](request);
        return result;
    }
}

module.exports = { HttpAdapter };

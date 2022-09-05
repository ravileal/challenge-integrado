const { enviromentsFactory } = require('./src/infra/factories/enviroments-factory');
const { connectionFactory } = require('./src/infra/factories/connection-factory');
const { schemaFactory } = require('./src/domain/factories/schema-factory');

const { database } = enviromentsFactory();
const connection = connectionFactory(database.driver, database);

const { HttpAdapter } = require('./src/infra/server/HttpAdapter');
const { ApplicationController } = require('./src/interface/controllers/application-controller');
const { UniversityRepository } = require('./src/domain/repositories/university-repository');

exports.handler = async () => {
    const context = {
        connection,
        schemaFactory,
        server: new HttpAdapter(),
        universityRepository: new UniversityRepository(),
        ...require('./src/app'),
        ...require('./src/interface/views'),
    };

    const appController = new ApplicationController(context);
    await appController.execute();
    await connection.close();
};

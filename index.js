const { HttpAdapter } = require('./src/infra/server/HttpAdapter');
const { ApplicationController } = require('./src/interface/controllers/application-controller');
const { UniversityView } = require('./src/interface/views');
const { UniversityRepository } = require('./src/domain/repositories/university-repository');

const context = {
    connection: null,
    server: new HttpAdapter(),
    universityView: new UniversityView(),
    universityRepository: new UniversityRepository(),
    ...require('./src/app'),
};
const appController = new ApplicationController(context);

(async () => await appController.execute())();

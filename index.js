const { HttpAdapter } = require('./src/infra/server/HttpAdapter');
const { ApplicationController } = require('./src/interface/controllers/application-controller');

const serverHandler = new HttpAdapter();
const appController = new ApplicationController({ server: serverHandler });
(async () => await appController.execute())();

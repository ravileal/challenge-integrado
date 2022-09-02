const { UniversitiesController } = require('../controllers/universities-controller');

const CONTROLLERS = Object.freeze({
    universities: UniversitiesController,
});
const controllerFactory = (resocurce, context) => {
    const resolver = CONTROLLERS[resocurce];
    if (!resolver) throw new Error('Unknown controller resource: ', resocurce);
    return new resolver(context);
};

module.exports = { controllerFactory };

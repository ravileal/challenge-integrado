const { UniversitiesController } = require('../controllers/universities-controller');

const CONTROLLERS = Object.freeze({
    universities: UniversitiesController,
});
const controllerFactory = (resocurce, ...args) => {
    const resolver = CONTROLLERS[resocurce];
    if (!resolver) throw new Error('Unknown controller resource: ', resocurce);
    return new resolver(...args);
};

module.exports = { controllerFactory };

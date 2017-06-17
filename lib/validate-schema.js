
//this will throw errors
exports.default = function (Model) {

    const schema = Model.getSchema();
    return typeof schema === 'object';

};
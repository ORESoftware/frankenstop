
//this will throw errors
module.exports = function (Model) {

    const schema = Model.getSchema();
    return typeof schema === 'object';

};
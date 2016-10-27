/**
 * Created by t_millal on 10/27/16.
 */


//this will throw errors
module.exports = function (Model) {

    const schema = Model.getSchema();
    return typeof schema === 'object';

};
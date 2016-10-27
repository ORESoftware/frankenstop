const util = require('util');

module.exports = Object.freeze({

    getMsgWrongSchemaType: function (model, schemaProp, key, prevKey, prevModel) {

        return 'Model with these properties => \n'
            + util.inspect(model) + ', \n\n' +
            'does not have the right type= "' + schemaProp.type + '" for property = "' + key + '" \n\n' +
            '=> the above applies for the value for key = "' + prevKey + '" in the parent object given by => \n\n'
            + util.inspect(prevModel);

    },

    getMsgInvalidDate: function (model, modelProp, key) {
        return 'The following value for key = "' + key + '" => value => ' + util.inspect(modelProp)
            + ' is an invalid date, on model/sub-model => \n\n' +
            util.inspect(model);
    },

    dateTypeShouldBeStringButIsNotString: function (model, key, schemaProp) {
        return 'Model with these properties => \n' +
            (model === undefined ? '(undefined)' : util.inspect(model)) + ',\n\n' +
            'does not have the right type=' + schemaProp.type + ' for property=' + key
    }


});
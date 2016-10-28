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
    ,

    missingSubSchemaKey: function (s, m, model, k) {
        return 'Schema or sub-schema with value => \n\n ' + util.inspect(s) +
            '\n\n\n does not have key = "' + k + '", ' +
            'but this key is in model/sub-model => \n\n' + util.inspect(m)
            + '\n\n => for model with value => \n\n' + util.inspect(model)
    },

    mismatchedTypes: function (k, subSchema, subModel, model) {
        return 'subModel for key = "' + k + '" is an object, but ' +
            'subSchema.type is not "object" => \n\n' +
            util.inspect(subSchema) + '\n\n => for subModel with value => \n\n' + util.inspect(subModel) +
            '\n\n => for model with value => \n\n' +
            util.inspect(model)
    },

    moreThanOneOfValuesPropertiesElements: function(subSchema){
        return ' => schema/sub-schema with value => \n\n' + util.inspect(subSchema) +
            '\n\nhas more than one of a "properties" / "values" / "elements" object attached ' +
            '(cannot have more than one).';
    },

    missingElementsPropertiesOrValues: function(k, s){
        return ' => schema/sub-schema for key ="' + k + '" in schema/sub-schema => \n\n' + util.inspect(s) +
            '\n\ndoes not have a "elements","properties" or "values" object attached.'
    }

    ,

    requiredIsTrueButNoKey: function(key, prevSchema, prevKey, prevModel){
        return 'required:true for schema property= "' + key + '" for schema => \n\n' + util.inspect(prevSchema)
            + '\n\n => the above applies for the value for key="' + prevKey + '" in model object => \n'
            + util.inspect(prevModel);
    },

    requiredIsTrueAndKeyExistsButValueIsUndefined: function(key, prevSchema, prevKey, prevModel){
        return 'required:true for schema property= "' + key + '" for schema => \n\n' + util.inspect(prevSchema)
            + '\n\n => the above applies for the value for key="' + prevKey + '" in model object => \n'
            + util.inspect(prevModel);
    }

});
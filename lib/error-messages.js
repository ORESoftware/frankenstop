const util = require('util');

exports.getMsgWrongSchemaType = function (model, schemaProp, key, prevKey, prevModel) {
  
  return 'Model with these properties => \n'
    + util.inspect(model) + ', \n\n' +
    'does not have the right type= "' + schemaProp.type + '" for property = "' + key + '" \n\n' +
    '=> the above applies for the value for key = "' + prevKey + '" in the parent object given by => \n\n'
    + util.inspect(prevModel);
  
};

exports.getMsgInvalidDate = function (model, modelProp, key) {
  return 'The following value for key = "' + key + '" => value => ' + util.inspect(modelProp)
    + ' is an invalid date, on model/sub-model => \n\n' +
    util.inspect(model);
};

exports.dateTypeShouldBeStringButIsNotString = function (model, key, schemaProp) {
  return 'Model with these properties => \n' +
    (model === undefined ? '(undefined)' : util.inspect(model)) + ',\n\n' +
    'does not have the right type=' + schemaProp.type + ' for property=' + key
};

exports.missingSubSchemaKey = function (s, m, model, k) {
  return 'Schema or sub-schema with value => \n\n ' + util.inspect(s) +
    '\n\n\n does not have key = "' + k + '", ' +
    'but this key is in model/sub-model => \n\n' + util.inspect(m)
    + '\n\n => for model with value => \n\n' + util.inspect(model)
};

exports.mismatchedTypes = function (k, subSchema, subModel, model) {
  return 'subModel for key = "' + k + '" is an object, but ' +
    'subSchema.type is not "object" => \n\n' +
    util.inspect(subSchema) + '\n\n => for subModel with value => \n\n' + util.inspect(subModel) +
    '\n\n => for model with value => \n\n' +
    util.inspect(model)
};

exports.moreThanOneOfValuesPropertiesElements = function (subSchema) {
  return ' => schema/sub-schema with value => \n\n' + util.inspect(subSchema) +
    '\n\nhas more than one of a "properties" / "values" / "elements" object attached ' +
    '(cannot have more than one).';
};

exports.moreThanOneOfValuesPropertiesElements2 = function (schemaProp, schema) {
  return 'schemaProp given by =>'
    + util.inspect(schemaProp) + ' has more than one of "properties", "elements" and "values" properties, ' +
    'this is not allowed. This regards the following schema => ' + util.inspect(schema);
};

exports.missingElementsPropertiesOrValues = function (k, s) {
  return ' => schema/sub-schema for key ="' + k + '" in schema/sub-schema => \n\n' + util.inspect(s) +
    '\n\ndoes not have a "elements","properties" or "values" object attached.'
};

exports.requiredIsTrueButNoKey = function (key, prevSchema, prevKey, prevModel) {
  return 'required:true for schema property= "' + key + '" for schema => \n\n' + util.inspect(prevSchema)
    + '\n\n => the above applies for the value for key="' + prevKey + '" in model object => \n'
    + util.inspect(prevModel);
};

exports.requiredIsTrueAndKeyExistsButValueIsUndefined = function (key, prevSchema, prevKey, prevModel) {
  return 'required:true for schema property= "' + key + '" for schema => \n\n' + util.inspect(prevSchema)
    + '\n\n => the above applies for the value for key="' + prevKey + '" in model object => \n'
    + util.inspect(prevModel);
};

exports.missingTypeProperty = function (schema, schemaProp) {
  return 'schemaProp given by => \n' + util.inspect(schemaProp) +
    '\n on schema => \n' + util.inspect(schema) + '\ndoes not have a "type" property defined, please fix pronto.'
};

exports.mustHavePropertiesValuesOrElements = function (schemaProp, schemaProperties, schema) {
  return 'If schemaProp.type is an object, then you must define a "properties" property on the schemaProp ' +
    'which describes the properties => \n\n the problem is in the following schemaProp => \n\n'
    + util.inspect(schemaProp)
    + '\n\n in parent object => \n\n' + util.inspect(schemaProperties)
    + '\n\nfor schema => \n\n' + util.inspect(schema);
};

exports.uidMustBeAString = function (model, schemaProp, key, prevModel) {
  return 'Model with these properties => \n' + util.inspect(model) + ', \n\n' +
    'does not have the right type=' + schemaProp.type + ' for property = "' + key + '",\n\n ' +
    '=> the parent object is => \n\n' + util.inspect(prevModel)
};

exports.mustBeAnInteger = function (model, key, prevKey, prevModel) {
  return 'Model with these properties => \n' + util.inspect(model) + ', ' +
    ' is not an integer as expected => for property = "' + key + '" ' +
    '=> the above applies for the value for key = "' + prevKey +
    '" in the parent object given by => \n\n' + util.inspect(prevModel);
};

exports.mustDefineElementsDotProperties = function (schemaProp, model) {
  return 'You must define "schemaProp.elements.properties" as an "object" ' +
    'for the following schemaProp => \n\n'
    + util.inspect(schemaProp) + '\n\n for the following model => \n' + util.inspect(model)
};

exports.mustDefineValuesDotProperties = function (schemaProp, schema) {
  return 'You must define "schemaProp.values.properties" for the following schemaProp => \n\n'
    + util.inspect(schemaProp) + '\n\n for the following schema => \n' + util.inspect(schema);
};

exports.missingPropertiesProperty = function (schema) {
  return ' => Moover fast-fail here => schema "properties" ' +
    'property should be an object type, for schema => ' + util.inspect(schema);
};

//core
const assert = require('assert');
const util = require('util');

//npm

//project
const {

  getMsgWrongSchemaType,
  getMsgInvalidDate,
  dateTypeShouldBeStringButIsNotString,
  missingSubSchemaKey,
  mismatchedTypes,
  moreThanOneOfValuesPropertiesElements,
  moreThanOneOfValuesPropertiesElements2,
  missingElementsPropertiesOrValues,
  requiredIsTrueButNoKey,
  requiredIsTrueAndKeyExistsButValueIsUndefined,
  missingTypeProperty,
  mustHavePropertiesValuesOrElements,
  uidMustBeAString,
  mustBeAnInteger,
  mustDefineElementsDotProperties,
  mustDefineValuesDotProperties,
  missingPropertiesProperty

} = require('./error-messages');

//returns array of errors, if errors length < 1, it is valid
function validate (schema, propertiesList, model) {

  const errors = [];
  const forceAllObjectsToHavePropertyValidation = !!schema.forceAllObjectsToHavePropertyValidation;

  //TODO: validate that no extraneous properties exist
  const allowExtraneousProperties = !!schema.allowExtraneousProperties;

  if (!allowExtraneousProperties) {

    (function recurseThroughObjectProperties (m, s) {

      Object.keys(m).forEach(function (k) {

        var subModel = m[ k ];
        var subSchema = s[ k ];

        try {
          assert(k in s, missingSubSchemaKey(s, m, model, k));

          if (typeof subSchema !== 'object') {
            //this is simply for schema formatting validation
            //TODO: put this somewhere else
            throw new Error('Schema is not formatted correctly => ' + util.inspect(s));
          }

          if (typeof  subModel === 'object' && subModel !== null) {

            assert(subSchema.type === 'object' || subSchema.type === 'array',
              mismatchedTypes(k, subSchema, subModel, model));

            var hasProperties = typeof subSchema.properties === 'object';
            var hasValues = typeof subSchema.values === 'object';
            var hasElements = typeof subSchema.elements === 'object';

            if ([ hasProperties, hasValues, hasElements ].filter(i => i).length > 1) {
              throw new Error(moreThanOneOfValuesPropertiesElements(subSchema));
            }
            else if (hasProperties) {
              if (subModel) {
                recurseThroughObjectProperties(subModel, subSchema.properties);
              }
            }
            else if (hasValues) {
              if (subModel) {
                assert(typeof subModel === 'object', 'In this case, subModel should be an "object" type.');
                Object.keys(subModel).forEach(function (k) {
                  recurseThroughObjectProperties(subModel[ k ], subSchema.values.properties);
                });
              }
            }
            else if (hasElements) {
              if (subModel) {
                assert(Array.isArray(subModel), 'In this case, subModel should be an "object" type.');
                subModel.forEach(function (m) {
                  recurseThroughObjectProperties(m, subSchema.elements.properties);
                });
              }
            }
            else {
              throw new Error(missingElementsPropertiesOrValues(k, s));
            }
          }
        }
        catch (err) {
          errors.push(err);
        }
      });

    })(model, schema.properties)
  }

  //copy over only the properties we wish to validate, in effect creating a subschema
  const initialProperties = {};
  Object.keys(schema.properties).filter(i => propertiesList.indexOf(i) > -1).forEach(key => {
    initialProperties[ key ] = schema.properties[ key ];
  });

  assert(typeof schema.properties === 'object', missingPropertiesProperty(schema));

  //first go through schema and make sure all required fields are present and of the right type etc.
  (function recurseThroughProperties (schemaProperties, model, prevSchema, prevModel, prevKey) {

    Object.keys(schemaProperties).forEach(function (key, index) {

      const schemaProp = schemaProperties[ key ];

      if (!model) {
        console.log(new Error('temp => model undefined').stack);
      }

      const modelProp = model[ key ];
      const isRequired = !!schemaProp.required;

      if (isRequired && !(key in model)) {
        // TODO: what if the key exists but the value is simply undefined?
        errors.push(new Error(requiredIsTrueButNoKey(key, prevSchema, prevKey, prevModel)));
        //nothing more we can do if modelProp is null/undefined, so we return
        return;
      }

      if (isRequired && model[ key ] === undefined) {
        // TODO: what if the key exists but the value is simply undefined?
        errors.push(new Error(requiredIsTrueAndKeyExistsButValueIsUndefined(key, prevSchema, prevKey, prevModel)));
        //nothing more we can do if modelProp is null/undefined, so we return
        return;
      }

      try {  //place all assertions in this try/catch

        const hasProperties = typeof schemaProp.properties === 'object';
        const hasValues = typeof schemaProp.values === 'object';
        const hasElements = typeof schemaProp.elements === 'object';

        assert([ hasProperties, hasValues, hasElements ].filter(i => i).length < 2,
          moreThanOneOfValuesPropertiesElements2(schemaProp, schema));

        assert(typeof schemaProp.type === 'string', missingTypeProperty(schema, schemaProp));

        if (schemaProp.type === 'object') {
          assert(typeof schemaProp.properties === 'object'
            || typeof schemaProp.values === 'object'
            || typeof  schemaProp.elements === 'object',
            mustHavePropertiesValuesOrElements(schemaProp, schemaProperties, schema));
        }

        if (schemaProp.type === 'uid') {
          if (typeof  modelProp !== 'string') {
            throw new Error(uidMustBeAString(model, schemaProp, key, prevModel));
          }

          //TODO: validate uid's...
        }
        else if (schemaProp.type === 'array') {
          if (!Array.isArray(modelProp)) {
            throw new Error('schema type is "array" but model-prop is not an array.')
          }
        }
        else if (schemaProp.type === 'integer') {
          if (!Number.isInteger(modelProp)) {
            throw new Error(mustBeAnInteger(model, key, prevKey, prevModel));
          }

          if (schemaProp.minValue) {
            assert(modelProp >= schemaProp.minValue, 'integer value drops below minValue => \n\n'
              + util.inspect(model));
          }

          if (schemaProp.maxValue) {
            assert(modelProp <= schemaProp.maxValue, 'integer value exceeds maxValue => \n\n'
              + util.inspect(model));
          }
        }
        else if (schemaProp.type === 'date') {
          //TODO: need to parse date in string to see if it's valid
          if (typeof  modelProp !== 'string') {
            throw new Error(dateTypeShouldBeStringButIsNotString(model, key, schemaProp))
          }

          if (isNaN(new Date(modelProp).getTime())) {
            //date is invalid
            throw new Error(getMsgInvalidDate(model, modelProp, key));
          }
        }
        else {
          if (modelProp || isRequired) {
            assert(typeof modelProp === schemaProp.type,
              getMsgWrongSchemaType(model, schemaProp, key, prevKey, prevModel));

          }
        }

      }
      catch (err) {
        errors.push(err);
      }

      if ([ 'values' in schemaProp, 'properties' in schemaProp, 'elements' in schemaProp ].filter(i => i).length > 1) {
        throw new Error('Select one of "values", "properties", "elements" => \n\n' + util.inspect(model));
      }

      if (modelProp === null || modelProp === undefined) {
        if (schemaProp.required) {
          throw new Error('*required* modelProp is undefined given by key = "' + key + '" on object => \n\n'
            + util.inspect(model))
        }
      }

      // in the next few blocks we decide if we need to walk recursively through objects
      if (schemaProp.elements) {
        assert(Array.isArray(modelProp), 'modelProp with key = "' + key + '" should be an array => ' +
          '\n\n' + util.inspect(model));

        const properties = schemaProp.elements.properties;

        modelProp.forEach(function (m) {
          if (typeof m === 'object') {
            if (typeof properties !== 'object') {
              throw new Error(mustDefineElementsDotProperties(schemaProp, model));
            }
            recurseThroughProperties(properties, m, schemaProp, model, key); //boom this is the bomb
          }
        });

      }

      if (schemaProp.values) {

        const properties = schemaProp.values.properties;

        Object.keys(modelProp).forEach(function (key) {
          const m = modelProp[ key ];
          if (typeof m === 'object') {
            if (!properties) {
              throw new Error(mustDefineValuesDotProperties(schemaProp, schema));
            }
            recurseThroughProperties(properties, m, schemaProp, model, key); //boom this is the bomb
          }
        });

      }

      if (schemaProp.properties) {
        assert(typeof schema.properties === 'object', missingPropertiesProperty(schema));
        recurseThroughProperties(schemaProp.properties, modelProp, schemaProp, model, key);

      }

    });

  })(
    initialProperties, //only validate properties in list
    model
  );

  return errors;

}

module.exports = validate;
//core
const util = require('util');
const assert = require('assert');

//npm
const _ = require('lodash');

//project
const validate = require('../lib/shared-validation');


function FrankenstopModel(opts) {

    opts = opts || {};
    const {isPreValidate} = opts;

    if (isPreValidate !== false) {

        const keys = Object.keys(this);
        const Model = this.constructor;

        if (Model.getSchema().prevalidateAllFields === true) {
            this.preValidate(keys);
        }
        else {
            // only validate existing keys for which the user has defined values for the fields
            this.preValidate(keys.filter(k => this[k] !== undefined));
        }

    }

}

FrankenstopModel.bestow = function (fn) {
    assert(fn.prototype, ' => Constructor function expected, must have a "prototype" property.');
    Object.setPrototypeOf(fn.prototype, FrankenstopModel.prototype);
    return fn;
};

FrankenstopModel.validateFrankenstopSchema = require('./validate-schema').default;


//can accept an array of strings, or just multiple string arguments, representing keys
FrankenstopModel.prototype.preValidate = function () {
    const list = _.flattenDeep(Array.prototype.slice.call(arguments));
    const errors = validate(this.constructor.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

//this should not throw an error, simply return list of validation errors
FrankenstopModel.prototype.validate = function () {
    const list = Object.keys(this.constructor.getSchema().properties);
    return validate(this.constructor.getSchema(), list, this);
};


module.exports = FrankenstopModel;


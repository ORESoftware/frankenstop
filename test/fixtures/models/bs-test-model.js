const util = require('util');
const Frankenstop = require('../../../lib/frankenstop-model');


function Duck(obj, isPreValidate) {

    this.duckId = '???';
    this.duckTypeId = obj.duckTypeId || '???';
    this.duckSiblings = obj.duckSiblings;

    //this may throw an error, for purposes of failing-fast for devs
    Frankenstop.apply(this, [isPreValidate]);

}


Duck.fromExisting = function _fromExisting(obj){

     if(!obj.duckId){
         throw new Error('Duck has no duckId');
     }
     else{
         return new Duck(obj);
     }

};


Object.setPrototypeOf(Duck.prototype, Frankenstop.prototype);


Duck.getSchema = function getDuckSchema() {

    return Object.freeze({

        prevalidateAllFields: true,

        allowExtraneousProperties: false,

        properties: {

            duckId: {
                type: 'uid',
                primaryKey: true,
                required: false
            },

            duckTypeId: {
                type: 'uid',
                required: false
            },

            duckSiblings: {
                type: 'array',
                required: true,
                elements: {
                    minLength: null,
                    maxLength: 100,
                    properties: {
                        colors: {
                            type: 'string',
                            required: false
                        },
                        eatsBugs: {
                            type: 'boolean',
                            required: true
                        },
                        children: {
                            type: 'array',
                            required: true,
                            elements: {
                                properties: {
                                    colors: {
                                        type: 'string',
                                        required: false
                                    },
                                    eatsBugs: {
                                        type: 'boolean',
                                        required: true
                                    },
                                    children: {
                                        type: 'array',
                                        required: true,
                                        elements: {
                                            properties: {
                                                colors: {
                                                    type: 'string',
                                                    required: false
                                                },
                                                eatsBugs: {
                                                    type: 'boolean',
                                                    required: true
                                                }
                                            }

                                        }
                                    }
                                }

                            }
                        }
                    }

                }

            }


        }
    })

};


Duck.prototype.toRefPath = function () {
    return '/ducks/' + this.duckId;
};

Duck.prototype.toJSON = function toJSON() {

};


Frankenstop.validateFrankenstopSchema(Duck);
module.exports = Duck;
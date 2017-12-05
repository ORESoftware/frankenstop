const suman = require('suman');
const Test = suman.init(module);

Test.create(function (fs, path, assert, describe) {
  
  const Duck = require('../fixtures/models/bs-test-model');
  
  describe('test valid json', function (b, it) {
    
    const dir = path.resolve(__dirname + '/../fixtures/model-data/valid');
    
    const duckData =
      fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
        return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
      });
    
    duckData.forEach(d => {
      
      console.log('data:', d);
      
      it('constructor test', t => {
        
        const duck = new Duck(d, true);
        const errors = duck.validate();
        
        if (errors.length > 0) {
          console.log(errors.map(e => e.stack).join('\n\n'));
          throw 'failed';
        }
      });
      
    });
    
  });
  
  describe.skip('test in-valid json', function (b, it) {
    
    const dir = path.resolve(__dirname, 'fixtures/bs-test-model-data/invalid');
    
    const duckData =
      fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
        return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
      });
    
    duckData.forEach(d => {
      
      it('constructor test', t => {
        
        assert.throws(function () {
          const keys = Object.keys(Duck.getSchema().properties);
          new Duck(d, false).preValidate(keys);
          
        });
        
      });
      
    });
    
  });
  
});




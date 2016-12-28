import { assert } from 'meteor/practicalmeteor:chai';
import { _ } from 'meteor/underscore';

import {
  Dict,
  StringsDict,
  FunctionsDict,
  NumbersDict,
  BooleansDict,
  HooksDict
} from 'meteor/hotello:useful-dicts';

describe('dict', function() {
  const dict = new Dict({
    'test.pair': true
  });

  it('should set pairs', function() {
    assert.throws(function() {
      dict.set(null);
    }, Error);
    assert.equal(dict.pairs['test.pair'], true);
  });

  it('should get pairs', function() {
    assert.throws(function() {
      dict.get(false);
    }, Error);
    assert.throws(function() {
      dict.get('test.notExising');
    }, Error);
    assert.equal(dict.get('test.pair'), true);
  });

  it('should not throw error on get when asked', function() {
    const dictTwo = new Dict({}, {throwingGet: false});
    assert.doesNotThrow(function() {
      dictTwo.get('test.notExising');
    }, Error);
    assert.isUndefined(dictTwo.get('test.notExising'));
  });
});

describe('strings dict', function() {
  it('should set only strings', function() {
    const stringsDict = new StringsDict({});
    assert.doesNotThrow(function() {
      stringsDict.set({
        'test.string': new String()
      });
    }, Error);
    assert.throws(function() {
      stringsDict.set({'test.string': false});
    }, Error);
    assert.isString(stringsDict.pairs['test.string']);
  });
});

describe('numbers dict', function() {
  it('should set only numbers', function() {
    const numbersDict = new NumbersDict({});
    assert.doesNotThrow(function() {
      numbersDict.set({
        'test.number': new Number()
      });
    }, Error);
    assert.throws(function() {
      numbersDict.set({'test.number': false});
    }, Error);
    assert.isNumber(numbersDict.pairs['test.number']);
  });
});

describe('booleans dict', function() {
  it('should set only booleans', function() {
    const booleansDict = new BooleansDict({});
    assert.doesNotThrow(function() {
      booleansDict.set({
        'test.boolean': true
      });
    }, Error);
    assert.throws(function() {
      booleansDict.set({'test.boolean': 'false'});
    }, Error);
    assert.isBoolean(booleansDict.pairs['test.boolean']);
  });
});

describe('functions dict', function() {
  it('should set only functions', function() {
    const functionsDict = new FunctionsDict({});
    assert.doesNotThrow(function() {
      functionsDict.set({
        'test.function': new Function()
      });
    }, Error);
    assert.throws(function() {
      functionsDict.set({'test.function': false});
    }, Error);
    assert.isFunction(functionsDict.pairs['test.function']);
  });
});

describe('hooks dict', function() {
  const hooks = new HooksDict({});

  beforeEach(function() {
    hooks.pairs = {};
  });

  it('should accept only arrays of functions', function() {
    assert.doesNotThrow(function() {
      hooks.set({'test.hooks': [new Function]});
    }, Error);
    assert.throws(function() {
      hooks.set({'test.hooks': new Function});
    }, Error);
  });

  it('should setup a group of hooks', function() {
    hooks._setup('test.hooks');
    assert.isArray(hooks.pairs['test.hooks']);
    assert.equal(hooks.pairs['test.hooks'].length, 0);
  });

  it('should add a hook to an array of hooks', function() {
    hooks.add('test.hooks', new Function);
    assert.isFunction(hooks.get('test.hooks')[0]);
  });

  it('should run all the hooks and return', function() {
    const fn = (arg) => arg + 1;
    assert.equal(hooks.run('test.hooks', 'noHooks'), 'noHooks');
    _.times(3, () => { hooks.add('test.hooks', fn); });
    assert.equal(hooks.run('test.hooks', 0), 3);
  });
});

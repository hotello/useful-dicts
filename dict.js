import { _ } from 'meteor/underscore';

export class Dict {
  /**
   * Sets up the dictionary
   * @param {Object} pairs key/value pairs for the dictionary
   * @parma {Object} options options for the dict
   */
  constructor(pairs = {}, options) {
    this.pairs = pairs;
    this.throwingGet = true;
    // set if it should throw an error on get if value is not found
    if (options && _.has(options, 'throwingGet')) {
      if (!_.isBoolean(options.throwingGet)) {
        throw new Error('dict: options.throwingGet must be a Boolean.');
      }
      this.throwingGet = options.throwingGet;
    }
    this.set(this.pairs);
  }

  /**
   * Get a value from the dictionary
   * @param {String} key name of the value
   * @return {<T>} found value
   */
  get(key) {
    let value;

    if (!_.isString(key)) throw new Error('dict.get: must provide a String.');
    // find value in the dict
    value = this.pairs[key];
    if (_.isUndefined(value) && this.throwingGet) throw Error('dict.get: value not found.');
    // return the value
    return value;
  }

  /**
   * Set key/value pairs in the dictionary
   * @param {Object} strings key/value pairs for the dictionary
   */
  set(pairs) {
    if (_.isObject(pairs)) {
      // check for non strings
      this._checkPairs(pairs);
      _.extend(this.pairs, pairs);
    } else {
      throw new Error('dict.set: must provide an object.');
    }
  }

  // check if we have only strings
  _checkPairs(pairs) {
    _.each(_.values(pairs), (value) => {
      this._checkValue(value);
    });
  }

  // check value
  _checkValue(value) {
    return true;
  }
}

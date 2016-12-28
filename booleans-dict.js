import { _ } from 'meteor/underscore';

import { Dict } from './dict.js';

export class BooleansDict extends Dict {
  // check if a value is an array
  _checkValue(value) {
    if (!_.isBoolean(value)) {
      throw new Error('booleansDict._checkValue: must provide only Array as values.');
    }
  }
}

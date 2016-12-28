import { _ } from 'meteor/underscore';

import { Dict } from './dict.js';

export class NumbersDict extends Dict {
  // check if a value is a number
  _checkValue(value) {
    if (!_.isNumber(value)) {
      throw new Error('numbersDict._checkValue: must provide only Number as values.');
    }
  }
}

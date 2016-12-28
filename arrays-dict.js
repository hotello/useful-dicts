import { _ } from 'meteor/underscore';

import { Dict } from './dict.js';

export class ArraysDict extends Dict {
  // check if a value is an array
  _checkValue(value) {
    if (!_.isArray(value)) {
      throw new Error('arraysDict._checkValue: must provide only Array as values.');
    }
  }
}

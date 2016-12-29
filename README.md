# Useful Dicts
A small collection of Dicts for Meteor. Store some validated data and retrieve it easily.
## Dict
```js
const dict = new Dict();
const dictTwo = new Dict({value: true});
```
You can construct a new dict with or without an object of key/value pairs.
```js
dict.get('value');
```
Will return the value set. If it is not found it will **throw** an *Error*.
```js
dict.set({valueTwo: true, valueThree: true});
```
You can set more than one key/value pair at once.
```js
const dictTwo = new Dict({}, {throwingGet: false});
```
You can disable Error throws at *.get* method.
## Validated Dicts
This package will give you a group of **validated dicts** you can use to store data of the same type. All these classes *inherit* from *Dict*, so you'll just use *.get* and *.set* methods as above.
```js
// a dict that will accept only String type values
const stringsDict = new StringsDict();

// a dict that will accept only Number type values
const numbersDict = new NumbersDict();

// a dict that will accept only Boolean type values
const booleansDict = new BooleansDict();

// a dict that will accept only Function type values
const functionsDict = new FunctionsDict();
```
Errors are thrown if you try to *.set* values of the wrong type in them.
## Special Dicts
These are dicts with extended functionality.
### Hooks Dict
It allow to execute in sequence a group on functions on some data, and return that data, eventually changed by the fuctions above.
```js
const hooksDict = new HooksDict();
// add a function to an automatically created group of functions
hooksDict.add('example.functions', function doSomething(data) {
	// remember to always return something or an error will be thrown
	return data;
});
// later on anywhere in your application
hooksDict.add('example.functions', function doSomethingElse(data) {
	// do something else
	return data;
});
```
Note that the **functions** added will always be **called** with **only one argument**.
```js
// execute the group of functions you have just created
const result = hooksDict.run('example.functions', data);
// if you call run on a group of hooks that does not exist or is empty,
// it will return the same data you passed to it.
const resultTwo = hooksDict.run('example.noHooks', data);
// => data is returned as result
```
You must pass only **one data argument**, other arguments will be ignored.

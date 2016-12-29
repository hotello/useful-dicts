Package.describe({
  name: 'hotello:useful-dicts',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: 'A small collection of useful dictionaries.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/hotello/useful-dicts.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use([
    'underscore@1.0.10',
    'ecmascript@0.6.1'
  ]);
  api.mainModule('useful-dicts.js');
});

Package.onTest(function(api) {
  api.use('ecmascript@0.6.1');
  api.use('practicalmeteor:mocha@2.4.5_6');
  api.use('hotello:useful-dicts');
  api.mainModule('useful-dicts-tests.js');
});

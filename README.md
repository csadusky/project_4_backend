# Template Node Project Repository

## Installation

At the top level:

```
npm install
```

## This repository assumes the following layout of files:

```
.
├── ./package.json
├── ./Gruntfile.js
├── ./grunt
│   ├── ./grunt/aliases.json
│   ├── ./grunt/paths.json
│   └── ...
├── ./node_modules
│   └── ...
├── ./README.md
├── ./app.js
├── ./lib
│   └── ./lib/tic-tac-toe.js
└── ./spec
    └── ./spec/tic-tac-toe.spec.js
```

This is where everyhing is stored:

* Overall package configuration is stored in `package.json`.  

* Configuration files for **grunt**, our task runner: `./Gruntfile.js` and `./grunt` directory.  This is our task runner, like rake in Ruby.  If you follow the layout guidelines here, you won't need to change anything in here.

* Node packages you install from elsewhere are stored in `./node_modules` 

* The documentation you provide for users (like the documentation you're reading right now!) is included in `./README.md` 

* The entry point into your application should be the only Javascript file at the top level.  By convention it's called `index.js`, `app.js`, `main.js`, or `server.js`, and is named in the `package.json` file.

* All of your other code goes into the `./lib` (library) directory.

* All of your tests go into the `./spec` (specification) directory.

## Grunt automations

Type these at the command line to see useful things happen.

* `grunt debug` - runs your application in debug mode, fires up a `node-inspector` translation process, and opens a Chrome window to access `node-inspector`.

* `grunt test` - runs your test suite

* `grunt nag` - runs code quality analysis tools on your code and complains

    * `grunt jshint` - runs jshint on your <code>
    * `grunt jsonlint` - runs jsonlint on your json files 
    * `grunt jscs:status` - runs jscs (Javascript Code Style) on your files
    * `grunt jsbeautifier:status` finds parts of your code that could be beautified
 
* `grunt reformat` - reformats all your code in a standard style



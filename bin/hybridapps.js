#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var sortedObject = require('sorted-object');
var wrench = require('wrench');

var _exit = process.exit;
var eol = os.EOL;
var pkg = require('../package.json');


var version = pkg.version;

process.exit = exit

// CLI

before(program, 'outputHelp', function() {
  this.allowUnknownOption();
});

program
  .version(version)
  .usage('[options] [dir]')
  .option('-i, --ionic', 'add ionic folder')
  .option('-p, --angularjs', 'Add Public Folder')
  .parse(process.argv);

if (!exit.exited) {
  main();
}

/**
 * Install a before function; AOP.
 */

function before(obj, method, fn) {
  var old = obj[method];

  obj[method] = function() {
    fn.call(this);
    old.apply(this, arguments);
  };
}



/**
 * Graceful exit for async STDIO
 */

function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done() {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}



/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined;
}

/**
 * Load template file.
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

/**
 * Main program.
 */


/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, {
    mode: mode || 0666
  });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}




/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

function main() {
  // Path
  var destinationPath = program.args.shift() || '.';
   console.log(destinationPath);
  // App name
  var appName = path.basename(path.resolve(destinationPath));

  // Template engine
  program.template = 'jade';
  if (program.ejs) program.template = 'ejs';
  if (program.hogan) program.template = 'hjs';
  if (program.hbs) program.template = 'hbs';

  // Generate application
  emptyDirectory(destinationPath, function (empty) {
    if (empty) {

      createHybridApplication(appName, destinationPath);
    } else {
      console.error("Aborting - App Name Not Defined");
      exit(1);
    }
  });
}

function copyDir(path){
  wrench.copyDirSyncRecursive('../templates/mobile',path, {
    forceDelete: true
});
}

function createHybridApplication(app_name, path) {
  var wait = 5;



  function complete() {
    if (--wait) return;
    var prompt = launchedFromCmd() ? '>' : '$';

    console.log();
    console.log('   install dependencies:');
    console.log('     %s cd %s && npm install', prompt, path);
    console.log();
    console.log('   run the app:');

    if (launchedFromCmd()) {
      console.log('     %s SET DEBUG=%s:* & npm start', prompt, app_name);
    } else {
      console.log('     %s DEBUG=%s:* npm start', prompt, app_name);
    }

    console.log();
  }

  // Create the App Directory
    mkdir(path, function(){
    mkdir(path + '/api');
      complete();
    });
    var app = loadTemplate('app.js');
    var www = loadTemplate('www');

    // package.json
    var pkg = {
        name: app_name
      , version: '0.0.0'
      , private: true
      , scripts: { start: 'node ./www' }
      , dependencies: {
          'express': '~4.13.1',
          'body-parser': '~1.13.2',
          'cookie-parser': '~1.3.5',
          'debug': '~2.2.0',
          'morgan': '~1.6.1',
          'serve-favicon': '~2.3.0'
      }
    }

    write(path + '/package.json', JSON.stringify(pkg, null, 2));
    write(path + '/app.js', app);
    mobileDir = path+'/mobile';
    copyDir(mobileDir);
    publicDir = path+'/public';
    copyDir(publicDir);
    www = www.replace('{name}', app_name);
    write(path + '/www', www, 0755);
    complete();




}

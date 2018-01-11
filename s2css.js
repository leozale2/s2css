/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Sass = __webpack_require__(1);
const sass = new Sass();

document.addEventListener("DOMContentLoaded",event=>{

   if(window.SASS_FILES && window.SASS_FILES.length){
     sass.preloadFiles("", "", window.SASS_FILES, function callback() {
       run();
     });
   }else{
     run();
   }

   function run() {
     const list = document.querySelectorAll("style[type='text/scss']");

     list.forEach(style=>{
       const txt = style.innerText;
       sass.compile(txt,result=>{
         let styleDom = document.createElement("style");
         styleDom.innerText = result.text;
         document.body.appendChild(styleDom);
       });
     });
   }

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! sass.js - v0.10.7 (ae544a4) - built 2017-11-14
  providing libsass 3.4.7 (c943792a)
  via emscripten 1.37.0 ()
 */

(function (root, factory) {
  'use strict';
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Sass = factory();
  }
}(this, function () {/*global document*/
// identify the path sass.js is located at in case we're loaded by a simple
// <script src="path/to/sass.js"></script>
// this path can be used to identify the location of
// * sass.worker.js from sass.js
// * libsass.js.mem from sass.sync.js
// see https://github.com/medialize/sass.js/pull/32#issuecomment-103142214
// see https://github.com/medialize/sass.js/issues/33
var SASSJS_RELATIVE_PATH = (function() {
  'use strict';
  console.log(0);

  console.log(1);
  // we can only run this test in the browser,
  // so make sure we actually have a DOM to work with.
  if (typeof document === 'undefined' || !document.getElementsByTagName) {
    return null;
  }

  // http://www.2ality.com/2014/05/current-script.html
  var currentScript = document.currentScript;

  var path = currentScript && currentScript.src;
  if (!path) {
    return null;
  }

  // [worker] make sure we're not running in some concatenated thing
  return path.match(/(^.+)\/[^\/]+$/)[1];

  return null;
})() || '.';

/*global Worker, SASSJS_RELATIVE_PATH*/
'use strict';

var noop = function(){};
var slice = [].slice;
// defined upon first Sass.initialize() call
var globalWorkerUrl;

function Sass(workerUrl) {
  if (!workerUrl && !globalWorkerUrl) {
    /*jshint laxbreak:true */
    throw new Error(
      'Sass needs to be initialized with the URL of sass.worker.js - '
      + 'either via Sass.setWorkerUrl(url) or by new Sass(url)'
    );
    /*jshint laxbreak:false */
  }

  if (!globalWorkerUrl) {
    globalWorkerUrl = workerUrl;
  }

  // bind all functions
  // we're doing this because we used to have a single hard-wired instance that allowed
  // [].map(Sass.removeFile) and we need to maintain that for now (at least until 1.0.0)
  for (var key in this) {
    if (typeof this[key] === 'function') {
      this[key] = this[key].bind(this);
    }
  }

  this._callbacks = {};
  this._worker = new Worker(workerUrl || globalWorkerUrl);
  this._worker.addEventListener('message', this._handleWorkerMessage, false);
}

// allow setting the workerUrl before the first Sass instance is initialized,
// where registering the global workerUrl would've happened automatically
Sass.setWorkerUrl = function(workerUrl) {
  globalWorkerUrl = workerUrl;
};

Sass.style = {
  nested: 0,
  expanded: 1,
  compact: 2,
  compressed: 3
};

Sass.comments = {
  'none': 0,
  'default': 1
};

Sass.prototype = {
  style: Sass.style,
  comments: Sass.comments,

  destroy: function() {
    this._worker && this._worker.terminate();
    this._worker = null;
    this._callbacks = {};
    this._importer = null;
  },

  _handleWorkerMessage: function(event) {
    if (event.data.command) {
      this[event.data.command](event.data.args);
    }

    this._callbacks[event.data.id] && this._callbacks[event.data.id](event.data.result);
    delete this._callbacks[event.data.id];
  },

  _dispatch: function(options, callback) {
    if (!this._worker) {
      throw new Error('Sass worker has been terminated');
    }

    options.id = 'cb' + Date.now() + Math.random();
    this._callbacks[options.id] = callback;
    this._worker.postMessage(options);
  },

  _importerInit: function(args) {
    // importer API done callback pushing results
    // back to the worker
    var done = function done(result) {
      this._worker.postMessage({
        command: '_importerFinish',
        args: [result]
      });
    }.bind(this);

    try {
      this._importer(args[0], done);
    } catch(e) {
      done({ error: e.message });
      throw e;
    }
  },

  importer: function(importerCallback, callback) {
    if (typeof importerCallback !== 'function' && importerCallback !== null) {
      throw new Error('importer callback must either be a function or null');
    }

    // callback is executed in the main EventLoop
    this._importer = importerCallback;
    // tell worker to activate importer callback
    this._worker.postMessage({
      command: 'importer',
      args: [Boolean(importerCallback)]
    });

    callback && callback();
  },
};

var commands = 'writeFile readFile listFiles removeFile clearFiles lazyFiles preloadFiles options compile compileFile';
commands.split(' ').forEach(function(command) {
  Sass.prototype[command] = function() {
    var callback = slice.call(arguments, -1)[0];
    var args = slice.call(arguments, 0, -1);
    if (typeof callback !== 'function') {
      args.push(callback);
      callback = noop;
    }

    this._dispatch({
      command: command,
      args: args
    }, callback);
  };
});

// automatically set the workerUrl in case we're loaded by a simple
// <script src="path/to/sass.js"></script>
// see https://github.com/medialize/sass.js/pull/32#issuecomment-103142214
Sass.setWorkerUrl(SASSJS_RELATIVE_PATH + '/sass.worker.js');
return Sass;
}));


/***/ })
/******/ ]);
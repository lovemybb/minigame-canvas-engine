'use strict';

const {WXWebAssembly, wx} = pluginEnv.customEnv;

let WebAssembly = WXWebAssembly;

var Module = (function () {
  // var _scriptDir = (typeof document === 'undefined' ? new(require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.cjs.js', document.baseURI).href));
  var _scriptDir = '';

  return (
    function (Module) {
      Module = Module || {};

      var Module = typeof Module !== "undefined" ? Module : {};
      var moduleOverrides = {};
      var key;
      for (key in Module) {
        if (Module.hasOwnProperty(key)) {
          moduleOverrides[key] = Module[key];
        }
      }
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = function (status, toThrow) {
        throw toThrow
      };
      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = false;
      var ENVIRONMENT_IS_NODE = false;
      var ENVIRONMENT_IS_SHELL = false;
      ENVIRONMENT_IS_WEB = typeof window === "object";
      ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
      ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
      ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

      console.log(ENVIRONMENT_IS_WEB, ENVIRONMENT_IS_WORKER, ENVIRONMENT_IS_NODE, ENVIRONMENT_IS_SHELL) 
      var scriptDirectory = "";

      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory)
        }
        return scriptDirectory + path
      }
      var read_, readBinary;
      var nodeFS;
      var nodePath;
      if (ENVIRONMENT_IS_NODE) {
        // if (ENVIRONMENT_IS_WORKER) {
        //   scriptDirectory = require("path").dirname(scriptDirectory) + "/";
        // } else {
        //   scriptDirectory = __dirname + "/";
        // }
        // read_ = function shell_read(filename, binary) {
        //   if (!nodeFS) nodeFS = require("fs");
        //   if (!nodePath) nodePath = require("path");
        //   filename = nodePath["normalize"](filename);
        //   return nodeFS["readFileSync"](filename, binary ? null : "utf8")
        // };
        // readBinary = function readBinary(filename) {
        //   var ret = read_(filename, true);
        //   if (!ret.buffer) {
        //     ret = new Uint8Array(ret);
        //   }
        //   assert(ret.buffer);
        //   return ret
        // };
        // if (process["argv"].length > 1) {
        //   thisProgram = process["argv"][1].replace(/\\/g, "/");
        // }
        // arguments_ = process["argv"].slice(2);
        // process["on"]("uncaughtException", function (ex) {
        //   if (!(ex instanceof ExitStatus)) {
        //     throw ex
        //   }
        // });
        // process["on"]("unhandledRejection", abort);
        // quit_ = function (status) {
        //   process["exit"](status);
        // };
        // Module["inspect"] = function () {
        //   return "[Emscripten Module object]"
        // };
      } else if (ENVIRONMENT_IS_SHELL) {
        // if (typeof read != "undefined") {
        //   read_ = function shell_read(f) {
        //     return read(f)
        //   };
        // }
        // readBinary = function readBinary(f) {
        //   var data;
        //   if (typeof readbuffer === "function") {
        //     return new Uint8Array(readbuffer(f))
        //   }
        //   data = read(f, "binary");
        //   assert(typeof data === "object");
        //   return data
        // };
        // if (typeof scriptArgs != "undefined") {
        //   arguments_ = scriptArgs;
        // } else if (typeof arguments != "undefined") {
        //   arguments_ = arguments;
        // }
        // if (typeof quit === "function") {
        //   quit_ = function (status) {
        //     quit(status);
        //   };
        // }
        // if (typeof print !== "undefined") {
        //   if (typeof console === "undefined") console = {};
        //   console.log = print;
        //   console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
        // }
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptDir) {
          scriptDirectory = _scriptDir;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
        } else {
          scriptDirectory = "";
        } {
          read_ = function shell_read(url) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = function readBinary(url) {
              var xhr = new XMLHttpRequest;
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response)
            };
          }
        }
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.warn.bind(console);
      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module[key] = moduleOverrides[key];
        }
      }
      moduleOverrides = null;
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      if (Module["quit"]) quit_ = Module["quit"];
      var asm2wasmImports = {
        "f64-rem": function (x, y) {
          return x % y
        },
        "debugger": function () {}
      };
      var functionPointers = new Array(0);
      var setTempRet0 = function (value) {};
      var wasmBinary;
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
      var noExitRuntime;
      if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
      if (typeof WebAssembly !== "object") {
        err("no native wasm support detected");
      }
      var wasmMemory;
      var wasmTable = new WebAssembly.Table({
        "initial": 341,
        "maximum": 341,
        "element": "anyfunc"
      });
      var ABORT = false;

      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed: " + text);
        }
      }
      var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

      function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = u8Array[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue
            }
            var u1 = u8Array[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue
            }
            var u2 = u8Array[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str
      }

      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
      }

      function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            outU8Array[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            outU8Array[outIdx++] = 192 | u >> 6;
            outU8Array[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            outU8Array[outIdx++] = 224 | u >> 12;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            outU8Array[outIdx++] = 240 | u >> 18;
            outU8Array[outIdx++] = 128 | u >> 12 & 63;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          }
        }
        outU8Array[outIdx] = 0;
        return outIdx - startIdx
      }

      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
      }

      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
          if (u <= 127) ++len;
          else if (u <= 2047) len += 2;
          else if (u <= 65535) len += 3;
          else len += 4;
        }
        return len
      }
      var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

      function UTF16ToString(ptr) {
        var endPtr = ptr;
        var idx = endPtr >> 1;
        while (HEAP16[idx]) ++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder) {
          return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr))
        } else {
          var i = 0;
          var str = "";
          while (1) {
            var codeUnit = HEAP16[ptr + i * 2 >> 1];
            if (codeUnit == 0) return str;
            ++i;
            str += String.fromCharCode(codeUnit);
          }
        }
      }

      function stringToUTF16(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === undefined) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 2) return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i = 0; i < numCharsToWrite; ++i) {
          var codeUnit = str.charCodeAt(i);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr
      }

      function lengthBytesUTF16(str) {
        return str.length * 2
      }

      function UTF32ToString(ptr) {
        var i = 0;
        var str = "";
        while (1) {
          var utf32 = HEAP32[ptr + i * 4 >> 2];
          if (utf32 == 0) return str;
          ++i;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          } else {
            str += String.fromCharCode(utf32);
          }
        }
      }

      function stringToUTF32(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === undefined) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 4) return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
          }
          HEAP32[outPtr >> 2] = codeUnit;
          outPtr += 4;
          if (outPtr + 4 > endPtr) break
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr
      }

      function lengthBytesUTF32(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
          len += 4;
        }
        return len
      }
      var WASM_PAGE_SIZE = 65536;

      function alignUp(x, multiple) {
        if (x % multiple > 0) {
          x += multiple - x % multiple;
        }
        return x
      }
      var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      var DYNAMIC_BASE = 5254224,
        DYNAMICTOP_PTR = 11152;
      var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
      if (Module["wasmMemory"]) {
        wasmMemory = Module["wasmMemory"];
      } else {
        wasmMemory = new WebAssembly.Memory({
          "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
        });
      }
      if (wasmMemory) {
        buffer = wasmMemory.buffer;
      }
      INITIAL_INITIAL_MEMORY = buffer.byteLength;
      updateGlobalBufferAndViews(buffer);
      HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback();
            continue
          }
          var func = callback.func;
          if (typeof func === "number") {
            if (callback.arg === undefined) {
              Module["dynCall_v"](func);
            } else {
              Module["dynCall_vi"](func, callback.arg);
            }
          } else {
            func(callback.arg === undefined ? null : callback.arg);
          }
        }
      }
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];

      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }

      function initRuntime() {
        callRuntimeCallbacks(__ATINIT__);
      }

      function preMain() {
        callRuntimeCallbacks(__ATMAIN__);
      }

      function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }

      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }

      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      var runDependencies = 0;
      var dependenciesFulfilled = null;

      function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
      }

      function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
        if (runDependencies == 0) {
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      Module["preloadedImages"] = {};
      Module["preloadedAudios"] = {};

      function abort(what) {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
        what += "";
        out(what);
        err(what);
        ABORT = true;
        what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
        // throw new WebAssembly.RuntimeError(what)
        throw new Error(what);
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";

      function isDataURI(filename) {
        return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0
      }
      var wasmBinaryFile = "yoga.wasm";
      // wasmBinaryFile = ' __plugin__/wx722e01aaedff584c/libs/yoga.wasm'
      // if (!isDataURI(wasmBinaryFile)) {
      //   wasmBinaryFile = locateFile(wasmBinaryFile);
      // }

      readBinary = function(wasmBinaryFile) {
        const fs = wx.getFileSystemManager();
        const content = fs.readFileSync(wasmBinaryFile);

        return content;
      }

      function getBinary() {
        try {
          if (wasmBinary) {
            return new Uint8Array(wasmBinary)
          }

          
          if (readBinary) {
            return readBinary(wasmBinaryFile)
          } else {
            throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)"
          }
        } catch (err) {
          abort(err);
        }
      }

      async function createWasm() {
        debugger;
        var info = {
          "env": asmLibraryArg,
          "wasi_snapshot_preview1": asmLibraryArg,
          "global": {
            "NaN": NaN,
            Infinity: Infinity
          },
          "global.Math": Math,
          "asm2wasm": asm2wasmImports
        };

        function receiveInstance(instance, module) {
          var exports = instance.exports;
          Module["asm"] = exports;
          removeRunDependency();
        }
        addRunDependency();

        function instantiateSync() {
          var instance;
          var module;
          var binary;
          try {
            // binary = getBinary();
            // module = new WebAssembly.Module(binary);
            // instance = new WebAssembly.Instance(module, info);

            // console.log(binary)
            return  WebAssembly.instantiate("yoga.wasm", info).then(result => {
              // return result;
              receiveInstance(result.instance);
            })

          } catch (e) {
            var str = e.toString();
            err("failed to compile wasm module: " + str);
            if (str.indexOf("imported Memory") >= 0 || str.indexOf("memory import") >= 0) {
              err("Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).");
            }
            throw e
          }
        }
        if (Module["instantiateWasm"]) {
          try {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false
          }
        }
        const  res = await instantiateSync();

        return Module["asm"]
      }

      Module["asm"] = createWasm;
      __ATINIT__.push({
        func: function () {
          globalCtors();
        }
      });
      var SYSCALLS = {
        mappings: {},
        buffers: [null, [],
          []
        ],
        printChar: function (stream, curr) {
          var buffer = SYSCALLS.buffers[stream];
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
          } else {
            buffer.push(curr);
          }
        },
        varargs: undefined,
        get: function () {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret
        },
        getStr: function (ptr) {
          var ret = UTF8ToString(ptr);
          return ret
        },
        get64: function (low, high) {
          return low
        }
      };

      function _fd_close(fd) {
        return 0
      }

      function ___wasi_fd_close(a0) {
        return _fd_close()
      }

      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {}

      function ___wasi_fd_seek(a0, a1, a2, a3, a4) {
        return _fd_seek()
      }

      function _fd_write(fd, iov, iovcnt, pnum) {
        var num = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          for (var j = 0; j < len; j++) {
            SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
          }
          num += len;
        }
        HEAP32[pnum >> 2] = num;
        return 0
      }

      function ___wasi_fd_write(a0, a1, a2, a3) {
        return _fd_write(a0, a1, a2, a3)
      }
      var char_0 = 48;
      var char_9 = 57;

      function makeLegalFunctionName(name) {
        if (undefined === name) {
          return "_unknown"
        }
        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) {
          return "_" + name
        } else {
          return name
        }
      }

      function createNamedFunction(name, body) {
        name = makeLegalFunctionName(name);
        // return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body)

        const func = function() {
          return body.apply(this, arguments);
        }

        Object.defineProperty(func, 'name', {
          value: name,
          configurable: true,
        });

        return func;
      }
      var emval_free_list = [];
      var emval_handle_array = [{}, {
        value: undefined
      }, {
        value: null
      }, {
        value: true
      }, {
        value: false
      }];

      function count_emval_handles() {
        var count = 0;
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
            ++count;
          }
        }
        return count
      }

      function get_first_emval() {
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
            return emval_handle_array[i]
          }
        }
        return null
      }

      function init_emval() {
        Module["count_emval_handles"] = count_emval_handles;
        Module["get_first_emval"] = get_first_emval;
      }

      function __emval_register(value) {
        switch (value) {
          case undefined: {
            return 1
          }
          case null: {
            return 2
          }
          case true: {
            return 3
          }
          case false: {
            return 4
          }
          default: {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = {
              refcount: 1,
              value: value
            };
            return handle
          }
        }
      }

      function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function (message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== undefined) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function () {
          if (this.message === undefined) {
            return this.name
          } else {
            return this.name + ": " + this.message
          }
        };
        return errorClass
      }
      var PureVirtualError = undefined;

      function embind_init_charCodes() {
        var codes = new Array(256);
        for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
        }
        embind_charCodes = codes;
      }
      var embind_charCodes = undefined;

      function readLatin1String(ptr) {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
        }
        return ret
      }

      function getInheritedInstanceCount() {
        return Object.keys(registeredInstances).length
      }

      function getLiveInheritedInstances() {
        var rv = [];
        for (var k in registeredInstances) {
          if (registeredInstances.hasOwnProperty(k)) {
            rv.push(registeredInstances[k]);
          }
        }
        return rv
      }
      var deletionQueue = [];

      function flushPendingDeletes() {
        while (deletionQueue.length) {
          var obj = deletionQueue.pop();
          obj.$$.deleteScheduled = false;
          obj["delete"]();
        }
      }
      var delayFunction = undefined;

      function setDelayFunction(fn) {
        delayFunction = fn;
        if (deletionQueue.length && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
      }

      function init_embind() {
        Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
        Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
        Module["flushPendingDeletes"] = flushPendingDeletes;
        Module["setDelayFunction"] = setDelayFunction;
      }
      var registeredInstances = {};
      var BindingError = undefined;

      function throwBindingError(message) {
        throw new BindingError(message)
      }

      function getBasestPointer(class_, ptr) {
        if (ptr === undefined) {
          throwBindingError("ptr should not be undefined");
        }
        while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
        }
        return ptr
      }

      function registerInheritedInstance(class_, ptr, instance) {
        ptr = getBasestPointer(class_, ptr);
        if (registeredInstances.hasOwnProperty(ptr)) {
          throwBindingError("Tried to register registered instance: " + ptr);
        } else {
          registeredInstances[ptr] = instance;
        }
      }

      function requireHandle(handle) {
        if (!handle) {
          throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value
      }
      var registeredTypes = {};

      function getTypeName(type) {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv
      }

      function requireRegisteredType(rawType, humanName) {
        var impl = registeredTypes[rawType];
        if (undefined === impl) {
          throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
        }
        return impl
      }

      function unregisterInheritedInstance(class_, ptr) {
        ptr = getBasestPointer(class_, ptr);
        if (registeredInstances.hasOwnProperty(ptr)) {
          delete registeredInstances[ptr];
        } else {
          throwBindingError("Tried to unregister unregistered instance: " + ptr);
        }
      }

      function detachFinalizer(handle) {}
      var finalizationGroup = false;

      function runDestructor($$) {
        if ($$.smartPtr) {
          $$.smartPtrType.rawDestructor($$.smartPtr);
        } else {
          $$.ptrType.registeredClass.rawDestructor($$.ptr);
        }
      }

      function releaseClassHandle($$) {
        $$.count.value -= 1;
        var toDelete = 0 === $$.count.value;
        if (toDelete) {
          runDestructor($$);
        }
      }

      function attachFinalizer(handle) {
        if ("undefined" === typeof FinalizationGroup) {
          attachFinalizer = function (handle) {
            return handle
          };
          return handle
        }
        finalizationGroup = new FinalizationGroup(function (iter) {
          for (var result = iter.next(); !result.done; result = iter.next()) {
            var $$ = result.value;
            if (!$$.ptr) {
              console.warn("object already deleted: " + $$.ptr);
            } else {
              releaseClassHandle($$);
            }
          }
        });
        attachFinalizer = function (handle) {
          finalizationGroup.register(handle, handle.$$, handle.$$);
          return handle
        };
        detachFinalizer = function (handle) {
          finalizationGroup.unregister(handle.$$);
        };
        return attachFinalizer(handle)
      }

      function __embind_create_inheriting_constructor(constructorName, wrapperType, properties) {
        constructorName = readLatin1String(constructorName);
        wrapperType = requireRegisteredType(wrapperType, "wrapper");
        properties = requireHandle(properties);
        var arraySlice = [].slice;
        var registeredClass = wrapperType.registeredClass;
        var wrapperPrototype = registeredClass.instancePrototype;
        var baseClass = registeredClass.baseClass;
        var baseClassPrototype = baseClass.instancePrototype;
        var baseConstructor = registeredClass.baseClass.constructor;
        var ctor = createNamedFunction(constructorName, function () {
          registeredClass.baseClass.pureVirtualFunctions.forEach(function (name) {
            if (this[name] === baseClassPrototype[name]) {
              throw new PureVirtualError("Pure virtual function " + name + " must be implemented in JavaScript")
            }
          }.bind(this));
          Object.defineProperty(this, "__parent", {
            value: wrapperPrototype
          });
          this["__construct"].apply(this, arraySlice.call(arguments));
        });
        wrapperPrototype["__construct"] = function __construct() {
          if (this === wrapperPrototype) {
            throwBindingError("Pass correct 'this' to __construct");
          }
          var inner = baseConstructor["implement"].apply(undefined, [this].concat(arraySlice.call(arguments)));
          detachFinalizer(inner);
          var $$ = inner.$$;
          inner["notifyOnDestruction"]();
          $$.preservePointerOnDelete = true;
          Object.defineProperties(this, {
            $$: {
              value: $$
            }
          });
          attachFinalizer(this);
          registerInheritedInstance(registeredClass, $$.ptr, this);
        };
        wrapperPrototype["__destruct"] = function __destruct() {
          if (this === wrapperPrototype) {
            throwBindingError("Pass correct 'this' to __destruct");
          }
          detachFinalizer(this);
          unregisterInheritedInstance(registeredClass, this.$$.ptr);
        };
        ctor.prototype = Object.create(wrapperPrototype);
        for (var p in properties) {
          ctor.prototype[p] = properties[p];
        }
        return __emval_register(ctor)
      }
      var structRegistrations = {};

      function runDestructors(destructors) {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
        }
      }

      function simpleReadValueFromPointer(pointer) {
        return this["fromWireType"](HEAPU32[pointer >> 2])
      }
      var awaitingDependencies = {};
      var typeDependencies = {};
      var InternalError = undefined;

      function throwInternalError(message) {
        throw new InternalError(message)
      }

      function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
        myTypes.forEach(function (type) {
          typeDependencies[type] = dependentTypes;
        });

        function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
          }
          for (var i = 0; i < myTypes.length; ++i) {
            registerType(myTypes[i], myTypeConverters[i]);
          }
        }
        var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach(function (dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(function () {
              typeConverters[i] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
              }
            });
          }
        });
        if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      }

      function __embind_finalize_value_object(structType) {
        var reg = structRegistrations[structType];
        delete structRegistrations[structType];
        var rawConstructor = reg.rawConstructor;
        var rawDestructor = reg.rawDestructor;
        var fieldRecords = reg.fields;
        var fieldTypes = fieldRecords.map(function (field) {
          return field.getterReturnType
        }).concat(fieldRecords.map(function (field) {
          return field.setterArgumentType
        }));
        whenDependentTypesAreResolved([structType], fieldTypes, function (fieldTypes) {
          var fields = {};
          fieldRecords.forEach(function (field, i) {
            var fieldName = field.fieldName;
            var getterReturnType = fieldTypes[i];
            var getter = field.getter;
            var getterContext = field.getterContext;
            var setterArgumentType = fieldTypes[i + fieldRecords.length];
            var setter = field.setter;
            var setterContext = field.setterContext;
            fields[fieldName] = {
              read: function (ptr) {
                return getterReturnType["fromWireType"](getter(getterContext, ptr))
              },
              write: function (ptr, o) {
                var destructors = [];
                setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
                runDestructors(destructors);
              }
            };
          });
          return [{
            name: reg.name,
            "fromWireType": function (ptr) {
              var rv = {};
              for (var i in fields) {
                rv[i] = fields[i].read(ptr);
              }
              rawDestructor(ptr);
              return rv
            },
            "toWireType": function (destructors, o) {
              for (var fieldName in fields) {
                if (!(fieldName in o)) {
                  throw new TypeError("Missing field")
                }
              }
              var ptr = rawConstructor();
              for (fieldName in fields) {
                fields[fieldName].write(ptr, o[fieldName]);
              }
              if (destructors !== null) {
                destructors.push(rawDestructor, ptr);
              }
              return ptr
            },
            "argPackAdvance": 8,
            "readValueFromPointer": simpleReadValueFromPointer,
            destructorFunction: rawDestructor
          }]
        });
      }

      function getShiftFromSize(size) {
        switch (size) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + size)
        }
      }

      function registerType(rawType, registeredInstance, options) {
        options = options || {};
        if (!("argPackAdvance" in registeredInstance)) {
          throw new TypeError("registerType registeredInstance requires argPackAdvance")
        }
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return
          } else {
            throwBindingError("Cannot register type '" + name + "' twice");
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function (cb) {
            cb();
          });
        }
      }

      function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name: name,
          "fromWireType": function (wt) {
            return !!wt
          },
          "toWireType": function (destructors, o) {
            return o ? trueValue : falseValue
          },
          "argPackAdvance": 8,
          "readValueFromPointer": function (pointer) {
            var heap;
            if (size === 1) {
              heap = HEAP8;
            } else if (size === 2) {
              heap = HEAP16;
            } else if (size === 4) {
              heap = HEAP32;
            } else {
              throw new TypeError("Unknown boolean type size: " + name)
            }
            return this["fromWireType"](heap[pointer >> shift])
          },
          destructorFunction: null
        });
      }

      function ClassHandle_isAliasOf(other) {
        if (!(this instanceof ClassHandle)) {
          return false
        }
        if (!(other instanceof ClassHandle)) {
          return false
        }
        var leftClass = this.$$.ptrType.registeredClass;
        var left = this.$$.ptr;
        var rightClass = other.$$.ptrType.registeredClass;
        var right = other.$$.ptr;
        while (leftClass.baseClass) {
          left = leftClass.upcast(left);
          leftClass = leftClass.baseClass;
        }
        while (rightClass.baseClass) {
          right = rightClass.upcast(right);
          rightClass = rightClass.baseClass;
        }
        return leftClass === rightClass && left === right
      }

      function shallowCopyInternalPointer(o) {
        return {
          count: o.count,
          deleteScheduled: o.deleteScheduled,
          preservePointerOnDelete: o.preservePointerOnDelete,
          ptr: o.ptr,
          ptrType: o.ptrType,
          smartPtr: o.smartPtr,
          smartPtrType: o.smartPtrType
        }
      }

      function throwInstanceAlreadyDeleted(obj) {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name
        }
        throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
      }

      function ClassHandle_clone() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.preservePointerOnDelete) {
          this.$$.count.value += 1;
          return this
        } else {
          var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
            $$: {
              value: shallowCopyInternalPointer(this.$$)
            }
          }));
          clone.$$.count.value += 1;
          clone.$$.deleteScheduled = false;
          return clone
        }
      }

      function ClassHandle_delete() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        detachFinalizer(this);
        releaseClassHandle(this.$$);
        if (!this.$$.preservePointerOnDelete) {
          this.$$.smartPtr = undefined;
          this.$$.ptr = undefined;
        }
      }

      function ClassHandle_isDeleted() {
        return !this.$$.ptr
      }

      function ClassHandle_deleteLater() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        deletionQueue.push(this);
        if (deletionQueue.length === 1 && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
        this.$$.deleteScheduled = true;
        return this
      }

      function init_ClassHandle() {
        ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
        ClassHandle.prototype["clone"] = ClassHandle_clone;
        ClassHandle.prototype["delete"] = ClassHandle_delete;
        ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
        ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
      }

      function ClassHandle() {}
      var registeredPointers = {};

      function ensureOverloadTable(proto, methodName, humanName) {
        if (undefined === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function () {
            if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
            }
            return proto[methodName].overloadTable[arguments.length].apply(this, arguments)
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      }

      function exposePublicSymbol(name, value, numArguments) {
        if (Module.hasOwnProperty(name)) {
          if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
            throwBindingError("Cannot register public name '" + name + "' twice");
          }
          ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) {
            throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
          }
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          if (undefined !== numArguments) {
            Module[name].numArguments = numArguments;
          }
        }
      }

      function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
        this.name = name;
        this.constructor = constructor;
        this.instancePrototype = instancePrototype;
        this.rawDestructor = rawDestructor;
        this.baseClass = baseClass;
        this.getActualType = getActualType;
        this.upcast = upcast;
        this.downcast = downcast;
        this.pureVirtualFunctions = [];
      }

      function upcastPointer(ptr, ptrClass, desiredClass) {
        while (ptrClass !== desiredClass) {
          if (!ptrClass.upcast) {
            throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
          }
          ptr = ptrClass.upcast(ptr);
          ptrClass = ptrClass.baseClass;
        }
        return ptr
      }

      function constNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr
      }

      function genericPointerToWireType(destructors, handle) {
        var ptr;
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          if (this.isSmartPointer) {
            ptr = this.rawConstructor();
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
            return ptr
          } else {
            return 0
          }
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (undefined === handle.$$.smartPtr) {
            throwBindingError("Passing raw pointer to smart pointer is illegal");
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
              }
              break;
            case 1:
              ptr = handle.$$.smartPtr;
              break;
            case 2:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                var clonedHandle = handle["clone"]();
                ptr = this.rawShare(ptr, __emval_register(function () {
                  clonedHandle["delete"]();
                }));
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
              }
              break;
            default:
              throwBindingError("Unsupporting sharing policy");
          }
        }
        return ptr
      }

      function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr
      }

      function RegisteredPointer_getPointee(ptr) {
        if (this.rawGetPointee) {
          ptr = this.rawGetPointee(ptr);
        }
        return ptr
      }

      function RegisteredPointer_destructor(ptr) {
        if (this.rawDestructor) {
          this.rawDestructor(ptr);
        }
      }

      function RegisteredPointer_deleteObject(handle) {
        if (handle !== null) {
          handle["delete"]();
        }
      }

      function downcastPointer(ptr, ptrClass, desiredClass) {
        if (ptrClass === desiredClass) {
          return ptr
        }
        if (undefined === desiredClass.baseClass) {
          return null
        }
        var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
        if (rv === null) {
          return null
        }
        return desiredClass.downcast(rv)
      }

      function getInheritedInstance(class_, ptr) {
        ptr = getBasestPointer(class_, ptr);
        return registeredInstances[ptr]
      }

      function makeClassHandle(prototype, record) {
        if (!record.ptrType || !record.ptr) {
          throwInternalError("makeClassHandle requires ptr and ptrType");
        }
        var hasSmartPtrType = !!record.smartPtrType;
        var hasSmartPtr = !!record.smartPtr;
        if (hasSmartPtrType !== hasSmartPtr) {
          throwInternalError("Both smartPtrType and smartPtr must be specified");
        }
        record.count = {
          value: 1
        };
        return attachFinalizer(Object.create(prototype, {
          $$: {
            value: record
          }
        }))
      }

      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null
        }
        var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
        if (undefined !== registeredInstance) {
          if (0 === registeredInstance.$$.count.value) {
            registeredInstance.$$.ptr = rawPointer;
            registeredInstance.$$.smartPtr = ptr;
            return registeredInstance["clone"]()
          } else {
            var rv = registeredInstance["clone"]();
            this.destructor(ptr);
            return rv
          }
        }

        function makeDefaultHandle() {
          if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this.pointeeType,
              ptr: rawPointer,
              smartPtrType: this,
              smartPtr: ptr
            })
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this,
              ptr: ptr
            })
          }
        }
        var actualType = this.registeredClass.getActualType(rawPointer);
        var registeredPointerRecord = registeredPointers[actualType];
        if (!registeredPointerRecord) {
          return makeDefaultHandle.call(this)
        }
        var toType;
        if (this.isConst) {
          toType = registeredPointerRecord.constPointerType;
        } else {
          toType = registeredPointerRecord.pointerType;
        }
        var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
        if (dp === null) {
          return makeDefaultHandle.call(this)
        }
        if (this.isSmartPointer) {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp,
            smartPtrType: this,
            smartPtr: ptr
          })
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp
          })
        }
      }

      function init_RegisteredPointer() {
        RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
        RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
        RegisteredPointer.prototype["argPackAdvance"] = 8;
        RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
        RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
        RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
      }

      function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
        this.name = name;
        this.registeredClass = registeredClass;
        this.isReference = isReference;
        this.isConst = isConst;
        this.isSmartPointer = isSmartPointer;
        this.pointeeType = pointeeType;
        this.sharingPolicy = sharingPolicy;
        this.rawGetPointee = rawGetPointee;
        this.rawConstructor = rawConstructor;
        this.rawShare = rawShare;
        this.rawDestructor = rawDestructor;
        if (!isSmartPointer && registeredClass.baseClass === undefined) {
          if (isConst) {
            this["toWireType"] = constNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          } else {
            this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          }
        } else {
          this["toWireType"] = genericPointerToWireType;
        }
      }

      function replacePublicSymbol(name, value, numArguments) {
        if (!Module.hasOwnProperty(name)) {
          throwInternalError("Replacing nonexistant public symbol");
        }
        if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          Module[name].argCount = numArguments;
        }
      }

      function embind__requireFunction(signature, rawFunction) {
        signature = readLatin1String(signature);

        function makeDynCaller(dynCall) {
          var args = [];
          for (var i = 1; i < signature.length; ++i) {
            args.push("a" + i);
          }
          var name = "dynCall_" + signature + "_" + rawFunction;
          var body = "return function " + name + "(" + args.join(", ") + ") {\n";
          body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n";
          body += "};\n";
          return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction)
        }
        var dc = Module["dynCall_" + signature];
        var fp = makeDynCaller(dc);
        if (typeof fp !== "function") {
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
        }
        return fp
      }
      var UnboundTypeError = undefined;

      function throwUnboundTypeError(message, types) {
        var unboundTypes = [];
        var seen = {};

        function visit(type) {
          if (seen[type]) {
            return
          }
          if (registeredTypes[type]) {
            return
          }
          if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return
          }
          unboundTypes.push(type);
          seen[type] = true;
        }
        types.forEach(visit);
        throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]))
      }

      function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
        if (upcast) {
          upcast = embind__requireFunction(upcastSignature, upcast);
        }
        if (downcast) {
          downcast = embind__requireFunction(downcastSignature, downcast);
        }
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function () {
          throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]);
        });
        whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function (base) {
          base = base[0];
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
          var constructor = createNamedFunction(legalFunctionName, function () {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name)
            }
            if (undefined === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor")
            }
            var body = registeredClass.constructor_body[arguments.length];
            if (undefined === body) {
              throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!")
            }
            return body.apply(this, arguments)
          });
          var instancePrototype = Object.create(basePrototype, {
            constructor: {
              value: constructor
            }
          });
          constructor.prototype = instancePrototype;
          var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
          var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
          var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
          var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
          registeredPointers[rawType] = {
            pointerType: pointerConverter,
            constPointerType: constPointerConverter
          };
          replacePublicSymbol(legalFunctionName, constructor);
          return [referenceConverter, pointerConverter, constPointerConverter]
        });
      }

      function new_(constructor, argumentList) {
        if (!(constructor instanceof Function)) {
          throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function")
        }
        var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function () {});
        dummy.prototype = constructor.prototype;
        var obj = new dummy;
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj
      }

      function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        }
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1; i < argTypes.length; ++i) {
          if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
            needsDestructorStack = true;
            break
          }
        }
        var returns = argTypes[0].name !== "void";
        var argsList = "";
        var argsListWired = "";
        for (var i = 0; i < argCount - 2; ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
        }
        var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        }
        for (var i = 0; i < argCount - 2; ++i) {
          invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2]);
        }
        if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        }
        invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
              args1.push(paramName + "_dtor");
              args2.push(argTypes[i].destructorFunction);
            }
          }
        }
        if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
        }
        invokerFnBody += "}\n";
        args1.push(invokerFnBody);
        var invokerFunction = new_(Function, args1).apply(null, args2);
        return invokerFunction
      }

      function heap32VectorToArray(count, firstElement) {
        var array = [];
        for (var i = 0; i < count; i++) {
          array.push(HEAP32[(firstElement >> 2) + i]);
        }
        return array
      }

      function __embind_register_class_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function (classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;

          function unboundTypesHandler() {
            throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
          }
          var proto = classType.registeredClass.constructor;
          if (undefined === proto[methodName]) {
            unboundTypesHandler.argCount = argCount - 1;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
            var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
            var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn);
            if (undefined === proto[methodName].overloadTable) {
              func.argCount = argCount - 1;
              proto[methodName] = func;
            } else {
              proto[methodName].overloadTable[argCount - 1] = func;
            }
            return []
          });
          return []
        });
      }

      function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        var args = [rawConstructor];
        var destructors = [];
        whenDependentTypesAreResolved([], [rawClassType], function (classType) {
          classType = classType[0];
          var humanName = "constructor " + classType.name;
          if (undefined === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!")
          }
          classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
            throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
          };
          whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
            classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
              if (arguments.length !== argCount - 1) {
                throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1));
              }
              destructors.length = 0;
              args.length = argCount;
              for (var i = 1; i < argCount; ++i) {
                args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1]);
              }
              var ptr = invoker.apply(null, args);
              runDestructors(destructors);
              return argTypes[0]["fromWireType"](ptr)
            };
            return []
          });
          return []
        });
      }

      function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function (classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }

          function unboundTypesHandler() {
            throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
            if (undefined === proto[methodName].overloadTable) {
              memberFunction.argCount = argCount - 2;
              proto[methodName] = memberFunction;
            } else {
              proto[methodName].overloadTable[argCount - 2] = memberFunction;
            }
            return []
          });
          return []
        });
      }

      function __emval_decref(handle) {
        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = undefined;
          emval_free_list.push(handle);
        }
      }

      function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          name: name,
          "fromWireType": function (handle) {
            var rv = emval_handle_array[handle].value;
            __emval_decref(handle);
            return rv
          },
          "toWireType": function (destructors, value) {
            return __emval_register(value)
          },
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: null
        });
      }

      function _embind_repr(v) {
        if (v === null) {
          return "null"
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
          return v.toString()
        } else {
          return "" + v
        }
      }

      function floatReadValueFromPointer(name, shift) {
        switch (shift) {
          case 2:
            return function (pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2])
            };
          case 3:
            return function (pointer) {
              return this["fromWireType"](HEAPF64[pointer >> 3])
            };
          default:
            throw new TypeError("Unknown float type: " + name)
        }
      }

      function __embind_register_float(rawType, name, size) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name: name,
          "fromWireType": function (value) {
            return value
          },
          "toWireType": function (destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
            }
            return value
          },
          "argPackAdvance": 8,
          "readValueFromPointer": floatReadValueFromPointer(name, shift),
          destructorFunction: null
        });
      }

      function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return signed ? function readS8FromPointer(pointer) {
              return HEAP8[pointer]
            } : function readU8FromPointer(pointer) {
              return HEAPU8[pointer]
            };
          case 1:
            return signed ? function readS16FromPointer(pointer) {
              return HEAP16[pointer >> 1]
            } : function readU16FromPointer(pointer) {
              return HEAPU16[pointer >> 1]
            };
          case 2:
            return signed ? function readS32FromPointer(pointer) {
              return HEAP32[pointer >> 2]
            } : function readU32FromPointer(pointer) {
              return HEAPU32[pointer >> 2]
            };
          default:
            throw new TypeError("Unknown integer type: " + name)
        }
      }

      function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var shift = getShiftFromSize(size);
        var fromWireType = function (value) {
          return value
        };
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = function (value) {
            return value << bitshift >>> bitshift
          };
        }
        var isUnsignedType = name.indexOf("unsigned") != -1;
        registerType(primitiveType, {
          name: name,
          "fromWireType": fromWireType,
          "toWireType": function (destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
            }
            if (value < minRange || value > maxRange) {
              throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!")
            }
            return isUnsignedType ? value >>> 0 : value | 0
          },
          "argPackAdvance": 8,
          "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
          destructorFunction: null
        });
      }

      function __embind_register_memory_view(rawType, dataTypeIndex, name) {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];

        function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle];
          var data = heap[handle + 1];
          return new TA(buffer, data, size)
        }
        name = readLatin1String(name);
        registerType(rawType, {
          name: name,
          "fromWireType": decodeMemoryView,
          "argPackAdvance": 8,
          "readValueFromPointer": decodeMemoryView
        }, {
          ignoreDuplicateRegistrations: true
        });
      }

      function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
          name: name,
          "fromWireType": function (value) {
            var length = HEAPU32[value >> 2];
            var str;
            if (stdStringIsUTF8) {
              var endChar = HEAPU8[value + 4 + length];
              var endCharSwap = 0;
              if (endChar != 0) {
                endCharSwap = endChar;
                HEAPU8[value + 4 + length] = 0;
              }
              var decodeStartPtr = value + 4;
              for (var i = 0; i <= length; ++i) {
                var currentBytePtr = value + 4 + i;
                if (HEAPU8[currentBytePtr] == 0) {
                  var stringSegment = UTF8ToString(decodeStartPtr);
                  if (str === undefined) {
                    str = stringSegment;
                  } else {
                    str += String.fromCharCode(0);
                    str += stringSegment;
                  }
                  decodeStartPtr = currentBytePtr + 1;
                }
              }
              if (endCharSwap != 0) {
                HEAPU8[value + 4 + length] = endCharSwap;
              }
            } else {
              var a = new Array(length);
              for (var i = 0; i < length; ++i) {
                a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
              }
              str = a.join("");
            }
            _free(value);
            return str
          },
          "toWireType": function (destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var getLength;
            var valueIsOfTypeString = typeof value === "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              getLength = function () {
                return lengthBytesUTF8(value)
              };
            } else {
              getLength = function () {
                return value.length
              };
            }
            var length = getLength();
            var ptr = _malloc(4 + length + 1);
            HEAPU32[ptr >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              stringToUTF8(value, ptr + 4, length + 1);
            } else {
              if (valueIsOfTypeString) {
                for (var i = 0; i < length; ++i) {
                  var charCode = value.charCodeAt(i);
                  if (charCode > 255) {
                    _free(ptr);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                  }
                  HEAPU8[ptr + 4 + i] = charCode;
                }
              } else {
                for (var i = 0; i < length; ++i) {
                  HEAPU8[ptr + 4 + i] = value[i];
                }
              }
            }
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr
          },
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: function (ptr) {
            _free(ptr);
          }
        });
      }

      function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = function () {
            return HEAPU16
          };
          shift = 1;
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = function () {
            return HEAPU32
          };
          shift = 2;
        }
        registerType(rawType, {
          name: name,
          "fromWireType": function (value) {
            var length = HEAPU32[value >> 2];
            var HEAP = getHeap();
            var str;
            var endChar = HEAP[value + 4 + length * charSize >> shift];
            var endCharSwap = 0;
            if (endChar != 0) {
              endCharSwap = endChar;
              HEAP[value + 4 + length * charSize >> shift] = 0;
            }
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i * charSize;
              if (HEAP[currentBytePtr >> shift] == 0) {
                var stringSegment = decodeString(decodeStartPtr);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + charSize;
              }
            }
            if (endCharSwap != 0) {
              HEAP[value + 4 + length * charSize >> shift] = endCharSwap;
            }
            _free(value);
            return str
          },
          "toWireType": function (destructors, value) {
            if (!(typeof value === "string")) {
              throwBindingError("Cannot pass non-string to C++ string type " + name);
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length >> shift;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr
          },
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: function (ptr) {
            _free(ptr);
          }
        });
      }

      function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
        structRegistrations[rawType] = {
          name: readLatin1String(name),
          rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
          rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
          fields: []
        };
      }

      function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
        structRegistrations[structType].fields.push({
          fieldName: readLatin1String(fieldName),
          getterReturnType: getterReturnType,
          getter: embind__requireFunction(getterSignature, getter),
          getterContext: getterContext,
          setterArgumentType: setterArgumentType,
          setter: embind__requireFunction(setterSignature, setter),
          setterContext: setterContext
        });
      }

      function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          isVoid: true,
          name: name,
          "argPackAdvance": 0,
          "fromWireType": function () {
            return undefined
          },
          "toWireType": function (destructors, o) {
            return undefined
          }
        });
      }

      function __emval_allocateDestructors(destructorsRef) {
        var destructors = [];
        HEAP32[destructorsRef >> 2] = __emval_register(destructors);
        return destructors
      }
      var emval_symbols = {};

      function getStringOrSymbol(address) {
        var symbol = emval_symbols[address];
        if (symbol === undefined) {
          return readLatin1String(address)
        } else {
          return symbol
        }
      }
      var emval_methodCallers = [];

      function __emval_call_method(caller, handle, methodName, destructorsRef, args) {
        caller = emval_methodCallers[caller];
        handle = requireHandle(handle);
        methodName = getStringOrSymbol(methodName);
        return caller(handle, methodName, __emval_allocateDestructors(destructorsRef), args)
      }

      function __emval_call_void_method(caller, handle, methodName, args) {
        caller = emval_methodCallers[caller];
        handle = requireHandle(handle);
        methodName = getStringOrSymbol(methodName);
        caller(handle, methodName, null, args);
      }

      function __emval_addMethodCaller(caller) {
        var id = emval_methodCallers.length;
        emval_methodCallers.push(caller);
        return id
      }

      function __emval_lookupTypes(argCount, argTypes) {
        var a = new Array(argCount);
        for (var i = 0; i < argCount; ++i) {
          a[i] = requireRegisteredType(HEAP32[(argTypes >> 2) + i], "parameter " + i);
        }
        return a
      }

      function __emval_get_method_caller(argCount, argTypes) {
        var types = __emval_lookupTypes(argCount, argTypes);
        var retType = types[0];
        var signatureName = retType.name + "_$" + types.slice(1).map(function (t) {
          return t.name
        }).join("_") + "$";
        var params = ["retType"];
        var args = [retType];
        var argsList = "";
        for (var i = 0; i < argCount - 1; ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          params.push("argType" + i);
          args.push(types[1 + i]);
        }
        var functionName = makeLegalFunctionName("methodCaller_" + signatureName);
        var functionBody = "return function " + functionName + "(handle, name, destructors, args) {\n";
        var offset = 0;
        for (var i = 0; i < argCount - 1; ++i) {
          functionBody += "    var arg" + i + " = argType" + i + ".readValueFromPointer(args" + (offset ? "+" + offset : "") + ");\n";
          offset += types[i + 1]["argPackAdvance"];
        }
        functionBody += "    var rv = handle[name](" + argsList + ");\n";
        for (var i = 0; i < argCount - 1; ++i) {
          if (types[i + 1]["deleteObject"]) {
            functionBody += "    argType" + i + ".deleteObject(arg" + i + ");\n";
          }
        }
        if (!retType.isVoid) {
          functionBody += "    return retType.toWireType(destructors, rv);\n";
        }
        functionBody += "};\n";
        params.push(functionBody);
        var invokerFunction = new_(Function, params).apply(null, args);
        return __emval_addMethodCaller(invokerFunction)
      }

      function __emval_incref(handle) {
        if (handle > 4) {
          emval_handle_array[handle].refcount += 1;
        }
      }

      function __emval_run_destructors(handle) {
        var destructors = emval_handle_array[handle].value;
        runDestructors(destructors);
        __emval_decref(handle);
      }

      function _abort() {
        abort();
      }

      function _emscripten_get_heap_size() {
        return HEAPU8.length
      }

      function emscripten_realloc_buffer(size) {
        try {
          wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
          updateGlobalBufferAndViews(wasmMemory.buffer);
          return 1
        } catch (e) {}
      }

      function _emscripten_resize_heap(requestedSize) {
        var oldSize = _emscripten_get_heap_size();
        var PAGE_MULTIPLE = 65536;
        var maxHeapSize = 2147483648 - PAGE_MULTIPLE;
        if (requestedSize > maxHeapSize) {
          return false
        }
        var minHeapSize = 16777216;
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
          var replacement = emscripten_realloc_buffer(newSize);
          if (replacement) {
            return true
          }
        }
        return false
      }

      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num);
      }
      init_emval();
      PureVirtualError = Module["PureVirtualError"] = extendError(Error, "PureVirtualError");
      embind_init_charCodes();
      init_embind();
      BindingError = Module["BindingError"] = extendError(Error, "BindingError");
      InternalError = Module["InternalError"] = extendError(Error, "InternalError");
      init_ClassHandle();
      init_RegisteredPointer();
      UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      var asmGlobalArg = {};
      var asmLibraryArg = {
        "E": ___wasi_fd_close,
        "s": ___wasi_fd_seek,
        "A": ___wasi_fd_write,
        "n": __embind_create_inheriting_constructor,
        "j": __embind_finalize_value_object,
        "r": __embind_register_bool,
        "g": __embind_register_class,
        "f": __embind_register_class_class_function,
        "m": __embind_register_class_constructor,
        "b": __embind_register_class_function,
        "D": __embind_register_emval,
        "q": __embind_register_float,
        "e": __embind_register_integer,
        "c": __embind_register_memory_view,
        "p": __embind_register_std_string,
        "l": __embind_register_std_wstring,
        "k": __embind_register_value_object,
        "i": __embind_register_value_object_field,
        "C": __embind_register_void,
        "B": __emval_call_method,
        "z": __emval_call_void_method,
        "h": __emval_decref,
        "o": __emval_get_method_caller,
        "y": __emval_incref,
        "x": __emval_run_destructors,
        "__memory_base": 1024,
        "__table_base": 0,
        "d": _abort,
        "w": _emscripten_get_heap_size,
        "v": _emscripten_memcpy_big,
        "u": _emscripten_resize_heap,
        "a": abort,
        "memory": wasmMemory,
        "t": setTempRet0,
        "table": wasmTable
      };
      var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
      var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = asm["F"];
      var ___getTypeName = Module["___getTypeName"] = asm["G"];
      var _free = Module["_free"] = asm["H"];
      var _malloc = Module["_malloc"] = asm["I"];
      var globalCtors = Module["globalCtors"] = asm["ma"];
      var dynCall_di = Module["dynCall_di"] = asm["J"];
      var dynCall_dii = Module["dynCall_dii"] = asm["K"];
      var dynCall_diii = Module["dynCall_diii"] = asm["L"];
      var dynCall_fiff = Module["dynCall_fiff"] = asm["M"];
      var dynCall_fiffi = Module["dynCall_fiffi"] = asm["N"];
      var dynCall_fii = Module["dynCall_fii"] = asm["O"];
      var dynCall_i = Module["dynCall_i"] = asm["P"];
      var dynCall_ii = Module["dynCall_ii"] = asm["Q"];
      var dynCall_iii = Module["dynCall_iii"] = asm["R"];
      var dynCall_iiififi = Module["dynCall_iiififi"] = asm["S"];
      var dynCall_iiii = Module["dynCall_iiii"] = asm["T"];
      var dynCall_iiiii = Module["dynCall_iiiii"] = asm["U"];
      var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["V"];
      var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = asm["W"];
      var dynCall_jiji = Module["dynCall_jiji"] = asm["X"];
      var dynCall_v = Module["dynCall_v"] = asm["Y"];
      var dynCall_vi = Module["dynCall_vi"] = asm["Z"];
      var dynCall_vid = Module["dynCall_vid"] = asm["_"];
      var dynCall_viddi = Module["dynCall_viddi"] = asm["$"];
      var dynCall_vif = Module["dynCall_vif"] = asm["aa"];
      var dynCall_vii = Module["dynCall_vii"] = asm["ba"];
      var dynCall_viid = Module["dynCall_viid"] = asm["ca"];
      var dynCall_viiddi = Module["dynCall_viiddi"] = asm["da"];
      var dynCall_viif = Module["dynCall_viif"] = asm["ea"];
      var dynCall_viififi = Module["dynCall_viififi"] = asm["fa"];
      var dynCall_viififii = Module["dynCall_viififii"] = asm["ga"];
      var dynCall_viii = Module["dynCall_viii"] = asm["ha"];
      var dynCall_viiid = Module["dynCall_viiid"] = asm["ia"];
      var dynCall_viiii = Module["dynCall_viiii"] = asm["ja"];
      var dynCall_viiiii = Module["dynCall_viiiii"] = asm["ka"];
      var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["la"];
      Module["asm"] = asm;
      var calledRun;
      Module["then"] = function (func) {
        if (calledRun) {
          func(Module);
        } else {
          var old = Module["onRuntimeInitialized"];
          Module["onRuntimeInitialized"] = function () {
            if (old) old();
            func(Module);
          };
        }
        return Module
      };

      function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
      }
      dependenciesFulfilled = function runCaller() {
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller;
      };

      function run(args) {
        if (runDependencies > 0) {
          return
        }
        preRun();
        if (runDependencies > 0) return;

        function doRun() {
          if (calledRun) return;
          calledRun = true;
          Module["calledRun"] = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function () {
            setTimeout(function () {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      Module["run"] = run;
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      noExitRuntime = true;
      run();


      return Module
    }
  );
})();

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

const CONSTANTS = {
  ALIGN_COUNT: 8,
  ALIGN_AUTO: 0,
  ALIGN_FLEX_START: 1,
  ALIGN_CENTER: 2,
  ALIGN_FLEX_END: 3,
  ALIGN_STRETCH: 4,
  ALIGN_BASELINE: 5,
  ALIGN_SPACE_BETWEEN: 6,
  ALIGN_SPACE_AROUND: 7,

  DIMENSION_COUNT: 2,
  DIMENSION_WIDTH: 0,
  DIMENSION_HEIGHT: 1,

  DIRECTION_COUNT: 3,
  DIRECTION_INHERIT: 0,
  DIRECTION_LTR: 1,
  DIRECTION_RTL: 2,

  DISPLAY_COUNT: 2,
  DISPLAY_FLEX: 0,
  DISPLAY_NONE: 1,

  EDGE_COUNT: 9,
  EDGE_LEFT: 0,
  EDGE_TOP: 1,
  EDGE_RIGHT: 2,
  EDGE_BOTTOM: 3,
  EDGE_START: 4,
  EDGE_END: 5,
  EDGE_HORIZONTAL: 6,
  EDGE_VERTICAL: 7,
  EDGE_ALL: 8,

  EXPERIMENTAL_FEATURE_COUNT: 1,
  EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: 0,

  FLEX_DIRECTION_COUNT: 4,
  FLEX_DIRECTION_COLUMN: 0,
  FLEX_DIRECTION_COLUMN_REVERSE: 1,
  FLEX_DIRECTION_ROW: 2,
  FLEX_DIRECTION_ROW_REVERSE: 3,

  JUSTIFY_COUNT: 6,
  JUSTIFY_FLEX_START: 0,
  JUSTIFY_CENTER: 1,
  JUSTIFY_FLEX_END: 2,
  JUSTIFY_SPACE_BETWEEN: 3,
  JUSTIFY_SPACE_AROUND: 4,
  JUSTIFY_SPACE_EVENLY: 5,

  LOG_LEVEL_COUNT: 6,
  LOG_LEVEL_ERROR: 0,
  LOG_LEVEL_WARN: 1,
  LOG_LEVEL_INFO: 2,
  LOG_LEVEL_DEBUG: 3,
  LOG_LEVEL_VERBOSE: 4,
  LOG_LEVEL_FATAL: 5,

  MEASURE_MODE_COUNT: 3,
  MEASURE_MODE_UNDEFINED: 0,
  MEASURE_MODE_EXACTLY: 1,
  MEASURE_MODE_AT_MOST: 2,

  NODE_TYPE_COUNT: 2,
  NODE_TYPE_DEFAULT: 0,
  NODE_TYPE_TEXT: 1,

  OVERFLOW_COUNT: 3,
  OVERFLOW_VISIBLE: 0,
  OVERFLOW_HIDDEN: 1,
  OVERFLOW_SCROLL: 2,

  POSITION_TYPE_COUNT: 2,
  POSITION_TYPE_RELATIVE: 0,
  POSITION_TYPE_ABSOLUTE: 1,

  PRINT_OPTIONS_COUNT: 3,
  PRINT_OPTIONS_LAYOUT: 1,
  PRINT_OPTIONS_STYLE: 2,
  PRINT_OPTIONS_CHILDREN: 4,

  UNIT_COUNT: 4,
  UNIT_UNDEFINED: 0,
  UNIT_POINT: 1,
  UNIT_PERCENT: 2,
  UNIT_AUTO: 3,

  WRAP_COUNT: 3,
  WRAP_NO_WRAP: 0,
  WRAP_WRAP: 1,
  WRAP_WRAP_REVERSE: 2,
};




































































var YGEnums = CONSTANTS;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */















class Layout {







  constructor(left, right, top, bottom, width, height) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
  }

  fromJS(expose) {
    expose(
      this.left,
      this.right,
      this.top,
      this.bottom,
      this.width,
      this.height,
    );
  }

  toString() {
    return `<Layout#${this.left}:${this.right};${this.top}:${this.bottom};${
      this.width
    }:${this.height}>`;
  }
}

class Size {
  static fromJS({
    width,
    height
  }) {
    return new Size(width, height);
  }




  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  fromJS(expose) {
    expose(this.width, this.height);
  }

  toString() {
    return `<Size#${this.width}x${this.height}>`;
  }
}

class Value {



  constructor(unit, value) {
    this.unit = unit;
    this.value = value;
  }

  fromJS(expose) {
    expose(this.unit, this.value);
  }

  toString() {
    switch (this.unit) {
      case YGEnums.UNIT_POINT:
        return String(this.value);
      case YGEnums.UNIT_PERCENT:
        return `${this.value}%`;
      case YGEnums.UNIT_AUTO:
        return 'auto';
      default: {
        return `${this.value}?`;
      }
    }
  }

  valueOf() {
    return this.value;
  }
}























































































































var entryCommon = (bind, lib) => {
  function patch(prototype, name, fn) {
    let original = prototype[name];

    prototype[name] = function (...args) {
      return fn.call(this, original, ...args);
    };
  }

  for (let fnName of [
      'setPosition',
      'setMargin',
      'setFlexBasis',
      'setWidth',
      'setHeight',
      'setMinWidth',
      'setMinHeight',
      'setMaxWidth',
      'setMaxHeight',
      'setPadding',
    ]) {
    let methods = {
      [YGEnums.UNIT_POINT]: lib.Node.prototype[fnName],
      [YGEnums.UNIT_PERCENT]: lib.Node.prototype[`${fnName}Percent`],
      [YGEnums.UNIT_AUTO]: lib.Node.prototype[`${fnName}Auto`],
    };

    patch(lib.Node.prototype, fnName, function (original, ...args) {
      // We patch all these functions to add support for the following calls:
      // .setWidth(100) / .setWidth("100%") / .setWidth(.getWidth()) / .setWidth("auto")

      let value = args.pop();
      let unit, asNumber;

      if (value === 'auto') {
        unit = YGEnums.UNIT_AUTO;
        asNumber = undefined;
      } else if (value instanceof Value) {
        unit = value.unit;
        asNumber = value.valueOf();
      } else {
        unit =
          typeof value === 'string' && value.endsWith('%') ?
          YGEnums.UNIT_PERCENT :
          YGEnums.UNIT_POINT;
        asNumber = parseFloat(value);
        if (!Number.isNaN(value) && Number.isNaN(asNumber)) {
          throw new Error(`Invalid value ${value} for ${fnName}`);
        }
      }

      if (!methods[unit])
        throw new Error(
          `Failed to execute "${fnName}": Unsupported unit '${value}'`,
        );

      if (asNumber !== undefined) {
        return methods[unit].call(this, ...args, asNumber);
      } else {
        return methods[unit].call(this, ...args);
      }
    });
  }

  patch(lib.Config.prototype, 'free', function () {
    // Since we handle the memory allocation ourselves (via lib.Config.create),
    // we also need to handle the deallocation
    lib.Config.destroy(this);
  });

  patch(lib.Node, 'create', function (_, config) {
    // We decide the constructor we want to call depending on the parameters
    return config ?
      lib.Node.createWithConfig(config) :
      lib.Node.createDefault();
  });

  patch(lib.Node.prototype, 'free', function () {
    // Since we handle the memory allocation ourselves (via lib.Node.create),
    // we also need to handle the deallocation
    lib.Node.destroy(this);
  });

  patch(lib.Node.prototype, 'freeRecursive', function () {
    for (let t = 0, T = this.getChildCount(); t < T; ++t) {
      this.getChild(0).freeRecursive();
    }
    this.free();
  });

  patch(lib.Node.prototype, 'setMeasureFunc', function (original, measureFunc) {
    // This patch is just a convenience patch, since it helps write more
    // idiomatic source code (such as .setMeasureFunc(null))
    // We also automatically convert the return value of the measureFunc
    // to a Size object, so that we can return anything that has .width and
    // .height properties
    if (measureFunc) {
      return original.call(this, (...args) =>
        Size.fromJS(measureFunc(...args)),
      );
    } else {
      return this.unsetMeasureFunc();
    }
  });

  patch(lib.Node.prototype, 'calculateLayout', function (
    original,
    width = NaN,
    height = NaN,
    direction = YGEnums.DIRECTION_LTR,
  ) {
    // Just a small patch to add support for the function default parameters
    return original.call(this, width, height, direction);
  });

  return {
    Config: lib.Config,
    Node: lib.Node,
    Layout: bind('Layout', Layout),
    Size: bind('Size', Size),
    Value: bind('Value', Value),
    ...YGEnums,
  };
};

const mod = Module();

function bind(name, proto) {
  return proto;
}

var index = entryCommon(bind, mod);

module.exports = index;

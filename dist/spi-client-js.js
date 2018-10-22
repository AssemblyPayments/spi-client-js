(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "fc0136a22a6bf76b3f3a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Spi, Logger, Secrets, SuccessState, TransactionOptions, TransactionType, SpiFlow, SpiStatus, RefundResponse, PurchaseResponse, GetLastTransactionResponse, MotoPurchaseResponse, CashoutOnlyResponse, Settlement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Spi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Spi */ "./src/Spi.js");
/* harmony import */ var _src_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Logger */ "./src/Logger.js");
/* harmony import */ var _src_Printing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Printing */ "./src/Printing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spi", function() { return _src_Spi__WEBPACK_IMPORTED_MODULE_0__["Spi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _src_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"]; });

/* harmony import */ var _src_Secrets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Secrets */ "./src/Secrets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Secrets", function() { return _src_Secrets__WEBPACK_IMPORTED_MODULE_3__["Secrets"]; });

/* harmony import */ var _src_Messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Messages */ "./src/Messages.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuccessState", function() { return _src_Messages__WEBPACK_IMPORTED_MODULE_4__["SuccessState"]; });

/* harmony import */ var _src_SpiModels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/SpiModels */ "./src/SpiModels.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionOptions", function() { return _src_SpiModels__WEBPACK_IMPORTED_MODULE_5__["TransactionOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionType", function() { return _src_SpiModels__WEBPACK_IMPORTED_MODULE_5__["TransactionType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpiFlow", function() { return _src_SpiModels__WEBPACK_IMPORTED_MODULE_5__["SpiFlow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpiStatus", function() { return _src_SpiModels__WEBPACK_IMPORTED_MODULE_5__["SpiStatus"]; });

/* harmony import */ var _src_Purchase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Purchase */ "./src/Purchase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RefundResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["RefundResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PurchaseResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["PurchaseResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GetLastTransactionResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["GetLastTransactionResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotoPurchaseResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["MotoPurchaseResponse"]; });

/* harmony import */ var _src_Cashout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/Cashout */ "./src/Cashout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CashoutOnlyResponse", function() { return _src_Cashout__WEBPACK_IMPORTED_MODULE_7__["CashoutOnlyResponse"]; });

/* harmony import */ var _src_Settlement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/Settlement */ "./src/Settlement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Settlement", function() { return _src_Settlement__WEBPACK_IMPORTED_MODULE_8__["Settlement"]; });



 // Re-exported modules required for POS vendors









window.Spi = _src_Spi__WEBPACK_IMPORTED_MODULE_0__["Spi"];
window.Logger = _src_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"];
window.Printer = _src_Printing__WEBPACK_IMPORTED_MODULE_2__["Printer"];

/***/ }),

/***/ "./node_modules/aes-js/index.js":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(root) {
    "use strict";

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ }),

/***/ "./node_modules/jssha/src/sha.js":
/*!***************************************!*\
  !*** ./node_modules/jssha/src/sha.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2017
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
(function(Y){function C(c,a,b){var e=0,h=[],n=0,g,l,d,f,m,q,u,r,I=!1,v=[],w=[],t,y=!1,z=!1,x=-1;b=b||{};g=b.encoding||"UTF8";t=b.numRounds||1;if(t!==parseInt(t,10)||1>t)throw Error("numRounds must a integer >= 1");if("SHA-1"===c)m=512,q=K,u=Z,f=160,r=function(a){return a.slice()};else if(0===c.lastIndexOf("SHA-",0))if(q=function(a,b){return L(a,b,c)},u=function(a,b,h,e){var k,f;if("SHA-224"===c||"SHA-256"===c)k=(b+65>>>9<<4)+15,f=16;else if("SHA-384"===c||"SHA-512"===c)k=(b+129>>>10<<
5)+31,f=32;else throw Error("Unexpected error in SHA-2 implementation");for(;a.length<=k;)a.push(0);a[b>>>5]|=128<<24-b%32;b=b+h;a[k]=b&4294967295;a[k-1]=b/4294967296|0;h=a.length;for(b=0;b<h;b+=f)e=L(a.slice(b,b+f),e,c);if("SHA-224"===c)a=[e[0],e[1],e[2],e[3],e[4],e[5],e[6]];else if("SHA-256"===c)a=e;else if("SHA-384"===c)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b];else if("SHA-512"===c)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,
e[4].b,e[5].a,e[5].b,e[6].a,e[6].b,e[7].a,e[7].b];else throw Error("Unexpected error in SHA-2 implementation");return a},r=function(a){return a.slice()},"SHA-224"===c)m=512,f=224;else if("SHA-256"===c)m=512,f=256;else if("SHA-384"===c)m=1024,f=384;else if("SHA-512"===c)m=1024,f=512;else throw Error("Chosen SHA variant is not supported");else if(0===c.lastIndexOf("SHA3-",0)||0===c.lastIndexOf("SHAKE",0)){var F=6;q=D;r=function(a){var c=[],e;for(e=0;5>e;e+=1)c[e]=a[e].slice();return c};x=1;if("SHA3-224"===
c)m=1152,f=224;else if("SHA3-256"===c)m=1088,f=256;else if("SHA3-384"===c)m=832,f=384;else if("SHA3-512"===c)m=576,f=512;else if("SHAKE128"===c)m=1344,f=-1,F=31,z=!0;else if("SHAKE256"===c)m=1088,f=-1,F=31,z=!0;else throw Error("Chosen SHA variant is not supported");u=function(a,c,e,b,h){e=m;var k=F,f,g=[],n=e>>>5,l=0,d=c>>>5;for(f=0;f<d&&c>=e;f+=n)b=D(a.slice(f,f+n),b),c-=e;a=a.slice(f);for(c%=e;a.length<n;)a.push(0);f=c>>>3;a[f>>2]^=k<<f%4*8;a[n-1]^=2147483648;for(b=D(a,b);32*g.length<h;){a=b[l%
5][l/5|0];g.push(a.b);if(32*g.length>=h)break;g.push(a.a);l+=1;0===64*l%e&&D(null,b)}return g}}else throw Error("Chosen SHA variant is not supported");d=M(a,g,x);l=A(c);this.setHMACKey=function(a,b,h){var k;if(!0===I)throw Error("HMAC key already set");if(!0===y)throw Error("Cannot set HMAC key after calling update");if(!0===z)throw Error("SHAKE is not supported for HMAC");g=(h||{}).encoding||"UTF8";b=M(b,g,x)(a);a=b.binLen;b=b.value;k=m>>>3;h=k/4-1;if(k<a/8){for(b=u(b,a,0,A(c),f);b.length<=h;)b.push(0);
b[h]&=4294967040}else if(k>a/8){for(;b.length<=h;)b.push(0);b[h]&=4294967040}for(a=0;a<=h;a+=1)v[a]=b[a]^909522486,w[a]=b[a]^1549556828;l=q(v,l);e=m;I=!0};this.update=function(a){var c,b,k,f=0,g=m>>>5;c=d(a,h,n);a=c.binLen;b=c.value;c=a>>>5;for(k=0;k<c;k+=g)f+m<=a&&(l=q(b.slice(k,k+g),l),f+=m);e+=f;h=b.slice(f>>>5);n=a%m;y=!0};this.getHash=function(a,b){var k,g,d,m;if(!0===I)throw Error("Cannot call getHash after setting HMAC key");d=N(b);if(!0===z){if(-1===d.shakeLen)throw Error("shakeLen must be specified in options");
f=d.shakeLen}switch(a){case "HEX":k=function(a){return O(a,f,x,d)};break;case "B64":k=function(a){return P(a,f,x,d)};break;case "BYTES":k=function(a){return Q(a,f,x)};break;case "ARRAYBUFFER":try{g=new ArrayBuffer(0)}catch(p){throw Error("ARRAYBUFFER not supported by this environment");}k=function(a){return R(a,f,x)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");}m=u(h.slice(),n,e,r(l),f);for(g=1;g<t;g+=1)!0===z&&0!==f%32&&(m[m.length-1]&=16777215>>>24-f%32),m=u(m,f,
0,A(c),f);return k(m)};this.getHMAC=function(a,b){var k,g,d,p;if(!1===I)throw Error("Cannot call getHMAC without first setting HMAC key");d=N(b);switch(a){case "HEX":k=function(a){return O(a,f,x,d)};break;case "B64":k=function(a){return P(a,f,x,d)};break;case "BYTES":k=function(a){return Q(a,f,x)};break;case "ARRAYBUFFER":try{k=new ArrayBuffer(0)}catch(v){throw Error("ARRAYBUFFER not supported by this environment");}k=function(a){return R(a,f,x)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
}g=u(h.slice(),n,e,r(l),f);p=q(w,A(c));p=u(g,f,m,p,f);return k(p)}}function b(c,a){this.a=c;this.b=a}function O(c,a,b,e){var h="";a/=8;var n,g,d;d=-1===b?3:0;for(n=0;n<a;n+=1)g=c[n>>>2]>>>8*(d+n%4*b),h+="0123456789abcdef".charAt(g>>>4&15)+"0123456789abcdef".charAt(g&15);return e.outputUpper?h.toUpperCase():h}function P(c,a,b,e){var h="",n=a/8,g,d,p,f;f=-1===b?3:0;for(g=0;g<n;g+=3)for(d=g+1<n?c[g+1>>>2]:0,p=g+2<n?c[g+2>>>2]:0,p=(c[g>>>2]>>>8*(f+g%4*b)&255)<<16|(d>>>8*(f+(g+1)%4*b)&255)<<8|p>>>8*(f+
(g+2)%4*b)&255,d=0;4>d;d+=1)8*g+6*d<=a?h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(p>>>6*(3-d)&63):h+=e.b64Pad;return h}function Q(c,a,b){var e="";a/=8;var h,d,g;g=-1===b?3:0;for(h=0;h<a;h+=1)d=c[h>>>2]>>>8*(g+h%4*b)&255,e+=String.fromCharCode(d);return e}function R(c,a,b){a/=8;var e,h=new ArrayBuffer(a),d,g;g=new Uint8Array(h);d=-1===b?3:0;for(e=0;e<a;e+=1)g[e]=c[e>>>2]>>>8*(d+e%4*b)&255;return h}function N(c){var a={outputUpper:!1,b64Pad:"=",shakeLen:-1};c=c||{};
a.outputUpper=c.outputUpper||!1;!0===c.hasOwnProperty("b64Pad")&&(a.b64Pad=c.b64Pad);if(!0===c.hasOwnProperty("shakeLen")){if(0!==c.shakeLen%8)throw Error("shakeLen must be a multiple of 8");a.shakeLen=c.shakeLen}if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function M(c,a,b){switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
}switch(c){case "HEX":c=function(a,c,d){var g=a.length,l,p,f,m,q,u;if(0!==g%2)throw Error("String of HEX type must be in byte increments");c=c||[0];d=d||0;q=d>>>3;u=-1===b?3:0;for(l=0;l<g;l+=2){p=parseInt(a.substr(l,2),16);if(isNaN(p))throw Error("String of HEX type contains invalid characters");m=(l>>>1)+q;for(f=m>>>2;c.length<=f;)c.push(0);c[f]|=p<<8*(u+m%4*b)}return{value:c,binLen:4*g+d}};break;case "TEXT":c=function(c,h,d){var g,l,p=0,f,m,q,u,r,t;h=h||[0];d=d||0;q=d>>>3;if("UTF8"===a)for(t=-1===
b?3:0,f=0;f<c.length;f+=1)for(g=c.charCodeAt(f),l=[],128>g?l.push(g):2048>g?(l.push(192|g>>>6),l.push(128|g&63)):55296>g||57344<=g?l.push(224|g>>>12,128|g>>>6&63,128|g&63):(f+=1,g=65536+((g&1023)<<10|c.charCodeAt(f)&1023),l.push(240|g>>>18,128|g>>>12&63,128|g>>>6&63,128|g&63)),m=0;m<l.length;m+=1){r=p+q;for(u=r>>>2;h.length<=u;)h.push(0);h[u]|=l[m]<<8*(t+r%4*b);p+=1}else if("UTF16BE"===a||"UTF16LE"===a)for(t=-1===b?2:0,l="UTF16LE"===a&&1!==b||"UTF16LE"!==a&&1===b,f=0;f<c.length;f+=1){g=c.charCodeAt(f);
!0===l&&(m=g&255,g=m<<8|g>>>8);r=p+q;for(u=r>>>2;h.length<=u;)h.push(0);h[u]|=g<<8*(t+r%4*b);p+=2}return{value:h,binLen:8*p+d}};break;case "B64":c=function(a,c,d){var g=0,l,p,f,m,q,u,r,t;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");p=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==p&&p<a.length)throw Error("Invalid '=' found in base-64 string");c=c||[0];d=d||0;u=d>>>3;t=-1===b?3:0;for(p=0;p<a.length;p+=4){q=a.substr(p,4);for(f=m=0;f<q.length;f+=1)l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(q[f]),
m|=l<<18-6*f;for(f=0;f<q.length-1;f+=1){r=g+u;for(l=r>>>2;c.length<=l;)c.push(0);c[l]|=(m>>>16-8*f&255)<<8*(t+r%4*b);g+=1}}return{value:c,binLen:8*g+d}};break;case "BYTES":c=function(a,c,d){var g,l,p,f,m,q;c=c||[0];d=d||0;p=d>>>3;q=-1===b?3:0;for(l=0;l<a.length;l+=1)g=a.charCodeAt(l),m=l+p,f=m>>>2,c.length<=f&&c.push(0),c[f]|=g<<8*(q+m%4*b);return{value:c,binLen:8*a.length+d}};break;case "ARRAYBUFFER":try{c=new ArrayBuffer(0)}catch(e){throw Error("ARRAYBUFFER not supported by this environment");}c=
function(a,c,d){var g,l,p,f,m,q;c=c||[0];d=d||0;l=d>>>3;m=-1===b?3:0;q=new Uint8Array(a);for(g=0;g<a.byteLength;g+=1)f=g+l,p=f>>>2,c.length<=p&&c.push(0),c[p]|=q[g]<<8*(m+f%4*b);return{value:c,binLen:8*a.byteLength+d}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");}return c}function y(c,a){return c<<a|c>>>32-a}function S(c,a){return 32<a?(a-=32,new b(c.b<<a|c.a>>>32-a,c.a<<a|c.b>>>32-a)):0!==a?new b(c.a<<a|c.b>>>32-a,c.b<<a|c.a>>>32-a):c}function w(c,a){return c>>>
a|c<<32-a}function t(c,a){var k=null,k=new b(c.a,c.b);return k=32>=a?new b(k.a>>>a|k.b<<32-a&4294967295,k.b>>>a|k.a<<32-a&4294967295):new b(k.b>>>a-32|k.a<<64-a&4294967295,k.a>>>a-32|k.b<<64-a&4294967295)}function T(c,a){var k=null;return k=32>=a?new b(c.a>>>a,c.b>>>a|c.a<<32-a&4294967295):new b(0,c.a>>>a-32)}function aa(c,a,b){return c&a^~c&b}function ba(c,a,k){return new b(c.a&a.a^~c.a&k.a,c.b&a.b^~c.b&k.b)}function U(c,a,b){return c&a^c&b^a&b}function ca(c,a,k){return new b(c.a&a.a^c.a&k.a^a.a&
k.a,c.b&a.b^c.b&k.b^a.b&k.b)}function da(c){return w(c,2)^w(c,13)^w(c,22)}function ea(c){var a=t(c,28),k=t(c,34);c=t(c,39);return new b(a.a^k.a^c.a,a.b^k.b^c.b)}function fa(c){return w(c,6)^w(c,11)^w(c,25)}function ga(c){var a=t(c,14),k=t(c,18);c=t(c,41);return new b(a.a^k.a^c.a,a.b^k.b^c.b)}function ha(c){return w(c,7)^w(c,18)^c>>>3}function ia(c){var a=t(c,1),k=t(c,8);c=T(c,7);return new b(a.a^k.a^c.a,a.b^k.b^c.b)}function ja(c){return w(c,17)^w(c,19)^c>>>10}function ka(c){var a=t(c,19),k=t(c,61);
c=T(c,6);return new b(a.a^k.a^c.a,a.b^k.b^c.b)}function G(c,a){var b=(c&65535)+(a&65535);return((c>>>16)+(a>>>16)+(b>>>16)&65535)<<16|b&65535}function la(c,a,b,e){var h=(c&65535)+(a&65535)+(b&65535)+(e&65535);return((c>>>16)+(a>>>16)+(b>>>16)+(e>>>16)+(h>>>16)&65535)<<16|h&65535}function H(c,a,b,e,h){var d=(c&65535)+(a&65535)+(b&65535)+(e&65535)+(h&65535);return((c>>>16)+(a>>>16)+(b>>>16)+(e>>>16)+(h>>>16)+(d>>>16)&65535)<<16|d&65535}function ma(c,a){var d,e,h;d=(c.b&65535)+(a.b&65535);e=(c.b>>>16)+
(a.b>>>16)+(d>>>16);h=(e&65535)<<16|d&65535;d=(c.a&65535)+(a.a&65535)+(e>>>16);e=(c.a>>>16)+(a.a>>>16)+(d>>>16);return new b((e&65535)<<16|d&65535,h)}function na(c,a,d,e){var h,n,g;h=(c.b&65535)+(a.b&65535)+(d.b&65535)+(e.b&65535);n=(c.b>>>16)+(a.b>>>16)+(d.b>>>16)+(e.b>>>16)+(h>>>16);g=(n&65535)<<16|h&65535;h=(c.a&65535)+(a.a&65535)+(d.a&65535)+(e.a&65535)+(n>>>16);n=(c.a>>>16)+(a.a>>>16)+(d.a>>>16)+(e.a>>>16)+(h>>>16);return new b((n&65535)<<16|h&65535,g)}function oa(c,a,d,e,h){var n,g,l;n=(c.b&
65535)+(a.b&65535)+(d.b&65535)+(e.b&65535)+(h.b&65535);g=(c.b>>>16)+(a.b>>>16)+(d.b>>>16)+(e.b>>>16)+(h.b>>>16)+(n>>>16);l=(g&65535)<<16|n&65535;n=(c.a&65535)+(a.a&65535)+(d.a&65535)+(e.a&65535)+(h.a&65535)+(g>>>16);g=(c.a>>>16)+(a.a>>>16)+(d.a>>>16)+(e.a>>>16)+(h.a>>>16)+(n>>>16);return new b((g&65535)<<16|n&65535,l)}function B(c,a){return new b(c.a^a.a,c.b^a.b)}function A(c){var a=[],d;if("SHA-1"===c)a=[1732584193,4023233417,2562383102,271733878,3285377520];else if(0===c.lastIndexOf("SHA-",0))switch(a=
[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],c){case "SHA-224":break;case "SHA-256":a=d;break;case "SHA-384":a=[new b(3418070365,a[0]),new b(1654270250,a[1]),new b(2438529370,a[2]),new b(355462360,a[3]),new b(1731405415,a[4]),new b(41048885895,a[5]),new b(3675008525,a[6]),new b(1203062813,a[7])];break;case "SHA-512":a=[new b(d[0],4089235720),new b(d[1],2227873595),
new b(d[2],4271175723),new b(d[3],1595750129),new b(d[4],2917565137),new b(d[5],725511199),new b(d[6],4215389547),new b(d[7],327033209)];break;default:throw Error("Unknown SHA variant");}else if(0===c.lastIndexOf("SHA3-",0)||0===c.lastIndexOf("SHAKE",0))for(c=0;5>c;c+=1)a[c]=[new b(0,0),new b(0,0),new b(0,0),new b(0,0),new b(0,0)];else throw Error("No SHA variants supported");return a}function K(c,a){var b=[],e,d,n,g,l,p,f;e=a[0];d=a[1];n=a[2];g=a[3];l=a[4];for(f=0;80>f;f+=1)b[f]=16>f?c[f]:y(b[f-
3]^b[f-8]^b[f-14]^b[f-16],1),p=20>f?H(y(e,5),d&n^~d&g,l,1518500249,b[f]):40>f?H(y(e,5),d^n^g,l,1859775393,b[f]):60>f?H(y(e,5),U(d,n,g),l,2400959708,b[f]):H(y(e,5),d^n^g,l,3395469782,b[f]),l=g,g=n,n=y(d,30),d=e,e=p;a[0]=G(e,a[0]);a[1]=G(d,a[1]);a[2]=G(n,a[2]);a[3]=G(g,a[3]);a[4]=G(l,a[4]);return a}function Z(c,a,b,e){var d;for(d=(a+65>>>9<<4)+15;c.length<=d;)c.push(0);c[a>>>5]|=128<<24-a%32;a+=b;c[d]=a&4294967295;c[d-1]=a/4294967296|0;a=c.length;for(d=0;d<a;d+=16)e=K(c.slice(d,d+16),e);return e}function L(c,
a,k){var e,h,n,g,l,p,f,m,q,u,r,t,v,w,y,A,z,x,F,B,C,D,E=[],J;if("SHA-224"===k||"SHA-256"===k)u=64,t=1,D=Number,v=G,w=la,y=H,A=ha,z=ja,x=da,F=fa,C=U,B=aa,J=d;else if("SHA-384"===k||"SHA-512"===k)u=80,t=2,D=b,v=ma,w=na,y=oa,A=ia,z=ka,x=ea,F=ga,C=ca,B=ba,J=V;else throw Error("Unexpected error in SHA-2 implementation");k=a[0];e=a[1];h=a[2];n=a[3];g=a[4];l=a[5];p=a[6];f=a[7];for(r=0;r<u;r+=1)16>r?(q=r*t,m=c.length<=q?0:c[q],q=c.length<=q+1?0:c[q+1],E[r]=new D(m,q)):E[r]=w(z(E[r-2]),E[r-7],A(E[r-15]),E[r-
16]),m=y(f,F(g),B(g,l,p),J[r],E[r]),q=v(x(k),C(k,e,h)),f=p,p=l,l=g,g=v(n,m),n=h,h=e,e=k,k=v(m,q);a[0]=v(k,a[0]);a[1]=v(e,a[1]);a[2]=v(h,a[2]);a[3]=v(n,a[3]);a[4]=v(g,a[4]);a[5]=v(l,a[5]);a[6]=v(p,a[6]);a[7]=v(f,a[7]);return a}function D(c,a){var d,e,h,n,g=[],l=[];if(null!==c)for(e=0;e<c.length;e+=2)a[(e>>>1)%5][(e>>>1)/5|0]=B(a[(e>>>1)%5][(e>>>1)/5|0],new b(c[e+1],c[e]));for(d=0;24>d;d+=1){n=A("SHA3-");for(e=0;5>e;e+=1){h=a[e][0];var p=a[e][1],f=a[e][2],m=a[e][3],q=a[e][4];g[e]=new b(h.a^p.a^f.a^
m.a^q.a,h.b^p.b^f.b^m.b^q.b)}for(e=0;5>e;e+=1)l[e]=B(g[(e+4)%5],S(g[(e+1)%5],1));for(e=0;5>e;e+=1)for(h=0;5>h;h+=1)a[e][h]=B(a[e][h],l[e]);for(e=0;5>e;e+=1)for(h=0;5>h;h+=1)n[h][(2*e+3*h)%5]=S(a[e][h],W[e][h]);for(e=0;5>e;e+=1)for(h=0;5>h;h+=1)a[e][h]=B(n[e][h],new b(~n[(e+1)%5][h].a&n[(e+2)%5][h].a,~n[(e+1)%5][h].b&n[(e+2)%5][h].b));a[0][0]=B(a[0][0],X[d])}return a}var d,V,W,X;d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,
1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,
2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];V=[new b(d[0],3609767458),new b(d[1],602891725),new b(d[2],3964484399),new b(d[3],2173295548),new b(d[4],4081628472),new b(d[5],3053834265),new b(d[6],2937671579),new b(d[7],3664609560),new b(d[8],2734883394),new b(d[9],1164996542),new b(d[10],1323610764),new b(d[11],3590304994),new b(d[12],4068182383),new b(d[13],991336113),new b(d[14],633803317),new b(d[15],3479774868),new b(d[16],2666613458),new b(d[17],944711139),new b(d[18],2341262773),
new b(d[19],2007800933),new b(d[20],1495990901),new b(d[21],1856431235),new b(d[22],3175218132),new b(d[23],2198950837),new b(d[24],3999719339),new b(d[25],766784016),new b(d[26],2566594879),new b(d[27],3203337956),new b(d[28],1034457026),new b(d[29],2466948901),new b(d[30],3758326383),new b(d[31],168717936),new b(d[32],1188179964),new b(d[33],1546045734),new b(d[34],1522805485),new b(d[35],2643833823),new b(d[36],2343527390),new b(d[37],1014477480),new b(d[38],1206759142),new b(d[39],344077627),
new b(d[40],1290863460),new b(d[41],3158454273),new b(d[42],3505952657),new b(d[43],106217008),new b(d[44],3606008344),new b(d[45],1432725776),new b(d[46],1467031594),new b(d[47],851169720),new b(d[48],3100823752),new b(d[49],1363258195),new b(d[50],3750685593),new b(d[51],3785050280),new b(d[52],3318307427),new b(d[53],3812723403),new b(d[54],2003034995),new b(d[55],3602036899),new b(d[56],1575990012),new b(d[57],1125592928),new b(d[58],2716904306),new b(d[59],442776044),new b(d[60],593698344),new b(d[61],
3733110249),new b(d[62],2999351573),new b(d[63],3815920427),new b(3391569614,3928383900),new b(3515267271,566280711),new b(3940187606,3454069534),new b(4118630271,4000239992),new b(116418474,1914138554),new b(174292421,2731055270),new b(289380356,3203993006),new b(460393269,320620315),new b(685471733,587496836),new b(852142971,1086792851),new b(1017036298,365543100),new b(1126000580,2618297676),new b(1288033470,3409855158),new b(1501505948,4234509866),new b(1607167915,987167468),new b(1816402316,
1246189591)];X=[new b(0,1),new b(0,32898),new b(2147483648,32906),new b(2147483648,2147516416),new b(0,32907),new b(0,2147483649),new b(2147483648,2147516545),new b(2147483648,32777),new b(0,138),new b(0,136),new b(0,2147516425),new b(0,2147483658),new b(0,2147516555),new b(2147483648,139),new b(2147483648,32905),new b(2147483648,32771),new b(2147483648,32770),new b(2147483648,128),new b(0,32778),new b(2147483648,2147483658),new b(2147483648,2147516545),new b(2147483648,32896),new b(0,2147483649),
new b(2147483648,2147516424)];W=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]]; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return C}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined})(this);


/***/ }),

/***/ "./src/Cashout.js":
/*!************************!*\
  !*** ./src/Cashout.js ***!
  \************************/
/*! exports provided: CashoutOnlyRequest, CashoutOnlyResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashoutOnlyRequest", function() { return CashoutOnlyRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashoutOnlyResponse", function() { return CashoutOnlyResponse; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _SpiModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpiModels */ "./src/SpiModels.js");
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var CashoutOnlyRequest =
/*#__PURE__*/
function () {
  function CashoutOnlyRequest(amountCents, posRefId, surchargeAmount) {
    _classCallCheck(this, CashoutOnlyRequest);

    this.PosRefId = posRefId;
    this.CashoutAmount = amountCents;
    this.SurchargeAmount = surchargeAmount;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiConfig"]();
    this.Options = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionOptions"]();
  }

  _createClass(CashoutOnlyRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "cash_amount": this.CashoutAmount,
        "surcharge_amount": this.SurchargeAmount
      };
      this.Config.addReceiptConfig(data);
      this.Options.AddOptions(data);
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__["RequestIdHelper"].Id("cshout"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].CashoutOnlyRequest, data, true);
    }
  }]);

  return CashoutOnlyRequest;
}();
var CashoutOnlyResponse =
/*#__PURE__*/
function () {
  function CashoutOnlyResponse(m) {
    _classCallCheck(this, CashoutOnlyResponse);

    this._m = m;
    this.RequestId = m.Id;
    this.PosRefId = m.Data.pos_ref_id;
    this.SchemeName = m.Data.scheme_name;
    this.Success = m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
  }

  _createClass(CashoutOnlyResponse, [{
    key: "GetRRN",
    value: function GetRRN() {
      return this._m.Data["rrn"];
    }
  }, {
    key: "GetCashoutAmount",
    value: function GetCashoutAmount() {
      return this._m.Data["cash_amount"];
    }
  }, {
    key: "GetBankNonCashAmount",
    value: function GetBankNonCashAmount() {
      return this._m.Data["bank_noncash_amount"];
    }
  }, {
    key: "GetBankCashAmount",
    value: function GetBankCashAmount() {
      return this._m.Data["bank_cash_amount"];
    }
  }, {
    key: "GetCustomerReceipt",
    value: function GetCustomerReceipt() {
      return this._m.Data["customer_receipt"];
    }
  }, {
    key: "GetMerchantReceipt",
    value: function GetMerchantReceipt() {
      return this._m.Data["merchant_receipt"];
    }
  }, {
    key: "GetResponseText",
    value: function GetResponseText() {
      return this._m.Data["host_response_text"];
    }
  }, {
    key: "GetResponseCode",
    value: function GetResponseCode() {
      return this._m.Data["host_response_code"];
    }
  }, {
    key: "GetTerminalReferenceId",
    value: function GetTerminalReferenceId() {
      return this._m.Data["terminal_ref_id"];
    }
  }, {
    key: "GetAccountType",
    value: function GetAccountType() {
      return this._m.Data["account_type"];
    }
  }, {
    key: "GetAuthCode",
    value: function GetAuthCode() {
      return this._m.Data["auth_code"];
    }
  }, {
    key: "GetBankDate",
    value: function GetBankDate() {
      return this._m.Data["bank_date"];
    }
  }, {
    key: "GetBankTime",
    value: function GetBankTime() {
      return this._m.Data["bank_time"];
    }
  }, {
    key: "GetMaskedPan",
    value: function GetMaskedPan() {
      return this._m.Data["masked_pan"];
    }
  }, {
    key: "GetTerminalId",
    value: function GetTerminalId() {
      return this._m.Data["terminal_id"];
    }
  }, {
    key: "WasMerchantReceiptPrinted",
    value: function WasMerchantReceiptPrinted() {
      return this._m.Data["merchant_receipt_printed"];
    }
  }, {
    key: "WasCustomerReceiptPrinted",
    value: function WasCustomerReceiptPrinted() {
      return this._m.Data["customer_receipt_printed"];
    }
  }, {
    key: "GetSurchargeAmount",
    value: function GetSurchargeAmount() {
      return this._m.Data["surcharge_amount"];
    }
  }, {
    key: "GetResponseValue",
    value: function GetResponseValue(attribute) {
      return this._m.Data[attribute];
    }
  }]);

  return CashoutOnlyResponse;
}();

/***/ }),

/***/ "./src/Connection.js":
/*!***************************!*\
  !*** ./src/Connection.js ***!
  \***************************/
/*! exports provided: ConnectionState, SPI_PROTOCOL, ConnectionStateEventArgs, MessageEventArgs, Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionState", function() { return ConnectionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPI_PROTOCOL", function() { return SPI_PROTOCOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionStateEventArgs", function() { return ConnectionStateEventArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageEventArgs", function() { return MessageEventArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionState = {
  Disconnected: 'Disconnected',
  Connecting: 'Connecting',
  Connected: 'Connected'
};
var SPI_PROTOCOL = 'spi.2.4.0';
var ConnectionStateEventArgs = function ConnectionStateEventArgs(connectionState) {
  _classCallCheck(this, ConnectionStateEventArgs);

  this.ConnectionState = connectionState;
};
var MessageEventArgs = function MessageEventArgs(message) {
  _classCallCheck(this, MessageEventArgs);

  this.Message = message;
};
var Connection =
/*#__PURE__*/
function () {
  function Connection() {
    _classCallCheck(this, Connection);

    this.Address = null;
    this.Connected = false;
    this.State = ConnectionState.Disconnected;
    this.SpiProtocol = SPI_PROTOCOL;
    this._ws = null;

    if (typeof WebSocket === 'undefined') {
      throw new Error('Environment does not support WebSockets');
    }
  }

  _createClass(Connection, [{
    key: "Connect",
    value: function Connect() {
      var _this = this;

      if (this.State === ConnectionState.Connected || this.State === ConnectionState.Connecting) {
        // already connected or connecting. disconnect first.
        return;
      }

      this.State = ConnectionState.Connecting; //Create a new socket instance specifying the url, SPI protocol and Websocket to use.
      //The will create a TCP/IP socket connection to the provided URL and perform HTTP websocket negotiation

      this._ws = new WebSocket(this.Address, this.SpiProtocol);

      this._ws.onopen = function () {
        return _this.pollWebSocketConnection();
      };

      this._ws.onmessage = function (payload) {
        return _this.onMessageReceived(payload);
      };

      this._ws.onclose = function () {
        return _this.onClosed();
      };

      this._ws.onerror = function (err) {
        return _this.onError(err);
      };

      document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {
        detail: new ConnectionStateEventArgs(ConnectionState.Connecting)
      }));
    }
  }, {
    key: "Disconnect",
    value: function Disconnect() {
      if (this.State == ConnectionState.Disconnected) return;

      if (this._ws && this._ws.readyState != this._ws.CLOSED) {
        this._ws.close();
      }

      if (this._ws) {
        this._ws.onopen = null;
        this._ws.onmessage = null;
        this._ws.onclose = null;
        this._ws.onerror = null;
      }

      this.onClosed();
    }
  }, {
    key: "Send",
    value: function Send(message) {
      this._ws.send(message);
    }
  }, {
    key: "onOpened",
    value: function onOpened() {
      this.State = ConnectionState.Connected;
      this.Connected = true;
      document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {
        detail: new ConnectionStateEventArgs(ConnectionState.Connected)
      }));
    }
  }, {
    key: "onClosed",
    value: function onClosed() {
      this.Connected = false;
      this.State = ConnectionState.Disconnected;
      this._ws = null;
      document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {
        detail: new ConnectionStateEventArgs(ConnectionState.Disconnected)
      }));
    }
  }, {
    key: "pollWebSocketConnection",
    value: function pollWebSocketConnection() {
      var _this2 = this;

      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._ws.readyState === this._ws.OPEN) {
        this.onOpened();
        return true;
      } else if (count < 25) {
        count++;
        setTimeout(function () {
          return _this2.pollWebSocketConnection(count);
        }, 200);
      } else {
        this.Disconnect();
        return false;
      }
    }
  }, {
    key: "onMessageReceived",
    value: function onMessageReceived(message) {
      document.dispatchEvent(new CustomEvent('MessageReceived', {
        detail: new MessageEventArgs(message.data)
      }));
    }
  }, {
    key: "onError",
    value: function onError(err) {
      document.dispatchEvent(new CustomEvent('ErrorReceived', {
        detail: new MessageEventArgs(err)
      }));
    }
  }]);

  return Connection;
}();

/***/ }),

/***/ "./src/Crypto.js":
/*!***********************!*\
  !*** ./src/Crypto.js ***!
  \***********************/
/*! exports provided: Crypto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Crypto", function() { return Crypto; });
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jssha */ "./node_modules/jssha/src/sha.js");
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jssha__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Crypto =
/*#__PURE__*/
function () {
  function Crypto() {
    _classCallCheck(this, Crypto);
  } // <summary>
  // Encrypt a block using CBC and PKCS7.
  // </summary>
  // <param name="key">The key value</param>
  // <param name="data">The message to encrypt</param>
  // <returns>Returns the resulting encrypted string data as HEX.</returns>


  _createClass(Crypto, null, [{
    key: "AesEncrypt",
    value: function AesEncrypt(key, data) {
      var bytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.hex.toBytes(key);
      var iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
      var textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.padding.pkcs7.pad(aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.utf8.toBytes(data));
      var aesCbc = new aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.ModeOfOperation.cbc(bytes, iv);
      var encryptedBytes = aesCbc.encrypt(textBytes);
      var encryptedString = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.hex.fromBytes(encryptedBytes);
      return encryptedString;
    } // <summary>
    // Decrypt a block using a CBC and PKCS7.
    // </summary>
    // <param name="key">The key value</param>
    // <param name="data">the data to decrypt</param>
    // <returns>Returns the resulting data decrypted in plaintext.</returns>

  }, {
    key: "AesDecrypt",
    value: function AesDecrypt(key, data) {
      var bytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.hex.toBytes(key);
      var iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
      var encryptedBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.hex.toBytes(data);
      var aesCbc = new aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.ModeOfOperation.cbc(bytes, iv);
      var decryptedBytes = aesCbc.decrypt(encryptedBytes);
      var decrypted = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.utf8.fromBytes(aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.padding.pkcs7.strip(decryptedBytes));
      return decrypted;
    } // <summary>
    // Calculates the HMACSHA256 signature of a message.
    // </summary>
    // <param name="key">The Hmac Key as HEX</param>
    // <param name="messageToSign">The message to sign</param>
    // <returns>The HMACSHA256 signature as a hex string</returns>

  }, {
    key: "HmacSignature",
    value: function HmacSignature(key, messageToSign) {
      var shaObj = new jssha__WEBPACK_IMPORTED_MODULE_0___default.a("SHA-256", "TEXT");
      shaObj.setHMACKey(key, 'HEX');
      shaObj.update(messageToSign);
      return shaObj.getHMAC("HEX");
    }
    /**
     * This utility function calculates the SHA-256 value in hexadecimal format
     * @param {String} value the value to be hashed
     */

  }, {
    key: "GenerateHash",
    value: function GenerateHash(value) {
      var shaObj = new jssha__WEBPACK_IMPORTED_MODULE_0___default.a('SHA-256', 'HEX');
      shaObj.update(value);
      var shaHash = shaObj.getHash('HEX');
      return shaHash;
    }
  }]);

  return Crypto;
}();

/***/ }),

/***/ "./src/KeyRollingHelper.js":
/*!*********************************!*\
  !*** ./src/KeyRollingHelper.js ***!
  \*********************************/
/*! exports provided: KeyRollingHelper, KeyRollingResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyRollingHelper", function() { return KeyRollingHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyRollingResult", function() { return KeyRollingResult; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _Crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Crypto */ "./src/Crypto.js");
/* harmony import */ var _Secrets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Secrets */ "./src/Secrets.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var KeyRollingHelper =
/*#__PURE__*/
function () {
  function KeyRollingHelper() {
    _classCallCheck(this, KeyRollingHelper);
  }

  _createClass(KeyRollingHelper, null, [{
    key: "PerformKeyRolling",
    value: function PerformKeyRolling(krRequest, currentSecrets) {
      var m = new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](krRequest.Id, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].KeyRollResponse, {
        "status": "confirmed"
      }, true);
      var newSecrets = new _Secrets__WEBPACK_IMPORTED_MODULE_2__["Secrets"](_Crypto__WEBPACK_IMPORTED_MODULE_1__["Crypto"].GenerateHash(currentSecrets.EncKey).toUpperCase(), _Crypto__WEBPACK_IMPORTED_MODULE_1__["Crypto"].GenerateHash(currentSecrets.HmacKey).toUpperCase());
      return new KeyRollingResult(m, newSecrets);
    }
  }]);

  return KeyRollingHelper;
}();
var KeyRollingResult = function KeyRollingResult(keyRollingConfirmation, newSecrets) {
  _classCallCheck(this, KeyRollingResult);

  this.KeyRollingConfirmation = keyRollingConfirmation;
  this.NewSecrets = newSecrets;
};

/***/ }),

/***/ "./src/Logger.js":
/*!***********************!*\
  !*** ./src/Logger.js ***!
  \***********************/
/*! exports provided: default, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger =
/*#__PURE__*/
function () {
  function Logger(element) {
    var lineSeperator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\n';

    _classCallCheck(this, Logger);

    this.buffer = [];
    this.element = element;
    this.lineSeperator = lineSeperator;
  }

  _createClass(Logger, [{
    key: "Info",
    value: function Info() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.buffer.push(args.join(' '));

      this._render();
    }
  }, {
    key: "Debug",
    value: function Debug() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.buffer.push(args.join(' '));

      this._render();
    }
  }, {
    key: "Warn",
    value: function Warn() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.buffer.push(args.join(' '));

      this._render();
    }
  }, {
    key: "Error",
    value: function Error() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.buffer.push(args.join(' '));

      this._render();
    }
  }, {
    key: "Console",
    value: function Console() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      console.log(args.join(' '));
    }
  }, {
    key: "_render",
    value: function _render() {
      this.element.innerText = this.buffer.join(this.lineSeperator);
      this.element.scrollTop = this.element.scrollHeight;
    }
  }, {
    key: "Clear",
    value: function Clear() {
      this.buffer = [];

      this._render();
    }
  }]);

  return Logger;
}();




/***/ }),

/***/ "./src/Messages.js":
/*!*************************!*\
  !*** ./src/Messages.js ***!
  \*************************/
/*! exports provided: Events, SuccessState, MessageStamp, MessageEnvelope, Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessState", function() { return SuccessState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageStamp", function() { return MessageStamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageEnvelope", function() { return MessageEnvelope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony import */ var _Crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Crypto */ "./src/Crypto.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

 // <summary>
// Events statically declares the various event names in messages.
// </summary>

var Events = {
  PairRequest: "pair_request",
  KeyRequest: "key_request",
  KeyResponse: "key_response",
  KeyCheck: "key_check",
  PairResponse: "pair_response",
  DropKeysAdvice: "drop_keys",
  LoginRequest: "login_request",
  LoginResponse: "login_response",
  Ping: "ping",
  Pong: "pong",
  PurchaseRequest: "purchase",
  PurchaseResponse: "purchase_response",
  CancelTransactionRequest: "cancel_transaction",
  GetLastTransactionRequest: "get_last_transaction",
  GetLastTransactionResponse: "last_transaction",
  RefundRequest: "refund",
  RefundResponse: "refund_response",
  SignatureRequired: "signature_required",
  SignatureDeclined: "signature_decline",
  SignatureAccepted: "signature_accept",
  AuthCodeRequired: "authorisation_code_required",
  AuthCodeAdvice: "authorisation_code_advice",
  CashoutOnlyRequest: "cash",
  CashoutOnlyResponse: "cash_response",
  MotoPurchaseRequest: "moto_purchase",
  MotoPurchaseResponse: "moto_purchase_response",
  SettleRequest: "settle",
  SettleResponse: "settle_response",
  SettlementEnquiryRequest: "settlement_enquiry",
  SettlementEnquiryResponse: "settlement_enquiry_response",
  KeyRollRequest: "request_use_next_keys",
  KeyRollResponse: "response_use_next_keys",
  Error: "error",
  InvalidHmacSignature: "_INVALID_SIGNATURE_",
  // Pay At Table Related Messages
  PayAtTableGetTableConfig: "get_table_config",
  // incoming. When eftpos wants to ask us for P@T configuration.
  PayAtTableSetTableConfig: "set_table_config",
  // outgoing. When we want to instruct eftpos with the P@T configuration.
  PayAtTableGetBillDetails: "get_bill_details",
  // incoming. When eftpos wants to aretrieve the bill for a table.
  PayAtTableBillDetails: "bill_details",
  // outgoing. We reply with this when eftpos requests to us get_bill_details.
  PayAtTableBillPayment: "bill_payment" // incoming. When the eftpos advices 

};
var SuccessState = {
  Unknown: 'Unknown',
  Success: 'Success',
  Failed: 'Failed'
}; // <summary>
// MessageStamp represents what is required to turn an outgoing Message into Json
// including encryption and date setting.
// </summary>

var MessageStamp = function MessageStamp(posId, secrets, serverTimeDelta) {
  _classCallCheck(this, MessageStamp);

  this.PosId = posId;
  this.Secrets = secrets;
  this.ServerTimeDelta = serverTimeDelta;
}; // <summary>
// MessageEnvelope represents the outer structure of any message that is exchanged
// between the Pos and the PinPad and vice-versa.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>

var MessageEnvelope =
/*#__PURE__*/
function () {
  function MessageEnvelope(message, enc, hmac, posId) {
    _classCallCheck(this, MessageEnvelope);

    // <summary>
    // The Message field is set only when in Un-encrypted form.
    // In fact it is the only field in an envelope in the Un-Encrypted form.
    // </summary>
    this.Message = message; // <summary>
    // The enc field is set only when in Encrypted form.
    // It contains the encrypted Json of another MessageEnvelope 
    // </summary>

    this.Enc = enc; // <summary>
    // The hmac field is set only when in Encrypted form.
    // It is the signature of the "enc" field.
    // </summary>

    this.Hmac = hmac; // <summary>
    // The pos_id field is only filled for outgoing Encrypted messages.
    // </summary>

    this.PosId = posId;
  }

  _createClass(MessageEnvelope, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        message: this.Message,
        enc: this.Enc,
        hmac: this.Hmac,
        pos_id: this.PosId
      };
    }
  }]);

  return MessageEnvelope;
}(); // <summary>
// Message represents the contents of a Message.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>

var Message =
/*#__PURE__*/
function () {
  function Message(id, eventName, data, needsEncryption) {
    _classCallCheck(this, Message);

    this.Id = id;
    this.EventName = eventName;
    this.Data = data;
    this.DateTimeStamp = '';
    this.PosId = ''; // Pos_id is set here only for outgoing Un-encrypted messages. 

    this.IncommingHmac = ''; // Sometimes the logic around the incoming message might need access to the sugnature, for example in the key_check.

    this._needsEncryption = needsEncryption; // Denotes whether an outgoing message needs to be encrypted in ToJson()

    this.DecryptedJson = ''; // Set on an incoming message just so you can have a look at what it looked like in its json form.
  }

  _createClass(Message, [{
    key: "GetSuccessState",
    value: function GetSuccessState() {
      if (!this.Data || typeof this.Data.success === "undefined") {
        return SuccessState.Unknown;
      }

      return this.Data.success ? SuccessState.Success : SuccessState.Failed;
    }
  }, {
    key: "GetError",
    value: function GetError() {
      return this.Data.error_reason ? this.Data.error_reason : "";
    }
  }, {
    key: "GetErrorDetail",
    value: function GetErrorDetail() {
      return this.Data.error_detail;
    }
  }, {
    key: "GetServerTimeDelta",
    value: function GetServerTimeDelta() {
      var now = Date.now(); // Stamp format: 2018-04-19T01:42:38.279

      var dts = this.DateTimeStamp.split(/[\-\+\. :T]/);
      var msgTime = new Date( // year, month, date
      dts[0], dts[1] - 1, dts[2], // hour, minute, second, millis
      dts[3], dts[4], dts[5], dts[6]).getTime(); // Local time zone

      return msgTime - now;
    } // Helper method to parse bank date format 20042018 (ddMMyyyy)

  }, {
    key: "ToJson",
    value: function ToJson(stamp) {
      var now = Date.now();
      var tzoffset = new Date().getTimezoneOffset() * 60 * 1000;
      var adjustedTime = new Date(now - tzoffset + stamp.ServerTimeDelta); // Format date: "yyyy-MM-ddTHH:mm:ss.fff"

      this.DateTimeStamp = adjustedTime.toISOString().slice(0, -1);
      this.PosId = stamp.PosId;
      var envelope = {
        message: {
          id: this.Id,
          event: this.EventName,
          data: this.Data,
          datetime: this.DateTimeStamp
        }
      };

      if (!this._needsEncryption) {
        // Unencrypted Messages need PosID inside the message
        envelope.message.pos_id = this.PosId;
      }

      this.DecryptedJson = JSON.stringify(envelope);

      if (!this._needsEncryption) {
        return this.DecryptedJson;
      }

      var encMsg = _Crypto__WEBPACK_IMPORTED_MODULE_0__["Crypto"].AesEncrypt(stamp.Secrets.EncKey, this.DecryptedJson);
      var hmacSig = _Crypto__WEBPACK_IMPORTED_MODULE_0__["Crypto"].HmacSignature(stamp.Secrets.HmacKey, encMsg);
      var encrMessageEnvelope = {
        enc: encMsg,
        hmac: hmacSig.toUpperCase(),
        pos_id: stamp.PosId
      };
      return JSON.stringify(encrMessageEnvelope);
    }
  }], [{
    key: "ParseBankDate",
    value: function ParseBankDate(bankDate) {
      if (bankDate.length !== 8) return null;
      return new Date("".concat(bankDate.substr(4, 4), "-").concat(bankDate.substr(2, 2), "-").concat(bankDate.substr(0, 2)));
    } // Parses a bank date & time str from "05Oct17" / "05:00" ("ddMMMyy/HH:mm") into date obj

  }, {
    key: "ParseBankDateTimeStr",
    value: function ParseBankDateTimeStr(date, time) {
      return new Date("".concat(date.substr(0, 2), " ").concat(date.substr(2, 3), " ").concat(date.substr(5, 2), " ").concat(time));
    }
  }, {
    key: "FromJson",
    value: function FromJson(msgJson, secrets) {
      var env = JSON.parse(msgJson);

      if (env.message != null) {
        var message = new Message(env.message.id, env.message.event, env.message.data, false);
        message.DecryptedJson = msgJson;
        return message;
      }

      if (secrets == null) {
        // This may happen if we somehow received an encrypted message from eftpos but we're not configered with secrets.
        // For example, if we cancel the pairing process a little late in the game and we get an encrypted key_check message after we've dropped the keys.
        return new Message("UNKNOWN", "NOSECRETS", null, false);
      } // Its encrypted, verify sig


      var sig = _Crypto__WEBPACK_IMPORTED_MODULE_0__["Crypto"].HmacSignature(secrets.HmacKey, env.enc);

      if (sig.toUpperCase() != env.hmac) {
        return new Message("_", Events.InvalidHmacSignature, null, false);
      }

      var decryptedJson = _Crypto__WEBPACK_IMPORTED_MODULE_0__["Crypto"].AesDecrypt(secrets.EncKey, env.enc);

      try {
        var decryptedMsg = JSON.parse(decryptedJson);

        var _message = new Message(decryptedMsg.message.id, decryptedMsg.message.event, decryptedMsg.message.data, true);

        _message.DateTimeStamp = decryptedMsg.message.datetime;
        _message.PosId = decryptedMsg.message.pos_id;
        _message.IncomingHmac = env.hmac;
        _message.DecryptedJson = decryptedJson;
        return _message;
      } catch (e) {
        return new Message("UNKNOWN", "UNPARSEABLE", {
          "msg": decryptedJson
        }, false);
      }
    }
  }]);

  return Message;
}();

/***/ }),

/***/ "./src/Pairing.js":
/*!************************!*\
  !*** ./src/Pairing.js ***!
  \************************/
/*! exports provided: PairRequest, KeyRequest, KeyResponse, KeyCheck, PairResponse, SecretsAndKeyResponse, DropKeysRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairRequest", function() { return PairRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyRequest", function() { return KeyRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyResponse", function() { return KeyResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCheck", function() { return KeyCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairResponse", function() { return PairResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecretsAndKeyResponse", function() { return SecretsAndKeyResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropKeysRequest", function() { return DropKeysRequest; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // <summary>
// Pairing Interaction 1: Outgoing
// </summary>

var PairRequest =
/*#__PURE__*/
function () {
  function PairRequest() {
    _classCallCheck(this, PairRequest);
  }

  _createClass(PairRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        padding: true
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("pr"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PairRequest, data, false);
    }
  }]);

  return PairRequest;
}(); // Pairing Interaction 2: Incoming

var KeyRequest = function KeyRequest(m) {
  _classCallCheck(this, KeyRequest);

  this.RequestId = m.Id;
  this.Aenc = m.Data.enc.A;
  this.Ahmac = m.Data.hmac.A;
}; // Pairing Interaction 3: Outgoing

var KeyResponse =
/*#__PURE__*/
function () {
  function KeyResponse(requestId, Benc, Bhmac) {
    _classCallCheck(this, KeyResponse);

    this.RequestId = requestId;
    this.Benc = Benc;
    this.Bhmac = Bhmac;
  }

  _createClass(KeyResponse, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        enc: {
          B: this.Benc
        },
        hmac: {
          B: this.Bhmac
        }
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](this.RequestId, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].KeyResponse, data, false);
    }
  }]);

  return KeyResponse;
}(); // Pairing Interaction 4: Incoming

var KeyCheck = function KeyCheck(m) {
  _classCallCheck(this, KeyCheck);

  this.ConfirmationCode = m.IncomingHmac.substring(0, 6);
}; // Pairing Interaction 5: Incoming

var PairResponse = function PairResponse(m) {
  _classCallCheck(this, PairResponse);

  this.Success = m.Data.success;
}; // Holder class for Secrets and KeyResponse, so that we can use them together in method signatures.

var SecretsAndKeyResponse = function SecretsAndKeyResponse(secrets, keyResponse) {
  _classCallCheck(this, SecretsAndKeyResponse);

  this.Secrets = secrets;
  this.KeyResponse = keyResponse;
};
var DropKeysRequest =
/*#__PURE__*/
function () {
  function DropKeysRequest() {
    _classCallCheck(this, DropKeysRequest);
  }

  _createClass(DropKeysRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("drpkys"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].DropKeysAdvice, null, true);
    }
  }]);

  return DropKeysRequest;
}();

/***/ }),

/***/ "./src/PayAtTable.js":
/*!***************************!*\
  !*** ./src/PayAtTable.js ***!
  \***************************/
/*! exports provided: BillStatusResponse, BillRetrievalResult, PaymentType, BillPayment, PaymentHistoryEntry, PayAtTableConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillStatusResponse", function() { return BillStatusResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillRetrievalResult", function() { return BillRetrievalResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentType", function() { return PaymentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillPayment", function() { return BillPayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentHistoryEntry", function() { return PaymentHistoryEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayAtTableConfig", function() { return PayAtTableConfig; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _Purchase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Purchase */ "./src/Purchase.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // <summary>
// This class represents the BillDetails that the POS will be asked for throughout a PayAtTable flow.
// </summary>

var BillStatusResponse =
/*#__PURE__*/
function () {
  function BillStatusResponse() {
    _classCallCheck(this, BillStatusResponse);

    // <summary>
    // Set this Error accordingly if you are not able to return the BillDetails that were asked from you.
    // </summary>
    this.Result = null; // <summary>
    // This is a unique identifier that you assign to each bill.
    // It migt be for example, the timestamp of when the cover was opened.
    // </summary>

    this.BillId = null; // <summary>
    // This is the table id that this bill was for.
    // The waiter will enter it on the Eftpos at the start of the PayAtTable flow and the Eftpos will 
    // retrieve the bill using the table id. 
    // </summary>

    this.TableId = null; // <summary>
    // The Total Amount on this bill, in cents.
    // </summary>

    this.TotalAmount = 0; // <summary>
    // The currently outsanding amount on this bill, in cents.
    // </summary>

    this.OutstandingAmount = 0; // <summary>
    // Your POS is required to persist some state on behalf of the Eftpos so the Eftpos can recover state.
    // It is just a piece of string that you save against your billId.
    // WHenever you're asked for BillDetails, make sure you return this piece of data if you have it.
    // </summary>

    this.BillData = "";
  }

  _createClass(BillStatusResponse, [{
    key: "getBillPaymentHistory",
    value: function getBillPaymentHistory() {
      if (!this.BillData) {
        return [];
      }

      var billPaymentHistory = [];
      var savedBillData = JSON.parse(this.BillData);
      return savedBillData.map(function (bill) {
        return new PaymentHistoryEntry(bill.payment_type, bill.payment_summary);
      });
    }
  }, {
    key: "ToMessage",
    value: function ToMessage(messageId) {
      var data = {
        "success": this.Result == BillRetrievalResult.SUCCESS
      };
      if (this.BillId) data.bill_id = this.BillId;
      if (this.TableId) data.table_id = this.TableId;

      if (this.Result == BillRetrievalResult.SUCCESS) {
        data.bill_total_amount = this.TotalAmount;
        data.bill_outstanding_amount = this.OutstandingAmount;
        data.bill_payment_history = this.getBillPaymentHistory();
      } else {
        data.error_reason = this.Result.toString();
        data.error_detail = this.Result.toString();
      }

      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](messageId, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableBillDetails, data, true);
    }
  }], [{
    key: "ToBillData",
    value: function ToBillData(ph) {
      if (ph.length < 1) {
        return "";
      }

      return JSON.stringify(ph);
    }
  }]);

  return BillStatusResponse;
}();
var BillRetrievalResult = {
  SUCCESS: 'SUCCESS',
  INVALID_TABLE_ID: 'INVALID_TABLE_ID',
  INVALID_BILL_ID: 'INVALID_BILL_ID',
  INVALID_OPERATOR_ID: 'INVALID_OPERATOR_ID'
};
var PaymentType = {
  CARD: 'CARD',
  CASH: 'CASH'
};
var BillPayment = function BillPayment(m) {
  _classCallCheck(this, BillPayment);

  this._incomingAdvice = m;
  this.BillId = this._incomingAdvice.Data["bill_id"];
  this.TableId = this._incomingAdvice.Data["table_id"];
  this.OperatorId = this._incomingAdvice.Data["operator_id"];
  var pt = this._incomingAdvice.Data["payment_type"];
  this.PaymentType = pt; // this is when we ply the sub object "payment_details" into a purchase response for convenience.

  var purchaseMsg = new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](m.Id, "payment_details", m.Data["payment_details"], false);
  this.PurchaseResponse = new _Purchase__WEBPACK_IMPORTED_MODULE_1__["PurchaseResponse"](purchaseMsg);
  this.PurchaseAmount = this.PurchaseResponse.GetPurchaseAmount();
  this.TipAmount = this.PurchaseResponse.GetTipAmount();
};
var PaymentHistoryEntry =
/*#__PURE__*/
function () {
  function PaymentHistoryEntry(paymentType, paymentSummary) {
    _classCallCheck(this, PaymentHistoryEntry);

    this.PaymentType = paymentType;
    this.PaymentSummary = paymentSummary;
  }

  _createClass(PaymentHistoryEntry, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        payment_type: this.PaymentType,
        payment_summary: this.PaymentSummary
      };
    }
  }, {
    key: "GetTerminalRefId",
    value: function GetTerminalRefId() {
      return this.PaymentSummary["terminal_ref_id"];
    }
  }]);

  return PaymentHistoryEntry;
}();
var PayAtTableConfig =
/*#__PURE__*/
function () {
  function PayAtTableConfig() {
    _classCallCheck(this, PayAtTableConfig);

    this.PayAtTabledEnabled = false;
    this.OperatorIdEnabled = false;
    this.SplitByAmountEnabled = false;
    this.EqualSplitEnabled = false;
    this.TippingEnabled = false;
    this.SummaryReportEnabled = false;
    this.LabelPayButton = '';
    this.LabelOperatorId = '';
    this.LabelTableId = ''; // 
    // <summary>
    // Fill in with operator ids that the eftpos terminal will validate against. 
    // Leave Empty to allow any operator_id through. 
    // </summary>

    this.AllowedOperatorIds = [];
  }

  _createClass(PayAtTableConfig, [{
    key: "ToMessage",
    value: function ToMessage(messageId) {
      var data = {
        "pay_at_table_enabled": this.PayAtTabledEnabled,
        "operator_id_enabled": this.OperatorIdEnabled,
        "split_by_amount_enabled": this.SplitByAmountEnabled,
        "equal_split_enabled": this.EqualSplitEnabled,
        "tipping_enabled": this.TippingEnabled,
        "summary_report_enabled": this.SummaryReportEnabled,
        "pay_button_label": this.LabelPayButton,
        "operator_id_label": this.LabelOperatorId,
        "table_id_label": this.LabelTableId,
        "operator_id_list": this.AllowedOperatorIds
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](messageId, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableSetTableConfig, data, true);
    }
  }], [{
    key: "FeatureDisableMessage",
    value: function FeatureDisableMessage(messageId) {
      var data = {
        "pay_at_table_enabled": false
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](messageId, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableSetTableConfig, data, true);
    }
  }]);

  return PayAtTableConfig;
}();

/***/ }),

/***/ "./src/PingHelper.js":
/*!***************************!*\
  !*** ./src/PingHelper.js ***!
  \***************************/
/*! exports provided: PongHelper, PingHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PongHelper", function() { return PongHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PingHelper", function() { return PingHelper; });
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PongHelper =
/*#__PURE__*/
function () {
  function PongHelper() {
    _classCallCheck(this, PongHelper);
  }

  _createClass(PongHelper, null, [{
    key: "GeneratePongRessponse",
    value: function GeneratePongRessponse(ping) {
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](ping.Id, _Messages__WEBPACK_IMPORTED_MODULE_1__["Events"].Pong, null, true);
    }
  }]);

  return PongHelper;
}();
var PingHelper =
/*#__PURE__*/
function () {
  function PingHelper() {
    _classCallCheck(this, PingHelper);
  }

  _createClass(PingHelper, null, [{
    key: "GeneratePingRequest",
    value: function GeneratePingRequest() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("ping"), _Messages__WEBPACK_IMPORTED_MODULE_1__["Events"].Ping, null, true);
    }
  }]);

  return PingHelper;
}();

/***/ }),

/***/ "./src/Preauth.js":
/*!************************!*\
  !*** ./src/Preauth.js ***!
  \************************/
/*! exports provided: PreauthEvents, AccountVerifyRequest, AccountVerifyResponse, PreauthOpenRequest, PreauthTopupRequest, PreauthPartialCancellationRequest, PreauthExtendRequest, PreauthCancelRequest, PreauthCompletionRequest, PreauthResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthEvents", function() { return PreauthEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountVerifyRequest", function() { return AccountVerifyRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountVerifyResponse", function() { return AccountVerifyResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthOpenRequest", function() { return PreauthOpenRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthTopupRequest", function() { return PreauthTopupRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthPartialCancellationRequest", function() { return PreauthPartialCancellationRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthExtendRequest", function() { return PreauthExtendRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthCancelRequest", function() { return PreauthCancelRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthCompletionRequest", function() { return PreauthCompletionRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreauthResponse", function() { return PreauthResponse; });
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _Purchase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Purchase */ "./src/Purchase.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PreauthEvents = {
  AccountVerifyRequest: "account_verify",
  AccountVerifyResponse: "account_verify_response",
  PreauthOpenRequest: "preauth",
  PreauthOpenResponse: "preauth_response",
  PreauthTopupRequest: "preauth_topup",
  PreauthTopupResponse: "preauth_topup_response",
  PreauthExtendRequest: "preauth_extend",
  PreauthExtendResponse: "preauth_extend_response",
  PreauthPartialCancellationRequest: "preauth_partial_cancellation",
  PreauthPartialCancellationResponse: "preauth_partial_cancellation_response",
  PreauthCancellationRequest: "preauth_cancellation",
  PreauthCancellationResponse: "preauth_cancellation_response",
  PreauthCompleteRequest: "completion",
  PreauthCompleteResponse: "completion_response"
};
var AccountVerifyRequest =
/*#__PURE__*/
function () {
  function AccountVerifyRequest(posRefId) {
    _classCallCheck(this, AccountVerifyRequest);

    this.PosRefId = posRefId;
  }

  _createClass(AccountVerifyRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prav"), PreauthEvents.AccountVerifyRequest, data, true);
    }
  }]);

  return AccountVerifyRequest;
}();
var AccountVerifyResponse = function AccountVerifyResponse(m) {
  _classCallCheck(this, AccountVerifyResponse);

  this.Details = new _Purchase__WEBPACK_IMPORTED_MODULE_2__["PurchaseResponse"](m);
  this.PosRefId = this.Details.PosRefId;
  this._m = m;
};
var PreauthOpenRequest =
/*#__PURE__*/
function () {
  function PreauthOpenRequest(amountCents, posRefId) {
    _classCallCheck(this, PreauthOpenRequest);

    this.PosRefId = posRefId;
    this.PreauthAmount = amountCents;
  }

  _createClass(PreauthOpenRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_amount": this.PreauthAmount
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prac"), PreauthEvents.PreauthOpenRequest, data, true);
    }
  }]);

  return PreauthOpenRequest;
}();
var PreauthTopupRequest =
/*#__PURE__*/
function () {
  function PreauthTopupRequest(preauthId, topupAmountCents, posRefId) {
    _classCallCheck(this, PreauthTopupRequest);

    this.PreauthId = preauthId;
    this.TopupAmount = topupAmountCents;
    this.PosRefId = posRefId;
  }

  _createClass(PreauthTopupRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_id": this.PreauthId,
        "topup_amount": this.TopupAmount
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prtu"), PreauthEvents.PreauthTopupRequest, data, true);
    }
  }]);

  return PreauthTopupRequest;
}();
var PreauthPartialCancellationRequest =
/*#__PURE__*/
function () {
  function PreauthPartialCancellationRequest(preauthId, partialCancellationAmountCents, posRefId) {
    _classCallCheck(this, PreauthPartialCancellationRequest);

    this.PreauthId = preauthId;
    this.PartialCancellationAmount = partialCancellationAmountCents;
    this.PosRefId = posRefId;
  }

  _createClass(PreauthPartialCancellationRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_id": this.PreauthId,
        "preauth_cancel_amount": this.PartialCancellationAmount
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prpc"), PreauthEvents.PreauthPartialCancellationRequest, data, true);
    }
  }]);

  return PreauthPartialCancellationRequest;
}();
var PreauthExtendRequest =
/*#__PURE__*/
function () {
  function PreauthExtendRequest(preauthId, posRefId) {
    _classCallCheck(this, PreauthExtendRequest);

    this.PreauthId = preauthId;
    this.PosRefId = posRefId;
  }

  _createClass(PreauthExtendRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_id": this.PreauthId
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prext"), PreauthEvents.PreauthExtendRequest, data, true);
    }
  }]);

  return PreauthExtendRequest;
}();
var PreauthCancelRequest =
/*#__PURE__*/
function () {
  function PreauthCancelRequest(preauthId, posRefId) {
    _classCallCheck(this, PreauthCancelRequest);

    this.PreauthId = preauthId;
    this.PosRefId = posRefId;
  }

  _createClass(PreauthCancelRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_id": this.PreauthId
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prac"), PreauthEvents.PreauthCancellationRequest, data, true);
    }
  }]);

  return PreauthCancelRequest;
}();
var PreauthCompletionRequest =
/*#__PURE__*/
function () {
  function PreauthCompletionRequest(preauthId, completionAmountCents, posRefId, surchargeAmount) {
    _classCallCheck(this, PreauthCompletionRequest);

    this.PreauthId = preauthId;
    this.CompletionAmount = completionAmountCents;
    this.PosRefId = posRefId;
    this.SurchargeAmount = surchargeAmount;
  }

  _createClass(PreauthCompletionRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        "pos_ref_id": this.PosRefId,
        "preauth_id": this.PreauthId,
        "completion_amount": this.CompletionAmount,
        "surcharge_amount": this.SurchargeAmount
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_1__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("prac"), PreauthEvents.PreauthCompleteRequest, data, true);
    }
  }]);

  return PreauthCompletionRequest;
}();
var PreauthResponse =
/*#__PURE__*/
function () {
  function PreauthResponse(m) {
    _classCallCheck(this, PreauthResponse);

    this.PreauthId = m.Data["preauth_id"];
    this.Details = new _Purchase__WEBPACK_IMPORTED_MODULE_2__["PurchaseResponse"](m);
    this.PosRefId = this.Details.PosRefId;
    this._m = m;
  }

  _createClass(PreauthResponse, [{
    key: "GetBalanceAmount",
    value: function GetBalanceAmount() {
      var txType = this._m.Data["transaction_type"];

      switch (txType) {
        case "PRE-AUTH":
          return this._m.Data["preauth_amount"];

        case "TOPUP":
          return this._m.Data["balance_amount"];

        case "CANCEL":
          // PARTIAL CANCELLATION
          return this._m.Data["balance_amount"];

        case "PRE-AUTH EXT":
          return this._m.Data["balance_amount"];

        case "PCOMP":
          return 0;
        // Balance is 0 after completion

        case "PRE-AUTH CANCEL":
          return 0;
        // Balance is 0 after cancellation

        default:
          return 0;
      }
    }
  }, {
    key: "GetPreviousBalanceAmount",
    value: function GetPreviousBalanceAmount() {
      var txType = this._m.Data["transaction_type"];

      switch (txType) {
        case "PRE-AUTH":
          return 0;

        case "TOPUP":
          return this._m.Data["existing_preauth_amount"];

        case "CANCEL":
          // PARTIAL CANCELLATION
          return this._m.Data["existing_preauth_amount"];

        case "PRE-AUTH EXT":
          return this._m.Data["existing_preauth_amount"];

        case "PCOMP":
          // THIS IS TECHNICALLY NOT CORRECT WHEN COMPLETION HAPPENS FOR A PARTIAL AMOUNT.
          // BUT UNFORTUNATELY, THIS RESPONSE DOES NOT CONTAIN "existing_preauth_amount".
          // SO "completion_amount" IS THE CLOSEST WE HAVE.
          return this._m.Data["completion_amount"];

        case "PRE-AUTH CANCEL":
          return this._m.Data["preauth_amount"];

        default:
          return 0;
      }
    }
  }, {
    key: "GetCompletionAmount",
    value: function GetCompletionAmount() {
      var txType = this._m.Data["transaction_type"];

      switch (txType) {
        case "PCOMP":
          return this._m.Data["completion_amount"];

        default:
          return 0;
      }
    }
  }, {
    key: "GetSurchargeAmount",
    value: function GetSurchargeAmount() {
      var txType = this._m.Data["transaction_type"];

      switch (txType) {
        case "PCOMP":
          return this._m.Data["surcharge_amount"];

        default:
          return 0;
      }
    }
  }]);

  return PreauthResponse;
}();

/***/ }),

/***/ "./src/Printing.js":
/*!*************************!*\
  !*** ./src/Printing.js ***!
  \*************************/
/*! exports provided: Printer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Printer", function() { return Printer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This class is a mock printer for the terminal to print Receipts
 */
var Printer =
/*#__PURE__*/
function () {
  function Printer(element) {
    _classCallCheck(this, Printer);

    this.buffer = [];
    this.element = element;
  }

  _createClass(Printer, [{
    key: "print",
    value: function print() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.buffer.push(args.join(' '));

      this._render();
    }
  }, {
    key: "_render",
    value: function _render() {
      this.element.innerText = this.buffer.join("\n\n \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/ \n\n");
      this.element.scrollTop = this.element.scrollHeight;
    }
  }, {
    key: "Clear",
    value: function Clear() {
      this.buffer = [];

      this._render();
    }
  }]);

  return Printer;
}();

/***/ }),

/***/ "./src/Purchase.js":
/*!*************************!*\
  !*** ./src/Purchase.js ***!
  \*************************/
/*! exports provided: PurchaseRequest, PurchaseResponse, CancelTransactionRequest, CancelTransactionResponse, GetLastTransactionRequest, GetLastTransactionResponse, RefundRequest, RefundResponse, SignatureRequired, SignatureDecline, SignatureAccept, MotoPurchaseRequest, MotoPurchaseResponse, PhoneForAuthRequired, AuthCodeAdvice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseRequest", function() { return PurchaseRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseResponse", function() { return PurchaseResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelTransactionRequest", function() { return CancelTransactionRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelTransactionResponse", function() { return CancelTransactionResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetLastTransactionRequest", function() { return GetLastTransactionRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetLastTransactionResponse", function() { return GetLastTransactionResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefundRequest", function() { return RefundRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefundResponse", function() { return RefundResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureRequired", function() { return SignatureRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureDecline", function() { return SignatureDecline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureAccept", function() { return SignatureAccept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotoPurchaseRequest", function() { return MotoPurchaseRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotoPurchaseResponse", function() { return MotoPurchaseResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneForAuthRequired", function() { return PhoneForAuthRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthCodeAdvice", function() { return AuthCodeAdvice; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
/* harmony import */ var _SpiModels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpiModels */ "./src/SpiModels.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PurchaseRequest =
/*#__PURE__*/
function () {
  function PurchaseRequest(amountCents, posRefId) {
    _classCallCheck(this, PurchaseRequest);

    this.PosRefId = posRefId;
    this.PurchaseAmount = amountCents;
    this.TipAmount = 0;
    this.CashoutAmount = 0;
    this.PromptForCashout = false;
    this.SurchargeAmount = 0;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["SpiConfig"]();
    this.Options = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["TransactionOptions"](); // Library Backwards Compatibility

    this.Id = posRefId;
    this.AmountCents = amountCents;
  }

  _createClass(PurchaseRequest, [{
    key: "AmountSummary",
    value: function AmountSummary() {
      return "Purchase: ".concat((this.PurchaseAmount / 100.0).toFixed(2), "; \n            Tip: ").concat((this.TipAmount / 100.0).toFixed(2), "; \n            Cashout: ").concat((this.CashoutAmount / 100.0).toFixed(2), ";");
    }
  }, {
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        pos_ref_id: this.PosRefId,
        purchase_amount: this.PurchaseAmount,
        tip_amount: this.TipAmount,
        cash_amount: this.CashoutAmount,
        prompt_for_cashout: this.PromptForCashout,
        surcharge_amount: this.SurchargeAmount
      };
      this.Config.addReceiptConfig(data);
      this.Options.AddOptions(data);
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("prchs"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PurchaseRequest, data, true);
    }
  }]);

  return PurchaseRequest;
}();
var PurchaseResponse =
/*#__PURE__*/
function () {
  function PurchaseResponse(m) {
    _classCallCheck(this, PurchaseResponse);

    this._m = m;
    this.RequestId = m.Id;
    this.PosRefId = m.Data.pos_ref_id;
    this.SchemeName = m.Data.scheme_name;
    this.SchemeAppName = m.Data.scheme_name;
    this.Success = m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
  }

  _createClass(PurchaseResponse, [{
    key: "GetRRN",
    value: function GetRRN() {
      return this._m.Data.rrn;
    }
  }, {
    key: "GetPurchaseAmount",
    value: function GetPurchaseAmount() {
      return this._m.Data.purchase_amount;
    }
  }, {
    key: "GetTipAmount",
    value: function GetTipAmount() {
      return this._m.Data.tip_amount;
    }
  }, {
    key: "GetSurchargeAmount",
    value: function GetSurchargeAmount() {
      return this._m.Data.surcharge_amount;
    }
  }, {
    key: "GetCashoutAmount",
    value: function GetCashoutAmount() {
      return this._m.Data.cash_amount;
    }
  }, {
    key: "GetBankNonCashAmount",
    value: function GetBankNonCashAmount() {
      return this._m.Data.bank_noncash_amount;
    }
  }, {
    key: "GetBankCashAmount",
    value: function GetBankCashAmount() {
      return this._m.Data.bank_cash_amount;
    }
  }, {
    key: "GetCustomerReceipt",
    value: function GetCustomerReceipt() {
      return this._m.Data.customer_receipt || "";
    }
  }, {
    key: "GetMerchantReceipt",
    value: function GetMerchantReceipt() {
      return this._m.Data.merchant_receipt || "";
    }
  }, {
    key: "GetResponseText",
    value: function GetResponseText() {
      return this._m.Data.host_response_text || "";
    }
  }, {
    key: "GetResponseCode",
    value: function GetResponseCode() {
      return this._m.Data.host_response_code;
    }
  }, {
    key: "GetTerminalReferenceId",
    value: function GetTerminalReferenceId() {
      return this._m.Data.terminal_ref_id;
    }
  }, {
    key: "GetCardEntry",
    value: function GetCardEntry() {
      return this._m.Data.card_entry;
    }
  }, {
    key: "GetAccountType",
    value: function GetAccountType() {
      return this._m.Data.account_type;
    }
  }, {
    key: "GetAuthCode",
    value: function GetAuthCode() {
      return this._m.Data.auth_code;
    }
  }, {
    key: "GetBankDate",
    value: function GetBankDate() {
      return this._m.Data.bank_date;
    }
  }, {
    key: "GetBankTime",
    value: function GetBankTime() {
      return this._m.Data.bank_time;
    }
  }, {
    key: "GetMaskedPan",
    value: function GetMaskedPan() {
      return this._m.Data.masked_pan;
    }
  }, {
    key: "GetTerminalId",
    value: function GetTerminalId() {
      return this._m.Data.terminal_id;
    }
  }, {
    key: "WasMerchantReceiptPrinted",
    value: function WasMerchantReceiptPrinted() {
      return this._m.Data.merchant_receipt_printed;
    }
  }, {
    key: "WasCustomerReceiptPrinted",
    value: function WasCustomerReceiptPrinted() {
      return this._m.Data.customer_receipt_printed;
    }
  }, {
    key: "GetSettlementDate",
    value: function GetSettlementDate() {
      //"bank_settlement_date":"20042018"
      var dateStr = this._m.Data.bank_settlement_date;
      if (!dateStr) return null;
      return _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].ParseBankDate(dateStr);
    }
  }, {
    key: "GetResponseValue",
    value: function GetResponseValue(attribute) {
      return this._m.Data[attribute];
    }
  }, {
    key: "ToPaymentSummary",
    value: function ToPaymentSummary() {
      return {
        account_type: this.GetAccountType(),
        auth_code: this.GetAuthCode(),
        bank_date: this.GetBankDate(),
        bank_time: this.GetBankTime(),
        host_response_code: this.GetResponseCode(),
        host_response_text: this.GetResponseText(),
        masked_pan: this.GetMaskedPan(),
        purchase_amount: this.GetPurchaseAmount(),
        rrn: this.GetRRN(),
        scheme_name: this.SchemeName,
        terminal_id: this.GetTerminalId(),
        terminal_ref_id: this.GetTerminalReferenceId(),
        tip_amount: this.GetTipAmount(),
        surcharge_amount: this.GetSurchargeAmount()
      };
    }
  }]);

  return PurchaseResponse;
}();
var CancelTransactionRequest =
/*#__PURE__*/
function () {
  function CancelTransactionRequest() {
    _classCallCheck(this, CancelTransactionRequest);
  }

  _createClass(CancelTransactionRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("ctx"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].CancelTransactionRequest, null, true);
    }
  }]);

  return CancelTransactionRequest;
}();
var CancelTransactionResponse =
/*#__PURE__*/
function () {
  function CancelTransactionResponse(m) {
    _classCallCheck(this, CancelTransactionResponse);

    this._m = m;
    this.PosRefId = this._m.Data.pos_ref_id;
    this.Success = this._m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
  }

  _createClass(CancelTransactionResponse, [{
    key: "GetErrorReason",
    value: function GetErrorReason() {
      return this._m.Data.error_reason;
    }
  }, {
    key: "GetErrorDetail",
    value: function GetErrorDetail() {
      return this._m.Data.error_detail;
    }
  }, {
    key: "GetResponseValueWithAttribute",
    value: function GetResponseValueWithAttribute(attribute) {
      return this._m.Data[attribute];
    }
  }]);

  return CancelTransactionResponse;
}();
var GetLastTransactionRequest =
/*#__PURE__*/
function () {
  function GetLastTransactionRequest() {
    _classCallCheck(this, GetLastTransactionRequest);
  }

  _createClass(GetLastTransactionRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("glt"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].GetLastTransactionRequest, null, true);
    }
  }]);

  return GetLastTransactionRequest;
}();
var GetLastTransactionResponse =
/*#__PURE__*/
function () {
  function GetLastTransactionResponse(m) {
    _classCallCheck(this, GetLastTransactionResponse);

    this._m = m;
  }

  _createClass(GetLastTransactionResponse, [{
    key: "WasRetrievedSuccessfully",
    value: function WasRetrievedSuccessfully() {
      // We can't rely on checking "success" flag or "error" fields here,
      // as retrieval may be successful, but the retrieved transaction was a fail.
      // So we check if we got back an ResponseCode.
      // (as opposed to say an operation_in_progress_error)
      return !!this.GetResponseCode();
    }
  }, {
    key: "WasTimeOutOfSyncError",
    value: function WasTimeOutOfSyncError() {
      return this._m.GetError().startsWith("TIME_OUT_OF_SYNC");
    }
  }, {
    key: "WasOperationInProgressError",
    value: function WasOperationInProgressError() {
      return this._m.GetError().startsWith("OPERATION_IN_PROGRESS");
    }
  }, {
    key: "IsWaitingForSignatureResponse",
    value: function IsWaitingForSignatureResponse() {
      return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_SIGNATURE");
    }
  }, {
    key: "IsWaitingForAuthCode",
    value: function IsWaitingForAuthCode() {
      return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_PHONE_AUTH_CODE");
    }
  }, {
    key: "IsStillInProgress",
    value: function IsStillInProgress(posRefId) {
      return this.WasOperationInProgressError() && this.GetPosRefId() == posRefId;
    }
  }, {
    key: "GetSuccessState",
    value: function GetSuccessState() {
      return this._m.GetSuccessState();
    }
  }, {
    key: "WasSuccessfulTx",
    value: function WasSuccessfulTx() {
      return this._m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
    }
  }, {
    key: "GetTxType",
    value: function GetTxType() {
      return this._m.Data.transaction_type;
    }
  }, {
    key: "GetPosRefId",
    value: function GetPosRefId() {
      return this._m.Data.pos_ref_id;
    }
  }, {
    key: "GetSchemeApp",
    value: function GetSchemeApp() {
      return this._m.Data.scheme_name;
    }
  }, {
    key: "GetSchemeName",
    value: function GetSchemeName() {
      return this._m.Data.scheme_name;
    }
  }, {
    key: "GetAmount",
    value: function GetAmount() {
      return this._m.Data.amount_purchase;
    }
  }, {
    key: "GetTransactionAmount",
    value: function GetTransactionAmount() {
      return this._m.Data.amount_transaction_type;
    }
  }, {
    key: "GetBankDateTimeString",
    value: function GetBankDateTimeString() {
      var ds = this._m.Data.bank_date + this._m.Data.bank_time;
      return ds;
    }
  }, {
    key: "GetRRN",
    value: function GetRRN() {
      return this._m.Data.rrn;
    }
  }, {
    key: "GetResponseText",
    value: function GetResponseText() {
      return this._m.Data.host_response_text | "";
    }
  }, {
    key: "GetResponseCode",
    value: function GetResponseCode() {
      return this._m.Data.host_response_code;
    } // <summary>
    // There is a bug, VSV-920, whereby the customer_receipt is missing from a glt response.
    // The current recommendation is to use the merchant receipt in place of it if required.
    // This method modifies the underlying incoming message data by copying
    // the merchant receipt into the customer receipt only if there 
    // is a merchant_receipt and there is not a customer_receipt.   
    // </summary>

  }, {
    key: "CopyMerchantReceiptToCustomerReceipt",
    value: function CopyMerchantReceiptToCustomerReceipt() {
      var cr = this._m.Data.customer_receipt;
      var mr = this._m.Data.merchant_receipt;

      if (mr != "" && !cr) {
        this._m.Data.customer_receipt = mr;
      }
    }
  }]);

  return GetLastTransactionResponse;
}();
var RefundRequest =
/*#__PURE__*/
function () {
  function RefundRequest(amountCents, posRefId) {
    _classCallCheck(this, RefundRequest);

    this.AmountCents = amountCents;
    this.Id = _RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("refund");
    this.PosRefId = posRefId;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["SpiConfig"]();
    this.Options = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["TransactionOptions"]();
  }

  _createClass(RefundRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        refund_amount: this.AmountCents,
        pos_ref_id: this.PosRefId
      };
      this.Config.addReceiptConfig(data);
      this.Options.AddOptions(data);
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("refund"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].RefundRequest, data, true);
    }
  }]);

  return RefundRequest;
}();
var RefundResponse =
/*#__PURE__*/
function () {
  function RefundResponse(m) {
    _classCallCheck(this, RefundResponse);

    this._m = m;
    this.RequestId = m.Id;
    this.PosRefId = m.Data.pos_ref_id;
    this.SchemeName = m.Data.scheme_name;
    this.SchemeAppName = m.Data.scheme_name;
    this.Success = m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
  }

  _createClass(RefundResponse, [{
    key: "GetRefundAmount",
    value: function GetRefundAmount() {
      return this._m.Data.refund_amount;
    }
  }, {
    key: "GetRRN",
    value: function GetRRN() {
      return this._m.Data.rrn;
    }
  }, {
    key: "GetCustomerReceipt",
    value: function GetCustomerReceipt() {
      return this._m.Data.customer_receipt || "";
    }
  }, {
    key: "GetMerchantReceipt",
    value: function GetMerchantReceipt() {
      return this._m.Data.merchant_receipt;
    }
  }, {
    key: "GetResponseText",
    value: function GetResponseText() {
      return this._m.Data.host_response_text || "";
    }
  }, {
    key: "GetResponseCode",
    value: function GetResponseCode() {
      return this._m.Data.host_response_code || "";
    }
  }, {
    key: "GetTerminalReferenceId",
    value: function GetTerminalReferenceId() {
      return this._m.Data.terminal_ref_id || "";
    }
  }, {
    key: "GetCardEntry",
    value: function GetCardEntry() {
      return this._m.Data.card_entry || "";
    }
  }, {
    key: "GetAccountType",
    value: function GetAccountType() {
      return this._m.Data.account_type || "";
    }
  }, {
    key: "GetAuthCode",
    value: function GetAuthCode() {
      return this._m.Data.auth_code || "";
    }
  }, {
    key: "GetBankDate",
    value: function GetBankDate() {
      return this._m.Data.bank_date || "";
    }
  }, {
    key: "GetBankTime",
    value: function GetBankTime() {
      return this._m.Data.bank_time || "";
    }
  }, {
    key: "GetMaskedPan",
    value: function GetMaskedPan() {
      return this._m.Data.masked_pan || "";
    }
  }, {
    key: "GetTerminalId",
    value: function GetTerminalId() {
      return this._m.Data.terminal_id || "";
    }
  }, {
    key: "WasMerchantReceiptPrinted",
    value: function WasMerchantReceiptPrinted() {
      return this._m.Data.merchant_receipt_printed;
    }
  }, {
    key: "WasCustomerReceiptPrinted",
    value: function WasCustomerReceiptPrinted() {
      return this._m.Data.customer_receipt_printed;
    }
  }, {
    key: "GetSettlementDate",
    value: function GetSettlementDate() {
      //"bank_settlement_date":"20042018"
      var dateStr = this._m.Data.bank_settlement_date;
      if (!dateStr) return null;
      return _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].ParseBankDate(dateStr);
    }
  }, {
    key: "GetResponseValue",
    value: function GetResponseValue(attribute) {
      return this._m.Data[attribute];
    }
  }]);

  return RefundResponse;
}();
var SignatureRequired =
/*#__PURE__*/
function () {
  function SignatureRequired(m) {
    _classCallCheck(this, SignatureRequired);

    this.RequestId = m.Id;
    this.PosRefId = m.Data.pos_ref_id;
    this._receiptToSign = m.Data.merchant_receipt;
  }

  _createClass(SignatureRequired, [{
    key: "SignatureRequired",
    value: function SignatureRequired(posRefId, requestId, receiptToSign) {
      this.RequestId = requestId;
      this.PosRefId = posRefId;
      this._receiptToSign = receiptToSign;
    }
  }, {
    key: "GetMerchantReceipt",
    value: function GetMerchantReceipt() {
      return this._receiptToSign;
    }
  }]);

  return SignatureRequired;
}();
var SignatureDecline =
/*#__PURE__*/
function () {
  function SignatureDecline(posRefId) {
    _classCallCheck(this, SignatureDecline);

    this.PosRefId = posRefId;
  }

  _createClass(SignatureDecline, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        pos_ref_id: this.PosRefId
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("sigdec"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SignatureDeclined, data, true);
    }
  }]);

  return SignatureDecline;
}();
var SignatureAccept =
/*#__PURE__*/
function () {
  function SignatureAccept(posRefId) {
    _classCallCheck(this, SignatureAccept);

    this.PosRefId = posRefId;
  }

  _createClass(SignatureAccept, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        pos_ref_id: this.PosRefId
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("sigacc"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SignatureAccepted, data, true);
    }
  }]);

  return SignatureAccept;
}();
var MotoPurchaseRequest =
/*#__PURE__*/
function () {
  function MotoPurchaseRequest(amountCents, posRefId, surchargeAmount) {
    _classCallCheck(this, MotoPurchaseRequest);

    this.PosRefId = posRefId;
    this.PurchaseAmount = amountCents;
    this.SurchargeAmount = surchargeAmount;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["SpiConfig"]();
    this.Options = new _SpiModels__WEBPACK_IMPORTED_MODULE_2__["TransactionOptions"]();
  }

  _createClass(MotoPurchaseRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        pos_ref_id: this.PosRefId,
        purchase_amount: this.PurchaseAmount,
        surcharge_amount: this.SurchargeAmount
      };
      this.Config.addReceiptConfig(data);
      this.Options.AddOptions(data);
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("moto"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].MotoPurchaseRequest, data, true);
    }
  }]);

  return MotoPurchaseRequest;
}();
var MotoPurchaseResponse = function MotoPurchaseResponse(m) {
  _classCallCheck(this, MotoPurchaseResponse);

  this.PurchaseResponse = new PurchaseResponse(m);
  this.PosRefId = PurchaseResponse.PosRefId;
};
var PhoneForAuthRequired =
/*#__PURE__*/
function () {
  function PhoneForAuthRequired() {
    _classCallCheck(this, PhoneForAuthRequired);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 4) {
      this.PosRefId = args[0];
      this.RequestId = args[1];
      this._phoneNumber = args[2];
      this._merchantId = args[3];
    } else if (args.length === 1) {
      this.RequestId = args[0].Id;
      this.PosRefId = args[0].Data.pos_ref_id;
      this._phoneNumber = args[0].Data.auth_centre_phone_number;
      this._merchantId = args[0].Data.merchant_id;
    } else {
      throw new Error('Invalid call sig for Phone auth required class');
    }
  }

  _createClass(PhoneForAuthRequired, [{
    key: "GetPhoneNumber",
    value: function GetPhoneNumber() {
      return this._phoneNumber;
    }
  }, {
    key: "GetMerchantId",
    value: function GetMerchantId() {
      return this._merchantId;
    }
  }]);

  return PhoneForAuthRequired;
}();
var AuthCodeAdvice =
/*#__PURE__*/
function () {
  function AuthCodeAdvice(posRefId, authCode) {
    _classCallCheck(this, AuthCodeAdvice);

    this.PosRefId = posRefId;
    this.AuthCode = authCode;
  }

  _createClass(AuthCodeAdvice, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {
        pos_ref_id: this.PosRefId,
        auth_code: this.AuthCode
      };
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](_RequestIdHelper__WEBPACK_IMPORTED_MODULE_1__["RequestIdHelper"].Id("authad"), _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].AuthCodeAdvice, data, true);
    }
  }]);

  return AuthCodeAdvice;
}();

/***/ }),

/***/ "./src/PurchaseHelper.js":
/*!*******************************!*\
  !*** ./src/PurchaseHelper.js ***!
  \*******************************/
/*! exports provided: PurchaseHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseHelper", function() { return PurchaseHelper; });
/* harmony import */ var _Purchase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Purchase */ "./src/Purchase.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var PurchaseHelper =
/*#__PURE__*/
function () {
  function PurchaseHelper() {
    _classCallCheck(this, PurchaseHelper);
  }

  _createClass(PurchaseHelper, null, [{
    key: "CreatePurchaseRequest",
    value: function CreatePurchaseRequest(amountCents, purchaseId) {
      return new _Purchase__WEBPACK_IMPORTED_MODULE_0__["PurchaseRequest"](amountCents, purchaseId);
    }
  }, {
    key: "CreatePurchaseRequestV2",
    value: function CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount) {
      var pr = Object.assign(new _Purchase__WEBPACK_IMPORTED_MODULE_0__["PurchaseRequest"](purchaseAmount, posRefId), {
        CashoutAmount: cashoutAmount,
        TipAmount: tipAmount,
        PromptForCashout: promptForCashout,
        SurchargeAmount: surchargeAmount
      });
      return pr;
    }
  }, {
    key: "CreateRefundRequest",
    value: function CreateRefundRequest(amountCents, purchaseId, isSuppressMerchantPassword) {
      return new _Purchase__WEBPACK_IMPORTED_MODULE_0__["RefundRequest"](amountCents, purchaseId, isSuppressMerchantPassword);
    }
  }]);

  return PurchaseHelper;
}();

/***/ }),

/***/ "./src/RequestIdHelper.js":
/*!********************************!*\
  !*** ./src/RequestIdHelper.js ***!
  \********************************/
/*! exports provided: RequestIdHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestIdHelper", function() { return RequestIdHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __RequestIdHelperCounter = 1;
var RequestIdHelper =
/*#__PURE__*/
function () {
  function RequestIdHelper() {
    _classCallCheck(this, RequestIdHelper);
  }

  _createClass(RequestIdHelper, null, [{
    key: "Id",
    value: function Id(prefix) {
      return prefix + __RequestIdHelperCounter++;
    }
  }]);

  return RequestIdHelper;
}();

/***/ }),

/***/ "./src/Secrets.js":
/*!************************!*\
  !*** ./src/Secrets.js ***!
  \************************/
/*! exports provided: Secrets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Secrets", function() { return Secrets; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Secrets =
/*#__PURE__*/
function () {
  function Secrets(encKey, hmacKey) {
    _classCallCheck(this, Secrets);

    this.EncKey = encKey;
    this.HmacKey = hmacKey;
  }

  _createClass(Secrets, null, [{
    key: "save",
    value: function save(EncKey, HmacKey) {
      localStorage.setItem('EncKey', EncKey);
      localStorage.setItem('HmacKey', HmacKey);
    }
  }, {
    key: "restore",
    value: function restore() {
      return new Secrets(localStorage.getItem('EncKey'), localStorage.getItem('HmacKey'));
    }
  }, {
    key: "isSaved",
    value: function isSaved() {
      return localStorage.getItem('EncKey') && localStorage.getItem('HmacKey');
    }
  }, {
    key: "Reset",
    value: function Reset() {
      localStorage.removeItem('EncKey');
      localStorage.removeItem('HmacKey');
    }
  }]);

  return Secrets;
}();

/***/ }),

/***/ "./src/Service/DeviceService.js":
/*!**************************************!*\
  !*** ./src/Service/DeviceService.js ***!
  \**************************************/
/*! exports provided: DeviceAddressStatus, DeviceAddressService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceAddressStatus", function() { return DeviceAddressStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceAddressService", function() { return DeviceAddressService; });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeviceAddressStatus = function DeviceAddressStatus(address, lastUpdated) {
  _classCallCheck(this, DeviceAddressStatus);

  this.Address = address;
  this.LastUpdated = lastUpdated;
};
var DeviceAddressService =
/*#__PURE__*/
function () {
  function DeviceAddressService() {
    _classCallCheck(this, DeviceAddressService);
  }

  _createClass(DeviceAddressService, [{
    key: "RetrieveService",
    value: function RetrieveService(serialNumber) {
      var apiKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'spi-sample-pos1';
      var isTestMode = arguments.length > 2 ? arguments[2] : undefined;
      // TODO: Replace with sandbox and prod urls
      var deviceAddressUri = isTestMode ? "/api/v1/ip?serial=".concat(serialNumber) : "https://device-address-api-dev.nonprod-wbc.msp.assemblypayments.com/v1/".concat(serialNumber, "/ip");
      return fetch(deviceAddressUri, {
        method: 'GET',
        headers: {
          "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
        }
      }).then(function (response) {
        return response.json();
      }).catch(function (response) {
        console.error("Status code ".concat(response.StatusCode, " received from ").concat(deviceAddressUri, " - Exception ").concat(response.ErrorException));
      });
    }
  }]);

  return DeviceAddressService;
}();

/***/ }),

/***/ "./src/Settlement.js":
/*!***************************!*\
  !*** ./src/Settlement.js ***!
  \***************************/
/*! exports provided: SettleRequest, Settlement, SchemeSettlementEntry, SettlementEnquiryRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettleRequest", function() { return SettleRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settlement", function() { return Settlement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemeSettlementEntry", function() { return SchemeSettlementEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettlementEnquiryRequest", function() { return SettlementEnquiryRequest; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var SettleRequest =
/*#__PURE__*/
function () {
  function SettleRequest(id) {
    _classCallCheck(this, SettleRequest);

    this.Id = id;
  }

  _createClass(SettleRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](this.Id, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SettleRequest, null, true);
    }
  }]);

  return SettleRequest;
}();
var Settlement =
/*#__PURE__*/
function () {
  function Settlement(m) {
    _classCallCheck(this, Settlement);

    this.RequestId = m.Id;
    this._m = m;
    this.Success = m.GetSuccessState() == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Success;
  }

  _createClass(Settlement, [{
    key: "GetSettleByAcquirerCount",
    value: function GetSettleByAcquirerCount() {
      return this._m.Data.accumulated_settle_by_acquirer_count;
    }
  }, {
    key: "GetSettleByAcquirerValue",
    value: function GetSettleByAcquirerValue() {
      return this._m.Data.accumulated_settle_by_acquirer_value;
    }
  }, {
    key: "GetTotalCount",
    value: function GetTotalCount() {
      return this._m.Data.accumulated_total_count;
    }
  }, {
    key: "GetTotalValue",
    value: function GetTotalValue() {
      return this._m.Data.accumulated_total_value;
    }
  }, {
    key: "GetPeriodStartTime",
    value: function GetPeriodStartTime() {
      var timeStr = this._m.Data.settlement_period_start_time; // "05:00"

      var dateStr = this._m.Data.settlement_period_start_date; // "05Oct17"

      return _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].ParseBankDateTimeStr(dateStr, timeStr);
    }
  }, {
    key: "GetPeriodEndTime",
    value: function GetPeriodEndTime() {
      var timeStr = this._m.Data.settlement_period_end_time; // "05:00"

      var dateStr = this._m.Data.settlement_period_end_date; // "05Oct17"

      return _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].ParseBankDateTimeStr(dateStr, timeStr);
    }
  }, {
    key: "GetTriggeredTime",
    value: function GetTriggeredTime() {
      var timeStr = this._m.Data.settlement_triggered_time; // "05:00:45"

      var dateStr = this._m.Data.settlement_triggered_date; // "05Oct17"

      return _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].ParseBankDateTimeStr(dateStr, timeStr);
    }
  }, {
    key: "GetResponseText",
    value: function GetResponseText() {
      return this._m.Data.host_response_text;
    }
  }, {
    key: "GetReceipt",
    value: function GetReceipt() {
      return this._m.Data.merchant_receipt;
    }
  }, {
    key: "GetTransactionRange",
    value: function GetTransactionRange() {
      return this._m.Data.transaction_range;
    }
  }, {
    key: "GetTerminalId",
    value: function GetTerminalId() {
      return this._m.Data.terminal_id;
    }
  }, {
    key: "GetSchemeSettlementEntries",
    value: function GetSchemeSettlementEntries() {
      var schemes = this._m.Data.schemes;
      if (!schemes) return [];
      return schemes.map(function (scheme) {
        return new SchemeSettlementEntry(scheme);
      });
    }
  }]);

  return Settlement;
}();
var SchemeSettlementEntry =
/*#__PURE__*/
function () {
  // SchemeSettlementEntry(string schemeName, bool settleByAcquirer, int totalCount, int totalValue)
  // SchemeSettlementEntry(Object schemeObj)
  function SchemeSettlementEntry() {
    _classCallCheck(this, SchemeSettlementEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      this.SchemeName = args[0].scheme_name;
      this.SettleByAcquirer = args[0].settle_by_acquirer.toLowerCase() == "yes";
      this.TotalValue = parseInt(args[0].total_value, 10);
      this.TotalCount = parseInt(args[0].total_count, 10);
    } else if (args.length === 4) {
      this.SchemeName = args[0];
      this.SettleByAcquirer = args[1];
      this.TotalCount = args[2];
      this.TotalValue = args[3];
    }
  }

  _createClass(SchemeSettlementEntry, [{
    key: "ToString",
    value: function ToString() {
      return "SchemeName: ".concat(this.SchemeName, ", SettleByAcquirer: ").concat(this.SettleByAcquirer, ", TotalCount: ").concat(this.TotalCount, ", TotalValue: ").concat(this.TotalValue);
    }
  }]);

  return SchemeSettlementEntry;
}();
var SettlementEnquiryRequest =
/*#__PURE__*/
function () {
  function SettlementEnquiryRequest(id) {
    _classCallCheck(this, SettlementEnquiryRequest);

    this.Id = id;
  }

  _createClass(SettlementEnquiryRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      return new _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"](this.Id, _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SettlementEnquiryRequest, null, true);
    }
  }]);

  return SettlementEnquiryRequest;
}();

/***/ }),

/***/ "./src/Spi.js":
/*!********************!*\
  !*** ./src/Spi.js ***!
  \********************/
/*! exports provided: default, Spi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Spi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spi", function() { return Spi; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
/* harmony import */ var _SpiModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpiModels */ "./src/SpiModels.js");
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Connection */ "./src/Connection.js");
/* harmony import */ var _SpiPayAtTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SpiPayAtTable */ "./src/SpiPayAtTable.js");
/* harmony import */ var _PayAtTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PayAtTable */ "./src/PayAtTable.js");
/* harmony import */ var _SpiPreauth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SpiPreauth */ "./src/SpiPreauth.js");
/* harmony import */ var _Pairing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Pairing */ "./src/Pairing.js");
/* harmony import */ var _PurchaseHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PurchaseHelper */ "./src/PurchaseHelper.js");
/* harmony import */ var _KeyRollingHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KeyRollingHelper */ "./src/KeyRollingHelper.js");
/* harmony import */ var _PingHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PingHelper */ "./src/PingHelper.js");
/* harmony import */ var _Purchase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Purchase */ "./src/Purchase.js");
/* harmony import */ var _Service_DeviceService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Service/DeviceService */ "./src/Service/DeviceService.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }














var SPI_VERSION = '2.4.0';

var Spi =
/*#__PURE__*/
function () {
  _createClass(Spi, [{
    key: "CurrentStatus",
    get: function get() {
      return this._currentStatus;
    },
    set: function set(value) {
      if (this._currentStatus === value) {
        return;
      }

      this._currentStatus = value;
      document.dispatchEvent(new CustomEvent('StatusChanged', {
        detail: value
      }));
    }
  }]);

  function Spi(posId, serialNumber, eftposAddress, secrets) {
    _classCallCheck(this, Spi);

    this._posId = posId;
    this._serialNumber = serialNumber;
    this._secrets = secrets;
    this._eftposAddress = "ws://" + eftposAddress;
    this._log = console;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiConfig"]();
    this.CurrentDeviceStatus = null;
    this._deviceApiKey = null;
    this._inTestMode = false;
    this._autoAddressResolutionEnabled = false; // Our stamp for signing outgoing messages

    this._spiMessageStamp = new _Messages__WEBPACK_IMPORTED_MODULE_0__["MessageStamp"](this._posId, this._secrets, 0); // We will maintain some state

    this._mostRecentPingSent = null;
    this._mostRecentPongReceived = null;
    this._missedPongsCount = 0;
    this._retriesSinceLastDeviceAddressResolution = 0;
    this._mostRecentLoginResponse = null;
    this._pongTimeout = 5000;
    this._pingFrequency = 18000;
    this._readyToTransact = null;
    this._periodicPingThread = null;
    this._txMonitorCheckFrequency = 1000;
    this._checkOnTxFrequency = 20000;
    this._maxWaitForCancelTx = 10000;
    this._sleepBeforeReconnectMs = 5000;
    this._missedPongsToDisconnect = 2;
    this._retriesBeforeResolvingDeviceAddress = 5;
    this.CurrentFlow = null;
    this.CurrentPairingFlowState = null;
    this.CurrentTxFlowState = null;
  }

  _createClass(Spi, [{
    key: "EnablePayAtTable",
    value: function EnablePayAtTable() {
      this._spiPat = new _SpiPayAtTable__WEBPACK_IMPORTED_MODULE_4__["SpiPayAtTable"](this);
      return this._spiPat;
    }
  }, {
    key: "EnablePreauth",
    value: function EnablePreauth() {
      this._spiPreauth = new _SpiPreauth__WEBPACK_IMPORTED_MODULE_6__["SpiPreauth"](this);
      return this._spiPreauth;
    }
  }, {
    key: "Start",
    value: function Start() {
      this._resetConn();

      this._startTransactionMonitoringThread();

      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle;

      if (this._secrets != null) {
        this._log.info("Starting in Paired State");

        this._currentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnecting;

        this._conn.Connect(); // This is non-blocking

      } else {
        this._log.info("Starting in Unpaired State");

        this._currentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired;
      }
    } /// <summary>
    /// Set the api key used for auto address discovery feature
    /// </summary>
    /// <returns></returns>

  }, {
    key: "SetDeviceApiKey",
    value: function SetDeviceApiKey(deviceApiKey) {
      this._deviceApiKey = deviceApiKey;
      return true;
    } /// <summary>
    /// Allows you to set the serial number of the Eftpos
    /// </summary>

  }, {
    key: "SetSerialNumber",
    value: function SetSerialNumber(serialNumber) {
      if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return false;
      if (this._autoAddressResolutionEnabled && this.HasSerialNumberChanged(serialNumber)) this._autoResolveEftposAddress();
      this._serialNumber = serialNumber;
      return true;
    } /// <summary>
    /// Allows you to set the auto address discovery feature. 
    /// </summary>
    /// <returns></returns>

  }, {
    key: "SetAutoAddressResolution",
    value: function SetAutoAddressResolution(autoAddressResolution) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnected) return false;

      if (autoAddressResolution && !this._autoAddressResolutionEnabled) {
        // we're turning it on
        this._autoResolveEftposAddress();
      }

      this._autoAddressResolutionEnabled = autoAddressResolution;
      return true;
    } /// <summary>
    /// Call this method to set the client library test mode.
    /// Set it to true only while you are developing the integration. 
    /// It defaults to false. For a real merchant, always leave it set to false. 
    /// </summary>
    /// <param name="testMode"></param>
    /// <returns></returns>

  }, {
    key: "SetTestMode",
    value: function SetTestMode(testMode) {
      if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return false;

      if (testMode != this._inTestMode) {
        // we're changing mode
        this._autoResolveEftposAddress();
      }

      this._inTestMode = testMode;
      return true;
    } // <summary>
    // Allows you to set the PosId which identifies this instance of your POS.
    // Can only be called in thge Unpaired state. 
    // </summary>

  }, {
    key: "SetPosId",
    value: function SetPosId(posId) {
      if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return false;
      this._posId = posId;
      this._spiMessageStamp.PosId = posId;
      return true;
    } // <summary>
    // Allows you to set the PinPad address. Sometimes the PinPad might change IP address 
    // (we recommend reserving static IPs if possible).
    // Either way you need to allow your User to enter the IP address of the PinPad.
    // </summary>

  }, {
    key: "SetEftposAddress",
    value: function SetEftposAddress(address) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnected || this._autoAddressResolutionEnabled) {
        return false;
      }

      this._eftposAddress = "ws://" + address;
      this._conn.Address = this._eftposAddress;
      return true;
    }
  }, {
    key: "AckFlowEndedAndBackToIdle",
    // <summary>
    // Call this one when a flow is finished and you want to go back to idle state.
    // Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
    // finished, or that transaction is finished.
    // When true, you can dismiss the flow screen and show back the idle screen.
    // </summary>
    // <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>
    value: function AckFlowEndedAndBackToIdle() {
      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return true; // already idle

      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Pairing && this.CurrentPairingFlowState.Finished) {
        this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle;
        return true;
      }

      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction && this.CurrentTxFlowState.Finished) {
        this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle;
        return true;
      }

      return false;
    } // endregion
    // <summary>
    // This will connect to the Eftpos and start the pairing process.
    // Only call this if you are in the Unpaired state.
    // Subscribe to the PairingFlowStateChanged event to get updates on the pairing process.
    // </summary>
    // <returns>Whether pairing has initiated or not</returns>

  }, {
    key: "Pair",
    value: function Pair() {
      if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        this._log.warn("Tried to Pair but we're already so.");

        return false;
      }

      if (!this._posId || !this._eftposAddress) {
        this._log.warn("Tried to Pair but missing posId or updatedEftposAddress");

        return false;
      }

      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Pairing;
      this.CurrentPairingFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["PairingFlowState"]({
        Successful: false,
        Finished: false,
        Message: "Connecting...",
        AwaitingCheckFromEftpos: false,
        AwaitingCheckFromPos: false,
        ConfirmationCode: ""
      });
      document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
        detail: this.CurrentPairingFlowState
      }));

      this._conn.Connect(); // Non-Blocking


      return true;
    } // <summary>
    // Call this when your user clicks yes to confirm the pairing code on your 
    // screen matches the one on the Eftpos.
    // </summary>

  }, {
    key: "PairingConfirmCode",
    value: function PairingConfirmCode() {
      if (!this.CurrentPairingFlowState.AwaitingCheckFromPos) {
        // We weren't expecting this
        return;
      }

      this.CurrentPairingFlowState.AwaitingCheckFromPos = false;

      if (this.CurrentPairingFlowState.AwaitingCheckFromEftpos) {
        // But we are still waiting for confirmation from Eftpos side.
        this._log.info("Pair Code Confirmed from POS side, but am still waiting for confirmation from Eftpos.");

        this.CurrentPairingFlowState.Message = "Click YES on EFTPOS if code is: " + this.CurrentPairingFlowState.ConfirmationCode;
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
          detail: this.CurrentPairingFlowState
        }));
      } else {
        // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
        this._log.info("Pair Code Confirmed from POS side, and was already confirmed from Eftpos side. Pairing finalised.");

        this._onPairingSuccess();

        this._onReadyToTransact();
      }
    } // <summary>
    // Call this if your user clicks CANCEL or NO during the pairing process.
    // </summary>

  }, {
    key: "PairingCancel",
    value: function PairingCancel() {
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Pairing || this.CurrentPairingFlowState.Finished) {
        return;
      }

      if (this.CurrentPairingFlowState.AwaitingCheckFromPos && !this.CurrentPairingFlowState.AwaitingCheckFromEftpos) {
        // This means that the Eftpos already thinks it's paired.
        // Let's tell it to drop keys
        this._send(new _Pairing__WEBPACK_IMPORTED_MODULE_7__["DropKeysRequest"]().ToMessage());
      }

      this._onPairingFailed();
    } // <summary>
    // Call this when your uses clicks the Unpair button.
    // This will disconnect from the Eftpos and forget the secrets.
    // The CurrentState is then changed to Unpaired.
    // Call this only if you are not yet in the Unpaired state.
    // </summary>

  }, {
    key: "Unpair",
    value: function Unpair() {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        return false;
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) {
        return false;
      } // Best effort letting the eftpos know that we're dropping the keys, so it can drop them as well.


      this._send(new _Pairing__WEBPACK_IMPORTED_MODULE_7__["DropKeysRequest"]().ToMessage());

      this._doUnpair();

      return true;
    } // endregion
    // region Transaction Methods
    // <summary>
    // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your purchase.</param>
    // <param name="amountCents">Amount in Cents to charge</param>
    // <returns>InitiateTxResult</returns>

  }, {
    key: "InitiatePurchaseTx",
    value: function InitiatePurchaseTx(posRefId, amountCents) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      }

      var purchaseRequest = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_8__["PurchaseHelper"].CreatePurchaseRequest(amountCents, posRefId);
      purchaseRequest.Config = this.Config;
      var purchaseMsg = purchaseRequest.ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.Purchase, amountCents, purchaseMsg, "Waiting for EFTPOS connection to make payment request for ".concat(amountCents / 100.0));

      if (this._send(purchaseMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for ".concat(amountCents / 100.0));
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Purchase Initiated");
    } // <summary>
    // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // <para>Tip and cashout are not allowed simultaneously.</para>
    // </summary>
    // <param name="posRefId">An Unique Identifier for your Order/Purchase</param>
    // <param name="purchaseAmount">The Purchase Amount in Cents.</param>
    // <param name="tipAmount">The Tip Amount in Cents</param>
    // <param name="cashoutAmount">The Cashout Amount in Cents</param>
    // <param name="promptForCashout">Whether to prompt your customer for cashout on the Eftpos</param>
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>

  }, {
    key: "InitiatePurchaseTxV2",
    value: function InitiatePurchaseTxV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var surchargeAmount = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (tipAmount > 0 && (cashoutAmount > 0 || promptForCashout)) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Cannot Accept Tips and Cashout at the same time.");
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      var purchase = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_8__["PurchaseHelper"].CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount);
      purchase.Config = this.Config;
      purchase.Options = options;
      var purchaseMsg = purchase.ToMessage();
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.Purchase, purchaseAmount, purchaseMsg, "Waiting for EFTPOS connection to make payment request. ".concat(purchase.AmountSummary()));

      if (this._send(purchaseMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for ".concat(purchase.AmountSummary()));
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Purchase Initiated");
    } // <summary>
    // Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your refund.</param>
    // <param name="amountCents">Amount in Cents to charge</param>
    // <param name="isSuppressMerchantPassword">Merchant Password control in VAA</param>
    // <returns>InitiateTxResult</returns>

  }, {
    key: "InitiateRefundTx",
    value: function InitiateRefundTx(posRefId, amountCents) {
      var isSuppressMerchantPassword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      }

      var refundRequest = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_8__["PurchaseHelper"].CreateRefundRequest(amountCents, posRefId, isSuppressMerchantPassword);
      refundRequest.Config = this.Config;
      var refundMsg = refundRequest.ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.Refund, amountCents, refundMsg, "Waiting for EFTPOS connection to make refund request for ".concat((amountCents / 100.0).toFixed(2)));

      if (this._send(refundMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to refund ".concat((amountCents / 100.0).toFixed(2)));
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Refund Initiated");
    } // <summary>
    // Let the EFTPOS know whether merchant accepted or declined the signature
    // </summary>
    // <param name="accepted">whether merchant accepted the signature from customer or not</param>

  }, {
    key: "AcceptSignature",
    value: function AcceptSignature(accepted) {
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingSignatureCheck) {
        this._log.info("Asked to accept signature but I was not waiting for one.");

        return new MidTxResult(false, "Asked to accept signature but I was not waiting for one.");
      }

      this.CurrentTxFlowState.SignatureResponded(accepted ? "Accepting Signature..." : "Declining Signature...");
      var sigReqMsg = this.CurrentTxFlowState.SignatureRequiredMessage;

      this._send(accepted ? new SignatureAccept(this.CurrentTxFlowState.PosRefId).ToMessage() : new SignatureDecline(this.CurrentTxFlowState.PosRefId).ToMessage());

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new MidTxResult(true, "");
    } // <summary>
    // Submit the Code obtained by your user when phoning for auth. 
    // It will return immediately to tell you whether the code has a valid format or not. 
    // If valid==true is returned, no need to do anything else. Expect updates via standard callback.
    // If valid==false is returned, you can show your user the accompanying message, and invite them to enter another code. 
    // </summary>
    // <param name="authCode">The code obtained by your user from the merchant call centre. It should be a 6-character alpha-numeric value.</param>
    // <returns>Whether code has a valid format or not.</returns>

  }, {
    key: "SubmitAuthCode",
    value: function SubmitAuthCode(authCode) {
      if (authCode.length != 6) {
        return new SubmitAuthCodeResult(false, "Not a 6-digit code.");
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingPhoneForAuth) {
        this._log.info("Asked to send auth code but I was not waiting for one.");

        return new SubmitAuthCodeResult(false, "Was not waiting for one.");
      }

      this.CurrentTxFlowState.AuthCodeSent("Submitting Auth Code ".concat(authCode));

      this._send(new AuthCodeAdvice(this.CurrentTxFlowState.PosRefId, authCode).ToMessage());

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new SubmitAuthCodeResult(true, "Valid Code.");
    } // <summary>
    // Attempts to cancel a Transaction. 
    // Be subscribed to TxFlowStateChanged event to see how it goes.
    // Wait for the transaction to be finished and then see whether cancellation was successful or not.
    // </summary>
    // <returns>MidTxResult - false only if you called it in the wrong state</returns>

  }, {
    key: "CancelTransaction",
    value: function CancelTransaction() {
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished) {
        this._log.info("Asked to cancel transaction but I was not in the middle of one.");

        return new MidTxResult(false, "Asked to cancel transaction but I was not in the middle of one.");
      } // TH-1C, TH-3C - Merchant pressed cancel


      if (this.CurrentTxFlowState.RequestSent) {
        var cancelReq = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["CancelTransactionRequest"]();
        this.CurrentTxFlowState.Cancelling("Attempting to Cancel Transaction...");

        this._send(cancelReq.ToMessage());
      } else {
        // We Had Not Even Sent Request Yet. Consider as known failed.
        this.CurrentTxFlowState.Failed(null, "Transaction Cancelled. Request Had not even been sent yet.");
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new MidTxResult(true, "");
    } // <summary>
    // Initiates a cashout only transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents to cash out</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>

  }, {
    key: "InitiateCashoutOnlyTx",
    value: function InitiateCashoutOnlyTx(posRefId, amountCents) {
      var surchargeAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      var cashoutOnlyRequest = new CashoutOnlyRequest(amountCents, posRefId, surchargeAmount);
      cashoutOnlyRequest.Config = this.Config;
      var cashoutMsg = cashoutOnlyRequest.ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.CashoutOnly, amountCents, cashoutMsg, "Waiting for EFTPOS connection to send cashout request for ".concat((amountCents / 100).toFixed(2)));

      if (this._send(cashoutMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to do cashout for ".concat((amountCents / 100).toFixed(2)));
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Cashout Initiated");
    } // <summary>
    // Initiates a Mail Order / Telephone Order Purchase Transaction
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>

  }, {
    key: "InitiateMotoPurchaseTx",
    value: function InitiateMotoPurchaseTx(posRefId, amountCents) {
      var surchargeAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      var motoPurchaseRequest = new MotoPurchaseRequest(amountCents, posRefId, surchargeAmount);
      motoPurchaseRequest.Config = this.Config;
      var cashoutMsg = motoPurchaseRequest.ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.MOTO, amountCents, cashoutMsg, "Waiting for EFTPOS connection to send MOTO request for ".concat((amountCents / 100).toFixed(2)));

      if (this._send(cashoutMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS do MOTO for ".concat((amountCents / 100).toFixed(2)));
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "MOTO Initiated");
    } // <summary>
    // Initiates a settlement transaction.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>

  }, {
    key: "InitiateSettleTx",
    value: function InitiateSettleTx(posRefId) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      }

      var settleRequestMsg = new SettleRequest(_RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__["RequestIdHelper"].Id("settle")).ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.Settle, 0, settleRequestMsg, "Waiting for EFTPOS connection to make a settle request");

      if (this._send(settleRequestMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to settle.");
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Settle Initiated");
    } // <summary>
    // </summary>

  }, {
    key: "InitiateSettlementEnquiry",
    value: function InitiateSettlementEnquiry(posRefId) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      var stlEnqMsg = new SettlementEnquiryRequest(_RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__["RequestIdHelper"].Id("stlenq")).ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.SettlementEnquiry, 0, stlEnqMsg, "Waiting for EFTPOS connection to make a settlement enquiry");

      if (this._send(stlEnqMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to make a settlement enquiry.");
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Settle Initiated");
    } // <summary>
    // Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
    // that was processed by the Eftpos.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>

  }, {
    key: "InitiateGetLastTx",
    value: function InitiateGetLastTx() {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      }

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) {
        return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      }

      var gltRequestMsg = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["GetLastTransactionRequest"]().ToMessage();
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      var posRefId = gltRequestMsg.Id; // GetLastTx is not trying to get anything specific back. So we just use the message id.

      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, TransactionType.GetLastTransaction, 0, gltRequestMsg, "Waiting for EFTPOS connection to make a Get-Last-Transaction request.");

      if (this._send(gltRequestMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS for last transaction.");
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "GLT Initiated");
    } // <summary>
    // This is useful to recover from your POS crashing in the middle of a transaction.
    // When you restart your POS, if you had saved enough state, you can call this method to recover the client library state.
    // You need to have the posRefId that you passed in with the original transaction, and the transaction type.
    // This method will return immediately whether recovery has started or not.
    // If recovery has started, you need to bring up the transaction modal to your user a be listening to TxFlowStateChanged.
    // </summary>
    // <param name="posRefId">The is that you had assigned to the transaction that you are trying to recover.</param>
    // <param name="txType">The transaction type.</param>
    // <returns></returns>

  }, {
    key: "InitiateRecovery",
    value: function InitiateRecovery(posRefId, txType) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      this.CurrentFlow = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction;
      var gltRequestMsg = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["GetLastTransactionRequest"]().ToMessage();
      this.CurrentTxFlowState = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, txType, 0, gltRequestMsg, "Waiting for EFTPOS connection to attempt recovery.");

      if (this._send(gltRequestMsg)) {
        this.CurrentTxFlowState.Sent("Asked EFTPOS to recover state.");
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Recovery Initiated");
    } // <summary>
    // GltMatch attempts to conclude whether a gltResponse matches an expected transaction and returns
    // the outcome. 
    // If Success/Failed is returned, it means that the gtlResponse did match, and that transaction was succesful/failed.
    // If Unknown is returned, it means that the gltResponse does not match the expected transaction. 
    // </summary>
    // <param name="gltResponse">The GetLastTransactionResponse message to check</param>
    // <param name="posRefId">The Reference Id that you passed in with the original request.</param>
    // <returns></returns>

  }, {
    key: "GltMatch",
    value: function GltMatch(gltResponse, posRefId) {
      // Obsolete method call check
      // Old interface: GltMatch(GetLastTransactionResponse gltResponse, TransactionType expectedType, int expectedAmount, DateTime requestTime, string posRefId)
      if (arguments.length <= 2 ? 0 : arguments.length - 2) {
        if ((arguments.length <= 2 ? 0 : arguments.length - 2) == 2) {
          this._log.info("Obsolete method call detected: Use GltMatch(gltResponse, posRefId)");

          return this.GltMatch(gltResponse, arguments.length <= 4 ? undefined : arguments[4]);
        } else {
          throw new Error("Obsolete method call with unknown args: Use GltMatch(GetLastTransactionResponse gltResponse, string posRefId)");
        }
      }

      this._log.info("GLT CHECK: PosRefId: ".concat(posRefId, "->").concat(gltResponse.GetPosRefId()));

      if (!posRefId == gltResponse.GetPosRefId()) {
        return _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Unknown;
      }

      return gltResponse.GetSuccessState();
    } // endregion
    // region Internals for Pairing Flow
    // <summary>
    // Handling the 2nd interaction of the pairing process, i.e. an incoming KeyRequest.
    // </summary>
    // <param name="m">incoming message</param>

  }, {
    key: "_handleKeyRequest",
    value: function _handleKeyRequest(m) {
      this.CurrentPairingFlowState.Message = "Negotiating Pairing...";
      document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
        detail: this.CurrentPairingFlowState
      })); // Use the helper. It takes the incoming request, and generates the secrets and the response.

      var ph = new PairingHelper();
      var result = ph.GenerateSecretsAndKeyResponse(new KeyRequest(m));
      this._secrets = result.Secrets; // we now have secrets, although pairing is not fully finished yet.

      this._spiMessageStamp.Secrets = this._secrets; // updating our stamp with the secrets so can encrypt messages later.

      this._send(result.KeyResponse.ToMessage()); // send the key_response, i.e. interaction 3 of pairing.

    } // <summary>
    // Handling the 4th interaction of the pairing process i.e. an incoming KeyCheck.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleKeyCheck",
    value: function _handleKeyCheck(m) {
      var keyCheck = new KeyCheck(m);
      this.CurrentPairingFlowState.ConfirmationCode = keyCheck.ConfirmationCode;
      this.CurrentPairingFlowState.AwaitingCheckFromEftpos = true;
      this.CurrentPairingFlowState.AwaitingCheckFromPos = true;
      this.CurrentPairingFlowState.Message = "Confirm that the following Code is showing on the Terminal";
      document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
        detail: this.CurrentPairingFlowState
      }));
    } // <summary>
    // Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handlePairResponse",
    value: function _handlePairResponse(m) {
      var pairResp = new PairResponse(m);
      this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;

      if (pairResp.Success) {
        if (this.CurrentPairingFlowState.AwaitingCheckFromPos) {
          // Still Waiting for User to say yes on POS
          this._log.info("Got Pair Confirm from Eftpos, but still waiting for use to confirm from POS.");

          this.CurrentPairingFlowState.Message = "Confirm that the following Code is what the EFTPOS showed";
          document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
            detail: this.CurrentPairingFlowState
          }));
        } else {
          this._log.info("Got Pair Confirm from Eftpos, and already had confirm from POS. Now just waiting for first pong.");

          this._onPairingSuccess();
        } // I need to ping/login even if the pos user has not said yes yet, 
        // because otherwise within 5 seconds connectiong will be dropped by eftpos.


        this._startPeriodicPing();
      } else {
        this._onPairingFailed();
      }
    }
  }, {
    key: "_handleDropKeysAdvice",
    value: function _handleDropKeysAdvice(m) {
      this._log.info("Eftpos was Unpaired. I shall unpair from my end as well.");

      this._doUnpair();
    }
  }, {
    key: "_onPairingSuccess",
    value: function _onPairingSuccess() {
      this.CurrentPairingFlowState.Successful = true;
      this.CurrentPairingFlowState.Finished = true;
      this.CurrentPairingFlowState.Message = "Pairing Successful!";
      this.CurrentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnected;
      document.dispatchEvent(new CustomEvent('SecretsChanged', {
        detail: this._secrets
      }));
      document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
        detail: this.CurrentPairingFlowState
      }));
    }
  }, {
    key: "_onPairingFailed",
    value: function _onPairingFailed() {
      this._secrets = null;
      this._spiMessageStamp.Secrets = null;

      this._conn.Disconnect();

      this.CurrentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired;
      this.CurrentPairingFlowState.Message = "Pairing Failed";
      this.CurrentPairingFlowState.Finished = true;
      this.CurrentPairingFlowState.Successful = false;
      this.CurrentPairingFlowState.AwaitingCheckFromPos = false;
      document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
        detail: this.CurrentPairingFlowState
      }));
    }
  }, {
    key: "_doUnpair",
    value: function _doUnpair() {
      this.CurrentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired;

      this._conn.Disconnect();

      this._secrets = null;
      this._spiMessageStamp.Secrets = null;
      document.dispatchEvent(new CustomEvent('SecretsChanged', {
        detail: this._secrets
      }));
    } // <summary>
    // Sometimes the server asks us to roll our secrets.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleKeyRollingRequest",
    value: function _handleKeyRollingRequest(m) {
      // we calculate the new ones...
      var krRes = _KeyRollingHelper__WEBPACK_IMPORTED_MODULE_9__["KeyRollingHelper"].PerformKeyRolling(m, this._secrets);
      this._secrets = krRes.NewSecrets; // and update our secrets with them

      this._spiMessageStamp.Secrets = this._secrets; // and our stamp

      this._send(krRes.KeyRollingConfirmation); // and we tell the server that all is well.


      document.dispatchEvent(new CustomEvent('SecretsChanged', {
        detail: this._secrets
      }));
    } // <summary>
    // The PinPad server will send us this message when a customer signature is reqired.
    // We need to ask the customer to sign the incoming receipt.
    // And then tell the pinpad whether the signature is ok or not.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleSignatureRequired",
    value: function _handleSignatureRequired(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Signature Required but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      }

      this.CurrentTxFlowState.SignatureRequired(new _Purchase__WEBPACK_IMPORTED_MODULE_11__["SignatureRequired"](m), "Ask Customer to Sign the Receipt");
      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // The PinPad server will send us this message when an auth code is required.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleAuthCodeRequired",
    value: function _handleAuthCodeRequired(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        _log.info("Received Auth Code Required but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      }

      var phoneForAuthRequired = new PhoneForAuthRequired(m);
      var msg = "Auth Code Required. Call ".concat(phoneForAuthRequired.GetPhoneNumber(), " and quote merchant id ").concat(phoneForAuthRequired.GetMerchantId());
      this.CurrentTxFlowState.PhoneForAuthRequired(phoneForAuthRequired, msg);
      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handlePurchaseResponse",
    value: function _handlePurchaseResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Purchase response but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId, "\""));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // The PinPad server will reply to our CashoutOnlyRequest with a CashoutOnlyResponse.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleCashoutOnlyResponse",
    value: function _handleCashoutOnlyResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Cashout Response but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Cashout Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // The PinPad server will reply to our MotoPurchaseRequest with a MotoPurchaseResponse.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleMotoPurchaseResponse",
    value: function _handleMotoPurchaseResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Moto Response but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Moto Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // The PinPad server will reply to our RefundRequest with a RefundResponse.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleRefundResponse",
    value: function _handleRefundResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished | !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Refund response but I was not waiting for this one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // TODO: Handle the Settlement Response received from the PinPad
    // </summary>
    // <param name="m"></param>

  }, {
    key: "HandleSettleResponse",
    value: function HandleSettleResponse(m) {
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished) {
        this._log.info("Received Settle response but I was not waiting for one. ".concat(m.DecryptedJson));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settle Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // Handle the Settlement Enquiry Response received from the PinPad
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleSettlementEnquiryResponse",
    value: function _handleSettlementEnquiryResponse(m) {
      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished) {
        this._log.info("Received Settlement Enquiry response but I was not waiting for one. ".concat(m.DecryptedJson));

        return;
      } // TH-1A, TH-2A


      this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settlement Enquiry Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this.CurrentTxFlowState
      }));
    } // <summary>
    // Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleErrorEvent",
    value: function _handleErrorEvent(m) {
      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction && !this.CurrentTxFlowState.Finished && this.CurrentTxFlowState.AttemptingToCancel && m.GetError() == "NO_TRANSACTION") {
        // TH-2E
        this._log.info("Was trying to cancel a transaction but there is nothing to cancel. Calling GLT to see what's up");

        this._callGetLastTransaction();
      } else {
        this._log.info("Received Error Event But Don't know what to do with it. ".concat(m.DecryptedJson));
      }
    } // <summary>
    // When the PinPad returns to us what the Last Transaction was.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleGetLastTransactionResponse",
    value: function _handleGetLastTransactionResponse(m) {
      var txState = this.CurrentTxFlowState;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || txState.Finished) {
        // We were not in the middle of a transaction, who cares?
        return;
      } // TH-4 We were in the middle of a transaction.
      // Let's attempt recovery. This is step 4 of Transaction Processing Handling


      this._log.info("Got Last Transaction..");

      txState.GotGltResponse();
      var gtlResponse = new GetLastTransactionResponse(m);
      txState.GLTResponsePosRefId = gtlResponse.GetPosRefId();

      if (!gtlResponse.WasRetrievedSuccessfully()) {
        if (gtlResponse.IsStillInProgress(txState.PosRefId)) {
          // TH-4E - Operation In Progress
          if (gtlResponse.IsWaitingForSignatureResponse() && !txState.AwaitingSignatureCheck) {
            this._log.info("Eftpos is waiting for us to send it signature accept/decline, but we were not aware of this. " + "The user can only really decline at this stage as there is no receipt to print for signing.");

            this.CurrentTxFlowState.SignatureRequired(new _Purchase__WEBPACK_IMPORTED_MODULE_11__["SignatureRequired"](txState.PosRefId, m.Id, "MISSING RECEIPT\n DECLINE AND TRY AGAIN."), "Recovered in Signature Required but we don't have receipt. You may Decline then Retry.");
          } else if (gtlResponse.IsWaitingForAuthCode() && !txState.AwaitingPhoneForAuth) {
            this._log.info("Eftpos is waiting for us to send it auth code, but we were not aware of this. " + "We can only cancel the transaction at this stage as we don't have enough information to recover from this.");

            this.CurrentTxFlowState.PhoneForAuthRequired(new PhoneForAuthRequired(txState.PosRefId, m.Id, "UNKNOWN", "UNKNOWN"), "Recovered mid Phone-For-Auth but don't have details. You may Cancel then Retry.");
          } else {
            this._log.info("Operation still in progress... stay waiting."); // No need to publish txFlowStateChanged. Can return;


            return;
          }
        } else if (gtlResponse.WasTimeOutOfSyncError()) {
          // Let's not give up based on a TOOS error.
          // Let's log it, and ignore it. 
          this._log.info("Time-Out-Of-Sync error in Get Last Transaction response. Let's ignore it and we'll try again."); // No need to publish txFlowStateChanged. Can return;


          return;
        } else {
          // TH-4X - Unexpected Response when recovering
          this._log.info("Unexpected Response in Get Last Transaction during - Received posRefId:".concat(gtlResponse.GetPosRefId(), " Error:").concat(m.GetError()));

          txState.UnknownCompleted("Unexpected Error when recovering Transaction Status. Check EFTPOS. ");
        }
      } else {
        if (txState.Type == TransactionType.GetLastTransaction) {
          // THIS WAS A PLAIN GET LAST TRANSACTION REQUEST, NOT FOR RECOVERY PURPOSES.
          this._log.info("Retrieved Last Transaction as asked directly by the user.");

          gtlResponse.CopyMerchantReceiptToCustomerReceipt();
          txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
        } else {
          // TH-4A - Let's try to match the received last transaction against the current transaction
          var successState = this.GltMatch(gtlResponse, txState.PosRefId);

          if (successState == _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Unknown) {
            // TH-4N: Didn't Match our transaction. Consider Unknown State.
            this._log.info("Did not match transaction.");

            txState.UnknownCompleted("Failed to recover Transaction Status. Check EFTPOS. ");
          } else {
            // TH-4Y: We Matched, transaction finished, let's update ourselves
            gtlResponse.CopyMerchantReceiptToCustomerReceipt();
            txState.Completed(successState, m, "Transaction Ended.");
          }
        }
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: txState
      }));
    } //When the transaction cancel response is returned.

  }, {
    key: "_handleCancelTransactionResponse",
    value: function _handleCancelTransactionResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;

      if (this.CurrentFlow != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
        this._log.info("Received Cancel Required but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      }

      var txState = this.CurrentTxFlowState;
      var cancelResponse = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["CancelTransactionResponse"](m);
      if (cancelResponse.Success) return;

      this._log.warn("Failed to cancel transaction: reason=" + cancelResponse.GetErrorReason() + ", detail=" + cancelResponse.GetErrorDetail());

      txState.CancelFailed("Failed to cancel transaction: " + cancelResponse.GetErrorDetail() + ". Check EFTPOS.");
      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: txState
      }));
    }
  }, {
    key: "_startTransactionMonitoringThread",
    value: function _startTransactionMonitoringThread() {
      var _this = this;

      var needsPublishing = false;
      var txState = this.CurrentTxFlowState;

      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction && !txState.Finished) {
        var state = txState;

        if (state.AttemptingToCancel && Date.now() > state.CancelAttemptTime + this._maxWaitForCancelTx) {
          // TH-2T - too long since cancel attempt - Consider unknown
          this._log.info("Been too long waiting for transaction to cancel.");

          txState.UnknownCompleted("Waited long enough for Cancel Transaction result. Check EFTPOS. ");
          needsPublishing = true;
        } else if (state.RequestSent && Date.now() > state.LastStateRequestTime + this._checkOnTxFrequency) {
          // TH-1T, TH-4T - It's been a while since we received an update, let's call a GLT
          this._log.info("Checking on our transaction. Last we asked was at ".concat(state.LastStateRequestTime, "..."));

          txState.CallingGlt();

          this._callGetLastTransaction();
        }
      }

      if (needsPublishing) {
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
          detail: this.CurrentTxFlowState
        }));
      }

      setTimeout(function () {
        return _this._startTransactionMonitoringThread();
      }, this._txMonitorCheckFrequency);
    } // endregion
    // region Internals for Connection Management

  }, {
    key: "_resetConn",
    value: function _resetConn() {
      var _this2 = this;

      // Setup the Connection
      this._conn = new _Connection__WEBPACK_IMPORTED_MODULE_3__["Connection"]();
      this._conn.Address = this._eftposAddress; // Register our Event Handlers

      document.addEventListener('ConnectionStatusChanged', function (e) {
        return _this2._onSpiConnectionStatusChanged(e.detail);
      });
      document.addEventListener('MessageReceived', function (e) {
        return _this2._onSpiMessageReceived(e.detail);
      });
      document.addEventListener('ErrorReceived', function (e) {
        return _this2._onWsErrorReceived(e.detail);
      });
    } // <summary>
    // This method will be called when the connection status changes.
    // You are encouraged to display a PinPad Connection Indicator on the POS screen.
    // </summary>
    // <param name="state"></param>

  }, {
    key: "_onSpiConnectionStatusChanged",
    value: function _onSpiConnectionStatusChanged(state) {
      var _this3 = this;

      switch (state.ConnectionState) {
        case _Connection__WEBPACK_IMPORTED_MODULE_3__["ConnectionState"].Connecting:
          this._log.info("I'm Connecting to the Eftpos at ".concat(this._eftposAddress, "..."));

          break;

        case _Connection__WEBPACK_IMPORTED_MODULE_3__["ConnectionState"].Connected:
          this._retriesSinceLastDeviceAddressResolution = 0;

          if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Pairing && this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
            this.CurrentPairingFlowState.Message = "Requesting to Pair...";
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
              detail: this.CurrentPairingFlowState
            }));
            var pr = PairingHelper.NewPairRequest();

            this._send(pr.ToMessage());
          } else {
            this._log.info("I'm Connected to ".concat(this._eftposAddress, "..."));

            this._spiMessageStamp.Secrets = this._secrets;

            this._startPeriodicPing();
          }

          break;

        case _Connection__WEBPACK_IMPORTED_MODULE_3__["ConnectionState"].Disconnected:
          // Let's reset some lifecycle related to connection state, ready for next connection
          this._log.info("I'm disconnected from ".concat(this._eftposAddress, "..."));

          this._mostRecentPingSent = null;
          this._mostRecentPongReceived = null;
          this._missedPongsCount = 0;

          this._stopPeriodicPing();

          if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
            this.CurrentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnecting;

            if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction && !this.CurrentTxFlowState.Finished) {
              // we're in the middle of a transaction, just so you know!
              // TH-1D
              this._log.info("Lost connection in the middle of a transaction...");
            }

            if (this._conn == null) return; // This means the instance has been disposed. Aborting.

            if (this._autoAddressResolutionEnabled) {
              if (this._retriesSinceLastDeviceAddressResolution >= this._retriesBeforeResolvingDeviceAddress) {
                this._autoResolveEftposAddress();

                this._retriesSinceLastDeviceAddressResolution = 0;
              } else {
                this._retriesSinceLastDeviceAddressResolution += 1;
              }
            }

            this._log.info("Will try to reconnect in ".concat(this._sleepBeforeReconnectMs, "ms..."));

            setTimeout(function () {
              if (_this3.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
                // This is non-blocking
                if (_this3._conn) {
                  _this3._conn.Connect();
                }
              }
            }, this._sleepBeforeReconnectMs);
          } else if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Pairing) {
            this._log.info("Lost Connection during pairing.");

            this.CurrentPairingFlowState.Message = "Could not Connect to Pair. Check Network and Try Again...";

            this._onPairingFailed();

            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {
              detail: this.CurrentPairingFlowState
            }));
          }

          break;

        default:
          throw new Exception('Unknown state: ' + state);
      }
    } // <summary>
    // This is an important piece of the puzzle. It's a background thread that periodically
    // sends Pings to the server. If it doesn't receive Pongs, it considers the connection as broken
    // so it disconnects. 
    // </summary>

  }, {
    key: "_startPeriodicPing",
    value: function _startPeriodicPing() {
      var _this4 = this;

      this._stopPeriodicPing();

      this._periodicPingThread = setInterval(function () {
        return _this4._periodicPing();
      }, this._pingFrequency);

      this._periodicPing();
    }
  }, {
    key: "_periodicPing",
    value: function _periodicPing() {
      var _this5 = this;

      // while i'm still connected AND paired...
      if (this._conn.Connected && this._secrets != null) {
        this._doPing();

        setTimeout(function () {
          if (_this5._mostRecentPingSent != null && (_this5._mostRecentPongReceived == null || _this5._mostRecentPongReceived.Id != _this5._mostRecentPingSent.Id)) {
            _this5._missedPongsCount += 1;

            _this5._log.info("Eftpos didn't reply to my Ping. Missed Count: ".concat(_this5._missedPongsCount, "/").concat(_this5._missedPongsToDisconnect, "."));

            if (_this5._missedPongsCount < _this5._missedPongsToDisconnect) {
              _this5._log.info("Trying another ping...");

              _this5._startPeriodicPing();

              return;
            } // This means that we have not received a pong for our most recent ping.
            // We consider this connection as broken.
            // Let's Disconnect.


            _this5._log.info("Disconnecting...");

            _this5._conn.Disconnect();

            _this5._stopPeriodicPing();
          }

          _this5._missedPongsCount = 0;
        }, this._pongTimeout);
      } else {
        this._stopPeriodicPing();

        this._log.info("Cancelling periodic ping as were disconnected or not paired");
      }
    } // <summary>
    // We call this ourselves as soon as we're ready to transact with the PinPad after a connection is established.
    // This function is effectively called after we received the first Login Response from the PinPad.
    // </summary>

  }, {
    key: "_onReadyToTransact",
    value: function _onReadyToTransact() {
      this._log.info("On Ready To Transact!"); // So, we have just made a connection, pinged and logged in successfully.


      this.CurrentStatus = _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnected;

      if (this.CurrentFlow == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiFlow"].Transaction && !this.CurrentTxFlowState.Finished) {
        if (this.CurrentTxFlowState.RequestSent) {
          // TH-3A - We've just reconnected and were in the middle of Tx.
          // Let's get the last transaction to check what we might have missed out on.
          this.CurrentTxFlowState.CallingGlt();

          this._callGetLastTransaction();
        } else {
          // TH-3AR - We had not even sent the request yet. Let's do that now
          this._send(this.CurrentTxFlowState.Request);

          this.CurrentTxFlowState.Sent("Sending Request Now...");
          document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
            detail: this.CurrentTxFlowState
          }));
        }
      } else {
        // let's also tell the eftpos our latest table configuration.
        if (this._spiPat) {
          this._spiPat.PushPayAtTableConfig();
        }
      }
    } // <summary>
    // When we disconnect, we should also stop the periodic ping.
    // </summary>

  }, {
    key: "_stopPeriodicPing",
    value: function _stopPeriodicPing() {
      if (this._periodicPingThread) {
        // If we were already set up, clean up before restarting.
        clearInterval(this._periodicPingThread);
        this._periodicPingThread = null;
      }
    } // Send a Ping to the Server

  }, {
    key: "_doPing",
    value: function _doPing() {
      var ping = _PingHelper__WEBPACK_IMPORTED_MODULE_10__["PingHelper"].GeneratePingRequest();
      this._mostRecentPingSent = ping;

      this._send(ping);

      this._mostRecentPingSentTime = Date.now();
    } // <summary>
    // Received a Pong from the server
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleIncomingPong",
    value: function _handleIncomingPong(m) {
      // We need to maintain this time delta otherwise the server will not accept our messages.
      this._spiMessageStamp.ServerTimeDelta = m.GetServerTimeDelta();

      if (this._mostRecentPongReceived == null) {
        // First pong received after a connection, and after the pairing process is fully finalised.
        if (this.CurrentStatus != _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].Unpaired) {
          this._log.info("First pong of connection and in paired state.");

          this._onReadyToTransact();
        } else {
          this._log.info("First pong of connection but pairing process not finalised yet.");
        }
      }

      this._mostRecentPongReceived = m;

      this._log.debug("PongLatency:".concat(Date.now() - this._mostRecentPingSentTime));
    } // <summary>
    // The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
    // </summary>
    // <param name="m"></param>

  }, {
    key: "_handleIncomingPing",
    value: function _handleIncomingPing(m) {
      var pong = _PingHelper__WEBPACK_IMPORTED_MODULE_10__["PongHelper"].GeneratePongRessponse(m);

      this._send(pong);
    } // <summary>
    // Ask the PinPad to tell us what the Most Recent Transaction was
    // </summary>

  }, {
    key: "_callGetLastTransaction",
    value: function _callGetLastTransaction() {
      var gltRequest = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["GetLastTransactionRequest"]();

      this._send(gltRequest.ToMessage());
    } // <summary>
    // This method will be called whenever we receive a message from the Connection
    // </summary>
    // <param name="messageJson"></param>

  }, {
    key: "_onSpiMessageReceived",
    value: function _onSpiMessageReceived(messageJson) {
      // First we parse the incoming message
      var m = _Messages__WEBPACK_IMPORTED_MODULE_0__["Message"].FromJson(messageJson.Message, this._secrets);

      this._log.info("Received:" + m.DecryptedJson);

      if (_SpiPreauth__WEBPACK_IMPORTED_MODULE_6__["SpiPreauth"].IsPreauthEvent(m.EventName)) {
        this._spiPreauth._handlePreauthMessage(m);

        return;
      } // And then we switch on the event type.


      switch (m.EventName) {
        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].KeyRequest:
          this._handleKeyRequest(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].KeyCheck:
          this._handleKeyCheck(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PairResponse:
          this._handlePairResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].DropKeysAdvice:
          this._handleDropKeysAdvice(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PurchaseResponse:
          this._handlePurchaseResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].RefundResponse:
          this._handleRefundResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].CashoutOnlyResponse:
          this._handleCashoutOnlyResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].MotoPurchaseResponse:
          this._handleMotoPurchaseResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SignatureRequired:
          this._handleSignatureRequired(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].AuthCodeRequired:
          this._handleAuthCodeRequired(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].GetLastTransactionResponse:
          this._handleGetLastTransactionResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SettleResponse:
          this.HandleSettleResponse(m);
          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SettlementEnquiryResponse:
          this._handleSettlementEnquiryResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].Ping:
          this._handleIncomingPing(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].Pong:
          this._handleIncomingPong(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].KeyRollRequest:
          this._handleKeyRollingRequest(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableGetTableConfig:
          if (this._spiPat == null) {
            this._send(_PayAtTable__WEBPACK_IMPORTED_MODULE_5__["PayAtTableConfig"].FeatureDisableMessage(_RequestIdHelper__WEBPACK_IMPORTED_MODULE_2__["RequestIdHelper"].Id("patconf")));

            break;
          }

          this._spiPat._handleGetTableConfig(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableGetBillDetails:
          this._spiPat._handleGetBillDetailsRequest(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PayAtTableBillPayment:
          this._spiPat._handleBillPaymentAdvice(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].Error:
          this._handleErrorEvent(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].InvalidHmacSignature:
          this._log.info("I could not verify message from Eftpos. You might have to Un-pair Eftpos and then reconnect.");

          break;

        default:
          this._log.info("I don't Understand Event: ".concat(m.EventName, ", ").concat(m.Data, ". Perhaps I have not implemented it yet."));

          break;
      }
    }
  }, {
    key: "_onWsErrorReceived",
    value: function _onWsErrorReceived(error) {
      this._log.warn("Received WS Error: " + error.Message);
    }
  }, {
    key: "_send",
    value: function _send(message) {
      var json = message.ToJson(this._spiMessageStamp);

      if (this._conn.Connected) {
        this._log.info("Sending: " + message.DecryptedJson);

        this._conn.Send(json);

        return true;
      } else {
        this._log.info("Asked to send, but not connected: " + message.DecryptedJson);

        return false;
      }
    }
  }, {
    key: "HasSerialNumberChanged",
    value: function HasSerialNumberChanged(updatedSerialNumber) {
      return this._serialNumber != updatedSerialNumber;
    }
  }, {
    key: "HasEftposAddressChanged",
    value: function HasEftposAddressChanged(updatedEftposAddress) {
      return this._eftposAddress != updatedEftposAddress;
    }
  }, {
    key: "_autoResolveEftposAddress",
    value: function _autoResolveEftposAddress() {
      var _this6 = this;

      if (!this._autoAddressResolutionEnabled) return;
      if (!this._serialNumber) return;
      var service = new _Service_DeviceService__WEBPACK_IMPORTED_MODULE_12__["DeviceAddressService"]();
      return service.RetrieveService(this._serialNumber, this._deviceApiKey, this._inTestMode).then(function (addressResponse) {
        if (!addressResponse || !addressResponse.Address) return;
        if (!_this6.HasEftposAddressChanged(addressResponse.Address)) return; // update device and connection address

        _this6._eftposAddress = "ws://" + addressResponse.Address;
        _this6._conn.Address = _this6._eftposAddress;
        _this6.CurrentDeviceStatus = new _Service_DeviceService__WEBPACK_IMPORTED_MODULE_12__["DeviceAddressStatus"](addressResponse.Address, addressResponse.LastUpdated);
        document.dispatchEvent(new CustomEvent('DeviceAddressChanged', {
          detail: _this6.CurrentDeviceStatus
        }));
        return _this6.CurrentDeviceStatus;
      });
    }
  }], [{
    key: "GetVersion",
    value: function GetVersion() {
      return SPI_VERSION;
    }
  }]);

  return Spi;
}();




/***/ }),

/***/ "./src/SpiModels.js":
/*!**************************!*\
  !*** ./src/SpiModels.js ***!
  \**************************/
/*! exports provided: SpiStatus, SpiFlow, PairingFlowState, TransactionType, InitiateTxResult, MidTxResult, TransactionFlowState, SubmitAuthCodeResult, SpiConfig, TransactionOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiStatus", function() { return SpiStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiFlow", function() { return SpiFlow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairingFlowState", function() { return PairingFlowState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionType", function() { return TransactionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitiateTxResult", function() { return InitiateTxResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MidTxResult", function() { return MidTxResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionFlowState", function() { return TransactionFlowState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitAuthCodeResult", function() { return SubmitAuthCodeResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiConfig", function() { return SpiConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionOptions", function() { return TransactionOptions; });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/Messages.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

 // <summary>
// Represents the 3 Pairing statuses that the Spi instanxce can be in.
// </summary>

var SpiStatus = {
  // <summary>
  // Paired and Connected
  // </summary>
  PairedConnected: 'PairedConnected',
  // <summary>
  // Paired but trying to establish a connection 
  // </summary>
  PairedConnecting: 'PairedConnecting',
  // <summary>
  // Unpaired
  // </summary>
  Unpaired: 'Unpaired'
}; // <summary>
// The Spi instance can be in one of these flows at any point in time.
// </summary>

var SpiFlow = {
  // <summary>
  // Currently going through the Pairing Process Flow.
  // Happens during the Unpaired SpiStatus.
  // </summary>
  Pairing: 'Pairing',
  // <summary>
  // Currently going through the transaction Process Flow.
  // Cannot happen in the Unpaired SpiStatus.
  // </summary>
  Transaction: 'Transaction',
  // <summary>
  // Not in any of the other states.
  // </summary>
  Idle: 'Idle'
}; // <summary>
// Represents the Pairing Flow State during the pairing process 
// </summary>

var PairingFlowState = function PairingFlowState(state) {
  _classCallCheck(this, PairingFlowState);

  // <summary>
  // Some text that can be displayed in the Pairing Process Screen
  // that indicates what the pairing process is up to.
  // </summary>
  this.Message = null; // <summary>
  // When true, it means that the EFTPOS is shoing the confirmation code,
  // and your user needs to press YES or NO on the EFTPOS.
  // </summary>

  this.AwaitingCheckFromEftpos = null; // <summary>
  // When true, you need to display the YES/NO buttons on you pairing screen
  // for your user to confirm the code.
  // </summary>

  this.AwaitingCheckFromPos = null; // <summary>
  // This is the confirmation code for the pairing process.
  // </summary>

  this.ConfirmationCode = null; // <summary>
  // Indicates whether the Pairing Flow has finished its job.
  // </summary>

  this.Finished = null; // <summary>
  // Indicates whether pairing was successful or not.
  // </summary>

  this.Successful = null;

  if (state) {
    Object.assign(this, state);
  }
};
var TransactionType = {
  Purchase: 'Purchase',
  Refund: 'Refund',
  CashoutOnly: 'CashoutOnly',
  MOTO: 'MOTO',
  Settle: 'Settle',
  SettlementEnquiry: 'SettlementEnquiry',
  GetLastTransaction: 'GetLastTransaction',
  Preauth: 'Preauth',
  AccountVerify: 'AccountVerify'
}; // <summary>
// Used as a return in the InitiateTx methods to signify whether 
// the transaction was initiated or not, and a reason to go with it.
// </summary>

var InitiateTxResult = function InitiateTxResult(initiated, message) {
  _classCallCheck(this, InitiateTxResult);

  // <summary>
  // Whether the tx was initiated.
  // When true, you can expect updated to your registered callback.
  // When false, you can retry calling the InitiateX method.
  // </summary>
  this.Initiated = initiated; // <summary>
  // Text that gives reason for the Initiated flag, especially in case of false. 
  // </summary>

  this.Message = message;
}; // <summary>
// Used as a return in calls mid transaction to let you know
// whether the call was valid or not.
// These attributes work for COM interop.
// </summary>

var MidTxResult = // <summary>
// This default stucture works for COM interop.
// </summary>
function MidTxResult(valid, message) {
  _classCallCheck(this, MidTxResult);

  this.Valid = valid;
  this.Message = message;
}; // <summary>
// Represents the State during a TransactionFlow
// </summary>

var TransactionFlowState =
/*#__PURE__*/
function () {
  function TransactionFlowState(posRefId, type, amountCents, message, msg) {
    _classCallCheck(this, TransactionFlowState);

    // <summary>
    //  The id given to this transaction
    // </summary>
    this.PosRefId = posRefId;
    this.Id = posRefId; // obsolete, but let's maintain it for now, to mean same as PosRefId.
    // <summary>
    // Purchase/Refund/Settle/...
    // </summary>

    this.Type = type; // <summary>
    // A text message to display on your Transaction Flow Screen
    // </summary>

    this.DisplayMessage = msg; // <summary>
    // Amount in cents for this transaction
    // </summary>

    this.AmountCents = amountCents; // <summary>
    // Whther the request has been sent to the EFTPOS yet or not.
    // In the PairedConnecting state, the transaction is initiated
    // but the request is only sent once the connection is recovered.
    // </summary>

    this.RequestSent = false; // <summary>
    // The time when the request was sent to the EFTPOS.
    // </summary>

    this.RequestTime = null; // <summary>
    // The time when we last asked for an update, including the original request at first
    // </summary>

    this.LastStateRequestTime = null; // <summary>
    // Whether we're currently attempting to Cancel the transaction.
    // </summary>

    this.AttemptingToCancel = null; // <summary>
    // When this flag is on, you need to display the dignature accept/decline buttons in your 
    // transaction flow screen.
    // </summary>

    this.AwaitingSignatureCheck = false; // <summary>
    // When this flag is on, you need to show your user the phone number to call to get the authorisation code.
    // Then you need to provide your user means to enter that given code and submit it via SubmitAuthCode().
    // </summary>

    this.AwaitingPhoneForAuth = null; // <summary>
    // Whether this transaction flow is over or not.
    // </summary>

    this.Finished = false; // <summary>
    // The success state of this transaction. Starts off as Unknown.
    // When finished, can be Success, Failed OR Unknown.
    // </summary>

    this.Success = _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Unknown; // <summary>
    // The response at the end of the transaction. 
    // Might not be present in all edge cases.
    // You can then turn this Message into the appropriate structure,
    // such as PurchaseResponse, RefundResponse, etc
    // </summary>

    this.Response = null; // <summary>
    // The message the we received from EFTPOS that told us that signature is required.
    // </summary>

    this.SignatureRequiredMessage = null; // <summary>
    // The message the we received from EFTPOS that told us that Phone For Auth is required.
    // </summary>

    this.PhoneForAuthRequiredMessage = null; // <summary>
    // The time when the cancel attempt was made.
    // </summary>

    this.CancelAttemptTime = null; // <summary>
    // The request message that we are sending/sent to the server.
    // </summary>

    this.Request = message; // <summary>
    // Whether we're currently waiting for a Get Last Transaction Response to get an update. 
    // </summary>

    this.AwaitingGltResponse = null;
    this.GLTResponsePosRefId = null;
  }

  _createClass(TransactionFlowState, [{
    key: "Sent",
    value: function Sent(msg) {
      this.RequestSent = true;
      this.RequestTime = Date.now();
      this.LastStateRequestTime = Date.now();
      this.DisplayMessage = msg;
    }
  }, {
    key: "Cancelling",
    value: function Cancelling(msg) {
      this.AttemptingToCancel = true;
      this.CancelAttemptTime = Date.now();
      this.DisplayMessage = msg;
    }
  }, {
    key: "CancelFailed",
    value: function CancelFailed(msg) {
      this.AttemptingToCancel = false;
      this.DisplayMessage = msg;
    }
  }, {
    key: "CallingGlt",
    value: function CallingGlt() {
      this.AwaitingGltResponse = true;
      this.LastStateRequestTime = Date.now();
    }
  }, {
    key: "GotGltResponse",
    value: function GotGltResponse() {
      this.AwaitingGltResponse = false;
    }
  }, {
    key: "Failed",
    value: function Failed(response, msg) {
      this.Success = _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Failed;
      this.Finished = true;
      this.Response = response;
      this.DisplayMessage = msg;
    }
  }, {
    key: "SignatureRequired",
    value: function SignatureRequired(spiMessage, msg) {
      this.SignatureRequiredMessage = spiMessage;
      this.AwaitingSignatureCheck = true;
      this.DisplayMessage = msg;
    }
  }, {
    key: "SignatureResponded",
    value: function SignatureResponded(msg) {
      this.AwaitingSignatureCheck = false;
      this.DisplayMessage = msg;
    }
  }, {
    key: "PhoneForAuthRequired",
    value: function PhoneForAuthRequired(spiMessage, msg) {
      this.PhoneForAuthRequiredMessage = spiMessage;
      this.AwaitingPhoneForAuth = true;
      this.DisplayMessage = msg;
    }
  }, {
    key: "AuthCodeSent",
    value: function AuthCodeSent(msg) {
      this.AwaitingPhoneForAuth = false;
      this.DisplayMessage = msg;
    }
  }, {
    key: "Completed",
    value: function Completed(state, response, msg) {
      this.Success = state;
      this.Response = response;
      this.Finished = true;
      this.AttemptingToCancel = false;
      this.AwaitingGltResponse = false;
      this.AwaitingSignatureCheck = false;
      this.AwaitingPhoneForAuth = false;
      this.DisplayMessage = msg;
    }
  }, {
    key: "UnknownCompleted",
    value: function UnknownCompleted(msg) {
      this.Success = _Messages__WEBPACK_IMPORTED_MODULE_0__["SuccessState"].Unknown;
      this.Response = null;
      this.Finished = true;
      this.AttemptingToCancel = false;
      this.AwaitingGltResponse = false;
      this.AwaitingSignatureCheck = false;
      this.AwaitingPhoneForAuth = false;
      this.DisplayMessage = msg;
    }
  }]);

  return TransactionFlowState;
}(); // <summary>
// Used as a return in the SubmitAuthCode method to signify whether Code is valid
// </summary>

var SubmitAuthCodeResult = function SubmitAuthCodeResult(validFormat, message) {
  _classCallCheck(this, SubmitAuthCodeResult);

  this.ValidFormat = validFormat; // <summary>
  // Text that gives reason for Invalidity
  // </summary>

  this.Message = message;
};
var SpiConfig =
/*#__PURE__*/
function () {
  function SpiConfig() {
    _classCallCheck(this, SpiConfig);

    this.PromptForCustomerCopyOnEftpos = false;
    this.SignatureFlowOnEftpos = false;
    this.PrintMerchantCopy = false;
  }

  _createClass(SpiConfig, [{
    key: "addReceiptConfig",
    value: function addReceiptConfig(messageData) {
      if (this.PromptForCustomerCopyOnEftpos) {
        messageData.prompt_for_customer_copy = this.PromptForCustomerCopyOnEftpos;
      }

      if (this.SignatureFlowOnEftpos) {
        messageData.print_for_signature_required_transactions = this.SignatureFlowOnEftpos;
      }

      if (this.PrintMerchantCopy) {
        messageData.print_merchant_copy = this.PrintMerchantCopy;
      }

      return messageData;
    }
  }, {
    key: "ToString",
    value: function ToString() {
      return "PromptForCustomerCopyOnEftpos:".concat(this.PromptForCustomerCopyOnEftpos, " SignatureFlowOnEftpos:").concat(this.SignatureFlowOnEftpos, " PrintMerchantCopy: ").concat(this.PrintMerchantCopy);
    }
  }]);

  return SpiConfig;
}();
var TransactionOptions =
/*#__PURE__*/
function () {
  function TransactionOptions() {
    _classCallCheck(this, TransactionOptions);

    this._customerReceiptHeader = null;
    this._customerReceiptFooter = null;
    this._merchantReceiptHeader = null;
    this._merchantReceiptFooter = null;
  }

  _createClass(TransactionOptions, [{
    key: "SetCustomerReceiptHeader",
    value: function SetCustomerReceiptHeader(customerReceiptHeader) {
      this._customerReceiptHeader = customerReceiptHeader;
    }
  }, {
    key: "SetCustomerReceiptFooter",
    value: function SetCustomerReceiptFooter(customerReceiptFooter) {
      this._customerReceiptFooter = customerReceiptFooter;
    }
  }, {
    key: "SetMerchantReceiptHeader",
    value: function SetMerchantReceiptHeader(merchantReceiptHeader) {
      this._merchantReceiptHeader = merchantReceiptHeader;
    }
  }, {
    key: "SetMerchantReceiptFooter",
    value: function SetMerchantReceiptFooter(merchantReceiptFooter) {
      this._merchantReceiptFooter = merchantReceiptFooter;
    }
  }, {
    key: "AddOptions",
    value: function AddOptions(messageData) {
      messageData.customer_receipt_header = this._customerReceiptHeader;
      messageData.customer_receipt_footer = this._customerReceiptFooter;
      messageData.merchant_receipt_header = this._merchantReceiptHeader;
      messageData.merchant_receipt_footer = this._merchantReceiptFooter;
      return messageData;
    }
  }]);

  return TransactionOptions;
}();

/***/ }),

/***/ "./src/SpiPayAtTable.js":
/*!******************************!*\
  !*** ./src/SpiPayAtTable.js ***!
  \******************************/
/*! exports provided: SpiPayAtTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiPayAtTable", function() { return SpiPayAtTable; });
/* harmony import */ var _RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestIdHelper */ "./src/RequestIdHelper.js");
/* harmony import */ var _PayAtTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PayAtTable */ "./src/PayAtTable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SpiPayAtTable =
/*#__PURE__*/
function () {
  function SpiPayAtTable(spi) {
    _classCallCheck(this, SpiPayAtTable);

    this._spi = spi;
    this._log = console;
    this.Config = Object.assign(new _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["PayAtTableConfig"](), {
      PayAtTabledEnabled: true,
      OperatorIdEnabled: true,
      AllowedOperatorIds: [],
      EqualSplitEnabled: true,
      SplitByAmountEnabled: true,
      SummaryReportEnabled: true,
      TippingEnabled: true,
      LabelOperatorId: "Operator ID",
      LabelPayButton: "Pay at Table",
      LabelTableId: "Table Number"
    });
  } // <summary>
  // This delegate will be called when the Eftpos needs to know the current state of a bill for a table. 
  // <para />
  // Parameters:<para />
  // billId - The unique identifier of the bill. If empty, it means that the PayAtTable flow on the Eftpos is just starting, and the lookup is by tableId.<para />
  // tableId - The identifier of the table that the bill is for. <para />
  // operatorId - The id of the operator entered on the eftpos. <para />
  // <para />
  // Return:<para />
  // You need to return the current state of the bill.
  // </summary>


  _createClass(SpiPayAtTable, [{
    key: "GetBillStatus",
    value: function GetBillStatus(billId, tableId, operatorId) {
      throw new Exception('Method not implemented. Please overwrite this method in your POS');
    } // Abstract method, must implement in POS system

  }, {
    key: "BillPaymentReceived",
    value: function BillPaymentReceived(billPayment, updatedBillData) {
      throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }
  }, {
    key: "PushPayAtTableConfig",
    value: function PushPayAtTableConfig() {
      this._spi._send(this.Config.ToMessage(_RequestIdHelper__WEBPACK_IMPORTED_MODULE_0__["RequestIdHelper"].Id("patconf")));
    }
  }, {
    key: "_handleGetBillDetailsRequest",
    value: function _handleGetBillDetailsRequest(m) {
      var operatorId = m.Data["operator_id"];
      var tableId = m.Data["table_id"]; // Ask POS for Bill Details for this tableId, inluding encoded PaymentData

      var billStatus = this.GetBillStatus(null, tableId, operatorId);
      billStatus.TableId = tableId;

      if (billStatus.TotalAmount <= 0) {
        this._log.info("Table has 0 total amount. not sending it to eftpos.");

        billStatus.Result = _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["BillRetrievalResult"].INVALID_TABLE_ID;
      }

      this._spi._send(billStatus.ToMessage(m.Id));
    }
  }, {
    key: "_handleBillPaymentAdvice",
    value: function _handleBillPaymentAdvice(m) {
      var billPayment = new _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["BillPayment"](m); // Ask POS for Bill Details, inluding encoded PaymentData

      var existingBillStatus = this.GetBillStatus(billPayment.BillId, billPayment.TableId, billPayment.OperatorId);

      if (existingBillStatus.Result != _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["BillRetrievalResult"].SUCCESS) {
        this._log.warn("Could not retrieve Bill Status for Payment Advice. Sending Error to Eftpos.");

        this._spi._send(existingBillStatus.ToMessage(m.Id));
      }

      var existingPaymentHistory = existingBillStatus.getBillPaymentHistory();
      var foundExistingEntry = existingPaymentHistory.find(function (phe) {
        return phe.GetTerminalRefId() == billPayment.PurchaseResponse.GetTerminalReferenceId();
      });

      if (foundExistingEntry) {
        // We have already processed this payment.
        // perhaps Eftpos did get our acknowledgement.
        // Let's update Eftpos.
        this._log.warn("Had already received this bill_paymemnt advice from eftpos. Ignoring.");

        this._spi._send(existingBillStatus.ToMessage(m.Id));

        return;
      } // Let's add the new entry to the history


      var updatedHistoryEntries = existingPaymentHistory;
      updatedHistoryEntries.push(new _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["PaymentHistoryEntry"](billPayment.PaymentType.toLowerCase(), billPayment.PurchaseResponse.ToPaymentSummary()));
      var updatedBillData = _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["BillStatusResponse"].ToBillData(updatedHistoryEntries); // Advise POS of new payment against this bill, and the updated BillData to Save.

      var updatedBillStatus = this.BillPaymentReceived(billPayment, updatedBillData); // Just in case client forgot to set these:

      updatedBillStatus.BillId = billPayment.BillId;
      updatedBillStatus.TableId = billPayment.TableId;

      if (updatedBillStatus.Result != _PayAtTable__WEBPACK_IMPORTED_MODULE_1__["BillRetrievalResult"].SUCCESS) {
        this._log.warn("POS Errored when being Advised of Payment. Letting EFTPOS know, and sending existing bill data.");

        updatedBillStatus.BillData = existingBillStatus.BillData;
      } else {
        updatedBillStatus.BillData = updatedBillData;
      }

      this._spi._send(updatedBillStatus.ToMessage(m.Id));
    }
  }, {
    key: "_handleGetTableConfig",
    value: function _handleGetTableConfig(m) {
      this._spi._send(this.Config.ToMessage(m.Id));
    }
  }]);

  return SpiPayAtTable;
}();

/***/ }),

/***/ "./src/SpiPreauth.js":
/*!***************************!*\
  !*** ./src/SpiPreauth.js ***!
  \***************************/
/*! exports provided: SpiPreauth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiPreauth", function() { return SpiPreauth; });
/* harmony import */ var _Preauth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Preauth */ "./src/Preauth.js");
/* harmony import */ var _SpiModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpiModels */ "./src/SpiModels.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SpiPreauth =
/*#__PURE__*/
function () {
  function SpiPreauth(spi) {
    _classCallCheck(this, SpiPreauth);

    this._spi = spi;
    this._log = console;
  }

  _createClass(SpiPreauth, [{
    key: "InitiateAccountVerifyTx",
    value: function InitiateAccountVerifyTx(posRefId) {
      var verifyMsg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["AccountVerifyRequest"](posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].AccountVerify, 0, verifyMsg, "Waiting for EFTPOS connection to make account verify request");
      var sentMsg = "Asked EFTPOS to verify account";
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiateOpenTx",
    value: function InitiateOpenTx(posRefId, amountCents) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthOpenRequest"](amountCents, posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth request for ".concat((amountCents / 100.0).toFixed(2)));
      var sentMsg = "Asked EFTPOS to create preauth for ".concat((amountCents / 100.0).toFixed(2));
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiateTopupTx",
    value: function InitiateTopupTx(posRefId, preauthId, amountCents) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthTopupRequest"](preauthId, amountCents, posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth topup request for ".concat((amountCents / 100.0).toFixed(2)));
      var sentMsg = "Asked EFTPOS to make preauth topup for ".concat((amountCents / 100.0).toFixed(2));
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiatePartialCancellationTx",
    value: function InitiatePartialCancellationTx(posRefId, preauthId, amountCents) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthPartialCancellationRequest"](preauthId, amountCents, posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth partial cancellation request for ".concat((amountCents / 100.0).toFixed(2)));
      var sentMsg = "Asked EFTPOS to make preauth partial cancellation for ".concat((amountCents / 100.0).toFixed(2));
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiateExtendTx",
    value: function InitiateExtendTx(posRefId, preauthId) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthExtendRequest"](preauthId, posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, 0, msg, "Waiting for EFTPOS connection to make preauth Extend request");
      var sentMsg = "Asked EFTPOS to make preauth Extend request";
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiateCompletionTx",
    value: function InitiateCompletionTx(posRefId, preauthId, amountCents, surchargeAmount) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthCompletionRequest"](preauthId, amountCents, posRefId, surchargeAmount).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth completion request for ".concat((amountCents / 100.0).toFixed(2)));
      var sentMsg = "Asked EFTPOS to make preauth completion for ".concat((amountCents / 100.0).toFixed(2));
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "InitiateCancelTx",
    value: function InitiateCancelTx(posRefId, preauthId) {
      var msg = new _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthCancelRequest"](preauthId, posRefId).ToMessage();
      var tfs = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionFlowState"](posRefId, _SpiModels__WEBPACK_IMPORTED_MODULE_1__["TransactionType"].Preauth, 0, msg, "Waiting for EFTPOS connection to make preauth cancellation request");
      var sentMsg = "Asked EFTPOS to make preauth cancellation request";
      return this._initiatePreauthTx(tfs, sentMsg);
    }
  }, {
    key: "_initiatePreauthTx",
    value: function _initiatePreauthTx(tfs, sentMsg) {
      if (this._spi.CurrentStatus == SpiStatus.Unpaired) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Paired");
      if (this._spi.CurrentFlow != SpiFlow.Idle) return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](false, "Not Idle");
      this._spi.CurrentFlow = SpiFlow.Transaction;
      this._spi.CurrentTxFlowState = tfs;

      if (this._spi._send(tfs.Request)) {
        this._spi.CurrentTxFlowState.Sent(sentMsg);
      }

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this._spi.CurrentTxFlowState
      }));
      return new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["InitiateTxResult"](true, "Preauth Initiated");
    }
  }, {
    key: "_handlePreauthMessage",
    value: function _handlePreauthMessage(m) {
      switch (m.EventName) {
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].AccountVerifyResponse:
          this._handleAccountVerifyResponse(m);

          break;

        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthOpenResponse:
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthTopupResponse:
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthPartialCancellationResponse:
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthExtendResponse:
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthCompleteResponse:
        case _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthCancellationResponse:
          this._handlePreauthResponse(m);

          break;

        default:
          this._log.info("I don't Understand Preauth Event: ".concat(m.EventName, ", ").concat(m.Data, ". Perhaps I have not implemented it yet."));

          break;
      }
    }
  }, {
    key: "_handleAccountVerifyResponse",
    value: function _handleAccountVerifyResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;
      var currentTxFlowState = this._spi.CurrentTxFlowState;

      if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId) {
        this._log.info("Received Account Verify response but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      } // TH-1A, TH-2A


      currentTxFlowState.Completed(m.GetSuccessState(), m, "Account Verify Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this._spi.CurrentTxFlowState
      }));
    }
  }, {
    key: "_handlePreauthResponse",
    value: function _handlePreauthResponse(m) {
      var incomingPosRefId = m.Data.pos_ref_id;
      var currentTxFlowState = this._spi.CurrentTxFlowState;

      if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId) {
        this._log.info("Received Preauth response but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      } // TH-1A, TH-2A


      currentTxFlowState.Completed(m.GetSuccessState(), m, "Preauth Transaction Ended."); // TH-6A, TH-6E

      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: this._spi.CurrentTxFlowState
      }));
    }
  }], [{
    key: "IsPreauthEvent",
    value: function IsPreauthEvent(eventName) {
      return eventName.lastIndexOf("preauth", 0) === 0 || eventName == _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthCompleteResponse || eventName == _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].PreauthCompleteRequest || eventName == _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].AccountVerifyRequest || eventName == _Preauth__WEBPACK_IMPORTED_MODULE_0__["PreauthEvents"].AccountVerifyResponse;
    }
  }]);

  return SpiPreauth;
}();

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWVzLWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3NoYS9zcmMvc2hhLmpzIiwid2VicGFjazovLy8uL3NyYy9DYXNob3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9DcnlwdG8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0tleVJvbGxpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhaXJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BheUF0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByZWF1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByaW50aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXJjaGFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHVyY2hhc2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlcXVlc3RJZEhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VjcmV0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZS9EZXZpY2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TZXR0bGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9TcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NwaU1vZGVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUGF5QXRUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUHJlYXV0aC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJTcGkiLCJMb2dnZXIiLCJQcmludGVyIiwiQ2FzaG91dE9ubHlSZXF1ZXN0IiwiYW1vdW50Q2VudHMiLCJwb3NSZWZJZCIsInN1cmNoYXJnZUFtb3VudCIsIlBvc1JlZklkIiwiQ2FzaG91dEFtb3VudCIsIlN1cmNoYXJnZUFtb3VudCIsIkNvbmZpZyIsIlNwaUNvbmZpZyIsIk9wdGlvbnMiLCJUcmFuc2FjdGlvbk9wdGlvbnMiLCJkYXRhIiwiYWRkUmVjZWlwdENvbmZpZyIsIkFkZE9wdGlvbnMiLCJNZXNzYWdlIiwiUmVxdWVzdElkSGVscGVyIiwiSWQiLCJFdmVudHMiLCJDYXNob3V0T25seVJlc3BvbnNlIiwibSIsIl9tIiwiUmVxdWVzdElkIiwiRGF0YSIsInBvc19yZWZfaWQiLCJTY2hlbWVOYW1lIiwic2NoZW1lX25hbWUiLCJTdWNjZXNzIiwiR2V0U3VjY2Vzc1N0YXRlIiwiU3VjY2Vzc1N0YXRlIiwiYXR0cmlidXRlIiwiQ29ubmVjdGlvblN0YXRlIiwiRGlzY29ubmVjdGVkIiwiQ29ubmVjdGluZyIsIkNvbm5lY3RlZCIsIlNQSV9QUk9UT0NPTCIsIkNvbm5lY3Rpb25TdGF0ZUV2ZW50QXJncyIsImNvbm5lY3Rpb25TdGF0ZSIsIk1lc3NhZ2VFdmVudEFyZ3MiLCJtZXNzYWdlIiwiQ29ubmVjdGlvbiIsIkFkZHJlc3MiLCJTdGF0ZSIsIlNwaVByb3RvY29sIiwiX3dzIiwiV2ViU29ja2V0IiwiRXJyb3IiLCJvbm9wZW4iLCJwb2xsV2ViU29ja2V0Q29ubmVjdGlvbiIsIm9ubWVzc2FnZSIsInBheWxvYWQiLCJvbk1lc3NhZ2VSZWNlaXZlZCIsIm9uY2xvc2UiLCJvbkNsb3NlZCIsIm9uZXJyb3IiLCJlcnIiLCJvbkVycm9yIiwiZG9jdW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJyZWFkeVN0YXRlIiwiQ0xPU0VEIiwiY2xvc2UiLCJzZW5kIiwiY291bnQiLCJPUEVOIiwib25PcGVuZWQiLCJzZXRUaW1lb3V0IiwiRGlzY29ubmVjdCIsIkNyeXB0byIsImtleSIsImJ5dGVzIiwiYWVzanMiLCJ1dGlscyIsImhleCIsInRvQnl0ZXMiLCJpdiIsInRleHRCeXRlcyIsInBhZGRpbmciLCJwa2NzNyIsInBhZCIsInV0ZjgiLCJhZXNDYmMiLCJNb2RlT2ZPcGVyYXRpb24iLCJjYmMiLCJlbmNyeXB0ZWRCeXRlcyIsImVuY3J5cHQiLCJlbmNyeXB0ZWRTdHJpbmciLCJmcm9tQnl0ZXMiLCJkZWNyeXB0ZWRCeXRlcyIsImRlY3J5cHQiLCJkZWNyeXB0ZWQiLCJzdHJpcCIsIm1lc3NhZ2VUb1NpZ24iLCJzaGFPYmoiLCJqc1NIQSIsInNldEhNQUNLZXkiLCJ1cGRhdGUiLCJnZXRITUFDIiwidmFsdWUiLCJzaGFIYXNoIiwiZ2V0SGFzaCIsIktleVJvbGxpbmdIZWxwZXIiLCJrclJlcXVlc3QiLCJjdXJyZW50U2VjcmV0cyIsIktleVJvbGxSZXNwb25zZSIsIm5ld1NlY3JldHMiLCJTZWNyZXRzIiwiR2VuZXJhdGVIYXNoIiwiRW5jS2V5IiwidG9VcHBlckNhc2UiLCJIbWFjS2V5IiwiS2V5Um9sbGluZ1Jlc3VsdCIsImtleVJvbGxpbmdDb25maXJtYXRpb24iLCJLZXlSb2xsaW5nQ29uZmlybWF0aW9uIiwiTmV3U2VjcmV0cyIsImVsZW1lbnQiLCJsaW5lU2VwZXJhdG9yIiwiYnVmZmVyIiwiYXJncyIsInB1c2giLCJqb2luIiwiX3JlbmRlciIsImNvbnNvbGUiLCJsb2ciLCJpbm5lclRleHQiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJQYWlyUmVxdWVzdCIsIktleVJlcXVlc3QiLCJLZXlSZXNwb25zZSIsIktleUNoZWNrIiwiUGFpclJlc3BvbnNlIiwiRHJvcEtleXNBZHZpY2UiLCJMb2dpblJlcXVlc3QiLCJMb2dpblJlc3BvbnNlIiwiUGluZyIsIlBvbmciLCJQdXJjaGFzZVJlcXVlc3QiLCJQdXJjaGFzZVJlc3BvbnNlIiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0IiwiR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCIsIkdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIiwiUmVmdW5kUmVxdWVzdCIsIlJlZnVuZFJlc3BvbnNlIiwiU2lnbmF0dXJlUmVxdWlyZWQiLCJTaWduYXR1cmVEZWNsaW5lZCIsIlNpZ25hdHVyZUFjY2VwdGVkIiwiQXV0aENvZGVSZXF1aXJlZCIsIkF1dGhDb2RlQWR2aWNlIiwiTW90b1B1cmNoYXNlUmVxdWVzdCIsIk1vdG9QdXJjaGFzZVJlc3BvbnNlIiwiU2V0dGxlUmVxdWVzdCIsIlNldHRsZVJlc3BvbnNlIiwiU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0IiwiU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZSIsIktleVJvbGxSZXF1ZXN0IiwiSW52YWxpZEhtYWNTaWduYXR1cmUiLCJQYXlBdFRhYmxlR2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlU2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlR2V0QmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbFBheW1lbnQiLCJVbmtub3duIiwiRmFpbGVkIiwiTWVzc2FnZVN0YW1wIiwicG9zSWQiLCJzZWNyZXRzIiwic2VydmVyVGltZURlbHRhIiwiUG9zSWQiLCJTZXJ2ZXJUaW1lRGVsdGEiLCJNZXNzYWdlRW52ZWxvcGUiLCJlbmMiLCJobWFjIiwiRW5jIiwiSG1hYyIsInBvc19pZCIsImlkIiwiZXZlbnROYW1lIiwibmVlZHNFbmNyeXB0aW9uIiwiRXZlbnROYW1lIiwiRGF0ZVRpbWVTdGFtcCIsIkluY29tbWluZ0htYWMiLCJfbmVlZHNFbmNyeXB0aW9uIiwiRGVjcnlwdGVkSnNvbiIsInN1Y2Nlc3MiLCJlcnJvcl9yZWFzb24iLCJlcnJvcl9kZXRhaWwiLCJub3ciLCJEYXRlIiwiZHRzIiwic3BsaXQiLCJtc2dUaW1lIiwiZ2V0VGltZSIsInN0YW1wIiwidHpvZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImFkanVzdGVkVGltZSIsInRvSVNPU3RyaW5nIiwic2xpY2UiLCJlbnZlbG9wZSIsImV2ZW50IiwiZGF0ZXRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5jTXNnIiwiQWVzRW5jcnlwdCIsImhtYWNTaWciLCJIbWFjU2lnbmF0dXJlIiwiZW5jck1lc3NhZ2VFbnZlbG9wZSIsImJhbmtEYXRlIiwibGVuZ3RoIiwic3Vic3RyIiwiZGF0ZSIsInRpbWUiLCJtc2dKc29uIiwiZW52IiwicGFyc2UiLCJzaWciLCJkZWNyeXB0ZWRKc29uIiwiQWVzRGVjcnlwdCIsImRlY3J5cHRlZE1zZyIsIkluY29taW5nSG1hYyIsImUiLCJBZW5jIiwiQSIsIkFobWFjIiwicmVxdWVzdElkIiwiQmVuYyIsIkJobWFjIiwiQiIsIkNvbmZpcm1hdGlvbkNvZGUiLCJzdWJzdHJpbmciLCJTZWNyZXRzQW5kS2V5UmVzcG9uc2UiLCJrZXlSZXNwb25zZSIsIkRyb3BLZXlzUmVxdWVzdCIsIkJpbGxTdGF0dXNSZXNwb25zZSIsIlJlc3VsdCIsIkJpbGxJZCIsIlRhYmxlSWQiLCJUb3RhbEFtb3VudCIsIk91dHN0YW5kaW5nQW1vdW50IiwiQmlsbERhdGEiLCJiaWxsUGF5bWVudEhpc3RvcnkiLCJzYXZlZEJpbGxEYXRhIiwibWFwIiwiYmlsbCIsIlBheW1lbnRIaXN0b3J5RW50cnkiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X3N1bW1hcnkiLCJtZXNzYWdlSWQiLCJCaWxsUmV0cmlldmFsUmVzdWx0IiwiU1VDQ0VTUyIsImJpbGxfaWQiLCJ0YWJsZV9pZCIsImJpbGxfdG90YWxfYW1vdW50IiwiYmlsbF9vdXRzdGFuZGluZ19hbW91bnQiLCJiaWxsX3BheW1lbnRfaGlzdG9yeSIsImdldEJpbGxQYXltZW50SGlzdG9yeSIsInRvU3RyaW5nIiwicGgiLCJJTlZBTElEX1RBQkxFX0lEIiwiSU5WQUxJRF9CSUxMX0lEIiwiSU5WQUxJRF9PUEVSQVRPUl9JRCIsIlBheW1lbnRUeXBlIiwiQ0FSRCIsIkNBU0giLCJCaWxsUGF5bWVudCIsIl9pbmNvbWluZ0FkdmljZSIsIk9wZXJhdG9ySWQiLCJwdCIsInB1cmNoYXNlTXNnIiwiUHVyY2hhc2VBbW91bnQiLCJHZXRQdXJjaGFzZUFtb3VudCIsIlRpcEFtb3VudCIsIkdldFRpcEFtb3VudCIsInBheW1lbnRUeXBlIiwicGF5bWVudFN1bW1hcnkiLCJQYXltZW50U3VtbWFyeSIsIlBheUF0VGFibGVDb25maWciLCJQYXlBdFRhYmxlZEVuYWJsZWQiLCJPcGVyYXRvcklkRW5hYmxlZCIsIlNwbGl0QnlBbW91bnRFbmFibGVkIiwiRXF1YWxTcGxpdEVuYWJsZWQiLCJUaXBwaW5nRW5hYmxlZCIsIlN1bW1hcnlSZXBvcnRFbmFibGVkIiwiTGFiZWxQYXlCdXR0b24iLCJMYWJlbE9wZXJhdG9ySWQiLCJMYWJlbFRhYmxlSWQiLCJBbGxvd2VkT3BlcmF0b3JJZHMiLCJQb25nSGVscGVyIiwicGluZyIsIlBpbmdIZWxwZXIiLCJQcmVhdXRoRXZlbnRzIiwiQWNjb3VudFZlcmlmeVJlcXVlc3QiLCJBY2NvdW50VmVyaWZ5UmVzcG9uc2UiLCJQcmVhdXRoT3BlblJlcXVlc3QiLCJQcmVhdXRoT3BlblJlc3BvbnNlIiwiUHJlYXV0aFRvcHVwUmVxdWVzdCIsIlByZWF1dGhUb3B1cFJlc3BvbnNlIiwiUHJlYXV0aEV4dGVuZFJlcXVlc3QiLCJQcmVhdXRoRXh0ZW5kUmVzcG9uc2UiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlc3BvbnNlIiwiUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2UiLCJQcmVhdXRoQ29tcGxldGVSZXF1ZXN0IiwiUHJlYXV0aENvbXBsZXRlUmVzcG9uc2UiLCJEZXRhaWxzIiwiUHJlYXV0aEFtb3VudCIsInByZWF1dGhJZCIsInRvcHVwQW1vdW50Q2VudHMiLCJQcmVhdXRoSWQiLCJUb3B1cEFtb3VudCIsInBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnRDZW50cyIsIlBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnQiLCJQcmVhdXRoQ2FuY2VsUmVxdWVzdCIsIlByZWF1dGhDb21wbGV0aW9uUmVxdWVzdCIsImNvbXBsZXRpb25BbW91bnRDZW50cyIsIkNvbXBsZXRpb25BbW91bnQiLCJQcmVhdXRoUmVzcG9uc2UiLCJ0eFR5cGUiLCJQcm9tcHRGb3JDYXNob3V0IiwiQW1vdW50Q2VudHMiLCJ0b0ZpeGVkIiwicHVyY2hhc2VfYW1vdW50IiwidGlwX2Ftb3VudCIsImNhc2hfYW1vdW50IiwicHJvbXB0X2Zvcl9jYXNob3V0Iiwic3VyY2hhcmdlX2Ftb3VudCIsIlNjaGVtZUFwcE5hbWUiLCJycm4iLCJiYW5rX25vbmNhc2hfYW1vdW50IiwiYmFua19jYXNoX2Ftb3VudCIsImN1c3RvbWVyX3JlY2VpcHQiLCJtZXJjaGFudF9yZWNlaXB0IiwiaG9zdF9yZXNwb25zZV90ZXh0IiwiaG9zdF9yZXNwb25zZV9jb2RlIiwidGVybWluYWxfcmVmX2lkIiwiY2FyZF9lbnRyeSIsImFjY291bnRfdHlwZSIsImF1dGhfY29kZSIsImJhbmtfZGF0ZSIsImJhbmtfdGltZSIsIm1hc2tlZF9wYW4iLCJ0ZXJtaW5hbF9pZCIsIm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZCIsImN1c3RvbWVyX3JlY2VpcHRfcHJpbnRlZCIsImRhdGVTdHIiLCJiYW5rX3NldHRsZW1lbnRfZGF0ZSIsIlBhcnNlQmFua0RhdGUiLCJHZXRBY2NvdW50VHlwZSIsIkdldEF1dGhDb2RlIiwiR2V0QmFua0RhdGUiLCJHZXRCYW5rVGltZSIsIkdldFJlc3BvbnNlQ29kZSIsIkdldFJlc3BvbnNlVGV4dCIsIkdldE1hc2tlZFBhbiIsIkdldFJSTiIsIkdldFRlcm1pbmFsSWQiLCJHZXRUZXJtaW5hbFJlZmVyZW5jZUlkIiwiR2V0U3VyY2hhcmdlQW1vdW50IiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXNwb25zZSIsIkdldEVycm9yIiwic3RhcnRzV2l0aCIsIldhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvciIsIkdldFBvc1JlZklkIiwidHJhbnNhY3Rpb25fdHlwZSIsImFtb3VudF9wdXJjaGFzZSIsImFtb3VudF90cmFuc2FjdGlvbl90eXBlIiwiZHMiLCJjciIsIm1yIiwicmVmdW5kX2Ftb3VudCIsIl9yZWNlaXB0VG9TaWduIiwicmVjZWlwdFRvU2lnbiIsIlNpZ25hdHVyZURlY2xpbmUiLCJTaWduYXR1cmVBY2NlcHQiLCJQaG9uZUZvckF1dGhSZXF1aXJlZCIsIl9waG9uZU51bWJlciIsIl9tZXJjaGFudElkIiwiYXV0aF9jZW50cmVfcGhvbmVfbnVtYmVyIiwibWVyY2hhbnRfaWQiLCJhdXRoQ29kZSIsIkF1dGhDb2RlIiwiUHVyY2hhc2VIZWxwZXIiLCJwdXJjaGFzZUlkIiwicHVyY2hhc2VBbW91bnQiLCJ0aXBBbW91bnQiLCJjYXNob3V0QW1vdW50IiwicHJvbXB0Rm9yQ2FzaG91dCIsInByIiwiT2JqZWN0IiwiYXNzaWduIiwiaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQiLCJfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIiLCJwcmVmaXgiLCJlbmNLZXkiLCJobWFjS2V5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwiRGV2aWNlQWRkcmVzc1N0YXR1cyIsImFkZHJlc3MiLCJsYXN0VXBkYXRlZCIsIkxhc3RVcGRhdGVkIiwiRGV2aWNlQWRkcmVzc1NlcnZpY2UiLCJzZXJpYWxOdW1iZXIiLCJhcGlLZXkiLCJpc1Rlc3RNb2RlIiwiZGV2aWNlQWRkcmVzc1VyaSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiU3RhdHVzQ29kZSIsIkVycm9yRXhjZXB0aW9uIiwiU2V0dGxlbWVudCIsImFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl9jb3VudCIsImFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl92YWx1ZSIsImFjY3VtdWxhdGVkX3RvdGFsX2NvdW50IiwiYWNjdW11bGF0ZWRfdG90YWxfdmFsdWUiLCJ0aW1lU3RyIiwic2V0dGxlbWVudF9wZXJpb2Rfc3RhcnRfdGltZSIsInNldHRsZW1lbnRfcGVyaW9kX3N0YXJ0X2RhdGUiLCJQYXJzZUJhbmtEYXRlVGltZVN0ciIsInNldHRsZW1lbnRfcGVyaW9kX2VuZF90aW1lIiwic2V0dGxlbWVudF9wZXJpb2RfZW5kX2RhdGUiLCJzZXR0bGVtZW50X3RyaWdnZXJlZF90aW1lIiwic2V0dGxlbWVudF90cmlnZ2VyZWRfZGF0ZSIsInRyYW5zYWN0aW9uX3JhbmdlIiwic2NoZW1lcyIsInNjaGVtZSIsIlNjaGVtZVNldHRsZW1lbnRFbnRyeSIsIlNldHRsZUJ5QWNxdWlyZXIiLCJzZXR0bGVfYnlfYWNxdWlyZXIiLCJ0b0xvd2VyQ2FzZSIsIlRvdGFsVmFsdWUiLCJwYXJzZUludCIsInRvdGFsX3ZhbHVlIiwiVG90YWxDb3VudCIsInRvdGFsX2NvdW50IiwiU1BJX1ZFUlNJT04iLCJfY3VycmVudFN0YXR1cyIsImVmdHBvc0FkZHJlc3MiLCJfcG9zSWQiLCJfc2VyaWFsTnVtYmVyIiwiX3NlY3JldHMiLCJfZWZ0cG9zQWRkcmVzcyIsIl9sb2ciLCJDdXJyZW50RGV2aWNlU3RhdHVzIiwiX2RldmljZUFwaUtleSIsIl9pblRlc3RNb2RlIiwiX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQiLCJfc3BpTWVzc2FnZVN0YW1wIiwiX21vc3RSZWNlbnRQaW5nU2VudCIsIl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkIiwiX21pc3NlZFBvbmdzQ291bnQiLCJfcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uIiwiX21vc3RSZWNlbnRMb2dpblJlc3BvbnNlIiwiX3BvbmdUaW1lb3V0IiwiX3BpbmdGcmVxdWVuY3kiLCJfcmVhZHlUb1RyYW5zYWN0IiwiX3BlcmlvZGljUGluZ1RocmVhZCIsIl90eE1vbml0b3JDaGVja0ZyZXF1ZW5jeSIsIl9jaGVja09uVHhGcmVxdWVuY3kiLCJfbWF4V2FpdEZvckNhbmNlbFR4IiwiX3NsZWVwQmVmb3JlUmVjb25uZWN0TXMiLCJfbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3QiLCJfcmV0cmllc0JlZm9yZVJlc29sdmluZ0RldmljZUFkZHJlc3MiLCJDdXJyZW50RmxvdyIsIkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlIiwiQ3VycmVudFR4Rmxvd1N0YXRlIiwiX3NwaVBhdCIsIlNwaVBheUF0VGFibGUiLCJfc3BpUHJlYXV0aCIsIlNwaVByZWF1dGgiLCJfcmVzZXRDb25uIiwiX3N0YXJ0VHJhbnNhY3Rpb25Nb25pdG9yaW5nVGhyZWFkIiwiU3BpRmxvdyIsIklkbGUiLCJpbmZvIiwiU3BpU3RhdHVzIiwiUGFpcmVkQ29ubmVjdGluZyIsIl9jb25uIiwiQ29ubmVjdCIsIlVucGFpcmVkIiwiZGV2aWNlQXBpS2V5IiwiQ3VycmVudFN0YXR1cyIsIkhhc1NlcmlhbE51bWJlckNoYW5nZWQiLCJfYXV0b1Jlc29sdmVFZnRwb3NBZGRyZXNzIiwiYXV0b0FkZHJlc3NSZXNvbHV0aW9uIiwiUGFpcmVkQ29ubmVjdGVkIiwidGVzdE1vZGUiLCJQYWlyaW5nIiwiRmluaXNoZWQiLCJUcmFuc2FjdGlvbiIsIndhcm4iLCJQYWlyaW5nRmxvd1N0YXRlIiwiU3VjY2Vzc2Z1bCIsIkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zIiwiQXdhaXRpbmdDaGVja0Zyb21Qb3MiLCJfb25QYWlyaW5nU3VjY2VzcyIsIl9vblJlYWR5VG9UcmFuc2FjdCIsIl9zZW5kIiwiVG9NZXNzYWdlIiwiX29uUGFpcmluZ0ZhaWxlZCIsIl9kb1VucGFpciIsIkluaXRpYXRlVHhSZXN1bHQiLCJwdXJjaGFzZVJlcXVlc3QiLCJDcmVhdGVQdXJjaGFzZVJlcXVlc3QiLCJUcmFuc2FjdGlvbkZsb3dTdGF0ZSIsIlRyYW5zYWN0aW9uVHlwZSIsIlB1cmNoYXNlIiwiU2VudCIsIm9wdGlvbnMiLCJwdXJjaGFzZSIsIkNyZWF0ZVB1cmNoYXNlUmVxdWVzdFYyIiwiQW1vdW50U3VtbWFyeSIsInJlZnVuZFJlcXVlc3QiLCJDcmVhdGVSZWZ1bmRSZXF1ZXN0IiwicmVmdW5kTXNnIiwiUmVmdW5kIiwiYWNjZXB0ZWQiLCJBd2FpdGluZ1NpZ25hdHVyZUNoZWNrIiwiTWlkVHhSZXN1bHQiLCJTaWduYXR1cmVSZXNwb25kZWQiLCJzaWdSZXFNc2ciLCJTaWduYXR1cmVSZXF1aXJlZE1lc3NhZ2UiLCJTdWJtaXRBdXRoQ29kZVJlc3VsdCIsIkF3YWl0aW5nUGhvbmVGb3JBdXRoIiwiQXV0aENvZGVTZW50IiwiUmVxdWVzdFNlbnQiLCJjYW5jZWxSZXEiLCJDYW5jZWxsaW5nIiwiY2FzaG91dE9ubHlSZXF1ZXN0IiwiY2FzaG91dE1zZyIsIkNhc2hvdXRPbmx5IiwibW90b1B1cmNoYXNlUmVxdWVzdCIsIk1PVE8iLCJzZXR0bGVSZXF1ZXN0TXNnIiwiU2V0dGxlIiwic3RsRW5xTXNnIiwiU2V0dGxlbWVudEVucXVpcnkiLCJnbHRSZXF1ZXN0TXNnIiwiR2V0TGFzdFRyYW5zYWN0aW9uIiwiZ2x0UmVzcG9uc2UiLCJHbHRNYXRjaCIsIlBhaXJpbmdIZWxwZXIiLCJyZXN1bHQiLCJHZW5lcmF0ZVNlY3JldHNBbmRLZXlSZXNwb25zZSIsImtleUNoZWNrIiwicGFpclJlc3AiLCJfc3RhcnRQZXJpb2RpY1BpbmciLCJrclJlcyIsIlBlcmZvcm1LZXlSb2xsaW5nIiwiaW5jb21pbmdQb3NSZWZJZCIsInBob25lRm9yQXV0aFJlcXVpcmVkIiwibXNnIiwiR2V0UGhvbmVOdW1iZXIiLCJHZXRNZXJjaGFudElkIiwiQ29tcGxldGVkIiwiQXR0ZW1wdGluZ1RvQ2FuY2VsIiwiX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24iLCJ0eFN0YXRlIiwiR290R2x0UmVzcG9uc2UiLCJndGxSZXNwb25zZSIsIkdMVFJlc3BvbnNlUG9zUmVmSWQiLCJXYXNSZXRyaWV2ZWRTdWNjZXNzZnVsbHkiLCJJc1N0aWxsSW5Qcm9ncmVzcyIsIklzV2FpdGluZ0ZvclNpZ25hdHVyZVJlc3BvbnNlIiwiSXNXYWl0aW5nRm9yQXV0aENvZGUiLCJXYXNUaW1lT3V0T2ZTeW5jRXJyb3IiLCJVbmtub3duQ29tcGxldGVkIiwiVHlwZSIsIkNvcHlNZXJjaGFudFJlY2VpcHRUb0N1c3RvbWVyUmVjZWlwdCIsInN1Y2Nlc3NTdGF0ZSIsImNhbmNlbFJlc3BvbnNlIiwiR2V0RXJyb3JSZWFzb24iLCJHZXRFcnJvckRldGFpbCIsIkNhbmNlbEZhaWxlZCIsIm5lZWRzUHVibGlzaGluZyIsInN0YXRlIiwiQ2FuY2VsQXR0ZW1wdFRpbWUiLCJMYXN0U3RhdGVSZXF1ZXN0VGltZSIsIkNhbGxpbmdHbHQiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uU3BpQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQiLCJfb25TcGlNZXNzYWdlUmVjZWl2ZWQiLCJfb25Xc0Vycm9yUmVjZWl2ZWQiLCJOZXdQYWlyUmVxdWVzdCIsIl9zdG9wUGVyaW9kaWNQaW5nIiwiRXhjZXB0aW9uIiwic2V0SW50ZXJ2YWwiLCJfcGVyaW9kaWNQaW5nIiwiX2RvUGluZyIsIlJlcXVlc3QiLCJQdXNoUGF5QXRUYWJsZUNvbmZpZyIsImNsZWFySW50ZXJ2YWwiLCJHZW5lcmF0ZVBpbmdSZXF1ZXN0IiwiX21vc3RSZWNlbnRQaW5nU2VudFRpbWUiLCJHZXRTZXJ2ZXJUaW1lRGVsdGEiLCJkZWJ1ZyIsInBvbmciLCJHZW5lcmF0ZVBvbmdSZXNzcG9uc2UiLCJnbHRSZXF1ZXN0IiwibWVzc2FnZUpzb24iLCJGcm9tSnNvbiIsIklzUHJlYXV0aEV2ZW50IiwiX2hhbmRsZVByZWF1dGhNZXNzYWdlIiwiX2hhbmRsZUtleVJlcXVlc3QiLCJfaGFuZGxlS2V5Q2hlY2siLCJfaGFuZGxlUGFpclJlc3BvbnNlIiwiX2hhbmRsZURyb3BLZXlzQWR2aWNlIiwiX2hhbmRsZVB1cmNoYXNlUmVzcG9uc2UiLCJfaGFuZGxlUmVmdW5kUmVzcG9uc2UiLCJfaGFuZGxlQ2FzaG91dE9ubHlSZXNwb25zZSIsIl9oYW5kbGVNb3RvUHVyY2hhc2VSZXNwb25zZSIsIl9oYW5kbGVTaWduYXR1cmVSZXF1aXJlZCIsIl9oYW5kbGVBdXRoQ29kZVJlcXVpcmVkIiwiX2hhbmRsZUdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIiwiSGFuZGxlU2V0dGxlUmVzcG9uc2UiLCJfaGFuZGxlU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZSIsIl9oYW5kbGVJbmNvbWluZ1BpbmciLCJfaGFuZGxlSW5jb21pbmdQb25nIiwiX2hhbmRsZUtleVJvbGxpbmdSZXF1ZXN0IiwiRmVhdHVyZURpc2FibGVNZXNzYWdlIiwiX2hhbmRsZUdldFRhYmxlQ29uZmlnIiwiX2hhbmRsZUdldEJpbGxEZXRhaWxzUmVxdWVzdCIsIl9oYW5kbGVCaWxsUGF5bWVudEFkdmljZSIsIl9oYW5kbGVFcnJvckV2ZW50IiwiVG9Kc29uIiwiU2VuZCIsInVwZGF0ZWRTZXJpYWxOdW1iZXIiLCJ1cGRhdGVkRWZ0cG9zQWRkcmVzcyIsInNlcnZpY2UiLCJSZXRyaWV2ZVNlcnZpY2UiLCJhZGRyZXNzUmVzcG9uc2UiLCJIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCIsIlByZWF1dGgiLCJBY2NvdW50VmVyaWZ5IiwiaW5pdGlhdGVkIiwiSW5pdGlhdGVkIiwidmFsaWQiLCJWYWxpZCIsInR5cGUiLCJEaXNwbGF5TWVzc2FnZSIsIlJlcXVlc3RUaW1lIiwiUmVzcG9uc2UiLCJQaG9uZUZvckF1dGhSZXF1aXJlZE1lc3NhZ2UiLCJBd2FpdGluZ0dsdFJlc3BvbnNlIiwic3BpTWVzc2FnZSIsInZhbGlkRm9ybWF0IiwiVmFsaWRGb3JtYXQiLCJQcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcyIsIlNpZ25hdHVyZUZsb3dPbkVmdHBvcyIsIlByaW50TWVyY2hhbnRDb3B5IiwibWVzc2FnZURhdGEiLCJwcm9tcHRfZm9yX2N1c3RvbWVyX2NvcHkiLCJwcmludF9mb3Jfc2lnbmF0dXJlX3JlcXVpcmVkX3RyYW5zYWN0aW9ucyIsInByaW50X21lcmNoYW50X2NvcHkiLCJfY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiX2N1c3RvbWVyUmVjZWlwdEZvb3RlciIsIl9tZXJjaGFudFJlY2VpcHRIZWFkZXIiLCJfbWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiY3VzdG9tZXJSZWNlaXB0Rm9vdGVyIiwibWVyY2hhbnRSZWNlaXB0SGVhZGVyIiwibWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJfcmVjZWlwdF9oZWFkZXIiLCJjdXN0b21lcl9yZWNlaXB0X2Zvb3RlciIsIm1lcmNoYW50X3JlY2VpcHRfaGVhZGVyIiwibWVyY2hhbnRfcmVjZWlwdF9mb290ZXIiLCJzcGkiLCJfc3BpIiwiYmlsbElkIiwidGFibGVJZCIsIm9wZXJhdG9ySWQiLCJiaWxsUGF5bWVudCIsInVwZGF0ZWRCaWxsRGF0YSIsImJpbGxTdGF0dXMiLCJHZXRCaWxsU3RhdHVzIiwiZXhpc3RpbmdCaWxsU3RhdHVzIiwiZXhpc3RpbmdQYXltZW50SGlzdG9yeSIsImZvdW5kRXhpc3RpbmdFbnRyeSIsImZpbmQiLCJwaGUiLCJHZXRUZXJtaW5hbFJlZklkIiwidXBkYXRlZEhpc3RvcnlFbnRyaWVzIiwiVG9QYXltZW50U3VtbWFyeSIsIlRvQmlsbERhdGEiLCJ1cGRhdGVkQmlsbFN0YXR1cyIsIkJpbGxQYXltZW50UmVjZWl2ZWQiLCJ2ZXJpZnlNc2ciLCJ0ZnMiLCJzZW50TXNnIiwiX2luaXRpYXRlUHJlYXV0aFR4IiwiX2hhbmRsZUFjY291bnRWZXJpZnlSZXNwb25zZSIsIl9oYW5kbGVQcmVhdXRoUmVzcG9uc2UiLCJjdXJyZW50VHhGbG93U3RhdGUiLCJsYXN0SW5kZXhPZiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFD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QWxELEVBQXFELDRCQUFyRCxFQVZKLENBV0k7O0FBRUFxQyxjQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBSUMsV0FBSixDQUFnQixvQkFBaEIsRUFBc0M7QUFBQ0MsY0FBTSxFQUFFLEtBQUs0bUIsSUFBTCxDQUFVMU07QUFBbkIsT0FBdEMsQ0FBdkI7QUFDSDtBQXBKTDtBQUFBO0FBQUEsbUNBc0owQjNTLFNBdEoxQixFQXVKSTtBQUNJLGFBQU9BLFNBQVMsQ0FBQytnQixXQUFWLENBQXNCLFNBQXRCLEVBQWdDLENBQWhDLE1BQXVDLENBQXZDLElBQ0kvZ0IsU0FBUyxJQUFJbUgsc0RBQWEsQ0FBQ2MsdUJBRC9CLElBRUlqSSxTQUFTLElBQUltSCxzREFBYSxDQUFDYSxzQkFGL0IsSUFHSWhJLFNBQVMsSUFBSW1ILHNEQUFhLENBQUNDLG9CQUgvQixJQUlJcEgsU0FBUyxJQUFJbUgsc0RBQWEsQ0FBQ0UscUJBSnRDO0FBS0g7QUE3Skw7O0FBQUE7QUFBQSxJIiwiZmlsZSI6InNwaS1jbGllbnQtanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZmMwMTM2YTIyYTZiZjc2YjNmM2FcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtTcGl9IGZyb20gXCIuL3NyYy9TcGlcIjtcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL3NyYy9Mb2dnZXInO1xuaW1wb3J0IHtQcmludGVyfSBmcm9tICcuL3NyYy9QcmludGluZyc7XG5cbi8vIFJlLWV4cG9ydGVkIG1vZHVsZXMgcmVxdWlyZWQgZm9yIFBPUyB2ZW5kb3JzXG5leHBvcnQge1NwaX0gZnJvbSAnLi9zcmMvU3BpJztcbmV4cG9ydCB7TG9nZ2VyfSBmcm9tICcuL3NyYy9Mb2dnZXInO1xuZXhwb3J0IHtTZWNyZXRzfSBmcm9tICcuL3NyYy9TZWNyZXRzJztcbmV4cG9ydCB7U3VjY2Vzc1N0YXRlfSBmcm9tICcuL3NyYy9NZXNzYWdlcyc7XG5leHBvcnQge1RyYW5zYWN0aW9uT3B0aW9ucywgVHJhbnNhY3Rpb25UeXBlLCBTcGlGbG93LCBTcGlTdGF0dXN9IGZyb20gJy4vc3JjL1NwaU1vZGVscyc7XG5leHBvcnQge1JlZnVuZFJlc3BvbnNlLCBQdXJjaGFzZVJlc3BvbnNlLCBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSwgTW90b1B1cmNoYXNlUmVzcG9uc2V9IGZyb20gJy4vc3JjL1B1cmNoYXNlJztcbmV4cG9ydCB7Q2FzaG91dE9ubHlSZXNwb25zZX0gZnJvbSAnLi9zcmMvQ2FzaG91dCc7XG5leHBvcnQge1NldHRsZW1lbnR9IGZyb20gJy4vc3JjL1NldHRsZW1lbnQnO1xuXG53aW5kb3cuU3BpID0gU3BpO1xud2luZG93LkxvZ2dlciA9IExvZ2dlcjtcbndpbmRvdy5QcmludGVyID0gUHJpbnRlcjsiLCIoZnVuY3Rpb24ocm9vdCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tJbnQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIChwYXJzZUludCh2YWx1ZSkgPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0ludHMoYXJyYXlpc2gpIHtcbiAgICAgICAgaWYgKCFjaGVja0ludChhcnJheWlzaC5sZW5ndGgpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlpc2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnQoYXJyYXlpc2hbaV0pIHx8IGFycmF5aXNoW2ldIDwgMCB8fCBhcnJheWlzaFtpXSA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvZXJjZUFycmF5KGFyZywgY29weSkge1xuXG4gICAgICAgIC8vIEFycmF5QnVmZmVyIHZpZXdcbiAgICAgICAgaWYgKGFyZy5idWZmZXIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KGFyZykgJiYgYXJnLm5hbWUgPT09ICdVaW50OEFycmF5Jykge1xuXG4gICAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgICAgIGlmIChhcmcuc2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdCdzIGFuIGFycmF5OyBjaGVjayBpdCBpcyBhIHZhbGlkIHJlcHJlc2VudGF0aW9uIG9mIGEgYnl0ZVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW50cyhhcmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheSBjb250YWlucyBpbnZhbGlkIHZhbHVlOiAnICsgYXJnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb21ldGhpbmcgZWxzZSwgYnV0IGJlaGF2ZXMgbGlrZSBhbiBhcnJheSAobWF5YmUgYSBCdWZmZXI/IEFyZ3VtZW50cz8pXG4gICAgICAgIGlmIChjaGVja0ludChhcmcubGVuZ3RoKSAmJiBjaGVja0ludHMoYXJnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQXJyYXkobGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2VBcnJheSwgdGFyZ2V0QXJyYXksIHRhcmdldFN0YXJ0LCBzb3VyY2VTdGFydCwgc291cmNlRW5kKSB7XG4gICAgICAgIGlmIChzb3VyY2VTdGFydCAhPSBudWxsIHx8IHNvdXJjZUVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlQXJyYXkuc2xpY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VBcnJheSA9IHNvdXJjZUFycmF5LnNsaWNlKHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNvdXJjZUFycmF5LCBzb3VyY2VTdGFydCwgc291cmNlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRBcnJheS5zZXQoc291cmNlQXJyYXksIHRhcmdldFN0YXJ0KTtcbiAgICB9XG5cblxuXG4gICAgdmFyIGNvbnZlcnRVdGY4ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiB0b0J5dGVzKHRleHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgaSA9IDA7XG4gICAgICAgICAgICB0ZXh0ID0gZW5jb2RlVVJJKHRleHQpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyBhICUgc2lnbiwgZW5jb2RlIHRoZSBmb2xsb3dpbmcgMiBieXRlcyBhcyBhIGhleCB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChjID09PSAzNykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludCh0ZXh0LnN1YnN0cihpLCAyKSwgMTYpKVxuICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG5cbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIGp1c3QgdGhlIGFjdHVhbCBieXRlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2VyY2VBcnJheShyZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sIGkgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoaSA8IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gYnl0ZXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGMpKTtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA+IDE5MSAmJiBjIDwgMjI0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMHgxZikgPDwgNikgfCAoYnl0ZXNbaSArIDFdICYgMHgzZikpKTtcbiAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMHgwZikgPDwgMTIpIHwgKChieXRlc1tpICsgMV0gJiAweDNmKSA8PCA2KSB8IChieXRlc1tpICsgMl0gJiAweDNmKSkpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvQnl0ZXM6IHRvQnl0ZXMsXG4gICAgICAgICAgICBmcm9tQnl0ZXM6IGZyb21CeXRlcyxcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICB2YXIgY29udmVydEhleCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdG9CeXRlcyh0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludCh0ZXh0LnN1YnN0cihpLCAyKSwgMTYpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHA6Ly9peHRpLm5ldC9kZXZlbG9wbWVudC9qYXZhc2NyaXB0LzIwMTEvMTEvMTEvYmFzZTY0LWVuY29kZWRlY29kZS1vZi11dGY4LWluLWJyb3dzZXItd2l0aC1qcy5odG1sXG4gICAgICAgIHZhciBIZXggPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgICAgICAgZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBieXRlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goSGV4Wyh2ICYgMHhmMCkgPj4gNF0gKyBIZXhbdiAmIDB4MGZdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b0J5dGVzOiB0b0J5dGVzLFxuICAgICAgICAgICAgZnJvbUJ5dGVzOiBmcm9tQnl0ZXMsXG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG5cbiAgICAvLyBOdW1iZXIgb2Ygcm91bmRzIGJ5IGtleXNpemVcbiAgICB2YXIgbnVtYmVyT2ZSb3VuZHMgPSB7MTY6IDEwLCAyNDogMTIsIDMyOiAxNH1cblxuICAgIC8vIFJvdW5kIGNvbnN0YW50IHdvcmRzXG4gICAgdmFyIHJjb24gPSBbMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxYiwgMHgzNiwgMHg2YywgMHhkOCwgMHhhYiwgMHg0ZCwgMHg5YSwgMHgyZiwgMHg1ZSwgMHhiYywgMHg2MywgMHhjNiwgMHg5NywgMHgzNSwgMHg2YSwgMHhkNCwgMHhiMywgMHg3ZCwgMHhmYSwgMHhlZiwgMHhjNSwgMHg5MV07XG5cbiAgICAvLyBTLWJveCBhbmQgSW52ZXJzZSBTLWJveCAoUyBpcyBmb3IgU3Vic3RpdHV0aW9uKVxuICAgIHZhciBTID0gWzB4NjMsIDB4N2MsIDB4NzcsIDB4N2IsIDB4ZjIsIDB4NmIsIDB4NmYsIDB4YzUsIDB4MzAsIDB4MDEsIDB4NjcsIDB4MmIsIDB4ZmUsIDB4ZDcsIDB4YWIsIDB4NzYsIDB4Y2EsIDB4ODIsIDB4YzksIDB4N2QsIDB4ZmEsIDB4NTksIDB4NDcsIDB4ZjAsIDB4YWQsIDB4ZDQsIDB4YTIsIDB4YWYsIDB4OWMsIDB4YTQsIDB4NzIsIDB4YzAsIDB4YjcsIDB4ZmQsIDB4OTMsIDB4MjYsIDB4MzYsIDB4M2YsIDB4ZjcsIDB4Y2MsIDB4MzQsIDB4YTUsIDB4ZTUsIDB4ZjEsIDB4NzEsIDB4ZDgsIDB4MzEsIDB4MTUsIDB4MDQsIDB4YzcsIDB4MjMsIDB4YzMsIDB4MTgsIDB4OTYsIDB4MDUsIDB4OWEsIDB4MDcsIDB4MTIsIDB4ODAsIDB4ZTIsIDB4ZWIsIDB4MjcsIDB4YjIsIDB4NzUsIDB4MDksIDB4ODMsIDB4MmMsIDB4MWEsIDB4MWIsIDB4NmUsIDB4NWEsIDB4YTAsIDB4NTIsIDB4M2IsIDB4ZDYsIDB4YjMsIDB4MjksIDB4ZTMsIDB4MmYsIDB4ODQsIDB4NTMsIDB4ZDEsIDB4MDAsIDB4ZWQsIDB4MjAsIDB4ZmMsIDB4YjEsIDB4NWIsIDB4NmEsIDB4Y2IsIDB4YmUsIDB4MzksIDB4NGEsIDB4NGMsIDB4NTgsIDB4Y2YsIDB4ZDAsIDB4ZWYsIDB4YWEsIDB4ZmIsIDB4NDMsIDB4NGQsIDB4MzMsIDB4ODUsIDB4NDUsIDB4ZjksIDB4MDIsIDB4N2YsIDB4NTAsIDB4M2MsIDB4OWYsIDB4YTgsIDB4NTEsIDB4YTMsIDB4NDAsIDB4OGYsIDB4OTIsIDB4OWQsIDB4MzgsIDB4ZjUsIDB4YmMsIDB4YjYsIDB4ZGEsIDB4MjEsIDB4MTAsIDB4ZmYsIDB4ZjMsIDB4ZDIsIDB4Y2QsIDB4MGMsIDB4MTMsIDB4ZWMsIDB4NWYsIDB4OTcsIDB4NDQsIDB4MTcsIDB4YzQsIDB4YTcsIDB4N2UsIDB4M2QsIDB4NjQsIDB4NWQsIDB4MTksIDB4NzMsIDB4NjAsIDB4ODEsIDB4NGYsIDB4ZGMsIDB4MjIsIDB4MmEsIDB4OTAsIDB4ODgsIDB4NDYsIDB4ZWUsIDB4YjgsIDB4MTQsIDB4ZGUsIDB4NWUsIDB4MGIsIDB4ZGIsIDB4ZTAsIDB4MzIsIDB4M2EsIDB4MGEsIDB4NDksIDB4MDYsIDB4MjQsIDB4NWMsIDB4YzIsIDB4ZDMsIDB4YWMsIDB4NjIsIDB4OTEsIDB4OTUsIDB4ZTQsIDB4NzksIDB4ZTcsIDB4YzgsIDB4MzcsIDB4NmQsIDB4OGQsIDB4ZDUsIDB4NGUsIDB4YTksIDB4NmMsIDB4NTYsIDB4ZjQsIDB4ZWEsIDB4NjUsIDB4N2EsIDB4YWUsIDB4MDgsIDB4YmEsIDB4NzgsIDB4MjUsIDB4MmUsIDB4MWMsIDB4YTYsIDB4YjQsIDB4YzYsIDB4ZTgsIDB4ZGQsIDB4NzQsIDB4MWYsIDB4NGIsIDB4YmQsIDB4OGIsIDB4OGEsIDB4NzAsIDB4M2UsIDB4YjUsIDB4NjYsIDB4NDgsIDB4MDMsIDB4ZjYsIDB4MGUsIDB4NjEsIDB4MzUsIDB4NTcsIDB4YjksIDB4ODYsIDB4YzEsIDB4MWQsIDB4OWUsIDB4ZTEsIDB4ZjgsIDB4OTgsIDB4MTEsIDB4NjksIDB4ZDksIDB4OGUsIDB4OTQsIDB4OWIsIDB4MWUsIDB4ODcsIDB4ZTksIDB4Y2UsIDB4NTUsIDB4MjgsIDB4ZGYsIDB4OGMsIDB4YTEsIDB4ODksIDB4MGQsIDB4YmYsIDB4ZTYsIDB4NDIsIDB4NjgsIDB4NDEsIDB4OTksIDB4MmQsIDB4MGYsIDB4YjAsIDB4NTQsIDB4YmIsIDB4MTZdO1xuICAgIHZhciBTaSA9WzB4NTIsIDB4MDksIDB4NmEsIDB4ZDUsIDB4MzAsIDB4MzYsIDB4YTUsIDB4MzgsIDB4YmYsIDB4NDAsIDB4YTMsIDB4OWUsIDB4ODEsIDB4ZjMsIDB4ZDcsIDB4ZmIsIDB4N2MsIDB4ZTMsIDB4MzksIDB4ODIsIDB4OWIsIDB4MmYsIDB4ZmYsIDB4ODcsIDB4MzQsIDB4OGUsIDB4NDMsIDB4NDQsIDB4YzQsIDB4ZGUsIDB4ZTksIDB4Y2IsIDB4NTQsIDB4N2IsIDB4OTQsIDB4MzIsIDB4YTYsIDB4YzIsIDB4MjMsIDB4M2QsIDB4ZWUsIDB4NGMsIDB4OTUsIDB4MGIsIDB4NDIsIDB4ZmEsIDB4YzMsIDB4NGUsIDB4MDgsIDB4MmUsIDB4YTEsIDB4NjYsIDB4MjgsIDB4ZDksIDB4MjQsIDB4YjIsIDB4NzYsIDB4NWIsIDB4YTIsIDB4NDksIDB4NmQsIDB4OGIsIDB4ZDEsIDB4MjUsIDB4NzIsIDB4ZjgsIDB4ZjYsIDB4NjQsIDB4ODYsIDB4NjgsIDB4OTgsIDB4MTYsIDB4ZDQsIDB4YTQsIDB4NWMsIDB4Y2MsIDB4NWQsIDB4NjUsIDB4YjYsIDB4OTIsIDB4NmMsIDB4NzAsIDB4NDgsIDB4NTAsIDB4ZmQsIDB4ZWQsIDB4YjksIDB4ZGEsIDB4NWUsIDB4MTUsIDB4NDYsIDB4NTcsIDB4YTcsIDB4OGQsIDB4OWQsIDB4ODQsIDB4OTAsIDB4ZDgsIDB4YWIsIDB4MDAsIDB4OGMsIDB4YmMsIDB4ZDMsIDB4MGEsIDB4ZjcsIDB4ZTQsIDB4NTgsIDB4MDUsIDB4YjgsIDB4YjMsIDB4NDUsIDB4MDYsIDB4ZDAsIDB4MmMsIDB4MWUsIDB4OGYsIDB4Y2EsIDB4M2YsIDB4MGYsIDB4MDIsIDB4YzEsIDB4YWYsIDB4YmQsIDB4MDMsIDB4MDEsIDB4MTMsIDB4OGEsIDB4NmIsIDB4M2EsIDB4OTEsIDB4MTEsIDB4NDEsIDB4NGYsIDB4NjcsIDB4ZGMsIDB4ZWEsIDB4OTcsIDB4ZjIsIDB4Y2YsIDB4Y2UsIDB4ZjAsIDB4YjQsIDB4ZTYsIDB4NzMsIDB4OTYsIDB4YWMsIDB4NzQsIDB4MjIsIDB4ZTcsIDB4YWQsIDB4MzUsIDB4ODUsIDB4ZTIsIDB4ZjksIDB4MzcsIDB4ZTgsIDB4MWMsIDB4NzUsIDB4ZGYsIDB4NmUsIDB4NDcsIDB4ZjEsIDB4MWEsIDB4NzEsIDB4MWQsIDB4MjksIDB4YzUsIDB4ODksIDB4NmYsIDB4YjcsIDB4NjIsIDB4MGUsIDB4YWEsIDB4MTgsIDB4YmUsIDB4MWIsIDB4ZmMsIDB4NTYsIDB4M2UsIDB4NGIsIDB4YzYsIDB4ZDIsIDB4NzksIDB4MjAsIDB4OWEsIDB4ZGIsIDB4YzAsIDB4ZmUsIDB4NzgsIDB4Y2QsIDB4NWEsIDB4ZjQsIDB4MWYsIDB4ZGQsIDB4YTgsIDB4MzMsIDB4ODgsIDB4MDcsIDB4YzcsIDB4MzEsIDB4YjEsIDB4MTIsIDB4MTAsIDB4NTksIDB4MjcsIDB4ODAsIDB4ZWMsIDB4NWYsIDB4NjAsIDB4NTEsIDB4N2YsIDB4YTksIDB4MTksIDB4YjUsIDB4NGEsIDB4MGQsIDB4MmQsIDB4ZTUsIDB4N2EsIDB4OWYsIDB4OTMsIDB4YzksIDB4OWMsIDB4ZWYsIDB4YTAsIDB4ZTAsIDB4M2IsIDB4NGQsIDB4YWUsIDB4MmEsIDB4ZjUsIDB4YjAsIDB4YzgsIDB4ZWIsIDB4YmIsIDB4M2MsIDB4ODMsIDB4NTMsIDB4OTksIDB4NjEsIDB4MTcsIDB4MmIsIDB4MDQsIDB4N2UsIDB4YmEsIDB4NzcsIDB4ZDYsIDB4MjYsIDB4ZTEsIDB4NjksIDB4MTQsIDB4NjMsIDB4NTUsIDB4MjEsIDB4MGMsIDB4N2RdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBlbmNyeXB0aW9uXG4gICAgdmFyIFQxID0gWzB4YzY2MzYzYTUsIDB4Zjg3YzdjODQsIDB4ZWU3Nzc3OTksIDB4ZjY3YjdiOGQsIDB4ZmZmMmYyMGQsIDB4ZDY2YjZiYmQsIDB4ZGU2ZjZmYjEsIDB4OTFjNWM1NTQsIDB4NjAzMDMwNTAsIDB4MDIwMTAxMDMsIDB4Y2U2NzY3YTksIDB4NTYyYjJiN2QsIDB4ZTdmZWZlMTksIDB4YjVkN2Q3NjIsIDB4NGRhYmFiZTYsIDB4ZWM3Njc2OWEsIDB4OGZjYWNhNDUsIDB4MWY4MjgyOWQsIDB4ODljOWM5NDAsIDB4ZmE3ZDdkODcsIDB4ZWZmYWZhMTUsIDB4YjI1OTU5ZWIsIDB4OGU0NzQ3YzksIDB4ZmJmMGYwMGIsIDB4NDFhZGFkZWMsIDB4YjNkNGQ0NjcsIDB4NWZhMmEyZmQsIDB4NDVhZmFmZWEsIDB4MjM5YzljYmYsIDB4NTNhNGE0ZjcsIDB4ZTQ3MjcyOTYsIDB4OWJjMGMwNWIsIDB4NzViN2I3YzIsIDB4ZTFmZGZkMWMsIDB4M2Q5MzkzYWUsIDB4NGMyNjI2NmEsIDB4NmMzNjM2NWEsIDB4N2UzZjNmNDEsIDB4ZjVmN2Y3MDIsIDB4ODNjY2NjNGYsIDB4NjgzNDM0NWMsIDB4NTFhNWE1ZjQsIDB4ZDFlNWU1MzQsIDB4ZjlmMWYxMDgsIDB4ZTI3MTcxOTMsIDB4YWJkOGQ4NzMsIDB4NjIzMTMxNTMsIDB4MmExNTE1M2YsIDB4MDgwNDA0MGMsIDB4OTVjN2M3NTIsIDB4NDYyMzIzNjUsIDB4OWRjM2MzNWUsIDB4MzAxODE4MjgsIDB4Mzc5Njk2YTEsIDB4MGEwNTA1MGYsIDB4MmY5YTlhYjUsIDB4MGUwNzA3MDksIDB4MjQxMjEyMzYsIDB4MWI4MDgwOWIsIDB4ZGZlMmUyM2QsIDB4Y2RlYmViMjYsIDB4NGUyNzI3NjksIDB4N2ZiMmIyY2QsIDB4ZWE3NTc1OWYsIDB4MTIwOTA5MWIsIDB4MWQ4MzgzOWUsIDB4NTgyYzJjNzQsIDB4MzQxYTFhMmUsIDB4MzYxYjFiMmQsIDB4ZGM2ZTZlYjIsIDB4YjQ1YTVhZWUsIDB4NWJhMGEwZmIsIDB4YTQ1MjUyZjYsIDB4NzYzYjNiNGQsIDB4YjdkNmQ2NjEsIDB4N2RiM2IzY2UsIDB4NTIyOTI5N2IsIDB4ZGRlM2UzM2UsIDB4NWUyZjJmNzEsIDB4MTM4NDg0OTcsIDB4YTY1MzUzZjUsIDB4YjlkMWQxNjgsIDB4MDAwMDAwMDAsIDB4YzFlZGVkMmMsIDB4NDAyMDIwNjAsIDB4ZTNmY2ZjMWYsIDB4NzliMWIxYzgsIDB4YjY1YjViZWQsIDB4ZDQ2YTZhYmUsIDB4OGRjYmNiNDYsIDB4NjdiZWJlZDksIDB4NzIzOTM5NGIsIDB4OTQ0YTRhZGUsIDB4OTg0YzRjZDQsIDB4YjA1ODU4ZTgsIDB4ODVjZmNmNGEsIDB4YmJkMGQwNmIsIDB4YzVlZmVmMmEsIDB4NGZhYWFhZTUsIDB4ZWRmYmZiMTYsIDB4ODY0MzQzYzUsIDB4OWE0ZDRkZDcsIDB4NjYzMzMzNTUsIDB4MTE4NTg1OTQsIDB4OGE0NTQ1Y2YsIDB4ZTlmOWY5MTAsIDB4MDQwMjAyMDYsIDB4ZmU3ZjdmODEsIDB4YTA1MDUwZjAsIDB4NzgzYzNjNDQsIDB4MjU5ZjlmYmEsIDB4NGJhOGE4ZTMsIDB4YTI1MTUxZjMsIDB4NWRhM2EzZmUsIDB4ODA0MDQwYzAsIDB4MDU4ZjhmOGEsIDB4M2Y5MjkyYWQsIDB4MjE5ZDlkYmMsIDB4NzAzODM4NDgsIDB4ZjFmNWY1MDQsIDB4NjNiY2JjZGYsIDB4NzdiNmI2YzEsIDB4YWZkYWRhNzUsIDB4NDIyMTIxNjMsIDB4MjAxMDEwMzAsIDB4ZTVmZmZmMWEsIDB4ZmRmM2YzMGUsIDB4YmZkMmQyNmQsIDB4ODFjZGNkNGMsIDB4MTgwYzBjMTQsIDB4MjYxMzEzMzUsIDB4YzNlY2VjMmYsIDB4YmU1ZjVmZTEsIDB4MzU5Nzk3YTIsIDB4ODg0NDQ0Y2MsIDB4MmUxNzE3MzksIDB4OTNjNGM0NTcsIDB4NTVhN2E3ZjIsIDB4ZmM3ZTdlODIsIDB4N2EzZDNkNDcsIDB4Yzg2NDY0YWMsIDB4YmE1ZDVkZTcsIDB4MzIxOTE5MmIsIDB4ZTY3MzczOTUsIDB4YzA2MDYwYTAsIDB4MTk4MTgxOTgsIDB4OWU0ZjRmZDEsIDB4YTNkY2RjN2YsIDB4NDQyMjIyNjYsIDB4NTQyYTJhN2UsIDB4M2I5MDkwYWIsIDB4MGI4ODg4ODMsIDB4OGM0NjQ2Y2EsIDB4YzdlZWVlMjksIDB4NmJiOGI4ZDMsIDB4MjgxNDE0M2MsIDB4YTdkZWRlNzksIDB4YmM1ZTVlZTIsIDB4MTYwYjBiMWQsIDB4YWRkYmRiNzYsIDB4ZGJlMGUwM2IsIDB4NjQzMjMyNTYsIDB4NzQzYTNhNGUsIDB4MTQwYTBhMWUsIDB4OTI0OTQ5ZGIsIDB4MGMwNjA2MGEsIDB4NDgyNDI0NmMsIDB4Yjg1YzVjZTQsIDB4OWZjMmMyNWQsIDB4YmRkM2QzNmUsIDB4NDNhY2FjZWYsIDB4YzQ2MjYyYTYsIDB4Mzk5MTkxYTgsIDB4MzE5NTk1YTQsIDB4ZDNlNGU0MzcsIDB4ZjI3OTc5OGIsIDB4ZDVlN2U3MzIsIDB4OGJjOGM4NDMsIDB4NmUzNzM3NTksIDB4ZGE2ZDZkYjcsIDB4MDE4ZDhkOGMsIDB4YjFkNWQ1NjQsIDB4OWM0ZTRlZDIsIDB4NDlhOWE5ZTAsIDB4ZDg2YzZjYjQsIDB4YWM1NjU2ZmEsIDB4ZjNmNGY0MDcsIDB4Y2ZlYWVhMjUsIDB4Y2E2NTY1YWYsIDB4ZjQ3YTdhOGUsIDB4NDdhZWFlZTksIDB4MTAwODA4MTgsIDB4NmZiYWJhZDUsIDB4ZjA3ODc4ODgsIDB4NGEyNTI1NmYsIDB4NWMyZTJlNzIsIDB4MzgxYzFjMjQsIDB4NTdhNmE2ZjEsIDB4NzNiNGI0YzcsIDB4OTdjNmM2NTEsIDB4Y2JlOGU4MjMsIDB4YTFkZGRkN2MsIDB4ZTg3NDc0OWMsIDB4M2UxZjFmMjEsIDB4OTY0YjRiZGQsIDB4NjFiZGJkZGMsIDB4MGQ4YjhiODYsIDB4MGY4YThhODUsIDB4ZTA3MDcwOTAsIDB4N2MzZTNlNDIsIDB4NzFiNWI1YzQsIDB4Y2M2NjY2YWEsIDB4OTA0ODQ4ZDgsIDB4MDYwMzAzMDUsIDB4ZjdmNmY2MDEsIDB4MWMwZTBlMTIsIDB4YzI2MTYxYTMsIDB4NmEzNTM1NWYsIDB4YWU1NzU3ZjksIDB4NjliOWI5ZDAsIDB4MTc4Njg2OTEsIDB4OTljMWMxNTgsIDB4M2ExZDFkMjcsIDB4Mjc5ZTllYjksIDB4ZDllMWUxMzgsIDB4ZWJmOGY4MTMsIDB4MmI5ODk4YjMsIDB4MjIxMTExMzMsIDB4ZDI2OTY5YmIsIDB4YTlkOWQ5NzAsIDB4MDc4ZThlODksIDB4MzM5NDk0YTcsIDB4MmQ5YjliYjYsIDB4M2MxZTFlMjIsIDB4MTU4Nzg3OTIsIDB4YzllOWU5MjAsIDB4ODdjZWNlNDksIDB4YWE1NTU1ZmYsIDB4NTAyODI4NzgsIDB4YTVkZmRmN2EsIDB4MDM4YzhjOGYsIDB4NTlhMWExZjgsIDB4MDk4OTg5ODAsIDB4MWEwZDBkMTcsIDB4NjViZmJmZGEsIDB4ZDdlNmU2MzEsIDB4ODQ0MjQyYzYsIDB4ZDA2ODY4YjgsIDB4ODI0MTQxYzMsIDB4Mjk5OTk5YjAsIDB4NWEyZDJkNzcsIDB4MWUwZjBmMTEsIDB4N2JiMGIwY2IsIDB4YTg1NDU0ZmMsIDB4NmRiYmJiZDYsIDB4MmMxNjE2M2FdO1xuICAgIHZhciBUMiA9IFsweGE1YzY2MzYzLCAweDg0Zjg3YzdjLCAweDk5ZWU3Nzc3LCAweDhkZjY3YjdiLCAweDBkZmZmMmYyLCAweGJkZDY2YjZiLCAweGIxZGU2ZjZmLCAweDU0OTFjNWM1LCAweDUwNjAzMDMwLCAweDAzMDIwMTAxLCAweGE5Y2U2NzY3LCAweDdkNTYyYjJiLCAweDE5ZTdmZWZlLCAweDYyYjVkN2Q3LCAweGU2NGRhYmFiLCAweDlhZWM3Njc2LCAweDQ1OGZjYWNhLCAweDlkMWY4MjgyLCAweDQwODljOWM5LCAweDg3ZmE3ZDdkLCAweDE1ZWZmYWZhLCAweGViYjI1OTU5LCAweGM5OGU0NzQ3LCAweDBiZmJmMGYwLCAweGVjNDFhZGFkLCAweDY3YjNkNGQ0LCAweGZkNWZhMmEyLCAweGVhNDVhZmFmLCAweGJmMjM5YzljLCAweGY3NTNhNGE0LCAweDk2ZTQ3MjcyLCAweDViOWJjMGMwLCAweGMyNzViN2I3LCAweDFjZTFmZGZkLCAweGFlM2Q5MzkzLCAweDZhNGMyNjI2LCAweDVhNmMzNjM2LCAweDQxN2UzZjNmLCAweDAyZjVmN2Y3LCAweDRmODNjY2NjLCAweDVjNjgzNDM0LCAweGY0NTFhNWE1LCAweDM0ZDFlNWU1LCAweDA4ZjlmMWYxLCAweDkzZTI3MTcxLCAweDczYWJkOGQ4LCAweDUzNjIzMTMxLCAweDNmMmExNTE1LCAweDBjMDgwNDA0LCAweDUyOTVjN2M3LCAweDY1NDYyMzIzLCAweDVlOWRjM2MzLCAweDI4MzAxODE4LCAweGExMzc5Njk2LCAweDBmMGEwNTA1LCAweGI1MmY5YTlhLCAweDA5MGUwNzA3LCAweDM2MjQxMjEyLCAweDliMWI4MDgwLCAweDNkZGZlMmUyLCAweDI2Y2RlYmViLCAweDY5NGUyNzI3LCAweGNkN2ZiMmIyLCAweDlmZWE3NTc1LCAweDFiMTIwOTA5LCAweDllMWQ4MzgzLCAweDc0NTgyYzJjLCAweDJlMzQxYTFhLCAweDJkMzYxYjFiLCAweGIyZGM2ZTZlLCAweGVlYjQ1YTVhLCAweGZiNWJhMGEwLCAweGY2YTQ1MjUyLCAweDRkNzYzYjNiLCAweDYxYjdkNmQ2LCAweGNlN2RiM2IzLCAweDdiNTIyOTI5LCAweDNlZGRlM2UzLCAweDcxNWUyZjJmLCAweDk3MTM4NDg0LCAweGY1YTY1MzUzLCAweDY4YjlkMWQxLCAweDAwMDAwMDAwLCAweDJjYzFlZGVkLCAweDYwNDAyMDIwLCAweDFmZTNmY2ZjLCAweGM4NzliMWIxLCAweGVkYjY1YjViLCAweGJlZDQ2YTZhLCAweDQ2OGRjYmNiLCAweGQ5NjdiZWJlLCAweDRiNzIzOTM5LCAweGRlOTQ0YTRhLCAweGQ0OTg0YzRjLCAweGU4YjA1ODU4LCAweDRhODVjZmNmLCAweDZiYmJkMGQwLCAweDJhYzVlZmVmLCAweGU1NGZhYWFhLCAweDE2ZWRmYmZiLCAweGM1ODY0MzQzLCAweGQ3OWE0ZDRkLCAweDU1NjYzMzMzLCAweDk0MTE4NTg1LCAweGNmOGE0NTQ1LCAweDEwZTlmOWY5LCAweDA2MDQwMjAyLCAweDgxZmU3ZjdmLCAweGYwYTA1MDUwLCAweDQ0NzgzYzNjLCAweGJhMjU5ZjlmLCAweGUzNGJhOGE4LCAweGYzYTI1MTUxLCAweGZlNWRhM2EzLCAweGMwODA0MDQwLCAweDhhMDU4ZjhmLCAweGFkM2Y5MjkyLCAweGJjMjE5ZDlkLCAweDQ4NzAzODM4LCAweDA0ZjFmNWY1LCAweGRmNjNiY2JjLCAweGMxNzdiNmI2LCAweDc1YWZkYWRhLCAweDYzNDIyMTIxLCAweDMwMjAxMDEwLCAweDFhZTVmZmZmLCAweDBlZmRmM2YzLCAweDZkYmZkMmQyLCAweDRjODFjZGNkLCAweDE0MTgwYzBjLCAweDM1MjYxMzEzLCAweDJmYzNlY2VjLCAweGUxYmU1ZjVmLCAweGEyMzU5Nzk3LCAweGNjODg0NDQ0LCAweDM5MmUxNzE3LCAweDU3OTNjNGM0LCAweGYyNTVhN2E3LCAweDgyZmM3ZTdlLCAweDQ3N2EzZDNkLCAweGFjYzg2NDY0LCAweGU3YmE1ZDVkLCAweDJiMzIxOTE5LCAweDk1ZTY3MzczLCAweGEwYzA2MDYwLCAweDk4MTk4MTgxLCAweGQxOWU0ZjRmLCAweDdmYTNkY2RjLCAweDY2NDQyMjIyLCAweDdlNTQyYTJhLCAweGFiM2I5MDkwLCAweDgzMGI4ODg4LCAweGNhOGM0NjQ2LCAweDI5YzdlZWVlLCAweGQzNmJiOGI4LCAweDNjMjgxNDE0LCAweDc5YTdkZWRlLCAweGUyYmM1ZTVlLCAweDFkMTYwYjBiLCAweDc2YWRkYmRiLCAweDNiZGJlMGUwLCAweDU2NjQzMjMyLCAweDRlNzQzYTNhLCAweDFlMTQwYTBhLCAweGRiOTI0OTQ5LCAweDBhMGMwNjA2LCAweDZjNDgyNDI0LCAweGU0Yjg1YzVjLCAweDVkOWZjMmMyLCAweDZlYmRkM2QzLCAweGVmNDNhY2FjLCAweGE2YzQ2MjYyLCAweGE4Mzk5MTkxLCAweGE0MzE5NTk1LCAweDM3ZDNlNGU0LCAweDhiZjI3OTc5LCAweDMyZDVlN2U3LCAweDQzOGJjOGM4LCAweDU5NmUzNzM3LCAweGI3ZGE2ZDZkLCAweDhjMDE4ZDhkLCAweDY0YjFkNWQ1LCAweGQyOWM0ZTRlLCAweGUwNDlhOWE5LCAweGI0ZDg2YzZjLCAweGZhYWM1NjU2LCAweDA3ZjNmNGY0LCAweDI1Y2ZlYWVhLCAweGFmY2E2NTY1LCAweDhlZjQ3YTdhLCAweGU5NDdhZWFlLCAweDE4MTAwODA4LCAweGQ1NmZiYWJhLCAweDg4ZjA3ODc4LCAweDZmNGEyNTI1LCAweDcyNWMyZTJlLCAweDI0MzgxYzFjLCAweGYxNTdhNmE2LCAweGM3NzNiNGI0LCAweDUxOTdjNmM2LCAweDIzY2JlOGU4LCAweDdjYTFkZGRkLCAweDljZTg3NDc0LCAweDIxM2UxZjFmLCAweGRkOTY0YjRiLCAweGRjNjFiZGJkLCAweDg2MGQ4YjhiLCAweDg1MGY4YThhLCAweDkwZTA3MDcwLCAweDQyN2MzZTNlLCAweGM0NzFiNWI1LCAweGFhY2M2NjY2LCAweGQ4OTA0ODQ4LCAweDA1MDYwMzAzLCAweDAxZjdmNmY2LCAweDEyMWMwZTBlLCAweGEzYzI2MTYxLCAweDVmNmEzNTM1LCAweGY5YWU1NzU3LCAweGQwNjliOWI5LCAweDkxMTc4Njg2LCAweDU4OTljMWMxLCAweDI3M2ExZDFkLCAweGI5Mjc5ZTllLCAweDM4ZDllMWUxLCAweDEzZWJmOGY4LCAweGIzMmI5ODk4LCAweDMzMjIxMTExLCAweGJiZDI2OTY5LCAweDcwYTlkOWQ5LCAweDg5MDc4ZThlLCAweGE3MzM5NDk0LCAweGI2MmQ5YjliLCAweDIyM2MxZTFlLCAweDkyMTU4Nzg3LCAweDIwYzllOWU5LCAweDQ5ODdjZWNlLCAweGZmYWE1NTU1LCAweDc4NTAyODI4LCAweDdhYTVkZmRmLCAweDhmMDM4YzhjLCAweGY4NTlhMWExLCAweDgwMDk4OTg5LCAweDE3MWEwZDBkLCAweGRhNjViZmJmLCAweDMxZDdlNmU2LCAweGM2ODQ0MjQyLCAweGI4ZDA2ODY4LCAweGMzODI0MTQxLCAweGIwMjk5OTk5LCAweDc3NWEyZDJkLCAweDExMWUwZjBmLCAweGNiN2JiMGIwLCAweGZjYTg1NDU0LCAweGQ2NmRiYmJiLCAweDNhMmMxNjE2XTtcbiAgICB2YXIgVDMgPSBbMHg2M2E1YzY2MywgMHg3Yzg0Zjg3YywgMHg3Nzk5ZWU3NywgMHg3YjhkZjY3YiwgMHhmMjBkZmZmMiwgMHg2YmJkZDY2YiwgMHg2ZmIxZGU2ZiwgMHhjNTU0OTFjNSwgMHgzMDUwNjAzMCwgMHgwMTAzMDIwMSwgMHg2N2E5Y2U2NywgMHgyYjdkNTYyYiwgMHhmZTE5ZTdmZSwgMHhkNzYyYjVkNywgMHhhYmU2NGRhYiwgMHg3NjlhZWM3NiwgMHhjYTQ1OGZjYSwgMHg4MjlkMWY4MiwgMHhjOTQwODljOSwgMHg3ZDg3ZmE3ZCwgMHhmYTE1ZWZmYSwgMHg1OWViYjI1OSwgMHg0N2M5OGU0NywgMHhmMDBiZmJmMCwgMHhhZGVjNDFhZCwgMHhkNDY3YjNkNCwgMHhhMmZkNWZhMiwgMHhhZmVhNDVhZiwgMHg5Y2JmMjM5YywgMHhhNGY3NTNhNCwgMHg3Mjk2ZTQ3MiwgMHhjMDViOWJjMCwgMHhiN2MyNzViNywgMHhmZDFjZTFmZCwgMHg5M2FlM2Q5MywgMHgyNjZhNGMyNiwgMHgzNjVhNmMzNiwgMHgzZjQxN2UzZiwgMHhmNzAyZjVmNywgMHhjYzRmODNjYywgMHgzNDVjNjgzNCwgMHhhNWY0NTFhNSwgMHhlNTM0ZDFlNSwgMHhmMTA4ZjlmMSwgMHg3MTkzZTI3MSwgMHhkODczYWJkOCwgMHgzMTUzNjIzMSwgMHgxNTNmMmExNSwgMHgwNDBjMDgwNCwgMHhjNzUyOTVjNywgMHgyMzY1NDYyMywgMHhjMzVlOWRjMywgMHgxODI4MzAxOCwgMHg5NmExMzc5NiwgMHgwNTBmMGEwNSwgMHg5YWI1MmY5YSwgMHgwNzA5MGUwNywgMHgxMjM2MjQxMiwgMHg4MDliMWI4MCwgMHhlMjNkZGZlMiwgMHhlYjI2Y2RlYiwgMHgyNzY5NGUyNywgMHhiMmNkN2ZiMiwgMHg3NTlmZWE3NSwgMHgwOTFiMTIwOSwgMHg4MzllMWQ4MywgMHgyYzc0NTgyYywgMHgxYTJlMzQxYSwgMHgxYjJkMzYxYiwgMHg2ZWIyZGM2ZSwgMHg1YWVlYjQ1YSwgMHhhMGZiNWJhMCwgMHg1MmY2YTQ1MiwgMHgzYjRkNzYzYiwgMHhkNjYxYjdkNiwgMHhiM2NlN2RiMywgMHgyOTdiNTIyOSwgMHhlMzNlZGRlMywgMHgyZjcxNWUyZiwgMHg4NDk3MTM4NCwgMHg1M2Y1YTY1MywgMHhkMTY4YjlkMSwgMHgwMDAwMDAwMCwgMHhlZDJjYzFlZCwgMHgyMDYwNDAyMCwgMHhmYzFmZTNmYywgMHhiMWM4NzliMSwgMHg1YmVkYjY1YiwgMHg2YWJlZDQ2YSwgMHhjYjQ2OGRjYiwgMHhiZWQ5NjdiZSwgMHgzOTRiNzIzOSwgMHg0YWRlOTQ0YSwgMHg0Y2Q0OTg0YywgMHg1OGU4YjA1OCwgMHhjZjRhODVjZiwgMHhkMDZiYmJkMCwgMHhlZjJhYzVlZiwgMHhhYWU1NGZhYSwgMHhmYjE2ZWRmYiwgMHg0M2M1ODY0MywgMHg0ZGQ3OWE0ZCwgMHgzMzU1NjYzMywgMHg4NTk0MTE4NSwgMHg0NWNmOGE0NSwgMHhmOTEwZTlmOSwgMHgwMjA2MDQwMiwgMHg3ZjgxZmU3ZiwgMHg1MGYwYTA1MCwgMHgzYzQ0NzgzYywgMHg5ZmJhMjU5ZiwgMHhhOGUzNGJhOCwgMHg1MWYzYTI1MSwgMHhhM2ZlNWRhMywgMHg0MGMwODA0MCwgMHg4ZjhhMDU4ZiwgMHg5MmFkM2Y5MiwgMHg5ZGJjMjE5ZCwgMHgzODQ4NzAzOCwgMHhmNTA0ZjFmNSwgMHhiY2RmNjNiYywgMHhiNmMxNzdiNiwgMHhkYTc1YWZkYSwgMHgyMTYzNDIyMSwgMHgxMDMwMjAxMCwgMHhmZjFhZTVmZiwgMHhmMzBlZmRmMywgMHhkMjZkYmZkMiwgMHhjZDRjODFjZCwgMHgwYzE0MTgwYywgMHgxMzM1MjYxMywgMHhlYzJmYzNlYywgMHg1ZmUxYmU1ZiwgMHg5N2EyMzU5NywgMHg0NGNjODg0NCwgMHgxNzM5MmUxNywgMHhjNDU3OTNjNCwgMHhhN2YyNTVhNywgMHg3ZTgyZmM3ZSwgMHgzZDQ3N2EzZCwgMHg2NGFjYzg2NCwgMHg1ZGU3YmE1ZCwgMHgxOTJiMzIxOSwgMHg3Mzk1ZTY3MywgMHg2MGEwYzA2MCwgMHg4MTk4MTk4MSwgMHg0ZmQxOWU0ZiwgMHhkYzdmYTNkYywgMHgyMjY2NDQyMiwgMHgyYTdlNTQyYSwgMHg5MGFiM2I5MCwgMHg4ODgzMGI4OCwgMHg0NmNhOGM0NiwgMHhlZTI5YzdlZSwgMHhiOGQzNmJiOCwgMHgxNDNjMjgxNCwgMHhkZTc5YTdkZSwgMHg1ZWUyYmM1ZSwgMHgwYjFkMTYwYiwgMHhkYjc2YWRkYiwgMHhlMDNiZGJlMCwgMHgzMjU2NjQzMiwgMHgzYTRlNzQzYSwgMHgwYTFlMTQwYSwgMHg0OWRiOTI0OSwgMHgwNjBhMGMwNiwgMHgyNDZjNDgyNCwgMHg1Y2U0Yjg1YywgMHhjMjVkOWZjMiwgMHhkMzZlYmRkMywgMHhhY2VmNDNhYywgMHg2MmE2YzQ2MiwgMHg5MWE4Mzk5MSwgMHg5NWE0MzE5NSwgMHhlNDM3ZDNlNCwgMHg3OThiZjI3OSwgMHhlNzMyZDVlNywgMHhjODQzOGJjOCwgMHgzNzU5NmUzNywgMHg2ZGI3ZGE2ZCwgMHg4ZDhjMDE4ZCwgMHhkNTY0YjFkNSwgMHg0ZWQyOWM0ZSwgMHhhOWUwNDlhOSwgMHg2Y2I0ZDg2YywgMHg1NmZhYWM1NiwgMHhmNDA3ZjNmNCwgMHhlYTI1Y2ZlYSwgMHg2NWFmY2E2NSwgMHg3YThlZjQ3YSwgMHhhZWU5NDdhZSwgMHgwODE4MTAwOCwgMHhiYWQ1NmZiYSwgMHg3ODg4ZjA3OCwgMHgyNTZmNGEyNSwgMHgyZTcyNWMyZSwgMHgxYzI0MzgxYywgMHhhNmYxNTdhNiwgMHhiNGM3NzNiNCwgMHhjNjUxOTdjNiwgMHhlODIzY2JlOCwgMHhkZDdjYTFkZCwgMHg3NDljZTg3NCwgMHgxZjIxM2UxZiwgMHg0YmRkOTY0YiwgMHhiZGRjNjFiZCwgMHg4Yjg2MGQ4YiwgMHg4YTg1MGY4YSwgMHg3MDkwZTA3MCwgMHgzZTQyN2MzZSwgMHhiNWM0NzFiNSwgMHg2NmFhY2M2NiwgMHg0OGQ4OTA0OCwgMHgwMzA1MDYwMywgMHhmNjAxZjdmNiwgMHgwZTEyMWMwZSwgMHg2MWEzYzI2MSwgMHgzNTVmNmEzNSwgMHg1N2Y5YWU1NywgMHhiOWQwNjliOSwgMHg4NjkxMTc4NiwgMHhjMTU4OTljMSwgMHgxZDI3M2ExZCwgMHg5ZWI5Mjc5ZSwgMHhlMTM4ZDllMSwgMHhmODEzZWJmOCwgMHg5OGIzMmI5OCwgMHgxMTMzMjIxMSwgMHg2OWJiZDI2OSwgMHhkOTcwYTlkOSwgMHg4ZTg5MDc4ZSwgMHg5NGE3MzM5NCwgMHg5YmI2MmQ5YiwgMHgxZTIyM2MxZSwgMHg4NzkyMTU4NywgMHhlOTIwYzllOSwgMHhjZTQ5ODdjZSwgMHg1NWZmYWE1NSwgMHgyODc4NTAyOCwgMHhkZjdhYTVkZiwgMHg4YzhmMDM4YywgMHhhMWY4NTlhMSwgMHg4OTgwMDk4OSwgMHgwZDE3MWEwZCwgMHhiZmRhNjViZiwgMHhlNjMxZDdlNiwgMHg0MmM2ODQ0MiwgMHg2OGI4ZDA2OCwgMHg0MWMzODI0MSwgMHg5OWIwMjk5OSwgMHgyZDc3NWEyZCwgMHgwZjExMWUwZiwgMHhiMGNiN2JiMCwgMHg1NGZjYTg1NCwgMHhiYmQ2NmRiYiwgMHgxNjNhMmMxNl07XG4gICAgdmFyIFQ0ID0gWzB4NjM2M2E1YzYsIDB4N2M3Yzg0ZjgsIDB4Nzc3Nzk5ZWUsIDB4N2I3YjhkZjYsIDB4ZjJmMjBkZmYsIDB4NmI2YmJkZDYsIDB4NmY2ZmIxZGUsIDB4YzVjNTU0OTEsIDB4MzAzMDUwNjAsIDB4MDEwMTAzMDIsIDB4Njc2N2E5Y2UsIDB4MmIyYjdkNTYsIDB4ZmVmZTE5ZTcsIDB4ZDdkNzYyYjUsIDB4YWJhYmU2NGQsIDB4NzY3NjlhZWMsIDB4Y2FjYTQ1OGYsIDB4ODI4MjlkMWYsIDB4YzljOTQwODksIDB4N2Q3ZDg3ZmEsIDB4ZmFmYTE1ZWYsIDB4NTk1OWViYjIsIDB4NDc0N2M5OGUsIDB4ZjBmMDBiZmIsIDB4YWRhZGVjNDEsIDB4ZDRkNDY3YjMsIDB4YTJhMmZkNWYsIDB4YWZhZmVhNDUsIDB4OWM5Y2JmMjMsIDB4YTRhNGY3NTMsIDB4NzI3Mjk2ZTQsIDB4YzBjMDViOWIsIDB4YjdiN2MyNzUsIDB4ZmRmZDFjZTEsIDB4OTM5M2FlM2QsIDB4MjYyNjZhNGMsIDB4MzYzNjVhNmMsIDB4M2YzZjQxN2UsIDB4ZjdmNzAyZjUsIDB4Y2NjYzRmODMsIDB4MzQzNDVjNjgsIDB4YTVhNWY0NTEsIDB4ZTVlNTM0ZDEsIDB4ZjFmMTA4ZjksIDB4NzE3MTkzZTIsIDB4ZDhkODczYWIsIDB4MzEzMTUzNjIsIDB4MTUxNTNmMmEsIDB4MDQwNDBjMDgsIDB4YzdjNzUyOTUsIDB4MjMyMzY1NDYsIDB4YzNjMzVlOWQsIDB4MTgxODI4MzAsIDB4OTY5NmExMzcsIDB4MDUwNTBmMGEsIDB4OWE5YWI1MmYsIDB4MDcwNzA5MGUsIDB4MTIxMjM2MjQsIDB4ODA4MDliMWIsIDB4ZTJlMjNkZGYsIDB4ZWJlYjI2Y2QsIDB4MjcyNzY5NGUsIDB4YjJiMmNkN2YsIDB4NzU3NTlmZWEsIDB4MDkwOTFiMTIsIDB4ODM4MzllMWQsIDB4MmMyYzc0NTgsIDB4MWExYTJlMzQsIDB4MWIxYjJkMzYsIDB4NmU2ZWIyZGMsIDB4NWE1YWVlYjQsIDB4YTBhMGZiNWIsIDB4NTI1MmY2YTQsIDB4M2IzYjRkNzYsIDB4ZDZkNjYxYjcsIDB4YjNiM2NlN2QsIDB4MjkyOTdiNTIsIDB4ZTNlMzNlZGQsIDB4MmYyZjcxNWUsIDB4ODQ4NDk3MTMsIDB4NTM1M2Y1YTYsIDB4ZDFkMTY4YjksIDB4MDAwMDAwMDAsIDB4ZWRlZDJjYzEsIDB4MjAyMDYwNDAsIDB4ZmNmYzFmZTMsIDB4YjFiMWM4NzksIDB4NWI1YmVkYjYsIDB4NmE2YWJlZDQsIDB4Y2JjYjQ2OGQsIDB4YmViZWQ5NjcsIDB4MzkzOTRiNzIsIDB4NGE0YWRlOTQsIDB4NGM0Y2Q0OTgsIDB4NTg1OGU4YjAsIDB4Y2ZjZjRhODUsIDB4ZDBkMDZiYmIsIDB4ZWZlZjJhYzUsIDB4YWFhYWU1NGYsIDB4ZmJmYjE2ZWQsIDB4NDM0M2M1ODYsIDB4NGQ0ZGQ3OWEsIDB4MzMzMzU1NjYsIDB4ODU4NTk0MTEsIDB4NDU0NWNmOGEsIDB4ZjlmOTEwZTksIDB4MDIwMjA2MDQsIDB4N2Y3ZjgxZmUsIDB4NTA1MGYwYTAsIDB4M2MzYzQ0NzgsIDB4OWY5ZmJhMjUsIDB4YThhOGUzNGIsIDB4NTE1MWYzYTIsIDB4YTNhM2ZlNWQsIDB4NDA0MGMwODAsIDB4OGY4ZjhhMDUsIDB4OTI5MmFkM2YsIDB4OWQ5ZGJjMjEsIDB4MzgzODQ4NzAsIDB4ZjVmNTA0ZjEsIDB4YmNiY2RmNjMsIDB4YjZiNmMxNzcsIDB4ZGFkYTc1YWYsIDB4MjEyMTYzNDIsIDB4MTAxMDMwMjAsIDB4ZmZmZjFhZTUsIDB4ZjNmMzBlZmQsIDB4ZDJkMjZkYmYsIDB4Y2RjZDRjODEsIDB4MGMwYzE0MTgsIDB4MTMxMzM1MjYsIDB4ZWNlYzJmYzMsIDB4NWY1ZmUxYmUsIDB4OTc5N2EyMzUsIDB4NDQ0NGNjODgsIDB4MTcxNzM5MmUsIDB4YzRjNDU3OTMsIDB4YTdhN2YyNTUsIDB4N2U3ZTgyZmMsIDB4M2QzZDQ3N2EsIDB4NjQ2NGFjYzgsIDB4NWQ1ZGU3YmEsIDB4MTkxOTJiMzIsIDB4NzM3Mzk1ZTYsIDB4NjA2MGEwYzAsIDB4ODE4MTk4MTksIDB4NGY0ZmQxOWUsIDB4ZGNkYzdmYTMsIDB4MjIyMjY2NDQsIDB4MmEyYTdlNTQsIDB4OTA5MGFiM2IsIDB4ODg4ODgzMGIsIDB4NDY0NmNhOGMsIDB4ZWVlZTI5YzcsIDB4YjhiOGQzNmIsIDB4MTQxNDNjMjgsIDB4ZGVkZTc5YTcsIDB4NWU1ZWUyYmMsIDB4MGIwYjFkMTYsIDB4ZGJkYjc2YWQsIDB4ZTBlMDNiZGIsIDB4MzIzMjU2NjQsIDB4M2EzYTRlNzQsIDB4MGEwYTFlMTQsIDB4NDk0OWRiOTIsIDB4MDYwNjBhMGMsIDB4MjQyNDZjNDgsIDB4NWM1Y2U0YjgsIDB4YzJjMjVkOWYsIDB4ZDNkMzZlYmQsIDB4YWNhY2VmNDMsIDB4NjI2MmE2YzQsIDB4OTE5MWE4MzksIDB4OTU5NWE0MzEsIDB4ZTRlNDM3ZDMsIDB4Nzk3OThiZjIsIDB4ZTdlNzMyZDUsIDB4YzhjODQzOGIsIDB4MzczNzU5NmUsIDB4NmQ2ZGI3ZGEsIDB4OGQ4ZDhjMDEsIDB4ZDVkNTY0YjEsIDB4NGU0ZWQyOWMsIDB4YTlhOWUwNDksIDB4NmM2Y2I0ZDgsIDB4NTY1NmZhYWMsIDB4ZjRmNDA3ZjMsIDB4ZWFlYTI1Y2YsIDB4NjU2NWFmY2EsIDB4N2E3YThlZjQsIDB4YWVhZWU5NDcsIDB4MDgwODE4MTAsIDB4YmFiYWQ1NmYsIDB4Nzg3ODg4ZjAsIDB4MjUyNTZmNGEsIDB4MmUyZTcyNWMsIDB4MWMxYzI0MzgsIDB4YTZhNmYxNTcsIDB4YjRiNGM3NzMsIDB4YzZjNjUxOTcsIDB4ZThlODIzY2IsIDB4ZGRkZDdjYTEsIDB4NzQ3NDljZTgsIDB4MWYxZjIxM2UsIDB4NGI0YmRkOTYsIDB4YmRiZGRjNjEsIDB4OGI4Yjg2MGQsIDB4OGE4YTg1MGYsIDB4NzA3MDkwZTAsIDB4M2UzZTQyN2MsIDB4YjViNWM0NzEsIDB4NjY2NmFhY2MsIDB4NDg0OGQ4OTAsIDB4MDMwMzA1MDYsIDB4ZjZmNjAxZjcsIDB4MGUwZTEyMWMsIDB4NjE2MWEzYzIsIDB4MzUzNTVmNmEsIDB4NTc1N2Y5YWUsIDB4YjliOWQwNjksIDB4ODY4NjkxMTcsIDB4YzFjMTU4OTksIDB4MWQxZDI3M2EsIDB4OWU5ZWI5MjcsIDB4ZTFlMTM4ZDksIDB4ZjhmODEzZWIsIDB4OTg5OGIzMmIsIDB4MTExMTMzMjIsIDB4Njk2OWJiZDIsIDB4ZDlkOTcwYTksIDB4OGU4ZTg5MDcsIDB4OTQ5NGE3MzMsIDB4OWI5YmI2MmQsIDB4MWUxZTIyM2MsIDB4ODc4NzkyMTUsIDB4ZTllOTIwYzksIDB4Y2VjZTQ5ODcsIDB4NTU1NWZmYWEsIDB4MjgyODc4NTAsIDB4ZGZkZjdhYTUsIDB4OGM4YzhmMDMsIDB4YTFhMWY4NTksIDB4ODk4OTgwMDksIDB4MGQwZDE3MWEsIDB4YmZiZmRhNjUsIDB4ZTZlNjMxZDcsIDB4NDI0MmM2ODQsIDB4Njg2OGI4ZDAsIDB4NDE0MWMzODIsIDB4OTk5OWIwMjksIDB4MmQyZDc3NWEsIDB4MGYwZjExMWUsIDB4YjBiMGNiN2IsIDB4NTQ1NGZjYTgsIDB4YmJiYmQ2NmQsIDB4MTYxNjNhMmNdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBkZWNyeXB0aW9uXG4gICAgdmFyIFQ1ID0gWzB4NTFmNGE3NTAsIDB4N2U0MTY1NTMsIDB4MWExN2E0YzMsIDB4M2EyNzVlOTYsIDB4M2JhYjZiY2IsIDB4MWY5ZDQ1ZjEsIDB4YWNmYTU4YWIsIDB4NGJlMzAzOTMsIDB4MjAzMGZhNTUsIDB4YWQ3NjZkZjYsIDB4ODhjYzc2OTEsIDB4ZjUwMjRjMjUsIDB4NGZlNWQ3ZmMsIDB4YzUyYWNiZDcsIDB4MjYzNTQ0ODAsIDB4YjU2MmEzOGYsIDB4ZGViMTVhNDksIDB4MjViYTFiNjcsIDB4NDVlYTBlOTgsIDB4NWRmZWMwZTEsIDB4YzMyZjc1MDIsIDB4ODE0Y2YwMTIsIDB4OGQ0Njk3YTMsIDB4NmJkM2Y5YzYsIDB4MDM4ZjVmZTcsIDB4MTU5MjljOTUsIDB4YmY2ZDdhZWIsIDB4OTU1MjU5ZGEsIDB4ZDRiZTgzMmQsIDB4NTg3NDIxZDMsIDB4NDllMDY5MjksIDB4OGVjOWM4NDQsIDB4NzVjMjg5NmEsIDB4ZjQ4ZTc5NzgsIDB4OTk1ODNlNmIsIDB4MjdiOTcxZGQsIDB4YmVlMTRmYjYsIDB4ZjA4OGFkMTcsIDB4YzkyMGFjNjYsIDB4N2RjZTNhYjQsIDB4NjNkZjRhMTgsIDB4ZTUxYTMxODIsIDB4OTc1MTMzNjAsIDB4NjI1MzdmNDUsIDB4YjE2NDc3ZTAsIDB4YmI2YmFlODQsIDB4ZmU4MWEwMWMsIDB4ZjkwODJiOTQsIDB4NzA0ODY4NTgsIDB4OGY0NWZkMTksIDB4OTRkZTZjODcsIDB4NTI3YmY4YjcsIDB4YWI3M2QzMjMsIDB4NzI0YjAyZTIsIDB4ZTMxZjhmNTcsIDB4NjY1NWFiMmEsIDB4YjJlYjI4MDcsIDB4MmZiNWMyMDMsIDB4ODZjNTdiOWEsIDB4ZDMzNzA4YTUsIDB4MzAyODg3ZjIsIDB4MjNiZmE1YjIsIDB4MDIwMzZhYmEsIDB4ZWQxNjgyNWMsIDB4OGFjZjFjMmIsIDB4YTc3OWI0OTIsIDB4ZjMwN2YyZjAsIDB4NGU2OWUyYTEsIDB4NjVkYWY0Y2QsIDB4MDYwNWJlZDUsIDB4ZDEzNDYyMWYsIDB4YzRhNmZlOGEsIDB4MzQyZTUzOWQsIDB4YTJmMzU1YTAsIDB4MDU4YWUxMzIsIDB4YTRmNmViNzUsIDB4MGI4M2VjMzksIDB4NDA2MGVmYWEsIDB4NWU3MTlmMDYsIDB4YmQ2ZTEwNTEsIDB4M2UyMThhZjksIDB4OTZkZDA2M2QsIDB4ZGQzZTA1YWUsIDB4NGRlNmJkNDYsIDB4OTE1NDhkYjUsIDB4NzFjNDVkMDUsIDB4MDQwNmQ0NmYsIDB4NjA1MDE1ZmYsIDB4MTk5OGZiMjQsIDB4ZDZiZGU5OTcsIDB4ODk0MDQzY2MsIDB4NjdkOTllNzcsIDB4YjBlODQyYmQsIDB4MDc4OThiODgsIDB4ZTcxOTViMzgsIDB4NzljOGVlZGIsIDB4YTE3YzBhNDcsIDB4N2M0MjBmZTksIDB4Zjg4NDFlYzksIDB4MDAwMDAwMDAsIDB4MDk4MDg2ODMsIDB4MzIyYmVkNDgsIDB4MWUxMTcwYWMsIDB4NmM1YTcyNGUsIDB4ZmQwZWZmZmIsIDB4MGY4NTM4NTYsIDB4M2RhZWQ1MWUsIDB4MzYyZDM5MjcsIDB4MGEwZmQ5NjQsIDB4Njg1Y2E2MjEsIDB4OWI1YjU0ZDEsIDB4MjQzNjJlM2EsIDB4MGMwYTY3YjEsIDB4OTM1N2U3MGYsIDB4YjRlZTk2ZDIsIDB4MWI5YjkxOWUsIDB4ODBjMGM1NGYsIDB4NjFkYzIwYTIsIDB4NWE3NzRiNjksIDB4MWMxMjFhMTYsIDB4ZTI5M2JhMGEsIDB4YzBhMDJhZTUsIDB4M2MyMmUwNDMsIDB4MTIxYjE3MWQsIDB4MGUwOTBkMGIsIDB4ZjI4YmM3YWQsIDB4MmRiNmE4YjksIDB4MTQxZWE5YzgsIDB4NTdmMTE5ODUsIDB4YWY3NTA3NGMsIDB4ZWU5OWRkYmIsIDB4YTM3ZjYwZmQsIDB4ZjcwMTI2OWYsIDB4NWM3MmY1YmMsIDB4NDQ2NjNiYzUsIDB4NWJmYjdlMzQsIDB4OGI0MzI5NzYsIDB4Y2IyM2M2ZGMsIDB4YjZlZGZjNjgsIDB4YjhlNGYxNjMsIDB4ZDczMWRjY2EsIDB4NDI2Mzg1MTAsIDB4MTM5NzIyNDAsIDB4ODRjNjExMjAsIDB4ODU0YTI0N2QsIDB4ZDJiYjNkZjgsIDB4YWVmOTMyMTEsIDB4YzcyOWExNmQsIDB4MWQ5ZTJmNGIsIDB4ZGNiMjMwZjMsIDB4MGQ4NjUyZWMsIDB4NzdjMWUzZDAsIDB4MmJiMzE2NmMsIDB4YTk3MGI5OTksIDB4MTE5NDQ4ZmEsIDB4NDdlOTY0MjIsIDB4YThmYzhjYzQsIDB4YTBmMDNmMWEsIDB4NTY3ZDJjZDgsIDB4MjIzMzkwZWYsIDB4ODc0OTRlYzcsIDB4ZDkzOGQxYzEsIDB4OGNjYWEyZmUsIDB4OThkNDBiMzYsIDB4YTZmNTgxY2YsIDB4YTU3YWRlMjgsIDB4ZGFiNzhlMjYsIDB4M2ZhZGJmYTQsIDB4MmMzYTlkZTQsIDB4NTA3ODkyMGQsIDB4NmE1ZmNjOWIsIDB4NTQ3ZTQ2NjIsIDB4ZjY4ZDEzYzIsIDB4OTBkOGI4ZTgsIDB4MmUzOWY3NWUsIDB4ODJjM2FmZjUsIDB4OWY1ZDgwYmUsIDB4NjlkMDkzN2MsIDB4NmZkNTJkYTksIDB4Y2YyNTEyYjMsIDB4YzhhYzk5M2IsIDB4MTAxODdkYTcsIDB4ZTg5YzYzNmUsIDB4ZGIzYmJiN2IsIDB4Y2QyNjc4MDksIDB4NmU1OTE4ZjQsIDB4ZWM5YWI3MDEsIDB4ODM0ZjlhYTgsIDB4ZTY5NTZlNjUsIDB4YWFmZmU2N2UsIDB4MjFiY2NmMDgsIDB4ZWYxNWU4ZTYsIDB4YmFlNzliZDksIDB4NGE2ZjM2Y2UsIDB4ZWE5ZjA5ZDQsIDB4MjliMDdjZDYsIDB4MzFhNGIyYWYsIDB4MmEzZjIzMzEsIDB4YzZhNTk0MzAsIDB4MzVhMjY2YzAsIDB4NzQ0ZWJjMzcsIDB4ZmM4MmNhYTYsIDB4ZTA5MGQwYjAsIDB4MzNhN2Q4MTUsIDB4ZjEwNDk4NGEsIDB4NDFlY2RhZjcsIDB4N2ZjZDUwMGUsIDB4MTc5MWY2MmYsIDB4NzY0ZGQ2OGQsIDB4NDNlZmIwNGQsIDB4Y2NhYTRkNTQsIDB4ZTQ5NjA0ZGYsIDB4OWVkMWI1ZTMsIDB4NGM2YTg4MWIsIDB4YzEyYzFmYjgsIDB4NDY2NTUxN2YsIDB4OWQ1ZWVhMDQsIDB4MDE4YzM1NWQsIDB4ZmE4Nzc0NzMsIDB4ZmIwYjQxMmUsIDB4YjM2NzFkNWEsIDB4OTJkYmQyNTIsIDB4ZTkxMDU2MzMsIDB4NmRkNjQ3MTMsIDB4OWFkNzYxOGMsIDB4MzdhMTBjN2EsIDB4NTlmODE0OGUsIDB4ZWIxMzNjODksIDB4Y2VhOTI3ZWUsIDB4Yjc2MWM5MzUsIDB4ZTExY2U1ZWQsIDB4N2E0N2IxM2MsIDB4OWNkMmRmNTksIDB4NTVmMjczM2YsIDB4MTgxNGNlNzksIDB4NzNjNzM3YmYsIDB4NTNmN2NkZWEsIDB4NWZmZGFhNWIsIDB4ZGYzZDZmMTQsIDB4Nzg0NGRiODYsIDB4Y2FhZmYzODEsIDB4Yjk2OGM0M2UsIDB4MzgyNDM0MmMsIDB4YzJhMzQwNWYsIDB4MTYxZGMzNzIsIDB4YmNlMjI1MGMsIDB4MjgzYzQ5OGIsIDB4ZmYwZDk1NDEsIDB4MzlhODAxNzEsIDB4MDgwY2IzZGUsIDB4ZDhiNGU0OWMsIDB4NjQ1NmMxOTAsIDB4N2JjYjg0NjEsIDB4ZDUzMmI2NzAsIDB4NDg2YzVjNzQsIDB4ZDBiODU3NDJdO1xuICAgIHZhciBUNiA9IFsweDUwNTFmNGE3LCAweDUzN2U0MTY1LCAweGMzMWExN2E0LCAweDk2M2EyNzVlLCAweGNiM2JhYjZiLCAweGYxMWY5ZDQ1LCAweGFiYWNmYTU4LCAweDkzNGJlMzAzLCAweDU1MjAzMGZhLCAweGY2YWQ3NjZkLCAweDkxODhjYzc2LCAweDI1ZjUwMjRjLCAweGZjNGZlNWQ3LCAweGQ3YzUyYWNiLCAweDgwMjYzNTQ0LCAweDhmYjU2MmEzLCAweDQ5ZGViMTVhLCAweDY3MjViYTFiLCAweDk4NDVlYTBlLCAweGUxNWRmZWMwLCAweDAyYzMyZjc1LCAweDEyODE0Y2YwLCAweGEzOGQ0Njk3LCAweGM2NmJkM2Y5LCAweGU3MDM4ZjVmLCAweDk1MTU5MjljLCAweGViYmY2ZDdhLCAweGRhOTU1MjU5LCAweDJkZDRiZTgzLCAweGQzNTg3NDIxLCAweDI5NDllMDY5LCAweDQ0OGVjOWM4LCAweDZhNzVjMjg5LCAweDc4ZjQ4ZTc5LCAweDZiOTk1ODNlLCAweGRkMjdiOTcxLCAweGI2YmVlMTRmLCAweDE3ZjA4OGFkLCAweDY2YzkyMGFjLCAweGI0N2RjZTNhLCAweDE4NjNkZjRhLCAweDgyZTUxYTMxLCAweDYwOTc1MTMzLCAweDQ1NjI1MzdmLCAweGUwYjE2NDc3LCAweDg0YmI2YmFlLCAweDFjZmU4MWEwLCAweDk0ZjkwODJiLCAweDU4NzA0ODY4LCAweDE5OGY0NWZkLCAweDg3OTRkZTZjLCAweGI3NTI3YmY4LCAweDIzYWI3M2QzLCAweGUyNzI0YjAyLCAweDU3ZTMxZjhmLCAweDJhNjY1NWFiLCAweDA3YjJlYjI4LCAweDAzMmZiNWMyLCAweDlhODZjNTdiLCAweGE1ZDMzNzA4LCAweGYyMzAyODg3LCAweGIyMjNiZmE1LCAweGJhMDIwMzZhLCAweDVjZWQxNjgyLCAweDJiOGFjZjFjLCAweDkyYTc3OWI0LCAweGYwZjMwN2YyLCAweGExNGU2OWUyLCAweGNkNjVkYWY0LCAweGQ1MDYwNWJlLCAweDFmZDEzNDYyLCAweDhhYzRhNmZlLCAweDlkMzQyZTUzLCAweGEwYTJmMzU1LCAweDMyMDU4YWUxLCAweDc1YTRmNmViLCAweDM5MGI4M2VjLCAweGFhNDA2MGVmLCAweDA2NWU3MTlmLCAweDUxYmQ2ZTEwLCAweGY5M2UyMThhLCAweDNkOTZkZDA2LCAweGFlZGQzZTA1LCAweDQ2NGRlNmJkLCAweGI1OTE1NDhkLCAweDA1NzFjNDVkLCAweDZmMDQwNmQ0LCAweGZmNjA1MDE1LCAweDI0MTk5OGZiLCAweDk3ZDZiZGU5LCAweGNjODk0MDQzLCAweDc3NjdkOTllLCAweGJkYjBlODQyLCAweDg4MDc4OThiLCAweDM4ZTcxOTViLCAweGRiNzljOGVlLCAweDQ3YTE3YzBhLCAweGU5N2M0MjBmLCAweGM5Zjg4NDFlLCAweDAwMDAwMDAwLCAweDgzMDk4MDg2LCAweDQ4MzIyYmVkLCAweGFjMWUxMTcwLCAweDRlNmM1YTcyLCAweGZiZmQwZWZmLCAweDU2MGY4NTM4LCAweDFlM2RhZWQ1LCAweDI3MzYyZDM5LCAweDY0MGEwZmQ5LCAweDIxNjg1Y2E2LCAweGQxOWI1YjU0LCAweDNhMjQzNjJlLCAweGIxMGMwYTY3LCAweDBmOTM1N2U3LCAweGQyYjRlZTk2LCAweDllMWI5YjkxLCAweDRmODBjMGM1LCAweGEyNjFkYzIwLCAweDY5NWE3NzRiLCAweDE2MWMxMjFhLCAweDBhZTI5M2JhLCAweGU1YzBhMDJhLCAweDQzM2MyMmUwLCAweDFkMTIxYjE3LCAweDBiMGUwOTBkLCAweGFkZjI4YmM3LCAweGI5MmRiNmE4LCAweGM4MTQxZWE5LCAweDg1NTdmMTE5LCAweDRjYWY3NTA3LCAweGJiZWU5OWRkLCAweGZkYTM3ZjYwLCAweDlmZjcwMTI2LCAweGJjNWM3MmY1LCAweGM1NDQ2NjNiLCAweDM0NWJmYjdlLCAweDc2OGI0MzI5LCAweGRjY2IyM2M2LCAweDY4YjZlZGZjLCAweDYzYjhlNGYxLCAweGNhZDczMWRjLCAweDEwNDI2Mzg1LCAweDQwMTM5NzIyLCAweDIwODRjNjExLCAweDdkODU0YTI0LCAweGY4ZDJiYjNkLCAweDExYWVmOTMyLCAweDZkYzcyOWExLCAweDRiMWQ5ZTJmLCAweGYzZGNiMjMwLCAweGVjMGQ4NjUyLCAweGQwNzdjMWUzLCAweDZjMmJiMzE2LCAweDk5YTk3MGI5LCAweGZhMTE5NDQ4LCAweDIyNDdlOTY0LCAweGM0YThmYzhjLCAweDFhYTBmMDNmLCAweGQ4NTY3ZDJjLCAweGVmMjIzMzkwLCAweGM3ODc0OTRlLCAweGMxZDkzOGQxLCAweGZlOGNjYWEyLCAweDM2OThkNDBiLCAweGNmYTZmNTgxLCAweDI4YTU3YWRlLCAweDI2ZGFiNzhlLCAweGE0M2ZhZGJmLCAweGU0MmMzYTlkLCAweDBkNTA3ODkyLCAweDliNmE1ZmNjLCAweDYyNTQ3ZTQ2LCAweGMyZjY4ZDEzLCAweGU4OTBkOGI4LCAweDVlMmUzOWY3LCAweGY1ODJjM2FmLCAweGJlOWY1ZDgwLCAweDdjNjlkMDkzLCAweGE5NmZkNTJkLCAweGIzY2YyNTEyLCAweDNiYzhhYzk5LCAweGE3MTAxODdkLCAweDZlZTg5YzYzLCAweDdiZGIzYmJiLCAweDA5Y2QyNjc4LCAweGY0NmU1OTE4LCAweDAxZWM5YWI3LCAweGE4ODM0ZjlhLCAweDY1ZTY5NTZlLCAweDdlYWFmZmU2LCAweDA4MjFiY2NmLCAweGU2ZWYxNWU4LCAweGQ5YmFlNzliLCAweGNlNGE2ZjM2LCAweGQ0ZWE5ZjA5LCAweGQ2MjliMDdjLCAweGFmMzFhNGIyLCAweDMxMmEzZjIzLCAweDMwYzZhNTk0LCAweGMwMzVhMjY2LCAweDM3NzQ0ZWJjLCAweGE2ZmM4MmNhLCAweGIwZTA5MGQwLCAweDE1MzNhN2Q4LCAweDRhZjEwNDk4LCAweGY3NDFlY2RhLCAweDBlN2ZjZDUwLCAweDJmMTc5MWY2LCAweDhkNzY0ZGQ2LCAweDRkNDNlZmIwLCAweDU0Y2NhYTRkLCAweGRmZTQ5NjA0LCAweGUzOWVkMWI1LCAweDFiNGM2YTg4LCAweGI4YzEyYzFmLCAweDdmNDY2NTUxLCAweDA0OWQ1ZWVhLCAweDVkMDE4YzM1LCAweDczZmE4Nzc0LCAweDJlZmIwYjQxLCAweDVhYjM2NzFkLCAweDUyOTJkYmQyLCAweDMzZTkxMDU2LCAweDEzNmRkNjQ3LCAweDhjOWFkNzYxLCAweDdhMzdhMTBjLCAweDhlNTlmODE0LCAweDg5ZWIxMzNjLCAweGVlY2VhOTI3LCAweDM1Yjc2MWM5LCAweGVkZTExY2U1LCAweDNjN2E0N2IxLCAweDU5OWNkMmRmLCAweDNmNTVmMjczLCAweDc5MTgxNGNlLCAweGJmNzNjNzM3LCAweGVhNTNmN2NkLCAweDViNWZmZGFhLCAweDE0ZGYzZDZmLCAweDg2Nzg0NGRiLCAweDgxY2FhZmYzLCAweDNlYjk2OGM0LCAweDJjMzgyNDM0LCAweDVmYzJhMzQwLCAweDcyMTYxZGMzLCAweDBjYmNlMjI1LCAweDhiMjgzYzQ5LCAweDQxZmYwZDk1LCAweDcxMzlhODAxLCAweGRlMDgwY2IzLCAweDljZDhiNGU0LCAweDkwNjQ1NmMxLCAweDYxN2JjYjg0LCAweDcwZDUzMmI2LCAweDc0NDg2YzVjLCAweDQyZDBiODU3XTtcbiAgICB2YXIgVDcgPSBbMHhhNzUwNTFmNCwgMHg2NTUzN2U0MSwgMHhhNGMzMWExNywgMHg1ZTk2M2EyNywgMHg2YmNiM2JhYiwgMHg0NWYxMWY5ZCwgMHg1OGFiYWNmYSwgMHgwMzkzNGJlMywgMHhmYTU1MjAzMCwgMHg2ZGY2YWQ3NiwgMHg3NjkxODhjYywgMHg0YzI1ZjUwMiwgMHhkN2ZjNGZlNSwgMHhjYmQ3YzUyYSwgMHg0NDgwMjYzNSwgMHhhMzhmYjU2MiwgMHg1YTQ5ZGViMSwgMHgxYjY3MjViYSwgMHgwZTk4NDVlYSwgMHhjMGUxNWRmZSwgMHg3NTAyYzMyZiwgMHhmMDEyODE0YywgMHg5N2EzOGQ0NiwgMHhmOWM2NmJkMywgMHg1ZmU3MDM4ZiwgMHg5Yzk1MTU5MiwgMHg3YWViYmY2ZCwgMHg1OWRhOTU1MiwgMHg4MzJkZDRiZSwgMHgyMWQzNTg3NCwgMHg2OTI5NDllMCwgMHhjODQ0OGVjOSwgMHg4OTZhNzVjMiwgMHg3OTc4ZjQ4ZSwgMHgzZTZiOTk1OCwgMHg3MWRkMjdiOSwgMHg0ZmI2YmVlMSwgMHhhZDE3ZjA4OCwgMHhhYzY2YzkyMCwgMHgzYWI0N2RjZSwgMHg0YTE4NjNkZiwgMHgzMTgyZTUxYSwgMHgzMzYwOTc1MSwgMHg3ZjQ1NjI1MywgMHg3N2UwYjE2NCwgMHhhZTg0YmI2YiwgMHhhMDFjZmU4MSwgMHgyYjk0ZjkwOCwgMHg2ODU4NzA0OCwgMHhmZDE5OGY0NSwgMHg2Yzg3OTRkZSwgMHhmOGI3NTI3YiwgMHhkMzIzYWI3MywgMHgwMmUyNzI0YiwgMHg4ZjU3ZTMxZiwgMHhhYjJhNjY1NSwgMHgyODA3YjJlYiwgMHhjMjAzMmZiNSwgMHg3YjlhODZjNSwgMHgwOGE1ZDMzNywgMHg4N2YyMzAyOCwgMHhhNWIyMjNiZiwgMHg2YWJhMDIwMywgMHg4MjVjZWQxNiwgMHgxYzJiOGFjZiwgMHhiNDkyYTc3OSwgMHhmMmYwZjMwNywgMHhlMmExNGU2OSwgMHhmNGNkNjVkYSwgMHhiZWQ1MDYwNSwgMHg2MjFmZDEzNCwgMHhmZThhYzRhNiwgMHg1MzlkMzQyZSwgMHg1NWEwYTJmMywgMHhlMTMyMDU4YSwgMHhlYjc1YTRmNiwgMHhlYzM5MGI4MywgMHhlZmFhNDA2MCwgMHg5ZjA2NWU3MSwgMHgxMDUxYmQ2ZSwgMHg4YWY5M2UyMSwgMHgwNjNkOTZkZCwgMHgwNWFlZGQzZSwgMHhiZDQ2NGRlNiwgMHg4ZGI1OTE1NCwgMHg1ZDA1NzFjNCwgMHhkNDZmMDQwNiwgMHgxNWZmNjA1MCwgMHhmYjI0MTk5OCwgMHhlOTk3ZDZiZCwgMHg0M2NjODk0MCwgMHg5ZTc3NjdkOSwgMHg0MmJkYjBlOCwgMHg4Yjg4MDc4OSwgMHg1YjM4ZTcxOSwgMHhlZWRiNzljOCwgMHgwYTQ3YTE3YywgMHgwZmU5N2M0MiwgMHgxZWM5Zjg4NCwgMHgwMDAwMDAwMCwgMHg4NjgzMDk4MCwgMHhlZDQ4MzIyYiwgMHg3MGFjMWUxMSwgMHg3MjRlNmM1YSwgMHhmZmZiZmQwZSwgMHgzODU2MGY4NSwgMHhkNTFlM2RhZSwgMHgzOTI3MzYyZCwgMHhkOTY0MGEwZiwgMHhhNjIxNjg1YywgMHg1NGQxOWI1YiwgMHgyZTNhMjQzNiwgMHg2N2IxMGMwYSwgMHhlNzBmOTM1NywgMHg5NmQyYjRlZSwgMHg5MTllMWI5YiwgMHhjNTRmODBjMCwgMHgyMGEyNjFkYywgMHg0YjY5NWE3NywgMHgxYTE2MWMxMiwgMHhiYTBhZTI5MywgMHgyYWU1YzBhMCwgMHhlMDQzM2MyMiwgMHgxNzFkMTIxYiwgMHgwZDBiMGUwOSwgMHhjN2FkZjI4YiwgMHhhOGI5MmRiNiwgMHhhOWM4MTQxZSwgMHgxOTg1NTdmMSwgMHgwNzRjYWY3NSwgMHhkZGJiZWU5OSwgMHg2MGZkYTM3ZiwgMHgyNjlmZjcwMSwgMHhmNWJjNWM3MiwgMHgzYmM1NDQ2NiwgMHg3ZTM0NWJmYiwgMHgyOTc2OGI0MywgMHhjNmRjY2IyMywgMHhmYzY4YjZlZCwgMHhmMTYzYjhlNCwgMHhkY2NhZDczMSwgMHg4NTEwNDI2MywgMHgyMjQwMTM5NywgMHgxMTIwODRjNiwgMHgyNDdkODU0YSwgMHgzZGY4ZDJiYiwgMHgzMjExYWVmOSwgMHhhMTZkYzcyOSwgMHgyZjRiMWQ5ZSwgMHgzMGYzZGNiMiwgMHg1MmVjMGQ4NiwgMHhlM2QwNzdjMSwgMHgxNjZjMmJiMywgMHhiOTk5YTk3MCwgMHg0OGZhMTE5NCwgMHg2NDIyNDdlOSwgMHg4Y2M0YThmYywgMHgzZjFhYTBmMCwgMHgyY2Q4NTY3ZCwgMHg5MGVmMjIzMywgMHg0ZWM3ODc0OSwgMHhkMWMxZDkzOCwgMHhhMmZlOGNjYSwgMHgwYjM2OThkNCwgMHg4MWNmYTZmNSwgMHhkZTI4YTU3YSwgMHg4ZTI2ZGFiNywgMHhiZmE0M2ZhZCwgMHg5ZGU0MmMzYSwgMHg5MjBkNTA3OCwgMHhjYzliNmE1ZiwgMHg0NjYyNTQ3ZSwgMHgxM2MyZjY4ZCwgMHhiOGU4OTBkOCwgMHhmNzVlMmUzOSwgMHhhZmY1ODJjMywgMHg4MGJlOWY1ZCwgMHg5MzdjNjlkMCwgMHgyZGE5NmZkNSwgMHgxMmIzY2YyNSwgMHg5OTNiYzhhYywgMHg3ZGE3MTAxOCwgMHg2MzZlZTg5YywgMHhiYjdiZGIzYiwgMHg3ODA5Y2QyNiwgMHgxOGY0NmU1OSwgMHhiNzAxZWM5YSwgMHg5YWE4ODM0ZiwgMHg2ZTY1ZTY5NSwgMHhlNjdlYWFmZiwgMHhjZjA4MjFiYywgMHhlOGU2ZWYxNSwgMHg5YmQ5YmFlNywgMHgzNmNlNGE2ZiwgMHgwOWQ0ZWE5ZiwgMHg3Y2Q2MjliMCwgMHhiMmFmMzFhNCwgMHgyMzMxMmEzZiwgMHg5NDMwYzZhNSwgMHg2NmMwMzVhMiwgMHhiYzM3NzQ0ZSwgMHhjYWE2ZmM4MiwgMHhkMGIwZTA5MCwgMHhkODE1MzNhNywgMHg5ODRhZjEwNCwgMHhkYWY3NDFlYywgMHg1MDBlN2ZjZCwgMHhmNjJmMTc5MSwgMHhkNjhkNzY0ZCwgMHhiMDRkNDNlZiwgMHg0ZDU0Y2NhYSwgMHgwNGRmZTQ5NiwgMHhiNWUzOWVkMSwgMHg4ODFiNGM2YSwgMHgxZmI4YzEyYywgMHg1MTdmNDY2NSwgMHhlYTA0OWQ1ZSwgMHgzNTVkMDE4YywgMHg3NDczZmE4NywgMHg0MTJlZmIwYiwgMHgxZDVhYjM2NywgMHhkMjUyOTJkYiwgMHg1NjMzZTkxMCwgMHg0NzEzNmRkNiwgMHg2MThjOWFkNywgMHgwYzdhMzdhMSwgMHgxNDhlNTlmOCwgMHgzYzg5ZWIxMywgMHgyN2VlY2VhOSwgMHhjOTM1Yjc2MSwgMHhlNWVkZTExYywgMHhiMTNjN2E0NywgMHhkZjU5OWNkMiwgMHg3MzNmNTVmMiwgMHhjZTc5MTgxNCwgMHgzN2JmNzNjNywgMHhjZGVhNTNmNywgMHhhYTViNWZmZCwgMHg2ZjE0ZGYzZCwgMHhkYjg2Nzg0NCwgMHhmMzgxY2FhZiwgMHhjNDNlYjk2OCwgMHgzNDJjMzgyNCwgMHg0MDVmYzJhMywgMHhjMzcyMTYxZCwgMHgyNTBjYmNlMiwgMHg0OThiMjgzYywgMHg5NTQxZmYwZCwgMHgwMTcxMzlhOCwgMHhiM2RlMDgwYywgMHhlNDljZDhiNCwgMHhjMTkwNjQ1NiwgMHg4NDYxN2JjYiwgMHhiNjcwZDUzMiwgMHg1Yzc0NDg2YywgMHg1NzQyZDBiOF07XG4gICAgdmFyIFQ4ID0gWzB4ZjRhNzUwNTEsIDB4NDE2NTUzN2UsIDB4MTdhNGMzMWEsIDB4Mjc1ZTk2M2EsIDB4YWI2YmNiM2IsIDB4OWQ0NWYxMWYsIDB4ZmE1OGFiYWMsIDB4ZTMwMzkzNGIsIDB4MzBmYTU1MjAsIDB4NzY2ZGY2YWQsIDB4Y2M3NjkxODgsIDB4MDI0YzI1ZjUsIDB4ZTVkN2ZjNGYsIDB4MmFjYmQ3YzUsIDB4MzU0NDgwMjYsIDB4NjJhMzhmYjUsIDB4YjE1YTQ5ZGUsIDB4YmExYjY3MjUsIDB4ZWEwZTk4NDUsIDB4ZmVjMGUxNWQsIDB4MmY3NTAyYzMsIDB4NGNmMDEyODEsIDB4NDY5N2EzOGQsIDB4ZDNmOWM2NmIsIDB4OGY1ZmU3MDMsIDB4OTI5Yzk1MTUsIDB4NmQ3YWViYmYsIDB4NTI1OWRhOTUsIDB4YmU4MzJkZDQsIDB4NzQyMWQzNTgsIDB4ZTA2OTI5NDksIDB4YzljODQ0OGUsIDB4YzI4OTZhNzUsIDB4OGU3OTc4ZjQsIDB4NTgzZTZiOTksIDB4Yjk3MWRkMjcsIDB4ZTE0ZmI2YmUsIDB4ODhhZDE3ZjAsIDB4MjBhYzY2YzksIDB4Y2UzYWI0N2QsIDB4ZGY0YTE4NjMsIDB4MWEzMTgyZTUsIDB4NTEzMzYwOTcsIDB4NTM3ZjQ1NjIsIDB4NjQ3N2UwYjEsIDB4NmJhZTg0YmIsIDB4ODFhMDFjZmUsIDB4MDgyYjk0ZjksIDB4NDg2ODU4NzAsIDB4NDVmZDE5OGYsIDB4ZGU2Yzg3OTQsIDB4N2JmOGI3NTIsIDB4NzNkMzIzYWIsIDB4NGIwMmUyNzIsIDB4MWY4ZjU3ZTMsIDB4NTVhYjJhNjYsIDB4ZWIyODA3YjIsIDB4YjVjMjAzMmYsIDB4YzU3YjlhODYsIDB4MzcwOGE1ZDMsIDB4Mjg4N2YyMzAsIDB4YmZhNWIyMjMsIDB4MDM2YWJhMDIsIDB4MTY4MjVjZWQsIDB4Y2YxYzJiOGEsIDB4NzliNDkyYTcsIDB4MDdmMmYwZjMsIDB4NjllMmExNGUsIDB4ZGFmNGNkNjUsIDB4MDViZWQ1MDYsIDB4MzQ2MjFmZDEsIDB4YTZmZThhYzQsIDB4MmU1MzlkMzQsIDB4ZjM1NWEwYTIsIDB4OGFlMTMyMDUsIDB4ZjZlYjc1YTQsIDB4ODNlYzM5MGIsIDB4NjBlZmFhNDAsIDB4NzE5ZjA2NWUsIDB4NmUxMDUxYmQsIDB4MjE4YWY5M2UsIDB4ZGQwNjNkOTYsIDB4M2UwNWFlZGQsIDB4ZTZiZDQ2NGQsIDB4NTQ4ZGI1OTEsIDB4YzQ1ZDA1NzEsIDB4MDZkNDZmMDQsIDB4NTAxNWZmNjAsIDB4OThmYjI0MTksIDB4YmRlOTk3ZDYsIDB4NDA0M2NjODksIDB4ZDk5ZTc3NjcsIDB4ZTg0MmJkYjAsIDB4ODk4Yjg4MDcsIDB4MTk1YjM4ZTcsIDB4YzhlZWRiNzksIDB4N2MwYTQ3YTEsIDB4NDIwZmU5N2MsIDB4ODQxZWM5ZjgsIDB4MDAwMDAwMDAsIDB4ODA4NjgzMDksIDB4MmJlZDQ4MzIsIDB4MTE3MGFjMWUsIDB4NWE3MjRlNmMsIDB4MGVmZmZiZmQsIDB4ODUzODU2MGYsIDB4YWVkNTFlM2QsIDB4MmQzOTI3MzYsIDB4MGZkOTY0MGEsIDB4NWNhNjIxNjgsIDB4NWI1NGQxOWIsIDB4MzYyZTNhMjQsIDB4MGE2N2IxMGMsIDB4NTdlNzBmOTMsIDB4ZWU5NmQyYjQsIDB4OWI5MTllMWIsIDB4YzBjNTRmODAsIDB4ZGMyMGEyNjEsIDB4Nzc0YjY5NWEsIDB4MTIxYTE2MWMsIDB4OTNiYTBhZTIsIDB4YTAyYWU1YzAsIDB4MjJlMDQzM2MsIDB4MWIxNzFkMTIsIDB4MDkwZDBiMGUsIDB4OGJjN2FkZjIsIDB4YjZhOGI5MmQsIDB4MWVhOWM4MTQsIDB4ZjExOTg1NTcsIDB4NzUwNzRjYWYsIDB4OTlkZGJiZWUsIDB4N2Y2MGZkYTMsIDB4MDEyNjlmZjcsIDB4NzJmNWJjNWMsIDB4NjYzYmM1NDQsIDB4ZmI3ZTM0NWIsIDB4NDMyOTc2OGIsIDB4MjNjNmRjY2IsIDB4ZWRmYzY4YjYsIDB4ZTRmMTYzYjgsIDB4MzFkY2NhZDcsIDB4NjM4NTEwNDIsIDB4OTcyMjQwMTMsIDB4YzYxMTIwODQsIDB4NGEyNDdkODUsIDB4YmIzZGY4ZDIsIDB4ZjkzMjExYWUsIDB4MjlhMTZkYzcsIDB4OWUyZjRiMWQsIDB4YjIzMGYzZGMsIDB4ODY1MmVjMGQsIDB4YzFlM2QwNzcsIDB4YjMxNjZjMmIsIDB4NzBiOTk5YTksIDB4OTQ0OGZhMTEsIDB4ZTk2NDIyNDcsIDB4ZmM4Y2M0YTgsIDB4ZjAzZjFhYTAsIDB4N2QyY2Q4NTYsIDB4MzM5MGVmMjIsIDB4NDk0ZWM3ODcsIDB4MzhkMWMxZDksIDB4Y2FhMmZlOGMsIDB4ZDQwYjM2OTgsIDB4ZjU4MWNmYTYsIDB4N2FkZTI4YTUsIDB4Yjc4ZTI2ZGEsIDB4YWRiZmE0M2YsIDB4M2E5ZGU0MmMsIDB4Nzg5MjBkNTAsIDB4NWZjYzliNmEsIDB4N2U0NjYyNTQsIDB4OGQxM2MyZjYsIDB4ZDhiOGU4OTAsIDB4MzlmNzVlMmUsIDB4YzNhZmY1ODIsIDB4NWQ4MGJlOWYsIDB4ZDA5MzdjNjksIDB4ZDUyZGE5NmYsIDB4MjUxMmIzY2YsIDB4YWM5OTNiYzgsIDB4MTg3ZGE3MTAsIDB4OWM2MzZlZTgsIDB4M2JiYjdiZGIsIDB4MjY3ODA5Y2QsIDB4NTkxOGY0NmUsIDB4OWFiNzAxZWMsIDB4NGY5YWE4ODMsIDB4OTU2ZTY1ZTYsIDB4ZmZlNjdlYWEsIDB4YmNjZjA4MjEsIDB4MTVlOGU2ZWYsIDB4ZTc5YmQ5YmEsIDB4NmYzNmNlNGEsIDB4OWYwOWQ0ZWEsIDB4YjA3Y2Q2MjksIDB4YTRiMmFmMzEsIDB4M2YyMzMxMmEsIDB4YTU5NDMwYzYsIDB4YTI2NmMwMzUsIDB4NGViYzM3NzQsIDB4ODJjYWE2ZmMsIDB4OTBkMGIwZTAsIDB4YTdkODE1MzMsIDB4MDQ5ODRhZjEsIDB4ZWNkYWY3NDEsIDB4Y2Q1MDBlN2YsIDB4OTFmNjJmMTcsIDB4NGRkNjhkNzYsIDB4ZWZiMDRkNDMsIDB4YWE0ZDU0Y2MsIDB4OTYwNGRmZTQsIDB4ZDFiNWUzOWUsIDB4NmE4ODFiNGMsIDB4MmMxZmI4YzEsIDB4NjU1MTdmNDYsIDB4NWVlYTA0OWQsIDB4OGMzNTVkMDEsIDB4ODc3NDczZmEsIDB4MGI0MTJlZmIsIDB4NjcxZDVhYjMsIDB4ZGJkMjUyOTIsIDB4MTA1NjMzZTksIDB4ZDY0NzEzNmQsIDB4ZDc2MThjOWEsIDB4YTEwYzdhMzcsIDB4ZjgxNDhlNTksIDB4MTMzYzg5ZWIsIDB4YTkyN2VlY2UsIDB4NjFjOTM1YjcsIDB4MWNlNWVkZTEsIDB4NDdiMTNjN2EsIDB4ZDJkZjU5OWMsIDB4ZjI3MzNmNTUsIDB4MTRjZTc5MTgsIDB4YzczN2JmNzMsIDB4ZjdjZGVhNTMsIDB4ZmRhYTViNWYsIDB4M2Q2ZjE0ZGYsIDB4NDRkYjg2NzgsIDB4YWZmMzgxY2EsIDB4NjhjNDNlYjksIDB4MjQzNDJjMzgsIDB4YTM0MDVmYzIsIDB4MWRjMzcyMTYsIDB4ZTIyNTBjYmMsIDB4M2M0OThiMjgsIDB4MGQ5NTQxZmYsIDB4YTgwMTcxMzksIDB4MGNiM2RlMDgsIDB4YjRlNDljZDgsIDB4NTZjMTkwNjQsIDB4Y2I4NDYxN2IsIDB4MzJiNjcwZDUsIDB4NmM1Yzc0NDgsIDB4Yjg1NzQyZDBdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBkZWNyeXB0aW9uIGtleSBleHBhbnNpb25cbiAgICB2YXIgVTEgPSBbMHgwMDAwMDAwMCwgMHgwZTA5MGQwYiwgMHgxYzEyMWExNiwgMHgxMjFiMTcxZCwgMHgzODI0MzQyYywgMHgzNjJkMzkyNywgMHgyNDM2MmUzYSwgMHgyYTNmMjMzMSwgMHg3MDQ4Njg1OCwgMHg3ZTQxNjU1MywgMHg2YzVhNzI0ZSwgMHg2MjUzN2Y0NSwgMHg0ODZjNWM3NCwgMHg0NjY1NTE3ZiwgMHg1NDdlNDY2MiwgMHg1YTc3NGI2OSwgMHhlMDkwZDBiMCwgMHhlZTk5ZGRiYiwgMHhmYzgyY2FhNiwgMHhmMjhiYzdhZCwgMHhkOGI0ZTQ5YywgMHhkNmJkZTk5NywgMHhjNGE2ZmU4YSwgMHhjYWFmZjM4MSwgMHg5MGQ4YjhlOCwgMHg5ZWQxYjVlMywgMHg4Y2NhYTJmZSwgMHg4MmMzYWZmNSwgMHhhOGZjOGNjNCwgMHhhNmY1ODFjZiwgMHhiNGVlOTZkMiwgMHhiYWU3OWJkOSwgMHhkYjNiYmI3YiwgMHhkNTMyYjY3MCwgMHhjNzI5YTE2ZCwgMHhjOTIwYWM2NiwgMHhlMzFmOGY1NywgMHhlZDE2ODI1YywgMHhmZjBkOTU0MSwgMHhmMTA0OTg0YSwgMHhhYjczZDMyMywgMHhhNTdhZGUyOCwgMHhiNzYxYzkzNSwgMHhiOTY4YzQzZSwgMHg5MzU3ZTcwZiwgMHg5ZDVlZWEwNCwgMHg4ZjQ1ZmQxOSwgMHg4MTRjZjAxMiwgMHgzYmFiNmJjYiwgMHgzNWEyNjZjMCwgMHgyN2I5NzFkZCwgMHgyOWIwN2NkNiwgMHgwMzhmNWZlNywgMHgwZDg2NTJlYywgMHgxZjlkNDVmMSwgMHgxMTk0NDhmYSwgMHg0YmUzMDM5MywgMHg0NWVhMGU5OCwgMHg1N2YxMTk4NSwgMHg1OWY4MTQ4ZSwgMHg3M2M3MzdiZiwgMHg3ZGNlM2FiNCwgMHg2ZmQ1MmRhOSwgMHg2MWRjMjBhMiwgMHhhZDc2NmRmNiwgMHhhMzdmNjBmZCwgMHhiMTY0NzdlMCwgMHhiZjZkN2FlYiwgMHg5NTUyNTlkYSwgMHg5YjViNTRkMSwgMHg4OTQwNDNjYywgMHg4NzQ5NGVjNywgMHhkZDNlMDVhZSwgMHhkMzM3MDhhNSwgMHhjMTJjMWZiOCwgMHhjZjI1MTJiMywgMHhlNTFhMzE4MiwgMHhlYjEzM2M4OSwgMHhmOTA4MmI5NCwgMHhmNzAxMjY5ZiwgMHg0ZGU2YmQ0NiwgMHg0M2VmYjA0ZCwgMHg1MWY0YTc1MCwgMHg1ZmZkYWE1YiwgMHg3NWMyODk2YSwgMHg3YmNiODQ2MSwgMHg2OWQwOTM3YywgMHg2N2Q5OWU3NywgMHgzZGFlZDUxZSwgMHgzM2E3ZDgxNSwgMHgyMWJjY2YwOCwgMHgyZmI1YzIwMywgMHgwNThhZTEzMiwgMHgwYjgzZWMzOSwgMHgxOTk4ZmIyNCwgMHgxNzkxZjYyZiwgMHg3NjRkZDY4ZCwgMHg3ODQ0ZGI4NiwgMHg2YTVmY2M5YiwgMHg2NDU2YzE5MCwgMHg0ZTY5ZTJhMSwgMHg0MDYwZWZhYSwgMHg1MjdiZjhiNywgMHg1YzcyZjViYywgMHgwNjA1YmVkNSwgMHgwODBjYjNkZSwgMHgxYTE3YTRjMywgMHgxNDFlYTljOCwgMHgzZTIxOGFmOSwgMHgzMDI4ODdmMiwgMHgyMjMzOTBlZiwgMHgyYzNhOWRlNCwgMHg5NmRkMDYzZCwgMHg5OGQ0MGIzNiwgMHg4YWNmMWMyYiwgMHg4NGM2MTEyMCwgMHhhZWY5MzIxMSwgMHhhMGYwM2YxYSwgMHhiMmViMjgwNywgMHhiY2UyMjUwYywgMHhlNjk1NmU2NSwgMHhlODljNjM2ZSwgMHhmYTg3NzQ3MywgMHhmNDhlNzk3OCwgMHhkZWIxNWE0OSwgMHhkMGI4NTc0MiwgMHhjMmEzNDA1ZiwgMHhjY2FhNGQ1NCwgMHg0MWVjZGFmNywgMHg0ZmU1ZDdmYywgMHg1ZGZlYzBlMSwgMHg1M2Y3Y2RlYSwgMHg3OWM4ZWVkYiwgMHg3N2MxZTNkMCwgMHg2NWRhZjRjZCwgMHg2YmQzZjljNiwgMHgzMWE0YjJhZiwgMHgzZmFkYmZhNCwgMHgyZGI2YThiOSwgMHgyM2JmYTViMiwgMHgwOTgwODY4MywgMHgwNzg5OGI4OCwgMHgxNTkyOWM5NSwgMHgxYjliOTE5ZSwgMHhhMTdjMGE0NywgMHhhZjc1MDc0YywgMHhiZDZlMTA1MSwgMHhiMzY3MWQ1YSwgMHg5OTU4M2U2YiwgMHg5NzUxMzM2MCwgMHg4NTRhMjQ3ZCwgMHg4YjQzMjk3NiwgMHhkMTM0NjIxZiwgMHhkZjNkNmYxNCwgMHhjZDI2NzgwOSwgMHhjMzJmNzUwMiwgMHhlOTEwNTYzMywgMHhlNzE5NWIzOCwgMHhmNTAyNGMyNSwgMHhmYjBiNDEyZSwgMHg5YWQ3NjE4YywgMHg5NGRlNmM4NywgMHg4NmM1N2I5YSwgMHg4OGNjNzY5MSwgMHhhMmYzNTVhMCwgMHhhY2ZhNThhYiwgMHhiZWUxNGZiNiwgMHhiMGU4NDJiZCwgMHhlYTlmMDlkNCwgMHhlNDk2MDRkZiwgMHhmNjhkMTNjMiwgMHhmODg0MWVjOSwgMHhkMmJiM2RmOCwgMHhkY2IyMzBmMywgMHhjZWE5MjdlZSwgMHhjMGEwMmFlNSwgMHg3YTQ3YjEzYywgMHg3NDRlYmMzNywgMHg2NjU1YWIyYSwgMHg2ODVjYTYyMSwgMHg0MjYzODUxMCwgMHg0YzZhODgxYiwgMHg1ZTcxOWYwNiwgMHg1MDc4OTIwZCwgMHgwYTBmZDk2NCwgMHgwNDA2ZDQ2ZiwgMHgxNjFkYzM3MiwgMHgxODE0Y2U3OSwgMHgzMjJiZWQ0OCwgMHgzYzIyZTA0MywgMHgyZTM5Zjc1ZSwgMHgyMDMwZmE1NSwgMHhlYzlhYjcwMSwgMHhlMjkzYmEwYSwgMHhmMDg4YWQxNywgMHhmZTgxYTAxYywgMHhkNGJlODMyZCwgMHhkYWI3OGUyNiwgMHhjOGFjOTkzYiwgMHhjNmE1OTQzMCwgMHg5Y2QyZGY1OSwgMHg5MmRiZDI1MiwgMHg4MGMwYzU0ZiwgMHg4ZWM5Yzg0NCwgMHhhNGY2ZWI3NSwgMHhhYWZmZTY3ZSwgMHhiOGU0ZjE2MywgMHhiNmVkZmM2OCwgMHgwYzBhNjdiMSwgMHgwMjAzNmFiYSwgMHgxMDE4N2RhNywgMHgxZTExNzBhYywgMHgzNDJlNTM5ZCwgMHgzYTI3NWU5NiwgMHgyODNjNDk4YiwgMHgyNjM1NDQ4MCwgMHg3YzQyMGZlOSwgMHg3MjRiMDJlMiwgMHg2MDUwMTVmZiwgMHg2ZTU5MThmNCwgMHg0NDY2M2JjNSwgMHg0YTZmMzZjZSwgMHg1ODc0MjFkMywgMHg1NjdkMmNkOCwgMHgzN2ExMGM3YSwgMHgzOWE4MDE3MSwgMHgyYmIzMTY2YywgMHgyNWJhMWI2NywgMHgwZjg1Mzg1NiwgMHgwMThjMzU1ZCwgMHgxMzk3MjI0MCwgMHgxZDllMmY0YiwgMHg0N2U5NjQyMiwgMHg0OWUwNjkyOSwgMHg1YmZiN2UzNCwgMHg1NWYyNzMzZiwgMHg3ZmNkNTAwZSwgMHg3MWM0NWQwNSwgMHg2M2RmNGExOCwgMHg2ZGQ2NDcxMywgMHhkNzMxZGNjYSwgMHhkOTM4ZDFjMSwgMHhjYjIzYzZkYywgMHhjNTJhY2JkNywgMHhlZjE1ZThlNiwgMHhlMTFjZTVlZCwgMHhmMzA3ZjJmMCwgMHhmZDBlZmZmYiwgMHhhNzc5YjQ5MiwgMHhhOTcwYjk5OSwgMHhiYjZiYWU4NCwgMHhiNTYyYTM4ZiwgMHg5ZjVkODBiZSwgMHg5MTU0OGRiNSwgMHg4MzRmOWFhOCwgMHg4ZDQ2OTdhM107XG4gICAgdmFyIFUyID0gWzB4MDAwMDAwMDAsIDB4MGIwZTA5MGQsIDB4MTYxYzEyMWEsIDB4MWQxMjFiMTcsIDB4MmMzODI0MzQsIDB4MjczNjJkMzksIDB4M2EyNDM2MmUsIDB4MzEyYTNmMjMsIDB4NTg3MDQ4NjgsIDB4NTM3ZTQxNjUsIDB4NGU2YzVhNzIsIDB4NDU2MjUzN2YsIDB4NzQ0ODZjNWMsIDB4N2Y0NjY1NTEsIDB4NjI1NDdlNDYsIDB4Njk1YTc3NGIsIDB4YjBlMDkwZDAsIDB4YmJlZTk5ZGQsIDB4YTZmYzgyY2EsIDB4YWRmMjhiYzcsIDB4OWNkOGI0ZTQsIDB4OTdkNmJkZTksIDB4OGFjNGE2ZmUsIDB4ODFjYWFmZjMsIDB4ZTg5MGQ4YjgsIDB4ZTM5ZWQxYjUsIDB4ZmU4Y2NhYTIsIDB4ZjU4MmMzYWYsIDB4YzRhOGZjOGMsIDB4Y2ZhNmY1ODEsIDB4ZDJiNGVlOTYsIDB4ZDliYWU3OWIsIDB4N2JkYjNiYmIsIDB4NzBkNTMyYjYsIDB4NmRjNzI5YTEsIDB4NjZjOTIwYWMsIDB4NTdlMzFmOGYsIDB4NWNlZDE2ODIsIDB4NDFmZjBkOTUsIDB4NGFmMTA0OTgsIDB4MjNhYjczZDMsIDB4MjhhNTdhZGUsIDB4MzViNzYxYzksIDB4M2ViOTY4YzQsIDB4MGY5MzU3ZTcsIDB4MDQ5ZDVlZWEsIDB4MTk4ZjQ1ZmQsIDB4MTI4MTRjZjAsIDB4Y2IzYmFiNmIsIDB4YzAzNWEyNjYsIDB4ZGQyN2I5NzEsIDB4ZDYyOWIwN2MsIDB4ZTcwMzhmNWYsIDB4ZWMwZDg2NTIsIDB4ZjExZjlkNDUsIDB4ZmExMTk0NDgsIDB4OTM0YmUzMDMsIDB4OTg0NWVhMGUsIDB4ODU1N2YxMTksIDB4OGU1OWY4MTQsIDB4YmY3M2M3MzcsIDB4YjQ3ZGNlM2EsIDB4YTk2ZmQ1MmQsIDB4YTI2MWRjMjAsIDB4ZjZhZDc2NmQsIDB4ZmRhMzdmNjAsIDB4ZTBiMTY0NzcsIDB4ZWJiZjZkN2EsIDB4ZGE5NTUyNTksIDB4ZDE5YjViNTQsIDB4Y2M4OTQwNDMsIDB4Yzc4NzQ5NGUsIDB4YWVkZDNlMDUsIDB4YTVkMzM3MDgsIDB4YjhjMTJjMWYsIDB4YjNjZjI1MTIsIDB4ODJlNTFhMzEsIDB4ODllYjEzM2MsIDB4OTRmOTA4MmIsIDB4OWZmNzAxMjYsIDB4NDY0ZGU2YmQsIDB4NGQ0M2VmYjAsIDB4NTA1MWY0YTcsIDB4NWI1ZmZkYWEsIDB4NmE3NWMyODksIDB4NjE3YmNiODQsIDB4N2M2OWQwOTMsIDB4Nzc2N2Q5OWUsIDB4MWUzZGFlZDUsIDB4MTUzM2E3ZDgsIDB4MDgyMWJjY2YsIDB4MDMyZmI1YzIsIDB4MzIwNThhZTEsIDB4MzkwYjgzZWMsIDB4MjQxOTk4ZmIsIDB4MmYxNzkxZjYsIDB4OGQ3NjRkZDYsIDB4ODY3ODQ0ZGIsIDB4OWI2YTVmY2MsIDB4OTA2NDU2YzEsIDB4YTE0ZTY5ZTIsIDB4YWE0MDYwZWYsIDB4Yjc1MjdiZjgsIDB4YmM1YzcyZjUsIDB4ZDUwNjA1YmUsIDB4ZGUwODBjYjMsIDB4YzMxYTE3YTQsIDB4YzgxNDFlYTksIDB4ZjkzZTIxOGEsIDB4ZjIzMDI4ODcsIDB4ZWYyMjMzOTAsIDB4ZTQyYzNhOWQsIDB4M2Q5NmRkMDYsIDB4MzY5OGQ0MGIsIDB4MmI4YWNmMWMsIDB4MjA4NGM2MTEsIDB4MTFhZWY5MzIsIDB4MWFhMGYwM2YsIDB4MDdiMmViMjgsIDB4MGNiY2UyMjUsIDB4NjVlNjk1NmUsIDB4NmVlODljNjMsIDB4NzNmYTg3NzQsIDB4NzhmNDhlNzksIDB4NDlkZWIxNWEsIDB4NDJkMGI4NTcsIDB4NWZjMmEzNDAsIDB4NTRjY2FhNGQsIDB4Zjc0MWVjZGEsIDB4ZmM0ZmU1ZDcsIDB4ZTE1ZGZlYzAsIDB4ZWE1M2Y3Y2QsIDB4ZGI3OWM4ZWUsIDB4ZDA3N2MxZTMsIDB4Y2Q2NWRhZjQsIDB4YzY2YmQzZjksIDB4YWYzMWE0YjIsIDB4YTQzZmFkYmYsIDB4YjkyZGI2YTgsIDB4YjIyM2JmYTUsIDB4ODMwOTgwODYsIDB4ODgwNzg5OGIsIDB4OTUxNTkyOWMsIDB4OWUxYjliOTEsIDB4NDdhMTdjMGEsIDB4NGNhZjc1MDcsIDB4NTFiZDZlMTAsIDB4NWFiMzY3MWQsIDB4NmI5OTU4M2UsIDB4NjA5NzUxMzMsIDB4N2Q4NTRhMjQsIDB4NzY4YjQzMjksIDB4MWZkMTM0NjIsIDB4MTRkZjNkNmYsIDB4MDljZDI2NzgsIDB4MDJjMzJmNzUsIDB4MzNlOTEwNTYsIDB4MzhlNzE5NWIsIDB4MjVmNTAyNGMsIDB4MmVmYjBiNDEsIDB4OGM5YWQ3NjEsIDB4ODc5NGRlNmMsIDB4OWE4NmM1N2IsIDB4OTE4OGNjNzYsIDB4YTBhMmYzNTUsIDB4YWJhY2ZhNTgsIDB4YjZiZWUxNGYsIDB4YmRiMGU4NDIsIDB4ZDRlYTlmMDksIDB4ZGZlNDk2MDQsIDB4YzJmNjhkMTMsIDB4YzlmODg0MWUsIDB4ZjhkMmJiM2QsIDB4ZjNkY2IyMzAsIDB4ZWVjZWE5MjcsIDB4ZTVjMGEwMmEsIDB4M2M3YTQ3YjEsIDB4Mzc3NDRlYmMsIDB4MmE2NjU1YWIsIDB4MjE2ODVjYTYsIDB4MTA0MjYzODUsIDB4MWI0YzZhODgsIDB4MDY1ZTcxOWYsIDB4MGQ1MDc4OTIsIDB4NjQwYTBmZDksIDB4NmYwNDA2ZDQsIDB4NzIxNjFkYzMsIDB4NzkxODE0Y2UsIDB4NDgzMjJiZWQsIDB4NDMzYzIyZTAsIDB4NWUyZTM5ZjcsIDB4NTUyMDMwZmEsIDB4MDFlYzlhYjcsIDB4MGFlMjkzYmEsIDB4MTdmMDg4YWQsIDB4MWNmZTgxYTAsIDB4MmRkNGJlODMsIDB4MjZkYWI3OGUsIDB4M2JjOGFjOTksIDB4MzBjNmE1OTQsIDB4NTk5Y2QyZGYsIDB4NTI5MmRiZDIsIDB4NGY4MGMwYzUsIDB4NDQ4ZWM5YzgsIDB4NzVhNGY2ZWIsIDB4N2VhYWZmZTYsIDB4NjNiOGU0ZjEsIDB4NjhiNmVkZmMsIDB4YjEwYzBhNjcsIDB4YmEwMjAzNmEsIDB4YTcxMDE4N2QsIDB4YWMxZTExNzAsIDB4OWQzNDJlNTMsIDB4OTYzYTI3NWUsIDB4OGIyODNjNDksIDB4ODAyNjM1NDQsIDB4ZTk3YzQyMGYsIDB4ZTI3MjRiMDIsIDB4ZmY2MDUwMTUsIDB4ZjQ2ZTU5MTgsIDB4YzU0NDY2M2IsIDB4Y2U0YTZmMzYsIDB4ZDM1ODc0MjEsIDB4ZDg1NjdkMmMsIDB4N2EzN2ExMGMsIDB4NzEzOWE4MDEsIDB4NmMyYmIzMTYsIDB4NjcyNWJhMWIsIDB4NTYwZjg1MzgsIDB4NWQwMThjMzUsIDB4NDAxMzk3MjIsIDB4NGIxZDllMmYsIDB4MjI0N2U5NjQsIDB4Mjk0OWUwNjksIDB4MzQ1YmZiN2UsIDB4M2Y1NWYyNzMsIDB4MGU3ZmNkNTAsIDB4MDU3MWM0NWQsIDB4MTg2M2RmNGEsIDB4MTM2ZGQ2NDcsIDB4Y2FkNzMxZGMsIDB4YzFkOTM4ZDEsIDB4ZGNjYjIzYzYsIDB4ZDdjNTJhY2IsIDB4ZTZlZjE1ZTgsIDB4ZWRlMTFjZTUsIDB4ZjBmMzA3ZjIsIDB4ZmJmZDBlZmYsIDB4OTJhNzc5YjQsIDB4OTlhOTcwYjksIDB4ODRiYjZiYWUsIDB4OGZiNTYyYTMsIDB4YmU5ZjVkODAsIDB4YjU5MTU0OGQsIDB4YTg4MzRmOWEsIDB4YTM4ZDQ2OTddO1xuICAgIHZhciBVMyA9IFsweDAwMDAwMDAwLCAweDBkMGIwZTA5LCAweDFhMTYxYzEyLCAweDE3MWQxMjFiLCAweDM0MmMzODI0LCAweDM5MjczNjJkLCAweDJlM2EyNDM2LCAweDIzMzEyYTNmLCAweDY4NTg3MDQ4LCAweDY1NTM3ZTQxLCAweDcyNGU2YzVhLCAweDdmNDU2MjUzLCAweDVjNzQ0ODZjLCAweDUxN2Y0NjY1LCAweDQ2NjI1NDdlLCAweDRiNjk1YTc3LCAweGQwYjBlMDkwLCAweGRkYmJlZTk5LCAweGNhYTZmYzgyLCAweGM3YWRmMjhiLCAweGU0OWNkOGI0LCAweGU5OTdkNmJkLCAweGZlOGFjNGE2LCAweGYzODFjYWFmLCAweGI4ZTg5MGQ4LCAweGI1ZTM5ZWQxLCAweGEyZmU4Y2NhLCAweGFmZjU4MmMzLCAweDhjYzRhOGZjLCAweDgxY2ZhNmY1LCAweDk2ZDJiNGVlLCAweDliZDliYWU3LCAweGJiN2JkYjNiLCAweGI2NzBkNTMyLCAweGExNmRjNzI5LCAweGFjNjZjOTIwLCAweDhmNTdlMzFmLCAweDgyNWNlZDE2LCAweDk1NDFmZjBkLCAweDk4NGFmMTA0LCAweGQzMjNhYjczLCAweGRlMjhhNTdhLCAweGM5MzViNzYxLCAweGM0M2ViOTY4LCAweGU3MGY5MzU3LCAweGVhMDQ5ZDVlLCAweGZkMTk4ZjQ1LCAweGYwMTI4MTRjLCAweDZiY2IzYmFiLCAweDY2YzAzNWEyLCAweDcxZGQyN2I5LCAweDdjZDYyOWIwLCAweDVmZTcwMzhmLCAweDUyZWMwZDg2LCAweDQ1ZjExZjlkLCAweDQ4ZmExMTk0LCAweDAzOTM0YmUzLCAweDBlOTg0NWVhLCAweDE5ODU1N2YxLCAweDE0OGU1OWY4LCAweDM3YmY3M2M3LCAweDNhYjQ3ZGNlLCAweDJkYTk2ZmQ1LCAweDIwYTI2MWRjLCAweDZkZjZhZDc2LCAweDYwZmRhMzdmLCAweDc3ZTBiMTY0LCAweDdhZWJiZjZkLCAweDU5ZGE5NTUyLCAweDU0ZDE5YjViLCAweDQzY2M4OTQwLCAweDRlYzc4NzQ5LCAweDA1YWVkZDNlLCAweDA4YTVkMzM3LCAweDFmYjhjMTJjLCAweDEyYjNjZjI1LCAweDMxODJlNTFhLCAweDNjODllYjEzLCAweDJiOTRmOTA4LCAweDI2OWZmNzAxLCAweGJkNDY0ZGU2LCAweGIwNGQ0M2VmLCAweGE3NTA1MWY0LCAweGFhNWI1ZmZkLCAweDg5NmE3NWMyLCAweDg0NjE3YmNiLCAweDkzN2M2OWQwLCAweDllNzc2N2Q5LCAweGQ1MWUzZGFlLCAweGQ4MTUzM2E3LCAweGNmMDgyMWJjLCAweGMyMDMyZmI1LCAweGUxMzIwNThhLCAweGVjMzkwYjgzLCAweGZiMjQxOTk4LCAweGY2MmYxNzkxLCAweGQ2OGQ3NjRkLCAweGRiODY3ODQ0LCAweGNjOWI2YTVmLCAweGMxOTA2NDU2LCAweGUyYTE0ZTY5LCAweGVmYWE0MDYwLCAweGY4Yjc1MjdiLCAweGY1YmM1YzcyLCAweGJlZDUwNjA1LCAweGIzZGUwODBjLCAweGE0YzMxYTE3LCAweGE5YzgxNDFlLCAweDhhZjkzZTIxLCAweDg3ZjIzMDI4LCAweDkwZWYyMjMzLCAweDlkZTQyYzNhLCAweDA2M2Q5NmRkLCAweDBiMzY5OGQ0LCAweDFjMmI4YWNmLCAweDExMjA4NGM2LCAweDMyMTFhZWY5LCAweDNmMWFhMGYwLCAweDI4MDdiMmViLCAweDI1MGNiY2UyLCAweDZlNjVlNjk1LCAweDYzNmVlODljLCAweDc0NzNmYTg3LCAweDc5NzhmNDhlLCAweDVhNDlkZWIxLCAweDU3NDJkMGI4LCAweDQwNWZjMmEzLCAweDRkNTRjY2FhLCAweGRhZjc0MWVjLCAweGQ3ZmM0ZmU1LCAweGMwZTE1ZGZlLCAweGNkZWE1M2Y3LCAweGVlZGI3OWM4LCAweGUzZDA3N2MxLCAweGY0Y2Q2NWRhLCAweGY5YzY2YmQzLCAweGIyYWYzMWE0LCAweGJmYTQzZmFkLCAweGE4YjkyZGI2LCAweGE1YjIyM2JmLCAweDg2ODMwOTgwLCAweDhiODgwNzg5LCAweDljOTUxNTkyLCAweDkxOWUxYjliLCAweDBhNDdhMTdjLCAweDA3NGNhZjc1LCAweDEwNTFiZDZlLCAweDFkNWFiMzY3LCAweDNlNmI5OTU4LCAweDMzNjA5NzUxLCAweDI0N2Q4NTRhLCAweDI5NzY4YjQzLCAweDYyMWZkMTM0LCAweDZmMTRkZjNkLCAweDc4MDljZDI2LCAweDc1MDJjMzJmLCAweDU2MzNlOTEwLCAweDViMzhlNzE5LCAweDRjMjVmNTAyLCAweDQxMmVmYjBiLCAweDYxOGM5YWQ3LCAweDZjODc5NGRlLCAweDdiOWE4NmM1LCAweDc2OTE4OGNjLCAweDU1YTBhMmYzLCAweDU4YWJhY2ZhLCAweDRmYjZiZWUxLCAweDQyYmRiMGU4LCAweDA5ZDRlYTlmLCAweDA0ZGZlNDk2LCAweDEzYzJmNjhkLCAweDFlYzlmODg0LCAweDNkZjhkMmJiLCAweDMwZjNkY2IyLCAweDI3ZWVjZWE5LCAweDJhZTVjMGEwLCAweGIxM2M3YTQ3LCAweGJjMzc3NDRlLCAweGFiMmE2NjU1LCAweGE2MjE2ODVjLCAweDg1MTA0MjYzLCAweDg4MWI0YzZhLCAweDlmMDY1ZTcxLCAweDkyMGQ1MDc4LCAweGQ5NjQwYTBmLCAweGQ0NmYwNDA2LCAweGMzNzIxNjFkLCAweGNlNzkxODE0LCAweGVkNDgzMjJiLCAweGUwNDMzYzIyLCAweGY3NWUyZTM5LCAweGZhNTUyMDMwLCAweGI3MDFlYzlhLCAweGJhMGFlMjkzLCAweGFkMTdmMDg4LCAweGEwMWNmZTgxLCAweDgzMmRkNGJlLCAweDhlMjZkYWI3LCAweDk5M2JjOGFjLCAweDk0MzBjNmE1LCAweGRmNTk5Y2QyLCAweGQyNTI5MmRiLCAweGM1NGY4MGMwLCAweGM4NDQ4ZWM5LCAweGViNzVhNGY2LCAweGU2N2VhYWZmLCAweGYxNjNiOGU0LCAweGZjNjhiNmVkLCAweDY3YjEwYzBhLCAweDZhYmEwMjAzLCAweDdkYTcxMDE4LCAweDcwYWMxZTExLCAweDUzOWQzNDJlLCAweDVlOTYzYTI3LCAweDQ5OGIyODNjLCAweDQ0ODAyNjM1LCAweDBmZTk3YzQyLCAweDAyZTI3MjRiLCAweDE1ZmY2MDUwLCAweDE4ZjQ2ZTU5LCAweDNiYzU0NDY2LCAweDM2Y2U0YTZmLCAweDIxZDM1ODc0LCAweDJjZDg1NjdkLCAweDBjN2EzN2ExLCAweDAxNzEzOWE4LCAweDE2NmMyYmIzLCAweDFiNjcyNWJhLCAweDM4NTYwZjg1LCAweDM1NWQwMThjLCAweDIyNDAxMzk3LCAweDJmNGIxZDllLCAweDY0MjI0N2U5LCAweDY5Mjk0OWUwLCAweDdlMzQ1YmZiLCAweDczM2Y1NWYyLCAweDUwMGU3ZmNkLCAweDVkMDU3MWM0LCAweDRhMTg2M2RmLCAweDQ3MTM2ZGQ2LCAweGRjY2FkNzMxLCAweGQxYzFkOTM4LCAweGM2ZGNjYjIzLCAweGNiZDdjNTJhLCAweGU4ZTZlZjE1LCAweGU1ZWRlMTFjLCAweGYyZjBmMzA3LCAweGZmZmJmZDBlLCAweGI0OTJhNzc5LCAweGI5OTlhOTcwLCAweGFlODRiYjZiLCAweGEzOGZiNTYyLCAweDgwYmU5ZjVkLCAweDhkYjU5MTU0LCAweDlhYTg4MzRmLCAweDk3YTM4ZDQ2XTtcbiAgICB2YXIgVTQgPSBbMHgwMDAwMDAwMCwgMHgwOTBkMGIwZSwgMHgxMjFhMTYxYywgMHgxYjE3MWQxMiwgMHgyNDM0MmMzOCwgMHgyZDM5MjczNiwgMHgzNjJlM2EyNCwgMHgzZjIzMzEyYSwgMHg0ODY4NTg3MCwgMHg0MTY1NTM3ZSwgMHg1YTcyNGU2YywgMHg1MzdmNDU2MiwgMHg2YzVjNzQ0OCwgMHg2NTUxN2Y0NiwgMHg3ZTQ2NjI1NCwgMHg3NzRiNjk1YSwgMHg5MGQwYjBlMCwgMHg5OWRkYmJlZSwgMHg4MmNhYTZmYywgMHg4YmM3YWRmMiwgMHhiNGU0OWNkOCwgMHhiZGU5OTdkNiwgMHhhNmZlOGFjNCwgMHhhZmYzODFjYSwgMHhkOGI4ZTg5MCwgMHhkMWI1ZTM5ZSwgMHhjYWEyZmU4YywgMHhjM2FmZjU4MiwgMHhmYzhjYzRhOCwgMHhmNTgxY2ZhNiwgMHhlZTk2ZDJiNCwgMHhlNzliZDliYSwgMHgzYmJiN2JkYiwgMHgzMmI2NzBkNSwgMHgyOWExNmRjNywgMHgyMGFjNjZjOSwgMHgxZjhmNTdlMywgMHgxNjgyNWNlZCwgMHgwZDk1NDFmZiwgMHgwNDk4NGFmMSwgMHg3M2QzMjNhYiwgMHg3YWRlMjhhNSwgMHg2MWM5MzViNywgMHg2OGM0M2ViOSwgMHg1N2U3MGY5MywgMHg1ZWVhMDQ5ZCwgMHg0NWZkMTk4ZiwgMHg0Y2YwMTI4MSwgMHhhYjZiY2IzYiwgMHhhMjY2YzAzNSwgMHhiOTcxZGQyNywgMHhiMDdjZDYyOSwgMHg4ZjVmZTcwMywgMHg4NjUyZWMwZCwgMHg5ZDQ1ZjExZiwgMHg5NDQ4ZmExMSwgMHhlMzAzOTM0YiwgMHhlYTBlOTg0NSwgMHhmMTE5ODU1NywgMHhmODE0OGU1OSwgMHhjNzM3YmY3MywgMHhjZTNhYjQ3ZCwgMHhkNTJkYTk2ZiwgMHhkYzIwYTI2MSwgMHg3NjZkZjZhZCwgMHg3ZjYwZmRhMywgMHg2NDc3ZTBiMSwgMHg2ZDdhZWJiZiwgMHg1MjU5ZGE5NSwgMHg1YjU0ZDE5YiwgMHg0MDQzY2M4OSwgMHg0OTRlYzc4NywgMHgzZTA1YWVkZCwgMHgzNzA4YTVkMywgMHgyYzFmYjhjMSwgMHgyNTEyYjNjZiwgMHgxYTMxODJlNSwgMHgxMzNjODllYiwgMHgwODJiOTRmOSwgMHgwMTI2OWZmNywgMHhlNmJkNDY0ZCwgMHhlZmIwNGQ0MywgMHhmNGE3NTA1MSwgMHhmZGFhNWI1ZiwgMHhjMjg5NmE3NSwgMHhjYjg0NjE3YiwgMHhkMDkzN2M2OSwgMHhkOTllNzc2NywgMHhhZWQ1MWUzZCwgMHhhN2Q4MTUzMywgMHhiY2NmMDgyMSwgMHhiNWMyMDMyZiwgMHg4YWUxMzIwNSwgMHg4M2VjMzkwYiwgMHg5OGZiMjQxOSwgMHg5MWY2MmYxNywgMHg0ZGQ2OGQ3NiwgMHg0NGRiODY3OCwgMHg1ZmNjOWI2YSwgMHg1NmMxOTA2NCwgMHg2OWUyYTE0ZSwgMHg2MGVmYWE0MCwgMHg3YmY4Yjc1MiwgMHg3MmY1YmM1YywgMHgwNWJlZDUwNiwgMHgwY2IzZGUwOCwgMHgxN2E0YzMxYSwgMHgxZWE5YzgxNCwgMHgyMThhZjkzZSwgMHgyODg3ZjIzMCwgMHgzMzkwZWYyMiwgMHgzYTlkZTQyYywgMHhkZDA2M2Q5NiwgMHhkNDBiMzY5OCwgMHhjZjFjMmI4YSwgMHhjNjExMjA4NCwgMHhmOTMyMTFhZSwgMHhmMDNmMWFhMCwgMHhlYjI4MDdiMiwgMHhlMjI1MGNiYywgMHg5NTZlNjVlNiwgMHg5YzYzNmVlOCwgMHg4Nzc0NzNmYSwgMHg4ZTc5NzhmNCwgMHhiMTVhNDlkZSwgMHhiODU3NDJkMCwgMHhhMzQwNWZjMiwgMHhhYTRkNTRjYywgMHhlY2RhZjc0MSwgMHhlNWQ3ZmM0ZiwgMHhmZWMwZTE1ZCwgMHhmN2NkZWE1MywgMHhjOGVlZGI3OSwgMHhjMWUzZDA3NywgMHhkYWY0Y2Q2NSwgMHhkM2Y5YzY2YiwgMHhhNGIyYWYzMSwgMHhhZGJmYTQzZiwgMHhiNmE4YjkyZCwgMHhiZmE1YjIyMywgMHg4MDg2ODMwOSwgMHg4OThiODgwNywgMHg5MjljOTUxNSwgMHg5YjkxOWUxYiwgMHg3YzBhNDdhMSwgMHg3NTA3NGNhZiwgMHg2ZTEwNTFiZCwgMHg2NzFkNWFiMywgMHg1ODNlNmI5OSwgMHg1MTMzNjA5NywgMHg0YTI0N2Q4NSwgMHg0MzI5NzY4YiwgMHgzNDYyMWZkMSwgMHgzZDZmMTRkZiwgMHgyNjc4MDljZCwgMHgyZjc1MDJjMywgMHgxMDU2MzNlOSwgMHgxOTViMzhlNywgMHgwMjRjMjVmNSwgMHgwYjQxMmVmYiwgMHhkNzYxOGM5YSwgMHhkZTZjODc5NCwgMHhjNTdiOWE4NiwgMHhjYzc2OTE4OCwgMHhmMzU1YTBhMiwgMHhmYTU4YWJhYywgMHhlMTRmYjZiZSwgMHhlODQyYmRiMCwgMHg5ZjA5ZDRlYSwgMHg5NjA0ZGZlNCwgMHg4ZDEzYzJmNiwgMHg4NDFlYzlmOCwgMHhiYjNkZjhkMiwgMHhiMjMwZjNkYywgMHhhOTI3ZWVjZSwgMHhhMDJhZTVjMCwgMHg0N2IxM2M3YSwgMHg0ZWJjMzc3NCwgMHg1NWFiMmE2NiwgMHg1Y2E2MjE2OCwgMHg2Mzg1MTA0MiwgMHg2YTg4MWI0YywgMHg3MTlmMDY1ZSwgMHg3ODkyMGQ1MCwgMHgwZmQ5NjQwYSwgMHgwNmQ0NmYwNCwgMHgxZGMzNzIxNiwgMHgxNGNlNzkxOCwgMHgyYmVkNDgzMiwgMHgyMmUwNDMzYywgMHgzOWY3NWUyZSwgMHgzMGZhNTUyMCwgMHg5YWI3MDFlYywgMHg5M2JhMGFlMiwgMHg4OGFkMTdmMCwgMHg4MWEwMWNmZSwgMHhiZTgzMmRkNCwgMHhiNzhlMjZkYSwgMHhhYzk5M2JjOCwgMHhhNTk0MzBjNiwgMHhkMmRmNTk5YywgMHhkYmQyNTI5MiwgMHhjMGM1NGY4MCwgMHhjOWM4NDQ4ZSwgMHhmNmViNzVhNCwgMHhmZmU2N2VhYSwgMHhlNGYxNjNiOCwgMHhlZGZjNjhiNiwgMHgwYTY3YjEwYywgMHgwMzZhYmEwMiwgMHgxODdkYTcxMCwgMHgxMTcwYWMxZSwgMHgyZTUzOWQzNCwgMHgyNzVlOTYzYSwgMHgzYzQ5OGIyOCwgMHgzNTQ0ODAyNiwgMHg0MjBmZTk3YywgMHg0YjAyZTI3MiwgMHg1MDE1ZmY2MCwgMHg1OTE4ZjQ2ZSwgMHg2NjNiYzU0NCwgMHg2ZjM2Y2U0YSwgMHg3NDIxZDM1OCwgMHg3ZDJjZDg1NiwgMHhhMTBjN2EzNywgMHhhODAxNzEzOSwgMHhiMzE2NmMyYiwgMHhiYTFiNjcyNSwgMHg4NTM4NTYwZiwgMHg4YzM1NWQwMSwgMHg5NzIyNDAxMywgMHg5ZTJmNGIxZCwgMHhlOTY0MjI0NywgMHhlMDY5Mjk0OSwgMHhmYjdlMzQ1YiwgMHhmMjczM2Y1NSwgMHhjZDUwMGU3ZiwgMHhjNDVkMDU3MSwgMHhkZjRhMTg2MywgMHhkNjQ3MTM2ZCwgMHgzMWRjY2FkNywgMHgzOGQxYzFkOSwgMHgyM2M2ZGNjYiwgMHgyYWNiZDdjNSwgMHgxNWU4ZTZlZiwgMHgxY2U1ZWRlMSwgMHgwN2YyZjBmMywgMHgwZWZmZmJmZCwgMHg3OWI0OTJhNywgMHg3MGI5OTlhOSwgMHg2YmFlODRiYiwgMHg2MmEzOGZiNSwgMHg1ZDgwYmU5ZiwgMHg1NDhkYjU5MSwgMHg0ZjlhYTg4MywgMHg0Njk3YTM4ZF07XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9JbnQzMihieXRlcykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIChieXRlc1tpICAgIF0gPDwgMjQpIHxcbiAgICAgICAgICAgICAgICAoYnl0ZXNbaSArIDFdIDw8IDE2KSB8XG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgKyAyXSA8PCAgOCkgfFxuICAgICAgICAgICAgICAgICBieXRlc1tpICsgM11cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgQUVTID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBBRVMpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAna2V5Jywge1xuICAgICAgICAgICAgdmFsdWU6IGNvZXJjZUFycmF5KGtleSwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fcHJlcGFyZSgpO1xuICAgIH1cblxuXG4gICAgQUVTLnByb3RvdHlwZS5fcHJlcGFyZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciByb3VuZHMgPSBudW1iZXJPZlJvdW5kc1t0aGlzLmtleS5sZW5ndGhdO1xuICAgICAgICBpZiAocm91bmRzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBrZXkgc2l6ZSAobXVzdCBiZSAxNiwgMjQgb3IgMzIgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmNyeXB0aW9uIHJvdW5kIGtleXNcbiAgICAgICAgdGhpcy5fS2UgPSBbXTtcblxuICAgICAgICAvLyBkZWNyeXB0aW9uIHJvdW5kIGtleXNcbiAgICAgICAgdGhpcy5fS2QgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSByb3VuZHM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fS2UucHVzaChbMCwgMCwgMCwgMF0pO1xuICAgICAgICAgICAgdGhpcy5fS2QucHVzaChbMCwgMCwgMCwgMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdW5kS2V5Q291bnQgPSAocm91bmRzICsgMSkgKiA0O1xuICAgICAgICB2YXIgS0MgPSB0aGlzLmtleS5sZW5ndGggLyA0O1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIGtleSBpbnRvIGludHNcbiAgICAgICAgdmFyIHRrID0gY29udmVydFRvSW50MzIodGhpcy5rZXkpO1xuXG4gICAgICAgIC8vIGNvcHkgdmFsdWVzIGludG8gcm91bmQga2V5IGFycmF5c1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgaW5kZXggPSBpID4+IDI7XG4gICAgICAgICAgICB0aGlzLl9LZVtpbmRleF1baSAlIDRdID0gdGtbaV07XG4gICAgICAgICAgICB0aGlzLl9LZFtyb3VuZHMgLSBpbmRleF1baSAlIDRdID0gdGtbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIChmaXBzLTE5NyBzZWN0aW9uIDUuMilcbiAgICAgICAgdmFyIHJjb25wb2ludGVyID0gMDtcbiAgICAgICAgdmFyIHQgPSBLQywgdHQ7XG4gICAgICAgIHdoaWxlICh0IDwgcm91bmRLZXlDb3VudCkge1xuICAgICAgICAgICAgdHQgPSB0a1tLQyAtIDFdO1xuICAgICAgICAgICAgdGtbMF0gXj0gKChTWyh0dCA+PiAxNikgJiAweEZGXSA8PCAyNCkgXlxuICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAgOCkgJiAweEZGXSA8PCAxNikgXlxuICAgICAgICAgICAgICAgICAgICAgIChTWyB0dCAgICAgICAgJiAweEZGXSA8PCAgOCkgXlxuICAgICAgICAgICAgICAgICAgICAgICBTWyh0dCA+PiAyNCkgJiAweEZGXSAgICAgICAgXlxuICAgICAgICAgICAgICAgICAgICAgIChyY29uW3Jjb25wb2ludGVyXSA8PCAyNCkpO1xuICAgICAgICAgICAgcmNvbnBvaW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgLy8ga2V5IGV4cGFuc2lvbiAoZm9yIG5vbi0yNTYgYml0KVxuICAgICAgICAgICAgaWYgKEtDICE9IDgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IEtDOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8ga2V5IGV4cGFuc2lvbiBmb3IgMjU2LWJpdCBrZXlzIGlzIFwic2xpZ2h0bHkgZGlmZmVyZW50XCIgKGZpcHMtMTk3KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IChLQyAvIDIpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dCA9IHRrWyhLQyAvIDIpIC0gMV07XG5cbiAgICAgICAgICAgICAgICB0a1tLQyAvIDJdIF49IChTWyB0dCAgICAgICAgJiAweEZGXSAgICAgICAgXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+ICA4KSAmIDB4RkZdIDw8ICA4KSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gMTYpICYgMHhGRl0gPDwgMTYpIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAyNCkgJiAweEZGXSA8PCAyNCkpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IChLQyAvIDIpICsgMTsgaSA8IEtDOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29weSB2YWx1ZXMgaW50byByb3VuZCBrZXkgYXJyYXlzXG4gICAgICAgICAgICB2YXIgaSA9IDAsIHIsIGM7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IEtDICYmIHQgPCByb3VuZEtleUNvdW50KSB7XG4gICAgICAgICAgICAgICAgciA9IHQgPj4gMjtcbiAgICAgICAgICAgICAgICBjID0gdCAlIDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fS2Vbcl1bY10gPSB0a1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZFtyb3VuZHMgLSByXVtjXSA9IHRrW2krK107XG4gICAgICAgICAgICAgICAgdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW52ZXJzZS1jaXBoZXItaWZ5IHRoZSBkZWNyeXB0aW9uIHJvdW5kIGtleSAoZmlwcy0xOTcgc2VjdGlvbiA1LjMpXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgNDsgYysrKSB7XG4gICAgICAgICAgICAgICAgdHQgPSB0aGlzLl9LZFtyXVtjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZFtyXVtjXSA9IChVMVsodHQgPj4gMjQpICYgMHhGRl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFUyWyh0dCA+PiAxNikgJiAweEZGXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVTNbKHR0ID4+ICA4KSAmIDB4RkZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVNFsgdHQgICAgICAgICYgMHhGRl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQUVTLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIGlmIChwbGFpbnRleHQubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRzID0gdGhpcy5fS2UubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGEgPSBbMCwgMCwgMCwgMF07XG5cbiAgICAgICAgLy8gY29udmVydCBwbGFpbnRleHQgdG8gKGludHMgXiBrZXkpXG4gICAgICAgIHZhciB0ID0gY29udmVydFRvSW50MzIocGxhaW50ZXh0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHRbaV0gXj0gdGhpcy5fS2VbMF1baV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSByb3VuZCB0cmFuc2Zvcm1zXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IChUMVsodFsgaSAgICAgICAgIF0gPj4gMjQpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDJbKHRbKGkgKyAxKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQzWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUNFsgdFsoaSArIDMpICUgNF0gICAgICAgICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fS2Vbcl1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IGEuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBsYXN0IHJvdW5kIGlzIHNwZWNpYWxcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KDE2KSwgdHQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0dCA9IHRoaXMuX0tlW3JvdW5kc11baV07XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgICAgXSA9IChTWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeICh0dCA+PiAyNCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDFdID0gKFNbKHRbKGkgKyAxKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF4gKHR0ID4+IDE2KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMl0gPSAoU1sodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXiAodHQgPj4gIDgpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAzXSA9IChTWyB0WyhpICsgMykgJSA0XSAgICAgICAgJiAweGZmXSBeICB0dCAgICAgICApICYgMHhmZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgQUVTLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBpZiAoY2lwaGVydGV4dC5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRzID0gdGhpcy5fS2QubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGEgPSBbMCwgMCwgMCwgMF07XG5cbiAgICAgICAgLy8gY29udmVydCBwbGFpbnRleHQgdG8gKGludHMgXiBrZXkpXG4gICAgICAgIHZhciB0ID0gY29udmVydFRvSW50MzIoY2lwaGVydGV4dCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0W2ldIF49IHRoaXMuX0tkWzBdW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgcm91bmQgdHJhbnNmb3Jtc1xuICAgICAgICBmb3IgKHZhciByID0gMTsgciA8IHJvdW5kczsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGFbaV0gPSAoVDVbKHRbIGkgICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUNlsodFsoaSArIDMpICUgNF0gPj4gMTYpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDdbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ4WyB0WyhpICsgMSkgJSA0XSAgICAgICAgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9LZFtyXVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gYS5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGxhc3Qgcm91bmQgaXMgc3BlY2lhbFxuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkoMTYpLCB0dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHR0ID0gdGhpcy5fS2Rbcm91bmRzXVtpXTtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSAgICBdID0gKFNpWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeICh0dCA+PiAyNCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDFdID0gKFNpWyh0WyhpICsgMykgJSA0XSA+PiAxNikgJiAweGZmXSBeICh0dCA+PiAxNikpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDJdID0gKFNpWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeICh0dCA+PiAgOCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDNdID0gKFNpWyB0WyhpICsgMSkgJSA0XSAgICAgICAgJiAweGZmXSBeICB0dCAgICAgICApICYgMHhmZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBFbGVjdG9uaWMgQ29kZWJvb2sgKEVDQilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uRUNCID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25FQ0IpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkVsZWN0cm9uaWMgQ29kZSBCbG9ja1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImVjYlwiO1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25FQ0IucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkocGxhaW50ZXh0KTtcblxuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gY3JlYXRlQXJyYXkocGxhaW50ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShwbGFpbnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9hZXMuZW5jcnlwdChibG9jayk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoYmxvY2ssIGNpcGhlcnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uRUNCLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBjaXBoZXJ0ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCk7XG5cbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFpbnRleHQgPSBjcmVhdGVBcnJheShjaXBoZXJ0ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNpcGhlcnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5kZWNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShibG9jaywgcGxhaW50ZXh0LCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDaXBoZXIgQmxvY2sgQ2hhaW5pbmcgKENCQylcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uQ0JDID0gZnVuY3Rpb24oa2V5LCBpdikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ0JDKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDaXBoZXIgQmxvY2sgQ2hhaW5pbmdcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJjYmNcIjtcblxuICAgICAgICBpZiAoIWl2KSB7XG4gICAgICAgICAgICBpdiA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGl2Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluaXRpYWxhdGlvbiB2ZWN0b3Igc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RDaXBoZXJibG9jayA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0JDLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHBsYWludGV4dCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCk7XG5cbiAgICAgICAgaWYgKChwbGFpbnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGNyZWF0ZUFycmF5KHBsYWludGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFpbnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkocGxhaW50ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tbal0gXj0gdGhpcy5fbGFzdENpcGhlcmJsb2NrW2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2lwaGVyYmxvY2sgPSB0aGlzLl9hZXMuZW5jcnlwdChibG9jayk7XG4gICAgICAgICAgICBjb3B5QXJyYXkodGhpcy5fbGFzdENpcGhlcmJsb2NrLCBjaXBoZXJ0ZXh0LCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNCQy5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgY2lwaGVydGV4dCA9IGNvZXJjZUFycmF5KGNpcGhlcnRleHQpO1xuXG4gICAgICAgIGlmICgoY2lwaGVydGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY3JlYXRlQXJyYXkoY2lwaGVydGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaXBoZXJ0ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9hZXMuZGVjcnlwdChibG9jayk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7IGorKykge1xuICAgICAgICAgICAgICAgIHBsYWludGV4dFtpICsgal0gPSBibG9ja1tqXSBeIHRoaXMuX2xhc3RDaXBoZXJibG9ja1tqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIHRoaXMuX2xhc3RDaXBoZXJibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDaXBoZXIgRmVlZGJhY2sgKENGQilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uQ0ZCID0gZnVuY3Rpb24oa2V5LCBpdiwgc2VnbWVudFNpemUpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkNGQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiQ2lwaGVyIEZlZWRiYWNrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY2ZiXCI7XG5cbiAgICAgICAgaWYgKCFpdikge1xuICAgICAgICAgICAgaXYgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpdi5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbml0aWFsYXRpb24gdmVjdG9yIHNpemUgKG11c3QgYmUgMTYgc2l6ZSknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VnbWVudFNpemUpIHsgc2VnbWVudFNpemUgPSAxOyB9XG5cbiAgICAgICAgdGhpcy5zZWdtZW50U2l6ZSA9IHNlZ21lbnRTaXplO1xuXG4gICAgICAgIHRoaXMuX3NoaWZ0UmVnaXN0ZXIgPSBjb2VyY2VBcnJheShpdiwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNGQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSB0aGlzLnNlZ21lbnRTaXplKSAhPSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgc2VnbWVudFNpemUgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICB2YXIgeG9yU2VnbWVudDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNyeXB0ZWQubGVuZ3RoOyBpICs9IHRoaXMuc2VnbWVudFNpemUpIHtcbiAgICAgICAgICAgIHhvclNlZ21lbnQgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9zaGlmdFJlZ2lzdGVyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zZWdtZW50U2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgZW5jcnlwdGVkW2kgKyBqXSBePSB4b3JTZWdtZW50W2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTaGlmdCB0aGUgcmVnaXN0ZXJcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9zaGlmdFJlZ2lzdGVyLCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAwLCB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShlbmNyeXB0ZWQsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDE2IC0gdGhpcy5zZWdtZW50U2l6ZSwgaSwgaSArIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DRkIucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGlmICgoY2lwaGVydGV4dC5sZW5ndGggJSB0aGlzLnNlZ21lbnRTaXplKSAhPSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIHNlZ21lbnRTaXplIGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYWludGV4dCA9IGNvZXJjZUFycmF5KGNpcGhlcnRleHQsIHRydWUpO1xuXG4gICAgICAgIHZhciB4b3JTZWdtZW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gdGhpcy5zZWdtZW50U2l6ZSkge1xuICAgICAgICAgICAgeG9yU2VnbWVudCA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX3NoaWZ0UmVnaXN0ZXIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2VnbWVudFNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIHBsYWludGV4dFtpICsgal0gXj0geG9yU2VnbWVudFtqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2hpZnQgdGhlIHJlZ2lzdGVyXG4gICAgICAgICAgICBjb3B5QXJyYXkodGhpcy5fc2hpZnRSZWdpc3RlciwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMCwgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMTYgLSB0aGlzLnNlZ21lbnRTaXplLCBpLCBpICsgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIE91dHB1dCBGZWVkYmFjayAoT0ZCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25PRkIgPSBmdW5jdGlvbihrZXksIGl2KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25PRkIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIk91dHB1dCBGZWVkYmFja1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIm9mYlwiO1xuXG4gICAgICAgIGlmICghaXYpIHtcbiAgICAgICAgICAgIGl2ID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXYubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5pdGlhbGF0aW9uIHZlY3RvciBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlciA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID0gMTY7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVyID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fbGFzdFByZWNpcGhlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuY3J5cHRlZFtpXSBePSB0aGlzLl9sYXN0UHJlY2lwaGVyW3RoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWQ7XG4gICAgfVxuXG4gICAgLy8gRGVjcnlwdGlvbiBpcyBzeW1ldHJpY1xuICAgIE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZGVjcnlwdCA9IE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZW5jcnlwdDtcblxuXG4gICAgLyoqXG4gICAgICogIENvdW50ZXIgb2JqZWN0IGZvciBDVFIgY29tbW9uIG1vZGUgb2Ygb3BlcmF0aW9uXG4gICAgICovXG4gICAgdmFyIENvdW50ZXIgPSBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvdW50ZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ291bnRlciBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBhbGxvdyAwLCBidXQgYW55dGhpbmcgZmFsc2UtaXNoIHVzZXMgdGhlIGRlZmF1bHQgMVxuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlICE9PSAwICYmICFpbml0aWFsVmFsdWUpIHsgaW5pdGlhbFZhbHVlID0gMTsgfVxuXG4gICAgICAgIGlmICh0eXBlb2YoaW5pdGlhbFZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIgPSBjcmVhdGVBcnJheSgxNik7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGluaXRpYWxWYWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Qnl0ZXMoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvdW50ZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZih2YWx1ZSkgIT09ICdudW1iZXInIHx8IHBhcnNlSW50KHZhbHVlKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNvdW50ZXIgdmFsdWUgKG11c3QgYmUgYW4gaW50ZWdlciknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGNhbm5vdCBzYWZlbHkgaGFuZGxlIG51bWJlcnMgYmV5b25kIHRoZSBzYWZlIHJhbmdlIGZvciBpbnRlZ2Vyc1xuICAgICAgICBpZiAodmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnRlZ2VyIHZhbHVlIG91dCBvZiBzYWZlIHJhbmdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE1OyBpbmRleCA+PSAwOyAtLWluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudGVyW2luZGV4XSA9IHZhbHVlICUgMjU2O1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSAvIDI1Nik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb3VudGVyLnByb3RvdHlwZS5zZXRCeXRlcyA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICAgIGJ5dGVzID0gY29lcmNlQXJyYXkoYnl0ZXMsIHRydWUpO1xuXG4gICAgICAgIGlmIChieXRlcy5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjb3VudGVyIGJ5dGVzIHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb3VudGVyID0gYnl0ZXM7XG4gICAgfTtcblxuICAgIENvdW50ZXIucHJvdG90eXBlLmluY3JlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTU7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY291bnRlcltpXSA9PT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcltpXSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXJbaV0rKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gQ291bnRlciAoQ1RSKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DVFIgPSBmdW5jdGlvbihrZXksIGNvdW50ZXIpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkNUUikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiQ291bnRlclwiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImN0clwiO1xuXG4gICAgICAgIGlmICghKGNvdW50ZXIgaW5zdGFuY2VvZiBDb3VudGVyKSkge1xuICAgICAgICAgICAgY291bnRlciA9IG5ldyBDb3VudGVyKGNvdW50ZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb3VudGVyID0gY291bnRlcjtcblxuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID0gMTY7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNUUi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJJbmRleCA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVyID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fY291bnRlci5fY291bnRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyLmluY3JlbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5jcnlwdGVkW2ldIF49IHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJbdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyBEZWNyeXB0aW9uIGlzIHN5bWV0cmljXG4gICAgTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5kZWNyeXB0ID0gTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5lbmNyeXB0O1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIFBhZGRpbmdcblxuICAgIC8vIFNlZTpodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjMxNVxuICAgIGZ1bmN0aW9uIHBrY3M3cGFkKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGNvZXJjZUFycmF5KGRhdGEsIHRydWUpO1xuICAgICAgICB2YXIgcGFkZGVyID0gMTYgLSAoZGF0YS5sZW5ndGggJSAxNik7XG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheShkYXRhLmxlbmd0aCArIHBhZGRlcik7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCByZXN1bHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5sZW5ndGg7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IHBhZGRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBrY3M3c3RyaXAoZGF0YSkge1xuICAgICAgICBkYXRhID0gY29lcmNlQXJyYXkoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDE2KSB7IHRocm93IG5ldyBFcnJvcignUEtDUyM3IGludmFsaWQgbGVuZ3RoJyk7IH1cblxuICAgICAgICB2YXIgcGFkZGVyID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAocGFkZGVyID4gMTYpIHsgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgcGFkZGluZyBieXRlIG91dCBvZiByYW5nZScpOyB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIC0gcGFkZGVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZGRlcjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtsZW5ndGggKyBpXSAhPT0gcGFkZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgaW52YWxpZCBwYWRkaW5nIGJ5dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheShsZW5ndGgpO1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgcmVzdWx0LCAwLCAwLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRXhwb3J0aW5nXG5cblxuICAgIC8vIFRoZSBibG9jayBjaXBoZXJcbiAgICB2YXIgYWVzanMgPSB7XG4gICAgICAgIEFFUzogQUVTLFxuICAgICAgICBDb3VudGVyOiBDb3VudGVyLFxuXG4gICAgICAgIE1vZGVPZk9wZXJhdGlvbjoge1xuICAgICAgICAgICAgZWNiOiBNb2RlT2ZPcGVyYXRpb25FQ0IsXG4gICAgICAgICAgICBjYmM6IE1vZGVPZk9wZXJhdGlvbkNCQyxcbiAgICAgICAgICAgIGNmYjogTW9kZU9mT3BlcmF0aW9uQ0ZCLFxuICAgICAgICAgICAgb2ZiOiBNb2RlT2ZPcGVyYXRpb25PRkIsXG4gICAgICAgICAgICBjdHI6IE1vZGVPZk9wZXJhdGlvbkNUUlxuICAgICAgICB9LFxuXG4gICAgICAgIHV0aWxzOiB7XG4gICAgICAgICAgICBoZXg6IGNvbnZlcnRIZXgsXG4gICAgICAgICAgICB1dGY4OiBjb252ZXJ0VXRmOFxuICAgICAgICB9LFxuXG4gICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICAgIHBrY3M3OiB7XG4gICAgICAgICAgICAgICAgcGFkOiBwa2NzN3BhZCxcbiAgICAgICAgICAgICAgICBzdHJpcDogcGtjczdzdHJpcFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9hcnJheVRlc3Q6IHtcbiAgICAgICAgICAgIGNvZXJjZUFycmF5OiBjb2VyY2VBcnJheSxcbiAgICAgICAgICAgIGNyZWF0ZUFycmF5OiBjcmVhdGVBcnJheSxcbiAgICAgICAgICAgIGNvcHlBcnJheTogY29weUFycmF5LFxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLy8gbm9kZS5qc1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhZXNqc1xuXG4gICAgLy8gUmVxdWlyZUpTL0FNRFxuICAgIC8vIGh0dHA6Ly93d3cucmVxdWlyZWpzLm9yZy9kb2NzL2FwaS5odG1sXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FtZGpzL2FtZGpzLWFwaS93aWtpL0FNRFxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGRlZmluZSkgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoYWVzanMpO1xuXG4gICAgLy8gV2ViIEJyb3dzZXJzXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgbGlicmFyeSBhdCBcImFlc2pzXCIgbWFrZSBzdXJlIGl0J3Mgc3RpbGwgYXZhaWxhYmxlXG4gICAgICAgIGlmIChyb290LmFlc2pzKSB7XG4gICAgICAgICAgICBhZXNqcy5fYWVzanMgPSByb290LmFlc2pzO1xuICAgICAgICB9XG5cbiAgICAgICAgcm9vdC5hZXNqcyA9IGFlc2pzO1xuICAgIH1cblxuXG59KSh0aGlzKTtcbiIsIi8qXG4gQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTSEEgZmFtaWx5IG9mIGhhc2hlcywgYXNcbiBkZWZpbmVkIGluIEZJUFMgUFVCIDE4MC00IGFuZCBGSVBTIFBVQiAyMDIsIGFzIHdlbGwgYXMgdGhlIGNvcnJlc3BvbmRpbmdcbiBITUFDIGltcGxlbWVudGF0aW9uIGFzIGRlZmluZWQgaW4gRklQUyBQVUIgMTk4YVxuXG4gQ29weXJpZ2h0IEJyaWFuIFR1cmVrIDIwMDgtMjAxN1xuIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuIFNlZSBodHRwOi8vY2FsaWdhdGlvLmdpdGh1Yi5jb20vanNTSEEvIGZvciBtb3JlIGluZm9ybWF0aW9uXG5cbiBTZXZlcmFsIGZ1bmN0aW9ucyB0YWtlbiBmcm9tIFBhdWwgSm9obnN0b25cbiovXG4ndXNlIHN0cmljdCc7KGZ1bmN0aW9uKFkpe2Z1bmN0aW9uIEMoYyxhLGIpe3ZhciBlPTAsaD1bXSxuPTAsZyxsLGQsZixtLHEsdSxyLEk9ITEsdj1bXSx3PVtdLHQseT0hMSx6PSExLHg9LTE7Yj1ifHx7fTtnPWIuZW5jb2Rpbmd8fFwiVVRGOFwiO3Q9Yi5udW1Sb3VuZHN8fDE7aWYodCE9PXBhcnNlSW50KHQsMTApfHwxPnQpdGhyb3cgRXJyb3IoXCJudW1Sb3VuZHMgbXVzdCBhIGludGVnZXIgPj0gMVwiKTtpZihcIlNIQS0xXCI9PT1jKW09NTEyLHE9Syx1PVosZj0xNjAscj1mdW5jdGlvbihhKXtyZXR1cm4gYS5zbGljZSgpfTtlbHNlIGlmKDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBLVwiLDApKWlmKHE9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gTChhLGIsYyl9LHU9ZnVuY3Rpb24oYSxiLGgsZSl7dmFyIGssZjtpZihcIlNIQS0yMjRcIj09PWN8fFwiU0hBLTI1NlwiPT09YylrPShiKzY1Pj4+OTw8NCkrMTUsZj0xNjtlbHNlIGlmKFwiU0hBLTM4NFwiPT09Y3x8XCJTSEEtNTEyXCI9PT1jKWs9KGIrMTI5Pj4+MTA8PFxuNSkrMzEsZj0zMjtlbHNlIHRocm93IEVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBTSEEtMiBpbXBsZW1lbnRhdGlvblwiKTtmb3IoO2EubGVuZ3RoPD1rOylhLnB1c2goMCk7YVtiPj4+NV18PTEyODw8MjQtYiUzMjtiPWIraDthW2tdPWImNDI5NDk2NzI5NTthW2stMV09Yi80Mjk0OTY3Mjk2fDA7aD1hLmxlbmd0aDtmb3IoYj0wO2I8aDtiKz1mKWU9TChhLnNsaWNlKGIsYitmKSxlLGMpO2lmKFwiU0hBLTIyNFwiPT09YylhPVtlWzBdLGVbMV0sZVsyXSxlWzNdLGVbNF0sZVs1XSxlWzZdXTtlbHNlIGlmKFwiU0hBLTI1NlwiPT09YylhPWU7ZWxzZSBpZihcIlNIQS0zODRcIj09PWMpYT1bZVswXS5hLGVbMF0uYixlWzFdLmEsZVsxXS5iLGVbMl0uYSxlWzJdLmIsZVszXS5hLGVbM10uYixlWzRdLmEsZVs0XS5iLGVbNV0uYSxlWzVdLmJdO2Vsc2UgaWYoXCJTSEEtNTEyXCI9PT1jKWE9W2VbMF0uYSxlWzBdLmIsZVsxXS5hLGVbMV0uYixlWzJdLmEsZVsyXS5iLGVbM10uYSxlWzNdLmIsZVs0XS5hLFxuZVs0XS5iLGVbNV0uYSxlWzVdLmIsZVs2XS5hLGVbNl0uYixlWzddLmEsZVs3XS5iXTtlbHNlIHRocm93IEVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBTSEEtMiBpbXBsZW1lbnRhdGlvblwiKTtyZXR1cm4gYX0scj1mdW5jdGlvbihhKXtyZXR1cm4gYS5zbGljZSgpfSxcIlNIQS0yMjRcIj09PWMpbT01MTIsZj0yMjQ7ZWxzZSBpZihcIlNIQS0yNTZcIj09PWMpbT01MTIsZj0yNTY7ZWxzZSBpZihcIlNIQS0zODRcIj09PWMpbT0xMDI0LGY9Mzg0O2Vsc2UgaWYoXCJTSEEtNTEyXCI9PT1jKW09MTAyNCxmPTUxMjtlbHNlIHRocm93IEVycm9yKFwiQ2hvc2VuIFNIQSB2YXJpYW50IGlzIG5vdCBzdXBwb3J0ZWRcIik7ZWxzZSBpZigwPT09Yy5sYXN0SW5kZXhPZihcIlNIQTMtXCIsMCl8fDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBS0VcIiwwKSl7dmFyIEY9NjtxPUQ7cj1mdW5jdGlvbihhKXt2YXIgYz1bXSxlO2ZvcihlPTA7NT5lO2UrPTEpY1tlXT1hW2VdLnNsaWNlKCk7cmV0dXJuIGN9O3g9MTtpZihcIlNIQTMtMjI0XCI9PT1cbmMpbT0xMTUyLGY9MjI0O2Vsc2UgaWYoXCJTSEEzLTI1NlwiPT09YyltPTEwODgsZj0yNTY7ZWxzZSBpZihcIlNIQTMtMzg0XCI9PT1jKW09ODMyLGY9Mzg0O2Vsc2UgaWYoXCJTSEEzLTUxMlwiPT09YyltPTU3NixmPTUxMjtlbHNlIGlmKFwiU0hBS0UxMjhcIj09PWMpbT0xMzQ0LGY9LTEsRj0zMSx6PSEwO2Vsc2UgaWYoXCJTSEFLRTI1NlwiPT09YyltPTEwODgsZj0tMSxGPTMxLHo9ITA7ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO3U9ZnVuY3Rpb24oYSxjLGUsYixoKXtlPW07dmFyIGs9RixmLGc9W10sbj1lPj4+NSxsPTAsZD1jPj4+NTtmb3IoZj0wO2Y8ZCYmYz49ZTtmKz1uKWI9RChhLnNsaWNlKGYsZituKSxiKSxjLT1lO2E9YS5zbGljZShmKTtmb3IoYyU9ZTthLmxlbmd0aDxuOylhLnB1c2goMCk7Zj1jPj4+MzthW2Y+PjJdXj1rPDxmJTQqODthW24tMV1ePTIxNDc0ODM2NDg7Zm9yKGI9RChhLGIpOzMyKmcubGVuZ3RoPGg7KXthPWJbbCVcbjVdW2wvNXwwXTtnLnB1c2goYS5iKTtpZigzMipnLmxlbmd0aD49aClicmVhaztnLnB1c2goYS5hKTtsKz0xOzA9PT02NCpsJWUmJkQobnVsbCxiKX1yZXR1cm4gZ319ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2Q9TShhLGcseCk7bD1BKGMpO3RoaXMuc2V0SE1BQ0tleT1mdW5jdGlvbihhLGIsaCl7dmFyIGs7aWYoITA9PT1JKXRocm93IEVycm9yKFwiSE1BQyBrZXkgYWxyZWFkeSBzZXRcIik7aWYoITA9PT15KXRocm93IEVycm9yKFwiQ2Fubm90IHNldCBITUFDIGtleSBhZnRlciBjYWxsaW5nIHVwZGF0ZVwiKTtpZighMD09PXopdGhyb3cgRXJyb3IoXCJTSEFLRSBpcyBub3Qgc3VwcG9ydGVkIGZvciBITUFDXCIpO2c9KGh8fHt9KS5lbmNvZGluZ3x8XCJVVEY4XCI7Yj1NKGIsZyx4KShhKTthPWIuYmluTGVuO2I9Yi52YWx1ZTtrPW0+Pj4zO2g9ay80LTE7aWYoazxhLzgpe2ZvcihiPXUoYixhLDAsQShjKSxmKTtiLmxlbmd0aDw9aDspYi5wdXNoKDApO1xuYltoXSY9NDI5NDk2NzA0MH1lbHNlIGlmKGs+YS84KXtmb3IoO2IubGVuZ3RoPD1oOyliLnB1c2goMCk7YltoXSY9NDI5NDk2NzA0MH1mb3IoYT0wO2E8PWg7YSs9MSl2W2FdPWJbYV1eOTA5NTIyNDg2LHdbYV09YlthXV4xNTQ5NTU2ODI4O2w9cSh2LGwpO2U9bTtJPSEwfTt0aGlzLnVwZGF0ZT1mdW5jdGlvbihhKXt2YXIgYyxiLGssZj0wLGc9bT4+PjU7Yz1kKGEsaCxuKTthPWMuYmluTGVuO2I9Yy52YWx1ZTtjPWE+Pj41O2ZvcihrPTA7azxjO2srPWcpZittPD1hJiYobD1xKGIuc2xpY2UoayxrK2cpLGwpLGYrPW0pO2UrPWY7aD1iLnNsaWNlKGY+Pj41KTtuPWElbTt5PSEwfTt0aGlzLmdldEhhc2g9ZnVuY3Rpb24oYSxiKXt2YXIgayxnLGQsbTtpZighMD09PUkpdGhyb3cgRXJyb3IoXCJDYW5ub3QgY2FsbCBnZXRIYXNoIGFmdGVyIHNldHRpbmcgSE1BQyBrZXlcIik7ZD1OKGIpO2lmKCEwPT09eil7aWYoLTE9PT1kLnNoYWtlTGVuKXRocm93IEVycm9yKFwic2hha2VMZW4gbXVzdCBiZSBzcGVjaWZpZWQgaW4gb3B0aW9uc1wiKTtcbmY9ZC5zaGFrZUxlbn1zd2l0Y2goYSl7Y2FzZSBcIkhFWFwiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIE8oYSxmLHgsZCl9O2JyZWFrO2Nhc2UgXCJCNjRcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBQKGEsZix4LGQpfTticmVhaztjYXNlIFwiQllURVNcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBRKGEsZix4KX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2c9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKHApe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31rPWZ1bmN0aW9uKGEpe3JldHVybiBSKGEsZix4KX07YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImZvcm1hdCBtdXN0IGJlIEhFWCwgQjY0LCBCWVRFUywgb3IgQVJSQVlCVUZGRVJcIik7fW09dShoLnNsaWNlKCksbixlLHIobCksZik7Zm9yKGc9MTtnPHQ7Zys9MSkhMD09PXomJjAhPT1mJTMyJiYobVttLmxlbmd0aC0xXSY9MTY3NzcyMTU+Pj4yNC1mJTMyKSxtPXUobSxmLFxuMCxBKGMpLGYpO3JldHVybiBrKG0pfTt0aGlzLmdldEhNQUM9ZnVuY3Rpb24oYSxiKXt2YXIgayxnLGQscDtpZighMT09PUkpdGhyb3cgRXJyb3IoXCJDYW5ub3QgY2FsbCBnZXRITUFDIHdpdGhvdXQgZmlyc3Qgc2V0dGluZyBITUFDIGtleVwiKTtkPU4oYik7c3dpdGNoKGEpe2Nhc2UgXCJIRVhcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBPKGEsZix4LGQpfTticmVhaztjYXNlIFwiQjY0XCI6az1mdW5jdGlvbihhKXtyZXR1cm4gUChhLGYseCxkKX07YnJlYWs7Y2FzZSBcIkJZVEVTXCI6az1mdW5jdGlvbihhKXtyZXR1cm4gUShhLGYseCl9O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtrPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaCh2KXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9az1mdW5jdGlvbihhKXtyZXR1cm4gUihhLGYseCl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJvdXRwdXRGb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO1xufWc9dShoLnNsaWNlKCksbixlLHIobCksZik7cD1xKHcsQShjKSk7cD11KGcsZixtLHAsZik7cmV0dXJuIGsocCl9fWZ1bmN0aW9uIGIoYyxhKXt0aGlzLmE9Yzt0aGlzLmI9YX1mdW5jdGlvbiBPKGMsYSxiLGUpe3ZhciBoPVwiXCI7YS89ODt2YXIgbixnLGQ7ZD0tMT09PWI/MzowO2ZvcihuPTA7bjxhO24rPTEpZz1jW24+Pj4yXT4+PjgqKGQrbiU0KmIpLGgrPVwiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChnPj4+NCYxNSkrXCIwMTIzNDU2Nzg5YWJjZGVmXCIuY2hhckF0KGcmMTUpO3JldHVybiBlLm91dHB1dFVwcGVyP2gudG9VcHBlckNhc2UoKTpofWZ1bmN0aW9uIFAoYyxhLGIsZSl7dmFyIGg9XCJcIixuPWEvOCxnLGQscCxmO2Y9LTE9PT1iPzM6MDtmb3IoZz0wO2c8bjtnKz0zKWZvcihkPWcrMTxuP2NbZysxPj4+Ml06MCxwPWcrMjxuP2NbZysyPj4+Ml06MCxwPShjW2c+Pj4yXT4+PjgqKGYrZyU0KmIpJjI1NSk8PDE2fChkPj4+OCooZisoZysxKSU0KmIpJjI1NSk8PDh8cD4+PjgqKGYrXG4oZysyKSU0KmIpJjI1NSxkPTA7ND5kO2QrPTEpOCpnKzYqZDw9YT9oKz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQocD4+PjYqKDMtZCkmNjMpOmgrPWUuYjY0UGFkO3JldHVybiBofWZ1bmN0aW9uIFEoYyxhLGIpe3ZhciBlPVwiXCI7YS89ODt2YXIgaCxkLGc7Zz0tMT09PWI/MzowO2ZvcihoPTA7aDxhO2grPTEpZD1jW2g+Pj4yXT4+PjgqKGcraCU0KmIpJjI1NSxlKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGQpO3JldHVybiBlfWZ1bmN0aW9uIFIoYyxhLGIpe2EvPTg7dmFyIGUsaD1uZXcgQXJyYXlCdWZmZXIoYSksZCxnO2c9bmV3IFVpbnQ4QXJyYXkoaCk7ZD0tMT09PWI/MzowO2ZvcihlPTA7ZTxhO2UrPTEpZ1tlXT1jW2U+Pj4yXT4+PjgqKGQrZSU0KmIpJjI1NTtyZXR1cm4gaH1mdW5jdGlvbiBOKGMpe3ZhciBhPXtvdXRwdXRVcHBlcjohMSxiNjRQYWQ6XCI9XCIsc2hha2VMZW46LTF9O2M9Y3x8e307XG5hLm91dHB1dFVwcGVyPWMub3V0cHV0VXBwZXJ8fCExOyEwPT09Yy5oYXNPd25Qcm9wZXJ0eShcImI2NFBhZFwiKSYmKGEuYjY0UGFkPWMuYjY0UGFkKTtpZighMD09PWMuaGFzT3duUHJvcGVydHkoXCJzaGFrZUxlblwiKSl7aWYoMCE9PWMuc2hha2VMZW4lOCl0aHJvdyBFcnJvcihcInNoYWtlTGVuIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA4XCIpO2Euc2hha2VMZW49Yy5zaGFrZUxlbn1pZihcImJvb2xlYW5cIiE9PXR5cGVvZiBhLm91dHB1dFVwcGVyKXRocm93IEVycm9yKFwiSW52YWxpZCBvdXRwdXRVcHBlciBmb3JtYXR0aW5nIG9wdGlvblwiKTtpZihcInN0cmluZ1wiIT09dHlwZW9mIGEuYjY0UGFkKXRocm93IEVycm9yKFwiSW52YWxpZCBiNjRQYWQgZm9ybWF0dGluZyBvcHRpb25cIik7cmV0dXJuIGF9ZnVuY3Rpb24gTShjLGEsYil7c3dpdGNoKGEpe2Nhc2UgXCJVVEY4XCI6Y2FzZSBcIlVURjE2QkVcIjpjYXNlIFwiVVRGMTZMRVwiOmJyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJlbmNvZGluZyBtdXN0IGJlIFVURjgsIFVURjE2QkUsIG9yIFVURjE2TEVcIik7XG59c3dpdGNoKGMpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZz1hLmxlbmd0aCxsLHAsZixtLHEsdTtpZigwIT09ZyUyKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIG11c3QgYmUgaW4gYnl0ZSBpbmNyZW1lbnRzXCIpO2M9Y3x8WzBdO2Q9ZHx8MDtxPWQ+Pj4zO3U9LTE9PT1iPzM6MDtmb3IobD0wO2w8ZztsKz0yKXtwPXBhcnNlSW50KGEuc3Vic3RyKGwsMiksMTYpO2lmKGlzTmFOKHApKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyc1wiKTttPShsPj4+MSkrcTtmb3IoZj1tPj4+MjtjLmxlbmd0aDw9ZjspYy5wdXNoKDApO2NbZl18PXA8PDgqKHUrbSU0KmIpfXJldHVybnt2YWx1ZTpjLGJpbkxlbjo0KmcrZH19O2JyZWFrO2Nhc2UgXCJURVhUXCI6Yz1mdW5jdGlvbihjLGgsZCl7dmFyIGcsbCxwPTAsZixtLHEsdSxyLHQ7aD1ofHxbMF07ZD1kfHwwO3E9ZD4+PjM7aWYoXCJVVEY4XCI9PT1hKWZvcih0PS0xPT09XG5iPzM6MCxmPTA7ZjxjLmxlbmd0aDtmKz0xKWZvcihnPWMuY2hhckNvZGVBdChmKSxsPVtdLDEyOD5nP2wucHVzaChnKToyMDQ4Pmc/KGwucHVzaCgxOTJ8Zz4+PjYpLGwucHVzaCgxMjh8ZyY2MykpOjU1Mjk2Pmd8fDU3MzQ0PD1nP2wucHVzaCgyMjR8Zz4+PjEyLDEyOHxnPj4+NiY2MywxMjh8ZyY2Myk6KGYrPTEsZz02NTUzNisoKGcmMTAyMyk8PDEwfGMuY2hhckNvZGVBdChmKSYxMDIzKSxsLnB1c2goMjQwfGc+Pj4xOCwxMjh8Zz4+PjEyJjYzLDEyOHxnPj4+NiY2MywxMjh8ZyY2MykpLG09MDttPGwubGVuZ3RoO20rPTEpe3I9cCtxO2Zvcih1PXI+Pj4yO2gubGVuZ3RoPD11OyloLnB1c2goMCk7aFt1XXw9bFttXTw8OCoodCtyJTQqYik7cCs9MX1lbHNlIGlmKFwiVVRGMTZCRVwiPT09YXx8XCJVVEYxNkxFXCI9PT1hKWZvcih0PS0xPT09Yj8yOjAsbD1cIlVURjE2TEVcIj09PWEmJjEhPT1ifHxcIlVURjE2TEVcIiE9PWEmJjE9PT1iLGY9MDtmPGMubGVuZ3RoO2YrPTEpe2c9Yy5jaGFyQ29kZUF0KGYpO1xuITA9PT1sJiYobT1nJjI1NSxnPW08PDh8Zz4+PjgpO3I9cCtxO2Zvcih1PXI+Pj4yO2gubGVuZ3RoPD11OyloLnB1c2goMCk7aFt1XXw9Zzw8OCoodCtyJTQqYik7cCs9Mn1yZXR1cm57dmFsdWU6aCxiaW5MZW46OCpwK2R9fTticmVhaztjYXNlIFwiQjY0XCI6Yz1mdW5jdGlvbihhLGMsZCl7dmFyIGc9MCxsLHAsZixtLHEsdSxyLHQ7aWYoLTE9PT1hLnNlYXJjaCgvXlthLXpBLVowLTk9K1xcL10rJC8pKXRocm93IEVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gYmFzZS02NCBzdHJpbmdcIik7cD1hLmluZGV4T2YoXCI9XCIpO2E9YS5yZXBsYWNlKC9cXD0vZyxcIlwiKTtpZigtMSE9PXAmJnA8YS5sZW5ndGgpdGhyb3cgRXJyb3IoXCJJbnZhbGlkICc9JyBmb3VuZCBpbiBiYXNlLTY0IHN0cmluZ1wiKTtjPWN8fFswXTtkPWR8fDA7dT1kPj4+Mzt0PS0xPT09Yj8zOjA7Zm9yKHA9MDtwPGEubGVuZ3RoO3ArPTQpe3E9YS5zdWJzdHIocCw0KTtmb3IoZj1tPTA7ZjxxLmxlbmd0aDtmKz0xKWw9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuaW5kZXhPZihxW2ZdKSxcbm18PWw8PDE4LTYqZjtmb3IoZj0wO2Y8cS5sZW5ndGgtMTtmKz0xKXtyPWcrdTtmb3IobD1yPj4+MjtjLmxlbmd0aDw9bDspYy5wdXNoKDApO2NbbF18PShtPj4+MTYtOCpmJjI1NSk8PDgqKHQrciU0KmIpO2crPTF9fXJldHVybnt2YWx1ZTpjLGJpbkxlbjo4KmcrZH19O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBnLGwscCxmLG0scTtjPWN8fFswXTtkPWR8fDA7cD1kPj4+MztxPS0xPT09Yj8zOjA7Zm9yKGw9MDtsPGEubGVuZ3RoO2wrPTEpZz1hLmNoYXJDb2RlQXQobCksbT1sK3AsZj1tPj4+MixjLmxlbmd0aDw9ZiYmYy5wdXNoKDApLGNbZl18PWc8PDgqKHErbSU0KmIpO3JldHVybnt2YWx1ZTpjLGJpbkxlbjo4KmEubGVuZ3RoK2R9fTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7Yz1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2goZSl7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWM9XG5mdW5jdGlvbihhLGMsZCl7dmFyIGcsbCxwLGYsbSxxO2M9Y3x8WzBdO2Q9ZHx8MDtsPWQ+Pj4zO209LTE9PT1iPzM6MDtxPW5ldyBVaW50OEFycmF5KGEpO2ZvcihnPTA7ZzxhLmJ5dGVMZW5ndGg7Zys9MSlmPWcrbCxwPWY+Pj4yLGMubGVuZ3RoPD1wJiZjLnB1c2goMCksY1twXXw9cVtnXTw8OCoobStmJTQqYik7cmV0dXJue3ZhbHVlOmMsYmluTGVuOjgqYS5ieXRlTGVuZ3RoK2R9fTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBURVhULCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTt9cmV0dXJuIGN9ZnVuY3Rpb24geShjLGEpe3JldHVybiBjPDxhfGM+Pj4zMi1hfWZ1bmN0aW9uIFMoYyxhKXtyZXR1cm4gMzI8YT8oYS09MzIsbmV3IGIoYy5iPDxhfGMuYT4+PjMyLWEsYy5hPDxhfGMuYj4+PjMyLWEpKTowIT09YT9uZXcgYihjLmE8PGF8Yy5iPj4+MzItYSxjLmI8PGF8Yy5hPj4+MzItYSk6Y31mdW5jdGlvbiB3KGMsYSl7cmV0dXJuIGM+Pj5cbmF8Yzw8MzItYX1mdW5jdGlvbiB0KGMsYSl7dmFyIGs9bnVsbCxrPW5ldyBiKGMuYSxjLmIpO3JldHVybiBrPTMyPj1hP25ldyBiKGsuYT4+PmF8ay5iPDwzMi1hJjQyOTQ5NjcyOTUsay5iPj4+YXxrLmE8PDMyLWEmNDI5NDk2NzI5NSk6bmV3IGIoay5iPj4+YS0zMnxrLmE8PDY0LWEmNDI5NDk2NzI5NSxrLmE+Pj5hLTMyfGsuYjw8NjQtYSY0Mjk0OTY3Mjk1KX1mdW5jdGlvbiBUKGMsYSl7dmFyIGs9bnVsbDtyZXR1cm4gaz0zMj49YT9uZXcgYihjLmE+Pj5hLGMuYj4+PmF8Yy5hPDwzMi1hJjQyOTQ5NjcyOTUpOm5ldyBiKDAsYy5hPj4+YS0zMil9ZnVuY3Rpb24gYWEoYyxhLGIpe3JldHVybiBjJmFefmMmYn1mdW5jdGlvbiBiYShjLGEsayl7cmV0dXJuIG5ldyBiKGMuYSZhLmFefmMuYSZrLmEsYy5iJmEuYl5+Yy5iJmsuYil9ZnVuY3Rpb24gVShjLGEsYil7cmV0dXJuIGMmYV5jJmJeYSZifWZ1bmN0aW9uIGNhKGMsYSxrKXtyZXR1cm4gbmV3IGIoYy5hJmEuYV5jLmEmay5hXmEuYSZcbmsuYSxjLmImYS5iXmMuYiZrLmJeYS5iJmsuYil9ZnVuY3Rpb24gZGEoYyl7cmV0dXJuIHcoYywyKV53KGMsMTMpXncoYywyMil9ZnVuY3Rpb24gZWEoYyl7dmFyIGE9dChjLDI4KSxrPXQoYywzNCk7Yz10KGMsMzkpO3JldHVybiBuZXcgYihhLmFeay5hXmMuYSxhLmJeay5iXmMuYil9ZnVuY3Rpb24gZmEoYyl7cmV0dXJuIHcoYyw2KV53KGMsMTEpXncoYywyNSl9ZnVuY3Rpb24gZ2EoYyl7dmFyIGE9dChjLDE0KSxrPXQoYywxOCk7Yz10KGMsNDEpO3JldHVybiBuZXcgYihhLmFeay5hXmMuYSxhLmJeay5iXmMuYil9ZnVuY3Rpb24gaGEoYyl7cmV0dXJuIHcoYyw3KV53KGMsMTgpXmM+Pj4zfWZ1bmN0aW9uIGlhKGMpe3ZhciBhPXQoYywxKSxrPXQoYyw4KTtjPVQoYyw3KTtyZXR1cm4gbmV3IGIoYS5hXmsuYV5jLmEsYS5iXmsuYl5jLmIpfWZ1bmN0aW9uIGphKGMpe3JldHVybiB3KGMsMTcpXncoYywxOSleYz4+PjEwfWZ1bmN0aW9uIGthKGMpe3ZhciBhPXQoYywxOSksaz10KGMsNjEpO1xuYz1UKGMsNik7cmV0dXJuIG5ldyBiKGEuYV5rLmFeYy5hLGEuYl5rLmJeYy5iKX1mdW5jdGlvbiBHKGMsYSl7dmFyIGI9KGMmNjU1MzUpKyhhJjY1NTM1KTtyZXR1cm4oKGM+Pj4xNikrKGE+Pj4xNikrKGI+Pj4xNikmNjU1MzUpPDwxNnxiJjY1NTM1fWZ1bmN0aW9uIGxhKGMsYSxiLGUpe3ZhciBoPShjJjY1NTM1KSsoYSY2NTUzNSkrKGImNjU1MzUpKyhlJjY1NTM1KTtyZXR1cm4oKGM+Pj4xNikrKGE+Pj4xNikrKGI+Pj4xNikrKGU+Pj4xNikrKGg+Pj4xNikmNjU1MzUpPDwxNnxoJjY1NTM1fWZ1bmN0aW9uIEgoYyxhLGIsZSxoKXt2YXIgZD0oYyY2NTUzNSkrKGEmNjU1MzUpKyhiJjY1NTM1KSsoZSY2NTUzNSkrKGgmNjU1MzUpO3JldHVybigoYz4+PjE2KSsoYT4+PjE2KSsoYj4+PjE2KSsoZT4+PjE2KSsoaD4+PjE2KSsoZD4+PjE2KSY2NTUzNSk8PDE2fGQmNjU1MzV9ZnVuY3Rpb24gbWEoYyxhKXt2YXIgZCxlLGg7ZD0oYy5iJjY1NTM1KSsoYS5iJjY1NTM1KTtlPShjLmI+Pj4xNikrXG4oYS5iPj4+MTYpKyhkPj4+MTYpO2g9KGUmNjU1MzUpPDwxNnxkJjY1NTM1O2Q9KGMuYSY2NTUzNSkrKGEuYSY2NTUzNSkrKGU+Pj4xNik7ZT0oYy5hPj4+MTYpKyhhLmE+Pj4xNikrKGQ+Pj4xNik7cmV0dXJuIG5ldyBiKChlJjY1NTM1KTw8MTZ8ZCY2NTUzNSxoKX1mdW5jdGlvbiBuYShjLGEsZCxlKXt2YXIgaCxuLGc7aD0oYy5iJjY1NTM1KSsoYS5iJjY1NTM1KSsoZC5iJjY1NTM1KSsoZS5iJjY1NTM1KTtuPShjLmI+Pj4xNikrKGEuYj4+PjE2KSsoZC5iPj4+MTYpKyhlLmI+Pj4xNikrKGg+Pj4xNik7Zz0obiY2NTUzNSk8PDE2fGgmNjU1MzU7aD0oYy5hJjY1NTM1KSsoYS5hJjY1NTM1KSsoZC5hJjY1NTM1KSsoZS5hJjY1NTM1KSsobj4+PjE2KTtuPShjLmE+Pj4xNikrKGEuYT4+PjE2KSsoZC5hPj4+MTYpKyhlLmE+Pj4xNikrKGg+Pj4xNik7cmV0dXJuIG5ldyBiKChuJjY1NTM1KTw8MTZ8aCY2NTUzNSxnKX1mdW5jdGlvbiBvYShjLGEsZCxlLGgpe3ZhciBuLGcsbDtuPShjLmImXG42NTUzNSkrKGEuYiY2NTUzNSkrKGQuYiY2NTUzNSkrKGUuYiY2NTUzNSkrKGguYiY2NTUzNSk7Zz0oYy5iPj4+MTYpKyhhLmI+Pj4xNikrKGQuYj4+PjE2KSsoZS5iPj4+MTYpKyhoLmI+Pj4xNikrKG4+Pj4xNik7bD0oZyY2NTUzNSk8PDE2fG4mNjU1MzU7bj0oYy5hJjY1NTM1KSsoYS5hJjY1NTM1KSsoZC5hJjY1NTM1KSsoZS5hJjY1NTM1KSsoaC5hJjY1NTM1KSsoZz4+PjE2KTtnPShjLmE+Pj4xNikrKGEuYT4+PjE2KSsoZC5hPj4+MTYpKyhlLmE+Pj4xNikrKGguYT4+PjE2KSsobj4+PjE2KTtyZXR1cm4gbmV3IGIoKGcmNjU1MzUpPDwxNnxuJjY1NTM1LGwpfWZ1bmN0aW9uIEIoYyxhKXtyZXR1cm4gbmV3IGIoYy5hXmEuYSxjLmJeYS5iKX1mdW5jdGlvbiBBKGMpe3ZhciBhPVtdLGQ7aWYoXCJTSEEtMVwiPT09YylhPVsxNzMyNTg0MTkzLDQwMjMyMzM0MTcsMjU2MjM4MzEwMiwyNzE3MzM4NzgsMzI4NTM3NzUyMF07ZWxzZSBpZigwPT09Yy5sYXN0SW5kZXhPZihcIlNIQS1cIiwwKSlzd2l0Y2goYT1cblszMjM4MzcxMDMyLDkxNDE1MDY2Myw4MTI3MDI5OTksNDE0NDkxMjY5Nyw0MjkwNzc1ODU3LDE3NTA2MDMwMjUsMTY5NDA3NjgzOSwzMjA0MDc1NDI4XSxkPVsxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNV0sYyl7Y2FzZSBcIlNIQS0yMjRcIjpicmVhaztjYXNlIFwiU0hBLTI1NlwiOmE9ZDticmVhaztjYXNlIFwiU0hBLTM4NFwiOmE9W25ldyBiKDM0MTgwNzAzNjUsYVswXSksbmV3IGIoMTY1NDI3MDI1MCxhWzFdKSxuZXcgYigyNDM4NTI5MzcwLGFbMl0pLG5ldyBiKDM1NTQ2MjM2MCxhWzNdKSxuZXcgYigxNzMxNDA1NDE1LGFbNF0pLG5ldyBiKDQxMDQ4ODg1ODk1LGFbNV0pLG5ldyBiKDM2NzUwMDg1MjUsYVs2XSksbmV3IGIoMTIwMzA2MjgxMyxhWzddKV07YnJlYWs7Y2FzZSBcIlNIQS01MTJcIjphPVtuZXcgYihkWzBdLDQwODkyMzU3MjApLG5ldyBiKGRbMV0sMjIyNzg3MzU5NSksXG5uZXcgYihkWzJdLDQyNzExNzU3MjMpLG5ldyBiKGRbM10sMTU5NTc1MDEyOSksbmV3IGIoZFs0XSwyOTE3NTY1MTM3KSxuZXcgYihkWzVdLDcyNTUxMTE5OSksbmV3IGIoZFs2XSw0MjE1Mzg5NTQ3KSxuZXcgYihkWzddLDMyNzAzMzIwOSldO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJVbmtub3duIFNIQSB2YXJpYW50XCIpO31lbHNlIGlmKDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBMy1cIiwwKXx8MD09PWMubGFzdEluZGV4T2YoXCJTSEFLRVwiLDApKWZvcihjPTA7NT5jO2MrPTEpYVtjXT1bbmV3IGIoMCwwKSxuZXcgYigwLDApLG5ldyBiKDAsMCksbmV3IGIoMCwwKSxuZXcgYigwLDApXTtlbHNlIHRocm93IEVycm9yKFwiTm8gU0hBIHZhcmlhbnRzIHN1cHBvcnRlZFwiKTtyZXR1cm4gYX1mdW5jdGlvbiBLKGMsYSl7dmFyIGI9W10sZSxkLG4sZyxsLHAsZjtlPWFbMF07ZD1hWzFdO249YVsyXTtnPWFbM107bD1hWzRdO2ZvcihmPTA7ODA+ZjtmKz0xKWJbZl09MTY+Zj9jW2ZdOnkoYltmLVxuM11eYltmLThdXmJbZi0xNF1eYltmLTE2XSwxKSxwPTIwPmY/SCh5KGUsNSksZCZuXn5kJmcsbCwxNTE4NTAwMjQ5LGJbZl0pOjQwPmY/SCh5KGUsNSksZF5uXmcsbCwxODU5Nzc1MzkzLGJbZl0pOjYwPmY/SCh5KGUsNSksVShkLG4sZyksbCwyNDAwOTU5NzA4LGJbZl0pOkgoeShlLDUpLGRebl5nLGwsMzM5NTQ2OTc4MixiW2ZdKSxsPWcsZz1uLG49eShkLDMwKSxkPWUsZT1wO2FbMF09RyhlLGFbMF0pO2FbMV09RyhkLGFbMV0pO2FbMl09RyhuLGFbMl0pO2FbM109RyhnLGFbM10pO2FbNF09RyhsLGFbNF0pO3JldHVybiBhfWZ1bmN0aW9uIFooYyxhLGIsZSl7dmFyIGQ7Zm9yKGQ9KGErNjU+Pj45PDw0KSsxNTtjLmxlbmd0aDw9ZDspYy5wdXNoKDApO2NbYT4+PjVdfD0xMjg8PDI0LWElMzI7YSs9YjtjW2RdPWEmNDI5NDk2NzI5NTtjW2QtMV09YS80Mjk0OTY3Mjk2fDA7YT1jLmxlbmd0aDtmb3IoZD0wO2Q8YTtkKz0xNillPUsoYy5zbGljZShkLGQrMTYpLGUpO3JldHVybiBlfWZ1bmN0aW9uIEwoYyxcbmEsayl7dmFyIGUsaCxuLGcsbCxwLGYsbSxxLHUscix0LHYsdyx5LEEseix4LEYsQixDLEQsRT1bXSxKO2lmKFwiU0hBLTIyNFwiPT09a3x8XCJTSEEtMjU2XCI9PT1rKXU9NjQsdD0xLEQ9TnVtYmVyLHY9Ryx3PWxhLHk9SCxBPWhhLHo9amEseD1kYSxGPWZhLEM9VSxCPWFhLEo9ZDtlbHNlIGlmKFwiU0hBLTM4NFwiPT09a3x8XCJTSEEtNTEyXCI9PT1rKXU9ODAsdD0yLEQ9Yix2PW1hLHc9bmEseT1vYSxBPWlhLHo9a2EseD1lYSxGPWdhLEM9Y2EsQj1iYSxKPVY7ZWxzZSB0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gU0hBLTIgaW1wbGVtZW50YXRpb25cIik7az1hWzBdO2U9YVsxXTtoPWFbMl07bj1hWzNdO2c9YVs0XTtsPWFbNV07cD1hWzZdO2Y9YVs3XTtmb3Iocj0wO3I8dTtyKz0xKTE2PnI/KHE9cip0LG09Yy5sZW5ndGg8PXE/MDpjW3FdLHE9Yy5sZW5ndGg8PXErMT8wOmNbcSsxXSxFW3JdPW5ldyBEKG0scSkpOkVbcl09dyh6KEVbci0yXSksRVtyLTddLEEoRVtyLTE1XSksRVtyLVxuMTZdKSxtPXkoZixGKGcpLEIoZyxsLHApLEpbcl0sRVtyXSkscT12KHgoayksQyhrLGUsaCkpLGY9cCxwPWwsbD1nLGc9dihuLG0pLG49aCxoPWUsZT1rLGs9dihtLHEpO2FbMF09dihrLGFbMF0pO2FbMV09dihlLGFbMV0pO2FbMl09dihoLGFbMl0pO2FbM109dihuLGFbM10pO2FbNF09dihnLGFbNF0pO2FbNV09dihsLGFbNV0pO2FbNl09dihwLGFbNl0pO2FbN109dihmLGFbN10pO3JldHVybiBhfWZ1bmN0aW9uIEQoYyxhKXt2YXIgZCxlLGgsbixnPVtdLGw9W107aWYobnVsbCE9PWMpZm9yKGU9MDtlPGMubGVuZ3RoO2UrPTIpYVsoZT4+PjEpJTVdWyhlPj4+MSkvNXwwXT1CKGFbKGU+Pj4xKSU1XVsoZT4+PjEpLzV8MF0sbmV3IGIoY1tlKzFdLGNbZV0pKTtmb3IoZD0wOzI0PmQ7ZCs9MSl7bj1BKFwiU0hBMy1cIik7Zm9yKGU9MDs1PmU7ZSs9MSl7aD1hW2VdWzBdO3ZhciBwPWFbZV1bMV0sZj1hW2VdWzJdLG09YVtlXVszXSxxPWFbZV1bNF07Z1tlXT1uZXcgYihoLmFecC5hXmYuYV5cbm0uYV5xLmEsaC5iXnAuYl5mLmJebS5iXnEuYil9Zm9yKGU9MDs1PmU7ZSs9MSlsW2VdPUIoZ1soZSs0KSU1XSxTKGdbKGUrMSklNV0sMSkpO2ZvcihlPTA7NT5lO2UrPTEpZm9yKGg9MDs1Pmg7aCs9MSlhW2VdW2hdPUIoYVtlXVtoXSxsW2VdKTtmb3IoZT0wOzU+ZTtlKz0xKWZvcihoPTA7NT5oO2grPTEpbltoXVsoMiplKzMqaCklNV09UyhhW2VdW2hdLFdbZV1baF0pO2ZvcihlPTA7NT5lO2UrPTEpZm9yKGg9MDs1Pmg7aCs9MSlhW2VdW2hdPUIobltlXVtoXSxuZXcgYih+blsoZSsxKSU1XVtoXS5hJm5bKGUrMiklNV1baF0uYSx+blsoZSsxKSU1XVtoXS5iJm5bKGUrMiklNV1baF0uYikpO2FbMF1bMF09QihhWzBdWzBdLFhbZF0pfXJldHVybiBhfXZhciBkLFYsVyxYO2Q9WzExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCxcbjE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LDQzMDIyNzczNCw1MDY5NDg2MTYsNjU5MDYwNTU2LDg4Mzk5Nzg3Nyw5NTgxMzk1NzEsMTMyMjgyMjIxOCwxNTM3MDAyMDYzLDE3NDc4NzM3NzksMTk1NTU2MjIyMiwyMDI0MTA0ODE1LFxuMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOThdO1Y9W25ldyBiKGRbMF0sMzYwOTc2NzQ1OCksbmV3IGIoZFsxXSw2MDI4OTE3MjUpLG5ldyBiKGRbMl0sMzk2NDQ4NDM5OSksbmV3IGIoZFszXSwyMTczMjk1NTQ4KSxuZXcgYihkWzRdLDQwODE2Mjg0NzIpLG5ldyBiKGRbNV0sMzA1MzgzNDI2NSksbmV3IGIoZFs2XSwyOTM3NjcxNTc5KSxuZXcgYihkWzddLDM2NjQ2MDk1NjApLG5ldyBiKGRbOF0sMjczNDg4MzM5NCksbmV3IGIoZFs5XSwxMTY0OTk2NTQyKSxuZXcgYihkWzEwXSwxMzIzNjEwNzY0KSxuZXcgYihkWzExXSwzNTkwMzA0OTk0KSxuZXcgYihkWzEyXSw0MDY4MTgyMzgzKSxuZXcgYihkWzEzXSw5OTEzMzYxMTMpLG5ldyBiKGRbMTRdLDYzMzgwMzMxNyksbmV3IGIoZFsxNV0sMzQ3OTc3NDg2OCksbmV3IGIoZFsxNl0sMjY2NjYxMzQ1OCksbmV3IGIoZFsxN10sOTQ0NzExMTM5KSxuZXcgYihkWzE4XSwyMzQxMjYyNzczKSxcbm5ldyBiKGRbMTldLDIwMDc4MDA5MzMpLG5ldyBiKGRbMjBdLDE0OTU5OTA5MDEpLG5ldyBiKGRbMjFdLDE4NTY0MzEyMzUpLG5ldyBiKGRbMjJdLDMxNzUyMTgxMzIpLG5ldyBiKGRbMjNdLDIxOTg5NTA4MzcpLG5ldyBiKGRbMjRdLDM5OTk3MTkzMzkpLG5ldyBiKGRbMjVdLDc2Njc4NDAxNiksbmV3IGIoZFsyNl0sMjU2NjU5NDg3OSksbmV3IGIoZFsyN10sMzIwMzMzNzk1NiksbmV3IGIoZFsyOF0sMTAzNDQ1NzAyNiksbmV3IGIoZFsyOV0sMjQ2Njk0ODkwMSksbmV3IGIoZFszMF0sMzc1ODMyNjM4MyksbmV3IGIoZFszMV0sMTY4NzE3OTM2KSxuZXcgYihkWzMyXSwxMTg4MTc5OTY0KSxuZXcgYihkWzMzXSwxNTQ2MDQ1NzM0KSxuZXcgYihkWzM0XSwxNTIyODA1NDg1KSxuZXcgYihkWzM1XSwyNjQzODMzODIzKSxuZXcgYihkWzM2XSwyMzQzNTI3MzkwKSxuZXcgYihkWzM3XSwxMDE0NDc3NDgwKSxuZXcgYihkWzM4XSwxMjA2NzU5MTQyKSxuZXcgYihkWzM5XSwzNDQwNzc2MjcpLFxubmV3IGIoZFs0MF0sMTI5MDg2MzQ2MCksbmV3IGIoZFs0MV0sMzE1ODQ1NDI3MyksbmV3IGIoZFs0Ml0sMzUwNTk1MjY1NyksbmV3IGIoZFs0M10sMTA2MjE3MDA4KSxuZXcgYihkWzQ0XSwzNjA2MDA4MzQ0KSxuZXcgYihkWzQ1XSwxNDMyNzI1Nzc2KSxuZXcgYihkWzQ2XSwxNDY3MDMxNTk0KSxuZXcgYihkWzQ3XSw4NTExNjk3MjApLG5ldyBiKGRbNDhdLDMxMDA4MjM3NTIpLG5ldyBiKGRbNDldLDEzNjMyNTgxOTUpLG5ldyBiKGRbNTBdLDM3NTA2ODU1OTMpLG5ldyBiKGRbNTFdLDM3ODUwNTAyODApLG5ldyBiKGRbNTJdLDMzMTgzMDc0MjcpLG5ldyBiKGRbNTNdLDM4MTI3MjM0MDMpLG5ldyBiKGRbNTRdLDIwMDMwMzQ5OTUpLG5ldyBiKGRbNTVdLDM2MDIwMzY4OTkpLG5ldyBiKGRbNTZdLDE1NzU5OTAwMTIpLG5ldyBiKGRbNTddLDExMjU1OTI5MjgpLG5ldyBiKGRbNThdLDI3MTY5MDQzMDYpLG5ldyBiKGRbNTldLDQ0Mjc3NjA0NCksbmV3IGIoZFs2MF0sNTkzNjk4MzQ0KSxuZXcgYihkWzYxXSxcbjM3MzMxMTAyNDkpLG5ldyBiKGRbNjJdLDI5OTkzNTE1NzMpLG5ldyBiKGRbNjNdLDM4MTU5MjA0MjcpLG5ldyBiKDMzOTE1Njk2MTQsMzkyODM4MzkwMCksbmV3IGIoMzUxNTI2NzI3MSw1NjYyODA3MTEpLG5ldyBiKDM5NDAxODc2MDYsMzQ1NDA2OTUzNCksbmV3IGIoNDExODYzMDI3MSw0MDAwMjM5OTkyKSxuZXcgYigxMTY0MTg0NzQsMTkxNDEzODU1NCksbmV3IGIoMTc0MjkyNDIxLDI3MzEwNTUyNzApLG5ldyBiKDI4OTM4MDM1NiwzMjAzOTkzMDA2KSxuZXcgYig0NjAzOTMyNjksMzIwNjIwMzE1KSxuZXcgYig2ODU0NzE3MzMsNTg3NDk2ODM2KSxuZXcgYig4NTIxNDI5NzEsMTA4Njc5Mjg1MSksbmV3IGIoMTAxNzAzNjI5OCwzNjU1NDMxMDApLG5ldyBiKDExMjYwMDA1ODAsMjYxODI5NzY3NiksbmV3IGIoMTI4ODAzMzQ3MCwzNDA5ODU1MTU4KSxuZXcgYigxNTAxNTA1OTQ4LDQyMzQ1MDk4NjYpLG5ldyBiKDE2MDcxNjc5MTUsOTg3MTY3NDY4KSxuZXcgYigxODE2NDAyMzE2LFxuMTI0NjE4OTU5MSldO1g9W25ldyBiKDAsMSksbmV3IGIoMCwzMjg5OCksbmV3IGIoMjE0NzQ4MzY0OCwzMjkwNiksbmV3IGIoMjE0NzQ4MzY0OCwyMTQ3NTE2NDE2KSxuZXcgYigwLDMyOTA3KSxuZXcgYigwLDIxNDc0ODM2NDkpLG5ldyBiKDIxNDc0ODM2NDgsMjE0NzUxNjU0NSksbmV3IGIoMjE0NzQ4MzY0OCwzMjc3NyksbmV3IGIoMCwxMzgpLG5ldyBiKDAsMTM2KSxuZXcgYigwLDIxNDc1MTY0MjUpLG5ldyBiKDAsMjE0NzQ4MzY1OCksbmV3IGIoMCwyMTQ3NTE2NTU1KSxuZXcgYigyMTQ3NDgzNjQ4LDEzOSksbmV3IGIoMjE0NzQ4MzY0OCwzMjkwNSksbmV3IGIoMjE0NzQ4MzY0OCwzMjc3MSksbmV3IGIoMjE0NzQ4MzY0OCwzMjc3MCksbmV3IGIoMjE0NzQ4MzY0OCwxMjgpLG5ldyBiKDAsMzI3NzgpLG5ldyBiKDIxNDc0ODM2NDgsMjE0NzQ4MzY1OCksbmV3IGIoMjE0NzQ4MzY0OCwyMTQ3NTE2NTQ1KSxuZXcgYigyMTQ3NDgzNjQ4LDMyODk2KSxuZXcgYigwLDIxNDc0ODM2NDkpLFxubmV3IGIoMjE0NzQ4MzY0OCwyMTQ3NTE2NDI0KV07Vz1bWzAsMzYsMyw0MSwxOF0sWzEsNDQsMTAsNDUsMl0sWzYyLDYsNDMsMTUsNjFdLFsyOCw1NSwyNSwyMSw1Nl0sWzI3LDIwLDM5LDgsMTRdXTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBDfSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBleHBvcnRzPyhcInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1DKSxleHBvcnRzPUMpOlkuanNTSEE9Q30pKHRoaXMpO1xuIiwiaW1wb3J0IHtNZXNzYWdlLCBFdmVudHMsIFN1Y2Nlc3NTdGF0ZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1NwaUNvbmZpZywgVHJhbnNhY3Rpb25PcHRpb25zfSBmcm9tICcuL1NwaU1vZGVscyc7XG5pbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgQ2FzaG91dE9ubHlSZXF1ZXN0XG57ICBcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudClcbiAgICB7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5DYXNob3V0QW1vdW50ID0gYW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuU3VyY2hhcmdlQW1vdW50ID0gc3VyY2hhcmdlQW1vdW50O1xuICAgICAgICB0aGlzLkNvbmZpZyA9IG5ldyBTcGlDb25maWcoKTtcbiAgICAgICAgdGhpcy5PcHRpb25zID0gbmV3IFRyYW5zYWN0aW9uT3B0aW9ucygpO1xuICAgIH1cbiAgICBcbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwiY2FzaF9hbW91bnRcIjogdGhpcy5DYXNob3V0QW1vdW50LFxuICAgICAgICAgICAgXCJzdXJjaGFyZ2VfYW1vdW50XCI6IHRoaXMuU3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5Db25maWcuYWRkUmVjZWlwdENvbmZpZyhkYXRhKTtcbiAgICAgICAgdGhpcy5PcHRpb25zLkFkZE9wdGlvbnMoZGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJjc2hvdXRcIiksIEV2ZW50cy5DYXNob3V0T25seVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhc2hvdXRPbmx5UmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0UlJOKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJycm5cIl07XG4gICAgfVxuXG4gICAgR2V0Q2FzaG91dEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiY2FzaF9hbW91bnRcIl07XG4gICAgfVxuXG4gICAgR2V0QmFua05vbkNhc2hBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbmtfbm9uY2FzaF9hbW91bnRcIl07XG4gICAgfVxuXG4gICAgR2V0QmFua0Nhc2hBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbmtfY2FzaF9hbW91bnRcIl07XG4gICAgfVxuICAgIFxuICAgIEdldEN1c3RvbWVyUmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiY3VzdG9tZXJfcmVjZWlwdFwiXTtcbiAgICB9XG5cbiAgICBHZXRNZXJjaGFudFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcIm1lcmNoYW50X3JlY2VpcHRcIl07XG4gICAgfVxuICAgIFxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiaG9zdF9yZXNwb25zZV90ZXh0XCJdO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiaG9zdF9yZXNwb25zZV9jb2RlXCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbFJlZmVyZW5jZUlkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJ0ZXJtaW5hbF9yZWZfaWRcIl07XG4gICAgfVxuXG4gICAgR2V0QWNjb3VudFR5cGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImFjY291bnRfdHlwZVwiXTtcbiAgICB9XG5cbiAgICBHZXRBdXRoQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYXV0aF9jb2RlXCJdO1xuICAgIH1cblxuICAgIEdldEJhbmtEYXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYW5rX2RhdGVcIl07XG4gICAgfVxuXG4gICAgR2V0QmFua1RpbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbmtfdGltZVwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0TWFza2VkUGFuKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJtYXNrZWRfcGFuXCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJ0ZXJtaW5hbF9pZFwiXTtcbiAgICB9XG5cbiAgICBXYXNNZXJjaGFudFJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJtZXJjaGFudF9yZWNlaXB0X3ByaW50ZWRcIl07XG4gICAgfVxuXG4gICAgV2FzQ3VzdG9tZXJSZWNlaXB0UHJpbnRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiY3VzdG9tZXJfcmVjZWlwdF9wcmludGVkXCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRTdXJjaGFyZ2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcInN1cmNoYXJnZV9hbW91bnRcIl07XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VWYWx1ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxuXG59IiwiZXhwb3J0IGNvbnN0IENvbm5lY3Rpb25TdGF0ZSA9IHtcbiAgICBEaXNjb25uZWN0ZWQ6ICdEaXNjb25uZWN0ZWQnLFxuICAgIENvbm5lY3Rpbmc6ICdDb25uZWN0aW5nJyxcbiAgICBDb25uZWN0ZWQ6ICdDb25uZWN0ZWQnXG59O1xuXG5leHBvcnQgY29uc3QgU1BJX1BST1RPQ09MID0gJ3NwaS4yLjQuMCc7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uU3RhdGVFdmVudEFyZ3NcbntcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5Db25uZWN0aW9uU3RhdGUgPSBjb25uZWN0aW9uU3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV2ZW50QXJnc1xue1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5BZGRyZXNzICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5Db25uZWN0ZWQgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3RhdGUgICAgICA9IENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XG4gICAgICAgIHRoaXMuU3BpUHJvdG9jb2wgPSBTUElfUFJPVE9DT0w7XG4gICAgICAgIHRoaXMuX3dzICAgICAgICA9IG51bGw7XG5cbiAgICAgICAgaWYodHlwZW9mIFdlYlNvY2tldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBXZWJTb2NrZXRzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb25uZWN0KCkge1xuICAgICAgICBpZih0aGlzLlN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkIHx8IHRoaXMuU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nKSB7XG4gICAgICAgICAgICAvLyBhbHJlYWR5IGNvbm5lY3RlZCBvciBjb25uZWN0aW5nLiBkaXNjb25uZWN0IGZpcnN0LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xuXG4gICAgICAgIC8vQ3JlYXRlIGEgbmV3IHNvY2tldCBpbnN0YW5jZSBzcGVjaWZ5aW5nIHRoZSB1cmwsIFNQSSBwcm90b2NvbCBhbmQgV2Vic29ja2V0IHRvIHVzZS5cbiAgICAgICAgLy9UaGUgd2lsbCBjcmVhdGUgYSBUQ1AvSVAgc29ja2V0IGNvbm5lY3Rpb24gdG8gdGhlIHByb3ZpZGVkIFVSTCBhbmQgcGVyZm9ybSBIVFRQIHdlYnNvY2tldCBuZWdvdGlhdGlvblxuICAgICAgICB0aGlzLl93cyAgICAgICAgICAgPSBuZXcgV2ViU29ja2V0KHRoaXMuQWRkcmVzcywgdGhpcy5TcGlQcm90b2NvbCk7XG4gICAgICAgIHRoaXMuX3dzLm9ub3BlbiAgICA9ICgpID0+IHRoaXMucG9sbFdlYlNvY2tldENvbm5lY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gKHBheWxvYWQpID0+IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQocGF5bG9hZCk7XG4gICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgICA9ICgpID0+IHRoaXMub25DbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fd3Mub25lcnJvciAgID0gKGVycikgPT4gdGhpcy5vbkVycm9yKGVycik7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkJywge2RldGFpbDogbmV3IENvbm5lY3Rpb25TdGF0ZUV2ZW50QXJncyhDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZyl9KSk7XG4gICAgfVxuXG4gICAgRGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuU3RhdGUgPT0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmKHRoaXMuX3dzICYmIHRoaXMuX3dzLnJlYWR5U3RhdGUgIT0gdGhpcy5fd3MuQ0xPU0VEKSB7XG4gICAgICAgICAgICB0aGlzLl93cy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3dzKSB7XG4gICAgICAgICAgICB0aGlzLl93cy5vbm9wZW4gICAgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgICA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl93cy5vbmVycm9yICAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkNsb3NlZCgpO1xuICAgIH1cblxuICAgIFNlbmQobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl93cy5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9uT3BlbmVkKCkge1xuICAgICAgICB0aGlzLlN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5Db25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQnLCB7ZGV0YWlsOiBuZXcgQ29ubmVjdGlvblN0YXRlRXZlbnRBcmdzKENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQpfSkpO1xuICAgIH1cblxuICAgIG9uQ2xvc2VkKCkge1xuICAgICAgICB0aGlzLkNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLlN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5fd3MgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQnLCB7ZGV0YWlsOiBuZXcgQ29ubmVjdGlvblN0YXRlRXZlbnRBcmdzKENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpfSkpO1xuICAgIH1cblxuICAgIHBvbGxXZWJTb2NrZXRDb25uZWN0aW9uKGNvdW50ID0gMCkge1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fd3MucmVhZHlTdGF0ZSA9PT0gdGhpcy5fd3MuT1BFTikge1xuICAgICAgICAgICAgdGhpcy5vbk9wZW5lZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZihjb3VudCA8IDI1KSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBvbGxXZWJTb2NrZXRDb25uZWN0aW9uKGNvdW50KSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuRGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSkge1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnTWVzc2FnZVJlY2VpdmVkJywge2RldGFpbDogbmV3IE1lc3NhZ2VFdmVudEFyZ3MobWVzc2FnZS5kYXRhKX0pKTtcbiAgICB9XG5cbiAgICBvbkVycm9yKGVycikge1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnRXJyb3JSZWNlaXZlZCcsIHtkZXRhaWw6IG5ldyBNZXNzYWdlRXZlbnRBcmdzKGVycil9KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGpzU0hBIGZyb20gJ2pzc2hhJztcbmltcG9ydCBhZXNqcyBmcm9tICdhZXMtanMnO1xuXG5leHBvcnQgY2xhc3MgQ3J5cHRvIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEVuY3J5cHQgYSBibG9jayB1c2luZyBDQkMgYW5kIFBLQ1M3LlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImtleVwiPlRoZSBrZXkgdmFsdWU8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPlRoZSBtZXNzYWdlIHRvIGVuY3J5cHQ8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPlJldHVybnMgdGhlIHJlc3VsdGluZyBlbmNyeXB0ZWQgc3RyaW5nIGRhdGEgYXMgSEVYLjwvcmV0dXJucz5cbiAgICBzdGF0aWMgQWVzRW5jcnlwdCAoa2V5LCBkYXRhKSB7XG4gICAgICAgIGxldCBieXRlcyA9IGFlc2pzLnV0aWxzLmhleC50b0J5dGVzKGtleSk7XG4gICAgICAgIGNvbnN0IGl2ID0gWzB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgXTtcbiAgICAgICAgY29uc3QgdGV4dEJ5dGVzID0gYWVzanMucGFkZGluZy5wa2NzNy5wYWQoYWVzanMudXRpbHMudXRmOC50b0J5dGVzKGRhdGEpKTtcbiAgICAgICAgY29uc3QgYWVzQ2JjID0gbmV3IGFlc2pzLk1vZGVPZk9wZXJhdGlvbi5jYmMoYnl0ZXMsIGl2KTtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkQnl0ZXMgPSBhZXNDYmMuZW5jcnlwdCh0ZXh0Qnl0ZXMpO1xuICAgICAgICBjb25zdCBlbmNyeXB0ZWRTdHJpbmcgPSBhZXNqcy51dGlscy5oZXguZnJvbUJ5dGVzKGVuY3J5cHRlZEJ5dGVzKTtcblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkU3RyaW5nO1xuICAgIH1cbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBEZWNyeXB0IGEgYmxvY2sgdXNpbmcgYSBDQkMgYW5kIFBLQ1M3LlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImtleVwiPlRoZSBrZXkgdmFsdWU8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPnRoZSBkYXRhIHRvIGRlY3J5cHQ8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPlJldHVybnMgdGhlIHJlc3VsdGluZyBkYXRhIGRlY3J5cHRlZCBpbiBwbGFpbnRleHQuPC9yZXR1cm5zPlxuICAgIHN0YXRpYyBBZXNEZWNyeXB0KGtleSwgZGF0YSkge1xuICAgICAgICBsZXQgYnl0ZXMgPSBhZXNqcy51dGlscy5oZXgudG9CeXRlcyhrZXkpO1xuICAgICAgICBjb25zdCBpdiA9IFsweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwIF07XG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZEJ5dGVzID0gYWVzanMudXRpbHMuaGV4LnRvQnl0ZXMoZGF0YSk7XG4gICAgICAgIGNvbnN0IGFlc0NiYyA9IG5ldyBhZXNqcy5Nb2RlT2ZPcGVyYXRpb24uY2JjKGJ5dGVzLCBpdik7XG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZEJ5dGVzID0gYWVzQ2JjLmRlY3J5cHQoZW5jcnlwdGVkQnl0ZXMpO1xuICAgICAgICBjb25zdCBkZWNyeXB0ZWQgPSBhZXNqcy51dGlscy51dGY4LmZyb21CeXRlcyhhZXNqcy5wYWRkaW5nLnBrY3M3LnN0cmlwKGRlY3J5cHRlZEJ5dGVzKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBkZWNyeXB0ZWQ7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsY3VsYXRlcyB0aGUgSE1BQ1NIQTI1NiBzaWduYXR1cmUgb2YgYSBtZXNzYWdlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImtleVwiPlRoZSBIbWFjIEtleSBhcyBIRVg8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVRvU2lnblwiPlRoZSBtZXNzYWdlIHRvIHNpZ248L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPlRoZSBITUFDU0hBMjU2IHNpZ25hdHVyZSBhcyBhIGhleCBzdHJpbmc8L3JldHVybnM+XG4gICAgc3RhdGljIEhtYWNTaWduYXR1cmUoa2V5LCBtZXNzYWdlVG9TaWduKSB7XG4gICAgICAgIGxldCBzaGFPYmogPSBuZXcganNTSEEoXCJTSEEtMjU2XCIsIFwiVEVYVFwiKTtcblxuICAgICAgICBzaGFPYmouc2V0SE1BQ0tleShrZXksJ0hFWCcpO1xuICAgICAgICBzaGFPYmoudXBkYXRlKG1lc3NhZ2VUb1NpZ24pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNoYU9iai5nZXRITUFDKFwiSEVYXCIpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyB1dGlsaXR5IGZ1bmN0aW9uIGNhbGN1bGF0ZXMgdGhlIFNIQS0yNTYgdmFsdWUgaW4gaGV4YWRlY2ltYWwgZm9ybWF0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIHRoZSB2YWx1ZSB0byBiZSBoYXNoZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgR2VuZXJhdGVIYXNoKHZhbHVlKSB7XG4gICAgICAgIGxldCBzaGFPYmogPSBuZXcganNTSEEoJ1NIQS0yNTYnLCAnSEVYJyk7XG4gICAgICAgIHNoYU9iai51cGRhdGUodmFsdWUpO1xuICAgICAgICBjb25zdCBzaGFIYXNoID0gc2hhT2JqLmdldEhhc2goJ0hFWCcpO1xuICAgICAgICByZXR1cm4gc2hhSGFzaDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50cywgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge0NyeXB0b30gZnJvbSAnLi9DcnlwdG8nO1xuaW1wb3J0IHtTZWNyZXRzfSBmcm9tICcuL1NlY3JldHMnO1xuXG5leHBvcnQgY2xhc3MgS2V5Um9sbGluZ0hlbHBlciB7XG4gICAgc3RhdGljIFBlcmZvcm1LZXlSb2xsaW5nKGtyUmVxdWVzdCwgY3VycmVudFNlY3JldHMpXG4gICAge1xuICAgICAgICBsZXQgbSA9IG5ldyBNZXNzYWdlKGtyUmVxdWVzdC5JZCwgRXZlbnRzLktleVJvbGxSZXNwb25zZSwge1wic3RhdHVzXCI6IFwiY29uZmlybWVkXCJ9LCB0cnVlKTtcbiAgICAgICAgbGV0IG5ld1NlY3JldHMgPSBuZXcgU2VjcmV0cyhDcnlwdG8uR2VuZXJhdGVIYXNoKGN1cnJlbnRTZWNyZXRzLkVuY0tleSkudG9VcHBlckNhc2UoKSxDcnlwdG8uR2VuZXJhdGVIYXNoKGN1cnJlbnRTZWNyZXRzLkhtYWNLZXkpLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICByZXR1cm4gbmV3IEtleVJvbGxpbmdSZXN1bHQobSwgbmV3U2VjcmV0cyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgS2V5Um9sbGluZ1Jlc3VsdCB7XG4gICAgY29uc3RydWN0b3Ioa2V5Um9sbGluZ0NvbmZpcm1hdGlvbiwgbmV3U2VjcmV0cykge1xuICAgICAgICB0aGlzLktleVJvbGxpbmdDb25maXJtYXRpb24gPSBrZXlSb2xsaW5nQ29uZmlybWF0aW9uO1xuICAgICAgICB0aGlzLk5ld1NlY3JldHMgPSBuZXdTZWNyZXRzO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbGluZVNlcGVyYXRvciA9ICdcXG4nKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyICAgICA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnQgICAgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmxpbmVTZXBlcmF0b3IgPSBsaW5lU2VwZXJhdG9yO1xuICAgIH1cblxuICAgIEluZm8oLi4uYXJncykge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGFyZ3Muam9pbignICcpKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuXG4gICAgRGVidWcoLi4uYXJncykge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGFyZ3Muam9pbignICcpKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuXG4gICAgV2FybiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBFcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBDb25zb2xlKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIF9yZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmJ1ZmZlci5qb2luKHRoaXMubGluZVNlcGVyYXRvcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cblxuICAgIENsZWFyKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7TG9nZ2VyfTsiLCJpbXBvcnQge0NyeXB0b30gZnJvbSAnLi9DcnlwdG8nO1xuXG4vLyA8c3VtbWFyeT5cbi8vIEV2ZW50cyBzdGF0aWNhbGx5IGRlY2xhcmVzIHRoZSB2YXJpb3VzIGV2ZW50IG5hbWVzIGluIG1lc3NhZ2VzLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNvbnN0IEV2ZW50cyA9IHtcbiAgICAgUGFpclJlcXVlc3QgOiBcInBhaXJfcmVxdWVzdFwiLFxuICAgICBLZXlSZXF1ZXN0IDogXCJrZXlfcmVxdWVzdFwiLFxuICAgICBLZXlSZXNwb25zZSA6IFwia2V5X3Jlc3BvbnNlXCIsXG4gICAgIEtleUNoZWNrIDogXCJrZXlfY2hlY2tcIixcbiAgICAgUGFpclJlc3BvbnNlIDogXCJwYWlyX3Jlc3BvbnNlXCIsXG4gICAgIERyb3BLZXlzQWR2aWNlIDogXCJkcm9wX2tleXNcIixcblxuICAgICBMb2dpblJlcXVlc3QgOiBcImxvZ2luX3JlcXVlc3RcIixcbiAgICAgTG9naW5SZXNwb25zZSA6IFwibG9naW5fcmVzcG9uc2VcIixcblxuICAgICBQaW5nIDogXCJwaW5nXCIsXG4gICAgIFBvbmcgOiBcInBvbmdcIixcblxuICAgICBQdXJjaGFzZVJlcXVlc3QgOiBcInB1cmNoYXNlXCIsXG4gICAgIFB1cmNoYXNlUmVzcG9uc2UgOiBcInB1cmNoYXNlX3Jlc3BvbnNlXCIsXG4gICAgIENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdCA6IFwiY2FuY2VsX3RyYW5zYWN0aW9uXCIsXG4gICAgIEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QgOiBcImdldF9sYXN0X3RyYW5zYWN0aW9uXCIsXG4gICAgIEdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIDogXCJsYXN0X3RyYW5zYWN0aW9uXCIsXG4gICAgIFJlZnVuZFJlcXVlc3QgOiBcInJlZnVuZFwiLFxuICAgICBSZWZ1bmRSZXNwb25zZSA6IFwicmVmdW5kX3Jlc3BvbnNlXCIsXG4gICAgIFNpZ25hdHVyZVJlcXVpcmVkIDogXCJzaWduYXR1cmVfcmVxdWlyZWRcIixcbiAgICAgU2lnbmF0dXJlRGVjbGluZWQgOiBcInNpZ25hdHVyZV9kZWNsaW5lXCIsXG4gICAgIFNpZ25hdHVyZUFjY2VwdGVkIDogXCJzaWduYXR1cmVfYWNjZXB0XCIsXG4gICAgIEF1dGhDb2RlUmVxdWlyZWQgOiBcImF1dGhvcmlzYXRpb25fY29kZV9yZXF1aXJlZFwiLFxuICAgICBBdXRoQ29kZUFkdmljZSA6IFwiYXV0aG9yaXNhdGlvbl9jb2RlX2FkdmljZVwiLFxuXG4gICAgIENhc2hvdXRPbmx5UmVxdWVzdCA6IFwiY2FzaFwiLFxuICAgICBDYXNob3V0T25seVJlc3BvbnNlIDogXCJjYXNoX3Jlc3BvbnNlXCIsXG5cbiAgICAgTW90b1B1cmNoYXNlUmVxdWVzdCA6IFwibW90b19wdXJjaGFzZVwiLFxuICAgICBNb3RvUHVyY2hhc2VSZXNwb25zZSA6IFwibW90b19wdXJjaGFzZV9yZXNwb25zZVwiLFxuXG4gICAgIFNldHRsZVJlcXVlc3QgOiBcInNldHRsZVwiLFxuICAgICBTZXR0bGVSZXNwb25zZSA6IFwic2V0dGxlX3Jlc3BvbnNlXCIsXG4gICAgIFNldHRsZW1lbnRFbnF1aXJ5UmVxdWVzdCA6IFwic2V0dGxlbWVudF9lbnF1aXJ5XCIsXG4gICAgIFNldHRsZW1lbnRFbnF1aXJ5UmVzcG9uc2UgOiBcInNldHRsZW1lbnRfZW5xdWlyeV9yZXNwb25zZVwiLFxuXG4gICAgIEtleVJvbGxSZXF1ZXN0IDogXCJyZXF1ZXN0X3VzZV9uZXh0X2tleXNcIixcbiAgICAgS2V5Um9sbFJlc3BvbnNlIDogXCJyZXNwb25zZV91c2VfbmV4dF9rZXlzXCIsXG5cbiAgICAgRXJyb3IgOiBcImVycm9yXCIsXG4gICAgXG4gICAgIEludmFsaWRIbWFjU2lnbmF0dXJlIDogXCJfSU5WQUxJRF9TSUdOQVRVUkVfXCIsXG5cbiAgICAvLyBQYXkgQXQgVGFibGUgUmVsYXRlZCBNZXNzYWdlc1xuICAgIFBheUF0VGFibGVHZXRUYWJsZUNvbmZpZyA6IFwiZ2V0X3RhYmxlX2NvbmZpZ1wiLCAvLyBpbmNvbWluZy4gV2hlbiBlZnRwb3Mgd2FudHMgdG8gYXNrIHVzIGZvciBQQFQgY29uZmlndXJhdGlvbi5cbiAgICBQYXlBdFRhYmxlU2V0VGFibGVDb25maWcgOiBcInNldF90YWJsZV9jb25maWdcIiwgLy8gb3V0Z29pbmcuIFdoZW4gd2Ugd2FudCB0byBpbnN0cnVjdCBlZnRwb3Mgd2l0aCB0aGUgUEBUIGNvbmZpZ3VyYXRpb24uXG4gICAgUGF5QXRUYWJsZUdldEJpbGxEZXRhaWxzIDogXCJnZXRfYmlsbF9kZXRhaWxzXCIsIC8vIGluY29taW5nLiBXaGVuIGVmdHBvcyB3YW50cyB0byBhcmV0cmlldmUgdGhlIGJpbGwgZm9yIGEgdGFibGUuXG4gICAgUGF5QXRUYWJsZUJpbGxEZXRhaWxzIDogXCJiaWxsX2RldGFpbHNcIiwgICAgICAgIC8vIG91dGdvaW5nLiBXZSByZXBseSB3aXRoIHRoaXMgd2hlbiBlZnRwb3MgcmVxdWVzdHMgdG8gdXMgZ2V0X2JpbGxfZGV0YWlscy5cbiAgICBQYXlBdFRhYmxlQmlsbFBheW1lbnQgOiBcImJpbGxfcGF5bWVudFwiICAgICAgICAvLyBpbmNvbWluZy4gV2hlbiB0aGUgZWZ0cG9zIGFkdmljZXMgXG59O1xuXG5leHBvcnQgY29uc3QgU3VjY2Vzc1N0YXRlID0ge1xuICAgIFVua25vd246ICdVbmtub3duJywgU3VjY2VzczogJ1N1Y2Nlc3MnLCBGYWlsZWQ6ICdGYWlsZWQnXG59O1xuXG4vLyA8c3VtbWFyeT5cbi8vIE1lc3NhZ2VTdGFtcCByZXByZXNlbnRzIHdoYXQgaXMgcmVxdWlyZWQgdG8gdHVybiBhbiBvdXRnb2luZyBNZXNzYWdlIGludG8gSnNvblxuLy8gaW5jbHVkaW5nIGVuY3J5cHRpb24gYW5kIGRhdGUgc2V0dGluZy5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlU3RhbXAge1xuICAgIGNvbnN0cnVjdG9yKHBvc0lkLCBzZWNyZXRzLCBzZXJ2ZXJUaW1lRGVsdGEpIHtcbiAgICAgICAgdGhpcy5Qb3NJZCA9IHBvc0lkO1xuICAgICAgICB0aGlzLlNlY3JldHMgPSBzZWNyZXRzO1xuICAgICAgICB0aGlzLlNlcnZlclRpbWVEZWx0YSA9IHNlcnZlclRpbWVEZWx0YTtcbiAgICB9XG59XG5cbi8vIDxzdW1tYXJ5PlxuLy8gTWVzc2FnZUVudmVsb3BlIHJlcHJlc2VudHMgdGhlIG91dGVyIHN0cnVjdHVyZSBvZiBhbnkgbWVzc2FnZSB0aGF0IGlzIGV4Y2hhbmdlZFxuLy8gYmV0d2VlbiB0aGUgUG9zIGFuZCB0aGUgUGluUGFkIGFuZCB2aWNlLXZlcnNhLlxuLy8gU2VlIGh0dHA6Ly93d3cuc2ltcGxlcGF5bWVudGFwaS5jb20vIy9hcGkvbWVzc2FnZS1lbmNyeXB0aW9uXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgTWVzc2FnZUVudmVsb3BlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBlbmMsIGhtYWMsIHBvc0lkKSB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgTWVzc2FnZSBmaWVsZCBpcyBzZXQgb25seSB3aGVuIGluIFVuLWVuY3J5cHRlZCBmb3JtLlxuICAgICAgICAvLyBJbiBmYWN0IGl0IGlzIHRoZSBvbmx5IGZpZWxkIGluIGFuIGVudmVsb3BlIGluIHRoZSBVbi1FbmNyeXB0ZWQgZm9ybS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgZW5jIGZpZWxkIGlzIHNldCBvbmx5IHdoZW4gaW4gRW5jcnlwdGVkIGZvcm0uXG4gICAgICAgIC8vIEl0IGNvbnRhaW5zIHRoZSBlbmNyeXB0ZWQgSnNvbiBvZiBhbm90aGVyIE1lc3NhZ2VFbnZlbG9wZSBcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkVuYyA9IGVuYztcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIGhtYWMgZmllbGQgaXMgc2V0IG9ubHkgd2hlbiBpbiBFbmNyeXB0ZWQgZm9ybS5cbiAgICAgICAgLy8gSXQgaXMgdGhlIHNpZ25hdHVyZSBvZiB0aGUgXCJlbmNcIiBmaWVsZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkhtYWMgPSBobWFjO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgcG9zX2lkIGZpZWxkIGlzIG9ubHkgZmlsbGVkIGZvciBvdXRnb2luZyBFbmNyeXB0ZWQgbWVzc2FnZXMuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Qb3NJZCA9IHBvc0lkO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuTWVzc2FnZSxcbiAgICAgICAgICAgIGVuYzogdGhpcy5FbmMsXG4gICAgICAgICAgICBobWFjOiB0aGlzLkhtYWMsXG4gICAgICAgICAgICBwb3NfaWQ6IHRoaXMuUG9zSWRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gPHN1bW1hcnk+XG4vLyBNZXNzYWdlIHJlcHJlc2VudHMgdGhlIGNvbnRlbnRzIG9mIGEgTWVzc2FnZS5cbi8vIFNlZSBodHRwOi8vd3d3LnNpbXBsZXBheW1lbnRhcGkuY29tLyMvYXBpL21lc3NhZ2UtZW5jcnlwdGlvblxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBldmVudE5hbWUsIGRhdGEsIG5lZWRzRW5jcnlwdGlvbikge1xuICAgICAgICB0aGlzLklkID0gaWQ7XG4gICAgICAgIHRoaXMuRXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0aGlzLkRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLkRhdGVUaW1lU3RhbXAgPSAnJztcbiAgICAgICAgdGhpcy5Qb3NJZCA9ICcnOyAvLyBQb3NfaWQgaXMgc2V0IGhlcmUgb25seSBmb3Igb3V0Z29pbmcgVW4tZW5jcnlwdGVkIG1lc3NhZ2VzLiBcbiAgICAgICAgdGhpcy5JbmNvbW1pbmdIbWFjID0gJyc7IC8vIFNvbWV0aW1lcyB0aGUgbG9naWMgYXJvdW5kIHRoZSBpbmNvbWluZyBtZXNzYWdlIG1pZ2h0IG5lZWQgYWNjZXNzIHRvIHRoZSBzdWduYXR1cmUsIGZvciBleGFtcGxlIGluIHRoZSBrZXlfY2hlY2suXG4gICAgICAgIHRoaXMuX25lZWRzRW5jcnlwdGlvbiA9IG5lZWRzRW5jcnlwdGlvbjsgLy8gRGVub3RlcyB3aGV0aGVyIGFuIG91dGdvaW5nIG1lc3NhZ2UgbmVlZHMgdG8gYmUgZW5jcnlwdGVkIGluIFRvSnNvbigpXG4gICAgICAgIHRoaXMuRGVjcnlwdGVkSnNvbiA9ICcnOyAvLyBTZXQgb24gYW4gaW5jb21pbmcgbWVzc2FnZSBqdXN0IHNvIHlvdSBjYW4gaGF2ZSBhIGxvb2sgYXQgd2hhdCBpdCBsb29rZWQgbGlrZSBpbiBpdHMganNvbiBmb3JtLlxuICAgIH1cblxuICAgIEdldFN1Y2Nlc3NTdGF0ZSgpIHtcbiAgICAgICAgaWYoIXRoaXMuRGF0YSB8fCB0eXBlb2YgdGhpcy5EYXRhLnN1Y2Nlc3MgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBTdWNjZXNzU3RhdGUuVW5rbm93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLkRhdGEuc3VjY2VzcyA/IFN1Y2Nlc3NTdGF0ZS5TdWNjZXNzIDogU3VjY2Vzc1N0YXRlLkZhaWxlZDtcbiAgICB9XG5cbiAgICBHZXRFcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuRGF0YS5lcnJvcl9yZWFzb24gPyB0aGlzLkRhdGEuZXJyb3JfcmVhc29uIDogXCJcIjtcbiAgICB9XG5cbiAgICBHZXRFcnJvckRldGFpbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuRGF0YS5lcnJvcl9kZXRhaWw7XG4gICAgfVxuXG4gICAgR2V0U2VydmVyVGltZURlbHRhKClcbiAgICB7XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBcbiAgICAgICAgLy8gU3RhbXAgZm9ybWF0OiAyMDE4LTA0LTE5VDAxOjQyOjM4LjI3OVxuICAgICAgICBsZXQgZHRzID0gdGhpcy5EYXRlVGltZVN0YW1wLnNwbGl0KC9bXFwtXFwrXFwuIDpUXS8pO1xuICAgICAgICBsZXQgbXNnVGltZSA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgLy8geWVhciwgbW9udGgsIGRhdGVcbiAgICAgICAgICAgIGR0c1swXSwgZHRzWzFdIC0gMSwgZHRzWzJdLFxuICAgICAgICAgICAgLy8gaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc1xuICAgICAgICAgICAgZHRzWzNdLCBkdHNbNF0sIGR0c1s1XSwgZHRzWzZdXG4gICAgICAgICkuZ2V0VGltZSgpOyAvLyBMb2NhbCB0aW1lIHpvbmVcblxuICAgICAgICByZXR1cm4gbXNnVGltZSAtIG5vdztcbiAgICB9XG5cbiAgICAvLyBIZWxwZXIgbWV0aG9kIHRvIHBhcnNlIGJhbmsgZGF0ZSBmb3JtYXQgMjAwNDIwMTggKGRkTU15eXl5KVxuICAgIHN0YXRpYyBQYXJzZUJhbmtEYXRlKGJhbmtEYXRlKSB7XG4gICAgICAgIGlmKGJhbmtEYXRlLmxlbmd0aCAhPT0gOCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGAke2JhbmtEYXRlLnN1YnN0cig0LDQpfS0ke2JhbmtEYXRlLnN1YnN0cigyLDIpfS0ke2JhbmtEYXRlLnN1YnN0cigwLDIpfWApO1xuICAgIH1cblxuICAgIC8vIFBhcnNlcyBhIGJhbmsgZGF0ZSAmIHRpbWUgc3RyIGZyb20gXCIwNU9jdDE3XCIgLyBcIjA1OjAwXCIgKFwiZGRNTU15eS9ISDptbVwiKSBpbnRvIGRhdGUgb2JqXG4gICAgc3RhdGljIFBhcnNlQmFua0RhdGVUaW1lU3RyKGRhdGUsIHRpbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGAke2RhdGUuc3Vic3RyKDAsMil9ICR7ZGF0ZS5zdWJzdHIoMiwzKX0gJHtkYXRlLnN1YnN0cig1LDIpfSAke3RpbWV9YCk7XG4gICAgfVxuXG4gICAgc3RhdGljIEZyb21Kc29uKG1zZ0pzb24sIHNlY3JldHMpIHtcbiAgICAgICAgbGV0IGVudiA9IEpTT04ucGFyc2UobXNnSnNvbik7XG5cbiAgICAgICAgaWYoZW52Lm1lc3NhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShlbnYubWVzc2FnZS5pZCwgZW52Lm1lc3NhZ2UuZXZlbnQsIGVudi5tZXNzYWdlLmRhdGEsIGZhbHNlKTtcbiAgICAgICAgICAgIG1lc3NhZ2UuRGVjcnlwdGVkSnNvbiA9IG1zZ0pzb247XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNyZXRzID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRoaXMgbWF5IGhhcHBlbiBpZiB3ZSBzb21laG93IHJlY2VpdmVkIGFuIGVuY3J5cHRlZCBtZXNzYWdlIGZyb20gZWZ0cG9zIGJ1dCB3ZSdyZSBub3QgY29uZmlnZXJlZCB3aXRoIHNlY3JldHMuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgaWYgd2UgY2FuY2VsIHRoZSBwYWlyaW5nIHByb2Nlc3MgYSBsaXR0bGUgbGF0ZSBpbiB0aGUgZ2FtZSBhbmQgd2UgZ2V0IGFuIGVuY3J5cHRlZCBrZXlfY2hlY2sgbWVzc2FnZSBhZnRlciB3ZSd2ZSBkcm9wcGVkIHRoZSBrZXlzLlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFwiVU5LTk9XTlwiLCBcIk5PU0VDUkVUU1wiLCBudWxsLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdHMgZW5jcnlwdGVkLCB2ZXJpZnkgc2lnXG4gICAgICAgIGxldCBzaWcgPSBDcnlwdG8uSG1hY1NpZ25hdHVyZShzZWNyZXRzLkhtYWNLZXksIGVudi5lbmMpO1xuICAgICAgICBpZiAoc2lnLnRvVXBwZXJDYXNlKCkgIT0gZW52LmhtYWMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShcIl9cIiwgRXZlbnRzLkludmFsaWRIbWFjU2lnbmF0dXJlLCBudWxsLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVjcnlwdGVkSnNvbiA9IENyeXB0by5BZXNEZWNyeXB0KHNlY3JldHMuRW5jS2V5LCBlbnYuZW5jKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY3J5cHRlZE1zZyA9IEpTT04ucGFyc2UoZGVjcnlwdGVkSnNvbik7XG5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGVjcnlwdGVkTXNnLm1lc3NhZ2UuaWQsIGRlY3J5cHRlZE1zZy5tZXNzYWdlLmV2ZW50LCBkZWNyeXB0ZWRNc2cubWVzc2FnZS5kYXRhLCB0cnVlKTtcblxuICAgICAgICAgICAgbWVzc2FnZS5EYXRlVGltZVN0YW1wID0gZGVjcnlwdGVkTXNnLm1lc3NhZ2UuZGF0ZXRpbWU7XG4gICAgICAgICAgICBtZXNzYWdlLlBvc0lkID0gZGVjcnlwdGVkTXNnLm1lc3NhZ2UucG9zX2lkO1xuICAgICAgICAgICAgbWVzc2FnZS5JbmNvbWluZ0htYWMgPSBlbnYuaG1hYzsgXG4gICAgICAgICAgICBtZXNzYWdlLkRlY3J5cHRlZEpzb24gPSBkZWNyeXB0ZWRKc29uO1xuXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcblxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShcIlVOS05PV05cIiwgXCJVTlBBUlNFQUJMRVwiLCB7XCJtc2dcIjogZGVjcnlwdGVkSnNvbn0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFRvSnNvbihzdGFtcCkge1xuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHR6b2Zmc2V0ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAgKiAxMDAwO1xuICAgICAgICBsZXQgYWRqdXN0ZWRUaW1lID0gbmV3IERhdGUobm93IC0gdHpvZmZzZXQgKyBzdGFtcC5TZXJ2ZXJUaW1lRGVsdGEpO1xuXG4gICAgICAgIC8vIEZvcm1hdCBkYXRlOiBcInl5eXktTU0tZGRUSEg6bW06c3MuZmZmXCJcbiAgICAgICAgdGhpcy5EYXRlVGltZVN0YW1wID0gYWRqdXN0ZWRUaW1lLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwtMSk7XG4gICAgICAgIHRoaXMuUG9zSWQgPSBzdGFtcC5Qb3NJZDtcbiAgICAgICAgXG4gICAgICAgIHZhciBlbnZlbG9wZSA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5JZCxcbiAgICAgICAgICAgICAgICBldmVudDogdGhpcy5FdmVudE5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5EYXRhLFxuICAgICAgICAgICAgICAgIGRhdGV0aW1lOiB0aGlzLkRhdGVUaW1lU3RhbXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuX25lZWRzRW5jcnlwdGlvbikge1xuICAgICAgICAgICAgLy8gVW5lbmNyeXB0ZWQgTWVzc2FnZXMgbmVlZCBQb3NJRCBpbnNpZGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIGVudmVsb3BlLm1lc3NhZ2UucG9zX2lkID0gdGhpcy5Qb3NJZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuRGVjcnlwdGVkSnNvbiA9IEpTT04uc3RyaW5naWZ5KGVudmVsb3BlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX25lZWRzRW5jcnlwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuRGVjcnlwdGVkSnNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbmNNc2cgPSBDcnlwdG8uQWVzRW5jcnlwdChzdGFtcC5TZWNyZXRzLkVuY0tleSwgdGhpcy5EZWNyeXB0ZWRKc29uKTtcbiAgICAgICAgbGV0IGhtYWNTaWcgPSBDcnlwdG8uSG1hY1NpZ25hdHVyZShzdGFtcC5TZWNyZXRzLkhtYWNLZXksIGVuY01zZyk7XG4gICAgICAgIGxldCBlbmNyTWVzc2FnZUVudmVsb3BlID0ge2VuYzogZW5jTXNnLCBobWFjOiBobWFjU2lnLnRvVXBwZXJDYXNlKCksIHBvc19pZDogc3RhbXAuUG9zSWR9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbmNyTWVzc2FnZUVudmVsb3BlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50cywgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuXG4vLyA8c3VtbWFyeT5cbi8vIFBhaXJpbmcgSW50ZXJhY3Rpb24gMTogT3V0Z29pbmdcbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBQYWlyUmVxdWVzdCB7XG4gICAgVG9NZXNzYWdlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtwYWRkaW5nOiB0cnVlfTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByXCIpLCBFdmVudHMuUGFpclJlcXVlc3QsIGRhdGEsIGZhbHNlKTtcbiAgICB9XG59XG5cbi8vIFBhaXJpbmcgSW50ZXJhY3Rpb24gMjogSW5jb21pbmdcbmV4cG9ydCBjbGFzcyBLZXlSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcihtKSB7XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5BZW5jID0gbS5EYXRhLmVuYy5BO1xuICAgICAgICB0aGlzLkFobWFjID0gbS5EYXRhLmhtYWMuQTtcbiAgICB9XG59XG5cbi8vIFBhaXJpbmcgSW50ZXJhY3Rpb24gMzogT3V0Z29pbmdcbmV4cG9ydCBjbGFzcyBLZXlSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdElkLCBCZW5jLCBCaG1hYykge1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IHJlcXVlc3RJZDtcbiAgICAgICAgdGhpcy5CZW5jID0gQmVuYztcbiAgICAgICAgdGhpcy5CaG1hYyA9IEJobWFjO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBlbmM6IHtcbiAgICAgICAgICAgICAgICBCOiB0aGlzLkJlbmNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBobWFjOiB7XG4gICAgICAgICAgICAgICAgQjogdGhpcy5CaG1hY1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZSh0aGlzLlJlcXVlc3RJZCwgRXZlbnRzLktleVJlc3BvbnNlLCBkYXRhLCBmYWxzZSk7XG4gICAgfVxufVxuXG4vLyBQYWlyaW5nIEludGVyYWN0aW9uIDQ6IEluY29taW5nXG5leHBvcnQgY2xhc3MgS2V5Q2hlY2sge1xuICAgIGNvbnN0cnVjdG9yKG0pIHtcbiAgICAgICAgdGhpcy5Db25maXJtYXRpb25Db2RlID0gbS5JbmNvbWluZ0htYWMuc3Vic3RyaW5nKDAsNik7XG4gICAgfVxufVxuXG4vLyBQYWlyaW5nIEludGVyYWN0aW9uIDU6IEluY29taW5nXG5leHBvcnQgY2xhc3MgUGFpclJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihtKSB7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uRGF0YS5zdWNjZXNzO1xuICAgIH1cbn1cblxuLy8gSG9sZGVyIGNsYXNzIGZvciBTZWNyZXRzIGFuZCBLZXlSZXNwb25zZSwgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gdG9nZXRoZXIgaW4gbWV0aG9kIHNpZ25hdHVyZXMuXG5leHBvcnQgY2xhc3MgU2VjcmV0c0FuZEtleVJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihzZWNyZXRzLCBrZXlSZXNwb25zZSkge1xuICAgICAgICB0aGlzLlNlY3JldHMgPSBzZWNyZXRzO1xuICAgICAgICB0aGlzLktleVJlc3BvbnNlID0ga2V5UmVzcG9uc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHJvcEtleXNSZXF1ZXN0XG57XG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJkcnBreXNcIiksIEV2ZW50cy5Ecm9wS2V5c0FkdmljZSwgbnVsbCwgdHJ1ZSk7XG4gICAgfVxufSIsImltcG9ydCB7RXZlbnRzLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7UHVyY2hhc2VSZXNwb25zZX0gZnJvbSAnLi9QdXJjaGFzZSc7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gVGhpcyBjbGFzcyByZXByZXNlbnRzIHRoZSBCaWxsRGV0YWlscyB0aGF0IHRoZSBQT1Mgd2lsbCBiZSBhc2tlZCBmb3IgdGhyb3VnaG91dCBhIFBheUF0VGFibGUgZmxvdy5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBCaWxsU3RhdHVzUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFNldCB0aGlzIEVycm9yIGFjY29yZGluZ2x5IGlmIHlvdSBhcmUgbm90IGFibGUgdG8gcmV0dXJuIHRoZSBCaWxsRGV0YWlscyB0aGF0IHdlcmUgYXNrZWQgZnJvbSB5b3UuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5SZXN1bHQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoaXMgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IHlvdSBhc3NpZ24gdG8gZWFjaCBiaWxsLlxuICAgICAgICAvLyBJdCBtaWd0IGJlIGZvciBleGFtcGxlLCB0aGUgdGltZXN0YW1wIG9mIHdoZW4gdGhlIGNvdmVyIHdhcyBvcGVuZWQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5CaWxsSWQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIHRhYmxlIGlkIHRoYXQgdGhpcyBiaWxsIHdhcyBmb3IuXG4gICAgICAgIC8vIFRoZSB3YWl0ZXIgd2lsbCBlbnRlciBpdCBvbiB0aGUgRWZ0cG9zIGF0IHRoZSBzdGFydCBvZiB0aGUgUGF5QXRUYWJsZSBmbG93IGFuZCB0aGUgRWZ0cG9zIHdpbGwgXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBiaWxsIHVzaW5nIHRoZSB0YWJsZSBpZC4gXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5UYWJsZUlkID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgVG90YWwgQW1vdW50IG9uIHRoaXMgYmlsbCwgaW4gY2VudHMuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Ub3RhbEFtb3VudCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIGN1cnJlbnRseSBvdXRzYW5kaW5nIGFtb3VudCBvbiB0aGlzIGJpbGwsIGluIGNlbnRzLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuT3V0c3RhbmRpbmdBbW91bnQgPSAwO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBZb3VyIFBPUyBpcyByZXF1aXJlZCB0byBwZXJzaXN0IHNvbWUgc3RhdGUgb24gYmVoYWxmIG9mIHRoZSBFZnRwb3Mgc28gdGhlIEVmdHBvcyBjYW4gcmVjb3ZlciBzdGF0ZS5cbiAgICAgICAgLy8gSXQgaXMganVzdCBhIHBpZWNlIG9mIHN0cmluZyB0aGF0IHlvdSBzYXZlIGFnYWluc3QgeW91ciBiaWxsSWQuXG4gICAgICAgIC8vIFdIZW5ldmVyIHlvdSdyZSBhc2tlZCBmb3IgQmlsbERldGFpbHMsIG1ha2Ugc3VyZSB5b3UgcmV0dXJuIHRoaXMgcGllY2Ugb2YgZGF0YSBpZiB5b3UgaGF2ZSBpdC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkJpbGxEYXRhID0gXCJcIjtcbiAgICB9XG5cbiAgICBnZXRCaWxsUGF5bWVudEhpc3RvcnkoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLkJpbGxEYXRhKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBiaWxsUGF5bWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgbGV0IHNhdmVkQmlsbERhdGEgPSBKU09OLnBhcnNlKHRoaXMuQmlsbERhdGEpO1xuXG4gICAgICAgIHJldHVybiBzYXZlZEJpbGxEYXRhLm1hcCgoYmlsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQYXltZW50SGlzdG9yeUVudHJ5KGJpbGwucGF5bWVudF90eXBlLCBiaWxsLnBheW1lbnRfc3VtbWFyeSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBUb0JpbGxEYXRhKHBoKVxuICAgIHtcbiAgICAgICAgaWYgKHBoLmxlbmd0aCA8IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHBoKTtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKG1lc3NhZ2VJZClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJzdWNjZXNzXCI6IHRoaXMuUmVzdWx0PT1CaWxsUmV0cmlldmFsUmVzdWx0LlNVQ0NFU1NcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLkJpbGxJZCkgZGF0YS5iaWxsX2lkID0gdGhpcy5CaWxsSWQ7XG4gICAgICAgIGlmICh0aGlzLlRhYmxlSWQpIGRhdGEudGFibGVfaWQgPSB0aGlzLlRhYmxlSWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuUmVzdWx0ID09IEJpbGxSZXRyaWV2YWxSZXN1bHQuU1VDQ0VTUylcbiAgICAgICAge1xuICAgICAgICAgICAgZGF0YS5iaWxsX3RvdGFsX2Ftb3VudCA9IHRoaXMuVG90YWxBbW91bnQ7XG4gICAgICAgICAgICBkYXRhLmJpbGxfb3V0c3RhbmRpbmdfYW1vdW50ID0gdGhpcy5PdXRzdGFuZGluZ0Ftb3VudDtcbiAgICAgICAgICAgIGRhdGEuYmlsbF9wYXltZW50X2hpc3RvcnkgPSB0aGlzLmdldEJpbGxQYXltZW50SGlzdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGF0YS5lcnJvcl9yZWFzb24gPSB0aGlzLlJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgZGF0YS5lcnJvcl9kZXRhaWwgPSB0aGlzLlJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKG1lc3NhZ2VJZCwgRXZlbnRzLlBheUF0VGFibGVCaWxsRGV0YWlscywgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQmlsbFJldHJpZXZhbFJlc3VsdCA9IFxue1xuICAgIFNVQ0NFU1M6ICdTVUNDRVNTJyxcbiAgICBJTlZBTElEX1RBQkxFX0lEOiAnSU5WQUxJRF9UQUJMRV9JRCcsXG4gICAgSU5WQUxJRF9CSUxMX0lEOiAnSU5WQUxJRF9CSUxMX0lEJyxcbiAgICBJTlZBTElEX09QRVJBVE9SX0lEOiAnSU5WQUxJRF9PUEVSQVRPUl9JRCdcbn07XG5cbmV4cG9ydCBjb25zdCBQYXltZW50VHlwZSA9IFxue1xuICAgIENBUkQ6ICdDQVJEJyxcbiAgICBDQVNIOiAnQ0FTSCcgXG59O1xuXG5leHBvcnQgY2xhc3MgQmlsbFBheW1lbnRcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5faW5jb21pbmdBZHZpY2UgPSBtO1xuICAgICAgICB0aGlzLkJpbGxJZCA9IHRoaXMuX2luY29taW5nQWR2aWNlLkRhdGFbXCJiaWxsX2lkXCJdO1xuICAgICAgICB0aGlzLlRhYmxlSWQgPSB0aGlzLl9pbmNvbWluZ0FkdmljZS5EYXRhW1widGFibGVfaWRcIl07XG4gICAgICAgIHRoaXMuT3BlcmF0b3JJZCA9IHRoaXMuX2luY29taW5nQWR2aWNlLkRhdGFbXCJvcGVyYXRvcl9pZFwiXTtcbiAgICAgICAgXG4gICAgICAgIHZhciBwdCA9IHRoaXMuX2luY29taW5nQWR2aWNlLkRhdGFbXCJwYXltZW50X3R5cGVcIl07XG4gICAgICAgIHRoaXMuUGF5bWVudFR5cGUgPSBwdDtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMgaXMgd2hlbiB3ZSBwbHkgdGhlIHN1YiBvYmplY3QgXCJwYXltZW50X2RldGFpbHNcIiBpbnRvIGEgcHVyY2hhc2UgcmVzcG9uc2UgZm9yIGNvbnZlbmllbmNlLlxuICAgICAgICB2YXIgcHVyY2hhc2VNc2cgPSBuZXcgTWVzc2FnZShtLklkLCBcInBheW1lbnRfZGV0YWlsc1wiLCBtLkRhdGFbXCJwYXltZW50X2RldGFpbHNcIl0sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5QdXJjaGFzZVJlc3BvbnNlID0gbmV3IFB1cmNoYXNlUmVzcG9uc2UocHVyY2hhc2VNc2cpO1xuXG4gICAgICAgIHRoaXMuUHVyY2hhc2VBbW91bnQgPSB0aGlzLlB1cmNoYXNlUmVzcG9uc2UuR2V0UHVyY2hhc2VBbW91bnQoKTtcbiAgICAgICAgdGhpcy5UaXBBbW91bnQgPSB0aGlzLlB1cmNoYXNlUmVzcG9uc2UuR2V0VGlwQW1vdW50KCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF5bWVudEhpc3RvcnlFbnRyeVxue1xuICAgIGNvbnN0cnVjdG9yKHBheW1lbnRUeXBlLCBwYXltZW50U3VtbWFyeSlcbiAgICB7XG4gICAgICAgIHRoaXMuUGF5bWVudFR5cGUgPSBwYXltZW50VHlwZTtcbiAgICAgICAgdGhpcy5QYXltZW50U3VtbWFyeSA9IHBheW1lbnRTdW1tYXJ5O1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBheW1lbnRfdHlwZTogdGhpcy5QYXltZW50VHlwZSxcbiAgICAgICAgICAgIHBheW1lbnRfc3VtbWFyeTogdGhpcy5QYXltZW50U3VtbWFyeVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbFJlZklkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLlBheW1lbnRTdW1tYXJ5W1widGVybWluYWxfcmVmX2lkXCJdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBheUF0VGFibGVDb25maWdcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5QYXlBdFRhYmxlZEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5PcGVyYXRvcklkRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLlNwbGl0QnlBbW91bnRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuRXF1YWxTcGxpdEVuYWJsZWQgPSBmYWxzZTtcbiAgICBcbiAgICAgICAgdGhpcy5UaXBwaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIFxuICAgICAgICB0aGlzLlN1bW1hcnlSZXBvcnRFbmFibGVkID0gZmFsc2U7XG4gICAgXG4gICAgICAgIHRoaXMuTGFiZWxQYXlCdXR0b24gPSAnJztcbiAgICAgICAgdGhpcy5MYWJlbE9wZXJhdG9ySWQgPSAnJztcbiAgICAgICAgdGhpcy5MYWJlbFRhYmxlSWQgPSAnJztcbiAgICBcbiAgICAgICAgLy8gXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBGaWxsIGluIHdpdGggb3BlcmF0b3IgaWRzIHRoYXQgdGhlIGVmdHBvcyB0ZXJtaW5hbCB3aWxsIHZhbGlkYXRlIGFnYWluc3QuIFxuICAgICAgICAvLyBMZWF2ZSBFbXB0eSB0byBhbGxvdyBhbnkgb3BlcmF0b3JfaWQgdGhyb3VnaC4gXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICB0aGlzLkFsbG93ZWRPcGVyYXRvcklkcyA9IFtdO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZShtZXNzYWdlSWQpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicGF5X2F0X3RhYmxlX2VuYWJsZWRcIjogdGhpcy5QYXlBdFRhYmxlZEVuYWJsZWQsXG4gICAgICAgICAgICBcIm9wZXJhdG9yX2lkX2VuYWJsZWRcIjogdGhpcy5PcGVyYXRvcklkRW5hYmxlZCxcbiAgICAgICAgICAgIFwic3BsaXRfYnlfYW1vdW50X2VuYWJsZWRcIjogdGhpcy5TcGxpdEJ5QW1vdW50RW5hYmxlZCxcbiAgICAgICAgICAgIFwiZXF1YWxfc3BsaXRfZW5hYmxlZFwiOiB0aGlzLkVxdWFsU3BsaXRFbmFibGVkLFxuICAgICAgICAgICAgXCJ0aXBwaW5nX2VuYWJsZWRcIjogdGhpcy5UaXBwaW5nRW5hYmxlZCxcbiAgICAgICAgICAgIFwic3VtbWFyeV9yZXBvcnRfZW5hYmxlZFwiOiB0aGlzLlN1bW1hcnlSZXBvcnRFbmFibGVkLFxuICAgICAgICAgICAgXCJwYXlfYnV0dG9uX2xhYmVsXCI6IHRoaXMuTGFiZWxQYXlCdXR0b24sXG4gICAgICAgICAgICBcIm9wZXJhdG9yX2lkX2xhYmVsXCI6IHRoaXMuTGFiZWxPcGVyYXRvcklkLFxuICAgICAgICAgICAgXCJ0YWJsZV9pZF9sYWJlbFwiOiB0aGlzLkxhYmVsVGFibGVJZCxcbiAgICAgICAgICAgIFwib3BlcmF0b3JfaWRfbGlzdFwiOiB0aGlzLkFsbG93ZWRPcGVyYXRvcklkc1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShtZXNzYWdlSWQsIEV2ZW50cy5QYXlBdFRhYmxlU2V0VGFibGVDb25maWcsIGRhdGEsIHRydWUpO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgRmVhdHVyZURpc2FibGVNZXNzYWdlKG1lc3NhZ2VJZCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicGF5X2F0X3RhYmxlX2VuYWJsZWRcIjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKG1lc3NhZ2VJZCwgRXZlbnRzLlBheUF0VGFibGVTZXRUYWJsZUNvbmZpZywgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG4gICAgIiwiaW1wb3J0IHtSZXF1ZXN0SWRIZWxwZXJ9IGZyb20gJy4vUmVxdWVzdElkSGVscGVyJztcbmltcG9ydCB7RXZlbnRzLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcblxuZXhwb3J0IGNsYXNzIFBvbmdIZWxwZXJcbntcbiAgICBzdGF0aWMgR2VuZXJhdGVQb25nUmVzc3BvbnNlKHBpbmcpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UocGluZy5JZCwgRXZlbnRzLlBvbmcsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBpbmdIZWxwZXJcbntcbiAgICBzdGF0aWMgR2VuZXJhdGVQaW5nUmVxdWVzdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicGluZ1wiKSwgRXZlbnRzLlBpbmcsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IHtQdXJjaGFzZVJlc3BvbnNlfSBmcm9tICcuL1B1cmNoYXNlJztcblxuZXhwb3J0IGNvbnN0IFByZWF1dGhFdmVudHMgPSBcbntcbiAgICBBY2NvdW50VmVyaWZ5UmVxdWVzdDogXCJhY2NvdW50X3ZlcmlmeVwiLFxuICAgIEFjY291bnRWZXJpZnlSZXNwb25zZTogXCJhY2NvdW50X3ZlcmlmeV9yZXNwb25zZVwiLFxuICAgIFxuICAgIFByZWF1dGhPcGVuUmVxdWVzdCA6IFwicHJlYXV0aFwiLFxuICAgIFByZWF1dGhPcGVuUmVzcG9uc2UgOiBcInByZWF1dGhfcmVzcG9uc2VcIixcblxuICAgIFByZWF1dGhUb3B1cFJlcXVlc3Q6IFwicHJlYXV0aF90b3B1cFwiLFxuICAgIFByZWF1dGhUb3B1cFJlc3BvbnNlOiBcInByZWF1dGhfdG9wdXBfcmVzcG9uc2VcIixcblxuICAgIFByZWF1dGhFeHRlbmRSZXF1ZXN0OiBcInByZWF1dGhfZXh0ZW5kXCIsXG4gICAgUHJlYXV0aEV4dGVuZFJlc3BvbnNlOiBcInByZWF1dGhfZXh0ZW5kX3Jlc3BvbnNlXCIsXG5cbiAgICBQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QgOiBcInByZWF1dGhfcGFydGlhbF9jYW5jZWxsYXRpb25cIixcbiAgICBQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlc3BvbnNlIDogXCJwcmVhdXRoX3BhcnRpYWxfY2FuY2VsbGF0aW9uX3Jlc3BvbnNlXCIsXG4gICAgXG4gICAgUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QgOiBcInByZWF1dGhfY2FuY2VsbGF0aW9uXCIsXG4gICAgUHJlYXV0aENhbmNlbGxhdGlvblJlc3BvbnNlIDogXCJwcmVhdXRoX2NhbmNlbGxhdGlvbl9yZXNwb25zZVwiLFxuXG4gICAgUHJlYXV0aENvbXBsZXRlUmVxdWVzdCA6IFwiY29tcGxldGlvblwiLFxuICAgIFByZWF1dGhDb21wbGV0ZVJlc3BvbnNlIDogXCJjb21wbGV0aW9uX3Jlc3BvbnNlXCJcbn07XG5cbmV4cG9ydCBjbGFzcyBBY2NvdW50VmVyaWZ5UmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYXZcIiksIFByZWF1dGhFdmVudHMuQWNjb3VudFZlcmlmeVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjY291bnRWZXJpZnlSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLkRldGFpbHMgPSBuZXcgUHVyY2hhc2VSZXNwb25zZShtKTtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHRoaXMuRGV0YWlscy5Qb3NSZWZJZDtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aE9wZW5SZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IoYW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLlByZWF1dGhBbW91bnQgPSBhbW91bnRDZW50cztcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9hbW91bnRcIjogdGhpcy5QcmVhdXRoQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYWNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aE9wZW5SZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoVG9wdXBSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IocHJlYXV0aElkLCB0b3B1cEFtb3VudENlbnRzLCBwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHRoaXMuUHJlYXV0aElkID0gcHJlYXV0aElkO1xuICAgICAgICB0aGlzLlRvcHVwQW1vdW50ID0gdG9wdXBBbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkLFxuICAgICAgICAgICAgXCJ0b3B1cF9hbW91bnRcIjogdGhpcy5Ub3B1cEFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcnR1XCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhUb3B1cFJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgcGFydGlhbENhbmNlbGxhdGlvbkFtb3VudENlbnRzLCBwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHRoaXMuUHJlYXV0aElkID0gcHJlYXV0aElkO1xuICAgICAgICB0aGlzLlBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnQgPSBwYXJ0aWFsQ2FuY2VsbGF0aW9uQW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9pZFwiOiB0aGlzLlByZWF1dGhJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9jYW5jZWxfYW1vdW50XCI6IHRoaXMuUGFydGlhbENhbmNlbGxhdGlvbkFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcnBjXCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aEV4dGVuZFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihwcmVhdXRoSWQsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9pZFwiOiB0aGlzLlByZWF1dGhJZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcmV4dFwiKSwgUHJlYXV0aEV2ZW50cy5QcmVhdXRoRXh0ZW5kUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aENhbmNlbFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihwcmVhdXRoSWQsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9pZFwiOiB0aGlzLlByZWF1dGhJZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcmFjXCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhDYW5jZWxsYXRpb25SZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoQ29tcGxldGlvblJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihwcmVhdXRoSWQsIGNvbXBsZXRpb25BbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudClcbiAgICB7XG4gICAgICAgIHRoaXMuUHJlYXV0aElkID0gcHJlYXV0aElkO1xuICAgICAgICB0aGlzLkNvbXBsZXRpb25BbW91bnQgPSBjb21wbGV0aW9uQW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5TdXJjaGFyZ2VBbW91bnQgPSBzdXJjaGFyZ2VBbW91bnQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBcInByZWF1dGhfaWRcIjogdGhpcy5QcmVhdXRoSWQsXG4gICAgICAgICAgICBcImNvbXBsZXRpb25fYW1vdW50XCI6IHRoaXMuQ29tcGxldGlvbkFtb3VudCxcbiAgICAgICAgICAgIFwic3VyY2hhcmdlX2Ftb3VudFwiOiB0aGlzLlN1cmNoYXJnZUFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcmFjXCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhDb21wbGV0ZVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLlByZWF1dGhJZCA9IG0uRGF0YVtcInByZWF1dGhfaWRcIl07XG4gICAgICAgIHRoaXMuRGV0YWlscyA9IG5ldyBQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gdGhpcy5EZXRhaWxzLlBvc1JlZklkO1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICB9XG5cbiAgICBHZXRCYWxhbmNlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHZhciB0eFR5cGUgPSB0aGlzLl9tLkRhdGFbXCJ0cmFuc2FjdGlvbl90eXBlXCJdO1xuICAgICAgICBzd2l0Y2ggKHR4VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcInByZWF1dGhfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlRPUFVQXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbGFuY2VfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIkNBTkNFTFwiOiAvLyBQQVJUSUFMIENBTkNFTExBVElPTlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYWxhbmNlX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQUkUtQVVUSCBFWFRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFsYW5jZV9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiUENPTVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDsgLy8gQmFsYW5jZSBpcyAwIGFmdGVyIGNvbXBsZXRpb25cbiAgICAgICAgICAgIGNhc2UgXCJQUkUtQVVUSCBDQU5DRUxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDsgLy8gQmFsYW5jZSBpcyAwIGFmdGVyIGNhbmNlbGxhdGlvblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEdldFByZXZpb3VzQmFsYW5jZUFtb3VudCgpXG4gICAge1xuICAgICAgICB2YXIgdHhUeXBlID0gdGhpcy5fbS5EYXRhW1widHJhbnNhY3Rpb25fdHlwZVwiXTtcbiAgICAgICAgc3dpdGNoICh0eFR5cGUpXG4gICAgICAgIHsgICBcbiAgICAgICAgICAgIGNhc2UgXCJQUkUtQVVUSFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSBcIlRPUFVQXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImV4aXN0aW5nX3ByZWF1dGhfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIkNBTkNFTFwiOiAvLyBQQVJUSUFMIENBTkNFTExBVElPTlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJleGlzdGluZ19wcmVhdXRoX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQUkUtQVVUSCBFWFRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiZXhpc3RpbmdfcHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiUENPTVBcIjpcbiAgICAgICAgICAgICAgICAvLyBUSElTIElTIFRFQ0hOSUNBTExZIE5PVCBDT1JSRUNUIFdIRU4gQ09NUExFVElPTiBIQVBQRU5TIEZPUiBBIFBBUlRJQUwgQU1PVU5ULlxuICAgICAgICAgICAgICAgIC8vIEJVVCBVTkZPUlRVTkFURUxZLCBUSElTIFJFU1BPTlNFIERPRVMgTk9UIENPTlRBSU4gXCJleGlzdGluZ19wcmVhdXRoX2Ftb3VudFwiLlxuICAgICAgICAgICAgICAgIC8vIFNPIFwiY29tcGxldGlvbl9hbW91bnRcIiBJUyBUSEUgQ0xPU0VTVCBXRSBIQVZFLlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjb21wbGV0aW9uX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQUkUtQVVUSCBDQU5DRUxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wicHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEdldENvbXBsZXRpb25BbW91bnQoKVxuICAgIHtcbiAgICAgICAgdmFyIHR4VHlwZSA9IHRoaXMuX20uRGF0YVtcInRyYW5zYWN0aW9uX3R5cGVcIl07XG4gICAgICAgIHN3aXRjaCAodHhUeXBlKVxuICAgICAgICB7ICAgXG4gICAgICAgICAgICBjYXNlIFwiUENPTVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiY29tcGxldGlvbl9hbW91bnRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBHZXRTdXJjaGFyZ2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgdmFyIHR4VHlwZSA9IHRoaXMuX20uRGF0YVtcInRyYW5zYWN0aW9uX3R5cGVcIl07XG4gICAgICAgIHN3aXRjaCAodHhUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIFwiUENPTVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wic3VyY2hhcmdlX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiBUaGlzIGNsYXNzIGlzIGEgbW9jayBwcmludGVyIGZvciB0aGUgdGVybWluYWwgdG8gcHJpbnQgUmVjZWlwdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFByaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5idWZmZXIgICAgID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudCAgICA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpbnQoLi4uYXJncykge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGFyZ3Muam9pbignICcpKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuXG4gICAgX3JlbmRlcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuYnVmZmVyLmpvaW4oYFxcblxcbiBcXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC8gXFxuXFxuYCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cblxuICAgIENsZWFyKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG59IiwiaW1wb3J0IHtFdmVudHMsIFN1Y2Nlc3NTdGF0ZSwgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtTcGlDb25maWcsIFRyYW5zYWN0aW9uT3B0aW9uc30gZnJvbSAnLi9TcGlNb2RlbHMnO1xuXG5leHBvcnQgY2xhc3MgUHVyY2hhc2VSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQpIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLlB1cmNoYXNlQW1vdW50ID0gYW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuVGlwQW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy5DYXNob3V0QW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy5Qcm9tcHRGb3JDYXNob3V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3VyY2hhcmdlQW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcblxuICAgICAgICAvLyBMaWJyYXJ5IEJhY2t3YXJkcyBDb21wYXRpYmlsaXR5XG4gICAgICAgIHRoaXMuSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5BbW91bnRDZW50cyA9IGFtb3VudENlbnRzO1xuICAgIH1cblxuICAgIEFtb3VudFN1bW1hcnkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGBQdXJjaGFzZTogJHsodGhpcy5QdXJjaGFzZUFtb3VudCAvIDEwMC4wKS50b0ZpeGVkKDIpfTsgXG4gICAgICAgICAgICBUaXA6ICR7KHRoaXMuVGlwQW1vdW50IC8gMTAwLjApLnRvRml4ZWQoMil9OyBcbiAgICAgICAgICAgIENhc2hvdXQ6ICR7KHRoaXMuQ2FzaG91dEFtb3VudCAvIDEwMC4wKS50b0ZpeGVkKDIpfTtgO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgcHVyY2hhc2VfYW1vdW50OiB0aGlzLlB1cmNoYXNlQW1vdW50LFxuICAgICAgICAgICAgdGlwX2Ftb3VudDogdGhpcy5UaXBBbW91bnQsXG4gICAgICAgICAgICBjYXNoX2Ftb3VudDogdGhpcy5DYXNob3V0QW1vdW50LFxuICAgICAgICAgICAgcHJvbXB0X2Zvcl9jYXNob3V0OiB0aGlzLlByb21wdEZvckNhc2hvdXQsIFxuICAgICAgICAgICAgc3VyY2hhcmdlX2Ftb3VudDogdGhpcy5TdXJjaGFyZ2VBbW91bnRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLkNvbmZpZy5hZGRSZWNlaXB0Q29uZmlnKGRhdGEpO1xuICAgICAgICB0aGlzLk9wdGlvbnMuQWRkT3B0aW9ucyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByY2hzXCIpLCBFdmVudHMuUHVyY2hhc2VSZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQdXJjaGFzZVJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TY2hlbWVOYW1lID0gbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgICAgICB0aGlzLlNjaGVtZUFwcE5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0UlJOKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucnJuO1xuICAgIH1cblxuICAgIEdldFB1cmNoYXNlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucHVyY2hhc2VfYW1vdW50O1xuICAgIH1cblxuICAgIEdldFRpcEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRpcF9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0U3VyY2hhcmdlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuc3VyY2hhcmdlX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRDYXNob3V0QW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY2FzaF9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0QmFua05vbkNhc2hBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5iYW5rX25vbmNhc2hfYW1vdW50O1xuICAgIH1cblxuICAgIEdldEJhbmtDYXNoQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua19jYXNoX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRDdXN0b21lclJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jdXN0b21lcl9yZWNlaXB0IHx8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0TWVyY2hhbnRSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEubWVyY2hhbnRfcmVjZWlwdCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfY29kZTtcbiAgICB9XG4gICAgXG4gICAgR2V0VGVybWluYWxSZWZlcmVuY2VJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX3JlZl9pZDtcbiAgICB9XG5cbiAgICBHZXRDYXJkRW50cnkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jYXJkX2VudHJ5O1xuICAgIH1cbiAgICBcbiAgICBHZXRBY2NvdW50VHlwZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY291bnRfdHlwZTtcbiAgICB9XG5cbiAgICBHZXRBdXRoQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmF1dGhfY29kZTtcbiAgICB9XG5cbiAgICBHZXRCYW5rRGF0ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfZGF0ZTtcbiAgICB9XG5cbiAgICBHZXRCYW5rVGltZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfdGltZTtcbiAgICB9XG4gICAgXG4gICAgR2V0TWFza2VkUGFuKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEubWFza2VkX3BhbjtcbiAgICB9XG4gICAgXG4gICAgR2V0VGVybWluYWxJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX2lkO1xuICAgIH1cblxuICAgIFdhc01lcmNoYW50UmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0X3ByaW50ZWQ7XG4gICAgfVxuXG4gICAgV2FzQ3VzdG9tZXJSZWNlaXB0UHJpbnRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHRfcHJpbnRlZDtcbiAgICB9XG4gICAgXG4gICAgR2V0U2V0dGxlbWVudERhdGUoKVxuICAgIHtcbiAgICAgICAgLy9cImJhbmtfc2V0dGxlbWVudF9kYXRlXCI6XCIyMDA0MjAxOFwiXG4gICAgICAgIHZhciBkYXRlU3RyID0gdGhpcy5fbS5EYXRhLmJhbmtfc2V0dGxlbWVudF9kYXRlO1xuICAgICAgICBpZiAoIWRhdGVTdHIpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlKGRhdGVTdHIpO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlVmFsdWUoYXR0cmlidXRlKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVthdHRyaWJ1dGVdO1xuICAgIH1cblxuICAgIFRvUGF5bWVudFN1bW1hcnkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjY291bnRfdHlwZTogdGhpcy5HZXRBY2NvdW50VHlwZSgpLFxuICAgICAgICAgICAgYXV0aF9jb2RlOiB0aGlzLkdldEF1dGhDb2RlKCksXG4gICAgICAgICAgICBiYW5rX2RhdGU6IHRoaXMuR2V0QmFua0RhdGUoKSxcbiAgICAgICAgICAgIGJhbmtfdGltZTogdGhpcy5HZXRCYW5rVGltZSgpLFxuICAgICAgICAgICAgaG9zdF9yZXNwb25zZV9jb2RlOiB0aGlzLkdldFJlc3BvbnNlQ29kZSgpLFxuICAgICAgICAgICAgaG9zdF9yZXNwb25zZV90ZXh0OiB0aGlzLkdldFJlc3BvbnNlVGV4dCgpLFxuICAgICAgICAgICAgbWFza2VkX3BhbjogdGhpcy5HZXRNYXNrZWRQYW4oKSxcbiAgICAgICAgICAgIHB1cmNoYXNlX2Ftb3VudDogdGhpcy5HZXRQdXJjaGFzZUFtb3VudCgpLFxuICAgICAgICAgICAgcnJuOiB0aGlzLkdldFJSTigpLFxuICAgICAgICAgICAgc2NoZW1lX25hbWU6IHRoaXMuU2NoZW1lTmFtZSxcbiAgICAgICAgICAgIHRlcm1pbmFsX2lkOiB0aGlzLkdldFRlcm1pbmFsSWQoKSxcbiAgICAgICAgICAgIHRlcm1pbmFsX3JlZl9pZDogdGhpcy5HZXRUZXJtaW5hbFJlZmVyZW5jZUlkKCksXG4gICAgICAgICAgICB0aXBfYW1vdW50OiB0aGlzLkdldFRpcEFtb3VudCgpLFxuICAgICAgICAgICAgc3VyY2hhcmdlX2Ftb3VudDogdGhpcy5HZXRTdXJjaGFyZ2VBbW91bnQoKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdFxue1xuICAgIFxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiY3R4XCIpLCBFdmVudHMuQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0LCBudWxsLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gdGhpcy5fbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IHRoaXMuX20uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0RXJyb3JSZWFzb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5lcnJvcl9yZWFzb247XG4gICAgfVxuXG4gICAgR2V0RXJyb3JEZXRhaWwoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5lcnJvcl9kZXRhaWw7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VWYWx1ZVdpdGhBdHRyaWJ1dGUoYXR0cmlidXRlKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVthdHRyaWJ1dGVdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3RcbntcbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcImdsdFwiKSwgRXZlbnRzLkdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgIH1cblxuICAgIFdhc1JldHJpZXZlZFN1Y2Nlc3NmdWxseSgpXG4gICAge1xuICAgICAgICAvLyBXZSBjYW4ndCByZWx5IG9uIGNoZWNraW5nIFwic3VjY2Vzc1wiIGZsYWcgb3IgXCJlcnJvclwiIGZpZWxkcyBoZXJlLFxuICAgICAgICAvLyBhcyByZXRyaWV2YWwgbWF5IGJlIHN1Y2Nlc3NmdWwsIGJ1dCB0aGUgcmV0cmlldmVkIHRyYW5zYWN0aW9uIHdhcyBhIGZhaWwuXG4gICAgICAgIC8vIFNvIHdlIGNoZWNrIGlmIHdlIGdvdCBiYWNrIGFuIFJlc3BvbnNlQ29kZS5cbiAgICAgICAgLy8gKGFzIG9wcG9zZWQgdG8gc2F5IGFuIG9wZXJhdGlvbl9pbl9wcm9ncmVzc19lcnJvcilcbiAgICAgICAgcmV0dXJuICEhdGhpcy5HZXRSZXNwb25zZUNvZGUoKTtcbiAgICB9XG5cbiAgICBXYXNUaW1lT3V0T2ZTeW5jRXJyb3IoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0RXJyb3IoKS5zdGFydHNXaXRoKFwiVElNRV9PVVRfT0ZfU1lOQ1wiKTtcbiAgICB9XG5cbiAgICBXYXNPcGVyYXRpb25JblByb2dyZXNzRXJyb3IoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0RXJyb3IoKS5zdGFydHNXaXRoKFwiT1BFUkFUSU9OX0lOX1BST0dSRVNTXCIpO1xuICAgIH1cblxuICAgIElzV2FpdGluZ0ZvclNpZ25hdHVyZVJlc3BvbnNlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkdldEVycm9yKCkuc3RhcnRzV2l0aChcIk9QRVJBVElPTl9JTl9QUk9HUkVTU19BV0FJVElOR19TSUdOQVRVUkVcIik7XG4gICAgfVxuXG4gICAgSXNXYWl0aW5nRm9yQXV0aENvZGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0RXJyb3IoKS5zdGFydHNXaXRoKFwiT1BFUkFUSU9OX0lOX1BST0dSRVNTX0FXQUlUSU5HX1BIT05FX0FVVEhfQ09ERVwiKTtcbiAgICB9XG4gICAgXG4gICAgSXNTdGlsbEluUHJvZ3Jlc3MocG9zUmVmSWQpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5XYXNPcGVyYXRpb25JblByb2dyZXNzRXJyb3IoKSAmJiB0aGlzLkdldFBvc1JlZklkKCkgPT0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgR2V0U3VjY2Vzc1N0YXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkdldFN1Y2Nlc3NTdGF0ZSgpO1xuICAgIH1cblxuICAgIFdhc1N1Y2Nlc3NmdWxUeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRUeFR5cGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50cmFuc2FjdGlvbl90eXBlO1xuICAgIH1cblxuICAgIEdldFBvc1JlZklkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucG9zX3JlZl9pZDtcbiAgICB9XG5cbiAgICBHZXRTY2hlbWVBcHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICB9XG5cbiAgICBHZXRTY2hlbWVOYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgfVxuXG4gICAgR2V0QW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYW1vdW50X3B1cmNoYXNlO1xuICAgIH1cblxuICAgIEdldFRyYW5zYWN0aW9uQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYW1vdW50X3RyYW5zYWN0aW9uX3R5cGU7XG4gICAgfVxuXG4gICAgR2V0QmFua0RhdGVUaW1lU3RyaW5nKClcbiAgICB7XG4gICAgICAgIHZhciBkcyA9IHRoaXMuX20uRGF0YS5iYW5rX2RhdGUgKyB0aGlzLl9tLkRhdGEuYmFua190aW1lO1xuICAgICAgICByZXR1cm4gZHM7XG4gICAgfVxuXG4gICAgR2V0UlJOKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucnJuO1xuICAgIH1cbiAgICBcbiAgICBHZXRSZXNwb25zZVRleHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ob3N0X3Jlc3BvbnNlX3RleHQgfCBcIlwiO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfY29kZTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGVyZSBpcyBhIGJ1ZywgVlNWLTkyMCwgd2hlcmVieSB0aGUgY3VzdG9tZXJfcmVjZWlwdCBpcyBtaXNzaW5nIGZyb20gYSBnbHQgcmVzcG9uc2UuXG4gICAgLy8gVGhlIGN1cnJlbnQgcmVjb21tZW5kYXRpb24gaXMgdG8gdXNlIHRoZSBtZXJjaGFudCByZWNlaXB0IGluIHBsYWNlIG9mIGl0IGlmIHJlcXVpcmVkLlxuICAgIC8vIFRoaXMgbWV0aG9kIG1vZGlmaWVzIHRoZSB1bmRlcmx5aW5nIGluY29taW5nIG1lc3NhZ2UgZGF0YSBieSBjb3B5aW5nXG4gICAgLy8gdGhlIG1lcmNoYW50IHJlY2VpcHQgaW50byB0aGUgY3VzdG9tZXIgcmVjZWlwdCBvbmx5IGlmIHRoZXJlIFxuICAgIC8vIGlzIGEgbWVyY2hhbnRfcmVjZWlwdCBhbmQgdGhlcmUgaXMgbm90IGEgY3VzdG9tZXJfcmVjZWlwdC4gICBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgQ29weU1lcmNoYW50UmVjZWlwdFRvQ3VzdG9tZXJSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHZhciBjciA9IHRoaXMuX20uRGF0YS5jdXN0b21lcl9yZWNlaXB0O1xuICAgICAgICB2YXIgbXIgPSB0aGlzLl9tLkRhdGEubWVyY2hhbnRfcmVjZWlwdDtcbiAgICAgICAgaWYgKG1yICE9IFwiXCIgJiYgIShjcikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX20uRGF0YS5jdXN0b21lcl9yZWNlaXB0ID0gbXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZ1bmRSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IoYW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5BbW91bnRDZW50cyA9IGFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLklkID0gUmVxdWVzdElkSGVscGVyLklkKFwicmVmdW5kXCIpO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuQ29uZmlnID0gbmV3IFNwaUNvbmZpZygpO1xuICAgICAgICB0aGlzLk9wdGlvbnMgPSBuZXcgVHJhbnNhY3Rpb25PcHRpb25zKCk7XG4gICAgfVxuICAgIFxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICBsZXQgZGF0YSA9IHtyZWZ1bmRfYW1vdW50OiB0aGlzLkFtb3VudENlbnRzLCBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkfTtcbiAgICAgICAgdGhpcy5Db25maWcuYWRkUmVjZWlwdENvbmZpZyhkYXRhKTtcbiAgICAgICAgdGhpcy5PcHRpb25zLkFkZE9wdGlvbnMoZGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJyZWZ1bmRcIiksIEV2ZW50cy5SZWZ1bmRSZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZ1bmRSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSBtLklkO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIHRoaXMuU2NoZW1lTmFtZSA9IG0uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICAgICAgdGhpcy5TY2hlbWVBcHBOYW1lID0gbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBtLkdldFN1Y2Nlc3NTdGF0ZSgpID09IFN1Y2Nlc3NTdGF0ZS5TdWNjZXNzO1xuICAgIH1cblxuICAgIEdldFJlZnVuZEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnJlZnVuZF9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0UlJOKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucnJuO1xuICAgIH1cblxuICAgIEdldEN1c3RvbWVyUmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBHZXRNZXJjaGFudFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgIH1cbiAgICBcbiAgICBHZXRSZXNwb25zZVRleHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ob3N0X3Jlc3BvbnNlX3RleHQgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZUNvZGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ob3N0X3Jlc3BvbnNlX2NvZGUgfHwgXCJcIjtcbiAgICB9XG5cblxuICAgIEdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50ZXJtaW5hbF9yZWZfaWQgfHwgXCJcIjtcbiAgICB9XG4gICAgR2V0Q2FyZEVudHJ5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY2FyZF9lbnRyeSB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRBY2NvdW50VHlwZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY291bnRfdHlwZSB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRBdXRoQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmF1dGhfY29kZSB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRCYW5rRGF0ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfZGF0ZSB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRCYW5rVGltZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfdGltZSB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRNYXNrZWRQYW4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tYXNrZWRfcGFuIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldFRlcm1pbmFsSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50ZXJtaW5hbF9pZCB8fCBcIlwiO1xuICAgIH1cbiAgICBXYXNNZXJjaGFudFJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEubWVyY2hhbnRfcmVjZWlwdF9wcmludGVkO1xuICAgIH1cbiAgICBXYXNDdXN0b21lclJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY3VzdG9tZXJfcmVjZWlwdF9wcmludGVkO1xuICAgIH1cbiAgICBHZXRTZXR0bGVtZW50RGF0ZSgpXG4gICAge1xuICAgICAgICAvL1wiYmFua19zZXR0bGVtZW50X2RhdGVcIjpcIjIwMDQyMDE4XCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuYmFua19zZXR0bGVtZW50X2RhdGU7XG4gICAgICAgIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBNZXNzYWdlLlBhcnNlQmFua0RhdGUoZGF0ZVN0cik7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VWYWx1ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlUmVxdWlyZWRcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSBtLklkO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIHRoaXMuX3JlY2VpcHRUb1NpZ24gPSBtLkRhdGEubWVyY2hhbnRfcmVjZWlwdDtcbiAgICB9XG4gICAgXG4gICAgU2lnbmF0dXJlUmVxdWlyZWQocG9zUmVmSWQsIHJlcXVlc3RJZCwgcmVjZWlwdFRvU2lnbilcbiAgICB7XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gcmVxdWVzdElkO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuX3JlY2VpcHRUb1NpZ24gPSByZWNlaXB0VG9TaWduO1xuICAgIH1cblxuICAgIEdldE1lcmNoYW50UmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjZWlwdFRvU2lnbjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVEZWNsaW5lXG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3JlZl9pZDogdGhpcy5Qb3NSZWZJZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwic2lnZGVjXCIpLCBFdmVudHMuU2lnbmF0dXJlRGVjbGluZWQsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZUFjY2VwdFxue1xuICAgIGNvbnN0cnVjdG9yKHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHBvc19yZWZfaWQ6IHRoaXMuUG9zUmVmSWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInNpZ2FjY1wiKSwgRXZlbnRzLlNpZ25hdHVyZUFjY2VwdGVkLCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3RvUHVyY2hhc2VSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBzdXJjaGFyZ2VBbW91bnQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuUHVyY2hhc2VBbW91bnQgPSBhbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5TdXJjaGFyZ2VBbW91bnQgPSBzdXJjaGFyZ2VBbW91bnQ7XG4gICAgICAgIHRoaXMuQ29uZmlnID0gbmV3IFNwaUNvbmZpZygpO1xuICAgICAgICB0aGlzLk9wdGlvbnMgPSBuZXcgVHJhbnNhY3Rpb25PcHRpb25zKCk7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3JlZl9pZDogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIHB1cmNoYXNlX2Ftb3VudDogdGhpcy5QdXJjaGFzZUFtb3VudCxcbiAgICAgICAgICAgIHN1cmNoYXJnZV9hbW91bnQ6IHRoaXMuU3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuQ29uZmlnLmFkZFJlY2VpcHRDb25maWcoZGF0YSk7XG4gICAgICAgIHRoaXMuT3B0aW9ucy5BZGRPcHRpb25zKGRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwibW90b1wiKSwgRXZlbnRzLk1vdG9QdXJjaGFzZVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdG9QdXJjaGFzZVJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuUHVyY2hhc2VSZXNwb25zZSA9IG5ldyBQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gUHVyY2hhc2VSZXNwb25zZS5Qb3NSZWZJZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUZvckF1dGhSZXF1aXJlZFxue1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpXG4gICAge1xuICAgICAgICBpZihhcmdzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IGFyZ3NbMF07XG4gICAgICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICB0aGlzLl9waG9uZU51bWJlciA9IGFyZ3NbMl07XG4gICAgICAgICAgICB0aGlzLl9tZXJjaGFudElkID0gYXJnc1szXTtcbiAgICAgICAgfSBlbHNlIGlmKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IGFyZ3NbMF0uSWQ7XG4gICAgICAgICAgICB0aGlzLlBvc1JlZklkID0gYXJnc1swXS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgICAgICB0aGlzLl9waG9uZU51bWJlciA9IGFyZ3NbMF0uRGF0YS5hdXRoX2NlbnRyZV9waG9uZV9udW1iZXI7XG4gICAgICAgICAgICB0aGlzLl9tZXJjaGFudElkID0gYXJnc1swXS5EYXRhLm1lcmNoYW50X2lkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNhbGwgc2lnIGZvciBQaG9uZSBhdXRoIHJlcXVpcmVkIGNsYXNzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgR2V0UGhvbmVOdW1iZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bob25lTnVtYmVyO1xuICAgIH1cbiAgICBcbiAgICBHZXRNZXJjaGFudElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJjaGFudElkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhDb2RlQWR2aWNlXG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQsIGF1dGhDb2RlKVxuICAgIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLkF1dGhDb2RlID0gYXV0aENvZGU7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3JlZl9pZDogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIGF1dGhfY29kZTogdGhpcy5BdXRoQ29kZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiYXV0aGFkXCIpLCBFdmVudHMuQXV0aENvZGVBZHZpY2UsIGRhdGEsIHRydWUpO1xuICAgIH1cbn0iLCJpbXBvcnQge1B1cmNoYXNlUmVxdWVzdCwgUmVmdW5kUmVxdWVzdH0gZnJvbSAnLi9QdXJjaGFzZSc7XG5cbmV4cG9ydCBjbGFzcyBQdXJjaGFzZUhlbHBlclxue1xuICAgIHN0YXRpYyBDcmVhdGVQdXJjaGFzZVJlcXVlc3QoYW1vdW50Q2VudHMsIHB1cmNoYXNlSWQpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IFB1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcHVyY2hhc2VJZCk7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBDcmVhdGVQdXJjaGFzZVJlcXVlc3RWMihwb3NSZWZJZCwgcHVyY2hhc2VBbW91bnQsIHRpcEFtb3VudCwgY2FzaG91dEFtb3VudCwgcHJvbXB0Rm9yQ2FzaG91dCwgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdmFyIHByID0gT2JqZWN0LmFzc2lnbihuZXcgUHVyY2hhc2VSZXF1ZXN0KHB1cmNoYXNlQW1vdW50LCBwb3NSZWZJZCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIENhc2hvdXRBbW91bnQ6IGNhc2hvdXRBbW91bnQsXG4gICAgICAgICAgICBUaXBBbW91bnQ6IHRpcEFtb3VudCxcbiAgICAgICAgICAgIFByb21wdEZvckNhc2hvdXQ6IHByb21wdEZvckNhc2hvdXQsXG4gICAgICAgICAgICBTdXJjaGFyZ2VBbW91bnQ6IHN1cmNoYXJnZUFtb3VudFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHI7XG4gICAgfVxuXG4gICAgc3RhdGljIENyZWF0ZVJlZnVuZFJlcXVlc3QoYW1vdW50Q2VudHMsIHB1cmNoYXNlSWQsIGlzU3VwcHJlc3NNZXJjaGFudFBhc3N3b3JkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWZ1bmRSZXF1ZXN0KGFtb3VudENlbnRzLCBwdXJjaGFzZUlkLCBpc1N1cHByZXNzTWVyY2hhbnRQYXNzd29yZCk7XG4gICAgfVxuXG59XG4iLCJsZXQgX19SZXF1ZXN0SWRIZWxwZXJDb3VudGVyID0gMTtcblxuZXhwb3J0IGNsYXNzIFJlcXVlc3RJZEhlbHBlciB7XG4gICAgc3RhdGljIElkKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgX19SZXF1ZXN0SWRIZWxwZXJDb3VudGVyKys7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNlY3JldHMge1xuICAgIGNvbnN0cnVjdG9yKGVuY0tleSwgaG1hY0tleSkge1xuICAgICAgICB0aGlzLkVuY0tleSAgICAgPSBlbmNLZXk7XG4gICAgICAgIHRoaXMuSG1hY0tleSAgICA9IGhtYWNLZXk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNhdmUoRW5jS2V5LCBIbWFjS2V5KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdFbmNLZXknLCBFbmNLZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSG1hY0tleScsIEhtYWNLZXkpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXN0b3JlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNlY3JldHMobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0VuY0tleScpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSG1hY0tleScpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNTYXZlZCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdFbmNLZXknKSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSG1hY0tleScpO1xuICAgIH1cblxuICAgIHN0YXRpYyBSZXNldCgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ0VuY0tleScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnSG1hY0tleScpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBEZXZpY2VBZGRyZXNzU3RhdHVzXG57XG4gICAgY29uc3RydWN0b3IoYWRkcmVzcywgbGFzdFVwZGF0ZWQpIFxuICAgIHtcbiAgICAgICAgdGhpcy5BZGRyZXNzID0gYWRkcmVzcztcbiAgICAgICAgdGhpcy5MYXN0VXBkYXRlZCA9IGxhc3RVcGRhdGVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERldmljZUFkZHJlc3NTZXJ2aWNlXG57XG4gICAgUmV0cmlldmVTZXJ2aWNlKHNlcmlhbE51bWJlciwgYXBpS2V5ID0gJ3NwaS1zYW1wbGUtcG9zMScsIGlzVGVzdE1vZGUpXG4gICAge1xuICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggc2FuZGJveCBhbmQgcHJvZCB1cmxzXG4gICAgICAgIHZhciBkZXZpY2VBZGRyZXNzVXJpID0gaXNUZXN0TW9kZSA/IGAvYXBpL3YxL2lwP3NlcmlhbD0ke3NlcmlhbE51bWJlcn1gIDogYGh0dHBzOi8vZGV2aWNlLWFkZHJlc3MtYXBpLWRldi5ub25wcm9kLXdiYy5tc3AuYXNzZW1ibHlwYXltZW50cy5jb20vdjEvJHtzZXJpYWxOdW1iZXJ9L2lwYDtcblxuICAgICAgICByZXR1cm4gZmV0Y2goZGV2aWNlQWRkcmVzc1VyaSwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkFTTS1NU1AtREVWSUNFLUFERFJFU1MtQVBJLUtFWVwiOiBhcGlLZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBTdGF0dXMgY29kZSAke3Jlc3BvbnNlLlN0YXR1c0NvZGV9IHJlY2VpdmVkIGZyb20gJHtkZXZpY2VBZGRyZXNzVXJpfSAtIEV4Y2VwdGlvbiAke3Jlc3BvbnNlLkVycm9yRXhjZXB0aW9ufWApO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRzLCBTdWNjZXNzU3RhdGUsIE1lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGxlUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgdGhpcy5JZCA9IGlkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHRoaXMuSWQsIEV2ZW50cy5TZXR0bGVSZXF1ZXN0LCBudWxsLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXR0bGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihtKSB7XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0U2V0dGxlQnlBY3F1aXJlckNvdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfc2V0dGxlX2J5X2FjcXVpcmVyX2NvdW50O1xuICAgIH1cblxuICAgIEdldFNldHRsZUJ5QWNxdWlyZXJWYWx1ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl92YWx1ZTtcbiAgICB9XG5cbiAgICBHZXRUb3RhbENvdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfdG90YWxfY291bnQ7XG4gICAgfVxuXG4gICAgR2V0VG90YWxWYWx1ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY3VtdWxhdGVkX3RvdGFsX3ZhbHVlO1xuICAgIH1cblxuICAgIEdldFBlcmlvZFN0YXJ0VGltZSgpXG4gICAge1xuICAgICAgICB2YXIgdGltZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3BlcmlvZF9zdGFydF90aW1lOyAvLyBcIjA1OjAwXCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuc2V0dGxlbWVudF9wZXJpb2Rfc3RhcnRfZGF0ZTsgLy8gXCIwNU9jdDE3XCJcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuUGFyc2VCYW5rRGF0ZVRpbWVTdHIoZGF0ZVN0ciwgdGltZVN0cik7XG4gICAgfVxuXG4gICAgR2V0UGVyaW9kRW5kVGltZSgpXG4gICAge1xuICAgICAgICB2YXIgdGltZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3BlcmlvZF9lbmRfdGltZTsgLy8gXCIwNTowMFwiXG4gICAgICAgIHZhciBkYXRlU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfcGVyaW9kX2VuZF9kYXRlOyAvLyBcIjA1T2N0MTdcIlxuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlU3RyLCB0aW1lU3RyKTtcbiAgICB9XG5cbiAgICBHZXRUcmlnZ2VyZWRUaW1lKClcbiAgICB7XG4gICAgICAgIHZhciB0aW1lU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfdHJpZ2dlcmVkX3RpbWU7IC8vIFwiMDU6MDA6NDVcIlxuICAgICAgICB2YXIgZGF0ZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3RyaWdnZXJlZF9kYXRlOyAvLyBcIjA1T2N0MTdcIlxuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlU3RyLCB0aW1lU3RyKTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVRleHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ob3N0X3Jlc3BvbnNlX3RleHQ7XG4gICAgfVxuICAgIFxuICAgIEdldFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgIH1cblxuICAgIEdldFRyYW5zYWN0aW9uUmFuZ2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50cmFuc2FjdGlvbl9yYW5nZTtcbiAgICB9XG5cbiAgICBHZXRUZXJtaW5hbElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfaWQ7XG4gICAgfVxuXG4gICAgR2V0U2NoZW1lU2V0dGxlbWVudEVudHJpZXMoKVxuICAgIHtcbiAgICAgICAgdmFyIHNjaGVtZXMgPSB0aGlzLl9tLkRhdGEuc2NoZW1lcztcbiAgICAgICAgaWYgKCFzY2hlbWVzKSByZXR1cm4gW107XG5cbiAgICAgICAgcmV0dXJuIHNjaGVtZXMubWFwKChzY2hlbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2NoZW1lU2V0dGxlbWVudEVudHJ5KHNjaGVtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVtZVNldHRsZW1lbnRFbnRyeVxue1xuICAgIC8vIFNjaGVtZVNldHRsZW1lbnRFbnRyeShzdHJpbmcgc2NoZW1lTmFtZSwgYm9vbCBzZXR0bGVCeUFjcXVpcmVyLCBpbnQgdG90YWxDb3VudCwgaW50IHRvdGFsVmFsdWUpXG4gICAgLy8gU2NoZW1lU2V0dGxlbWVudEVudHJ5KE9iamVjdCBzY2hlbWVPYmopXG4gICAgY29uc3RydWN0b3IoLi4uYXJncylcbiAgICB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBhcmdzWzBdLnNjaGVtZV9uYW1lO1xuICAgICAgICAgICAgdGhpcy5TZXR0bGVCeUFjcXVpcmVyID0gYXJnc1swXS5zZXR0bGVfYnlfYWNxdWlyZXIudG9Mb3dlckNhc2UoKSA9PSBcInllc1wiO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFZhbHVlID0gcGFyc2VJbnQoYXJnc1swXS50b3RhbF92YWx1ZSwxMCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsQ291bnQgPSBwYXJzZUludChhcmdzWzBdLnRvdGFsX2NvdW50LDEwKTtcbiAgICAgICAgfSBlbHNlIGlmKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgdGhpcy5TZXR0bGVCeUFjcXVpcmVyID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxDb3VudCA9IGFyZ3NbMl07XG4gICAgICAgICAgICB0aGlzLlRvdGFsVmFsdWUgPSBhcmdzWzNdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIFRvU3RyaW5nKClcbiAgICB7XG4gICAgICAgIHJldHVybiBgU2NoZW1lTmFtZTogJHt0aGlzLlNjaGVtZU5hbWV9LCBTZXR0bGVCeUFjcXVpcmVyOiAke3RoaXMuU2V0dGxlQnlBY3F1aXJlcn0sIFRvdGFsQ291bnQ6ICR7dGhpcy5Ub3RhbENvdW50fSwgVG90YWxWYWx1ZTogJHt0aGlzLlRvdGFsVmFsdWV9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXR0bGVtZW50RW5xdWlyeVJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihpZClcbiAgICB7XG4gICAgICAgIHRoaXMuSWQgPSBpZDtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZSh0aGlzLklkLCBFdmVudHMuU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0LCBudWxsLCB0cnVlKTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZXNzYWdlLCBNZXNzYWdlU3RhbXAsIEV2ZW50cywgU3VjY2Vzc1N0YXRlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7U3BpQ29uZmlnLCBTcGlGbG93LCBTcGlTdGF0dXMsIFBhaXJpbmdGbG93U3RhdGUsIFRyYW5zYWN0aW9uRmxvd1N0YXRlLCBJbml0aWF0ZVR4UmVzdWx0fSBmcm9tICcuL1NwaU1vZGVscyc7XG5pbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtDb25uZWN0aW9uLCBDb25uZWN0aW9uU3RhdGV9IGZyb20gJy4vQ29ubmVjdGlvbic7XG5pbXBvcnQge1NwaVBheUF0VGFibGV9IGZyb20gJy4vU3BpUGF5QXRUYWJsZSc7XG5pbXBvcnQge1BheUF0VGFibGVDb25maWd9IGZyb20gJy4vUGF5QXRUYWJsZSc7XG5pbXBvcnQge1NwaVByZWF1dGh9IGZyb20gJy4vU3BpUHJlYXV0aCc7XG5pbXBvcnQge0Ryb3BLZXlzUmVxdWVzdH0gZnJvbSAnLi9QYWlyaW5nJztcbmltcG9ydCB7UHVyY2hhc2VIZWxwZXJ9IGZyb20gJy4vUHVyY2hhc2VIZWxwZXInO1xuaW1wb3J0IHtLZXlSb2xsaW5nSGVscGVyfSBmcm9tICcuL0tleVJvbGxpbmdIZWxwZXInO1xuaW1wb3J0IHtQaW5nSGVscGVyLCBQb25nSGVscGVyfSBmcm9tICcuL1BpbmdIZWxwZXInO1xuaW1wb3J0IHtHZXRMYXN0VHJhbnNhY3Rpb25SZXF1ZXN0LCBDYW5jZWxUcmFuc2FjdGlvblJlcXVlc3QsIFNpZ25hdHVyZVJlcXVpcmVkLCBDYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlfSBmcm9tICcuL1B1cmNoYXNlJztcbmltcG9ydCB7RGV2aWNlQWRkcmVzc1NlcnZpY2UsIERldmljZUFkZHJlc3NTdGF0dXN9IGZyb20gJy4vU2VydmljZS9EZXZpY2VTZXJ2aWNlJztcblxuY29uc3QgU1BJX1ZFUlNJT04gPSAnMi40LjAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGkge1xuXG4gICAgZ2V0IEN1cnJlbnRTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdHVzO1xuICAgIH1cblxuICAgIHNldCBDdXJyZW50U3RhdHVzKHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRTdGF0dXMgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gdmFsdWU7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTdGF0dXNDaGFuZ2VkJywge2RldGFpbDogdmFsdWV9KSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocG9zSWQsIHNlcmlhbE51bWJlciwgZWZ0cG9zQWRkcmVzcywgc2VjcmV0cykgXG4gICAge1xuICAgICAgICB0aGlzLl9wb3NJZCA9IHBvc0lkO1xuICAgICAgICB0aGlzLl9zZXJpYWxOdW1iZXIgPSBzZXJpYWxOdW1iZXI7XG4gICAgICAgIHRoaXMuX3NlY3JldHMgPSBzZWNyZXRzO1xuICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gXCJ3czovL1wiICsgZWZ0cG9zQWRkcmVzcztcbiAgICAgICAgdGhpcy5fbG9nID0gY29uc29sZTtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50RGV2aWNlU3RhdHVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZGV2aWNlQXBpS2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5UZXN0TW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gT3VyIHN0YW1wIGZvciBzaWduaW5nIG91dGdvaW5nIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcCA9IG5ldyBNZXNzYWdlU3RhbXAodGhpcy5fcG9zSWQsIHRoaXMuX3NlY3JldHMsIDApO1xuXG4gICAgICAgIC8vIFdlIHdpbGwgbWFpbnRhaW4gc29tZSBzdGF0ZVxuICAgICAgICB0aGlzLl9tb3N0UmVjZW50UGluZ1NlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWlzc2VkUG9uZ3NDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRMb2dpblJlc3BvbnNlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9wb25nVGltZW91dCA9IDUwMDA7XG4gICAgICAgIHRoaXMuX3BpbmdGcmVxdWVuY3kgPSAxODAwMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3JlYWR5VG9UcmFuc2FjdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BlcmlvZGljUGluZ1RocmVhZCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fdHhNb25pdG9yQ2hlY2tGcmVxdWVuY3kgPSAxMDAwO1xuICAgICAgICB0aGlzLl9jaGVja09uVHhGcmVxdWVuY3kgPSAyMDAwMDtcbiAgICAgICAgdGhpcy5fbWF4V2FpdEZvckNhbmNlbFR4ID0gMTAwMDA7XG4gICAgICAgIHRoaXMuX3NsZWVwQmVmb3JlUmVjb25uZWN0TXMgPSA1MDAwO1xuICAgICAgICB0aGlzLl9taXNzZWRQb25nc1RvRGlzY29ubmVjdCA9IDI7XG4gICAgICAgIHRoaXMuX3JldHJpZXNCZWZvcmVSZXNvbHZpbmdEZXZpY2VBZGRyZXNzID0gNTtcblxuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ICAgICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZSAgICA9IG51bGw7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlICAgICAgICAgPSBudWxsO1xuICAgIH1cblxuICAgIEVuYWJsZVBheUF0VGFibGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpUGF0ID0gbmV3IFNwaVBheUF0VGFibGUodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGlQYXQ7XG4gICAgfVxuXG4gICAgRW5hYmxlUHJlYXV0aCgpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGlQcmVhdXRoID0gbmV3IFNwaVByZWF1dGgodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGlQcmVhdXRoO1xuICAgIH1cblxuICAgIFN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q29ubigpO1xuICAgICAgICB0aGlzLl9zdGFydFRyYW5zYWN0aW9uTW9uaXRvcmluZ1RocmVhZCgpO1xuXG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LklkbGU7XG4gICAgICAgIGlmICh0aGlzLl9zZWNyZXRzICE9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiU3RhcnRpbmcgaW4gUGFpcmVkIFN0YXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0aW5nO1xuICAgICAgICAgICAgdGhpcy5fY29ubi5Db25uZWN0KCk7IC8vIFRoaXMgaXMgbm9uLWJsb2NraW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlN0YXJ0aW5nIGluIFVucGFpcmVkIFN0YXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5VbnBhaXJlZDtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIFNldCB0aGUgYXBpIGtleSB1c2VkIGZvciBhdXRvIGFkZHJlc3MgZGlzY292ZXJ5IGZlYXR1cmVcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgU2V0RGV2aWNlQXBpS2V5KGRldmljZUFwaUtleSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2RldmljZUFwaUtleSA9IGRldmljZUFwaUtleTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgc2VyaWFsIG51bWJlciBvZiB0aGUgRWZ0cG9zXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBTZXRTZXJpYWxOdW1iZXIoc2VyaWFsTnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQgJiYgdGhpcy5IYXNTZXJpYWxOdW1iZXJDaGFuZ2VkKHNlcmlhbE51bWJlcikpXG4gICAgICAgICAgICB0aGlzLl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3NlcmlhbE51bWJlciA9IHNlcmlhbE51bWJlcjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgYXV0byBhZGRyZXNzIGRpc2NvdmVyeSBmZWF0dXJlLiBcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgU2V0QXV0b0FkZHJlc3NSZXNvbHV0aW9uKGF1dG9BZGRyZXNzUmVzb2x1dGlvbilcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoYXV0b0FkZHJlc3NSZXNvbHV0aW9uICYmICF0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB3ZSdyZSB0dXJuaW5nIGl0IG9uXG4gICAgICAgICAgICB0aGlzLl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkID0gYXV0b0FkZHJlc3NSZXNvbHV0aW9uO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIENhbGwgdGhpcyBtZXRob2QgdG8gc2V0IHRoZSBjbGllbnQgbGlicmFyeSB0ZXN0IG1vZGUuXG4gICAgLy8vIFNldCBpdCB0byB0cnVlIG9ubHkgd2hpbGUgeW91IGFyZSBkZXZlbG9waW5nIHRoZSBpbnRlZ3JhdGlvbi4gXG4gICAgLy8vIEl0IGRlZmF1bHRzIHRvIGZhbHNlLiBGb3IgYSByZWFsIG1lcmNoYW50LCBhbHdheXMgbGVhdmUgaXQgc2V0IHRvIGZhbHNlLiBcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cGFyYW0gbmFtZT1cInRlc3RNb2RlXCI+PC9wYXJhbT5cbiAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIFNldFRlc3RNb2RlKHRlc3RNb2RlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRlc3RNb2RlICE9IHRoaXMuX2luVGVzdE1vZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHdlJ3JlIGNoYW5naW5nIG1vZGVcbiAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9pblRlc3RNb2RlID0gdGVzdE1vZGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEFsbG93cyB5b3UgdG8gc2V0IHRoZSBQb3NJZCB3aGljaCBpZGVudGlmaWVzIHRoaXMgaW5zdGFuY2Ugb2YgeW91ciBQT1MuXG4gICAgLy8gQ2FuIG9ubHkgYmUgY2FsbGVkIGluIHRoZ2UgVW5wYWlyZWQgc3RhdGUuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBTZXRQb3NJZChwb3NJZClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Bvc0lkID0gcG9zSWQ7XG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5Qb3NJZCA9IHBvc0lkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgUGluUGFkIGFkZHJlc3MuIFNvbWV0aW1lcyB0aGUgUGluUGFkIG1pZ2h0IGNoYW5nZSBJUCBhZGRyZXNzIFxuICAgIC8vICh3ZSByZWNvbW1lbmQgcmVzZXJ2aW5nIHN0YXRpYyBJUHMgaWYgcG9zc2libGUpLlxuICAgIC8vIEVpdGhlciB3YXkgeW91IG5lZWQgdG8gYWxsb3cgeW91ciBVc2VyIHRvIGVudGVyIHRoZSBJUCBhZGRyZXNzIG9mIHRoZSBQaW5QYWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFNldEVmdHBvc0FkZHJlc3MoYWRkcmVzcylcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3RlZCB8fCB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gXCJ3czovL1wiICsgYWRkcmVzcztcbiAgICAgICAgdGhpcy5fY29ubi5BZGRyZXNzID0gdGhpcy5fZWZ0cG9zQWRkcmVzcztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIEdldFZlcnNpb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFNQSV9WRVJTSU9OO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyBvbmUgd2hlbiBhIGZsb3cgaXMgZmluaXNoZWQgYW5kIHlvdSB3YW50IHRvIGdvIGJhY2sgdG8gaWRsZSBzdGF0ZS5cbiAgICAvLyBUeXBpY2FsbHkgd2hlbiB5b3VyIHVzZXIgY2xpY2tzIHRoZSBcIk9LXCIgYnVidHRvbiB0byBhY2tub3dsZGdlIHRoYXQgcGFpcmluZyBpc1xuICAgIC8vIGZpbmlzaGVkLCBvciB0aGF0IHRyYW5zYWN0aW9uIGlzIGZpbmlzaGVkLlxuICAgIC8vIFdoZW4gdHJ1ZSwgeW91IGNhbiBkaXNtaXNzIHRoZSBmbG93IHNjcmVlbiBhbmQgc2hvdyBiYWNrIHRoZSBpZGxlIHNjcmVlbi5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHJldHVybnM+dHJ1ZSBtZWFucyB3ZSBoYXZlIG1vdmVkIGJhY2sgdG8gdGhlIElkbGUgc3RhdGUuIGZhbHNlIG1lYW5zIGN1cnJlbnQgZmxvdyB3YXMgbm90IGZpbmlzaGVkIHlldC48L3JldHVybnM+XG4gICAgQWNrRmxvd0VuZGVkQW5kQmFja1RvSWRsZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LklkbGUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gYWxyZWFkeSBpZGxlXG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5QYWlyaW5nICYmIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LklkbGU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuSWRsZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyB3aWxsIGNvbm5lY3QgdG8gdGhlIEVmdHBvcyBhbmQgc3RhcnQgdGhlIHBhaXJpbmcgcHJvY2Vzcy5cbiAgICAvLyBPbmx5IGNhbGwgdGhpcyBpZiB5b3UgYXJlIGluIHRoZSBVbnBhaXJlZCBzdGF0ZS5cbiAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIFBhaXJpbmdGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwYWlyaW5nIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxyZXR1cm5zPldoZXRoZXIgcGFpcmluZyBoYXMgaW5pdGlhdGVkIG9yIG5vdDwvcmV0dXJucz5cbiAgICBQYWlyKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIlRyaWVkIHRvIFBhaXIgYnV0IHdlJ3JlIGFscmVhZHkgc28uXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wb3NJZCB8fCAhdGhpcy5fZWZ0cG9zQWRkcmVzcylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJUcmllZCB0byBQYWlyIGJ1dCBtaXNzaW5nIHBvc0lkIG9yIHVwZGF0ZWRFZnRwb3NBZGRyZXNzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuUGFpcmluZztcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZSA9IG5ldyBQYWlyaW5nRmxvd1N0YXRlXG4gICAgICAgICh7XG4gICAgICAgICAgICBTdWNjZXNzZnVsOiBmYWxzZSxcbiAgICAgICAgICAgIEZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIE1lc3NhZ2U6IFwiQ29ubmVjdGluZy4uLlwiLFxuICAgICAgICAgICAgQXdhaXRpbmdDaGVja0Zyb21FZnRwb3M6IGZhbHNlLFxuICAgICAgICAgICAgQXdhaXRpbmdDaGVja0Zyb21Qb3M6IGZhbHNlLFxuICAgICAgICAgICAgQ29uZmlybWF0aW9uQ29kZTogXCJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICB0aGlzLl9jb25uLkNvbm5lY3QoKTsgLy8gTm9uLUJsb2NraW5nXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyB3aGVuIHlvdXIgdXNlciBjbGlja3MgeWVzIHRvIGNvbmZpcm0gdGhlIHBhaXJpbmcgY29kZSBvbiB5b3VyIFxuICAgIC8vIHNjcmVlbiBtYXRjaGVzIHRoZSBvbmUgb24gdGhlIEVmdHBvcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmluZ0NvbmZpcm1Db2RlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gV2Ugd2VyZW4ndCBleHBlY3RpbmcgdGhpc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbUVmdHBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQnV0IHdlIGFyZSBzdGlsbCB3YWl0aW5nIGZvciBjb25maXJtYXRpb24gZnJvbSBFZnRwb3Mgc2lkZS5cbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiUGFpciBDb2RlIENvbmZpcm1lZCBmcm9tIFBPUyBzaWRlLCBidXQgYW0gc3RpbGwgd2FpdGluZyBmb3IgY29uZmlybWF0aW9uIGZyb20gRWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgXCJDbGljayBZRVMgb24gRUZUUE9TIGlmIGNvZGUgaXM6IFwiICsgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Db25maXJtYXRpb25Db2RlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEFscmVhZHkgY29uZmlybWVkIGZyb20gRWZ0cG9zIC0gU28gYWxsIGdvb2Qgbm93LiBXZSdyZSBQYWlyZWQgYWxzbyBmcm9tIHRoZSBQT1MgcGVyc3BlY3RpdmUuXG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlBhaXIgQ29kZSBDb25maXJtZWQgZnJvbSBQT1Mgc2lkZSwgYW5kIHdhcyBhbHJlYWR5IGNvbmZpcm1lZCBmcm9tIEVmdHBvcyBzaWRlLiBQYWlyaW5nIGZpbmFsaXNlZC5cIik7XG4gICAgICAgICAgICB0aGlzLl9vblBhaXJpbmdTdWNjZXNzKCk7XG4gICAgICAgICAgICB0aGlzLl9vblJlYWR5VG9UcmFuc2FjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsbCB0aGlzIGlmIHlvdXIgdXNlciBjbGlja3MgQ0FOQ0VMIG9yIE5PIGR1cmluZyB0aGUgcGFpcmluZyBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBQYWlyaW5nQ2FuY2VsKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuUGFpcmluZyB8fCB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyAmJiAhdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbUVmdHBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHRoZSBFZnRwb3MgYWxyZWFkeSB0aGlua3MgaXQncyBwYWlyZWQuXG4gICAgICAgICAgICAvLyBMZXQncyB0ZWxsIGl0IHRvIGRyb3Aga2V5c1xuICAgICAgICAgICAgdGhpcy5fc2VuZChuZXcgRHJvcEtleXNSZXF1ZXN0KCkuVG9NZXNzYWdlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29uUGFpcmluZ0ZhaWxlZCgpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyB3aGVuIHlvdXIgdXNlcyBjbGlja3MgdGhlIFVucGFpciBidXR0b24uXG4gICAgLy8gVGhpcyB3aWxsIGRpc2Nvbm5lY3QgZnJvbSB0aGUgRWZ0cG9zIGFuZCBmb3JnZXQgdGhlIHNlY3JldHMuXG4gICAgLy8gVGhlIEN1cnJlbnRTdGF0ZSBpcyB0aGVuIGNoYW5nZWQgdG8gVW5wYWlyZWQuXG4gICAgLy8gQ2FsbCB0aGlzIG9ubHkgaWYgeW91IGFyZSBub3QgeWV0IGluIHRoZSBVbnBhaXJlZCBzdGF0ZS5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgVW5wYWlyKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQmVzdCBlZmZvcnQgbGV0dGluZyB0aGUgZWZ0cG9zIGtub3cgdGhhdCB3ZSdyZSBkcm9wcGluZyB0aGUga2V5cywgc28gaXQgY2FuIGRyb3AgdGhlbSBhcyB3ZWxsLlxuICAgICAgICB0aGlzLl9zZW5kKG5ldyBEcm9wS2V5c1JlcXVlc3QoKS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIHRoaXMuX2RvVW5wYWlyKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgLy8gcmVnaW9uIFRyYW5zYWN0aW9uIE1ldGhvZHNcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHB1cmNoYXNlIHRyYW5zYWN0aW9uLiBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBnZXQgdXBkYXRlcyBvbiB0aGUgcHJvY2Vzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPkFscGhhbnVtZXJpYyBJZGVudGlmaWVyIGZvciB5b3VyIHB1cmNoYXNlLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRDZW50c1wiPkFtb3VudCBpbiBDZW50cyB0byBjaGFyZ2U8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVQdXJjaGFzZVR4KHBvc1JlZklkLCBhbW91bnRDZW50cylcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHB1cmNoYXNlUmVxdWVzdCA9IFB1cmNoYXNlSGVscGVyLkNyZWF0ZVB1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcG9zUmVmSWQpO1xuICAgICAgICBwdXJjaGFzZVJlcXVlc3QuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHZhciBwdXJjaGFzZU1zZyA9IHB1cmNoYXNlUmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QdXJjaGFzZSwgYW1vdW50Q2VudHMsIHB1cmNoYXNlTXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcGF5bWVudCByZXF1ZXN0IGZvciAke2Ftb3VudENlbnRzIC8gMTAwLjB9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHB1cmNoYXNlTXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIGFjY2VwdCBwYXltZW50IGZvciAke2Ftb3VudENlbnRzIC8gMTAwLjB9YCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiUHVyY2hhc2UgSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHB1cmNoYXNlIHRyYW5zYWN0aW9uLiBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBnZXQgdXBkYXRlcyBvbiB0aGUgcHJvY2Vzcy5cbiAgICAvLyA8cGFyYT5UaXAgYW5kIGNhc2hvdXQgYXJlIG5vdCBhbGxvd2VkIHNpbXVsdGFuZW91c2x5LjwvcGFyYT5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPkFuIFVuaXF1ZSBJZGVudGlmaWVyIGZvciB5b3VyIE9yZGVyL1B1cmNoYXNlPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInB1cmNoYXNlQW1vdW50XCI+VGhlIFB1cmNoYXNlIEFtb3VudCBpbiBDZW50cy48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwidGlwQW1vdW50XCI+VGhlIFRpcCBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiY2FzaG91dEFtb3VudFwiPlRoZSBDYXNob3V0IEFtb3VudCBpbiBDZW50czwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwcm9tcHRGb3JDYXNob3V0XCI+V2hldGhlciB0byBwcm9tcHQgeW91ciBjdXN0b21lciBmb3IgY2FzaG91dCBvbiB0aGUgRWZ0cG9zPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj5UaGUgU2V0dGluZyB0byBzZXQgSGVhZGVyIGFuZCBGb290ZXIgZm9yIHRoZSBSZWNlaXB0PC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInN1cmNoYXJnZUFtb3VudFwiPlRoZSBTdXJjaGFyZ2UgQW1vdW50IGluIENlbnRzPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5Jbml0aWF0ZVR4UmVzdWx0PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlUHVyY2hhc2VUeFYyKHBvc1JlZklkLCBwdXJjaGFzZUFtb3VudCwgdGlwQW1vdW50LCBjYXNob3V0QW1vdW50LCBwcm9tcHRGb3JDYXNob3V0LCBvcHRpb25zID0ge30sIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRpcEFtb3VudCA+IDAgJiYgKGNhc2hvdXRBbW91bnQgPiAwIHx8IHByb21wdEZvckNhc2hvdXQpKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiQ2Fubm90IEFjY2VwdCBUaXBzIGFuZCBDYXNob3V0IGF0IHRoZSBzYW1lIHRpbWUuXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgdmFyIHB1cmNoYXNlID0gUHVyY2hhc2VIZWxwZXIuQ3JlYXRlUHVyY2hhc2VSZXF1ZXN0VjIocG9zUmVmSWQsIHB1cmNoYXNlQW1vdW50LCB0aXBBbW91bnQsIGNhc2hvdXRBbW91bnQsIHByb21wdEZvckNhc2hvdXQsIHN1cmNoYXJnZUFtb3VudCk7XG4gICAgICAgIHB1cmNoYXNlLkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICBwdXJjaGFzZS5PcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdmFyIHB1cmNoYXNlTXNnID0gcHVyY2hhc2UuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QdXJjaGFzZSwgcHVyY2hhc2VBbW91bnQsIHB1cmNoYXNlTXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcGF5bWVudCByZXF1ZXN0LiAke3B1cmNoYXNlLkFtb3VudFN1bW1hcnkoKX1gKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQocHVyY2hhc2VNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gYWNjZXB0IHBheW1lbnQgZm9yICR7cHVyY2hhc2UuQW1vdW50U3VtbWFyeSgpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlB1cmNoYXNlIEluaXRpYXRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSByZWZ1bmQgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QWxwaGFudW1lcmljIElkZW50aWZpZXIgZm9yIHlvdXIgcmVmdW5kLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRDZW50c1wiPkFtb3VudCBpbiBDZW50cyB0byBjaGFyZ2U8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmRcIj5NZXJjaGFudCBQYXNzd29yZCBjb250cm9sIGluIFZBQTwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+SW5pdGlhdGVUeFJlc3VsdDwvcmV0dXJucz5cbiAgICBJbml0aWF0ZVJlZnVuZFR4KHBvc1JlZklkLCBhbW91bnRDZW50cywgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQgPSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlZnVuZFJlcXVlc3QgPSBQdXJjaGFzZUhlbHBlci5DcmVhdGVSZWZ1bmRSZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCwgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQpO1xuICAgICAgICByZWZ1bmRSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgcmVmdW5kTXNnID0gcmVmdW5kUmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5SZWZ1bmQsIGFtb3VudENlbnRzLCByZWZ1bmRNc2csIFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcmVmdW5kIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHJlZnVuZE1zZykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoYEFza2VkIEVGVFBPUyB0byByZWZ1bmQgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJSZWZ1bmQgSW5pdGlhdGVkXCIpO1xuICAgIH1cbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBMZXQgdGhlIEVGVFBPUyBrbm93IHdoZXRoZXIgbWVyY2hhbnQgYWNjZXB0ZWQgb3IgZGVjbGluZWQgdGhlIHNpZ25hdHVyZVxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFjY2VwdGVkXCI+d2hldGhlciBtZXJjaGFudCBhY2NlcHRlZCB0aGUgc2lnbmF0dXJlIGZyb20gY3VzdG9tZXIgb3Igbm90PC9wYXJhbT5cbiAgICBBY2NlcHRTaWduYXR1cmUoYWNjZXB0ZWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIGFjY2VwdCBzaWduYXR1cmUgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdChmYWxzZSwgXCJBc2tlZCB0byBhY2NlcHQgc2lnbmF0dXJlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNpZ25hdHVyZVJlc3BvbmRlZChhY2NlcHRlZCA/IFwiQWNjZXB0aW5nIFNpZ25hdHVyZS4uLlwiIDogXCJEZWNsaW5pbmcgU2lnbmF0dXJlLi4uXCIpO1xuICAgICAgICB2YXIgc2lnUmVxTXNnID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVxdWlyZWRNZXNzYWdlO1xuICAgICAgICB0aGlzLl9zZW5kKGFjY2VwdGVkXG4gICAgICAgICAgICA/IG5ldyBTaWduYXR1cmVBY2NlcHQodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQpLlRvTWVzc2FnZSgpXG4gICAgICAgICAgICA6IG5ldyBTaWduYXR1cmVEZWNsaW5lKHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkKS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgTWlkVHhSZXN1bHQodHJ1ZSwgXCJcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gU3VibWl0IHRoZSBDb2RlIG9idGFpbmVkIGJ5IHlvdXIgdXNlciB3aGVuIHBob25pbmcgZm9yIGF1dGguIFxuICAgIC8vIEl0IHdpbGwgcmV0dXJuIGltbWVkaWF0ZWx5IHRvIHRlbGwgeW91IHdoZXRoZXIgdGhlIGNvZGUgaGFzIGEgdmFsaWQgZm9ybWF0IG9yIG5vdC4gXG4gICAgLy8gSWYgdmFsaWQ9PXRydWUgaXMgcmV0dXJuZWQsIG5vIG5lZWQgdG8gZG8gYW55dGhpbmcgZWxzZS4gRXhwZWN0IHVwZGF0ZXMgdmlhIHN0YW5kYXJkIGNhbGxiYWNrLlxuICAgIC8vIElmIHZhbGlkPT1mYWxzZSBpcyByZXR1cm5lZCwgeW91IGNhbiBzaG93IHlvdXIgdXNlciB0aGUgYWNjb21wYW55aW5nIG1lc3NhZ2UsIGFuZCBpbnZpdGUgdGhlbSB0byBlbnRlciBhbm90aGVyIGNvZGUuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImF1dGhDb2RlXCI+VGhlIGNvZGUgb2J0YWluZWQgYnkgeW91ciB1c2VyIGZyb20gdGhlIG1lcmNoYW50IGNhbGwgY2VudHJlLiBJdCBzaG91bGQgYmUgYSA2LWNoYXJhY3RlciBhbHBoYS1udW1lcmljIHZhbHVlLjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+V2hldGhlciBjb2RlIGhhcyBhIHZhbGlkIGZvcm1hdCBvciBub3QuPC9yZXR1cm5zPlxuICAgIFN1Ym1pdEF1dGhDb2RlKGF1dGhDb2RlKVxuICAgIHtcbiAgICAgICAgaWYgKGF1dGhDb2RlLmxlbmd0aCAhPSA2KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1Ym1pdEF1dGhDb2RlUmVzdWx0KGZhbHNlLCBcIk5vdCBhIDYtZGlnaXQgY29kZS5cIik7ICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkF3YWl0aW5nUGhvbmVGb3JBdXRoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIHNlbmQgYXV0aCBjb2RlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3VibWl0QXV0aENvZGVSZXN1bHQoZmFsc2UsIFwiV2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQXV0aENvZGVTZW50KGBTdWJtaXR0aW5nIEF1dGggQ29kZSAke2F1dGhDb2RlfWApO1xuICAgICAgICB0aGlzLl9zZW5kKG5ldyBBdXRoQ29kZUFkdmljZSh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCwgYXV0aENvZGUpLlRvTWVzc2FnZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJtaXRBdXRoQ29kZVJlc3VsdCh0cnVlLCBcIlZhbGlkIENvZGUuXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEF0dGVtcHRzIHRvIGNhbmNlbCBhIFRyYW5zYWN0aW9uLiBcbiAgICAvLyBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBzZWUgaG93IGl0IGdvZXMuXG4gICAgLy8gV2FpdCBmb3IgdGhlIHRyYW5zYWN0aW9uIHRvIGJlIGZpbmlzaGVkIGFuZCB0aGVuIHNlZSB3aGV0aGVyIGNhbmNlbGxhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxyZXR1cm5zPk1pZFR4UmVzdWx0IC0gZmFsc2Ugb25seSBpZiB5b3UgY2FsbGVkIGl0IGluIHRoZSB3cm9uZyBzdGF0ZTwvcmV0dXJucz5cbiAgICBDYW5jZWxUcmFuc2FjdGlvbigpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIGNhbmNlbCB0cmFuc2FjdGlvbiBidXQgSSB3YXMgbm90IGluIHRoZSBtaWRkbGUgb2Ygb25lLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWlkVHhSZXN1bHQoZmFsc2UsIFwiQXNrZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uIGJ1dCBJIHdhcyBub3QgaW4gdGhlIG1pZGRsZSBvZiBvbmUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEgtMUMsIFRILTNDIC0gTWVyY2hhbnQgcHJlc3NlZCBjYW5jZWxcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlJlcXVlc3RTZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2FuY2VsUmVxID0gbmV3IENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdCgpO1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ2FuY2VsbGluZyhcIkF0dGVtcHRpbmcgdG8gQ2FuY2VsIFRyYW5zYWN0aW9uLi4uXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2VuZChjYW5jZWxSZXEuVG9NZXNzYWdlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gV2UgSGFkIE5vdCBFdmVuIFNlbnQgUmVxdWVzdCBZZXQuIENvbnNpZGVyIGFzIGtub3duIGZhaWxlZC5cbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZhaWxlZChudWxsLCBcIlRyYW5zYWN0aW9uIENhbmNlbGxlZC4gUmVxdWVzdCBIYWQgbm90IGV2ZW4gYmVlbiBzZW50IHlldC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdCh0cnVlLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSBjYXNob3V0IG9ubHkgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QWxwaGFudW1lcmljIElkZW50aWZpZXIgZm9yIHlvdXIgdHJhbnNhY3Rpb24uPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFtb3VudENlbnRzXCI+QW1vdW50IGluIENlbnRzIHRvIGNhc2ggb3V0PC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInN1cmNoYXJnZUFtb3VudFwiPlRoZSBTdXJjaGFyZ2UgQW1vdW50IGluIENlbnRzPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5Jbml0aWF0ZVR4UmVzdWx0PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlQ2FzaG91dE9ubHlUeChwb3NSZWZJZCwgYW1vdW50Q2VudHMsIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBjYXNob3V0T25seVJlcXVlc3QgPSBuZXcgQ2FzaG91dE9ubHlSZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KTtcbiAgICAgICAgY2FzaG91dE9ubHlSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgY2FzaG91dE1zZyA9IGNhc2hvdXRPbmx5UmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5DYXNob3V0T25seSwgYW1vdW50Q2VudHMsIGNhc2hvdXRNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gc2VuZCBjYXNob3V0IHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChjYXNob3V0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIGRvIGNhc2hvdXQgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIkNhc2hvdXQgSW5pdGlhdGVkXCIpO1xuICAgIH0gICAgXG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSBNYWlsIE9yZGVyIC8gVGVsZXBob25lIE9yZGVyIFB1cmNoYXNlIFRyYW5zYWN0aW9uXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5BbHBoYW51bWVyaWMgSWRlbnRpZmllciBmb3IgeW91ciB0cmFuc2FjdGlvbi48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiYW1vdW50Q2VudHNcIj5BbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwic3VyY2hhcmdlQW1vdW50XCI+VGhlIFN1cmNoYXJnZSBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVNb3RvUHVyY2hhc2VUeChwb3NSZWZJZCwgYW1vdW50Q2VudHMsIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBtb3RvUHVyY2hhc2VSZXF1ZXN0ID0gbmV3IE1vdG9QdXJjaGFzZVJlcXVlc3QoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBzdXJjaGFyZ2VBbW91bnQpO1xuICAgICAgICBtb3RvUHVyY2hhc2VSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgY2FzaG91dE1zZyA9IG1vdG9QdXJjaGFzZVJlcXVlc3QuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuTU9UTywgYW1vdW50Q2VudHMsIGNhc2hvdXRNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gc2VuZCBNT1RPIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChjYXNob3V0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIGRvIE1PVE8gZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIk1PVE8gSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHNldHRsZW1lbnQgdHJhbnNhY3Rpb24uXG4gICAgLy8gQmUgc3Vic2NyaWJlZCB0byBUeEZsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIEluaXRpYXRlU2V0dGxlVHgocG9zUmVmSWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZXR0bGVSZXF1ZXN0TXNnID0gbmV3IFNldHRsZVJlcXVlc3QoUmVxdWVzdElkSGVscGVyLklkKFwic2V0dGxlXCIpKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5TZXR0bGUsIDAsIHNldHRsZVJlcXVlc3RNc2csIFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgYSBzZXR0bGUgcmVxdWVzdGApO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHNldHRsZVJlcXVlc3RNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gc2V0dGxlLmApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlNldHRsZSBJbml0aWF0ZWRcIik7ICAgXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIEluaXRpYXRlU2V0dGxlbWVudEVucXVpcnkocG9zUmVmSWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBzdGxFbnFNc2cgPSBuZXcgU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0KFJlcXVlc3RJZEhlbHBlci5JZChcInN0bGVucVwiKSkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuU2V0dGxlbWVudEVucXVpcnksIDAsIHN0bEVucU1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBhIHNldHRsZW1lbnQgZW5xdWlyeVwiKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQoc3RsRW5xTXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChcIkFza2VkIEVGVFBPUyB0byBtYWtlIGEgc2V0dGxlbWVudCBlbnF1aXJ5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJTZXR0bGUgSW5pdGlhdGVkXCIpOyAgIFxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIEdldCBMYXN0IFRyYW5zYWN0aW9uLiBVc2UgdGhpcyB3aGVuIHlvdSB3YW50IHRvIHJldHJpZXZlIHRoZSBtb3N0IHJlY2VudCB0cmFuc2FjdGlvblxuICAgIC8vIHRoYXQgd2FzIHByb2Nlc3NlZCBieSB0aGUgRWZ0cG9zLlxuICAgIC8vIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBJbml0aWF0ZUdldExhc3RUeCgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnbHRSZXF1ZXN0TXNnID0gbmV3IEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QoKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHZhciBwb3NSZWZJZCA9IGdsdFJlcXVlc3RNc2cuSWQ7IC8vIEdldExhc3RUeCBpcyBub3QgdHJ5aW5nIHRvIGdldCBhbnl0aGluZyBzcGVjaWZpYyBiYWNrLiBTbyB3ZSBqdXN0IHVzZSB0aGUgbWVzc2FnZSBpZC5cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLkdldExhc3RUcmFuc2FjdGlvbiwgMCwgZ2x0UmVxdWVzdE1zZywgXG4gICAgICAgICAgICBcIldhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgYSBHZXQtTGFzdC1UcmFuc2FjdGlvbiByZXF1ZXN0LlwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLl9zZW5kKGdsdFJlcXVlc3RNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgZm9yIGxhc3QgdHJhbnNhY3Rpb24uYCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJHTFQgSW5pdGlhdGVkXCIpOyAgIFxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgaXMgdXNlZnVsIHRvIHJlY292ZXIgZnJvbSB5b3VyIFBPUyBjcmFzaGluZyBpbiB0aGUgbWlkZGxlIG9mIGEgdHJhbnNhY3Rpb24uXG4gICAgLy8gV2hlbiB5b3UgcmVzdGFydCB5b3VyIFBPUywgaWYgeW91IGhhZCBzYXZlZCBlbm91Z2ggc3RhdGUsIHlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCB0byByZWNvdmVyIHRoZSBjbGllbnQgbGlicmFyeSBzdGF0ZS5cbiAgICAvLyBZb3UgbmVlZCB0byBoYXZlIHRoZSBwb3NSZWZJZCB0aGF0IHlvdSBwYXNzZWQgaW4gd2l0aCB0aGUgb3JpZ2luYWwgdHJhbnNhY3Rpb24sIGFuZCB0aGUgdHJhbnNhY3Rpb24gdHlwZS5cbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBpbW1lZGlhdGVseSB3aGV0aGVyIHJlY292ZXJ5IGhhcyBzdGFydGVkIG9yIG5vdC5cbiAgICAvLyBJZiByZWNvdmVyeSBoYXMgc3RhcnRlZCwgeW91IG5lZWQgdG8gYnJpbmcgdXAgdGhlIHRyYW5zYWN0aW9uIG1vZGFsIHRvIHlvdXIgdXNlciBhIGJlIGxpc3RlbmluZyB0byBUeEZsb3dTdGF0ZUNoYW5nZWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5UaGUgaXMgdGhhdCB5b3UgaGFkIGFzc2lnbmVkIHRvIHRoZSB0cmFuc2FjdGlvbiB0aGF0IHlvdSBhcmUgdHJ5aW5nIHRvIHJlY292ZXIuPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInR4VHlwZVwiPlRoZSB0cmFuc2FjdGlvbiB0eXBlLjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlUmVjb3ZlcnkocG9zUmVmSWQsIHR4VHlwZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgXG4gICAgICAgIHZhciBnbHRSZXF1ZXN0TXNnID0gbmV3IEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QoKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgdHhUeXBlLCAwLCBnbHRSZXF1ZXN0TXNnLCBcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gYXR0ZW1wdCByZWNvdmVyeS5cIik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fc2VuZChnbHRSZXF1ZXN0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIHJlY292ZXIgc3RhdGUuYCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJSZWNvdmVyeSBJbml0aWF0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gR2x0TWF0Y2ggYXR0ZW1wdHMgdG8gY29uY2x1ZGUgd2hldGhlciBhIGdsdFJlc3BvbnNlIG1hdGNoZXMgYW4gZXhwZWN0ZWQgdHJhbnNhY3Rpb24gYW5kIHJldHVybnNcbiAgICAvLyB0aGUgb3V0Y29tZS4gXG4gICAgLy8gSWYgU3VjY2Vzcy9GYWlsZWQgaXMgcmV0dXJuZWQsIGl0IG1lYW5zIHRoYXQgdGhlIGd0bFJlc3BvbnNlIGRpZCBtYXRjaCwgYW5kIHRoYXQgdHJhbnNhY3Rpb24gd2FzIHN1Y2Nlc2Z1bC9mYWlsZWQuXG4gICAgLy8gSWYgVW5rbm93biBpcyByZXR1cm5lZCwgaXQgbWVhbnMgdGhhdCB0aGUgZ2x0UmVzcG9uc2UgZG9lcyBub3QgbWF0Y2ggdGhlIGV4cGVjdGVkIHRyYW5zYWN0aW9uLiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJnbHRSZXNwb25zZVwiPlRoZSBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSBtZXNzYWdlIHRvIGNoZWNrPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+VGhlIFJlZmVyZW5jZSBJZCB0aGF0IHlvdSBwYXNzZWQgaW4gd2l0aCB0aGUgb3JpZ2luYWwgcmVxdWVzdC48L3BhcmFtPlxuXG4gICAgLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIEdsdE1hdGNoKGdsdFJlc3BvbnNlLCBwb3NSZWZJZCwgLi4uZGVwcmVjYXRlZEFyZ3MpIFxuICAgIHtcbiAgICAgICAgLy8gT2Jzb2xldGUgbWV0aG9kIGNhbGwgY2hlY2tcbiAgICAgICAgLy8gT2xkIGludGVyZmFjZTogR2x0TWF0Y2goR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UgZ2x0UmVzcG9uc2UsIFRyYW5zYWN0aW9uVHlwZSBleHBlY3RlZFR5cGUsIGludCBleHBlY3RlZEFtb3VudCwgRGF0ZVRpbWUgcmVxdWVzdFRpbWUsIHN0cmluZyBwb3NSZWZJZClcbiAgICAgICAgaWYoZGVwcmVjYXRlZEFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZihkZXByZWNhdGVkQXJncy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiT2Jzb2xldGUgbWV0aG9kIGNhbGwgZGV0ZWN0ZWQ6IFVzZSBHbHRNYXRjaChnbHRSZXNwb25zZSwgcG9zUmVmSWQpXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkdsdE1hdGNoKGdsdFJlc3BvbnNlLCBkZXByZWNhdGVkQXJnc1syXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ic29sZXRlIG1ldGhvZCBjYWxsIHdpdGggdW5rbm93biBhcmdzOiBVc2UgR2x0TWF0Y2goR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UgZ2x0UmVzcG9uc2UsIHN0cmluZyBwb3NSZWZJZClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2cuaW5mbyhgR0xUIENIRUNLOiBQb3NSZWZJZDogJHtwb3NSZWZJZH0tPiR7Z2x0UmVzcG9uc2UuR2V0UG9zUmVmSWQoKX1gKTtcblxuICAgICAgICBpZiAoIXBvc1JlZklkID09IGdsdFJlc3BvbnNlLkdldFBvc1JlZklkKCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTdWNjZXNzU3RhdGUuVW5rbm93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnbHRSZXNwb25zZS5HZXRTdWNjZXNzU3RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgLy8gcmVnaW9uIEludGVybmFscyBmb3IgUGFpcmluZyBGbG93XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBIYW5kbGluZyB0aGUgMm5kIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgS2V5UmVxdWVzdC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+aW5jb21pbmcgbWVzc2FnZTwvcGFyYW0+XG4gICAgX2hhbmRsZUtleVJlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiTmVnb3RpYXRpbmcgUGFpcmluZy4uLlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuXG4gICAgICAgIC8vIFVzZSB0aGUgaGVscGVyLiBJdCB0YWtlcyB0aGUgaW5jb21pbmcgcmVxdWVzdCwgYW5kIGdlbmVyYXRlcyB0aGUgc2VjcmV0cyBhbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICB2YXIgcGggICAgICA9IG5ldyBQYWlyaW5nSGVscGVyKCk7XG4gICAgICAgIHZhciByZXN1bHQgID0gcGguR2VuZXJhdGVTZWNyZXRzQW5kS2V5UmVzcG9uc2UobmV3IEtleVJlcXVlc3QobSkpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gcmVzdWx0LlNlY3JldHM7IC8vIHdlIG5vdyBoYXZlIHNlY3JldHMsIGFsdGhvdWdoIHBhaXJpbmcgaXMgbm90IGZ1bGx5IGZpbmlzaGVkIHlldC5cbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSB0aGlzLl9zZWNyZXRzOyAvLyB1cGRhdGluZyBvdXIgc3RhbXAgd2l0aCB0aGUgc2VjcmV0cyBzbyBjYW4gZW5jcnlwdCBtZXNzYWdlcyBsYXRlci5cbiAgICAgICAgdGhpcy5fc2VuZChyZXN1bHQuS2V5UmVzcG9uc2UuVG9NZXNzYWdlKCkpOyAvLyBzZW5kIHRoZSBrZXlfcmVzcG9uc2UsIGkuZS4gaW50ZXJhY3Rpb24gMyBvZiBwYWlyaW5nLlxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA0dGggaW50ZXJhY3Rpb24gb2YgdGhlIHBhaXJpbmcgcHJvY2VzcyBpLmUuIGFuIGluY29taW5nIEtleUNoZWNrLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVLZXlDaGVjayhtKVxuICAgIHtcbiAgICAgICAgdmFyIGtleUNoZWNrID0gbmV3IEtleUNoZWNrKG0pO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkNvbmZpcm1hdGlvbkNvZGUgPSBrZXlDaGVjay5Db25maXJtYXRpb25Db2RlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyBzaG93aW5nIG9uIHRoZSBUZXJtaW5hbFwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA1dGggYW5kIGZpbmFsIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgUGFpclJlc3BvbnNlXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVBhaXJSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIHBhaXJSZXNwID0gbmV3IFBhaXJSZXNwb25zZShtKTtcblxuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gZmFsc2U7XG4gICAgICAgIGlmIChwYWlyUmVzcC5TdWNjZXNzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBTdGlsbCBXYWl0aW5nIGZvciBVc2VyIHRvIHNheSB5ZXMgb24gUE9TXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJHb3QgUGFpciBDb25maXJtIGZyb20gRWZ0cG9zLCBidXQgc3RpbGwgd2FpdGluZyBmb3IgdXNlIHRvIGNvbmZpcm0gZnJvbSBQT1MuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyB3aGF0IHRoZSBFRlRQT1Mgc2hvd2VkXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkdvdCBQYWlyIENvbmZpcm0gZnJvbSBFZnRwb3MsIGFuZCBhbHJlYWR5IGhhZCBjb25maXJtIGZyb20gUE9TLiBOb3cganVzdCB3YWl0aW5nIGZvciBmaXJzdCBwb25nLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblBhaXJpbmdTdWNjZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJIG5lZWQgdG8gcGluZy9sb2dpbiBldmVuIGlmIHRoZSBwb3MgdXNlciBoYXMgbm90IHNhaWQgeWVzIHlldCwgXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG90aGVyd2lzZSB3aXRoaW4gNSBzZWNvbmRzIGNvbm5lY3Rpb25nIHdpbGwgYmUgZHJvcHBlZCBieSBlZnRwb3MuXG4gICAgICAgICAgICB0aGlzLl9zdGFydFBlcmlvZGljUGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlRHJvcEtleXNBZHZpY2UobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiRWZ0cG9zIHdhcyBVbnBhaXJlZC4gSSBzaGFsbCB1bnBhaXIgZnJvbSBteSBlbmQgYXMgd2VsbC5cIik7XG4gICAgICAgIHRoaXMuX2RvVW5wYWlyKCk7XG4gICAgfVxuXG4gICAgX29uUGFpcmluZ1N1Y2Nlc3MoKVxuICAgIHtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5TdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiUGFpcmluZyBTdWNjZXNzZnVsIVwiO1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuUGFpcmVkQ29ubmVjdGVkO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9vblBhaXJpbmdGYWlsZWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29ubi5EaXNjb25uZWN0KCk7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlVucGFpcmVkO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLk1lc3NhZ2UgPSBcIlBhaXJpbmcgRmFpbGVkXCI7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLlN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9kb1VucGFpcigpXG4gICAge1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuVW5wYWlyZWQ7XG4gICAgICAgIHRoaXMuX2Nvbm4uRGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB0aGUgc2VydmVyIGFza3MgdXMgdG8gcm9sbCBvdXIgc2VjcmV0cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlS2V5Um9sbGluZ1JlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIC8vIHdlIGNhbGN1bGF0ZSB0aGUgbmV3IG9uZXMuLi5cbiAgICAgICAgdmFyIGtyUmVzID0gS2V5Um9sbGluZ0hlbHBlci5QZXJmb3JtS2V5Um9sbGluZyhtLCB0aGlzLl9zZWNyZXRzKTtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IGtyUmVzLk5ld1NlY3JldHM7IC8vIGFuZCB1cGRhdGUgb3VyIHNlY3JldHMgd2l0aCB0aGVtXG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gdGhpcy5fc2VjcmV0czsgLy8gYW5kIG91ciBzdGFtcFxuICAgICAgICB0aGlzLl9zZW5kKGtyUmVzLktleVJvbGxpbmdDb25maXJtYXRpb24pOyAvLyBhbmQgd2UgdGVsbCB0aGUgc2VydmVyIHRoYXQgYWxsIGlzIHdlbGwuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTZWNyZXRzQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NlY3JldHN9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGEgY3VzdG9tZXIgc2lnbmF0dXJlIGlzIHJlcWlyZWQuXG4gICAgLy8gV2UgbmVlZCB0byBhc2sgdGhlIGN1c3RvbWVyIHRvIHNpZ24gdGhlIGluY29taW5nIHJlY2VpcHQuXG4gICAgLy8gQW5kIHRoZW4gdGVsbCB0aGUgcGlucGFkIHdoZXRoZXIgdGhlIHNpZ25hdHVyZSBpcyBvayBvciBub3QuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2lnbmF0dXJlIFJlcXVpcmVkIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVxdWlyZWQobmV3IFNpZ25hdHVyZVJlcXVpcmVkKG0pLCBcIkFzayBDdXN0b21lciB0byBTaWduIHRoZSBSZWNlaXB0XCIpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGFuIGF1dGggY29kZSBpcyByZXF1aXJlZC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlQXV0aENvZGVSZXF1aXJlZChtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQgPT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgX2xvZy5pbmZvKGBSZWNlaXZlZCBBdXRoIENvZGUgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGhvbmVGb3JBdXRoUmVxdWlyZWQgPSBuZXcgUGhvbmVGb3JBdXRoUmVxdWlyZWQobSk7XG4gICAgICAgIHZhciBtc2cgPSBgQXV0aCBDb2RlIFJlcXVpcmVkLiBDYWxsICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0UGhvbmVOdW1iZXIoKX0gYW5kIHF1b3RlIG1lcmNoYW50IGlkICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0TWVyY2hhbnRJZCgpfWA7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKHBob25lRm9yQXV0aFJlcXVpcmVkLCBtc2cpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgUHVyY2hhc2VSZXF1ZXN0IHdpdGggYSBQdXJjaGFzZVJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVQdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUHVyY2hhc2UgcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1cImApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiUHVyY2hhc2UgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGUgUGluUGFkIHNlcnZlciB3aWxsIHJlcGx5IHRvIG91ciBDYXNob3V0T25seVJlcXVlc3Qgd2l0aCBhIENhc2hvdXRPbmx5UmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUNhc2hvdXRPbmx5UmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBDYXNob3V0IFJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJDYXNob3V0IFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgTW90b1B1cmNoYXNlUmVxdWVzdCB3aXRoIGEgTW90b1B1cmNoYXNlUmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZU1vdG9QdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgTW90byBSZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gSW5jb21pbmcgUG9zIFJlZiBJRDogJHtpbmNvbWluZ1Bvc1JlZklkfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiTW90byBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH0gICBcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoZSBQaW5QYWQgc2VydmVyIHdpbGwgcmVwbHkgdG8gb3VyIFJlZnVuZFJlcXVlc3Qgd2l0aCBhIFJlZnVuZFJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVSZWZ1bmRSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUmVmdW5kIHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3IgdGhpcyBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlJlZnVuZCBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRPRE86IEhhbmRsZSB0aGUgU2V0dGxlbWVudCBSZXNwb25zZSByZWNlaXZlZCBmcm9tIHRoZSBQaW5QYWRcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBIYW5kbGVTZXR0bGVSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIFNldHRsZSByZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gJHttLkRlY3J5cHRlZEpzb259YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJTZXR0bGUgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsZSB0aGUgU2V0dGxlbWVudCBFbnF1aXJ5IFJlc3BvbnNlIHJlY2VpdmVkIGZyb20gdGhlIFBpblBhZFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2V0dGxlbWVudCBFbnF1aXJ5IHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiAke20uRGVjcnlwdGVkSnNvbn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlNldHRsZW1lbnQgRW5xdWlyeSBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB3ZSByZWNlaXZlIGV2ZW50IHR5cGUgXCJlcnJvclwiIGZyb20gdGhlIHNlcnZlciwgc3VjaCBhcyB3aGVuIGNhbGxpbmcgY2FuY2VsX3RyYW5zYWN0aW9uIGFuZCB0aGVyZSBpcyBubyB0cmFuc2FjdGlvbiBpbiBwcm9ncmVzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlRXJyb3JFdmVudChtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvblxuICAgICAgICAgICAgJiYgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkXG4gICAgICAgICAgICAmJiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5BdHRlbXB0aW5nVG9DYW5jZWxcbiAgICAgICAgICAgICYmIG0uR2V0RXJyb3IoKSA9PSBcIk5PX1RSQU5TQUNUSU9OXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRILTJFXG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgV2FzIHRyeWluZyB0byBjYW5jZWwgYSB0cmFuc2FjdGlvbiBidXQgdGhlcmUgaXMgbm90aGluZyB0byBjYW5jZWwuIENhbGxpbmcgR0xUIHRvIHNlZSB3aGF0J3MgdXBgKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBFcnJvciBFdmVudCBCdXQgRG9uJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggaXQuICR7bS5EZWNyeXB0ZWRKc29ufWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gV2hlbiB0aGUgUGluUGFkIHJldHVybnMgdG8gdXMgd2hhdCB0aGUgTGFzdCBUcmFuc2FjdGlvbiB3YXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgdHhTdGF0ZSA9IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHR4U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFdlIHdlcmUgbm90IGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbiwgd2hvIGNhcmVzP1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEgtNCBXZSB3ZXJlIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi5cbiAgICAgICAgLy8gTGV0J3MgYXR0ZW1wdCByZWNvdmVyeS4gVGhpcyBpcyBzdGVwIDQgb2YgVHJhbnNhY3Rpb24gUHJvY2Vzc2luZyBIYW5kbGluZ1xuICAgICAgICB0aGlzLl9sb2cuaW5mbyhgR290IExhc3QgVHJhbnNhY3Rpb24uLmApO1xuICAgICAgICB0eFN0YXRlLkdvdEdsdFJlc3BvbnNlKCk7XG4gICAgICAgIHZhciBndGxSZXNwb25zZSA9IG5ldyBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZShtKTtcbiAgICAgICAgdHhTdGF0ZS5HTFRSZXNwb25zZVBvc1JlZklkID0gZ3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKTtcbiAgICAgICAgaWYgKCFndGxSZXNwb25zZS5XYXNSZXRyaWV2ZWRTdWNjZXNzZnVsbHkoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGd0bFJlc3BvbnNlLklzU3RpbGxJblByb2dyZXNzKHR4U3RhdGUuUG9zUmVmSWQpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFRILTRFIC0gT3BlcmF0aW9uIEluIFByb2dyZXNzXG5cbiAgICAgICAgICAgICAgICBpZiAoZ3RsUmVzcG9uc2UuSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UoKSAmJiAhdHhTdGF0ZS5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBzaWduYXR1cmUgYWNjZXB0L2RlY2xpbmUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSB1c2VyIGNhbiBvbmx5IHJlYWxseSBkZWNsaW5lIGF0IHRoaXMgc3RhZ2UgYXMgdGhlcmUgaXMgbm8gcmVjZWlwdCB0byBwcmludCBmb3Igc2lnbmluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNpZ25hdHVyZVJlcXVpcmVkKG5ldyBTaWduYXR1cmVSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIk1JU1NJTkcgUkVDRUlQVFxcbiBERUNMSU5FIEFORCBUUlkgQUdBSU4uXCIpLCBcIlJlY292ZXJlZCBpbiBTaWduYXR1cmUgUmVxdWlyZWQgYnV0IHdlIGRvbid0IGhhdmUgcmVjZWlwdC4gWW91IG1heSBEZWNsaW5lIHRoZW4gUmV0cnkuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5Jc1dhaXRpbmdGb3JBdXRoQ29kZSgpICYmICF0eFN0YXRlLkF3YWl0aW5nUGhvbmVGb3JBdXRoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBhdXRoIGNvZGUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlIGNhbiBvbmx5IGNhbmNlbCB0aGUgdHJhbnNhY3Rpb24gYXQgdGhpcyBzdGFnZSBhcyB3ZSBkb24ndCBoYXZlIGVub3VnaCBpbmZvcm1hdGlvbiB0byByZWNvdmVyIGZyb20gdGhpcy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKG5ldyBQaG9uZUZvckF1dGhSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIlVOS05PV05cIiwgXCJVTktOT1dOXCIpLCBcIlJlY292ZXJlZCBtaWQgUGhvbmUtRm9yLUF1dGggYnV0IGRvbid0IGhhdmUgZGV0YWlscy4gWW91IG1heSBDYW5jZWwgdGhlbiBSZXRyeS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiT3BlcmF0aW9uIHN0aWxsIGluIHByb2dyZXNzLi4uIHN0YXkgd2FpdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gcHVibGlzaCB0eEZsb3dTdGF0ZUNoYW5nZWQuIENhbiByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5XYXNUaW1lT3V0T2ZTeW5jRXJyb3IoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBub3QgZ2l2ZSB1cCBiYXNlZCBvbiBhIFRPT1MgZXJyb3IuXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgbG9nIGl0LCBhbmQgaWdub3JlIGl0LiBcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgVGltZS1PdXQtT2YtU3luYyBlcnJvciBpbiBHZXQgTGFzdCBUcmFuc2FjdGlvbiByZXNwb25zZS4gTGV0J3MgaWdub3JlIGl0IGFuZCB3ZSdsbCB0cnkgYWdhaW4uYCk7XG4gICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBwdWJsaXNoIHR4Rmxvd1N0YXRlQ2hhbmdlZC4gQ2FuIHJldHVybjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtNFggLSBVbmV4cGVjdGVkIFJlc3BvbnNlIHdoZW4gcmVjb3ZlcmluZ1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBVbmV4cGVjdGVkIFJlc3BvbnNlIGluIEdldCBMYXN0IFRyYW5zYWN0aW9uIGR1cmluZyAtIFJlY2VpdmVkIHBvc1JlZklkOiR7Z3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKX0gRXJyb3I6JHttLkdldEVycm9yKCl9YCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiVW5leHBlY3RlZCBFcnJvciB3aGVuIHJlY292ZXJpbmcgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eFN0YXRlLlR5cGUgPT0gVHJhbnNhY3Rpb25UeXBlLkdldExhc3RUcmFuc2FjdGlvbilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSElTIFdBUyBBIFBMQUlOIEdFVCBMQVNUIFRSQU5TQUNUSU9OIFJFUVVFU1QsIE5PVCBGT1IgUkVDT1ZFUlkgUFVSUE9TRVMuXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJSZXRyaWV2ZWQgTGFzdCBUcmFuc2FjdGlvbiBhcyBhc2tlZCBkaXJlY3RseSBieSB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgZ3RsUmVzcG9uc2UuQ29weU1lcmNoYW50UmVjZWlwdFRvQ3VzdG9tZXJSZWNlaXB0KCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJMYXN0IFRyYW5zYWN0aW9uIFJldHJpZXZlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC00QSAtIExldCdzIHRyeSB0byBtYXRjaCB0aGUgcmVjZWl2ZWQgbGFzdCB0cmFuc2FjdGlvbiBhZ2FpbnN0IHRoZSBjdXJyZW50IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NTdGF0ZSA9IHRoaXMuR2x0TWF0Y2goZ3RsUmVzcG9uc2UsIHR4U3RhdGUuUG9zUmVmSWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzU3RhdGUgPT0gU3VjY2Vzc1N0YXRlLlVua25vd24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBUSC00TjogRGlkbid0IE1hdGNoIG91ciB0cmFuc2FjdGlvbi4gQ29uc2lkZXIgVW5rbm93biBTdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJEaWQgbm90IG1hdGNoIHRyYW5zYWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiRmFpbGVkIHRvIHJlY292ZXIgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVEgtNFk6IFdlIE1hdGNoZWQsIHRyYW5zYWN0aW9uIGZpbmlzaGVkLCBsZXQncyB1cGRhdGUgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGd0bFJlc3BvbnNlLkNvcHlNZXJjaGFudFJlY2VpcHRUb0N1c3RvbWVyUmVjZWlwdCgpO1xuICAgICAgICAgICAgICAgICAgICB0eFN0YXRlLkNvbXBsZXRlZChzdWNjZXNzU3RhdGUsIG0sIFwiVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHR4U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy9XaGVuIHRoZSB0cmFuc2FjdGlvbiBjYW5jZWwgcmVzcG9uc2UgaXMgcmV0dXJuZWQuXG4gICAgX2hhbmRsZUNhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBDYW5jZWwgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eFN0YXRlID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIHZhciBjYW5jZWxSZXNwb25zZSA9IG5ldyBDYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlKG0pO1xuXG4gICAgICAgIGlmIChjYW5jZWxSZXNwb25zZS5TdWNjZXNzKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJGYWlsZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uOiByZWFzb249XCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvclJlYXNvbigpICsgXCIsIGRldGFpbD1cIiArIGNhbmNlbFJlc3BvbnNlLkdldEVycm9yRGV0YWlsKCkpO1xuXG4gICAgICAgIHR4U3RhdGUuQ2FuY2VsRmFpbGVkKFwiRmFpbGVkIHRvIGNhbmNlbCB0cmFuc2FjdGlvbjogXCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvckRldGFpbCgpICsgXCIuIENoZWNrIEVGVFBPUy5cIik7XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0eFN0YXRlfSkpO1xuICAgIH1cblxuICAgIF9zdGFydFRyYW5zYWN0aW9uTW9uaXRvcmluZ1RocmVhZCgpXG4gICAge1xuICAgICAgICB2YXIgbmVlZHNQdWJsaXNoaW5nID0gZmFsc2U7XG4gICAgXG4gICAgICAgIHZhciB0eFN0YXRlID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuVHJhbnNhY3Rpb24gJiYgIXR4U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHR4U3RhdGU7XG4gICAgICAgICAgICBpZiAoc3RhdGUuQXR0ZW1wdGluZ1RvQ2FuY2VsICYmIERhdGUubm93KCkgPiBzdGF0ZS5DYW5jZWxBdHRlbXB0VGltZSArIHRoaXMuX21heFdhaXRGb3JDYW5jZWxUeClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0yVCAtIHRvbyBsb25nIHNpbmNlIGNhbmNlbCBhdHRlbXB0IC0gQ29uc2lkZXIgdW5rbm93blxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBCZWVuIHRvbyBsb25nIHdhaXRpbmcgZm9yIHRyYW5zYWN0aW9uIHRvIGNhbmNlbC5gKTtcbiAgICAgICAgICAgICAgICB0eFN0YXRlLlVua25vd25Db21wbGV0ZWQoYFdhaXRlZCBsb25nIGVub3VnaCBmb3IgQ2FuY2VsIFRyYW5zYWN0aW9uIHJlc3VsdC4gQ2hlY2sgRUZUUE9TLiBgKTtcbiAgICAgICAgICAgICAgICBuZWVkc1B1Ymxpc2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUuUmVxdWVzdFNlbnQgJiYgRGF0ZS5ub3coKSA+IHN0YXRlLkxhc3RTdGF0ZVJlcXVlc3RUaW1lICsgdGhpcy5fY2hlY2tPblR4RnJlcXVlbmN5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFRILTFULCBUSC00VCAtIEl0J3MgYmVlbiBhIHdoaWxlIHNpbmNlIHdlIHJlY2VpdmVkIGFuIHVwZGF0ZSwgbGV0J3MgY2FsbCBhIEdMVFxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBDaGVja2luZyBvbiBvdXIgdHJhbnNhY3Rpb24uIExhc3Qgd2UgYXNrZWQgd2FzIGF0ICR7c3RhdGUuTGFzdFN0YXRlUmVxdWVzdFRpbWV9Li4uYCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5DYWxsaW5nR2x0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbEdldExhc3RUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobmVlZHNQdWJsaXNoaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3N0YXJ0VHJhbnNhY3Rpb25Nb25pdG9yaW5nVGhyZWFkKCksIHRoaXMuX3R4TW9uaXRvckNoZWNrRnJlcXVlbmN5KTtcbiAgICB9XG5cbiAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgLy8gcmVnaW9uIEludGVybmFscyBmb3IgQ29ubmVjdGlvbiBNYW5hZ2VtZW50XG5cbiAgICBfcmVzZXRDb25uKClcbiAgICB7XG4gICAgICAgIC8vIFNldHVwIHRoZSBDb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX2Nvbm4gPSBuZXcgQ29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG91ciBFdmVudCBIYW5kbGVyc1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIChlKSA9PiB0aGlzLl9vblNwaUNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkKGUuZGV0YWlsKSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01lc3NhZ2VSZWNlaXZlZCcsIChlKSA9PiB0aGlzLl9vblNwaU1lc3NhZ2VSZWNlaXZlZChlLmRldGFpbCkpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdFcnJvclJlY2VpdmVkJywgKGUpID0+IHRoaXMuX29uV3NFcnJvclJlY2VpdmVkKGUuZGV0YWlsKSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGF0dXMgY2hhbmdlcy5cbiAgICAvLyBZb3UgYXJlIGVuY291cmFnZWQgdG8gZGlzcGxheSBhIFBpblBhZCBDb25uZWN0aW9uIEluZGljYXRvciBvbiB0aGUgUE9TIHNjcmVlbi5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJzdGF0ZVwiPjwvcGFyYW0+XG4gICAgX29uU3BpQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQoc3RhdGUpXG4gICAge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlLkNvbm5lY3Rpb25TdGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIENvbm5lY3RpbmcgdG8gdGhlIEVmdHBvcyBhdCAke3RoaXMuX2VmdHBvc0FkZHJlc3N9Li4uYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXRyaWVzU2luY2VMYXN0RGV2aWNlQWRkcmVzc1Jlc29sdXRpb24gPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5QYWlyaW5nICYmIHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLk1lc3NhZ2UgPSBcIlJlcXVlc3RpbmcgdG8gUGFpci4uLlwiO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHIgPSBQYWlyaW5nSGVscGVyLk5ld1BhaXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQocHIuVG9NZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIENvbm5lY3RlZCB0byAke3RoaXMuX2VmdHBvc0FkZHJlc3N9Li4uYCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gdGhpcy5fc2VjcmV0cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDpcbiAgICAgICAgICAgICAgICAvLyBMZXQncyByZXNldCBzb21lIGxpZmVjeWNsZSByZWxhdGVkIHRvIGNvbm5lY3Rpb24gc3RhdGUsIHJlYWR5IGZvciBuZXh0IGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIGRpc2Nvbm5lY3RlZCBmcm9tICR7dGhpcy5fZWZ0cG9zQWRkcmVzc30uLi5gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3N0UmVjZW50UGluZ1NlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21pc3NlZFBvbmdzQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3Rpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbiwganVzdCBzbyB5b3Uga25vdyFcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRILTFEXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgTG9zdCBjb25uZWN0aW9uIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi4uLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29ubiA9PSBudWxsKSByZXR1cm47IC8vIFRoaXMgbWVhbnMgdGhlIGluc3RhbmNlIGhhcyBiZWVuIGRpc3Bvc2VkLiBBYm9ydGluZy5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uID49IHRoaXMuX3JldHJpZXNCZWZvcmVSZXNvbHZpbmdEZXZpY2VBZGRyZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgV2lsbCB0cnkgdG8gcmVjb25uZWN0IGluICR7dGhpcy5fc2xlZXBCZWZvcmVSZWNvbm5lY3RNc31tcy4uLmApO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgbm9uLWJsb2NraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY29ubikgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uLkNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuX3NsZWVwQmVmb3JlUmVjb25uZWN0TXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuUGFpcmluZylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiTG9zdCBDb25uZWN0aW9uIGR1cmluZyBwYWlyaW5nLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5NZXNzYWdlID0gXCJDb3VsZCBub3QgQ29ubmVjdCB0byBQYWlyLiBDaGVjayBOZXR3b3JrIGFuZCBUcnkgQWdhaW4uLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdQYWlyaW5nRmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGV9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHN0YXRlOiAnICsgc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBpcyBhbiBpbXBvcnRhbnQgcGllY2Ugb2YgdGhlIHB1enpsZS4gSXQncyBhIGJhY2tncm91bmQgdGhyZWFkIHRoYXQgcGVyaW9kaWNhbGx5XG4gICAgLy8gc2VuZHMgUGluZ3MgdG8gdGhlIHNlcnZlci4gSWYgaXQgZG9lc24ndCByZWNlaXZlIFBvbmdzLCBpdCBjb25zaWRlcnMgdGhlIGNvbm5lY3Rpb24gYXMgYnJva2VuXG4gICAgLy8gc28gaXQgZGlzY29ubmVjdHMuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBfc3RhcnRQZXJpb2RpY1BpbmcoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgdGhpcy5fcGVyaW9kaWNQaW5nVGhyZWFkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5fcGVyaW9kaWNQaW5nKCksdGhpcy5fcGluZ0ZyZXF1ZW5jeSk7XG4gICAgICAgIHRoaXMuX3BlcmlvZGljUGluZygpO1xuICAgIH1cblxuICAgIF9wZXJpb2RpY1BpbmcoKSB7XG4gICAgICAgIC8vIHdoaWxlIGknbSBzdGlsbCBjb25uZWN0ZWQgQU5EIHBhaXJlZC4uLlxuICAgICAgICBpZih0aGlzLl9jb25uLkNvbm5lY3RlZCAmJiB0aGlzLl9zZWNyZXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvUGluZygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9zdFJlY2VudFBpbmdTZW50ICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPT0gbnVsbCB8fCB0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkLklkICE9IHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudC5JZCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9taXNzZWRQb25nc0NvdW50ICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEVmdHBvcyBkaWRuJ3QgcmVwbHkgdG8gbXkgUGluZy4gTWlzc2VkIENvdW50OiAke3RoaXMuX21pc3NlZFBvbmdzQ291bnR9LyR7dGhpcy5fbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3R9LmApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9taXNzZWRQb25nc0NvdW50IDwgdGhpcy5fbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiVHJ5aW5nIGFub3RoZXIgcGluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0UGVyaW9kaWNQaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UgaGF2ZSBub3QgcmVjZWl2ZWQgYSBwb25nIGZvciBvdXIgbW9zdCByZWNlbnQgcGluZy5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY29uc2lkZXIgdGhpcyBjb25uZWN0aW9uIGFzIGJyb2tlbi5cbiAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgRGlzY29ubmVjdC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJEaXNjb25uZWN0aW5nLi4uXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uLkRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RvcFBlcmlvZGljUGluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX21pc3NlZFBvbmdzQ291bnQgPSAwO1xuXG4gICAgICAgICAgICB9LHRoaXMuX3BvbmdUaW1lb3V0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFBlcmlvZGljUGluZygpO1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJDYW5jZWxsaW5nIHBlcmlvZGljIHBpbmcgYXMgd2VyZSBkaXNjb25uZWN0ZWQgb3Igbm90IHBhaXJlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFdlIGNhbGwgdGhpcyBvdXJzZWx2ZXMgYXMgc29vbiBhcyB3ZSdyZSByZWFkeSB0byB0cmFuc2FjdCB3aXRoIHRoZSBQaW5QYWQgYWZ0ZXIgYSBjb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgZWZmZWN0aXZlbHkgY2FsbGVkIGFmdGVyIHdlIHJlY2VpdmVkIHRoZSBmaXJzdCBMb2dpbiBSZXNwb25zZSBmcm9tIHRoZSBQaW5QYWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIF9vblJlYWR5VG9UcmFuc2FjdCgpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIk9uIFJlYWR5IFRvIFRyYW5zYWN0IVwiKTtcblxuICAgICAgICAvLyBTbywgd2UgaGF2ZSBqdXN0IG1hZGUgYSBjb25uZWN0aW9uLCBwaW5nZWQgYW5kIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkuXG4gICAgICAgIHRoaXMuQ3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5SZXF1ZXN0U2VudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0zQSAtIFdlJ3ZlIGp1c3QgcmVjb25uZWN0ZWQgYW5kIHdlcmUgaW4gdGhlIG1pZGRsZSBvZiBUeC5cbiAgICAgICAgICAgICAgICAvLyBMZXQncyBnZXQgdGhlIGxhc3QgdHJhbnNhY3Rpb24gdG8gY2hlY2sgd2hhdCB3ZSBtaWdodCBoYXZlIG1pc3NlZCBvdXQgb24uXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ2FsbGluZ0dsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0zQVIgLSBXZSBoYWQgbm90IGV2ZW4gc2VudCB0aGUgcmVxdWVzdCB5ZXQuIExldCdzIGRvIHRoYXQgbm93XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZCh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5SZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBTZW5kaW5nIFJlcXVlc3QgTm93Li4uYCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gbGV0J3MgYWxzbyB0ZWxsIHRoZSBlZnRwb3Mgb3VyIGxhdGVzdCB0YWJsZSBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgaWYodGhpcy5fc3BpUGF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0LlB1c2hQYXlBdFRhYmxlQ29uZmlnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBXaGVuIHdlIGRpc2Nvbm5lY3QsIHdlIHNob3VsZCBhbHNvIHN0b3AgdGhlIHBlcmlvZGljIHBpbmcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIF9zdG9wUGVyaW9kaWNQaW5nKCkge1xuICAgICAgICBpZih0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgYWxyZWFkeSBzZXQgdXAsIGNsZWFuIHVwIGJlZm9yZSByZXN0YXJ0aW5nLlxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQpO1xuICAgICAgICAgICAgdGhpcy5fcGVyaW9kaWNQaW5nVGhyZWFkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNlbmQgYSBQaW5nIHRvIHRoZSBTZXJ2ZXJcbiAgICBfZG9QaW5nKClcbiAgICB7XG4gICAgICAgIHZhciBwaW5nID0gUGluZ0hlbHBlci5HZW5lcmF0ZVBpbmdSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudCA9IHBpbmc7XG4gICAgICAgIHRoaXMuX3NlbmQocGluZyk7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFJlY2VpdmVkIGEgUG9uZyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlSW5jb21pbmdQb25nKG0pXG4gICAge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1haW50YWluIHRoaXMgdGltZSBkZWx0YSBvdGhlcndpc2UgdGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgb3VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLl9zcGlNZXNzYWdlU3RhbXAuU2VydmVyVGltZURlbHRhID0gbS5HZXRTZXJ2ZXJUaW1lRGVsdGEoKTtcblxuICAgICAgICBpZiAodGhpcy5fbW9zdFJlY2VudFBvbmdSZWNlaXZlZCA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBGaXJzdCBwb25nIHJlY2VpdmVkIGFmdGVyIGEgY29ubmVjdGlvbiwgYW5kIGFmdGVyIHRoZSBwYWlyaW5nIHByb2Nlc3MgaXMgZnVsbHkgZmluYWxpc2VkLlxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJGaXJzdCBwb25nIG9mIGNvbm5lY3Rpb24gYW5kIGluIHBhaXJlZCBzdGF0ZS5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25SZWFkeVRvVHJhbnNhY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkZpcnN0IHBvbmcgb2YgY29ubmVjdGlvbiBidXQgcGFpcmluZyBwcm9jZXNzIG5vdCBmaW5hbGlzZWQgeWV0LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPSBtO1xuICAgICAgICB0aGlzLl9sb2cuZGVidWcoYFBvbmdMYXRlbmN5OiR7RGF0ZS5ub3coKSAtIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudFRpbWV9YCk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIHNlcnZlciB3aWxsIGFsc28gc2VuZCB1cyBwaW5ncy4gV2UgbmVlZCB0byByZXBseSB3aXRoIGEgcG9uZyBzbyBpdCBkb2Vzbid0IGRpc2Nvbm5lY3QgdXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUluY29taW5nUGluZyhtKVxuICAgIHtcbiAgICAgICAgdmFyIHBvbmcgPSBQb25nSGVscGVyLkdlbmVyYXRlUG9uZ1Jlc3Nwb25zZShtKTtcbiAgICAgICAgdGhpcy5fc2VuZChwb25nKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBBc2sgdGhlIFBpblBhZCB0byB0ZWxsIHVzIHdoYXQgdGhlIE1vc3QgUmVjZW50IFRyYW5zYWN0aW9uIHdhc1xuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBfY2FsbEdldExhc3RUcmFuc2FjdGlvbigpXG4gICAge1xuICAgICAgICB2YXIgZ2x0UmVxdWVzdCA9IG5ldyBHZXRMYXN0VHJhbnNhY3Rpb25SZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX3NlbmQoZ2x0UmVxdWVzdC5Ub01lc3NhZ2UoKSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgd2UgcmVjZWl2ZSBhIG1lc3NhZ2UgZnJvbSB0aGUgQ29ubmVjdGlvblxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VKc29uXCI+PC9wYXJhbT5cbiAgICBfb25TcGlNZXNzYWdlUmVjZWl2ZWQobWVzc2FnZUpzb24pXG4gICAge1xuICAgICAgICAvLyBGaXJzdCB3ZSBwYXJzZSB0aGUgaW5jb21pbmcgbWVzc2FnZVxuICAgICAgICB2YXIgbSA9IE1lc3NhZ2UuRnJvbUpzb24obWVzc2FnZUpzb24uTWVzc2FnZSwgdGhpcy5fc2VjcmV0cyk7XG4gICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiUmVjZWl2ZWQ6XCIgKyBtLkRlY3J5cHRlZEpzb24pO1xuXG4gICAgICAgIGlmIChTcGlQcmVhdXRoLklzUHJlYXV0aEV2ZW50KG0uRXZlbnROYW1lKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3BpUHJlYXV0aC5faGFuZGxlUHJlYXV0aE1lc3NhZ2UobSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmQgdGhlbiB3ZSBzd2l0Y2ggb24gdGhlIGV2ZW50IHR5cGUuXG4gICAgICAgIHN3aXRjaCAobS5FdmVudE5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleVJlcXVlc3Q6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlS2V5UmVxdWVzdChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleUNoZWNrOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUtleUNoZWNrKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGFpclJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVBhaXJSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkRyb3BLZXlzQWR2aWNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZURyb3BLZXlzQWR2aWNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUHVyY2hhc2VSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUmVmdW5kUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVmdW5kUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5DYXNob3V0T25seVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNhc2hvdXRPbmx5UmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5Nb3RvUHVyY2hhc2VSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3RvUHVyY2hhc2VSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlNpZ25hdHVyZVJlcXVpcmVkOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuQXV0aENvZGVSZXF1aXJlZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBdXRoQ29kZVJlcXVpcmVkKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5TZXR0bGVSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZVNldHRsZVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVJbmNvbWluZ1BpbmcobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5Qb25nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUluY29taW5nUG9uZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleVJvbGxSZXF1ZXN0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUtleVJvbGxpbmdSZXF1ZXN0KG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGF5QXRUYWJsZUdldFRhYmxlQ29uZmlnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGlQYXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQoUGF5QXRUYWJsZUNvbmZpZy5GZWF0dXJlRGlzYWJsZU1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicGF0Y29uZlwiKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0Ll9oYW5kbGVHZXRUYWJsZUNvbmZpZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVHZXRCaWxsRGV0YWlsczpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUdldEJpbGxEZXRhaWxzUmVxdWVzdChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVCaWxsUGF5bWVudDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUJpbGxQYXltZW50QWR2aWNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuRXJyb3I6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3JFdmVudChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkludmFsaWRIbWFjU2lnbmF0dXJlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiSSBjb3VsZCBub3QgdmVyaWZ5IG1lc3NhZ2UgZnJvbSBFZnRwb3MuIFlvdSBtaWdodCBoYXZlIHRvIFVuLXBhaXIgRWZ0cG9zIGFuZCB0aGVuIHJlY29ubmVjdC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBJIGRvbid0IFVuZGVyc3RhbmQgRXZlbnQ6ICR7bS5FdmVudE5hbWV9LCAke20uRGF0YX0uIFBlcmhhcHMgSSBoYXZlIG5vdCBpbXBsZW1lbnRlZCBpdCB5ZXQuYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Xc0Vycm9yUmVjZWl2ZWQoZXJyb3IpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2cud2FybihcIlJlY2VpdmVkIFdTIEVycm9yOiBcIiArIGVycm9yLk1lc3NhZ2UpO1xuICAgIH1cblxuICAgIF9zZW5kKG1lc3NhZ2UpXG4gICAge1xuICAgICAgICB2YXIganNvbiA9IG1lc3NhZ2UuVG9Kc29uKHRoaXMuX3NwaU1lc3NhZ2VTdGFtcCk7XG4gICAgICAgIGlmICh0aGlzLl9jb25uLkNvbm5lY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJTZW5kaW5nOiBcIiArIG1lc3NhZ2UuRGVjcnlwdGVkSnNvbik7XG4gICAgICAgICAgICB0aGlzLl9jb25uLlNlbmQoanNvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gc2VuZCwgYnV0IG5vdCBjb25uZWN0ZWQ6IFwiICsgbWVzc2FnZS5EZWNyeXB0ZWRKc29uKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEhhc1NlcmlhbE51bWJlckNoYW5nZWQodXBkYXRlZFNlcmlhbE51bWJlcilcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxOdW1iZXIgIT0gdXBkYXRlZFNlcmlhbE51bWJlcjtcbiAgICB9XG5cbiAgICBIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCh1cGRhdGVkRWZ0cG9zQWRkcmVzcylcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZnRwb3NBZGRyZXNzICE9IHVwZGF0ZWRFZnRwb3NBZGRyZXNzO1xuICAgIH1cblxuICAgIF9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIFxuICAgICAgICBpZiAoIXRoaXMuX3NlcmlhbE51bWJlcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2VydmljZSA9IG5ldyBEZXZpY2VBZGRyZXNzU2VydmljZSgpO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlLlJldHJpZXZlU2VydmljZSh0aGlzLl9zZXJpYWxOdW1iZXIsIHRoaXMuX2RldmljZUFwaUtleSwgdGhpcy5faW5UZXN0TW9kZSkudGhlbigoYWRkcmVzc1Jlc3BvbnNlKSA9PiBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIWFkZHJlc3NSZXNwb25zZSB8fCAhYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuSGFzRWZ0cG9zQWRkcmVzc0NoYW5nZWQoYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3MpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGRldmljZSBhbmQgY29ubmVjdGlvbiBhZGRyZXNzXG4gICAgICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gXCJ3czovL1wiICsgYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3M7XG4gICAgICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXMgPSBuZXcgRGV2aWNlQWRkcmVzc1N0YXR1cyhhZGRyZXNzUmVzcG9uc2UuQWRkcmVzcywgYWRkcmVzc1Jlc3BvbnNlLkxhc3RVcGRhdGVkKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0RldmljZUFkZHJlc3NDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50RGV2aWNlU3RhdHVzfSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5DdXJyZW50RGV2aWNlU3RhdHVzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7U3BpfTsiLCJpbXBvcnQge1N1Y2Nlc3NTdGF0ZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gUmVwcmVzZW50cyB0aGUgMyBQYWlyaW5nIHN0YXR1c2VzIHRoYXQgdGhlIFNwaSBpbnN0YW54Y2UgY2FuIGJlIGluLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNvbnN0IFNwaVN0YXR1cyA9IFxue1xuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFBhaXJlZCBhbmQgQ29ubmVjdGVkXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFBhaXJlZENvbm5lY3RlZDogJ1BhaXJlZENvbm5lY3RlZCcsXG4gICAgXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gUGFpcmVkIGJ1dCB0cnlpbmcgdG8gZXN0YWJsaXNoIGEgY29ubmVjdGlvbiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmVkQ29ubmVjdGluZzogJ1BhaXJlZENvbm5lY3RpbmcnLFxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFVucGFpcmVkXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFVucGFpcmVkOiAnVW5wYWlyZWQnXG59O1xuXG4vLyA8c3VtbWFyeT5cbi8vIFRoZSBTcGkgaW5zdGFuY2UgY2FuIGJlIGluIG9uZSBvZiB0aGVzZSBmbG93cyBhdCBhbnkgcG9pbnQgaW4gdGltZS5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjb25zdCBTcGlGbG93ID0gXG57XG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ3VycmVudGx5IGdvaW5nIHRocm91Z2ggdGhlIFBhaXJpbmcgUHJvY2VzcyBGbG93LlxuICAgIC8vIEhhcHBlbnMgZHVyaW5nIHRoZSBVbnBhaXJlZCBTcGlTdGF0dXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFBhaXJpbmc6ICdQYWlyaW5nJyxcbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDdXJyZW50bHkgZ29pbmcgdGhyb3VnaCB0aGUgdHJhbnNhY3Rpb24gUHJvY2VzcyBGbG93LlxuICAgIC8vIENhbm5vdCBoYXBwZW4gaW4gdGhlIFVucGFpcmVkIFNwaVN0YXR1cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgVHJhbnNhY3Rpb246ICdUcmFuc2FjdGlvbicsXG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBOb3QgaW4gYW55IG9mIHRoZSBvdGhlciBzdGF0ZXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIElkbGU6ICdJZGxlJ1xufTtcblxuLy8gPHN1bW1hcnk+XG4vLyBSZXByZXNlbnRzIHRoZSBQYWlyaW5nIEZsb3cgU3RhdGUgZHVyaW5nIHRoZSBwYWlyaW5nIHByb2Nlc3MgXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgUGFpcmluZ0Zsb3dTdGF0ZVxue1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBTb21lIHRleHQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBQYWlyaW5nIFByb2Nlc3MgU2NyZWVuXG4gICAgICAgIC8vIHRoYXQgaW5kaWNhdGVzIHdoYXQgdGhlIHBhaXJpbmcgcHJvY2VzcyBpcyB1cCB0by5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGVuIHRydWUsIGl0IG1lYW5zIHRoYXQgdGhlIEVGVFBPUyBpcyBzaG9pbmcgdGhlIGNvbmZpcm1hdGlvbiBjb2RlLFxuICAgICAgICAvLyBhbmQgeW91ciB1c2VyIG5lZWRzIHRvIHByZXNzIFlFUyBvciBOTyBvbiB0aGUgRUZUUE9TLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXdhaXRpbmdDaGVja0Zyb21FZnRwb3MgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdHJ1ZSwgeW91IG5lZWQgdG8gZGlzcGxheSB0aGUgWUVTL05PIGJ1dHRvbnMgb24geW91IHBhaXJpbmcgc2NyZWVuXG4gICAgICAgIC8vIGZvciB5b3VyIHVzZXIgdG8gY29uZmlybSB0aGUgY29kZS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF3YWl0aW5nQ2hlY2tGcm9tUG9zID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBjb25maXJtYXRpb24gY29kZSBmb3IgdGhlIHBhaXJpbmcgcHJvY2Vzcy5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkNvbmZpcm1hdGlvbkNvZGUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoZSBQYWlyaW5nIEZsb3cgaGFzIGZpbmlzaGVkIGl0cyBqb2IuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgcGFpcmluZyB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5TdWNjZXNzZnVsID0gbnVsbDtcblxuICAgICAgICBpZihzdGF0ZSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG59XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvblR5cGUgPSBcbntcbiAgICBQdXJjaGFzZTogJ1B1cmNoYXNlJyxcbiAgICBSZWZ1bmQ6ICdSZWZ1bmQnLFxuICAgIENhc2hvdXRPbmx5OiAnQ2FzaG91dE9ubHknLFxuICAgIE1PVE86ICdNT1RPJyxcbiAgICBTZXR0bGU6ICdTZXR0bGUnLFxuICAgIFNldHRsZW1lbnRFbnF1aXJ5OiAnU2V0dGxlbWVudEVucXVpcnknLFxuICAgIEdldExhc3RUcmFuc2FjdGlvbjogJ0dldExhc3RUcmFuc2FjdGlvbicsXG4gICAgXG4gICAgUHJlYXV0aDogJ1ByZWF1dGgnLFxuICAgIEFjY291bnRWZXJpZnk6ICdBY2NvdW50VmVyaWZ5J1xufTtcblxuLy8gPHN1bW1hcnk+XG4vLyBVc2VkIGFzIGEgcmV0dXJuIGluIHRoZSBJbml0aWF0ZVR4IG1ldGhvZHMgdG8gc2lnbmlmeSB3aGV0aGVyIFxuLy8gdGhlIHRyYW5zYWN0aW9uIHdhcyBpbml0aWF0ZWQgb3Igbm90LCBhbmQgYSByZWFzb24gdG8gZ28gd2l0aCBpdC5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBJbml0aWF0ZVR4UmVzdWx0XG57XG4gICAgY29uc3RydWN0b3IoaW5pdGlhdGVkLCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgdGhlIHR4IHdhcyBpbml0aWF0ZWQuXG4gICAgICAgIC8vIFdoZW4gdHJ1ZSwgeW91IGNhbiBleHBlY3QgdXBkYXRlZCB0byB5b3VyIHJlZ2lzdGVyZWQgY2FsbGJhY2suXG4gICAgICAgIC8vIFdoZW4gZmFsc2UsIHlvdSBjYW4gcmV0cnkgY2FsbGluZyB0aGUgSW5pdGlhdGVYIG1ldGhvZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkluaXRpYXRlZCA9IGluaXRpYXRlZDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGV4dCB0aGF0IGdpdmVzIHJlYXNvbiBmb3IgdGhlIEluaXRpYXRlZCBmbGFnLCBlc3BlY2lhbGx5IGluIGNhc2Ugb2YgZmFsc2UuIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufVxuXG4vLyA8c3VtbWFyeT5cbi8vIFVzZWQgYXMgYSByZXR1cm4gaW4gY2FsbHMgbWlkIHRyYW5zYWN0aW9uIHRvIGxldCB5b3Uga25vd1xuLy8gd2hldGhlciB0aGUgY2FsbCB3YXMgdmFsaWQgb3Igbm90LlxuLy8gVGhlc2UgYXR0cmlidXRlcyB3b3JrIGZvciBDT00gaW50ZXJvcC5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBNaWRUeFJlc3VsdFxue1xuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgZGVmYXVsdCBzdHVjdHVyZSB3b3JrcyBmb3IgQ09NIGludGVyb3AuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIGNvbnN0cnVjdG9yKHZhbGlkLCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgdGhpcy5WYWxpZCA9IHZhbGlkO1xuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbn0gICAgXG5cbi8vIDxzdW1tYXJ5PlxuLy8gUmVwcmVzZW50cyB0aGUgU3RhdGUgZHVyaW5nIGEgVHJhbnNhY3Rpb25GbG93XG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25GbG93U3RhdGVcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZCwgdHlwZSwgYW1vdW50Q2VudHMsIG1lc3NhZ2UsIG1zZylcbiAgICB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyAgVGhlIGlkIGdpdmVuIHRvIHRoaXMgdHJhbnNhY3Rpb25cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlBvc1JlZklkICAgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5JZCAgICAgICAgID0gcG9zUmVmSWQ7IC8vIG9ic29sZXRlLCBidXQgbGV0J3MgbWFpbnRhaW4gaXQgZm9yIG5vdywgdG8gbWVhbiBzYW1lIGFzIFBvc1JlZklkLlxuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBQdXJjaGFzZS9SZWZ1bmQvU2V0dGxlLy4uLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEEgdGV4dCBtZXNzYWdlIHRvIGRpc3BsYXkgb24geW91ciBUcmFuc2FjdGlvbiBGbG93IFNjcmVlblxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEFtb3VudCBpbiBjZW50cyBmb3IgdGhpcyB0cmFuc2FjdGlvblxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQW1vdW50Q2VudHMgPSBhbW91bnRDZW50cztcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2h0aGVyIHRoZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgdG8gdGhlIEVGVFBPUyB5ZXQgb3Igbm90LlxuICAgICAgICAvLyBJbiB0aGUgUGFpcmVkQ29ubmVjdGluZyBzdGF0ZSwgdGhlIHRyYW5zYWN0aW9uIGlzIGluaXRpYXRlZFxuICAgICAgICAvLyBidXQgdGhlIHJlcXVlc3QgaXMgb25seSBzZW50IG9uY2UgdGhlIGNvbm5lY3Rpb24gaXMgcmVjb3ZlcmVkLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVxdWVzdFNlbnQgPSBmYWxzZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHRpbWUgd2hlbiB0aGUgcmVxdWVzdCB3YXMgc2VudCB0byB0aGUgRUZUUE9TLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVxdWVzdFRpbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHRpbWUgd2hlbiB3ZSBsYXN0IGFza2VkIGZvciBhbiB1cGRhdGUsIGluY2x1ZGluZyB0aGUgb3JpZ2luYWwgcmVxdWVzdCBhdCBmaXJzdFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTGFzdFN0YXRlUmVxdWVzdFRpbWUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgd2UncmUgY3VycmVudGx5IGF0dGVtcHRpbmcgdG8gQ2FuY2VsIHRoZSB0cmFuc2FjdGlvbi5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IG51bGw7XG4gICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGVuIHRoaXMgZmxhZyBpcyBvbiwgeW91IG5lZWQgdG8gZGlzcGxheSB0aGUgZGlnbmF0dXJlIGFjY2VwdC9kZWNsaW5lIGJ1dHRvbnMgaW4geW91ciBcbiAgICAgICAgLy8gdHJhbnNhY3Rpb24gZmxvdyBzY3JlZW4uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gZmFsc2U7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdGhpcyBmbGFnIGlzIG9uLCB5b3UgbmVlZCB0byBzaG93IHlvdXIgdXNlciB0aGUgcGhvbmUgbnVtYmVyIHRvIGNhbGwgdG8gZ2V0IHRoZSBhdXRob3Jpc2F0aW9uIGNvZGUuXG4gICAgICAgIC8vIFRoZW4geW91IG5lZWQgdG8gcHJvdmlkZSB5b3VyIHVzZXIgbWVhbnMgdG8gZW50ZXIgdGhhdCBnaXZlbiBjb2RlIGFuZCBzdWJtaXQgaXQgdmlhIFN1Ym1pdEF1dGhDb2RlKCkuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IG51bGw7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgdGhpcyB0cmFuc2FjdGlvbiBmbG93IGlzIG92ZXIgb3Igbm90LlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuRmluaXNoZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHN1Y2Nlc3Mgc3RhdGUgb2YgdGhpcyB0cmFuc2FjdGlvbi4gU3RhcnRzIG9mZiBhcyBVbmtub3duLlxuICAgICAgICAvLyBXaGVuIGZpbmlzaGVkLCBjYW4gYmUgU3VjY2VzcywgRmFpbGVkIE9SIFVua25vd24uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5TdWNjZXNzID0gU3VjY2Vzc1N0YXRlLlVua25vd247XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSByZXNwb25zZSBhdCB0aGUgZW5kIG9mIHRoZSB0cmFuc2FjdGlvbi4gXG4gICAgICAgIC8vIE1pZ2h0IG5vdCBiZSBwcmVzZW50IGluIGFsbCBlZGdlIGNhc2VzLlxuICAgICAgICAvLyBZb3UgY2FuIHRoZW4gdHVybiB0aGlzIE1lc3NhZ2UgaW50byB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlLFxuICAgICAgICAvLyBzdWNoIGFzIFB1cmNoYXNlUmVzcG9uc2UsIFJlZnVuZFJlc3BvbnNlLCBldGNcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlJlc3BvbnNlID0gbnVsbDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIG1lc3NhZ2UgdGhlIHdlIHJlY2VpdmVkIGZyb20gRUZUUE9TIHRoYXQgdG9sZCB1cyB0aGF0IHNpZ25hdHVyZSBpcyByZXF1aXJlZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSA9IG51bGw7XG4gICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgbWVzc2FnZSB0aGUgd2UgcmVjZWl2ZWQgZnJvbSBFRlRQT1MgdGhhdCB0b2xkIHVzIHRoYXQgUGhvbmUgRm9yIEF1dGggaXMgcmVxdWlyZWQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5QaG9uZUZvckF1dGhSZXF1aXJlZE1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgdGltZSB3aGVuIHRoZSBjYW5jZWwgYXR0ZW1wdCB3YXMgbWFkZS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkNhbmNlbEF0dGVtcHRUaW1lID0gbnVsbDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgbWVzc2FnZSB0aGF0IHdlIGFyZSBzZW5kaW5nL3NlbnQgdG8gdGhlIHNlcnZlci5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlJlcXVlc3QgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGV0aGVyIHdlJ3JlIGN1cnJlbnRseSB3YWl0aW5nIGZvciBhIEdldCBMYXN0IFRyYW5zYWN0aW9uIFJlc3BvbnNlIHRvIGdldCBhbiB1cGRhdGUuIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXdhaXRpbmdHbHRSZXNwb25zZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5HTFRSZXNwb25zZVBvc1JlZklkID0gbnVsbDtcbiAgICB9XG5cbiAgICBTZW50KG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuUmVxdWVzdFNlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLlJlcXVlc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5MYXN0U3RhdGVSZXF1ZXN0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgQ2FuY2VsbGluZyhtc2cpXG4gICAge1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IHRydWU7XG4gICAgICAgIHRoaXMuQ2FuY2VsQXR0ZW1wdFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENhbmNlbEZhaWxlZChtc2cpXG4gICAge1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENhbGxpbmdHbHQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5MYXN0U3RhdGVSZXF1ZXN0VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgR290R2x0UmVzcG9uc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIEZhaWxlZChyZXNwb25zZSwgbXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gU3VjY2Vzc1N0YXRlLkZhaWxlZDtcbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBTaWduYXR1cmVSZXF1aXJlZChzcGlNZXNzYWdlLCBtc2cpXG4gICAge1xuICAgICAgICB0aGlzLlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSA9IHNwaU1lc3NhZ2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdTaWduYXR1cmVDaGVjayA9IHRydWU7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgU2lnbmF0dXJlUmVzcG9uZGVkKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdTaWduYXR1cmVDaGVjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbiAgICBcbiAgICBQaG9uZUZvckF1dGhSZXF1aXJlZChzcGlNZXNzYWdlLCBtc2cpXG4gICAge1xuICAgICAgICB0aGlzLlBob25lRm9yQXV0aFJlcXVpcmVkTWVzc2FnZSA9IHNwaU1lc3NhZ2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdQaG9uZUZvckF1dGggPSB0cnVlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbiAgICBcbiAgICBBdXRoQ29kZVNlbnQobXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENvbXBsZXRlZChzdGF0ZSwgcmVzcG9uc2UsIG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IHN0YXRlO1xuICAgICAgICB0aGlzLlJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHRoaXMuRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nR2x0UmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdQaG9uZUZvckF1dGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBVbmtub3duQ29tcGxldGVkKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IFN1Y2Nlc3NTdGF0ZS5Vbmtub3duO1xuICAgICAgICB0aGlzLlJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdHbHRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbn1cblxuLy8gPHN1bW1hcnk+XG4vLyBVc2VkIGFzIGEgcmV0dXJuIGluIHRoZSBTdWJtaXRBdXRoQ29kZSBtZXRob2QgdG8gc2lnbmlmeSB3aGV0aGVyIENvZGUgaXMgdmFsaWRcbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBTdWJtaXRBdXRoQ29kZVJlc3VsdFxue1xuICAgIGNvbnN0cnVjdG9yKHZhbGlkRm9ybWF0LCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgdGhpcy5WYWxpZEZvcm1hdCA9IHZhbGlkRm9ybWF0O1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUZXh0IHRoYXQgZ2l2ZXMgcmVhc29uIGZvciBJbnZhbGlkaXR5XG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTcGlDb25maWdcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5Qcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TaWduYXR1cmVGbG93T25FZnRwb3MgICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5QcmludE1lcmNoYW50Q29weSAgICAgICAgICAgICAgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhZGRSZWNlaXB0Q29uZmlnKG1lc3NhZ2VEYXRhKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhLnByb21wdF9mb3JfY3VzdG9tZXJfY29weSA9IHRoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlRGF0YS5wcmludF9mb3Jfc2lnbmF0dXJlX3JlcXVpcmVkX3RyYW5zYWN0aW9ucyA9IHRoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLlByaW50TWVyY2hhbnRDb3B5KVxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlRGF0YS5wcmludF9tZXJjaGFudF9jb3B5ID0gdGhpcy5QcmludE1lcmNoYW50Q29weTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZURhdGE7XG4gICAgfVxuXG4gICAgVG9TdHJpbmcoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGBQcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvczoke3RoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3N9IFNpZ25hdHVyZUZsb3dPbkVmdHBvczoke3RoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zfSBQcmludE1lcmNoYW50Q29weTogJHt0aGlzLlByaW50TWVyY2hhbnRDb3B5fWA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25PcHRpb25zXG57XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEZvb3RlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lcmNoYW50UmVjZWlwdEhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lcmNoYW50UmVjZWlwdEZvb3RlciA9IG51bGw7XG4gICAgfVxuXG4gICAgU2V0Q3VzdG9tZXJSZWNlaXB0SGVhZGVyKGN1c3RvbWVyUmVjZWlwdEhlYWRlcilcbiAgICB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEhlYWRlciA9IGN1c3RvbWVyUmVjZWlwdEhlYWRlcjtcbiAgICB9XG5cbiAgICBTZXRDdXN0b21lclJlY2VpcHRGb290ZXIoY3VzdG9tZXJSZWNlaXB0Rm9vdGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJSZWNlaXB0Rm9vdGVyID0gY3VzdG9tZXJSZWNlaXB0Rm9vdGVyO1xuICAgIH1cbiAgICBTZXRNZXJjaGFudFJlY2VpcHRIZWFkZXIobWVyY2hhbnRSZWNlaXB0SGVhZGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0SGVhZGVyID0gbWVyY2hhbnRSZWNlaXB0SGVhZGVyO1xuICAgIH1cbiAgICBTZXRNZXJjaGFudFJlY2VpcHRGb290ZXIobWVyY2hhbnRSZWNlaXB0Rm9vdGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0Rm9vdGVyID0gbWVyY2hhbnRSZWNlaXB0Rm9vdGVyO1xuICAgIH1cbiAgICBBZGRPcHRpb25zKG1lc3NhZ2VEYXRhKVxuICAgIHtcbiAgICAgICAgbWVzc2FnZURhdGEuY3VzdG9tZXJfcmVjZWlwdF9oZWFkZXIgPSB0aGlzLl9jdXN0b21lclJlY2VpcHRIZWFkZXI7XG4gICAgICAgIG1lc3NhZ2VEYXRhLmN1c3RvbWVyX3JlY2VpcHRfZm9vdGVyID0gdGhpcy5fY3VzdG9tZXJSZWNlaXB0Rm9vdGVyO1xuICAgICAgICBtZXNzYWdlRGF0YS5tZXJjaGFudF9yZWNlaXB0X2hlYWRlciA9IHRoaXMuX21lcmNoYW50UmVjZWlwdEhlYWRlcjtcbiAgICAgICAgbWVzc2FnZURhdGEubWVyY2hhbnRfcmVjZWlwdF9mb290ZXIgPSB0aGlzLl9tZXJjaGFudFJlY2VpcHRGb290ZXI7XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VEYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtCaWxsUGF5bWVudCwgUGF5QXRUYWJsZUNvbmZpZywgUGF5bWVudEhpc3RvcnlFbnRyeSwgQmlsbFJldHJpZXZhbFJlc3VsdCwgQmlsbFN0YXR1c1Jlc3BvbnNlfSBmcm9tICcuL1BheUF0VGFibGUnO1xuXG5leHBvcnQgY2xhc3MgU3BpUGF5QXRUYWJsZVxueyAgXG4gICAgY29uc3RydWN0b3Ioc3BpKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpID0gc3BpO1xuICAgICAgICB0aGlzLl9sb2cgPSBjb25zb2xlO1xuXG4gICAgICAgIHRoaXMuQ29uZmlnID0gT2JqZWN0LmFzc2lnbihuZXcgUGF5QXRUYWJsZUNvbmZpZygpLCB7XG4gICAgICAgICAgICBQYXlBdFRhYmxlZEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBPcGVyYXRvcklkRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIEFsbG93ZWRPcGVyYXRvcklkczogW10sXG4gICAgICAgICAgICBFcXVhbFNwbGl0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIFNwbGl0QnlBbW91bnRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgU3VtbWFyeVJlcG9ydEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBUaXBwaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIExhYmVsT3BlcmF0b3JJZDogXCJPcGVyYXRvciBJRFwiLFxuICAgICAgICAgICAgTGFiZWxQYXlCdXR0b246IFwiUGF5IGF0IFRhYmxlXCIsXG4gICAgICAgICAgICBMYWJlbFRhYmxlSWQ6IFwiVGFibGUgTnVtYmVyXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBkZWxlZ2F0ZSB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBFZnRwb3MgbmVlZHMgdG8ga25vdyB0aGUgY3VycmVudCBzdGF0ZSBvZiBhIGJpbGwgZm9yIGEgdGFibGUuIFxuICAgIC8vIDxwYXJhIC8+XG4gICAgLy8gUGFyYW1ldGVyczo8cGFyYSAvPlxuICAgIC8vIGJpbGxJZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYmlsbC4gSWYgZW1wdHksIGl0IG1lYW5zIHRoYXQgdGhlIFBheUF0VGFibGUgZmxvdyBvbiB0aGUgRWZ0cG9zIGlzIGp1c3Qgc3RhcnRpbmcsIGFuZCB0aGUgbG9va3VwIGlzIGJ5IHRhYmxlSWQuPHBhcmEgLz5cbiAgICAvLyB0YWJsZUlkIC0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIHRhYmxlIHRoYXQgdGhlIGJpbGwgaXMgZm9yLiA8cGFyYSAvPlxuICAgIC8vIG9wZXJhdG9ySWQgLSBUaGUgaWQgb2YgdGhlIG9wZXJhdG9yIGVudGVyZWQgb24gdGhlIGVmdHBvcy4gPHBhcmEgLz5cbiAgICAvLyA8cGFyYSAvPlxuICAgIC8vIFJldHVybjo8cGFyYSAvPlxuICAgIC8vIFlvdSBuZWVkIHRvIHJldHVybiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYmlsbC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgR2V0QmlsbFN0YXR1cyhiaWxsSWQsIHRhYmxlSWQsIG9wZXJhdG9ySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4gUGxlYXNlIG92ZXJ3cml0ZSB0aGlzIG1ldGhvZCBpbiB5b3VyIFBPUycpO1xuICAgIH1cblxuICAgIC8vIEFic3RyYWN0IG1ldGhvZCwgbXVzdCBpbXBsZW1lbnQgaW4gUE9TIHN5c3RlbVxuICAgIEJpbGxQYXltZW50UmVjZWl2ZWQoYmlsbFBheW1lbnQsIHVwZGF0ZWRCaWxsRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLiBQbGVhc2Ugb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIHlvdXIgUE9TJyk7XG4gICAgfVxuXG4gICAgUHVzaFBheUF0VGFibGVDb25maWcoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHRoaXMuQ29uZmlnLlRvTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwYXRjb25mXCIpKSk7XG4gICAgfSBcbiAgICBcbiAgICBfaGFuZGxlR2V0QmlsbERldGFpbHNSZXF1ZXN0KG0pXG4gICAge1xuICAgICAgICB2YXIgb3BlcmF0b3JJZCA9IG0uRGF0YVtcIm9wZXJhdG9yX2lkXCJdO1xuICAgICAgICB2YXIgdGFibGVJZCA9IG0uRGF0YVtcInRhYmxlX2lkXCJdO1xuXG4gICAgICAgIC8vIEFzayBQT1MgZm9yIEJpbGwgRGV0YWlscyBmb3IgdGhpcyB0YWJsZUlkLCBpbmx1ZGluZyBlbmNvZGVkIFBheW1lbnREYXRhXG4gICAgICAgIHZhciBiaWxsU3RhdHVzID0gdGhpcy5HZXRCaWxsU3RhdHVzKG51bGwsIHRhYmxlSWQsIG9wZXJhdG9ySWQpO1xuICAgICAgICBiaWxsU3RhdHVzLlRhYmxlSWQgPSB0YWJsZUlkO1xuICAgICAgICBpZiAoYmlsbFN0YXR1cy5Ub3RhbEFtb3VudCA8PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlRhYmxlIGhhcyAwIHRvdGFsIGFtb3VudC4gbm90IHNlbmRpbmcgaXQgdG8gZWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIGJpbGxTdGF0dXMuUmVzdWx0ID0gQmlsbFJldHJpZXZhbFJlc3VsdC5JTlZBTElEX1RBQkxFX0lEO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9zcGkuX3NlbmQoYmlsbFN0YXR1cy5Ub01lc3NhZ2UobS5JZCkpO1xuICAgIH1cblxuICAgIF9oYW5kbGVCaWxsUGF5bWVudEFkdmljZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGJpbGxQYXltZW50ID0gbmV3IEJpbGxQYXltZW50KG0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQXNrIFBPUyBmb3IgQmlsbCBEZXRhaWxzLCBpbmx1ZGluZyBlbmNvZGVkIFBheW1lbnREYXRhXG4gICAgICAgIHZhciBleGlzdGluZ0JpbGxTdGF0dXMgPSB0aGlzLkdldEJpbGxTdGF0dXMoYmlsbFBheW1lbnQuQmlsbElkLCBiaWxsUGF5bWVudC5UYWJsZUlkLCBiaWxsUGF5bWVudC5PcGVyYXRvcklkKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nQmlsbFN0YXR1cy5SZXN1bHQgIT0gQmlsbFJldHJpZXZhbFJlc3VsdC5TVUNDRVNTKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIkNvdWxkIG5vdCByZXRyaWV2ZSBCaWxsIFN0YXR1cyBmb3IgUGF5bWVudCBBZHZpY2UuIFNlbmRpbmcgRXJyb3IgdG8gRWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaS5fc2VuZChleGlzdGluZ0JpbGxTdGF0dXMuVG9NZXNzYWdlKG0uSWQpKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgdmFyIGV4aXN0aW5nUGF5bWVudEhpc3RvcnkgPSBleGlzdGluZ0JpbGxTdGF0dXMuZ2V0QmlsbFBheW1lbnRIaXN0b3J5KCk7XG4gICBcbiAgICAgICAgdmFyIGZvdW5kRXhpc3RpbmdFbnRyeSA9IGV4aXN0aW5nUGF5bWVudEhpc3RvcnkuZmluZChwaGUgPT4gcGhlLkdldFRlcm1pbmFsUmVmSWQoKSA9PSBiaWxsUGF5bWVudC5QdXJjaGFzZVJlc3BvbnNlLkdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKSk7XG4gICAgICAgIGlmIChmb3VuZEV4aXN0aW5nRW50cnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBwcm9jZXNzZWQgdGhpcyBwYXltZW50LlxuICAgICAgICAgICAgLy8gcGVyaGFwcyBFZnRwb3MgZGlkIGdldCBvdXIgYWNrbm93bGVkZ2VtZW50LlxuICAgICAgICAgICAgLy8gTGV0J3MgdXBkYXRlIEVmdHBvcy5cbiAgICAgICAgICAgIHRoaXMuX2xvZy53YXJuKFwiSGFkIGFscmVhZHkgcmVjZWl2ZWQgdGhpcyBiaWxsX3BheW1lbW50IGFkdmljZSBmcm9tIGVmdHBvcy4gSWdub3JpbmcuXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3BpLl9zZW5kKGV4aXN0aW5nQmlsbFN0YXR1cy5Ub01lc3NhZ2UobS5JZCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGV0J3MgYWRkIHRoZSBuZXcgZW50cnkgdG8gdGhlIGhpc3RvcnlcbiAgICAgICAgdmFyIHVwZGF0ZWRIaXN0b3J5RW50cmllcyA9IGV4aXN0aW5nUGF5bWVudEhpc3Rvcnk7XG4gICAgICAgIHVwZGF0ZWRIaXN0b3J5RW50cmllcy5wdXNoKFxuICAgICAgICAgICAgbmV3IFBheW1lbnRIaXN0b3J5RW50cnkoYmlsbFBheW1lbnQuUGF5bWVudFR5cGUudG9Mb3dlckNhc2UoKSwgYmlsbFBheW1lbnQuUHVyY2hhc2VSZXNwb25zZS5Ub1BheW1lbnRTdW1tYXJ5KCkpXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICB2YXIgdXBkYXRlZEJpbGxEYXRhID0gQmlsbFN0YXR1c1Jlc3BvbnNlLlRvQmlsbERhdGEodXBkYXRlZEhpc3RvcnlFbnRyaWVzKTtcblxuICAgICAgICAvLyBBZHZpc2UgUE9TIG9mIG5ldyBwYXltZW50IGFnYWluc3QgdGhpcyBiaWxsLCBhbmQgdGhlIHVwZGF0ZWQgQmlsbERhdGEgdG8gU2F2ZS5cbiAgICAgICAgdmFyIHVwZGF0ZWRCaWxsU3RhdHVzID0gdGhpcy5CaWxsUGF5bWVudFJlY2VpdmVkKGJpbGxQYXltZW50LCB1cGRhdGVkQmlsbERhdGEpO1xuXG4gICAgICAgIC8vIEp1c3QgaW4gY2FzZSBjbGllbnQgZm9yZ290IHRvIHNldCB0aGVzZTpcbiAgICAgICAgdXBkYXRlZEJpbGxTdGF0dXMuQmlsbElkID0gYmlsbFBheW1lbnQuQmlsbElkO1xuICAgICAgICB1cGRhdGVkQmlsbFN0YXR1cy5UYWJsZUlkID0gYmlsbFBheW1lbnQuVGFibGVJZDtcblxuICAgICAgICBpZiAodXBkYXRlZEJpbGxTdGF0dXMuUmVzdWx0ICE9IEJpbGxSZXRyaWV2YWxSZXN1bHQuU1VDQ0VTUylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJQT1MgRXJyb3JlZCB3aGVuIGJlaW5nIEFkdmlzZWQgb2YgUGF5bWVudC4gTGV0dGluZyBFRlRQT1Mga25vdywgYW5kIHNlbmRpbmcgZXhpc3RpbmcgYmlsbCBkYXRhLlwiKTtcbiAgICAgICAgICAgIHVwZGF0ZWRCaWxsU3RhdHVzLkJpbGxEYXRhID0gZXhpc3RpbmdCaWxsU3RhdHVzLkJpbGxEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdXBkYXRlZEJpbGxTdGF0dXMuQmlsbERhdGEgPSB1cGRhdGVkQmlsbERhdGE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHVwZGF0ZWRCaWxsU3RhdHVzLlRvTWVzc2FnZShtLklkKSk7XG4gICAgfVxuICAgIFxuICAgIF9oYW5kbGVHZXRUYWJsZUNvbmZpZyhtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHRoaXMuQ29uZmlnLlRvTWVzc2FnZShtLklkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBQcmVhdXRoRXZlbnRzLFxuICAgIEFjY291bnRWZXJpZnlSZXF1ZXN0LCBcbiAgICBQcmVhdXRoT3BlblJlcXVlc3QsIFxuICAgIFByZWF1dGhUb3B1cFJlcXVlc3QsIFxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdCwgXG4gICAgUHJlYXV0aEV4dGVuZFJlcXVlc3QsXG4gICAgUHJlYXV0aENvbXBsZXRpb25SZXF1ZXN0LFxuICAgIFByZWF1dGhDYW5jZWxSZXF1ZXN0fSBmcm9tICcuL1ByZWF1dGgnO1xuXG5pbXBvcnQge1RyYW5zYWN0aW9uRmxvd1N0YXRlLCBUcmFuc2FjdGlvblR5cGUsIEluaXRpYXRlVHhSZXN1bHR9IGZyb20gJy4vU3BpTW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIFNwaVByZWF1dGhcbntcbiAgICBjb25zdHJ1Y3RvcihzcGkpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGkgPSBzcGk7XG4gICAgICAgIHRoaXMuX2xvZyA9IGNvbnNvbGU7XG4gICAgfVxuXG4gICAgSW5pdGlhdGVBY2NvdW50VmVyaWZ5VHgocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB2YXIgdmVyaWZ5TXNnID0gbmV3IEFjY291bnRWZXJpZnlSZXF1ZXN0KHBvc1JlZklkKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuQWNjb3VudFZlcmlmeSwgMCwgdmVyaWZ5TXNnLFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIGFjY291bnQgdmVyaWZ5IHJlcXVlc3RcIik7XG4gICAgICAgIHZhciBzZW50TXNnID0gXCJBc2tlZCBFRlRQT1MgdG8gdmVyaWZ5IGFjY291bnRcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYXRlUHJlYXV0aFR4KHRmcywgc2VudE1zZyk7XG4gICAgfVxuICAgIFxuICAgIEluaXRpYXRlT3BlblR4KHBvc1JlZklkLCBhbW91bnRDZW50cylcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aE9wZW5SZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIHZhciBzZW50TXNnID0gYEFza2VkIEVGVFBPUyB0byBjcmVhdGUgcHJlYXV0aCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBJbml0aWF0ZVRvcHVwVHgocG9zUmVmSWQsIHByZWF1dGhJZCwgYW1vdW50Q2VudHMpXG4gICAge1xuICAgICAgICB2YXIgbXNnID0gbmV3IFByZWF1dGhUb3B1cFJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQpLlRvTWVzc2FnZSgpO1xuICAgICAgICB2YXIgdGZzID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QcmVhdXRoLCBhbW91bnRDZW50cywgbXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcHJlYXV0aCB0b3B1cCByZXF1ZXN0IGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB2YXIgc2VudE1zZyA9IGBBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIHRvcHVwIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlUGFydGlhbENhbmNlbGxhdGlvblR4KHBvc1JlZklkLCBwcmVhdXRoSWQsIGFtb3VudENlbnRzKVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQpLlRvTWVzc2FnZSgpO1xuICAgICAgICB2YXIgdGZzID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QcmVhdXRoLCBhbW91bnRDZW50cywgbXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcHJlYXV0aCBwYXJ0aWFsIGNhbmNlbGxhdGlvbiByZXF1ZXN0IGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB2YXIgc2VudE1zZyA9IGBBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIHBhcnRpYWwgY2FuY2VsbGF0aW9uIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlRXh0ZW5kVHgocG9zUmVmSWQsIHByZWF1dGhJZClcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aEV4dGVuZFJlcXVlc3QocHJlYXV0aElkLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIDAsIG1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIEV4dGVuZCByZXF1ZXN0XCIpO1xuICAgICAgICB2YXIgc2VudE1zZyA9IFwiQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBFeHRlbmQgcmVxdWVzdFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBJbml0aWF0ZUNvbXBsZXRpb25UeChwb3NSZWZJZCwgcHJlYXV0aElkLCBhbW91bnRDZW50cywgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoQ29tcGxldGlvblJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIGNvbXBsZXRpb24gcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgdmFyIHNlbnRNc2cgPSBgQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBjb21wbGV0aW9uIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlQ2FuY2VsVHgocG9zUmVmSWQsIHByZWF1dGhJZClcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aENhbmNlbFJlcXVlc3QocHJlYXV0aElkLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIDAsIG1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIGNhbmNlbGxhdGlvbiByZXF1ZXN0XCIpO1xuICAgICAgICB2YXIgc2VudE1zZyA9IFwiQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBjYW5jZWxsYXRpb24gcmVxdWVzdFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBfaW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcblxuICAgICAgICB0aGlzLl9zcGkuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlID0gdGZzO1xuICAgICAgICBpZiAodGhpcy5fc3BpLl9zZW5kKHRmcy5SZXF1ZXN0KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KHNlbnRNc2cpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJQcmVhdXRoIEluaXRpYXRlZFwiKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlUHJlYXV0aE1lc3NhZ2UobSlcbiAgICB7XG4gICAgICAgIHN3aXRjaCAobS5FdmVudE5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWNjb3VudFZlcmlmeVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQcmVhdXRoRXZlbnRzLlByZWF1dGhPcGVuUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aFRvcHVwUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoRXh0ZW5kUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aENhbmNlbGxhdGlvblJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVByZWF1dGhSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEkgZG9uJ3QgVW5kZXJzdGFuZCBQcmVhdXRoIEV2ZW50OiAke20uRXZlbnROYW1lfSwgJHttLkRhdGF9LiBQZXJoYXBzIEkgaGF2ZSBub3QgaW1wbGVtZW50ZWQgaXQgeWV0LmApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZUFjY291bnRWZXJpZnlSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdmFyIGN1cnJlbnRUeEZsb3dTdGF0ZSA9IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLl9zcGkuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCBjdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIWN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIEFjY291bnQgVmVyaWZ5IHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG5cbiAgICAgICAgY3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIkFjY291bnQgVmVyaWZ5IFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZVByZWF1dGhSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdmFyIGN1cnJlbnRUeEZsb3dTdGF0ZSA9IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLl9zcGkuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCBjdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIWN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIFByZWF1dGggcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcblxuICAgICAgICBjdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiUHJlYXV0aCBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgc3RhdGljIElzUHJlYXV0aEV2ZW50KGV2ZW50TmFtZSlcbiAgICB7XG4gICAgICAgIHJldHVybiBldmVudE5hbWUubGFzdEluZGV4T2YoXCJwcmVhdXRoXCIsMCkgPT09IDAgXG4gICAgICAgICAgICAgICAgfHwgZXZlbnROYW1lID09IFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVzcG9uc2VcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5QcmVhdXRoQ29tcGxldGVSZXF1ZXN0XG4gICAgICAgICAgICAgICAgfHwgZXZlbnROYW1lID09IFByZWF1dGhFdmVudHMuQWNjb3VudFZlcmlmeVJlcXVlc3RcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVzcG9uc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
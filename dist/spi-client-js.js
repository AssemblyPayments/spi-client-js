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
/******/ 	var hotCurrentHash = "20dc7c07b2a81f2b2a10";
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

    this._spiMessageStamp = new _Messages__WEBPACK_IMPORTED_MODULE_0__["MessageStamp"](this._posId, this._secrets, 0);
    this._posVendorId = null;
    this._posVersion = null;
    this._hasSetInfo = null; // We will maintain some state

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
      if (!this._posVendorId || !this._posVersion) {
        // POS information is now required to be set
        this._log.Warn("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");

        throw new Exception("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");
      }

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
      this._log.Info("Eftpos was Unpaired. I shall unpair from my end as well.");

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
        _log.Info("Received Auth Code Required but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

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
        this._log.Info("Received Cancel Required but I was not waiting for one. Incoming Pos Ref ID: ".concat(incomingPosRefId));

        return;
      }

      var txState = this.CurrentTxFlowState;
      var cancelResponse = new _Purchase__WEBPACK_IMPORTED_MODULE_11__["CancelTransactionResponse"](m);
      if (cancelResponse.Success) return;

      this._log.Warn("Failed to cancel transaction: reason=" + cancelResponse.GetErrorReason() + ", detail=" + cancelResponse.GetErrorDetail());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWVzLWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3NoYS9zcmMvc2hhLmpzIiwid2VicGFjazovLy8uL3NyYy9DYXNob3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9DcnlwdG8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0tleVJvbGxpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhaXJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BheUF0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByZWF1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByaW50aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXJjaGFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHVyY2hhc2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlcXVlc3RJZEhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VjcmV0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZS9EZXZpY2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TZXR0bGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9TcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NwaU1vZGVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUGF5QXRUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUHJlYXV0aC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJTcGkiLCJMb2dnZXIiLCJQcmludGVyIiwiQ2FzaG91dE9ubHlSZXF1ZXN0IiwiYW1vdW50Q2VudHMiLCJwb3NSZWZJZCIsInN1cmNoYXJnZUFtb3VudCIsIlBvc1JlZklkIiwiQ2FzaG91dEFtb3VudCIsIlN1cmNoYXJnZUFtb3VudCIsIkNvbmZpZyIsIlNwaUNvbmZpZyIsIk9wdGlvbnMiLCJUcmFuc2FjdGlvbk9wdGlvbnMiLCJkYXRhIiwiYWRkUmVjZWlwdENvbmZpZyIsIkFkZE9wdGlvbnMiLCJNZXNzYWdlIiwiUmVxdWVzdElkSGVscGVyIiwiSWQiLCJFdmVudHMiLCJDYXNob3V0T25seVJlc3BvbnNlIiwibSIsIl9tIiwiUmVxdWVzdElkIiwiRGF0YSIsInBvc19yZWZfaWQiLCJTY2hlbWVOYW1lIiwic2NoZW1lX25hbWUiLCJTdWNjZXNzIiwiR2V0U3VjY2Vzc1N0YXRlIiwiU3VjY2Vzc1N0YXRlIiwiYXR0cmlidXRlIiwiQ29ubmVjdGlvblN0YXRlIiwiRGlzY29ubmVjdGVkIiwiQ29ubmVjdGluZyIsIkNvbm5lY3RlZCIsIlNQSV9QUk9UT0NPTCIsIkNvbm5lY3Rpb25TdGF0ZUV2ZW50QXJncyIsImNvbm5lY3Rpb25TdGF0ZSIsIk1lc3NhZ2VFdmVudEFyZ3MiLCJtZXNzYWdlIiwiQ29ubmVjdGlvbiIsIkFkZHJlc3MiLCJTdGF0ZSIsIlNwaVByb3RvY29sIiwiX3dzIiwiV2ViU29ja2V0IiwiRXJyb3IiLCJvbm9wZW4iLCJwb2xsV2ViU29ja2V0Q29ubmVjdGlvbiIsIm9ubWVzc2FnZSIsInBheWxvYWQiLCJvbk1lc3NhZ2VSZWNlaXZlZCIsIm9uY2xvc2UiLCJvbkNsb3NlZCIsIm9uZXJyb3IiLCJlcnIiLCJvbkVycm9yIiwiZG9jdW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJyZWFkeVN0YXRlIiwiQ0xPU0VEIiwiY2xvc2UiLCJzZW5kIiwiY291bnQiLCJPUEVOIiwib25PcGVuZWQiLCJzZXRUaW1lb3V0IiwiRGlzY29ubmVjdCIsIkNyeXB0byIsImtleSIsImJ5dGVzIiwiYWVzanMiLCJ1dGlscyIsImhleCIsInRvQnl0ZXMiLCJpdiIsInRleHRCeXRlcyIsInBhZGRpbmciLCJwa2NzNyIsInBhZCIsInV0ZjgiLCJhZXNDYmMiLCJNb2RlT2ZPcGVyYXRpb24iLCJjYmMiLCJlbmNyeXB0ZWRCeXRlcyIsImVuY3J5cHQiLCJlbmNyeXB0ZWRTdHJpbmciLCJmcm9tQnl0ZXMiLCJkZWNyeXB0ZWRCeXRlcyIsImRlY3J5cHQiLCJkZWNyeXB0ZWQiLCJzdHJpcCIsIm1lc3NhZ2VUb1NpZ24iLCJzaGFPYmoiLCJqc1NIQSIsInNldEhNQUNLZXkiLCJ1cGRhdGUiLCJnZXRITUFDIiwidmFsdWUiLCJzaGFIYXNoIiwiZ2V0SGFzaCIsIktleVJvbGxpbmdIZWxwZXIiLCJrclJlcXVlc3QiLCJjdXJyZW50U2VjcmV0cyIsIktleVJvbGxSZXNwb25zZSIsIm5ld1NlY3JldHMiLCJTZWNyZXRzIiwiR2VuZXJhdGVIYXNoIiwiRW5jS2V5IiwidG9VcHBlckNhc2UiLCJIbWFjS2V5IiwiS2V5Um9sbGluZ1Jlc3VsdCIsImtleVJvbGxpbmdDb25maXJtYXRpb24iLCJLZXlSb2xsaW5nQ29uZmlybWF0aW9uIiwiTmV3U2VjcmV0cyIsImVsZW1lbnQiLCJsaW5lU2VwZXJhdG9yIiwiYnVmZmVyIiwiYXJncyIsInB1c2giLCJqb2luIiwiX3JlbmRlciIsImNvbnNvbGUiLCJsb2ciLCJpbm5lclRleHQiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJQYWlyUmVxdWVzdCIsIktleVJlcXVlc3QiLCJLZXlSZXNwb25zZSIsIktleUNoZWNrIiwiUGFpclJlc3BvbnNlIiwiRHJvcEtleXNBZHZpY2UiLCJMb2dpblJlcXVlc3QiLCJMb2dpblJlc3BvbnNlIiwiUGluZyIsIlBvbmciLCJQdXJjaGFzZVJlcXVlc3QiLCJQdXJjaGFzZVJlc3BvbnNlIiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0IiwiR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCIsIkdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIiwiUmVmdW5kUmVxdWVzdCIsIlJlZnVuZFJlc3BvbnNlIiwiU2lnbmF0dXJlUmVxdWlyZWQiLCJTaWduYXR1cmVEZWNsaW5lZCIsIlNpZ25hdHVyZUFjY2VwdGVkIiwiQXV0aENvZGVSZXF1aXJlZCIsIkF1dGhDb2RlQWR2aWNlIiwiTW90b1B1cmNoYXNlUmVxdWVzdCIsIk1vdG9QdXJjaGFzZVJlc3BvbnNlIiwiU2V0dGxlUmVxdWVzdCIsIlNldHRsZVJlc3BvbnNlIiwiU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0IiwiU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZSIsIktleVJvbGxSZXF1ZXN0IiwiSW52YWxpZEhtYWNTaWduYXR1cmUiLCJQYXlBdFRhYmxlR2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlU2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlR2V0QmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbFBheW1lbnQiLCJVbmtub3duIiwiRmFpbGVkIiwiTWVzc2FnZVN0YW1wIiwicG9zSWQiLCJzZWNyZXRzIiwic2VydmVyVGltZURlbHRhIiwiUG9zSWQiLCJTZXJ2ZXJUaW1lRGVsdGEiLCJNZXNzYWdlRW52ZWxvcGUiLCJlbmMiLCJobWFjIiwiRW5jIiwiSG1hYyIsInBvc19pZCIsImlkIiwiZXZlbnROYW1lIiwibmVlZHNFbmNyeXB0aW9uIiwiRXZlbnROYW1lIiwiRGF0ZVRpbWVTdGFtcCIsIkluY29tbWluZ0htYWMiLCJfbmVlZHNFbmNyeXB0aW9uIiwiRGVjcnlwdGVkSnNvbiIsInN1Y2Nlc3MiLCJlcnJvcl9yZWFzb24iLCJlcnJvcl9kZXRhaWwiLCJub3ciLCJEYXRlIiwiZHRzIiwic3BsaXQiLCJtc2dUaW1lIiwiZ2V0VGltZSIsInN0YW1wIiwidHpvZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImFkanVzdGVkVGltZSIsInRvSVNPU3RyaW5nIiwic2xpY2UiLCJlbnZlbG9wZSIsImV2ZW50IiwiZGF0ZXRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5jTXNnIiwiQWVzRW5jcnlwdCIsImhtYWNTaWciLCJIbWFjU2lnbmF0dXJlIiwiZW5jck1lc3NhZ2VFbnZlbG9wZSIsImJhbmtEYXRlIiwibGVuZ3RoIiwic3Vic3RyIiwiZGF0ZSIsInRpbWUiLCJtc2dKc29uIiwiZW52IiwicGFyc2UiLCJzaWciLCJkZWNyeXB0ZWRKc29uIiwiQWVzRGVjcnlwdCIsImRlY3J5cHRlZE1zZyIsIkluY29taW5nSG1hYyIsImUiLCJBZW5jIiwiQSIsIkFobWFjIiwicmVxdWVzdElkIiwiQmVuYyIsIkJobWFjIiwiQiIsIkNvbmZpcm1hdGlvbkNvZGUiLCJzdWJzdHJpbmciLCJTZWNyZXRzQW5kS2V5UmVzcG9uc2UiLCJrZXlSZXNwb25zZSIsIkRyb3BLZXlzUmVxdWVzdCIsIkJpbGxTdGF0dXNSZXNwb25zZSIsIlJlc3VsdCIsIkJpbGxJZCIsIlRhYmxlSWQiLCJUb3RhbEFtb3VudCIsIk91dHN0YW5kaW5nQW1vdW50IiwiQmlsbERhdGEiLCJiaWxsUGF5bWVudEhpc3RvcnkiLCJzYXZlZEJpbGxEYXRhIiwibWFwIiwiYmlsbCIsIlBheW1lbnRIaXN0b3J5RW50cnkiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X3N1bW1hcnkiLCJtZXNzYWdlSWQiLCJCaWxsUmV0cmlldmFsUmVzdWx0IiwiU1VDQ0VTUyIsImJpbGxfaWQiLCJ0YWJsZV9pZCIsImJpbGxfdG90YWxfYW1vdW50IiwiYmlsbF9vdXRzdGFuZGluZ19hbW91bnQiLCJiaWxsX3BheW1lbnRfaGlzdG9yeSIsImdldEJpbGxQYXltZW50SGlzdG9yeSIsInRvU3RyaW5nIiwicGgiLCJJTlZBTElEX1RBQkxFX0lEIiwiSU5WQUxJRF9CSUxMX0lEIiwiSU5WQUxJRF9PUEVSQVRPUl9JRCIsIlBheW1lbnRUeXBlIiwiQ0FSRCIsIkNBU0giLCJCaWxsUGF5bWVudCIsIl9pbmNvbWluZ0FkdmljZSIsIk9wZXJhdG9ySWQiLCJwdCIsInB1cmNoYXNlTXNnIiwiUHVyY2hhc2VBbW91bnQiLCJHZXRQdXJjaGFzZUFtb3VudCIsIlRpcEFtb3VudCIsIkdldFRpcEFtb3VudCIsInBheW1lbnRUeXBlIiwicGF5bWVudFN1bW1hcnkiLCJQYXltZW50U3VtbWFyeSIsIlBheUF0VGFibGVDb25maWciLCJQYXlBdFRhYmxlZEVuYWJsZWQiLCJPcGVyYXRvcklkRW5hYmxlZCIsIlNwbGl0QnlBbW91bnRFbmFibGVkIiwiRXF1YWxTcGxpdEVuYWJsZWQiLCJUaXBwaW5nRW5hYmxlZCIsIlN1bW1hcnlSZXBvcnRFbmFibGVkIiwiTGFiZWxQYXlCdXR0b24iLCJMYWJlbE9wZXJhdG9ySWQiLCJMYWJlbFRhYmxlSWQiLCJBbGxvd2VkT3BlcmF0b3JJZHMiLCJQb25nSGVscGVyIiwicGluZyIsIlBpbmdIZWxwZXIiLCJQcmVhdXRoRXZlbnRzIiwiQWNjb3VudFZlcmlmeVJlcXVlc3QiLCJBY2NvdW50VmVyaWZ5UmVzcG9uc2UiLCJQcmVhdXRoT3BlblJlcXVlc3QiLCJQcmVhdXRoT3BlblJlc3BvbnNlIiwiUHJlYXV0aFRvcHVwUmVxdWVzdCIsIlByZWF1dGhUb3B1cFJlc3BvbnNlIiwiUHJlYXV0aEV4dGVuZFJlcXVlc3QiLCJQcmVhdXRoRXh0ZW5kUmVzcG9uc2UiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlc3BvbnNlIiwiUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2UiLCJQcmVhdXRoQ29tcGxldGVSZXF1ZXN0IiwiUHJlYXV0aENvbXBsZXRlUmVzcG9uc2UiLCJEZXRhaWxzIiwiUHJlYXV0aEFtb3VudCIsInByZWF1dGhJZCIsInRvcHVwQW1vdW50Q2VudHMiLCJQcmVhdXRoSWQiLCJUb3B1cEFtb3VudCIsInBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnRDZW50cyIsIlBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnQiLCJQcmVhdXRoQ2FuY2VsUmVxdWVzdCIsIlByZWF1dGhDb21wbGV0aW9uUmVxdWVzdCIsImNvbXBsZXRpb25BbW91bnRDZW50cyIsIkNvbXBsZXRpb25BbW91bnQiLCJQcmVhdXRoUmVzcG9uc2UiLCJ0eFR5cGUiLCJQcm9tcHRGb3JDYXNob3V0IiwiQW1vdW50Q2VudHMiLCJ0b0ZpeGVkIiwicHVyY2hhc2VfYW1vdW50IiwidGlwX2Ftb3VudCIsImNhc2hfYW1vdW50IiwicHJvbXB0X2Zvcl9jYXNob3V0Iiwic3VyY2hhcmdlX2Ftb3VudCIsIlNjaGVtZUFwcE5hbWUiLCJycm4iLCJiYW5rX25vbmNhc2hfYW1vdW50IiwiYmFua19jYXNoX2Ftb3VudCIsImN1c3RvbWVyX3JlY2VpcHQiLCJtZXJjaGFudF9yZWNlaXB0IiwiaG9zdF9yZXNwb25zZV90ZXh0IiwiaG9zdF9yZXNwb25zZV9jb2RlIiwidGVybWluYWxfcmVmX2lkIiwiY2FyZF9lbnRyeSIsImFjY291bnRfdHlwZSIsImF1dGhfY29kZSIsImJhbmtfZGF0ZSIsImJhbmtfdGltZSIsIm1hc2tlZF9wYW4iLCJ0ZXJtaW5hbF9pZCIsIm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZCIsImN1c3RvbWVyX3JlY2VpcHRfcHJpbnRlZCIsImRhdGVTdHIiLCJiYW5rX3NldHRsZW1lbnRfZGF0ZSIsIlBhcnNlQmFua0RhdGUiLCJHZXRBY2NvdW50VHlwZSIsIkdldEF1dGhDb2RlIiwiR2V0QmFua0RhdGUiLCJHZXRCYW5rVGltZSIsIkdldFJlc3BvbnNlQ29kZSIsIkdldFJlc3BvbnNlVGV4dCIsIkdldE1hc2tlZFBhbiIsIkdldFJSTiIsIkdldFRlcm1pbmFsSWQiLCJHZXRUZXJtaW5hbFJlZmVyZW5jZUlkIiwiR2V0U3VyY2hhcmdlQW1vdW50IiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXNwb25zZSIsIkdldEVycm9yIiwic3RhcnRzV2l0aCIsIldhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvciIsIkdldFBvc1JlZklkIiwidHJhbnNhY3Rpb25fdHlwZSIsImFtb3VudF9wdXJjaGFzZSIsImFtb3VudF90cmFuc2FjdGlvbl90eXBlIiwiZHMiLCJjciIsIm1yIiwicmVmdW5kX2Ftb3VudCIsIl9yZWNlaXB0VG9TaWduIiwicmVjZWlwdFRvU2lnbiIsIlNpZ25hdHVyZURlY2xpbmUiLCJTaWduYXR1cmVBY2NlcHQiLCJQaG9uZUZvckF1dGhSZXF1aXJlZCIsIl9waG9uZU51bWJlciIsIl9tZXJjaGFudElkIiwiYXV0aF9jZW50cmVfcGhvbmVfbnVtYmVyIiwibWVyY2hhbnRfaWQiLCJhdXRoQ29kZSIsIkF1dGhDb2RlIiwiUHVyY2hhc2VIZWxwZXIiLCJwdXJjaGFzZUlkIiwicHVyY2hhc2VBbW91bnQiLCJ0aXBBbW91bnQiLCJjYXNob3V0QW1vdW50IiwicHJvbXB0Rm9yQ2FzaG91dCIsInByIiwiT2JqZWN0IiwiYXNzaWduIiwiaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQiLCJfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIiLCJwcmVmaXgiLCJlbmNLZXkiLCJobWFjS2V5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwiRGV2aWNlQWRkcmVzc1N0YXR1cyIsImFkZHJlc3MiLCJsYXN0VXBkYXRlZCIsIkxhc3RVcGRhdGVkIiwiRGV2aWNlQWRkcmVzc1NlcnZpY2UiLCJzZXJpYWxOdW1iZXIiLCJhcGlLZXkiLCJpc1Rlc3RNb2RlIiwiZGV2aWNlQWRkcmVzc1VyaSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiU3RhdHVzQ29kZSIsIkVycm9yRXhjZXB0aW9uIiwiU2V0dGxlbWVudCIsImFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl9jb3VudCIsImFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl92YWx1ZSIsImFjY3VtdWxhdGVkX3RvdGFsX2NvdW50IiwiYWNjdW11bGF0ZWRfdG90YWxfdmFsdWUiLCJ0aW1lU3RyIiwic2V0dGxlbWVudF9wZXJpb2Rfc3RhcnRfdGltZSIsInNldHRsZW1lbnRfcGVyaW9kX3N0YXJ0X2RhdGUiLCJQYXJzZUJhbmtEYXRlVGltZVN0ciIsInNldHRsZW1lbnRfcGVyaW9kX2VuZF90aW1lIiwic2V0dGxlbWVudF9wZXJpb2RfZW5kX2RhdGUiLCJzZXR0bGVtZW50X3RyaWdnZXJlZF90aW1lIiwic2V0dGxlbWVudF90cmlnZ2VyZWRfZGF0ZSIsInRyYW5zYWN0aW9uX3JhbmdlIiwic2NoZW1lcyIsInNjaGVtZSIsIlNjaGVtZVNldHRsZW1lbnRFbnRyeSIsIlNldHRsZUJ5QWNxdWlyZXIiLCJzZXR0bGVfYnlfYWNxdWlyZXIiLCJ0b0xvd2VyQ2FzZSIsIlRvdGFsVmFsdWUiLCJwYXJzZUludCIsInRvdGFsX3ZhbHVlIiwiVG90YWxDb3VudCIsInRvdGFsX2NvdW50IiwiU1BJX1ZFUlNJT04iLCJfY3VycmVudFN0YXR1cyIsImVmdHBvc0FkZHJlc3MiLCJfcG9zSWQiLCJfc2VyaWFsTnVtYmVyIiwiX3NlY3JldHMiLCJfZWZ0cG9zQWRkcmVzcyIsIl9sb2ciLCJDdXJyZW50RGV2aWNlU3RhdHVzIiwiX2RldmljZUFwaUtleSIsIl9pblRlc3RNb2RlIiwiX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQiLCJfc3BpTWVzc2FnZVN0YW1wIiwiX3Bvc1ZlbmRvcklkIiwiX3Bvc1ZlcnNpb24iLCJfaGFzU2V0SW5mbyIsIl9tb3N0UmVjZW50UGluZ1NlbnQiLCJfbW9zdFJlY2VudFBvbmdSZWNlaXZlZCIsIl9taXNzZWRQb25nc0NvdW50IiwiX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiIsIl9tb3N0UmVjZW50TG9naW5SZXNwb25zZSIsIl9wb25nVGltZW91dCIsIl9waW5nRnJlcXVlbmN5IiwiX3JlYWR5VG9UcmFuc2FjdCIsIl9wZXJpb2RpY1BpbmdUaHJlYWQiLCJfdHhNb25pdG9yQ2hlY2tGcmVxdWVuY3kiLCJfY2hlY2tPblR4RnJlcXVlbmN5IiwiX21heFdhaXRGb3JDYW5jZWxUeCIsIl9zbGVlcEJlZm9yZVJlY29ubmVjdE1zIiwiX21pc3NlZFBvbmdzVG9EaXNjb25uZWN0IiwiX3JldHJpZXNCZWZvcmVSZXNvbHZpbmdEZXZpY2VBZGRyZXNzIiwiQ3VycmVudEZsb3ciLCJDdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZSIsIkN1cnJlbnRUeEZsb3dTdGF0ZSIsIl9zcGlQYXQiLCJTcGlQYXlBdFRhYmxlIiwiX3NwaVByZWF1dGgiLCJTcGlQcmVhdXRoIiwiV2FybiIsIkV4Y2VwdGlvbiIsIl9yZXNldENvbm4iLCJfc3RhcnRUcmFuc2FjdGlvbk1vbml0b3JpbmdUaHJlYWQiLCJTcGlGbG93IiwiSWRsZSIsImluZm8iLCJTcGlTdGF0dXMiLCJQYWlyZWRDb25uZWN0aW5nIiwiX2Nvbm4iLCJDb25uZWN0IiwiVW5wYWlyZWQiLCJkZXZpY2VBcGlLZXkiLCJDdXJyZW50U3RhdHVzIiwiSGFzU2VyaWFsTnVtYmVyQ2hhbmdlZCIsIl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MiLCJhdXRvQWRkcmVzc1Jlc29sdXRpb24iLCJQYWlyZWRDb25uZWN0ZWQiLCJ0ZXN0TW9kZSIsIlBhaXJpbmciLCJGaW5pc2hlZCIsIlRyYW5zYWN0aW9uIiwid2FybiIsIlBhaXJpbmdGbG93U3RhdGUiLCJTdWNjZXNzZnVsIiwiQXdhaXRpbmdDaGVja0Zyb21FZnRwb3MiLCJBd2FpdGluZ0NoZWNrRnJvbVBvcyIsIl9vblBhaXJpbmdTdWNjZXNzIiwiX29uUmVhZHlUb1RyYW5zYWN0IiwiX3NlbmQiLCJUb01lc3NhZ2UiLCJfb25QYWlyaW5nRmFpbGVkIiwiX2RvVW5wYWlyIiwiSW5pdGlhdGVUeFJlc3VsdCIsInB1cmNoYXNlUmVxdWVzdCIsIkNyZWF0ZVB1cmNoYXNlUmVxdWVzdCIsIlRyYW5zYWN0aW9uRmxvd1N0YXRlIiwiVHJhbnNhY3Rpb25UeXBlIiwiUHVyY2hhc2UiLCJTZW50Iiwib3B0aW9ucyIsInB1cmNoYXNlIiwiQ3JlYXRlUHVyY2hhc2VSZXF1ZXN0VjIiLCJBbW91bnRTdW1tYXJ5IiwicmVmdW5kUmVxdWVzdCIsIkNyZWF0ZVJlZnVuZFJlcXVlc3QiLCJyZWZ1bmRNc2ciLCJSZWZ1bmQiLCJhY2NlcHRlZCIsIkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2siLCJNaWRUeFJlc3VsdCIsIlNpZ25hdHVyZVJlc3BvbmRlZCIsInNpZ1JlcU1zZyIsIlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSIsIlN1Ym1pdEF1dGhDb2RlUmVzdWx0IiwiQXdhaXRpbmdQaG9uZUZvckF1dGgiLCJBdXRoQ29kZVNlbnQiLCJSZXF1ZXN0U2VudCIsImNhbmNlbFJlcSIsIkNhbmNlbGxpbmciLCJjYXNob3V0T25seVJlcXVlc3QiLCJjYXNob3V0TXNnIiwiQ2FzaG91dE9ubHkiLCJtb3RvUHVyY2hhc2VSZXF1ZXN0IiwiTU9UTyIsInNldHRsZVJlcXVlc3RNc2ciLCJTZXR0bGUiLCJzdGxFbnFNc2ciLCJTZXR0bGVtZW50RW5xdWlyeSIsImdsdFJlcXVlc3RNc2ciLCJHZXRMYXN0VHJhbnNhY3Rpb24iLCJnbHRSZXNwb25zZSIsIkdsdE1hdGNoIiwiUGFpcmluZ0hlbHBlciIsInJlc3VsdCIsIkdlbmVyYXRlU2VjcmV0c0FuZEtleVJlc3BvbnNlIiwia2V5Q2hlY2siLCJwYWlyUmVzcCIsIl9zdGFydFBlcmlvZGljUGluZyIsIkluZm8iLCJrclJlcyIsIlBlcmZvcm1LZXlSb2xsaW5nIiwiaW5jb21pbmdQb3NSZWZJZCIsInBob25lRm9yQXV0aFJlcXVpcmVkIiwibXNnIiwiR2V0UGhvbmVOdW1iZXIiLCJHZXRNZXJjaGFudElkIiwiQ29tcGxldGVkIiwiQXR0ZW1wdGluZ1RvQ2FuY2VsIiwiX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24iLCJ0eFN0YXRlIiwiR290R2x0UmVzcG9uc2UiLCJndGxSZXNwb25zZSIsIkdMVFJlc3BvbnNlUG9zUmVmSWQiLCJXYXNSZXRyaWV2ZWRTdWNjZXNzZnVsbHkiLCJJc1N0aWxsSW5Qcm9ncmVzcyIsIklzV2FpdGluZ0ZvclNpZ25hdHVyZVJlc3BvbnNlIiwiSXNXYWl0aW5nRm9yQXV0aENvZGUiLCJXYXNUaW1lT3V0T2ZTeW5jRXJyb3IiLCJVbmtub3duQ29tcGxldGVkIiwiVHlwZSIsIkNvcHlNZXJjaGFudFJlY2VpcHRUb0N1c3RvbWVyUmVjZWlwdCIsInN1Y2Nlc3NTdGF0ZSIsImNhbmNlbFJlc3BvbnNlIiwiR2V0RXJyb3JSZWFzb24iLCJHZXRFcnJvckRldGFpbCIsIkNhbmNlbEZhaWxlZCIsIm5lZWRzUHVibGlzaGluZyIsInN0YXRlIiwiQ2FuY2VsQXR0ZW1wdFRpbWUiLCJMYXN0U3RhdGVSZXF1ZXN0VGltZSIsIkNhbGxpbmdHbHQiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uU3BpQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQiLCJfb25TcGlNZXNzYWdlUmVjZWl2ZWQiLCJfb25Xc0Vycm9yUmVjZWl2ZWQiLCJOZXdQYWlyUmVxdWVzdCIsIl9zdG9wUGVyaW9kaWNQaW5nIiwic2V0SW50ZXJ2YWwiLCJfcGVyaW9kaWNQaW5nIiwiX2RvUGluZyIsIlJlcXVlc3QiLCJQdXNoUGF5QXRUYWJsZUNvbmZpZyIsImNsZWFySW50ZXJ2YWwiLCJHZW5lcmF0ZVBpbmdSZXF1ZXN0IiwiX21vc3RSZWNlbnRQaW5nU2VudFRpbWUiLCJHZXRTZXJ2ZXJUaW1lRGVsdGEiLCJkZWJ1ZyIsInBvbmciLCJHZW5lcmF0ZVBvbmdSZXNzcG9uc2UiLCJnbHRSZXF1ZXN0IiwibWVzc2FnZUpzb24iLCJGcm9tSnNvbiIsIklzUHJlYXV0aEV2ZW50IiwiX2hhbmRsZVByZWF1dGhNZXNzYWdlIiwiX2hhbmRsZUtleVJlcXVlc3QiLCJfaGFuZGxlS2V5Q2hlY2siLCJfaGFuZGxlUGFpclJlc3BvbnNlIiwiX2hhbmRsZURyb3BLZXlzQWR2aWNlIiwiX2hhbmRsZVB1cmNoYXNlUmVzcG9uc2UiLCJfaGFuZGxlUmVmdW5kUmVzcG9uc2UiLCJfaGFuZGxlQ2FzaG91dE9ubHlSZXNwb25zZSIsIl9oYW5kbGVNb3RvUHVyY2hhc2VSZXNwb25zZSIsIl9oYW5kbGVTaWduYXR1cmVSZXF1aXJlZCIsIl9oYW5kbGVBdXRoQ29kZVJlcXVpcmVkIiwiX2hhbmRsZUdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIiwiSGFuZGxlU2V0dGxlUmVzcG9uc2UiLCJfaGFuZGxlU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZSIsIl9oYW5kbGVJbmNvbWluZ1BpbmciLCJfaGFuZGxlSW5jb21pbmdQb25nIiwiX2hhbmRsZUtleVJvbGxpbmdSZXF1ZXN0IiwiRmVhdHVyZURpc2FibGVNZXNzYWdlIiwiX2hhbmRsZUdldFRhYmxlQ29uZmlnIiwiX2hhbmRsZUdldEJpbGxEZXRhaWxzUmVxdWVzdCIsIl9oYW5kbGVCaWxsUGF5bWVudEFkdmljZSIsIl9oYW5kbGVFcnJvckV2ZW50IiwiVG9Kc29uIiwiU2VuZCIsInVwZGF0ZWRTZXJpYWxOdW1iZXIiLCJ1cGRhdGVkRWZ0cG9zQWRkcmVzcyIsInNlcnZpY2UiLCJSZXRyaWV2ZVNlcnZpY2UiLCJhZGRyZXNzUmVzcG9uc2UiLCJIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCIsIlByZWF1dGgiLCJBY2NvdW50VmVyaWZ5IiwiaW5pdGlhdGVkIiwiSW5pdGlhdGVkIiwidmFsaWQiLCJWYWxpZCIsInR5cGUiLCJEaXNwbGF5TWVzc2FnZSIsIlJlcXVlc3RUaW1lIiwiUmVzcG9uc2UiLCJQaG9uZUZvckF1dGhSZXF1aXJlZE1lc3NhZ2UiLCJBd2FpdGluZ0dsdFJlc3BvbnNlIiwic3BpTWVzc2FnZSIsInZhbGlkRm9ybWF0IiwiVmFsaWRGb3JtYXQiLCJQcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcyIsIlNpZ25hdHVyZUZsb3dPbkVmdHBvcyIsIlByaW50TWVyY2hhbnRDb3B5IiwibWVzc2FnZURhdGEiLCJwcm9tcHRfZm9yX2N1c3RvbWVyX2NvcHkiLCJwcmludF9mb3Jfc2lnbmF0dXJlX3JlcXVpcmVkX3RyYW5zYWN0aW9ucyIsInByaW50X21lcmNoYW50X2NvcHkiLCJfY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiX2N1c3RvbWVyUmVjZWlwdEZvb3RlciIsIl9tZXJjaGFudFJlY2VpcHRIZWFkZXIiLCJfbWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiY3VzdG9tZXJSZWNlaXB0Rm9vdGVyIiwibWVyY2hhbnRSZWNlaXB0SGVhZGVyIiwibWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJfcmVjZWlwdF9oZWFkZXIiLCJjdXN0b21lcl9yZWNlaXB0X2Zvb3RlciIsIm1lcmNoYW50X3JlY2VpcHRfaGVhZGVyIiwibWVyY2hhbnRfcmVjZWlwdF9mb290ZXIiLCJzcGkiLCJfc3BpIiwiYmlsbElkIiwidGFibGVJZCIsIm9wZXJhdG9ySWQiLCJiaWxsUGF5bWVudCIsInVwZGF0ZWRCaWxsRGF0YSIsImJpbGxTdGF0dXMiLCJHZXRCaWxsU3RhdHVzIiwiZXhpc3RpbmdCaWxsU3RhdHVzIiwiZXhpc3RpbmdQYXltZW50SGlzdG9yeSIsImZvdW5kRXhpc3RpbmdFbnRyeSIsImZpbmQiLCJwaGUiLCJHZXRUZXJtaW5hbFJlZklkIiwidXBkYXRlZEhpc3RvcnlFbnRyaWVzIiwiVG9QYXltZW50U3VtbWFyeSIsIlRvQmlsbERhdGEiLCJ1cGRhdGVkQmlsbFN0YXR1cyIsIkJpbGxQYXltZW50UmVjZWl2ZWQiLCJ2ZXJpZnlNc2ciLCJ0ZnMiLCJzZW50TXNnIiwiX2luaXRpYXRlUHJlYXV0aFR4IiwiX2hhbmRsZUFjY291bnRWZXJpZnlSZXNwb25zZSIsIl9oYW5kbGVQcmVhdXRoUmVzcG9uc2UiLCJjdXJyZW50VHhGbG93U3RhdGUiLCJsYXN0SW5kZXhPZiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFHLEtBQUt6QixJQUFMLENBQVU1TSxrQkFBbkM7O0FBQ0EsVUFBSSxLQUFLNE0sSUFBTCxDQUFVOU0sV0FBVixJQUF5QlcsT0FBTyxDQUFDaUIsV0FBakMsSUFBZ0QyTSxrQkFBa0IsQ0FBQzVNLFFBQW5FLElBQStFLENBQUM0TSxrQkFBa0IsQ0FBQ2pzQixRQUFwQixLQUFpQ21qQixnQkFBcEgsRUFDQTtBQUNJLGFBQUtqSCxJQUFMLENBQVVxQyxJQUFWLHlGQUFnRzRFLGdCQUFoRzs7QUFDQTtBQUNILE9BUEwsQ0FRSTs7O0FBRUE4SSx3QkFBa0IsQ0FBQ3pJLFNBQW5CLENBQTZCemlCLENBQUMsQ0FBQ1EsZUFBRixFQUE3QixFQUFrRFIsQ0FBbEQsRUFBcUQsNEJBQXJELEVBVkosQ0FXSTs7QUFFQXFDLGNBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUFJQyxXQUFKLENBQWdCLG9CQUFoQixFQUFzQztBQUFDQyxjQUFNLEVBQUUsS0FBS2luQixJQUFMLENBQVU1TTtBQUFuQixPQUF0QyxDQUF2QjtBQUNIO0FBcEpMO0FBQUE7QUFBQSxtQ0FzSjBCOVMsU0F0SjFCLEVBdUpJO0FBQ0ksYUFBT0EsU0FBUyxDQUFDb2hCLFdBQVYsQ0FBc0IsU0FBdEIsRUFBZ0MsQ0FBaEMsTUFBdUMsQ0FBdkMsSUFDSXBoQixTQUFTLElBQUltSCxzREFBYSxDQUFDYyx1QkFEL0IsSUFFSWpJLFNBQVMsSUFBSW1ILHNEQUFhLENBQUNhLHNCQUYvQixJQUdJaEksU0FBUyxJQUFJbUgsc0RBQWEsQ0FBQ0Msb0JBSC9CLElBSUlwSCxTQUFTLElBQUltSCxzREFBYSxDQUFDRSxxQkFKdEM7QUFLSDtBQTdKTDs7QUFBQTtBQUFBLEkiLCJmaWxlIjoic3BpLWNsaWVudC1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIyMGRjN2MwN2IyYTgxZjJiMmExMFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9pbmRleC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQge1NwaX0gZnJvbSBcIi4vc3JjL1NwaVwiO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vc3JjL0xvZ2dlcic7XG5pbXBvcnQge1ByaW50ZXJ9IGZyb20gJy4vc3JjL1ByaW50aW5nJztcblxuLy8gUmUtZXhwb3J0ZWQgbW9kdWxlcyByZXF1aXJlZCBmb3IgUE9TIHZlbmRvcnNcbmV4cG9ydCB7U3BpfSBmcm9tICcuL3NyYy9TcGknO1xuZXhwb3J0IHtMb2dnZXJ9IGZyb20gJy4vc3JjL0xvZ2dlcic7XG5leHBvcnQge1NlY3JldHN9IGZyb20gJy4vc3JjL1NlY3JldHMnO1xuZXhwb3J0IHtTdWNjZXNzU3RhdGV9IGZyb20gJy4vc3JjL01lc3NhZ2VzJztcbmV4cG9ydCB7VHJhbnNhY3Rpb25PcHRpb25zLCBUcmFuc2FjdGlvblR5cGUsIFNwaUZsb3csIFNwaVN0YXR1c30gZnJvbSAnLi9zcmMvU3BpTW9kZWxzJztcbmV4cG9ydCB7UmVmdW5kUmVzcG9uc2UsIFB1cmNoYXNlUmVzcG9uc2UsIEdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlLCBNb3RvUHVyY2hhc2VSZXNwb25zZX0gZnJvbSAnLi9zcmMvUHVyY2hhc2UnO1xuZXhwb3J0IHtDYXNob3V0T25seVJlc3BvbnNlfSBmcm9tICcuL3NyYy9DYXNob3V0JztcbmV4cG9ydCB7U2V0dGxlbWVudH0gZnJvbSAnLi9zcmMvU2V0dGxlbWVudCc7XG5cbndpbmRvdy5TcGkgPSBTcGk7XG53aW5kb3cuTG9nZ2VyID0gTG9nZ2VyO1xud2luZG93LlByaW50ZXIgPSBQcmludGVyOyIsIihmdW5jdGlvbihyb290KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBjaGVja0ludCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKHBhcnNlSW50KHZhbHVlKSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSW50cyhhcnJheWlzaCkge1xuICAgICAgICBpZiAoIWNoZWNrSW50KGFycmF5aXNoLmxlbmd0aCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheWlzaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFjaGVja0ludChhcnJheWlzaFtpXSkgfHwgYXJyYXlpc2hbaV0gPCAwIHx8IGFycmF5aXNoW2ldID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29lcmNlQXJyYXkoYXJnLCBjb3B5KSB7XG5cbiAgICAgICAgLy8gQXJyYXlCdWZmZXIgdmlld1xuICAgICAgICBpZiAoYXJnLmJ1ZmZlciAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJnKSAmJiBhcmcubmFtZSA9PT0gJ1VpbnQ4QXJyYXknKSB7XG5cbiAgICAgICAgICAgIGlmIChjb3B5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZy5zbGljZSkge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0J3MgYW4gYXJyYXk7IGNoZWNrIGl0IGlzIGEgdmFsaWQgcmVwcmVzZW50YXRpb24gb2YgYSBieXRlXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnRzKGFyZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGNvbnRhaW5zIGludmFsaWQgdmFsdWU6ICcgKyBhcmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbWV0aGluZyBlbHNlLCBidXQgYmVoYXZlcyBsaWtlIGFuIGFycmF5IChtYXliZSBhIEJ1ZmZlcj8gQXJndW1lbnRzPylcbiAgICAgICAgaWYgKGNoZWNrSW50KGFyZy5sZW5ndGgpICYmIGNoZWNrSW50cyhhcmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgYXJyYXktbGlrZSBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBcnJheShsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZUFycmF5LCB0YXJnZXRBcnJheSwgdGFyZ2V0U3RhcnQsIHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpIHtcbiAgICAgICAgaWYgKHNvdXJjZVN0YXJ0ICE9IG51bGwgfHwgc291cmNlRW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VBcnJheS5zbGljZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUFycmF5ID0gc291cmNlQXJyYXkuc2xpY2Uoc291cmNlU3RhcnQsIHNvdXJjZUVuZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZUFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc291cmNlQXJyYXksIHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRhcmdldEFycmF5LnNldChzb3VyY2VBcnJheSwgdGFyZ2V0U3RhcnQpO1xuICAgIH1cblxuXG5cbiAgICB2YXIgY29udmVydFV0ZjggPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIHRvQnl0ZXModGV4dCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCBpID0gMDtcbiAgICAgICAgICAgIHRleHQgPSBlbmNvZGVVUkkodGV4dCk7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0ZXh0LmNoYXJDb2RlQXQoaSsrKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIGEgJSBzaWduLCBlbmNvZGUgdGhlIGZvbGxvd2luZyAyIGJ5dGVzIGFzIGEgaGV4IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHRleHQuc3Vic3RyKGksIDIpLCAxNikpXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcblxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwganVzdCB0aGUgYWN0dWFsIGJ5dGVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvZXJjZUFycmF5KHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgaSA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChpIDwgYnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBieXRlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYykpO1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID4gMTkxICYmIGMgPCAyMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDFmKSA8PCA2KSB8IChieXRlc1tpICsgMV0gJiAweDNmKSkpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDBmKSA8PCAxMikgfCAoKGJ5dGVzW2kgKyAxXSAmIDB4M2YpIDw8IDYpIHwgKGJ5dGVzW2kgKyAyXSAmIDB4M2YpKSk7XG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9CeXRlczogdG9CeXRlcyxcbiAgICAgICAgICAgIGZyb21CeXRlczogZnJvbUJ5dGVzLFxuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIHZhciBjb252ZXJ0SGV4ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiB0b0J5dGVzKHRleHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHRleHQuc3Vic3RyKGksIDIpLCAxNikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cDovL2l4dGkubmV0L2RldmVsb3BtZW50L2phdmFzY3JpcHQvMjAxMS8xMS8xMS9iYXNlNjQtZW5jb2RlZGVjb2RlLW9mLXV0ZjgtaW4tYnJvd3Nlci13aXRoLWpzLmh0bWxcbiAgICAgICAgdmFyIEhleCA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICAgICAgICBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGJ5dGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIZXhbKHYgJiAweGYwKSA+PiA0XSArIEhleFt2ICYgMHgwZl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvQnl0ZXM6IHRvQnl0ZXMsXG4gICAgICAgICAgICBmcm9tQnl0ZXM6IGZyb21CeXRlcyxcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cblxuICAgIC8vIE51bWJlciBvZiByb3VuZHMgYnkga2V5c2l6ZVxuICAgIHZhciBudW1iZXJPZlJvdW5kcyA9IHsxNjogMTAsIDI0OiAxMiwgMzI6IDE0fVxuXG4gICAgLy8gUm91bmQgY29uc3RhbnQgd29yZHNcbiAgICB2YXIgcmNvbiA9IFsweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFiLCAweDM2LCAweDZjLCAweGQ4LCAweGFiLCAweDRkLCAweDlhLCAweDJmLCAweDVlLCAweGJjLCAweDYzLCAweGM2LCAweDk3LCAweDM1LCAweDZhLCAweGQ0LCAweGIzLCAweDdkLCAweGZhLCAweGVmLCAweGM1LCAweDkxXTtcblxuICAgIC8vIFMtYm94IGFuZCBJbnZlcnNlIFMtYm94IChTIGlzIGZvciBTdWJzdGl0dXRpb24pXG4gICAgdmFyIFMgPSBbMHg2MywgMHg3YywgMHg3NywgMHg3YiwgMHhmMiwgMHg2YiwgMHg2ZiwgMHhjNSwgMHgzMCwgMHgwMSwgMHg2NywgMHgyYiwgMHhmZSwgMHhkNywgMHhhYiwgMHg3NiwgMHhjYSwgMHg4MiwgMHhjOSwgMHg3ZCwgMHhmYSwgMHg1OSwgMHg0NywgMHhmMCwgMHhhZCwgMHhkNCwgMHhhMiwgMHhhZiwgMHg5YywgMHhhNCwgMHg3MiwgMHhjMCwgMHhiNywgMHhmZCwgMHg5MywgMHgyNiwgMHgzNiwgMHgzZiwgMHhmNywgMHhjYywgMHgzNCwgMHhhNSwgMHhlNSwgMHhmMSwgMHg3MSwgMHhkOCwgMHgzMSwgMHgxNSwgMHgwNCwgMHhjNywgMHgyMywgMHhjMywgMHgxOCwgMHg5NiwgMHgwNSwgMHg5YSwgMHgwNywgMHgxMiwgMHg4MCwgMHhlMiwgMHhlYiwgMHgyNywgMHhiMiwgMHg3NSwgMHgwOSwgMHg4MywgMHgyYywgMHgxYSwgMHgxYiwgMHg2ZSwgMHg1YSwgMHhhMCwgMHg1MiwgMHgzYiwgMHhkNiwgMHhiMywgMHgyOSwgMHhlMywgMHgyZiwgMHg4NCwgMHg1MywgMHhkMSwgMHgwMCwgMHhlZCwgMHgyMCwgMHhmYywgMHhiMSwgMHg1YiwgMHg2YSwgMHhjYiwgMHhiZSwgMHgzOSwgMHg0YSwgMHg0YywgMHg1OCwgMHhjZiwgMHhkMCwgMHhlZiwgMHhhYSwgMHhmYiwgMHg0MywgMHg0ZCwgMHgzMywgMHg4NSwgMHg0NSwgMHhmOSwgMHgwMiwgMHg3ZiwgMHg1MCwgMHgzYywgMHg5ZiwgMHhhOCwgMHg1MSwgMHhhMywgMHg0MCwgMHg4ZiwgMHg5MiwgMHg5ZCwgMHgzOCwgMHhmNSwgMHhiYywgMHhiNiwgMHhkYSwgMHgyMSwgMHgxMCwgMHhmZiwgMHhmMywgMHhkMiwgMHhjZCwgMHgwYywgMHgxMywgMHhlYywgMHg1ZiwgMHg5NywgMHg0NCwgMHgxNywgMHhjNCwgMHhhNywgMHg3ZSwgMHgzZCwgMHg2NCwgMHg1ZCwgMHgxOSwgMHg3MywgMHg2MCwgMHg4MSwgMHg0ZiwgMHhkYywgMHgyMiwgMHgyYSwgMHg5MCwgMHg4OCwgMHg0NiwgMHhlZSwgMHhiOCwgMHgxNCwgMHhkZSwgMHg1ZSwgMHgwYiwgMHhkYiwgMHhlMCwgMHgzMiwgMHgzYSwgMHgwYSwgMHg0OSwgMHgwNiwgMHgyNCwgMHg1YywgMHhjMiwgMHhkMywgMHhhYywgMHg2MiwgMHg5MSwgMHg5NSwgMHhlNCwgMHg3OSwgMHhlNywgMHhjOCwgMHgzNywgMHg2ZCwgMHg4ZCwgMHhkNSwgMHg0ZSwgMHhhOSwgMHg2YywgMHg1NiwgMHhmNCwgMHhlYSwgMHg2NSwgMHg3YSwgMHhhZSwgMHgwOCwgMHhiYSwgMHg3OCwgMHgyNSwgMHgyZSwgMHgxYywgMHhhNiwgMHhiNCwgMHhjNiwgMHhlOCwgMHhkZCwgMHg3NCwgMHgxZiwgMHg0YiwgMHhiZCwgMHg4YiwgMHg4YSwgMHg3MCwgMHgzZSwgMHhiNSwgMHg2NiwgMHg0OCwgMHgwMywgMHhmNiwgMHgwZSwgMHg2MSwgMHgzNSwgMHg1NywgMHhiOSwgMHg4NiwgMHhjMSwgMHgxZCwgMHg5ZSwgMHhlMSwgMHhmOCwgMHg5OCwgMHgxMSwgMHg2OSwgMHhkOSwgMHg4ZSwgMHg5NCwgMHg5YiwgMHgxZSwgMHg4NywgMHhlOSwgMHhjZSwgMHg1NSwgMHgyOCwgMHhkZiwgMHg4YywgMHhhMSwgMHg4OSwgMHgwZCwgMHhiZiwgMHhlNiwgMHg0MiwgMHg2OCwgMHg0MSwgMHg5OSwgMHgyZCwgMHgwZiwgMHhiMCwgMHg1NCwgMHhiYiwgMHgxNl07XG4gICAgdmFyIFNpID1bMHg1MiwgMHgwOSwgMHg2YSwgMHhkNSwgMHgzMCwgMHgzNiwgMHhhNSwgMHgzOCwgMHhiZiwgMHg0MCwgMHhhMywgMHg5ZSwgMHg4MSwgMHhmMywgMHhkNywgMHhmYiwgMHg3YywgMHhlMywgMHgzOSwgMHg4MiwgMHg5YiwgMHgyZiwgMHhmZiwgMHg4NywgMHgzNCwgMHg4ZSwgMHg0MywgMHg0NCwgMHhjNCwgMHhkZSwgMHhlOSwgMHhjYiwgMHg1NCwgMHg3YiwgMHg5NCwgMHgzMiwgMHhhNiwgMHhjMiwgMHgyMywgMHgzZCwgMHhlZSwgMHg0YywgMHg5NSwgMHgwYiwgMHg0MiwgMHhmYSwgMHhjMywgMHg0ZSwgMHgwOCwgMHgyZSwgMHhhMSwgMHg2NiwgMHgyOCwgMHhkOSwgMHgyNCwgMHhiMiwgMHg3NiwgMHg1YiwgMHhhMiwgMHg0OSwgMHg2ZCwgMHg4YiwgMHhkMSwgMHgyNSwgMHg3MiwgMHhmOCwgMHhmNiwgMHg2NCwgMHg4NiwgMHg2OCwgMHg5OCwgMHgxNiwgMHhkNCwgMHhhNCwgMHg1YywgMHhjYywgMHg1ZCwgMHg2NSwgMHhiNiwgMHg5MiwgMHg2YywgMHg3MCwgMHg0OCwgMHg1MCwgMHhmZCwgMHhlZCwgMHhiOSwgMHhkYSwgMHg1ZSwgMHgxNSwgMHg0NiwgMHg1NywgMHhhNywgMHg4ZCwgMHg5ZCwgMHg4NCwgMHg5MCwgMHhkOCwgMHhhYiwgMHgwMCwgMHg4YywgMHhiYywgMHhkMywgMHgwYSwgMHhmNywgMHhlNCwgMHg1OCwgMHgwNSwgMHhiOCwgMHhiMywgMHg0NSwgMHgwNiwgMHhkMCwgMHgyYywgMHgxZSwgMHg4ZiwgMHhjYSwgMHgzZiwgMHgwZiwgMHgwMiwgMHhjMSwgMHhhZiwgMHhiZCwgMHgwMywgMHgwMSwgMHgxMywgMHg4YSwgMHg2YiwgMHgzYSwgMHg5MSwgMHgxMSwgMHg0MSwgMHg0ZiwgMHg2NywgMHhkYywgMHhlYSwgMHg5NywgMHhmMiwgMHhjZiwgMHhjZSwgMHhmMCwgMHhiNCwgMHhlNiwgMHg3MywgMHg5NiwgMHhhYywgMHg3NCwgMHgyMiwgMHhlNywgMHhhZCwgMHgzNSwgMHg4NSwgMHhlMiwgMHhmOSwgMHgzNywgMHhlOCwgMHgxYywgMHg3NSwgMHhkZiwgMHg2ZSwgMHg0NywgMHhmMSwgMHgxYSwgMHg3MSwgMHgxZCwgMHgyOSwgMHhjNSwgMHg4OSwgMHg2ZiwgMHhiNywgMHg2MiwgMHgwZSwgMHhhYSwgMHgxOCwgMHhiZSwgMHgxYiwgMHhmYywgMHg1NiwgMHgzZSwgMHg0YiwgMHhjNiwgMHhkMiwgMHg3OSwgMHgyMCwgMHg5YSwgMHhkYiwgMHhjMCwgMHhmZSwgMHg3OCwgMHhjZCwgMHg1YSwgMHhmNCwgMHgxZiwgMHhkZCwgMHhhOCwgMHgzMywgMHg4OCwgMHgwNywgMHhjNywgMHgzMSwgMHhiMSwgMHgxMiwgMHgxMCwgMHg1OSwgMHgyNywgMHg4MCwgMHhlYywgMHg1ZiwgMHg2MCwgMHg1MSwgMHg3ZiwgMHhhOSwgMHgxOSwgMHhiNSwgMHg0YSwgMHgwZCwgMHgyZCwgMHhlNSwgMHg3YSwgMHg5ZiwgMHg5MywgMHhjOSwgMHg5YywgMHhlZiwgMHhhMCwgMHhlMCwgMHgzYiwgMHg0ZCwgMHhhZSwgMHgyYSwgMHhmNSwgMHhiMCwgMHhjOCwgMHhlYiwgMHhiYiwgMHgzYywgMHg4MywgMHg1MywgMHg5OSwgMHg2MSwgMHgxNywgMHgyYiwgMHgwNCwgMHg3ZSwgMHhiYSwgMHg3NywgMHhkNiwgMHgyNiwgMHhlMSwgMHg2OSwgMHgxNCwgMHg2MywgMHg1NSwgMHgyMSwgMHgwYywgMHg3ZF07XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGVuY3J5cHRpb25cbiAgICB2YXIgVDEgPSBbMHhjNjYzNjNhNSwgMHhmODdjN2M4NCwgMHhlZTc3Nzc5OSwgMHhmNjdiN2I4ZCwgMHhmZmYyZjIwZCwgMHhkNjZiNmJiZCwgMHhkZTZmNmZiMSwgMHg5MWM1YzU1NCwgMHg2MDMwMzA1MCwgMHgwMjAxMDEwMywgMHhjZTY3NjdhOSwgMHg1NjJiMmI3ZCwgMHhlN2ZlZmUxOSwgMHhiNWQ3ZDc2MiwgMHg0ZGFiYWJlNiwgMHhlYzc2NzY5YSwgMHg4ZmNhY2E0NSwgMHgxZjgyODI5ZCwgMHg4OWM5Yzk0MCwgMHhmYTdkN2Q4NywgMHhlZmZhZmExNSwgMHhiMjU5NTllYiwgMHg4ZTQ3NDdjOSwgMHhmYmYwZjAwYiwgMHg0MWFkYWRlYywgMHhiM2Q0ZDQ2NywgMHg1ZmEyYTJmZCwgMHg0NWFmYWZlYSwgMHgyMzljOWNiZiwgMHg1M2E0YTRmNywgMHhlNDcyNzI5NiwgMHg5YmMwYzA1YiwgMHg3NWI3YjdjMiwgMHhlMWZkZmQxYywgMHgzZDkzOTNhZSwgMHg0YzI2MjY2YSwgMHg2YzM2MzY1YSwgMHg3ZTNmM2Y0MSwgMHhmNWY3ZjcwMiwgMHg4M2NjY2M0ZiwgMHg2ODM0MzQ1YywgMHg1MWE1YTVmNCwgMHhkMWU1ZTUzNCwgMHhmOWYxZjEwOCwgMHhlMjcxNzE5MywgMHhhYmQ4ZDg3MywgMHg2MjMxMzE1MywgMHgyYTE1MTUzZiwgMHgwODA0MDQwYywgMHg5NWM3Yzc1MiwgMHg0NjIzMjM2NSwgMHg5ZGMzYzM1ZSwgMHgzMDE4MTgyOCwgMHgzNzk2OTZhMSwgMHgwYTA1MDUwZiwgMHgyZjlhOWFiNSwgMHgwZTA3MDcwOSwgMHgyNDEyMTIzNiwgMHgxYjgwODA5YiwgMHhkZmUyZTIzZCwgMHhjZGViZWIyNiwgMHg0ZTI3Mjc2OSwgMHg3ZmIyYjJjZCwgMHhlYTc1NzU5ZiwgMHgxMjA5MDkxYiwgMHgxZDgzODM5ZSwgMHg1ODJjMmM3NCwgMHgzNDFhMWEyZSwgMHgzNjFiMWIyZCwgMHhkYzZlNmViMiwgMHhiNDVhNWFlZSwgMHg1YmEwYTBmYiwgMHhhNDUyNTJmNiwgMHg3NjNiM2I0ZCwgMHhiN2Q2ZDY2MSwgMHg3ZGIzYjNjZSwgMHg1MjI5Mjk3YiwgMHhkZGUzZTMzZSwgMHg1ZTJmMmY3MSwgMHgxMzg0ODQ5NywgMHhhNjUzNTNmNSwgMHhiOWQxZDE2OCwgMHgwMDAwMDAwMCwgMHhjMWVkZWQyYywgMHg0MDIwMjA2MCwgMHhlM2ZjZmMxZiwgMHg3OWIxYjFjOCwgMHhiNjViNWJlZCwgMHhkNDZhNmFiZSwgMHg4ZGNiY2I0NiwgMHg2N2JlYmVkOSwgMHg3MjM5Mzk0YiwgMHg5NDRhNGFkZSwgMHg5ODRjNGNkNCwgMHhiMDU4NThlOCwgMHg4NWNmY2Y0YSwgMHhiYmQwZDA2YiwgMHhjNWVmZWYyYSwgMHg0ZmFhYWFlNSwgMHhlZGZiZmIxNiwgMHg4NjQzNDNjNSwgMHg5YTRkNGRkNywgMHg2NjMzMzM1NSwgMHgxMTg1ODU5NCwgMHg4YTQ1NDVjZiwgMHhlOWY5ZjkxMCwgMHgwNDAyMDIwNiwgMHhmZTdmN2Y4MSwgMHhhMDUwNTBmMCwgMHg3ODNjM2M0NCwgMHgyNTlmOWZiYSwgMHg0YmE4YThlMywgMHhhMjUxNTFmMywgMHg1ZGEzYTNmZSwgMHg4MDQwNDBjMCwgMHgwNThmOGY4YSwgMHgzZjkyOTJhZCwgMHgyMTlkOWRiYywgMHg3MDM4Mzg0OCwgMHhmMWY1ZjUwNCwgMHg2M2JjYmNkZiwgMHg3N2I2YjZjMSwgMHhhZmRhZGE3NSwgMHg0MjIxMjE2MywgMHgyMDEwMTAzMCwgMHhlNWZmZmYxYSwgMHhmZGYzZjMwZSwgMHhiZmQyZDI2ZCwgMHg4MWNkY2Q0YywgMHgxODBjMGMxNCwgMHgyNjEzMTMzNSwgMHhjM2VjZWMyZiwgMHhiZTVmNWZlMSwgMHgzNTk3OTdhMiwgMHg4ODQ0NDRjYywgMHgyZTE3MTczOSwgMHg5M2M0YzQ1NywgMHg1NWE3YTdmMiwgMHhmYzdlN2U4MiwgMHg3YTNkM2Q0NywgMHhjODY0NjRhYywgMHhiYTVkNWRlNywgMHgzMjE5MTkyYiwgMHhlNjczNzM5NSwgMHhjMDYwNjBhMCwgMHgxOTgxODE5OCwgMHg5ZTRmNGZkMSwgMHhhM2RjZGM3ZiwgMHg0NDIyMjI2NiwgMHg1NDJhMmE3ZSwgMHgzYjkwOTBhYiwgMHgwYjg4ODg4MywgMHg4YzQ2NDZjYSwgMHhjN2VlZWUyOSwgMHg2YmI4YjhkMywgMHgyODE0MTQzYywgMHhhN2RlZGU3OSwgMHhiYzVlNWVlMiwgMHgxNjBiMGIxZCwgMHhhZGRiZGI3NiwgMHhkYmUwZTAzYiwgMHg2NDMyMzI1NiwgMHg3NDNhM2E0ZSwgMHgxNDBhMGExZSwgMHg5MjQ5NDlkYiwgMHgwYzA2MDYwYSwgMHg0ODI0MjQ2YywgMHhiODVjNWNlNCwgMHg5ZmMyYzI1ZCwgMHhiZGQzZDM2ZSwgMHg0M2FjYWNlZiwgMHhjNDYyNjJhNiwgMHgzOTkxOTFhOCwgMHgzMTk1OTVhNCwgMHhkM2U0ZTQzNywgMHhmMjc5Nzk4YiwgMHhkNWU3ZTczMiwgMHg4YmM4Yzg0MywgMHg2ZTM3Mzc1OSwgMHhkYTZkNmRiNywgMHgwMThkOGQ4YywgMHhiMWQ1ZDU2NCwgMHg5YzRlNGVkMiwgMHg0OWE5YTllMCwgMHhkODZjNmNiNCwgMHhhYzU2NTZmYSwgMHhmM2Y0ZjQwNywgMHhjZmVhZWEyNSwgMHhjYTY1NjVhZiwgMHhmNDdhN2E4ZSwgMHg0N2FlYWVlOSwgMHgxMDA4MDgxOCwgMHg2ZmJhYmFkNSwgMHhmMDc4Nzg4OCwgMHg0YTI1MjU2ZiwgMHg1YzJlMmU3MiwgMHgzODFjMWMyNCwgMHg1N2E2YTZmMSwgMHg3M2I0YjRjNywgMHg5N2M2YzY1MSwgMHhjYmU4ZTgyMywgMHhhMWRkZGQ3YywgMHhlODc0NzQ5YywgMHgzZTFmMWYyMSwgMHg5NjRiNGJkZCwgMHg2MWJkYmRkYywgMHgwZDhiOGI4NiwgMHgwZjhhOGE4NSwgMHhlMDcwNzA5MCwgMHg3YzNlM2U0MiwgMHg3MWI1YjVjNCwgMHhjYzY2NjZhYSwgMHg5MDQ4NDhkOCwgMHgwNjAzMDMwNSwgMHhmN2Y2ZjYwMSwgMHgxYzBlMGUxMiwgMHhjMjYxNjFhMywgMHg2YTM1MzU1ZiwgMHhhZTU3NTdmOSwgMHg2OWI5YjlkMCwgMHgxNzg2ODY5MSwgMHg5OWMxYzE1OCwgMHgzYTFkMWQyNywgMHgyNzllOWViOSwgMHhkOWUxZTEzOCwgMHhlYmY4ZjgxMywgMHgyYjk4OThiMywgMHgyMjExMTEzMywgMHhkMjY5NjliYiwgMHhhOWQ5ZDk3MCwgMHgwNzhlOGU4OSwgMHgzMzk0OTRhNywgMHgyZDliOWJiNiwgMHgzYzFlMWUyMiwgMHgxNTg3ODc5MiwgMHhjOWU5ZTkyMCwgMHg4N2NlY2U0OSwgMHhhYTU1NTVmZiwgMHg1MDI4Mjg3OCwgMHhhNWRmZGY3YSwgMHgwMzhjOGM4ZiwgMHg1OWExYTFmOCwgMHgwOTg5ODk4MCwgMHgxYTBkMGQxNywgMHg2NWJmYmZkYSwgMHhkN2U2ZTYzMSwgMHg4NDQyNDJjNiwgMHhkMDY4NjhiOCwgMHg4MjQxNDFjMywgMHgyOTk5OTliMCwgMHg1YTJkMmQ3NywgMHgxZTBmMGYxMSwgMHg3YmIwYjBjYiwgMHhhODU0NTRmYywgMHg2ZGJiYmJkNiwgMHgyYzE2MTYzYV07XG4gICAgdmFyIFQyID0gWzB4YTVjNjYzNjMsIDB4ODRmODdjN2MsIDB4OTllZTc3NzcsIDB4OGRmNjdiN2IsIDB4MGRmZmYyZjIsIDB4YmRkNjZiNmIsIDB4YjFkZTZmNmYsIDB4NTQ5MWM1YzUsIDB4NTA2MDMwMzAsIDB4MDMwMjAxMDEsIDB4YTljZTY3NjcsIDB4N2Q1NjJiMmIsIDB4MTllN2ZlZmUsIDB4NjJiNWQ3ZDcsIDB4ZTY0ZGFiYWIsIDB4OWFlYzc2NzYsIDB4NDU4ZmNhY2EsIDB4OWQxZjgyODIsIDB4NDA4OWM5YzksIDB4ODdmYTdkN2QsIDB4MTVlZmZhZmEsIDB4ZWJiMjU5NTksIDB4Yzk4ZTQ3NDcsIDB4MGJmYmYwZjAsIDB4ZWM0MWFkYWQsIDB4NjdiM2Q0ZDQsIDB4ZmQ1ZmEyYTIsIDB4ZWE0NWFmYWYsIDB4YmYyMzljOWMsIDB4Zjc1M2E0YTQsIDB4OTZlNDcyNzIsIDB4NWI5YmMwYzAsIDB4YzI3NWI3YjcsIDB4MWNlMWZkZmQsIDB4YWUzZDkzOTMsIDB4NmE0YzI2MjYsIDB4NWE2YzM2MzYsIDB4NDE3ZTNmM2YsIDB4MDJmNWY3ZjcsIDB4NGY4M2NjY2MsIDB4NWM2ODM0MzQsIDB4ZjQ1MWE1YTUsIDB4MzRkMWU1ZTUsIDB4MDhmOWYxZjEsIDB4OTNlMjcxNzEsIDB4NzNhYmQ4ZDgsIDB4NTM2MjMxMzEsIDB4M2YyYTE1MTUsIDB4MGMwODA0MDQsIDB4NTI5NWM3YzcsIDB4NjU0NjIzMjMsIDB4NWU5ZGMzYzMsIDB4MjgzMDE4MTgsIDB4YTEzNzk2OTYsIDB4MGYwYTA1MDUsIDB4YjUyZjlhOWEsIDB4MDkwZTA3MDcsIDB4MzYyNDEyMTIsIDB4OWIxYjgwODAsIDB4M2RkZmUyZTIsIDB4MjZjZGViZWIsIDB4Njk0ZTI3MjcsIDB4Y2Q3ZmIyYjIsIDB4OWZlYTc1NzUsIDB4MWIxMjA5MDksIDB4OWUxZDgzODMsIDB4NzQ1ODJjMmMsIDB4MmUzNDFhMWEsIDB4MmQzNjFiMWIsIDB4YjJkYzZlNmUsIDB4ZWViNDVhNWEsIDB4ZmI1YmEwYTAsIDB4ZjZhNDUyNTIsIDB4NGQ3NjNiM2IsIDB4NjFiN2Q2ZDYsIDB4Y2U3ZGIzYjMsIDB4N2I1MjI5MjksIDB4M2VkZGUzZTMsIDB4NzE1ZTJmMmYsIDB4OTcxMzg0ODQsIDB4ZjVhNjUzNTMsIDB4NjhiOWQxZDEsIDB4MDAwMDAwMDAsIDB4MmNjMWVkZWQsIDB4NjA0MDIwMjAsIDB4MWZlM2ZjZmMsIDB4Yzg3OWIxYjEsIDB4ZWRiNjViNWIsIDB4YmVkNDZhNmEsIDB4NDY4ZGNiY2IsIDB4ZDk2N2JlYmUsIDB4NGI3MjM5MzksIDB4ZGU5NDRhNGEsIDB4ZDQ5ODRjNGMsIDB4ZThiMDU4NTgsIDB4NGE4NWNmY2YsIDB4NmJiYmQwZDAsIDB4MmFjNWVmZWYsIDB4ZTU0ZmFhYWEsIDB4MTZlZGZiZmIsIDB4YzU4NjQzNDMsIDB4ZDc5YTRkNGQsIDB4NTU2NjMzMzMsIDB4OTQxMTg1ODUsIDB4Y2Y4YTQ1NDUsIDB4MTBlOWY5ZjksIDB4MDYwNDAyMDIsIDB4ODFmZTdmN2YsIDB4ZjBhMDUwNTAsIDB4NDQ3ODNjM2MsIDB4YmEyNTlmOWYsIDB4ZTM0YmE4YTgsIDB4ZjNhMjUxNTEsIDB4ZmU1ZGEzYTMsIDB4YzA4MDQwNDAsIDB4OGEwNThmOGYsIDB4YWQzZjkyOTIsIDB4YmMyMTlkOWQsIDB4NDg3MDM4MzgsIDB4MDRmMWY1ZjUsIDB4ZGY2M2JjYmMsIDB4YzE3N2I2YjYsIDB4NzVhZmRhZGEsIDB4NjM0MjIxMjEsIDB4MzAyMDEwMTAsIDB4MWFlNWZmZmYsIDB4MGVmZGYzZjMsIDB4NmRiZmQyZDIsIDB4NGM4MWNkY2QsIDB4MTQxODBjMGMsIDB4MzUyNjEzMTMsIDB4MmZjM2VjZWMsIDB4ZTFiZTVmNWYsIDB4YTIzNTk3OTcsIDB4Y2M4ODQ0NDQsIDB4MzkyZTE3MTcsIDB4NTc5M2M0YzQsIDB4ZjI1NWE3YTcsIDB4ODJmYzdlN2UsIDB4NDc3YTNkM2QsIDB4YWNjODY0NjQsIDB4ZTdiYTVkNWQsIDB4MmIzMjE5MTksIDB4OTVlNjczNzMsIDB4YTBjMDYwNjAsIDB4OTgxOTgxODEsIDB4ZDE5ZTRmNGYsIDB4N2ZhM2RjZGMsIDB4NjY0NDIyMjIsIDB4N2U1NDJhMmEsIDB4YWIzYjkwOTAsIDB4ODMwYjg4ODgsIDB4Y2E4YzQ2NDYsIDB4MjljN2VlZWUsIDB4ZDM2YmI4YjgsIDB4M2MyODE0MTQsIDB4NzlhN2RlZGUsIDB4ZTJiYzVlNWUsIDB4MWQxNjBiMGIsIDB4NzZhZGRiZGIsIDB4M2JkYmUwZTAsIDB4NTY2NDMyMzIsIDB4NGU3NDNhM2EsIDB4MWUxNDBhMGEsIDB4ZGI5MjQ5NDksIDB4MGEwYzA2MDYsIDB4NmM0ODI0MjQsIDB4ZTRiODVjNWMsIDB4NWQ5ZmMyYzIsIDB4NmViZGQzZDMsIDB4ZWY0M2FjYWMsIDB4YTZjNDYyNjIsIDB4YTgzOTkxOTEsIDB4YTQzMTk1OTUsIDB4MzdkM2U0ZTQsIDB4OGJmMjc5NzksIDB4MzJkNWU3ZTcsIDB4NDM4YmM4YzgsIDB4NTk2ZTM3MzcsIDB4YjdkYTZkNmQsIDB4OGMwMThkOGQsIDB4NjRiMWQ1ZDUsIDB4ZDI5YzRlNGUsIDB4ZTA0OWE5YTksIDB4YjRkODZjNmMsIDB4ZmFhYzU2NTYsIDB4MDdmM2Y0ZjQsIDB4MjVjZmVhZWEsIDB4YWZjYTY1NjUsIDB4OGVmNDdhN2EsIDB4ZTk0N2FlYWUsIDB4MTgxMDA4MDgsIDB4ZDU2ZmJhYmEsIDB4ODhmMDc4NzgsIDB4NmY0YTI1MjUsIDB4NzI1YzJlMmUsIDB4MjQzODFjMWMsIDB4ZjE1N2E2YTYsIDB4Yzc3M2I0YjQsIDB4NTE5N2M2YzYsIDB4MjNjYmU4ZTgsIDB4N2NhMWRkZGQsIDB4OWNlODc0NzQsIDB4MjEzZTFmMWYsIDB4ZGQ5NjRiNGIsIDB4ZGM2MWJkYmQsIDB4ODYwZDhiOGIsIDB4ODUwZjhhOGEsIDB4OTBlMDcwNzAsIDB4NDI3YzNlM2UsIDB4YzQ3MWI1YjUsIDB4YWFjYzY2NjYsIDB4ZDg5MDQ4NDgsIDB4MDUwNjAzMDMsIDB4MDFmN2Y2ZjYsIDB4MTIxYzBlMGUsIDB4YTNjMjYxNjEsIDB4NWY2YTM1MzUsIDB4ZjlhZTU3NTcsIDB4ZDA2OWI5YjksIDB4OTExNzg2ODYsIDB4NTg5OWMxYzEsIDB4MjczYTFkMWQsIDB4YjkyNzllOWUsIDB4MzhkOWUxZTEsIDB4MTNlYmY4ZjgsIDB4YjMyYjk4OTgsIDB4MzMyMjExMTEsIDB4YmJkMjY5NjksIDB4NzBhOWQ5ZDksIDB4ODkwNzhlOGUsIDB4YTczMzk0OTQsIDB4YjYyZDliOWIsIDB4MjIzYzFlMWUsIDB4OTIxNTg3ODcsIDB4MjBjOWU5ZTksIDB4NDk4N2NlY2UsIDB4ZmZhYTU1NTUsIDB4Nzg1MDI4MjgsIDB4N2FhNWRmZGYsIDB4OGYwMzhjOGMsIDB4Zjg1OWExYTEsIDB4ODAwOTg5ODksIDB4MTcxYTBkMGQsIDB4ZGE2NWJmYmYsIDB4MzFkN2U2ZTYsIDB4YzY4NDQyNDIsIDB4YjhkMDY4NjgsIDB4YzM4MjQxNDEsIDB4YjAyOTk5OTksIDB4Nzc1YTJkMmQsIDB4MTExZTBmMGYsIDB4Y2I3YmIwYjAsIDB4ZmNhODU0NTQsIDB4ZDY2ZGJiYmIsIDB4M2EyYzE2MTZdO1xuICAgIHZhciBUMyA9IFsweDYzYTVjNjYzLCAweDdjODRmODdjLCAweDc3OTllZTc3LCAweDdiOGRmNjdiLCAweGYyMGRmZmYyLCAweDZiYmRkNjZiLCAweDZmYjFkZTZmLCAweGM1NTQ5MWM1LCAweDMwNTA2MDMwLCAweDAxMDMwMjAxLCAweDY3YTljZTY3LCAweDJiN2Q1NjJiLCAweGZlMTllN2ZlLCAweGQ3NjJiNWQ3LCAweGFiZTY0ZGFiLCAweDc2OWFlYzc2LCAweGNhNDU4ZmNhLCAweDgyOWQxZjgyLCAweGM5NDA4OWM5LCAweDdkODdmYTdkLCAweGZhMTVlZmZhLCAweDU5ZWJiMjU5LCAweDQ3Yzk4ZTQ3LCAweGYwMGJmYmYwLCAweGFkZWM0MWFkLCAweGQ0NjdiM2Q0LCAweGEyZmQ1ZmEyLCAweGFmZWE0NWFmLCAweDljYmYyMzljLCAweGE0Zjc1M2E0LCAweDcyOTZlNDcyLCAweGMwNWI5YmMwLCAweGI3YzI3NWI3LCAweGZkMWNlMWZkLCAweDkzYWUzZDkzLCAweDI2NmE0YzI2LCAweDM2NWE2YzM2LCAweDNmNDE3ZTNmLCAweGY3MDJmNWY3LCAweGNjNGY4M2NjLCAweDM0NWM2ODM0LCAweGE1ZjQ1MWE1LCAweGU1MzRkMWU1LCAweGYxMDhmOWYxLCAweDcxOTNlMjcxLCAweGQ4NzNhYmQ4LCAweDMxNTM2MjMxLCAweDE1M2YyYTE1LCAweDA0MGMwODA0LCAweGM3NTI5NWM3LCAweDIzNjU0NjIzLCAweGMzNWU5ZGMzLCAweDE4MjgzMDE4LCAweDk2YTEzNzk2LCAweDA1MGYwYTA1LCAweDlhYjUyZjlhLCAweDA3MDkwZTA3LCAweDEyMzYyNDEyLCAweDgwOWIxYjgwLCAweGUyM2RkZmUyLCAweGViMjZjZGViLCAweDI3Njk0ZTI3LCAweGIyY2Q3ZmIyLCAweDc1OWZlYTc1LCAweDA5MWIxMjA5LCAweDgzOWUxZDgzLCAweDJjNzQ1ODJjLCAweDFhMmUzNDFhLCAweDFiMmQzNjFiLCAweDZlYjJkYzZlLCAweDVhZWViNDVhLCAweGEwZmI1YmEwLCAweDUyZjZhNDUyLCAweDNiNGQ3NjNiLCAweGQ2NjFiN2Q2LCAweGIzY2U3ZGIzLCAweDI5N2I1MjI5LCAweGUzM2VkZGUzLCAweDJmNzE1ZTJmLCAweDg0OTcxMzg0LCAweDUzZjVhNjUzLCAweGQxNjhiOWQxLCAweDAwMDAwMDAwLCAweGVkMmNjMWVkLCAweDIwNjA0MDIwLCAweGZjMWZlM2ZjLCAweGIxYzg3OWIxLCAweDViZWRiNjViLCAweDZhYmVkNDZhLCAweGNiNDY4ZGNiLCAweGJlZDk2N2JlLCAweDM5NGI3MjM5LCAweDRhZGU5NDRhLCAweDRjZDQ5ODRjLCAweDU4ZThiMDU4LCAweGNmNGE4NWNmLCAweGQwNmJiYmQwLCAweGVmMmFjNWVmLCAweGFhZTU0ZmFhLCAweGZiMTZlZGZiLCAweDQzYzU4NjQzLCAweDRkZDc5YTRkLCAweDMzNTU2NjMzLCAweDg1OTQxMTg1LCAweDQ1Y2Y4YTQ1LCAweGY5MTBlOWY5LCAweDAyMDYwNDAyLCAweDdmODFmZTdmLCAweDUwZjBhMDUwLCAweDNjNDQ3ODNjLCAweDlmYmEyNTlmLCAweGE4ZTM0YmE4LCAweDUxZjNhMjUxLCAweGEzZmU1ZGEzLCAweDQwYzA4MDQwLCAweDhmOGEwNThmLCAweDkyYWQzZjkyLCAweDlkYmMyMTlkLCAweDM4NDg3MDM4LCAweGY1MDRmMWY1LCAweGJjZGY2M2JjLCAweGI2YzE3N2I2LCAweGRhNzVhZmRhLCAweDIxNjM0MjIxLCAweDEwMzAyMDEwLCAweGZmMWFlNWZmLCAweGYzMGVmZGYzLCAweGQyNmRiZmQyLCAweGNkNGM4MWNkLCAweDBjMTQxODBjLCAweDEzMzUyNjEzLCAweGVjMmZjM2VjLCAweDVmZTFiZTVmLCAweDk3YTIzNTk3LCAweDQ0Y2M4ODQ0LCAweDE3MzkyZTE3LCAweGM0NTc5M2M0LCAweGE3ZjI1NWE3LCAweDdlODJmYzdlLCAweDNkNDc3YTNkLCAweDY0YWNjODY0LCAweDVkZTdiYTVkLCAweDE5MmIzMjE5LCAweDczOTVlNjczLCAweDYwYTBjMDYwLCAweDgxOTgxOTgxLCAweDRmZDE5ZTRmLCAweGRjN2ZhM2RjLCAweDIyNjY0NDIyLCAweDJhN2U1NDJhLCAweDkwYWIzYjkwLCAweDg4ODMwYjg4LCAweDQ2Y2E4YzQ2LCAweGVlMjljN2VlLCAweGI4ZDM2YmI4LCAweDE0M2MyODE0LCAweGRlNzlhN2RlLCAweDVlZTJiYzVlLCAweDBiMWQxNjBiLCAweGRiNzZhZGRiLCAweGUwM2JkYmUwLCAweDMyNTY2NDMyLCAweDNhNGU3NDNhLCAweDBhMWUxNDBhLCAweDQ5ZGI5MjQ5LCAweDA2MGEwYzA2LCAweDI0NmM0ODI0LCAweDVjZTRiODVjLCAweGMyNWQ5ZmMyLCAweGQzNmViZGQzLCAweGFjZWY0M2FjLCAweDYyYTZjNDYyLCAweDkxYTgzOTkxLCAweDk1YTQzMTk1LCAweGU0MzdkM2U0LCAweDc5OGJmMjc5LCAweGU3MzJkNWU3LCAweGM4NDM4YmM4LCAweDM3NTk2ZTM3LCAweDZkYjdkYTZkLCAweDhkOGMwMThkLCAweGQ1NjRiMWQ1LCAweDRlZDI5YzRlLCAweGE5ZTA0OWE5LCAweDZjYjRkODZjLCAweDU2ZmFhYzU2LCAweGY0MDdmM2Y0LCAweGVhMjVjZmVhLCAweDY1YWZjYTY1LCAweDdhOGVmNDdhLCAweGFlZTk0N2FlLCAweDA4MTgxMDA4LCAweGJhZDU2ZmJhLCAweDc4ODhmMDc4LCAweDI1NmY0YTI1LCAweDJlNzI1YzJlLCAweDFjMjQzODFjLCAweGE2ZjE1N2E2LCAweGI0Yzc3M2I0LCAweGM2NTE5N2M2LCAweGU4MjNjYmU4LCAweGRkN2NhMWRkLCAweDc0OWNlODc0LCAweDFmMjEzZTFmLCAweDRiZGQ5NjRiLCAweGJkZGM2MWJkLCAweDhiODYwZDhiLCAweDhhODUwZjhhLCAweDcwOTBlMDcwLCAweDNlNDI3YzNlLCAweGI1YzQ3MWI1LCAweDY2YWFjYzY2LCAweDQ4ZDg5MDQ4LCAweDAzMDUwNjAzLCAweGY2MDFmN2Y2LCAweDBlMTIxYzBlLCAweDYxYTNjMjYxLCAweDM1NWY2YTM1LCAweDU3ZjlhZTU3LCAweGI5ZDA2OWI5LCAweDg2OTExNzg2LCAweGMxNTg5OWMxLCAweDFkMjczYTFkLCAweDllYjkyNzllLCAweGUxMzhkOWUxLCAweGY4MTNlYmY4LCAweDk4YjMyYjk4LCAweDExMzMyMjExLCAweDY5YmJkMjY5LCAweGQ5NzBhOWQ5LCAweDhlODkwNzhlLCAweDk0YTczMzk0LCAweDliYjYyZDliLCAweDFlMjIzYzFlLCAweDg3OTIxNTg3LCAweGU5MjBjOWU5LCAweGNlNDk4N2NlLCAweDU1ZmZhYTU1LCAweDI4Nzg1MDI4LCAweGRmN2FhNWRmLCAweDhjOGYwMzhjLCAweGExZjg1OWExLCAweDg5ODAwOTg5LCAweDBkMTcxYTBkLCAweGJmZGE2NWJmLCAweGU2MzFkN2U2LCAweDQyYzY4NDQyLCAweDY4YjhkMDY4LCAweDQxYzM4MjQxLCAweDk5YjAyOTk5LCAweDJkNzc1YTJkLCAweDBmMTExZTBmLCAweGIwY2I3YmIwLCAweDU0ZmNhODU0LCAweGJiZDY2ZGJiLCAweDE2M2EyYzE2XTtcbiAgICB2YXIgVDQgPSBbMHg2MzYzYTVjNiwgMHg3YzdjODRmOCwgMHg3Nzc3OTllZSwgMHg3YjdiOGRmNiwgMHhmMmYyMGRmZiwgMHg2YjZiYmRkNiwgMHg2ZjZmYjFkZSwgMHhjNWM1NTQ5MSwgMHgzMDMwNTA2MCwgMHgwMTAxMDMwMiwgMHg2NzY3YTljZSwgMHgyYjJiN2Q1NiwgMHhmZWZlMTllNywgMHhkN2Q3NjJiNSwgMHhhYmFiZTY0ZCwgMHg3Njc2OWFlYywgMHhjYWNhNDU4ZiwgMHg4MjgyOWQxZiwgMHhjOWM5NDA4OSwgMHg3ZDdkODdmYSwgMHhmYWZhMTVlZiwgMHg1OTU5ZWJiMiwgMHg0NzQ3Yzk4ZSwgMHhmMGYwMGJmYiwgMHhhZGFkZWM0MSwgMHhkNGQ0NjdiMywgMHhhMmEyZmQ1ZiwgMHhhZmFmZWE0NSwgMHg5YzljYmYyMywgMHhhNGE0Zjc1MywgMHg3MjcyOTZlNCwgMHhjMGMwNWI5YiwgMHhiN2I3YzI3NSwgMHhmZGZkMWNlMSwgMHg5MzkzYWUzZCwgMHgyNjI2NmE0YywgMHgzNjM2NWE2YywgMHgzZjNmNDE3ZSwgMHhmN2Y3MDJmNSwgMHhjY2NjNGY4MywgMHgzNDM0NWM2OCwgMHhhNWE1ZjQ1MSwgMHhlNWU1MzRkMSwgMHhmMWYxMDhmOSwgMHg3MTcxOTNlMiwgMHhkOGQ4NzNhYiwgMHgzMTMxNTM2MiwgMHgxNTE1M2YyYSwgMHgwNDA0MGMwOCwgMHhjN2M3NTI5NSwgMHgyMzIzNjU0NiwgMHhjM2MzNWU5ZCwgMHgxODE4MjgzMCwgMHg5Njk2YTEzNywgMHgwNTA1MGYwYSwgMHg5YTlhYjUyZiwgMHgwNzA3MDkwZSwgMHgxMjEyMzYyNCwgMHg4MDgwOWIxYiwgMHhlMmUyM2RkZiwgMHhlYmViMjZjZCwgMHgyNzI3Njk0ZSwgMHhiMmIyY2Q3ZiwgMHg3NTc1OWZlYSwgMHgwOTA5MWIxMiwgMHg4MzgzOWUxZCwgMHgyYzJjNzQ1OCwgMHgxYTFhMmUzNCwgMHgxYjFiMmQzNiwgMHg2ZTZlYjJkYywgMHg1YTVhZWViNCwgMHhhMGEwZmI1YiwgMHg1MjUyZjZhNCwgMHgzYjNiNGQ3NiwgMHhkNmQ2NjFiNywgMHhiM2IzY2U3ZCwgMHgyOTI5N2I1MiwgMHhlM2UzM2VkZCwgMHgyZjJmNzE1ZSwgMHg4NDg0OTcxMywgMHg1MzUzZjVhNiwgMHhkMWQxNjhiOSwgMHgwMDAwMDAwMCwgMHhlZGVkMmNjMSwgMHgyMDIwNjA0MCwgMHhmY2ZjMWZlMywgMHhiMWIxYzg3OSwgMHg1YjViZWRiNiwgMHg2YTZhYmVkNCwgMHhjYmNiNDY4ZCwgMHhiZWJlZDk2NywgMHgzOTM5NGI3MiwgMHg0YTRhZGU5NCwgMHg0YzRjZDQ5OCwgMHg1ODU4ZThiMCwgMHhjZmNmNGE4NSwgMHhkMGQwNmJiYiwgMHhlZmVmMmFjNSwgMHhhYWFhZTU0ZiwgMHhmYmZiMTZlZCwgMHg0MzQzYzU4NiwgMHg0ZDRkZDc5YSwgMHgzMzMzNTU2NiwgMHg4NTg1OTQxMSwgMHg0NTQ1Y2Y4YSwgMHhmOWY5MTBlOSwgMHgwMjAyMDYwNCwgMHg3ZjdmODFmZSwgMHg1MDUwZjBhMCwgMHgzYzNjNDQ3OCwgMHg5ZjlmYmEyNSwgMHhhOGE4ZTM0YiwgMHg1MTUxZjNhMiwgMHhhM2EzZmU1ZCwgMHg0MDQwYzA4MCwgMHg4ZjhmOGEwNSwgMHg5MjkyYWQzZiwgMHg5ZDlkYmMyMSwgMHgzODM4NDg3MCwgMHhmNWY1MDRmMSwgMHhiY2JjZGY2MywgMHhiNmI2YzE3NywgMHhkYWRhNzVhZiwgMHgyMTIxNjM0MiwgMHgxMDEwMzAyMCwgMHhmZmZmMWFlNSwgMHhmM2YzMGVmZCwgMHhkMmQyNmRiZiwgMHhjZGNkNGM4MSwgMHgwYzBjMTQxOCwgMHgxMzEzMzUyNiwgMHhlY2VjMmZjMywgMHg1ZjVmZTFiZSwgMHg5Nzk3YTIzNSwgMHg0NDQ0Y2M4OCwgMHgxNzE3MzkyZSwgMHhjNGM0NTc5MywgMHhhN2E3ZjI1NSwgMHg3ZTdlODJmYywgMHgzZDNkNDc3YSwgMHg2NDY0YWNjOCwgMHg1ZDVkZTdiYSwgMHgxOTE5MmIzMiwgMHg3MzczOTVlNiwgMHg2MDYwYTBjMCwgMHg4MTgxOTgxOSwgMHg0ZjRmZDE5ZSwgMHhkY2RjN2ZhMywgMHgyMjIyNjY0NCwgMHgyYTJhN2U1NCwgMHg5MDkwYWIzYiwgMHg4ODg4ODMwYiwgMHg0NjQ2Y2E4YywgMHhlZWVlMjljNywgMHhiOGI4ZDM2YiwgMHgxNDE0M2MyOCwgMHhkZWRlNzlhNywgMHg1ZTVlZTJiYywgMHgwYjBiMWQxNiwgMHhkYmRiNzZhZCwgMHhlMGUwM2JkYiwgMHgzMjMyNTY2NCwgMHgzYTNhNGU3NCwgMHgwYTBhMWUxNCwgMHg0OTQ5ZGI5MiwgMHgwNjA2MGEwYywgMHgyNDI0NmM0OCwgMHg1YzVjZTRiOCwgMHhjMmMyNWQ5ZiwgMHhkM2QzNmViZCwgMHhhY2FjZWY0MywgMHg2MjYyYTZjNCwgMHg5MTkxYTgzOSwgMHg5NTk1YTQzMSwgMHhlNGU0MzdkMywgMHg3OTc5OGJmMiwgMHhlN2U3MzJkNSwgMHhjOGM4NDM4YiwgMHgzNzM3NTk2ZSwgMHg2ZDZkYjdkYSwgMHg4ZDhkOGMwMSwgMHhkNWQ1NjRiMSwgMHg0ZTRlZDI5YywgMHhhOWE5ZTA0OSwgMHg2YzZjYjRkOCwgMHg1NjU2ZmFhYywgMHhmNGY0MDdmMywgMHhlYWVhMjVjZiwgMHg2NTY1YWZjYSwgMHg3YTdhOGVmNCwgMHhhZWFlZTk0NywgMHgwODA4MTgxMCwgMHhiYWJhZDU2ZiwgMHg3ODc4ODhmMCwgMHgyNTI1NmY0YSwgMHgyZTJlNzI1YywgMHgxYzFjMjQzOCwgMHhhNmE2ZjE1NywgMHhiNGI0Yzc3MywgMHhjNmM2NTE5NywgMHhlOGU4MjNjYiwgMHhkZGRkN2NhMSwgMHg3NDc0OWNlOCwgMHgxZjFmMjEzZSwgMHg0YjRiZGQ5NiwgMHhiZGJkZGM2MSwgMHg4YjhiODYwZCwgMHg4YThhODUwZiwgMHg3MDcwOTBlMCwgMHgzZTNlNDI3YywgMHhiNWI1YzQ3MSwgMHg2NjY2YWFjYywgMHg0ODQ4ZDg5MCwgMHgwMzAzMDUwNiwgMHhmNmY2MDFmNywgMHgwZTBlMTIxYywgMHg2MTYxYTNjMiwgMHgzNTM1NWY2YSwgMHg1NzU3ZjlhZSwgMHhiOWI5ZDA2OSwgMHg4Njg2OTExNywgMHhjMWMxNTg5OSwgMHgxZDFkMjczYSwgMHg5ZTllYjkyNywgMHhlMWUxMzhkOSwgMHhmOGY4MTNlYiwgMHg5ODk4YjMyYiwgMHgxMTExMzMyMiwgMHg2OTY5YmJkMiwgMHhkOWQ5NzBhOSwgMHg4ZThlODkwNywgMHg5NDk0YTczMywgMHg5YjliYjYyZCwgMHgxZTFlMjIzYywgMHg4Nzg3OTIxNSwgMHhlOWU5MjBjOSwgMHhjZWNlNDk4NywgMHg1NTU1ZmZhYSwgMHgyODI4Nzg1MCwgMHhkZmRmN2FhNSwgMHg4YzhjOGYwMywgMHhhMWExZjg1OSwgMHg4OTg5ODAwOSwgMHgwZDBkMTcxYSwgMHhiZmJmZGE2NSwgMHhlNmU2MzFkNywgMHg0MjQyYzY4NCwgMHg2ODY4YjhkMCwgMHg0MTQxYzM4MiwgMHg5OTk5YjAyOSwgMHgyZDJkNzc1YSwgMHgwZjBmMTExZSwgMHhiMGIwY2I3YiwgMHg1NDU0ZmNhOCwgMHhiYmJiZDY2ZCwgMHgxNjE2M2EyY107XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGRlY3J5cHRpb25cbiAgICB2YXIgVDUgPSBbMHg1MWY0YTc1MCwgMHg3ZTQxNjU1MywgMHgxYTE3YTRjMywgMHgzYTI3NWU5NiwgMHgzYmFiNmJjYiwgMHgxZjlkNDVmMSwgMHhhY2ZhNThhYiwgMHg0YmUzMDM5MywgMHgyMDMwZmE1NSwgMHhhZDc2NmRmNiwgMHg4OGNjNzY5MSwgMHhmNTAyNGMyNSwgMHg0ZmU1ZDdmYywgMHhjNTJhY2JkNywgMHgyNjM1NDQ4MCwgMHhiNTYyYTM4ZiwgMHhkZWIxNWE0OSwgMHgyNWJhMWI2NywgMHg0NWVhMGU5OCwgMHg1ZGZlYzBlMSwgMHhjMzJmNzUwMiwgMHg4MTRjZjAxMiwgMHg4ZDQ2OTdhMywgMHg2YmQzZjljNiwgMHgwMzhmNWZlNywgMHgxNTkyOWM5NSwgMHhiZjZkN2FlYiwgMHg5NTUyNTlkYSwgMHhkNGJlODMyZCwgMHg1ODc0MjFkMywgMHg0OWUwNjkyOSwgMHg4ZWM5Yzg0NCwgMHg3NWMyODk2YSwgMHhmNDhlNzk3OCwgMHg5OTU4M2U2YiwgMHgyN2I5NzFkZCwgMHhiZWUxNGZiNiwgMHhmMDg4YWQxNywgMHhjOTIwYWM2NiwgMHg3ZGNlM2FiNCwgMHg2M2RmNGExOCwgMHhlNTFhMzE4MiwgMHg5NzUxMzM2MCwgMHg2MjUzN2Y0NSwgMHhiMTY0NzdlMCwgMHhiYjZiYWU4NCwgMHhmZTgxYTAxYywgMHhmOTA4MmI5NCwgMHg3MDQ4Njg1OCwgMHg4ZjQ1ZmQxOSwgMHg5NGRlNmM4NywgMHg1MjdiZjhiNywgMHhhYjczZDMyMywgMHg3MjRiMDJlMiwgMHhlMzFmOGY1NywgMHg2NjU1YWIyYSwgMHhiMmViMjgwNywgMHgyZmI1YzIwMywgMHg4NmM1N2I5YSwgMHhkMzM3MDhhNSwgMHgzMDI4ODdmMiwgMHgyM2JmYTViMiwgMHgwMjAzNmFiYSwgMHhlZDE2ODI1YywgMHg4YWNmMWMyYiwgMHhhNzc5YjQ5MiwgMHhmMzA3ZjJmMCwgMHg0ZTY5ZTJhMSwgMHg2NWRhZjRjZCwgMHgwNjA1YmVkNSwgMHhkMTM0NjIxZiwgMHhjNGE2ZmU4YSwgMHgzNDJlNTM5ZCwgMHhhMmYzNTVhMCwgMHgwNThhZTEzMiwgMHhhNGY2ZWI3NSwgMHgwYjgzZWMzOSwgMHg0MDYwZWZhYSwgMHg1ZTcxOWYwNiwgMHhiZDZlMTA1MSwgMHgzZTIxOGFmOSwgMHg5NmRkMDYzZCwgMHhkZDNlMDVhZSwgMHg0ZGU2YmQ0NiwgMHg5MTU0OGRiNSwgMHg3MWM0NWQwNSwgMHgwNDA2ZDQ2ZiwgMHg2MDUwMTVmZiwgMHgxOTk4ZmIyNCwgMHhkNmJkZTk5NywgMHg4OTQwNDNjYywgMHg2N2Q5OWU3NywgMHhiMGU4NDJiZCwgMHgwNzg5OGI4OCwgMHhlNzE5NWIzOCwgMHg3OWM4ZWVkYiwgMHhhMTdjMGE0NywgMHg3YzQyMGZlOSwgMHhmODg0MWVjOSwgMHgwMDAwMDAwMCwgMHgwOTgwODY4MywgMHgzMjJiZWQ0OCwgMHgxZTExNzBhYywgMHg2YzVhNzI0ZSwgMHhmZDBlZmZmYiwgMHgwZjg1Mzg1NiwgMHgzZGFlZDUxZSwgMHgzNjJkMzkyNywgMHgwYTBmZDk2NCwgMHg2ODVjYTYyMSwgMHg5YjViNTRkMSwgMHgyNDM2MmUzYSwgMHgwYzBhNjdiMSwgMHg5MzU3ZTcwZiwgMHhiNGVlOTZkMiwgMHgxYjliOTE5ZSwgMHg4MGMwYzU0ZiwgMHg2MWRjMjBhMiwgMHg1YTc3NGI2OSwgMHgxYzEyMWExNiwgMHhlMjkzYmEwYSwgMHhjMGEwMmFlNSwgMHgzYzIyZTA0MywgMHgxMjFiMTcxZCwgMHgwZTA5MGQwYiwgMHhmMjhiYzdhZCwgMHgyZGI2YThiOSwgMHgxNDFlYTljOCwgMHg1N2YxMTk4NSwgMHhhZjc1MDc0YywgMHhlZTk5ZGRiYiwgMHhhMzdmNjBmZCwgMHhmNzAxMjY5ZiwgMHg1YzcyZjViYywgMHg0NDY2M2JjNSwgMHg1YmZiN2UzNCwgMHg4YjQzMjk3NiwgMHhjYjIzYzZkYywgMHhiNmVkZmM2OCwgMHhiOGU0ZjE2MywgMHhkNzMxZGNjYSwgMHg0MjYzODUxMCwgMHgxMzk3MjI0MCwgMHg4NGM2MTEyMCwgMHg4NTRhMjQ3ZCwgMHhkMmJiM2RmOCwgMHhhZWY5MzIxMSwgMHhjNzI5YTE2ZCwgMHgxZDllMmY0YiwgMHhkY2IyMzBmMywgMHgwZDg2NTJlYywgMHg3N2MxZTNkMCwgMHgyYmIzMTY2YywgMHhhOTcwYjk5OSwgMHgxMTk0NDhmYSwgMHg0N2U5NjQyMiwgMHhhOGZjOGNjNCwgMHhhMGYwM2YxYSwgMHg1NjdkMmNkOCwgMHgyMjMzOTBlZiwgMHg4NzQ5NGVjNywgMHhkOTM4ZDFjMSwgMHg4Y2NhYTJmZSwgMHg5OGQ0MGIzNiwgMHhhNmY1ODFjZiwgMHhhNTdhZGUyOCwgMHhkYWI3OGUyNiwgMHgzZmFkYmZhNCwgMHgyYzNhOWRlNCwgMHg1MDc4OTIwZCwgMHg2YTVmY2M5YiwgMHg1NDdlNDY2MiwgMHhmNjhkMTNjMiwgMHg5MGQ4YjhlOCwgMHgyZTM5Zjc1ZSwgMHg4MmMzYWZmNSwgMHg5ZjVkODBiZSwgMHg2OWQwOTM3YywgMHg2ZmQ1MmRhOSwgMHhjZjI1MTJiMywgMHhjOGFjOTkzYiwgMHgxMDE4N2RhNywgMHhlODljNjM2ZSwgMHhkYjNiYmI3YiwgMHhjZDI2NzgwOSwgMHg2ZTU5MThmNCwgMHhlYzlhYjcwMSwgMHg4MzRmOWFhOCwgMHhlNjk1NmU2NSwgMHhhYWZmZTY3ZSwgMHgyMWJjY2YwOCwgMHhlZjE1ZThlNiwgMHhiYWU3OWJkOSwgMHg0YTZmMzZjZSwgMHhlYTlmMDlkNCwgMHgyOWIwN2NkNiwgMHgzMWE0YjJhZiwgMHgyYTNmMjMzMSwgMHhjNmE1OTQzMCwgMHgzNWEyNjZjMCwgMHg3NDRlYmMzNywgMHhmYzgyY2FhNiwgMHhlMDkwZDBiMCwgMHgzM2E3ZDgxNSwgMHhmMTA0OTg0YSwgMHg0MWVjZGFmNywgMHg3ZmNkNTAwZSwgMHgxNzkxZjYyZiwgMHg3NjRkZDY4ZCwgMHg0M2VmYjA0ZCwgMHhjY2FhNGQ1NCwgMHhlNDk2MDRkZiwgMHg5ZWQxYjVlMywgMHg0YzZhODgxYiwgMHhjMTJjMWZiOCwgMHg0NjY1NTE3ZiwgMHg5ZDVlZWEwNCwgMHgwMThjMzU1ZCwgMHhmYTg3NzQ3MywgMHhmYjBiNDEyZSwgMHhiMzY3MWQ1YSwgMHg5MmRiZDI1MiwgMHhlOTEwNTYzMywgMHg2ZGQ2NDcxMywgMHg5YWQ3NjE4YywgMHgzN2ExMGM3YSwgMHg1OWY4MTQ4ZSwgMHhlYjEzM2M4OSwgMHhjZWE5MjdlZSwgMHhiNzYxYzkzNSwgMHhlMTFjZTVlZCwgMHg3YTQ3YjEzYywgMHg5Y2QyZGY1OSwgMHg1NWYyNzMzZiwgMHgxODE0Y2U3OSwgMHg3M2M3MzdiZiwgMHg1M2Y3Y2RlYSwgMHg1ZmZkYWE1YiwgMHhkZjNkNmYxNCwgMHg3ODQ0ZGI4NiwgMHhjYWFmZjM4MSwgMHhiOTY4YzQzZSwgMHgzODI0MzQyYywgMHhjMmEzNDA1ZiwgMHgxNjFkYzM3MiwgMHhiY2UyMjUwYywgMHgyODNjNDk4YiwgMHhmZjBkOTU0MSwgMHgzOWE4MDE3MSwgMHgwODBjYjNkZSwgMHhkOGI0ZTQ5YywgMHg2NDU2YzE5MCwgMHg3YmNiODQ2MSwgMHhkNTMyYjY3MCwgMHg0ODZjNWM3NCwgMHhkMGI4NTc0Ml07XG4gICAgdmFyIFQ2ID0gWzB4NTA1MWY0YTcsIDB4NTM3ZTQxNjUsIDB4YzMxYTE3YTQsIDB4OTYzYTI3NWUsIDB4Y2IzYmFiNmIsIDB4ZjExZjlkNDUsIDB4YWJhY2ZhNTgsIDB4OTM0YmUzMDMsIDB4NTUyMDMwZmEsIDB4ZjZhZDc2NmQsIDB4OTE4OGNjNzYsIDB4MjVmNTAyNGMsIDB4ZmM0ZmU1ZDcsIDB4ZDdjNTJhY2IsIDB4ODAyNjM1NDQsIDB4OGZiNTYyYTMsIDB4NDlkZWIxNWEsIDB4NjcyNWJhMWIsIDB4OTg0NWVhMGUsIDB4ZTE1ZGZlYzAsIDB4MDJjMzJmNzUsIDB4MTI4MTRjZjAsIDB4YTM4ZDQ2OTcsIDB4YzY2YmQzZjksIDB4ZTcwMzhmNWYsIDB4OTUxNTkyOWMsIDB4ZWJiZjZkN2EsIDB4ZGE5NTUyNTksIDB4MmRkNGJlODMsIDB4ZDM1ODc0MjEsIDB4Mjk0OWUwNjksIDB4NDQ4ZWM5YzgsIDB4NmE3NWMyODksIDB4NzhmNDhlNzksIDB4NmI5OTU4M2UsIDB4ZGQyN2I5NzEsIDB4YjZiZWUxNGYsIDB4MTdmMDg4YWQsIDB4NjZjOTIwYWMsIDB4YjQ3ZGNlM2EsIDB4MTg2M2RmNGEsIDB4ODJlNTFhMzEsIDB4NjA5NzUxMzMsIDB4NDU2MjUzN2YsIDB4ZTBiMTY0NzcsIDB4ODRiYjZiYWUsIDB4MWNmZTgxYTAsIDB4OTRmOTA4MmIsIDB4NTg3MDQ4NjgsIDB4MTk4ZjQ1ZmQsIDB4ODc5NGRlNmMsIDB4Yjc1MjdiZjgsIDB4MjNhYjczZDMsIDB4ZTI3MjRiMDIsIDB4NTdlMzFmOGYsIDB4MmE2NjU1YWIsIDB4MDdiMmViMjgsIDB4MDMyZmI1YzIsIDB4OWE4NmM1N2IsIDB4YTVkMzM3MDgsIDB4ZjIzMDI4ODcsIDB4YjIyM2JmYTUsIDB4YmEwMjAzNmEsIDB4NWNlZDE2ODIsIDB4MmI4YWNmMWMsIDB4OTJhNzc5YjQsIDB4ZjBmMzA3ZjIsIDB4YTE0ZTY5ZTIsIDB4Y2Q2NWRhZjQsIDB4ZDUwNjA1YmUsIDB4MWZkMTM0NjIsIDB4OGFjNGE2ZmUsIDB4OWQzNDJlNTMsIDB4YTBhMmYzNTUsIDB4MzIwNThhZTEsIDB4NzVhNGY2ZWIsIDB4MzkwYjgzZWMsIDB4YWE0MDYwZWYsIDB4MDY1ZTcxOWYsIDB4NTFiZDZlMTAsIDB4ZjkzZTIxOGEsIDB4M2Q5NmRkMDYsIDB4YWVkZDNlMDUsIDB4NDY0ZGU2YmQsIDB4YjU5MTU0OGQsIDB4MDU3MWM0NWQsIDB4NmYwNDA2ZDQsIDB4ZmY2MDUwMTUsIDB4MjQxOTk4ZmIsIDB4OTdkNmJkZTksIDB4Y2M4OTQwNDMsIDB4Nzc2N2Q5OWUsIDB4YmRiMGU4NDIsIDB4ODgwNzg5OGIsIDB4MzhlNzE5NWIsIDB4ZGI3OWM4ZWUsIDB4NDdhMTdjMGEsIDB4ZTk3YzQyMGYsIDB4YzlmODg0MWUsIDB4MDAwMDAwMDAsIDB4ODMwOTgwODYsIDB4NDgzMjJiZWQsIDB4YWMxZTExNzAsIDB4NGU2YzVhNzIsIDB4ZmJmZDBlZmYsIDB4NTYwZjg1MzgsIDB4MWUzZGFlZDUsIDB4MjczNjJkMzksIDB4NjQwYTBmZDksIDB4MjE2ODVjYTYsIDB4ZDE5YjViNTQsIDB4M2EyNDM2MmUsIDB4YjEwYzBhNjcsIDB4MGY5MzU3ZTcsIDB4ZDJiNGVlOTYsIDB4OWUxYjliOTEsIDB4NGY4MGMwYzUsIDB4YTI2MWRjMjAsIDB4Njk1YTc3NGIsIDB4MTYxYzEyMWEsIDB4MGFlMjkzYmEsIDB4ZTVjMGEwMmEsIDB4NDMzYzIyZTAsIDB4MWQxMjFiMTcsIDB4MGIwZTA5MGQsIDB4YWRmMjhiYzcsIDB4YjkyZGI2YTgsIDB4YzgxNDFlYTksIDB4ODU1N2YxMTksIDB4NGNhZjc1MDcsIDB4YmJlZTk5ZGQsIDB4ZmRhMzdmNjAsIDB4OWZmNzAxMjYsIDB4YmM1YzcyZjUsIDB4YzU0NDY2M2IsIDB4MzQ1YmZiN2UsIDB4NzY4YjQzMjksIDB4ZGNjYjIzYzYsIDB4NjhiNmVkZmMsIDB4NjNiOGU0ZjEsIDB4Y2FkNzMxZGMsIDB4MTA0MjYzODUsIDB4NDAxMzk3MjIsIDB4MjA4NGM2MTEsIDB4N2Q4NTRhMjQsIDB4ZjhkMmJiM2QsIDB4MTFhZWY5MzIsIDB4NmRjNzI5YTEsIDB4NGIxZDllMmYsIDB4ZjNkY2IyMzAsIDB4ZWMwZDg2NTIsIDB4ZDA3N2MxZTMsIDB4NmMyYmIzMTYsIDB4OTlhOTcwYjksIDB4ZmExMTk0NDgsIDB4MjI0N2U5NjQsIDB4YzRhOGZjOGMsIDB4MWFhMGYwM2YsIDB4ZDg1NjdkMmMsIDB4ZWYyMjMzOTAsIDB4Yzc4NzQ5NGUsIDB4YzFkOTM4ZDEsIDB4ZmU4Y2NhYTIsIDB4MzY5OGQ0MGIsIDB4Y2ZhNmY1ODEsIDB4MjhhNTdhZGUsIDB4MjZkYWI3OGUsIDB4YTQzZmFkYmYsIDB4ZTQyYzNhOWQsIDB4MGQ1MDc4OTIsIDB4OWI2YTVmY2MsIDB4NjI1NDdlNDYsIDB4YzJmNjhkMTMsIDB4ZTg5MGQ4YjgsIDB4NWUyZTM5ZjcsIDB4ZjU4MmMzYWYsIDB4YmU5ZjVkODAsIDB4N2M2OWQwOTMsIDB4YTk2ZmQ1MmQsIDB4YjNjZjI1MTIsIDB4M2JjOGFjOTksIDB4YTcxMDE4N2QsIDB4NmVlODljNjMsIDB4N2JkYjNiYmIsIDB4MDljZDI2NzgsIDB4ZjQ2ZTU5MTgsIDB4MDFlYzlhYjcsIDB4YTg4MzRmOWEsIDB4NjVlNjk1NmUsIDB4N2VhYWZmZTYsIDB4MDgyMWJjY2YsIDB4ZTZlZjE1ZTgsIDB4ZDliYWU3OWIsIDB4Y2U0YTZmMzYsIDB4ZDRlYTlmMDksIDB4ZDYyOWIwN2MsIDB4YWYzMWE0YjIsIDB4MzEyYTNmMjMsIDB4MzBjNmE1OTQsIDB4YzAzNWEyNjYsIDB4Mzc3NDRlYmMsIDB4YTZmYzgyY2EsIDB4YjBlMDkwZDAsIDB4MTUzM2E3ZDgsIDB4NGFmMTA0OTgsIDB4Zjc0MWVjZGEsIDB4MGU3ZmNkNTAsIDB4MmYxNzkxZjYsIDB4OGQ3NjRkZDYsIDB4NGQ0M2VmYjAsIDB4NTRjY2FhNGQsIDB4ZGZlNDk2MDQsIDB4ZTM5ZWQxYjUsIDB4MWI0YzZhODgsIDB4YjhjMTJjMWYsIDB4N2Y0NjY1NTEsIDB4MDQ5ZDVlZWEsIDB4NWQwMThjMzUsIDB4NzNmYTg3NzQsIDB4MmVmYjBiNDEsIDB4NWFiMzY3MWQsIDB4NTI5MmRiZDIsIDB4MzNlOTEwNTYsIDB4MTM2ZGQ2NDcsIDB4OGM5YWQ3NjEsIDB4N2EzN2ExMGMsIDB4OGU1OWY4MTQsIDB4ODllYjEzM2MsIDB4ZWVjZWE5MjcsIDB4MzViNzYxYzksIDB4ZWRlMTFjZTUsIDB4M2M3YTQ3YjEsIDB4NTk5Y2QyZGYsIDB4M2Y1NWYyNzMsIDB4NzkxODE0Y2UsIDB4YmY3M2M3MzcsIDB4ZWE1M2Y3Y2QsIDB4NWI1ZmZkYWEsIDB4MTRkZjNkNmYsIDB4ODY3ODQ0ZGIsIDB4ODFjYWFmZjMsIDB4M2ViOTY4YzQsIDB4MmMzODI0MzQsIDB4NWZjMmEzNDAsIDB4NzIxNjFkYzMsIDB4MGNiY2UyMjUsIDB4OGIyODNjNDksIDB4NDFmZjBkOTUsIDB4NzEzOWE4MDEsIDB4ZGUwODBjYjMsIDB4OWNkOGI0ZTQsIDB4OTA2NDU2YzEsIDB4NjE3YmNiODQsIDB4NzBkNTMyYjYsIDB4NzQ0ODZjNWMsIDB4NDJkMGI4NTddO1xuICAgIHZhciBUNyA9IFsweGE3NTA1MWY0LCAweDY1NTM3ZTQxLCAweGE0YzMxYTE3LCAweDVlOTYzYTI3LCAweDZiY2IzYmFiLCAweDQ1ZjExZjlkLCAweDU4YWJhY2ZhLCAweDAzOTM0YmUzLCAweGZhNTUyMDMwLCAweDZkZjZhZDc2LCAweDc2OTE4OGNjLCAweDRjMjVmNTAyLCAweGQ3ZmM0ZmU1LCAweGNiZDdjNTJhLCAweDQ0ODAyNjM1LCAweGEzOGZiNTYyLCAweDVhNDlkZWIxLCAweDFiNjcyNWJhLCAweDBlOTg0NWVhLCAweGMwZTE1ZGZlLCAweDc1MDJjMzJmLCAweGYwMTI4MTRjLCAweDk3YTM4ZDQ2LCAweGY5YzY2YmQzLCAweDVmZTcwMzhmLCAweDljOTUxNTkyLCAweDdhZWJiZjZkLCAweDU5ZGE5NTUyLCAweDgzMmRkNGJlLCAweDIxZDM1ODc0LCAweDY5Mjk0OWUwLCAweGM4NDQ4ZWM5LCAweDg5NmE3NWMyLCAweDc5NzhmNDhlLCAweDNlNmI5OTU4LCAweDcxZGQyN2I5LCAweDRmYjZiZWUxLCAweGFkMTdmMDg4LCAweGFjNjZjOTIwLCAweDNhYjQ3ZGNlLCAweDRhMTg2M2RmLCAweDMxODJlNTFhLCAweDMzNjA5NzUxLCAweDdmNDU2MjUzLCAweDc3ZTBiMTY0LCAweGFlODRiYjZiLCAweGEwMWNmZTgxLCAweDJiOTRmOTA4LCAweDY4NTg3MDQ4LCAweGZkMTk4ZjQ1LCAweDZjODc5NGRlLCAweGY4Yjc1MjdiLCAweGQzMjNhYjczLCAweDAyZTI3MjRiLCAweDhmNTdlMzFmLCAweGFiMmE2NjU1LCAweDI4MDdiMmViLCAweGMyMDMyZmI1LCAweDdiOWE4NmM1LCAweDA4YTVkMzM3LCAweDg3ZjIzMDI4LCAweGE1YjIyM2JmLCAweDZhYmEwMjAzLCAweDgyNWNlZDE2LCAweDFjMmI4YWNmLCAweGI0OTJhNzc5LCAweGYyZjBmMzA3LCAweGUyYTE0ZTY5LCAweGY0Y2Q2NWRhLCAweGJlZDUwNjA1LCAweDYyMWZkMTM0LCAweGZlOGFjNGE2LCAweDUzOWQzNDJlLCAweDU1YTBhMmYzLCAweGUxMzIwNThhLCAweGViNzVhNGY2LCAweGVjMzkwYjgzLCAweGVmYWE0MDYwLCAweDlmMDY1ZTcxLCAweDEwNTFiZDZlLCAweDhhZjkzZTIxLCAweDA2M2Q5NmRkLCAweDA1YWVkZDNlLCAweGJkNDY0ZGU2LCAweDhkYjU5MTU0LCAweDVkMDU3MWM0LCAweGQ0NmYwNDA2LCAweDE1ZmY2MDUwLCAweGZiMjQxOTk4LCAweGU5OTdkNmJkLCAweDQzY2M4OTQwLCAweDllNzc2N2Q5LCAweDQyYmRiMGU4LCAweDhiODgwNzg5LCAweDViMzhlNzE5LCAweGVlZGI3OWM4LCAweDBhNDdhMTdjLCAweDBmZTk3YzQyLCAweDFlYzlmODg0LCAweDAwMDAwMDAwLCAweDg2ODMwOTgwLCAweGVkNDgzMjJiLCAweDcwYWMxZTExLCAweDcyNGU2YzVhLCAweGZmZmJmZDBlLCAweDM4NTYwZjg1LCAweGQ1MWUzZGFlLCAweDM5MjczNjJkLCAweGQ5NjQwYTBmLCAweGE2MjE2ODVjLCAweDU0ZDE5YjViLCAweDJlM2EyNDM2LCAweDY3YjEwYzBhLCAweGU3MGY5MzU3LCAweDk2ZDJiNGVlLCAweDkxOWUxYjliLCAweGM1NGY4MGMwLCAweDIwYTI2MWRjLCAweDRiNjk1YTc3LCAweDFhMTYxYzEyLCAweGJhMGFlMjkzLCAweDJhZTVjMGEwLCAweGUwNDMzYzIyLCAweDE3MWQxMjFiLCAweDBkMGIwZTA5LCAweGM3YWRmMjhiLCAweGE4YjkyZGI2LCAweGE5YzgxNDFlLCAweDE5ODU1N2YxLCAweDA3NGNhZjc1LCAweGRkYmJlZTk5LCAweDYwZmRhMzdmLCAweDI2OWZmNzAxLCAweGY1YmM1YzcyLCAweDNiYzU0NDY2LCAweDdlMzQ1YmZiLCAweDI5NzY4YjQzLCAweGM2ZGNjYjIzLCAweGZjNjhiNmVkLCAweGYxNjNiOGU0LCAweGRjY2FkNzMxLCAweDg1MTA0MjYzLCAweDIyNDAxMzk3LCAweDExMjA4NGM2LCAweDI0N2Q4NTRhLCAweDNkZjhkMmJiLCAweDMyMTFhZWY5LCAweGExNmRjNzI5LCAweDJmNGIxZDllLCAweDMwZjNkY2IyLCAweDUyZWMwZDg2LCAweGUzZDA3N2MxLCAweDE2NmMyYmIzLCAweGI5OTlhOTcwLCAweDQ4ZmExMTk0LCAweDY0MjI0N2U5LCAweDhjYzRhOGZjLCAweDNmMWFhMGYwLCAweDJjZDg1NjdkLCAweDkwZWYyMjMzLCAweDRlYzc4NzQ5LCAweGQxYzFkOTM4LCAweGEyZmU4Y2NhLCAweDBiMzY5OGQ0LCAweDgxY2ZhNmY1LCAweGRlMjhhNTdhLCAweDhlMjZkYWI3LCAweGJmYTQzZmFkLCAweDlkZTQyYzNhLCAweDkyMGQ1MDc4LCAweGNjOWI2YTVmLCAweDQ2NjI1NDdlLCAweDEzYzJmNjhkLCAweGI4ZTg5MGQ4LCAweGY3NWUyZTM5LCAweGFmZjU4MmMzLCAweDgwYmU5ZjVkLCAweDkzN2M2OWQwLCAweDJkYTk2ZmQ1LCAweDEyYjNjZjI1LCAweDk5M2JjOGFjLCAweDdkYTcxMDE4LCAweDYzNmVlODljLCAweGJiN2JkYjNiLCAweDc4MDljZDI2LCAweDE4ZjQ2ZTU5LCAweGI3MDFlYzlhLCAweDlhYTg4MzRmLCAweDZlNjVlNjk1LCAweGU2N2VhYWZmLCAweGNmMDgyMWJjLCAweGU4ZTZlZjE1LCAweDliZDliYWU3LCAweDM2Y2U0YTZmLCAweDA5ZDRlYTlmLCAweDdjZDYyOWIwLCAweGIyYWYzMWE0LCAweDIzMzEyYTNmLCAweDk0MzBjNmE1LCAweDY2YzAzNWEyLCAweGJjMzc3NDRlLCAweGNhYTZmYzgyLCAweGQwYjBlMDkwLCAweGQ4MTUzM2E3LCAweDk4NGFmMTA0LCAweGRhZjc0MWVjLCAweDUwMGU3ZmNkLCAweGY2MmYxNzkxLCAweGQ2OGQ3NjRkLCAweGIwNGQ0M2VmLCAweDRkNTRjY2FhLCAweDA0ZGZlNDk2LCAweGI1ZTM5ZWQxLCAweDg4MWI0YzZhLCAweDFmYjhjMTJjLCAweDUxN2Y0NjY1LCAweGVhMDQ5ZDVlLCAweDM1NWQwMThjLCAweDc0NzNmYTg3LCAweDQxMmVmYjBiLCAweDFkNWFiMzY3LCAweGQyNTI5MmRiLCAweDU2MzNlOTEwLCAweDQ3MTM2ZGQ2LCAweDYxOGM5YWQ3LCAweDBjN2EzN2ExLCAweDE0OGU1OWY4LCAweDNjODllYjEzLCAweDI3ZWVjZWE5LCAweGM5MzViNzYxLCAweGU1ZWRlMTFjLCAweGIxM2M3YTQ3LCAweGRmNTk5Y2QyLCAweDczM2Y1NWYyLCAweGNlNzkxODE0LCAweDM3YmY3M2M3LCAweGNkZWE1M2Y3LCAweGFhNWI1ZmZkLCAweDZmMTRkZjNkLCAweGRiODY3ODQ0LCAweGYzODFjYWFmLCAweGM0M2ViOTY4LCAweDM0MmMzODI0LCAweDQwNWZjMmEzLCAweGMzNzIxNjFkLCAweDI1MGNiY2UyLCAweDQ5OGIyODNjLCAweDk1NDFmZjBkLCAweDAxNzEzOWE4LCAweGIzZGUwODBjLCAweGU0OWNkOGI0LCAweGMxOTA2NDU2LCAweDg0NjE3YmNiLCAweGI2NzBkNTMyLCAweDVjNzQ0ODZjLCAweDU3NDJkMGI4XTtcbiAgICB2YXIgVDggPSBbMHhmNGE3NTA1MSwgMHg0MTY1NTM3ZSwgMHgxN2E0YzMxYSwgMHgyNzVlOTYzYSwgMHhhYjZiY2IzYiwgMHg5ZDQ1ZjExZiwgMHhmYTU4YWJhYywgMHhlMzAzOTM0YiwgMHgzMGZhNTUyMCwgMHg3NjZkZjZhZCwgMHhjYzc2OTE4OCwgMHgwMjRjMjVmNSwgMHhlNWQ3ZmM0ZiwgMHgyYWNiZDdjNSwgMHgzNTQ0ODAyNiwgMHg2MmEzOGZiNSwgMHhiMTVhNDlkZSwgMHhiYTFiNjcyNSwgMHhlYTBlOTg0NSwgMHhmZWMwZTE1ZCwgMHgyZjc1MDJjMywgMHg0Y2YwMTI4MSwgMHg0Njk3YTM4ZCwgMHhkM2Y5YzY2YiwgMHg4ZjVmZTcwMywgMHg5MjljOTUxNSwgMHg2ZDdhZWJiZiwgMHg1MjU5ZGE5NSwgMHhiZTgzMmRkNCwgMHg3NDIxZDM1OCwgMHhlMDY5Mjk0OSwgMHhjOWM4NDQ4ZSwgMHhjMjg5NmE3NSwgMHg4ZTc5NzhmNCwgMHg1ODNlNmI5OSwgMHhiOTcxZGQyNywgMHhlMTRmYjZiZSwgMHg4OGFkMTdmMCwgMHgyMGFjNjZjOSwgMHhjZTNhYjQ3ZCwgMHhkZjRhMTg2MywgMHgxYTMxODJlNSwgMHg1MTMzNjA5NywgMHg1MzdmNDU2MiwgMHg2NDc3ZTBiMSwgMHg2YmFlODRiYiwgMHg4MWEwMWNmZSwgMHgwODJiOTRmOSwgMHg0ODY4NTg3MCwgMHg0NWZkMTk4ZiwgMHhkZTZjODc5NCwgMHg3YmY4Yjc1MiwgMHg3M2QzMjNhYiwgMHg0YjAyZTI3MiwgMHgxZjhmNTdlMywgMHg1NWFiMmE2NiwgMHhlYjI4MDdiMiwgMHhiNWMyMDMyZiwgMHhjNTdiOWE4NiwgMHgzNzA4YTVkMywgMHgyODg3ZjIzMCwgMHhiZmE1YjIyMywgMHgwMzZhYmEwMiwgMHgxNjgyNWNlZCwgMHhjZjFjMmI4YSwgMHg3OWI0OTJhNywgMHgwN2YyZjBmMywgMHg2OWUyYTE0ZSwgMHhkYWY0Y2Q2NSwgMHgwNWJlZDUwNiwgMHgzNDYyMWZkMSwgMHhhNmZlOGFjNCwgMHgyZTUzOWQzNCwgMHhmMzU1YTBhMiwgMHg4YWUxMzIwNSwgMHhmNmViNzVhNCwgMHg4M2VjMzkwYiwgMHg2MGVmYWE0MCwgMHg3MTlmMDY1ZSwgMHg2ZTEwNTFiZCwgMHgyMThhZjkzZSwgMHhkZDA2M2Q5NiwgMHgzZTA1YWVkZCwgMHhlNmJkNDY0ZCwgMHg1NDhkYjU5MSwgMHhjNDVkMDU3MSwgMHgwNmQ0NmYwNCwgMHg1MDE1ZmY2MCwgMHg5OGZiMjQxOSwgMHhiZGU5OTdkNiwgMHg0MDQzY2M4OSwgMHhkOTllNzc2NywgMHhlODQyYmRiMCwgMHg4OThiODgwNywgMHgxOTViMzhlNywgMHhjOGVlZGI3OSwgMHg3YzBhNDdhMSwgMHg0MjBmZTk3YywgMHg4NDFlYzlmOCwgMHgwMDAwMDAwMCwgMHg4MDg2ODMwOSwgMHgyYmVkNDgzMiwgMHgxMTcwYWMxZSwgMHg1YTcyNGU2YywgMHgwZWZmZmJmZCwgMHg4NTM4NTYwZiwgMHhhZWQ1MWUzZCwgMHgyZDM5MjczNiwgMHgwZmQ5NjQwYSwgMHg1Y2E2MjE2OCwgMHg1YjU0ZDE5YiwgMHgzNjJlM2EyNCwgMHgwYTY3YjEwYywgMHg1N2U3MGY5MywgMHhlZTk2ZDJiNCwgMHg5YjkxOWUxYiwgMHhjMGM1NGY4MCwgMHhkYzIwYTI2MSwgMHg3NzRiNjk1YSwgMHgxMjFhMTYxYywgMHg5M2JhMGFlMiwgMHhhMDJhZTVjMCwgMHgyMmUwNDMzYywgMHgxYjE3MWQxMiwgMHgwOTBkMGIwZSwgMHg4YmM3YWRmMiwgMHhiNmE4YjkyZCwgMHgxZWE5YzgxNCwgMHhmMTE5ODU1NywgMHg3NTA3NGNhZiwgMHg5OWRkYmJlZSwgMHg3ZjYwZmRhMywgMHgwMTI2OWZmNywgMHg3MmY1YmM1YywgMHg2NjNiYzU0NCwgMHhmYjdlMzQ1YiwgMHg0MzI5NzY4YiwgMHgyM2M2ZGNjYiwgMHhlZGZjNjhiNiwgMHhlNGYxNjNiOCwgMHgzMWRjY2FkNywgMHg2Mzg1MTA0MiwgMHg5NzIyNDAxMywgMHhjNjExMjA4NCwgMHg0YTI0N2Q4NSwgMHhiYjNkZjhkMiwgMHhmOTMyMTFhZSwgMHgyOWExNmRjNywgMHg5ZTJmNGIxZCwgMHhiMjMwZjNkYywgMHg4NjUyZWMwZCwgMHhjMWUzZDA3NywgMHhiMzE2NmMyYiwgMHg3MGI5OTlhOSwgMHg5NDQ4ZmExMSwgMHhlOTY0MjI0NywgMHhmYzhjYzRhOCwgMHhmMDNmMWFhMCwgMHg3ZDJjZDg1NiwgMHgzMzkwZWYyMiwgMHg0OTRlYzc4NywgMHgzOGQxYzFkOSwgMHhjYWEyZmU4YywgMHhkNDBiMzY5OCwgMHhmNTgxY2ZhNiwgMHg3YWRlMjhhNSwgMHhiNzhlMjZkYSwgMHhhZGJmYTQzZiwgMHgzYTlkZTQyYywgMHg3ODkyMGQ1MCwgMHg1ZmNjOWI2YSwgMHg3ZTQ2NjI1NCwgMHg4ZDEzYzJmNiwgMHhkOGI4ZTg5MCwgMHgzOWY3NWUyZSwgMHhjM2FmZjU4MiwgMHg1ZDgwYmU5ZiwgMHhkMDkzN2M2OSwgMHhkNTJkYTk2ZiwgMHgyNTEyYjNjZiwgMHhhYzk5M2JjOCwgMHgxODdkYTcxMCwgMHg5YzYzNmVlOCwgMHgzYmJiN2JkYiwgMHgyNjc4MDljZCwgMHg1OTE4ZjQ2ZSwgMHg5YWI3MDFlYywgMHg0ZjlhYTg4MywgMHg5NTZlNjVlNiwgMHhmZmU2N2VhYSwgMHhiY2NmMDgyMSwgMHgxNWU4ZTZlZiwgMHhlNzliZDliYSwgMHg2ZjM2Y2U0YSwgMHg5ZjA5ZDRlYSwgMHhiMDdjZDYyOSwgMHhhNGIyYWYzMSwgMHgzZjIzMzEyYSwgMHhhNTk0MzBjNiwgMHhhMjY2YzAzNSwgMHg0ZWJjMzc3NCwgMHg4MmNhYTZmYywgMHg5MGQwYjBlMCwgMHhhN2Q4MTUzMywgMHgwNDk4NGFmMSwgMHhlY2RhZjc0MSwgMHhjZDUwMGU3ZiwgMHg5MWY2MmYxNywgMHg0ZGQ2OGQ3NiwgMHhlZmIwNGQ0MywgMHhhYTRkNTRjYywgMHg5NjA0ZGZlNCwgMHhkMWI1ZTM5ZSwgMHg2YTg4MWI0YywgMHgyYzFmYjhjMSwgMHg2NTUxN2Y0NiwgMHg1ZWVhMDQ5ZCwgMHg4YzM1NWQwMSwgMHg4Nzc0NzNmYSwgMHgwYjQxMmVmYiwgMHg2NzFkNWFiMywgMHhkYmQyNTI5MiwgMHgxMDU2MzNlOSwgMHhkNjQ3MTM2ZCwgMHhkNzYxOGM5YSwgMHhhMTBjN2EzNywgMHhmODE0OGU1OSwgMHgxMzNjODllYiwgMHhhOTI3ZWVjZSwgMHg2MWM5MzViNywgMHgxY2U1ZWRlMSwgMHg0N2IxM2M3YSwgMHhkMmRmNTk5YywgMHhmMjczM2Y1NSwgMHgxNGNlNzkxOCwgMHhjNzM3YmY3MywgMHhmN2NkZWE1MywgMHhmZGFhNWI1ZiwgMHgzZDZmMTRkZiwgMHg0NGRiODY3OCwgMHhhZmYzODFjYSwgMHg2OGM0M2ViOSwgMHgyNDM0MmMzOCwgMHhhMzQwNWZjMiwgMHgxZGMzNzIxNiwgMHhlMjI1MGNiYywgMHgzYzQ5OGIyOCwgMHgwZDk1NDFmZiwgMHhhODAxNzEzOSwgMHgwY2IzZGUwOCwgMHhiNGU0OWNkOCwgMHg1NmMxOTA2NCwgMHhjYjg0NjE3YiwgMHgzMmI2NzBkNSwgMHg2YzVjNzQ0OCwgMHhiODU3NDJkMF07XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGRlY3J5cHRpb24ga2V5IGV4cGFuc2lvblxuICAgIHZhciBVMSA9IFsweDAwMDAwMDAwLCAweDBlMDkwZDBiLCAweDFjMTIxYTE2LCAweDEyMWIxNzFkLCAweDM4MjQzNDJjLCAweDM2MmQzOTI3LCAweDI0MzYyZTNhLCAweDJhM2YyMzMxLCAweDcwNDg2ODU4LCAweDdlNDE2NTUzLCAweDZjNWE3MjRlLCAweDYyNTM3ZjQ1LCAweDQ4NmM1Yzc0LCAweDQ2NjU1MTdmLCAweDU0N2U0NjYyLCAweDVhNzc0YjY5LCAweGUwOTBkMGIwLCAweGVlOTlkZGJiLCAweGZjODJjYWE2LCAweGYyOGJjN2FkLCAweGQ4YjRlNDljLCAweGQ2YmRlOTk3LCAweGM0YTZmZThhLCAweGNhYWZmMzgxLCAweDkwZDhiOGU4LCAweDllZDFiNWUzLCAweDhjY2FhMmZlLCAweDgyYzNhZmY1LCAweGE4ZmM4Y2M0LCAweGE2ZjU4MWNmLCAweGI0ZWU5NmQyLCAweGJhZTc5YmQ5LCAweGRiM2JiYjdiLCAweGQ1MzJiNjcwLCAweGM3MjlhMTZkLCAweGM5MjBhYzY2LCAweGUzMWY4ZjU3LCAweGVkMTY4MjVjLCAweGZmMGQ5NTQxLCAweGYxMDQ5ODRhLCAweGFiNzNkMzIzLCAweGE1N2FkZTI4LCAweGI3NjFjOTM1LCAweGI5NjhjNDNlLCAweDkzNTdlNzBmLCAweDlkNWVlYTA0LCAweDhmNDVmZDE5LCAweDgxNGNmMDEyLCAweDNiYWI2YmNiLCAweDM1YTI2NmMwLCAweDI3Yjk3MWRkLCAweDI5YjA3Y2Q2LCAweDAzOGY1ZmU3LCAweDBkODY1MmVjLCAweDFmOWQ0NWYxLCAweDExOTQ0OGZhLCAweDRiZTMwMzkzLCAweDQ1ZWEwZTk4LCAweDU3ZjExOTg1LCAweDU5ZjgxNDhlLCAweDczYzczN2JmLCAweDdkY2UzYWI0LCAweDZmZDUyZGE5LCAweDYxZGMyMGEyLCAweGFkNzY2ZGY2LCAweGEzN2Y2MGZkLCAweGIxNjQ3N2UwLCAweGJmNmQ3YWViLCAweDk1NTI1OWRhLCAweDliNWI1NGQxLCAweDg5NDA0M2NjLCAweDg3NDk0ZWM3LCAweGRkM2UwNWFlLCAweGQzMzcwOGE1LCAweGMxMmMxZmI4LCAweGNmMjUxMmIzLCAweGU1MWEzMTgyLCAweGViMTMzYzg5LCAweGY5MDgyYjk0LCAweGY3MDEyNjlmLCAweDRkZTZiZDQ2LCAweDQzZWZiMDRkLCAweDUxZjRhNzUwLCAweDVmZmRhYTViLCAweDc1YzI4OTZhLCAweDdiY2I4NDYxLCAweDY5ZDA5MzdjLCAweDY3ZDk5ZTc3LCAweDNkYWVkNTFlLCAweDMzYTdkODE1LCAweDIxYmNjZjA4LCAweDJmYjVjMjAzLCAweDA1OGFlMTMyLCAweDBiODNlYzM5LCAweDE5OThmYjI0LCAweDE3OTFmNjJmLCAweDc2NGRkNjhkLCAweDc4NDRkYjg2LCAweDZhNWZjYzliLCAweDY0NTZjMTkwLCAweDRlNjllMmExLCAweDQwNjBlZmFhLCAweDUyN2JmOGI3LCAweDVjNzJmNWJjLCAweDA2MDViZWQ1LCAweDA4MGNiM2RlLCAweDFhMTdhNGMzLCAweDE0MWVhOWM4LCAweDNlMjE4YWY5LCAweDMwMjg4N2YyLCAweDIyMzM5MGVmLCAweDJjM2E5ZGU0LCAweDk2ZGQwNjNkLCAweDk4ZDQwYjM2LCAweDhhY2YxYzJiLCAweDg0YzYxMTIwLCAweGFlZjkzMjExLCAweGEwZjAzZjFhLCAweGIyZWIyODA3LCAweGJjZTIyNTBjLCAweGU2OTU2ZTY1LCAweGU4OWM2MzZlLCAweGZhODc3NDczLCAweGY0OGU3OTc4LCAweGRlYjE1YTQ5LCAweGQwYjg1NzQyLCAweGMyYTM0MDVmLCAweGNjYWE0ZDU0LCAweDQxZWNkYWY3LCAweDRmZTVkN2ZjLCAweDVkZmVjMGUxLCAweDUzZjdjZGVhLCAweDc5YzhlZWRiLCAweDc3YzFlM2QwLCAweDY1ZGFmNGNkLCAweDZiZDNmOWM2LCAweDMxYTRiMmFmLCAweDNmYWRiZmE0LCAweDJkYjZhOGI5LCAweDIzYmZhNWIyLCAweDA5ODA4NjgzLCAweDA3ODk4Yjg4LCAweDE1OTI5Yzk1LCAweDFiOWI5MTllLCAweGExN2MwYTQ3LCAweGFmNzUwNzRjLCAweGJkNmUxMDUxLCAweGIzNjcxZDVhLCAweDk5NTgzZTZiLCAweDk3NTEzMzYwLCAweDg1NGEyNDdkLCAweDhiNDMyOTc2LCAweGQxMzQ2MjFmLCAweGRmM2Q2ZjE0LCAweGNkMjY3ODA5LCAweGMzMmY3NTAyLCAweGU5MTA1NjMzLCAweGU3MTk1YjM4LCAweGY1MDI0YzI1LCAweGZiMGI0MTJlLCAweDlhZDc2MThjLCAweDk0ZGU2Yzg3LCAweDg2YzU3YjlhLCAweDg4Y2M3NjkxLCAweGEyZjM1NWEwLCAweGFjZmE1OGFiLCAweGJlZTE0ZmI2LCAweGIwZTg0MmJkLCAweGVhOWYwOWQ0LCAweGU0OTYwNGRmLCAweGY2OGQxM2MyLCAweGY4ODQxZWM5LCAweGQyYmIzZGY4LCAweGRjYjIzMGYzLCAweGNlYTkyN2VlLCAweGMwYTAyYWU1LCAweDdhNDdiMTNjLCAweDc0NGViYzM3LCAweDY2NTVhYjJhLCAweDY4NWNhNjIxLCAweDQyNjM4NTEwLCAweDRjNmE4ODFiLCAweDVlNzE5ZjA2LCAweDUwNzg5MjBkLCAweDBhMGZkOTY0LCAweDA0MDZkNDZmLCAweDE2MWRjMzcyLCAweDE4MTRjZTc5LCAweDMyMmJlZDQ4LCAweDNjMjJlMDQzLCAweDJlMzlmNzVlLCAweDIwMzBmYTU1LCAweGVjOWFiNzAxLCAweGUyOTNiYTBhLCAweGYwODhhZDE3LCAweGZlODFhMDFjLCAweGQ0YmU4MzJkLCAweGRhYjc4ZTI2LCAweGM4YWM5OTNiLCAweGM2YTU5NDMwLCAweDljZDJkZjU5LCAweDkyZGJkMjUyLCAweDgwYzBjNTRmLCAweDhlYzljODQ0LCAweGE0ZjZlYjc1LCAweGFhZmZlNjdlLCAweGI4ZTRmMTYzLCAweGI2ZWRmYzY4LCAweDBjMGE2N2IxLCAweDAyMDM2YWJhLCAweDEwMTg3ZGE3LCAweDFlMTE3MGFjLCAweDM0MmU1MzlkLCAweDNhMjc1ZTk2LCAweDI4M2M0OThiLCAweDI2MzU0NDgwLCAweDdjNDIwZmU5LCAweDcyNGIwMmUyLCAweDYwNTAxNWZmLCAweDZlNTkxOGY0LCAweDQ0NjYzYmM1LCAweDRhNmYzNmNlLCAweDU4NzQyMWQzLCAweDU2N2QyY2Q4LCAweDM3YTEwYzdhLCAweDM5YTgwMTcxLCAweDJiYjMxNjZjLCAweDI1YmExYjY3LCAweDBmODUzODU2LCAweDAxOGMzNTVkLCAweDEzOTcyMjQwLCAweDFkOWUyZjRiLCAweDQ3ZTk2NDIyLCAweDQ5ZTA2OTI5LCAweDViZmI3ZTM0LCAweDU1ZjI3MzNmLCAweDdmY2Q1MDBlLCAweDcxYzQ1ZDA1LCAweDYzZGY0YTE4LCAweDZkZDY0NzEzLCAweGQ3MzFkY2NhLCAweGQ5MzhkMWMxLCAweGNiMjNjNmRjLCAweGM1MmFjYmQ3LCAweGVmMTVlOGU2LCAweGUxMWNlNWVkLCAweGYzMDdmMmYwLCAweGZkMGVmZmZiLCAweGE3NzliNDkyLCAweGE5NzBiOTk5LCAweGJiNmJhZTg0LCAweGI1NjJhMzhmLCAweDlmNWQ4MGJlLCAweDkxNTQ4ZGI1LCAweDgzNGY5YWE4LCAweDhkNDY5N2EzXTtcbiAgICB2YXIgVTIgPSBbMHgwMDAwMDAwMCwgMHgwYjBlMDkwZCwgMHgxNjFjMTIxYSwgMHgxZDEyMWIxNywgMHgyYzM4MjQzNCwgMHgyNzM2MmQzOSwgMHgzYTI0MzYyZSwgMHgzMTJhM2YyMywgMHg1ODcwNDg2OCwgMHg1MzdlNDE2NSwgMHg0ZTZjNWE3MiwgMHg0NTYyNTM3ZiwgMHg3NDQ4NmM1YywgMHg3ZjQ2NjU1MSwgMHg2MjU0N2U0NiwgMHg2OTVhNzc0YiwgMHhiMGUwOTBkMCwgMHhiYmVlOTlkZCwgMHhhNmZjODJjYSwgMHhhZGYyOGJjNywgMHg5Y2Q4YjRlNCwgMHg5N2Q2YmRlOSwgMHg4YWM0YTZmZSwgMHg4MWNhYWZmMywgMHhlODkwZDhiOCwgMHhlMzllZDFiNSwgMHhmZThjY2FhMiwgMHhmNTgyYzNhZiwgMHhjNGE4ZmM4YywgMHhjZmE2ZjU4MSwgMHhkMmI0ZWU5NiwgMHhkOWJhZTc5YiwgMHg3YmRiM2JiYiwgMHg3MGQ1MzJiNiwgMHg2ZGM3MjlhMSwgMHg2NmM5MjBhYywgMHg1N2UzMWY4ZiwgMHg1Y2VkMTY4MiwgMHg0MWZmMGQ5NSwgMHg0YWYxMDQ5OCwgMHgyM2FiNzNkMywgMHgyOGE1N2FkZSwgMHgzNWI3NjFjOSwgMHgzZWI5NjhjNCwgMHgwZjkzNTdlNywgMHgwNDlkNWVlYSwgMHgxOThmNDVmZCwgMHgxMjgxNGNmMCwgMHhjYjNiYWI2YiwgMHhjMDM1YTI2NiwgMHhkZDI3Yjk3MSwgMHhkNjI5YjA3YywgMHhlNzAzOGY1ZiwgMHhlYzBkODY1MiwgMHhmMTFmOWQ0NSwgMHhmYTExOTQ0OCwgMHg5MzRiZTMwMywgMHg5ODQ1ZWEwZSwgMHg4NTU3ZjExOSwgMHg4ZTU5ZjgxNCwgMHhiZjczYzczNywgMHhiNDdkY2UzYSwgMHhhOTZmZDUyZCwgMHhhMjYxZGMyMCwgMHhmNmFkNzY2ZCwgMHhmZGEzN2Y2MCwgMHhlMGIxNjQ3NywgMHhlYmJmNmQ3YSwgMHhkYTk1NTI1OSwgMHhkMTliNWI1NCwgMHhjYzg5NDA0MywgMHhjNzg3NDk0ZSwgMHhhZWRkM2UwNSwgMHhhNWQzMzcwOCwgMHhiOGMxMmMxZiwgMHhiM2NmMjUxMiwgMHg4MmU1MWEzMSwgMHg4OWViMTMzYywgMHg5NGY5MDgyYiwgMHg5ZmY3MDEyNiwgMHg0NjRkZTZiZCwgMHg0ZDQzZWZiMCwgMHg1MDUxZjRhNywgMHg1YjVmZmRhYSwgMHg2YTc1YzI4OSwgMHg2MTdiY2I4NCwgMHg3YzY5ZDA5MywgMHg3NzY3ZDk5ZSwgMHgxZTNkYWVkNSwgMHgxNTMzYTdkOCwgMHgwODIxYmNjZiwgMHgwMzJmYjVjMiwgMHgzMjA1OGFlMSwgMHgzOTBiODNlYywgMHgyNDE5OThmYiwgMHgyZjE3OTFmNiwgMHg4ZDc2NGRkNiwgMHg4Njc4NDRkYiwgMHg5YjZhNWZjYywgMHg5MDY0NTZjMSwgMHhhMTRlNjllMiwgMHhhYTQwNjBlZiwgMHhiNzUyN2JmOCwgMHhiYzVjNzJmNSwgMHhkNTA2MDViZSwgMHhkZTA4MGNiMywgMHhjMzFhMTdhNCwgMHhjODE0MWVhOSwgMHhmOTNlMjE4YSwgMHhmMjMwMjg4NywgMHhlZjIyMzM5MCwgMHhlNDJjM2E5ZCwgMHgzZDk2ZGQwNiwgMHgzNjk4ZDQwYiwgMHgyYjhhY2YxYywgMHgyMDg0YzYxMSwgMHgxMWFlZjkzMiwgMHgxYWEwZjAzZiwgMHgwN2IyZWIyOCwgMHgwY2JjZTIyNSwgMHg2NWU2OTU2ZSwgMHg2ZWU4OWM2MywgMHg3M2ZhODc3NCwgMHg3OGY0OGU3OSwgMHg0OWRlYjE1YSwgMHg0MmQwYjg1NywgMHg1ZmMyYTM0MCwgMHg1NGNjYWE0ZCwgMHhmNzQxZWNkYSwgMHhmYzRmZTVkNywgMHhlMTVkZmVjMCwgMHhlYTUzZjdjZCwgMHhkYjc5YzhlZSwgMHhkMDc3YzFlMywgMHhjZDY1ZGFmNCwgMHhjNjZiZDNmOSwgMHhhZjMxYTRiMiwgMHhhNDNmYWRiZiwgMHhiOTJkYjZhOCwgMHhiMjIzYmZhNSwgMHg4MzA5ODA4NiwgMHg4ODA3ODk4YiwgMHg5NTE1OTI5YywgMHg5ZTFiOWI5MSwgMHg0N2ExN2MwYSwgMHg0Y2FmNzUwNywgMHg1MWJkNmUxMCwgMHg1YWIzNjcxZCwgMHg2Yjk5NTgzZSwgMHg2MDk3NTEzMywgMHg3ZDg1NGEyNCwgMHg3NjhiNDMyOSwgMHgxZmQxMzQ2MiwgMHgxNGRmM2Q2ZiwgMHgwOWNkMjY3OCwgMHgwMmMzMmY3NSwgMHgzM2U5MTA1NiwgMHgzOGU3MTk1YiwgMHgyNWY1MDI0YywgMHgyZWZiMGI0MSwgMHg4YzlhZDc2MSwgMHg4Nzk0ZGU2YywgMHg5YTg2YzU3YiwgMHg5MTg4Y2M3NiwgMHhhMGEyZjM1NSwgMHhhYmFjZmE1OCwgMHhiNmJlZTE0ZiwgMHhiZGIwZTg0MiwgMHhkNGVhOWYwOSwgMHhkZmU0OTYwNCwgMHhjMmY2OGQxMywgMHhjOWY4ODQxZSwgMHhmOGQyYmIzZCwgMHhmM2RjYjIzMCwgMHhlZWNlYTkyNywgMHhlNWMwYTAyYSwgMHgzYzdhNDdiMSwgMHgzNzc0NGViYywgMHgyYTY2NTVhYiwgMHgyMTY4NWNhNiwgMHgxMDQyNjM4NSwgMHgxYjRjNmE4OCwgMHgwNjVlNzE5ZiwgMHgwZDUwNzg5MiwgMHg2NDBhMGZkOSwgMHg2ZjA0MDZkNCwgMHg3MjE2MWRjMywgMHg3OTE4MTRjZSwgMHg0ODMyMmJlZCwgMHg0MzNjMjJlMCwgMHg1ZTJlMzlmNywgMHg1NTIwMzBmYSwgMHgwMWVjOWFiNywgMHgwYWUyOTNiYSwgMHgxN2YwODhhZCwgMHgxY2ZlODFhMCwgMHgyZGQ0YmU4MywgMHgyNmRhYjc4ZSwgMHgzYmM4YWM5OSwgMHgzMGM2YTU5NCwgMHg1OTljZDJkZiwgMHg1MjkyZGJkMiwgMHg0ZjgwYzBjNSwgMHg0NDhlYzljOCwgMHg3NWE0ZjZlYiwgMHg3ZWFhZmZlNiwgMHg2M2I4ZTRmMSwgMHg2OGI2ZWRmYywgMHhiMTBjMGE2NywgMHhiYTAyMDM2YSwgMHhhNzEwMTg3ZCwgMHhhYzFlMTE3MCwgMHg5ZDM0MmU1MywgMHg5NjNhMjc1ZSwgMHg4YjI4M2M0OSwgMHg4MDI2MzU0NCwgMHhlOTdjNDIwZiwgMHhlMjcyNGIwMiwgMHhmZjYwNTAxNSwgMHhmNDZlNTkxOCwgMHhjNTQ0NjYzYiwgMHhjZTRhNmYzNiwgMHhkMzU4NzQyMSwgMHhkODU2N2QyYywgMHg3YTM3YTEwYywgMHg3MTM5YTgwMSwgMHg2YzJiYjMxNiwgMHg2NzI1YmExYiwgMHg1NjBmODUzOCwgMHg1ZDAxOGMzNSwgMHg0MDEzOTcyMiwgMHg0YjFkOWUyZiwgMHgyMjQ3ZTk2NCwgMHgyOTQ5ZTA2OSwgMHgzNDViZmI3ZSwgMHgzZjU1ZjI3MywgMHgwZTdmY2Q1MCwgMHgwNTcxYzQ1ZCwgMHgxODYzZGY0YSwgMHgxMzZkZDY0NywgMHhjYWQ3MzFkYywgMHhjMWQ5MzhkMSwgMHhkY2NiMjNjNiwgMHhkN2M1MmFjYiwgMHhlNmVmMTVlOCwgMHhlZGUxMWNlNSwgMHhmMGYzMDdmMiwgMHhmYmZkMGVmZiwgMHg5MmE3NzliNCwgMHg5OWE5NzBiOSwgMHg4NGJiNmJhZSwgMHg4ZmI1NjJhMywgMHhiZTlmNWQ4MCwgMHhiNTkxNTQ4ZCwgMHhhODgzNGY5YSwgMHhhMzhkNDY5N107XG4gICAgdmFyIFUzID0gWzB4MDAwMDAwMDAsIDB4MGQwYjBlMDksIDB4MWExNjFjMTIsIDB4MTcxZDEyMWIsIDB4MzQyYzM4MjQsIDB4MzkyNzM2MmQsIDB4MmUzYTI0MzYsIDB4MjMzMTJhM2YsIDB4Njg1ODcwNDgsIDB4NjU1MzdlNDEsIDB4NzI0ZTZjNWEsIDB4N2Y0NTYyNTMsIDB4NWM3NDQ4NmMsIDB4NTE3ZjQ2NjUsIDB4NDY2MjU0N2UsIDB4NGI2OTVhNzcsIDB4ZDBiMGUwOTAsIDB4ZGRiYmVlOTksIDB4Y2FhNmZjODIsIDB4YzdhZGYyOGIsIDB4ZTQ5Y2Q4YjQsIDB4ZTk5N2Q2YmQsIDB4ZmU4YWM0YTYsIDB4ZjM4MWNhYWYsIDB4YjhlODkwZDgsIDB4YjVlMzllZDEsIDB4YTJmZThjY2EsIDB4YWZmNTgyYzMsIDB4OGNjNGE4ZmMsIDB4ODFjZmE2ZjUsIDB4OTZkMmI0ZWUsIDB4OWJkOWJhZTcsIDB4YmI3YmRiM2IsIDB4YjY3MGQ1MzIsIDB4YTE2ZGM3MjksIDB4YWM2NmM5MjAsIDB4OGY1N2UzMWYsIDB4ODI1Y2VkMTYsIDB4OTU0MWZmMGQsIDB4OTg0YWYxMDQsIDB4ZDMyM2FiNzMsIDB4ZGUyOGE1N2EsIDB4YzkzNWI3NjEsIDB4YzQzZWI5NjgsIDB4ZTcwZjkzNTcsIDB4ZWEwNDlkNWUsIDB4ZmQxOThmNDUsIDB4ZjAxMjgxNGMsIDB4NmJjYjNiYWIsIDB4NjZjMDM1YTIsIDB4NzFkZDI3YjksIDB4N2NkNjI5YjAsIDB4NWZlNzAzOGYsIDB4NTJlYzBkODYsIDB4NDVmMTFmOWQsIDB4NDhmYTExOTQsIDB4MDM5MzRiZTMsIDB4MGU5ODQ1ZWEsIDB4MTk4NTU3ZjEsIDB4MTQ4ZTU5ZjgsIDB4MzdiZjczYzcsIDB4M2FiNDdkY2UsIDB4MmRhOTZmZDUsIDB4MjBhMjYxZGMsIDB4NmRmNmFkNzYsIDB4NjBmZGEzN2YsIDB4NzdlMGIxNjQsIDB4N2FlYmJmNmQsIDB4NTlkYTk1NTIsIDB4NTRkMTliNWIsIDB4NDNjYzg5NDAsIDB4NGVjNzg3NDksIDB4MDVhZWRkM2UsIDB4MDhhNWQzMzcsIDB4MWZiOGMxMmMsIDB4MTJiM2NmMjUsIDB4MzE4MmU1MWEsIDB4M2M4OWViMTMsIDB4MmI5NGY5MDgsIDB4MjY5ZmY3MDEsIDB4YmQ0NjRkZTYsIDB4YjA0ZDQzZWYsIDB4YTc1MDUxZjQsIDB4YWE1YjVmZmQsIDB4ODk2YTc1YzIsIDB4ODQ2MTdiY2IsIDB4OTM3YzY5ZDAsIDB4OWU3NzY3ZDksIDB4ZDUxZTNkYWUsIDB4ZDgxNTMzYTcsIDB4Y2YwODIxYmMsIDB4YzIwMzJmYjUsIDB4ZTEzMjA1OGEsIDB4ZWMzOTBiODMsIDB4ZmIyNDE5OTgsIDB4ZjYyZjE3OTEsIDB4ZDY4ZDc2NGQsIDB4ZGI4Njc4NDQsIDB4Y2M5YjZhNWYsIDB4YzE5MDY0NTYsIDB4ZTJhMTRlNjksIDB4ZWZhYTQwNjAsIDB4ZjhiNzUyN2IsIDB4ZjViYzVjNzIsIDB4YmVkNTA2MDUsIDB4YjNkZTA4MGMsIDB4YTRjMzFhMTcsIDB4YTljODE0MWUsIDB4OGFmOTNlMjEsIDB4ODdmMjMwMjgsIDB4OTBlZjIyMzMsIDB4OWRlNDJjM2EsIDB4MDYzZDk2ZGQsIDB4MGIzNjk4ZDQsIDB4MWMyYjhhY2YsIDB4MTEyMDg0YzYsIDB4MzIxMWFlZjksIDB4M2YxYWEwZjAsIDB4MjgwN2IyZWIsIDB4MjUwY2JjZTIsIDB4NmU2NWU2OTUsIDB4NjM2ZWU4OWMsIDB4NzQ3M2ZhODcsIDB4Nzk3OGY0OGUsIDB4NWE0OWRlYjEsIDB4NTc0MmQwYjgsIDB4NDA1ZmMyYTMsIDB4NGQ1NGNjYWEsIDB4ZGFmNzQxZWMsIDB4ZDdmYzRmZTUsIDB4YzBlMTVkZmUsIDB4Y2RlYTUzZjcsIDB4ZWVkYjc5YzgsIDB4ZTNkMDc3YzEsIDB4ZjRjZDY1ZGEsIDB4ZjljNjZiZDMsIDB4YjJhZjMxYTQsIDB4YmZhNDNmYWQsIDB4YThiOTJkYjYsIDB4YTViMjIzYmYsIDB4ODY4MzA5ODAsIDB4OGI4ODA3ODksIDB4OWM5NTE1OTIsIDB4OTE5ZTFiOWIsIDB4MGE0N2ExN2MsIDB4MDc0Y2FmNzUsIDB4MTA1MWJkNmUsIDB4MWQ1YWIzNjcsIDB4M2U2Yjk5NTgsIDB4MzM2MDk3NTEsIDB4MjQ3ZDg1NGEsIDB4Mjk3NjhiNDMsIDB4NjIxZmQxMzQsIDB4NmYxNGRmM2QsIDB4NzgwOWNkMjYsIDB4NzUwMmMzMmYsIDB4NTYzM2U5MTAsIDB4NWIzOGU3MTksIDB4NGMyNWY1MDIsIDB4NDEyZWZiMGIsIDB4NjE4YzlhZDcsIDB4NmM4Nzk0ZGUsIDB4N2I5YTg2YzUsIDB4NzY5MTg4Y2MsIDB4NTVhMGEyZjMsIDB4NThhYmFjZmEsIDB4NGZiNmJlZTEsIDB4NDJiZGIwZTgsIDB4MDlkNGVhOWYsIDB4MDRkZmU0OTYsIDB4MTNjMmY2OGQsIDB4MWVjOWY4ODQsIDB4M2RmOGQyYmIsIDB4MzBmM2RjYjIsIDB4MjdlZWNlYTksIDB4MmFlNWMwYTAsIDB4YjEzYzdhNDcsIDB4YmMzNzc0NGUsIDB4YWIyYTY2NTUsIDB4YTYyMTY4NWMsIDB4ODUxMDQyNjMsIDB4ODgxYjRjNmEsIDB4OWYwNjVlNzEsIDB4OTIwZDUwNzgsIDB4ZDk2NDBhMGYsIDB4ZDQ2ZjA0MDYsIDB4YzM3MjE2MWQsIDB4Y2U3OTE4MTQsIDB4ZWQ0ODMyMmIsIDB4ZTA0MzNjMjIsIDB4Zjc1ZTJlMzksIDB4ZmE1NTIwMzAsIDB4YjcwMWVjOWEsIDB4YmEwYWUyOTMsIDB4YWQxN2YwODgsIDB4YTAxY2ZlODEsIDB4ODMyZGQ0YmUsIDB4OGUyNmRhYjcsIDB4OTkzYmM4YWMsIDB4OTQzMGM2YTUsIDB4ZGY1OTljZDIsIDB4ZDI1MjkyZGIsIDB4YzU0ZjgwYzAsIDB4Yzg0NDhlYzksIDB4ZWI3NWE0ZjYsIDB4ZTY3ZWFhZmYsIDB4ZjE2M2I4ZTQsIDB4ZmM2OGI2ZWQsIDB4NjdiMTBjMGEsIDB4NmFiYTAyMDMsIDB4N2RhNzEwMTgsIDB4NzBhYzFlMTEsIDB4NTM5ZDM0MmUsIDB4NWU5NjNhMjcsIDB4NDk4YjI4M2MsIDB4NDQ4MDI2MzUsIDB4MGZlOTdjNDIsIDB4MDJlMjcyNGIsIDB4MTVmZjYwNTAsIDB4MThmNDZlNTksIDB4M2JjNTQ0NjYsIDB4MzZjZTRhNmYsIDB4MjFkMzU4NzQsIDB4MmNkODU2N2QsIDB4MGM3YTM3YTEsIDB4MDE3MTM5YTgsIDB4MTY2YzJiYjMsIDB4MWI2NzI1YmEsIDB4Mzg1NjBmODUsIDB4MzU1ZDAxOGMsIDB4MjI0MDEzOTcsIDB4MmY0YjFkOWUsIDB4NjQyMjQ3ZTksIDB4NjkyOTQ5ZTAsIDB4N2UzNDViZmIsIDB4NzMzZjU1ZjIsIDB4NTAwZTdmY2QsIDB4NWQwNTcxYzQsIDB4NGExODYzZGYsIDB4NDcxMzZkZDYsIDB4ZGNjYWQ3MzEsIDB4ZDFjMWQ5MzgsIDB4YzZkY2NiMjMsIDB4Y2JkN2M1MmEsIDB4ZThlNmVmMTUsIDB4ZTVlZGUxMWMsIDB4ZjJmMGYzMDcsIDB4ZmZmYmZkMGUsIDB4YjQ5MmE3NzksIDB4Yjk5OWE5NzAsIDB4YWU4NGJiNmIsIDB4YTM4ZmI1NjIsIDB4ODBiZTlmNWQsIDB4OGRiNTkxNTQsIDB4OWFhODgzNGYsIDB4OTdhMzhkNDZdO1xuICAgIHZhciBVNCA9IFsweDAwMDAwMDAwLCAweDA5MGQwYjBlLCAweDEyMWExNjFjLCAweDFiMTcxZDEyLCAweDI0MzQyYzM4LCAweDJkMzkyNzM2LCAweDM2MmUzYTI0LCAweDNmMjMzMTJhLCAweDQ4Njg1ODcwLCAweDQxNjU1MzdlLCAweDVhNzI0ZTZjLCAweDUzN2Y0NTYyLCAweDZjNWM3NDQ4LCAweDY1NTE3ZjQ2LCAweDdlNDY2MjU0LCAweDc3NGI2OTVhLCAweDkwZDBiMGUwLCAweDk5ZGRiYmVlLCAweDgyY2FhNmZjLCAweDhiYzdhZGYyLCAweGI0ZTQ5Y2Q4LCAweGJkZTk5N2Q2LCAweGE2ZmU4YWM0LCAweGFmZjM4MWNhLCAweGQ4YjhlODkwLCAweGQxYjVlMzllLCAweGNhYTJmZThjLCAweGMzYWZmNTgyLCAweGZjOGNjNGE4LCAweGY1ODFjZmE2LCAweGVlOTZkMmI0LCAweGU3OWJkOWJhLCAweDNiYmI3YmRiLCAweDMyYjY3MGQ1LCAweDI5YTE2ZGM3LCAweDIwYWM2NmM5LCAweDFmOGY1N2UzLCAweDE2ODI1Y2VkLCAweDBkOTU0MWZmLCAweDA0OTg0YWYxLCAweDczZDMyM2FiLCAweDdhZGUyOGE1LCAweDYxYzkzNWI3LCAweDY4YzQzZWI5LCAweDU3ZTcwZjkzLCAweDVlZWEwNDlkLCAweDQ1ZmQxOThmLCAweDRjZjAxMjgxLCAweGFiNmJjYjNiLCAweGEyNjZjMDM1LCAweGI5NzFkZDI3LCAweGIwN2NkNjI5LCAweDhmNWZlNzAzLCAweDg2NTJlYzBkLCAweDlkNDVmMTFmLCAweDk0NDhmYTExLCAweGUzMDM5MzRiLCAweGVhMGU5ODQ1LCAweGYxMTk4NTU3LCAweGY4MTQ4ZTU5LCAweGM3MzdiZjczLCAweGNlM2FiNDdkLCAweGQ1MmRhOTZmLCAweGRjMjBhMjYxLCAweDc2NmRmNmFkLCAweDdmNjBmZGEzLCAweDY0NzdlMGIxLCAweDZkN2FlYmJmLCAweDUyNTlkYTk1LCAweDViNTRkMTliLCAweDQwNDNjYzg5LCAweDQ5NGVjNzg3LCAweDNlMDVhZWRkLCAweDM3MDhhNWQzLCAweDJjMWZiOGMxLCAweDI1MTJiM2NmLCAweDFhMzE4MmU1LCAweDEzM2M4OWViLCAweDA4MmI5NGY5LCAweDAxMjY5ZmY3LCAweGU2YmQ0NjRkLCAweGVmYjA0ZDQzLCAweGY0YTc1MDUxLCAweGZkYWE1YjVmLCAweGMyODk2YTc1LCAweGNiODQ2MTdiLCAweGQwOTM3YzY5LCAweGQ5OWU3NzY3LCAweGFlZDUxZTNkLCAweGE3ZDgxNTMzLCAweGJjY2YwODIxLCAweGI1YzIwMzJmLCAweDhhZTEzMjA1LCAweDgzZWMzOTBiLCAweDk4ZmIyNDE5LCAweDkxZjYyZjE3LCAweDRkZDY4ZDc2LCAweDQ0ZGI4Njc4LCAweDVmY2M5YjZhLCAweDU2YzE5MDY0LCAweDY5ZTJhMTRlLCAweDYwZWZhYTQwLCAweDdiZjhiNzUyLCAweDcyZjViYzVjLCAweDA1YmVkNTA2LCAweDBjYjNkZTA4LCAweDE3YTRjMzFhLCAweDFlYTljODE0LCAweDIxOGFmOTNlLCAweDI4ODdmMjMwLCAweDMzOTBlZjIyLCAweDNhOWRlNDJjLCAweGRkMDYzZDk2LCAweGQ0MGIzNjk4LCAweGNmMWMyYjhhLCAweGM2MTEyMDg0LCAweGY5MzIxMWFlLCAweGYwM2YxYWEwLCAweGViMjgwN2IyLCAweGUyMjUwY2JjLCAweDk1NmU2NWU2LCAweDljNjM2ZWU4LCAweDg3NzQ3M2ZhLCAweDhlNzk3OGY0LCAweGIxNWE0OWRlLCAweGI4NTc0MmQwLCAweGEzNDA1ZmMyLCAweGFhNGQ1NGNjLCAweGVjZGFmNzQxLCAweGU1ZDdmYzRmLCAweGZlYzBlMTVkLCAweGY3Y2RlYTUzLCAweGM4ZWVkYjc5LCAweGMxZTNkMDc3LCAweGRhZjRjZDY1LCAweGQzZjljNjZiLCAweGE0YjJhZjMxLCAweGFkYmZhNDNmLCAweGI2YThiOTJkLCAweGJmYTViMjIzLCAweDgwODY4MzA5LCAweDg5OGI4ODA3LCAweDkyOWM5NTE1LCAweDliOTE5ZTFiLCAweDdjMGE0N2ExLCAweDc1MDc0Y2FmLCAweDZlMTA1MWJkLCAweDY3MWQ1YWIzLCAweDU4M2U2Yjk5LCAweDUxMzM2MDk3LCAweDRhMjQ3ZDg1LCAweDQzMjk3NjhiLCAweDM0NjIxZmQxLCAweDNkNmYxNGRmLCAweDI2NzgwOWNkLCAweDJmNzUwMmMzLCAweDEwNTYzM2U5LCAweDE5NWIzOGU3LCAweDAyNGMyNWY1LCAweDBiNDEyZWZiLCAweGQ3NjE4YzlhLCAweGRlNmM4Nzk0LCAweGM1N2I5YTg2LCAweGNjNzY5MTg4LCAweGYzNTVhMGEyLCAweGZhNThhYmFjLCAweGUxNGZiNmJlLCAweGU4NDJiZGIwLCAweDlmMDlkNGVhLCAweDk2MDRkZmU0LCAweDhkMTNjMmY2LCAweDg0MWVjOWY4LCAweGJiM2RmOGQyLCAweGIyMzBmM2RjLCAweGE5MjdlZWNlLCAweGEwMmFlNWMwLCAweDQ3YjEzYzdhLCAweDRlYmMzNzc0LCAweDU1YWIyYTY2LCAweDVjYTYyMTY4LCAweDYzODUxMDQyLCAweDZhODgxYjRjLCAweDcxOWYwNjVlLCAweDc4OTIwZDUwLCAweDBmZDk2NDBhLCAweDA2ZDQ2ZjA0LCAweDFkYzM3MjE2LCAweDE0Y2U3OTE4LCAweDJiZWQ0ODMyLCAweDIyZTA0MzNjLCAweDM5Zjc1ZTJlLCAweDMwZmE1NTIwLCAweDlhYjcwMWVjLCAweDkzYmEwYWUyLCAweDg4YWQxN2YwLCAweDgxYTAxY2ZlLCAweGJlODMyZGQ0LCAweGI3OGUyNmRhLCAweGFjOTkzYmM4LCAweGE1OTQzMGM2LCAweGQyZGY1OTljLCAweGRiZDI1MjkyLCAweGMwYzU0ZjgwLCAweGM5Yzg0NDhlLCAweGY2ZWI3NWE0LCAweGZmZTY3ZWFhLCAweGU0ZjE2M2I4LCAweGVkZmM2OGI2LCAweDBhNjdiMTBjLCAweDAzNmFiYTAyLCAweDE4N2RhNzEwLCAweDExNzBhYzFlLCAweDJlNTM5ZDM0LCAweDI3NWU5NjNhLCAweDNjNDk4YjI4LCAweDM1NDQ4MDI2LCAweDQyMGZlOTdjLCAweDRiMDJlMjcyLCAweDUwMTVmZjYwLCAweDU5MThmNDZlLCAweDY2M2JjNTQ0LCAweDZmMzZjZTRhLCAweDc0MjFkMzU4LCAweDdkMmNkODU2LCAweGExMGM3YTM3LCAweGE4MDE3MTM5LCAweGIzMTY2YzJiLCAweGJhMWI2NzI1LCAweDg1Mzg1NjBmLCAweDhjMzU1ZDAxLCAweDk3MjI0MDEzLCAweDllMmY0YjFkLCAweGU5NjQyMjQ3LCAweGUwNjkyOTQ5LCAweGZiN2UzNDViLCAweGYyNzMzZjU1LCAweGNkNTAwZTdmLCAweGM0NWQwNTcxLCAweGRmNGExODYzLCAweGQ2NDcxMzZkLCAweDMxZGNjYWQ3LCAweDM4ZDFjMWQ5LCAweDIzYzZkY2NiLCAweDJhY2JkN2M1LCAweDE1ZThlNmVmLCAweDFjZTVlZGUxLCAweDA3ZjJmMGYzLCAweDBlZmZmYmZkLCAweDc5YjQ5MmE3LCAweDcwYjk5OWE5LCAweDZiYWU4NGJiLCAweDYyYTM4ZmI1LCAweDVkODBiZTlmLCAweDU0OGRiNTkxLCAweDRmOWFhODgzLCAweDQ2OTdhMzhkXTtcblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0ludDMyKGJ5dGVzKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgICAgXSA8PCAyNCkgfFxuICAgICAgICAgICAgICAgIChieXRlc1tpICsgMV0gPDwgMTYpIHxcbiAgICAgICAgICAgICAgICAoYnl0ZXNbaSArIDJdIDw8ICA4KSB8XG4gICAgICAgICAgICAgICAgIGJ5dGVzW2kgKyAzXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHZhciBBRVMgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEFFUykpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdrZXknLCB7XG4gICAgICAgICAgICB2YWx1ZTogY29lcmNlQXJyYXkoa2V5LCB0cnVlKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9wcmVwYXJlKCk7XG4gICAgfVxuXG5cbiAgICBBRVMucHJvdG90eXBlLl9wcmVwYXJlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHJvdW5kcyA9IG51bWJlck9mUm91bmRzW3RoaXMua2V5Lmxlbmd0aF07XG4gICAgICAgIGlmIChyb3VuZHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGtleSBzaXplIChtdXN0IGJlIDE2LCAyNCBvciAzMiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuY3J5cHRpb24gcm91bmQga2V5c1xuICAgICAgICB0aGlzLl9LZSA9IFtdO1xuXG4gICAgICAgIC8vIGRlY3J5cHRpb24gcm91bmQga2V5c1xuICAgICAgICB0aGlzLl9LZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHJvdW5kczsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9LZS5wdXNoKFswLCAwLCAwLCAwXSk7XG4gICAgICAgICAgICB0aGlzLl9LZC5wdXNoKFswLCAwLCAwLCAwXSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRLZXlDb3VudCA9IChyb3VuZHMgKyAxKSAqIDQ7XG4gICAgICAgIHZhciBLQyA9IHRoaXMua2V5Lmxlbmd0aCAvIDQ7XG5cbiAgICAgICAgLy8gY29udmVydCB0aGUga2V5IGludG8gaW50c1xuICAgICAgICB2YXIgdGsgPSBjb252ZXJ0VG9JbnQzMih0aGlzLmtleSk7XG5cbiAgICAgICAgLy8gY29weSB2YWx1ZXMgaW50byByb3VuZCBrZXkgYXJyYXlzXG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBLQzsgaSsrKSB7XG4gICAgICAgICAgICBpbmRleCA9IGkgPj4gMjtcbiAgICAgICAgICAgIHRoaXMuX0tlW2luZGV4XVtpICUgNF0gPSB0a1tpXTtcbiAgICAgICAgICAgIHRoaXMuX0tkW3JvdW5kcyAtIGluZGV4XVtpICUgNF0gPSB0a1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtleSBleHBhbnNpb24gKGZpcHMtMTk3IHNlY3Rpb24gNS4yKVxuICAgICAgICB2YXIgcmNvbnBvaW50ZXIgPSAwO1xuICAgICAgICB2YXIgdCA9IEtDLCB0dDtcbiAgICAgICAgd2hpbGUgKHQgPCByb3VuZEtleUNvdW50KSB7XG4gICAgICAgICAgICB0dCA9IHRrW0tDIC0gMV07XG4gICAgICAgICAgICB0a1swXSBePSAoKFNbKHR0ID4+IDE2KSAmIDB4RkZdIDw8IDI0KSBeXG4gICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+ICA4KSAmIDB4RkZdIDw8IDE2KSBeXG4gICAgICAgICAgICAgICAgICAgICAgKFNbIHR0ICAgICAgICAmIDB4RkZdIDw8ICA4KSBeXG4gICAgICAgICAgICAgICAgICAgICAgIFNbKHR0ID4+IDI0KSAmIDB4RkZdICAgICAgICBeXG4gICAgICAgICAgICAgICAgICAgICAgKHJjb25bcmNvbnBvaW50ZXJdIDw8IDI0KSk7XG4gICAgICAgICAgICByY29ucG9pbnRlciArPSAxO1xuXG4gICAgICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIChmb3Igbm9uLTI1NiBiaXQpXG4gICAgICAgICAgICBpZiAoS0MgIT0gOCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIGZvciAyNTYtYml0IGtleXMgaXMgXCJzbGlnaHRseSBkaWZmZXJlbnRcIiAoZmlwcy0xOTcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgKEtDIC8gMik7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR0ID0gdGtbKEtDIC8gMikgLSAxXTtcblxuICAgICAgICAgICAgICAgIHRrW0tDIC8gMl0gXj0gKFNbIHR0ICAgICAgICAmIDB4RkZdICAgICAgICBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gIDgpICYgMHhGRl0gPDwgIDgpIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAxNikgJiAweEZGXSA8PCAxNikgXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+IDI0KSAmIDB4RkZdIDw8IDI0KSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gKEtDIC8gMikgKyAxOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb3B5IHZhbHVlcyBpbnRvIHJvdW5kIGtleSBhcnJheXNcbiAgICAgICAgICAgIHZhciBpID0gMCwgciwgYztcbiAgICAgICAgICAgIHdoaWxlIChpIDwgS0MgJiYgdCA8IHJvdW5kS2V5Q291bnQpIHtcbiAgICAgICAgICAgICAgICByID0gdCA+PiAyO1xuICAgICAgICAgICAgICAgIGMgPSB0ICUgNDtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZVtyXVtjXSA9IHRrW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JvdW5kcyAtIHJdW2NdID0gdGtbaSsrXTtcbiAgICAgICAgICAgICAgICB0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbnZlcnNlLWNpcGhlci1pZnkgdGhlIGRlY3J5cHRpb24gcm91bmQga2V5IChmaXBzLTE5NyBzZWN0aW9uIDUuMylcbiAgICAgICAgZm9yICh2YXIgciA9IDE7IHIgPCByb3VuZHM7IHIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCA0OyBjKyspIHtcbiAgICAgICAgICAgICAgICB0dCA9IHRoaXMuX0tkW3JdW2NdO1xuICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JdW2NdID0gKFUxWyh0dCA+PiAyNCkgJiAweEZGXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVTJbKHR0ID4+IDE2KSAmIDB4RkZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVM1sodHQgPj4gIDgpICYgMHhGRl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFU0WyB0dCAgICAgICAgJiAweEZGXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBBRVMucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgaWYgKHBsYWludGV4dC5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3VuZHMgPSB0aGlzLl9LZS5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgYSA9IFswLCAwLCAwLCAwXTtcblxuICAgICAgICAvLyBjb252ZXJ0IHBsYWludGV4dCB0byAoaW50cyBeIGtleSlcbiAgICAgICAgdmFyIHQgPSBjb252ZXJ0VG9JbnQzMihwbGFpbnRleHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdFtpXSBePSB0aGlzLl9LZVswXVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IHJvdW5kIHRyYW5zZm9ybXNcbiAgICAgICAgZm9yICh2YXIgciA9IDE7IHIgPCByb3VuZHM7IHIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gKFQxWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUMlsodFsoaSArIDEpICUgNF0gPj4gMTYpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDNbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ0WyB0WyhpICsgMykgJSA0XSAgICAgICAgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9LZVtyXVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gYS5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGxhc3Qgcm91bmQgaXMgc3BlY2lhbFxuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkoMTYpLCB0dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHR0ID0gdGhpcy5fS2Vbcm91bmRzXVtpXTtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSAgICBdID0gKFNbKHRbIGkgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF4gKHR0ID4+IDI0KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMV0gPSAoU1sodFsoaSArIDEpICUgNF0gPj4gMTYpICYgMHhmZl0gXiAodHQgPj4gMTYpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAyXSA9IChTWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeICh0dCA+PiAgOCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDNdID0gKFNbIHRbKGkgKyAzKSAlIDRdICAgICAgICAmIDB4ZmZdIF4gIHR0ICAgICAgICkgJiAweGZmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBBRVMucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGlmIChjaXBoZXJ0ZXh0Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3VuZHMgPSB0aGlzLl9LZC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgYSA9IFswLCAwLCAwLCAwXTtcblxuICAgICAgICAvLyBjb252ZXJ0IHBsYWludGV4dCB0byAoaW50cyBeIGtleSlcbiAgICAgICAgdmFyIHQgPSBjb252ZXJ0VG9JbnQzMihjaXBoZXJ0ZXh0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHRbaV0gXj0gdGhpcy5fS2RbMF1baV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSByb3VuZCB0cmFuc2Zvcm1zXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IChUNVsodFsgaSAgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ2Wyh0WyhpICsgMykgJSA0XSA+PiAxNikgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUN1sodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDhbIHRbKGkgKyAxKSAlIDRdICAgICAgICAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSBhLnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgbGFzdCByb3VuZCBpcyBzcGVjaWFsXG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheSgxNiksIHR0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdHQgPSB0aGlzLl9LZFtyb3VuZHNdW2ldO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICAgIF0gPSAoU2lbKHRbIGkgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF4gKHR0ID4+IDI0KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMV0gPSAoU2lbKHRbKGkgKyAzKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF4gKHR0ID4+IDE2KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMl0gPSAoU2lbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF4gKHR0ID4+ICA4KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgM10gPSAoU2lbIHRbKGkgKyAxKSAlIDRdICAgICAgICAmIDB4ZmZdIF4gIHR0ICAgICAgICkgJiAweGZmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIEVsZWN0b25pYyBDb2RlYm9vayAoRUNCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25FQ0IgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkVDQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiRWxlY3Ryb25pYyBDb2RlIEJsb2NrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiZWNiXCI7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkVDQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBwbGFpbnRleHQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQpO1xuXG4gICAgICAgIGlmICgocGxhaW50ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHBsYWludGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBjcmVhdGVBcnJheShwbGFpbnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhaW50ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KHBsYWludGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5lbmNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShibG9jaywgY2lwaGVydGV4dCwgaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25FQ0IucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGNpcGhlcnRleHQgPSBjb2VyY2VBcnJheShjaXBoZXJ0ZXh0KTtcblxuICAgICAgICBpZiAoKGNpcGhlcnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYWludGV4dCA9IGNyZWF0ZUFycmF5KGNpcGhlcnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2lwaGVydGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fYWVzLmRlY3J5cHQoYmxvY2spO1xuICAgICAgICAgICAgY29weUFycmF5KGJsb2NrLCBwbGFpbnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIENpcGhlciBCbG9jayBDaGFpbmluZyAoQ0JDKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DQkMgPSBmdW5jdGlvbihrZXksIGl2KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25DQkMpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkNpcGhlciBCbG9jayBDaGFpbmluZ1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImNiY1wiO1xuXG4gICAgICAgIGlmICghaXYpIHtcbiAgICAgICAgICAgIGl2ID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXYubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5pdGlhbGF0aW9uIHZlY3RvciBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdENpcGhlcmJsb2NrID0gY29lcmNlQXJyYXkoaXYsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DQkMucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkocGxhaW50ZXh0KTtcblxuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gY3JlYXRlQXJyYXkocGxhaW50ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShwbGFpbnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBibG9ja1tqXSBePSB0aGlzLl9sYXN0Q2lwaGVyYmxvY2tbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RDaXBoZXJibG9jayA9IHRoaXMuX2Flcy5lbmNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9sYXN0Q2lwaGVyYmxvY2ssIGNpcGhlcnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0JDLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBjaXBoZXJ0ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCk7XG5cbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFpbnRleHQgPSBjcmVhdGVBcnJheShjaXBoZXJ0ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNpcGhlcnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5kZWNyeXB0KGJsb2NrKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0W2kgKyBqXSA9IGJsb2NrW2pdIF4gdGhpcy5fbGFzdENpcGhlcmJsb2NrW2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgdGhpcy5fbGFzdENpcGhlcmJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIENpcGhlciBGZWVkYmFjayAoQ0ZCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DRkIgPSBmdW5jdGlvbihrZXksIGl2LCBzZWdtZW50U2l6ZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ0ZCKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDaXBoZXIgRmVlZGJhY2tcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJjZmJcIjtcblxuICAgICAgICBpZiAoIWl2KSB7XG4gICAgICAgICAgICBpdiA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGl2Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluaXRpYWxhdGlvbiB2ZWN0b3Igc2l6ZSAobXVzdCBiZSAxNiBzaXplKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWdtZW50U2l6ZSkgeyBzZWdtZW50U2l6ZSA9IDE7IH1cblxuICAgICAgICB0aGlzLnNlZ21lbnRTaXplID0gc2VnbWVudFNpemU7XG5cbiAgICAgICAgdGhpcy5fc2hpZnRSZWdpc3RlciA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0ZCLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIGlmICgocGxhaW50ZXh0Lmxlbmd0aCAlIHRoaXMuc2VnbWVudFNpemUpICE9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBzZWdtZW50U2l6ZSBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIHZhciB4b3JTZWdtZW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkgKz0gdGhpcy5zZWdtZW50U2l6ZSkge1xuICAgICAgICAgICAgeG9yU2VnbWVudCA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX3NoaWZ0UmVnaXN0ZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNlZ21lbnRTaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWRbaSArIGpdIF49IHhvclNlZ21lbnRbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IHRoZSByZWdpc3RlclxuICAgICAgICAgICAgY29weUFycmF5KHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDAsIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICAgICAgY29weUFycmF5KGVuY3J5cHRlZCwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMTYgLSB0aGlzLnNlZ21lbnRTaXplLCBpLCBpICsgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNGQi5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIHRoaXMuc2VnbWVudFNpemUpICE9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgc2VnbWVudFNpemUgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHhvclNlZ21lbnQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhaW50ZXh0Lmxlbmd0aDsgaSArPSB0aGlzLnNlZ21lbnRTaXplKSB7XG4gICAgICAgICAgICB4b3JTZWdtZW50ID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fc2hpZnRSZWdpc3Rlcik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zZWdtZW50U2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0W2kgKyBqXSBePSB4b3JTZWdtZW50W2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTaGlmdCB0aGUgcmVnaXN0ZXJcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9zaGlmdFJlZ2lzdGVyLCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAwLCB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAxNiAtIHRoaXMuc2VnbWVudFNpemUsIGksIGkgKyB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gT3V0cHV0IEZlZWRiYWNrIChPRkIpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbk9GQiA9IGZ1bmN0aW9uKGtleSwgaXYpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbk9GQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiT3V0cHV0IEZlZWRiYWNrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwib2ZiXCI7XG5cbiAgICAgICAgaWYgKCFpdikge1xuICAgICAgICAgICAgaXYgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpdi5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbml0aWFsYXRpb24gdmVjdG9yIHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVyID0gY29lcmNlQXJyYXkoaXYsIHRydWUpO1xuICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXggPSAxNjtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jcnlwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID09PSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RQcmVjaXBoZXIgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9sYXN0UHJlY2lwaGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5jcnlwdGVkW2ldIF49IHRoaXMuX2xhc3RQcmVjaXBoZXJbdGhpcy5fbGFzdFByZWNpcGhlckluZGV4KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyBEZWNyeXB0aW9uIGlzIHN5bWV0cmljXG4gICAgTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5kZWNyeXB0ID0gTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5lbmNyeXB0O1xuXG5cbiAgICAvKipcbiAgICAgKiAgQ291bnRlciBvYmplY3QgZm9yIENUUiBjb21tb24gbW9kZSBvZiBvcGVyYXRpb25cbiAgICAgKi9cbiAgICB2YXIgQ291bnRlciA9IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ291bnRlcikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDb3VudGVyIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGFsbG93IDAsIGJ1dCBhbnl0aGluZyBmYWxzZS1pc2ggdXNlcyB0aGUgZGVmYXVsdCAxXG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgIT09IDAgJiYgIWluaXRpYWxWYWx1ZSkgeyBpbml0aWFsVmFsdWUgPSAxOyB9XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbml0aWFsVmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fY291bnRlciA9IGNyZWF0ZUFycmF5KDE2KTtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoaW5pdGlhbFZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRCeXRlcyhpbml0aWFsVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQ291bnRlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSAhPT0gJ251bWJlcicgfHwgcGFyc2VJbnQodmFsdWUpICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY291bnRlciB2YWx1ZSAobXVzdCBiZSBhbiBpbnRlZ2VyKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgY2Fubm90IHNhZmVseSBoYW5kbGUgbnVtYmVycyBiZXlvbmQgdGhlIHNhZmUgcmFuZ2UgZm9yIGludGVnZXJzXG4gICAgICAgIGlmICh2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludGVnZXIgdmFsdWUgb3V0IG9mIHNhZmUgcmFuZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTU7IGluZGV4ID49IDA7IC0taW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ZXJbaW5kZXhdID0gdmFsdWUgJSAyNTY7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlIC8gMjU2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvdW50ZXIucHJvdG90eXBlLnNldEJ5dGVzID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgYnl0ZXMgPSBjb2VyY2VBcnJheShieXRlcywgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGJ5dGVzLmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNvdW50ZXIgYnl0ZXMgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSBieXRlcztcbiAgICB9O1xuXG4gICAgQ291bnRlci5wcm90b3R5cGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxNTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb3VudGVyW2ldID09PSAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyW2ldID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcltpXSsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDb3VudGVyIChDVFIpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbkNUUiA9IGZ1bmN0aW9uKGtleSwgY291bnRlcikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ1RSKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDb3VudGVyXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY3RyXCI7XG5cbiAgICAgICAgaWYgKCEoY291bnRlciBpbnN0YW5jZW9mIENvdW50ZXIpKSB7XG4gICAgICAgICAgICBjb3VudGVyID0gbmV3IENvdW50ZXIoY291bnRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSBjb3VudGVyO1xuXG4gICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXggPSAxNjtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jcnlwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID09PSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXIgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9jb3VudGVyLl9jb3VudGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIuaW5jcmVtZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmNyeXB0ZWRbaV0gXj0gdGhpcy5fcmVtYWluaW5nQ291bnRlclt0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXgrK107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkO1xuICAgIH1cblxuICAgIC8vIERlY3J5cHRpb24gaXMgc3ltZXRyaWNcbiAgICBNb2RlT2ZPcGVyYXRpb25DVFIucHJvdG90eXBlLmRlY3J5cHQgPSBNb2RlT2ZPcGVyYXRpb25DVFIucHJvdG90eXBlLmVuY3J5cHQ7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gUGFkZGluZ1xuXG4gICAgLy8gU2VlOmh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyMzE1XG4gICAgZnVuY3Rpb24gcGtjczdwYWQoZGF0YSkge1xuICAgICAgICBkYXRhID0gY29lcmNlQXJyYXkoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIHZhciBwYWRkZXIgPSAxNiAtIChkYXRhLmxlbmd0aCAlIDE2KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KGRhdGEubGVuZ3RoICsgcGFkZGVyKTtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIHJlc3VsdCk7XG4gICAgICAgIGZvciAodmFyIGkgPSBkYXRhLmxlbmd0aDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gcGFkZGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGtjczdzdHJpcChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBjb2VyY2VBcnJheShkYXRhLCB0cnVlKTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgMTYpIHsgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgaW52YWxpZCBsZW5ndGgnKTsgfVxuXG4gICAgICAgIHZhciBwYWRkZXIgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChwYWRkZXIgPiAxNikgeyB0aHJvdyBuZXcgRXJyb3IoJ1BLQ1MjNyBwYWRkaW5nIGJ5dGUgb3V0IG9mIHJhbmdlJyk7IH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGggLSBwYWRkZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkZGVyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2xlbmd0aCArIGldICE9PSBwYWRkZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BLQ1MjNyBpbnZhbGlkIHBhZGRpbmcgYnl0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KGxlbmd0aCk7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCByZXN1bHQsIDAsIDAsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFeHBvcnRpbmdcblxuXG4gICAgLy8gVGhlIGJsb2NrIGNpcGhlclxuICAgIHZhciBhZXNqcyA9IHtcbiAgICAgICAgQUVTOiBBRVMsXG4gICAgICAgIENvdW50ZXI6IENvdW50ZXIsXG5cbiAgICAgICAgTW9kZU9mT3BlcmF0aW9uOiB7XG4gICAgICAgICAgICBlY2I6IE1vZGVPZk9wZXJhdGlvbkVDQixcbiAgICAgICAgICAgIGNiYzogTW9kZU9mT3BlcmF0aW9uQ0JDLFxuICAgICAgICAgICAgY2ZiOiBNb2RlT2ZPcGVyYXRpb25DRkIsXG4gICAgICAgICAgICBvZmI6IE1vZGVPZk9wZXJhdGlvbk9GQixcbiAgICAgICAgICAgIGN0cjogTW9kZU9mT3BlcmF0aW9uQ1RSXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXRpbHM6IHtcbiAgICAgICAgICAgIGhleDogY29udmVydEhleCxcbiAgICAgICAgICAgIHV0Zjg6IGNvbnZlcnRVdGY4XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFkZGluZzoge1xuICAgICAgICAgICAgcGtjczc6IHtcbiAgICAgICAgICAgICAgICBwYWQ6IHBrY3M3cGFkLFxuICAgICAgICAgICAgICAgIHN0cmlwOiBwa2NzN3N0cmlwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FycmF5VGVzdDoge1xuICAgICAgICAgICAgY29lcmNlQXJyYXk6IGNvZXJjZUFycmF5LFxuICAgICAgICAgICAgY3JlYXRlQXJyYXk6IGNyZWF0ZUFycmF5LFxuICAgICAgICAgICAgY29weUFycmF5OiBjb3B5QXJyYXksXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBub2RlLmpzXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGFlc2pzXG5cbiAgICAvLyBSZXF1aXJlSlMvQU1EXG4gICAgLy8gaHR0cDovL3d3dy5yZXF1aXJlanMub3JnL2RvY3MvYXBpLmh0bWxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW1kanMvYW1kanMtYXBpL3dpa2kvQU1EXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoZGVmaW5lKSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShhZXNqcyk7XG5cbiAgICAvLyBXZWIgQnJvd3NlcnNcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBsaWJyYXJ5IGF0IFwiYWVzanNcIiBtYWtlIHN1cmUgaXQncyBzdGlsbCBhdmFpbGFibGVcbiAgICAgICAgaWYgKHJvb3QuYWVzanMpIHtcbiAgICAgICAgICAgIGFlc2pzLl9hZXNqcyA9IHJvb3QuYWVzanM7XG4gICAgICAgIH1cblxuICAgICAgICByb290LmFlc2pzID0gYWVzanM7XG4gICAgfVxuXG5cbn0pKHRoaXMpO1xuIiwiLypcbiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNIQSBmYW1pbHkgb2YgaGFzaGVzLCBhc1xuIGRlZmluZWQgaW4gRklQUyBQVUIgMTgwLTQgYW5kIEZJUFMgUFVCIDIwMiwgYXMgd2VsbCBhcyB0aGUgY29ycmVzcG9uZGluZ1xuIEhNQUMgaW1wbGVtZW50YXRpb24gYXMgZGVmaW5lZCBpbiBGSVBTIFBVQiAxOThhXG5cbiBDb3B5cmlnaHQgQnJpYW4gVHVyZWsgMjAwOC0yMDE3XG4gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gU2VlIGh0dHA6Ly9jYWxpZ2F0aW8uZ2l0aHViLmNvbS9qc1NIQS8gZm9yIG1vcmUgaW5mb3JtYXRpb25cblxuIFNldmVyYWwgZnVuY3Rpb25zIHRha2VuIGZyb20gUGF1bCBKb2huc3RvblxuKi9cbid1c2Ugc3RyaWN0JzsoZnVuY3Rpb24oWSl7ZnVuY3Rpb24gQyhjLGEsYil7dmFyIGU9MCxoPVtdLG49MCxnLGwsZCxmLG0scSx1LHIsST0hMSx2PVtdLHc9W10sdCx5PSExLHo9ITEseD0tMTtiPWJ8fHt9O2c9Yi5lbmNvZGluZ3x8XCJVVEY4XCI7dD1iLm51bVJvdW5kc3x8MTtpZih0IT09cGFyc2VJbnQodCwxMCl8fDE+dCl0aHJvdyBFcnJvcihcIm51bVJvdW5kcyBtdXN0IGEgaW50ZWdlciA+PSAxXCIpO2lmKFwiU0hBLTFcIj09PWMpbT01MTIscT1LLHU9WixmPTE2MCxyPWZ1bmN0aW9uKGEpe3JldHVybiBhLnNsaWNlKCl9O2Vsc2UgaWYoMD09PWMubGFzdEluZGV4T2YoXCJTSEEtXCIsMCkpaWYocT1mdW5jdGlvbihhLGIpe3JldHVybiBMKGEsYixjKX0sdT1mdW5jdGlvbihhLGIsaCxlKXt2YXIgayxmO2lmKFwiU0hBLTIyNFwiPT09Y3x8XCJTSEEtMjU2XCI9PT1jKWs9KGIrNjU+Pj45PDw0KSsxNSxmPTE2O2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jfHxcIlNIQS01MTJcIj09PWMpaz0oYisxMjk+Pj4xMDw8XG41KSszMSxmPTMyO2Vsc2UgdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIFNIQS0yIGltcGxlbWVudGF0aW9uXCIpO2Zvcig7YS5sZW5ndGg8PWs7KWEucHVzaCgwKTthW2I+Pj41XXw9MTI4PDwyNC1iJTMyO2I9YitoO2Fba109YiY0Mjk0OTY3Mjk1O2Fbay0xXT1iLzQyOTQ5NjcyOTZ8MDtoPWEubGVuZ3RoO2ZvcihiPTA7YjxoO2IrPWYpZT1MKGEuc2xpY2UoYixiK2YpLGUsYyk7aWYoXCJTSEEtMjI0XCI9PT1jKWE9W2VbMF0sZVsxXSxlWzJdLGVbM10sZVs0XSxlWzVdLGVbNl1dO2Vsc2UgaWYoXCJTSEEtMjU2XCI9PT1jKWE9ZTtlbHNlIGlmKFwiU0hBLTM4NFwiPT09YylhPVtlWzBdLmEsZVswXS5iLGVbMV0uYSxlWzFdLmIsZVsyXS5hLGVbMl0uYixlWzNdLmEsZVszXS5iLGVbNF0uYSxlWzRdLmIsZVs1XS5hLGVbNV0uYl07ZWxzZSBpZihcIlNIQS01MTJcIj09PWMpYT1bZVswXS5hLGVbMF0uYixlWzFdLmEsZVsxXS5iLGVbMl0uYSxlWzJdLmIsZVszXS5hLGVbM10uYixlWzRdLmEsXG5lWzRdLmIsZVs1XS5hLGVbNV0uYixlWzZdLmEsZVs2XS5iLGVbN10uYSxlWzddLmJdO2Vsc2UgdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIFNIQS0yIGltcGxlbWVudGF0aW9uXCIpO3JldHVybiBhfSxyPWZ1bmN0aW9uKGEpe3JldHVybiBhLnNsaWNlKCl9LFwiU0hBLTIyNFwiPT09YyltPTUxMixmPTIyNDtlbHNlIGlmKFwiU0hBLTI1NlwiPT09YyltPTUxMixmPTI1NjtlbHNlIGlmKFwiU0hBLTM4NFwiPT09YyltPTEwMjQsZj0zODQ7ZWxzZSBpZihcIlNIQS01MTJcIj09PWMpbT0xMDI0LGY9NTEyO2Vsc2UgdGhyb3cgRXJyb3IoXCJDaG9zZW4gU0hBIHZhcmlhbnQgaXMgbm90IHN1cHBvcnRlZFwiKTtlbHNlIGlmKDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBMy1cIiwwKXx8MD09PWMubGFzdEluZGV4T2YoXCJTSEFLRVwiLDApKXt2YXIgRj02O3E9RDtyPWZ1bmN0aW9uKGEpe3ZhciBjPVtdLGU7Zm9yKGU9MDs1PmU7ZSs9MSljW2VdPWFbZV0uc2xpY2UoKTtyZXR1cm4gY307eD0xO2lmKFwiU0hBMy0yMjRcIj09PVxuYyltPTExNTIsZj0yMjQ7ZWxzZSBpZihcIlNIQTMtMjU2XCI9PT1jKW09MTA4OCxmPTI1NjtlbHNlIGlmKFwiU0hBMy0zODRcIj09PWMpbT04MzIsZj0zODQ7ZWxzZSBpZihcIlNIQTMtNTEyXCI9PT1jKW09NTc2LGY9NTEyO2Vsc2UgaWYoXCJTSEFLRTEyOFwiPT09YyltPTEzNDQsZj0tMSxGPTMxLHo9ITA7ZWxzZSBpZihcIlNIQUtFMjU2XCI9PT1jKW09MTA4OCxmPS0xLEY9MzEsej0hMDtlbHNlIHRocm93IEVycm9yKFwiQ2hvc2VuIFNIQSB2YXJpYW50IGlzIG5vdCBzdXBwb3J0ZWRcIik7dT1mdW5jdGlvbihhLGMsZSxiLGgpe2U9bTt2YXIgaz1GLGYsZz1bXSxuPWU+Pj41LGw9MCxkPWM+Pj41O2ZvcihmPTA7ZjxkJiZjPj1lO2YrPW4pYj1EKGEuc2xpY2UoZixmK24pLGIpLGMtPWU7YT1hLnNsaWNlKGYpO2ZvcihjJT1lO2EubGVuZ3RoPG47KWEucHVzaCgwKTtmPWM+Pj4zO2FbZj4+Ml1ePWs8PGYlNCo4O2Fbbi0xXV49MjE0NzQ4MzY0ODtmb3IoYj1EKGEsYik7MzIqZy5sZW5ndGg8aDspe2E9YltsJVxuNV1bbC81fDBdO2cucHVzaChhLmIpO2lmKDMyKmcubGVuZ3RoPj1oKWJyZWFrO2cucHVzaChhLmEpO2wrPTE7MD09PTY0KmwlZSYmRChudWxsLGIpfXJldHVybiBnfX1lbHNlIHRocm93IEVycm9yKFwiQ2hvc2VuIFNIQSB2YXJpYW50IGlzIG5vdCBzdXBwb3J0ZWRcIik7ZD1NKGEsZyx4KTtsPUEoYyk7dGhpcy5zZXRITUFDS2V5PWZ1bmN0aW9uKGEsYixoKXt2YXIgaztpZighMD09PUkpdGhyb3cgRXJyb3IoXCJITUFDIGtleSBhbHJlYWR5IHNldFwiKTtpZighMD09PXkpdGhyb3cgRXJyb3IoXCJDYW5ub3Qgc2V0IEhNQUMga2V5IGFmdGVyIGNhbGxpbmcgdXBkYXRlXCIpO2lmKCEwPT09eil0aHJvdyBFcnJvcihcIlNIQUtFIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEhNQUNcIik7Zz0oaHx8e30pLmVuY29kaW5nfHxcIlVURjhcIjtiPU0oYixnLHgpKGEpO2E9Yi5iaW5MZW47Yj1iLnZhbHVlO2s9bT4+PjM7aD1rLzQtMTtpZihrPGEvOCl7Zm9yKGI9dShiLGEsMCxBKGMpLGYpO2IubGVuZ3RoPD1oOyliLnB1c2goMCk7XG5iW2hdJj00Mjk0OTY3MDQwfWVsc2UgaWYoaz5hLzgpe2Zvcig7Yi5sZW5ndGg8PWg7KWIucHVzaCgwKTtiW2hdJj00Mjk0OTY3MDQwfWZvcihhPTA7YTw9aDthKz0xKXZbYV09YlthXV45MDk1MjI0ODYsd1thXT1iW2FdXjE1NDk1NTY4Mjg7bD1xKHYsbCk7ZT1tO0k9ITB9O3RoaXMudXBkYXRlPWZ1bmN0aW9uKGEpe3ZhciBjLGIsayxmPTAsZz1tPj4+NTtjPWQoYSxoLG4pO2E9Yy5iaW5MZW47Yj1jLnZhbHVlO2M9YT4+PjU7Zm9yKGs9MDtrPGM7ays9ZylmK208PWEmJihsPXEoYi5zbGljZShrLGsrZyksbCksZis9bSk7ZSs9ZjtoPWIuc2xpY2UoZj4+PjUpO249YSVtO3k9ITB9O3RoaXMuZ2V0SGFzaD1mdW5jdGlvbihhLGIpe3ZhciBrLGcsZCxtO2lmKCEwPT09SSl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhhc2ggYWZ0ZXIgc2V0dGluZyBITUFDIGtleVwiKTtkPU4oYik7aWYoITA9PT16KXtpZigtMT09PWQuc2hha2VMZW4pdGhyb3cgRXJyb3IoXCJzaGFrZUxlbiBtdXN0IGJlIHNwZWNpZmllZCBpbiBvcHRpb25zXCIpO1xuZj1kLnNoYWtlTGVufXN3aXRjaChhKXtjYXNlIFwiSEVYXCI6az1mdW5jdGlvbihhKXtyZXR1cm4gTyhhLGYseCxkKX07YnJlYWs7Y2FzZSBcIkI2NFwiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIFAoYSxmLHgsZCl9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIFEoYSxmLHgpfTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7Zz1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2gocCl7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWs9ZnVuY3Rpb24oYSl7cmV0dXJuIFIoYSxmLHgpfTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTt9bT11KGguc2xpY2UoKSxuLGUscihsKSxmKTtmb3IoZz0xO2c8dDtnKz0xKSEwPT09eiYmMCE9PWYlMzImJihtW20ubGVuZ3RoLTFdJj0xNjc3NzIxNT4+PjI0LWYlMzIpLG09dShtLGYsXG4wLEEoYyksZik7cmV0dXJuIGsobSl9O3RoaXMuZ2V0SE1BQz1mdW5jdGlvbihhLGIpe3ZhciBrLGcsZCxwO2lmKCExPT09SSl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhNQUMgd2l0aG91dCBmaXJzdCBzZXR0aW5nIEhNQUMga2V5XCIpO2Q9TihiKTtzd2l0Y2goYSl7Y2FzZSBcIkhFWFwiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIE8oYSxmLHgsZCl9O2JyZWFrO2Nhc2UgXCJCNjRcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBQKGEsZix4LGQpfTticmVhaztjYXNlIFwiQllURVNcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBRKGEsZix4KX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2s9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKHYpe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31rPWZ1bmN0aW9uKGEpe3JldHVybiBSKGEsZix4KX07YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcIm91dHB1dEZvcm1hdCBtdXN0IGJlIEhFWCwgQjY0LCBCWVRFUywgb3IgQVJSQVlCVUZGRVJcIik7XG59Zz11KGguc2xpY2UoKSxuLGUscihsKSxmKTtwPXEodyxBKGMpKTtwPXUoZyxmLG0scCxmKTtyZXR1cm4gayhwKX19ZnVuY3Rpb24gYihjLGEpe3RoaXMuYT1jO3RoaXMuYj1hfWZ1bmN0aW9uIE8oYyxhLGIsZSl7dmFyIGg9XCJcIjthLz04O3ZhciBuLGcsZDtkPS0xPT09Yj8zOjA7Zm9yKG49MDtuPGE7bis9MSlnPWNbbj4+PjJdPj4+OCooZCtuJTQqYiksaCs9XCIwMTIzNDU2Nzg5YWJjZGVmXCIuY2hhckF0KGc+Pj40JjE1KStcIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZyYxNSk7cmV0dXJuIGUub3V0cHV0VXBwZXI/aC50b1VwcGVyQ2FzZSgpOmh9ZnVuY3Rpb24gUChjLGEsYixlKXt2YXIgaD1cIlwiLG49YS84LGcsZCxwLGY7Zj0tMT09PWI/MzowO2ZvcihnPTA7ZzxuO2crPTMpZm9yKGQ9ZysxPG4/Y1tnKzE+Pj4yXTowLHA9ZysyPG4/Y1tnKzI+Pj4yXTowLHA9KGNbZz4+PjJdPj4+OCooZitnJTQqYikmMjU1KTw8MTZ8KGQ+Pj44KihmKyhnKzEpJTQqYikmMjU1KTw8OHxwPj4+OCooZitcbihnKzIpJTQqYikmMjU1LGQ9MDs0PmQ7ZCs9MSk4KmcrNipkPD1hP2grPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmNoYXJBdChwPj4+NiooMy1kKSY2Myk6aCs9ZS5iNjRQYWQ7cmV0dXJuIGh9ZnVuY3Rpb24gUShjLGEsYil7dmFyIGU9XCJcIjthLz04O3ZhciBoLGQsZztnPS0xPT09Yj8zOjA7Zm9yKGg9MDtoPGE7aCs9MSlkPWNbaD4+PjJdPj4+OCooZytoJTQqYikmMjU1LGUrPVN0cmluZy5mcm9tQ2hhckNvZGUoZCk7cmV0dXJuIGV9ZnVuY3Rpb24gUihjLGEsYil7YS89ODt2YXIgZSxoPW5ldyBBcnJheUJ1ZmZlcihhKSxkLGc7Zz1uZXcgVWludDhBcnJheShoKTtkPS0xPT09Yj8zOjA7Zm9yKGU9MDtlPGE7ZSs9MSlnW2VdPWNbZT4+PjJdPj4+OCooZCtlJTQqYikmMjU1O3JldHVybiBofWZ1bmN0aW9uIE4oYyl7dmFyIGE9e291dHB1dFVwcGVyOiExLGI2NFBhZDpcIj1cIixzaGFrZUxlbjotMX07Yz1jfHx7fTtcbmEub3V0cHV0VXBwZXI9Yy5vdXRwdXRVcHBlcnx8ITE7ITA9PT1jLmhhc093blByb3BlcnR5KFwiYjY0UGFkXCIpJiYoYS5iNjRQYWQ9Yy5iNjRQYWQpO2lmKCEwPT09Yy5oYXNPd25Qcm9wZXJ0eShcInNoYWtlTGVuXCIpKXtpZigwIT09Yy5zaGFrZUxlbiU4KXRocm93IEVycm9yKFwic2hha2VMZW4gbXVzdCBiZSBhIG11bHRpcGxlIG9mIDhcIik7YS5zaGFrZUxlbj1jLnNoYWtlTGVufWlmKFwiYm9vbGVhblwiIT09dHlwZW9mIGEub3V0cHV0VXBwZXIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG91dHB1dFVwcGVyIGZvcm1hdHRpbmcgb3B0aW9uXCIpO2lmKFwic3RyaW5nXCIhPT10eXBlb2YgYS5iNjRQYWQpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGI2NFBhZCBmb3JtYXR0aW5nIG9wdGlvblwiKTtyZXR1cm4gYX1mdW5jdGlvbiBNKGMsYSxiKXtzd2l0Y2goYSl7Y2FzZSBcIlVURjhcIjpjYXNlIFwiVVRGMTZCRVwiOmNhc2UgXCJVVEYxNkxFXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImVuY29kaW5nIG11c3QgYmUgVVRGOCwgVVRGMTZCRSwgb3IgVVRGMTZMRVwiKTtcbn1zd2l0Y2goYyl7Y2FzZSBcIkhFWFwiOmM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBnPWEubGVuZ3RoLGwscCxmLG0scSx1O2lmKDAhPT1nJTIpdGhyb3cgRXJyb3IoXCJTdHJpbmcgb2YgSEVYIHR5cGUgbXVzdCBiZSBpbiBieXRlIGluY3JlbWVudHNcIik7Yz1jfHxbMF07ZD1kfHwwO3E9ZD4+PjM7dT0tMT09PWI/MzowO2ZvcihsPTA7bDxnO2wrPTIpe3A9cGFyc2VJbnQoYS5zdWJzdHIobCwyKSwxNik7aWYoaXNOYU4ocCkpdGhyb3cgRXJyb3IoXCJTdHJpbmcgb2YgSEVYIHR5cGUgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzXCIpO209KGw+Pj4xKStxO2ZvcihmPW0+Pj4yO2MubGVuZ3RoPD1mOyljLnB1c2goMCk7Y1tmXXw9cDw8OCoodSttJTQqYil9cmV0dXJue3ZhbHVlOmMsYmluTGVuOjQqZytkfX07YnJlYWs7Y2FzZSBcIlRFWFRcIjpjPWZ1bmN0aW9uKGMsaCxkKXt2YXIgZyxsLHA9MCxmLG0scSx1LHIsdDtoPWh8fFswXTtkPWR8fDA7cT1kPj4+MztpZihcIlVURjhcIj09PWEpZm9yKHQ9LTE9PT1cbmI/MzowLGY9MDtmPGMubGVuZ3RoO2YrPTEpZm9yKGc9Yy5jaGFyQ29kZUF0KGYpLGw9W10sMTI4Pmc/bC5wdXNoKGcpOjIwNDg+Zz8obC5wdXNoKDE5MnxnPj4+NiksbC5wdXNoKDEyOHxnJjYzKSk6NTUyOTY+Z3x8NTczNDQ8PWc/bC5wdXNoKDIyNHxnPj4+MTIsMTI4fGc+Pj42JjYzLDEyOHxnJjYzKTooZis9MSxnPTY1NTM2KygoZyYxMDIzKTw8MTB8Yy5jaGFyQ29kZUF0KGYpJjEwMjMpLGwucHVzaCgyNDB8Zz4+PjE4LDEyOHxnPj4+MTImNjMsMTI4fGc+Pj42JjYzLDEyOHxnJjYzKSksbT0wO208bC5sZW5ndGg7bSs9MSl7cj1wK3E7Zm9yKHU9cj4+PjI7aC5sZW5ndGg8PXU7KWgucHVzaCgwKTtoW3VdfD1sW21dPDw4Kih0K3IlNCpiKTtwKz0xfWVsc2UgaWYoXCJVVEYxNkJFXCI9PT1hfHxcIlVURjE2TEVcIj09PWEpZm9yKHQ9LTE9PT1iPzI6MCxsPVwiVVRGMTZMRVwiPT09YSYmMSE9PWJ8fFwiVVRGMTZMRVwiIT09YSYmMT09PWIsZj0wO2Y8Yy5sZW5ndGg7Zis9MSl7Zz1jLmNoYXJDb2RlQXQoZik7XG4hMD09PWwmJihtPWcmMjU1LGc9bTw8OHxnPj4+OCk7cj1wK3E7Zm9yKHU9cj4+PjI7aC5sZW5ndGg8PXU7KWgucHVzaCgwKTtoW3VdfD1nPDw4Kih0K3IlNCpiKTtwKz0yfXJldHVybnt2YWx1ZTpoLGJpbkxlbjo4KnArZH19O2JyZWFrO2Nhc2UgXCJCNjRcIjpjPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZz0wLGwscCxmLG0scSx1LHIsdDtpZigtMT09PWEuc2VhcmNoKC9eW2EtekEtWjAtOT0rXFwvXSskLykpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBiYXNlLTY0IHN0cmluZ1wiKTtwPWEuaW5kZXhPZihcIj1cIik7YT1hLnJlcGxhY2UoL1xcPS9nLFwiXCIpO2lmKC0xIT09cCYmcDxhLmxlbmd0aCl0aHJvdyBFcnJvcihcIkludmFsaWQgJz0nIGZvdW5kIGluIGJhc2UtNjQgc3RyaW5nXCIpO2M9Y3x8WzBdO2Q9ZHx8MDt1PWQ+Pj4zO3Q9LTE9PT1iPzM6MDtmb3IocD0wO3A8YS5sZW5ndGg7cCs9NCl7cT1hLnN1YnN0cihwLDQpO2ZvcihmPW09MDtmPHEubGVuZ3RoO2YrPTEpbD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5pbmRleE9mKHFbZl0pLFxubXw9bDw8MTgtNipmO2ZvcihmPTA7ZjxxLmxlbmd0aC0xO2YrPTEpe3I9Zyt1O2ZvcihsPXI+Pj4yO2MubGVuZ3RoPD1sOyljLnB1c2goMCk7Y1tsXXw9KG0+Pj4xNi04KmYmMjU1KTw8OCoodCtyJTQqYik7Zys9MX19cmV0dXJue3ZhbHVlOmMsYmluTGVuOjgqZytkfX07YnJlYWs7Y2FzZSBcIkJZVEVTXCI6Yz1mdW5jdGlvbihhLGMsZCl7dmFyIGcsbCxwLGYsbSxxO2M9Y3x8WzBdO2Q9ZHx8MDtwPWQ+Pj4zO3E9LTE9PT1iPzM6MDtmb3IobD0wO2w8YS5sZW5ndGg7bCs9MSlnPWEuY2hhckNvZGVBdChsKSxtPWwrcCxmPW0+Pj4yLGMubGVuZ3RoPD1mJiZjLnB1c2goMCksY1tmXXw9Zzw8OCoocSttJTQqYik7cmV0dXJue3ZhbHVlOmMsYmluTGVuOjgqYS5sZW5ndGgrZH19O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtjPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaChlKXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9Yz1cbmZ1bmN0aW9uKGEsYyxkKXt2YXIgZyxsLHAsZixtLHE7Yz1jfHxbMF07ZD1kfHwwO2w9ZD4+PjM7bT0tMT09PWI/MzowO3E9bmV3IFVpbnQ4QXJyYXkoYSk7Zm9yKGc9MDtnPGEuYnl0ZUxlbmd0aDtnKz0xKWY9ZytsLHA9Zj4+PjIsYy5sZW5ndGg8PXAmJmMucHVzaCgwKSxjW3BdfD1xW2ddPDw4KihtK2YlNCpiKTtyZXR1cm57dmFsdWU6YyxiaW5MZW46OCphLmJ5dGVMZW5ndGgrZH19O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIFRFWFQsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO31yZXR1cm4gY31mdW5jdGlvbiB5KGMsYSl7cmV0dXJuIGM8PGF8Yz4+PjMyLWF9ZnVuY3Rpb24gUyhjLGEpe3JldHVybiAzMjxhPyhhLT0zMixuZXcgYihjLmI8PGF8Yy5hPj4+MzItYSxjLmE8PGF8Yy5iPj4+MzItYSkpOjAhPT1hP25ldyBiKGMuYTw8YXxjLmI+Pj4zMi1hLGMuYjw8YXxjLmE+Pj4zMi1hKTpjfWZ1bmN0aW9uIHcoYyxhKXtyZXR1cm4gYz4+PlxuYXxjPDwzMi1hfWZ1bmN0aW9uIHQoYyxhKXt2YXIgaz1udWxsLGs9bmV3IGIoYy5hLGMuYik7cmV0dXJuIGs9MzI+PWE/bmV3IGIoay5hPj4+YXxrLmI8PDMyLWEmNDI5NDk2NzI5NSxrLmI+Pj5hfGsuYTw8MzItYSY0Mjk0OTY3Mjk1KTpuZXcgYihrLmI+Pj5hLTMyfGsuYTw8NjQtYSY0Mjk0OTY3Mjk1LGsuYT4+PmEtMzJ8ay5iPDw2NC1hJjQyOTQ5NjcyOTUpfWZ1bmN0aW9uIFQoYyxhKXt2YXIgaz1udWxsO3JldHVybiBrPTMyPj1hP25ldyBiKGMuYT4+PmEsYy5iPj4+YXxjLmE8PDMyLWEmNDI5NDk2NzI5NSk6bmV3IGIoMCxjLmE+Pj5hLTMyKX1mdW5jdGlvbiBhYShjLGEsYil7cmV0dXJuIGMmYV5+YyZifWZ1bmN0aW9uIGJhKGMsYSxrKXtyZXR1cm4gbmV3IGIoYy5hJmEuYV5+Yy5hJmsuYSxjLmImYS5iXn5jLmImay5iKX1mdW5jdGlvbiBVKGMsYSxiKXtyZXR1cm4gYyZhXmMmYl5hJmJ9ZnVuY3Rpb24gY2EoYyxhLGspe3JldHVybiBuZXcgYihjLmEmYS5hXmMuYSZrLmFeYS5hJlxuay5hLGMuYiZhLmJeYy5iJmsuYl5hLmImay5iKX1mdW5jdGlvbiBkYShjKXtyZXR1cm4gdyhjLDIpXncoYywxMyledyhjLDIyKX1mdW5jdGlvbiBlYShjKXt2YXIgYT10KGMsMjgpLGs9dChjLDM0KTtjPXQoYywzOSk7cmV0dXJuIG5ldyBiKGEuYV5rLmFeYy5hLGEuYl5rLmJeYy5iKX1mdW5jdGlvbiBmYShjKXtyZXR1cm4gdyhjLDYpXncoYywxMSledyhjLDI1KX1mdW5jdGlvbiBnYShjKXt2YXIgYT10KGMsMTQpLGs9dChjLDE4KTtjPXQoYyw0MSk7cmV0dXJuIG5ldyBiKGEuYV5rLmFeYy5hLGEuYl5rLmJeYy5iKX1mdW5jdGlvbiBoYShjKXtyZXR1cm4gdyhjLDcpXncoYywxOCleYz4+PjN9ZnVuY3Rpb24gaWEoYyl7dmFyIGE9dChjLDEpLGs9dChjLDgpO2M9VChjLDcpO3JldHVybiBuZXcgYihhLmFeay5hXmMuYSxhLmJeay5iXmMuYil9ZnVuY3Rpb24gamEoYyl7cmV0dXJuIHcoYywxNyledyhjLDE5KV5jPj4+MTB9ZnVuY3Rpb24ga2EoYyl7dmFyIGE9dChjLDE5KSxrPXQoYyw2MSk7XG5jPVQoYyw2KTtyZXR1cm4gbmV3IGIoYS5hXmsuYV5jLmEsYS5iXmsuYl5jLmIpfWZ1bmN0aW9uIEcoYyxhKXt2YXIgYj0oYyY2NTUzNSkrKGEmNjU1MzUpO3JldHVybigoYz4+PjE2KSsoYT4+PjE2KSsoYj4+PjE2KSY2NTUzNSk8PDE2fGImNjU1MzV9ZnVuY3Rpb24gbGEoYyxhLGIsZSl7dmFyIGg9KGMmNjU1MzUpKyhhJjY1NTM1KSsoYiY2NTUzNSkrKGUmNjU1MzUpO3JldHVybigoYz4+PjE2KSsoYT4+PjE2KSsoYj4+PjE2KSsoZT4+PjE2KSsoaD4+PjE2KSY2NTUzNSk8PDE2fGgmNjU1MzV9ZnVuY3Rpb24gSChjLGEsYixlLGgpe3ZhciBkPShjJjY1NTM1KSsoYSY2NTUzNSkrKGImNjU1MzUpKyhlJjY1NTM1KSsoaCY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhiPj4+MTYpKyhlPj4+MTYpKyhoPj4+MTYpKyhkPj4+MTYpJjY1NTM1KTw8MTZ8ZCY2NTUzNX1mdW5jdGlvbiBtYShjLGEpe3ZhciBkLGUsaDtkPShjLmImNjU1MzUpKyhhLmImNjU1MzUpO2U9KGMuYj4+PjE2KStcbihhLmI+Pj4xNikrKGQ+Pj4xNik7aD0oZSY2NTUzNSk8PDE2fGQmNjU1MzU7ZD0oYy5hJjY1NTM1KSsoYS5hJjY1NTM1KSsoZT4+PjE2KTtlPShjLmE+Pj4xNikrKGEuYT4+PjE2KSsoZD4+PjE2KTtyZXR1cm4gbmV3IGIoKGUmNjU1MzUpPDwxNnxkJjY1NTM1LGgpfWZ1bmN0aW9uIG5hKGMsYSxkLGUpe3ZhciBoLG4sZztoPShjLmImNjU1MzUpKyhhLmImNjU1MzUpKyhkLmImNjU1MzUpKyhlLmImNjU1MzUpO249KGMuYj4+PjE2KSsoYS5iPj4+MTYpKyhkLmI+Pj4xNikrKGUuYj4+PjE2KSsoaD4+PjE2KTtnPShuJjY1NTM1KTw8MTZ8aCY2NTUzNTtoPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhkLmEmNjU1MzUpKyhlLmEmNjU1MzUpKyhuPj4+MTYpO249KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkLmE+Pj4xNikrKGUuYT4+PjE2KSsoaD4+PjE2KTtyZXR1cm4gbmV3IGIoKG4mNjU1MzUpPDwxNnxoJjY1NTM1LGcpfWZ1bmN0aW9uIG9hKGMsYSxkLGUsaCl7dmFyIG4sZyxsO249KGMuYiZcbjY1NTM1KSsoYS5iJjY1NTM1KSsoZC5iJjY1NTM1KSsoZS5iJjY1NTM1KSsoaC5iJjY1NTM1KTtnPShjLmI+Pj4xNikrKGEuYj4+PjE2KSsoZC5iPj4+MTYpKyhlLmI+Pj4xNikrKGguYj4+PjE2KSsobj4+PjE2KTtsPShnJjY1NTM1KTw8MTZ8biY2NTUzNTtuPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhkLmEmNjU1MzUpKyhlLmEmNjU1MzUpKyhoLmEmNjU1MzUpKyhnPj4+MTYpO2c9KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkLmE+Pj4xNikrKGUuYT4+PjE2KSsoaC5hPj4+MTYpKyhuPj4+MTYpO3JldHVybiBuZXcgYigoZyY2NTUzNSk8PDE2fG4mNjU1MzUsbCl9ZnVuY3Rpb24gQihjLGEpe3JldHVybiBuZXcgYihjLmFeYS5hLGMuYl5hLmIpfWZ1bmN0aW9uIEEoYyl7dmFyIGE9W10sZDtpZihcIlNIQS0xXCI9PT1jKWE9WzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OCwzMjg1Mzc3NTIwXTtlbHNlIGlmKDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBLVwiLDApKXN3aXRjaChhPVxuWzMyMzgzNzEwMzIsOTE0MTUwNjYzLDgxMjcwMjk5OSw0MTQ0OTEyNjk3LDQyOTA3NzU4NTcsMTc1MDYwMzAyNSwxNjk0MDc2ODM5LDMyMDQwNzU0MjhdLGQ9WzE3NzkwMzM3MDMsMzE0NDEzNDI3NywxMDEzOTA0MjQyLDI3NzM0ODA3NjIsMTM1OTg5MzExOSwyNjAwODIyOTI0LDUyODczNDYzNSwxNTQxNDU5MjI1XSxjKXtjYXNlIFwiU0hBLTIyNFwiOmJyZWFrO2Nhc2UgXCJTSEEtMjU2XCI6YT1kO2JyZWFrO2Nhc2UgXCJTSEEtMzg0XCI6YT1bbmV3IGIoMzQxODA3MDM2NSxhWzBdKSxuZXcgYigxNjU0MjcwMjUwLGFbMV0pLG5ldyBiKDI0Mzg1MjkzNzAsYVsyXSksbmV3IGIoMzU1NDYyMzYwLGFbM10pLG5ldyBiKDE3MzE0MDU0MTUsYVs0XSksbmV3IGIoNDEwNDg4ODU4OTUsYVs1XSksbmV3IGIoMzY3NTAwODUyNSxhWzZdKSxuZXcgYigxMjAzMDYyODEzLGFbN10pXTticmVhaztjYXNlIFwiU0hBLTUxMlwiOmE9W25ldyBiKGRbMF0sNDA4OTIzNTcyMCksbmV3IGIoZFsxXSwyMjI3ODczNTk1KSxcbm5ldyBiKGRbMl0sNDI3MTE3NTcyMyksbmV3IGIoZFszXSwxNTk1NzUwMTI5KSxuZXcgYihkWzRdLDI5MTc1NjUxMzcpLG5ldyBiKGRbNV0sNzI1NTExMTk5KSxuZXcgYihkWzZdLDQyMTUzODk1NDcpLG5ldyBiKGRbN10sMzI3MDMzMjA5KV07YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcIlVua25vd24gU0hBIHZhcmlhbnRcIik7fWVsc2UgaWYoMD09PWMubGFzdEluZGV4T2YoXCJTSEEzLVwiLDApfHwwPT09Yy5sYXN0SW5kZXhPZihcIlNIQUtFXCIsMCkpZm9yKGM9MDs1PmM7Yys9MSlhW2NdPVtuZXcgYigwLDApLG5ldyBiKDAsMCksbmV3IGIoMCwwKSxuZXcgYigwLDApLG5ldyBiKDAsMCldO2Vsc2UgdGhyb3cgRXJyb3IoXCJObyBTSEEgdmFyaWFudHMgc3VwcG9ydGVkXCIpO3JldHVybiBhfWZ1bmN0aW9uIEsoYyxhKXt2YXIgYj1bXSxlLGQsbixnLGwscCxmO2U9YVswXTtkPWFbMV07bj1hWzJdO2c9YVszXTtsPWFbNF07Zm9yKGY9MDs4MD5mO2YrPTEpYltmXT0xNj5mP2NbZl06eShiW2YtXG4zXV5iW2YtOF1eYltmLTE0XV5iW2YtMTZdLDEpLHA9MjA+Zj9IKHkoZSw1KSxkJm5efmQmZyxsLDE1MTg1MDAyNDksYltmXSk6NDA+Zj9IKHkoZSw1KSxkXm5eZyxsLDE4NTk3NzUzOTMsYltmXSk6NjA+Zj9IKHkoZSw1KSxVKGQsbixnKSxsLDI0MDA5NTk3MDgsYltmXSk6SCh5KGUsNSksZF5uXmcsbCwzMzk1NDY5NzgyLGJbZl0pLGw9ZyxnPW4sbj15KGQsMzApLGQ9ZSxlPXA7YVswXT1HKGUsYVswXSk7YVsxXT1HKGQsYVsxXSk7YVsyXT1HKG4sYVsyXSk7YVszXT1HKGcsYVszXSk7YVs0XT1HKGwsYVs0XSk7cmV0dXJuIGF9ZnVuY3Rpb24gWihjLGEsYixlKXt2YXIgZDtmb3IoZD0oYSs2NT4+Pjk8PDQpKzE1O2MubGVuZ3RoPD1kOyljLnB1c2goMCk7Y1thPj4+NV18PTEyODw8MjQtYSUzMjthKz1iO2NbZF09YSY0Mjk0OTY3Mjk1O2NbZC0xXT1hLzQyOTQ5NjcyOTZ8MDthPWMubGVuZ3RoO2ZvcihkPTA7ZDxhO2QrPTE2KWU9SyhjLnNsaWNlKGQsZCsxNiksZSk7cmV0dXJuIGV9ZnVuY3Rpb24gTChjLFxuYSxrKXt2YXIgZSxoLG4sZyxsLHAsZixtLHEsdSxyLHQsdix3LHksQSx6LHgsRixCLEMsRCxFPVtdLEo7aWYoXCJTSEEtMjI0XCI9PT1rfHxcIlNIQS0yNTZcIj09PWspdT02NCx0PTEsRD1OdW1iZXIsdj1HLHc9bGEseT1ILEE9aGEsej1qYSx4PWRhLEY9ZmEsQz1VLEI9YWEsSj1kO2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1rfHxcIlNIQS01MTJcIj09PWspdT04MCx0PTIsRD1iLHY9bWEsdz1uYSx5PW9hLEE9aWEsej1rYSx4PWVhLEY9Z2EsQz1jYSxCPWJhLEo9VjtlbHNlIHRocm93IEVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBTSEEtMiBpbXBsZW1lbnRhdGlvblwiKTtrPWFbMF07ZT1hWzFdO2g9YVsyXTtuPWFbM107Zz1hWzRdO2w9YVs1XTtwPWFbNl07Zj1hWzddO2ZvcihyPTA7cjx1O3IrPTEpMTY+cj8ocT1yKnQsbT1jLmxlbmd0aDw9cT8wOmNbcV0scT1jLmxlbmd0aDw9cSsxPzA6Y1txKzFdLEVbcl09bmV3IEQobSxxKSk6RVtyXT13KHooRVtyLTJdKSxFW3ItN10sQShFW3ItMTVdKSxFW3ItXG4xNl0pLG09eShmLEYoZyksQihnLGwscCksSltyXSxFW3JdKSxxPXYoeChrKSxDKGssZSxoKSksZj1wLHA9bCxsPWcsZz12KG4sbSksbj1oLGg9ZSxlPWssaz12KG0scSk7YVswXT12KGssYVswXSk7YVsxXT12KGUsYVsxXSk7YVsyXT12KGgsYVsyXSk7YVszXT12KG4sYVszXSk7YVs0XT12KGcsYVs0XSk7YVs1XT12KGwsYVs1XSk7YVs2XT12KHAsYVs2XSk7YVs3XT12KGYsYVs3XSk7cmV0dXJuIGF9ZnVuY3Rpb24gRChjLGEpe3ZhciBkLGUsaCxuLGc9W10sbD1bXTtpZihudWxsIT09Yylmb3IoZT0wO2U8Yy5sZW5ndGg7ZSs9MilhWyhlPj4+MSklNV1bKGU+Pj4xKS81fDBdPUIoYVsoZT4+PjEpJTVdWyhlPj4+MSkvNXwwXSxuZXcgYihjW2UrMV0sY1tlXSkpO2ZvcihkPTA7MjQ+ZDtkKz0xKXtuPUEoXCJTSEEzLVwiKTtmb3IoZT0wOzU+ZTtlKz0xKXtoPWFbZV1bMF07dmFyIHA9YVtlXVsxXSxmPWFbZV1bMl0sbT1hW2VdWzNdLHE9YVtlXVs0XTtnW2VdPW5ldyBiKGguYV5wLmFeZi5hXlxubS5hXnEuYSxoLmJecC5iXmYuYl5tLmJecS5iKX1mb3IoZT0wOzU+ZTtlKz0xKWxbZV09QihnWyhlKzQpJTVdLFMoZ1soZSsxKSU1XSwxKSk7Zm9yKGU9MDs1PmU7ZSs9MSlmb3IoaD0wOzU+aDtoKz0xKWFbZV1baF09QihhW2VdW2hdLGxbZV0pO2ZvcihlPTA7NT5lO2UrPTEpZm9yKGg9MDs1Pmg7aCs9MSluW2hdWygyKmUrMypoKSU1XT1TKGFbZV1baF0sV1tlXVtoXSk7Zm9yKGU9MDs1PmU7ZSs9MSlmb3IoaD0wOzU+aDtoKz0xKWFbZV1baF09QihuW2VdW2hdLG5ldyBiKH5uWyhlKzEpJTVdW2hdLmEmblsoZSsyKSU1XVtoXS5hLH5uWyhlKzEpJTVdW2hdLmImblsoZSsyKSU1XVtoXS5iKSk7YVswXVswXT1CKGFbMF1bMF0sWFtkXSl9cmV0dXJuIGF9dmFyIGQsVixXLFg7ZD1bMTExNjM1MjQwOCwxODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LFxuMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsXG4yMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OF07Vj1bbmV3IGIoZFswXSwzNjA5NzY3NDU4KSxuZXcgYihkWzFdLDYwMjg5MTcyNSksbmV3IGIoZFsyXSwzOTY0NDg0Mzk5KSxuZXcgYihkWzNdLDIxNzMyOTU1NDgpLG5ldyBiKGRbNF0sNDA4MTYyODQ3MiksbmV3IGIoZFs1XSwzMDUzODM0MjY1KSxuZXcgYihkWzZdLDI5Mzc2NzE1NzkpLG5ldyBiKGRbN10sMzY2NDYwOTU2MCksbmV3IGIoZFs4XSwyNzM0ODgzMzk0KSxuZXcgYihkWzldLDExNjQ5OTY1NDIpLG5ldyBiKGRbMTBdLDEzMjM2MTA3NjQpLG5ldyBiKGRbMTFdLDM1OTAzMDQ5OTQpLG5ldyBiKGRbMTJdLDQwNjgxODIzODMpLG5ldyBiKGRbMTNdLDk5MTMzNjExMyksbmV3IGIoZFsxNF0sNjMzODAzMzE3KSxuZXcgYihkWzE1XSwzNDc5Nzc0ODY4KSxuZXcgYihkWzE2XSwyNjY2NjEzNDU4KSxuZXcgYihkWzE3XSw5NDQ3MTExMzkpLG5ldyBiKGRbMThdLDIzNDEyNjI3NzMpLFxubmV3IGIoZFsxOV0sMjAwNzgwMDkzMyksbmV3IGIoZFsyMF0sMTQ5NTk5MDkwMSksbmV3IGIoZFsyMV0sMTg1NjQzMTIzNSksbmV3IGIoZFsyMl0sMzE3NTIxODEzMiksbmV3IGIoZFsyM10sMjE5ODk1MDgzNyksbmV3IGIoZFsyNF0sMzk5OTcxOTMzOSksbmV3IGIoZFsyNV0sNzY2Nzg0MDE2KSxuZXcgYihkWzI2XSwyNTY2NTk0ODc5KSxuZXcgYihkWzI3XSwzMjAzMzM3OTU2KSxuZXcgYihkWzI4XSwxMDM0NDU3MDI2KSxuZXcgYihkWzI5XSwyNDY2OTQ4OTAxKSxuZXcgYihkWzMwXSwzNzU4MzI2MzgzKSxuZXcgYihkWzMxXSwxNjg3MTc5MzYpLG5ldyBiKGRbMzJdLDExODgxNzk5NjQpLG5ldyBiKGRbMzNdLDE1NDYwNDU3MzQpLG5ldyBiKGRbMzRdLDE1MjI4MDU0ODUpLG5ldyBiKGRbMzVdLDI2NDM4MzM4MjMpLG5ldyBiKGRbMzZdLDIzNDM1MjczOTApLG5ldyBiKGRbMzddLDEwMTQ0Nzc0ODApLG5ldyBiKGRbMzhdLDEyMDY3NTkxNDIpLG5ldyBiKGRbMzldLDM0NDA3NzYyNyksXG5uZXcgYihkWzQwXSwxMjkwODYzNDYwKSxuZXcgYihkWzQxXSwzMTU4NDU0MjczKSxuZXcgYihkWzQyXSwzNTA1OTUyNjU3KSxuZXcgYihkWzQzXSwxMDYyMTcwMDgpLG5ldyBiKGRbNDRdLDM2MDYwMDgzNDQpLG5ldyBiKGRbNDVdLDE0MzI3MjU3NzYpLG5ldyBiKGRbNDZdLDE0NjcwMzE1OTQpLG5ldyBiKGRbNDddLDg1MTE2OTcyMCksbmV3IGIoZFs0OF0sMzEwMDgyMzc1MiksbmV3IGIoZFs0OV0sMTM2MzI1ODE5NSksbmV3IGIoZFs1MF0sMzc1MDY4NTU5MyksbmV3IGIoZFs1MV0sMzc4NTA1MDI4MCksbmV3IGIoZFs1Ml0sMzMxODMwNzQyNyksbmV3IGIoZFs1M10sMzgxMjcyMzQwMyksbmV3IGIoZFs1NF0sMjAwMzAzNDk5NSksbmV3IGIoZFs1NV0sMzYwMjAzNjg5OSksbmV3IGIoZFs1Nl0sMTU3NTk5MDAxMiksbmV3IGIoZFs1N10sMTEyNTU5MjkyOCksbmV3IGIoZFs1OF0sMjcxNjkwNDMwNiksbmV3IGIoZFs1OV0sNDQyNzc2MDQ0KSxuZXcgYihkWzYwXSw1OTM2OTgzNDQpLG5ldyBiKGRbNjFdLFxuMzczMzExMDI0OSksbmV3IGIoZFs2Ml0sMjk5OTM1MTU3MyksbmV3IGIoZFs2M10sMzgxNTkyMDQyNyksbmV3IGIoMzM5MTU2OTYxNCwzOTI4MzgzOTAwKSxuZXcgYigzNTE1MjY3MjcxLDU2NjI4MDcxMSksbmV3IGIoMzk0MDE4NzYwNiwzNDU0MDY5NTM0KSxuZXcgYig0MTE4NjMwMjcxLDQwMDAyMzk5OTIpLG5ldyBiKDExNjQxODQ3NCwxOTE0MTM4NTU0KSxuZXcgYigxNzQyOTI0MjEsMjczMTA1NTI3MCksbmV3IGIoMjg5MzgwMzU2LDMyMDM5OTMwMDYpLG5ldyBiKDQ2MDM5MzI2OSwzMjA2MjAzMTUpLG5ldyBiKDY4NTQ3MTczMyw1ODc0OTY4MzYpLG5ldyBiKDg1MjE0Mjk3MSwxMDg2NzkyODUxKSxuZXcgYigxMDE3MDM2Mjk4LDM2NTU0MzEwMCksbmV3IGIoMTEyNjAwMDU4MCwyNjE4Mjk3Njc2KSxuZXcgYigxMjg4MDMzNDcwLDM0MDk4NTUxNTgpLG5ldyBiKDE1MDE1MDU5NDgsNDIzNDUwOTg2NiksbmV3IGIoMTYwNzE2NzkxNSw5ODcxNjc0NjgpLG5ldyBiKDE4MTY0MDIzMTYsXG4xMjQ2MTg5NTkxKV07WD1bbmV3IGIoMCwxKSxuZXcgYigwLDMyODk4KSxuZXcgYigyMTQ3NDgzNjQ4LDMyOTA2KSxuZXcgYigyMTQ3NDgzNjQ4LDIxNDc1MTY0MTYpLG5ldyBiKDAsMzI5MDcpLG5ldyBiKDAsMjE0NzQ4MzY0OSksbmV3IGIoMjE0NzQ4MzY0OCwyMTQ3NTE2NTQ1KSxuZXcgYigyMTQ3NDgzNjQ4LDMyNzc3KSxuZXcgYigwLDEzOCksbmV3IGIoMCwxMzYpLG5ldyBiKDAsMjE0NzUxNjQyNSksbmV3IGIoMCwyMTQ3NDgzNjU4KSxuZXcgYigwLDIxNDc1MTY1NTUpLG5ldyBiKDIxNDc0ODM2NDgsMTM5KSxuZXcgYigyMTQ3NDgzNjQ4LDMyOTA1KSxuZXcgYigyMTQ3NDgzNjQ4LDMyNzcxKSxuZXcgYigyMTQ3NDgzNjQ4LDMyNzcwKSxuZXcgYigyMTQ3NDgzNjQ4LDEyOCksbmV3IGIoMCwzMjc3OCksbmV3IGIoMjE0NzQ4MzY0OCwyMTQ3NDgzNjU4KSxuZXcgYigyMTQ3NDgzNjQ4LDIxNDc1MTY1NDUpLG5ldyBiKDIxNDc0ODM2NDgsMzI4OTYpLG5ldyBiKDAsMjE0NzQ4MzY0OSksXG5uZXcgYigyMTQ3NDgzNjQ4LDIxNDc1MTY0MjQpXTtXPVtbMCwzNiwzLDQxLDE4XSxbMSw0NCwxMCw0NSwyXSxbNjIsNiw0MywxNSw2MV0sWzI4LDU1LDI1LDIxLDU2XSxbMjcsMjAsMzksOCwxNF1dO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIEN9KTpcInVuZGVmaW5lZFwiIT09dHlwZW9mIGV4cG9ydHM/KFwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPUMpLGV4cG9ydHM9Qyk6WS5qc1NIQT1DfSkodGhpcyk7XG4iLCJpbXBvcnQge01lc3NhZ2UsIEV2ZW50cywgU3VjY2Vzc1N0YXRlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7U3BpQ29uZmlnLCBUcmFuc2FjdGlvbk9wdGlvbnN9IGZyb20gJy4vU3BpTW9kZWxzJztcbmltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5cbmV4cG9ydCBjbGFzcyBDYXNob3V0T25seVJlcXVlc3RcbnsgIFxuICAgIGNvbnN0cnVjdG9yKGFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLkNhc2hvdXRBbW91bnQgPSBhbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5TdXJjaGFyZ2VBbW91bnQgPSBzdXJjaGFyZ2VBbW91bnQ7XG4gICAgICAgIHRoaXMuQ29uZmlnID0gbmV3IFNwaUNvbmZpZygpO1xuICAgICAgICB0aGlzLk9wdGlvbnMgPSBuZXcgVHJhbnNhY3Rpb25PcHRpb25zKCk7XG4gICAgfVxuICAgIFxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJjYXNoX2Ftb3VudFwiOiB0aGlzLkNhc2hvdXRBbW91bnQsXG4gICAgICAgICAgICBcInN1cmNoYXJnZV9hbW91bnRcIjogdGhpcy5TdXJjaGFyZ2VBbW91bnRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLkNvbmZpZy5hZGRSZWNlaXB0Q29uZmlnKGRhdGEpO1xuICAgICAgICB0aGlzLk9wdGlvbnMuQWRkT3B0aW9ucyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcImNzaG91dFwiKSwgRXZlbnRzLkNhc2hvdXRPbmx5UmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FzaG91dE9ubHlSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSBtLklkO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIHRoaXMuU2NoZW1lTmFtZSA9IG0uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcInJyblwiXTtcbiAgICB9XG5cbiAgICBHZXRDYXNob3V0QW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjYXNoX2Ftb3VudFwiXTtcbiAgICB9XG5cbiAgICBHZXRCYW5rTm9uQ2FzaEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFua19ub25jYXNoX2Ftb3VudFwiXTtcbiAgICB9XG5cbiAgICBHZXRCYW5rQ2FzaEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFua19jYXNoX2Ftb3VudFwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0Q3VzdG9tZXJSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjdXN0b21lcl9yZWNlaXB0XCJdO1xuICAgIH1cblxuICAgIEdldE1lcmNoYW50UmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wibWVyY2hhbnRfcmVjZWlwdFwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0UmVzcG9uc2VUZXh0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJob3N0X3Jlc3BvbnNlX3RleHRcIl07XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJob3N0X3Jlc3BvbnNlX2NvZGVcIl07XG4gICAgfVxuICAgIFxuICAgIEdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcInRlcm1pbmFsX3JlZl9pZFwiXTtcbiAgICB9XG5cbiAgICBHZXRBY2NvdW50VHlwZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYWNjb3VudF90eXBlXCJdO1xuICAgIH1cblxuICAgIEdldEF1dGhDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJhdXRoX2NvZGVcIl07XG4gICAgfVxuXG4gICAgR2V0QmFua0RhdGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbmtfZGF0ZVwiXTtcbiAgICB9XG5cbiAgICBHZXRCYW5rVGltZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFua190aW1lXCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRNYXNrZWRQYW4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcIm1hc2tlZF9wYW5cIl07XG4gICAgfVxuICAgIFxuICAgIEdldFRlcm1pbmFsSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcInRlcm1pbmFsX2lkXCJdO1xuICAgIH1cblxuICAgIFdhc01lcmNoYW50UmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcIm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZFwiXTtcbiAgICB9XG5cbiAgICBXYXNDdXN0b21lclJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjdXN0b21lcl9yZWNlaXB0X3ByaW50ZWRcIl07XG4gICAgfVxuICAgIFxuICAgIEdldFN1cmNoYXJnZUFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wic3VyY2hhcmdlX2Ftb3VudFwiXTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVZhbHVlKGF0dHJpYnV0ZSlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbYXR0cmlidXRlXTtcbiAgICB9XG5cbn0iLCJleHBvcnQgY29uc3QgQ29ubmVjdGlvblN0YXRlID0ge1xuICAgIERpc2Nvbm5lY3RlZDogJ0Rpc2Nvbm5lY3RlZCcsXG4gICAgQ29ubmVjdGluZzogJ0Nvbm5lY3RpbmcnLFxuICAgIENvbm5lY3RlZDogJ0Nvbm5lY3RlZCdcbn07XG5cbmV4cG9ydCBjb25zdCBTUElfUFJPVE9DT0wgPSAnc3BpLjIuNC4wJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0ZUV2ZW50QXJnc1xue1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLkNvbm5lY3Rpb25TdGF0ZSA9IGNvbm5lY3Rpb25TdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRXZlbnRBcmdzXG57XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkFkZHJlc3MgICAgPSBudWxsO1xuICAgICAgICB0aGlzLkNvbm5lY3RlZCAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TdGF0ZSAgICAgID0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5TcGlQcm90b2NvbCA9IFNQSV9QUk9UT0NPTDtcbiAgICAgICAgdGhpcy5fd3MgICAgICAgID0gbnVsbDtcblxuICAgICAgICBpZih0eXBlb2YgV2ViU29ja2V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IFdlYlNvY2tldHMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvbm5lY3QoKSB7XG4gICAgICAgIGlmKHRoaXMuU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQgfHwgdGhpcy5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgIC8vIGFscmVhZHkgY29ubmVjdGVkIG9yIGNvbm5lY3RpbmcuIGRpc2Nvbm5lY3QgZmlyc3QuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBuZXcgc29ja2V0IGluc3RhbmNlIHNwZWNpZnlpbmcgdGhlIHVybCwgU1BJIHByb3RvY29sIGFuZCBXZWJzb2NrZXQgdG8gdXNlLlxuICAgICAgICAvL1RoZSB3aWxsIGNyZWF0ZSBhIFRDUC9JUCBzb2NrZXQgY29ubmVjdGlvbiB0byB0aGUgcHJvdmlkZWQgVVJMIGFuZCBwZXJmb3JtIEhUVFAgd2Vic29ja2V0IG5lZ290aWF0aW9uXG4gICAgICAgIHRoaXMuX3dzICAgICAgICAgICA9IG5ldyBXZWJTb2NrZXQodGhpcy5BZGRyZXNzLCB0aGlzLlNwaVByb3RvY29sKTtcbiAgICAgICAgdGhpcy5fd3Mub25vcGVuICAgID0gKCkgPT4gdGhpcy5wb2xsV2ViU29ja2V0Q29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSAocGF5bG9hZCkgPT4gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZChwYXlsb2FkKTtcbiAgICAgICAgdGhpcy5fd3Mub25jbG9zZSAgID0gKCkgPT4gdGhpcy5vbkNsb3NlZCgpO1xuICAgICAgICB0aGlzLl93cy5vbmVycm9yICAgPSAoZXJyKSA9PiB0aGlzLm9uRXJyb3IoZXJyKTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQnLCB7ZGV0YWlsOiBuZXcgQ29ubmVjdGlvblN0YXRlRXZlbnRBcmdzKENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nKX0pKTtcbiAgICB9XG5cbiAgICBEaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5TdGF0ZSA9PSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYodGhpcy5fd3MgJiYgdGhpcy5fd3MucmVhZHlTdGF0ZSAhPSB0aGlzLl93cy5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX3dzLmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9ub3BlbiAgICA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25jbG9zZSAgID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uZXJyb3IgICA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2xvc2VkKCk7XG4gICAgfVxuXG4gICAgU2VuZChtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX3dzLnNlbmQobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25PcGVuZWQoKSB7XG4gICAgICAgIHRoaXMuU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xuICAgICAgICB0aGlzLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIHtkZXRhaWw6IG5ldyBDb25uZWN0aW9uU3RhdGVFdmVudEFyZ3MoQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCl9KSk7XG4gICAgfVxuXG4gICAgb25DbG9zZWQoKSB7XG4gICAgICAgIHRoaXMuQ29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xuICAgICAgICB0aGlzLl93cyA9IG51bGw7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIHtkZXRhaWw6IG5ldyBDb25uZWN0aW9uU3RhdGVFdmVudEFyZ3MoQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCl9KSk7XG4gICAgfVxuXG4gICAgcG9sbFdlYlNvY2tldENvbm5lY3Rpb24oY291bnQgPSAwKSB7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLl93cy5yZWFkeVN0YXRlID09PSB0aGlzLl93cy5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLm9uT3BlbmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKGNvdW50IDwgMjUpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucG9sbFdlYlNvY2tldENvbm5lY3Rpb24oY291bnQpLCAyMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5EaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdNZXNzYWdlUmVjZWl2ZWQnLCB7ZGV0YWlsOiBuZXcgTWVzc2FnZUV2ZW50QXJncyhtZXNzYWdlLmRhdGEpfSkpO1xuICAgIH1cblxuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdFcnJvclJlY2VpdmVkJywge2RldGFpbDogbmV3IE1lc3NhZ2VFdmVudEFyZ3MoZXJyKX0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQganNTSEEgZnJvbSAnanNzaGEnO1xuaW1wb3J0IGFlc2pzIGZyb20gJ2Flcy1qcyc7XG5cbmV4cG9ydCBjbGFzcyBDcnlwdG8ge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gRW5jcnlwdCBhIGJsb2NrIHVzaW5nIENCQyBhbmQgUEtDUzcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIGtleSB2YWx1ZTwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+VGhlIG1lc3NhZ2UgdG8gZW5jcnlwdDwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+UmV0dXJucyB0aGUgcmVzdWx0aW5nIGVuY3J5cHRlZCBzdHJpbmcgZGF0YSBhcyBIRVguPC9yZXR1cm5zPlxuICAgIHN0YXRpYyBBZXNFbmNyeXB0IChrZXksIGRhdGEpIHtcbiAgICAgICAgbGV0IGJ5dGVzID0gYWVzanMudXRpbHMuaGV4LnRvQnl0ZXMoa2V5KTtcbiAgICAgICAgY29uc3QgaXYgPSBbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCBdO1xuICAgICAgICBjb25zdCB0ZXh0Qnl0ZXMgPSBhZXNqcy5wYWRkaW5nLnBrY3M3LnBhZChhZXNqcy51dGlscy51dGY4LnRvQnl0ZXMoZGF0YSkpO1xuICAgICAgICBjb25zdCBhZXNDYmMgPSBuZXcgYWVzanMuTW9kZU9mT3BlcmF0aW9uLmNiYyhieXRlcywgaXYpO1xuICAgICAgICBjb25zdCBlbmNyeXB0ZWRCeXRlcyA9IGFlc0NiYy5lbmNyeXB0KHRleHRCeXRlcyk7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFN0cmluZyA9IGFlc2pzLnV0aWxzLmhleC5mcm9tQnl0ZXMoZW5jcnlwdGVkQnl0ZXMpO1xuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWRTdHJpbmc7XG4gICAgfVxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIERlY3J5cHQgYSBibG9jayB1c2luZyBhIENCQyBhbmQgUEtDUzcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIGtleSB2YWx1ZTwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+dGhlIGRhdGEgdG8gZGVjcnlwdDwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+UmV0dXJucyB0aGUgcmVzdWx0aW5nIGRhdGEgZGVjcnlwdGVkIGluIHBsYWludGV4dC48L3JldHVybnM+XG4gICAgc3RhdGljIEFlc0RlY3J5cHQoa2V5LCBkYXRhKSB7XG4gICAgICAgIGxldCBieXRlcyA9IGFlc2pzLnV0aWxzLmhleC50b0J5dGVzKGtleSk7XG4gICAgICAgIGNvbnN0IGl2ID0gWzB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgXTtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkQnl0ZXMgPSBhZXNqcy51dGlscy5oZXgudG9CeXRlcyhkYXRhKTtcbiAgICAgICAgY29uc3QgYWVzQ2JjID0gbmV3IGFlc2pzLk1vZGVPZk9wZXJhdGlvbi5jYmMoYnl0ZXMsIGl2KTtcbiAgICAgICAgY29uc3QgZGVjcnlwdGVkQnl0ZXMgPSBhZXNDYmMuZGVjcnlwdChlbmNyeXB0ZWRCeXRlcyk7XG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGFlc2pzLnV0aWxzLnV0ZjguZnJvbUJ5dGVzKGFlc2pzLnBhZGRpbmcucGtjczcuc3RyaXAoZGVjcnlwdGVkQnl0ZXMpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGRlY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDYWxjdWxhdGVzIHRoZSBITUFDU0hBMjU2IHNpZ25hdHVyZSBvZiBhIG1lc3NhZ2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIEhtYWMgS2V5IGFzIEhFWDwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlVG9TaWduXCI+VGhlIG1lc3NhZ2UgdG8gc2lnbjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+VGhlIEhNQUNTSEEyNTYgc2lnbmF0dXJlIGFzIGEgaGV4IHN0cmluZzwvcmV0dXJucz5cbiAgICBzdGF0aWMgSG1hY1NpZ25hdHVyZShrZXksIG1lc3NhZ2VUb1NpZ24pIHtcbiAgICAgICAgbGV0IHNoYU9iaiA9IG5ldyBqc1NIQShcIlNIQS0yNTZcIiwgXCJURVhUXCIpO1xuXG4gICAgICAgIHNoYU9iai5zZXRITUFDS2V5KGtleSwnSEVYJyk7XG4gICAgICAgIHNoYU9iai51cGRhdGUobWVzc2FnZVRvU2lnbik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc2hhT2JqLmdldEhNQUMoXCJIRVhcIik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHV0aWxpdHkgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgU0hBLTI1NiB2YWx1ZSBpbiBoZXhhZGVjaW1hbCBmb3JtYXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgdGhlIHZhbHVlIHRvIGJlIGhhc2hlZFxuICAgICAqL1xuICAgIHN0YXRpYyBHZW5lcmF0ZUhhc2godmFsdWUpIHtcbiAgICAgICAgbGV0IHNoYU9iaiA9IG5ldyBqc1NIQSgnU0hBLTI1NicsICdIRVgnKTtcbiAgICAgICAgc2hhT2JqLnVwZGF0ZSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNoYUhhc2ggPSBzaGFPYmouZ2V0SGFzaCgnSEVYJyk7XG4gICAgICAgIHJldHVybiBzaGFIYXNoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRzLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL0NyeXB0byc7XG5pbXBvcnQge1NlY3JldHN9IGZyb20gJy4vU2VjcmV0cyc7XG5cbmV4cG9ydCBjbGFzcyBLZXlSb2xsaW5nSGVscGVyIHtcbiAgICBzdGF0aWMgUGVyZm9ybUtleVJvbGxpbmcoa3JSZXF1ZXN0LCBjdXJyZW50U2VjcmV0cylcbiAgICB7XG4gICAgICAgIGxldCBtID0gbmV3IE1lc3NhZ2Uoa3JSZXF1ZXN0LklkLCBFdmVudHMuS2V5Um9sbFJlc3BvbnNlLCB7XCJzdGF0dXNcIjogXCJjb25maXJtZWRcIn0sIHRydWUpO1xuICAgICAgICBsZXQgbmV3U2VjcmV0cyA9IG5ldyBTZWNyZXRzKENyeXB0by5HZW5lcmF0ZUhhc2goY3VycmVudFNlY3JldHMuRW5jS2V5KS50b1VwcGVyQ2FzZSgpLENyeXB0by5HZW5lcmF0ZUhhc2goY3VycmVudFNlY3JldHMuSG1hY0tleSkudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiBuZXcgS2V5Um9sbGluZ1Jlc3VsdChtLCBuZXdTZWNyZXRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXlSb2xsaW5nUmVzdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihrZXlSb2xsaW5nQ29uZmlybWF0aW9uLCBuZXdTZWNyZXRzKSB7XG4gICAgICAgIHRoaXMuS2V5Um9sbGluZ0NvbmZpcm1hdGlvbiA9IGtleVJvbGxpbmdDb25maXJtYXRpb247XG4gICAgICAgIHRoaXMuTmV3U2VjcmV0cyA9IG5ld1NlY3JldHM7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBsaW5lU2VwZXJhdG9yID0gJ1xcbicpIHtcbiAgICAgICAgdGhpcy5idWZmZXIgICAgID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudCAgICA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMubGluZVNlcGVyYXRvciA9IGxpbmVTZXBlcmF0b3I7XG4gICAgfVxuXG4gICAgSW5mbyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBEZWJ1ZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBXYXJuKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaChhcmdzLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxuICAgIEVycm9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaChhcmdzLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxuICAgIENvbnNvbGUoLi4uYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgX3JlbmRlcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuYnVmZmVyLmpvaW4odGhpcy5saW5lU2VwZXJhdG9yKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtMb2dnZXJ9OyIsImltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL0NyeXB0byc7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gRXZlbnRzIHN0YXRpY2FsbHkgZGVjbGFyZXMgdGhlIHZhcmlvdXMgZXZlbnQgbmFtZXMgaW4gbWVzc2FnZXMuXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY29uc3QgRXZlbnRzID0ge1xuICAgICBQYWlyUmVxdWVzdCA6IFwicGFpcl9yZXF1ZXN0XCIsXG4gICAgIEtleVJlcXVlc3QgOiBcImtleV9yZXF1ZXN0XCIsXG4gICAgIEtleVJlc3BvbnNlIDogXCJrZXlfcmVzcG9uc2VcIixcbiAgICAgS2V5Q2hlY2sgOiBcImtleV9jaGVja1wiLFxuICAgICBQYWlyUmVzcG9uc2UgOiBcInBhaXJfcmVzcG9uc2VcIixcbiAgICAgRHJvcEtleXNBZHZpY2UgOiBcImRyb3Bfa2V5c1wiLFxuXG4gICAgIExvZ2luUmVxdWVzdCA6IFwibG9naW5fcmVxdWVzdFwiLFxuICAgICBMb2dpblJlc3BvbnNlIDogXCJsb2dpbl9yZXNwb25zZVwiLFxuXG4gICAgIFBpbmcgOiBcInBpbmdcIixcbiAgICAgUG9uZyA6IFwicG9uZ1wiLFxuXG4gICAgIFB1cmNoYXNlUmVxdWVzdCA6IFwicHVyY2hhc2VcIixcbiAgICAgUHVyY2hhc2VSZXNwb25zZSA6IFwicHVyY2hhc2VfcmVzcG9uc2VcIixcbiAgICAgQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0IDogXCJjYW5jZWxfdHJhbnNhY3Rpb25cIixcbiAgICAgR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCA6IFwiZ2V0X2xhc3RfdHJhbnNhY3Rpb25cIixcbiAgICAgR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UgOiBcImxhc3RfdHJhbnNhY3Rpb25cIixcbiAgICAgUmVmdW5kUmVxdWVzdCA6IFwicmVmdW5kXCIsXG4gICAgIFJlZnVuZFJlc3BvbnNlIDogXCJyZWZ1bmRfcmVzcG9uc2VcIixcbiAgICAgU2lnbmF0dXJlUmVxdWlyZWQgOiBcInNpZ25hdHVyZV9yZXF1aXJlZFwiLFxuICAgICBTaWduYXR1cmVEZWNsaW5lZCA6IFwic2lnbmF0dXJlX2RlY2xpbmVcIixcbiAgICAgU2lnbmF0dXJlQWNjZXB0ZWQgOiBcInNpZ25hdHVyZV9hY2NlcHRcIixcbiAgICAgQXV0aENvZGVSZXF1aXJlZCA6IFwiYXV0aG9yaXNhdGlvbl9jb2RlX3JlcXVpcmVkXCIsXG4gICAgIEF1dGhDb2RlQWR2aWNlIDogXCJhdXRob3Jpc2F0aW9uX2NvZGVfYWR2aWNlXCIsXG5cbiAgICAgQ2FzaG91dE9ubHlSZXF1ZXN0IDogXCJjYXNoXCIsXG4gICAgIENhc2hvdXRPbmx5UmVzcG9uc2UgOiBcImNhc2hfcmVzcG9uc2VcIixcblxuICAgICBNb3RvUHVyY2hhc2VSZXF1ZXN0IDogXCJtb3RvX3B1cmNoYXNlXCIsXG4gICAgIE1vdG9QdXJjaGFzZVJlc3BvbnNlIDogXCJtb3RvX3B1cmNoYXNlX3Jlc3BvbnNlXCIsXG5cbiAgICAgU2V0dGxlUmVxdWVzdCA6IFwic2V0dGxlXCIsXG4gICAgIFNldHRsZVJlc3BvbnNlIDogXCJzZXR0bGVfcmVzcG9uc2VcIixcbiAgICAgU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0IDogXCJzZXR0bGVtZW50X2VucXVpcnlcIixcbiAgICAgU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZSA6IFwic2V0dGxlbWVudF9lbnF1aXJ5X3Jlc3BvbnNlXCIsXG5cbiAgICAgS2V5Um9sbFJlcXVlc3QgOiBcInJlcXVlc3RfdXNlX25leHRfa2V5c1wiLFxuICAgICBLZXlSb2xsUmVzcG9uc2UgOiBcInJlc3BvbnNlX3VzZV9uZXh0X2tleXNcIixcblxuICAgICBFcnJvciA6IFwiZXJyb3JcIixcbiAgICBcbiAgICAgSW52YWxpZEhtYWNTaWduYXR1cmUgOiBcIl9JTlZBTElEX1NJR05BVFVSRV9cIixcblxuICAgIC8vIFBheSBBdCBUYWJsZSBSZWxhdGVkIE1lc3NhZ2VzXG4gICAgUGF5QXRUYWJsZUdldFRhYmxlQ29uZmlnIDogXCJnZXRfdGFibGVfY29uZmlnXCIsIC8vIGluY29taW5nLiBXaGVuIGVmdHBvcyB3YW50cyB0byBhc2sgdXMgZm9yIFBAVCBjb25maWd1cmF0aW9uLlxuICAgIFBheUF0VGFibGVTZXRUYWJsZUNvbmZpZyA6IFwic2V0X3RhYmxlX2NvbmZpZ1wiLCAvLyBvdXRnb2luZy4gV2hlbiB3ZSB3YW50IHRvIGluc3RydWN0IGVmdHBvcyB3aXRoIHRoZSBQQFQgY29uZmlndXJhdGlvbi5cbiAgICBQYXlBdFRhYmxlR2V0QmlsbERldGFpbHMgOiBcImdldF9iaWxsX2RldGFpbHNcIiwgLy8gaW5jb21pbmcuIFdoZW4gZWZ0cG9zIHdhbnRzIHRvIGFyZXRyaWV2ZSB0aGUgYmlsbCBmb3IgYSB0YWJsZS5cbiAgICBQYXlBdFRhYmxlQmlsbERldGFpbHMgOiBcImJpbGxfZGV0YWlsc1wiLCAgICAgICAgLy8gb3V0Z29pbmcuIFdlIHJlcGx5IHdpdGggdGhpcyB3aGVuIGVmdHBvcyByZXF1ZXN0cyB0byB1cyBnZXRfYmlsbF9kZXRhaWxzLlxuICAgIFBheUF0VGFibGVCaWxsUGF5bWVudCA6IFwiYmlsbF9wYXltZW50XCIgICAgICAgIC8vIGluY29taW5nLiBXaGVuIHRoZSBlZnRwb3MgYWR2aWNlcyBcbn07XG5cbmV4cG9ydCBjb25zdCBTdWNjZXNzU3RhdGUgPSB7XG4gICAgVW5rbm93bjogJ1Vua25vd24nLCBTdWNjZXNzOiAnU3VjY2VzcycsIEZhaWxlZDogJ0ZhaWxlZCdcbn07XG5cbi8vIDxzdW1tYXJ5PlxuLy8gTWVzc2FnZVN0YW1wIHJlcHJlc2VudHMgd2hhdCBpcyByZXF1aXJlZCB0byB0dXJuIGFuIG91dGdvaW5nIE1lc3NhZ2UgaW50byBKc29uXG4vLyBpbmNsdWRpbmcgZW5jcnlwdGlvbiBhbmQgZGF0ZSBzZXR0aW5nLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTdGFtcCB7XG4gICAgY29uc3RydWN0b3IocG9zSWQsIHNlY3JldHMsIHNlcnZlclRpbWVEZWx0YSkge1xuICAgICAgICB0aGlzLlBvc0lkID0gcG9zSWQ7XG4gICAgICAgIHRoaXMuU2VjcmV0cyA9IHNlY3JldHM7XG4gICAgICAgIHRoaXMuU2VydmVyVGltZURlbHRhID0gc2VydmVyVGltZURlbHRhO1xuICAgIH1cbn1cblxuLy8gPHN1bW1hcnk+XG4vLyBNZXNzYWdlRW52ZWxvcGUgcmVwcmVzZW50cyB0aGUgb3V0ZXIgc3RydWN0dXJlIG9mIGFueSBtZXNzYWdlIHRoYXQgaXMgZXhjaGFuZ2VkXG4vLyBiZXR3ZWVuIHRoZSBQb3MgYW5kIHRoZSBQaW5QYWQgYW5kIHZpY2UtdmVyc2EuXG4vLyBTZWUgaHR0cDovL3d3dy5zaW1wbGVwYXltZW50YXBpLmNvbS8jL2FwaS9tZXNzYWdlLWVuY3J5cHRpb25cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRW52ZWxvcGUge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGVuYywgaG1hYywgcG9zSWQpIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBNZXNzYWdlIGZpZWxkIGlzIHNldCBvbmx5IHdoZW4gaW4gVW4tZW5jcnlwdGVkIGZvcm0uXG4gICAgICAgIC8vIEluIGZhY3QgaXQgaXMgdGhlIG9ubHkgZmllbGQgaW4gYW4gZW52ZWxvcGUgaW4gdGhlIFVuLUVuY3J5cHRlZCBmb3JtLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBlbmMgZmllbGQgaXMgc2V0IG9ubHkgd2hlbiBpbiBFbmNyeXB0ZWQgZm9ybS5cbiAgICAgICAgLy8gSXQgY29udGFpbnMgdGhlIGVuY3J5cHRlZCBKc29uIG9mIGFub3RoZXIgTWVzc2FnZUVudmVsb3BlIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuRW5jID0gZW5jO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgaG1hYyBmaWVsZCBpcyBzZXQgb25seSB3aGVuIGluIEVuY3J5cHRlZCBmb3JtLlxuICAgICAgICAvLyBJdCBpcyB0aGUgc2lnbmF0dXJlIG9mIHRoZSBcImVuY1wiIGZpZWxkLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuSG1hYyA9IGhtYWM7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBwb3NfaWQgZmllbGQgaXMgb25seSBmaWxsZWQgZm9yIG91dGdvaW5nIEVuY3J5cHRlZCBtZXNzYWdlcy5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlBvc0lkID0gcG9zSWQ7XG4gICAgfVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5NZXNzYWdlLFxuICAgICAgICAgICAgZW5jOiB0aGlzLkVuYyxcbiAgICAgICAgICAgIGhtYWM6IHRoaXMuSG1hYyxcbiAgICAgICAgICAgIHBvc19pZDogdGhpcy5Qb3NJZFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyA8c3VtbWFyeT5cbi8vIE1lc3NhZ2UgcmVwcmVzZW50cyB0aGUgY29udGVudHMgb2YgYSBNZXNzYWdlLlxuLy8gU2VlIGh0dHA6Ly93d3cuc2ltcGxlcGF5bWVudGFwaS5jb20vIy9hcGkvbWVzc2FnZS1lbmNyeXB0aW9uXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoaWQsIGV2ZW50TmFtZSwgZGF0YSwgbmVlZHNFbmNyeXB0aW9uKSB7XG4gICAgICAgIHRoaXMuSWQgPSBpZDtcbiAgICAgICAgdGhpcy5FdmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIHRoaXMuRGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuRGF0ZVRpbWVTdGFtcCA9ICcnO1xuICAgICAgICB0aGlzLlBvc0lkID0gJyc7IC8vIFBvc19pZCBpcyBzZXQgaGVyZSBvbmx5IGZvciBvdXRnb2luZyBVbi1lbmNyeXB0ZWQgbWVzc2FnZXMuIFxuICAgICAgICB0aGlzLkluY29tbWluZ0htYWMgPSAnJzsgLy8gU29tZXRpbWVzIHRoZSBsb2dpYyBhcm91bmQgdGhlIGluY29taW5nIG1lc3NhZ2UgbWlnaHQgbmVlZCBhY2Nlc3MgdG8gdGhlIHN1Z25hdHVyZSwgZm9yIGV4YW1wbGUgaW4gdGhlIGtleV9jaGVjay5cbiAgICAgICAgdGhpcy5fbmVlZHNFbmNyeXB0aW9uID0gbmVlZHNFbmNyeXB0aW9uOyAvLyBEZW5vdGVzIHdoZXRoZXIgYW4gb3V0Z29pbmcgbWVzc2FnZSBuZWVkcyB0byBiZSBlbmNyeXB0ZWQgaW4gVG9Kc29uKClcbiAgICAgICAgdGhpcy5EZWNyeXB0ZWRKc29uID0gJyc7IC8vIFNldCBvbiBhbiBpbmNvbWluZyBtZXNzYWdlIGp1c3Qgc28geW91IGNhbiBoYXZlIGEgbG9vayBhdCB3aGF0IGl0IGxvb2tlZCBsaWtlIGluIGl0cyBqc29uIGZvcm0uXG4gICAgfVxuXG4gICAgR2V0U3VjY2Vzc1N0YXRlKCkge1xuICAgICAgICBpZighdGhpcy5EYXRhIHx8IHR5cGVvZiB0aGlzLkRhdGEuc3VjY2VzcyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFN1Y2Nlc3NTdGF0ZS5Vbmtub3duO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuRGF0YS5zdWNjZXNzID8gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3MgOiBTdWNjZXNzU3RhdGUuRmFpbGVkO1xuICAgIH1cblxuICAgIEdldEVycm9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5EYXRhLmVycm9yX3JlYXNvbiA/IHRoaXMuRGF0YS5lcnJvcl9yZWFzb24gOiBcIlwiO1xuICAgIH1cblxuICAgIEdldEVycm9yRGV0YWlsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5EYXRhLmVycm9yX2RldGFpbDtcbiAgICB9XG5cbiAgICBHZXRTZXJ2ZXJUaW1lRGVsdGEoKVxuICAgIHtcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIFxuICAgICAgICAvLyBTdGFtcCBmb3JtYXQ6IDIwMTgtMDQtMTlUMDE6NDI6MzguMjc5XG4gICAgICAgIGxldCBkdHMgPSB0aGlzLkRhdGVUaW1lU3RhbXAuc3BsaXQoL1tcXC1cXCtcXC4gOlRdLyk7XG4gICAgICAgIGxldCBtc2dUaW1lID0gbmV3IERhdGUoXG4gICAgICAgICAgICAvLyB5ZWFyLCBtb250aCwgZGF0ZVxuICAgICAgICAgICAgZHRzWzBdLCBkdHNbMV0gLSAxLCBkdHNbMl0sXG4gICAgICAgICAgICAvLyBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzXG4gICAgICAgICAgICBkdHNbM10sIGR0c1s0XSwgZHRzWzVdLCBkdHNbNl1cbiAgICAgICAgKS5nZXRUaW1lKCk7IC8vIExvY2FsIHRpbWUgem9uZVxuXG4gICAgICAgIHJldHVybiBtc2dUaW1lIC0gbm93O1xuICAgIH1cblxuICAgIC8vIEhlbHBlciBtZXRob2QgdG8gcGFyc2UgYmFuayBkYXRlIGZvcm1hdCAyMDA0MjAxOCAoZGRNTXl5eXkpXG4gICAgc3RhdGljIFBhcnNlQmFua0RhdGUoYmFua0RhdGUpIHtcbiAgICAgICAgaWYoYmFua0RhdGUubGVuZ3RoICE9PSA4KSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gbmV3IERhdGUoYCR7YmFua0RhdGUuc3Vic3RyKDQsNCl9LSR7YmFua0RhdGUuc3Vic3RyKDIsMil9LSR7YmFua0RhdGUuc3Vic3RyKDAsMil9YCk7XG4gICAgfVxuXG4gICAgLy8gUGFyc2VzIGEgYmFuayBkYXRlICYgdGltZSBzdHIgZnJvbSBcIjA1T2N0MTdcIiAvIFwiMDU6MDBcIiAoXCJkZE1NTXl5L0hIOm1tXCIpIGludG8gZGF0ZSBvYmpcbiAgICBzdGF0aWMgUGFyc2VCYW5rRGF0ZVRpbWVTdHIoZGF0ZSwgdGltZSkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoYCR7ZGF0ZS5zdWJzdHIoMCwyKX0gJHtkYXRlLnN1YnN0cigyLDMpfSAke2RhdGUuc3Vic3RyKDUsMil9ICR7dGltZX1gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgRnJvbUpzb24obXNnSnNvbiwgc2VjcmV0cykge1xuICAgICAgICBsZXQgZW52ID0gSlNPTi5wYXJzZShtc2dKc29uKTtcblxuICAgICAgICBpZihlbnYubWVzc2FnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGVudi5tZXNzYWdlLmlkLCBlbnYubWVzc2FnZS5ldmVudCwgZW52Lm1lc3NhZ2UuZGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgbWVzc2FnZS5EZWNyeXB0ZWRKc29uID0gbXNnSnNvbjtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3JldHMgPT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVGhpcyBtYXkgaGFwcGVuIGlmIHdlIHNvbWVob3cgcmVjZWl2ZWQgYW4gZW5jcnlwdGVkIG1lc3NhZ2UgZnJvbSBlZnRwb3MgYnV0IHdlJ3JlIG5vdCBjb25maWdlcmVkIHdpdGggc2VjcmV0cy5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlLCBpZiB3ZSBjYW5jZWwgdGhlIHBhaXJpbmcgcHJvY2VzcyBhIGxpdHRsZSBsYXRlIGluIHRoZSBnYW1lIGFuZCB3ZSBnZXQgYW4gZW5jcnlwdGVkIGtleV9jaGVjayBtZXNzYWdlIGFmdGVyIHdlJ3ZlIGRyb3BwZWQgdGhlIGtleXMuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoXCJVTktOT1dOXCIsIFwiTk9TRUNSRVRTXCIsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0cyBlbmNyeXB0ZWQsIHZlcmlmeSBzaWdcbiAgICAgICAgbGV0IHNpZyA9IENyeXB0by5IbWFjU2lnbmF0dXJlKHNlY3JldHMuSG1hY0tleSwgZW52LmVuYyk7XG4gICAgICAgIGlmIChzaWcudG9VcHBlckNhc2UoKSAhPSBlbnYuaG1hYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFwiX1wiLCBFdmVudHMuSW52YWxpZEhtYWNTaWduYXR1cmUsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkZWNyeXB0ZWRKc29uID0gQ3J5cHRvLkFlc0RlY3J5cHQoc2VjcmV0cy5FbmNLZXksIGVudi5lbmMpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjcnlwdGVkTXNnID0gSlNPTi5wYXJzZShkZWNyeXB0ZWRKc29uKTtcblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShkZWNyeXB0ZWRNc2cubWVzc2FnZS5pZCwgZGVjcnlwdGVkTXNnLm1lc3NhZ2UuZXZlbnQsIGRlY3J5cHRlZE1zZy5tZXNzYWdlLmRhdGEsIHRydWUpO1xuXG4gICAgICAgICAgICBtZXNzYWdlLkRhdGVUaW1lU3RhbXAgPSBkZWNyeXB0ZWRNc2cubWVzc2FnZS5kYXRldGltZTtcbiAgICAgICAgICAgIG1lc3NhZ2UuUG9zSWQgPSBkZWNyeXB0ZWRNc2cubWVzc2FnZS5wb3NfaWQ7XG4gICAgICAgICAgICBtZXNzYWdlLkluY29taW5nSG1hYyA9IGVudi5obWFjOyBcbiAgICAgICAgICAgIG1lc3NhZ2UuRGVjcnlwdGVkSnNvbiA9IGRlY3J5cHRlZEpzb247XG5cbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuXG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFwiVU5LTk9XTlwiLCBcIlVOUEFSU0VBQkxFXCIsIHtcIm1zZ1wiOiBkZWNyeXB0ZWRKc29ufSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgVG9Kc29uKHN0YW1wKSB7XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgdHpvZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCAqIDEwMDA7XG4gICAgICAgIGxldCBhZGp1c3RlZFRpbWUgPSBuZXcgRGF0ZShub3cgLSB0em9mZnNldCArIHN0YW1wLlNlcnZlclRpbWVEZWx0YSk7XG5cbiAgICAgICAgLy8gRm9ybWF0IGRhdGU6IFwieXl5eS1NTS1kZFRISDptbTpzcy5mZmZcIlxuICAgICAgICB0aGlzLkRhdGVUaW1lU3RhbXAgPSBhZGp1c3RlZFRpbWUudG9JU09TdHJpbmcoKS5zbGljZSgwLC0xKTtcbiAgICAgICAgdGhpcy5Qb3NJZCA9IHN0YW1wLlBvc0lkO1xuICAgICAgICBcbiAgICAgICAgdmFyIGVudmVsb3BlID0ge1xuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLklkLFxuICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLkV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLkRhdGEsXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IHRoaXMuRGF0ZVRpbWVTdGFtcFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghdGhpcy5fbmVlZHNFbmNyeXB0aW9uKSB7XG4gICAgICAgICAgICAvLyBVbmVuY3J5cHRlZCBNZXNzYWdlcyBuZWVkIFBvc0lEIGluc2lkZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgZW52ZWxvcGUubWVzc2FnZS5wb3NfaWQgPSB0aGlzLlBvc0lkXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5EZWNyeXB0ZWRKc29uID0gSlNPTi5zdHJpbmdpZnkoZW52ZWxvcGUpO1xuXG4gICAgICAgIGlmICghdGhpcy5fbmVlZHNFbmNyeXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5EZWNyeXB0ZWRKc29uO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuY01zZyA9IENyeXB0by5BZXNFbmNyeXB0KHN0YW1wLlNlY3JldHMuRW5jS2V5LCB0aGlzLkRlY3J5cHRlZEpzb24pO1xuICAgICAgICBsZXQgaG1hY1NpZyA9IENyeXB0by5IbWFjU2lnbmF0dXJlKHN0YW1wLlNlY3JldHMuSG1hY0tleSwgZW5jTXNnKTtcbiAgICAgICAgbGV0IGVuY3JNZXNzYWdlRW52ZWxvcGUgPSB7ZW5jOiBlbmNNc2csIGhtYWM6IGhtYWNTaWcudG9VcHBlckNhc2UoKSwgcG9zX2lkOiBzdGFtcC5Qb3NJZH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVuY3JNZXNzYWdlRW52ZWxvcGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRzLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gUGFpcmluZyBJbnRlcmFjdGlvbiAxOiBPdXRnb2luZ1xuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIFBhaXJSZXF1ZXN0IHtcbiAgICBUb01lc3NhZ2UoKSB7XG4gICAgICAgIGxldCBkYXRhID0ge3BhZGRpbmc6IHRydWV9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJcIiksIEV2ZW50cy5QYWlyUmVxdWVzdCwgZGF0YSwgZmFsc2UpO1xuICAgIH1cbn1cblxuLy8gUGFpcmluZyBJbnRlcmFjdGlvbiAyOiBJbmNvbWluZ1xuZXhwb3J0IGNsYXNzIEtleVJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKG0pIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSBtLklkO1xuICAgICAgICB0aGlzLkFlbmMgPSBtLkRhdGEuZW5jLkE7XG4gICAgICAgIHRoaXMuQWhtYWMgPSBtLkRhdGEuaG1hYy5BO1xuICAgIH1cbn1cblxuLy8gUGFpcmluZyBJbnRlcmFjdGlvbiAzOiBPdXRnb2luZ1xuZXhwb3J0IGNsYXNzIEtleVJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0SWQsIEJlbmMsIEJobWFjKSB7XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gcmVxdWVzdElkO1xuICAgICAgICB0aGlzLkJlbmMgPSBCZW5jO1xuICAgICAgICB0aGlzLkJobWFjID0gQmhtYWM7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGVuYzoge1xuICAgICAgICAgICAgICAgIEI6IHRoaXMuQmVuY1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhtYWM6IHtcbiAgICAgICAgICAgICAgICBCOiB0aGlzLkJobWFjXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHRoaXMuUmVxdWVzdElkLCBFdmVudHMuS2V5UmVzcG9uc2UsIGRhdGEsIGZhbHNlKTtcbiAgICB9XG59XG5cbi8vIFBhaXJpbmcgSW50ZXJhY3Rpb24gNDogSW5jb21pbmdcbmV4cG9ydCBjbGFzcyBLZXlDaGVjayB7XG4gICAgY29uc3RydWN0b3IobSkge1xuICAgICAgICB0aGlzLkNvbmZpcm1hdGlvbkNvZGUgPSBtLkluY29taW5nSG1hYy5zdWJzdHJpbmcoMCw2KTtcbiAgICB9XG59XG5cbi8vIFBhaXJpbmcgSW50ZXJhY3Rpb24gNTogSW5jb21pbmdcbmV4cG9ydCBjbGFzcyBQYWlyUmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKG0pIHtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gbS5EYXRhLnN1Y2Nlc3M7XG4gICAgfVxufVxuXG4vLyBIb2xkZXIgY2xhc3MgZm9yIFNlY3JldHMgYW5kIEtleVJlc3BvbnNlLCBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSB0b2dldGhlciBpbiBtZXRob2Qgc2lnbmF0dXJlcy5cbmV4cG9ydCBjbGFzcyBTZWNyZXRzQW5kS2V5UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlY3JldHMsIGtleVJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuU2VjcmV0cyA9IHNlY3JldHM7XG4gICAgICAgIHRoaXMuS2V5UmVzcG9uc2UgPSBrZXlSZXNwb25zZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcm9wS2V5c1JlcXVlc3RcbntcbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcImRycGt5c1wiKSwgRXZlbnRzLkRyb3BLZXlzQWR2aWNlLCBudWxsLCB0cnVlKTtcbiAgICB9XG59IiwiaW1wb3J0IHtFdmVudHMsIE1lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IHtQdXJjaGFzZVJlc3BvbnNlfSBmcm9tICcuL1B1cmNoYXNlJztcblxuLy8gPHN1bW1hcnk+XG4vLyBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIEJpbGxEZXRhaWxzIHRoYXQgdGhlIFBPUyB3aWxsIGJlIGFza2VkIGZvciB0aHJvdWdob3V0IGEgUGF5QXRUYWJsZSBmbG93LlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIEJpbGxTdGF0dXNSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gU2V0IHRoaXMgRXJyb3IgYWNjb3JkaW5nbHkgaWYgeW91IGFyZSBub3QgYWJsZSB0byByZXR1cm4gdGhlIEJpbGxEZXRhaWxzIHRoYXQgd2VyZSBhc2tlZCBmcm9tIHlvdS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlJlc3VsdCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhpcyBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIHRoYXQgeW91IGFzc2lnbiB0byBlYWNoIGJpbGwuXG4gICAgICAgIC8vIEl0IG1pZ3QgYmUgZm9yIGV4YW1wbGUsIHRoZSB0aW1lc3RhbXAgb2Ygd2hlbiB0aGUgY292ZXIgd2FzIG9wZW5lZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkJpbGxJZCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgdGFibGUgaWQgdGhhdCB0aGlzIGJpbGwgd2FzIGZvci5cbiAgICAgICAgLy8gVGhlIHdhaXRlciB3aWxsIGVudGVyIGl0IG9uIHRoZSBFZnRwb3MgYXQgdGhlIHN0YXJ0IG9mIHRoZSBQYXlBdFRhYmxlIGZsb3cgYW5kIHRoZSBFZnRwb3Mgd2lsbCBcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGJpbGwgdXNpbmcgdGhlIHRhYmxlIGlkLiBcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlRhYmxlSWQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBUb3RhbCBBbW91bnQgb24gdGhpcyBiaWxsLCBpbiBjZW50cy5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlRvdGFsQW1vdW50ID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgY3VycmVudGx5IG91dHNhbmRpbmcgYW1vdW50IG9uIHRoaXMgYmlsbCwgaW4gY2VudHMuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5PdXRzdGFuZGluZ0Ftb3VudCA9IDA7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFlvdXIgUE9TIGlzIHJlcXVpcmVkIHRvIHBlcnNpc3Qgc29tZSBzdGF0ZSBvbiBiZWhhbGYgb2YgdGhlIEVmdHBvcyBzbyB0aGUgRWZ0cG9zIGNhbiByZWNvdmVyIHN0YXRlLlxuICAgICAgICAvLyBJdCBpcyBqdXN0IGEgcGllY2Ugb2Ygc3RyaW5nIHRoYXQgeW91IHNhdmUgYWdhaW5zdCB5b3VyIGJpbGxJZC5cbiAgICAgICAgLy8gV0hlbmV2ZXIgeW91J3JlIGFza2VkIGZvciBCaWxsRGV0YWlscywgbWFrZSBzdXJlIHlvdSByZXR1cm4gdGhpcyBwaWVjZSBvZiBkYXRhIGlmIHlvdSBoYXZlIGl0LlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQmlsbERhdGEgPSBcIlwiO1xuICAgIH1cblxuICAgIGdldEJpbGxQYXltZW50SGlzdG9yeSgpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuQmlsbERhdGEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGJpbGxQYXltZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICBsZXQgc2F2ZWRCaWxsRGF0YSA9IEpTT04ucGFyc2UodGhpcy5CaWxsRGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHNhdmVkQmlsbERhdGEubWFwKChiaWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBheW1lbnRIaXN0b3J5RW50cnkoYmlsbC5wYXltZW50X3R5cGUsIGJpbGwucGF5bWVudF9zdW1tYXJ5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIFRvQmlsbERhdGEocGgpXG4gICAge1xuICAgICAgICBpZiAocGgubGVuZ3RoIDwgMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGgpO1xuICAgIH1cbiAgICBcbiAgICBUb01lc3NhZ2UobWVzc2FnZUlkKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInN1Y2Nlc3NcIjogdGhpcy5SZXN1bHQ9PUJpbGxSZXRyaWV2YWxSZXN1bHQuU1VDQ0VTU1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQmlsbElkKSBkYXRhLmJpbGxfaWQgPSB0aGlzLkJpbGxJZDtcbiAgICAgICAgaWYgKHRoaXMuVGFibGVJZCkgZGF0YS50YWJsZV9pZCA9IHRoaXMuVGFibGVJZDtcblxuICAgICAgICBpZiAodGhpcy5SZXN1bHQgPT0gQmlsbFJldHJpZXZhbFJlc3VsdC5TVUNDRVNTKVxuICAgICAgICB7XG4gICAgICAgICAgICBkYXRhLmJpbGxfdG90YWxfYW1vdW50ID0gdGhpcy5Ub3RhbEFtb3VudDtcbiAgICAgICAgICAgIGRhdGEuYmlsbF9vdXRzdGFuZGluZ19hbW91bnQgPSB0aGlzLk91dHN0YW5kaW5nQW1vdW50O1xuICAgICAgICAgICAgZGF0YS5iaWxsX3BheW1lbnRfaGlzdG9yeSA9IHRoaXMuZ2V0QmlsbFBheW1lbnRIaXN0b3J5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkYXRhLmVycm9yX3JlYXNvbiA9IHRoaXMuUmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBkYXRhLmVycm9yX2RldGFpbCA9IHRoaXMuUmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UobWVzc2FnZUlkLCBFdmVudHMuUGF5QXRUYWJsZUJpbGxEZXRhaWxzLCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBCaWxsUmV0cmlldmFsUmVzdWx0ID0gXG57XG4gICAgU1VDQ0VTUzogJ1NVQ0NFU1MnLFxuICAgIElOVkFMSURfVEFCTEVfSUQ6ICdJTlZBTElEX1RBQkxFX0lEJyxcbiAgICBJTlZBTElEX0JJTExfSUQ6ICdJTlZBTElEX0JJTExfSUQnLFxuICAgIElOVkFMSURfT1BFUkFUT1JfSUQ6ICdJTlZBTElEX09QRVJBVE9SX0lEJ1xufTtcblxuZXhwb3J0IGNvbnN0IFBheW1lbnRUeXBlID0gXG57XG4gICAgQ0FSRDogJ0NBUkQnLFxuICAgIENBU0g6ICdDQVNIJyBcbn07XG5cbmV4cG9ydCBjbGFzcyBCaWxsUGF5bWVudFxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9pbmNvbWluZ0FkdmljZSA9IG07XG4gICAgICAgIHRoaXMuQmlsbElkID0gdGhpcy5faW5jb21pbmdBZHZpY2UuRGF0YVtcImJpbGxfaWRcIl07XG4gICAgICAgIHRoaXMuVGFibGVJZCA9IHRoaXMuX2luY29taW5nQWR2aWNlLkRhdGFbXCJ0YWJsZV9pZFwiXTtcbiAgICAgICAgdGhpcy5PcGVyYXRvcklkID0gdGhpcy5faW5jb21pbmdBZHZpY2UuRGF0YVtcIm9wZXJhdG9yX2lkXCJdO1xuICAgICAgICBcbiAgICAgICAgdmFyIHB0ID0gdGhpcy5faW5jb21pbmdBZHZpY2UuRGF0YVtcInBheW1lbnRfdHlwZVwiXTtcbiAgICAgICAgdGhpcy5QYXltZW50VHlwZSA9IHB0O1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcyBpcyB3aGVuIHdlIHBseSB0aGUgc3ViIG9iamVjdCBcInBheW1lbnRfZGV0YWlsc1wiIGludG8gYSBwdXJjaGFzZSByZXNwb25zZSBmb3IgY29udmVuaWVuY2UuXG4gICAgICAgIHZhciBwdXJjaGFzZU1zZyA9IG5ldyBNZXNzYWdlKG0uSWQsIFwicGF5bWVudF9kZXRhaWxzXCIsIG0uRGF0YVtcInBheW1lbnRfZGV0YWlsc1wiXSwgZmFsc2UpO1xuICAgICAgICB0aGlzLlB1cmNoYXNlUmVzcG9uc2UgPSBuZXcgUHVyY2hhc2VSZXNwb25zZShwdXJjaGFzZU1zZyk7XG5cbiAgICAgICAgdGhpcy5QdXJjaGFzZUFtb3VudCA9IHRoaXMuUHVyY2hhc2VSZXNwb25zZS5HZXRQdXJjaGFzZUFtb3VudCgpO1xuICAgICAgICB0aGlzLlRpcEFtb3VudCA9IHRoaXMuUHVyY2hhc2VSZXNwb25zZS5HZXRUaXBBbW91bnQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXltZW50SGlzdG9yeUVudHJ5XG57XG4gICAgY29uc3RydWN0b3IocGF5bWVudFR5cGUsIHBheW1lbnRTdW1tYXJ5KVxuICAgIHtcbiAgICAgICAgdGhpcy5QYXltZW50VHlwZSA9IHBheW1lbnRUeXBlO1xuICAgICAgICB0aGlzLlBheW1lbnRTdW1tYXJ5ID0gcGF5bWVudFN1bW1hcnk7XG4gICAgfVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF5bWVudF90eXBlOiB0aGlzLlBheW1lbnRUeXBlLFxuICAgICAgICAgICAgcGF5bWVudF9zdW1tYXJ5OiB0aGlzLlBheW1lbnRTdW1tYXJ5XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIEdldFRlcm1pbmFsUmVmSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuUGF5bWVudFN1bW1hcnlbXCJ0ZXJtaW5hbF9yZWZfaWRcIl07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF5QXRUYWJsZUNvbmZpZ1xue1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlBheUF0VGFibGVkRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLk9wZXJhdG9ySWRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3BsaXRCeUFtb3VudEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5FcXVhbFNwbGl0RW5hYmxlZCA9IGZhbHNlO1xuICAgIFxuICAgICAgICB0aGlzLlRpcHBpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgXG4gICAgICAgIHRoaXMuU3VtbWFyeVJlcG9ydEVuYWJsZWQgPSBmYWxzZTtcbiAgICBcbiAgICAgICAgdGhpcy5MYWJlbFBheUJ1dHRvbiA9ICcnO1xuICAgICAgICB0aGlzLkxhYmVsT3BlcmF0b3JJZCA9ICcnO1xuICAgICAgICB0aGlzLkxhYmVsVGFibGVJZCA9ICcnO1xuICAgIFxuICAgICAgICAvLyBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEZpbGwgaW4gd2l0aCBvcGVyYXRvciBpZHMgdGhhdCB0aGUgZWZ0cG9zIHRlcm1pbmFsIHdpbGwgdmFsaWRhdGUgYWdhaW5zdC4gXG4gICAgICAgIC8vIExlYXZlIEVtcHR5IHRvIGFsbG93IGFueSBvcGVyYXRvcl9pZCB0aHJvdWdoLiBcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgIHRoaXMuQWxsb3dlZE9wZXJhdG9ySWRzID0gW107XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKG1lc3NhZ2VJZClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwYXlfYXRfdGFibGVfZW5hYmxlZFwiOiB0aGlzLlBheUF0VGFibGVkRW5hYmxlZCxcbiAgICAgICAgICAgIFwib3BlcmF0b3JfaWRfZW5hYmxlZFwiOiB0aGlzLk9wZXJhdG9ySWRFbmFibGVkLFxuICAgICAgICAgICAgXCJzcGxpdF9ieV9hbW91bnRfZW5hYmxlZFwiOiB0aGlzLlNwbGl0QnlBbW91bnRFbmFibGVkLFxuICAgICAgICAgICAgXCJlcXVhbF9zcGxpdF9lbmFibGVkXCI6IHRoaXMuRXF1YWxTcGxpdEVuYWJsZWQsXG4gICAgICAgICAgICBcInRpcHBpbmdfZW5hYmxlZFwiOiB0aGlzLlRpcHBpbmdFbmFibGVkLFxuICAgICAgICAgICAgXCJzdW1tYXJ5X3JlcG9ydF9lbmFibGVkXCI6IHRoaXMuU3VtbWFyeVJlcG9ydEVuYWJsZWQsXG4gICAgICAgICAgICBcInBheV9idXR0b25fbGFiZWxcIjogdGhpcy5MYWJlbFBheUJ1dHRvbixcbiAgICAgICAgICAgIFwib3BlcmF0b3JfaWRfbGFiZWxcIjogdGhpcy5MYWJlbE9wZXJhdG9ySWQsXG4gICAgICAgICAgICBcInRhYmxlX2lkX2xhYmVsXCI6IHRoaXMuTGFiZWxUYWJsZUlkLFxuICAgICAgICAgICAgXCJvcGVyYXRvcl9pZF9saXN0XCI6IHRoaXMuQWxsb3dlZE9wZXJhdG9ySWRzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKG1lc3NhZ2VJZCwgRXZlbnRzLlBheUF0VGFibGVTZXRUYWJsZUNvbmZpZywgZGF0YSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBGZWF0dXJlRGlzYWJsZU1lc3NhZ2UobWVzc2FnZUlkKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwYXlfYXRfdGFibGVfZW5hYmxlZFwiOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UobWVzc2FnZUlkLCBFdmVudHMuUGF5QXRUYWJsZVNldFRhYmxlQ29uZmlnLCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbiAgICAiLCJpbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtFdmVudHMsIE1lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuXG5leHBvcnQgY2xhc3MgUG9uZ0hlbHBlclxue1xuICAgIHN0YXRpYyBHZW5lcmF0ZVBvbmdSZXNzcG9uc2UocGluZylcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShwaW5nLklkLCBFdmVudHMuUG9uZywgbnVsbCwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGluZ0hlbHBlclxue1xuICAgIHN0YXRpYyBHZW5lcmF0ZVBpbmdSZXF1ZXN0KClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwaW5nXCIpLCBFdmVudHMuUGluZywgbnVsbCwgdHJ1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SWRIZWxwZXJ9IGZyb20gJy4vUmVxdWVzdElkSGVscGVyJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1B1cmNoYXNlUmVzcG9uc2V9IGZyb20gJy4vUHVyY2hhc2UnO1xuXG5leHBvcnQgY29uc3QgUHJlYXV0aEV2ZW50cyA9IFxue1xuICAgIEFjY291bnRWZXJpZnlSZXF1ZXN0OiBcImFjY291bnRfdmVyaWZ5XCIsXG4gICAgQWNjb3VudFZlcmlmeVJlc3BvbnNlOiBcImFjY291bnRfdmVyaWZ5X3Jlc3BvbnNlXCIsXG4gICAgXG4gICAgUHJlYXV0aE9wZW5SZXF1ZXN0IDogXCJwcmVhdXRoXCIsXG4gICAgUHJlYXV0aE9wZW5SZXNwb25zZSA6IFwicHJlYXV0aF9yZXNwb25zZVwiLFxuXG4gICAgUHJlYXV0aFRvcHVwUmVxdWVzdDogXCJwcmVhdXRoX3RvcHVwXCIsXG4gICAgUHJlYXV0aFRvcHVwUmVzcG9uc2U6IFwicHJlYXV0aF90b3B1cF9yZXNwb25zZVwiLFxuXG4gICAgUHJlYXV0aEV4dGVuZFJlcXVlc3Q6IFwicHJlYXV0aF9leHRlbmRcIixcbiAgICBQcmVhdXRoRXh0ZW5kUmVzcG9uc2U6IFwicHJlYXV0aF9leHRlbmRfcmVzcG9uc2VcIixcblxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdCA6IFwicHJlYXV0aF9wYXJ0aWFsX2NhbmNlbGxhdGlvblwiLFxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVzcG9uc2UgOiBcInByZWF1dGhfcGFydGlhbF9jYW5jZWxsYXRpb25fcmVzcG9uc2VcIixcbiAgICBcbiAgICBQcmVhdXRoQ2FuY2VsbGF0aW9uUmVxdWVzdCA6IFwicHJlYXV0aF9jYW5jZWxsYXRpb25cIixcbiAgICBQcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2UgOiBcInByZWF1dGhfY2FuY2VsbGF0aW9uX3Jlc3BvbnNlXCIsXG5cbiAgICBQcmVhdXRoQ29tcGxldGVSZXF1ZXN0IDogXCJjb21wbGV0aW9uXCIsXG4gICAgUHJlYXV0aENvbXBsZXRlUmVzcG9uc2UgOiBcImNvbXBsZXRpb25fcmVzcG9uc2VcIlxufTtcblxuZXhwb3J0IGNsYXNzIEFjY291bnRWZXJpZnlSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJhdlwiKSwgUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWNjb3VudFZlcmlmeVJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuRGV0YWlscyA9IG5ldyBQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gdGhpcy5EZXRhaWxzLlBvc1JlZklkO1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoT3BlblJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuUHJlYXV0aEFtb3VudCA9IGFtb3VudENlbnRzO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2Ftb3VudFwiOiB0aGlzLlByZWF1dGhBbW91bnRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJhY1wiKSwgUHJlYXV0aEV2ZW50cy5QcmVhdXRoT3BlblJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhUb3B1cFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihwcmVhdXRoSWQsIHRvcHVwQW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuVG9wdXBBbW91bnQgPSB0b3B1cEFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBcInByZWF1dGhfaWRcIjogdGhpcy5QcmVhdXRoSWQsXG4gICAgICAgICAgICBcInRvcHVwX2Ftb3VudFwiOiB0aGlzLlRvcHVwQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBydHVcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aFRvcHVwUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IocHJlYXV0aElkLCBwYXJ0aWFsQ2FuY2VsbGF0aW9uQW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuUGFydGlhbENhbmNlbGxhdGlvbkFtb3VudCA9IHBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2NhbmNlbF9hbW91bnRcIjogdGhpcy5QYXJ0aWFsQ2FuY2VsbGF0aW9uQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBycGNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoRXh0ZW5kUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlByZWF1dGhJZCA9IHByZWF1dGhJZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByZXh0XCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhFeHRlbmRSZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoQ2FuY2VsUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlByZWF1dGhJZCA9IHByZWF1dGhJZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYWNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhDb21wbGV0aW9uUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgY29tcGxldGlvbkFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuQ29tcGxldGlvbkFtb3VudCA9IGNvbXBsZXRpb25BbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLlN1cmNoYXJnZUFtb3VudCA9IHN1cmNoYXJnZUFtb3VudDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9pZFwiOiB0aGlzLlByZWF1dGhJZCxcbiAgICAgICAgICAgIFwiY29tcGxldGlvbl9hbW91bnRcIjogdGhpcy5Db21wbGV0aW9uQW1vdW50LFxuICAgICAgICAgICAgXCJzdXJjaGFyZ2VfYW1vdW50XCI6IHRoaXMuU3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYWNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aFJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuUHJlYXV0aElkID0gbS5EYXRhW1wicHJlYXV0aF9pZFwiXTtcbiAgICAgICAgdGhpcy5EZXRhaWxzID0gbmV3IFB1cmNoYXNlUmVzcG9uc2UobSk7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSB0aGlzLkRldGFpbHMuUG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgIH1cblxuICAgIEdldEJhbGFuY2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgdmFyIHR4VHlwZSA9IHRoaXMuX20uRGF0YVtcInRyYW5zYWN0aW9uX3R5cGVcIl07XG4gICAgICAgIHN3aXRjaCAodHhUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIFwiUFJFLUFVVEhcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wicHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiVE9QVVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFsYW5jZV9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiQ0FOQ0VMXCI6IC8vIFBBUlRJQUwgQ0FOQ0VMTEFUSU9OXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbGFuY2VfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIEVYVFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYWxhbmNlX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAwOyAvLyBCYWxhbmNlIGlzIDAgYWZ0ZXIgY29tcGxldGlvblxuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIENBTkNFTFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAwOyAvLyBCYWxhbmNlIGlzIDAgYWZ0ZXIgY2FuY2VsbGF0aW9uXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgR2V0UHJldmlvdXNCYWxhbmNlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHZhciB0eFR5cGUgPSB0aGlzLl9tLkRhdGFbXCJ0cmFuc2FjdGlvbl90eXBlXCJdO1xuICAgICAgICBzd2l0Y2ggKHR4VHlwZSlcbiAgICAgICAgeyAgIFxuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFwiVE9QVVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiZXhpc3RpbmdfcHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiQ0FOQ0VMXCI6IC8vIFBBUlRJQUwgQ0FOQ0VMTEFUSU9OXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImV4aXN0aW5nX3ByZWF1dGhfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIEVYVFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJleGlzdGluZ19wcmVhdXRoX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIC8vIFRISVMgSVMgVEVDSE5JQ0FMTFkgTk9UIENPUlJFQ1QgV0hFTiBDT01QTEVUSU9OIEhBUFBFTlMgRk9SIEEgUEFSVElBTCBBTU9VTlQuXG4gICAgICAgICAgICAgICAgLy8gQlVUIFVORk9SVFVOQVRFTFksIFRISVMgUkVTUE9OU0UgRE9FUyBOT1QgQ09OVEFJTiBcImV4aXN0aW5nX3ByZWF1dGhfYW1vdW50XCIuXG4gICAgICAgICAgICAgICAgLy8gU08gXCJjb21wbGV0aW9uX2Ftb3VudFwiIElTIFRIRSBDTE9TRVNUIFdFIEhBVkUuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImNvbXBsZXRpb25fYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIENBTkNFTFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJwcmVhdXRoX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgR2V0Q29tcGxldGlvbkFtb3VudCgpXG4gICAge1xuICAgICAgICB2YXIgdHhUeXBlID0gdGhpcy5fbS5EYXRhW1widHJhbnNhY3Rpb25fdHlwZVwiXTtcbiAgICAgICAgc3dpdGNoICh0eFR5cGUpXG4gICAgICAgIHsgICBcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjb21wbGV0aW9uX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEdldFN1cmNoYXJnZUFtb3VudCgpXG4gICAge1xuICAgICAgICB2YXIgdHhUeXBlID0gdGhpcy5fbS5EYXRhW1widHJhbnNhY3Rpb25fdHlwZVwiXTtcbiAgICAgICAgc3dpdGNoICh0eFR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJzdXJjaGFyZ2VfYW1vdW50XCJdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvKipcbiAqIFRoaXMgY2xhc3MgaXMgYSBtb2NrIHByaW50ZXIgZm9yIHRoZSB0ZXJtaW5hbCB0byBwcmludCBSZWNlaXB0c1xuICovXG5leHBvcnQgY2xhc3MgUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmJ1ZmZlciAgICAgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50ICAgID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBwcmludCguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5idWZmZXIuam9pbihgXFxuXFxuIFxcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcLyBcXG5cXG5gKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbn0iLCJpbXBvcnQge0V2ZW50cywgU3VjY2Vzc1N0YXRlLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge1NwaUNvbmZpZywgVHJhbnNhY3Rpb25PcHRpb25zfSBmcm9tICcuL1NwaU1vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBQdXJjaGFzZVJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKGFtb3VudENlbnRzLCBwb3NSZWZJZCkge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuUHVyY2hhc2VBbW91bnQgPSBhbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5UaXBBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLkNhc2hvdXRBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLlByb21wdEZvckNhc2hvdXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TdXJjaGFyZ2VBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLkNvbmZpZyA9IG5ldyBTcGlDb25maWcoKTtcbiAgICAgICAgdGhpcy5PcHRpb25zID0gbmV3IFRyYW5zYWN0aW9uT3B0aW9ucygpO1xuXG4gICAgICAgIC8vIExpYnJhcnkgQmFja3dhcmRzIENvbXBhdGliaWxpdHlcbiAgICAgICAgdGhpcy5JZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLkFtb3VudENlbnRzID0gYW1vdW50Q2VudHM7XG4gICAgfVxuXG4gICAgQW1vdW50U3VtbWFyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gYFB1cmNoYXNlOiAkeyh0aGlzLlB1cmNoYXNlQW1vdW50IC8gMTAwLjApLnRvRml4ZWQoMil9OyBcbiAgICAgICAgICAgIFRpcDogJHsodGhpcy5UaXBBbW91bnQgLyAxMDAuMCkudG9GaXhlZCgyKX07IFxuICAgICAgICAgICAgQ2FzaG91dDogJHsodGhpcy5DYXNob3V0QW1vdW50IC8gMTAwLjApLnRvRml4ZWQoMil9O2A7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHBvc19yZWZfaWQ6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBwdXJjaGFzZV9hbW91bnQ6IHRoaXMuUHVyY2hhc2VBbW91bnQsXG4gICAgICAgICAgICB0aXBfYW1vdW50OiB0aGlzLlRpcEFtb3VudCxcbiAgICAgICAgICAgIGNhc2hfYW1vdW50OiB0aGlzLkNhc2hvdXRBbW91bnQsXG4gICAgICAgICAgICBwcm9tcHRfZm9yX2Nhc2hvdXQ6IHRoaXMuUHJvbXB0Rm9yQ2FzaG91dCwgXG4gICAgICAgICAgICBzdXJjaGFyZ2VfYW1vdW50OiB0aGlzLlN1cmNoYXJnZUFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuQ29uZmlnLmFkZFJlY2VpcHRDb25maWcoZGF0YSk7XG4gICAgICAgIHRoaXMuT3B0aW9ucy5BZGRPcHRpb25zKGRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJjaHNcIiksIEV2ZW50cy5QdXJjaGFzZVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFB1cmNoYXNlUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU2NoZW1lQXBwTmFtZSA9IG0uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuXG4gICAgR2V0UHVyY2hhc2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5wdXJjaGFzZV9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0VGlwQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGlwX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRTdXJjaGFyZ2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5zdXJjaGFyZ2VfYW1vdW50O1xuICAgIH1cblxuICAgIEdldENhc2hvdXRBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jYXNoX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRCYW5rTm9uQ2FzaEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfbm9uY2FzaF9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0QmFua0Nhc2hBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5iYW5rX2Nhc2hfYW1vdW50O1xuICAgIH1cblxuICAgIEdldEN1c3RvbWVyUmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBHZXRNZXJjaGFudFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0IHx8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VUZXh0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV90ZXh0IHx8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV9jb2RlO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbFJlZmVyZW5jZUlkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfcmVmX2lkO1xuICAgIH1cblxuICAgIEdldENhcmRFbnRyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmNhcmRfZW50cnk7XG4gICAgfVxuICAgIFxuICAgIEdldEFjY291bnRUeXBlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjb3VudF90eXBlO1xuICAgIH1cblxuICAgIEdldEF1dGhDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYXV0aF9jb2RlO1xuICAgIH1cblxuICAgIEdldEJhbmtEYXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua19kYXRlO1xuICAgIH1cblxuICAgIEdldEJhbmtUaW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua190aW1lO1xuICAgIH1cbiAgICBcbiAgICBHZXRNYXNrZWRQYW4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tYXNrZWRfcGFuO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfaWQ7XG4gICAgfVxuXG4gICAgV2FzTWVyY2hhbnRSZWNlaXB0UHJpbnRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZDtcbiAgICB9XG5cbiAgICBXYXNDdXN0b21lclJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY3VzdG9tZXJfcmVjZWlwdF9wcmludGVkO1xuICAgIH1cbiAgICBcbiAgICBHZXRTZXR0bGVtZW50RGF0ZSgpXG4gICAge1xuICAgICAgICAvL1wiYmFua19zZXR0bGVtZW50X2RhdGVcIjpcIjIwMDQyMDE4XCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuYmFua19zZXR0bGVtZW50X2RhdGU7XG4gICAgICAgIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBNZXNzYWdlLlBhcnNlQmFua0RhdGUoZGF0ZVN0cik7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VWYWx1ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxuXG4gICAgVG9QYXltZW50U3VtbWFyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjb3VudF90eXBlOiB0aGlzLkdldEFjY291bnRUeXBlKCksXG4gICAgICAgICAgICBhdXRoX2NvZGU6IHRoaXMuR2V0QXV0aENvZGUoKSxcbiAgICAgICAgICAgIGJhbmtfZGF0ZTogdGhpcy5HZXRCYW5rRGF0ZSgpLFxuICAgICAgICAgICAgYmFua190aW1lOiB0aGlzLkdldEJhbmtUaW1lKCksXG4gICAgICAgICAgICBob3N0X3Jlc3BvbnNlX2NvZGU6IHRoaXMuR2V0UmVzcG9uc2VDb2RlKCksXG4gICAgICAgICAgICBob3N0X3Jlc3BvbnNlX3RleHQ6IHRoaXMuR2V0UmVzcG9uc2VUZXh0KCksXG4gICAgICAgICAgICBtYXNrZWRfcGFuOiB0aGlzLkdldE1hc2tlZFBhbigpLFxuICAgICAgICAgICAgcHVyY2hhc2VfYW1vdW50OiB0aGlzLkdldFB1cmNoYXNlQW1vdW50KCksXG4gICAgICAgICAgICBycm46IHRoaXMuR2V0UlJOKCksXG4gICAgICAgICAgICBzY2hlbWVfbmFtZTogdGhpcy5TY2hlbWVOYW1lLFxuICAgICAgICAgICAgdGVybWluYWxfaWQ6IHRoaXMuR2V0VGVybWluYWxJZCgpLFxuICAgICAgICAgICAgdGVybWluYWxfcmVmX2lkOiB0aGlzLkdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKSxcbiAgICAgICAgICAgIHRpcF9hbW91bnQ6IHRoaXMuR2V0VGlwQW1vdW50KCksXG4gICAgICAgICAgICBzdXJjaGFyZ2VfYW1vdW50OiB0aGlzLkdldFN1cmNoYXJnZUFtb3VudCgpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0XG57XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJjdHhcIiksIEV2ZW50cy5DYW5jZWxUcmFuc2FjdGlvblJlcXVlc3QsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSB0aGlzLl9tLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gdGhpcy5fbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRFcnJvclJlYXNvbigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmVycm9yX3JlYXNvbjtcbiAgICB9XG5cbiAgICBHZXRFcnJvckRldGFpbCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmVycm9yX2RldGFpbDtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVZhbHVlV2l0aEF0dHJpYnV0ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdFxue1xuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiZ2x0XCIpLCBFdmVudHMuR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCwgbnVsbCwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgfVxuXG4gICAgV2FzUmV0cmlldmVkU3VjY2Vzc2Z1bGx5KClcbiAgICB7XG4gICAgICAgIC8vIFdlIGNhbid0IHJlbHkgb24gY2hlY2tpbmcgXCJzdWNjZXNzXCIgZmxhZyBvciBcImVycm9yXCIgZmllbGRzIGhlcmUsXG4gICAgICAgIC8vIGFzIHJldHJpZXZhbCBtYXkgYmUgc3VjY2Vzc2Z1bCwgYnV0IHRoZSByZXRyaWV2ZWQgdHJhbnNhY3Rpb24gd2FzIGEgZmFpbC5cbiAgICAgICAgLy8gU28gd2UgY2hlY2sgaWYgd2UgZ290IGJhY2sgYW4gUmVzcG9uc2VDb2RlLlxuICAgICAgICAvLyAoYXMgb3Bwb3NlZCB0byBzYXkgYW4gb3BlcmF0aW9uX2luX3Byb2dyZXNzX2Vycm9yKVxuICAgICAgICByZXR1cm4gISF0aGlzLkdldFJlc3BvbnNlQ29kZSgpO1xuICAgIH1cblxuICAgIFdhc1RpbWVPdXRPZlN5bmNFcnJvcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJUSU1FX09VVF9PRl9TWU5DXCIpO1xuICAgIH1cblxuICAgIFdhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJPUEVSQVRJT05fSU5fUFJPR1JFU1NcIik7XG4gICAgfVxuXG4gICAgSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0RXJyb3IoKS5zdGFydHNXaXRoKFwiT1BFUkFUSU9OX0lOX1BST0dSRVNTX0FXQUlUSU5HX1NJR05BVFVSRVwiKTtcbiAgICB9XG5cbiAgICBJc1dhaXRpbmdGb3JBdXRoQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJPUEVSQVRJT05fSU5fUFJPR1JFU1NfQVdBSVRJTkdfUEhPTkVfQVVUSF9DT0RFXCIpO1xuICAgIH1cbiAgICBcbiAgICBJc1N0aWxsSW5Qcm9ncmVzcyhwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLldhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvcigpICYmIHRoaXMuR2V0UG9zUmVmSWQoKSA9PSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBHZXRTdWNjZXNzU3RhdGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0U3VjY2Vzc1N0YXRlKCk7XG4gICAgfVxuXG4gICAgV2FzU3VjY2Vzc2Z1bFR4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkdldFN1Y2Nlc3NTdGF0ZSgpID09IFN1Y2Nlc3NTdGF0ZS5TdWNjZXNzO1xuICAgIH1cblxuICAgIEdldFR4VHlwZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRyYW5zYWN0aW9uX3R5cGU7XG4gICAgfVxuXG4gICAgR2V0UG9zUmVmSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5wb3NfcmVmX2lkO1xuICAgIH1cblxuICAgIEdldFNjaGVtZUFwcCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgIH1cblxuICAgIEdldFNjaGVtZU5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICB9XG5cbiAgICBHZXRBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hbW91bnRfcHVyY2hhc2U7XG4gICAgfVxuXG4gICAgR2V0VHJhbnNhY3Rpb25BbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hbW91bnRfdHJhbnNhY3Rpb25fdHlwZTtcbiAgICB9XG5cbiAgICBHZXRCYW5rRGF0ZVRpbWVTdHJpbmcoKVxuICAgIHtcbiAgICAgICAgdmFyIGRzID0gdGhpcy5fbS5EYXRhLmJhbmtfZGF0ZSArIHRoaXMuX20uRGF0YS5iYW5rX3RpbWU7XG4gICAgICAgIHJldHVybiBkcztcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuICAgIFxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dCB8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV9jb2RlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoZXJlIGlzIGEgYnVnLCBWU1YtOTIwLCB3aGVyZWJ5IHRoZSBjdXN0b21lcl9yZWNlaXB0IGlzIG1pc3NpbmcgZnJvbSBhIGdsdCByZXNwb25zZS5cbiAgICAvLyBUaGUgY3VycmVudCByZWNvbW1lbmRhdGlvbiBpcyB0byB1c2UgdGhlIG1lcmNoYW50IHJlY2VpcHQgaW4gcGxhY2Ugb2YgaXQgaWYgcmVxdWlyZWQuXG4gICAgLy8gVGhpcyBtZXRob2QgbW9kaWZpZXMgdGhlIHVuZGVybHlpbmcgaW5jb21pbmcgbWVzc2FnZSBkYXRhIGJ5IGNvcHlpbmdcbiAgICAvLyB0aGUgbWVyY2hhbnQgcmVjZWlwdCBpbnRvIHRoZSBjdXN0b21lciByZWNlaXB0IG9ubHkgaWYgdGhlcmUgXG4gICAgLy8gaXMgYSBtZXJjaGFudF9yZWNlaXB0IGFuZCB0aGVyZSBpcyBub3QgYSBjdXN0b21lcl9yZWNlaXB0LiAgIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBDb3B5TWVyY2hhbnRSZWNlaXB0VG9DdXN0b21lclJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgdmFyIGNyID0gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQ7XG4gICAgICAgIHZhciBtciA9IHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgICAgICBpZiAobXIgIT0gXCJcIiAmJiAhKGNyKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQgPSBtcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZnVuZFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLkFtb3VudENlbnRzID0gYW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuSWQgPSBSZXF1ZXN0SWRIZWxwZXIuSWQoXCJyZWZ1bmRcIik7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIGxldCBkYXRhID0ge3JlZnVuZF9hbW91bnQ6IHRoaXMuQW1vdW50Q2VudHMsIHBvc19yZWZfaWQ6IHRoaXMuUG9zUmVmSWR9O1xuICAgICAgICB0aGlzLkNvbmZpZy5hZGRSZWNlaXB0Q29uZmlnKGRhdGEpO1xuICAgICAgICB0aGlzLk9wdGlvbnMuQWRkT3B0aW9ucyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInJlZnVuZFwiKSwgRXZlbnRzLlJlZnVuZFJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZnVuZFJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TY2hlbWVOYW1lID0gbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgICAgICB0aGlzLlNjaGVtZUFwcE5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0UmVmdW5kQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucmVmdW5kX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuXG4gICAgR2V0Q3VzdG9tZXJSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY3VzdG9tZXJfcmVjZWlwdCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldE1lcmNoYW50UmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1lcmNoYW50X3JlY2VpcHQ7XG4gICAgfVxuICAgIFxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfY29kZSB8fCBcIlwiO1xuICAgIH1cblxuXG4gICAgR2V0VGVybWluYWxSZWZlcmVuY2VJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX3JlZl9pZCB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRDYXJkRW50cnkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jYXJkX2VudHJ5IHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEFjY291bnRUeXBlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjb3VudF90eXBlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEF1dGhDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYXV0aF9jb2RlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEJhbmtEYXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua19kYXRlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEJhbmtUaW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua190aW1lIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldE1hc2tlZFBhbigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1hc2tlZF9wYW4gfHwgXCJcIjtcbiAgICB9XG4gICAgR2V0VGVybWluYWxJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX2lkIHx8IFwiXCI7XG4gICAgfVxuICAgIFdhc01lcmNoYW50UmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0X3ByaW50ZWQ7XG4gICAgfVxuICAgIFdhc0N1c3RvbWVyUmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jdXN0b21lcl9yZWNlaXB0X3ByaW50ZWQ7XG4gICAgfVxuICAgIEdldFNldHRsZW1lbnREYXRlKClcbiAgICB7XG4gICAgICAgIC8vXCJiYW5rX3NldHRsZW1lbnRfZGF0ZVwiOlwiMjAwNDIwMThcIlxuICAgICAgICB2YXIgZGF0ZVN0ciA9IHRoaXMuX20uRGF0YS5iYW5rX3NldHRsZW1lbnRfZGF0ZTtcbiAgICAgICAgaWYgKCFkYXRlU3RyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuUGFyc2VCYW5rRGF0ZShkYXRlU3RyKTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVZhbHVlKGF0dHJpYnV0ZSlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbYXR0cmlidXRlXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVSZXF1aXJlZFxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5fcmVjZWlwdFRvU2lnbiA9IG0uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgIH1cbiAgICBcbiAgICBTaWduYXR1cmVSZXF1aXJlZChwb3NSZWZJZCwgcmVxdWVzdElkLCByZWNlaXB0VG9TaWduKVxuICAgIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSByZXF1ZXN0SWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5fcmVjZWlwdFRvU2lnbiA9IHJlY2VpcHRUb1NpZ247XG4gICAgfVxuXG4gICAgR2V0TWVyY2hhbnRSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWNlaXB0VG9TaWduO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZURlY2xpbmVcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJzaWdkZWNcIiksIEV2ZW50cy5TaWduYXR1cmVEZWNsaW5lZCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlQWNjZXB0XG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3JlZl9pZDogdGhpcy5Qb3NSZWZJZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwic2lnYWNjXCIpLCBFdmVudHMuU2lnbmF0dXJlQWNjZXB0ZWQsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdG9QdXJjaGFzZVJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudClcbiAgICB7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5QdXJjaGFzZUFtb3VudCA9IGFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLlN1cmNoYXJnZUFtb3VudCA9IHN1cmNoYXJnZUFtb3VudDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgcHVyY2hhc2VfYW1vdW50OiB0aGlzLlB1cmNoYXNlQW1vdW50LFxuICAgICAgICAgICAgc3VyY2hhcmdlX2Ftb3VudDogdGhpcy5TdXJjaGFyZ2VBbW91bnRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5Db25maWcuYWRkUmVjZWlwdENvbmZpZyhkYXRhKTtcbiAgICAgICAgdGhpcy5PcHRpb25zLkFkZE9wdGlvbnMoZGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJtb3RvXCIpLCBFdmVudHMuTW90b1B1cmNoYXNlUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW90b1B1cmNoYXNlUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5QdXJjaGFzZVJlc3BvbnNlID0gbmV3IFB1cmNoYXNlUmVzcG9uc2UobSk7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBQdXJjaGFzZVJlc3BvbnNlLlBvc1JlZklkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBob25lRm9yQXV0aFJlcXVpcmVkXG57XG4gICAgY29uc3RydWN0b3IoLi4uYXJncylcbiAgICB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICB0aGlzLlBvc1JlZklkID0gYXJnc1swXTtcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdElkID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3Bob25lTnVtYmVyID0gYXJnc1syXTtcbiAgICAgICAgICAgIHRoaXMuX21lcmNoYW50SWQgPSBhcmdzWzNdO1xuICAgICAgICB9IGVsc2UgaWYoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdElkID0gYXJnc1swXS5JZDtcbiAgICAgICAgICAgIHRoaXMuUG9zUmVmSWQgPSBhcmdzWzBdLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgICAgIHRoaXMuX3Bob25lTnVtYmVyID0gYXJnc1swXS5EYXRhLmF1dGhfY2VudHJlX3Bob25lX251bWJlcjtcbiAgICAgICAgICAgIHRoaXMuX21lcmNoYW50SWQgPSBhcmdzWzBdLkRhdGEubWVyY2hhbnRfaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbCBzaWcgZm9yIFBob25lIGF1dGggcmVxdWlyZWQgY2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBHZXRQaG9uZU51bWJlcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGhvbmVOdW1iZXI7XG4gICAgfVxuICAgIFxuICAgIEdldE1lcmNoYW50SWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmNoYW50SWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXV0aENvZGVBZHZpY2VcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZCwgYXV0aENvZGUpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuQXV0aENvZGUgPSBhdXRoQ29kZTtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgYXV0aF9jb2RlOiB0aGlzLkF1dGhDb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJhdXRoYWRcIiksIEV2ZW50cy5BdXRoQ29kZUFkdmljZSwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufSIsImltcG9ydCB7UHVyY2hhc2VSZXF1ZXN0LCBSZWZ1bmRSZXF1ZXN0fSBmcm9tICcuL1B1cmNoYXNlJztcblxuZXhwb3J0IGNsYXNzIFB1cmNoYXNlSGVscGVyXG57XG4gICAgc3RhdGljIENyZWF0ZVB1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcHVyY2hhc2VJZClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgUHVyY2hhc2VSZXF1ZXN0KGFtb3VudENlbnRzLCBwdXJjaGFzZUlkKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIENyZWF0ZVB1cmNoYXNlUmVxdWVzdFYyKHBvc1JlZklkLCBwdXJjaGFzZUFtb3VudCwgdGlwQW1vdW50LCBjYXNob3V0QW1vdW50LCBwcm9tcHRGb3JDYXNob3V0LCBzdXJjaGFyZ2VBbW91bnQpXG4gICAge1xuICAgICAgICB2YXIgcHIgPSBPYmplY3QuYXNzaWduKG5ldyBQdXJjaGFzZVJlcXVlc3QocHVyY2hhc2VBbW91bnQsIHBvc1JlZklkKSxcbiAgICAgICAge1xuICAgICAgICAgICAgQ2FzaG91dEFtb3VudDogY2FzaG91dEFtb3VudCxcbiAgICAgICAgICAgIFRpcEFtb3VudDogdGlwQW1vdW50LFxuICAgICAgICAgICAgUHJvbXB0Rm9yQ2FzaG91dDogcHJvbXB0Rm9yQ2FzaG91dCxcbiAgICAgICAgICAgIFN1cmNoYXJnZUFtb3VudDogc3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgQ3JlYXRlUmVmdW5kUmVxdWVzdChhbW91bnRDZW50cywgcHVyY2hhc2VJZCwgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IFJlZnVuZFJlcXVlc3QoYW1vdW50Q2VudHMsIHB1cmNoYXNlSWQsIGlzU3VwcHJlc3NNZXJjaGFudFBhc3N3b3JkKTtcbiAgICB9XG5cbn1cbiIsImxldCBfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIgPSAxO1xuXG5leHBvcnQgY2xhc3MgUmVxdWVzdElkSGVscGVyIHtcbiAgICBzdGF0aWMgSWQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyBfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIrKztcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU2VjcmV0cyB7XG4gICAgY29uc3RydWN0b3IoZW5jS2V5LCBobWFjS2V5KSB7XG4gICAgICAgIHRoaXMuRW5jS2V5ICAgICA9IGVuY0tleTtcbiAgICAgICAgdGhpcy5IbWFjS2V5ICAgID0gaG1hY0tleTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZShFbmNLZXksIEhtYWNLZXkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuY0tleScsIEVuY0tleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIbWFjS2V5JywgSG1hY0tleSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlc3RvcmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VjcmV0cyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRW5jS2V5JyksIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIbWFjS2V5JykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1NhdmVkKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0VuY0tleScpICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIbWFjS2V5Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIFJlc2V0KCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnRW5jS2V5Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdIbWFjS2V5Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIERldmljZUFkZHJlc3NTdGF0dXNcbntcbiAgICBjb25zdHJ1Y3RvcihhZGRyZXNzLCBsYXN0VXBkYXRlZCkgXG4gICAge1xuICAgICAgICB0aGlzLkFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLkxhc3RVcGRhdGVkID0gbGFzdFVwZGF0ZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGV2aWNlQWRkcmVzc1NlcnZpY2VcbntcbiAgICBSZXRyaWV2ZVNlcnZpY2Uoc2VyaWFsTnVtYmVyLCBhcGlLZXkgPSAnc3BpLXNhbXBsZS1wb3MxJywgaXNUZXN0TW9kZSlcbiAgICB7XG4gICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBzYW5kYm94IGFuZCBwcm9kIHVybHNcbiAgICAgICAgdmFyIGRldmljZUFkZHJlc3NVcmkgPSBpc1Rlc3RNb2RlID8gYC9hcGkvdjEvaXA/c2VyaWFsPSR7c2VyaWFsTnVtYmVyfWAgOiBgaHR0cHM6Ly9kZXZpY2UtYWRkcmVzcy1hcGktZGV2Lm5vbnByb2Qtd2JjLm1zcC5hc3NlbWJseXBheW1lbnRzLmNvbS92MS8ke3NlcmlhbE51bWJlcn0vaXBgO1xuXG4gICAgICAgIHJldHVybiBmZXRjaChkZXZpY2VBZGRyZXNzVXJpLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQVNNLU1TUC1ERVZJQ0UtQUREUkVTUy1BUEktS0VZXCI6IGFwaUtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC5jYXRjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFN0YXR1cyBjb2RlICR7cmVzcG9uc2UuU3RhdHVzQ29kZX0gcmVjZWl2ZWQgZnJvbSAke2RldmljZUFkZHJlc3NVcml9IC0gRXhjZXB0aW9uICR7cmVzcG9uc2UuRXJyb3JFeGNlcHRpb259YCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudHMsIFN1Y2Nlc3NTdGF0ZSwgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0bGVSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCkge1xuICAgICAgICB0aGlzLklkID0gaWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UodGhpcy5JZCwgRXZlbnRzLlNldHRsZVJlcXVlc3QsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldHRsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG0pIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSBtLklkO1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRTZXR0bGVCeUFjcXVpcmVyQ291bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hY2N1bXVsYXRlZF9zZXR0bGVfYnlfYWNxdWlyZXJfY291bnQ7XG4gICAgfVxuXG4gICAgR2V0U2V0dGxlQnlBY3F1aXJlclZhbHVlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfc2V0dGxlX2J5X2FjcXVpcmVyX3ZhbHVlO1xuICAgIH1cblxuICAgIEdldFRvdGFsQ291bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hY2N1bXVsYXRlZF90b3RhbF9jb3VudDtcbiAgICB9XG5cbiAgICBHZXRUb3RhbFZhbHVlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfdG90YWxfdmFsdWU7XG4gICAgfVxuXG4gICAgR2V0UGVyaW9kU3RhcnRUaW1lKClcbiAgICB7XG4gICAgICAgIHZhciB0aW1lU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfcGVyaW9kX3N0YXJ0X3RpbWU7IC8vIFwiMDU6MDBcIlxuICAgICAgICB2YXIgZGF0ZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3BlcmlvZF9zdGFydF9kYXRlOyAvLyBcIjA1T2N0MTdcIlxuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlU3RyLCB0aW1lU3RyKTtcbiAgICB9XG5cbiAgICBHZXRQZXJpb2RFbmRUaW1lKClcbiAgICB7XG4gICAgICAgIHZhciB0aW1lU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfcGVyaW9kX2VuZF90aW1lOyAvLyBcIjA1OjAwXCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuc2V0dGxlbWVudF9wZXJpb2RfZW5kX2RhdGU7IC8vIFwiMDVPY3QxN1wiXG4gICAgICAgIHJldHVybiBNZXNzYWdlLlBhcnNlQmFua0RhdGVUaW1lU3RyKGRhdGVTdHIsIHRpbWVTdHIpO1xuICAgIH1cblxuICAgIEdldFRyaWdnZXJlZFRpbWUoKVxuICAgIHtcbiAgICAgICAgdmFyIHRpbWVTdHIgPSB0aGlzLl9tLkRhdGEuc2V0dGxlbWVudF90cmlnZ2VyZWRfdGltZTsgLy8gXCIwNTowMDo0NVwiXG4gICAgICAgIHZhciBkYXRlU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfdHJpZ2dlcmVkX2RhdGU7IC8vIFwiMDVPY3QxN1wiXG4gICAgICAgIHJldHVybiBNZXNzYWdlLlBhcnNlQmFua0RhdGVUaW1lU3RyKGRhdGVTdHIsIHRpbWVTdHIpO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dDtcbiAgICB9XG4gICAgXG4gICAgR2V0UmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1lcmNoYW50X3JlY2VpcHQ7XG4gICAgfVxuXG4gICAgR2V0VHJhbnNhY3Rpb25SYW5nZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRyYW5zYWN0aW9uX3JhbmdlO1xuICAgIH1cblxuICAgIEdldFRlcm1pbmFsSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50ZXJtaW5hbF9pZDtcbiAgICB9XG5cbiAgICBHZXRTY2hlbWVTZXR0bGVtZW50RW50cmllcygpXG4gICAge1xuICAgICAgICB2YXIgc2NoZW1lcyA9IHRoaXMuX20uRGF0YS5zY2hlbWVzO1xuICAgICAgICBpZiAoIXNjaGVtZXMpIHJldHVybiBbXTtcblxuICAgICAgICByZXR1cm4gc2NoZW1lcy5tYXAoKHNjaGVtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2hlbWVTZXR0bGVtZW50RW50cnkoc2NoZW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1lU2V0dGxlbWVudEVudHJ5XG57XG4gICAgLy8gU2NoZW1lU2V0dGxlbWVudEVudHJ5KHN0cmluZyBzY2hlbWVOYW1lLCBib29sIHNldHRsZUJ5QWNxdWlyZXIsIGludCB0b3RhbENvdW50LCBpbnQgdG90YWxWYWx1ZSlcbiAgICAvLyBTY2hlbWVTZXR0bGVtZW50RW50cnkoT2JqZWN0IHNjaGVtZU9iailcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKVxuICAgIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuU2NoZW1lTmFtZSA9IGFyZ3NbMF0uc2NoZW1lX25hbWU7XG4gICAgICAgICAgICB0aGlzLlNldHRsZUJ5QWNxdWlyZXIgPSBhcmdzWzBdLnNldHRsZV9ieV9hY3F1aXJlci50b0xvd2VyQ2FzZSgpID09IFwieWVzXCI7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVmFsdWUgPSBwYXJzZUludChhcmdzWzBdLnRvdGFsX3ZhbHVlLDEwKTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxDb3VudCA9IHBhcnNlSW50KGFyZ3NbMF0udG90YWxfY291bnQsMTApO1xuICAgICAgICB9IGVsc2UgaWYoYXJncy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgIHRoaXMuU2NoZW1lTmFtZSA9IGFyZ3NbMF07XG4gICAgICAgICAgICB0aGlzLlNldHRsZUJ5QWNxdWlyZXIgPSBhcmdzWzFdO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbENvdW50ID0gYXJnc1syXTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxWYWx1ZSA9IGFyZ3NbM107XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgVG9TdHJpbmcoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGBTY2hlbWVOYW1lOiAke3RoaXMuU2NoZW1lTmFtZX0sIFNldHRsZUJ5QWNxdWlyZXI6ICR7dGhpcy5TZXR0bGVCeUFjcXVpcmVyfSwgVG90YWxDb3VudDogJHt0aGlzLlRvdGFsQ291bnR9LCBUb3RhbFZhbHVlOiAke3RoaXMuVG90YWxWYWx1ZX1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldHRsZW1lbnRFbnF1aXJ5UmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKGlkKVxuICAgIHtcbiAgICAgICAgdGhpcy5JZCA9IGlkO1xuICAgIH1cbiAgICBcbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHRoaXMuSWQsIEV2ZW50cy5TZXR0bGVtZW50RW5xdWlyeVJlcXVlc3QsIG51bGwsIHRydWUpO1xuICAgIH1cbn0iLCJpbXBvcnQge01lc3NhZ2UsIE1lc3NhZ2VTdGFtcCwgRXZlbnRzLCBTdWNjZXNzU3RhdGV9IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IHtTcGlDb25maWcsIFNwaUZsb3csIFNwaVN0YXR1cywgUGFpcmluZ0Zsb3dTdGF0ZSwgVHJhbnNhY3Rpb25GbG93U3RhdGUsIEluaXRpYXRlVHhSZXN1bHR9IGZyb20gJy4vU3BpTW9kZWxzJztcbmltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge0Nvbm5lY3Rpb24sIENvbm5lY3Rpb25TdGF0ZX0gZnJvbSAnLi9Db25uZWN0aW9uJztcbmltcG9ydCB7U3BpUGF5QXRUYWJsZX0gZnJvbSAnLi9TcGlQYXlBdFRhYmxlJztcbmltcG9ydCB7UGF5QXRUYWJsZUNvbmZpZ30gZnJvbSAnLi9QYXlBdFRhYmxlJztcbmltcG9ydCB7U3BpUHJlYXV0aH0gZnJvbSAnLi9TcGlQcmVhdXRoJztcbmltcG9ydCB7RHJvcEtleXNSZXF1ZXN0fSBmcm9tICcuL1BhaXJpbmcnO1xuaW1wb3J0IHtQdXJjaGFzZUhlbHBlcn0gZnJvbSAnLi9QdXJjaGFzZUhlbHBlcic7XG5pbXBvcnQge0tleVJvbGxpbmdIZWxwZXJ9IGZyb20gJy4vS2V5Um9sbGluZ0hlbHBlcic7XG5pbXBvcnQge1BpbmdIZWxwZXIsIFBvbmdIZWxwZXJ9IGZyb20gJy4vUGluZ0hlbHBlcic7XG5pbXBvcnQge0dldExhc3RUcmFuc2FjdGlvblJlcXVlc3QsIENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdCwgU2lnbmF0dXJlUmVxdWlyZWQsIENhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2V9IGZyb20gJy4vUHVyY2hhc2UnO1xuaW1wb3J0IHtEZXZpY2VBZGRyZXNzU2VydmljZSwgRGV2aWNlQWRkcmVzc1N0YXR1c30gZnJvbSAnLi9TZXJ2aWNlL0RldmljZVNlcnZpY2UnO1xuXG5jb25zdCBTUElfVkVSU0lPTiA9ICcyLjQuMCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaSB7XG5cbiAgICBnZXQgQ3VycmVudFN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0dXM7XG4gICAgfVxuXG4gICAgc2V0IEN1cnJlbnRTdGF0dXModmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5fY3VycmVudFN0YXR1cyA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSB2YWx1ZTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1N0YXR1c0NoYW5nZWQnLCB7ZGV0YWlsOiB2YWx1ZX0pKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3NJZCwgc2VyaWFsTnVtYmVyLCBlZnRwb3NBZGRyZXNzLCBzZWNyZXRzKSBcbiAgICB7XG4gICAgICAgIHRoaXMuX3Bvc0lkID0gcG9zSWQ7XG4gICAgICAgIHRoaXMuX3NlcmlhbE51bWJlciA9IHNlcmlhbE51bWJlcjtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IHNlY3JldHM7XG4gICAgICAgIHRoaXMuX2VmdHBvc0FkZHJlc3MgPSBcIndzOi8vXCIgKyBlZnRwb3NBZGRyZXNzO1xuICAgICAgICB0aGlzLl9sb2cgPSBjb25zb2xlO1xuICAgICAgICB0aGlzLkNvbmZpZyA9IG5ldyBTcGlDb25maWcoKTtcblxuICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9kZXZpY2VBcGlLZXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9pblRlc3RNb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBPdXIgc3RhbXAgZm9yIHNpZ25pbmcgb3V0Z29pbmcgbWVzc2FnZXNcbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wID0gbmV3IE1lc3NhZ2VTdGFtcCh0aGlzLl9wb3NJZCwgdGhpcy5fc2VjcmV0cywgMCk7XG5cbiAgICAgICAgdGhpcy5fcG9zVmVuZG9ySWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wb3NWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5faGFzU2V0SW5mbyA9IG51bGw7XG5cbiAgICAgICAgLy8gV2Ugd2lsbCBtYWludGFpbiBzb21lIHN0YXRlXG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9taXNzZWRQb25nc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudExvZ2luUmVzcG9uc2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3BvbmdUaW1lb3V0ID0gNTAwMDtcbiAgICAgICAgdGhpcy5fcGluZ0ZyZXF1ZW5jeSA9IDE4MDAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fcmVhZHlUb1RyYW5zYWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGVyaW9kaWNQaW5nVGhyZWFkID0gbnVsbDtcblxuICAgICAgICB0aGlzLl90eE1vbml0b3JDaGVja0ZyZXF1ZW5jeSA9IDEwMDA7XG4gICAgICAgIHRoaXMuX2NoZWNrT25UeEZyZXF1ZW5jeSA9IDIwMDAwO1xuICAgICAgICB0aGlzLl9tYXhXYWl0Rm9yQ2FuY2VsVHggPSAxMDAwMDtcbiAgICAgICAgdGhpcy5fc2xlZXBCZWZvcmVSZWNvbm5lY3RNcyA9IDUwMDA7XG4gICAgICAgIHRoaXMuX21pc3NlZFBvbmdzVG9EaXNjb25uZWN0ID0gMjtcbiAgICAgICAgdGhpcy5fcmV0cmllc0JlZm9yZVJlc29sdmluZ0RldmljZUFkZHJlc3MgPSA1O1xuXG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgICAgICAgICAgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgICAgICAgICA9IG51bGw7XG4gICAgfVxuXG4gICAgRW5hYmxlUGF5QXRUYWJsZSgpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGlQYXQgPSBuZXcgU3BpUGF5QXRUYWJsZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwaVBhdDtcbiAgICB9XG5cbiAgICBFbmFibGVQcmVhdXRoKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwaVByZWF1dGggPSBuZXcgU3BpUHJlYXV0aCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwaVByZWF1dGg7XG4gICAgfVxuXG4gICAgU3RhcnQoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wb3NWZW5kb3JJZCB8fCAhdGhpcy5fcG9zVmVyc2lvbilcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUE9TIGluZm9ybWF0aW9uIGlzIG5vdyByZXF1aXJlZCB0byBiZSBzZXRcbiAgICAgICAgICAgIHRoaXMuX2xvZy5XYXJuKFwiTWlzc2luZyBQT1MgdmVuZG9yIElEIGFuZCB2ZXJzaW9uLiBwb3NWZW5kb3JJZCBhbmQgcG9zVmVyc2lvbiBhcmUgcmVxdWlyZWQgYmVmb3JlIHN0YXJ0aW5nXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgUE9TIHZlbmRvciBJRCBhbmQgdmVyc2lvbi4gcG9zVmVuZG9ySWQgYW5kIHBvc1ZlcnNpb24gYXJlIHJlcXVpcmVkIGJlZm9yZSBzdGFydGluZ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q29ubigpO1xuICAgICAgICB0aGlzLl9zdGFydFRyYW5zYWN0aW9uTW9uaXRvcmluZ1RocmVhZCgpO1xuXG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LklkbGU7XG4gICAgICAgIGlmICh0aGlzLl9zZWNyZXRzICE9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiU3RhcnRpbmcgaW4gUGFpcmVkIFN0YXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0aW5nO1xuICAgICAgICAgICAgdGhpcy5fY29ubi5Db25uZWN0KCk7IC8vIFRoaXMgaXMgbm9uLWJsb2NraW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlN0YXJ0aW5nIGluIFVucGFpcmVkIFN0YXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5VbnBhaXJlZDtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIFNldCB0aGUgYXBpIGtleSB1c2VkIGZvciBhdXRvIGFkZHJlc3MgZGlzY292ZXJ5IGZlYXR1cmVcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgU2V0RGV2aWNlQXBpS2V5KGRldmljZUFwaUtleSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2RldmljZUFwaUtleSA9IGRldmljZUFwaUtleTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgc2VyaWFsIG51bWJlciBvZiB0aGUgRWZ0cG9zXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBTZXRTZXJpYWxOdW1iZXIoc2VyaWFsTnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQgJiYgdGhpcy5IYXNTZXJpYWxOdW1iZXJDaGFuZ2VkKHNlcmlhbE51bWJlcikpXG4gICAgICAgICAgICB0aGlzLl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3NlcmlhbE51bWJlciA9IHNlcmlhbE51bWJlcjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgYXV0byBhZGRyZXNzIGRpc2NvdmVyeSBmZWF0dXJlLiBcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgU2V0QXV0b0FkZHJlc3NSZXNvbHV0aW9uKGF1dG9BZGRyZXNzUmVzb2x1dGlvbilcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoYXV0b0FkZHJlc3NSZXNvbHV0aW9uICYmICF0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB3ZSdyZSB0dXJuaW5nIGl0IG9uXG4gICAgICAgICAgICB0aGlzLl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkID0gYXV0b0FkZHJlc3NSZXNvbHV0aW9uO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIENhbGwgdGhpcyBtZXRob2QgdG8gc2V0IHRoZSBjbGllbnQgbGlicmFyeSB0ZXN0IG1vZGUuXG4gICAgLy8vIFNldCBpdCB0byB0cnVlIG9ubHkgd2hpbGUgeW91IGFyZSBkZXZlbG9waW5nIHRoZSBpbnRlZ3JhdGlvbi4gXG4gICAgLy8vIEl0IGRlZmF1bHRzIHRvIGZhbHNlLiBGb3IgYSByZWFsIG1lcmNoYW50LCBhbHdheXMgbGVhdmUgaXQgc2V0IHRvIGZhbHNlLiBcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cGFyYW0gbmFtZT1cInRlc3RNb2RlXCI+PC9wYXJhbT5cbiAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIFNldFRlc3RNb2RlKHRlc3RNb2RlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRlc3RNb2RlICE9IHRoaXMuX2luVGVzdE1vZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHdlJ3JlIGNoYW5naW5nIG1vZGVcbiAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9pblRlc3RNb2RlID0gdGVzdE1vZGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEFsbG93cyB5b3UgdG8gc2V0IHRoZSBQb3NJZCB3aGljaCBpZGVudGlmaWVzIHRoaXMgaW5zdGFuY2Ugb2YgeW91ciBQT1MuXG4gICAgLy8gQ2FuIG9ubHkgYmUgY2FsbGVkIGluIHRoZ2UgVW5wYWlyZWQgc3RhdGUuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBTZXRQb3NJZChwb3NJZClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Bvc0lkID0gcG9zSWQ7XG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5Qb3NJZCA9IHBvc0lkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgUGluUGFkIGFkZHJlc3MuIFNvbWV0aW1lcyB0aGUgUGluUGFkIG1pZ2h0IGNoYW5nZSBJUCBhZGRyZXNzIFxuICAgIC8vICh3ZSByZWNvbW1lbmQgcmVzZXJ2aW5nIHN0YXRpYyBJUHMgaWYgcG9zc2libGUpLlxuICAgIC8vIEVpdGhlciB3YXkgeW91IG5lZWQgdG8gYWxsb3cgeW91ciBVc2VyIHRvIGVudGVyIHRoZSBJUCBhZGRyZXNzIG9mIHRoZSBQaW5QYWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFNldEVmdHBvc0FkZHJlc3MoYWRkcmVzcylcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3RlZCB8fCB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gXCJ3czovL1wiICsgYWRkcmVzcztcbiAgICAgICAgdGhpcy5fY29ubi5BZGRyZXNzID0gdGhpcy5fZWZ0cG9zQWRkcmVzcztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIEdldFZlcnNpb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFNQSV9WRVJTSU9OO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyBvbmUgd2hlbiBhIGZsb3cgaXMgZmluaXNoZWQgYW5kIHlvdSB3YW50IHRvIGdvIGJhY2sgdG8gaWRsZSBzdGF0ZS5cbiAgICAvLyBUeXBpY2FsbHkgd2hlbiB5b3VyIHVzZXIgY2xpY2tzIHRoZSBcIk9LXCIgYnVidHRvbiB0byBhY2tub3dsZGdlIHRoYXQgcGFpcmluZyBpc1xuICAgIC8vIGZpbmlzaGVkLCBvciB0aGF0IHRyYW5zYWN0aW9uIGlzIGZpbmlzaGVkLlxuICAgIC8vIFdoZW4gdHJ1ZSwgeW91IGNhbiBkaXNtaXNzIHRoZSBmbG93IHNjcmVlbiBhbmQgc2hvdyBiYWNrIHRoZSBpZGxlIHNjcmVlbi5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHJldHVybnM+dHJ1ZSBtZWFucyB3ZSBoYXZlIG1vdmVkIGJhY2sgdG8gdGhlIElkbGUgc3RhdGUuIGZhbHNlIG1lYW5zIGN1cnJlbnQgZmxvdyB3YXMgbm90IGZpbmlzaGVkIHlldC48L3JldHVybnM+XG4gICAgQWNrRmxvd0VuZGVkQW5kQmFja1RvSWRsZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LklkbGUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gYWxyZWFkeSBpZGxlXG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5QYWlyaW5nICYmIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LklkbGU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuSWRsZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyB3aWxsIGNvbm5lY3QgdG8gdGhlIEVmdHBvcyBhbmQgc3RhcnQgdGhlIHBhaXJpbmcgcHJvY2Vzcy5cbiAgICAvLyBPbmx5IGNhbGwgdGhpcyBpZiB5b3UgYXJlIGluIHRoZSBVbnBhaXJlZCBzdGF0ZS5cbiAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIFBhaXJpbmdGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwYWlyaW5nIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxyZXR1cm5zPldoZXRoZXIgcGFpcmluZyBoYXMgaW5pdGlhdGVkIG9yIG5vdDwvcmV0dXJucz5cbiAgICBQYWlyKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIlRyaWVkIHRvIFBhaXIgYnV0IHdlJ3JlIGFscmVhZHkgc28uXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wb3NJZCB8fCAhdGhpcy5fZWZ0cG9zQWRkcmVzcylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJUcmllZCB0byBQYWlyIGJ1dCBtaXNzaW5nIHBvc0lkIG9yIHVwZGF0ZWRFZnRwb3NBZGRyZXNzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuUGFpcmluZztcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZSA9IG5ldyBQYWlyaW5nRmxvd1N0YXRlXG4gICAgICAgICh7XG4gICAgICAgICAgICBTdWNjZXNzZnVsOiBmYWxzZSxcbiAgICAgICAgICAgIEZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIE1lc3NhZ2U6IFwiQ29ubmVjdGluZy4uLlwiLFxuICAgICAgICAgICAgQXdhaXRpbmdDaGVja0Zyb21FZnRwb3M6IGZhbHNlLFxuICAgICAgICAgICAgQXdhaXRpbmdDaGVja0Zyb21Qb3M6IGZhbHNlLFxuICAgICAgICAgICAgQ29uZmlybWF0aW9uQ29kZTogXCJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICB0aGlzLl9jb25uLkNvbm5lY3QoKTsgLy8gTm9uLUJsb2NraW5nXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyB3aGVuIHlvdXIgdXNlciBjbGlja3MgeWVzIHRvIGNvbmZpcm0gdGhlIHBhaXJpbmcgY29kZSBvbiB5b3VyIFxuICAgIC8vIHNjcmVlbiBtYXRjaGVzIHRoZSBvbmUgb24gdGhlIEVmdHBvcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmluZ0NvbmZpcm1Db2RlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gV2Ugd2VyZW4ndCBleHBlY3RpbmcgdGhpc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbUVmdHBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQnV0IHdlIGFyZSBzdGlsbCB3YWl0aW5nIGZvciBjb25maXJtYXRpb24gZnJvbSBFZnRwb3Mgc2lkZS5cbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiUGFpciBDb2RlIENvbmZpcm1lZCBmcm9tIFBPUyBzaWRlLCBidXQgYW0gc3RpbGwgd2FpdGluZyBmb3IgY29uZmlybWF0aW9uIGZyb20gRWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgXCJDbGljayBZRVMgb24gRUZUUE9TIGlmIGNvZGUgaXM6IFwiICsgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Db25maXJtYXRpb25Db2RlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEFscmVhZHkgY29uZmlybWVkIGZyb20gRWZ0cG9zIC0gU28gYWxsIGdvb2Qgbm93LiBXZSdyZSBQYWlyZWQgYWxzbyBmcm9tIHRoZSBQT1MgcGVyc3BlY3RpdmUuXG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlBhaXIgQ29kZSBDb25maXJtZWQgZnJvbSBQT1Mgc2lkZSwgYW5kIHdhcyBhbHJlYWR5IGNvbmZpcm1lZCBmcm9tIEVmdHBvcyBzaWRlLiBQYWlyaW5nIGZpbmFsaXNlZC5cIik7XG4gICAgICAgICAgICB0aGlzLl9vblBhaXJpbmdTdWNjZXNzKCk7XG4gICAgICAgICAgICB0aGlzLl9vblJlYWR5VG9UcmFuc2FjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsbCB0aGlzIGlmIHlvdXIgdXNlciBjbGlja3MgQ0FOQ0VMIG9yIE5PIGR1cmluZyB0aGUgcGFpcmluZyBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBQYWlyaW5nQ2FuY2VsKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuUGFpcmluZyB8fCB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyAmJiAhdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbUVmdHBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHRoZSBFZnRwb3MgYWxyZWFkeSB0aGlua3MgaXQncyBwYWlyZWQuXG4gICAgICAgICAgICAvLyBMZXQncyB0ZWxsIGl0IHRvIGRyb3Aga2V5c1xuICAgICAgICAgICAgdGhpcy5fc2VuZChuZXcgRHJvcEtleXNSZXF1ZXN0KCkuVG9NZXNzYWdlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29uUGFpcmluZ0ZhaWxlZCgpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIENhbGwgdGhpcyB3aGVuIHlvdXIgdXNlcyBjbGlja3MgdGhlIFVucGFpciBidXR0b24uXG4gICAgLy8gVGhpcyB3aWxsIGRpc2Nvbm5lY3QgZnJvbSB0aGUgRWZ0cG9zIGFuZCBmb3JnZXQgdGhlIHNlY3JldHMuXG4gICAgLy8gVGhlIEN1cnJlbnRTdGF0ZSBpcyB0aGVuIGNoYW5nZWQgdG8gVW5wYWlyZWQuXG4gICAgLy8gQ2FsbCB0aGlzIG9ubHkgaWYgeW91IGFyZSBub3QgeWV0IGluIHRoZSBVbnBhaXJlZCBzdGF0ZS5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgVW5wYWlyKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQmVzdCBlZmZvcnQgbGV0dGluZyB0aGUgZWZ0cG9zIGtub3cgdGhhdCB3ZSdyZSBkcm9wcGluZyB0aGUga2V5cywgc28gaXQgY2FuIGRyb3AgdGhlbSBhcyB3ZWxsLlxuICAgICAgICB0aGlzLl9zZW5kKG5ldyBEcm9wS2V5c1JlcXVlc3QoKS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIHRoaXMuX2RvVW5wYWlyKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGVuZHJlZ2lvblxuXG4gICAgLy8gcmVnaW9uIFRyYW5zYWN0aW9uIE1ldGhvZHNcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHB1cmNoYXNlIHRyYW5zYWN0aW9uLiBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBnZXQgdXBkYXRlcyBvbiB0aGUgcHJvY2Vzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPkFscGhhbnVtZXJpYyBJZGVudGlmaWVyIGZvciB5b3VyIHB1cmNoYXNlLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRDZW50c1wiPkFtb3VudCBpbiBDZW50cyB0byBjaGFyZ2U8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVQdXJjaGFzZVR4KHBvc1JlZklkLCBhbW91bnRDZW50cylcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHB1cmNoYXNlUmVxdWVzdCA9IFB1cmNoYXNlSGVscGVyLkNyZWF0ZVB1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcG9zUmVmSWQpO1xuICAgICAgICBwdXJjaGFzZVJlcXVlc3QuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHZhciBwdXJjaGFzZU1zZyA9IHB1cmNoYXNlUmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QdXJjaGFzZSwgYW1vdW50Q2VudHMsIHB1cmNoYXNlTXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcGF5bWVudCByZXF1ZXN0IGZvciAke2Ftb3VudENlbnRzIC8gMTAwLjB9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHB1cmNoYXNlTXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIGFjY2VwdCBwYXltZW50IGZvciAke2Ftb3VudENlbnRzIC8gMTAwLjB9YCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiUHVyY2hhc2UgSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHB1cmNoYXNlIHRyYW5zYWN0aW9uLiBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBnZXQgdXBkYXRlcyBvbiB0aGUgcHJvY2Vzcy5cbiAgICAvLyA8cGFyYT5UaXAgYW5kIGNhc2hvdXQgYXJlIG5vdCBhbGxvd2VkIHNpbXVsdGFuZW91c2x5LjwvcGFyYT5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPkFuIFVuaXF1ZSBJZGVudGlmaWVyIGZvciB5b3VyIE9yZGVyL1B1cmNoYXNlPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInB1cmNoYXNlQW1vdW50XCI+VGhlIFB1cmNoYXNlIEFtb3VudCBpbiBDZW50cy48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwidGlwQW1vdW50XCI+VGhlIFRpcCBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiY2FzaG91dEFtb3VudFwiPlRoZSBDYXNob3V0IEFtb3VudCBpbiBDZW50czwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwcm9tcHRGb3JDYXNob3V0XCI+V2hldGhlciB0byBwcm9tcHQgeW91ciBjdXN0b21lciBmb3IgY2FzaG91dCBvbiB0aGUgRWZ0cG9zPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj5UaGUgU2V0dGluZyB0byBzZXQgSGVhZGVyIGFuZCBGb290ZXIgZm9yIHRoZSBSZWNlaXB0PC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInN1cmNoYXJnZUFtb3VudFwiPlRoZSBTdXJjaGFyZ2UgQW1vdW50IGluIENlbnRzPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5Jbml0aWF0ZVR4UmVzdWx0PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlUHVyY2hhc2VUeFYyKHBvc1JlZklkLCBwdXJjaGFzZUFtb3VudCwgdGlwQW1vdW50LCBjYXNob3V0QW1vdW50LCBwcm9tcHRGb3JDYXNob3V0LCBvcHRpb25zID0ge30sIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRpcEFtb3VudCA+IDAgJiYgKGNhc2hvdXRBbW91bnQgPiAwIHx8IHByb21wdEZvckNhc2hvdXQpKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiQ2Fubm90IEFjY2VwdCBUaXBzIGFuZCBDYXNob3V0IGF0IHRoZSBzYW1lIHRpbWUuXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgdmFyIHB1cmNoYXNlID0gUHVyY2hhc2VIZWxwZXIuQ3JlYXRlUHVyY2hhc2VSZXF1ZXN0VjIocG9zUmVmSWQsIHB1cmNoYXNlQW1vdW50LCB0aXBBbW91bnQsIGNhc2hvdXRBbW91bnQsIHByb21wdEZvckNhc2hvdXQsIHN1cmNoYXJnZUFtb3VudCk7XG4gICAgICAgIHB1cmNoYXNlLkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICBwdXJjaGFzZS5PcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdmFyIHB1cmNoYXNlTXNnID0gcHVyY2hhc2UuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QdXJjaGFzZSwgcHVyY2hhc2VBbW91bnQsIHB1cmNoYXNlTXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcGF5bWVudCByZXF1ZXN0LiAke3B1cmNoYXNlLkFtb3VudFN1bW1hcnkoKX1gKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQocHVyY2hhc2VNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gYWNjZXB0IHBheW1lbnQgZm9yICR7cHVyY2hhc2UuQW1vdW50U3VtbWFyeSgpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlB1cmNoYXNlIEluaXRpYXRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSByZWZ1bmQgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QWxwaGFudW1lcmljIElkZW50aWZpZXIgZm9yIHlvdXIgcmVmdW5kLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRDZW50c1wiPkFtb3VudCBpbiBDZW50cyB0byBjaGFyZ2U8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmRcIj5NZXJjaGFudCBQYXNzd29yZCBjb250cm9sIGluIFZBQTwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+SW5pdGlhdGVUeFJlc3VsdDwvcmV0dXJucz5cbiAgICBJbml0aWF0ZVJlZnVuZFR4KHBvc1JlZklkLCBhbW91bnRDZW50cywgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQgPSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlZnVuZFJlcXVlc3QgPSBQdXJjaGFzZUhlbHBlci5DcmVhdGVSZWZ1bmRSZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCwgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQpO1xuICAgICAgICByZWZ1bmRSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgcmVmdW5kTXNnID0gcmVmdW5kUmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5SZWZ1bmQsIGFtb3VudENlbnRzLCByZWZ1bmRNc2csIFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcmVmdW5kIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHJlZnVuZE1zZykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoYEFza2VkIEVGVFBPUyB0byByZWZ1bmQgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJSZWZ1bmQgSW5pdGlhdGVkXCIpO1xuICAgIH1cbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBMZXQgdGhlIEVGVFBPUyBrbm93IHdoZXRoZXIgbWVyY2hhbnQgYWNjZXB0ZWQgb3IgZGVjbGluZWQgdGhlIHNpZ25hdHVyZVxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFjY2VwdGVkXCI+d2hldGhlciBtZXJjaGFudCBhY2NlcHRlZCB0aGUgc2lnbmF0dXJlIGZyb20gY3VzdG9tZXIgb3Igbm90PC9wYXJhbT5cbiAgICBBY2NlcHRTaWduYXR1cmUoYWNjZXB0ZWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIGFjY2VwdCBzaWduYXR1cmUgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdChmYWxzZSwgXCJBc2tlZCB0byBhY2NlcHQgc2lnbmF0dXJlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNpZ25hdHVyZVJlc3BvbmRlZChhY2NlcHRlZCA/IFwiQWNjZXB0aW5nIFNpZ25hdHVyZS4uLlwiIDogXCJEZWNsaW5pbmcgU2lnbmF0dXJlLi4uXCIpO1xuICAgICAgICB2YXIgc2lnUmVxTXNnID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVxdWlyZWRNZXNzYWdlO1xuICAgICAgICB0aGlzLl9zZW5kKGFjY2VwdGVkXG4gICAgICAgICAgICA/IG5ldyBTaWduYXR1cmVBY2NlcHQodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQpLlRvTWVzc2FnZSgpXG4gICAgICAgICAgICA6IG5ldyBTaWduYXR1cmVEZWNsaW5lKHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkKS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgTWlkVHhSZXN1bHQodHJ1ZSwgXCJcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gU3VibWl0IHRoZSBDb2RlIG9idGFpbmVkIGJ5IHlvdXIgdXNlciB3aGVuIHBob25pbmcgZm9yIGF1dGguIFxuICAgIC8vIEl0IHdpbGwgcmV0dXJuIGltbWVkaWF0ZWx5IHRvIHRlbGwgeW91IHdoZXRoZXIgdGhlIGNvZGUgaGFzIGEgdmFsaWQgZm9ybWF0IG9yIG5vdC4gXG4gICAgLy8gSWYgdmFsaWQ9PXRydWUgaXMgcmV0dXJuZWQsIG5vIG5lZWQgdG8gZG8gYW55dGhpbmcgZWxzZS4gRXhwZWN0IHVwZGF0ZXMgdmlhIHN0YW5kYXJkIGNhbGxiYWNrLlxuICAgIC8vIElmIHZhbGlkPT1mYWxzZSBpcyByZXR1cm5lZCwgeW91IGNhbiBzaG93IHlvdXIgdXNlciB0aGUgYWNjb21wYW55aW5nIG1lc3NhZ2UsIGFuZCBpbnZpdGUgdGhlbSB0byBlbnRlciBhbm90aGVyIGNvZGUuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImF1dGhDb2RlXCI+VGhlIGNvZGUgb2J0YWluZWQgYnkgeW91ciB1c2VyIGZyb20gdGhlIG1lcmNoYW50IGNhbGwgY2VudHJlLiBJdCBzaG91bGQgYmUgYSA2LWNoYXJhY3RlciBhbHBoYS1udW1lcmljIHZhbHVlLjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+V2hldGhlciBjb2RlIGhhcyBhIHZhbGlkIGZvcm1hdCBvciBub3QuPC9yZXR1cm5zPlxuICAgIFN1Ym1pdEF1dGhDb2RlKGF1dGhDb2RlKVxuICAgIHtcbiAgICAgICAgaWYgKGF1dGhDb2RlLmxlbmd0aCAhPSA2KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1Ym1pdEF1dGhDb2RlUmVzdWx0KGZhbHNlLCBcIk5vdCBhIDYtZGlnaXQgY29kZS5cIik7ICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkF3YWl0aW5nUGhvbmVGb3JBdXRoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIHNlbmQgYXV0aCBjb2RlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3VibWl0QXV0aENvZGVSZXN1bHQoZmFsc2UsIFwiV2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQXV0aENvZGVTZW50KGBTdWJtaXR0aW5nIEF1dGggQ29kZSAke2F1dGhDb2RlfWApO1xuICAgICAgICB0aGlzLl9zZW5kKG5ldyBBdXRoQ29kZUFkdmljZSh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCwgYXV0aENvZGUpLlRvTWVzc2FnZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJtaXRBdXRoQ29kZVJlc3VsdCh0cnVlLCBcIlZhbGlkIENvZGUuXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEF0dGVtcHRzIHRvIGNhbmNlbCBhIFRyYW5zYWN0aW9uLiBcbiAgICAvLyBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBzZWUgaG93IGl0IGdvZXMuXG4gICAgLy8gV2FpdCBmb3IgdGhlIHRyYW5zYWN0aW9uIHRvIGJlIGZpbmlzaGVkIGFuZCB0aGVuIHNlZSB3aGV0aGVyIGNhbmNlbGxhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxyZXR1cm5zPk1pZFR4UmVzdWx0IC0gZmFsc2Ugb25seSBpZiB5b3UgY2FsbGVkIGl0IGluIHRoZSB3cm9uZyBzdGF0ZTwvcmV0dXJucz5cbiAgICBDYW5jZWxUcmFuc2FjdGlvbigpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkFza2VkIHRvIGNhbmNlbCB0cmFuc2FjdGlvbiBidXQgSSB3YXMgbm90IGluIHRoZSBtaWRkbGUgb2Ygb25lLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWlkVHhSZXN1bHQoZmFsc2UsIFwiQXNrZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uIGJ1dCBJIHdhcyBub3QgaW4gdGhlIG1pZGRsZSBvZiBvbmUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEgtMUMsIFRILTNDIC0gTWVyY2hhbnQgcHJlc3NlZCBjYW5jZWxcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlJlcXVlc3RTZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2FuY2VsUmVxID0gbmV3IENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdCgpO1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ2FuY2VsbGluZyhcIkF0dGVtcHRpbmcgdG8gQ2FuY2VsIFRyYW5zYWN0aW9uLi4uXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2VuZChjYW5jZWxSZXEuVG9NZXNzYWdlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gV2UgSGFkIE5vdCBFdmVuIFNlbnQgUmVxdWVzdCBZZXQuIENvbnNpZGVyIGFzIGtub3duIGZhaWxlZC5cbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZhaWxlZChudWxsLCBcIlRyYW5zYWN0aW9uIENhbmNlbGxlZC4gUmVxdWVzdCBIYWQgbm90IGV2ZW4gYmVlbiBzZW50IHlldC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdCh0cnVlLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSBjYXNob3V0IG9ubHkgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QWxwaGFudW1lcmljIElkZW50aWZpZXIgZm9yIHlvdXIgdHJhbnNhY3Rpb24uPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFtb3VudENlbnRzXCI+QW1vdW50IGluIENlbnRzIHRvIGNhc2ggb3V0PC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInN1cmNoYXJnZUFtb3VudFwiPlRoZSBTdXJjaGFyZ2UgQW1vdW50IGluIENlbnRzPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5Jbml0aWF0ZVR4UmVzdWx0PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlQ2FzaG91dE9ubHlUeChwb3NSZWZJZCwgYW1vdW50Q2VudHMsIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBjYXNob3V0T25seVJlcXVlc3QgPSBuZXcgQ2FzaG91dE9ubHlSZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KTtcbiAgICAgICAgY2FzaG91dE9ubHlSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgY2FzaG91dE1zZyA9IGNhc2hvdXRPbmx5UmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5DYXNob3V0T25seSwgYW1vdW50Q2VudHMsIGNhc2hvdXRNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gc2VuZCBjYXNob3V0IHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChjYXNob3V0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIGRvIGNhc2hvdXQgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIkNhc2hvdXQgSW5pdGlhdGVkXCIpO1xuICAgIH0gICAgXG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBJbml0aWF0ZXMgYSBNYWlsIE9yZGVyIC8gVGVsZXBob25lIE9yZGVyIFB1cmNoYXNlIFRyYW5zYWN0aW9uXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5BbHBoYW51bWVyaWMgSWRlbnRpZmllciBmb3IgeW91ciB0cmFuc2FjdGlvbi48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiYW1vdW50Q2VudHNcIj5BbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwic3VyY2hhcmdlQW1vdW50XCI+VGhlIFN1cmNoYXJnZSBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVNb3RvUHVyY2hhc2VUeChwb3NSZWZJZCwgYW1vdW50Q2VudHMsIHN1cmNoYXJnZUFtb3VudCA9IDApXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBtb3RvUHVyY2hhc2VSZXF1ZXN0ID0gbmV3IE1vdG9QdXJjaGFzZVJlcXVlc3QoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBzdXJjaGFyZ2VBbW91bnQpO1xuICAgICAgICBtb3RvUHVyY2hhc2VSZXF1ZXN0LkNvbmZpZyA9IHRoaXMuQ29uZmlnO1xuICAgICAgICB2YXIgY2FzaG91dE1zZyA9IG1vdG9QdXJjaGFzZVJlcXVlc3QuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuTU9UTywgYW1vdW50Q2VudHMsIGNhc2hvdXRNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gc2VuZCBNT1RPIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChjYXNob3V0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIGRvIE1PVE8gZm9yICR7KGFtb3VudENlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIk1PVE8gSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHNldHRsZW1lbnQgdHJhbnNhY3Rpb24uXG4gICAgLy8gQmUgc3Vic2NyaWJlZCB0byBUeEZsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIEluaXRpYXRlU2V0dGxlVHgocG9zUmVmSWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZXR0bGVSZXF1ZXN0TXNnID0gbmV3IFNldHRsZVJlcXVlc3QoUmVxdWVzdElkSGVscGVyLklkKFwic2V0dGxlXCIpKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5TZXR0bGUsIDAsIHNldHRsZVJlcXVlc3RNc2csIFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgYSBzZXR0bGUgcmVxdWVzdGApO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZW5kKHNldHRsZVJlcXVlc3RNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gc2V0dGxlLmApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlNldHRsZSBJbml0aWF0ZWRcIik7ICAgXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIEluaXRpYXRlU2V0dGxlbWVudEVucXVpcnkocG9zUmVmSWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIHZhciBzdGxFbnFNc2cgPSBuZXcgU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0KFJlcXVlc3RJZEhlbHBlci5JZChcInN0bGVucVwiKSkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuU2V0dGxlbWVudEVucXVpcnksIDAsIHN0bEVucU1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBhIHNldHRsZW1lbnQgZW5xdWlyeVwiKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQoc3RsRW5xTXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChcIkFza2VkIEVGVFBPUyB0byBtYWtlIGEgc2V0dGxlbWVudCBlbnF1aXJ5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJTZXR0bGUgSW5pdGlhdGVkXCIpOyAgIFxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIEdldCBMYXN0IFRyYW5zYWN0aW9uLiBVc2UgdGhpcyB3aGVuIHlvdSB3YW50IHRvIHJldHJpZXZlIHRoZSBtb3N0IHJlY2VudCB0cmFuc2FjdGlvblxuICAgIC8vIHRoYXQgd2FzIHByb2Nlc3NlZCBieSB0aGUgRWZ0cG9zLlxuICAgIC8vIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBJbml0aWF0ZUdldExhc3RUeCgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnbHRSZXF1ZXN0TXNnID0gbmV3IEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QoKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHZhciBwb3NSZWZJZCA9IGdsdFJlcXVlc3RNc2cuSWQ7IC8vIEdldExhc3RUeCBpcyBub3QgdHJ5aW5nIHRvIGdldCBhbnl0aGluZyBzcGVjaWZpYyBiYWNrLiBTbyB3ZSBqdXN0IHVzZSB0aGUgbWVzc2FnZSBpZC5cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLkdldExhc3RUcmFuc2FjdGlvbiwgMCwgZ2x0UmVxdWVzdE1zZywgXG4gICAgICAgICAgICBcIldhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgYSBHZXQtTGFzdC1UcmFuc2FjdGlvbiByZXF1ZXN0LlwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLl9zZW5kKGdsdFJlcXVlc3RNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgZm9yIGxhc3QgdHJhbnNhY3Rpb24uYCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJHTFQgSW5pdGlhdGVkXCIpOyAgIFxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgaXMgdXNlZnVsIHRvIHJlY292ZXIgZnJvbSB5b3VyIFBPUyBjcmFzaGluZyBpbiB0aGUgbWlkZGxlIG9mIGEgdHJhbnNhY3Rpb24uXG4gICAgLy8gV2hlbiB5b3UgcmVzdGFydCB5b3VyIFBPUywgaWYgeW91IGhhZCBzYXZlZCBlbm91Z2ggc3RhdGUsIHlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCB0byByZWNvdmVyIHRoZSBjbGllbnQgbGlicmFyeSBzdGF0ZS5cbiAgICAvLyBZb3UgbmVlZCB0byBoYXZlIHRoZSBwb3NSZWZJZCB0aGF0IHlvdSBwYXNzZWQgaW4gd2l0aCB0aGUgb3JpZ2luYWwgdHJhbnNhY3Rpb24sIGFuZCB0aGUgdHJhbnNhY3Rpb24gdHlwZS5cbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBpbW1lZGlhdGVseSB3aGV0aGVyIHJlY292ZXJ5IGhhcyBzdGFydGVkIG9yIG5vdC5cbiAgICAvLyBJZiByZWNvdmVyeSBoYXMgc3RhcnRlZCwgeW91IG5lZWQgdG8gYnJpbmcgdXAgdGhlIHRyYW5zYWN0aW9uIG1vZGFsIHRvIHlvdXIgdXNlciBhIGJlIGxpc3RlbmluZyB0byBUeEZsb3dTdGF0ZUNoYW5nZWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5UaGUgaXMgdGhhdCB5b3UgaGFkIGFzc2lnbmVkIHRvIHRoZSB0cmFuc2FjdGlvbiB0aGF0IHlvdSBhcmUgdHJ5aW5nIHRvIHJlY292ZXIuPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInR4VHlwZVwiPlRoZSB0cmFuc2FjdGlvbiB0eXBlLjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlUmVjb3ZlcnkocG9zUmVmSWQsIHR4VHlwZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgXG4gICAgICAgIHZhciBnbHRSZXF1ZXN0TXNnID0gbmV3IEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QoKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgdHhUeXBlLCAwLCBnbHRSZXF1ZXN0TXNnLCBcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gYXR0ZW1wdCByZWNvdmVyeS5cIik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fc2VuZChnbHRSZXF1ZXN0TXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIHJlY292ZXIgc3RhdGUuYCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJSZWNvdmVyeSBJbml0aWF0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gR2x0TWF0Y2ggYXR0ZW1wdHMgdG8gY29uY2x1ZGUgd2hldGhlciBhIGdsdFJlc3BvbnNlIG1hdGNoZXMgYW4gZXhwZWN0ZWQgdHJhbnNhY3Rpb24gYW5kIHJldHVybnNcbiAgICAvLyB0aGUgb3V0Y29tZS4gXG4gICAgLy8gSWYgU3VjY2Vzcy9GYWlsZWQgaXMgcmV0dXJuZWQsIGl0IG1lYW5zIHRoYXQgdGhlIGd0bFJlc3BvbnNlIGRpZCBtYXRjaCwgYW5kIHRoYXQgdHJhbnNhY3Rpb24gd2FzIHN1Y2Nlc2Z1bC9mYWlsZWQuXG4gICAgLy8gSWYgVW5rbm93biBpcyByZXR1cm5lZCwgaXQgbWVhbnMgdGhhdCB0aGUgZ2x0UmVzcG9uc2UgZG9lcyBub3QgbWF0Y2ggdGhlIGV4cGVjdGVkIHRyYW5zYWN0aW9uLiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJnbHRSZXNwb25zZVwiPlRoZSBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSBtZXNzYWdlIHRvIGNoZWNrPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+VGhlIFJlZmVyZW5jZSBJZCB0aGF0IHlvdSBwYXNzZWQgaW4gd2l0aCB0aGUgb3JpZ2luYWwgcmVxdWVzdC48L3BhcmFtPlxuXG4gICAgLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgIEdsdE1hdGNoKGdsdFJlc3BvbnNlLCBwb3NSZWZJZCwgLi4uZGVwcmVjYXRlZEFyZ3MpIFxuICAgIHtcbiAgICAgICAgLy8gT2Jzb2xldGUgbWV0aG9kIGNhbGwgY2hlY2tcbiAgICAgICAgLy8gT2xkIGludGVyZmFjZTogR2x0TWF0Y2goR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UgZ2x0UmVzcG9uc2UsIFRyYW5zYWN0aW9uVHlwZSBleHBlY3RlZFR5cGUsIGludCBleHBlY3RlZEFtb3VudCwgRGF0ZVRpbWUgcmVxdWVzdFRpbWUsIHN0cmluZyBwb3NSZWZJZClcbiAgICAgICAgaWYoZGVwcmVjYXRlZEFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZihkZXByZWNhdGVkQXJncy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiT2Jzb2xldGUgbWV0aG9kIGNhbGwgZGV0ZWN0ZWQ6IFVzZSBHbHRNYXRjaChnbHRSZXNwb25zZSwgcG9zUmVmSWQpXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkdsdE1hdGNoKGdsdFJlc3BvbnNlLCBkZXByZWNhdGVkQXJnc1syXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ic29sZXRlIG1ldGhvZCBjYWxsIHdpdGggdW5rbm93biBhcmdzOiBVc2UgR2x0TWF0Y2goR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UgZ2x0UmVzcG9uc2UsIHN0cmluZyBwb3NSZWZJZClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2cuaW5mbyhgR0xUIENIRUNLOiBQb3NSZWZJZDogJHtwb3NSZWZJZH0tPiR7Z2x0UmVzcG9uc2UuR2V0UG9zUmVmSWQoKX1gKTtcblxuICAgICAgICBpZiAoIXBvc1JlZklkID09IGdsdFJlc3BvbnNlLkdldFBvc1JlZklkKCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTdWNjZXNzU3RhdGUuVW5rbm93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnbHRSZXNwb25zZS5HZXRTdWNjZXNzU3RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgLy8gcmVnaW9uIEludGVybmFscyBmb3IgUGFpcmluZyBGbG93XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBIYW5kbGluZyB0aGUgMm5kIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgS2V5UmVxdWVzdC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+aW5jb21pbmcgbWVzc2FnZTwvcGFyYW0+XG4gICAgX2hhbmRsZUtleVJlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiTmVnb3RpYXRpbmcgUGFpcmluZy4uLlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuXG4gICAgICAgIC8vIFVzZSB0aGUgaGVscGVyLiBJdCB0YWtlcyB0aGUgaW5jb21pbmcgcmVxdWVzdCwgYW5kIGdlbmVyYXRlcyB0aGUgc2VjcmV0cyBhbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICB2YXIgcGggICAgICA9IG5ldyBQYWlyaW5nSGVscGVyKCk7XG4gICAgICAgIHZhciByZXN1bHQgID0gcGguR2VuZXJhdGVTZWNyZXRzQW5kS2V5UmVzcG9uc2UobmV3IEtleVJlcXVlc3QobSkpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gcmVzdWx0LlNlY3JldHM7IC8vIHdlIG5vdyBoYXZlIHNlY3JldHMsIGFsdGhvdWdoIHBhaXJpbmcgaXMgbm90IGZ1bGx5IGZpbmlzaGVkIHlldC5cbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSB0aGlzLl9zZWNyZXRzOyAvLyB1cGRhdGluZyBvdXIgc3RhbXAgd2l0aCB0aGUgc2VjcmV0cyBzbyBjYW4gZW5jcnlwdCBtZXNzYWdlcyBsYXRlci5cbiAgICAgICAgdGhpcy5fc2VuZChyZXN1bHQuS2V5UmVzcG9uc2UuVG9NZXNzYWdlKCkpOyAvLyBzZW5kIHRoZSBrZXlfcmVzcG9uc2UsIGkuZS4gaW50ZXJhY3Rpb24gMyBvZiBwYWlyaW5nLlxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA0dGggaW50ZXJhY3Rpb24gb2YgdGhlIHBhaXJpbmcgcHJvY2VzcyBpLmUuIGFuIGluY29taW5nIEtleUNoZWNrLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVLZXlDaGVjayhtKVxuICAgIHtcbiAgICAgICAgdmFyIGtleUNoZWNrID0gbmV3IEtleUNoZWNrKG0pO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkNvbmZpcm1hdGlvbkNvZGUgPSBrZXlDaGVjay5Db25maXJtYXRpb25Db2RlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyBzaG93aW5nIG9uIHRoZSBUZXJtaW5hbFwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA1dGggYW5kIGZpbmFsIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgUGFpclJlc3BvbnNlXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVBhaXJSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIHBhaXJSZXNwID0gbmV3IFBhaXJSZXNwb25zZShtKTtcblxuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gZmFsc2U7XG4gICAgICAgIGlmIChwYWlyUmVzcC5TdWNjZXNzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBTdGlsbCBXYWl0aW5nIGZvciBVc2VyIHRvIHNheSB5ZXMgb24gUE9TXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJHb3QgUGFpciBDb25maXJtIGZyb20gRWZ0cG9zLCBidXQgc3RpbGwgd2FpdGluZyBmb3IgdXNlIHRvIGNvbmZpcm0gZnJvbSBQT1MuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyB3aGF0IHRoZSBFRlRQT1Mgc2hvd2VkXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkdvdCBQYWlyIENvbmZpcm0gZnJvbSBFZnRwb3MsIGFuZCBhbHJlYWR5IGhhZCBjb25maXJtIGZyb20gUE9TLiBOb3cganVzdCB3YWl0aW5nIGZvciBmaXJzdCBwb25nLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblBhaXJpbmdTdWNjZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJIG5lZWQgdG8gcGluZy9sb2dpbiBldmVuIGlmIHRoZSBwb3MgdXNlciBoYXMgbm90IHNhaWQgeWVzIHlldCwgXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG90aGVyd2lzZSB3aXRoaW4gNSBzZWNvbmRzIGNvbm5lY3Rpb25nIHdpbGwgYmUgZHJvcHBlZCBieSBlZnRwb3MuXG4gICAgICAgICAgICB0aGlzLl9zdGFydFBlcmlvZGljUGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlRHJvcEtleXNBZHZpY2UobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvZy5JbmZvKFwiRWZ0cG9zIHdhcyBVbnBhaXJlZC4gSSBzaGFsbCB1bnBhaXIgZnJvbSBteSBlbmQgYXMgd2VsbC5cIik7XG4gICAgICAgIHRoaXMuX2RvVW5wYWlyKCk7XG4gICAgfVxuXG4gICAgX29uUGFpcmluZ1N1Y2Nlc3MoKVxuICAgIHtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5TdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiUGFpcmluZyBTdWNjZXNzZnVsIVwiO1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuUGFpcmVkQ29ubmVjdGVkO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9vblBhaXJpbmdGYWlsZWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29ubi5EaXNjb25uZWN0KCk7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlVucGFpcmVkO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLk1lc3NhZ2UgPSBcIlBhaXJpbmcgRmFpbGVkXCI7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLlN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9kb1VucGFpcigpXG4gICAge1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuVW5wYWlyZWQ7XG4gICAgICAgIHRoaXMuX2Nvbm4uRGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB0aGUgc2VydmVyIGFza3MgdXMgdG8gcm9sbCBvdXIgc2VjcmV0cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlS2V5Um9sbGluZ1JlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIC8vIHdlIGNhbGN1bGF0ZSB0aGUgbmV3IG9uZXMuLi5cbiAgICAgICAgdmFyIGtyUmVzID0gS2V5Um9sbGluZ0hlbHBlci5QZXJmb3JtS2V5Um9sbGluZyhtLCB0aGlzLl9zZWNyZXRzKTtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IGtyUmVzLk5ld1NlY3JldHM7IC8vIGFuZCB1cGRhdGUgb3VyIHNlY3JldHMgd2l0aCB0aGVtXG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gdGhpcy5fc2VjcmV0czsgLy8gYW5kIG91ciBzdGFtcFxuICAgICAgICB0aGlzLl9zZW5kKGtyUmVzLktleVJvbGxpbmdDb25maXJtYXRpb24pOyAvLyBhbmQgd2UgdGVsbCB0aGUgc2VydmVyIHRoYXQgYWxsIGlzIHdlbGwuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTZWNyZXRzQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NlY3JldHN9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGEgY3VzdG9tZXIgc2lnbmF0dXJlIGlzIHJlcWlyZWQuXG4gICAgLy8gV2UgbmVlZCB0byBhc2sgdGhlIGN1c3RvbWVyIHRvIHNpZ24gdGhlIGluY29taW5nIHJlY2VpcHQuXG4gICAgLy8gQW5kIHRoZW4gdGVsbCB0aGUgcGlucGFkIHdoZXRoZXIgdGhlIHNpZ25hdHVyZSBpcyBvayBvciBub3QuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2lnbmF0dXJlIFJlcXVpcmVkIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVxdWlyZWQobmV3IFNpZ25hdHVyZVJlcXVpcmVkKG0pLCBcIkFzayBDdXN0b21lciB0byBTaWduIHRoZSBSZWNlaXB0XCIpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGFuIGF1dGggY29kZSBpcyByZXF1aXJlZC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlQXV0aENvZGVSZXF1aXJlZChtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQgPT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgX2xvZy5JbmZvKGBSZWNlaXZlZCBBdXRoIENvZGUgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGhvbmVGb3JBdXRoUmVxdWlyZWQgPSBuZXcgUGhvbmVGb3JBdXRoUmVxdWlyZWQobSk7XG4gICAgICAgIHZhciBtc2cgPSBgQXV0aCBDb2RlIFJlcXVpcmVkLiBDYWxsICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0UGhvbmVOdW1iZXIoKX0gYW5kIHF1b3RlIG1lcmNoYW50IGlkICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0TWVyY2hhbnRJZCgpfWA7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKHBob25lRm9yQXV0aFJlcXVpcmVkLCBtc2cpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgUHVyY2hhc2VSZXF1ZXN0IHdpdGggYSBQdXJjaGFzZVJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVQdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUHVyY2hhc2UgcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1cImApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiUHVyY2hhc2UgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGUgUGluUGFkIHNlcnZlciB3aWxsIHJlcGx5IHRvIG91ciBDYXNob3V0T25seVJlcXVlc3Qgd2l0aCBhIENhc2hvdXRPbmx5UmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUNhc2hvdXRPbmx5UmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBDYXNob3V0IFJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJDYXNob3V0IFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgTW90b1B1cmNoYXNlUmVxdWVzdCB3aXRoIGEgTW90b1B1cmNoYXNlUmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZU1vdG9QdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgTW90byBSZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gSW5jb21pbmcgUG9zIFJlZiBJRDogJHtpbmNvbWluZ1Bvc1JlZklkfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiTW90byBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH0gICBcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoZSBQaW5QYWQgc2VydmVyIHdpbGwgcmVwbHkgdG8gb3VyIFJlZnVuZFJlcXVlc3Qgd2l0aCBhIFJlZnVuZFJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVSZWZ1bmRSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUmVmdW5kIHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3IgdGhpcyBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlJlZnVuZCBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRPRE86IEhhbmRsZSB0aGUgU2V0dGxlbWVudCBSZXNwb25zZSByZWNlaXZlZCBmcm9tIHRoZSBQaW5QYWRcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBIYW5kbGVTZXR0bGVSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIFNldHRsZSByZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gJHttLkRlY3J5cHRlZEpzb259YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJTZXR0bGUgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsZSB0aGUgU2V0dGxlbWVudCBFbnF1aXJ5IFJlc3BvbnNlIHJlY2VpdmVkIGZyb20gdGhlIFBpblBhZFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2V0dGxlbWVudCBFbnF1aXJ5IHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiAke20uRGVjcnlwdGVkSnNvbn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlNldHRsZW1lbnQgRW5xdWlyeSBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB3ZSByZWNlaXZlIGV2ZW50IHR5cGUgXCJlcnJvclwiIGZyb20gdGhlIHNlcnZlciwgc3VjaCBhcyB3aGVuIGNhbGxpbmcgY2FuY2VsX3RyYW5zYWN0aW9uIGFuZCB0aGVyZSBpcyBubyB0cmFuc2FjdGlvbiBpbiBwcm9ncmVzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlRXJyb3JFdmVudChtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvblxuICAgICAgICAgICAgJiYgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkXG4gICAgICAgICAgICAmJiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5BdHRlbXB0aW5nVG9DYW5jZWxcbiAgICAgICAgICAgICYmIG0uR2V0RXJyb3IoKSA9PSBcIk5PX1RSQU5TQUNUSU9OXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRILTJFXG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgV2FzIHRyeWluZyB0byBjYW5jZWwgYSB0cmFuc2FjdGlvbiBidXQgdGhlcmUgaXMgbm90aGluZyB0byBjYW5jZWwuIENhbGxpbmcgR0xUIHRvIHNlZSB3aGF0J3MgdXBgKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBFcnJvciBFdmVudCBCdXQgRG9uJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggaXQuICR7bS5EZWNyeXB0ZWRKc29ufWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gV2hlbiB0aGUgUGluUGFkIHJldHVybnMgdG8gdXMgd2hhdCB0aGUgTGFzdCBUcmFuc2FjdGlvbiB3YXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgdHhTdGF0ZSA9IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHR4U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFdlIHdlcmUgbm90IGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbiwgd2hvIGNhcmVzP1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEgtNCBXZSB3ZXJlIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi5cbiAgICAgICAgLy8gTGV0J3MgYXR0ZW1wdCByZWNvdmVyeS4gVGhpcyBpcyBzdGVwIDQgb2YgVHJhbnNhY3Rpb24gUHJvY2Vzc2luZyBIYW5kbGluZ1xuICAgICAgICB0aGlzLl9sb2cuaW5mbyhgR290IExhc3QgVHJhbnNhY3Rpb24uLmApO1xuICAgICAgICB0eFN0YXRlLkdvdEdsdFJlc3BvbnNlKCk7XG4gICAgICAgIHZhciBndGxSZXNwb25zZSA9IG5ldyBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZShtKTtcbiAgICAgICAgdHhTdGF0ZS5HTFRSZXNwb25zZVBvc1JlZklkID0gZ3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKTtcbiAgICAgICAgaWYgKCFndGxSZXNwb25zZS5XYXNSZXRyaWV2ZWRTdWNjZXNzZnVsbHkoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGd0bFJlc3BvbnNlLklzU3RpbGxJblByb2dyZXNzKHR4U3RhdGUuUG9zUmVmSWQpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFRILTRFIC0gT3BlcmF0aW9uIEluIFByb2dyZXNzXG5cbiAgICAgICAgICAgICAgICBpZiAoZ3RsUmVzcG9uc2UuSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UoKSAmJiAhdHhTdGF0ZS5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBzaWduYXR1cmUgYWNjZXB0L2RlY2xpbmUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSB1c2VyIGNhbiBvbmx5IHJlYWxseSBkZWNsaW5lIGF0IHRoaXMgc3RhZ2UgYXMgdGhlcmUgaXMgbm8gcmVjZWlwdCB0byBwcmludCBmb3Igc2lnbmluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNpZ25hdHVyZVJlcXVpcmVkKG5ldyBTaWduYXR1cmVSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIk1JU1NJTkcgUkVDRUlQVFxcbiBERUNMSU5FIEFORCBUUlkgQUdBSU4uXCIpLCBcIlJlY292ZXJlZCBpbiBTaWduYXR1cmUgUmVxdWlyZWQgYnV0IHdlIGRvbid0IGhhdmUgcmVjZWlwdC4gWW91IG1heSBEZWNsaW5lIHRoZW4gUmV0cnkuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5Jc1dhaXRpbmdGb3JBdXRoQ29kZSgpICYmICF0eFN0YXRlLkF3YWl0aW5nUGhvbmVGb3JBdXRoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBhdXRoIGNvZGUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlIGNhbiBvbmx5IGNhbmNlbCB0aGUgdHJhbnNhY3Rpb24gYXQgdGhpcyBzdGFnZSBhcyB3ZSBkb24ndCBoYXZlIGVub3VnaCBpbmZvcm1hdGlvbiB0byByZWNvdmVyIGZyb20gdGhpcy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKG5ldyBQaG9uZUZvckF1dGhSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIlVOS05PV05cIiwgXCJVTktOT1dOXCIpLCBcIlJlY292ZXJlZCBtaWQgUGhvbmUtRm9yLUF1dGggYnV0IGRvbid0IGhhdmUgZGV0YWlscy4gWW91IG1heSBDYW5jZWwgdGhlbiBSZXRyeS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiT3BlcmF0aW9uIHN0aWxsIGluIHByb2dyZXNzLi4uIHN0YXkgd2FpdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gcHVibGlzaCB0eEZsb3dTdGF0ZUNoYW5nZWQuIENhbiByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5XYXNUaW1lT3V0T2ZTeW5jRXJyb3IoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBub3QgZ2l2ZSB1cCBiYXNlZCBvbiBhIFRPT1MgZXJyb3IuXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgbG9nIGl0LCBhbmQgaWdub3JlIGl0LiBcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgVGltZS1PdXQtT2YtU3luYyBlcnJvciBpbiBHZXQgTGFzdCBUcmFuc2FjdGlvbiByZXNwb25zZS4gTGV0J3MgaWdub3JlIGl0IGFuZCB3ZSdsbCB0cnkgYWdhaW4uYCk7XG4gICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBwdWJsaXNoIHR4Rmxvd1N0YXRlQ2hhbmdlZC4gQ2FuIHJldHVybjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtNFggLSBVbmV4cGVjdGVkIFJlc3BvbnNlIHdoZW4gcmVjb3ZlcmluZ1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBVbmV4cGVjdGVkIFJlc3BvbnNlIGluIEdldCBMYXN0IFRyYW5zYWN0aW9uIGR1cmluZyAtIFJlY2VpdmVkIHBvc1JlZklkOiR7Z3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKX0gRXJyb3I6JHttLkdldEVycm9yKCl9YCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiVW5leHBlY3RlZCBFcnJvciB3aGVuIHJlY292ZXJpbmcgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eFN0YXRlLlR5cGUgPT0gVHJhbnNhY3Rpb25UeXBlLkdldExhc3RUcmFuc2FjdGlvbilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSElTIFdBUyBBIFBMQUlOIEdFVCBMQVNUIFRSQU5TQUNUSU9OIFJFUVVFU1QsIE5PVCBGT1IgUkVDT1ZFUlkgUFVSUE9TRVMuXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJSZXRyaWV2ZWQgTGFzdCBUcmFuc2FjdGlvbiBhcyBhc2tlZCBkaXJlY3RseSBieSB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgZ3RsUmVzcG9uc2UuQ29weU1lcmNoYW50UmVjZWlwdFRvQ3VzdG9tZXJSZWNlaXB0KCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJMYXN0IFRyYW5zYWN0aW9uIFJldHJpZXZlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC00QSAtIExldCdzIHRyeSB0byBtYXRjaCB0aGUgcmVjZWl2ZWQgbGFzdCB0cmFuc2FjdGlvbiBhZ2FpbnN0IHRoZSBjdXJyZW50IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NTdGF0ZSA9IHRoaXMuR2x0TWF0Y2goZ3RsUmVzcG9uc2UsIHR4U3RhdGUuUG9zUmVmSWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzU3RhdGUgPT0gU3VjY2Vzc1N0YXRlLlVua25vd24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBUSC00TjogRGlkbid0IE1hdGNoIG91ciB0cmFuc2FjdGlvbi4gQ29uc2lkZXIgVW5rbm93biBTdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJEaWQgbm90IG1hdGNoIHRyYW5zYWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiRmFpbGVkIHRvIHJlY292ZXIgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVEgtNFk6IFdlIE1hdGNoZWQsIHRyYW5zYWN0aW9uIGZpbmlzaGVkLCBsZXQncyB1cGRhdGUgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGd0bFJlc3BvbnNlLkNvcHlNZXJjaGFudFJlY2VpcHRUb0N1c3RvbWVyUmVjZWlwdCgpO1xuICAgICAgICAgICAgICAgICAgICB0eFN0YXRlLkNvbXBsZXRlZChzdWNjZXNzU3RhdGUsIG0sIFwiVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHR4U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy9XaGVuIHRoZSB0cmFuc2FjdGlvbiBjYW5jZWwgcmVzcG9uc2UgaXMgcmV0dXJuZWQuXG4gICAgX2hhbmRsZUNhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5JbmZvKGBSZWNlaXZlZCBDYW5jZWwgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eFN0YXRlID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIHZhciBjYW5jZWxSZXNwb25zZSA9IG5ldyBDYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlKG0pO1xuXG4gICAgICAgIGlmIChjYW5jZWxSZXNwb25zZS5TdWNjZXNzKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbG9nLldhcm4oXCJGYWlsZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uOiByZWFzb249XCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvclJlYXNvbigpICsgXCIsIGRldGFpbD1cIiArIGNhbmNlbFJlc3BvbnNlLkdldEVycm9yRGV0YWlsKCkpO1xuXG4gICAgICAgIHR4U3RhdGUuQ2FuY2VsRmFpbGVkKFwiRmFpbGVkIHRvIGNhbmNlbCB0cmFuc2FjdGlvbjogXCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvckRldGFpbCgpICsgXCIuIENoZWNrIEVGVFBPUy5cIik7XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0eFN0YXRlfSkpO1xuICAgIH1cblxuICAgIF9zdGFydFRyYW5zYWN0aW9uTW9uaXRvcmluZ1RocmVhZCgpXG4gICAge1xuICAgICAgICB2YXIgbmVlZHNQdWJsaXNoaW5nID0gZmFsc2U7XG4gICAgXG4gICAgICAgIHZhciB0eFN0YXRlID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuVHJhbnNhY3Rpb24gJiYgIXR4U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHR4U3RhdGU7XG4gICAgICAgICAgICBpZiAoc3RhdGUuQXR0ZW1wdGluZ1RvQ2FuY2VsICYmIERhdGUubm93KCkgPiBzdGF0ZS5DYW5jZWxBdHRlbXB0VGltZSArIHRoaXMuX21heFdhaXRGb3JDYW5jZWxUeClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0yVCAtIHRvbyBsb25nIHNpbmNlIGNhbmNlbCBhdHRlbXB0IC0gQ29uc2lkZXIgdW5rbm93blxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBCZWVuIHRvbyBsb25nIHdhaXRpbmcgZm9yIHRyYW5zYWN0aW9uIHRvIGNhbmNlbC5gKTtcbiAgICAgICAgICAgICAgICB0eFN0YXRlLlVua25vd25Db21wbGV0ZWQoYFdhaXRlZCBsb25nIGVub3VnaCBmb3IgQ2FuY2VsIFRyYW5zYWN0aW9uIHJlc3VsdC4gQ2hlY2sgRUZUUE9TLiBgKTtcbiAgICAgICAgICAgICAgICBuZWVkc1B1Ymxpc2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUuUmVxdWVzdFNlbnQgJiYgRGF0ZS5ub3coKSA+IHN0YXRlLkxhc3RTdGF0ZVJlcXVlc3RUaW1lICsgdGhpcy5fY2hlY2tPblR4RnJlcXVlbmN5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFRILTFULCBUSC00VCAtIEl0J3MgYmVlbiBhIHdoaWxlIHNpbmNlIHdlIHJlY2VpdmVkIGFuIHVwZGF0ZSwgbGV0J3MgY2FsbCBhIEdMVFxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBDaGVja2luZyBvbiBvdXIgdHJhbnNhY3Rpb24uIExhc3Qgd2UgYXNrZWQgd2FzIGF0ICR7c3RhdGUuTGFzdFN0YXRlUmVxdWVzdFRpbWV9Li4uYCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5DYWxsaW5nR2x0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbEdldExhc3RUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobmVlZHNQdWJsaXNoaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3N0YXJ0VHJhbnNhY3Rpb25Nb25pdG9yaW5nVGhyZWFkKCksIHRoaXMuX3R4TW9uaXRvckNoZWNrRnJlcXVlbmN5KTtcbiAgICB9XG5cbiAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgLy8gcmVnaW9uIEludGVybmFscyBmb3IgQ29ubmVjdGlvbiBNYW5hZ2VtZW50XG5cbiAgICBfcmVzZXRDb25uKClcbiAgICB7XG4gICAgICAgIC8vIFNldHVwIHRoZSBDb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX2Nvbm4gPSBuZXcgQ29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG91ciBFdmVudCBIYW5kbGVyc1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIChlKSA9PiB0aGlzLl9vblNwaUNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkKGUuZGV0YWlsKSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01lc3NhZ2VSZWNlaXZlZCcsIChlKSA9PiB0aGlzLl9vblNwaU1lc3NhZ2VSZWNlaXZlZChlLmRldGFpbCkpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdFcnJvclJlY2VpdmVkJywgKGUpID0+IHRoaXMuX29uV3NFcnJvclJlY2VpdmVkKGUuZGV0YWlsKSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGF0dXMgY2hhbmdlcy5cbiAgICAvLyBZb3UgYXJlIGVuY291cmFnZWQgdG8gZGlzcGxheSBhIFBpblBhZCBDb25uZWN0aW9uIEluZGljYXRvciBvbiB0aGUgUE9TIHNjcmVlbi5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJzdGF0ZVwiPjwvcGFyYW0+XG4gICAgX29uU3BpQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQoc3RhdGUpXG4gICAge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlLkNvbm5lY3Rpb25TdGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIENvbm5lY3RpbmcgdG8gdGhlIEVmdHBvcyBhdCAke3RoaXMuX2VmdHBvc0FkZHJlc3N9Li4uYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXRyaWVzU2luY2VMYXN0RGV2aWNlQWRkcmVzc1Jlc29sdXRpb24gPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5QYWlyaW5nICYmIHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLk1lc3NhZ2UgPSBcIlJlcXVlc3RpbmcgdG8gUGFpci4uLlwiO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHIgPSBQYWlyaW5nSGVscGVyLk5ld1BhaXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQocHIuVG9NZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIENvbm5lY3RlZCB0byAke3RoaXMuX2VmdHBvc0FkZHJlc3N9Li4uYCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gdGhpcy5fc2VjcmV0cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDpcbiAgICAgICAgICAgICAgICAvLyBMZXQncyByZXNldCBzb21lIGxpZmVjeWNsZSByZWxhdGVkIHRvIGNvbm5lY3Rpb24gc3RhdGUsIHJlYWR5IGZvciBuZXh0IGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSdtIGRpc2Nvbm5lY3RlZCBmcm9tICR7dGhpcy5fZWZ0cG9zQWRkcmVzc30uLi5gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3N0UmVjZW50UGluZ1NlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21pc3NlZFBvbmdzQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3Rpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbiwganVzdCBzbyB5b3Uga25vdyFcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRILTFEXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgTG9zdCBjb25uZWN0aW9uIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi4uLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29ubiA9PSBudWxsKSByZXR1cm47IC8vIFRoaXMgbWVhbnMgdGhlIGluc3RhbmNlIGhhcyBiZWVuIGRpc3Bvc2VkLiBBYm9ydGluZy5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uID49IHRoaXMuX3JldHJpZXNCZWZvcmVSZXNvbHZpbmdEZXZpY2VBZGRyZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgV2lsbCB0cnkgdG8gcmVjb25uZWN0IGluICR7dGhpcy5fc2xlZXBCZWZvcmVSZWNvbm5lY3RNc31tcy4uLmApO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgbm9uLWJsb2NraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY29ubikgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uLkNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuX3NsZWVwQmVmb3JlUmVjb25uZWN0TXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuUGFpcmluZylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiTG9zdCBDb25uZWN0aW9uIGR1cmluZyBwYWlyaW5nLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5NZXNzYWdlID0gXCJDb3VsZCBub3QgQ29ubmVjdCB0byBQYWlyLiBDaGVjayBOZXR3b3JrIGFuZCBUcnkgQWdhaW4uLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdQYWlyaW5nRmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGV9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHN0YXRlOiAnICsgc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBpcyBhbiBpbXBvcnRhbnQgcGllY2Ugb2YgdGhlIHB1enpsZS4gSXQncyBhIGJhY2tncm91bmQgdGhyZWFkIHRoYXQgcGVyaW9kaWNhbGx5XG4gICAgLy8gc2VuZHMgUGluZ3MgdG8gdGhlIHNlcnZlci4gSWYgaXQgZG9lc24ndCByZWNlaXZlIFBvbmdzLCBpdCBjb25zaWRlcnMgdGhlIGNvbm5lY3Rpb24gYXMgYnJva2VuXG4gICAgLy8gc28gaXQgZGlzY29ubmVjdHMuIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBfc3RhcnRQZXJpb2RpY1BpbmcoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgdGhpcy5fcGVyaW9kaWNQaW5nVGhyZWFkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5fcGVyaW9kaWNQaW5nKCksdGhpcy5fcGluZ0ZyZXF1ZW5jeSk7XG4gICAgICAgIHRoaXMuX3BlcmlvZGljUGluZygpO1xuICAgIH1cblxuICAgIF9wZXJpb2RpY1BpbmcoKSB7XG4gICAgICAgIC8vIHdoaWxlIGknbSBzdGlsbCBjb25uZWN0ZWQgQU5EIHBhaXJlZC4uLlxuICAgICAgICBpZih0aGlzLl9jb25uLkNvbm5lY3RlZCAmJiB0aGlzLl9zZWNyZXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvUGluZygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9zdFJlY2VudFBpbmdTZW50ICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPT0gbnVsbCB8fCB0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkLklkICE9IHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudC5JZCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9taXNzZWRQb25nc0NvdW50ICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEVmdHBvcyBkaWRuJ3QgcmVwbHkgdG8gbXkgUGluZy4gTWlzc2VkIENvdW50OiAke3RoaXMuX21pc3NlZFBvbmdzQ291bnR9LyR7dGhpcy5fbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3R9LmApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9taXNzZWRQb25nc0NvdW50IDwgdGhpcy5fbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiVHJ5aW5nIGFub3RoZXIgcGluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0UGVyaW9kaWNQaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UgaGF2ZSBub3QgcmVjZWl2ZWQgYSBwb25nIGZvciBvdXIgbW9zdCByZWNlbnQgcGluZy5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY29uc2lkZXIgdGhpcyBjb25uZWN0aW9uIGFzIGJyb2tlbi5cbiAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgRGlzY29ubmVjdC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJEaXNjb25uZWN0aW5nLi4uXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uLkRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RvcFBlcmlvZGljUGluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX21pc3NlZFBvbmdzQ291bnQgPSAwO1xuXG4gICAgICAgICAgICB9LHRoaXMuX3BvbmdUaW1lb3V0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFBlcmlvZGljUGluZygpO1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJDYW5jZWxsaW5nIHBlcmlvZGljIHBpbmcgYXMgd2VyZSBkaXNjb25uZWN0ZWQgb3Igbm90IHBhaXJlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFdlIGNhbGwgdGhpcyBvdXJzZWx2ZXMgYXMgc29vbiBhcyB3ZSdyZSByZWFkeSB0byB0cmFuc2FjdCB3aXRoIHRoZSBQaW5QYWQgYWZ0ZXIgYSBjb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgZWZmZWN0aXZlbHkgY2FsbGVkIGFmdGVyIHdlIHJlY2VpdmVkIHRoZSBmaXJzdCBMb2dpbiBSZXNwb25zZSBmcm9tIHRoZSBQaW5QYWQuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIF9vblJlYWR5VG9UcmFuc2FjdCgpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIk9uIFJlYWR5IFRvIFRyYW5zYWN0IVwiKTtcblxuICAgICAgICAvLyBTbywgd2UgaGF2ZSBqdXN0IG1hZGUgYSBjb25uZWN0aW9uLCBwaW5nZWQgYW5kIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkuXG4gICAgICAgIHRoaXMuQ3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvbiAmJiAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5SZXF1ZXN0U2VudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0zQSAtIFdlJ3ZlIGp1c3QgcmVjb25uZWN0ZWQgYW5kIHdlcmUgaW4gdGhlIG1pZGRsZSBvZiBUeC5cbiAgICAgICAgICAgICAgICAvLyBMZXQncyBnZXQgdGhlIGxhc3QgdHJhbnNhY3Rpb24gdG8gY2hlY2sgd2hhdCB3ZSBtaWdodCBoYXZlIG1pc3NlZCBvdXQgb24uXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ2FsbGluZ0dsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0zQVIgLSBXZSBoYWQgbm90IGV2ZW4gc2VudCB0aGUgcmVxdWVzdCB5ZXQuIExldCdzIGRvIHRoYXQgbm93XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZCh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5SZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBTZW5kaW5nIFJlcXVlc3QgTm93Li4uYCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gbGV0J3MgYWxzbyB0ZWxsIHRoZSBlZnRwb3Mgb3VyIGxhdGVzdCB0YWJsZSBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgaWYodGhpcy5fc3BpUGF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0LlB1c2hQYXlBdFRhYmxlQ29uZmlnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBXaGVuIHdlIGRpc2Nvbm5lY3QsIHdlIHNob3VsZCBhbHNvIHN0b3AgdGhlIHBlcmlvZGljIHBpbmcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIF9zdG9wUGVyaW9kaWNQaW5nKCkge1xuICAgICAgICBpZih0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgYWxyZWFkeSBzZXQgdXAsIGNsZWFuIHVwIGJlZm9yZSByZXN0YXJ0aW5nLlxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQpO1xuICAgICAgICAgICAgdGhpcy5fcGVyaW9kaWNQaW5nVGhyZWFkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNlbmQgYSBQaW5nIHRvIHRoZSBTZXJ2ZXJcbiAgICBfZG9QaW5nKClcbiAgICB7XG4gICAgICAgIHZhciBwaW5nID0gUGluZ0hlbHBlci5HZW5lcmF0ZVBpbmdSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudCA9IHBpbmc7XG4gICAgICAgIHRoaXMuX3NlbmQocGluZyk7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFJlY2VpdmVkIGEgUG9uZyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlSW5jb21pbmdQb25nKG0pXG4gICAge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1haW50YWluIHRoaXMgdGltZSBkZWx0YSBvdGhlcndpc2UgdGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgb3VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLl9zcGlNZXNzYWdlU3RhbXAuU2VydmVyVGltZURlbHRhID0gbS5HZXRTZXJ2ZXJUaW1lRGVsdGEoKTtcblxuICAgICAgICBpZiAodGhpcy5fbW9zdFJlY2VudFBvbmdSZWNlaXZlZCA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBGaXJzdCBwb25nIHJlY2VpdmVkIGFmdGVyIGEgY29ubmVjdGlvbiwgYW5kIGFmdGVyIHRoZSBwYWlyaW5nIHByb2Nlc3MgaXMgZnVsbHkgZmluYWxpc2VkLlxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJGaXJzdCBwb25nIG9mIGNvbm5lY3Rpb24gYW5kIGluIHBhaXJlZCBzdGF0ZS5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25SZWFkeVRvVHJhbnNhY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkZpcnN0IHBvbmcgb2YgY29ubmVjdGlvbiBidXQgcGFpcmluZyBwcm9jZXNzIG5vdCBmaW5hbGlzZWQgeWV0LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRQb25nUmVjZWl2ZWQgPSBtO1xuICAgICAgICB0aGlzLl9sb2cuZGVidWcoYFBvbmdMYXRlbmN5OiR7RGF0ZS5ub3coKSAtIHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudFRpbWV9YCk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIHNlcnZlciB3aWxsIGFsc28gc2VuZCB1cyBwaW5ncy4gV2UgbmVlZCB0byByZXBseSB3aXRoIGEgcG9uZyBzbyBpdCBkb2Vzbid0IGRpc2Nvbm5lY3QgdXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUluY29taW5nUGluZyhtKVxuICAgIHtcbiAgICAgICAgdmFyIHBvbmcgPSBQb25nSGVscGVyLkdlbmVyYXRlUG9uZ1Jlc3Nwb25zZShtKTtcbiAgICAgICAgdGhpcy5fc2VuZChwb25nKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBBc2sgdGhlIFBpblBhZCB0byB0ZWxsIHVzIHdoYXQgdGhlIE1vc3QgUmVjZW50IFRyYW5zYWN0aW9uIHdhc1xuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBfY2FsbEdldExhc3RUcmFuc2FjdGlvbigpXG4gICAge1xuICAgICAgICB2YXIgZ2x0UmVxdWVzdCA9IG5ldyBHZXRMYXN0VHJhbnNhY3Rpb25SZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX3NlbmQoZ2x0UmVxdWVzdC5Ub01lc3NhZ2UoKSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgd2UgcmVjZWl2ZSBhIG1lc3NhZ2UgZnJvbSB0aGUgQ29ubmVjdGlvblxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VKc29uXCI+PC9wYXJhbT5cbiAgICBfb25TcGlNZXNzYWdlUmVjZWl2ZWQobWVzc2FnZUpzb24pXG4gICAge1xuICAgICAgICAvLyBGaXJzdCB3ZSBwYXJzZSB0aGUgaW5jb21pbmcgbWVzc2FnZVxuICAgICAgICB2YXIgbSA9IE1lc3NhZ2UuRnJvbUpzb24obWVzc2FnZUpzb24uTWVzc2FnZSwgdGhpcy5fc2VjcmV0cyk7XG4gICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiUmVjZWl2ZWQ6XCIgKyBtLkRlY3J5cHRlZEpzb24pO1xuXG4gICAgICAgIGlmIChTcGlQcmVhdXRoLklzUHJlYXV0aEV2ZW50KG0uRXZlbnROYW1lKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3BpUHJlYXV0aC5faGFuZGxlUHJlYXV0aE1lc3NhZ2UobSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmQgdGhlbiB3ZSBzd2l0Y2ggb24gdGhlIGV2ZW50IHR5cGUuXG4gICAgICAgIHN3aXRjaCAobS5FdmVudE5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleVJlcXVlc3Q6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlS2V5UmVxdWVzdChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleUNoZWNrOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUtleUNoZWNrKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGFpclJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVBhaXJSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkRyb3BLZXlzQWR2aWNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZURyb3BLZXlzQWR2aWNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUHVyY2hhc2VSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUmVmdW5kUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVmdW5kUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5DYXNob3V0T25seVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNhc2hvdXRPbmx5UmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5Nb3RvUHVyY2hhc2VSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3RvUHVyY2hhc2VSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlNpZ25hdHVyZVJlcXVpcmVkOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuQXV0aENvZGVSZXF1aXJlZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBdXRoQ29kZVJlcXVpcmVkKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5TZXR0bGVSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZVNldHRsZVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuU2V0dGxlbWVudEVucXVpcnlSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVJbmNvbWluZ1BpbmcobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5Qb25nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUluY29taW5nUG9uZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLktleVJvbGxSZXF1ZXN0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUtleVJvbGxpbmdSZXF1ZXN0KG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGF5QXRUYWJsZUdldFRhYmxlQ29uZmlnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGlQYXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQoUGF5QXRUYWJsZUNvbmZpZy5GZWF0dXJlRGlzYWJsZU1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicGF0Y29uZlwiKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0Ll9oYW5kbGVHZXRUYWJsZUNvbmZpZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVHZXRCaWxsRGV0YWlsczpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUdldEJpbGxEZXRhaWxzUmVxdWVzdChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVCaWxsUGF5bWVudDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUJpbGxQYXltZW50QWR2aWNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuRXJyb3I6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3JFdmVudChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkludmFsaWRIbWFjU2lnbmF0dXJlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiSSBjb3VsZCBub3QgdmVyaWZ5IG1lc3NhZ2UgZnJvbSBFZnRwb3MuIFlvdSBtaWdodCBoYXZlIHRvIFVuLXBhaXIgRWZ0cG9zIGFuZCB0aGVuIHJlY29ubmVjdC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBJIGRvbid0IFVuZGVyc3RhbmQgRXZlbnQ6ICR7bS5FdmVudE5hbWV9LCAke20uRGF0YX0uIFBlcmhhcHMgSSBoYXZlIG5vdCBpbXBsZW1lbnRlZCBpdCB5ZXQuYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Xc0Vycm9yUmVjZWl2ZWQoZXJyb3IpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2cud2FybihcIlJlY2VpdmVkIFdTIEVycm9yOiBcIiArIGVycm9yLk1lc3NhZ2UpO1xuICAgIH1cblxuICAgIF9zZW5kKG1lc3NhZ2UpXG4gICAge1xuICAgICAgICB2YXIganNvbiA9IG1lc3NhZ2UuVG9Kc29uKHRoaXMuX3NwaU1lc3NhZ2VTdGFtcCk7XG4gICAgICAgIGlmICh0aGlzLl9jb25uLkNvbm5lY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJTZW5kaW5nOiBcIiArIG1lc3NhZ2UuRGVjcnlwdGVkSnNvbik7XG4gICAgICAgICAgICB0aGlzLl9jb25uLlNlbmQoanNvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gc2VuZCwgYnV0IG5vdCBjb25uZWN0ZWQ6IFwiICsgbWVzc2FnZS5EZWNyeXB0ZWRKc29uKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEhhc1NlcmlhbE51bWJlckNoYW5nZWQodXBkYXRlZFNlcmlhbE51bWJlcilcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxOdW1iZXIgIT0gdXBkYXRlZFNlcmlhbE51bWJlcjtcbiAgICB9XG5cbiAgICBIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCh1cGRhdGVkRWZ0cG9zQWRkcmVzcylcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZnRwb3NBZGRyZXNzICE9IHVwZGF0ZWRFZnRwb3NBZGRyZXNzO1xuICAgIH1cblxuICAgIF9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIFxuICAgICAgICBpZiAoIXRoaXMuX3NlcmlhbE51bWJlcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2VydmljZSA9IG5ldyBEZXZpY2VBZGRyZXNzU2VydmljZSgpO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlLlJldHJpZXZlU2VydmljZSh0aGlzLl9zZXJpYWxOdW1iZXIsIHRoaXMuX2RldmljZUFwaUtleSwgdGhpcy5faW5UZXN0TW9kZSkudGhlbigoYWRkcmVzc1Jlc3BvbnNlKSA9PiBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIWFkZHJlc3NSZXNwb25zZSB8fCAhYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuSGFzRWZ0cG9zQWRkcmVzc0NoYW5nZWQoYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3MpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGRldmljZSBhbmQgY29ubmVjdGlvbiBhZGRyZXNzXG4gICAgICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gXCJ3czovL1wiICsgYWRkcmVzc1Jlc3BvbnNlLkFkZHJlc3M7XG4gICAgICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXMgPSBuZXcgRGV2aWNlQWRkcmVzc1N0YXR1cyhhZGRyZXNzUmVzcG9uc2UuQWRkcmVzcywgYWRkcmVzc1Jlc3BvbnNlLkxhc3RVcGRhdGVkKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0RldmljZUFkZHJlc3NDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50RGV2aWNlU3RhdHVzfSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5DdXJyZW50RGV2aWNlU3RhdHVzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7U3BpfTsiLCJpbXBvcnQge1N1Y2Nlc3NTdGF0ZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gUmVwcmVzZW50cyB0aGUgMyBQYWlyaW5nIHN0YXR1c2VzIHRoYXQgdGhlIFNwaSBpbnN0YW54Y2UgY2FuIGJlIGluLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNvbnN0IFNwaVN0YXR1cyA9IFxue1xuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFBhaXJlZCBhbmQgQ29ubmVjdGVkXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFBhaXJlZENvbm5lY3RlZDogJ1BhaXJlZENvbm5lY3RlZCcsXG4gICAgXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gUGFpcmVkIGJ1dCB0cnlpbmcgdG8gZXN0YWJsaXNoIGEgY29ubmVjdGlvbiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmVkQ29ubmVjdGluZzogJ1BhaXJlZENvbm5lY3RpbmcnLFxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFVucGFpcmVkXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFVucGFpcmVkOiAnVW5wYWlyZWQnXG59O1xuXG4vLyA8c3VtbWFyeT5cbi8vIFRoZSBTcGkgaW5zdGFuY2UgY2FuIGJlIGluIG9uZSBvZiB0aGVzZSBmbG93cyBhdCBhbnkgcG9pbnQgaW4gdGltZS5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjb25zdCBTcGlGbG93ID0gXG57XG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ3VycmVudGx5IGdvaW5nIHRocm91Z2ggdGhlIFBhaXJpbmcgUHJvY2VzcyBGbG93LlxuICAgIC8vIEhhcHBlbnMgZHVyaW5nIHRoZSBVbnBhaXJlZCBTcGlTdGF0dXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFBhaXJpbmc6ICdQYWlyaW5nJyxcbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDdXJyZW50bHkgZ29pbmcgdGhyb3VnaCB0aGUgdHJhbnNhY3Rpb24gUHJvY2VzcyBGbG93LlxuICAgIC8vIENhbm5vdCBoYXBwZW4gaW4gdGhlIFVucGFpcmVkIFNwaVN0YXR1cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgVHJhbnNhY3Rpb246ICdUcmFuc2FjdGlvbicsXG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBOb3QgaW4gYW55IG9mIHRoZSBvdGhlciBzdGF0ZXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIElkbGU6ICdJZGxlJ1xufTtcblxuLy8gPHN1bW1hcnk+XG4vLyBSZXByZXNlbnRzIHRoZSBQYWlyaW5nIEZsb3cgU3RhdGUgZHVyaW5nIHRoZSBwYWlyaW5nIHByb2Nlc3MgXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgUGFpcmluZ0Zsb3dTdGF0ZVxue1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBTb21lIHRleHQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBQYWlyaW5nIFByb2Nlc3MgU2NyZWVuXG4gICAgICAgIC8vIHRoYXQgaW5kaWNhdGVzIHdoYXQgdGhlIHBhaXJpbmcgcHJvY2VzcyBpcyB1cCB0by5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGVuIHRydWUsIGl0IG1lYW5zIHRoYXQgdGhlIEVGVFBPUyBpcyBzaG9pbmcgdGhlIGNvbmZpcm1hdGlvbiBjb2RlLFxuICAgICAgICAvLyBhbmQgeW91ciB1c2VyIG5lZWRzIHRvIHByZXNzIFlFUyBvciBOTyBvbiB0aGUgRUZUUE9TLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXdhaXRpbmdDaGVja0Zyb21FZnRwb3MgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdHJ1ZSwgeW91IG5lZWQgdG8gZGlzcGxheSB0aGUgWUVTL05PIGJ1dHRvbnMgb24geW91IHBhaXJpbmcgc2NyZWVuXG4gICAgICAgIC8vIGZvciB5b3VyIHVzZXIgdG8gY29uZmlybSB0aGUgY29kZS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF3YWl0aW5nQ2hlY2tGcm9tUG9zID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBjb25maXJtYXRpb24gY29kZSBmb3IgdGhlIHBhaXJpbmcgcHJvY2Vzcy5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkNvbmZpcm1hdGlvbkNvZGUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoZSBQYWlyaW5nIEZsb3cgaGFzIGZpbmlzaGVkIGl0cyBqb2IuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgcGFpcmluZyB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5TdWNjZXNzZnVsID0gbnVsbDtcblxuICAgICAgICBpZihzdGF0ZSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG59XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvblR5cGUgPSBcbntcbiAgICBQdXJjaGFzZTogJ1B1cmNoYXNlJyxcbiAgICBSZWZ1bmQ6ICdSZWZ1bmQnLFxuICAgIENhc2hvdXRPbmx5OiAnQ2FzaG91dE9ubHknLFxuICAgIE1PVE86ICdNT1RPJyxcbiAgICBTZXR0bGU6ICdTZXR0bGUnLFxuICAgIFNldHRsZW1lbnRFbnF1aXJ5OiAnU2V0dGxlbWVudEVucXVpcnknLFxuICAgIEdldExhc3RUcmFuc2FjdGlvbjogJ0dldExhc3RUcmFuc2FjdGlvbicsXG4gICAgXG4gICAgUHJlYXV0aDogJ1ByZWF1dGgnLFxuICAgIEFjY291bnRWZXJpZnk6ICdBY2NvdW50VmVyaWZ5J1xufTtcblxuLy8gPHN1bW1hcnk+XG4vLyBVc2VkIGFzIGEgcmV0dXJuIGluIHRoZSBJbml0aWF0ZVR4IG1ldGhvZHMgdG8gc2lnbmlmeSB3aGV0aGVyIFxuLy8gdGhlIHRyYW5zYWN0aW9uIHdhcyBpbml0aWF0ZWQgb3Igbm90LCBhbmQgYSByZWFzb24gdG8gZ28gd2l0aCBpdC5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBJbml0aWF0ZVR4UmVzdWx0XG57XG4gICAgY29uc3RydWN0b3IoaW5pdGlhdGVkLCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgdGhlIHR4IHdhcyBpbml0aWF0ZWQuXG4gICAgICAgIC8vIFdoZW4gdHJ1ZSwgeW91IGNhbiBleHBlY3QgdXBkYXRlZCB0byB5b3VyIHJlZ2lzdGVyZWQgY2FsbGJhY2suXG4gICAgICAgIC8vIFdoZW4gZmFsc2UsIHlvdSBjYW4gcmV0cnkgY2FsbGluZyB0aGUgSW5pdGlhdGVYIG1ldGhvZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkluaXRpYXRlZCA9IGluaXRpYXRlZDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGV4dCB0aGF0IGdpdmVzIHJlYXNvbiBmb3IgdGhlIEluaXRpYXRlZCBmbGFnLCBlc3BlY2lhbGx5IGluIGNhc2Ugb2YgZmFsc2UuIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufVxuXG4vLyA8c3VtbWFyeT5cbi8vIFVzZWQgYXMgYSByZXR1cm4gaW4gY2FsbHMgbWlkIHRyYW5zYWN0aW9uIHRvIGxldCB5b3Uga25vd1xuLy8gd2hldGhlciB0aGUgY2FsbCB3YXMgdmFsaWQgb3Igbm90LlxuLy8gVGhlc2UgYXR0cmlidXRlcyB3b3JrIGZvciBDT00gaW50ZXJvcC5cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBNaWRUeFJlc3VsdFxue1xuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgZGVmYXVsdCBzdHVjdHVyZSB3b3JrcyBmb3IgQ09NIGludGVyb3AuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIGNvbnN0cnVjdG9yKHZhbGlkLCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgdGhpcy5WYWxpZCA9IHZhbGlkO1xuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbn0gICAgXG5cbi8vIDxzdW1tYXJ5PlxuLy8gUmVwcmVzZW50cyB0aGUgU3RhdGUgZHVyaW5nIGEgVHJhbnNhY3Rpb25GbG93XG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25GbG93U3RhdGVcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZCwgdHlwZSwgYW1vdW50Q2VudHMsIG1lc3NhZ2UsIG1zZylcbiAgICB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyAgVGhlIGlkIGdpdmVuIHRvIHRoaXMgdHJhbnNhY3Rpb25cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlBvc1JlZklkICAgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5JZCAgICAgICAgID0gcG9zUmVmSWQ7IC8vIG9ic29sZXRlLCBidXQgbGV0J3MgbWFpbnRhaW4gaXQgZm9yIG5vdywgdG8gbWVhbiBzYW1lIGFzIFBvc1JlZklkLlxuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBQdXJjaGFzZS9SZWZ1bmQvU2V0dGxlLy4uLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEEgdGV4dCBtZXNzYWdlIHRvIGRpc3BsYXkgb24geW91ciBUcmFuc2FjdGlvbiBGbG93IFNjcmVlblxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIEFtb3VudCBpbiBjZW50cyBmb3IgdGhpcyB0cmFuc2FjdGlvblxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQW1vdW50Q2VudHMgPSBhbW91bnRDZW50cztcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2h0aGVyIHRoZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgdG8gdGhlIEVGVFBPUyB5ZXQgb3Igbm90LlxuICAgICAgICAvLyBJbiB0aGUgUGFpcmVkQ29ubmVjdGluZyBzdGF0ZSwgdGhlIHRyYW5zYWN0aW9uIGlzIGluaXRpYXRlZFxuICAgICAgICAvLyBidXQgdGhlIHJlcXVlc3QgaXMgb25seSBzZW50IG9uY2UgdGhlIGNvbm5lY3Rpb24gaXMgcmVjb3ZlcmVkLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVxdWVzdFNlbnQgPSBmYWxzZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHRpbWUgd2hlbiB0aGUgcmVxdWVzdCB3YXMgc2VudCB0byB0aGUgRUZUUE9TLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVxdWVzdFRpbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHRpbWUgd2hlbiB3ZSBsYXN0IGFza2VkIGZvciBhbiB1cGRhdGUsIGluY2x1ZGluZyB0aGUgb3JpZ2luYWwgcmVxdWVzdCBhdCBmaXJzdFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTGFzdFN0YXRlUmVxdWVzdFRpbWUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgd2UncmUgY3VycmVudGx5IGF0dGVtcHRpbmcgdG8gQ2FuY2VsIHRoZSB0cmFuc2FjdGlvbi5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IG51bGw7XG4gICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGVuIHRoaXMgZmxhZyBpcyBvbiwgeW91IG5lZWQgdG8gZGlzcGxheSB0aGUgZGlnbmF0dXJlIGFjY2VwdC9kZWNsaW5lIGJ1dHRvbnMgaW4geW91ciBcbiAgICAgICAgLy8gdHJhbnNhY3Rpb24gZmxvdyBzY3JlZW4uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gZmFsc2U7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdGhpcyBmbGFnIGlzIG9uLCB5b3UgbmVlZCB0byBzaG93IHlvdXIgdXNlciB0aGUgcGhvbmUgbnVtYmVyIHRvIGNhbGwgdG8gZ2V0IHRoZSBhdXRob3Jpc2F0aW9uIGNvZGUuXG4gICAgICAgIC8vIFRoZW4geW91IG5lZWQgdG8gcHJvdmlkZSB5b3VyIHVzZXIgbWVhbnMgdG8gZW50ZXIgdGhhdCBnaXZlbiBjb2RlIGFuZCBzdWJtaXQgaXQgdmlhIFN1Ym1pdEF1dGhDb2RlKCkuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IG51bGw7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgdGhpcyB0cmFuc2FjdGlvbiBmbG93IGlzIG92ZXIgb3Igbm90LlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuRmluaXNoZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHN1Y2Nlc3Mgc3RhdGUgb2YgdGhpcyB0cmFuc2FjdGlvbi4gU3RhcnRzIG9mZiBhcyBVbmtub3duLlxuICAgICAgICAvLyBXaGVuIGZpbmlzaGVkLCBjYW4gYmUgU3VjY2VzcywgRmFpbGVkIE9SIFVua25vd24uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5TdWNjZXNzID0gU3VjY2Vzc1N0YXRlLlVua25vd247XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSByZXNwb25zZSBhdCB0aGUgZW5kIG9mIHRoZSB0cmFuc2FjdGlvbi4gXG4gICAgICAgIC8vIE1pZ2h0IG5vdCBiZSBwcmVzZW50IGluIGFsbCBlZGdlIGNhc2VzLlxuICAgICAgICAvLyBZb3UgY2FuIHRoZW4gdHVybiB0aGlzIE1lc3NhZ2UgaW50byB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlLFxuICAgICAgICAvLyBzdWNoIGFzIFB1cmNoYXNlUmVzcG9uc2UsIFJlZnVuZFJlc3BvbnNlLCBldGNcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlJlc3BvbnNlID0gbnVsbDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIG1lc3NhZ2UgdGhlIHdlIHJlY2VpdmVkIGZyb20gRUZUUE9TIHRoYXQgdG9sZCB1cyB0aGF0IHNpZ25hdHVyZSBpcyByZXF1aXJlZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSA9IG51bGw7XG4gICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgbWVzc2FnZSB0aGUgd2UgcmVjZWl2ZWQgZnJvbSBFRlRQT1MgdGhhdCB0b2xkIHVzIHRoYXQgUGhvbmUgRm9yIEF1dGggaXMgcmVxdWlyZWQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5QaG9uZUZvckF1dGhSZXF1aXJlZE1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgdGltZSB3aGVuIHRoZSBjYW5jZWwgYXR0ZW1wdCB3YXMgbWFkZS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkNhbmNlbEF0dGVtcHRUaW1lID0gbnVsbDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgbWVzc2FnZSB0aGF0IHdlIGFyZSBzZW5kaW5nL3NlbnQgdG8gdGhlIHNlcnZlci5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlJlcXVlc3QgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaGV0aGVyIHdlJ3JlIGN1cnJlbnRseSB3YWl0aW5nIGZvciBhIEdldCBMYXN0IFRyYW5zYWN0aW9uIFJlc3BvbnNlIHRvIGdldCBhbiB1cGRhdGUuIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXdhaXRpbmdHbHRSZXNwb25zZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5HTFRSZXNwb25zZVBvc1JlZklkID0gbnVsbDtcbiAgICB9XG5cbiAgICBTZW50KG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuUmVxdWVzdFNlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLlJlcXVlc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5MYXN0U3RhdGVSZXF1ZXN0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgQ2FuY2VsbGluZyhtc2cpXG4gICAge1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IHRydWU7XG4gICAgICAgIHRoaXMuQ2FuY2VsQXR0ZW1wdFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENhbmNlbEZhaWxlZChtc2cpXG4gICAge1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENhbGxpbmdHbHQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5MYXN0U3RhdGVSZXF1ZXN0VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgR290R2x0UmVzcG9uc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIEZhaWxlZChyZXNwb25zZSwgbXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gU3VjY2Vzc1N0YXRlLkZhaWxlZDtcbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBTaWduYXR1cmVSZXF1aXJlZChzcGlNZXNzYWdlLCBtc2cpXG4gICAge1xuICAgICAgICB0aGlzLlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSA9IHNwaU1lc3NhZ2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdTaWduYXR1cmVDaGVjayA9IHRydWU7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgU2lnbmF0dXJlUmVzcG9uZGVkKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdTaWduYXR1cmVDaGVjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbiAgICBcbiAgICBQaG9uZUZvckF1dGhSZXF1aXJlZChzcGlNZXNzYWdlLCBtc2cpXG4gICAge1xuICAgICAgICB0aGlzLlBob25lRm9yQXV0aFJlcXVpcmVkTWVzc2FnZSA9IHNwaU1lc3NhZ2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdQaG9uZUZvckF1dGggPSB0cnVlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbiAgICBcbiAgICBBdXRoQ29kZVNlbnQobXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIENvbXBsZXRlZChzdGF0ZSwgcmVzcG9uc2UsIG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IHN0YXRlO1xuICAgICAgICB0aGlzLlJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHRoaXMuRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLkF0dGVtcHRpbmdUb0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nR2x0UmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdQaG9uZUZvckF1dGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBVbmtub3duQ29tcGxldGVkKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IFN1Y2Nlc3NTdGF0ZS5Vbmtub3duO1xuICAgICAgICB0aGlzLlJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdHbHRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cbn1cblxuLy8gPHN1bW1hcnk+XG4vLyBVc2VkIGFzIGEgcmV0dXJuIGluIHRoZSBTdWJtaXRBdXRoQ29kZSBtZXRob2QgdG8gc2lnbmlmeSB3aGV0aGVyIENvZGUgaXMgdmFsaWRcbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBTdWJtaXRBdXRoQ29kZVJlc3VsdFxue1xuICAgIGNvbnN0cnVjdG9yKHZhbGlkRm9ybWF0LCBtZXNzYWdlKVxuICAgIHtcbiAgICAgICAgdGhpcy5WYWxpZEZvcm1hdCA9IHZhbGlkRm9ybWF0O1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUZXh0IHRoYXQgZ2l2ZXMgcmVhc29uIGZvciBJbnZhbGlkaXR5XG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTcGlDb25maWdcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5Qcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TaWduYXR1cmVGbG93T25FZnRwb3MgICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5QcmludE1lcmNoYW50Q29weSAgICAgICAgICAgICAgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhZGRSZWNlaXB0Q29uZmlnKG1lc3NhZ2VEYXRhKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhLnByb21wdF9mb3JfY3VzdG9tZXJfY29weSA9IHRoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlRGF0YS5wcmludF9mb3Jfc2lnbmF0dXJlX3JlcXVpcmVkX3RyYW5zYWN0aW9ucyA9IHRoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLlByaW50TWVyY2hhbnRDb3B5KVxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlRGF0YS5wcmludF9tZXJjaGFudF9jb3B5ID0gdGhpcy5QcmludE1lcmNoYW50Q29weTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZURhdGE7XG4gICAgfVxuXG4gICAgVG9TdHJpbmcoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGBQcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvczoke3RoaXMuUHJvbXB0Rm9yQ3VzdG9tZXJDb3B5T25FZnRwb3N9IFNpZ25hdHVyZUZsb3dPbkVmdHBvczoke3RoaXMuU2lnbmF0dXJlRmxvd09uRWZ0cG9zfSBQcmludE1lcmNoYW50Q29weTogJHt0aGlzLlByaW50TWVyY2hhbnRDb3B5fWA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25PcHRpb25zXG57XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEZvb3RlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lcmNoYW50UmVjZWlwdEhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lcmNoYW50UmVjZWlwdEZvb3RlciA9IG51bGw7XG4gICAgfVxuXG4gICAgU2V0Q3VzdG9tZXJSZWNlaXB0SGVhZGVyKGN1c3RvbWVyUmVjZWlwdEhlYWRlcilcbiAgICB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyUmVjZWlwdEhlYWRlciA9IGN1c3RvbWVyUmVjZWlwdEhlYWRlcjtcbiAgICB9XG5cbiAgICBTZXRDdXN0b21lclJlY2VpcHRGb290ZXIoY3VzdG9tZXJSZWNlaXB0Rm9vdGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJSZWNlaXB0Rm9vdGVyID0gY3VzdG9tZXJSZWNlaXB0Rm9vdGVyO1xuICAgIH1cbiAgICBTZXRNZXJjaGFudFJlY2VpcHRIZWFkZXIobWVyY2hhbnRSZWNlaXB0SGVhZGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0SGVhZGVyID0gbWVyY2hhbnRSZWNlaXB0SGVhZGVyO1xuICAgIH1cbiAgICBTZXRNZXJjaGFudFJlY2VpcHRGb290ZXIobWVyY2hhbnRSZWNlaXB0Rm9vdGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0Rm9vdGVyID0gbWVyY2hhbnRSZWNlaXB0Rm9vdGVyO1xuICAgIH1cbiAgICBBZGRPcHRpb25zKG1lc3NhZ2VEYXRhKVxuICAgIHtcbiAgICAgICAgbWVzc2FnZURhdGEuY3VzdG9tZXJfcmVjZWlwdF9oZWFkZXIgPSB0aGlzLl9jdXN0b21lclJlY2VpcHRIZWFkZXI7XG4gICAgICAgIG1lc3NhZ2VEYXRhLmN1c3RvbWVyX3JlY2VpcHRfZm9vdGVyID0gdGhpcy5fY3VzdG9tZXJSZWNlaXB0Rm9vdGVyO1xuICAgICAgICBtZXNzYWdlRGF0YS5tZXJjaGFudF9yZWNlaXB0X2hlYWRlciA9IHRoaXMuX21lcmNoYW50UmVjZWlwdEhlYWRlcjtcbiAgICAgICAgbWVzc2FnZURhdGEubWVyY2hhbnRfcmVjZWlwdF9mb290ZXIgPSB0aGlzLl9tZXJjaGFudFJlY2VpcHRGb290ZXI7XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VEYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtCaWxsUGF5bWVudCwgUGF5QXRUYWJsZUNvbmZpZywgUGF5bWVudEhpc3RvcnlFbnRyeSwgQmlsbFJldHJpZXZhbFJlc3VsdCwgQmlsbFN0YXR1c1Jlc3BvbnNlfSBmcm9tICcuL1BheUF0VGFibGUnO1xuXG5leHBvcnQgY2xhc3MgU3BpUGF5QXRUYWJsZVxueyAgXG4gICAgY29uc3RydWN0b3Ioc3BpKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpID0gc3BpO1xuICAgICAgICB0aGlzLl9sb2cgPSBjb25zb2xlO1xuXG4gICAgICAgIHRoaXMuQ29uZmlnID0gT2JqZWN0LmFzc2lnbihuZXcgUGF5QXRUYWJsZUNvbmZpZygpLCB7XG4gICAgICAgICAgICBQYXlBdFRhYmxlZEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBPcGVyYXRvcklkRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIEFsbG93ZWRPcGVyYXRvcklkczogW10sXG4gICAgICAgICAgICBFcXVhbFNwbGl0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIFNwbGl0QnlBbW91bnRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgU3VtbWFyeVJlcG9ydEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBUaXBwaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIExhYmVsT3BlcmF0b3JJZDogXCJPcGVyYXRvciBJRFwiLFxuICAgICAgICAgICAgTGFiZWxQYXlCdXR0b246IFwiUGF5IGF0IFRhYmxlXCIsXG4gICAgICAgICAgICBMYWJlbFRhYmxlSWQ6IFwiVGFibGUgTnVtYmVyXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBkZWxlZ2F0ZSB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBFZnRwb3MgbmVlZHMgdG8ga25vdyB0aGUgY3VycmVudCBzdGF0ZSBvZiBhIGJpbGwgZm9yIGEgdGFibGUuIFxuICAgIC8vIDxwYXJhIC8+XG4gICAgLy8gUGFyYW1ldGVyczo8cGFyYSAvPlxuICAgIC8vIGJpbGxJZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYmlsbC4gSWYgZW1wdHksIGl0IG1lYW5zIHRoYXQgdGhlIFBheUF0VGFibGUgZmxvdyBvbiB0aGUgRWZ0cG9zIGlzIGp1c3Qgc3RhcnRpbmcsIGFuZCB0aGUgbG9va3VwIGlzIGJ5IHRhYmxlSWQuPHBhcmEgLz5cbiAgICAvLyB0YWJsZUlkIC0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIHRhYmxlIHRoYXQgdGhlIGJpbGwgaXMgZm9yLiA8cGFyYSAvPlxuICAgIC8vIG9wZXJhdG9ySWQgLSBUaGUgaWQgb2YgdGhlIG9wZXJhdG9yIGVudGVyZWQgb24gdGhlIGVmdHBvcy4gPHBhcmEgLz5cbiAgICAvLyA8cGFyYSAvPlxuICAgIC8vIFJldHVybjo8cGFyYSAvPlxuICAgIC8vIFlvdSBuZWVkIHRvIHJldHVybiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYmlsbC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgR2V0QmlsbFN0YXR1cyhiaWxsSWQsIHRhYmxlSWQsIG9wZXJhdG9ySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4gUGxlYXNlIG92ZXJ3cml0ZSB0aGlzIG1ldGhvZCBpbiB5b3VyIFBPUycpO1xuICAgIH1cblxuICAgIC8vIEFic3RyYWN0IG1ldGhvZCwgbXVzdCBpbXBsZW1lbnQgaW4gUE9TIHN5c3RlbVxuICAgIEJpbGxQYXltZW50UmVjZWl2ZWQoYmlsbFBheW1lbnQsIHVwZGF0ZWRCaWxsRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLiBQbGVhc2Ugb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIHlvdXIgUE9TJyk7XG4gICAgfVxuXG4gICAgUHVzaFBheUF0VGFibGVDb25maWcoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHRoaXMuQ29uZmlnLlRvTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwYXRjb25mXCIpKSk7XG4gICAgfSBcbiAgICBcbiAgICBfaGFuZGxlR2V0QmlsbERldGFpbHNSZXF1ZXN0KG0pXG4gICAge1xuICAgICAgICB2YXIgb3BlcmF0b3JJZCA9IG0uRGF0YVtcIm9wZXJhdG9yX2lkXCJdO1xuICAgICAgICB2YXIgdGFibGVJZCA9IG0uRGF0YVtcInRhYmxlX2lkXCJdO1xuXG4gICAgICAgIC8vIEFzayBQT1MgZm9yIEJpbGwgRGV0YWlscyBmb3IgdGhpcyB0YWJsZUlkLCBpbmx1ZGluZyBlbmNvZGVkIFBheW1lbnREYXRhXG4gICAgICAgIHZhciBiaWxsU3RhdHVzID0gdGhpcy5HZXRCaWxsU3RhdHVzKG51bGwsIHRhYmxlSWQsIG9wZXJhdG9ySWQpO1xuICAgICAgICBiaWxsU3RhdHVzLlRhYmxlSWQgPSB0YWJsZUlkO1xuICAgICAgICBpZiAoYmlsbFN0YXR1cy5Ub3RhbEFtb3VudCA8PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlRhYmxlIGhhcyAwIHRvdGFsIGFtb3VudC4gbm90IHNlbmRpbmcgaXQgdG8gZWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIGJpbGxTdGF0dXMuUmVzdWx0ID0gQmlsbFJldHJpZXZhbFJlc3VsdC5JTlZBTElEX1RBQkxFX0lEO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9zcGkuX3NlbmQoYmlsbFN0YXR1cy5Ub01lc3NhZ2UobS5JZCkpO1xuICAgIH1cblxuICAgIF9oYW5kbGVCaWxsUGF5bWVudEFkdmljZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGJpbGxQYXltZW50ID0gbmV3IEJpbGxQYXltZW50KG0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQXNrIFBPUyBmb3IgQmlsbCBEZXRhaWxzLCBpbmx1ZGluZyBlbmNvZGVkIFBheW1lbnREYXRhXG4gICAgICAgIHZhciBleGlzdGluZ0JpbGxTdGF0dXMgPSB0aGlzLkdldEJpbGxTdGF0dXMoYmlsbFBheW1lbnQuQmlsbElkLCBiaWxsUGF5bWVudC5UYWJsZUlkLCBiaWxsUGF5bWVudC5PcGVyYXRvcklkKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nQmlsbFN0YXR1cy5SZXN1bHQgIT0gQmlsbFJldHJpZXZhbFJlc3VsdC5TVUNDRVNTKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIkNvdWxkIG5vdCByZXRyaWV2ZSBCaWxsIFN0YXR1cyBmb3IgUGF5bWVudCBBZHZpY2UuIFNlbmRpbmcgRXJyb3IgdG8gRWZ0cG9zLlwiKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaS5fc2VuZChleGlzdGluZ0JpbGxTdGF0dXMuVG9NZXNzYWdlKG0uSWQpKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgdmFyIGV4aXN0aW5nUGF5bWVudEhpc3RvcnkgPSBleGlzdGluZ0JpbGxTdGF0dXMuZ2V0QmlsbFBheW1lbnRIaXN0b3J5KCk7XG4gICBcbiAgICAgICAgdmFyIGZvdW5kRXhpc3RpbmdFbnRyeSA9IGV4aXN0aW5nUGF5bWVudEhpc3RvcnkuZmluZChwaGUgPT4gcGhlLkdldFRlcm1pbmFsUmVmSWQoKSA9PSBiaWxsUGF5bWVudC5QdXJjaGFzZVJlc3BvbnNlLkdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKSk7XG4gICAgICAgIGlmIChmb3VuZEV4aXN0aW5nRW50cnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBwcm9jZXNzZWQgdGhpcyBwYXltZW50LlxuICAgICAgICAgICAgLy8gcGVyaGFwcyBFZnRwb3MgZGlkIGdldCBvdXIgYWNrbm93bGVkZ2VtZW50LlxuICAgICAgICAgICAgLy8gTGV0J3MgdXBkYXRlIEVmdHBvcy5cbiAgICAgICAgICAgIHRoaXMuX2xvZy53YXJuKFwiSGFkIGFscmVhZHkgcmVjZWl2ZWQgdGhpcyBiaWxsX3BheW1lbW50IGFkdmljZSBmcm9tIGVmdHBvcy4gSWdub3JpbmcuXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3BpLl9zZW5kKGV4aXN0aW5nQmlsbFN0YXR1cy5Ub01lc3NhZ2UobS5JZCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGV0J3MgYWRkIHRoZSBuZXcgZW50cnkgdG8gdGhlIGhpc3RvcnlcbiAgICAgICAgdmFyIHVwZGF0ZWRIaXN0b3J5RW50cmllcyA9IGV4aXN0aW5nUGF5bWVudEhpc3Rvcnk7XG4gICAgICAgIHVwZGF0ZWRIaXN0b3J5RW50cmllcy5wdXNoKFxuICAgICAgICAgICAgbmV3IFBheW1lbnRIaXN0b3J5RW50cnkoYmlsbFBheW1lbnQuUGF5bWVudFR5cGUudG9Mb3dlckNhc2UoKSwgYmlsbFBheW1lbnQuUHVyY2hhc2VSZXNwb25zZS5Ub1BheW1lbnRTdW1tYXJ5KCkpXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICB2YXIgdXBkYXRlZEJpbGxEYXRhID0gQmlsbFN0YXR1c1Jlc3BvbnNlLlRvQmlsbERhdGEodXBkYXRlZEhpc3RvcnlFbnRyaWVzKTtcblxuICAgICAgICAvLyBBZHZpc2UgUE9TIG9mIG5ldyBwYXltZW50IGFnYWluc3QgdGhpcyBiaWxsLCBhbmQgdGhlIHVwZGF0ZWQgQmlsbERhdGEgdG8gU2F2ZS5cbiAgICAgICAgdmFyIHVwZGF0ZWRCaWxsU3RhdHVzID0gdGhpcy5CaWxsUGF5bWVudFJlY2VpdmVkKGJpbGxQYXltZW50LCB1cGRhdGVkQmlsbERhdGEpO1xuXG4gICAgICAgIC8vIEp1c3QgaW4gY2FzZSBjbGllbnQgZm9yZ290IHRvIHNldCB0aGVzZTpcbiAgICAgICAgdXBkYXRlZEJpbGxTdGF0dXMuQmlsbElkID0gYmlsbFBheW1lbnQuQmlsbElkO1xuICAgICAgICB1cGRhdGVkQmlsbFN0YXR1cy5UYWJsZUlkID0gYmlsbFBheW1lbnQuVGFibGVJZDtcblxuICAgICAgICBpZiAodXBkYXRlZEJpbGxTdGF0dXMuUmVzdWx0ICE9IEJpbGxSZXRyaWV2YWxSZXN1bHQuU1VDQ0VTUylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJQT1MgRXJyb3JlZCB3aGVuIGJlaW5nIEFkdmlzZWQgb2YgUGF5bWVudC4gTGV0dGluZyBFRlRQT1Mga25vdywgYW5kIHNlbmRpbmcgZXhpc3RpbmcgYmlsbCBkYXRhLlwiKTtcbiAgICAgICAgICAgIHVwZGF0ZWRCaWxsU3RhdHVzLkJpbGxEYXRhID0gZXhpc3RpbmdCaWxsU3RhdHVzLkJpbGxEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdXBkYXRlZEJpbGxTdGF0dXMuQmlsbERhdGEgPSB1cGRhdGVkQmlsbERhdGE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHVwZGF0ZWRCaWxsU3RhdHVzLlRvTWVzc2FnZShtLklkKSk7XG4gICAgfVxuICAgIFxuICAgIF9oYW5kbGVHZXRUYWJsZUNvbmZpZyhtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpLl9zZW5kKHRoaXMuQ29uZmlnLlRvTWVzc2FnZShtLklkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBQcmVhdXRoRXZlbnRzLFxuICAgIEFjY291bnRWZXJpZnlSZXF1ZXN0LCBcbiAgICBQcmVhdXRoT3BlblJlcXVlc3QsIFxuICAgIFByZWF1dGhUb3B1cFJlcXVlc3QsIFxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdCwgXG4gICAgUHJlYXV0aEV4dGVuZFJlcXVlc3QsXG4gICAgUHJlYXV0aENvbXBsZXRpb25SZXF1ZXN0LFxuICAgIFByZWF1dGhDYW5jZWxSZXF1ZXN0fSBmcm9tICcuL1ByZWF1dGgnO1xuXG5pbXBvcnQge1RyYW5zYWN0aW9uRmxvd1N0YXRlLCBUcmFuc2FjdGlvblR5cGUsIEluaXRpYXRlVHhSZXN1bHR9IGZyb20gJy4vU3BpTW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIFNwaVByZWF1dGhcbntcbiAgICBjb25zdHJ1Y3RvcihzcGkpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGkgPSBzcGk7XG4gICAgICAgIHRoaXMuX2xvZyA9IGNvbnNvbGU7XG4gICAgfVxuXG4gICAgSW5pdGlhdGVBY2NvdW50VmVyaWZ5VHgocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB2YXIgdmVyaWZ5TXNnID0gbmV3IEFjY291bnRWZXJpZnlSZXF1ZXN0KHBvc1JlZklkKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuQWNjb3VudFZlcmlmeSwgMCwgdmVyaWZ5TXNnLFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIGFjY291bnQgdmVyaWZ5IHJlcXVlc3RcIik7XG4gICAgICAgIHZhciBzZW50TXNnID0gXCJBc2tlZCBFRlRQT1MgdG8gdmVyaWZ5IGFjY291bnRcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYXRlUHJlYXV0aFR4KHRmcywgc2VudE1zZyk7XG4gICAgfVxuICAgIFxuICAgIEluaXRpYXRlT3BlblR4KHBvc1JlZklkLCBhbW91bnRDZW50cylcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aE9wZW5SZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIHZhciBzZW50TXNnID0gYEFza2VkIEVGVFBPUyB0byBjcmVhdGUgcHJlYXV0aCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBJbml0aWF0ZVRvcHVwVHgocG9zUmVmSWQsIHByZWF1dGhJZCwgYW1vdW50Q2VudHMpXG4gICAge1xuICAgICAgICB2YXIgbXNnID0gbmV3IFByZWF1dGhUb3B1cFJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQpLlRvTWVzc2FnZSgpO1xuICAgICAgICB2YXIgdGZzID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QcmVhdXRoLCBhbW91bnRDZW50cywgbXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcHJlYXV0aCB0b3B1cCByZXF1ZXN0IGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB2YXIgc2VudE1zZyA9IGBBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIHRvcHVwIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlUGFydGlhbENhbmNlbGxhdGlvblR4KHBvc1JlZklkLCBwcmVhdXRoSWQsIGFtb3VudENlbnRzKVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQpLlRvTWVzc2FnZSgpO1xuICAgICAgICB2YXIgdGZzID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5QcmVhdXRoLCBhbW91bnRDZW50cywgbXNnLFxuICAgICAgICAgICAgYFdhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgcHJlYXV0aCBwYXJ0aWFsIGNhbmNlbGxhdGlvbiByZXF1ZXN0IGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB2YXIgc2VudE1zZyA9IGBBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIHBhcnRpYWwgY2FuY2VsbGF0aW9uIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlRXh0ZW5kVHgocG9zUmVmSWQsIHByZWF1dGhJZClcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aEV4dGVuZFJlcXVlc3QocHJlYXV0aElkLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIDAsIG1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIEV4dGVuZCByZXF1ZXN0XCIpO1xuICAgICAgICB2YXIgc2VudE1zZyA9IFwiQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBFeHRlbmQgcmVxdWVzdFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBJbml0aWF0ZUNvbXBsZXRpb25UeChwb3NSZWZJZCwgcHJlYXV0aElkLCBhbW91bnRDZW50cywgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoQ29tcGxldGlvblJlcXVlc3QocHJlYXV0aElkLCBhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIGNvbXBsZXRpb24gcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgdmFyIHNlbnRNc2cgPSBgQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBjb21wbGV0aW9uIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlQ2FuY2VsVHgocG9zUmVmSWQsIHByZWF1dGhJZClcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aENhbmNlbFJlcXVlc3QocHJlYXV0aElkLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIDAsIG1zZyxcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIGNhbmNlbGxhdGlvbiByZXF1ZXN0XCIpO1xuICAgICAgICB2YXIgc2VudE1zZyA9IFwiQXNrZWQgRUZUUE9TIHRvIG1ha2UgcHJlYXV0aCBjYW5jZWxsYXRpb24gcmVxdWVzdFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG5cbiAgICBfaW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5VbnBhaXJlZCkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBQYWlyZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcblxuICAgICAgICB0aGlzLl9zcGkuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlID0gdGZzO1xuICAgICAgICBpZiAodGhpcy5fc3BpLl9zZW5kKHRmcy5SZXF1ZXN0KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KHNlbnRNc2cpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJQcmVhdXRoIEluaXRpYXRlZFwiKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlUHJlYXV0aE1lc3NhZ2UobSlcbiAgICB7XG4gICAgICAgIHN3aXRjaCAobS5FdmVudE5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWNjb3VudFZlcmlmeVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQcmVhdXRoRXZlbnRzLlByZWF1dGhPcGVuUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aFRvcHVwUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoRXh0ZW5kUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVzcG9uc2U6XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aENhbmNlbGxhdGlvblJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVByZWF1dGhSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEkgZG9uJ3QgVW5kZXJzdGFuZCBQcmVhdXRoIEV2ZW50OiAke20uRXZlbnROYW1lfSwgJHttLkRhdGF9LiBQZXJoYXBzIEkgaGF2ZSBub3QgaW1wbGVtZW50ZWQgaXQgeWV0LmApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZUFjY291bnRWZXJpZnlSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdmFyIGN1cnJlbnRUeEZsb3dTdGF0ZSA9IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLl9zcGkuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCBjdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIWN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIEFjY291bnQgVmVyaWZ5IHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG5cbiAgICAgICAgY3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIkFjY291bnQgVmVyaWZ5IFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZVByZWF1dGhSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdmFyIGN1cnJlbnRUeEZsb3dTdGF0ZSA9IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIGlmICh0aGlzLl9zcGkuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCBjdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIWN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIFByZWF1dGggcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcblxuICAgICAgICBjdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiUHJlYXV0aCBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgc3RhdGljIElzUHJlYXV0aEV2ZW50KGV2ZW50TmFtZSlcbiAgICB7XG4gICAgICAgIHJldHVybiBldmVudE5hbWUubGFzdEluZGV4T2YoXCJwcmVhdXRoXCIsMCkgPT09IDAgXG4gICAgICAgICAgICAgICAgfHwgZXZlbnROYW1lID09IFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVzcG9uc2VcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5QcmVhdXRoQ29tcGxldGVSZXF1ZXN0XG4gICAgICAgICAgICAgICAgfHwgZXZlbnROYW1lID09IFByZWF1dGhFdmVudHMuQWNjb3VudFZlcmlmeVJlcXVlc3RcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVzcG9uc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
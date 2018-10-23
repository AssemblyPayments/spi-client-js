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
/******/ 	var hotCurrentHash = "79348d318efebae81cda";
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
/*! exports provided: Spi, Logger, Secrets, SuccessState, TransactionOptions, TransactionType, SpiFlow, SpiStatus, PrintingResponse, RefundResponse, PurchaseResponse, GetLastTransactionResponse, MotoPurchaseResponse, TerminalStatusResponse, TerminalBattery, CashoutOnlyResponse, Settlement */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrintingResponse", function() { return _src_Printing__WEBPACK_IMPORTED_MODULE_2__["PrintingResponse"]; });

/* harmony import */ var _src_Purchase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Purchase */ "./src/Purchase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RefundResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["RefundResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PurchaseResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["PurchaseResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GetLastTransactionResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["GetLastTransactionResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotoPurchaseResponse", function() { return _src_Purchase__WEBPACK_IMPORTED_MODULE_6__["MotoPurchaseResponse"]; });

/* harmony import */ var _src_TerminalStatus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/TerminalStatus */ "./src/TerminalStatus.js");
/* harmony import */ var _src_TerminalStatus__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_src_TerminalStatus__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TerminalStatusResponse", function() { return _src_TerminalStatus__WEBPACK_IMPORTED_MODULE_7__["TerminalStatusResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TerminalBattery", function() { return _src_TerminalStatus__WEBPACK_IMPORTED_MODULE_7__["TerminalBattery"]; });

/* harmony import */ var _src_Cashout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/Cashout */ "./src/Cashout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CashoutOnlyResponse", function() { return _src_Cashout__WEBPACK_IMPORTED_MODULE_8__["CashoutOnlyResponse"]; });

/* harmony import */ var _src_Settlement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/Settlement */ "./src/Settlement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Settlement", function() { return _src_Settlement__WEBPACK_IMPORTED_MODULE_9__["Settlement"]; });



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
/*! exports provided: ConnectionState, SPI_PROTOCOL, SPI_URI_SCHEME, ConnectionStateEventArgs, MessageEventArgs, Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionState", function() { return ConnectionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPI_PROTOCOL", function() { return SPI_PROTOCOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPI_URI_SCHEME", function() { return SPI_URI_SCHEME; });
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
var SPI_URI_SCHEME = 'wss'; // wss = secure (https / TLS), ws = non secure (http)

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
  CancelTransactionResponse: "cancel_response",
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
  SetPosInfoRequest: "set_pos_info",
  SetPosInfoResponse: "set_pos_info_response",
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
  PayAtTableBillPayment: "bill_payment",
  // incoming. When the eftpos advices 
  PrintingRequest: "print",
  PrintingResponse: "print_response",
  TerminalStatusRequest: "get_terminal_status",
  TerminalStatusResponse: "terminal_status",
  BatteryLevelChanged: "battery_level_changed"
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

/***/ "./src/PosInfo.js":
/*!************************!*\
  !*** ./src/PosInfo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SetPosInfoRequest =
/*#__PURE__*/
function () {
  function SetPosInfoRequest(version, vendorId, libraryLanguage, libraryVersion, otherInfo) {
    _classCallCheck(this, SetPosInfoRequest);

    this._version = version;
    this._vendorId = vendorId;
    this._libraryLanguage = libraryLanguage;
    this._libraryVersion = libraryVersion;
    this._otherInfo = otherInfo;
  }

  _createClass(SetPosInfoRequest, [{
    key: "toMessage",
    value: function toMessage() {
      var data = {
        pos_version: this._version,
        pos_vendor_id: this._vendorId,
        library_language: this._libraryLanguage,
        library_version: this._libraryVersion,
        other_info: this._otherInfo
      };
      return new Message(RequestIdHelper.Id("prav"), Events.SetPosInfoRequest, data, true);
    }
  }]);

  return SetPosInfoRequest;
}();

var SetPosInfoResponse =
/*#__PURE__*/
function () {
  function SetPosInfoResponse(m) {
    _classCallCheck(this, SetPosInfoResponse);

    this._success = m.GetSuccessState() == SuccessState.Success;
    this._m = m;
  }

  _createClass(SetPosInfoResponse, [{
    key: "isSuccess",
    value: function isSuccess() {
      return this._success;
    }
  }, {
    key: "getErrorReason",
    value: function getErrorReason() {
      return this._m.Data.error_reason;
    }
  }, {
    key: "getErrorDetail",
    value: function getErrorDetail() {
      return this._m.Data.error_detail;
    }
  }, {
    key: "getResponseValueWithAttribute",
    value: function getResponseValueWithAttribute(attribute) {
      return this._m.Data[attribute];
    }
  }]);

  return SetPosInfoResponse;
}();

var DeviceInfo =
/*#__PURE__*/
function () {
  function DeviceInfo() {
    _classCallCheck(this, DeviceInfo);
  }

  _createClass(DeviceInfo, null, [{
    key: "GetAppDeviceInfo",
    value: function GetAppDeviceInfo() {
      var deviceInfo = {};
      deviceInfo['device_system'] = navigator.userAgent; // deviceInfo.Add("device_system", Environment.OSVersion.Platform.ToString() + " " + Environment.OSVersion.Version.ToString());

      return deviceInfo;
    }
  }]);

  return DeviceInfo;
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
/*! exports provided: PrintingRequest, PrintingResponse, Printer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintingRequest", function() { return PrintingRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintingResponse", function() { return PrintingResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Printer", function() { return Printer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PrintingRequest =
/*#__PURE__*/
function () {
  function PrintingRequest(key, payload) {
    _classCallCheck(this, PrintingRequest);

    this._key = key;
    this._payload = payload;
  }

  _createClass(PrintingRequest, [{
    key: "toMessage",
    value: function toMessage() {
      var data = {
        "key": this._key,
        "payload": this._payload
      };
      return new Message(RequestIdHelper.Id("print"), Events.PrintingRequest, data, true);
    }
  }]);

  return PrintingRequest;
}();
var PrintingResponse =
/*#__PURE__*/
function () {
  function PrintingResponse(m) {
    _classCallCheck(this, PrintingResponse);

    this._success = m.GetSuccessState() == SuccessState.Success;
    this._m = m;
  }

  _createClass(PrintingResponse, [{
    key: "isSuccess",
    value: function isSuccess() {
      return this._success;
    }
  }, {
    key: "getErrorReason",
    value: function getErrorReason() {
      return this._m.Data.error_reason;
    }
  }, {
    key: "getErrorDetail",
    value: function getErrorDetail() {
      return this._m.Data.error_detail;
    }
  }, {
    key: "getResponseValueWithAttribute",
    value: function getResponseValueWithAttribute(attribute) {
      return this._m.Data[attribute];
    }
  }]);

  return PrintingResponse;
}();
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
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Connection */ "./src/Connection.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var DeviceAddressStatus =
/*#__PURE__*/
function () {
  _createClass(DeviceAddressStatus, [{
    key: "Address",
    get: function get() {
      if (_Connection__WEBPACK_IMPORTED_MODULE_0__["SPI_URI_SCHEME"] === 'wss') {
        return this.fqdn;
      } else {
        return this.ip;
      }
    },
    set: function set(address) {
      if (_Connection__WEBPACK_IMPORTED_MODULE_0__["SPI_URI_SCHEME"] === 'wss') {
        this.fqdn = addreses;
      } else {
        this.ip = address;
      }
    }
  }]);

  function DeviceAddressStatus() {
    _classCallCheck(this, DeviceAddressStatus);

    this.ip = null;
    this.fqdn = null;
    this.last_updated = null;
  }

  return DeviceAddressStatus;
}();
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
      var acquirerCode = arguments.length > 2 ? arguments[2] : undefined;
      var isTestMode = arguments.length > 3 ? arguments[3] : undefined;
      var path = _Connection__WEBPACK_IMPORTED_MODULE_0__["SPI_URI_SCHEME"] === 'wss' ? 'fqdn' : 'ip'; // https://device-address-api-dev.nonprod-${acquirerCode}.msp.assemblypayments.com/v1/${serialNumber}/${path}

      var deviceAddressUri = isTestMode ? "/api/v1/".concat(path, "?serial=").concat(serialNumber, "&acquirerCode=").concat(acquirerCode) : "https://device-address-api.".concat(acquirerCode, ".msp.assemblypayments.com/v1/").concat(serialNumber, "/").concat(path);
      return fetch(deviceAddressUri, {
        method: 'GET',
        headers: {
          "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
        }
      }).then(function (response) {
        return response.json();
      }).catch(function (response) {
        console.error("Status code ".concat(response.StatusCode, " received from ").concat(deviceAddressUri, " - Exception ").concat(response.error));
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
/*! exports provided: SPI_VERSION, default, Spi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPI_VERSION", function() { return SPI_VERSION; });
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
/* harmony import */ var _PosInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PosInfo */ "./src/PosInfo.js");
/* harmony import */ var _PosInfo__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_PosInfo__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _PurchaseHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PurchaseHelper */ "./src/PurchaseHelper.js");
/* harmony import */ var _KeyRollingHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KeyRollingHelper */ "./src/KeyRollingHelper.js");
/* harmony import */ var _PingHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PingHelper */ "./src/PingHelper.js");
/* harmony import */ var _Purchase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Purchase */ "./src/Purchase.js");
/* harmony import */ var _Service_DeviceService__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Service/DeviceService */ "./src/Service/DeviceService.js");
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
    this._eftposAddress = "".concat(_Connection__WEBPACK_IMPORTED_MODULE_3__["SPI_URI_SCHEME"], "://").concat(eftposAddress);
    this._log = console;
    this.Config = new _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiConfig"]();
    this.CurrentDeviceStatus = null;
    this._deviceApiKey = null;
    this._acquirerCode = null;
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
    /// Set the acquirer code of your bank, please contact Assembly's Integration Engineers for acquirer code.
    /// </summary>

  }, {
    key: "SetAcquirerCode",
    value: function SetAcquirerCode(acquirerCode) {
      this._acquirerCode = acquirerCode;
      return true;
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
      var was = this._serialNumber;
      this._serialNumber = serialNumber;

      if (this._autoAddressResolutionEnabled && this.HasSerialNumberChanged(was)) {
        this._autoResolveEftposAddress();
      }

      return true;
    } /// <summary>
    /// Allows you to set the auto address discovery feature. 
    /// </summary>
    /// <returns></returns>

  }, {
    key: "SetAutoAddressResolution",
    value: function SetAutoAddressResolution(autoAddressResolutionEnable) {
      if (this.CurrentStatus == _SpiModels__WEBPACK_IMPORTED_MODULE_1__["SpiStatus"].PairedConnected) return false;
      var was = this._autoAddressResolutionEnabled;
      this._autoAddressResolutionEnabled = autoAddressResolutionEnable;

      if (autoAddressResolutionEnable && !was) {
        // we're turning it on
        this._autoResolveEftposAddress();
      }

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
      if (testMode == this._inTestMode) return true; // we're changing mode

      this._inTestMode = testMode;

      this._autoResolveEftposAddress();

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

      this._eftposAddress = "".concat(_Connection__WEBPACK_IMPORTED_MODULE_3__["SPI_URI_SCHEME"], "://").concat(address);
      this._conn.Address = this._eftposAddress;
      return true;
    }
  }, {
    key: "SetPosInfo",

    /**
     * Sets values used to identify the POS software to the EFTPOS terminal.
     * Must be set before starting!
     *
     * @param posVendorId Vendor identifier of the POS itself.
     * @param posVersion  Version string of the POS itself.
     */
    value: function SetPosInfo(posVendorId, posVersion) {
      this._posVendorId = posVendorId;
      this._posVersion = posVersion;
    } // <summary>
    // Call this one when a flow is finished and you want to go back to idle state.
    // Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
    // finished, or that transaction is finished.
    // When true, you can dismiss the flow screen and show back the idle screen.
    // </summary>
    // <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>

  }, {
    key: "AckFlowEndedAndBackToIdle",
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

      var purchaseRequest = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_9__["PurchaseHelper"].CreatePurchaseRequest(amountCents, posRefId);
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
      var purchase = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_9__["PurchaseHelper"].CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount);
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

      var refundRequest = _PurchaseHelper__WEBPACK_IMPORTED_MODULE_9__["PurchaseHelper"].CreateRefundRequest(amountCents, posRefId, isSuppressMerchantPassword);
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
        var cancelReq = new _Purchase__WEBPACK_IMPORTED_MODULE_12__["CancelTransactionRequest"]();
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

      var gltRequestMsg = new _Purchase__WEBPACK_IMPORTED_MODULE_12__["GetLastTransactionRequest"]().ToMessage();
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
      var gltRequestMsg = new _Purchase__WEBPACK_IMPORTED_MODULE_12__["GetLastTransactionRequest"]().ToMessage();
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
    }
  }, {
    key: "PrintReceipt",
    value: function PrintReceipt(key, payload) {
      this._send(new PrintingRequest(key, payload).toMessage());
    }
  }, {
    key: "GetTerminalStatus",
    value: function GetTerminalStatus() {
      this._send(new TerminalStatusRequest().ToMessage());
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
      var krRes = _KeyRollingHelper__WEBPACK_IMPORTED_MODULE_10__["KeyRollingHelper"].PerformKeyRolling(m, this._secrets);
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

      this.CurrentTxFlowState.SignatureRequired(new _Purchase__WEBPACK_IMPORTED_MODULE_12__["SignatureRequired"](m), "Ask Customer to Sign the Receipt");
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

            this.CurrentTxFlowState.SignatureRequired(new _Purchase__WEBPACK_IMPORTED_MODULE_12__["SignatureRequired"](txState.PosRefId, m.Id, "MISSING RECEIPT\n DECLINE AND TRY AGAIN."), "Recovered in Signature Required but we don't have receipt. You may Decline then Retry.");
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
      var cancelResponse = new _Purchase__WEBPACK_IMPORTED_MODULE_12__["CancelTransactionResponse"](m);
      if (cancelResponse.Success) return;

      this._log.warn("Failed to cancel transaction: reason=" + cancelResponse.GetErrorReason() + ", detail=" + cancelResponse.GetErrorDetail());

      txState.CancelFailed("Failed to cancel transaction: " + cancelResponse.GetErrorDetail() + ". Check EFTPOS.");
      document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {
        detail: txState
      }));
    }
  }, {
    key: "_handleSetPosInfoResponse",
    value: function _handleSetPosInfoResponse(m) {
      var response = new SetPosInfoResponse(m);

      if (response.isSuccess()) {
        this._hasSetInfo = true;

        this._log.Info("Setting POS info successful");
      } else {
        this._log.Warn("Setting POS info failed: reason=" + response.getErrorReason() + ", detail=" + response.getErrorDetail());
      }
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
    }
  }, {
    key: "PrintingResponse",
    value: function PrintingResponse(m) {
      throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }
  }, {
    key: "TerminalStatusResponse",
    value: function TerminalStatusResponse(m) {
      throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }
  }, {
    key: "BatteryLevelChanged",
    value: function BatteryLevelChanged(m) {
      throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }
  }, {
    key: "_handlePrintingResponse",
    value: function _handlePrintingResponse(m) {
      this.PrintingResponse(m);
    }
  }, {
    key: "_handleTerminalStatusResponse",
    value: function _handleTerminalStatusResponse(m) {
      this.TerminalStatusResponse(m);
    }
  }, {
    key: "_handleBatteryLevelChanged",
    value: function _handleBatteryLevelChanged(m) {
      this.BatteryLevelChanged(m);
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
        if (!this._hasSetInfo) {
          this._callSetPosInfo();
        } // let's also tell the eftpos our latest table configuration.


        if (this._spiPat) {
          this._spiPat.PushPayAtTableConfig();
        }
      }
    }
  }, {
    key: "_callSetPosInfo",
    value: function _callSetPosInfo() {
      var setPosInfoRequest = new _PosInfo__WEBPACK_IMPORTED_MODULE_8__["SetPosInfoRequest"](this._posVersion, this._posVendorId, "js", this.GetVersion(), DeviceInfo.GetAppDeviceInfo());

      this._send(setPosInfoRequest.toMessage());
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
      var ping = _PingHelper__WEBPACK_IMPORTED_MODULE_11__["PingHelper"].GeneratePingRequest();
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
      var pong = _PingHelper__WEBPACK_IMPORTED_MODULE_11__["PongHelper"].GeneratePongRessponse(m);

      this._send(pong);
    } // <summary>
    // Ask the PinPad to tell us what the Most Recent Transaction was
    // </summary>

  }, {
    key: "_callGetLastTransaction",
    value: function _callGetLastTransaction() {
      var gltRequest = new _Purchase__WEBPACK_IMPORTED_MODULE_12__["GetLastTransactionRequest"]();

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

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].CancelTransactionResponse:
          this._handleCancelTransactionResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].SetPosInfoResponse:
          this._handleSetPosInfoResponse(m);

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

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].PrintingResponse:
          this._handlePrintingResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].TerminalStatusResponse:
          this._handleTerminalStatusResponse(m);

          break;

        case _Messages__WEBPACK_IMPORTED_MODULE_0__["Events"].BatteryLevelChanged:
          this._handleBatteryLevelChanged(m);

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
      var service = new _Service_DeviceService__WEBPACK_IMPORTED_MODULE_13__["DeviceAddressService"]();
      return service.RetrieveService(this._serialNumber, this._deviceApiKey, this._acquirerCode, this._inTestMode).then(function (response) {
        var deviceAddressStatus = Object.assign(new _Service_DeviceService__WEBPACK_IMPORTED_MODULE_13__["DeviceAddressStatus"](), response);
        if (!deviceAddressStatus || !deviceAddressStatus.Address) return;
        if (!_this6.HasEftposAddressChanged(deviceAddressStatus.Address)) return; // update device and connection address

        _this6._eftposAddress = "".concat(_Connection__WEBPACK_IMPORTED_MODULE_3__["SPI_URI_SCHEME"], "://").concat(deviceAddressStatus.Address);
        _this6._conn.Address = _this6._eftposAddress;
        _this6.CurrentDeviceStatus = deviceAddressStatus;
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

/***/ }),

/***/ "./src/TerminalStatus.js":
/*!*******************************!*\
  !*** ./src/TerminalStatus.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TerminalStatusRequest =
/*#__PURE__*/
function () {
  function TerminalStatusRequest() {
    _classCallCheck(this, TerminalStatusRequest);
  }

  _createClass(TerminalStatusRequest, [{
    key: "ToMessage",
    value: function ToMessage() {
      var data = {};
      return new Message(RequestIdHelper.Id("trmnl"), Events.TerminalStatusRequest, data, true);
    }
  }]);

  return TerminalStatusRequest;
}();

var TerminalStatusResponse =
/*#__PURE__*/
function () {
  function TerminalStatusResponse(m) {
    _classCallCheck(this, TerminalStatusResponse);

    this._m = m;
  }

  _createClass(TerminalStatusResponse, [{
    key: "GetStatus",
    value: function GetStatus() {
      return this._m.Data.status;
    }
  }, {
    key: "GetBatteryLevel",
    value: function GetBatteryLevel() {
      return this._m.Data.battery_level;
    }
  }, {
    key: "IsCharging",
    value: function IsCharging() {
      return !!this._m.Data.charging;
    }
  }]);

  return TerminalStatusResponse;
}();

var TerminalBattery = function TerminalBattery(m) {
  _classCallCheck(this, TerminalBattery);

  this.BatteryLevel = m.Data.battery_level;
};

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWVzLWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3NoYS9zcmMvc2hhLmpzIiwid2VicGFjazovLy8uL3NyYy9DYXNob3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9DcnlwdG8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0tleVJvbGxpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhaXJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BheUF0VGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BpbmdIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Bvc0luZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByZWF1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ByaW50aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXJjaGFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHVyY2hhc2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlcXVlc3RJZEhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VjcmV0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZS9EZXZpY2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TZXR0bGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9TcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NwaU1vZGVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUGF5QXRUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3BpUHJlYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGVybWluYWxTdGF0dXMuanMiXSwibmFtZXMiOlsid2luZG93IiwiU3BpIiwiTG9nZ2VyIiwiUHJpbnRlciIsIkNhc2hvdXRPbmx5UmVxdWVzdCIsImFtb3VudENlbnRzIiwicG9zUmVmSWQiLCJzdXJjaGFyZ2VBbW91bnQiLCJQb3NSZWZJZCIsIkNhc2hvdXRBbW91bnQiLCJTdXJjaGFyZ2VBbW91bnQiLCJDb25maWciLCJTcGlDb25maWciLCJPcHRpb25zIiwiVHJhbnNhY3Rpb25PcHRpb25zIiwiZGF0YSIsImFkZFJlY2VpcHRDb25maWciLCJBZGRPcHRpb25zIiwiTWVzc2FnZSIsIlJlcXVlc3RJZEhlbHBlciIsIklkIiwiRXZlbnRzIiwiQ2FzaG91dE9ubHlSZXNwb25zZSIsIm0iLCJfbSIsIlJlcXVlc3RJZCIsIkRhdGEiLCJwb3NfcmVmX2lkIiwiU2NoZW1lTmFtZSIsInNjaGVtZV9uYW1lIiwiU3VjY2VzcyIsIkdldFN1Y2Nlc3NTdGF0ZSIsIlN1Y2Nlc3NTdGF0ZSIsImF0dHJpYnV0ZSIsIkNvbm5lY3Rpb25TdGF0ZSIsIkRpc2Nvbm5lY3RlZCIsIkNvbm5lY3RpbmciLCJDb25uZWN0ZWQiLCJTUElfUFJPVE9DT0wiLCJTUElfVVJJX1NDSEVNRSIsIkNvbm5lY3Rpb25TdGF0ZUV2ZW50QXJncyIsImNvbm5lY3Rpb25TdGF0ZSIsIk1lc3NhZ2VFdmVudEFyZ3MiLCJtZXNzYWdlIiwiQ29ubmVjdGlvbiIsIkFkZHJlc3MiLCJTdGF0ZSIsIlNwaVByb3RvY29sIiwiX3dzIiwiV2ViU29ja2V0IiwiRXJyb3IiLCJvbm9wZW4iLCJwb2xsV2ViU29ja2V0Q29ubmVjdGlvbiIsIm9ubWVzc2FnZSIsInBheWxvYWQiLCJvbk1lc3NhZ2VSZWNlaXZlZCIsIm9uY2xvc2UiLCJvbkNsb3NlZCIsIm9uZXJyb3IiLCJlcnIiLCJvbkVycm9yIiwiZG9jdW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJyZWFkeVN0YXRlIiwiQ0xPU0VEIiwiY2xvc2UiLCJzZW5kIiwiY291bnQiLCJPUEVOIiwib25PcGVuZWQiLCJzZXRUaW1lb3V0IiwiRGlzY29ubmVjdCIsIkNyeXB0byIsImtleSIsImJ5dGVzIiwiYWVzanMiLCJ1dGlscyIsImhleCIsInRvQnl0ZXMiLCJpdiIsInRleHRCeXRlcyIsInBhZGRpbmciLCJwa2NzNyIsInBhZCIsInV0ZjgiLCJhZXNDYmMiLCJNb2RlT2ZPcGVyYXRpb24iLCJjYmMiLCJlbmNyeXB0ZWRCeXRlcyIsImVuY3J5cHQiLCJlbmNyeXB0ZWRTdHJpbmciLCJmcm9tQnl0ZXMiLCJkZWNyeXB0ZWRCeXRlcyIsImRlY3J5cHQiLCJkZWNyeXB0ZWQiLCJzdHJpcCIsIm1lc3NhZ2VUb1NpZ24iLCJzaGFPYmoiLCJqc1NIQSIsInNldEhNQUNLZXkiLCJ1cGRhdGUiLCJnZXRITUFDIiwidmFsdWUiLCJzaGFIYXNoIiwiZ2V0SGFzaCIsIktleVJvbGxpbmdIZWxwZXIiLCJrclJlcXVlc3QiLCJjdXJyZW50U2VjcmV0cyIsIktleVJvbGxSZXNwb25zZSIsIm5ld1NlY3JldHMiLCJTZWNyZXRzIiwiR2VuZXJhdGVIYXNoIiwiRW5jS2V5IiwidG9VcHBlckNhc2UiLCJIbWFjS2V5IiwiS2V5Um9sbGluZ1Jlc3VsdCIsImtleVJvbGxpbmdDb25maXJtYXRpb24iLCJLZXlSb2xsaW5nQ29uZmlybWF0aW9uIiwiTmV3U2VjcmV0cyIsImVsZW1lbnQiLCJsaW5lU2VwZXJhdG9yIiwiYnVmZmVyIiwiYXJncyIsInB1c2giLCJqb2luIiwiX3JlbmRlciIsImNvbnNvbGUiLCJsb2ciLCJpbm5lclRleHQiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJQYWlyUmVxdWVzdCIsIktleVJlcXVlc3QiLCJLZXlSZXNwb25zZSIsIktleUNoZWNrIiwiUGFpclJlc3BvbnNlIiwiRHJvcEtleXNBZHZpY2UiLCJMb2dpblJlcXVlc3QiLCJMb2dpblJlc3BvbnNlIiwiUGluZyIsIlBvbmciLCJQdXJjaGFzZVJlcXVlc3QiLCJQdXJjaGFzZVJlc3BvbnNlIiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0IiwiQ2FuY2VsVHJhbnNhY3Rpb25SZXNwb25zZSIsIkdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QiLCJHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSIsIlJlZnVuZFJlcXVlc3QiLCJSZWZ1bmRSZXNwb25zZSIsIlNpZ25hdHVyZVJlcXVpcmVkIiwiU2lnbmF0dXJlRGVjbGluZWQiLCJTaWduYXR1cmVBY2NlcHRlZCIsIkF1dGhDb2RlUmVxdWlyZWQiLCJBdXRoQ29kZUFkdmljZSIsIk1vdG9QdXJjaGFzZVJlcXVlc3QiLCJNb3RvUHVyY2hhc2VSZXNwb25zZSIsIlNldHRsZVJlcXVlc3QiLCJTZXR0bGVSZXNwb25zZSIsIlNldHRsZW1lbnRFbnF1aXJ5UmVxdWVzdCIsIlNldHRsZW1lbnRFbnF1aXJ5UmVzcG9uc2UiLCJTZXRQb3NJbmZvUmVxdWVzdCIsIlNldFBvc0luZm9SZXNwb25zZSIsIktleVJvbGxSZXF1ZXN0IiwiSW52YWxpZEhtYWNTaWduYXR1cmUiLCJQYXlBdFRhYmxlR2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlU2V0VGFibGVDb25maWciLCJQYXlBdFRhYmxlR2V0QmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbERldGFpbHMiLCJQYXlBdFRhYmxlQmlsbFBheW1lbnQiLCJQcmludGluZ1JlcXVlc3QiLCJQcmludGluZ1Jlc3BvbnNlIiwiVGVybWluYWxTdGF0dXNSZXF1ZXN0IiwiVGVybWluYWxTdGF0dXNSZXNwb25zZSIsIkJhdHRlcnlMZXZlbENoYW5nZWQiLCJVbmtub3duIiwiRmFpbGVkIiwiTWVzc2FnZVN0YW1wIiwicG9zSWQiLCJzZWNyZXRzIiwic2VydmVyVGltZURlbHRhIiwiUG9zSWQiLCJTZXJ2ZXJUaW1lRGVsdGEiLCJNZXNzYWdlRW52ZWxvcGUiLCJlbmMiLCJobWFjIiwiRW5jIiwiSG1hYyIsInBvc19pZCIsImlkIiwiZXZlbnROYW1lIiwibmVlZHNFbmNyeXB0aW9uIiwiRXZlbnROYW1lIiwiRGF0ZVRpbWVTdGFtcCIsIkluY29tbWluZ0htYWMiLCJfbmVlZHNFbmNyeXB0aW9uIiwiRGVjcnlwdGVkSnNvbiIsInN1Y2Nlc3MiLCJlcnJvcl9yZWFzb24iLCJlcnJvcl9kZXRhaWwiLCJub3ciLCJEYXRlIiwiZHRzIiwic3BsaXQiLCJtc2dUaW1lIiwiZ2V0VGltZSIsInN0YW1wIiwidHpvZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImFkanVzdGVkVGltZSIsInRvSVNPU3RyaW5nIiwic2xpY2UiLCJlbnZlbG9wZSIsImV2ZW50IiwiZGF0ZXRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5jTXNnIiwiQWVzRW5jcnlwdCIsImhtYWNTaWciLCJIbWFjU2lnbmF0dXJlIiwiZW5jck1lc3NhZ2VFbnZlbG9wZSIsImJhbmtEYXRlIiwibGVuZ3RoIiwic3Vic3RyIiwiZGF0ZSIsInRpbWUiLCJtc2dKc29uIiwiZW52IiwicGFyc2UiLCJzaWciLCJkZWNyeXB0ZWRKc29uIiwiQWVzRGVjcnlwdCIsImRlY3J5cHRlZE1zZyIsIkluY29taW5nSG1hYyIsImUiLCJBZW5jIiwiQSIsIkFobWFjIiwicmVxdWVzdElkIiwiQmVuYyIsIkJobWFjIiwiQiIsIkNvbmZpcm1hdGlvbkNvZGUiLCJzdWJzdHJpbmciLCJTZWNyZXRzQW5kS2V5UmVzcG9uc2UiLCJrZXlSZXNwb25zZSIsIkRyb3BLZXlzUmVxdWVzdCIsIkJpbGxTdGF0dXNSZXNwb25zZSIsIlJlc3VsdCIsIkJpbGxJZCIsIlRhYmxlSWQiLCJUb3RhbEFtb3VudCIsIk91dHN0YW5kaW5nQW1vdW50IiwiQmlsbERhdGEiLCJiaWxsUGF5bWVudEhpc3RvcnkiLCJzYXZlZEJpbGxEYXRhIiwibWFwIiwiYmlsbCIsIlBheW1lbnRIaXN0b3J5RW50cnkiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X3N1bW1hcnkiLCJtZXNzYWdlSWQiLCJCaWxsUmV0cmlldmFsUmVzdWx0IiwiU1VDQ0VTUyIsImJpbGxfaWQiLCJ0YWJsZV9pZCIsImJpbGxfdG90YWxfYW1vdW50IiwiYmlsbF9vdXRzdGFuZGluZ19hbW91bnQiLCJiaWxsX3BheW1lbnRfaGlzdG9yeSIsImdldEJpbGxQYXltZW50SGlzdG9yeSIsInRvU3RyaW5nIiwicGgiLCJJTlZBTElEX1RBQkxFX0lEIiwiSU5WQUxJRF9CSUxMX0lEIiwiSU5WQUxJRF9PUEVSQVRPUl9JRCIsIlBheW1lbnRUeXBlIiwiQ0FSRCIsIkNBU0giLCJCaWxsUGF5bWVudCIsIl9pbmNvbWluZ0FkdmljZSIsIk9wZXJhdG9ySWQiLCJwdCIsInB1cmNoYXNlTXNnIiwiUHVyY2hhc2VBbW91bnQiLCJHZXRQdXJjaGFzZUFtb3VudCIsIlRpcEFtb3VudCIsIkdldFRpcEFtb3VudCIsInBheW1lbnRUeXBlIiwicGF5bWVudFN1bW1hcnkiLCJQYXltZW50U3VtbWFyeSIsIlBheUF0VGFibGVDb25maWciLCJQYXlBdFRhYmxlZEVuYWJsZWQiLCJPcGVyYXRvcklkRW5hYmxlZCIsIlNwbGl0QnlBbW91bnRFbmFibGVkIiwiRXF1YWxTcGxpdEVuYWJsZWQiLCJUaXBwaW5nRW5hYmxlZCIsIlN1bW1hcnlSZXBvcnRFbmFibGVkIiwiTGFiZWxQYXlCdXR0b24iLCJMYWJlbE9wZXJhdG9ySWQiLCJMYWJlbFRhYmxlSWQiLCJBbGxvd2VkT3BlcmF0b3JJZHMiLCJQb25nSGVscGVyIiwicGluZyIsIlBpbmdIZWxwZXIiLCJ2ZXJzaW9uIiwidmVuZG9ySWQiLCJsaWJyYXJ5TGFuZ3VhZ2UiLCJsaWJyYXJ5VmVyc2lvbiIsIm90aGVySW5mbyIsIl92ZXJzaW9uIiwiX3ZlbmRvcklkIiwiX2xpYnJhcnlMYW5ndWFnZSIsIl9saWJyYXJ5VmVyc2lvbiIsIl9vdGhlckluZm8iLCJwb3NfdmVyc2lvbiIsInBvc192ZW5kb3JfaWQiLCJsaWJyYXJ5X2xhbmd1YWdlIiwibGlicmFyeV92ZXJzaW9uIiwib3RoZXJfaW5mbyIsIl9zdWNjZXNzIiwiRGV2aWNlSW5mbyIsImRldmljZUluZm8iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJQcmVhdXRoRXZlbnRzIiwiQWNjb3VudFZlcmlmeVJlcXVlc3QiLCJBY2NvdW50VmVyaWZ5UmVzcG9uc2UiLCJQcmVhdXRoT3BlblJlcXVlc3QiLCJQcmVhdXRoT3BlblJlc3BvbnNlIiwiUHJlYXV0aFRvcHVwUmVxdWVzdCIsIlByZWF1dGhUb3B1cFJlc3BvbnNlIiwiUHJlYXV0aEV4dGVuZFJlcXVlc3QiLCJQcmVhdXRoRXh0ZW5kUmVzcG9uc2UiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlc3BvbnNlIiwiUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QiLCJQcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2UiLCJQcmVhdXRoQ29tcGxldGVSZXF1ZXN0IiwiUHJlYXV0aENvbXBsZXRlUmVzcG9uc2UiLCJEZXRhaWxzIiwiUHJlYXV0aEFtb3VudCIsInByZWF1dGhJZCIsInRvcHVwQW1vdW50Q2VudHMiLCJQcmVhdXRoSWQiLCJUb3B1cEFtb3VudCIsInBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnRDZW50cyIsIlBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnQiLCJQcmVhdXRoQ2FuY2VsUmVxdWVzdCIsIlByZWF1dGhDb21wbGV0aW9uUmVxdWVzdCIsImNvbXBsZXRpb25BbW91bnRDZW50cyIsIkNvbXBsZXRpb25BbW91bnQiLCJQcmVhdXRoUmVzcG9uc2UiLCJ0eFR5cGUiLCJfa2V5IiwiX3BheWxvYWQiLCJQcm9tcHRGb3JDYXNob3V0IiwiQW1vdW50Q2VudHMiLCJ0b0ZpeGVkIiwicHVyY2hhc2VfYW1vdW50IiwidGlwX2Ftb3VudCIsImNhc2hfYW1vdW50IiwicHJvbXB0X2Zvcl9jYXNob3V0Iiwic3VyY2hhcmdlX2Ftb3VudCIsIlNjaGVtZUFwcE5hbWUiLCJycm4iLCJiYW5rX25vbmNhc2hfYW1vdW50IiwiYmFua19jYXNoX2Ftb3VudCIsImN1c3RvbWVyX3JlY2VpcHQiLCJtZXJjaGFudF9yZWNlaXB0IiwiaG9zdF9yZXNwb25zZV90ZXh0IiwiaG9zdF9yZXNwb25zZV9jb2RlIiwidGVybWluYWxfcmVmX2lkIiwiY2FyZF9lbnRyeSIsImFjY291bnRfdHlwZSIsImF1dGhfY29kZSIsImJhbmtfZGF0ZSIsImJhbmtfdGltZSIsIm1hc2tlZF9wYW4iLCJ0ZXJtaW5hbF9pZCIsIm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZCIsImN1c3RvbWVyX3JlY2VpcHRfcHJpbnRlZCIsImRhdGVTdHIiLCJiYW5rX3NldHRsZW1lbnRfZGF0ZSIsIlBhcnNlQmFua0RhdGUiLCJHZXRBY2NvdW50VHlwZSIsIkdldEF1dGhDb2RlIiwiR2V0QmFua0RhdGUiLCJHZXRCYW5rVGltZSIsIkdldFJlc3BvbnNlQ29kZSIsIkdldFJlc3BvbnNlVGV4dCIsIkdldE1hc2tlZFBhbiIsIkdldFJSTiIsIkdldFRlcm1pbmFsSWQiLCJHZXRUZXJtaW5hbFJlZmVyZW5jZUlkIiwiR2V0U3VyY2hhcmdlQW1vdW50IiwiR2V0RXJyb3IiLCJzdGFydHNXaXRoIiwiV2FzT3BlcmF0aW9uSW5Qcm9ncmVzc0Vycm9yIiwiR2V0UG9zUmVmSWQiLCJ0cmFuc2FjdGlvbl90eXBlIiwiYW1vdW50X3B1cmNoYXNlIiwiYW1vdW50X3RyYW5zYWN0aW9uX3R5cGUiLCJkcyIsImNyIiwibXIiLCJyZWZ1bmRfYW1vdW50IiwiX3JlY2VpcHRUb1NpZ24iLCJyZWNlaXB0VG9TaWduIiwiU2lnbmF0dXJlRGVjbGluZSIsIlNpZ25hdHVyZUFjY2VwdCIsIlBob25lRm9yQXV0aFJlcXVpcmVkIiwiX3Bob25lTnVtYmVyIiwiX21lcmNoYW50SWQiLCJhdXRoX2NlbnRyZV9waG9uZV9udW1iZXIiLCJtZXJjaGFudF9pZCIsImF1dGhDb2RlIiwiQXV0aENvZGUiLCJQdXJjaGFzZUhlbHBlciIsInB1cmNoYXNlSWQiLCJwdXJjaGFzZUFtb3VudCIsInRpcEFtb3VudCIsImNhc2hvdXRBbW91bnQiLCJwcm9tcHRGb3JDYXNob3V0IiwicHIiLCJPYmplY3QiLCJhc3NpZ24iLCJpc1N1cHByZXNzTWVyY2hhbnRQYXNzd29yZCIsIl9fUmVxdWVzdElkSGVscGVyQ291bnRlciIsInByZWZpeCIsImVuY0tleSIsImhtYWNLZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJEZXZpY2VBZGRyZXNzU3RhdHVzIiwiZnFkbiIsImlwIiwiYWRkcmVzcyIsImFkZHJlc2VzIiwibGFzdF91cGRhdGVkIiwiRGV2aWNlQWRkcmVzc1NlcnZpY2UiLCJzZXJpYWxOdW1iZXIiLCJhcGlLZXkiLCJhY3F1aXJlckNvZGUiLCJpc1Rlc3RNb2RlIiwicGF0aCIsImRldmljZUFkZHJlc3NVcmkiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsIlN0YXR1c0NvZGUiLCJTZXR0bGVtZW50IiwiYWNjdW11bGF0ZWRfc2V0dGxlX2J5X2FjcXVpcmVyX2NvdW50IiwiYWNjdW11bGF0ZWRfc2V0dGxlX2J5X2FjcXVpcmVyX3ZhbHVlIiwiYWNjdW11bGF0ZWRfdG90YWxfY291bnQiLCJhY2N1bXVsYXRlZF90b3RhbF92YWx1ZSIsInRpbWVTdHIiLCJzZXR0bGVtZW50X3BlcmlvZF9zdGFydF90aW1lIiwic2V0dGxlbWVudF9wZXJpb2Rfc3RhcnRfZGF0ZSIsIlBhcnNlQmFua0RhdGVUaW1lU3RyIiwic2V0dGxlbWVudF9wZXJpb2RfZW5kX3RpbWUiLCJzZXR0bGVtZW50X3BlcmlvZF9lbmRfZGF0ZSIsInNldHRsZW1lbnRfdHJpZ2dlcmVkX3RpbWUiLCJzZXR0bGVtZW50X3RyaWdnZXJlZF9kYXRlIiwidHJhbnNhY3Rpb25fcmFuZ2UiLCJzY2hlbWVzIiwic2NoZW1lIiwiU2NoZW1lU2V0dGxlbWVudEVudHJ5IiwiU2V0dGxlQnlBY3F1aXJlciIsInNldHRsZV9ieV9hY3F1aXJlciIsInRvTG93ZXJDYXNlIiwiVG90YWxWYWx1ZSIsInBhcnNlSW50IiwidG90YWxfdmFsdWUiLCJUb3RhbENvdW50IiwidG90YWxfY291bnQiLCJTUElfVkVSU0lPTiIsIl9jdXJyZW50U3RhdHVzIiwiZWZ0cG9zQWRkcmVzcyIsIl9wb3NJZCIsIl9zZXJpYWxOdW1iZXIiLCJfc2VjcmV0cyIsIl9lZnRwb3NBZGRyZXNzIiwiX2xvZyIsIkN1cnJlbnREZXZpY2VTdGF0dXMiLCJfZGV2aWNlQXBpS2V5IiwiX2FjcXVpcmVyQ29kZSIsIl9pblRlc3RNb2RlIiwiX2F1dG9BZGRyZXNzUmVzb2x1dGlvbkVuYWJsZWQiLCJfc3BpTWVzc2FnZVN0YW1wIiwiX3Bvc1ZlbmRvcklkIiwiX3Bvc1ZlcnNpb24iLCJfaGFzU2V0SW5mbyIsIl9tb3N0UmVjZW50UGluZ1NlbnQiLCJfbW9zdFJlY2VudFBvbmdSZWNlaXZlZCIsIl9taXNzZWRQb25nc0NvdW50IiwiX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiIsIl9tb3N0UmVjZW50TG9naW5SZXNwb25zZSIsIl9wb25nVGltZW91dCIsIl9waW5nRnJlcXVlbmN5IiwiX3JlYWR5VG9UcmFuc2FjdCIsIl9wZXJpb2RpY1BpbmdUaHJlYWQiLCJfdHhNb25pdG9yQ2hlY2tGcmVxdWVuY3kiLCJfY2hlY2tPblR4RnJlcXVlbmN5IiwiX21heFdhaXRGb3JDYW5jZWxUeCIsIl9zbGVlcEJlZm9yZVJlY29ubmVjdE1zIiwiX21pc3NlZFBvbmdzVG9EaXNjb25uZWN0IiwiX3JldHJpZXNCZWZvcmVSZXNvbHZpbmdEZXZpY2VBZGRyZXNzIiwiQ3VycmVudEZsb3ciLCJDdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZSIsIkN1cnJlbnRUeEZsb3dTdGF0ZSIsIl9zcGlQYXQiLCJTcGlQYXlBdFRhYmxlIiwiX3NwaVByZWF1dGgiLCJTcGlQcmVhdXRoIiwiV2FybiIsIkV4Y2VwdGlvbiIsIl9yZXNldENvbm4iLCJfc3RhcnRUcmFuc2FjdGlvbk1vbml0b3JpbmdUaHJlYWQiLCJTcGlGbG93IiwiSWRsZSIsImluZm8iLCJTcGlTdGF0dXMiLCJQYWlyZWRDb25uZWN0aW5nIiwiX2Nvbm4iLCJDb25uZWN0IiwiVW5wYWlyZWQiLCJkZXZpY2VBcGlLZXkiLCJDdXJyZW50U3RhdHVzIiwid2FzIiwiSGFzU2VyaWFsTnVtYmVyQ2hhbmdlZCIsIl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MiLCJhdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGUiLCJQYWlyZWRDb25uZWN0ZWQiLCJ0ZXN0TW9kZSIsInBvc1ZlbmRvcklkIiwicG9zVmVyc2lvbiIsIlBhaXJpbmciLCJGaW5pc2hlZCIsIlRyYW5zYWN0aW9uIiwid2FybiIsIlBhaXJpbmdGbG93U3RhdGUiLCJTdWNjZXNzZnVsIiwiQXdhaXRpbmdDaGVja0Zyb21FZnRwb3MiLCJBd2FpdGluZ0NoZWNrRnJvbVBvcyIsIl9vblBhaXJpbmdTdWNjZXNzIiwiX29uUmVhZHlUb1RyYW5zYWN0IiwiX3NlbmQiLCJUb01lc3NhZ2UiLCJfb25QYWlyaW5nRmFpbGVkIiwiX2RvVW5wYWlyIiwiSW5pdGlhdGVUeFJlc3VsdCIsInB1cmNoYXNlUmVxdWVzdCIsIkNyZWF0ZVB1cmNoYXNlUmVxdWVzdCIsIlRyYW5zYWN0aW9uRmxvd1N0YXRlIiwiVHJhbnNhY3Rpb25UeXBlIiwiUHVyY2hhc2UiLCJTZW50Iiwib3B0aW9ucyIsInB1cmNoYXNlIiwiQ3JlYXRlUHVyY2hhc2VSZXF1ZXN0VjIiLCJBbW91bnRTdW1tYXJ5IiwicmVmdW5kUmVxdWVzdCIsIkNyZWF0ZVJlZnVuZFJlcXVlc3QiLCJyZWZ1bmRNc2ciLCJSZWZ1bmQiLCJhY2NlcHRlZCIsIkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2siLCJNaWRUeFJlc3VsdCIsIlNpZ25hdHVyZVJlc3BvbmRlZCIsInNpZ1JlcU1zZyIsIlNpZ25hdHVyZVJlcXVpcmVkTWVzc2FnZSIsIlN1Ym1pdEF1dGhDb2RlUmVzdWx0IiwiQXdhaXRpbmdQaG9uZUZvckF1dGgiLCJBdXRoQ29kZVNlbnQiLCJSZXF1ZXN0U2VudCIsImNhbmNlbFJlcSIsIkNhbmNlbGxpbmciLCJjYXNob3V0T25seVJlcXVlc3QiLCJjYXNob3V0TXNnIiwiQ2FzaG91dE9ubHkiLCJtb3RvUHVyY2hhc2VSZXF1ZXN0IiwiTU9UTyIsInNldHRsZVJlcXVlc3RNc2ciLCJTZXR0bGUiLCJzdGxFbnFNc2ciLCJTZXR0bGVtZW50RW5xdWlyeSIsImdsdFJlcXVlc3RNc2ciLCJHZXRMYXN0VHJhbnNhY3Rpb24iLCJnbHRSZXNwb25zZSIsIkdsdE1hdGNoIiwidG9NZXNzYWdlIiwiUGFpcmluZ0hlbHBlciIsInJlc3VsdCIsIkdlbmVyYXRlU2VjcmV0c0FuZEtleVJlc3BvbnNlIiwia2V5Q2hlY2siLCJwYWlyUmVzcCIsIl9zdGFydFBlcmlvZGljUGluZyIsImtyUmVzIiwiUGVyZm9ybUtleVJvbGxpbmciLCJpbmNvbWluZ1Bvc1JlZklkIiwicGhvbmVGb3JBdXRoUmVxdWlyZWQiLCJtc2ciLCJHZXRQaG9uZU51bWJlciIsIkdldE1lcmNoYW50SWQiLCJDb21wbGV0ZWQiLCJBdHRlbXB0aW5nVG9DYW5jZWwiLCJfY2FsbEdldExhc3RUcmFuc2FjdGlvbiIsInR4U3RhdGUiLCJHb3RHbHRSZXNwb25zZSIsImd0bFJlc3BvbnNlIiwiR0xUUmVzcG9uc2VQb3NSZWZJZCIsIldhc1JldHJpZXZlZFN1Y2Nlc3NmdWxseSIsIklzU3RpbGxJblByb2dyZXNzIiwiSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UiLCJJc1dhaXRpbmdGb3JBdXRoQ29kZSIsIldhc1RpbWVPdXRPZlN5bmNFcnJvciIsIlVua25vd25Db21wbGV0ZWQiLCJUeXBlIiwiQ29weU1lcmNoYW50UmVjZWlwdFRvQ3VzdG9tZXJSZWNlaXB0Iiwic3VjY2Vzc1N0YXRlIiwiY2FuY2VsUmVzcG9uc2UiLCJHZXRFcnJvclJlYXNvbiIsIkdldEVycm9yRGV0YWlsIiwiQ2FuY2VsRmFpbGVkIiwiaXNTdWNjZXNzIiwiSW5mbyIsImdldEVycm9yUmVhc29uIiwiZ2V0RXJyb3JEZXRhaWwiLCJuZWVkc1B1Ymxpc2hpbmciLCJzdGF0ZSIsIkNhbmNlbEF0dGVtcHRUaW1lIiwiTGFzdFN0YXRlUmVxdWVzdFRpbWUiLCJDYWxsaW5nR2x0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vblNwaUNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkIiwiX29uU3BpTWVzc2FnZVJlY2VpdmVkIiwiX29uV3NFcnJvclJlY2VpdmVkIiwiTmV3UGFpclJlcXVlc3QiLCJfc3RvcFBlcmlvZGljUGluZyIsInNldEludGVydmFsIiwiX3BlcmlvZGljUGluZyIsIl9kb1BpbmciLCJSZXF1ZXN0IiwiX2NhbGxTZXRQb3NJbmZvIiwiUHVzaFBheUF0VGFibGVDb25maWciLCJzZXRQb3NJbmZvUmVxdWVzdCIsIkdldFZlcnNpb24iLCJHZXRBcHBEZXZpY2VJbmZvIiwiY2xlYXJJbnRlcnZhbCIsIkdlbmVyYXRlUGluZ1JlcXVlc3QiLCJfbW9zdFJlY2VudFBpbmdTZW50VGltZSIsIkdldFNlcnZlclRpbWVEZWx0YSIsImRlYnVnIiwicG9uZyIsIkdlbmVyYXRlUG9uZ1Jlc3Nwb25zZSIsImdsdFJlcXVlc3QiLCJtZXNzYWdlSnNvbiIsIkZyb21Kc29uIiwiSXNQcmVhdXRoRXZlbnQiLCJfaGFuZGxlUHJlYXV0aE1lc3NhZ2UiLCJfaGFuZGxlS2V5UmVxdWVzdCIsIl9oYW5kbGVLZXlDaGVjayIsIl9oYW5kbGVQYWlyUmVzcG9uc2UiLCJfaGFuZGxlRHJvcEtleXNBZHZpY2UiLCJfaGFuZGxlUHVyY2hhc2VSZXNwb25zZSIsIl9oYW5kbGVSZWZ1bmRSZXNwb25zZSIsIl9oYW5kbGVDYXNob3V0T25seVJlc3BvbnNlIiwiX2hhbmRsZU1vdG9QdXJjaGFzZVJlc3BvbnNlIiwiX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkIiwiX2hhbmRsZUF1dGhDb2RlUmVxdWlyZWQiLCJfaGFuZGxlR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2UiLCJIYW5kbGVTZXR0bGVSZXNwb25zZSIsIl9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlIiwiX2hhbmRsZUluY29taW5nUGluZyIsIl9oYW5kbGVJbmNvbWluZ1BvbmciLCJfaGFuZGxlS2V5Um9sbGluZ1JlcXVlc3QiLCJfaGFuZGxlQ2FuY2VsVHJhbnNhY3Rpb25SZXNwb25zZSIsIl9oYW5kbGVTZXRQb3NJbmZvUmVzcG9uc2UiLCJGZWF0dXJlRGlzYWJsZU1lc3NhZ2UiLCJfaGFuZGxlR2V0VGFibGVDb25maWciLCJfaGFuZGxlR2V0QmlsbERldGFpbHNSZXF1ZXN0IiwiX2hhbmRsZUJpbGxQYXltZW50QWR2aWNlIiwiX2hhbmRsZVByaW50aW5nUmVzcG9uc2UiLCJfaGFuZGxlVGVybWluYWxTdGF0dXNSZXNwb25zZSIsIl9oYW5kbGVCYXR0ZXJ5TGV2ZWxDaGFuZ2VkIiwiX2hhbmRsZUVycm9yRXZlbnQiLCJUb0pzb24iLCJTZW5kIiwidXBkYXRlZFNlcmlhbE51bWJlciIsInVwZGF0ZWRFZnRwb3NBZGRyZXNzIiwic2VydmljZSIsIlJldHJpZXZlU2VydmljZSIsImRldmljZUFkZHJlc3NTdGF0dXMiLCJIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCIsIlByZWF1dGgiLCJBY2NvdW50VmVyaWZ5IiwiaW5pdGlhdGVkIiwiSW5pdGlhdGVkIiwidmFsaWQiLCJWYWxpZCIsInR5cGUiLCJEaXNwbGF5TWVzc2FnZSIsIlJlcXVlc3RUaW1lIiwiUmVzcG9uc2UiLCJQaG9uZUZvckF1dGhSZXF1aXJlZE1lc3NhZ2UiLCJBd2FpdGluZ0dsdFJlc3BvbnNlIiwic3BpTWVzc2FnZSIsInZhbGlkRm9ybWF0IiwiVmFsaWRGb3JtYXQiLCJQcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcyIsIlNpZ25hdHVyZUZsb3dPbkVmdHBvcyIsIlByaW50TWVyY2hhbnRDb3B5IiwibWVzc2FnZURhdGEiLCJwcm9tcHRfZm9yX2N1c3RvbWVyX2NvcHkiLCJwcmludF9mb3Jfc2lnbmF0dXJlX3JlcXVpcmVkX3RyYW5zYWN0aW9ucyIsInByaW50X21lcmNoYW50X2NvcHkiLCJfY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiX2N1c3RvbWVyUmVjZWlwdEZvb3RlciIsIl9tZXJjaGFudFJlY2VpcHRIZWFkZXIiLCJfbWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJSZWNlaXB0SGVhZGVyIiwiY3VzdG9tZXJSZWNlaXB0Rm9vdGVyIiwibWVyY2hhbnRSZWNlaXB0SGVhZGVyIiwibWVyY2hhbnRSZWNlaXB0Rm9vdGVyIiwiY3VzdG9tZXJfcmVjZWlwdF9oZWFkZXIiLCJjdXN0b21lcl9yZWNlaXB0X2Zvb3RlciIsIm1lcmNoYW50X3JlY2VpcHRfaGVhZGVyIiwibWVyY2hhbnRfcmVjZWlwdF9mb290ZXIiLCJzcGkiLCJfc3BpIiwiYmlsbElkIiwidGFibGVJZCIsIm9wZXJhdG9ySWQiLCJiaWxsUGF5bWVudCIsInVwZGF0ZWRCaWxsRGF0YSIsImJpbGxTdGF0dXMiLCJHZXRCaWxsU3RhdHVzIiwiZXhpc3RpbmdCaWxsU3RhdHVzIiwiZXhpc3RpbmdQYXltZW50SGlzdG9yeSIsImZvdW5kRXhpc3RpbmdFbnRyeSIsImZpbmQiLCJwaGUiLCJHZXRUZXJtaW5hbFJlZklkIiwidXBkYXRlZEhpc3RvcnlFbnRyaWVzIiwiVG9QYXltZW50U3VtbWFyeSIsIlRvQmlsbERhdGEiLCJ1cGRhdGVkQmlsbFN0YXR1cyIsIkJpbGxQYXltZW50UmVjZWl2ZWQiLCJ2ZXJpZnlNc2ciLCJ0ZnMiLCJzZW50TXNnIiwiX2luaXRpYXRlUHJlYXV0aFR4IiwiX2hhbmRsZUFjY291bnRWZXJpZnlSZXNwb25zZSIsIl9oYW5kbGVQcmVhdXRoUmVzcG9uc2UiLCJjdXJyZW50VHhGbG93U3RhdGUiLCJsYXN0SW5kZXhPZiIsInN0YXR1cyIsImJhdHRlcnlfbGV2ZWwiLCJjaGFyZ2luZyIsIlRlcm1pbmFsQmF0dGVyeSIsIkJhdHRlcnlMZXZlbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FB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QUFJOUosSUFBSSxHQUFHLEVBQVg7QUFFQSxhQUFPLElBQUlHLE9BQUosQ0FBWUMsZUFBZSxDQUFDQyxFQUFoQixDQUFtQixPQUFuQixDQUFaLEVBQXlDQyxNQUFNLENBQUN3SixxQkFBaEQsRUFBdUU5SixJQUF2RSxFQUE2RSxJQUE3RSxDQUFQO0FBQ0g7Ozs7OztJQUdDK0osc0I7OztBQUVGLGtDQUFZdkosQ0FBWixFQUNBO0FBQUE7O0FBQ0ksU0FBS0MsRUFBTCxHQUFVRCxDQUFWO0FBQ0g7Ozs7Z0NBRUQ7QUFDSSxhQUFPLEtBQUtDLEVBQUwsQ0FBUUUsSUFBUixDQUFhbXVCLE1BQXBCO0FBQ0g7OztzQ0FFRDtBQUNJLGFBQU8sS0FBS3J1QixFQUFMLENBQVFFLElBQVIsQ0FBYW91QixhQUFwQjtBQUNIOzs7aUNBRUQ7QUFDSSxhQUFPLENBQUMsQ0FBQyxLQUFLdHVCLEVBQUwsQ0FBUUUsSUFBUixDQUFhcXVCLFFBQXRCO0FBQ0g7Ozs7OztJQUdDQyxlLEdBRUYseUJBQVl6dUIsQ0FBWixFQUNBO0FBQUE7O0FBQ0ksT0FBSzB1QixZQUFMLEdBQW9CMXVCLENBQUMsQ0FBQ0csSUFBRixDQUFPb3VCLGFBQTNCO0FBQ0gsQyIsImZpbGUiOiJzcGktY2xpZW50LWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjc5MzQ4ZDMxOGVmZWJhZTgxY2RhXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7U3BpfSBmcm9tIFwiLi9zcmMvU3BpXCI7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9zcmMvTG9nZ2VyJztcbmltcG9ydCB7UHJpbnRlcn0gZnJvbSAnLi9zcmMvUHJpbnRpbmcnO1xuXG4vLyBSZS1leHBvcnRlZCBtb2R1bGVzIHJlcXVpcmVkIGZvciBQT1MgdmVuZG9yc1xuZXhwb3J0IHtTcGl9IGZyb20gJy4vc3JjL1NwaSc7XG5leHBvcnQge0xvZ2dlcn0gZnJvbSAnLi9zcmMvTG9nZ2VyJztcbmV4cG9ydCB7U2VjcmV0c30gZnJvbSAnLi9zcmMvU2VjcmV0cyc7XG5leHBvcnQge1N1Y2Nlc3NTdGF0ZX0gZnJvbSAnLi9zcmMvTWVzc2FnZXMnO1xuZXhwb3J0IHtUcmFuc2FjdGlvbk9wdGlvbnMsIFRyYW5zYWN0aW9uVHlwZSwgU3BpRmxvdywgU3BpU3RhdHVzfSBmcm9tICcuL3NyYy9TcGlNb2RlbHMnO1xuZXhwb3J0IHtQcmludGluZ1Jlc3BvbnNlfSBmcm9tICcuL3NyYy9QcmludGluZyc7XG5leHBvcnQge1JlZnVuZFJlc3BvbnNlLCBQdXJjaGFzZVJlc3BvbnNlLCBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSwgTW90b1B1cmNoYXNlUmVzcG9uc2V9IGZyb20gJy4vc3JjL1B1cmNoYXNlJztcbmV4cG9ydCB7VGVybWluYWxTdGF0dXNSZXNwb25zZSwgVGVybWluYWxCYXR0ZXJ5fSBmcm9tICcuL3NyYy9UZXJtaW5hbFN0YXR1cyc7XG5leHBvcnQge0Nhc2hvdXRPbmx5UmVzcG9uc2V9IGZyb20gJy4vc3JjL0Nhc2hvdXQnO1xuZXhwb3J0IHtTZXR0bGVtZW50fSBmcm9tICcuL3NyYy9TZXR0bGVtZW50Jztcblxud2luZG93LlNwaSA9IFNwaTtcbndpbmRvdy5Mb2dnZXIgPSBMb2dnZXI7XG53aW5kb3cuUHJpbnRlciA9IFByaW50ZXI7IiwiKGZ1bmN0aW9uKHJvb3QpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGNoZWNrSW50KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAocGFyc2VJbnQodmFsdWUpID09PSB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJbnRzKGFycmF5aXNoKSB7XG4gICAgICAgIGlmICghY2hlY2tJbnQoYXJyYXlpc2gubGVuZ3RoKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5aXNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW50KGFycmF5aXNoW2ldKSB8fCBhcnJheWlzaFtpXSA8IDAgfHwgYXJyYXlpc2hbaV0gPiAyNTUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb2VyY2VBcnJheShhcmcsIGNvcHkpIHtcblxuICAgICAgICAvLyBBcnJheUJ1ZmZlciB2aWV3XG4gICAgICAgIGlmIChhcmcuYnVmZmVyICYmIEFycmF5QnVmZmVyLmlzVmlldyhhcmcpICYmIGFyZy5uYW1lID09PSAnVWludDhBcnJheScpIHtcblxuICAgICAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJnLnNsaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXQncyBhbiBhcnJheTsgY2hlY2sgaXQgaXMgYSB2YWxpZCByZXByZXNlbnRhdGlvbiBvZiBhIGJ5dGVcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICAgICAgaWYgKCFjaGVja0ludHMoYXJnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyYXkgY29udGFpbnMgaW52YWxpZCB2YWx1ZTogJyArIGFyZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29tZXRoaW5nIGVsc2UsIGJ1dCBiZWhhdmVzIGxpa2UgYW4gYXJyYXkgKG1heWJlIGEgQnVmZmVyPyBBcmd1bWVudHM/KVxuICAgICAgICBpZiAoY2hlY2tJbnQoYXJnLmxlbmd0aCkgJiYgY2hlY2tJbnRzKGFyZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBhcnJheS1saWtlIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFycmF5KGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlQXJyYXksIHRhcmdldEFycmF5LCB0YXJnZXRTdGFydCwgc291cmNlU3RhcnQsIHNvdXJjZUVuZCkge1xuICAgICAgICBpZiAoc291cmNlU3RhcnQgIT0gbnVsbCB8fCBzb3VyY2VFbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZUFycmF5LnNsaWNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlQXJyYXkgPSBzb3VyY2VBcnJheS5zbGljZShzb3VyY2VTdGFydCwgc291cmNlRW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc291cmNlQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzb3VyY2VBcnJheSwgc291cmNlU3RhcnQsIHNvdXJjZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0QXJyYXkuc2V0KHNvdXJjZUFycmF5LCB0YXJnZXRTdGFydCk7XG4gICAgfVxuXG5cblxuICAgIHZhciBjb252ZXJ0VXRmOCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdG9CeXRlcyh0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sIGkgPSAwO1xuICAgICAgICAgICAgdGV4dCA9IGVuY29kZVVSSSh0ZXh0KTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChpKyspO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgYSAlIHNpZ24sIGVuY29kZSB0aGUgZm9sbG93aW5nIDIgYnl0ZXMgYXMgYSBoZXggdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gMzcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGFyc2VJbnQodGV4dC5zdWJzdHIoaSwgMiksIDE2KSlcbiAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xuXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCBqdXN0IHRoZSBhY3R1YWwgYnl0ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29lcmNlQXJyYXkocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZyb21CeXRlcyhieXRlcykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCBpID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKGkgPCBieXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IGJ5dGVzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjKSk7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPiAxOTEgJiYgYyA8IDIyNCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MWYpIDw8IDYpIHwgKGJ5dGVzW2kgKyAxXSAmIDB4M2YpKSk7XG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MGYpIDw8IDEyKSB8ICgoYnl0ZXNbaSArIDFdICYgMHgzZikgPDwgNikgfCAoYnl0ZXNbaSArIDJdICYgMHgzZikpKTtcbiAgICAgICAgICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b0J5dGVzOiB0b0J5dGVzLFxuICAgICAgICAgICAgZnJvbUJ5dGVzOiBmcm9tQnl0ZXMsXG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgdmFyIGNvbnZlcnRIZXggPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIHRvQnl0ZXModGV4dCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGFyc2VJbnQodGV4dC5zdWJzdHIoaSwgMiksIDE2KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwOi8vaXh0aS5uZXQvZGV2ZWxvcG1lbnQvamF2YXNjcmlwdC8yMDExLzExLzExL2Jhc2U2NC1lbmNvZGVkZWNvZGUtb2YtdXRmOC1pbi1icm93c2VyLXdpdGgtanMuaHRtbFxuICAgICAgICB2YXIgSGV4ID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZyb21CeXRlcyhieXRlcykge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gYnl0ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKEhleFsodiAmIDB4ZjApID4+IDRdICsgSGV4W3YgJiAweDBmXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9CeXRlczogdG9CeXRlcyxcbiAgICAgICAgICAgIGZyb21CeXRlczogZnJvbUJ5dGVzLFxuICAgICAgICB9XG4gICAgfSkoKTtcblxuXG4gICAgLy8gTnVtYmVyIG9mIHJvdW5kcyBieSBrZXlzaXplXG4gICAgdmFyIG51bWJlck9mUm91bmRzID0gezE2OiAxMCwgMjQ6IDEyLCAzMjogMTR9XG5cbiAgICAvLyBSb3VuZCBjb25zdGFudCB3b3Jkc1xuICAgIHZhciByY29uID0gWzB4MDEsIDB4MDIsIDB4MDQsIDB4MDgsIDB4MTAsIDB4MjAsIDB4NDAsIDB4ODAsIDB4MWIsIDB4MzYsIDB4NmMsIDB4ZDgsIDB4YWIsIDB4NGQsIDB4OWEsIDB4MmYsIDB4NWUsIDB4YmMsIDB4NjMsIDB4YzYsIDB4OTcsIDB4MzUsIDB4NmEsIDB4ZDQsIDB4YjMsIDB4N2QsIDB4ZmEsIDB4ZWYsIDB4YzUsIDB4OTFdO1xuXG4gICAgLy8gUy1ib3ggYW5kIEludmVyc2UgUy1ib3ggKFMgaXMgZm9yIFN1YnN0aXR1dGlvbilcbiAgICB2YXIgUyA9IFsweDYzLCAweDdjLCAweDc3LCAweDdiLCAweGYyLCAweDZiLCAweDZmLCAweGM1LCAweDMwLCAweDAxLCAweDY3LCAweDJiLCAweGZlLCAweGQ3LCAweGFiLCAweDc2LCAweGNhLCAweDgyLCAweGM5LCAweDdkLCAweGZhLCAweDU5LCAweDQ3LCAweGYwLCAweGFkLCAweGQ0LCAweGEyLCAweGFmLCAweDljLCAweGE0LCAweDcyLCAweGMwLCAweGI3LCAweGZkLCAweDkzLCAweDI2LCAweDM2LCAweDNmLCAweGY3LCAweGNjLCAweDM0LCAweGE1LCAweGU1LCAweGYxLCAweDcxLCAweGQ4LCAweDMxLCAweDE1LCAweDA0LCAweGM3LCAweDIzLCAweGMzLCAweDE4LCAweDk2LCAweDA1LCAweDlhLCAweDA3LCAweDEyLCAweDgwLCAweGUyLCAweGViLCAweDI3LCAweGIyLCAweDc1LCAweDA5LCAweDgzLCAweDJjLCAweDFhLCAweDFiLCAweDZlLCAweDVhLCAweGEwLCAweDUyLCAweDNiLCAweGQ2LCAweGIzLCAweDI5LCAweGUzLCAweDJmLCAweDg0LCAweDUzLCAweGQxLCAweDAwLCAweGVkLCAweDIwLCAweGZjLCAweGIxLCAweDViLCAweDZhLCAweGNiLCAweGJlLCAweDM5LCAweDRhLCAweDRjLCAweDU4LCAweGNmLCAweGQwLCAweGVmLCAweGFhLCAweGZiLCAweDQzLCAweDRkLCAweDMzLCAweDg1LCAweDQ1LCAweGY5LCAweDAyLCAweDdmLCAweDUwLCAweDNjLCAweDlmLCAweGE4LCAweDUxLCAweGEzLCAweDQwLCAweDhmLCAweDkyLCAweDlkLCAweDM4LCAweGY1LCAweGJjLCAweGI2LCAweGRhLCAweDIxLCAweDEwLCAweGZmLCAweGYzLCAweGQyLCAweGNkLCAweDBjLCAweDEzLCAweGVjLCAweDVmLCAweDk3LCAweDQ0LCAweDE3LCAweGM0LCAweGE3LCAweDdlLCAweDNkLCAweDY0LCAweDVkLCAweDE5LCAweDczLCAweDYwLCAweDgxLCAweDRmLCAweGRjLCAweDIyLCAweDJhLCAweDkwLCAweDg4LCAweDQ2LCAweGVlLCAweGI4LCAweDE0LCAweGRlLCAweDVlLCAweDBiLCAweGRiLCAweGUwLCAweDMyLCAweDNhLCAweDBhLCAweDQ5LCAweDA2LCAweDI0LCAweDVjLCAweGMyLCAweGQzLCAweGFjLCAweDYyLCAweDkxLCAweDk1LCAweGU0LCAweDc5LCAweGU3LCAweGM4LCAweDM3LCAweDZkLCAweDhkLCAweGQ1LCAweDRlLCAweGE5LCAweDZjLCAweDU2LCAweGY0LCAweGVhLCAweDY1LCAweDdhLCAweGFlLCAweDA4LCAweGJhLCAweDc4LCAweDI1LCAweDJlLCAweDFjLCAweGE2LCAweGI0LCAweGM2LCAweGU4LCAweGRkLCAweDc0LCAweDFmLCAweDRiLCAweGJkLCAweDhiLCAweDhhLCAweDcwLCAweDNlLCAweGI1LCAweDY2LCAweDQ4LCAweDAzLCAweGY2LCAweDBlLCAweDYxLCAweDM1LCAweDU3LCAweGI5LCAweDg2LCAweGMxLCAweDFkLCAweDllLCAweGUxLCAweGY4LCAweDk4LCAweDExLCAweDY5LCAweGQ5LCAweDhlLCAweDk0LCAweDliLCAweDFlLCAweDg3LCAweGU5LCAweGNlLCAweDU1LCAweDI4LCAweGRmLCAweDhjLCAweGExLCAweDg5LCAweDBkLCAweGJmLCAweGU2LCAweDQyLCAweDY4LCAweDQxLCAweDk5LCAweDJkLCAweDBmLCAweGIwLCAweDU0LCAweGJiLCAweDE2XTtcbiAgICB2YXIgU2kgPVsweDUyLCAweDA5LCAweDZhLCAweGQ1LCAweDMwLCAweDM2LCAweGE1LCAweDM4LCAweGJmLCAweDQwLCAweGEzLCAweDllLCAweDgxLCAweGYzLCAweGQ3LCAweGZiLCAweDdjLCAweGUzLCAweDM5LCAweDgyLCAweDliLCAweDJmLCAweGZmLCAweDg3LCAweDM0LCAweDhlLCAweDQzLCAweDQ0LCAweGM0LCAweGRlLCAweGU5LCAweGNiLCAweDU0LCAweDdiLCAweDk0LCAweDMyLCAweGE2LCAweGMyLCAweDIzLCAweDNkLCAweGVlLCAweDRjLCAweDk1LCAweDBiLCAweDQyLCAweGZhLCAweGMzLCAweDRlLCAweDA4LCAweDJlLCAweGExLCAweDY2LCAweDI4LCAweGQ5LCAweDI0LCAweGIyLCAweDc2LCAweDViLCAweGEyLCAweDQ5LCAweDZkLCAweDhiLCAweGQxLCAweDI1LCAweDcyLCAweGY4LCAweGY2LCAweDY0LCAweDg2LCAweDY4LCAweDk4LCAweDE2LCAweGQ0LCAweGE0LCAweDVjLCAweGNjLCAweDVkLCAweDY1LCAweGI2LCAweDkyLCAweDZjLCAweDcwLCAweDQ4LCAweDUwLCAweGZkLCAweGVkLCAweGI5LCAweGRhLCAweDVlLCAweDE1LCAweDQ2LCAweDU3LCAweGE3LCAweDhkLCAweDlkLCAweDg0LCAweDkwLCAweGQ4LCAweGFiLCAweDAwLCAweDhjLCAweGJjLCAweGQzLCAweDBhLCAweGY3LCAweGU0LCAweDU4LCAweDA1LCAweGI4LCAweGIzLCAweDQ1LCAweDA2LCAweGQwLCAweDJjLCAweDFlLCAweDhmLCAweGNhLCAweDNmLCAweDBmLCAweDAyLCAweGMxLCAweGFmLCAweGJkLCAweDAzLCAweDAxLCAweDEzLCAweDhhLCAweDZiLCAweDNhLCAweDkxLCAweDExLCAweDQxLCAweDRmLCAweDY3LCAweGRjLCAweGVhLCAweDk3LCAweGYyLCAweGNmLCAweGNlLCAweGYwLCAweGI0LCAweGU2LCAweDczLCAweDk2LCAweGFjLCAweDc0LCAweDIyLCAweGU3LCAweGFkLCAweDM1LCAweDg1LCAweGUyLCAweGY5LCAweDM3LCAweGU4LCAweDFjLCAweDc1LCAweGRmLCAweDZlLCAweDQ3LCAweGYxLCAweDFhLCAweDcxLCAweDFkLCAweDI5LCAweGM1LCAweDg5LCAweDZmLCAweGI3LCAweDYyLCAweDBlLCAweGFhLCAweDE4LCAweGJlLCAweDFiLCAweGZjLCAweDU2LCAweDNlLCAweDRiLCAweGM2LCAweGQyLCAweDc5LCAweDIwLCAweDlhLCAweGRiLCAweGMwLCAweGZlLCAweDc4LCAweGNkLCAweDVhLCAweGY0LCAweDFmLCAweGRkLCAweGE4LCAweDMzLCAweDg4LCAweDA3LCAweGM3LCAweDMxLCAweGIxLCAweDEyLCAweDEwLCAweDU5LCAweDI3LCAweDgwLCAweGVjLCAweDVmLCAweDYwLCAweDUxLCAweDdmLCAweGE5LCAweDE5LCAweGI1LCAweDRhLCAweDBkLCAweDJkLCAweGU1LCAweDdhLCAweDlmLCAweDkzLCAweGM5LCAweDljLCAweGVmLCAweGEwLCAweGUwLCAweDNiLCAweDRkLCAweGFlLCAweDJhLCAweGY1LCAweGIwLCAweGM4LCAweGViLCAweGJiLCAweDNjLCAweDgzLCAweDUzLCAweDk5LCAweDYxLCAweDE3LCAweDJiLCAweDA0LCAweDdlLCAweGJhLCAweDc3LCAweGQ2LCAweDI2LCAweGUxLCAweDY5LCAweDE0LCAweDYzLCAweDU1LCAweDIxLCAweDBjLCAweDdkXTtcblxuICAgIC8vIFRyYW5zZm9ybWF0aW9ucyBmb3IgZW5jcnlwdGlvblxuICAgIHZhciBUMSA9IFsweGM2NjM2M2E1LCAweGY4N2M3Yzg0LCAweGVlNzc3Nzk5LCAweGY2N2I3YjhkLCAweGZmZjJmMjBkLCAweGQ2NmI2YmJkLCAweGRlNmY2ZmIxLCAweDkxYzVjNTU0LCAweDYwMzAzMDUwLCAweDAyMDEwMTAzLCAweGNlNjc2N2E5LCAweDU2MmIyYjdkLCAweGU3ZmVmZTE5LCAweGI1ZDdkNzYyLCAweDRkYWJhYmU2LCAweGVjNzY3NjlhLCAweDhmY2FjYTQ1LCAweDFmODI4MjlkLCAweDg5YzljOTQwLCAweGZhN2Q3ZDg3LCAweGVmZmFmYTE1LCAweGIyNTk1OWViLCAweDhlNDc0N2M5LCAweGZiZjBmMDBiLCAweDQxYWRhZGVjLCAweGIzZDRkNDY3LCAweDVmYTJhMmZkLCAweDQ1YWZhZmVhLCAweDIzOWM5Y2JmLCAweDUzYTRhNGY3LCAweGU0NzI3Mjk2LCAweDliYzBjMDViLCAweDc1YjdiN2MyLCAweGUxZmRmZDFjLCAweDNkOTM5M2FlLCAweDRjMjYyNjZhLCAweDZjMzYzNjVhLCAweDdlM2YzZjQxLCAweGY1ZjdmNzAyLCAweDgzY2NjYzRmLCAweDY4MzQzNDVjLCAweDUxYTVhNWY0LCAweGQxZTVlNTM0LCAweGY5ZjFmMTA4LCAweGUyNzE3MTkzLCAweGFiZDhkODczLCAweDYyMzEzMTUzLCAweDJhMTUxNTNmLCAweDA4MDQwNDBjLCAweDk1YzdjNzUyLCAweDQ2MjMyMzY1LCAweDlkYzNjMzVlLCAweDMwMTgxODI4LCAweDM3OTY5NmExLCAweDBhMDUwNTBmLCAweDJmOWE5YWI1LCAweDBlMDcwNzA5LCAweDI0MTIxMjM2LCAweDFiODA4MDliLCAweGRmZTJlMjNkLCAweGNkZWJlYjI2LCAweDRlMjcyNzY5LCAweDdmYjJiMmNkLCAweGVhNzU3NTlmLCAweDEyMDkwOTFiLCAweDFkODM4MzllLCAweDU4MmMyYzc0LCAweDM0MWExYTJlLCAweDM2MWIxYjJkLCAweGRjNmU2ZWIyLCAweGI0NWE1YWVlLCAweDViYTBhMGZiLCAweGE0NTI1MmY2LCAweDc2M2IzYjRkLCAweGI3ZDZkNjYxLCAweDdkYjNiM2NlLCAweDUyMjkyOTdiLCAweGRkZTNlMzNlLCAweDVlMmYyZjcxLCAweDEzODQ4NDk3LCAweGE2NTM1M2Y1LCAweGI5ZDFkMTY4LCAweDAwMDAwMDAwLCAweGMxZWRlZDJjLCAweDQwMjAyMDYwLCAweGUzZmNmYzFmLCAweDc5YjFiMWM4LCAweGI2NWI1YmVkLCAweGQ0NmE2YWJlLCAweDhkY2JjYjQ2LCAweDY3YmViZWQ5LCAweDcyMzkzOTRiLCAweDk0NGE0YWRlLCAweDk4NGM0Y2Q0LCAweGIwNTg1OGU4LCAweDg1Y2ZjZjRhLCAweGJiZDBkMDZiLCAweGM1ZWZlZjJhLCAweDRmYWFhYWU1LCAweGVkZmJmYjE2LCAweDg2NDM0M2M1LCAweDlhNGQ0ZGQ3LCAweDY2MzMzMzU1LCAweDExODU4NTk0LCAweDhhNDU0NWNmLCAweGU5ZjlmOTEwLCAweDA0MDIwMjA2LCAweGZlN2Y3ZjgxLCAweGEwNTA1MGYwLCAweDc4M2MzYzQ0LCAweDI1OWY5ZmJhLCAweDRiYThhOGUzLCAweGEyNTE1MWYzLCAweDVkYTNhM2ZlLCAweDgwNDA0MGMwLCAweDA1OGY4ZjhhLCAweDNmOTI5MmFkLCAweDIxOWQ5ZGJjLCAweDcwMzgzODQ4LCAweGYxZjVmNTA0LCAweDYzYmNiY2RmLCAweDc3YjZiNmMxLCAweGFmZGFkYTc1LCAweDQyMjEyMTYzLCAweDIwMTAxMDMwLCAweGU1ZmZmZjFhLCAweGZkZjNmMzBlLCAweGJmZDJkMjZkLCAweDgxY2RjZDRjLCAweDE4MGMwYzE0LCAweDI2MTMxMzM1LCAweGMzZWNlYzJmLCAweGJlNWY1ZmUxLCAweDM1OTc5N2EyLCAweDg4NDQ0NGNjLCAweDJlMTcxNzM5LCAweDkzYzRjNDU3LCAweDU1YTdhN2YyLCAweGZjN2U3ZTgyLCAweDdhM2QzZDQ3LCAweGM4NjQ2NGFjLCAweGJhNWQ1ZGU3LCAweDMyMTkxOTJiLCAweGU2NzM3Mzk1LCAweGMwNjA2MGEwLCAweDE5ODE4MTk4LCAweDllNGY0ZmQxLCAweGEzZGNkYzdmLCAweDQ0MjIyMjY2LCAweDU0MmEyYTdlLCAweDNiOTA5MGFiLCAweDBiODg4ODgzLCAweDhjNDY0NmNhLCAweGM3ZWVlZTI5LCAweDZiYjhiOGQzLCAweDI4MTQxNDNjLCAweGE3ZGVkZTc5LCAweGJjNWU1ZWUyLCAweDE2MGIwYjFkLCAweGFkZGJkYjc2LCAweGRiZTBlMDNiLCAweDY0MzIzMjU2LCAweDc0M2EzYTRlLCAweDE0MGEwYTFlLCAweDkyNDk0OWRiLCAweDBjMDYwNjBhLCAweDQ4MjQyNDZjLCAweGI4NWM1Y2U0LCAweDlmYzJjMjVkLCAweGJkZDNkMzZlLCAweDQzYWNhY2VmLCAweGM0NjI2MmE2LCAweDM5OTE5MWE4LCAweDMxOTU5NWE0LCAweGQzZTRlNDM3LCAweGYyNzk3OThiLCAweGQ1ZTdlNzMyLCAweDhiYzhjODQzLCAweDZlMzczNzU5LCAweGRhNmQ2ZGI3LCAweDAxOGQ4ZDhjLCAweGIxZDVkNTY0LCAweDljNGU0ZWQyLCAweDQ5YTlhOWUwLCAweGQ4NmM2Y2I0LCAweGFjNTY1NmZhLCAweGYzZjRmNDA3LCAweGNmZWFlYTI1LCAweGNhNjU2NWFmLCAweGY0N2E3YThlLCAweDQ3YWVhZWU5LCAweDEwMDgwODE4LCAweDZmYmFiYWQ1LCAweGYwNzg3ODg4LCAweDRhMjUyNTZmLCAweDVjMmUyZTcyLCAweDM4MWMxYzI0LCAweDU3YTZhNmYxLCAweDczYjRiNGM3LCAweDk3YzZjNjUxLCAweGNiZThlODIzLCAweGExZGRkZDdjLCAweGU4NzQ3NDljLCAweDNlMWYxZjIxLCAweDk2NGI0YmRkLCAweDYxYmRiZGRjLCAweDBkOGI4Yjg2LCAweDBmOGE4YTg1LCAweGUwNzA3MDkwLCAweDdjM2UzZTQyLCAweDcxYjViNWM0LCAweGNjNjY2NmFhLCAweDkwNDg0OGQ4LCAweDA2MDMwMzA1LCAweGY3ZjZmNjAxLCAweDFjMGUwZTEyLCAweGMyNjE2MWEzLCAweDZhMzUzNTVmLCAweGFlNTc1N2Y5LCAweDY5YjliOWQwLCAweDE3ODY4NjkxLCAweDk5YzFjMTU4LCAweDNhMWQxZDI3LCAweDI3OWU5ZWI5LCAweGQ5ZTFlMTM4LCAweGViZjhmODEzLCAweDJiOTg5OGIzLCAweDIyMTExMTMzLCAweGQyNjk2OWJiLCAweGE5ZDlkOTcwLCAweDA3OGU4ZTg5LCAweDMzOTQ5NGE3LCAweDJkOWI5YmI2LCAweDNjMWUxZTIyLCAweDE1ODc4NzkyLCAweGM5ZTllOTIwLCAweDg3Y2VjZTQ5LCAweGFhNTU1NWZmLCAweDUwMjgyODc4LCAweGE1ZGZkZjdhLCAweDAzOGM4YzhmLCAweDU5YTFhMWY4LCAweDA5ODk4OTgwLCAweDFhMGQwZDE3LCAweDY1YmZiZmRhLCAweGQ3ZTZlNjMxLCAweDg0NDI0MmM2LCAweGQwNjg2OGI4LCAweDgyNDE0MWMzLCAweDI5OTk5OWIwLCAweDVhMmQyZDc3LCAweDFlMGYwZjExLCAweDdiYjBiMGNiLCAweGE4NTQ1NGZjLCAweDZkYmJiYmQ2LCAweDJjMTYxNjNhXTtcbiAgICB2YXIgVDIgPSBbMHhhNWM2NjM2MywgMHg4NGY4N2M3YywgMHg5OWVlNzc3NywgMHg4ZGY2N2I3YiwgMHgwZGZmZjJmMiwgMHhiZGQ2NmI2YiwgMHhiMWRlNmY2ZiwgMHg1NDkxYzVjNSwgMHg1MDYwMzAzMCwgMHgwMzAyMDEwMSwgMHhhOWNlNjc2NywgMHg3ZDU2MmIyYiwgMHgxOWU3ZmVmZSwgMHg2MmI1ZDdkNywgMHhlNjRkYWJhYiwgMHg5YWVjNzY3NiwgMHg0NThmY2FjYSwgMHg5ZDFmODI4MiwgMHg0MDg5YzljOSwgMHg4N2ZhN2Q3ZCwgMHgxNWVmZmFmYSwgMHhlYmIyNTk1OSwgMHhjOThlNDc0NywgMHgwYmZiZjBmMCwgMHhlYzQxYWRhZCwgMHg2N2IzZDRkNCwgMHhmZDVmYTJhMiwgMHhlYTQ1YWZhZiwgMHhiZjIzOWM5YywgMHhmNzUzYTRhNCwgMHg5NmU0NzI3MiwgMHg1YjliYzBjMCwgMHhjMjc1YjdiNywgMHgxY2UxZmRmZCwgMHhhZTNkOTM5MywgMHg2YTRjMjYyNiwgMHg1YTZjMzYzNiwgMHg0MTdlM2YzZiwgMHgwMmY1ZjdmNywgMHg0ZjgzY2NjYywgMHg1YzY4MzQzNCwgMHhmNDUxYTVhNSwgMHgzNGQxZTVlNSwgMHgwOGY5ZjFmMSwgMHg5M2UyNzE3MSwgMHg3M2FiZDhkOCwgMHg1MzYyMzEzMSwgMHgzZjJhMTUxNSwgMHgwYzA4MDQwNCwgMHg1Mjk1YzdjNywgMHg2NTQ2MjMyMywgMHg1ZTlkYzNjMywgMHgyODMwMTgxOCwgMHhhMTM3OTY5NiwgMHgwZjBhMDUwNSwgMHhiNTJmOWE5YSwgMHgwOTBlMDcwNywgMHgzNjI0MTIxMiwgMHg5YjFiODA4MCwgMHgzZGRmZTJlMiwgMHgyNmNkZWJlYiwgMHg2OTRlMjcyNywgMHhjZDdmYjJiMiwgMHg5ZmVhNzU3NSwgMHgxYjEyMDkwOSwgMHg5ZTFkODM4MywgMHg3NDU4MmMyYywgMHgyZTM0MWExYSwgMHgyZDM2MWIxYiwgMHhiMmRjNmU2ZSwgMHhlZWI0NWE1YSwgMHhmYjViYTBhMCwgMHhmNmE0NTI1MiwgMHg0ZDc2M2IzYiwgMHg2MWI3ZDZkNiwgMHhjZTdkYjNiMywgMHg3YjUyMjkyOSwgMHgzZWRkZTNlMywgMHg3MTVlMmYyZiwgMHg5NzEzODQ4NCwgMHhmNWE2NTM1MywgMHg2OGI5ZDFkMSwgMHgwMDAwMDAwMCwgMHgyY2MxZWRlZCwgMHg2MDQwMjAyMCwgMHgxZmUzZmNmYywgMHhjODc5YjFiMSwgMHhlZGI2NWI1YiwgMHhiZWQ0NmE2YSwgMHg0NjhkY2JjYiwgMHhkOTY3YmViZSwgMHg0YjcyMzkzOSwgMHhkZTk0NGE0YSwgMHhkNDk4NGM0YywgMHhlOGIwNTg1OCwgMHg0YTg1Y2ZjZiwgMHg2YmJiZDBkMCwgMHgyYWM1ZWZlZiwgMHhlNTRmYWFhYSwgMHgxNmVkZmJmYiwgMHhjNTg2NDM0MywgMHhkNzlhNGQ0ZCwgMHg1NTY2MzMzMywgMHg5NDExODU4NSwgMHhjZjhhNDU0NSwgMHgxMGU5ZjlmOSwgMHgwNjA0MDIwMiwgMHg4MWZlN2Y3ZiwgMHhmMGEwNTA1MCwgMHg0NDc4M2MzYywgMHhiYTI1OWY5ZiwgMHhlMzRiYThhOCwgMHhmM2EyNTE1MSwgMHhmZTVkYTNhMywgMHhjMDgwNDA0MCwgMHg4YTA1OGY4ZiwgMHhhZDNmOTI5MiwgMHhiYzIxOWQ5ZCwgMHg0ODcwMzgzOCwgMHgwNGYxZjVmNSwgMHhkZjYzYmNiYywgMHhjMTc3YjZiNiwgMHg3NWFmZGFkYSwgMHg2MzQyMjEyMSwgMHgzMDIwMTAxMCwgMHgxYWU1ZmZmZiwgMHgwZWZkZjNmMywgMHg2ZGJmZDJkMiwgMHg0YzgxY2RjZCwgMHgxNDE4MGMwYywgMHgzNTI2MTMxMywgMHgyZmMzZWNlYywgMHhlMWJlNWY1ZiwgMHhhMjM1OTc5NywgMHhjYzg4NDQ0NCwgMHgzOTJlMTcxNywgMHg1NzkzYzRjNCwgMHhmMjU1YTdhNywgMHg4MmZjN2U3ZSwgMHg0NzdhM2QzZCwgMHhhY2M4NjQ2NCwgMHhlN2JhNWQ1ZCwgMHgyYjMyMTkxOSwgMHg5NWU2NzM3MywgMHhhMGMwNjA2MCwgMHg5ODE5ODE4MSwgMHhkMTllNGY0ZiwgMHg3ZmEzZGNkYywgMHg2NjQ0MjIyMiwgMHg3ZTU0MmEyYSwgMHhhYjNiOTA5MCwgMHg4MzBiODg4OCwgMHhjYThjNDY0NiwgMHgyOWM3ZWVlZSwgMHhkMzZiYjhiOCwgMHgzYzI4MTQxNCwgMHg3OWE3ZGVkZSwgMHhlMmJjNWU1ZSwgMHgxZDE2MGIwYiwgMHg3NmFkZGJkYiwgMHgzYmRiZTBlMCwgMHg1NjY0MzIzMiwgMHg0ZTc0M2EzYSwgMHgxZTE0MGEwYSwgMHhkYjkyNDk0OSwgMHgwYTBjMDYwNiwgMHg2YzQ4MjQyNCwgMHhlNGI4NWM1YywgMHg1ZDlmYzJjMiwgMHg2ZWJkZDNkMywgMHhlZjQzYWNhYywgMHhhNmM0NjI2MiwgMHhhODM5OTE5MSwgMHhhNDMxOTU5NSwgMHgzN2QzZTRlNCwgMHg4YmYyNzk3OSwgMHgzMmQ1ZTdlNywgMHg0MzhiYzhjOCwgMHg1OTZlMzczNywgMHhiN2RhNmQ2ZCwgMHg4YzAxOGQ4ZCwgMHg2NGIxZDVkNSwgMHhkMjljNGU0ZSwgMHhlMDQ5YTlhOSwgMHhiNGQ4NmM2YywgMHhmYWFjNTY1NiwgMHgwN2YzZjRmNCwgMHgyNWNmZWFlYSwgMHhhZmNhNjU2NSwgMHg4ZWY0N2E3YSwgMHhlOTQ3YWVhZSwgMHgxODEwMDgwOCwgMHhkNTZmYmFiYSwgMHg4OGYwNzg3OCwgMHg2ZjRhMjUyNSwgMHg3MjVjMmUyZSwgMHgyNDM4MWMxYywgMHhmMTU3YTZhNiwgMHhjNzczYjRiNCwgMHg1MTk3YzZjNiwgMHgyM2NiZThlOCwgMHg3Y2ExZGRkZCwgMHg5Y2U4NzQ3NCwgMHgyMTNlMWYxZiwgMHhkZDk2NGI0YiwgMHhkYzYxYmRiZCwgMHg4NjBkOGI4YiwgMHg4NTBmOGE4YSwgMHg5MGUwNzA3MCwgMHg0MjdjM2UzZSwgMHhjNDcxYjViNSwgMHhhYWNjNjY2NiwgMHhkODkwNDg0OCwgMHgwNTA2MDMwMywgMHgwMWY3ZjZmNiwgMHgxMjFjMGUwZSwgMHhhM2MyNjE2MSwgMHg1ZjZhMzUzNSwgMHhmOWFlNTc1NywgMHhkMDY5YjliOSwgMHg5MTE3ODY4NiwgMHg1ODk5YzFjMSwgMHgyNzNhMWQxZCwgMHhiOTI3OWU5ZSwgMHgzOGQ5ZTFlMSwgMHgxM2ViZjhmOCwgMHhiMzJiOTg5OCwgMHgzMzIyMTExMSwgMHhiYmQyNjk2OSwgMHg3MGE5ZDlkOSwgMHg4OTA3OGU4ZSwgMHhhNzMzOTQ5NCwgMHhiNjJkOWI5YiwgMHgyMjNjMWUxZSwgMHg5MjE1ODc4NywgMHgyMGM5ZTllOSwgMHg0OTg3Y2VjZSwgMHhmZmFhNTU1NSwgMHg3ODUwMjgyOCwgMHg3YWE1ZGZkZiwgMHg4ZjAzOGM4YywgMHhmODU5YTFhMSwgMHg4MDA5ODk4OSwgMHgxNzFhMGQwZCwgMHhkYTY1YmZiZiwgMHgzMWQ3ZTZlNiwgMHhjNjg0NDI0MiwgMHhiOGQwNjg2OCwgMHhjMzgyNDE0MSwgMHhiMDI5OTk5OSwgMHg3NzVhMmQyZCwgMHgxMTFlMGYwZiwgMHhjYjdiYjBiMCwgMHhmY2E4NTQ1NCwgMHhkNjZkYmJiYiwgMHgzYTJjMTYxNl07XG4gICAgdmFyIFQzID0gWzB4NjNhNWM2NjMsIDB4N2M4NGY4N2MsIDB4Nzc5OWVlNzcsIDB4N2I4ZGY2N2IsIDB4ZjIwZGZmZjIsIDB4NmJiZGQ2NmIsIDB4NmZiMWRlNmYsIDB4YzU1NDkxYzUsIDB4MzA1MDYwMzAsIDB4MDEwMzAyMDEsIDB4NjdhOWNlNjcsIDB4MmI3ZDU2MmIsIDB4ZmUxOWU3ZmUsIDB4ZDc2MmI1ZDcsIDB4YWJlNjRkYWIsIDB4NzY5YWVjNzYsIDB4Y2E0NThmY2EsIDB4ODI5ZDFmODIsIDB4Yzk0MDg5YzksIDB4N2Q4N2ZhN2QsIDB4ZmExNWVmZmEsIDB4NTllYmIyNTksIDB4NDdjOThlNDcsIDB4ZjAwYmZiZjAsIDB4YWRlYzQxYWQsIDB4ZDQ2N2IzZDQsIDB4YTJmZDVmYTIsIDB4YWZlYTQ1YWYsIDB4OWNiZjIzOWMsIDB4YTRmNzUzYTQsIDB4NzI5NmU0NzIsIDB4YzA1YjliYzAsIDB4YjdjMjc1YjcsIDB4ZmQxY2UxZmQsIDB4OTNhZTNkOTMsIDB4MjY2YTRjMjYsIDB4MzY1YTZjMzYsIDB4M2Y0MTdlM2YsIDB4ZjcwMmY1ZjcsIDB4Y2M0ZjgzY2MsIDB4MzQ1YzY4MzQsIDB4YTVmNDUxYTUsIDB4ZTUzNGQxZTUsIDB4ZjEwOGY5ZjEsIDB4NzE5M2UyNzEsIDB4ZDg3M2FiZDgsIDB4MzE1MzYyMzEsIDB4MTUzZjJhMTUsIDB4MDQwYzA4MDQsIDB4Yzc1Mjk1YzcsIDB4MjM2NTQ2MjMsIDB4YzM1ZTlkYzMsIDB4MTgyODMwMTgsIDB4OTZhMTM3OTYsIDB4MDUwZjBhMDUsIDB4OWFiNTJmOWEsIDB4MDcwOTBlMDcsIDB4MTIzNjI0MTIsIDB4ODA5YjFiODAsIDB4ZTIzZGRmZTIsIDB4ZWIyNmNkZWIsIDB4Mjc2OTRlMjcsIDB4YjJjZDdmYjIsIDB4NzU5ZmVhNzUsIDB4MDkxYjEyMDksIDB4ODM5ZTFkODMsIDB4MmM3NDU4MmMsIDB4MWEyZTM0MWEsIDB4MWIyZDM2MWIsIDB4NmViMmRjNmUsIDB4NWFlZWI0NWEsIDB4YTBmYjViYTAsIDB4NTJmNmE0NTIsIDB4M2I0ZDc2M2IsIDB4ZDY2MWI3ZDYsIDB4YjNjZTdkYjMsIDB4Mjk3YjUyMjksIDB4ZTMzZWRkZTMsIDB4MmY3MTVlMmYsIDB4ODQ5NzEzODQsIDB4NTNmNWE2NTMsIDB4ZDE2OGI5ZDEsIDB4MDAwMDAwMDAsIDB4ZWQyY2MxZWQsIDB4MjA2MDQwMjAsIDB4ZmMxZmUzZmMsIDB4YjFjODc5YjEsIDB4NWJlZGI2NWIsIDB4NmFiZWQ0NmEsIDB4Y2I0NjhkY2IsIDB4YmVkOTY3YmUsIDB4Mzk0YjcyMzksIDB4NGFkZTk0NGEsIDB4NGNkNDk4NGMsIDB4NThlOGIwNTgsIDB4Y2Y0YTg1Y2YsIDB4ZDA2YmJiZDAsIDB4ZWYyYWM1ZWYsIDB4YWFlNTRmYWEsIDB4ZmIxNmVkZmIsIDB4NDNjNTg2NDMsIDB4NGRkNzlhNGQsIDB4MzM1NTY2MzMsIDB4ODU5NDExODUsIDB4NDVjZjhhNDUsIDB4ZjkxMGU5ZjksIDB4MDIwNjA0MDIsIDB4N2Y4MWZlN2YsIDB4NTBmMGEwNTAsIDB4M2M0NDc4M2MsIDB4OWZiYTI1OWYsIDB4YThlMzRiYTgsIDB4NTFmM2EyNTEsIDB4YTNmZTVkYTMsIDB4NDBjMDgwNDAsIDB4OGY4YTA1OGYsIDB4OTJhZDNmOTIsIDB4OWRiYzIxOWQsIDB4Mzg0ODcwMzgsIDB4ZjUwNGYxZjUsIDB4YmNkZjYzYmMsIDB4YjZjMTc3YjYsIDB4ZGE3NWFmZGEsIDB4MjE2MzQyMjEsIDB4MTAzMDIwMTAsIDB4ZmYxYWU1ZmYsIDB4ZjMwZWZkZjMsIDB4ZDI2ZGJmZDIsIDB4Y2Q0YzgxY2QsIDB4MGMxNDE4MGMsIDB4MTMzNTI2MTMsIDB4ZWMyZmMzZWMsIDB4NWZlMWJlNWYsIDB4OTdhMjM1OTcsIDB4NDRjYzg4NDQsIDB4MTczOTJlMTcsIDB4YzQ1NzkzYzQsIDB4YTdmMjU1YTcsIDB4N2U4MmZjN2UsIDB4M2Q0NzdhM2QsIDB4NjRhY2M4NjQsIDB4NWRlN2JhNWQsIDB4MTkyYjMyMTksIDB4NzM5NWU2NzMsIDB4NjBhMGMwNjAsIDB4ODE5ODE5ODEsIDB4NGZkMTllNGYsIDB4ZGM3ZmEzZGMsIDB4MjI2NjQ0MjIsIDB4MmE3ZTU0MmEsIDB4OTBhYjNiOTAsIDB4ODg4MzBiODgsIDB4NDZjYThjNDYsIDB4ZWUyOWM3ZWUsIDB4YjhkMzZiYjgsIDB4MTQzYzI4MTQsIDB4ZGU3OWE3ZGUsIDB4NWVlMmJjNWUsIDB4MGIxZDE2MGIsIDB4ZGI3NmFkZGIsIDB4ZTAzYmRiZTAsIDB4MzI1NjY0MzIsIDB4M2E0ZTc0M2EsIDB4MGExZTE0MGEsIDB4NDlkYjkyNDksIDB4MDYwYTBjMDYsIDB4MjQ2YzQ4MjQsIDB4NWNlNGI4NWMsIDB4YzI1ZDlmYzIsIDB4ZDM2ZWJkZDMsIDB4YWNlZjQzYWMsIDB4NjJhNmM0NjIsIDB4OTFhODM5OTEsIDB4OTVhNDMxOTUsIDB4ZTQzN2QzZTQsIDB4Nzk4YmYyNzksIDB4ZTczMmQ1ZTcsIDB4Yzg0MzhiYzgsIDB4Mzc1OTZlMzcsIDB4NmRiN2RhNmQsIDB4OGQ4YzAxOGQsIDB4ZDU2NGIxZDUsIDB4NGVkMjljNGUsIDB4YTllMDQ5YTksIDB4NmNiNGQ4NmMsIDB4NTZmYWFjNTYsIDB4ZjQwN2YzZjQsIDB4ZWEyNWNmZWEsIDB4NjVhZmNhNjUsIDB4N2E4ZWY0N2EsIDB4YWVlOTQ3YWUsIDB4MDgxODEwMDgsIDB4YmFkNTZmYmEsIDB4Nzg4OGYwNzgsIDB4MjU2ZjRhMjUsIDB4MmU3MjVjMmUsIDB4MWMyNDM4MWMsIDB4YTZmMTU3YTYsIDB4YjRjNzczYjQsIDB4YzY1MTk3YzYsIDB4ZTgyM2NiZTgsIDB4ZGQ3Y2ExZGQsIDB4NzQ5Y2U4NzQsIDB4MWYyMTNlMWYsIDB4NGJkZDk2NGIsIDB4YmRkYzYxYmQsIDB4OGI4NjBkOGIsIDB4OGE4NTBmOGEsIDB4NzA5MGUwNzAsIDB4M2U0MjdjM2UsIDB4YjVjNDcxYjUsIDB4NjZhYWNjNjYsIDB4NDhkODkwNDgsIDB4MDMwNTA2MDMsIDB4ZjYwMWY3ZjYsIDB4MGUxMjFjMGUsIDB4NjFhM2MyNjEsIDB4MzU1ZjZhMzUsIDB4NTdmOWFlNTcsIDB4YjlkMDY5YjksIDB4ODY5MTE3ODYsIDB4YzE1ODk5YzEsIDB4MWQyNzNhMWQsIDB4OWViOTI3OWUsIDB4ZTEzOGQ5ZTEsIDB4ZjgxM2ViZjgsIDB4OThiMzJiOTgsIDB4MTEzMzIyMTEsIDB4NjliYmQyNjksIDB4ZDk3MGE5ZDksIDB4OGU4OTA3OGUsIDB4OTRhNzMzOTQsIDB4OWJiNjJkOWIsIDB4MWUyMjNjMWUsIDB4ODc5MjE1ODcsIDB4ZTkyMGM5ZTksIDB4Y2U0OTg3Y2UsIDB4NTVmZmFhNTUsIDB4Mjg3ODUwMjgsIDB4ZGY3YWE1ZGYsIDB4OGM4ZjAzOGMsIDB4YTFmODU5YTEsIDB4ODk4MDA5ODksIDB4MGQxNzFhMGQsIDB4YmZkYTY1YmYsIDB4ZTYzMWQ3ZTYsIDB4NDJjNjg0NDIsIDB4NjhiOGQwNjgsIDB4NDFjMzgyNDEsIDB4OTliMDI5OTksIDB4MmQ3NzVhMmQsIDB4MGYxMTFlMGYsIDB4YjBjYjdiYjAsIDB4NTRmY2E4NTQsIDB4YmJkNjZkYmIsIDB4MTYzYTJjMTZdO1xuICAgIHZhciBUNCA9IFsweDYzNjNhNWM2LCAweDdjN2M4NGY4LCAweDc3Nzc5OWVlLCAweDdiN2I4ZGY2LCAweGYyZjIwZGZmLCAweDZiNmJiZGQ2LCAweDZmNmZiMWRlLCAweGM1YzU1NDkxLCAweDMwMzA1MDYwLCAweDAxMDEwMzAyLCAweDY3NjdhOWNlLCAweDJiMmI3ZDU2LCAweGZlZmUxOWU3LCAweGQ3ZDc2MmI1LCAweGFiYWJlNjRkLCAweDc2NzY5YWVjLCAweGNhY2E0NThmLCAweDgyODI5ZDFmLCAweGM5Yzk0MDg5LCAweDdkN2Q4N2ZhLCAweGZhZmExNWVmLCAweDU5NTllYmIyLCAweDQ3NDdjOThlLCAweGYwZjAwYmZiLCAweGFkYWRlYzQxLCAweGQ0ZDQ2N2IzLCAweGEyYTJmZDVmLCAweGFmYWZlYTQ1LCAweDljOWNiZjIzLCAweGE0YTRmNzUzLCAweDcyNzI5NmU0LCAweGMwYzA1YjliLCAweGI3YjdjMjc1LCAweGZkZmQxY2UxLCAweDkzOTNhZTNkLCAweDI2MjY2YTRjLCAweDM2MzY1YTZjLCAweDNmM2Y0MTdlLCAweGY3ZjcwMmY1LCAweGNjY2M0ZjgzLCAweDM0MzQ1YzY4LCAweGE1YTVmNDUxLCAweGU1ZTUzNGQxLCAweGYxZjEwOGY5LCAweDcxNzE5M2UyLCAweGQ4ZDg3M2FiLCAweDMxMzE1MzYyLCAweDE1MTUzZjJhLCAweDA0MDQwYzA4LCAweGM3Yzc1Mjk1LCAweDIzMjM2NTQ2LCAweGMzYzM1ZTlkLCAweDE4MTgyODMwLCAweDk2OTZhMTM3LCAweDA1MDUwZjBhLCAweDlhOWFiNTJmLCAweDA3MDcwOTBlLCAweDEyMTIzNjI0LCAweDgwODA5YjFiLCAweGUyZTIzZGRmLCAweGViZWIyNmNkLCAweDI3Mjc2OTRlLCAweGIyYjJjZDdmLCAweDc1NzU5ZmVhLCAweDA5MDkxYjEyLCAweDgzODM5ZTFkLCAweDJjMmM3NDU4LCAweDFhMWEyZTM0LCAweDFiMWIyZDM2LCAweDZlNmViMmRjLCAweDVhNWFlZWI0LCAweGEwYTBmYjViLCAweDUyNTJmNmE0LCAweDNiM2I0ZDc2LCAweGQ2ZDY2MWI3LCAweGIzYjNjZTdkLCAweDI5Mjk3YjUyLCAweGUzZTMzZWRkLCAweDJmMmY3MTVlLCAweDg0ODQ5NzEzLCAweDUzNTNmNWE2LCAweGQxZDE2OGI5LCAweDAwMDAwMDAwLCAweGVkZWQyY2MxLCAweDIwMjA2MDQwLCAweGZjZmMxZmUzLCAweGIxYjFjODc5LCAweDViNWJlZGI2LCAweDZhNmFiZWQ0LCAweGNiY2I0NjhkLCAweGJlYmVkOTY3LCAweDM5Mzk0YjcyLCAweDRhNGFkZTk0LCAweDRjNGNkNDk4LCAweDU4NThlOGIwLCAweGNmY2Y0YTg1LCAweGQwZDA2YmJiLCAweGVmZWYyYWM1LCAweGFhYWFlNTRmLCAweGZiZmIxNmVkLCAweDQzNDNjNTg2LCAweDRkNGRkNzlhLCAweDMzMzM1NTY2LCAweDg1ODU5NDExLCAweDQ1NDVjZjhhLCAweGY5ZjkxMGU5LCAweDAyMDIwNjA0LCAweDdmN2Y4MWZlLCAweDUwNTBmMGEwLCAweDNjM2M0NDc4LCAweDlmOWZiYTI1LCAweGE4YThlMzRiLCAweDUxNTFmM2EyLCAweGEzYTNmZTVkLCAweDQwNDBjMDgwLCAweDhmOGY4YTA1LCAweDkyOTJhZDNmLCAweDlkOWRiYzIxLCAweDM4Mzg0ODcwLCAweGY1ZjUwNGYxLCAweGJjYmNkZjYzLCAweGI2YjZjMTc3LCAweGRhZGE3NWFmLCAweDIxMjE2MzQyLCAweDEwMTAzMDIwLCAweGZmZmYxYWU1LCAweGYzZjMwZWZkLCAweGQyZDI2ZGJmLCAweGNkY2Q0YzgxLCAweDBjMGMxNDE4LCAweDEzMTMzNTI2LCAweGVjZWMyZmMzLCAweDVmNWZlMWJlLCAweDk3OTdhMjM1LCAweDQ0NDRjYzg4LCAweDE3MTczOTJlLCAweGM0YzQ1NzkzLCAweGE3YTdmMjU1LCAweDdlN2U4MmZjLCAweDNkM2Q0NzdhLCAweDY0NjRhY2M4LCAweDVkNWRlN2JhLCAweDE5MTkyYjMyLCAweDczNzM5NWU2LCAweDYwNjBhMGMwLCAweDgxODE5ODE5LCAweDRmNGZkMTllLCAweGRjZGM3ZmEzLCAweDIyMjI2NjQ0LCAweDJhMmE3ZTU0LCAweDkwOTBhYjNiLCAweDg4ODg4MzBiLCAweDQ2NDZjYThjLCAweGVlZWUyOWM3LCAweGI4YjhkMzZiLCAweDE0MTQzYzI4LCAweGRlZGU3OWE3LCAweDVlNWVlMmJjLCAweDBiMGIxZDE2LCAweGRiZGI3NmFkLCAweGUwZTAzYmRiLCAweDMyMzI1NjY0LCAweDNhM2E0ZTc0LCAweDBhMGExZTE0LCAweDQ5NDlkYjkyLCAweDA2MDYwYTBjLCAweDI0MjQ2YzQ4LCAweDVjNWNlNGI4LCAweGMyYzI1ZDlmLCAweGQzZDM2ZWJkLCAweGFjYWNlZjQzLCAweDYyNjJhNmM0LCAweDkxOTFhODM5LCAweDk1OTVhNDMxLCAweGU0ZTQzN2QzLCAweDc5Nzk4YmYyLCAweGU3ZTczMmQ1LCAweGM4Yzg0MzhiLCAweDM3Mzc1OTZlLCAweDZkNmRiN2RhLCAweDhkOGQ4YzAxLCAweGQ1ZDU2NGIxLCAweDRlNGVkMjljLCAweGE5YTllMDQ5LCAweDZjNmNiNGQ4LCAweDU2NTZmYWFjLCAweGY0ZjQwN2YzLCAweGVhZWEyNWNmLCAweDY1NjVhZmNhLCAweDdhN2E4ZWY0LCAweGFlYWVlOTQ3LCAweDA4MDgxODEwLCAweGJhYmFkNTZmLCAweDc4Nzg4OGYwLCAweDI1MjU2ZjRhLCAweDJlMmU3MjVjLCAweDFjMWMyNDM4LCAweGE2YTZmMTU3LCAweGI0YjRjNzczLCAweGM2YzY1MTk3LCAweGU4ZTgyM2NiLCAweGRkZGQ3Y2ExLCAweDc0NzQ5Y2U4LCAweDFmMWYyMTNlLCAweDRiNGJkZDk2LCAweGJkYmRkYzYxLCAweDhiOGI4NjBkLCAweDhhOGE4NTBmLCAweDcwNzA5MGUwLCAweDNlM2U0MjdjLCAweGI1YjVjNDcxLCAweDY2NjZhYWNjLCAweDQ4NDhkODkwLCAweDAzMDMwNTA2LCAweGY2ZjYwMWY3LCAweDBlMGUxMjFjLCAweDYxNjFhM2MyLCAweDM1MzU1ZjZhLCAweDU3NTdmOWFlLCAweGI5YjlkMDY5LCAweDg2ODY5MTE3LCAweGMxYzE1ODk5LCAweDFkMWQyNzNhLCAweDllOWViOTI3LCAweGUxZTEzOGQ5LCAweGY4ZjgxM2ViLCAweDk4OThiMzJiLCAweDExMTEzMzIyLCAweDY5NjliYmQyLCAweGQ5ZDk3MGE5LCAweDhlOGU4OTA3LCAweDk0OTRhNzMzLCAweDliOWJiNjJkLCAweDFlMWUyMjNjLCAweDg3ODc5MjE1LCAweGU5ZTkyMGM5LCAweGNlY2U0OTg3LCAweDU1NTVmZmFhLCAweDI4Mjg3ODUwLCAweGRmZGY3YWE1LCAweDhjOGM4ZjAzLCAweGExYTFmODU5LCAweDg5ODk4MDA5LCAweDBkMGQxNzFhLCAweGJmYmZkYTY1LCAweGU2ZTYzMWQ3LCAweDQyNDJjNjg0LCAweDY4NjhiOGQwLCAweDQxNDFjMzgyLCAweDk5OTliMDI5LCAweDJkMmQ3NzVhLCAweDBmMGYxMTFlLCAweGIwYjBjYjdiLCAweDU0NTRmY2E4LCAweGJiYmJkNjZkLCAweDE2MTYzYTJjXTtcblxuICAgIC8vIFRyYW5zZm9ybWF0aW9ucyBmb3IgZGVjcnlwdGlvblxuICAgIHZhciBUNSA9IFsweDUxZjRhNzUwLCAweDdlNDE2NTUzLCAweDFhMTdhNGMzLCAweDNhMjc1ZTk2LCAweDNiYWI2YmNiLCAweDFmOWQ0NWYxLCAweGFjZmE1OGFiLCAweDRiZTMwMzkzLCAweDIwMzBmYTU1LCAweGFkNzY2ZGY2LCAweDg4Y2M3NjkxLCAweGY1MDI0YzI1LCAweDRmZTVkN2ZjLCAweGM1MmFjYmQ3LCAweDI2MzU0NDgwLCAweGI1NjJhMzhmLCAweGRlYjE1YTQ5LCAweDI1YmExYjY3LCAweDQ1ZWEwZTk4LCAweDVkZmVjMGUxLCAweGMzMmY3NTAyLCAweDgxNGNmMDEyLCAweDhkNDY5N2EzLCAweDZiZDNmOWM2LCAweDAzOGY1ZmU3LCAweDE1OTI5Yzk1LCAweGJmNmQ3YWViLCAweDk1NTI1OWRhLCAweGQ0YmU4MzJkLCAweDU4NzQyMWQzLCAweDQ5ZTA2OTI5LCAweDhlYzljODQ0LCAweDc1YzI4OTZhLCAweGY0OGU3OTc4LCAweDk5NTgzZTZiLCAweDI3Yjk3MWRkLCAweGJlZTE0ZmI2LCAweGYwODhhZDE3LCAweGM5MjBhYzY2LCAweDdkY2UzYWI0LCAweDYzZGY0YTE4LCAweGU1MWEzMTgyLCAweDk3NTEzMzYwLCAweDYyNTM3ZjQ1LCAweGIxNjQ3N2UwLCAweGJiNmJhZTg0LCAweGZlODFhMDFjLCAweGY5MDgyYjk0LCAweDcwNDg2ODU4LCAweDhmNDVmZDE5LCAweDk0ZGU2Yzg3LCAweDUyN2JmOGI3LCAweGFiNzNkMzIzLCAweDcyNGIwMmUyLCAweGUzMWY4ZjU3LCAweDY2NTVhYjJhLCAweGIyZWIyODA3LCAweDJmYjVjMjAzLCAweDg2YzU3YjlhLCAweGQzMzcwOGE1LCAweDMwMjg4N2YyLCAweDIzYmZhNWIyLCAweDAyMDM2YWJhLCAweGVkMTY4MjVjLCAweDhhY2YxYzJiLCAweGE3NzliNDkyLCAweGYzMDdmMmYwLCAweDRlNjllMmExLCAweDY1ZGFmNGNkLCAweDA2MDViZWQ1LCAweGQxMzQ2MjFmLCAweGM0YTZmZThhLCAweDM0MmU1MzlkLCAweGEyZjM1NWEwLCAweDA1OGFlMTMyLCAweGE0ZjZlYjc1LCAweDBiODNlYzM5LCAweDQwNjBlZmFhLCAweDVlNzE5ZjA2LCAweGJkNmUxMDUxLCAweDNlMjE4YWY5LCAweDk2ZGQwNjNkLCAweGRkM2UwNWFlLCAweDRkZTZiZDQ2LCAweDkxNTQ4ZGI1LCAweDcxYzQ1ZDA1LCAweDA0MDZkNDZmLCAweDYwNTAxNWZmLCAweDE5OThmYjI0LCAweGQ2YmRlOTk3LCAweDg5NDA0M2NjLCAweDY3ZDk5ZTc3LCAweGIwZTg0MmJkLCAweDA3ODk4Yjg4LCAweGU3MTk1YjM4LCAweDc5YzhlZWRiLCAweGExN2MwYTQ3LCAweDdjNDIwZmU5LCAweGY4ODQxZWM5LCAweDAwMDAwMDAwLCAweDA5ODA4NjgzLCAweDMyMmJlZDQ4LCAweDFlMTE3MGFjLCAweDZjNWE3MjRlLCAweGZkMGVmZmZiLCAweDBmODUzODU2LCAweDNkYWVkNTFlLCAweDM2MmQzOTI3LCAweDBhMGZkOTY0LCAweDY4NWNhNjIxLCAweDliNWI1NGQxLCAweDI0MzYyZTNhLCAweDBjMGE2N2IxLCAweDkzNTdlNzBmLCAweGI0ZWU5NmQyLCAweDFiOWI5MTllLCAweDgwYzBjNTRmLCAweDYxZGMyMGEyLCAweDVhNzc0YjY5LCAweDFjMTIxYTE2LCAweGUyOTNiYTBhLCAweGMwYTAyYWU1LCAweDNjMjJlMDQzLCAweDEyMWIxNzFkLCAweDBlMDkwZDBiLCAweGYyOGJjN2FkLCAweDJkYjZhOGI5LCAweDE0MWVhOWM4LCAweDU3ZjExOTg1LCAweGFmNzUwNzRjLCAweGVlOTlkZGJiLCAweGEzN2Y2MGZkLCAweGY3MDEyNjlmLCAweDVjNzJmNWJjLCAweDQ0NjYzYmM1LCAweDViZmI3ZTM0LCAweDhiNDMyOTc2LCAweGNiMjNjNmRjLCAweGI2ZWRmYzY4LCAweGI4ZTRmMTYzLCAweGQ3MzFkY2NhLCAweDQyNjM4NTEwLCAweDEzOTcyMjQwLCAweDg0YzYxMTIwLCAweDg1NGEyNDdkLCAweGQyYmIzZGY4LCAweGFlZjkzMjExLCAweGM3MjlhMTZkLCAweDFkOWUyZjRiLCAweGRjYjIzMGYzLCAweDBkODY1MmVjLCAweDc3YzFlM2QwLCAweDJiYjMxNjZjLCAweGE5NzBiOTk5LCAweDExOTQ0OGZhLCAweDQ3ZTk2NDIyLCAweGE4ZmM4Y2M0LCAweGEwZjAzZjFhLCAweDU2N2QyY2Q4LCAweDIyMzM5MGVmLCAweDg3NDk0ZWM3LCAweGQ5MzhkMWMxLCAweDhjY2FhMmZlLCAweDk4ZDQwYjM2LCAweGE2ZjU4MWNmLCAweGE1N2FkZTI4LCAweGRhYjc4ZTI2LCAweDNmYWRiZmE0LCAweDJjM2E5ZGU0LCAweDUwNzg5MjBkLCAweDZhNWZjYzliLCAweDU0N2U0NjYyLCAweGY2OGQxM2MyLCAweDkwZDhiOGU4LCAweDJlMzlmNzVlLCAweDgyYzNhZmY1LCAweDlmNWQ4MGJlLCAweDY5ZDA5MzdjLCAweDZmZDUyZGE5LCAweGNmMjUxMmIzLCAweGM4YWM5OTNiLCAweDEwMTg3ZGE3LCAweGU4OWM2MzZlLCAweGRiM2JiYjdiLCAweGNkMjY3ODA5LCAweDZlNTkxOGY0LCAweGVjOWFiNzAxLCAweDgzNGY5YWE4LCAweGU2OTU2ZTY1LCAweGFhZmZlNjdlLCAweDIxYmNjZjA4LCAweGVmMTVlOGU2LCAweGJhZTc5YmQ5LCAweDRhNmYzNmNlLCAweGVhOWYwOWQ0LCAweDI5YjA3Y2Q2LCAweDMxYTRiMmFmLCAweDJhM2YyMzMxLCAweGM2YTU5NDMwLCAweDM1YTI2NmMwLCAweDc0NGViYzM3LCAweGZjODJjYWE2LCAweGUwOTBkMGIwLCAweDMzYTdkODE1LCAweGYxMDQ5ODRhLCAweDQxZWNkYWY3LCAweDdmY2Q1MDBlLCAweDE3OTFmNjJmLCAweDc2NGRkNjhkLCAweDQzZWZiMDRkLCAweGNjYWE0ZDU0LCAweGU0OTYwNGRmLCAweDllZDFiNWUzLCAweDRjNmE4ODFiLCAweGMxMmMxZmI4LCAweDQ2NjU1MTdmLCAweDlkNWVlYTA0LCAweDAxOGMzNTVkLCAweGZhODc3NDczLCAweGZiMGI0MTJlLCAweGIzNjcxZDVhLCAweDkyZGJkMjUyLCAweGU5MTA1NjMzLCAweDZkZDY0NzEzLCAweDlhZDc2MThjLCAweDM3YTEwYzdhLCAweDU5ZjgxNDhlLCAweGViMTMzYzg5LCAweGNlYTkyN2VlLCAweGI3NjFjOTM1LCAweGUxMWNlNWVkLCAweDdhNDdiMTNjLCAweDljZDJkZjU5LCAweDU1ZjI3MzNmLCAweDE4MTRjZTc5LCAweDczYzczN2JmLCAweDUzZjdjZGVhLCAweDVmZmRhYTViLCAweGRmM2Q2ZjE0LCAweDc4NDRkYjg2LCAweGNhYWZmMzgxLCAweGI5NjhjNDNlLCAweDM4MjQzNDJjLCAweGMyYTM0MDVmLCAweDE2MWRjMzcyLCAweGJjZTIyNTBjLCAweDI4M2M0OThiLCAweGZmMGQ5NTQxLCAweDM5YTgwMTcxLCAweDA4MGNiM2RlLCAweGQ4YjRlNDljLCAweDY0NTZjMTkwLCAweDdiY2I4NDYxLCAweGQ1MzJiNjcwLCAweDQ4NmM1Yzc0LCAweGQwYjg1NzQyXTtcbiAgICB2YXIgVDYgPSBbMHg1MDUxZjRhNywgMHg1MzdlNDE2NSwgMHhjMzFhMTdhNCwgMHg5NjNhMjc1ZSwgMHhjYjNiYWI2YiwgMHhmMTFmOWQ0NSwgMHhhYmFjZmE1OCwgMHg5MzRiZTMwMywgMHg1NTIwMzBmYSwgMHhmNmFkNzY2ZCwgMHg5MTg4Y2M3NiwgMHgyNWY1MDI0YywgMHhmYzRmZTVkNywgMHhkN2M1MmFjYiwgMHg4MDI2MzU0NCwgMHg4ZmI1NjJhMywgMHg0OWRlYjE1YSwgMHg2NzI1YmExYiwgMHg5ODQ1ZWEwZSwgMHhlMTVkZmVjMCwgMHgwMmMzMmY3NSwgMHgxMjgxNGNmMCwgMHhhMzhkNDY5NywgMHhjNjZiZDNmOSwgMHhlNzAzOGY1ZiwgMHg5NTE1OTI5YywgMHhlYmJmNmQ3YSwgMHhkYTk1NTI1OSwgMHgyZGQ0YmU4MywgMHhkMzU4NzQyMSwgMHgyOTQ5ZTA2OSwgMHg0NDhlYzljOCwgMHg2YTc1YzI4OSwgMHg3OGY0OGU3OSwgMHg2Yjk5NTgzZSwgMHhkZDI3Yjk3MSwgMHhiNmJlZTE0ZiwgMHgxN2YwODhhZCwgMHg2NmM5MjBhYywgMHhiNDdkY2UzYSwgMHgxODYzZGY0YSwgMHg4MmU1MWEzMSwgMHg2MDk3NTEzMywgMHg0NTYyNTM3ZiwgMHhlMGIxNjQ3NywgMHg4NGJiNmJhZSwgMHgxY2ZlODFhMCwgMHg5NGY5MDgyYiwgMHg1ODcwNDg2OCwgMHgxOThmNDVmZCwgMHg4Nzk0ZGU2YywgMHhiNzUyN2JmOCwgMHgyM2FiNzNkMywgMHhlMjcyNGIwMiwgMHg1N2UzMWY4ZiwgMHgyYTY2NTVhYiwgMHgwN2IyZWIyOCwgMHgwMzJmYjVjMiwgMHg5YTg2YzU3YiwgMHhhNWQzMzcwOCwgMHhmMjMwMjg4NywgMHhiMjIzYmZhNSwgMHhiYTAyMDM2YSwgMHg1Y2VkMTY4MiwgMHgyYjhhY2YxYywgMHg5MmE3NzliNCwgMHhmMGYzMDdmMiwgMHhhMTRlNjllMiwgMHhjZDY1ZGFmNCwgMHhkNTA2MDViZSwgMHgxZmQxMzQ2MiwgMHg4YWM0YTZmZSwgMHg5ZDM0MmU1MywgMHhhMGEyZjM1NSwgMHgzMjA1OGFlMSwgMHg3NWE0ZjZlYiwgMHgzOTBiODNlYywgMHhhYTQwNjBlZiwgMHgwNjVlNzE5ZiwgMHg1MWJkNmUxMCwgMHhmOTNlMjE4YSwgMHgzZDk2ZGQwNiwgMHhhZWRkM2UwNSwgMHg0NjRkZTZiZCwgMHhiNTkxNTQ4ZCwgMHgwNTcxYzQ1ZCwgMHg2ZjA0MDZkNCwgMHhmZjYwNTAxNSwgMHgyNDE5OThmYiwgMHg5N2Q2YmRlOSwgMHhjYzg5NDA0MywgMHg3NzY3ZDk5ZSwgMHhiZGIwZTg0MiwgMHg4ODA3ODk4YiwgMHgzOGU3MTk1YiwgMHhkYjc5YzhlZSwgMHg0N2ExN2MwYSwgMHhlOTdjNDIwZiwgMHhjOWY4ODQxZSwgMHgwMDAwMDAwMCwgMHg4MzA5ODA4NiwgMHg0ODMyMmJlZCwgMHhhYzFlMTE3MCwgMHg0ZTZjNWE3MiwgMHhmYmZkMGVmZiwgMHg1NjBmODUzOCwgMHgxZTNkYWVkNSwgMHgyNzM2MmQzOSwgMHg2NDBhMGZkOSwgMHgyMTY4NWNhNiwgMHhkMTliNWI1NCwgMHgzYTI0MzYyZSwgMHhiMTBjMGE2NywgMHgwZjkzNTdlNywgMHhkMmI0ZWU5NiwgMHg5ZTFiOWI5MSwgMHg0ZjgwYzBjNSwgMHhhMjYxZGMyMCwgMHg2OTVhNzc0YiwgMHgxNjFjMTIxYSwgMHgwYWUyOTNiYSwgMHhlNWMwYTAyYSwgMHg0MzNjMjJlMCwgMHgxZDEyMWIxNywgMHgwYjBlMDkwZCwgMHhhZGYyOGJjNywgMHhiOTJkYjZhOCwgMHhjODE0MWVhOSwgMHg4NTU3ZjExOSwgMHg0Y2FmNzUwNywgMHhiYmVlOTlkZCwgMHhmZGEzN2Y2MCwgMHg5ZmY3MDEyNiwgMHhiYzVjNzJmNSwgMHhjNTQ0NjYzYiwgMHgzNDViZmI3ZSwgMHg3NjhiNDMyOSwgMHhkY2NiMjNjNiwgMHg2OGI2ZWRmYywgMHg2M2I4ZTRmMSwgMHhjYWQ3MzFkYywgMHgxMDQyNjM4NSwgMHg0MDEzOTcyMiwgMHgyMDg0YzYxMSwgMHg3ZDg1NGEyNCwgMHhmOGQyYmIzZCwgMHgxMWFlZjkzMiwgMHg2ZGM3MjlhMSwgMHg0YjFkOWUyZiwgMHhmM2RjYjIzMCwgMHhlYzBkODY1MiwgMHhkMDc3YzFlMywgMHg2YzJiYjMxNiwgMHg5OWE5NzBiOSwgMHhmYTExOTQ0OCwgMHgyMjQ3ZTk2NCwgMHhjNGE4ZmM4YywgMHgxYWEwZjAzZiwgMHhkODU2N2QyYywgMHhlZjIyMzM5MCwgMHhjNzg3NDk0ZSwgMHhjMWQ5MzhkMSwgMHhmZThjY2FhMiwgMHgzNjk4ZDQwYiwgMHhjZmE2ZjU4MSwgMHgyOGE1N2FkZSwgMHgyNmRhYjc4ZSwgMHhhNDNmYWRiZiwgMHhlNDJjM2E5ZCwgMHgwZDUwNzg5MiwgMHg5YjZhNWZjYywgMHg2MjU0N2U0NiwgMHhjMmY2OGQxMywgMHhlODkwZDhiOCwgMHg1ZTJlMzlmNywgMHhmNTgyYzNhZiwgMHhiZTlmNWQ4MCwgMHg3YzY5ZDA5MywgMHhhOTZmZDUyZCwgMHhiM2NmMjUxMiwgMHgzYmM4YWM5OSwgMHhhNzEwMTg3ZCwgMHg2ZWU4OWM2MywgMHg3YmRiM2JiYiwgMHgwOWNkMjY3OCwgMHhmNDZlNTkxOCwgMHgwMWVjOWFiNywgMHhhODgzNGY5YSwgMHg2NWU2OTU2ZSwgMHg3ZWFhZmZlNiwgMHgwODIxYmNjZiwgMHhlNmVmMTVlOCwgMHhkOWJhZTc5YiwgMHhjZTRhNmYzNiwgMHhkNGVhOWYwOSwgMHhkNjI5YjA3YywgMHhhZjMxYTRiMiwgMHgzMTJhM2YyMywgMHgzMGM2YTU5NCwgMHhjMDM1YTI2NiwgMHgzNzc0NGViYywgMHhhNmZjODJjYSwgMHhiMGUwOTBkMCwgMHgxNTMzYTdkOCwgMHg0YWYxMDQ5OCwgMHhmNzQxZWNkYSwgMHgwZTdmY2Q1MCwgMHgyZjE3OTFmNiwgMHg4ZDc2NGRkNiwgMHg0ZDQzZWZiMCwgMHg1NGNjYWE0ZCwgMHhkZmU0OTYwNCwgMHhlMzllZDFiNSwgMHgxYjRjNmE4OCwgMHhiOGMxMmMxZiwgMHg3ZjQ2NjU1MSwgMHgwNDlkNWVlYSwgMHg1ZDAxOGMzNSwgMHg3M2ZhODc3NCwgMHgyZWZiMGI0MSwgMHg1YWIzNjcxZCwgMHg1MjkyZGJkMiwgMHgzM2U5MTA1NiwgMHgxMzZkZDY0NywgMHg4YzlhZDc2MSwgMHg3YTM3YTEwYywgMHg4ZTU5ZjgxNCwgMHg4OWViMTMzYywgMHhlZWNlYTkyNywgMHgzNWI3NjFjOSwgMHhlZGUxMWNlNSwgMHgzYzdhNDdiMSwgMHg1OTljZDJkZiwgMHgzZjU1ZjI3MywgMHg3OTE4MTRjZSwgMHhiZjczYzczNywgMHhlYTUzZjdjZCwgMHg1YjVmZmRhYSwgMHgxNGRmM2Q2ZiwgMHg4Njc4NDRkYiwgMHg4MWNhYWZmMywgMHgzZWI5NjhjNCwgMHgyYzM4MjQzNCwgMHg1ZmMyYTM0MCwgMHg3MjE2MWRjMywgMHgwY2JjZTIyNSwgMHg4YjI4M2M0OSwgMHg0MWZmMGQ5NSwgMHg3MTM5YTgwMSwgMHhkZTA4MGNiMywgMHg5Y2Q4YjRlNCwgMHg5MDY0NTZjMSwgMHg2MTdiY2I4NCwgMHg3MGQ1MzJiNiwgMHg3NDQ4NmM1YywgMHg0MmQwYjg1N107XG4gICAgdmFyIFQ3ID0gWzB4YTc1MDUxZjQsIDB4NjU1MzdlNDEsIDB4YTRjMzFhMTcsIDB4NWU5NjNhMjcsIDB4NmJjYjNiYWIsIDB4NDVmMTFmOWQsIDB4NThhYmFjZmEsIDB4MDM5MzRiZTMsIDB4ZmE1NTIwMzAsIDB4NmRmNmFkNzYsIDB4NzY5MTg4Y2MsIDB4NGMyNWY1MDIsIDB4ZDdmYzRmZTUsIDB4Y2JkN2M1MmEsIDB4NDQ4MDI2MzUsIDB4YTM4ZmI1NjIsIDB4NWE0OWRlYjEsIDB4MWI2NzI1YmEsIDB4MGU5ODQ1ZWEsIDB4YzBlMTVkZmUsIDB4NzUwMmMzMmYsIDB4ZjAxMjgxNGMsIDB4OTdhMzhkNDYsIDB4ZjljNjZiZDMsIDB4NWZlNzAzOGYsIDB4OWM5NTE1OTIsIDB4N2FlYmJmNmQsIDB4NTlkYTk1NTIsIDB4ODMyZGQ0YmUsIDB4MjFkMzU4NzQsIDB4NjkyOTQ5ZTAsIDB4Yzg0NDhlYzksIDB4ODk2YTc1YzIsIDB4Nzk3OGY0OGUsIDB4M2U2Yjk5NTgsIDB4NzFkZDI3YjksIDB4NGZiNmJlZTEsIDB4YWQxN2YwODgsIDB4YWM2NmM5MjAsIDB4M2FiNDdkY2UsIDB4NGExODYzZGYsIDB4MzE4MmU1MWEsIDB4MzM2MDk3NTEsIDB4N2Y0NTYyNTMsIDB4NzdlMGIxNjQsIDB4YWU4NGJiNmIsIDB4YTAxY2ZlODEsIDB4MmI5NGY5MDgsIDB4Njg1ODcwNDgsIDB4ZmQxOThmNDUsIDB4NmM4Nzk0ZGUsIDB4ZjhiNzUyN2IsIDB4ZDMyM2FiNzMsIDB4MDJlMjcyNGIsIDB4OGY1N2UzMWYsIDB4YWIyYTY2NTUsIDB4MjgwN2IyZWIsIDB4YzIwMzJmYjUsIDB4N2I5YTg2YzUsIDB4MDhhNWQzMzcsIDB4ODdmMjMwMjgsIDB4YTViMjIzYmYsIDB4NmFiYTAyMDMsIDB4ODI1Y2VkMTYsIDB4MWMyYjhhY2YsIDB4YjQ5MmE3NzksIDB4ZjJmMGYzMDcsIDB4ZTJhMTRlNjksIDB4ZjRjZDY1ZGEsIDB4YmVkNTA2MDUsIDB4NjIxZmQxMzQsIDB4ZmU4YWM0YTYsIDB4NTM5ZDM0MmUsIDB4NTVhMGEyZjMsIDB4ZTEzMjA1OGEsIDB4ZWI3NWE0ZjYsIDB4ZWMzOTBiODMsIDB4ZWZhYTQwNjAsIDB4OWYwNjVlNzEsIDB4MTA1MWJkNmUsIDB4OGFmOTNlMjEsIDB4MDYzZDk2ZGQsIDB4MDVhZWRkM2UsIDB4YmQ0NjRkZTYsIDB4OGRiNTkxNTQsIDB4NWQwNTcxYzQsIDB4ZDQ2ZjA0MDYsIDB4MTVmZjYwNTAsIDB4ZmIyNDE5OTgsIDB4ZTk5N2Q2YmQsIDB4NDNjYzg5NDAsIDB4OWU3NzY3ZDksIDB4NDJiZGIwZTgsIDB4OGI4ODA3ODksIDB4NWIzOGU3MTksIDB4ZWVkYjc5YzgsIDB4MGE0N2ExN2MsIDB4MGZlOTdjNDIsIDB4MWVjOWY4ODQsIDB4MDAwMDAwMDAsIDB4ODY4MzA5ODAsIDB4ZWQ0ODMyMmIsIDB4NzBhYzFlMTEsIDB4NzI0ZTZjNWEsIDB4ZmZmYmZkMGUsIDB4Mzg1NjBmODUsIDB4ZDUxZTNkYWUsIDB4MzkyNzM2MmQsIDB4ZDk2NDBhMGYsIDB4YTYyMTY4NWMsIDB4NTRkMTliNWIsIDB4MmUzYTI0MzYsIDB4NjdiMTBjMGEsIDB4ZTcwZjkzNTcsIDB4OTZkMmI0ZWUsIDB4OTE5ZTFiOWIsIDB4YzU0ZjgwYzAsIDB4MjBhMjYxZGMsIDB4NGI2OTVhNzcsIDB4MWExNjFjMTIsIDB4YmEwYWUyOTMsIDB4MmFlNWMwYTAsIDB4ZTA0MzNjMjIsIDB4MTcxZDEyMWIsIDB4MGQwYjBlMDksIDB4YzdhZGYyOGIsIDB4YThiOTJkYjYsIDB4YTljODE0MWUsIDB4MTk4NTU3ZjEsIDB4MDc0Y2FmNzUsIDB4ZGRiYmVlOTksIDB4NjBmZGEzN2YsIDB4MjY5ZmY3MDEsIDB4ZjViYzVjNzIsIDB4M2JjNTQ0NjYsIDB4N2UzNDViZmIsIDB4Mjk3NjhiNDMsIDB4YzZkY2NiMjMsIDB4ZmM2OGI2ZWQsIDB4ZjE2M2I4ZTQsIDB4ZGNjYWQ3MzEsIDB4ODUxMDQyNjMsIDB4MjI0MDEzOTcsIDB4MTEyMDg0YzYsIDB4MjQ3ZDg1NGEsIDB4M2RmOGQyYmIsIDB4MzIxMWFlZjksIDB4YTE2ZGM3MjksIDB4MmY0YjFkOWUsIDB4MzBmM2RjYjIsIDB4NTJlYzBkODYsIDB4ZTNkMDc3YzEsIDB4MTY2YzJiYjMsIDB4Yjk5OWE5NzAsIDB4NDhmYTExOTQsIDB4NjQyMjQ3ZTksIDB4OGNjNGE4ZmMsIDB4M2YxYWEwZjAsIDB4MmNkODU2N2QsIDB4OTBlZjIyMzMsIDB4NGVjNzg3NDksIDB4ZDFjMWQ5MzgsIDB4YTJmZThjY2EsIDB4MGIzNjk4ZDQsIDB4ODFjZmE2ZjUsIDB4ZGUyOGE1N2EsIDB4OGUyNmRhYjcsIDB4YmZhNDNmYWQsIDB4OWRlNDJjM2EsIDB4OTIwZDUwNzgsIDB4Y2M5YjZhNWYsIDB4NDY2MjU0N2UsIDB4MTNjMmY2OGQsIDB4YjhlODkwZDgsIDB4Zjc1ZTJlMzksIDB4YWZmNTgyYzMsIDB4ODBiZTlmNWQsIDB4OTM3YzY5ZDAsIDB4MmRhOTZmZDUsIDB4MTJiM2NmMjUsIDB4OTkzYmM4YWMsIDB4N2RhNzEwMTgsIDB4NjM2ZWU4OWMsIDB4YmI3YmRiM2IsIDB4NzgwOWNkMjYsIDB4MThmNDZlNTksIDB4YjcwMWVjOWEsIDB4OWFhODgzNGYsIDB4NmU2NWU2OTUsIDB4ZTY3ZWFhZmYsIDB4Y2YwODIxYmMsIDB4ZThlNmVmMTUsIDB4OWJkOWJhZTcsIDB4MzZjZTRhNmYsIDB4MDlkNGVhOWYsIDB4N2NkNjI5YjAsIDB4YjJhZjMxYTQsIDB4MjMzMTJhM2YsIDB4OTQzMGM2YTUsIDB4NjZjMDM1YTIsIDB4YmMzNzc0NGUsIDB4Y2FhNmZjODIsIDB4ZDBiMGUwOTAsIDB4ZDgxNTMzYTcsIDB4OTg0YWYxMDQsIDB4ZGFmNzQxZWMsIDB4NTAwZTdmY2QsIDB4ZjYyZjE3OTEsIDB4ZDY4ZDc2NGQsIDB4YjA0ZDQzZWYsIDB4NGQ1NGNjYWEsIDB4MDRkZmU0OTYsIDB4YjVlMzllZDEsIDB4ODgxYjRjNmEsIDB4MWZiOGMxMmMsIDB4NTE3ZjQ2NjUsIDB4ZWEwNDlkNWUsIDB4MzU1ZDAxOGMsIDB4NzQ3M2ZhODcsIDB4NDEyZWZiMGIsIDB4MWQ1YWIzNjcsIDB4ZDI1MjkyZGIsIDB4NTYzM2U5MTAsIDB4NDcxMzZkZDYsIDB4NjE4YzlhZDcsIDB4MGM3YTM3YTEsIDB4MTQ4ZTU5ZjgsIDB4M2M4OWViMTMsIDB4MjdlZWNlYTksIDB4YzkzNWI3NjEsIDB4ZTVlZGUxMWMsIDB4YjEzYzdhNDcsIDB4ZGY1OTljZDIsIDB4NzMzZjU1ZjIsIDB4Y2U3OTE4MTQsIDB4MzdiZjczYzcsIDB4Y2RlYTUzZjcsIDB4YWE1YjVmZmQsIDB4NmYxNGRmM2QsIDB4ZGI4Njc4NDQsIDB4ZjM4MWNhYWYsIDB4YzQzZWI5NjgsIDB4MzQyYzM4MjQsIDB4NDA1ZmMyYTMsIDB4YzM3MjE2MWQsIDB4MjUwY2JjZTIsIDB4NDk4YjI4M2MsIDB4OTU0MWZmMGQsIDB4MDE3MTM5YTgsIDB4YjNkZTA4MGMsIDB4ZTQ5Y2Q4YjQsIDB4YzE5MDY0NTYsIDB4ODQ2MTdiY2IsIDB4YjY3MGQ1MzIsIDB4NWM3NDQ4NmMsIDB4NTc0MmQwYjhdO1xuICAgIHZhciBUOCA9IFsweGY0YTc1MDUxLCAweDQxNjU1MzdlLCAweDE3YTRjMzFhLCAweDI3NWU5NjNhLCAweGFiNmJjYjNiLCAweDlkNDVmMTFmLCAweGZhNThhYmFjLCAweGUzMDM5MzRiLCAweDMwZmE1NTIwLCAweDc2NmRmNmFkLCAweGNjNzY5MTg4LCAweDAyNGMyNWY1LCAweGU1ZDdmYzRmLCAweDJhY2JkN2M1LCAweDM1NDQ4MDI2LCAweDYyYTM4ZmI1LCAweGIxNWE0OWRlLCAweGJhMWI2NzI1LCAweGVhMGU5ODQ1LCAweGZlYzBlMTVkLCAweDJmNzUwMmMzLCAweDRjZjAxMjgxLCAweDQ2OTdhMzhkLCAweGQzZjljNjZiLCAweDhmNWZlNzAzLCAweDkyOWM5NTE1LCAweDZkN2FlYmJmLCAweDUyNTlkYTk1LCAweGJlODMyZGQ0LCAweDc0MjFkMzU4LCAweGUwNjkyOTQ5LCAweGM5Yzg0NDhlLCAweGMyODk2YTc1LCAweDhlNzk3OGY0LCAweDU4M2U2Yjk5LCAweGI5NzFkZDI3LCAweGUxNGZiNmJlLCAweDg4YWQxN2YwLCAweDIwYWM2NmM5LCAweGNlM2FiNDdkLCAweGRmNGExODYzLCAweDFhMzE4MmU1LCAweDUxMzM2MDk3LCAweDUzN2Y0NTYyLCAweDY0NzdlMGIxLCAweDZiYWU4NGJiLCAweDgxYTAxY2ZlLCAweDA4MmI5NGY5LCAweDQ4Njg1ODcwLCAweDQ1ZmQxOThmLCAweGRlNmM4Nzk0LCAweDdiZjhiNzUyLCAweDczZDMyM2FiLCAweDRiMDJlMjcyLCAweDFmOGY1N2UzLCAweDU1YWIyYTY2LCAweGViMjgwN2IyLCAweGI1YzIwMzJmLCAweGM1N2I5YTg2LCAweDM3MDhhNWQzLCAweDI4ODdmMjMwLCAweGJmYTViMjIzLCAweDAzNmFiYTAyLCAweDE2ODI1Y2VkLCAweGNmMWMyYjhhLCAweDc5YjQ5MmE3LCAweDA3ZjJmMGYzLCAweDY5ZTJhMTRlLCAweGRhZjRjZDY1LCAweDA1YmVkNTA2LCAweDM0NjIxZmQxLCAweGE2ZmU4YWM0LCAweDJlNTM5ZDM0LCAweGYzNTVhMGEyLCAweDhhZTEzMjA1LCAweGY2ZWI3NWE0LCAweDgzZWMzOTBiLCAweDYwZWZhYTQwLCAweDcxOWYwNjVlLCAweDZlMTA1MWJkLCAweDIxOGFmOTNlLCAweGRkMDYzZDk2LCAweDNlMDVhZWRkLCAweGU2YmQ0NjRkLCAweDU0OGRiNTkxLCAweGM0NWQwNTcxLCAweDA2ZDQ2ZjA0LCAweDUwMTVmZjYwLCAweDk4ZmIyNDE5LCAweGJkZTk5N2Q2LCAweDQwNDNjYzg5LCAweGQ5OWU3NzY3LCAweGU4NDJiZGIwLCAweDg5OGI4ODA3LCAweDE5NWIzOGU3LCAweGM4ZWVkYjc5LCAweDdjMGE0N2ExLCAweDQyMGZlOTdjLCAweDg0MWVjOWY4LCAweDAwMDAwMDAwLCAweDgwODY4MzA5LCAweDJiZWQ0ODMyLCAweDExNzBhYzFlLCAweDVhNzI0ZTZjLCAweDBlZmZmYmZkLCAweDg1Mzg1NjBmLCAweGFlZDUxZTNkLCAweDJkMzkyNzM2LCAweDBmZDk2NDBhLCAweDVjYTYyMTY4LCAweDViNTRkMTliLCAweDM2MmUzYTI0LCAweDBhNjdiMTBjLCAweDU3ZTcwZjkzLCAweGVlOTZkMmI0LCAweDliOTE5ZTFiLCAweGMwYzU0ZjgwLCAweGRjMjBhMjYxLCAweDc3NGI2OTVhLCAweDEyMWExNjFjLCAweDkzYmEwYWUyLCAweGEwMmFlNWMwLCAweDIyZTA0MzNjLCAweDFiMTcxZDEyLCAweDA5MGQwYjBlLCAweDhiYzdhZGYyLCAweGI2YThiOTJkLCAweDFlYTljODE0LCAweGYxMTk4NTU3LCAweDc1MDc0Y2FmLCAweDk5ZGRiYmVlLCAweDdmNjBmZGEzLCAweDAxMjY5ZmY3LCAweDcyZjViYzVjLCAweDY2M2JjNTQ0LCAweGZiN2UzNDViLCAweDQzMjk3NjhiLCAweDIzYzZkY2NiLCAweGVkZmM2OGI2LCAweGU0ZjE2M2I4LCAweDMxZGNjYWQ3LCAweDYzODUxMDQyLCAweDk3MjI0MDEzLCAweGM2MTEyMDg0LCAweDRhMjQ3ZDg1LCAweGJiM2RmOGQyLCAweGY5MzIxMWFlLCAweDI5YTE2ZGM3LCAweDllMmY0YjFkLCAweGIyMzBmM2RjLCAweDg2NTJlYzBkLCAweGMxZTNkMDc3LCAweGIzMTY2YzJiLCAweDcwYjk5OWE5LCAweDk0NDhmYTExLCAweGU5NjQyMjQ3LCAweGZjOGNjNGE4LCAweGYwM2YxYWEwLCAweDdkMmNkODU2LCAweDMzOTBlZjIyLCAweDQ5NGVjNzg3LCAweDM4ZDFjMWQ5LCAweGNhYTJmZThjLCAweGQ0MGIzNjk4LCAweGY1ODFjZmE2LCAweDdhZGUyOGE1LCAweGI3OGUyNmRhLCAweGFkYmZhNDNmLCAweDNhOWRlNDJjLCAweDc4OTIwZDUwLCAweDVmY2M5YjZhLCAweDdlNDY2MjU0LCAweDhkMTNjMmY2LCAweGQ4YjhlODkwLCAweDM5Zjc1ZTJlLCAweGMzYWZmNTgyLCAweDVkODBiZTlmLCAweGQwOTM3YzY5LCAweGQ1MmRhOTZmLCAweDI1MTJiM2NmLCAweGFjOTkzYmM4LCAweDE4N2RhNzEwLCAweDljNjM2ZWU4LCAweDNiYmI3YmRiLCAweDI2NzgwOWNkLCAweDU5MThmNDZlLCAweDlhYjcwMWVjLCAweDRmOWFhODgzLCAweDk1NmU2NWU2LCAweGZmZTY3ZWFhLCAweGJjY2YwODIxLCAweDE1ZThlNmVmLCAweGU3OWJkOWJhLCAweDZmMzZjZTRhLCAweDlmMDlkNGVhLCAweGIwN2NkNjI5LCAweGE0YjJhZjMxLCAweDNmMjMzMTJhLCAweGE1OTQzMGM2LCAweGEyNjZjMDM1LCAweDRlYmMzNzc0LCAweDgyY2FhNmZjLCAweDkwZDBiMGUwLCAweGE3ZDgxNTMzLCAweDA0OTg0YWYxLCAweGVjZGFmNzQxLCAweGNkNTAwZTdmLCAweDkxZjYyZjE3LCAweDRkZDY4ZDc2LCAweGVmYjA0ZDQzLCAweGFhNGQ1NGNjLCAweDk2MDRkZmU0LCAweGQxYjVlMzllLCAweDZhODgxYjRjLCAweDJjMWZiOGMxLCAweDY1NTE3ZjQ2LCAweDVlZWEwNDlkLCAweDhjMzU1ZDAxLCAweDg3NzQ3M2ZhLCAweDBiNDEyZWZiLCAweDY3MWQ1YWIzLCAweGRiZDI1MjkyLCAweDEwNTYzM2U5LCAweGQ2NDcxMzZkLCAweGQ3NjE4YzlhLCAweGExMGM3YTM3LCAweGY4MTQ4ZTU5LCAweDEzM2M4OWViLCAweGE5MjdlZWNlLCAweDYxYzkzNWI3LCAweDFjZTVlZGUxLCAweDQ3YjEzYzdhLCAweGQyZGY1OTljLCAweGYyNzMzZjU1LCAweDE0Y2U3OTE4LCAweGM3MzdiZjczLCAweGY3Y2RlYTUzLCAweGZkYWE1YjVmLCAweDNkNmYxNGRmLCAweDQ0ZGI4Njc4LCAweGFmZjM4MWNhLCAweDY4YzQzZWI5LCAweDI0MzQyYzM4LCAweGEzNDA1ZmMyLCAweDFkYzM3MjE2LCAweGUyMjUwY2JjLCAweDNjNDk4YjI4LCAweDBkOTU0MWZmLCAweGE4MDE3MTM5LCAweDBjYjNkZTA4LCAweGI0ZTQ5Y2Q4LCAweDU2YzE5MDY0LCAweGNiODQ2MTdiLCAweDMyYjY3MGQ1LCAweDZjNWM3NDQ4LCAweGI4NTc0MmQwXTtcblxuICAgIC8vIFRyYW5zZm9ybWF0aW9ucyBmb3IgZGVjcnlwdGlvbiBrZXkgZXhwYW5zaW9uXG4gICAgdmFyIFUxID0gWzB4MDAwMDAwMDAsIDB4MGUwOTBkMGIsIDB4MWMxMjFhMTYsIDB4MTIxYjE3MWQsIDB4MzgyNDM0MmMsIDB4MzYyZDM5MjcsIDB4MjQzNjJlM2EsIDB4MmEzZjIzMzEsIDB4NzA0ODY4NTgsIDB4N2U0MTY1NTMsIDB4NmM1YTcyNGUsIDB4NjI1MzdmNDUsIDB4NDg2YzVjNzQsIDB4NDY2NTUxN2YsIDB4NTQ3ZTQ2NjIsIDB4NWE3NzRiNjksIDB4ZTA5MGQwYjAsIDB4ZWU5OWRkYmIsIDB4ZmM4MmNhYTYsIDB4ZjI4YmM3YWQsIDB4ZDhiNGU0OWMsIDB4ZDZiZGU5OTcsIDB4YzRhNmZlOGEsIDB4Y2FhZmYzODEsIDB4OTBkOGI4ZTgsIDB4OWVkMWI1ZTMsIDB4OGNjYWEyZmUsIDB4ODJjM2FmZjUsIDB4YThmYzhjYzQsIDB4YTZmNTgxY2YsIDB4YjRlZTk2ZDIsIDB4YmFlNzliZDksIDB4ZGIzYmJiN2IsIDB4ZDUzMmI2NzAsIDB4YzcyOWExNmQsIDB4YzkyMGFjNjYsIDB4ZTMxZjhmNTcsIDB4ZWQxNjgyNWMsIDB4ZmYwZDk1NDEsIDB4ZjEwNDk4NGEsIDB4YWI3M2QzMjMsIDB4YTU3YWRlMjgsIDB4Yjc2MWM5MzUsIDB4Yjk2OGM0M2UsIDB4OTM1N2U3MGYsIDB4OWQ1ZWVhMDQsIDB4OGY0NWZkMTksIDB4ODE0Y2YwMTIsIDB4M2JhYjZiY2IsIDB4MzVhMjY2YzAsIDB4MjdiOTcxZGQsIDB4MjliMDdjZDYsIDB4MDM4ZjVmZTcsIDB4MGQ4NjUyZWMsIDB4MWY5ZDQ1ZjEsIDB4MTE5NDQ4ZmEsIDB4NGJlMzAzOTMsIDB4NDVlYTBlOTgsIDB4NTdmMTE5ODUsIDB4NTlmODE0OGUsIDB4NzNjNzM3YmYsIDB4N2RjZTNhYjQsIDB4NmZkNTJkYTksIDB4NjFkYzIwYTIsIDB4YWQ3NjZkZjYsIDB4YTM3ZjYwZmQsIDB4YjE2NDc3ZTAsIDB4YmY2ZDdhZWIsIDB4OTU1MjU5ZGEsIDB4OWI1YjU0ZDEsIDB4ODk0MDQzY2MsIDB4ODc0OTRlYzcsIDB4ZGQzZTA1YWUsIDB4ZDMzNzA4YTUsIDB4YzEyYzFmYjgsIDB4Y2YyNTEyYjMsIDB4ZTUxYTMxODIsIDB4ZWIxMzNjODksIDB4ZjkwODJiOTQsIDB4ZjcwMTI2OWYsIDB4NGRlNmJkNDYsIDB4NDNlZmIwNGQsIDB4NTFmNGE3NTAsIDB4NWZmZGFhNWIsIDB4NzVjMjg5NmEsIDB4N2JjYjg0NjEsIDB4NjlkMDkzN2MsIDB4NjdkOTllNzcsIDB4M2RhZWQ1MWUsIDB4MzNhN2Q4MTUsIDB4MjFiY2NmMDgsIDB4MmZiNWMyMDMsIDB4MDU4YWUxMzIsIDB4MGI4M2VjMzksIDB4MTk5OGZiMjQsIDB4MTc5MWY2MmYsIDB4NzY0ZGQ2OGQsIDB4Nzg0NGRiODYsIDB4NmE1ZmNjOWIsIDB4NjQ1NmMxOTAsIDB4NGU2OWUyYTEsIDB4NDA2MGVmYWEsIDB4NTI3YmY4YjcsIDB4NWM3MmY1YmMsIDB4MDYwNWJlZDUsIDB4MDgwY2IzZGUsIDB4MWExN2E0YzMsIDB4MTQxZWE5YzgsIDB4M2UyMThhZjksIDB4MzAyODg3ZjIsIDB4MjIzMzkwZWYsIDB4MmMzYTlkZTQsIDB4OTZkZDA2M2QsIDB4OThkNDBiMzYsIDB4OGFjZjFjMmIsIDB4ODRjNjExMjAsIDB4YWVmOTMyMTEsIDB4YTBmMDNmMWEsIDB4YjJlYjI4MDcsIDB4YmNlMjI1MGMsIDB4ZTY5NTZlNjUsIDB4ZTg5YzYzNmUsIDB4ZmE4Nzc0NzMsIDB4ZjQ4ZTc5NzgsIDB4ZGViMTVhNDksIDB4ZDBiODU3NDIsIDB4YzJhMzQwNWYsIDB4Y2NhYTRkNTQsIDB4NDFlY2RhZjcsIDB4NGZlNWQ3ZmMsIDB4NWRmZWMwZTEsIDB4NTNmN2NkZWEsIDB4NzljOGVlZGIsIDB4NzdjMWUzZDAsIDB4NjVkYWY0Y2QsIDB4NmJkM2Y5YzYsIDB4MzFhNGIyYWYsIDB4M2ZhZGJmYTQsIDB4MmRiNmE4YjksIDB4MjNiZmE1YjIsIDB4MDk4MDg2ODMsIDB4MDc4OThiODgsIDB4MTU5MjljOTUsIDB4MWI5YjkxOWUsIDB4YTE3YzBhNDcsIDB4YWY3NTA3NGMsIDB4YmQ2ZTEwNTEsIDB4YjM2NzFkNWEsIDB4OTk1ODNlNmIsIDB4OTc1MTMzNjAsIDB4ODU0YTI0N2QsIDB4OGI0MzI5NzYsIDB4ZDEzNDYyMWYsIDB4ZGYzZDZmMTQsIDB4Y2QyNjc4MDksIDB4YzMyZjc1MDIsIDB4ZTkxMDU2MzMsIDB4ZTcxOTViMzgsIDB4ZjUwMjRjMjUsIDB4ZmIwYjQxMmUsIDB4OWFkNzYxOGMsIDB4OTRkZTZjODcsIDB4ODZjNTdiOWEsIDB4ODhjYzc2OTEsIDB4YTJmMzU1YTAsIDB4YWNmYTU4YWIsIDB4YmVlMTRmYjYsIDB4YjBlODQyYmQsIDB4ZWE5ZjA5ZDQsIDB4ZTQ5NjA0ZGYsIDB4ZjY4ZDEzYzIsIDB4Zjg4NDFlYzksIDB4ZDJiYjNkZjgsIDB4ZGNiMjMwZjMsIDB4Y2VhOTI3ZWUsIDB4YzBhMDJhZTUsIDB4N2E0N2IxM2MsIDB4NzQ0ZWJjMzcsIDB4NjY1NWFiMmEsIDB4Njg1Y2E2MjEsIDB4NDI2Mzg1MTAsIDB4NGM2YTg4MWIsIDB4NWU3MTlmMDYsIDB4NTA3ODkyMGQsIDB4MGEwZmQ5NjQsIDB4MDQwNmQ0NmYsIDB4MTYxZGMzNzIsIDB4MTgxNGNlNzksIDB4MzIyYmVkNDgsIDB4M2MyMmUwNDMsIDB4MmUzOWY3NWUsIDB4MjAzMGZhNTUsIDB4ZWM5YWI3MDEsIDB4ZTI5M2JhMGEsIDB4ZjA4OGFkMTcsIDB4ZmU4MWEwMWMsIDB4ZDRiZTgzMmQsIDB4ZGFiNzhlMjYsIDB4YzhhYzk5M2IsIDB4YzZhNTk0MzAsIDB4OWNkMmRmNTksIDB4OTJkYmQyNTIsIDB4ODBjMGM1NGYsIDB4OGVjOWM4NDQsIDB4YTRmNmViNzUsIDB4YWFmZmU2N2UsIDB4YjhlNGYxNjMsIDB4YjZlZGZjNjgsIDB4MGMwYTY3YjEsIDB4MDIwMzZhYmEsIDB4MTAxODdkYTcsIDB4MWUxMTcwYWMsIDB4MzQyZTUzOWQsIDB4M2EyNzVlOTYsIDB4MjgzYzQ5OGIsIDB4MjYzNTQ0ODAsIDB4N2M0MjBmZTksIDB4NzI0YjAyZTIsIDB4NjA1MDE1ZmYsIDB4NmU1OTE4ZjQsIDB4NDQ2NjNiYzUsIDB4NGE2ZjM2Y2UsIDB4NTg3NDIxZDMsIDB4NTY3ZDJjZDgsIDB4MzdhMTBjN2EsIDB4MzlhODAxNzEsIDB4MmJiMzE2NmMsIDB4MjViYTFiNjcsIDB4MGY4NTM4NTYsIDB4MDE4YzM1NWQsIDB4MTM5NzIyNDAsIDB4MWQ5ZTJmNGIsIDB4NDdlOTY0MjIsIDB4NDllMDY5MjksIDB4NWJmYjdlMzQsIDB4NTVmMjczM2YsIDB4N2ZjZDUwMGUsIDB4NzFjNDVkMDUsIDB4NjNkZjRhMTgsIDB4NmRkNjQ3MTMsIDB4ZDczMWRjY2EsIDB4ZDkzOGQxYzEsIDB4Y2IyM2M2ZGMsIDB4YzUyYWNiZDcsIDB4ZWYxNWU4ZTYsIDB4ZTExY2U1ZWQsIDB4ZjMwN2YyZjAsIDB4ZmQwZWZmZmIsIDB4YTc3OWI0OTIsIDB4YTk3MGI5OTksIDB4YmI2YmFlODQsIDB4YjU2MmEzOGYsIDB4OWY1ZDgwYmUsIDB4OTE1NDhkYjUsIDB4ODM0ZjlhYTgsIDB4OGQ0Njk3YTNdO1xuICAgIHZhciBVMiA9IFsweDAwMDAwMDAwLCAweDBiMGUwOTBkLCAweDE2MWMxMjFhLCAweDFkMTIxYjE3LCAweDJjMzgyNDM0LCAweDI3MzYyZDM5LCAweDNhMjQzNjJlLCAweDMxMmEzZjIzLCAweDU4NzA0ODY4LCAweDUzN2U0MTY1LCAweDRlNmM1YTcyLCAweDQ1NjI1MzdmLCAweDc0NDg2YzVjLCAweDdmNDY2NTUxLCAweDYyNTQ3ZTQ2LCAweDY5NWE3NzRiLCAweGIwZTA5MGQwLCAweGJiZWU5OWRkLCAweGE2ZmM4MmNhLCAweGFkZjI4YmM3LCAweDljZDhiNGU0LCAweDk3ZDZiZGU5LCAweDhhYzRhNmZlLCAweDgxY2FhZmYzLCAweGU4OTBkOGI4LCAweGUzOWVkMWI1LCAweGZlOGNjYWEyLCAweGY1ODJjM2FmLCAweGM0YThmYzhjLCAweGNmYTZmNTgxLCAweGQyYjRlZTk2LCAweGQ5YmFlNzliLCAweDdiZGIzYmJiLCAweDcwZDUzMmI2LCAweDZkYzcyOWExLCAweDY2YzkyMGFjLCAweDU3ZTMxZjhmLCAweDVjZWQxNjgyLCAweDQxZmYwZDk1LCAweDRhZjEwNDk4LCAweDIzYWI3M2QzLCAweDI4YTU3YWRlLCAweDM1Yjc2MWM5LCAweDNlYjk2OGM0LCAweDBmOTM1N2U3LCAweDA0OWQ1ZWVhLCAweDE5OGY0NWZkLCAweDEyODE0Y2YwLCAweGNiM2JhYjZiLCAweGMwMzVhMjY2LCAweGRkMjdiOTcxLCAweGQ2MjliMDdjLCAweGU3MDM4ZjVmLCAweGVjMGQ4NjUyLCAweGYxMWY5ZDQ1LCAweGZhMTE5NDQ4LCAweDkzNGJlMzAzLCAweDk4NDVlYTBlLCAweDg1NTdmMTE5LCAweDhlNTlmODE0LCAweGJmNzNjNzM3LCAweGI0N2RjZTNhLCAweGE5NmZkNTJkLCAweGEyNjFkYzIwLCAweGY2YWQ3NjZkLCAweGZkYTM3ZjYwLCAweGUwYjE2NDc3LCAweGViYmY2ZDdhLCAweGRhOTU1MjU5LCAweGQxOWI1YjU0LCAweGNjODk0MDQzLCAweGM3ODc0OTRlLCAweGFlZGQzZTA1LCAweGE1ZDMzNzA4LCAweGI4YzEyYzFmLCAweGIzY2YyNTEyLCAweDgyZTUxYTMxLCAweDg5ZWIxMzNjLCAweDk0ZjkwODJiLCAweDlmZjcwMTI2LCAweDQ2NGRlNmJkLCAweDRkNDNlZmIwLCAweDUwNTFmNGE3LCAweDViNWZmZGFhLCAweDZhNzVjMjg5LCAweDYxN2JjYjg0LCAweDdjNjlkMDkzLCAweDc3NjdkOTllLCAweDFlM2RhZWQ1LCAweDE1MzNhN2Q4LCAweDA4MjFiY2NmLCAweDAzMmZiNWMyLCAweDMyMDU4YWUxLCAweDM5MGI4M2VjLCAweDI0MTk5OGZiLCAweDJmMTc5MWY2LCAweDhkNzY0ZGQ2LCAweDg2Nzg0NGRiLCAweDliNmE1ZmNjLCAweDkwNjQ1NmMxLCAweGExNGU2OWUyLCAweGFhNDA2MGVmLCAweGI3NTI3YmY4LCAweGJjNWM3MmY1LCAweGQ1MDYwNWJlLCAweGRlMDgwY2IzLCAweGMzMWExN2E0LCAweGM4MTQxZWE5LCAweGY5M2UyMThhLCAweGYyMzAyODg3LCAweGVmMjIzMzkwLCAweGU0MmMzYTlkLCAweDNkOTZkZDA2LCAweDM2OThkNDBiLCAweDJiOGFjZjFjLCAweDIwODRjNjExLCAweDExYWVmOTMyLCAweDFhYTBmMDNmLCAweDA3YjJlYjI4LCAweDBjYmNlMjI1LCAweDY1ZTY5NTZlLCAweDZlZTg5YzYzLCAweDczZmE4Nzc0LCAweDc4ZjQ4ZTc5LCAweDQ5ZGViMTVhLCAweDQyZDBiODU3LCAweDVmYzJhMzQwLCAweDU0Y2NhYTRkLCAweGY3NDFlY2RhLCAweGZjNGZlNWQ3LCAweGUxNWRmZWMwLCAweGVhNTNmN2NkLCAweGRiNzljOGVlLCAweGQwNzdjMWUzLCAweGNkNjVkYWY0LCAweGM2NmJkM2Y5LCAweGFmMzFhNGIyLCAweGE0M2ZhZGJmLCAweGI5MmRiNmE4LCAweGIyMjNiZmE1LCAweDgzMDk4MDg2LCAweDg4MDc4OThiLCAweDk1MTU5MjljLCAweDllMWI5YjkxLCAweDQ3YTE3YzBhLCAweDRjYWY3NTA3LCAweDUxYmQ2ZTEwLCAweDVhYjM2NzFkLCAweDZiOTk1ODNlLCAweDYwOTc1MTMzLCAweDdkODU0YTI0LCAweDc2OGI0MzI5LCAweDFmZDEzNDYyLCAweDE0ZGYzZDZmLCAweDA5Y2QyNjc4LCAweDAyYzMyZjc1LCAweDMzZTkxMDU2LCAweDM4ZTcxOTViLCAweDI1ZjUwMjRjLCAweDJlZmIwYjQxLCAweDhjOWFkNzYxLCAweDg3OTRkZTZjLCAweDlhODZjNTdiLCAweDkxODhjYzc2LCAweGEwYTJmMzU1LCAweGFiYWNmYTU4LCAweGI2YmVlMTRmLCAweGJkYjBlODQyLCAweGQ0ZWE5ZjA5LCAweGRmZTQ5NjA0LCAweGMyZjY4ZDEzLCAweGM5Zjg4NDFlLCAweGY4ZDJiYjNkLCAweGYzZGNiMjMwLCAweGVlY2VhOTI3LCAweGU1YzBhMDJhLCAweDNjN2E0N2IxLCAweDM3NzQ0ZWJjLCAweDJhNjY1NWFiLCAweDIxNjg1Y2E2LCAweDEwNDI2Mzg1LCAweDFiNGM2YTg4LCAweDA2NWU3MTlmLCAweDBkNTA3ODkyLCAweDY0MGEwZmQ5LCAweDZmMDQwNmQ0LCAweDcyMTYxZGMzLCAweDc5MTgxNGNlLCAweDQ4MzIyYmVkLCAweDQzM2MyMmUwLCAweDVlMmUzOWY3LCAweDU1MjAzMGZhLCAweDAxZWM5YWI3LCAweDBhZTI5M2JhLCAweDE3ZjA4OGFkLCAweDFjZmU4MWEwLCAweDJkZDRiZTgzLCAweDI2ZGFiNzhlLCAweDNiYzhhYzk5LCAweDMwYzZhNTk0LCAweDU5OWNkMmRmLCAweDUyOTJkYmQyLCAweDRmODBjMGM1LCAweDQ0OGVjOWM4LCAweDc1YTRmNmViLCAweDdlYWFmZmU2LCAweDYzYjhlNGYxLCAweDY4YjZlZGZjLCAweGIxMGMwYTY3LCAweGJhMDIwMzZhLCAweGE3MTAxODdkLCAweGFjMWUxMTcwLCAweDlkMzQyZTUzLCAweDk2M2EyNzVlLCAweDhiMjgzYzQ5LCAweDgwMjYzNTQ0LCAweGU5N2M0MjBmLCAweGUyNzI0YjAyLCAweGZmNjA1MDE1LCAweGY0NmU1OTE4LCAweGM1NDQ2NjNiLCAweGNlNGE2ZjM2LCAweGQzNTg3NDIxLCAweGQ4NTY3ZDJjLCAweDdhMzdhMTBjLCAweDcxMzlhODAxLCAweDZjMmJiMzE2LCAweDY3MjViYTFiLCAweDU2MGY4NTM4LCAweDVkMDE4YzM1LCAweDQwMTM5NzIyLCAweDRiMWQ5ZTJmLCAweDIyNDdlOTY0LCAweDI5NDllMDY5LCAweDM0NWJmYjdlLCAweDNmNTVmMjczLCAweDBlN2ZjZDUwLCAweDA1NzFjNDVkLCAweDE4NjNkZjRhLCAweDEzNmRkNjQ3LCAweGNhZDczMWRjLCAweGMxZDkzOGQxLCAweGRjY2IyM2M2LCAweGQ3YzUyYWNiLCAweGU2ZWYxNWU4LCAweGVkZTExY2U1LCAweGYwZjMwN2YyLCAweGZiZmQwZWZmLCAweDkyYTc3OWI0LCAweDk5YTk3MGI5LCAweDg0YmI2YmFlLCAweDhmYjU2MmEzLCAweGJlOWY1ZDgwLCAweGI1OTE1NDhkLCAweGE4ODM0ZjlhLCAweGEzOGQ0Njk3XTtcbiAgICB2YXIgVTMgPSBbMHgwMDAwMDAwMCwgMHgwZDBiMGUwOSwgMHgxYTE2MWMxMiwgMHgxNzFkMTIxYiwgMHgzNDJjMzgyNCwgMHgzOTI3MzYyZCwgMHgyZTNhMjQzNiwgMHgyMzMxMmEzZiwgMHg2ODU4NzA0OCwgMHg2NTUzN2U0MSwgMHg3MjRlNmM1YSwgMHg3ZjQ1NjI1MywgMHg1Yzc0NDg2YywgMHg1MTdmNDY2NSwgMHg0NjYyNTQ3ZSwgMHg0YjY5NWE3NywgMHhkMGIwZTA5MCwgMHhkZGJiZWU5OSwgMHhjYWE2ZmM4MiwgMHhjN2FkZjI4YiwgMHhlNDljZDhiNCwgMHhlOTk3ZDZiZCwgMHhmZThhYzRhNiwgMHhmMzgxY2FhZiwgMHhiOGU4OTBkOCwgMHhiNWUzOWVkMSwgMHhhMmZlOGNjYSwgMHhhZmY1ODJjMywgMHg4Y2M0YThmYywgMHg4MWNmYTZmNSwgMHg5NmQyYjRlZSwgMHg5YmQ5YmFlNywgMHhiYjdiZGIzYiwgMHhiNjcwZDUzMiwgMHhhMTZkYzcyOSwgMHhhYzY2YzkyMCwgMHg4ZjU3ZTMxZiwgMHg4MjVjZWQxNiwgMHg5NTQxZmYwZCwgMHg5ODRhZjEwNCwgMHhkMzIzYWI3MywgMHhkZTI4YTU3YSwgMHhjOTM1Yjc2MSwgMHhjNDNlYjk2OCwgMHhlNzBmOTM1NywgMHhlYTA0OWQ1ZSwgMHhmZDE5OGY0NSwgMHhmMDEyODE0YywgMHg2YmNiM2JhYiwgMHg2NmMwMzVhMiwgMHg3MWRkMjdiOSwgMHg3Y2Q2MjliMCwgMHg1ZmU3MDM4ZiwgMHg1MmVjMGQ4NiwgMHg0NWYxMWY5ZCwgMHg0OGZhMTE5NCwgMHgwMzkzNGJlMywgMHgwZTk4NDVlYSwgMHgxOTg1NTdmMSwgMHgxNDhlNTlmOCwgMHgzN2JmNzNjNywgMHgzYWI0N2RjZSwgMHgyZGE5NmZkNSwgMHgyMGEyNjFkYywgMHg2ZGY2YWQ3NiwgMHg2MGZkYTM3ZiwgMHg3N2UwYjE2NCwgMHg3YWViYmY2ZCwgMHg1OWRhOTU1MiwgMHg1NGQxOWI1YiwgMHg0M2NjODk0MCwgMHg0ZWM3ODc0OSwgMHgwNWFlZGQzZSwgMHgwOGE1ZDMzNywgMHgxZmI4YzEyYywgMHgxMmIzY2YyNSwgMHgzMTgyZTUxYSwgMHgzYzg5ZWIxMywgMHgyYjk0ZjkwOCwgMHgyNjlmZjcwMSwgMHhiZDQ2NGRlNiwgMHhiMDRkNDNlZiwgMHhhNzUwNTFmNCwgMHhhYTViNWZmZCwgMHg4OTZhNzVjMiwgMHg4NDYxN2JjYiwgMHg5MzdjNjlkMCwgMHg5ZTc3NjdkOSwgMHhkNTFlM2RhZSwgMHhkODE1MzNhNywgMHhjZjA4MjFiYywgMHhjMjAzMmZiNSwgMHhlMTMyMDU4YSwgMHhlYzM5MGI4MywgMHhmYjI0MTk5OCwgMHhmNjJmMTc5MSwgMHhkNjhkNzY0ZCwgMHhkYjg2Nzg0NCwgMHhjYzliNmE1ZiwgMHhjMTkwNjQ1NiwgMHhlMmExNGU2OSwgMHhlZmFhNDA2MCwgMHhmOGI3NTI3YiwgMHhmNWJjNWM3MiwgMHhiZWQ1MDYwNSwgMHhiM2RlMDgwYywgMHhhNGMzMWExNywgMHhhOWM4MTQxZSwgMHg4YWY5M2UyMSwgMHg4N2YyMzAyOCwgMHg5MGVmMjIzMywgMHg5ZGU0MmMzYSwgMHgwNjNkOTZkZCwgMHgwYjM2OThkNCwgMHgxYzJiOGFjZiwgMHgxMTIwODRjNiwgMHgzMjExYWVmOSwgMHgzZjFhYTBmMCwgMHgyODA3YjJlYiwgMHgyNTBjYmNlMiwgMHg2ZTY1ZTY5NSwgMHg2MzZlZTg5YywgMHg3NDczZmE4NywgMHg3OTc4ZjQ4ZSwgMHg1YTQ5ZGViMSwgMHg1NzQyZDBiOCwgMHg0MDVmYzJhMywgMHg0ZDU0Y2NhYSwgMHhkYWY3NDFlYywgMHhkN2ZjNGZlNSwgMHhjMGUxNWRmZSwgMHhjZGVhNTNmNywgMHhlZWRiNzljOCwgMHhlM2QwNzdjMSwgMHhmNGNkNjVkYSwgMHhmOWM2NmJkMywgMHhiMmFmMzFhNCwgMHhiZmE0M2ZhZCwgMHhhOGI5MmRiNiwgMHhhNWIyMjNiZiwgMHg4NjgzMDk4MCwgMHg4Yjg4MDc4OSwgMHg5Yzk1MTU5MiwgMHg5MTllMWI5YiwgMHgwYTQ3YTE3YywgMHgwNzRjYWY3NSwgMHgxMDUxYmQ2ZSwgMHgxZDVhYjM2NywgMHgzZTZiOTk1OCwgMHgzMzYwOTc1MSwgMHgyNDdkODU0YSwgMHgyOTc2OGI0MywgMHg2MjFmZDEzNCwgMHg2ZjE0ZGYzZCwgMHg3ODA5Y2QyNiwgMHg3NTAyYzMyZiwgMHg1NjMzZTkxMCwgMHg1YjM4ZTcxOSwgMHg0YzI1ZjUwMiwgMHg0MTJlZmIwYiwgMHg2MThjOWFkNywgMHg2Yzg3OTRkZSwgMHg3YjlhODZjNSwgMHg3NjkxODhjYywgMHg1NWEwYTJmMywgMHg1OGFiYWNmYSwgMHg0ZmI2YmVlMSwgMHg0MmJkYjBlOCwgMHgwOWQ0ZWE5ZiwgMHgwNGRmZTQ5NiwgMHgxM2MyZjY4ZCwgMHgxZWM5Zjg4NCwgMHgzZGY4ZDJiYiwgMHgzMGYzZGNiMiwgMHgyN2VlY2VhOSwgMHgyYWU1YzBhMCwgMHhiMTNjN2E0NywgMHhiYzM3NzQ0ZSwgMHhhYjJhNjY1NSwgMHhhNjIxNjg1YywgMHg4NTEwNDI2MywgMHg4ODFiNGM2YSwgMHg5ZjA2NWU3MSwgMHg5MjBkNTA3OCwgMHhkOTY0MGEwZiwgMHhkNDZmMDQwNiwgMHhjMzcyMTYxZCwgMHhjZTc5MTgxNCwgMHhlZDQ4MzIyYiwgMHhlMDQzM2MyMiwgMHhmNzVlMmUzOSwgMHhmYTU1MjAzMCwgMHhiNzAxZWM5YSwgMHhiYTBhZTI5MywgMHhhZDE3ZjA4OCwgMHhhMDFjZmU4MSwgMHg4MzJkZDRiZSwgMHg4ZTI2ZGFiNywgMHg5OTNiYzhhYywgMHg5NDMwYzZhNSwgMHhkZjU5OWNkMiwgMHhkMjUyOTJkYiwgMHhjNTRmODBjMCwgMHhjODQ0OGVjOSwgMHhlYjc1YTRmNiwgMHhlNjdlYWFmZiwgMHhmMTYzYjhlNCwgMHhmYzY4YjZlZCwgMHg2N2IxMGMwYSwgMHg2YWJhMDIwMywgMHg3ZGE3MTAxOCwgMHg3MGFjMWUxMSwgMHg1MzlkMzQyZSwgMHg1ZTk2M2EyNywgMHg0OThiMjgzYywgMHg0NDgwMjYzNSwgMHgwZmU5N2M0MiwgMHgwMmUyNzI0YiwgMHgxNWZmNjA1MCwgMHgxOGY0NmU1OSwgMHgzYmM1NDQ2NiwgMHgzNmNlNGE2ZiwgMHgyMWQzNTg3NCwgMHgyY2Q4NTY3ZCwgMHgwYzdhMzdhMSwgMHgwMTcxMzlhOCwgMHgxNjZjMmJiMywgMHgxYjY3MjViYSwgMHgzODU2MGY4NSwgMHgzNTVkMDE4YywgMHgyMjQwMTM5NywgMHgyZjRiMWQ5ZSwgMHg2NDIyNDdlOSwgMHg2OTI5NDllMCwgMHg3ZTM0NWJmYiwgMHg3MzNmNTVmMiwgMHg1MDBlN2ZjZCwgMHg1ZDA1NzFjNCwgMHg0YTE4NjNkZiwgMHg0NzEzNmRkNiwgMHhkY2NhZDczMSwgMHhkMWMxZDkzOCwgMHhjNmRjY2IyMywgMHhjYmQ3YzUyYSwgMHhlOGU2ZWYxNSwgMHhlNWVkZTExYywgMHhmMmYwZjMwNywgMHhmZmZiZmQwZSwgMHhiNDkyYTc3OSwgMHhiOTk5YTk3MCwgMHhhZTg0YmI2YiwgMHhhMzhmYjU2MiwgMHg4MGJlOWY1ZCwgMHg4ZGI1OTE1NCwgMHg5YWE4ODM0ZiwgMHg5N2EzOGQ0Nl07XG4gICAgdmFyIFU0ID0gWzB4MDAwMDAwMDAsIDB4MDkwZDBiMGUsIDB4MTIxYTE2MWMsIDB4MWIxNzFkMTIsIDB4MjQzNDJjMzgsIDB4MmQzOTI3MzYsIDB4MzYyZTNhMjQsIDB4M2YyMzMxMmEsIDB4NDg2ODU4NzAsIDB4NDE2NTUzN2UsIDB4NWE3MjRlNmMsIDB4NTM3ZjQ1NjIsIDB4NmM1Yzc0NDgsIDB4NjU1MTdmNDYsIDB4N2U0NjYyNTQsIDB4Nzc0YjY5NWEsIDB4OTBkMGIwZTAsIDB4OTlkZGJiZWUsIDB4ODJjYWE2ZmMsIDB4OGJjN2FkZjIsIDB4YjRlNDljZDgsIDB4YmRlOTk3ZDYsIDB4YTZmZThhYzQsIDB4YWZmMzgxY2EsIDB4ZDhiOGU4OTAsIDB4ZDFiNWUzOWUsIDB4Y2FhMmZlOGMsIDB4YzNhZmY1ODIsIDB4ZmM4Y2M0YTgsIDB4ZjU4MWNmYTYsIDB4ZWU5NmQyYjQsIDB4ZTc5YmQ5YmEsIDB4M2JiYjdiZGIsIDB4MzJiNjcwZDUsIDB4MjlhMTZkYzcsIDB4MjBhYzY2YzksIDB4MWY4ZjU3ZTMsIDB4MTY4MjVjZWQsIDB4MGQ5NTQxZmYsIDB4MDQ5ODRhZjEsIDB4NzNkMzIzYWIsIDB4N2FkZTI4YTUsIDB4NjFjOTM1YjcsIDB4NjhjNDNlYjksIDB4NTdlNzBmOTMsIDB4NWVlYTA0OWQsIDB4NDVmZDE5OGYsIDB4NGNmMDEyODEsIDB4YWI2YmNiM2IsIDB4YTI2NmMwMzUsIDB4Yjk3MWRkMjcsIDB4YjA3Y2Q2MjksIDB4OGY1ZmU3MDMsIDB4ODY1MmVjMGQsIDB4OWQ0NWYxMWYsIDB4OTQ0OGZhMTEsIDB4ZTMwMzkzNGIsIDB4ZWEwZTk4NDUsIDB4ZjExOTg1NTcsIDB4ZjgxNDhlNTksIDB4YzczN2JmNzMsIDB4Y2UzYWI0N2QsIDB4ZDUyZGE5NmYsIDB4ZGMyMGEyNjEsIDB4NzY2ZGY2YWQsIDB4N2Y2MGZkYTMsIDB4NjQ3N2UwYjEsIDB4NmQ3YWViYmYsIDB4NTI1OWRhOTUsIDB4NWI1NGQxOWIsIDB4NDA0M2NjODksIDB4NDk0ZWM3ODcsIDB4M2UwNWFlZGQsIDB4MzcwOGE1ZDMsIDB4MmMxZmI4YzEsIDB4MjUxMmIzY2YsIDB4MWEzMTgyZTUsIDB4MTMzYzg5ZWIsIDB4MDgyYjk0ZjksIDB4MDEyNjlmZjcsIDB4ZTZiZDQ2NGQsIDB4ZWZiMDRkNDMsIDB4ZjRhNzUwNTEsIDB4ZmRhYTViNWYsIDB4YzI4OTZhNzUsIDB4Y2I4NDYxN2IsIDB4ZDA5MzdjNjksIDB4ZDk5ZTc3NjcsIDB4YWVkNTFlM2QsIDB4YTdkODE1MzMsIDB4YmNjZjA4MjEsIDB4YjVjMjAzMmYsIDB4OGFlMTMyMDUsIDB4ODNlYzM5MGIsIDB4OThmYjI0MTksIDB4OTFmNjJmMTcsIDB4NGRkNjhkNzYsIDB4NDRkYjg2NzgsIDB4NWZjYzliNmEsIDB4NTZjMTkwNjQsIDB4NjllMmExNGUsIDB4NjBlZmFhNDAsIDB4N2JmOGI3NTIsIDB4NzJmNWJjNWMsIDB4MDViZWQ1MDYsIDB4MGNiM2RlMDgsIDB4MTdhNGMzMWEsIDB4MWVhOWM4MTQsIDB4MjE4YWY5M2UsIDB4Mjg4N2YyMzAsIDB4MzM5MGVmMjIsIDB4M2E5ZGU0MmMsIDB4ZGQwNjNkOTYsIDB4ZDQwYjM2OTgsIDB4Y2YxYzJiOGEsIDB4YzYxMTIwODQsIDB4ZjkzMjExYWUsIDB4ZjAzZjFhYTAsIDB4ZWIyODA3YjIsIDB4ZTIyNTBjYmMsIDB4OTU2ZTY1ZTYsIDB4OWM2MzZlZTgsIDB4ODc3NDczZmEsIDB4OGU3OTc4ZjQsIDB4YjE1YTQ5ZGUsIDB4Yjg1NzQyZDAsIDB4YTM0MDVmYzIsIDB4YWE0ZDU0Y2MsIDB4ZWNkYWY3NDEsIDB4ZTVkN2ZjNGYsIDB4ZmVjMGUxNWQsIDB4ZjdjZGVhNTMsIDB4YzhlZWRiNzksIDB4YzFlM2QwNzcsIDB4ZGFmNGNkNjUsIDB4ZDNmOWM2NmIsIDB4YTRiMmFmMzEsIDB4YWRiZmE0M2YsIDB4YjZhOGI5MmQsIDB4YmZhNWIyMjMsIDB4ODA4NjgzMDksIDB4ODk4Yjg4MDcsIDB4OTI5Yzk1MTUsIDB4OWI5MTllMWIsIDB4N2MwYTQ3YTEsIDB4NzUwNzRjYWYsIDB4NmUxMDUxYmQsIDB4NjcxZDVhYjMsIDB4NTgzZTZiOTksIDB4NTEzMzYwOTcsIDB4NGEyNDdkODUsIDB4NDMyOTc2OGIsIDB4MzQ2MjFmZDEsIDB4M2Q2ZjE0ZGYsIDB4MjY3ODA5Y2QsIDB4MmY3NTAyYzMsIDB4MTA1NjMzZTksIDB4MTk1YjM4ZTcsIDB4MDI0YzI1ZjUsIDB4MGI0MTJlZmIsIDB4ZDc2MThjOWEsIDB4ZGU2Yzg3OTQsIDB4YzU3YjlhODYsIDB4Y2M3NjkxODgsIDB4ZjM1NWEwYTIsIDB4ZmE1OGFiYWMsIDB4ZTE0ZmI2YmUsIDB4ZTg0MmJkYjAsIDB4OWYwOWQ0ZWEsIDB4OTYwNGRmZTQsIDB4OGQxM2MyZjYsIDB4ODQxZWM5ZjgsIDB4YmIzZGY4ZDIsIDB4YjIzMGYzZGMsIDB4YTkyN2VlY2UsIDB4YTAyYWU1YzAsIDB4NDdiMTNjN2EsIDB4NGViYzM3NzQsIDB4NTVhYjJhNjYsIDB4NWNhNjIxNjgsIDB4NjM4NTEwNDIsIDB4NmE4ODFiNGMsIDB4NzE5ZjA2NWUsIDB4Nzg5MjBkNTAsIDB4MGZkOTY0MGEsIDB4MDZkNDZmMDQsIDB4MWRjMzcyMTYsIDB4MTRjZTc5MTgsIDB4MmJlZDQ4MzIsIDB4MjJlMDQzM2MsIDB4MzlmNzVlMmUsIDB4MzBmYTU1MjAsIDB4OWFiNzAxZWMsIDB4OTNiYTBhZTIsIDB4ODhhZDE3ZjAsIDB4ODFhMDFjZmUsIDB4YmU4MzJkZDQsIDB4Yjc4ZTI2ZGEsIDB4YWM5OTNiYzgsIDB4YTU5NDMwYzYsIDB4ZDJkZjU5OWMsIDB4ZGJkMjUyOTIsIDB4YzBjNTRmODAsIDB4YzljODQ0OGUsIDB4ZjZlYjc1YTQsIDB4ZmZlNjdlYWEsIDB4ZTRmMTYzYjgsIDB4ZWRmYzY4YjYsIDB4MGE2N2IxMGMsIDB4MDM2YWJhMDIsIDB4MTg3ZGE3MTAsIDB4MTE3MGFjMWUsIDB4MmU1MzlkMzQsIDB4Mjc1ZTk2M2EsIDB4M2M0OThiMjgsIDB4MzU0NDgwMjYsIDB4NDIwZmU5N2MsIDB4NGIwMmUyNzIsIDB4NTAxNWZmNjAsIDB4NTkxOGY0NmUsIDB4NjYzYmM1NDQsIDB4NmYzNmNlNGEsIDB4NzQyMWQzNTgsIDB4N2QyY2Q4NTYsIDB4YTEwYzdhMzcsIDB4YTgwMTcxMzksIDB4YjMxNjZjMmIsIDB4YmExYjY3MjUsIDB4ODUzODU2MGYsIDB4OGMzNTVkMDEsIDB4OTcyMjQwMTMsIDB4OWUyZjRiMWQsIDB4ZTk2NDIyNDcsIDB4ZTA2OTI5NDksIDB4ZmI3ZTM0NWIsIDB4ZjI3MzNmNTUsIDB4Y2Q1MDBlN2YsIDB4YzQ1ZDA1NzEsIDB4ZGY0YTE4NjMsIDB4ZDY0NzEzNmQsIDB4MzFkY2NhZDcsIDB4MzhkMWMxZDksIDB4MjNjNmRjY2IsIDB4MmFjYmQ3YzUsIDB4MTVlOGU2ZWYsIDB4MWNlNWVkZTEsIDB4MDdmMmYwZjMsIDB4MGVmZmZiZmQsIDB4NzliNDkyYTcsIDB4NzBiOTk5YTksIDB4NmJhZTg0YmIsIDB4NjJhMzhmYjUsIDB4NWQ4MGJlOWYsIDB4NTQ4ZGI1OTEsIDB4NGY5YWE4ODMsIDB4NDY5N2EzOGRdO1xuXG4gICAgZnVuY3Rpb24gY29udmVydFRvSW50MzIoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAoYnl0ZXNbaSAgICBdIDw8IDI0KSB8XG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgKyAxXSA8PCAxNikgfFxuICAgICAgICAgICAgICAgIChieXRlc1tpICsgMl0gPDwgIDgpIHxcbiAgICAgICAgICAgICAgICAgYnl0ZXNbaSArIDNdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIEFFUyA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQUVTKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2tleScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBjb2VyY2VBcnJheShrZXksIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3ByZXBhcmUoKTtcbiAgICB9XG5cblxuICAgIEFFUy5wcm90b3R5cGUuX3ByZXBhcmUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgcm91bmRzID0gbnVtYmVyT2ZSb3VuZHNbdGhpcy5rZXkubGVuZ3RoXTtcbiAgICAgICAgaWYgKHJvdW5kcyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQga2V5IHNpemUgKG11c3QgYmUgMTYsIDI0IG9yIDMyIGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5jcnlwdGlvbiByb3VuZCBrZXlzXG4gICAgICAgIHRoaXMuX0tlID0gW107XG5cbiAgICAgICAgLy8gZGVjcnlwdGlvbiByb3VuZCBrZXlzXG4gICAgICAgIHRoaXMuX0tkID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gcm91bmRzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX0tlLnB1c2goWzAsIDAsIDAsIDBdKTtcbiAgICAgICAgICAgIHRoaXMuX0tkLnB1c2goWzAsIDAsIDAsIDBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3VuZEtleUNvdW50ID0gKHJvdW5kcyArIDEpICogNDtcbiAgICAgICAgdmFyIEtDID0gdGhpcy5rZXkubGVuZ3RoIC8gNDtcblxuICAgICAgICAvLyBjb252ZXJ0IHRoZSBrZXkgaW50byBpbnRzXG4gICAgICAgIHZhciB0ayA9IGNvbnZlcnRUb0ludDMyKHRoaXMua2V5KTtcblxuICAgICAgICAvLyBjb3B5IHZhbHVlcyBpbnRvIHJvdW5kIGtleSBhcnJheXNcbiAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEtDOyBpKyspIHtcbiAgICAgICAgICAgIGluZGV4ID0gaSA+PiAyO1xuICAgICAgICAgICAgdGhpcy5fS2VbaW5kZXhdW2kgJSA0XSA9IHRrW2ldO1xuICAgICAgICAgICAgdGhpcy5fS2Rbcm91bmRzIC0gaW5kZXhdW2kgJSA0XSA9IHRrW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8ga2V5IGV4cGFuc2lvbiAoZmlwcy0xOTcgc2VjdGlvbiA1LjIpXG4gICAgICAgIHZhciByY29ucG9pbnRlciA9IDA7XG4gICAgICAgIHZhciB0ID0gS0MsIHR0O1xuICAgICAgICB3aGlsZSAodCA8IHJvdW5kS2V5Q291bnQpIHtcbiAgICAgICAgICAgIHR0ID0gdGtbS0MgLSAxXTtcbiAgICAgICAgICAgIHRrWzBdIF49ICgoU1sodHQgPj4gMTYpICYgMHhGRl0gPDwgMjQpIF5cbiAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gIDgpICYgMHhGRl0gPDwgMTYpIF5cbiAgICAgICAgICAgICAgICAgICAgICAoU1sgdHQgICAgICAgICYgMHhGRl0gPDwgIDgpIF5cbiAgICAgICAgICAgICAgICAgICAgICAgU1sodHQgPj4gMjQpICYgMHhGRl0gICAgICAgIF5cbiAgICAgICAgICAgICAgICAgICAgICAocmNvbltyY29ucG9pbnRlcl0gPDwgMjQpKTtcbiAgICAgICAgICAgIHJjb25wb2ludGVyICs9IDE7XG5cbiAgICAgICAgICAgIC8vIGtleSBleHBhbnNpb24gKGZvciBub24tMjU2IGJpdClcbiAgICAgICAgICAgIGlmIChLQyAhPSA4KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBLQzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRrW2ldIF49IHRrW2kgLSAxXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGtleSBleHBhbnNpb24gZm9yIDI1Ni1iaXQga2V5cyBpcyBcInNsaWdodGx5IGRpZmZlcmVudFwiIChmaXBzLTE5NylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAoS0MgLyAyKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRrW2ldIF49IHRrW2kgLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHQgPSB0a1soS0MgLyAyKSAtIDFdO1xuXG4gICAgICAgICAgICAgICAgdGtbS0MgLyAyXSBePSAoU1sgdHQgICAgICAgICYgMHhGRl0gICAgICAgIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAgOCkgJiAweEZGXSA8PCAgOCkgXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+IDE2KSAmIDB4RkZdIDw8IDE2KSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gMjQpICYgMHhGRl0gPDwgMjQpKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAoS0MgLyAyKSArIDE7IGkgPCBLQzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRrW2ldIF49IHRrW2kgLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvcHkgdmFsdWVzIGludG8gcm91bmQga2V5IGFycmF5c1xuICAgICAgICAgICAgdmFyIGkgPSAwLCByLCBjO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBLQyAmJiB0IDwgcm91bmRLZXlDb3VudCkge1xuICAgICAgICAgICAgICAgIHIgPSB0ID4+IDI7XG4gICAgICAgICAgICAgICAgYyA9IHQgJSA0O1xuICAgICAgICAgICAgICAgIHRoaXMuX0tlW3JdW2NdID0gdGtbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5fS2Rbcm91bmRzIC0gcl1bY10gPSB0a1tpKytdO1xuICAgICAgICAgICAgICAgIHQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGludmVyc2UtY2lwaGVyLWlmeSB0aGUgZGVjcnlwdGlvbiByb3VuZCBrZXkgKGZpcHMtMTk3IHNlY3Rpb24gNS4zKVxuICAgICAgICBmb3IgKHZhciByID0gMTsgciA8IHJvdW5kczsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IDQ7IGMrKykge1xuICAgICAgICAgICAgICAgIHR0ID0gdGhpcy5fS2Rbcl1bY107XG4gICAgICAgICAgICAgICAgdGhpcy5fS2Rbcl1bY10gPSAoVTFbKHR0ID4+IDI0KSAmIDB4RkZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVMlsodHQgPj4gMTYpICYgMHhGRl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFUzWyh0dCA+PiAgOCkgJiAweEZGXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVTRbIHR0ICAgICAgICAmIDB4RkZdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEFFUy5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBpZiAocGxhaW50ZXh0Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHBsYWludGV4dCBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdW5kcyA9IHRoaXMuX0tlLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBhID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcGxhaW50ZXh0IHRvIChpbnRzIF4ga2V5KVxuICAgICAgICB2YXIgdCA9IGNvbnZlcnRUb0ludDMyKHBsYWludGV4dCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0W2ldIF49IHRoaXMuX0tlWzBdW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgcm91bmQgdHJhbnNmb3Jtc1xuICAgICAgICBmb3IgKHZhciByID0gMTsgciA8IHJvdW5kczsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGFbaV0gPSAoVDFbKHRbIGkgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQyWyh0WyhpICsgMSkgJSA0XSA+PiAxNikgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUM1sodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDRbIHRbKGkgKyAzKSAlIDRdICAgICAgICAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX0tlW3JdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSBhLnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgbGFzdCByb3VuZCBpcyBzcGVjaWFsXG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheSgxNiksIHR0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdHQgPSB0aGlzLl9LZVtyb3VuZHNdW2ldO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICAgIF0gPSAoU1sodFsgaSAgICAgICAgIF0gPj4gMjQpICYgMHhmZl0gXiAodHQgPj4gMjQpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAxXSA9IChTWyh0WyhpICsgMSkgJSA0XSA+PiAxNikgJiAweGZmXSBeICh0dCA+PiAxNikpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDJdID0gKFNbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF4gKHR0ID4+ICA4KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgM10gPSAoU1sgdFsoaSArIDMpICUgNF0gICAgICAgICYgMHhmZl0gXiAgdHQgICAgICAgKSAmIDB4ZmY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIEFFUy5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgaWYgKGNpcGhlcnRleHQubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdW5kcyA9IHRoaXMuX0tkLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBhID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcGxhaW50ZXh0IHRvIChpbnRzIF4ga2V5KVxuICAgICAgICB2YXIgdCA9IGNvbnZlcnRUb0ludDMyKGNpcGhlcnRleHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdFtpXSBePSB0aGlzLl9LZFswXVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IHJvdW5kIHRyYW5zZm9ybXNcbiAgICAgICAgZm9yICh2YXIgciA9IDE7IHIgPCByb3VuZHM7IHIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gKFQ1Wyh0WyBpICAgICAgICAgIF0gPj4gMjQpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDZbKHRbKGkgKyAzKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ3Wyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUOFsgdFsoaSArIDEpICUgNF0gICAgICAgICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fS2Rbcl1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IGEuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBsYXN0IHJvdW5kIGlzIHNwZWNpYWxcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KDE2KSwgdHQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0dCA9IHRoaXMuX0tkW3JvdW5kc11baV07XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgICAgXSA9IChTaVsodFsgaSAgICAgICAgIF0gPj4gMjQpICYgMHhmZl0gXiAodHQgPj4gMjQpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAxXSA9IChTaVsodFsoaSArIDMpICUgNF0gPj4gMTYpICYgMHhmZl0gXiAodHQgPj4gMTYpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAyXSA9IChTaVsodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXiAodHQgPj4gIDgpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAzXSA9IChTaVsgdFsoaSArIDEpICUgNF0gICAgICAgICYgMHhmZl0gXiAgdHQgICAgICAgKSAmIDB4ZmY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gRWxlY3RvbmljIENvZGVib29rIChFQ0IpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbkVDQiA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uRUNCKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJFbGVjdHJvbmljIENvZGUgQmxvY2tcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJlY2JcIjtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uRUNCLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHBsYWludGV4dCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCk7XG5cbiAgICAgICAgaWYgKChwbGFpbnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGNyZWF0ZUFycmF5KHBsYWludGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFpbnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkocGxhaW50ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fYWVzLmVuY3J5cHQoYmxvY2spO1xuICAgICAgICAgICAgY29weUFycmF5KGJsb2NrLCBjaXBoZXJ0ZXh0LCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkVDQi5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgY2lwaGVydGV4dCA9IGNvZXJjZUFycmF5KGNpcGhlcnRleHQpO1xuXG4gICAgICAgIGlmICgoY2lwaGVydGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY3JlYXRlQXJyYXkoY2lwaGVydGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaXBoZXJ0ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9hZXMuZGVjcnlwdChibG9jayk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoYmxvY2ssIHBsYWludGV4dCwgaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gQ2lwaGVyIEJsb2NrIENoYWluaW5nIChDQkMpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbkNCQyA9IGZ1bmN0aW9uKGtleSwgaXYpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkNCQykpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiQ2lwaGVyIEJsb2NrIENoYWluaW5nXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY2JjXCI7XG5cbiAgICAgICAgaWYgKCFpdikge1xuICAgICAgICAgICAgaXYgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpdi5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbml0aWFsYXRpb24gdmVjdG9yIHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0Q2lwaGVyYmxvY2sgPSBjb2VyY2VBcnJheShpdiwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNCQy5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBwbGFpbnRleHQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQpO1xuXG4gICAgICAgIGlmICgocGxhaW50ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHBsYWludGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBjcmVhdGVBcnJheShwbGFpbnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhaW50ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KHBsYWludGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7IGorKykge1xuICAgICAgICAgICAgICAgIGJsb2NrW2pdIF49IHRoaXMuX2xhc3RDaXBoZXJibG9ja1tqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbGFzdENpcGhlcmJsb2NrID0gdGhpcy5fYWVzLmVuY3J5cHQoYmxvY2spO1xuICAgICAgICAgICAgY29weUFycmF5KHRoaXMuX2xhc3RDaXBoZXJibG9jaywgY2lwaGVydGV4dCwgaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DQkMucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGNpcGhlcnRleHQgPSBjb2VyY2VBcnJheShjaXBoZXJ0ZXh0KTtcblxuICAgICAgICBpZiAoKGNpcGhlcnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYWludGV4dCA9IGNyZWF0ZUFycmF5KGNpcGhlcnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2lwaGVydGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fYWVzLmRlY3J5cHQoYmxvY2spO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBwbGFpbnRleHRbaSArIGpdID0gYmxvY2tbal0gXiB0aGlzLl9sYXN0Q2lwaGVyYmxvY2tbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCB0aGlzLl9sYXN0Q2lwaGVyYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gQ2lwaGVyIEZlZWRiYWNrIChDRkIpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbkNGQiA9IGZ1bmN0aW9uKGtleSwgaXYsIHNlZ21lbnRTaXplKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25DRkIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkNpcGhlciBGZWVkYmFja1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImNmYlwiO1xuXG4gICAgICAgIGlmICghaXYpIHtcbiAgICAgICAgICAgIGl2ID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXYubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5pdGlhbGF0aW9uIHZlY3RvciBzaXplIChtdXN0IGJlIDE2IHNpemUpJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlZ21lbnRTaXplKSB7IHNlZ21lbnRTaXplID0gMTsgfVxuXG4gICAgICAgIHRoaXMuc2VnbWVudFNpemUgPSBzZWdtZW50U2l6ZTtcblxuICAgICAgICB0aGlzLl9zaGlmdFJlZ2lzdGVyID0gY29lcmNlQXJyYXkoaXYsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DRkIucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgaWYgKChwbGFpbnRleHQubGVuZ3RoICUgdGhpcy5zZWdtZW50U2l6ZSkgIT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHBsYWludGV4dCBzaXplIChtdXN0IGJlIHNlZ21lbnRTaXplIGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuY3J5cHRlZCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHhvclNlZ21lbnQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jcnlwdGVkLmxlbmd0aDsgaSArPSB0aGlzLnNlZ21lbnRTaXplKSB7XG4gICAgICAgICAgICB4b3JTZWdtZW50ID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fc2hpZnRSZWdpc3Rlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2VnbWVudFNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIGVuY3J5cHRlZFtpICsgal0gXj0geG9yU2VnbWVudFtqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2hpZnQgdGhlIHJlZ2lzdGVyXG4gICAgICAgICAgICBjb3B5QXJyYXkodGhpcy5fc2hpZnRSZWdpc3RlciwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMCwgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoZW5jcnlwdGVkLCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAxNiAtIHRoaXMuc2VnbWVudFNpemUsIGksIGkgKyB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWQ7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0ZCLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBpZiAoKGNpcGhlcnRleHQubGVuZ3RoICUgdGhpcy5zZWdtZW50U2l6ZSkgIT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSBzZWdtZW50U2l6ZSBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFpbnRleHQgPSBjb2VyY2VBcnJheShjaXBoZXJ0ZXh0LCB0cnVlKTtcblxuICAgICAgICB2YXIgeG9yU2VnbWVudDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFpbnRleHQubGVuZ3RoOyBpICs9IHRoaXMuc2VnbWVudFNpemUpIHtcbiAgICAgICAgICAgIHhvclNlZ21lbnQgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9zaGlmdFJlZ2lzdGVyKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNlZ21lbnRTaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBwbGFpbnRleHRbaSArIGpdIF49IHhvclNlZ21lbnRbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IHRoZSByZWdpc3RlclxuICAgICAgICAgICAgY29weUFycmF5KHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDAsIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDE2IC0gdGhpcy5zZWdtZW50U2l6ZSwgaSwgaSArIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBPdXRwdXQgRmVlZGJhY2sgKE9GQilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uT0ZCID0gZnVuY3Rpb24oa2V5LCBpdikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uT0ZCKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJPdXRwdXQgRmVlZGJhY2tcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJvZmJcIjtcblxuICAgICAgICBpZiAoIWl2KSB7XG4gICAgICAgICAgICBpdiA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGl2Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluaXRpYWxhdGlvbiB2ZWN0b3Igc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RQcmVjaXBoZXIgPSBjb2VyY2VBcnJheShpdiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCA9IDE2O1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25PRkIucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgdmFyIGVuY3J5cHRlZCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCwgdHJ1ZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNyeXB0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXggPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlciA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX2xhc3RQcmVjaXBoZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmNyeXB0ZWRbaV0gXj0gdGhpcy5fbGFzdFByZWNpcGhlclt0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXgrK107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkO1xuICAgIH1cblxuICAgIC8vIERlY3J5cHRpb24gaXMgc3ltZXRyaWNcbiAgICBNb2RlT2ZPcGVyYXRpb25PRkIucHJvdG90eXBlLmRlY3J5cHQgPSBNb2RlT2ZPcGVyYXRpb25PRkIucHJvdG90eXBlLmVuY3J5cHQ7XG5cblxuICAgIC8qKlxuICAgICAqICBDb3VudGVyIG9iamVjdCBmb3IgQ1RSIGNvbW1vbiBtb2RlIG9mIG9wZXJhdGlvblxuICAgICAqL1xuICAgIHZhciBDb3VudGVyID0gZnVuY3Rpb24oaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb3VudGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NvdW50ZXIgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgYWxsb3cgMCwgYnV0IGFueXRoaW5nIGZhbHNlLWlzaCB1c2VzIHRoZSBkZWZhdWx0IDFcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSAhPT0gMCAmJiAhaW5pdGlhbFZhbHVlKSB7IGluaXRpYWxWYWx1ZSA9IDE7IH1cblxuICAgICAgICBpZiAodHlwZW9mKGluaXRpYWxWYWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudGVyID0gY3JlYXRlQXJyYXkoMTYpO1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShpbml0aWFsVmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEJ5dGVzKGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb3VudGVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YodmFsdWUpICE9PSAnbnVtYmVyJyB8fCBwYXJzZUludCh2YWx1ZSkgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjb3VudGVyIHZhbHVlIChtdXN0IGJlIGFuIGludGVnZXIpJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBjYW5ub3Qgc2FmZWx5IGhhbmRsZSBudW1iZXJzIGJleW9uZCB0aGUgc2FmZSByYW5nZSBmb3IgaW50ZWdlcnNcbiAgICAgICAgaWYgKHZhbHVlID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW50ZWdlciB2YWx1ZSBvdXQgb2Ygc2FmZSByYW5nZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxNTsgaW5kZXggPj0gMDsgLS1pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fY291bnRlcltpbmRleF0gPSB2YWx1ZSAlIDI1NjtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUgLyAyNTYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQ291bnRlci5wcm90b3R5cGUuc2V0Qnl0ZXMgPSBmdW5jdGlvbihieXRlcykge1xuICAgICAgICBieXRlcyA9IGNvZXJjZUFycmF5KGJ5dGVzLCB0cnVlKTtcblxuICAgICAgICBpZiAoYnl0ZXMubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY291bnRlciBieXRlcyBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY291bnRlciA9IGJ5dGVzO1xuICAgIH07XG5cbiAgICBDb3VudGVyLnByb3RvdHlwZS5pbmNyZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE1OyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvdW50ZXJbaV0gPT09IDI1NSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXJbaV0gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyW2ldKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIENvdW50ZXIgKENUUilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uQ1RSID0gZnVuY3Rpb24oa2V5LCBjb3VudGVyKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25DVFIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkNvdW50ZXJcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJjdHJcIjtcblxuICAgICAgICBpZiAoIShjb3VudGVyIGluc3RhbmNlb2YgQ291bnRlcikpIHtcbiAgICAgICAgICAgIGNvdW50ZXIgPSBuZXcgQ291bnRlcihjb3VudGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY291bnRlciA9IGNvdW50ZXI7XG5cbiAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJJbmRleCA9IDE2O1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DVFIucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgdmFyIGVuY3J5cHRlZCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCwgdHJ1ZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNyeXB0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXggPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlciA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX2NvdW50ZXIuX2NvdW50ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnRlci5pbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuY3J5cHRlZFtpXSBePSB0aGlzLl9yZW1haW5pbmdDb3VudGVyW3RoaXMuX3JlbWFpbmluZ0NvdW50ZXJJbmRleCsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWQ7XG4gICAgfVxuXG4gICAgLy8gRGVjcnlwdGlvbiBpcyBzeW1ldHJpY1xuICAgIE1vZGVPZk9wZXJhdGlvbkNUUi5wcm90b3R5cGUuZGVjcnlwdCA9IE1vZGVPZk9wZXJhdGlvbkNUUi5wcm90b3R5cGUuZW5jcnlwdDtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBQYWRkaW5nXG5cbiAgICAvLyBTZWU6aHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIzMTVcbiAgICBmdW5jdGlvbiBwa2NzN3BhZChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBjb2VyY2VBcnJheShkYXRhLCB0cnVlKTtcbiAgICAgICAgdmFyIHBhZGRlciA9IDE2IC0gKGRhdGEubGVuZ3RoICUgMTYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkoZGF0YS5sZW5ndGggKyBwYWRkZXIpO1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgcmVzdWx0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEubGVuZ3RoOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gPSBwYWRkZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwa2NzN3N0cmlwKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGNvZXJjZUFycmF5KGRhdGEsIHRydWUpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxNikgeyB0aHJvdyBuZXcgRXJyb3IoJ1BLQ1MjNyBpbnZhbGlkIGxlbmd0aCcpOyB9XG5cbiAgICAgICAgdmFyIHBhZGRlciA9IGRhdGFbZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKHBhZGRlciA+IDE2KSB7IHRocm93IG5ldyBFcnJvcignUEtDUyM3IHBhZGRpbmcgYnl0ZSBvdXQgb2YgcmFuZ2UnKTsgfVxuXG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCAtIHBhZGRlcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWRkZXI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbbGVuZ3RoICsgaV0gIT09IHBhZGRlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUEtDUyM3IGludmFsaWQgcGFkZGluZyBieXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIHJlc3VsdCwgMCwgMCwgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEV4cG9ydGluZ1xuXG5cbiAgICAvLyBUaGUgYmxvY2sgY2lwaGVyXG4gICAgdmFyIGFlc2pzID0ge1xuICAgICAgICBBRVM6IEFFUyxcbiAgICAgICAgQ291bnRlcjogQ291bnRlcixcblxuICAgICAgICBNb2RlT2ZPcGVyYXRpb246IHtcbiAgICAgICAgICAgIGVjYjogTW9kZU9mT3BlcmF0aW9uRUNCLFxuICAgICAgICAgICAgY2JjOiBNb2RlT2ZPcGVyYXRpb25DQkMsXG4gICAgICAgICAgICBjZmI6IE1vZGVPZk9wZXJhdGlvbkNGQixcbiAgICAgICAgICAgIG9mYjogTW9kZU9mT3BlcmF0aW9uT0ZCLFxuICAgICAgICAgICAgY3RyOiBNb2RlT2ZPcGVyYXRpb25DVFJcbiAgICAgICAgfSxcblxuICAgICAgICB1dGlsczoge1xuICAgICAgICAgICAgaGV4OiBjb252ZXJ0SGV4LFxuICAgICAgICAgICAgdXRmODogY29udmVydFV0ZjhcbiAgICAgICAgfSxcblxuICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICBwa2NzNzoge1xuICAgICAgICAgICAgICAgIHBhZDogcGtjczdwYWQsXG4gICAgICAgICAgICAgICAgc3RyaXA6IHBrY3M3c3RyaXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfYXJyYXlUZXN0OiB7XG4gICAgICAgICAgICBjb2VyY2VBcnJheTogY29lcmNlQXJyYXksXG4gICAgICAgICAgICBjcmVhdGVBcnJheTogY3JlYXRlQXJyYXksXG4gICAgICAgICAgICBjb3B5QXJyYXk6IGNvcHlBcnJheSxcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIG5vZGUuanNcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYWVzanNcblxuICAgIC8vIFJlcXVpcmVKUy9BTURcbiAgICAvLyBodHRwOi8vd3d3LnJlcXVpcmVqcy5vcmcvZG9jcy9hcGkuaHRtbFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbWRqcy9hbWRqcy1hcGkvd2lraS9BTURcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihkZWZpbmUpID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGFlc2pzKTtcblxuICAgIC8vIFdlYiBCcm93c2Vyc1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGxpYnJhcnkgYXQgXCJhZXNqc1wiIG1ha2Ugc3VyZSBpdCdzIHN0aWxsIGF2YWlsYWJsZVxuICAgICAgICBpZiAocm9vdC5hZXNqcykge1xuICAgICAgICAgICAgYWVzanMuX2Flc2pzID0gcm9vdC5hZXNqcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJvb3QuYWVzanMgPSBhZXNqcztcbiAgICB9XG5cblxufSkodGhpcyk7XG4iLCIvKlxuIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU0hBIGZhbWlseSBvZiBoYXNoZXMsIGFzXG4gZGVmaW5lZCBpbiBGSVBTIFBVQiAxODAtNCBhbmQgRklQUyBQVUIgMjAyLCBhcyB3ZWxsIGFzIHRoZSBjb3JyZXNwb25kaW5nXG4gSE1BQyBpbXBsZW1lbnRhdGlvbiBhcyBkZWZpbmVkIGluIEZJUFMgUFVCIDE5OGFcblxuIENvcHlyaWdodCBCcmlhbiBUdXJlayAyMDA4LTIwMTdcbiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiBTZWUgaHR0cDovL2NhbGlnYXRpby5naXRodWIuY29tL2pzU0hBLyBmb3IgbW9yZSBpbmZvcm1hdGlvblxuXG4gU2V2ZXJhbCBmdW5jdGlvbnMgdGFrZW4gZnJvbSBQYXVsIEpvaG5zdG9uXG4qL1xuJ3VzZSBzdHJpY3QnOyhmdW5jdGlvbihZKXtmdW5jdGlvbiBDKGMsYSxiKXt2YXIgZT0wLGg9W10sbj0wLGcsbCxkLGYsbSxxLHUscixJPSExLHY9W10sdz1bXSx0LHk9ITEsej0hMSx4PS0xO2I9Ynx8e307Zz1iLmVuY29kaW5nfHxcIlVURjhcIjt0PWIubnVtUm91bmRzfHwxO2lmKHQhPT1wYXJzZUludCh0LDEwKXx8MT50KXRocm93IEVycm9yKFwibnVtUm91bmRzIG11c3QgYSBpbnRlZ2VyID49IDFcIik7aWYoXCJTSEEtMVwiPT09YyltPTUxMixxPUssdT1aLGY9MTYwLHI9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2xpY2UoKX07ZWxzZSBpZigwPT09Yy5sYXN0SW5kZXhPZihcIlNIQS1cIiwwKSlpZihxPWZ1bmN0aW9uKGEsYil7cmV0dXJuIEwoYSxiLGMpfSx1PWZ1bmN0aW9uKGEsYixoLGUpe3ZhciBrLGY7aWYoXCJTSEEtMjI0XCI9PT1jfHxcIlNIQS0yNTZcIj09PWMpaz0oYis2NT4+Pjk8PDQpKzE1LGY9MTY7ZWxzZSBpZihcIlNIQS0zODRcIj09PWN8fFwiU0hBLTUxMlwiPT09YylrPShiKzEyOT4+PjEwPDxcbjUpKzMxLGY9MzI7ZWxzZSB0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gU0hBLTIgaW1wbGVtZW50YXRpb25cIik7Zm9yKDthLmxlbmd0aDw9azspYS5wdXNoKDApO2FbYj4+PjVdfD0xMjg8PDI0LWIlMzI7Yj1iK2g7YVtrXT1iJjQyOTQ5NjcyOTU7YVtrLTFdPWIvNDI5NDk2NzI5NnwwO2g9YS5sZW5ndGg7Zm9yKGI9MDtiPGg7Yis9ZillPUwoYS5zbGljZShiLGIrZiksZSxjKTtpZihcIlNIQS0yMjRcIj09PWMpYT1bZVswXSxlWzFdLGVbMl0sZVszXSxlWzRdLGVbNV0sZVs2XV07ZWxzZSBpZihcIlNIQS0yNTZcIj09PWMpYT1lO2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jKWE9W2VbMF0uYSxlWzBdLmIsZVsxXS5hLGVbMV0uYixlWzJdLmEsZVsyXS5iLGVbM10uYSxlWzNdLmIsZVs0XS5hLGVbNF0uYixlWzVdLmEsZVs1XS5iXTtlbHNlIGlmKFwiU0hBLTUxMlwiPT09YylhPVtlWzBdLmEsZVswXS5iLGVbMV0uYSxlWzFdLmIsZVsyXS5hLGVbMl0uYixlWzNdLmEsZVszXS5iLGVbNF0uYSxcbmVbNF0uYixlWzVdLmEsZVs1XS5iLGVbNl0uYSxlWzZdLmIsZVs3XS5hLGVbN10uYl07ZWxzZSB0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gU0hBLTIgaW1wbGVtZW50YXRpb25cIik7cmV0dXJuIGF9LHI9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2xpY2UoKX0sXCJTSEEtMjI0XCI9PT1jKW09NTEyLGY9MjI0O2Vsc2UgaWYoXCJTSEEtMjU2XCI9PT1jKW09NTEyLGY9MjU2O2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jKW09MTAyNCxmPTM4NDtlbHNlIGlmKFwiU0hBLTUxMlwiPT09YyltPTEwMjQsZj01MTI7ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2Vsc2UgaWYoMD09PWMubGFzdEluZGV4T2YoXCJTSEEzLVwiLDApfHwwPT09Yy5sYXN0SW5kZXhPZihcIlNIQUtFXCIsMCkpe3ZhciBGPTY7cT1EO3I9ZnVuY3Rpb24oYSl7dmFyIGM9W10sZTtmb3IoZT0wOzU+ZTtlKz0xKWNbZV09YVtlXS5zbGljZSgpO3JldHVybiBjfTt4PTE7aWYoXCJTSEEzLTIyNFwiPT09XG5jKW09MTE1MixmPTIyNDtlbHNlIGlmKFwiU0hBMy0yNTZcIj09PWMpbT0xMDg4LGY9MjU2O2Vsc2UgaWYoXCJTSEEzLTM4NFwiPT09YyltPTgzMixmPTM4NDtlbHNlIGlmKFwiU0hBMy01MTJcIj09PWMpbT01NzYsZj01MTI7ZWxzZSBpZihcIlNIQUtFMTI4XCI9PT1jKW09MTM0NCxmPS0xLEY9MzEsej0hMDtlbHNlIGlmKFwiU0hBS0UyNTZcIj09PWMpbT0xMDg4LGY9LTEsRj0zMSx6PSEwO2Vsc2UgdGhyb3cgRXJyb3IoXCJDaG9zZW4gU0hBIHZhcmlhbnQgaXMgbm90IHN1cHBvcnRlZFwiKTt1PWZ1bmN0aW9uKGEsYyxlLGIsaCl7ZT1tO3ZhciBrPUYsZixnPVtdLG49ZT4+PjUsbD0wLGQ9Yz4+PjU7Zm9yKGY9MDtmPGQmJmM+PWU7Zis9biliPUQoYS5zbGljZShmLGYrbiksYiksYy09ZTthPWEuc2xpY2UoZik7Zm9yKGMlPWU7YS5sZW5ndGg8bjspYS5wdXNoKDApO2Y9Yz4+PjM7YVtmPj4yXV49azw8ZiU0Kjg7YVtuLTFdXj0yMTQ3NDgzNjQ4O2ZvcihiPUQoYSxiKTszMipnLmxlbmd0aDxoOyl7YT1iW2wlXG41XVtsLzV8MF07Zy5wdXNoKGEuYik7aWYoMzIqZy5sZW5ndGg+PWgpYnJlYWs7Zy5wdXNoKGEuYSk7bCs9MTswPT09NjQqbCVlJiZEKG51bGwsYil9cmV0dXJuIGd9fWVsc2UgdGhyb3cgRXJyb3IoXCJDaG9zZW4gU0hBIHZhcmlhbnQgaXMgbm90IHN1cHBvcnRlZFwiKTtkPU0oYSxnLHgpO2w9QShjKTt0aGlzLnNldEhNQUNLZXk9ZnVuY3Rpb24oYSxiLGgpe3ZhciBrO2lmKCEwPT09SSl0aHJvdyBFcnJvcihcIkhNQUMga2V5IGFscmVhZHkgc2V0XCIpO2lmKCEwPT09eSl0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgY2FsbGluZyB1cGRhdGVcIik7aWYoITA9PT16KXRocm93IEVycm9yKFwiU0hBS0UgaXMgbm90IHN1cHBvcnRlZCBmb3IgSE1BQ1wiKTtnPShofHx7fSkuZW5jb2Rpbmd8fFwiVVRGOFwiO2I9TShiLGcseCkoYSk7YT1iLmJpbkxlbjtiPWIudmFsdWU7az1tPj4+MztoPWsvNC0xO2lmKGs8YS84KXtmb3IoYj11KGIsYSwwLEEoYyksZik7Yi5sZW5ndGg8PWg7KWIucHVzaCgwKTtcbmJbaF0mPTQyOTQ5NjcwNDB9ZWxzZSBpZihrPmEvOCl7Zm9yKDtiLmxlbmd0aDw9aDspYi5wdXNoKDApO2JbaF0mPTQyOTQ5NjcwNDB9Zm9yKGE9MDthPD1oO2ErPTEpdlthXT1iW2FdXjkwOTUyMjQ4Nix3W2FdPWJbYV1eMTU0OTU1NjgyODtsPXEodixsKTtlPW07ST0hMH07dGhpcy51cGRhdGU9ZnVuY3Rpb24oYSl7dmFyIGMsYixrLGY9MCxnPW0+Pj41O2M9ZChhLGgsbik7YT1jLmJpbkxlbjtiPWMudmFsdWU7Yz1hPj4+NTtmb3Ioaz0wO2s8YztrKz1nKWYrbTw9YSYmKGw9cShiLnNsaWNlKGssaytnKSxsKSxmKz1tKTtlKz1mO2g9Yi5zbGljZShmPj4+NSk7bj1hJW07eT0hMH07dGhpcy5nZXRIYXNoPWZ1bmN0aW9uKGEsYil7dmFyIGssZyxkLG07aWYoITA9PT1JKXRocm93IEVycm9yKFwiQ2Fubm90IGNhbGwgZ2V0SGFzaCBhZnRlciBzZXR0aW5nIEhNQUMga2V5XCIpO2Q9TihiKTtpZighMD09PXope2lmKC0xPT09ZC5zaGFrZUxlbil0aHJvdyBFcnJvcihcInNoYWtlTGVuIG11c3QgYmUgc3BlY2lmaWVkIGluIG9wdGlvbnNcIik7XG5mPWQuc2hha2VMZW59c3dpdGNoKGEpe2Nhc2UgXCJIRVhcIjprPWZ1bmN0aW9uKGEpe3JldHVybiBPKGEsZix4LGQpfTticmVhaztjYXNlIFwiQjY0XCI6az1mdW5jdGlvbihhKXtyZXR1cm4gUChhLGYseCxkKX07YnJlYWs7Y2FzZSBcIkJZVEVTXCI6az1mdW5jdGlvbihhKXtyZXR1cm4gUShhLGYseCl9O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtnPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaChwKXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9az1mdW5jdGlvbihhKXtyZXR1cm4gUihhLGYseCl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO31tPXUoaC5zbGljZSgpLG4sZSxyKGwpLGYpO2ZvcihnPTE7Zzx0O2crPTEpITA9PT16JiYwIT09ZiUzMiYmKG1bbS5sZW5ndGgtMV0mPTE2Nzc3MjE1Pj4+MjQtZiUzMiksbT11KG0sZixcbjAsQShjKSxmKTtyZXR1cm4gayhtKX07dGhpcy5nZXRITUFDPWZ1bmN0aW9uKGEsYil7dmFyIGssZyxkLHA7aWYoITE9PT1JKXRocm93IEVycm9yKFwiQ2Fubm90IGNhbGwgZ2V0SE1BQyB3aXRob3V0IGZpcnN0IHNldHRpbmcgSE1BQyBrZXlcIik7ZD1OKGIpO3N3aXRjaChhKXtjYXNlIFwiSEVYXCI6az1mdW5jdGlvbihhKXtyZXR1cm4gTyhhLGYseCxkKX07YnJlYWs7Y2FzZSBcIkI2NFwiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIFAoYSxmLHgsZCl9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOms9ZnVuY3Rpb24oYSl7cmV0dXJuIFEoYSxmLHgpfTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7az1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2godil7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWs9ZnVuY3Rpb24oYSl7cmV0dXJuIFIoYSxmLHgpfTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwib3V0cHV0Rm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTtcbn1nPXUoaC5zbGljZSgpLG4sZSxyKGwpLGYpO3A9cSh3LEEoYykpO3A9dShnLGYsbSxwLGYpO3JldHVybiBrKHApfX1mdW5jdGlvbiBiKGMsYSl7dGhpcy5hPWM7dGhpcy5iPWF9ZnVuY3Rpb24gTyhjLGEsYixlKXt2YXIgaD1cIlwiO2EvPTg7dmFyIG4sZyxkO2Q9LTE9PT1iPzM6MDtmb3Iobj0wO248YTtuKz0xKWc9Y1tuPj4+Ml0+Pj44KihkK24lNCpiKSxoKz1cIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZz4+PjQmMTUpK1wiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChnJjE1KTtyZXR1cm4gZS5vdXRwdXRVcHBlcj9oLnRvVXBwZXJDYXNlKCk6aH1mdW5jdGlvbiBQKGMsYSxiLGUpe3ZhciBoPVwiXCIsbj1hLzgsZyxkLHAsZjtmPS0xPT09Yj8zOjA7Zm9yKGc9MDtnPG47Zys9Mylmb3IoZD1nKzE8bj9jW2crMT4+PjJdOjAscD1nKzI8bj9jW2crMj4+PjJdOjAscD0oY1tnPj4+Ml0+Pj44KihmK2clNCpiKSYyNTUpPDwxNnwoZD4+PjgqKGYrKGcrMSklNCpiKSYyNTUpPDw4fHA+Pj44KihmK1xuKGcrMiklNCpiKSYyNTUsZD0wOzQ+ZDtkKz0xKTgqZys2KmQ8PWE/aCs9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuY2hhckF0KHA+Pj42KigzLWQpJjYzKTpoKz1lLmI2NFBhZDtyZXR1cm4gaH1mdW5jdGlvbiBRKGMsYSxiKXt2YXIgZT1cIlwiO2EvPTg7dmFyIGgsZCxnO2c9LTE9PT1iPzM6MDtmb3IoaD0wO2g8YTtoKz0xKWQ9Y1toPj4+Ml0+Pj44KihnK2glNCpiKSYyNTUsZSs9U3RyaW5nLmZyb21DaGFyQ29kZShkKTtyZXR1cm4gZX1mdW5jdGlvbiBSKGMsYSxiKXthLz04O3ZhciBlLGg9bmV3IEFycmF5QnVmZmVyKGEpLGQsZztnPW5ldyBVaW50OEFycmF5KGgpO2Q9LTE9PT1iPzM6MDtmb3IoZT0wO2U8YTtlKz0xKWdbZV09Y1tlPj4+Ml0+Pj44KihkK2UlNCpiKSYyNTU7cmV0dXJuIGh9ZnVuY3Rpb24gTihjKXt2YXIgYT17b3V0cHV0VXBwZXI6ITEsYjY0UGFkOlwiPVwiLHNoYWtlTGVuOi0xfTtjPWN8fHt9O1xuYS5vdXRwdXRVcHBlcj1jLm91dHB1dFVwcGVyfHwhMTshMD09PWMuaGFzT3duUHJvcGVydHkoXCJiNjRQYWRcIikmJihhLmI2NFBhZD1jLmI2NFBhZCk7aWYoITA9PT1jLmhhc093blByb3BlcnR5KFwic2hha2VMZW5cIikpe2lmKDAhPT1jLnNoYWtlTGVuJTgpdGhyb3cgRXJyb3IoXCJzaGFrZUxlbiBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgOFwiKTthLnNoYWtlTGVuPWMuc2hha2VMZW59aWYoXCJib29sZWFuXCIhPT10eXBlb2YgYS5vdXRwdXRVcHBlcil0aHJvdyBFcnJvcihcIkludmFsaWQgb3V0cHV0VXBwZXIgZm9ybWF0dGluZyBvcHRpb25cIik7aWYoXCJzdHJpbmdcIiE9PXR5cGVvZiBhLmI2NFBhZCl0aHJvdyBFcnJvcihcIkludmFsaWQgYjY0UGFkIGZvcm1hdHRpbmcgb3B0aW9uXCIpO3JldHVybiBhfWZ1bmN0aW9uIE0oYyxhLGIpe3N3aXRjaChhKXtjYXNlIFwiVVRGOFwiOmNhc2UgXCJVVEYxNkJFXCI6Y2FzZSBcIlVURjE2TEVcIjpicmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZW5jb2RpbmcgbXVzdCBiZSBVVEY4LCBVVEYxNkJFLCBvciBVVEYxNkxFXCIpO1xufXN3aXRjaChjKXtjYXNlIFwiSEVYXCI6Yz1mdW5jdGlvbihhLGMsZCl7dmFyIGc9YS5sZW5ndGgsbCxwLGYsbSxxLHU7aWYoMCE9PWclMil0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBtdXN0IGJlIGluIGJ5dGUgaW5jcmVtZW50c1wiKTtjPWN8fFswXTtkPWR8fDA7cT1kPj4+Mzt1PS0xPT09Yj8zOjA7Zm9yKGw9MDtsPGc7bCs9Mil7cD1wYXJzZUludChhLnN1YnN0cihsLDIpLDE2KTtpZihpc05hTihwKSl0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnNcIik7bT0obD4+PjEpK3E7Zm9yKGY9bT4+PjI7Yy5sZW5ndGg8PWY7KWMucHVzaCgwKTtjW2ZdfD1wPDw4Kih1K20lNCpiKX1yZXR1cm57dmFsdWU6YyxiaW5MZW46NCpnK2R9fTticmVhaztjYXNlIFwiVEVYVFwiOmM9ZnVuY3Rpb24oYyxoLGQpe3ZhciBnLGwscD0wLGYsbSxxLHUscix0O2g9aHx8WzBdO2Q9ZHx8MDtxPWQ+Pj4zO2lmKFwiVVRGOFwiPT09YSlmb3IodD0tMT09PVxuYj8zOjAsZj0wO2Y8Yy5sZW5ndGg7Zis9MSlmb3IoZz1jLmNoYXJDb2RlQXQoZiksbD1bXSwxMjg+Zz9sLnB1c2goZyk6MjA0OD5nPyhsLnB1c2goMTkyfGc+Pj42KSxsLnB1c2goMTI4fGcmNjMpKTo1NTI5Nj5nfHw1NzM0NDw9Zz9sLnB1c2goMjI0fGc+Pj4xMiwxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpOihmKz0xLGc9NjU1MzYrKChnJjEwMjMpPDwxMHxjLmNoYXJDb2RlQXQoZikmMTAyMyksbC5wdXNoKDI0MHxnPj4+MTgsMTI4fGc+Pj4xMiY2MywxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpKSxtPTA7bTxsLmxlbmd0aDttKz0xKXtyPXArcTtmb3IodT1yPj4+MjtoLmxlbmd0aDw9dTspaC5wdXNoKDApO2hbdV18PWxbbV08PDgqKHQrciU0KmIpO3ArPTF9ZWxzZSBpZihcIlVURjE2QkVcIj09PWF8fFwiVVRGMTZMRVwiPT09YSlmb3IodD0tMT09PWI/MjowLGw9XCJVVEYxNkxFXCI9PT1hJiYxIT09Ynx8XCJVVEYxNkxFXCIhPT1hJiYxPT09YixmPTA7ZjxjLmxlbmd0aDtmKz0xKXtnPWMuY2hhckNvZGVBdChmKTtcbiEwPT09bCYmKG09ZyYyNTUsZz1tPDw4fGc+Pj44KTtyPXArcTtmb3IodT1yPj4+MjtoLmxlbmd0aDw9dTspaC5wdXNoKDApO2hbdV18PWc8PDgqKHQrciU0KmIpO3ArPTJ9cmV0dXJue3ZhbHVlOmgsYmluTGVuOjgqcCtkfX07YnJlYWs7Y2FzZSBcIkI2NFwiOmM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBnPTAsbCxwLGYsbSxxLHUscix0O2lmKC0xPT09YS5zZWFyY2goL15bYS16QS1aMC05PStcXC9dKyQvKSl0aHJvdyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIGJhc2UtNjQgc3RyaW5nXCIpO3A9YS5pbmRleE9mKFwiPVwiKTthPWEucmVwbGFjZSgvXFw9L2csXCJcIik7aWYoLTEhPT1wJiZwPGEubGVuZ3RoKXRocm93IEVycm9yKFwiSW52YWxpZCAnPScgZm91bmQgaW4gYmFzZS02NCBzdHJpbmdcIik7Yz1jfHxbMF07ZD1kfHwwO3U9ZD4+PjM7dD0tMT09PWI/MzowO2ZvcihwPTA7cDxhLmxlbmd0aDtwKz00KXtxPWEuc3Vic3RyKHAsNCk7Zm9yKGY9bT0wO2Y8cS5sZW5ndGg7Zis9MSlsPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmluZGV4T2YocVtmXSksXG5tfD1sPDwxOC02KmY7Zm9yKGY9MDtmPHEubGVuZ3RoLTE7Zis9MSl7cj1nK3U7Zm9yKGw9cj4+PjI7Yy5sZW5ndGg8PWw7KWMucHVzaCgwKTtjW2xdfD0obT4+PjE2LTgqZiYyNTUpPDw4Kih0K3IlNCpiKTtnKz0xfX1yZXR1cm57dmFsdWU6YyxiaW5MZW46OCpnK2R9fTticmVhaztjYXNlIFwiQllURVNcIjpjPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZyxsLHAsZixtLHE7Yz1jfHxbMF07ZD1kfHwwO3A9ZD4+PjM7cT0tMT09PWI/MzowO2ZvcihsPTA7bDxhLmxlbmd0aDtsKz0xKWc9YS5jaGFyQ29kZUF0KGwpLG09bCtwLGY9bT4+PjIsYy5sZW5ndGg8PWYmJmMucHVzaCgwKSxjW2ZdfD1nPDw4KihxK20lNCpiKTtyZXR1cm57dmFsdWU6YyxiaW5MZW46OCphLmxlbmd0aCtkfX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2M9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKGUpe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31jPVxuZnVuY3Rpb24oYSxjLGQpe3ZhciBnLGwscCxmLG0scTtjPWN8fFswXTtkPWR8fDA7bD1kPj4+MzttPS0xPT09Yj8zOjA7cT1uZXcgVWludDhBcnJheShhKTtmb3IoZz0wO2c8YS5ieXRlTGVuZ3RoO2crPTEpZj1nK2wscD1mPj4+MixjLmxlbmd0aDw9cCYmYy5wdXNoKDApLGNbcF18PXFbZ108PDgqKG0rZiU0KmIpO3JldHVybnt2YWx1ZTpjLGJpbkxlbjo4KmEuYnl0ZUxlbmd0aCtkfX07YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImZvcm1hdCBtdXN0IGJlIEhFWCwgVEVYVCwgQjY0LCBCWVRFUywgb3IgQVJSQVlCVUZGRVJcIik7fXJldHVybiBjfWZ1bmN0aW9uIHkoYyxhKXtyZXR1cm4gYzw8YXxjPj4+MzItYX1mdW5jdGlvbiBTKGMsYSl7cmV0dXJuIDMyPGE/KGEtPTMyLG5ldyBiKGMuYjw8YXxjLmE+Pj4zMi1hLGMuYTw8YXxjLmI+Pj4zMi1hKSk6MCE9PWE/bmV3IGIoYy5hPDxhfGMuYj4+PjMyLWEsYy5iPDxhfGMuYT4+PjMyLWEpOmN9ZnVuY3Rpb24gdyhjLGEpe3JldHVybiBjPj4+XG5hfGM8PDMyLWF9ZnVuY3Rpb24gdChjLGEpe3ZhciBrPW51bGwsaz1uZXcgYihjLmEsYy5iKTtyZXR1cm4gaz0zMj49YT9uZXcgYihrLmE+Pj5hfGsuYjw8MzItYSY0Mjk0OTY3Mjk1LGsuYj4+PmF8ay5hPDwzMi1hJjQyOTQ5NjcyOTUpOm5ldyBiKGsuYj4+PmEtMzJ8ay5hPDw2NC1hJjQyOTQ5NjcyOTUsay5hPj4+YS0zMnxrLmI8PDY0LWEmNDI5NDk2NzI5NSl9ZnVuY3Rpb24gVChjLGEpe3ZhciBrPW51bGw7cmV0dXJuIGs9MzI+PWE/bmV3IGIoYy5hPj4+YSxjLmI+Pj5hfGMuYTw8MzItYSY0Mjk0OTY3Mjk1KTpuZXcgYigwLGMuYT4+PmEtMzIpfWZ1bmN0aW9uIGFhKGMsYSxiKXtyZXR1cm4gYyZhXn5jJmJ9ZnVuY3Rpb24gYmEoYyxhLGspe3JldHVybiBuZXcgYihjLmEmYS5hXn5jLmEmay5hLGMuYiZhLmJefmMuYiZrLmIpfWZ1bmN0aW9uIFUoYyxhLGIpe3JldHVybiBjJmFeYyZiXmEmYn1mdW5jdGlvbiBjYShjLGEsayl7cmV0dXJuIG5ldyBiKGMuYSZhLmFeYy5hJmsuYV5hLmEmXG5rLmEsYy5iJmEuYl5jLmImay5iXmEuYiZrLmIpfWZ1bmN0aW9uIGRhKGMpe3JldHVybiB3KGMsMiledyhjLDEzKV53KGMsMjIpfWZ1bmN0aW9uIGVhKGMpe3ZhciBhPXQoYywyOCksaz10KGMsMzQpO2M9dChjLDM5KTtyZXR1cm4gbmV3IGIoYS5hXmsuYV5jLmEsYS5iXmsuYl5jLmIpfWZ1bmN0aW9uIGZhKGMpe3JldHVybiB3KGMsNiledyhjLDExKV53KGMsMjUpfWZ1bmN0aW9uIGdhKGMpe3ZhciBhPXQoYywxNCksaz10KGMsMTgpO2M9dChjLDQxKTtyZXR1cm4gbmV3IGIoYS5hXmsuYV5jLmEsYS5iXmsuYl5jLmIpfWZ1bmN0aW9uIGhhKGMpe3JldHVybiB3KGMsNyledyhjLDE4KV5jPj4+M31mdW5jdGlvbiBpYShjKXt2YXIgYT10KGMsMSksaz10KGMsOCk7Yz1UKGMsNyk7cmV0dXJuIG5ldyBiKGEuYV5rLmFeYy5hLGEuYl5rLmJeYy5iKX1mdW5jdGlvbiBqYShjKXtyZXR1cm4gdyhjLDE3KV53KGMsMTkpXmM+Pj4xMH1mdW5jdGlvbiBrYShjKXt2YXIgYT10KGMsMTkpLGs9dChjLDYxKTtcbmM9VChjLDYpO3JldHVybiBuZXcgYihhLmFeay5hXmMuYSxhLmJeay5iXmMuYil9ZnVuY3Rpb24gRyhjLGEpe3ZhciBiPShjJjY1NTM1KSsoYSY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhiPj4+MTYpJjY1NTM1KTw8MTZ8YiY2NTUzNX1mdW5jdGlvbiBsYShjLGEsYixlKXt2YXIgaD0oYyY2NTUzNSkrKGEmNjU1MzUpKyhiJjY1NTM1KSsoZSY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhiPj4+MTYpKyhlPj4+MTYpKyhoPj4+MTYpJjY1NTM1KTw8MTZ8aCY2NTUzNX1mdW5jdGlvbiBIKGMsYSxiLGUsaCl7dmFyIGQ9KGMmNjU1MzUpKyhhJjY1NTM1KSsoYiY2NTUzNSkrKGUmNjU1MzUpKyhoJjY1NTM1KTtyZXR1cm4oKGM+Pj4xNikrKGE+Pj4xNikrKGI+Pj4xNikrKGU+Pj4xNikrKGg+Pj4xNikrKGQ+Pj4xNikmNjU1MzUpPDwxNnxkJjY1NTM1fWZ1bmN0aW9uIG1hKGMsYSl7dmFyIGQsZSxoO2Q9KGMuYiY2NTUzNSkrKGEuYiY2NTUzNSk7ZT0oYy5iPj4+MTYpK1xuKGEuYj4+PjE2KSsoZD4+PjE2KTtoPShlJjY1NTM1KTw8MTZ8ZCY2NTUzNTtkPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhlPj4+MTYpO2U9KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkPj4+MTYpO3JldHVybiBuZXcgYigoZSY2NTUzNSk8PDE2fGQmNjU1MzUsaCl9ZnVuY3Rpb24gbmEoYyxhLGQsZSl7dmFyIGgsbixnO2g9KGMuYiY2NTUzNSkrKGEuYiY2NTUzNSkrKGQuYiY2NTUzNSkrKGUuYiY2NTUzNSk7bj0oYy5iPj4+MTYpKyhhLmI+Pj4xNikrKGQuYj4+PjE2KSsoZS5iPj4+MTYpKyhoPj4+MTYpO2c9KG4mNjU1MzUpPDwxNnxoJjY1NTM1O2g9KGMuYSY2NTUzNSkrKGEuYSY2NTUzNSkrKGQuYSY2NTUzNSkrKGUuYSY2NTUzNSkrKG4+Pj4xNik7bj0oYy5hPj4+MTYpKyhhLmE+Pj4xNikrKGQuYT4+PjE2KSsoZS5hPj4+MTYpKyhoPj4+MTYpO3JldHVybiBuZXcgYigobiY2NTUzNSk8PDE2fGgmNjU1MzUsZyl9ZnVuY3Rpb24gb2EoYyxhLGQsZSxoKXt2YXIgbixnLGw7bj0oYy5iJlxuNjU1MzUpKyhhLmImNjU1MzUpKyhkLmImNjU1MzUpKyhlLmImNjU1MzUpKyhoLmImNjU1MzUpO2c9KGMuYj4+PjE2KSsoYS5iPj4+MTYpKyhkLmI+Pj4xNikrKGUuYj4+PjE2KSsoaC5iPj4+MTYpKyhuPj4+MTYpO2w9KGcmNjU1MzUpPDwxNnxuJjY1NTM1O249KGMuYSY2NTUzNSkrKGEuYSY2NTUzNSkrKGQuYSY2NTUzNSkrKGUuYSY2NTUzNSkrKGguYSY2NTUzNSkrKGc+Pj4xNik7Zz0oYy5hPj4+MTYpKyhhLmE+Pj4xNikrKGQuYT4+PjE2KSsoZS5hPj4+MTYpKyhoLmE+Pj4xNikrKG4+Pj4xNik7cmV0dXJuIG5ldyBiKChnJjY1NTM1KTw8MTZ8biY2NTUzNSxsKX1mdW5jdGlvbiBCKGMsYSl7cmV0dXJuIG5ldyBiKGMuYV5hLmEsYy5iXmEuYil9ZnVuY3Rpb24gQShjKXt2YXIgYT1bXSxkO2lmKFwiU0hBLTFcIj09PWMpYT1bMTczMjU4NDE5Myw0MDIzMjMzNDE3LDI1NjIzODMxMDIsMjcxNzMzODc4LDMyODUzNzc1MjBdO2Vsc2UgaWYoMD09PWMubGFzdEluZGV4T2YoXCJTSEEtXCIsMCkpc3dpdGNoKGE9XG5bMzIzODM3MTAzMiw5MTQxNTA2NjMsODEyNzAyOTk5LDQxNDQ5MTI2OTcsNDI5MDc3NTg1NywxNzUwNjAzMDI1LDE2OTQwNzY4MzksMzIwNDA3NTQyOF0sZD1bMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjVdLGMpe2Nhc2UgXCJTSEEtMjI0XCI6YnJlYWs7Y2FzZSBcIlNIQS0yNTZcIjphPWQ7YnJlYWs7Y2FzZSBcIlNIQS0zODRcIjphPVtuZXcgYigzNDE4MDcwMzY1LGFbMF0pLG5ldyBiKDE2NTQyNzAyNTAsYVsxXSksbmV3IGIoMjQzODUyOTM3MCxhWzJdKSxuZXcgYigzNTU0NjIzNjAsYVszXSksbmV3IGIoMTczMTQwNTQxNSxhWzRdKSxuZXcgYig0MTA0ODg4NTg5NSxhWzVdKSxuZXcgYigzNjc1MDA4NTI1LGFbNl0pLG5ldyBiKDEyMDMwNjI4MTMsYVs3XSldO2JyZWFrO2Nhc2UgXCJTSEEtNTEyXCI6YT1bbmV3IGIoZFswXSw0MDg5MjM1NzIwKSxuZXcgYihkWzFdLDIyMjc4NzM1OTUpLFxubmV3IGIoZFsyXSw0MjcxMTc1NzIzKSxuZXcgYihkWzNdLDE1OTU3NTAxMjkpLG5ldyBiKGRbNF0sMjkxNzU2NTEzNyksbmV3IGIoZFs1XSw3MjU1MTExOTkpLG5ldyBiKGRbNl0sNDIxNTM4OTU0NyksbmV3IGIoZFs3XSwzMjcwMzMyMDkpXTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiVW5rbm93biBTSEEgdmFyaWFudFwiKTt9ZWxzZSBpZigwPT09Yy5sYXN0SW5kZXhPZihcIlNIQTMtXCIsMCl8fDA9PT1jLmxhc3RJbmRleE9mKFwiU0hBS0VcIiwwKSlmb3IoYz0wOzU+YztjKz0xKWFbY109W25ldyBiKDAsMCksbmV3IGIoMCwwKSxuZXcgYigwLDApLG5ldyBiKDAsMCksbmV3IGIoMCwwKV07ZWxzZSB0aHJvdyBFcnJvcihcIk5vIFNIQSB2YXJpYW50cyBzdXBwb3J0ZWRcIik7cmV0dXJuIGF9ZnVuY3Rpb24gSyhjLGEpe3ZhciBiPVtdLGUsZCxuLGcsbCxwLGY7ZT1hWzBdO2Q9YVsxXTtuPWFbMl07Zz1hWzNdO2w9YVs0XTtmb3IoZj0wOzgwPmY7Zis9MSliW2ZdPTE2PmY/Y1tmXTp5KGJbZi1cbjNdXmJbZi04XV5iW2YtMTRdXmJbZi0xNl0sMSkscD0yMD5mP0goeShlLDUpLGQmbl5+ZCZnLGwsMTUxODUwMDI0OSxiW2ZdKTo0MD5mP0goeShlLDUpLGRebl5nLGwsMTg1OTc3NTM5MyxiW2ZdKTo2MD5mP0goeShlLDUpLFUoZCxuLGcpLGwsMjQwMDk1OTcwOCxiW2ZdKTpIKHkoZSw1KSxkXm5eZyxsLDMzOTU0Njk3ODIsYltmXSksbD1nLGc9bixuPXkoZCwzMCksZD1lLGU9cDthWzBdPUcoZSxhWzBdKTthWzFdPUcoZCxhWzFdKTthWzJdPUcobixhWzJdKTthWzNdPUcoZyxhWzNdKTthWzRdPUcobCxhWzRdKTtyZXR1cm4gYX1mdW5jdGlvbiBaKGMsYSxiLGUpe3ZhciBkO2ZvcihkPShhKzY1Pj4+OTw8NCkrMTU7Yy5sZW5ndGg8PWQ7KWMucHVzaCgwKTtjW2E+Pj41XXw9MTI4PDwyNC1hJTMyO2ErPWI7Y1tkXT1hJjQyOTQ5NjcyOTU7Y1tkLTFdPWEvNDI5NDk2NzI5NnwwO2E9Yy5sZW5ndGg7Zm9yKGQ9MDtkPGE7ZCs9MTYpZT1LKGMuc2xpY2UoZCxkKzE2KSxlKTtyZXR1cm4gZX1mdW5jdGlvbiBMKGMsXG5hLGspe3ZhciBlLGgsbixnLGwscCxmLG0scSx1LHIsdCx2LHcseSxBLHoseCxGLEIsQyxELEU9W10sSjtpZihcIlNIQS0yMjRcIj09PWt8fFwiU0hBLTI1NlwiPT09ayl1PTY0LHQ9MSxEPU51bWJlcix2PUcsdz1sYSx5PUgsQT1oYSx6PWphLHg9ZGEsRj1mYSxDPVUsQj1hYSxKPWQ7ZWxzZSBpZihcIlNIQS0zODRcIj09PWt8fFwiU0hBLTUxMlwiPT09ayl1PTgwLHQ9MixEPWIsdj1tYSx3PW5hLHk9b2EsQT1pYSx6PWthLHg9ZWEsRj1nYSxDPWNhLEI9YmEsSj1WO2Vsc2UgdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIFNIQS0yIGltcGxlbWVudGF0aW9uXCIpO2s9YVswXTtlPWFbMV07aD1hWzJdO249YVszXTtnPWFbNF07bD1hWzVdO3A9YVs2XTtmPWFbN107Zm9yKHI9MDtyPHU7cis9MSkxNj5yPyhxPXIqdCxtPWMubGVuZ3RoPD1xPzA6Y1txXSxxPWMubGVuZ3RoPD1xKzE/MDpjW3ErMV0sRVtyXT1uZXcgRChtLHEpKTpFW3JdPXcoeihFW3ItMl0pLEVbci03XSxBKEVbci0xNV0pLEVbci1cbjE2XSksbT15KGYsRihnKSxCKGcsbCxwKSxKW3JdLEVbcl0pLHE9dih4KGspLEMoayxlLGgpKSxmPXAscD1sLGw9ZyxnPXYobixtKSxuPWgsaD1lLGU9ayxrPXYobSxxKTthWzBdPXYoayxhWzBdKTthWzFdPXYoZSxhWzFdKTthWzJdPXYoaCxhWzJdKTthWzNdPXYobixhWzNdKTthWzRdPXYoZyxhWzRdKTthWzVdPXYobCxhWzVdKTthWzZdPXYocCxhWzZdKTthWzddPXYoZixhWzddKTtyZXR1cm4gYX1mdW5jdGlvbiBEKGMsYSl7dmFyIGQsZSxoLG4sZz1bXSxsPVtdO2lmKG51bGwhPT1jKWZvcihlPTA7ZTxjLmxlbmd0aDtlKz0yKWFbKGU+Pj4xKSU1XVsoZT4+PjEpLzV8MF09QihhWyhlPj4+MSklNV1bKGU+Pj4xKS81fDBdLG5ldyBiKGNbZSsxXSxjW2VdKSk7Zm9yKGQ9MDsyND5kO2QrPTEpe249QShcIlNIQTMtXCIpO2ZvcihlPTA7NT5lO2UrPTEpe2g9YVtlXVswXTt2YXIgcD1hW2VdWzFdLGY9YVtlXVsyXSxtPWFbZV1bM10scT1hW2VdWzRdO2dbZV09bmV3IGIoaC5hXnAuYV5mLmFeXG5tLmFecS5hLGguYl5wLmJeZi5iXm0uYl5xLmIpfWZvcihlPTA7NT5lO2UrPTEpbFtlXT1CKGdbKGUrNCklNV0sUyhnWyhlKzEpJTVdLDEpKTtmb3IoZT0wOzU+ZTtlKz0xKWZvcihoPTA7NT5oO2grPTEpYVtlXVtoXT1CKGFbZV1baF0sbFtlXSk7Zm9yKGU9MDs1PmU7ZSs9MSlmb3IoaD0wOzU+aDtoKz0xKW5baF1bKDIqZSszKmgpJTVdPVMoYVtlXVtoXSxXW2VdW2hdKTtmb3IoZT0wOzU+ZTtlKz0xKWZvcihoPTA7NT5oO2grPTEpYVtlXVtoXT1CKG5bZV1baF0sbmV3IGIofm5bKGUrMSklNV1baF0uYSZuWyhlKzIpJTVdW2hdLmEsfm5bKGUrMSklNV1baF0uYiZuWyhlKzIpJTVdW2hdLmIpKTthWzBdWzBdPUIoYVswXVswXSxYW2RdKX1yZXR1cm4gYX12YXIgZCxWLFcsWDtkPVsxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsXG4xNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSxcbjIyMjc3MzA0NTIsMjM2MTg1MjQyNCwyNDI4NDM2NDc0LDI3NTY3MzQxODcsMzIwNDAzMTQ3OSwzMzI5MzI1Mjk4XTtWPVtuZXcgYihkWzBdLDM2MDk3Njc0NTgpLG5ldyBiKGRbMV0sNjAyODkxNzI1KSxuZXcgYihkWzJdLDM5NjQ0ODQzOTkpLG5ldyBiKGRbM10sMjE3MzI5NTU0OCksbmV3IGIoZFs0XSw0MDgxNjI4NDcyKSxuZXcgYihkWzVdLDMwNTM4MzQyNjUpLG5ldyBiKGRbNl0sMjkzNzY3MTU3OSksbmV3IGIoZFs3XSwzNjY0NjA5NTYwKSxuZXcgYihkWzhdLDI3MzQ4ODMzOTQpLG5ldyBiKGRbOV0sMTE2NDk5NjU0MiksbmV3IGIoZFsxMF0sMTMyMzYxMDc2NCksbmV3IGIoZFsxMV0sMzU5MDMwNDk5NCksbmV3IGIoZFsxMl0sNDA2ODE4MjM4MyksbmV3IGIoZFsxM10sOTkxMzM2MTEzKSxuZXcgYihkWzE0XSw2MzM4MDMzMTcpLG5ldyBiKGRbMTVdLDM0Nzk3NzQ4NjgpLG5ldyBiKGRbMTZdLDI2NjY2MTM0NTgpLG5ldyBiKGRbMTddLDk0NDcxMTEzOSksbmV3IGIoZFsxOF0sMjM0MTI2Mjc3MyksXG5uZXcgYihkWzE5XSwyMDA3ODAwOTMzKSxuZXcgYihkWzIwXSwxNDk1OTkwOTAxKSxuZXcgYihkWzIxXSwxODU2NDMxMjM1KSxuZXcgYihkWzIyXSwzMTc1MjE4MTMyKSxuZXcgYihkWzIzXSwyMTk4OTUwODM3KSxuZXcgYihkWzI0XSwzOTk5NzE5MzM5KSxuZXcgYihkWzI1XSw3NjY3ODQwMTYpLG5ldyBiKGRbMjZdLDI1NjY1OTQ4NzkpLG5ldyBiKGRbMjddLDMyMDMzMzc5NTYpLG5ldyBiKGRbMjhdLDEwMzQ0NTcwMjYpLG5ldyBiKGRbMjldLDI0NjY5NDg5MDEpLG5ldyBiKGRbMzBdLDM3NTgzMjYzODMpLG5ldyBiKGRbMzFdLDE2ODcxNzkzNiksbmV3IGIoZFszMl0sMTE4ODE3OTk2NCksbmV3IGIoZFszM10sMTU0NjA0NTczNCksbmV3IGIoZFszNF0sMTUyMjgwNTQ4NSksbmV3IGIoZFszNV0sMjY0MzgzMzgyMyksbmV3IGIoZFszNl0sMjM0MzUyNzM5MCksbmV3IGIoZFszN10sMTAxNDQ3NzQ4MCksbmV3IGIoZFszOF0sMTIwNjc1OTE0MiksbmV3IGIoZFszOV0sMzQ0MDc3NjI3KSxcbm5ldyBiKGRbNDBdLDEyOTA4NjM0NjApLG5ldyBiKGRbNDFdLDMxNTg0NTQyNzMpLG5ldyBiKGRbNDJdLDM1MDU5NTI2NTcpLG5ldyBiKGRbNDNdLDEwNjIxNzAwOCksbmV3IGIoZFs0NF0sMzYwNjAwODM0NCksbmV3IGIoZFs0NV0sMTQzMjcyNTc3NiksbmV3IGIoZFs0Nl0sMTQ2NzAzMTU5NCksbmV3IGIoZFs0N10sODUxMTY5NzIwKSxuZXcgYihkWzQ4XSwzMTAwODIzNzUyKSxuZXcgYihkWzQ5XSwxMzYzMjU4MTk1KSxuZXcgYihkWzUwXSwzNzUwNjg1NTkzKSxuZXcgYihkWzUxXSwzNzg1MDUwMjgwKSxuZXcgYihkWzUyXSwzMzE4MzA3NDI3KSxuZXcgYihkWzUzXSwzODEyNzIzNDAzKSxuZXcgYihkWzU0XSwyMDAzMDM0OTk1KSxuZXcgYihkWzU1XSwzNjAyMDM2ODk5KSxuZXcgYihkWzU2XSwxNTc1OTkwMDEyKSxuZXcgYihkWzU3XSwxMTI1NTkyOTI4KSxuZXcgYihkWzU4XSwyNzE2OTA0MzA2KSxuZXcgYihkWzU5XSw0NDI3NzYwNDQpLG5ldyBiKGRbNjBdLDU5MzY5ODM0NCksbmV3IGIoZFs2MV0sXG4zNzMzMTEwMjQ5KSxuZXcgYihkWzYyXSwyOTk5MzUxNTczKSxuZXcgYihkWzYzXSwzODE1OTIwNDI3KSxuZXcgYigzMzkxNTY5NjE0LDM5MjgzODM5MDApLG5ldyBiKDM1MTUyNjcyNzEsNTY2MjgwNzExKSxuZXcgYigzOTQwMTg3NjA2LDM0NTQwNjk1MzQpLG5ldyBiKDQxMTg2MzAyNzEsNDAwMDIzOTk5MiksbmV3IGIoMTE2NDE4NDc0LDE5MTQxMzg1NTQpLG5ldyBiKDE3NDI5MjQyMSwyNzMxMDU1MjcwKSxuZXcgYigyODkzODAzNTYsMzIwMzk5MzAwNiksbmV3IGIoNDYwMzkzMjY5LDMyMDYyMDMxNSksbmV3IGIoNjg1NDcxNzMzLDU4NzQ5NjgzNiksbmV3IGIoODUyMTQyOTcxLDEwODY3OTI4NTEpLG5ldyBiKDEwMTcwMzYyOTgsMzY1NTQzMTAwKSxuZXcgYigxMTI2MDAwNTgwLDI2MTgyOTc2NzYpLG5ldyBiKDEyODgwMzM0NzAsMzQwOTg1NTE1OCksbmV3IGIoMTUwMTUwNTk0OCw0MjM0NTA5ODY2KSxuZXcgYigxNjA3MTY3OTE1LDk4NzE2NzQ2OCksbmV3IGIoMTgxNjQwMjMxNixcbjEyNDYxODk1OTEpXTtYPVtuZXcgYigwLDEpLG5ldyBiKDAsMzI4OTgpLG5ldyBiKDIxNDc0ODM2NDgsMzI5MDYpLG5ldyBiKDIxNDc0ODM2NDgsMjE0NzUxNjQxNiksbmV3IGIoMCwzMjkwNyksbmV3IGIoMCwyMTQ3NDgzNjQ5KSxuZXcgYigyMTQ3NDgzNjQ4LDIxNDc1MTY1NDUpLG5ldyBiKDIxNDc0ODM2NDgsMzI3NzcpLG5ldyBiKDAsMTM4KSxuZXcgYigwLDEzNiksbmV3IGIoMCwyMTQ3NTE2NDI1KSxuZXcgYigwLDIxNDc0ODM2NTgpLG5ldyBiKDAsMjE0NzUxNjU1NSksbmV3IGIoMjE0NzQ4MzY0OCwxMzkpLG5ldyBiKDIxNDc0ODM2NDgsMzI5MDUpLG5ldyBiKDIxNDc0ODM2NDgsMzI3NzEpLG5ldyBiKDIxNDc0ODM2NDgsMzI3NzApLG5ldyBiKDIxNDc0ODM2NDgsMTI4KSxuZXcgYigwLDMyNzc4KSxuZXcgYigyMTQ3NDgzNjQ4LDIxNDc0ODM2NTgpLG5ldyBiKDIxNDc0ODM2NDgsMjE0NzUxNjU0NSksbmV3IGIoMjE0NzQ4MzY0OCwzMjg5NiksbmV3IGIoMCwyMTQ3NDgzNjQ5KSxcbm5ldyBiKDIxNDc0ODM2NDgsMjE0NzUxNjQyNCldO1c9W1swLDM2LDMsNDEsMThdLFsxLDQ0LDEwLDQ1LDJdLFs2Miw2LDQzLDE1LDYxXSxbMjgsNTUsMjUsMjEsNTZdLFsyNywyMCwzOSw4LDE0XV07XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gQ30pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgZXhwb3J0cz8oXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9QyksZXhwb3J0cz1DKTpZLmpzU0hBPUN9KSh0aGlzKTtcbiIsImltcG9ydCB7TWVzc2FnZSwgRXZlbnRzLCBTdWNjZXNzU3RhdGV9IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IHtTcGlDb25maWcsIFRyYW5zYWN0aW9uT3B0aW9uc30gZnJvbSAnLi9TcGlNb2RlbHMnO1xuaW1wb3J0IHtSZXF1ZXN0SWRIZWxwZXJ9IGZyb20gJy4vUmVxdWVzdElkSGVscGVyJztcblxuZXhwb3J0IGNsYXNzIENhc2hvdXRPbmx5UmVxdWVzdFxueyAgXG4gICAgY29uc3RydWN0b3IoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBzdXJjaGFyZ2VBbW91bnQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuQ2FzaG91dEFtb3VudCA9IGFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLlN1cmNoYXJnZUFtb3VudCA9IHN1cmNoYXJnZUFtb3VudDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBcImNhc2hfYW1vdW50XCI6IHRoaXMuQ2FzaG91dEFtb3VudCxcbiAgICAgICAgICAgIFwic3VyY2hhcmdlX2Ftb3VudFwiOiB0aGlzLlN1cmNoYXJnZUFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuQ29uZmlnLmFkZFJlY2VpcHRDb25maWcoZGF0YSk7XG4gICAgICAgIHRoaXMuT3B0aW9ucy5BZGRPcHRpb25zKGRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiY3Nob3V0XCIpLCBFdmVudHMuQ2FzaG91dE9ubHlSZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXNob3V0T25seVJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TY2hlbWVOYW1lID0gbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBtLkdldFN1Y2Nlc3NTdGF0ZSgpID09IFN1Y2Nlc3NTdGF0ZS5TdWNjZXNzO1xuICAgIH1cblxuICAgIEdldFJSTigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wicnJuXCJdO1xuICAgIH1cblxuICAgIEdldENhc2hvdXRBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImNhc2hfYW1vdW50XCJdO1xuICAgIH1cblxuICAgIEdldEJhbmtOb25DYXNoQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYW5rX25vbmNhc2hfYW1vdW50XCJdO1xuICAgIH1cblxuICAgIEdldEJhbmtDYXNoQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYW5rX2Nhc2hfYW1vdW50XCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRDdXN0b21lclJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImN1c3RvbWVyX3JlY2VpcHRcIl07XG4gICAgfVxuXG4gICAgR2V0TWVyY2hhbnRSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJtZXJjaGFudF9yZWNlaXB0XCJdO1xuICAgIH1cbiAgICBcbiAgICBHZXRSZXNwb25zZVRleHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImhvc3RfcmVzcG9uc2VfdGV4dFwiXTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZUNvZGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImhvc3RfcmVzcG9uc2VfY29kZVwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0VGVybWluYWxSZWZlcmVuY2VJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1widGVybWluYWxfcmVmX2lkXCJdO1xuICAgIH1cblxuICAgIEdldEFjY291bnRUeXBlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJhY2NvdW50X3R5cGVcIl07XG4gICAgfVxuXG4gICAgR2V0QXV0aENvZGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImF1dGhfY29kZVwiXTtcbiAgICB9XG5cbiAgICBHZXRCYW5rRGF0ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFua19kYXRlXCJdO1xuICAgIH1cblxuICAgIEdldEJhbmtUaW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYW5rX3RpbWVcIl07XG4gICAgfVxuICAgIFxuICAgIEdldE1hc2tlZFBhbigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wibWFza2VkX3BhblwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0VGVybWluYWxJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1widGVybWluYWxfaWRcIl07XG4gICAgfVxuXG4gICAgV2FzTWVyY2hhbnRSZWNlaXB0UHJpbnRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wibWVyY2hhbnRfcmVjZWlwdF9wcmludGVkXCJdO1xuICAgIH1cblxuICAgIFdhc0N1c3RvbWVyUmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImN1c3RvbWVyX3JlY2VpcHRfcHJpbnRlZFwiXTtcbiAgICB9XG4gICAgXG4gICAgR2V0U3VyY2hhcmdlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJzdXJjaGFyZ2VfYW1vdW50XCJdO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlVmFsdWUoYXR0cmlidXRlKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVthdHRyaWJ1dGVdO1xuICAgIH1cblxufSIsImV4cG9ydCBjb25zdCBDb25uZWN0aW9uU3RhdGUgPSB7XG4gICAgRGlzY29ubmVjdGVkOiAnRGlzY29ubmVjdGVkJyxcbiAgICBDb25uZWN0aW5nOiAnQ29ubmVjdGluZycsXG4gICAgQ29ubmVjdGVkOiAnQ29ubmVjdGVkJ1xufTtcblxuZXhwb3J0IGNvbnN0IFNQSV9QUk9UT0NPTCAgID0gJ3NwaS4yLjQuMCc7XG5leHBvcnQgY29uc3QgU1BJX1VSSV9TQ0hFTUUgPSAnd3NzJzsgLy8gd3NzID0gc2VjdXJlIChodHRwcyAvIFRMUyksIHdzID0gbm9uIHNlY3VyZSAoaHR0cClcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0ZUV2ZW50QXJnc1xue1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLkNvbm5lY3Rpb25TdGF0ZSA9IGNvbm5lY3Rpb25TdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRXZlbnRBcmdzXG57XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkFkZHJlc3MgICAgPSBudWxsO1xuICAgICAgICB0aGlzLkNvbm5lY3RlZCAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TdGF0ZSAgICAgID0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5TcGlQcm90b2NvbCA9IFNQSV9QUk9UT0NPTDtcbiAgICAgICAgdGhpcy5fd3MgICAgICAgID0gbnVsbDtcblxuICAgICAgICBpZih0eXBlb2YgV2ViU29ja2V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IFdlYlNvY2tldHMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvbm5lY3QoKSB7XG4gICAgICAgIGlmKHRoaXMuU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQgfHwgdGhpcy5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgIC8vIGFscmVhZHkgY29ubmVjdGVkIG9yIGNvbm5lY3RpbmcuIGRpc2Nvbm5lY3QgZmlyc3QuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBuZXcgc29ja2V0IGluc3RhbmNlIHNwZWNpZnlpbmcgdGhlIHVybCwgU1BJIHByb3RvY29sIGFuZCBXZWJzb2NrZXQgdG8gdXNlLlxuICAgICAgICAvL1RoZSB3aWxsIGNyZWF0ZSBhIFRDUC9JUCBzb2NrZXQgY29ubmVjdGlvbiB0byB0aGUgcHJvdmlkZWQgVVJMIGFuZCBwZXJmb3JtIEhUVFAgd2Vic29ja2V0IG5lZ290aWF0aW9uXG4gICAgICAgIHRoaXMuX3dzICAgICAgICAgICA9IG5ldyBXZWJTb2NrZXQodGhpcy5BZGRyZXNzLCB0aGlzLlNwaVByb3RvY29sKTtcbiAgICAgICAgdGhpcy5fd3Mub25vcGVuICAgID0gKCkgPT4gdGhpcy5wb2xsV2ViU29ja2V0Q29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSAocGF5bG9hZCkgPT4gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZChwYXlsb2FkKTtcbiAgICAgICAgdGhpcy5fd3Mub25jbG9zZSAgID0gKCkgPT4gdGhpcy5vbkNsb3NlZCgpO1xuICAgICAgICB0aGlzLl93cy5vbmVycm9yICAgPSAoZXJyKSA9PiB0aGlzLm9uRXJyb3IoZXJyKTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQnLCB7ZGV0YWlsOiBuZXcgQ29ubmVjdGlvblN0YXRlRXZlbnRBcmdzKENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nKX0pKTtcbiAgICB9XG5cbiAgICBEaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5TdGF0ZSA9PSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYodGhpcy5fd3MgJiYgdGhpcy5fd3MucmVhZHlTdGF0ZSAhPSB0aGlzLl93cy5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX3dzLmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9ub3BlbiAgICA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25jbG9zZSAgID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uZXJyb3IgICA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2xvc2VkKCk7XG4gICAgfVxuXG4gICAgU2VuZChtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX3dzLnNlbmQobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25PcGVuZWQoKSB7XG4gICAgICAgIHRoaXMuU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xuICAgICAgICB0aGlzLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIHtkZXRhaWw6IG5ldyBDb25uZWN0aW9uU3RhdGVFdmVudEFyZ3MoQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCl9KSk7XG4gICAgfVxuXG4gICAgb25DbG9zZWQoKSB7XG4gICAgICAgIHRoaXMuQ29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xuICAgICAgICB0aGlzLl93cyA9IG51bGw7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCcsIHtkZXRhaWw6IG5ldyBDb25uZWN0aW9uU3RhdGVFdmVudEFyZ3MoQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCl9KSk7XG4gICAgfVxuXG4gICAgcG9sbFdlYlNvY2tldENvbm5lY3Rpb24oY291bnQgPSAwKSB7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLl93cy5yZWFkeVN0YXRlID09PSB0aGlzLl93cy5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLm9uT3BlbmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKGNvdW50IDwgMjUpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucG9sbFdlYlNvY2tldENvbm5lY3Rpb24oY291bnQpLCAyMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5EaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdNZXNzYWdlUmVjZWl2ZWQnLCB7ZGV0YWlsOiBuZXcgTWVzc2FnZUV2ZW50QXJncyhtZXNzYWdlLmRhdGEpfSkpO1xuICAgIH1cblxuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdFcnJvclJlY2VpdmVkJywge2RldGFpbDogbmV3IE1lc3NhZ2VFdmVudEFyZ3MoZXJyKX0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQganNTSEEgZnJvbSAnanNzaGEnO1xuaW1wb3J0IGFlc2pzIGZyb20gJ2Flcy1qcyc7XG5cbmV4cG9ydCBjbGFzcyBDcnlwdG8ge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gRW5jcnlwdCBhIGJsb2NrIHVzaW5nIENCQyBhbmQgUEtDUzcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIGtleSB2YWx1ZTwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+VGhlIG1lc3NhZ2UgdG8gZW5jcnlwdDwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+UmV0dXJucyB0aGUgcmVzdWx0aW5nIGVuY3J5cHRlZCBzdHJpbmcgZGF0YSBhcyBIRVguPC9yZXR1cm5zPlxuICAgIHN0YXRpYyBBZXNFbmNyeXB0IChrZXksIGRhdGEpIHtcbiAgICAgICAgbGV0IGJ5dGVzID0gYWVzanMudXRpbHMuaGV4LnRvQnl0ZXMoa2V5KTtcbiAgICAgICAgY29uc3QgaXYgPSBbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCBdO1xuICAgICAgICBjb25zdCB0ZXh0Qnl0ZXMgPSBhZXNqcy5wYWRkaW5nLnBrY3M3LnBhZChhZXNqcy51dGlscy51dGY4LnRvQnl0ZXMoZGF0YSkpO1xuICAgICAgICBjb25zdCBhZXNDYmMgPSBuZXcgYWVzanMuTW9kZU9mT3BlcmF0aW9uLmNiYyhieXRlcywgaXYpO1xuICAgICAgICBjb25zdCBlbmNyeXB0ZWRCeXRlcyA9IGFlc0NiYy5lbmNyeXB0KHRleHRCeXRlcyk7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFN0cmluZyA9IGFlc2pzLnV0aWxzLmhleC5mcm9tQnl0ZXMoZW5jcnlwdGVkQnl0ZXMpO1xuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWRTdHJpbmc7XG4gICAgfVxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIERlY3J5cHQgYSBibG9jayB1c2luZyBhIENCQyBhbmQgUEtDUzcuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIGtleSB2YWx1ZTwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+dGhlIGRhdGEgdG8gZGVjcnlwdDwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+UmV0dXJucyB0aGUgcmVzdWx0aW5nIGRhdGEgZGVjcnlwdGVkIGluIHBsYWludGV4dC48L3JldHVybnM+XG4gICAgc3RhdGljIEFlc0RlY3J5cHQoa2V5LCBkYXRhKSB7XG4gICAgICAgIGxldCBieXRlcyA9IGFlc2pzLnV0aWxzLmhleC50b0J5dGVzKGtleSk7XG4gICAgICAgIGNvbnN0IGl2ID0gWzB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgXTtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkQnl0ZXMgPSBhZXNqcy51dGlscy5oZXgudG9CeXRlcyhkYXRhKTtcbiAgICAgICAgY29uc3QgYWVzQ2JjID0gbmV3IGFlc2pzLk1vZGVPZk9wZXJhdGlvbi5jYmMoYnl0ZXMsIGl2KTtcbiAgICAgICAgY29uc3QgZGVjcnlwdGVkQnl0ZXMgPSBhZXNDYmMuZGVjcnlwdChlbmNyeXB0ZWRCeXRlcyk7XG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGFlc2pzLnV0aWxzLnV0ZjguZnJvbUJ5dGVzKGFlc2pzLnBhZGRpbmcucGtjczcuc3RyaXAoZGVjcnlwdGVkQnl0ZXMpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGRlY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDYWxjdWxhdGVzIHRoZSBITUFDU0hBMjU2IHNpZ25hdHVyZSBvZiBhIG1lc3NhZ2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwia2V5XCI+VGhlIEhtYWMgS2V5IGFzIEhFWDwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlVG9TaWduXCI+VGhlIG1lc3NhZ2UgdG8gc2lnbjwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+VGhlIEhNQUNTSEEyNTYgc2lnbmF0dXJlIGFzIGEgaGV4IHN0cmluZzwvcmV0dXJucz5cbiAgICBzdGF0aWMgSG1hY1NpZ25hdHVyZShrZXksIG1lc3NhZ2VUb1NpZ24pIHtcbiAgICAgICAgbGV0IHNoYU9iaiA9IG5ldyBqc1NIQShcIlNIQS0yNTZcIiwgXCJURVhUXCIpO1xuXG4gICAgICAgIHNoYU9iai5zZXRITUFDS2V5KGtleSwnSEVYJyk7XG4gICAgICAgIHNoYU9iai51cGRhdGUobWVzc2FnZVRvU2lnbik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc2hhT2JqLmdldEhNQUMoXCJIRVhcIik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHV0aWxpdHkgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgU0hBLTI1NiB2YWx1ZSBpbiBoZXhhZGVjaW1hbCBmb3JtYXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgdGhlIHZhbHVlIHRvIGJlIGhhc2hlZFxuICAgICAqL1xuICAgIHN0YXRpYyBHZW5lcmF0ZUhhc2godmFsdWUpIHtcbiAgICAgICAgbGV0IHNoYU9iaiA9IG5ldyBqc1NIQSgnU0hBLTI1NicsICdIRVgnKTtcbiAgICAgICAgc2hhT2JqLnVwZGF0ZSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNoYUhhc2ggPSBzaGFPYmouZ2V0SGFzaCgnSEVYJyk7XG4gICAgICAgIHJldHVybiBzaGFIYXNoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRzLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL0NyeXB0byc7XG5pbXBvcnQge1NlY3JldHN9IGZyb20gJy4vU2VjcmV0cyc7XG5cbmV4cG9ydCBjbGFzcyBLZXlSb2xsaW5nSGVscGVyIHtcbiAgICBzdGF0aWMgUGVyZm9ybUtleVJvbGxpbmcoa3JSZXF1ZXN0LCBjdXJyZW50U2VjcmV0cylcbiAgICB7XG4gICAgICAgIGxldCBtID0gbmV3IE1lc3NhZ2Uoa3JSZXF1ZXN0LklkLCBFdmVudHMuS2V5Um9sbFJlc3BvbnNlLCB7XCJzdGF0dXNcIjogXCJjb25maXJtZWRcIn0sIHRydWUpO1xuICAgICAgICBsZXQgbmV3U2VjcmV0cyA9IG5ldyBTZWNyZXRzKENyeXB0by5HZW5lcmF0ZUhhc2goY3VycmVudFNlY3JldHMuRW5jS2V5KS50b1VwcGVyQ2FzZSgpLENyeXB0by5HZW5lcmF0ZUhhc2goY3VycmVudFNlY3JldHMuSG1hY0tleSkudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiBuZXcgS2V5Um9sbGluZ1Jlc3VsdChtLCBuZXdTZWNyZXRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXlSb2xsaW5nUmVzdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihrZXlSb2xsaW5nQ29uZmlybWF0aW9uLCBuZXdTZWNyZXRzKSB7XG4gICAgICAgIHRoaXMuS2V5Um9sbGluZ0NvbmZpcm1hdGlvbiA9IGtleVJvbGxpbmdDb25maXJtYXRpb247XG4gICAgICAgIHRoaXMuTmV3U2VjcmV0cyA9IG5ld1NlY3JldHM7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBsaW5lU2VwZXJhdG9yID0gJ1xcbicpIHtcbiAgICAgICAgdGhpcy5idWZmZXIgICAgID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudCAgICA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMubGluZVNlcGVyYXRvciA9IGxpbmVTZXBlcmF0b3I7XG4gICAgfVxuXG4gICAgSW5mbyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBEZWJ1ZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBXYXJuKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaChhcmdzLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxuICAgIEVycm9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaChhcmdzLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxuICAgIENvbnNvbGUoLi4uYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgX3JlbmRlcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuYnVmZmVyLmpvaW4odGhpcy5saW5lU2VwZXJhdG9yKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtMb2dnZXJ9OyIsImltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL0NyeXB0byc7XG5cbi8vIDxzdW1tYXJ5PlxuLy8gRXZlbnRzIHN0YXRpY2FsbHkgZGVjbGFyZXMgdGhlIHZhcmlvdXMgZXZlbnQgbmFtZXMgaW4gbWVzc2FnZXMuXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY29uc3QgRXZlbnRzID0ge1xuICAgICBQYWlyUmVxdWVzdCA6IFwicGFpcl9yZXF1ZXN0XCIsXG4gICAgIEtleVJlcXVlc3QgOiBcImtleV9yZXF1ZXN0XCIsXG4gICAgIEtleVJlc3BvbnNlIDogXCJrZXlfcmVzcG9uc2VcIixcbiAgICAgS2V5Q2hlY2sgOiBcImtleV9jaGVja1wiLFxuICAgICBQYWlyUmVzcG9uc2UgOiBcInBhaXJfcmVzcG9uc2VcIixcbiAgICAgRHJvcEtleXNBZHZpY2UgOiBcImRyb3Bfa2V5c1wiLFxuXG4gICAgIExvZ2luUmVxdWVzdCA6IFwibG9naW5fcmVxdWVzdFwiLFxuICAgICBMb2dpblJlc3BvbnNlIDogXCJsb2dpbl9yZXNwb25zZVwiLFxuXG4gICAgIFBpbmcgOiBcInBpbmdcIixcbiAgICAgUG9uZyA6IFwicG9uZ1wiLFxuXG4gICAgIFB1cmNoYXNlUmVxdWVzdCA6IFwicHVyY2hhc2VcIixcbiAgICAgUHVyY2hhc2VSZXNwb25zZSA6IFwicHVyY2hhc2VfcmVzcG9uc2VcIixcbiAgICAgQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0IDogXCJjYW5jZWxfdHJhbnNhY3Rpb25cIixcbiAgICAgQ2FuY2VsVHJhbnNhY3Rpb25SZXNwb25zZSA6IFwiY2FuY2VsX3Jlc3BvbnNlXCIsXG4gICAgIEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QgOiBcImdldF9sYXN0X3RyYW5zYWN0aW9uXCIsXG4gICAgIEdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIDogXCJsYXN0X3RyYW5zYWN0aW9uXCIsXG4gICAgIFJlZnVuZFJlcXVlc3QgOiBcInJlZnVuZFwiLFxuICAgICBSZWZ1bmRSZXNwb25zZSA6IFwicmVmdW5kX3Jlc3BvbnNlXCIsXG4gICAgIFNpZ25hdHVyZVJlcXVpcmVkIDogXCJzaWduYXR1cmVfcmVxdWlyZWRcIixcbiAgICAgU2lnbmF0dXJlRGVjbGluZWQgOiBcInNpZ25hdHVyZV9kZWNsaW5lXCIsXG4gICAgIFNpZ25hdHVyZUFjY2VwdGVkIDogXCJzaWduYXR1cmVfYWNjZXB0XCIsXG4gICAgIEF1dGhDb2RlUmVxdWlyZWQgOiBcImF1dGhvcmlzYXRpb25fY29kZV9yZXF1aXJlZFwiLFxuICAgICBBdXRoQ29kZUFkdmljZSA6IFwiYXV0aG9yaXNhdGlvbl9jb2RlX2FkdmljZVwiLFxuXG4gICAgIENhc2hvdXRPbmx5UmVxdWVzdCA6IFwiY2FzaFwiLFxuICAgICBDYXNob3V0T25seVJlc3BvbnNlIDogXCJjYXNoX3Jlc3BvbnNlXCIsXG5cbiAgICAgTW90b1B1cmNoYXNlUmVxdWVzdCA6IFwibW90b19wdXJjaGFzZVwiLFxuICAgICBNb3RvUHVyY2hhc2VSZXNwb25zZSA6IFwibW90b19wdXJjaGFzZV9yZXNwb25zZVwiLFxuXG4gICAgIFNldHRsZVJlcXVlc3QgOiBcInNldHRsZVwiLFxuICAgICBTZXR0bGVSZXNwb25zZSA6IFwic2V0dGxlX3Jlc3BvbnNlXCIsXG4gICAgIFNldHRsZW1lbnRFbnF1aXJ5UmVxdWVzdCA6IFwic2V0dGxlbWVudF9lbnF1aXJ5XCIsXG4gICAgIFNldHRsZW1lbnRFbnF1aXJ5UmVzcG9uc2UgOiBcInNldHRsZW1lbnRfZW5xdWlyeV9yZXNwb25zZVwiLFxuXG4gICAgIFNldFBvc0luZm9SZXF1ZXN0IDogXCJzZXRfcG9zX2luZm9cIixcbiAgICAgU2V0UG9zSW5mb1Jlc3BvbnNlIDogXCJzZXRfcG9zX2luZm9fcmVzcG9uc2VcIixcblxuICAgICBLZXlSb2xsUmVxdWVzdCA6IFwicmVxdWVzdF91c2VfbmV4dF9rZXlzXCIsXG4gICAgIEtleVJvbGxSZXNwb25zZSA6IFwicmVzcG9uc2VfdXNlX25leHRfa2V5c1wiLFxuXG4gICAgIEVycm9yIDogXCJlcnJvclwiLFxuICAgIFxuICAgICBJbnZhbGlkSG1hY1NpZ25hdHVyZSA6IFwiX0lOVkFMSURfU0lHTkFUVVJFX1wiLFxuXG4gICAgLy8gUGF5IEF0IFRhYmxlIFJlbGF0ZWQgTWVzc2FnZXNcbiAgICBQYXlBdFRhYmxlR2V0VGFibGVDb25maWcgOiBcImdldF90YWJsZV9jb25maWdcIiwgLy8gaW5jb21pbmcuIFdoZW4gZWZ0cG9zIHdhbnRzIHRvIGFzayB1cyBmb3IgUEBUIGNvbmZpZ3VyYXRpb24uXG4gICAgUGF5QXRUYWJsZVNldFRhYmxlQ29uZmlnIDogXCJzZXRfdGFibGVfY29uZmlnXCIsIC8vIG91dGdvaW5nLiBXaGVuIHdlIHdhbnQgdG8gaW5zdHJ1Y3QgZWZ0cG9zIHdpdGggdGhlIFBAVCBjb25maWd1cmF0aW9uLlxuICAgIFBheUF0VGFibGVHZXRCaWxsRGV0YWlscyA6IFwiZ2V0X2JpbGxfZGV0YWlsc1wiLCAvLyBpbmNvbWluZy4gV2hlbiBlZnRwb3Mgd2FudHMgdG8gYXJldHJpZXZlIHRoZSBiaWxsIGZvciBhIHRhYmxlLlxuICAgIFBheUF0VGFibGVCaWxsRGV0YWlscyA6IFwiYmlsbF9kZXRhaWxzXCIsICAgICAgICAvLyBvdXRnb2luZy4gV2UgcmVwbHkgd2l0aCB0aGlzIHdoZW4gZWZ0cG9zIHJlcXVlc3RzIHRvIHVzIGdldF9iaWxsX2RldGFpbHMuXG4gICAgUGF5QXRUYWJsZUJpbGxQYXltZW50IDogXCJiaWxsX3BheW1lbnRcIiwgICAgICAgIC8vIGluY29taW5nLiBXaGVuIHRoZSBlZnRwb3MgYWR2aWNlcyBcblxuICAgIFByaW50aW5nUmVxdWVzdCA6IFwicHJpbnRcIixcbiAgICBQcmludGluZ1Jlc3BvbnNlIDogXCJwcmludF9yZXNwb25zZVwiLFxuXG4gICAgVGVybWluYWxTdGF0dXNSZXF1ZXN0IDogXCJnZXRfdGVybWluYWxfc3RhdHVzXCIsXG4gICAgVGVybWluYWxTdGF0dXNSZXNwb25zZSA6IFwidGVybWluYWxfc3RhdHVzXCIsXG5cbiAgICBCYXR0ZXJ5TGV2ZWxDaGFuZ2VkIDogXCJiYXR0ZXJ5X2xldmVsX2NoYW5nZWRcIlxufTtcblxuZXhwb3J0IGNvbnN0IFN1Y2Nlc3NTdGF0ZSA9IHtcbiAgICBVbmtub3duOiAnVW5rbm93bicsIFN1Y2Nlc3M6ICdTdWNjZXNzJywgRmFpbGVkOiAnRmFpbGVkJ1xufTtcblxuLy8gPHN1bW1hcnk+XG4vLyBNZXNzYWdlU3RhbXAgcmVwcmVzZW50cyB3aGF0IGlzIHJlcXVpcmVkIHRvIHR1cm4gYW4gb3V0Z29pbmcgTWVzc2FnZSBpbnRvIEpzb25cbi8vIGluY2x1ZGluZyBlbmNyeXB0aW9uIGFuZCBkYXRlIHNldHRpbmcuXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgTWVzc2FnZVN0YW1wIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NJZCwgc2VjcmV0cywgc2VydmVyVGltZURlbHRhKSB7XG4gICAgICAgIHRoaXMuUG9zSWQgPSBwb3NJZDtcbiAgICAgICAgdGhpcy5TZWNyZXRzID0gc2VjcmV0cztcbiAgICAgICAgdGhpcy5TZXJ2ZXJUaW1lRGVsdGEgPSBzZXJ2ZXJUaW1lRGVsdGE7XG4gICAgfVxufVxuXG4vLyA8c3VtbWFyeT5cbi8vIE1lc3NhZ2VFbnZlbG9wZSByZXByZXNlbnRzIHRoZSBvdXRlciBzdHJ1Y3R1cmUgb2YgYW55IG1lc3NhZ2UgdGhhdCBpcyBleGNoYW5nZWRcbi8vIGJldHdlZW4gdGhlIFBvcyBhbmQgdGhlIFBpblBhZCBhbmQgdmljZS12ZXJzYS5cbi8vIFNlZSBodHRwOi8vd3d3LnNpbXBsZXBheW1lbnRhcGkuY29tLyMvYXBpL21lc3NhZ2UtZW5jcnlwdGlvblxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VFbnZlbG9wZSB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgZW5jLCBobWFjLCBwb3NJZCkge1xuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIE1lc3NhZ2UgZmllbGQgaXMgc2V0IG9ubHkgd2hlbiBpbiBVbi1lbmNyeXB0ZWQgZm9ybS5cbiAgICAgICAgLy8gSW4gZmFjdCBpdCBpcyB0aGUgb25seSBmaWVsZCBpbiBhbiBlbnZlbG9wZSBpbiB0aGUgVW4tRW5jcnlwdGVkIGZvcm0uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIGVuYyBmaWVsZCBpcyBzZXQgb25seSB3aGVuIGluIEVuY3J5cHRlZCBmb3JtLlxuICAgICAgICAvLyBJdCBjb250YWlucyB0aGUgZW5jcnlwdGVkIEpzb24gb2YgYW5vdGhlciBNZXNzYWdlRW52ZWxvcGUgXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5FbmMgPSBlbmM7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBobWFjIGZpZWxkIGlzIHNldCBvbmx5IHdoZW4gaW4gRW5jcnlwdGVkIGZvcm0uXG4gICAgICAgIC8vIEl0IGlzIHRoZSBzaWduYXR1cmUgb2YgdGhlIFwiZW5jXCIgZmllbGQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5IbWFjID0gaG1hYztcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHBvc19pZCBmaWVsZCBpcyBvbmx5IGZpbGxlZCBmb3Igb3V0Z29pbmcgRW5jcnlwdGVkIG1lc3NhZ2VzLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUG9zSWQgPSBwb3NJZDtcbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLk1lc3NhZ2UsXG4gICAgICAgICAgICBlbmM6IHRoaXMuRW5jLFxuICAgICAgICAgICAgaG1hYzogdGhpcy5IbWFjLFxuICAgICAgICAgICAgcG9zX2lkOiB0aGlzLlBvc0lkXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIDxzdW1tYXJ5PlxuLy8gTWVzc2FnZSByZXByZXNlbnRzIHRoZSBjb250ZW50cyBvZiBhIE1lc3NhZ2UuXG4vLyBTZWUgaHR0cDovL3d3dy5zaW1wbGVwYXltZW50YXBpLmNvbS8jL2FwaS9tZXNzYWdlLWVuY3J5cHRpb25cbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgZXZlbnROYW1lLCBkYXRhLCBuZWVkc0VuY3J5cHRpb24pIHtcbiAgICAgICAgdGhpcy5JZCA9IGlkO1xuICAgICAgICB0aGlzLkV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5EYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5EYXRlVGltZVN0YW1wID0gJyc7XG4gICAgICAgIHRoaXMuUG9zSWQgPSAnJzsgLy8gUG9zX2lkIGlzIHNldCBoZXJlIG9ubHkgZm9yIG91dGdvaW5nIFVuLWVuY3J5cHRlZCBtZXNzYWdlcy4gXG4gICAgICAgIHRoaXMuSW5jb21taW5nSG1hYyA9ICcnOyAvLyBTb21ldGltZXMgdGhlIGxvZ2ljIGFyb3VuZCB0aGUgaW5jb21pbmcgbWVzc2FnZSBtaWdodCBuZWVkIGFjY2VzcyB0byB0aGUgc3VnbmF0dXJlLCBmb3IgZXhhbXBsZSBpbiB0aGUga2V5X2NoZWNrLlxuICAgICAgICB0aGlzLl9uZWVkc0VuY3J5cHRpb24gPSBuZWVkc0VuY3J5cHRpb247IC8vIERlbm90ZXMgd2hldGhlciBhbiBvdXRnb2luZyBtZXNzYWdlIG5lZWRzIHRvIGJlIGVuY3J5cHRlZCBpbiBUb0pzb24oKVxuICAgICAgICB0aGlzLkRlY3J5cHRlZEpzb24gPSAnJzsgLy8gU2V0IG9uIGFuIGluY29taW5nIG1lc3NhZ2UganVzdCBzbyB5b3UgY2FuIGhhdmUgYSBsb29rIGF0IHdoYXQgaXQgbG9va2VkIGxpa2UgaW4gaXRzIGpzb24gZm9ybS5cbiAgICB9XG5cbiAgICBHZXRTdWNjZXNzU3RhdGUoKSB7XG4gICAgICAgIGlmKCF0aGlzLkRhdGEgfHwgdHlwZW9mIHRoaXMuRGF0YS5zdWNjZXNzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gU3VjY2Vzc1N0YXRlLlVua25vd247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5EYXRhLnN1Y2Nlc3MgPyBTdWNjZXNzU3RhdGUuU3VjY2VzcyA6IFN1Y2Nlc3NTdGF0ZS5GYWlsZWQ7XG4gICAgfVxuXG4gICAgR2V0RXJyb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkRhdGEuZXJyb3JfcmVhc29uID8gdGhpcy5EYXRhLmVycm9yX3JlYXNvbiA6IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0RXJyb3JEZXRhaWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkRhdGEuZXJyb3JfZGV0YWlsO1xuICAgIH1cblxuICAgIEdldFNlcnZlclRpbWVEZWx0YSgpXG4gICAge1xuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFN0YW1wIGZvcm1hdDogMjAxOC0wNC0xOVQwMTo0MjozOC4yNzlcbiAgICAgICAgbGV0IGR0cyA9IHRoaXMuRGF0ZVRpbWVTdGFtcC5zcGxpdCgvW1xcLVxcK1xcLiA6VF0vKTtcbiAgICAgICAgbGV0IG1zZ1RpbWUgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgIC8vIHllYXIsIG1vbnRoLCBkYXRlXG4gICAgICAgICAgICBkdHNbMF0sIGR0c1sxXSAtIDEsIGR0c1syXSxcbiAgICAgICAgICAgIC8vIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNcbiAgICAgICAgICAgIGR0c1szXSwgZHRzWzRdLCBkdHNbNV0sIGR0c1s2XVxuICAgICAgICApLmdldFRpbWUoKTsgLy8gTG9jYWwgdGltZSB6b25lXG5cbiAgICAgICAgcmV0dXJuIG1zZ1RpbWUgLSBub3c7XG4gICAgfVxuXG4gICAgLy8gSGVscGVyIG1ldGhvZCB0byBwYXJzZSBiYW5rIGRhdGUgZm9ybWF0IDIwMDQyMDE4IChkZE1NeXl5eSlcbiAgICBzdGF0aWMgUGFyc2VCYW5rRGF0ZShiYW5rRGF0ZSkge1xuICAgICAgICBpZihiYW5rRGF0ZS5sZW5ndGggIT09IDgpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShgJHtiYW5rRGF0ZS5zdWJzdHIoNCw0KX0tJHtiYW5rRGF0ZS5zdWJzdHIoMiwyKX0tJHtiYW5rRGF0ZS5zdWJzdHIoMCwyKX1gKTtcbiAgICB9XG5cbiAgICAvLyBQYXJzZXMgYSBiYW5rIGRhdGUgJiB0aW1lIHN0ciBmcm9tIFwiMDVPY3QxN1wiIC8gXCIwNTowMFwiIChcImRkTU1NeXkvSEg6bW1cIikgaW50byBkYXRlIG9ialxuICAgIHN0YXRpYyBQYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlLCB0aW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShgJHtkYXRlLnN1YnN0cigwLDIpfSAke2RhdGUuc3Vic3RyKDIsMyl9ICR7ZGF0ZS5zdWJzdHIoNSwyKX0gJHt0aW1lfWApO1xuICAgIH1cblxuICAgIHN0YXRpYyBGcm9tSnNvbihtc2dKc29uLCBzZWNyZXRzKSB7XG4gICAgICAgIGxldCBlbnYgPSBKU09OLnBhcnNlKG1zZ0pzb24pO1xuXG4gICAgICAgIGlmKGVudi5tZXNzYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZW52Lm1lc3NhZ2UuaWQsIGVudi5tZXNzYWdlLmV2ZW50LCBlbnYubWVzc2FnZS5kYXRhLCBmYWxzZSk7XG4gICAgICAgICAgICBtZXNzYWdlLkRlY3J5cHRlZEpzb24gPSBtc2dKc29uO1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjcmV0cyA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaGlzIG1heSBoYXBwZW4gaWYgd2Ugc29tZWhvdyByZWNlaXZlZCBhbiBlbmNyeXB0ZWQgbWVzc2FnZSBmcm9tIGVmdHBvcyBidXQgd2UncmUgbm90IGNvbmZpZ2VyZWQgd2l0aCBzZWNyZXRzLlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHdlIGNhbmNlbCB0aGUgcGFpcmluZyBwcm9jZXNzIGEgbGl0dGxlIGxhdGUgaW4gdGhlIGdhbWUgYW5kIHdlIGdldCBhbiBlbmNyeXB0ZWQga2V5X2NoZWNrIG1lc3NhZ2UgYWZ0ZXIgd2UndmUgZHJvcHBlZCB0aGUga2V5cy5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShcIlVOS05PV05cIiwgXCJOT1NFQ1JFVFNcIiwgbnVsbCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXRzIGVuY3J5cHRlZCwgdmVyaWZ5IHNpZ1xuICAgICAgICBsZXQgc2lnID0gQ3J5cHRvLkhtYWNTaWduYXR1cmUoc2VjcmV0cy5IbWFjS2V5LCBlbnYuZW5jKTtcbiAgICAgICAgaWYgKHNpZy50b1VwcGVyQ2FzZSgpICE9IGVudi5obWFjKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoXCJfXCIsIEV2ZW50cy5JbnZhbGlkSG1hY1NpZ25hdHVyZSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlY3J5cHRlZEpzb24gPSBDcnlwdG8uQWVzRGVjcnlwdChzZWNyZXRzLkVuY0tleSwgZW52LmVuYyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNyeXB0ZWRNc2cgPSBKU09OLnBhcnNlKGRlY3J5cHRlZEpzb24pO1xuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRlY3J5cHRlZE1zZy5tZXNzYWdlLmlkLCBkZWNyeXB0ZWRNc2cubWVzc2FnZS5ldmVudCwgZGVjcnlwdGVkTXNnLm1lc3NhZ2UuZGF0YSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIG1lc3NhZ2UuRGF0ZVRpbWVTdGFtcCA9IGRlY3J5cHRlZE1zZy5tZXNzYWdlLmRhdGV0aW1lO1xuICAgICAgICAgICAgbWVzc2FnZS5Qb3NJZCA9IGRlY3J5cHRlZE1zZy5tZXNzYWdlLnBvc19pZDtcbiAgICAgICAgICAgIG1lc3NhZ2UuSW5jb21pbmdIbWFjID0gZW52LmhtYWM7IFxuICAgICAgICAgICAgbWVzc2FnZS5EZWNyeXB0ZWRKc29uID0gZGVjcnlwdGVkSnNvbjtcblxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG5cbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoXCJVTktOT1dOXCIsIFwiVU5QQVJTRUFCTEVcIiwge1wibXNnXCI6IGRlY3J5cHRlZEpzb259LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBUb0pzb24oc3RhbXApIHtcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCB0em9mZnNldCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogMTAwMDtcbiAgICAgICAgbGV0IGFkanVzdGVkVGltZSA9IG5ldyBEYXRlKG5vdyAtIHR6b2Zmc2V0ICsgc3RhbXAuU2VydmVyVGltZURlbHRhKTtcblxuICAgICAgICAvLyBGb3JtYXQgZGF0ZTogXCJ5eXl5LU1NLWRkVEhIOm1tOnNzLmZmZlwiXG4gICAgICAgIHRoaXMuRGF0ZVRpbWVTdGFtcCA9IGFkanVzdGVkVGltZS50b0lTT1N0cmluZygpLnNsaWNlKDAsLTEpO1xuICAgICAgICB0aGlzLlBvc0lkID0gc3RhbXAuUG9zSWQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgZW52ZWxvcGUgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuSWQsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuRXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuRGF0YSxcbiAgICAgICAgICAgICAgICBkYXRldGltZTogdGhpcy5EYXRlVGltZVN0YW1wXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkc0VuY3J5cHRpb24pIHtcbiAgICAgICAgICAgIC8vIFVuZW5jcnlwdGVkIE1lc3NhZ2VzIG5lZWQgUG9zSUQgaW5zaWRlIHRoZSBtZXNzYWdlXG4gICAgICAgICAgICBlbnZlbG9wZS5tZXNzYWdlLnBvc19pZCA9IHRoaXMuUG9zSWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkRlY3J5cHRlZEpzb24gPSBKU09OLnN0cmluZ2lmeShlbnZlbG9wZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkc0VuY3J5cHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkRlY3J5cHRlZEpzb247XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZW5jTXNnID0gQ3J5cHRvLkFlc0VuY3J5cHQoc3RhbXAuU2VjcmV0cy5FbmNLZXksIHRoaXMuRGVjcnlwdGVkSnNvbik7XG4gICAgICAgIGxldCBobWFjU2lnID0gQ3J5cHRvLkhtYWNTaWduYXR1cmUoc3RhbXAuU2VjcmV0cy5IbWFjS2V5LCBlbmNNc2cpO1xuICAgICAgICBsZXQgZW5jck1lc3NhZ2VFbnZlbG9wZSA9IHtlbmM6IGVuY01zZywgaG1hYzogaG1hY1NpZy50b1VwcGVyQ2FzZSgpLCBwb3NfaWQ6IHN0YW1wLlBvc0lkfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZW5jck1lc3NhZ2VFbnZlbG9wZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudHMsIE1lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IHtSZXF1ZXN0SWRIZWxwZXJ9IGZyb20gJy4vUmVxdWVzdElkSGVscGVyJztcblxuLy8gPHN1bW1hcnk+XG4vLyBQYWlyaW5nIEludGVyYWN0aW9uIDE6IE91dGdvaW5nXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgUGFpclJlcXVlc3Qge1xuICAgIFRvTWVzc2FnZSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7cGFkZGluZzogdHJ1ZX07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwclwiKSwgRXZlbnRzLlBhaXJSZXF1ZXN0LCBkYXRhLCBmYWxzZSk7XG4gICAgfVxufVxuXG4vLyBQYWlyaW5nIEludGVyYWN0aW9uIDI6IEluY29taW5nXG5leHBvcnQgY2xhc3MgS2V5UmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IobSkge1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuQWVuYyA9IG0uRGF0YS5lbmMuQTtcbiAgICAgICAgdGhpcy5BaG1hYyA9IG0uRGF0YS5obWFjLkE7XG4gICAgfVxufVxuXG4vLyBQYWlyaW5nIEludGVyYWN0aW9uIDM6IE91dGdvaW5nXG5leHBvcnQgY2xhc3MgS2V5UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RJZCwgQmVuYywgQmhtYWMpIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSByZXF1ZXN0SWQ7XG4gICAgICAgIHRoaXMuQmVuYyA9IEJlbmM7XG4gICAgICAgIHRoaXMuQmhtYWMgPSBCaG1hYztcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgZW5jOiB7XG4gICAgICAgICAgICAgICAgQjogdGhpcy5CZW5jXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaG1hYzoge1xuICAgICAgICAgICAgICAgIEI6IHRoaXMuQmhtYWNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UodGhpcy5SZXF1ZXN0SWQsIEV2ZW50cy5LZXlSZXNwb25zZSwgZGF0YSwgZmFsc2UpO1xuICAgIH1cbn1cblxuLy8gUGFpcmluZyBJbnRlcmFjdGlvbiA0OiBJbmNvbWluZ1xuZXhwb3J0IGNsYXNzIEtleUNoZWNrIHtcbiAgICBjb25zdHJ1Y3RvcihtKSB7XG4gICAgICAgIHRoaXMuQ29uZmlybWF0aW9uQ29kZSA9IG0uSW5jb21pbmdIbWFjLnN1YnN0cmluZygwLDYpO1xuICAgIH1cbn1cblxuLy8gUGFpcmluZyBJbnRlcmFjdGlvbiA1OiBJbmNvbWluZ1xuZXhwb3J0IGNsYXNzIFBhaXJSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IobSkge1xuICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBtLkRhdGEuc3VjY2VzcztcbiAgICB9XG59XG5cbi8vIEhvbGRlciBjbGFzcyBmb3IgU2VjcmV0cyBhbmQgS2V5UmVzcG9uc2UsIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIHRvZ2V0aGVyIGluIG1ldGhvZCBzaWduYXR1cmVzLlxuZXhwb3J0IGNsYXNzIFNlY3JldHNBbmRLZXlSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3Ioc2VjcmV0cywga2V5UmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5TZWNyZXRzID0gc2VjcmV0cztcbiAgICAgICAgdGhpcy5LZXlSZXNwb25zZSA9IGtleVJlc3BvbnNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERyb3BLZXlzUmVxdWVzdFxue1xuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiZHJwa3lzXCIpLCBFdmVudHMuRHJvcEtleXNBZHZpY2UsIG51bGwsIHRydWUpO1xuICAgIH1cbn0iLCJpbXBvcnQge0V2ZW50cywgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1B1cmNoYXNlUmVzcG9uc2V9IGZyb20gJy4vUHVyY2hhc2UnO1xuXG4vLyA8c3VtbWFyeT5cbi8vIFRoaXMgY2xhc3MgcmVwcmVzZW50cyB0aGUgQmlsbERldGFpbHMgdGhhdCB0aGUgUE9TIHdpbGwgYmUgYXNrZWQgZm9yIHRocm91Z2hvdXQgYSBQYXlBdFRhYmxlIGZsb3cuXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY2xhc3MgQmlsbFN0YXR1c1Jlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBTZXQgdGhpcyBFcnJvciBhY2NvcmRpbmdseSBpZiB5b3UgYXJlIG5vdCBhYmxlIHRvIHJldHVybiB0aGUgQmlsbERldGFpbHMgdGhhdCB3ZXJlIGFza2VkIGZyb20geW91LlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGlzIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCB5b3UgYXNzaWduIHRvIGVhY2ggYmlsbC5cbiAgICAgICAgLy8gSXQgbWlndCBiZSBmb3IgZXhhbXBsZSwgdGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBjb3ZlciB3YXMgb3BlbmVkLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQmlsbElkID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGlzIGlzIHRoZSB0YWJsZSBpZCB0aGF0IHRoaXMgYmlsbCB3YXMgZm9yLlxuICAgICAgICAvLyBUaGUgd2FpdGVyIHdpbGwgZW50ZXIgaXQgb24gdGhlIEVmdHBvcyBhdCB0aGUgc3RhcnQgb2YgdGhlIFBheUF0VGFibGUgZmxvdyBhbmQgdGhlIEVmdHBvcyB3aWxsIFxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgYmlsbCB1c2luZyB0aGUgdGFibGUgaWQuIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuVGFibGVJZCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIFRvdGFsIEFtb3VudCBvbiB0aGlzIGJpbGwsIGluIGNlbnRzLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuVG90YWxBbW91bnQgPSAwO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBjdXJyZW50bHkgb3V0c2FuZGluZyBhbW91bnQgb24gdGhpcyBiaWxsLCBpbiBjZW50cy5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLk91dHN0YW5kaW5nQW1vdW50ID0gMDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gWW91ciBQT1MgaXMgcmVxdWlyZWQgdG8gcGVyc2lzdCBzb21lIHN0YXRlIG9uIGJlaGFsZiBvZiB0aGUgRWZ0cG9zIHNvIHRoZSBFZnRwb3MgY2FuIHJlY292ZXIgc3RhdGUuXG4gICAgICAgIC8vIEl0IGlzIGp1c3QgYSBwaWVjZSBvZiBzdHJpbmcgdGhhdCB5b3Ugc2F2ZSBhZ2FpbnN0IHlvdXIgYmlsbElkLlxuICAgICAgICAvLyBXSGVuZXZlciB5b3UncmUgYXNrZWQgZm9yIEJpbGxEZXRhaWxzLCBtYWtlIHN1cmUgeW91IHJldHVybiB0aGlzIHBpZWNlIG9mIGRhdGEgaWYgeW91IGhhdmUgaXQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5CaWxsRGF0YSA9IFwiXCI7XG4gICAgfVxuXG4gICAgZ2V0QmlsbFBheW1lbnRIaXN0b3J5KClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5CaWxsRGF0YSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYmlsbFBheW1lbnRIaXN0b3J5ID0gW107XG4gICAgICAgIGxldCBzYXZlZEJpbGxEYXRhID0gSlNPTi5wYXJzZSh0aGlzLkJpbGxEYXRhKTtcblxuICAgICAgICByZXR1cm4gc2F2ZWRCaWxsRGF0YS5tYXAoKGJpbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGF5bWVudEhpc3RvcnlFbnRyeShiaWxsLnBheW1lbnRfdHlwZSwgYmlsbC5wYXltZW50X3N1bW1hcnkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgVG9CaWxsRGF0YShwaClcbiAgICB7XG4gICAgICAgIGlmIChwaC5sZW5ndGggPCAxKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwaCk7XG4gICAgfVxuICAgIFxuICAgIFRvTWVzc2FnZShtZXNzYWdlSWQpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwic3VjY2Vzc1wiOiB0aGlzLlJlc3VsdD09QmlsbFJldHJpZXZhbFJlc3VsdC5TVUNDRVNTXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5CaWxsSWQpIGRhdGEuYmlsbF9pZCA9IHRoaXMuQmlsbElkO1xuICAgICAgICBpZiAodGhpcy5UYWJsZUlkKSBkYXRhLnRhYmxlX2lkID0gdGhpcy5UYWJsZUlkO1xuXG4gICAgICAgIGlmICh0aGlzLlJlc3VsdCA9PSBCaWxsUmV0cmlldmFsUmVzdWx0LlNVQ0NFU1MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRhdGEuYmlsbF90b3RhbF9hbW91bnQgPSB0aGlzLlRvdGFsQW1vdW50O1xuICAgICAgICAgICAgZGF0YS5iaWxsX291dHN0YW5kaW5nX2Ftb3VudCA9IHRoaXMuT3V0c3RhbmRpbmdBbW91bnQ7XG4gICAgICAgICAgICBkYXRhLmJpbGxfcGF5bWVudF9oaXN0b3J5ID0gdGhpcy5nZXRCaWxsUGF5bWVudEhpc3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRhdGEuZXJyb3JfcmVhc29uID0gdGhpcy5SZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGRhdGEuZXJyb3JfZGV0YWlsID0gdGhpcy5SZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShtZXNzYWdlSWQsIEV2ZW50cy5QYXlBdFRhYmxlQmlsbERldGFpbHMsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IEJpbGxSZXRyaWV2YWxSZXN1bHQgPSBcbntcbiAgICBTVUNDRVNTOiAnU1VDQ0VTUycsXG4gICAgSU5WQUxJRF9UQUJMRV9JRDogJ0lOVkFMSURfVEFCTEVfSUQnLFxuICAgIElOVkFMSURfQklMTF9JRDogJ0lOVkFMSURfQklMTF9JRCcsXG4gICAgSU5WQUxJRF9PUEVSQVRPUl9JRDogJ0lOVkFMSURfT1BFUkFUT1JfSUQnXG59O1xuXG5leHBvcnQgY29uc3QgUGF5bWVudFR5cGUgPSBcbntcbiAgICBDQVJEOiAnQ0FSRCcsXG4gICAgQ0FTSDogJ0NBU0gnIFxufTtcblxuZXhwb3J0IGNsYXNzIEJpbGxQYXltZW50XG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2luY29taW5nQWR2aWNlID0gbTtcbiAgICAgICAgdGhpcy5CaWxsSWQgPSB0aGlzLl9pbmNvbWluZ0FkdmljZS5EYXRhW1wiYmlsbF9pZFwiXTtcbiAgICAgICAgdGhpcy5UYWJsZUlkID0gdGhpcy5faW5jb21pbmdBZHZpY2UuRGF0YVtcInRhYmxlX2lkXCJdO1xuICAgICAgICB0aGlzLk9wZXJhdG9ySWQgPSB0aGlzLl9pbmNvbWluZ0FkdmljZS5EYXRhW1wib3BlcmF0b3JfaWRcIl07XG4gICAgICAgIFxuICAgICAgICB2YXIgcHQgPSB0aGlzLl9pbmNvbWluZ0FkdmljZS5EYXRhW1wicGF5bWVudF90eXBlXCJdO1xuICAgICAgICB0aGlzLlBheW1lbnRUeXBlID0gcHQ7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzIGlzIHdoZW4gd2UgcGx5IHRoZSBzdWIgb2JqZWN0IFwicGF5bWVudF9kZXRhaWxzXCIgaW50byBhIHB1cmNoYXNlIHJlc3BvbnNlIGZvciBjb252ZW5pZW5jZS5cbiAgICAgICAgdmFyIHB1cmNoYXNlTXNnID0gbmV3IE1lc3NhZ2UobS5JZCwgXCJwYXltZW50X2RldGFpbHNcIiwgbS5EYXRhW1wicGF5bWVudF9kZXRhaWxzXCJdLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuUHVyY2hhc2VSZXNwb25zZSA9IG5ldyBQdXJjaGFzZVJlc3BvbnNlKHB1cmNoYXNlTXNnKTtcblxuICAgICAgICB0aGlzLlB1cmNoYXNlQW1vdW50ID0gdGhpcy5QdXJjaGFzZVJlc3BvbnNlLkdldFB1cmNoYXNlQW1vdW50KCk7XG4gICAgICAgIHRoaXMuVGlwQW1vdW50ID0gdGhpcy5QdXJjaGFzZVJlc3BvbnNlLkdldFRpcEFtb3VudCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBheW1lbnRIaXN0b3J5RW50cnlcbntcbiAgICBjb25zdHJ1Y3RvcihwYXltZW50VHlwZSwgcGF5bWVudFN1bW1hcnkpXG4gICAge1xuICAgICAgICB0aGlzLlBheW1lbnRUeXBlID0gcGF5bWVudFR5cGU7XG4gICAgICAgIHRoaXMuUGF5bWVudFN1bW1hcnkgPSBwYXltZW50U3VtbWFyeTtcbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXltZW50X3R5cGU6IHRoaXMuUGF5bWVudFR5cGUsXG4gICAgICAgICAgICBwYXltZW50X3N1bW1hcnk6IHRoaXMuUGF5bWVudFN1bW1hcnlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgR2V0VGVybWluYWxSZWZJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5QYXltZW50U3VtbWFyeVtcInRlcm1pbmFsX3JlZl9pZFwiXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXlBdFRhYmxlQ29uZmlnXG57XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuUGF5QXRUYWJsZWRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuT3BlcmF0b3JJZEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TcGxpdEJ5QW1vdW50RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkVxdWFsU3BsaXRFbmFibGVkID0gZmFsc2U7XG4gICAgXG4gICAgICAgIHRoaXMuVGlwcGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICBcbiAgICAgICAgdGhpcy5TdW1tYXJ5UmVwb3J0RW5hYmxlZCA9IGZhbHNlO1xuICAgIFxuICAgICAgICB0aGlzLkxhYmVsUGF5QnV0dG9uID0gJyc7XG4gICAgICAgIHRoaXMuTGFiZWxPcGVyYXRvcklkID0gJyc7XG4gICAgICAgIHRoaXMuTGFiZWxUYWJsZUlkID0gJyc7XG4gICAgXG4gICAgICAgIC8vIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gRmlsbCBpbiB3aXRoIG9wZXJhdG9yIGlkcyB0aGF0IHRoZSBlZnRwb3MgdGVybWluYWwgd2lsbCB2YWxpZGF0ZSBhZ2FpbnN0LiBcbiAgICAgICAgLy8gTGVhdmUgRW1wdHkgdG8gYWxsb3cgYW55IG9wZXJhdG9yX2lkIHRocm91Z2guIFxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgdGhpcy5BbGxvd2VkT3BlcmF0b3JJZHMgPSBbXTtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UobWVzc2FnZUlkKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBheV9hdF90YWJsZV9lbmFibGVkXCI6IHRoaXMuUGF5QXRUYWJsZWRFbmFibGVkLFxuICAgICAgICAgICAgXCJvcGVyYXRvcl9pZF9lbmFibGVkXCI6IHRoaXMuT3BlcmF0b3JJZEVuYWJsZWQsXG4gICAgICAgICAgICBcInNwbGl0X2J5X2Ftb3VudF9lbmFibGVkXCI6IHRoaXMuU3BsaXRCeUFtb3VudEVuYWJsZWQsXG4gICAgICAgICAgICBcImVxdWFsX3NwbGl0X2VuYWJsZWRcIjogdGhpcy5FcXVhbFNwbGl0RW5hYmxlZCxcbiAgICAgICAgICAgIFwidGlwcGluZ19lbmFibGVkXCI6IHRoaXMuVGlwcGluZ0VuYWJsZWQsXG4gICAgICAgICAgICBcInN1bW1hcnlfcmVwb3J0X2VuYWJsZWRcIjogdGhpcy5TdW1tYXJ5UmVwb3J0RW5hYmxlZCxcbiAgICAgICAgICAgIFwicGF5X2J1dHRvbl9sYWJlbFwiOiB0aGlzLkxhYmVsUGF5QnV0dG9uLFxuICAgICAgICAgICAgXCJvcGVyYXRvcl9pZF9sYWJlbFwiOiB0aGlzLkxhYmVsT3BlcmF0b3JJZCxcbiAgICAgICAgICAgIFwidGFibGVfaWRfbGFiZWxcIjogdGhpcy5MYWJlbFRhYmxlSWQsXG4gICAgICAgICAgICBcIm9wZXJhdG9yX2lkX2xpc3RcIjogdGhpcy5BbGxvd2VkT3BlcmF0b3JJZHNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UobWVzc2FnZUlkLCBFdmVudHMuUGF5QXRUYWJsZVNldFRhYmxlQ29uZmlnLCBkYXRhLCB0cnVlKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIEZlYXR1cmVEaXNhYmxlTWVzc2FnZShtZXNzYWdlSWQpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBheV9hdF90YWJsZV9lbmFibGVkXCI6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShtZXNzYWdlSWQsIEV2ZW50cy5QYXlBdFRhYmxlU2V0VGFibGVDb25maWcsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuICAgICIsImltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge0V2ZW50cywgTWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5cbmV4cG9ydCBjbGFzcyBQb25nSGVscGVyXG57XG4gICAgc3RhdGljIEdlbmVyYXRlUG9uZ1Jlc3Nwb25zZShwaW5nKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHBpbmcuSWQsIEV2ZW50cy5Qb25nLCBudWxsLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQaW5nSGVscGVyXG57XG4gICAgc3RhdGljIEdlbmVyYXRlUGluZ1JlcXVlc3QoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBpbmdcIiksIEV2ZW50cy5QaW5nLCBudWxsLCB0cnVlKTtcbiAgICB9XG59XG4iLCJjbGFzcyBTZXRQb3NJbmZvUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHZlcnNpb24sIHZlbmRvcklkLCBsaWJyYXJ5TGFuZ3VhZ2UsIGxpYnJhcnlWZXJzaW9uLCBvdGhlckluZm8pXG4gICAge1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5fdmVuZG9ySWQgPSB2ZW5kb3JJZDtcbiAgICAgICAgdGhpcy5fbGlicmFyeUxhbmd1YWdlID0gbGlicmFyeUxhbmd1YWdlO1xuICAgICAgICB0aGlzLl9saWJyYXJ5VmVyc2lvbiA9IGxpYnJhcnlWZXJzaW9uO1xuICAgICAgICB0aGlzLl9vdGhlckluZm8gPSBvdGhlckluZm87XG4gICAgfVxuXG4gICAgdG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3ZlcnNpb246IHRoaXMuX3ZlcnNpb24sXG4gICAgICAgICAgICBwb3NfdmVuZG9yX2lkOiB0aGlzLl92ZW5kb3JJZCxcbiAgICAgICAgICAgIGxpYnJhcnlfbGFuZ3VhZ2U6IHRoaXMuX2xpYnJhcnlMYW5ndWFnZSxcbiAgICAgICAgICAgIGxpYnJhcnlfdmVyc2lvbjogdGhpcy5fbGlicmFyeVZlcnNpb24sXG4gICAgICAgICAgICBvdGhlcl9pbmZvOiB0aGlzLl9vdGhlckluZm9cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJhdlwiKSwgRXZlbnRzLlNldFBvc0luZm9SZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmNsYXNzIFNldFBvc0luZm9SZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9zdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgfVxuICAgIGlzU3VjY2VzcygpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VjY2VzcztcbiAgICB9XG4gICAgZ2V0RXJyb3JSZWFzb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5lcnJvcl9yZWFzb247XG4gICAgfVxuICAgIGdldEVycm9yRGV0YWlsKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuZXJyb3JfZGV0YWlsO1xuICAgIH1cbiAgICBnZXRSZXNwb25zZVZhbHVlV2l0aEF0dHJpYnV0ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxufVxuXG5jbGFzcyBEZXZpY2VJbmZvXG57XG4gICAgc3RhdGljIEdldEFwcERldmljZUluZm8oKVxuICAgIHtcbiAgICAgICAgdmFyIGRldmljZUluZm8gPSB7fTtcbiAgICAgICAgZGV2aWNlSW5mb1snZGV2aWNlX3N5c3RlbSddID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgLy8gZGV2aWNlSW5mby5BZGQoXCJkZXZpY2Vfc3lzdGVtXCIsIEVudmlyb25tZW50Lk9TVmVyc2lvbi5QbGF0Zm9ybS5Ub1N0cmluZygpICsgXCIgXCIgKyBFbnZpcm9ubWVudC5PU1ZlcnNpb24uVmVyc2lvbi5Ub1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGRldmljZUluZm87XG4gICAgfVxufVxuIiwiaW1wb3J0IHtSZXF1ZXN0SWRIZWxwZXJ9IGZyb20gJy4vUmVxdWVzdElkSGVscGVyJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQge1B1cmNoYXNlUmVzcG9uc2V9IGZyb20gJy4vUHVyY2hhc2UnO1xuXG5leHBvcnQgY29uc3QgUHJlYXV0aEV2ZW50cyA9IFxue1xuICAgIEFjY291bnRWZXJpZnlSZXF1ZXN0OiBcImFjY291bnRfdmVyaWZ5XCIsXG4gICAgQWNjb3VudFZlcmlmeVJlc3BvbnNlOiBcImFjY291bnRfdmVyaWZ5X3Jlc3BvbnNlXCIsXG4gICAgXG4gICAgUHJlYXV0aE9wZW5SZXF1ZXN0IDogXCJwcmVhdXRoXCIsXG4gICAgUHJlYXV0aE9wZW5SZXNwb25zZSA6IFwicHJlYXV0aF9yZXNwb25zZVwiLFxuXG4gICAgUHJlYXV0aFRvcHVwUmVxdWVzdDogXCJwcmVhdXRoX3RvcHVwXCIsXG4gICAgUHJlYXV0aFRvcHVwUmVzcG9uc2U6IFwicHJlYXV0aF90b3B1cF9yZXNwb25zZVwiLFxuXG4gICAgUHJlYXV0aEV4dGVuZFJlcXVlc3Q6IFwicHJlYXV0aF9leHRlbmRcIixcbiAgICBQcmVhdXRoRXh0ZW5kUmVzcG9uc2U6IFwicHJlYXV0aF9leHRlbmRfcmVzcG9uc2VcIixcblxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdCA6IFwicHJlYXV0aF9wYXJ0aWFsX2NhbmNlbGxhdGlvblwiLFxuICAgIFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVzcG9uc2UgOiBcInByZWF1dGhfcGFydGlhbF9jYW5jZWxsYXRpb25fcmVzcG9uc2VcIixcbiAgICBcbiAgICBQcmVhdXRoQ2FuY2VsbGF0aW9uUmVxdWVzdCA6IFwicHJlYXV0aF9jYW5jZWxsYXRpb25cIixcbiAgICBQcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2UgOiBcInByZWF1dGhfY2FuY2VsbGF0aW9uX3Jlc3BvbnNlXCIsXG5cbiAgICBQcmVhdXRoQ29tcGxldGVSZXF1ZXN0IDogXCJjb21wbGV0aW9uXCIsXG4gICAgUHJlYXV0aENvbXBsZXRlUmVzcG9uc2UgOiBcImNvbXBsZXRpb25fcmVzcG9uc2VcIlxufTtcblxuZXhwb3J0IGNsYXNzIEFjY291bnRWZXJpZnlSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJhdlwiKSwgUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWNjb3VudFZlcmlmeVJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuRGV0YWlscyA9IG5ldyBQdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gdGhpcy5EZXRhaWxzLlBvc1JlZklkO1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoT3BlblJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuUHJlYXV0aEFtb3VudCA9IGFtb3VudENlbnRzO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2Ftb3VudFwiOiB0aGlzLlByZWF1dGhBbW91bnRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJhY1wiKSwgUHJlYXV0aEV2ZW50cy5QcmVhdXRoT3BlblJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhUb3B1cFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihwcmVhdXRoSWQsIHRvcHVwQW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuVG9wdXBBbW91bnQgPSB0b3B1cEFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwb3NfcmVmX2lkXCI6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBcInByZWF1dGhfaWRcIjogdGhpcy5QcmVhdXRoSWQsXG4gICAgICAgICAgICBcInRvcHVwX2Ftb3VudFwiOiB0aGlzLlRvcHVwQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBydHVcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aFRvcHVwUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3IocHJlYXV0aElkLCBwYXJ0aWFsQ2FuY2VsbGF0aW9uQW1vdW50Q2VudHMsIHBvc1JlZklkKVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuUGFydGlhbENhbmNlbGxhdGlvbkFtb3VudCA9IHBhcnRpYWxDYW5jZWxsYXRpb25BbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2NhbmNlbF9hbW91bnRcIjogdGhpcy5QYXJ0aWFsQ2FuY2VsbGF0aW9uQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBycGNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoRXh0ZW5kUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlByZWF1dGhJZCA9IHByZWF1dGhJZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByZXh0XCIpLCBQcmVhdXRoRXZlbnRzLlByZWF1dGhFeHRlbmRSZXF1ZXN0LCBkYXRhLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVhdXRoQ2FuY2VsUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlByZWF1dGhJZCA9IHByZWF1dGhJZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIFwicG9zX3JlZl9pZFwiOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgXCJwcmVhdXRoX2lkXCI6IHRoaXMuUHJlYXV0aElkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYWNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aENhbmNlbGxhdGlvblJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWF1dGhDb21wbGV0aW9uUmVxdWVzdFxue1xuICAgIGNvbnN0cnVjdG9yKHByZWF1dGhJZCwgY29tcGxldGlvbkFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KVxuICAgIHtcbiAgICAgICAgdGhpcy5QcmVhdXRoSWQgPSBwcmVhdXRoSWQ7XG4gICAgICAgIHRoaXMuQ29tcGxldGlvbkFtb3VudCA9IGNvbXBsZXRpb25BbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLlN1cmNoYXJnZUFtb3VudCA9IHN1cmNoYXJnZUFtb3VudDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBvc19yZWZfaWRcIjogdGhpcy5Qb3NSZWZJZCxcbiAgICAgICAgICAgIFwicHJlYXV0aF9pZFwiOiB0aGlzLlByZWF1dGhJZCxcbiAgICAgICAgICAgIFwiY29tcGxldGlvbl9hbW91bnRcIjogdGhpcy5Db21wbGV0aW9uQW1vdW50LFxuICAgICAgICAgICAgXCJzdXJjaGFyZ2VfYW1vdW50XCI6IHRoaXMuU3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInByYWNcIiksIFByZWF1dGhFdmVudHMuUHJlYXV0aENvbXBsZXRlUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlYXV0aFJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuUHJlYXV0aElkID0gbS5EYXRhW1wicHJlYXV0aF9pZFwiXTtcbiAgICAgICAgdGhpcy5EZXRhaWxzID0gbmV3IFB1cmNoYXNlUmVzcG9uc2UobSk7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSB0aGlzLkRldGFpbHMuUG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgIH1cblxuICAgIEdldEJhbGFuY2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgdmFyIHR4VHlwZSA9IHRoaXMuX20uRGF0YVtcInRyYW5zYWN0aW9uX3R5cGVcIl07XG4gICAgICAgIHN3aXRjaCAodHhUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIFwiUFJFLUFVVEhcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wicHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiVE9QVVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiYmFsYW5jZV9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiQ0FOQ0VMXCI6IC8vIFBBUlRJQUwgQ0FOQ0VMTEFUSU9OXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImJhbGFuY2VfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIEVYVFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJiYWxhbmNlX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAwOyAvLyBCYWxhbmNlIGlzIDAgYWZ0ZXIgY29tcGxldGlvblxuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIENBTkNFTFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAwOyAvLyBCYWxhbmNlIGlzIDAgYWZ0ZXIgY2FuY2VsbGF0aW9uXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgR2V0UHJldmlvdXNCYWxhbmNlQW1vdW50KClcbiAgICB7XG4gICAgICAgIHZhciB0eFR5cGUgPSB0aGlzLl9tLkRhdGFbXCJ0cmFuc2FjdGlvbl90eXBlXCJdO1xuICAgICAgICBzd2l0Y2ggKHR4VHlwZSlcbiAgICAgICAgeyAgIFxuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFwiVE9QVVBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW1wiZXhpc3RpbmdfcHJlYXV0aF9hbW91bnRcIl07XG4gICAgICAgICAgICBjYXNlIFwiQ0FOQ0VMXCI6IC8vIFBBUlRJQUwgQ0FOQ0VMTEFUSU9OXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImV4aXN0aW5nX3ByZWF1dGhfYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIEVYVFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJleGlzdGluZ19wcmVhdXRoX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIC8vIFRISVMgSVMgVEVDSE5JQ0FMTFkgTk9UIENPUlJFQ1QgV0hFTiBDT01QTEVUSU9OIEhBUFBFTlMgRk9SIEEgUEFSVElBTCBBTU9VTlQuXG4gICAgICAgICAgICAgICAgLy8gQlVUIFVORk9SVFVOQVRFTFksIFRISVMgUkVTUE9OU0UgRE9FUyBOT1QgQ09OVEFJTiBcImV4aXN0aW5nX3ByZWF1dGhfYW1vdW50XCIuXG4gICAgICAgICAgICAgICAgLy8gU08gXCJjb21wbGV0aW9uX2Ftb3VudFwiIElTIFRIRSBDTE9TRVNUIFdFIEhBVkUuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YVtcImNvbXBsZXRpb25fYW1vdW50XCJdO1xuICAgICAgICAgICAgY2FzZSBcIlBSRS1BVVRIIENBTkNFTFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJwcmVhdXRoX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgR2V0Q29tcGxldGlvbkFtb3VudCgpXG4gICAge1xuICAgICAgICB2YXIgdHhUeXBlID0gdGhpcy5fbS5EYXRhW1widHJhbnNhY3Rpb25fdHlwZVwiXTtcbiAgICAgICAgc3dpdGNoICh0eFR5cGUpXG4gICAgICAgIHsgICBcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJjb21wbGV0aW9uX2Ftb3VudFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEdldFN1cmNoYXJnZUFtb3VudCgpXG4gICAge1xuICAgICAgICB2YXIgdHhUeXBlID0gdGhpcy5fbS5EYXRhW1widHJhbnNhY3Rpb25fdHlwZVwiXTtcbiAgICAgICAgc3dpdGNoICh0eFR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgXCJQQ09NUFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbXCJzdXJjaGFyZ2VfYW1vdW50XCJdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUHJpbnRpbmdSZXF1ZXN0XG57XG4gICAgY29uc3RydWN0b3Ioa2V5LCBwYXlsb2FkKVxuICAgIHtcbiAgICAgICAgdGhpcy5fa2V5ID0ga2V5O1xuICAgICAgICB0aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcbiAgICB9XG5cbiAgICB0b01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcImtleVwiOiB0aGlzLl9rZXksXG4gICAgICAgICAgICBcInBheWxvYWRcIjogdGhpcy5fcGF5bG9hZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJwcmludFwiKSwgRXZlbnRzLlByaW50aW5nUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJpbnRpbmdSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9zdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgfVxuICAgIGlzU3VjY2VzcygpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VjY2VzcztcbiAgICB9XG4gICAgZ2V0RXJyb3JSZWFzb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5lcnJvcl9yZWFzb247XG4gICAgfVxuICAgIGdldEVycm9yRGV0YWlsKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuZXJyb3JfZGV0YWlsO1xuICAgIH1cbiAgICBnZXRSZXNwb25zZVZhbHVlV2l0aEF0dHJpYnV0ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgYSBtb2NrIHByaW50ZXIgZm9yIHRoZSB0ZXJtaW5hbCB0byBwcmludCBSZWNlaXB0c1xuICovXG5leHBvcnQgY2xhc3MgUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmJ1ZmZlciAgICAgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50ICAgID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBwcmludCguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYXJncy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5idWZmZXIuam9pbihgXFxuXFxuIFxcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcL1xcXFwvXFxcXC9cXFxcLyBcXG5cXG5gKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbn0iLCJpbXBvcnQge0V2ZW50cywgU3VjY2Vzc1N0YXRlLCBNZXNzYWdlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge1NwaUNvbmZpZywgVHJhbnNhY3Rpb25PcHRpb25zfSBmcm9tICcuL1NwaU1vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBQdXJjaGFzZVJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKGFtb3VudENlbnRzLCBwb3NSZWZJZCkge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuUHVyY2hhc2VBbW91bnQgPSBhbW91bnRDZW50cztcbiAgICAgICAgdGhpcy5UaXBBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLkNhc2hvdXRBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLlByb21wdEZvckNhc2hvdXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5TdXJjaGFyZ2VBbW91bnQgPSAwO1xuICAgICAgICB0aGlzLkNvbmZpZyA9IG5ldyBTcGlDb25maWcoKTtcbiAgICAgICAgdGhpcy5PcHRpb25zID0gbmV3IFRyYW5zYWN0aW9uT3B0aW9ucygpO1xuXG4gICAgICAgIC8vIExpYnJhcnkgQmFja3dhcmRzIENvbXBhdGliaWxpdHlcbiAgICAgICAgdGhpcy5JZCA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLkFtb3VudENlbnRzID0gYW1vdW50Q2VudHM7XG4gICAgfVxuXG4gICAgQW1vdW50U3VtbWFyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gYFB1cmNoYXNlOiAkeyh0aGlzLlB1cmNoYXNlQW1vdW50IC8gMTAwLjApLnRvRml4ZWQoMil9OyBcbiAgICAgICAgICAgIFRpcDogJHsodGhpcy5UaXBBbW91bnQgLyAxMDAuMCkudG9GaXhlZCgyKX07IFxuICAgICAgICAgICAgQ2FzaG91dDogJHsodGhpcy5DYXNob3V0QW1vdW50IC8gMTAwLjApLnRvRml4ZWQoMil9O2A7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHBvc19yZWZfaWQ6IHRoaXMuUG9zUmVmSWQsXG4gICAgICAgICAgICBwdXJjaGFzZV9hbW91bnQ6IHRoaXMuUHVyY2hhc2VBbW91bnQsXG4gICAgICAgICAgICB0aXBfYW1vdW50OiB0aGlzLlRpcEFtb3VudCxcbiAgICAgICAgICAgIGNhc2hfYW1vdW50OiB0aGlzLkNhc2hvdXRBbW91bnQsXG4gICAgICAgICAgICBwcm9tcHRfZm9yX2Nhc2hvdXQ6IHRoaXMuUHJvbXB0Rm9yQ2FzaG91dCwgXG4gICAgICAgICAgICBzdXJjaGFyZ2VfYW1vdW50OiB0aGlzLlN1cmNoYXJnZUFtb3VudFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuQ29uZmlnLmFkZFJlY2VpcHRDb25maWcoZGF0YSk7XG4gICAgICAgIHRoaXMuT3B0aW9ucy5BZGRPcHRpb25zKGRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicHJjaHNcIiksIEV2ZW50cy5QdXJjaGFzZVJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFB1cmNoYXNlUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5Qb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU2NoZW1lQXBwTmFtZSA9IG0uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuXG4gICAgR2V0UHVyY2hhc2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5wdXJjaGFzZV9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0VGlwQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGlwX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRTdXJjaGFyZ2VBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5zdXJjaGFyZ2VfYW1vdW50O1xuICAgIH1cblxuICAgIEdldENhc2hvdXRBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jYXNoX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRCYW5rTm9uQ2FzaEFtb3VudCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmJhbmtfbm9uY2FzaF9hbW91bnQ7XG4gICAgfVxuXG4gICAgR2V0QmFua0Nhc2hBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5iYW5rX2Nhc2hfYW1vdW50O1xuICAgIH1cblxuICAgIEdldEN1c3RvbWVyUmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBHZXRNZXJjaGFudFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0IHx8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VUZXh0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV90ZXh0IHx8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV9jb2RlO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbFJlZmVyZW5jZUlkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfcmVmX2lkO1xuICAgIH1cblxuICAgIEdldENhcmRFbnRyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmNhcmRfZW50cnk7XG4gICAgfVxuICAgIFxuICAgIEdldEFjY291bnRUeXBlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjb3VudF90eXBlO1xuICAgIH1cblxuICAgIEdldEF1dGhDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYXV0aF9jb2RlO1xuICAgIH1cblxuICAgIEdldEJhbmtEYXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua19kYXRlO1xuICAgIH1cblxuICAgIEdldEJhbmtUaW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua190aW1lO1xuICAgIH1cbiAgICBcbiAgICBHZXRNYXNrZWRQYW4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tYXNrZWRfcGFuO1xuICAgIH1cbiAgICBcbiAgICBHZXRUZXJtaW5hbElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfaWQ7XG4gICAgfVxuXG4gICAgV2FzTWVyY2hhbnRSZWNlaXB0UHJpbnRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1lcmNoYW50X3JlY2VpcHRfcHJpbnRlZDtcbiAgICB9XG5cbiAgICBXYXNDdXN0b21lclJlY2VpcHRQcmludGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY3VzdG9tZXJfcmVjZWlwdF9wcmludGVkO1xuICAgIH1cbiAgICBcbiAgICBHZXRTZXR0bGVtZW50RGF0ZSgpXG4gICAge1xuICAgICAgICAvL1wiYmFua19zZXR0bGVtZW50X2RhdGVcIjpcIjIwMDQyMDE4XCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuYmFua19zZXR0bGVtZW50X2RhdGU7XG4gICAgICAgIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBNZXNzYWdlLlBhcnNlQmFua0RhdGUoZGF0ZVN0cik7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VWYWx1ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxuXG4gICAgVG9QYXltZW50U3VtbWFyeSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjb3VudF90eXBlOiB0aGlzLkdldEFjY291bnRUeXBlKCksXG4gICAgICAgICAgICBhdXRoX2NvZGU6IHRoaXMuR2V0QXV0aENvZGUoKSxcbiAgICAgICAgICAgIGJhbmtfZGF0ZTogdGhpcy5HZXRCYW5rRGF0ZSgpLFxuICAgICAgICAgICAgYmFua190aW1lOiB0aGlzLkdldEJhbmtUaW1lKCksXG4gICAgICAgICAgICBob3N0X3Jlc3BvbnNlX2NvZGU6IHRoaXMuR2V0UmVzcG9uc2VDb2RlKCksXG4gICAgICAgICAgICBob3N0X3Jlc3BvbnNlX3RleHQ6IHRoaXMuR2V0UmVzcG9uc2VUZXh0KCksXG4gICAgICAgICAgICBtYXNrZWRfcGFuOiB0aGlzLkdldE1hc2tlZFBhbigpLFxuICAgICAgICAgICAgcHVyY2hhc2VfYW1vdW50OiB0aGlzLkdldFB1cmNoYXNlQW1vdW50KCksXG4gICAgICAgICAgICBycm46IHRoaXMuR2V0UlJOKCksXG4gICAgICAgICAgICBzY2hlbWVfbmFtZTogdGhpcy5TY2hlbWVOYW1lLFxuICAgICAgICAgICAgdGVybWluYWxfaWQ6IHRoaXMuR2V0VGVybWluYWxJZCgpLFxuICAgICAgICAgICAgdGVybWluYWxfcmVmX2lkOiB0aGlzLkdldFRlcm1pbmFsUmVmZXJlbmNlSWQoKSxcbiAgICAgICAgICAgIHRpcF9hbW91bnQ6IHRoaXMuR2V0VGlwQW1vdW50KCksXG4gICAgICAgICAgICBzdXJjaGFyZ2VfYW1vdW50OiB0aGlzLkdldFN1cmNoYXJnZUFtb3VudCgpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0XG57XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJjdHhcIiksIEV2ZW50cy5DYW5jZWxUcmFuc2FjdGlvblJlcXVlc3QsIG51bGwsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSB0aGlzLl9tLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gdGhpcy5fbS5HZXRTdWNjZXNzU3RhdGUoKSA9PSBTdWNjZXNzU3RhdGUuU3VjY2VzcztcbiAgICB9XG5cbiAgICBHZXRFcnJvclJlYXNvbigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmVycm9yX3JlYXNvbjtcbiAgICB9XG5cbiAgICBHZXRFcnJvckRldGFpbCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmVycm9yX2RldGFpbDtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVZhbHVlV2l0aEF0dHJpYnV0ZShhdHRyaWJ1dGUpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhW2F0dHJpYnV0ZV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdFxue1xuICAgIFRvTWVzc2FnZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwiZ2x0XCIpLCBFdmVudHMuR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCwgbnVsbCwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0TGFzdFRyYW5zYWN0aW9uUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgfVxuXG4gICAgV2FzUmV0cmlldmVkU3VjY2Vzc2Z1bGx5KClcbiAgICB7XG4gICAgICAgIC8vIFdlIGNhbid0IHJlbHkgb24gY2hlY2tpbmcgXCJzdWNjZXNzXCIgZmxhZyBvciBcImVycm9yXCIgZmllbGRzIGhlcmUsXG4gICAgICAgIC8vIGFzIHJldHJpZXZhbCBtYXkgYmUgc3VjY2Vzc2Z1bCwgYnV0IHRoZSByZXRyaWV2ZWQgdHJhbnNhY3Rpb24gd2FzIGEgZmFpbC5cbiAgICAgICAgLy8gU28gd2UgY2hlY2sgaWYgd2UgZ290IGJhY2sgYW4gUmVzcG9uc2VDb2RlLlxuICAgICAgICAvLyAoYXMgb3Bwb3NlZCB0byBzYXkgYW4gb3BlcmF0aW9uX2luX3Byb2dyZXNzX2Vycm9yKVxuICAgICAgICByZXR1cm4gISF0aGlzLkdldFJlc3BvbnNlQ29kZSgpO1xuICAgIH1cblxuICAgIFdhc1RpbWVPdXRPZlN5bmNFcnJvcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJUSU1FX09VVF9PRl9TWU5DXCIpO1xuICAgIH1cblxuICAgIFdhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJPUEVSQVRJT05fSU5fUFJPR1JFU1NcIik7XG4gICAgfVxuXG4gICAgSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0RXJyb3IoKS5zdGFydHNXaXRoKFwiT1BFUkFUSU9OX0lOX1BST0dSRVNTX0FXQUlUSU5HX1NJR05BVFVSRVwiKTtcbiAgICB9XG5cbiAgICBJc1dhaXRpbmdGb3JBdXRoQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5HZXRFcnJvcigpLnN0YXJ0c1dpdGgoXCJPUEVSQVRJT05fSU5fUFJPR1JFU1NfQVdBSVRJTkdfUEhPTkVfQVVUSF9DT0RFXCIpO1xuICAgIH1cbiAgICBcbiAgICBJc1N0aWxsSW5Qcm9ncmVzcyhwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLldhc09wZXJhdGlvbkluUHJvZ3Jlc3NFcnJvcigpICYmIHRoaXMuR2V0UG9zUmVmSWQoKSA9PSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBHZXRTdWNjZXNzU3RhdGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uR2V0U3VjY2Vzc1N0YXRlKCk7XG4gICAgfVxuXG4gICAgV2FzU3VjY2Vzc2Z1bFR4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkdldFN1Y2Nlc3NTdGF0ZSgpID09IFN1Y2Nlc3NTdGF0ZS5TdWNjZXNzO1xuICAgIH1cblxuICAgIEdldFR4VHlwZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRyYW5zYWN0aW9uX3R5cGU7XG4gICAgfVxuXG4gICAgR2V0UG9zUmVmSWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5wb3NfcmVmX2lkO1xuICAgIH1cblxuICAgIEdldFNjaGVtZUFwcCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgIH1cblxuICAgIEdldFNjaGVtZU5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5zY2hlbWVfbmFtZTtcbiAgICB9XG5cbiAgICBHZXRBbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hbW91bnRfcHVyY2hhc2U7XG4gICAgfVxuXG4gICAgR2V0VHJhbnNhY3Rpb25BbW91bnQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5hbW91bnRfdHJhbnNhY3Rpb25fdHlwZTtcbiAgICB9XG5cbiAgICBHZXRCYW5rRGF0ZVRpbWVTdHJpbmcoKVxuICAgIHtcbiAgICAgICAgdmFyIGRzID0gdGhpcy5fbS5EYXRhLmJhbmtfZGF0ZSArIHRoaXMuX20uRGF0YS5iYW5rX3RpbWU7XG4gICAgICAgIHJldHVybiBkcztcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuICAgIFxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dCB8IFwiXCI7XG4gICAgfVxuXG4gICAgR2V0UmVzcG9uc2VDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuaG9zdF9yZXNwb25zZV9jb2RlO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoZXJlIGlzIGEgYnVnLCBWU1YtOTIwLCB3aGVyZWJ5IHRoZSBjdXN0b21lcl9yZWNlaXB0IGlzIG1pc3NpbmcgZnJvbSBhIGdsdCByZXNwb25zZS5cbiAgICAvLyBUaGUgY3VycmVudCByZWNvbW1lbmRhdGlvbiBpcyB0byB1c2UgdGhlIG1lcmNoYW50IHJlY2VpcHQgaW4gcGxhY2Ugb2YgaXQgaWYgcmVxdWlyZWQuXG4gICAgLy8gVGhpcyBtZXRob2QgbW9kaWZpZXMgdGhlIHVuZGVybHlpbmcgaW5jb21pbmcgbWVzc2FnZSBkYXRhIGJ5IGNvcHlpbmdcbiAgICAvLyB0aGUgbWVyY2hhbnQgcmVjZWlwdCBpbnRvIHRoZSBjdXN0b21lciByZWNlaXB0IG9ubHkgaWYgdGhlcmUgXG4gICAgLy8gaXMgYSBtZXJjaGFudF9yZWNlaXB0IGFuZCB0aGVyZSBpcyBub3QgYSBjdXN0b21lcl9yZWNlaXB0LiAgIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBDb3B5TWVyY2hhbnRSZWNlaXB0VG9DdXN0b21lclJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgdmFyIGNyID0gdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQ7XG4gICAgICAgIHZhciBtciA9IHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgICAgICBpZiAobXIgIT0gXCJcIiAmJiAhKGNyKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbS5EYXRhLmN1c3RvbWVyX3JlY2VpcHQgPSBtcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZnVuZFJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLkFtb3VudENlbnRzID0gYW1vdW50Q2VudHM7XG4gICAgICAgIHRoaXMuSWQgPSBSZXF1ZXN0SWRIZWxwZXIuSWQoXCJyZWZ1bmRcIik7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIGxldCBkYXRhID0ge3JlZnVuZF9hbW91bnQ6IHRoaXMuQW1vdW50Q2VudHMsIHBvc19yZWZfaWQ6IHRoaXMuUG9zUmVmSWR9O1xuICAgICAgICB0aGlzLkNvbmZpZy5hZGRSZWNlaXB0Q29uZmlnKGRhdGEpO1xuICAgICAgICB0aGlzLk9wdGlvbnMuQWRkT3B0aW9ucyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInJlZnVuZFwiKSwgRXZlbnRzLlJlZnVuZFJlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZnVuZFJlc3BvbnNlXG57XG4gICAgY29uc3RydWN0b3IobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX20gPSBtO1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5TY2hlbWVOYW1lID0gbS5EYXRhLnNjaGVtZV9uYW1lO1xuICAgICAgICB0aGlzLlNjaGVtZUFwcE5hbWUgPSBtLkRhdGEuc2NoZW1lX25hbWU7XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0UmVmdW5kQW1vdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEucmVmdW5kX2Ftb3VudDtcbiAgICB9XG5cbiAgICBHZXRSUk4oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ycm47XG4gICAgfVxuXG4gICAgR2V0Q3VzdG9tZXJSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuY3VzdG9tZXJfcmVjZWlwdCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldE1lcmNoYW50UmVjZWlwdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1lcmNoYW50X3JlY2VpcHQ7XG4gICAgfVxuICAgIFxuICAgIEdldFJlc3BvbnNlVGV4dCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfdGV4dCB8fCBcIlwiO1xuICAgIH1cblxuICAgIEdldFJlc3BvbnNlQ29kZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmhvc3RfcmVzcG9uc2VfY29kZSB8fCBcIlwiO1xuICAgIH1cblxuXG4gICAgR2V0VGVybWluYWxSZWZlcmVuY2VJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX3JlZl9pZCB8fCBcIlwiO1xuICAgIH1cbiAgICBHZXRDYXJkRW50cnkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jYXJkX2VudHJ5IHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEFjY291bnRUeXBlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjb3VudF90eXBlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEF1dGhDb2RlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYXV0aF9jb2RlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEJhbmtEYXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua19kYXRlIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldEJhbmtUaW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYmFua190aW1lIHx8IFwiXCI7XG4gICAgfVxuICAgIEdldE1hc2tlZFBhbigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLm1hc2tlZF9wYW4gfHwgXCJcIjtcbiAgICB9XG4gICAgR2V0VGVybWluYWxJZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLnRlcm1pbmFsX2lkIHx8IFwiXCI7XG4gICAgfVxuICAgIFdhc01lcmNoYW50UmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0X3ByaW50ZWQ7XG4gICAgfVxuICAgIFdhc0N1c3RvbWVyUmVjZWlwdFByaW50ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5jdXN0b21lcl9yZWNlaXB0X3ByaW50ZWQ7XG4gICAgfVxuICAgIEdldFNldHRsZW1lbnREYXRlKClcbiAgICB7XG4gICAgICAgIC8vXCJiYW5rX3NldHRsZW1lbnRfZGF0ZVwiOlwiMjAwNDIwMThcIlxuICAgICAgICB2YXIgZGF0ZVN0ciA9IHRoaXMuX20uRGF0YS5iYW5rX3NldHRsZW1lbnRfZGF0ZTtcbiAgICAgICAgaWYgKCFkYXRlU3RyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuUGFyc2VCYW5rRGF0ZShkYXRlU3RyKTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVZhbHVlKGF0dHJpYnV0ZSlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGFbYXR0cmlidXRlXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVSZXF1aXJlZFxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLlJlcXVlc3RJZCA9IG0uSWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgdGhpcy5fcmVjZWlwdFRvU2lnbiA9IG0uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgIH1cbiAgICBcbiAgICBTaWduYXR1cmVSZXF1aXJlZChwb3NSZWZJZCwgcmVxdWVzdElkLCByZWNlaXB0VG9TaWduKVxuICAgIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0SWQgPSByZXF1ZXN0SWQ7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5fcmVjZWlwdFRvU2lnbiA9IHJlY2VpcHRUb1NpZ247XG4gICAgfVxuXG4gICAgR2V0TWVyY2hhbnRSZWNlaXB0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWNlaXB0VG9TaWduO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZURlY2xpbmVcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJzaWdkZWNcIiksIEV2ZW50cy5TaWduYXR1cmVEZWNsaW5lZCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlQWNjZXB0XG57XG4gICAgY29uc3RydWN0b3IocG9zUmVmSWQpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgfVxuXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zX3JlZl9pZDogdGhpcy5Qb3NSZWZJZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwic2lnYWNjXCIpLCBFdmVudHMuU2lnbmF0dXJlQWNjZXB0ZWQsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdG9QdXJjaGFzZVJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudClcbiAgICB7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBwb3NSZWZJZDtcbiAgICAgICAgdGhpcy5QdXJjaGFzZUFtb3VudCA9IGFtb3VudENlbnRzO1xuICAgICAgICB0aGlzLlN1cmNoYXJnZUFtb3VudCA9IHN1cmNoYXJnZUFtb3VudDtcbiAgICAgICAgdGhpcy5Db25maWcgPSBuZXcgU3BpQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuT3B0aW9ucyA9IG5ldyBUcmFuc2FjdGlvbk9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgcHVyY2hhc2VfYW1vdW50OiB0aGlzLlB1cmNoYXNlQW1vdW50LFxuICAgICAgICAgICAgc3VyY2hhcmdlX2Ftb3VudDogdGhpcy5TdXJjaGFyZ2VBbW91bnRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5Db25maWcuYWRkUmVjZWlwdENvbmZpZyhkYXRhKTtcbiAgICAgICAgdGhpcy5PcHRpb25zLkFkZE9wdGlvbnMoZGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJtb3RvXCIpLCBFdmVudHMuTW90b1B1cmNoYXNlUmVxdWVzdCwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW90b1B1cmNoYXNlUmVzcG9uc2VcbntcbiAgICBjb25zdHJ1Y3RvcihtKVxuICAgIHtcbiAgICAgICAgdGhpcy5QdXJjaGFzZVJlc3BvbnNlID0gbmV3IFB1cmNoYXNlUmVzcG9uc2UobSk7XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgPSBQdXJjaGFzZVJlc3BvbnNlLlBvc1JlZklkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBob25lRm9yQXV0aFJlcXVpcmVkXG57XG4gICAgY29uc3RydWN0b3IoLi4uYXJncylcbiAgICB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICB0aGlzLlBvc1JlZklkID0gYXJnc1swXTtcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdElkID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3Bob25lTnVtYmVyID0gYXJnc1syXTtcbiAgICAgICAgICAgIHRoaXMuX21lcmNoYW50SWQgPSBhcmdzWzNdO1xuICAgICAgICB9IGVsc2UgaWYoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdElkID0gYXJnc1swXS5JZDtcbiAgICAgICAgICAgIHRoaXMuUG9zUmVmSWQgPSBhcmdzWzBdLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgICAgIHRoaXMuX3Bob25lTnVtYmVyID0gYXJnc1swXS5EYXRhLmF1dGhfY2VudHJlX3Bob25lX251bWJlcjtcbiAgICAgICAgICAgIHRoaXMuX21lcmNoYW50SWQgPSBhcmdzWzBdLkRhdGEubWVyY2hhbnRfaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbCBzaWcgZm9yIFBob25lIGF1dGggcmVxdWlyZWQgY2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBHZXRQaG9uZU51bWJlcigpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGhvbmVOdW1iZXI7XG4gICAgfVxuICAgIFxuICAgIEdldE1lcmNoYW50SWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmNoYW50SWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXV0aENvZGVBZHZpY2VcbntcbiAgICBjb25zdHJ1Y3Rvcihwb3NSZWZJZCwgYXV0aENvZGUpXG4gICAge1xuICAgICAgICB0aGlzLlBvc1JlZklkID0gcG9zUmVmSWQ7XG4gICAgICAgIHRoaXMuQXV0aENvZGUgPSBhdXRoQ29kZTtcbiAgICB9XG5cbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBwb3NfcmVmX2lkOiB0aGlzLlBvc1JlZklkLFxuICAgICAgICAgICAgYXV0aF9jb2RlOiB0aGlzLkF1dGhDb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShSZXF1ZXN0SWRIZWxwZXIuSWQoXCJhdXRoYWRcIiksIEV2ZW50cy5BdXRoQ29kZUFkdmljZSwgZGF0YSwgdHJ1ZSk7XG4gICAgfVxufSIsImltcG9ydCB7UHVyY2hhc2VSZXF1ZXN0LCBSZWZ1bmRSZXF1ZXN0fSBmcm9tICcuL1B1cmNoYXNlJztcblxuZXhwb3J0IGNsYXNzIFB1cmNoYXNlSGVscGVyXG57XG4gICAgc3RhdGljIENyZWF0ZVB1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcHVyY2hhc2VJZClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgUHVyY2hhc2VSZXF1ZXN0KGFtb3VudENlbnRzLCBwdXJjaGFzZUlkKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIENyZWF0ZVB1cmNoYXNlUmVxdWVzdFYyKHBvc1JlZklkLCBwdXJjaGFzZUFtb3VudCwgdGlwQW1vdW50LCBjYXNob3V0QW1vdW50LCBwcm9tcHRGb3JDYXNob3V0LCBzdXJjaGFyZ2VBbW91bnQpXG4gICAge1xuICAgICAgICB2YXIgcHIgPSBPYmplY3QuYXNzaWduKG5ldyBQdXJjaGFzZVJlcXVlc3QocHVyY2hhc2VBbW91bnQsIHBvc1JlZklkKSxcbiAgICAgICAge1xuICAgICAgICAgICAgQ2FzaG91dEFtb3VudDogY2FzaG91dEFtb3VudCxcbiAgICAgICAgICAgIFRpcEFtb3VudDogdGlwQW1vdW50LFxuICAgICAgICAgICAgUHJvbXB0Rm9yQ2FzaG91dDogcHJvbXB0Rm9yQ2FzaG91dCxcbiAgICAgICAgICAgIFN1cmNoYXJnZUFtb3VudDogc3VyY2hhcmdlQW1vdW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgQ3JlYXRlUmVmdW5kUmVxdWVzdChhbW91bnRDZW50cywgcHVyY2hhc2VJZCwgaXNTdXBwcmVzc01lcmNoYW50UGFzc3dvcmQpXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IFJlZnVuZFJlcXVlc3QoYW1vdW50Q2VudHMsIHB1cmNoYXNlSWQsIGlzU3VwcHJlc3NNZXJjaGFudFBhc3N3b3JkKTtcbiAgICB9XG5cbn1cbiIsImxldCBfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIgPSAxO1xuXG5leHBvcnQgY2xhc3MgUmVxdWVzdElkSGVscGVyIHtcbiAgICBzdGF0aWMgSWQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyBfX1JlcXVlc3RJZEhlbHBlckNvdW50ZXIrKztcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU2VjcmV0cyB7XG4gICAgY29uc3RydWN0b3IoZW5jS2V5LCBobWFjS2V5KSB7XG4gICAgICAgIHRoaXMuRW5jS2V5ICAgICA9IGVuY0tleTtcbiAgICAgICAgdGhpcy5IbWFjS2V5ICAgID0gaG1hY0tleTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZShFbmNLZXksIEhtYWNLZXkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuY0tleScsIEVuY0tleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIbWFjS2V5JywgSG1hY0tleSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlc3RvcmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VjcmV0cyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRW5jS2V5JyksIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIbWFjS2V5JykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1NhdmVkKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0VuY0tleScpICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIbWFjS2V5Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIFJlc2V0KCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnRW5jS2V5Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdIbWFjS2V5Jyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTUElfVVJJX1NDSEVNRX0gZnJvbSAnLi4vQ29ubmVjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBEZXZpY2VBZGRyZXNzU3RhdHVzXG57XG4gICAgZ2V0IEFkZHJlc3MoKVxuICAgIHtcbiAgICAgICAgaWYoU1BJX1VSSV9TQ0hFTUUgPT09ICd3c3MnKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnFkbjtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBBZGRyZXNzKGFkZHJlc3MpXG4gICAge1xuICAgICAgICBpZihTUElfVVJJX1NDSEVNRSA9PT0gJ3dzcycpIFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmZxZG4gPSBhZGRyZXNlcztcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmlwID0gYWRkcmVzcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkgXG4gICAge1xuICAgICAgICB0aGlzLmlwID0gbnVsbDtcbiAgICAgICAgdGhpcy5mcWRuID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3VwZGF0ZWQgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERldmljZUFkZHJlc3NTZXJ2aWNlXG57XG4gICAgUmV0cmlldmVTZXJ2aWNlKHNlcmlhbE51bWJlciwgYXBpS2V5ID0gJ3NwaS1zYW1wbGUtcG9zMScsIGFjcXVpcmVyQ29kZSwgaXNUZXN0TW9kZSlcbiAgICB7XG4gICAgICAgIHZhciBwYXRoID0gKFNQSV9VUklfU0NIRU1FID09PSAnd3NzJykgPyAnZnFkbicgOiAnaXAnO1xuICAgICAgICAvLyBodHRwczovL2RldmljZS1hZGRyZXNzLWFwaS1kZXYubm9ucHJvZC0ke2FjcXVpcmVyQ29kZX0ubXNwLmFzc2VtYmx5cGF5bWVudHMuY29tL3YxLyR7c2VyaWFsTnVtYmVyfS8ke3BhdGh9XG4gICAgICAgIHZhciBkZXZpY2VBZGRyZXNzVXJpID0gaXNUZXN0TW9kZSA/IGAvYXBpL3YxLyR7cGF0aH0/c2VyaWFsPSR7c2VyaWFsTnVtYmVyfSZhY3F1aXJlckNvZGU9JHthY3F1aXJlckNvZGV9YCA6IGBodHRwczovL2RldmljZS1hZGRyZXNzLWFwaS4ke2FjcXVpcmVyQ29kZX0ubXNwLmFzc2VtYmx5cGF5bWVudHMuY29tL3YxLyR7c2VyaWFsTnVtYmVyfS8ke3BhdGh9YDtcblxuICAgICAgICByZXR1cm4gZmV0Y2goZGV2aWNlQWRkcmVzc1VyaSwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkFTTS1NU1AtREVWSUNFLUFERFJFU1MtQVBJLUtFWVwiOiBhcGlLZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBTdGF0dXMgY29kZSAke3Jlc3BvbnNlLlN0YXR1c0NvZGV9IHJlY2VpdmVkIGZyb20gJHtkZXZpY2VBZGRyZXNzVXJpfSAtIEV4Y2VwdGlvbiAke3Jlc3BvbnNlLmVycm9yfWApO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRzLCBTdWNjZXNzU3RhdGUsIE1lc3NhZ2V9IGZyb20gJy4vTWVzc2FnZXMnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGxlUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgdGhpcy5JZCA9IGlkO1xuICAgIH1cblxuICAgIFRvTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHRoaXMuSWQsIEV2ZW50cy5TZXR0bGVSZXF1ZXN0LCBudWxsLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXR0bGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihtKSB7XG4gICAgICAgIHRoaXMuUmVxdWVzdElkID0gbS5JZDtcbiAgICAgICAgdGhpcy5fbSA9IG07XG4gICAgICAgIHRoaXMuU3VjY2VzcyA9IG0uR2V0U3VjY2Vzc1N0YXRlKCkgPT0gU3VjY2Vzc1N0YXRlLlN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgR2V0U2V0dGxlQnlBY3F1aXJlckNvdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfc2V0dGxlX2J5X2FjcXVpcmVyX2NvdW50O1xuICAgIH1cblxuICAgIEdldFNldHRsZUJ5QWNxdWlyZXJWYWx1ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY3VtdWxhdGVkX3NldHRsZV9ieV9hY3F1aXJlcl92YWx1ZTtcbiAgICB9XG5cbiAgICBHZXRUb3RhbENvdW50KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuYWNjdW11bGF0ZWRfdG90YWxfY291bnQ7XG4gICAgfVxuXG4gICAgR2V0VG90YWxWYWx1ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbS5EYXRhLmFjY3VtdWxhdGVkX3RvdGFsX3ZhbHVlO1xuICAgIH1cblxuICAgIEdldFBlcmlvZFN0YXJ0VGltZSgpXG4gICAge1xuICAgICAgICB2YXIgdGltZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3BlcmlvZF9zdGFydF90aW1lOyAvLyBcIjA1OjAwXCJcbiAgICAgICAgdmFyIGRhdGVTdHIgPSB0aGlzLl9tLkRhdGEuc2V0dGxlbWVudF9wZXJpb2Rfc3RhcnRfZGF0ZTsgLy8gXCIwNU9jdDE3XCJcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuUGFyc2VCYW5rRGF0ZVRpbWVTdHIoZGF0ZVN0ciwgdGltZVN0cik7XG4gICAgfVxuXG4gICAgR2V0UGVyaW9kRW5kVGltZSgpXG4gICAge1xuICAgICAgICB2YXIgdGltZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3BlcmlvZF9lbmRfdGltZTsgLy8gXCIwNTowMFwiXG4gICAgICAgIHZhciBkYXRlU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfcGVyaW9kX2VuZF9kYXRlOyAvLyBcIjA1T2N0MTdcIlxuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlU3RyLCB0aW1lU3RyKTtcbiAgICB9XG5cbiAgICBHZXRUcmlnZ2VyZWRUaW1lKClcbiAgICB7XG4gICAgICAgIHZhciB0aW1lU3RyID0gdGhpcy5fbS5EYXRhLnNldHRsZW1lbnRfdHJpZ2dlcmVkX3RpbWU7IC8vIFwiMDU6MDA6NDVcIlxuICAgICAgICB2YXIgZGF0ZVN0ciA9IHRoaXMuX20uRGF0YS5zZXR0bGVtZW50X3RyaWdnZXJlZF9kYXRlOyAvLyBcIjA1T2N0MTdcIlxuICAgICAgICByZXR1cm4gTWVzc2FnZS5QYXJzZUJhbmtEYXRlVGltZVN0cihkYXRlU3RyLCB0aW1lU3RyKTtcbiAgICB9XG5cbiAgICBHZXRSZXNwb25zZVRleHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5ob3N0X3Jlc3BvbnNlX3RleHQ7XG4gICAgfVxuICAgIFxuICAgIEdldFJlY2VpcHQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5tZXJjaGFudF9yZWNlaXB0O1xuICAgIH1cblxuICAgIEdldFRyYW5zYWN0aW9uUmFuZ2UoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS50cmFuc2FjdGlvbl9yYW5nZTtcbiAgICB9XG5cbiAgICBHZXRUZXJtaW5hbElkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEudGVybWluYWxfaWQ7XG4gICAgfVxuXG4gICAgR2V0U2NoZW1lU2V0dGxlbWVudEVudHJpZXMoKVxuICAgIHtcbiAgICAgICAgdmFyIHNjaGVtZXMgPSB0aGlzLl9tLkRhdGEuc2NoZW1lcztcbiAgICAgICAgaWYgKCFzY2hlbWVzKSByZXR1cm4gW107XG5cbiAgICAgICAgcmV0dXJuIHNjaGVtZXMubWFwKChzY2hlbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2NoZW1lU2V0dGxlbWVudEVudHJ5KHNjaGVtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVtZVNldHRsZW1lbnRFbnRyeVxue1xuICAgIC8vIFNjaGVtZVNldHRsZW1lbnRFbnRyeShzdHJpbmcgc2NoZW1lTmFtZSwgYm9vbCBzZXR0bGVCeUFjcXVpcmVyLCBpbnQgdG90YWxDb3VudCwgaW50IHRvdGFsVmFsdWUpXG4gICAgLy8gU2NoZW1lU2V0dGxlbWVudEVudHJ5KE9iamVjdCBzY2hlbWVPYmopXG4gICAgY29uc3RydWN0b3IoLi4uYXJncylcbiAgICB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBhcmdzWzBdLnNjaGVtZV9uYW1lO1xuICAgICAgICAgICAgdGhpcy5TZXR0bGVCeUFjcXVpcmVyID0gYXJnc1swXS5zZXR0bGVfYnlfYWNxdWlyZXIudG9Mb3dlckNhc2UoKSA9PSBcInllc1wiO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFZhbHVlID0gcGFyc2VJbnQoYXJnc1swXS50b3RhbF92YWx1ZSwxMCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsQ291bnQgPSBwYXJzZUludChhcmdzWzBdLnRvdGFsX2NvdW50LDEwKTtcbiAgICAgICAgfSBlbHNlIGlmKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICB0aGlzLlNjaGVtZU5hbWUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgdGhpcy5TZXR0bGVCeUFjcXVpcmVyID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxDb3VudCA9IGFyZ3NbMl07XG4gICAgICAgICAgICB0aGlzLlRvdGFsVmFsdWUgPSBhcmdzWzNdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIFRvU3RyaW5nKClcbiAgICB7XG4gICAgICAgIHJldHVybiBgU2NoZW1lTmFtZTogJHt0aGlzLlNjaGVtZU5hbWV9LCBTZXR0bGVCeUFjcXVpcmVyOiAke3RoaXMuU2V0dGxlQnlBY3F1aXJlcn0sIFRvdGFsQ291bnQ6ICR7dGhpcy5Ub3RhbENvdW50fSwgVG90YWxWYWx1ZTogJHt0aGlzLlRvdGFsVmFsdWV9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXR0bGVtZW50RW5xdWlyeVJlcXVlc3RcbntcbiAgICBjb25zdHJ1Y3RvcihpZClcbiAgICB7XG4gICAgICAgIHRoaXMuSWQgPSBpZDtcbiAgICB9XG4gICAgXG4gICAgVG9NZXNzYWdlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZSh0aGlzLklkLCBFdmVudHMuU2V0dGxlbWVudEVucXVpcnlSZXF1ZXN0LCBudWxsLCB0cnVlKTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZXNzYWdlLCBNZXNzYWdlU3RhbXAsIEV2ZW50cywgU3VjY2Vzc1N0YXRlfSBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCB7U3BpQ29uZmlnLCBTcGlGbG93LCBTcGlTdGF0dXMsIFBhaXJpbmdGbG93U3RhdGUsIFRyYW5zYWN0aW9uRmxvd1N0YXRlLCBJbml0aWF0ZVR4UmVzdWx0fSBmcm9tICcuL1NwaU1vZGVscyc7XG5pbXBvcnQge1JlcXVlc3RJZEhlbHBlcn0gZnJvbSAnLi9SZXF1ZXN0SWRIZWxwZXInO1xuaW1wb3J0IHtTUElfVVJJX1NDSEVNRSwgQ29ubmVjdGlvbiwgQ29ubmVjdGlvblN0YXRlfSBmcm9tICcuL0Nvbm5lY3Rpb24nO1xuaW1wb3J0IHtTcGlQYXlBdFRhYmxlfSBmcm9tICcuL1NwaVBheUF0VGFibGUnO1xuaW1wb3J0IHtQYXlBdFRhYmxlQ29uZmlnfSBmcm9tICcuL1BheUF0VGFibGUnO1xuaW1wb3J0IHtTcGlQcmVhdXRofSBmcm9tICcuL1NwaVByZWF1dGgnO1xuaW1wb3J0IHtEcm9wS2V5c1JlcXVlc3R9IGZyb20gJy4vUGFpcmluZyc7XG5pbXBvcnQge1NldFBvc0luZm9SZXF1ZXN0fSBmcm9tICcuL1Bvc0luZm8nO1xuaW1wb3J0IHtQdXJjaGFzZUhlbHBlcn0gZnJvbSAnLi9QdXJjaGFzZUhlbHBlcic7XG5pbXBvcnQge0tleVJvbGxpbmdIZWxwZXJ9IGZyb20gJy4vS2V5Um9sbGluZ0hlbHBlcic7XG5pbXBvcnQge1BpbmdIZWxwZXIsIFBvbmdIZWxwZXJ9IGZyb20gJy4vUGluZ0hlbHBlcic7XG5pbXBvcnQge0dldExhc3RUcmFuc2FjdGlvblJlcXVlc3QsIENhbmNlbFRyYW5zYWN0aW9uUmVxdWVzdCwgU2lnbmF0dXJlUmVxdWlyZWQsIENhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2V9IGZyb20gJy4vUHVyY2hhc2UnO1xuaW1wb3J0IHtEZXZpY2VBZGRyZXNzU2VydmljZSwgRGV2aWNlQWRkcmVzc1N0YXR1c30gZnJvbSAnLi9TZXJ2aWNlL0RldmljZVNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgU1BJX1ZFUlNJT04gPSAnMi40LjAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGkge1xuXG4gICAgZ2V0IEN1cnJlbnRTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdHVzO1xuICAgIH1cblxuICAgIHNldCBDdXJyZW50U3RhdHVzKHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRTdGF0dXMgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gdmFsdWU7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTdGF0dXNDaGFuZ2VkJywge2RldGFpbDogdmFsdWV9KSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocG9zSWQsIHNlcmlhbE51bWJlciwgZWZ0cG9zQWRkcmVzcywgc2VjcmV0cykgXG4gICAge1xuICAgICAgICB0aGlzLl9wb3NJZCA9IHBvc0lkO1xuICAgICAgICB0aGlzLl9zZXJpYWxOdW1iZXIgPSBzZXJpYWxOdW1iZXI7XG4gICAgICAgIHRoaXMuX3NlY3JldHMgPSBzZWNyZXRzO1xuICAgICAgICB0aGlzLl9lZnRwb3NBZGRyZXNzID0gYCR7U1BJX1VSSV9TQ0hFTUV9Oi8vJHtlZnRwb3NBZGRyZXNzfWA7XG4gICAgICAgIHRoaXMuX2xvZyA9IGNvbnNvbGU7XG4gICAgICAgIHRoaXMuQ29uZmlnID0gbmV3IFNwaUNvbmZpZygpO1xuXG4gICAgICAgIHRoaXMuQ3VycmVudERldmljZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RldmljZUFwaUtleSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjcXVpcmVyQ29kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luVGVzdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIE91ciBzdGFtcCBmb3Igc2lnbmluZyBvdXRnb2luZyBtZXNzYWdlc1xuICAgICAgICB0aGlzLl9zcGlNZXNzYWdlU3RhbXAgPSBuZXcgTWVzc2FnZVN0YW1wKHRoaXMuX3Bvc0lkLCB0aGlzLl9zZWNyZXRzLCAwKTtcblxuICAgICAgICB0aGlzLl9wb3NWZW5kb3JJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bvc1ZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9oYXNTZXRJbmZvID0gbnVsbDtcblxuICAgICAgICAvLyBXZSB3aWxsIG1haW50YWluIHNvbWUgc3RhdGVcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBpbmdTZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBvbmdSZWNlaXZlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21pc3NlZFBvbmdzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9yZXRyaWVzU2luY2VMYXN0RGV2aWNlQWRkcmVzc1Jlc29sdXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9tb3N0UmVjZW50TG9naW5SZXNwb25zZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcG9uZ1RpbWVvdXQgPSA1MDAwO1xuICAgICAgICB0aGlzLl9waW5nRnJlcXVlbmN5ID0gMTgwMDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9yZWFkeVRvVHJhbnNhY3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3R4TW9uaXRvckNoZWNrRnJlcXVlbmN5ID0gMTAwMDtcbiAgICAgICAgdGhpcy5fY2hlY2tPblR4RnJlcXVlbmN5ID0gMjAwMDA7XG4gICAgICAgIHRoaXMuX21heFdhaXRGb3JDYW5jZWxUeCA9IDEwMDAwO1xuICAgICAgICB0aGlzLl9zbGVlcEJlZm9yZVJlY29ubmVjdE1zID0gNTAwMDtcbiAgICAgICAgdGhpcy5fbWlzc2VkUG9uZ3NUb0Rpc2Nvbm5lY3QgPSAyO1xuICAgICAgICB0aGlzLl9yZXRyaWVzQmVmb3JlUmVzb2x2aW5nRGV2aWNlQWRkcmVzcyA9IDU7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyAgICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUgICAgPSBudWxsO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSAgICAgICAgID0gbnVsbDtcbiAgICB9XG5cbiAgICBFbmFibGVQYXlBdFRhYmxlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwaVBhdCA9IG5ldyBTcGlQYXlBdFRhYmxlKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BpUGF0O1xuICAgIH1cblxuICAgIEVuYWJsZVByZWF1dGgoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BpUHJlYXV0aCA9IG5ldyBTcGlQcmVhdXRoKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BpUHJlYXV0aDtcbiAgICB9XG5cbiAgICBTdGFydCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bvc1ZlbmRvcklkIHx8ICF0aGlzLl9wb3NWZXJzaW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBQT1MgaW5mb3JtYXRpb24gaXMgbm93IHJlcXVpcmVkIHRvIGJlIHNldFxuICAgICAgICAgICAgdGhpcy5fbG9nLldhcm4oXCJNaXNzaW5nIFBPUyB2ZW5kb3IgSUQgYW5kIHZlcnNpb24uIHBvc1ZlbmRvcklkIGFuZCBwb3NWZXJzaW9uIGFyZSByZXF1aXJlZCBiZWZvcmUgc3RhcnRpbmdcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTWlzc2luZyBQT1MgdmVuZG9yIElEIGFuZCB2ZXJzaW9uLiBwb3NWZW5kb3JJZCBhbmQgcG9zVmVyc2lvbiBhcmUgcmVxdWlyZWQgYmVmb3JlIHN0YXJ0aW5nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVzZXRDb25uKCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0VHJhbnNhY3Rpb25Nb25pdG9yaW5nVGhyZWFkKCk7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuSWRsZTtcbiAgICAgICAgaWYgKHRoaXMuX3NlY3JldHMgIT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJTdGFydGluZyBpbiBQYWlyZWQgU3RhdGVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlBhaXJlZENvbm5lY3Rpbmc7XG4gICAgICAgICAgICB0aGlzLl9jb25uLkNvbm5lY3QoKTsgLy8gVGhpcyBpcyBub24tYmxvY2tpbmdcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiU3RhcnRpbmcgaW4gVW5wYWlyZWQgU3RhdGVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlVucGFpcmVkO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gU2V0IHRoZSBhY3F1aXJlciBjb2RlIG9mIHlvdXIgYmFuaywgcGxlYXNlIGNvbnRhY3QgQXNzZW1ibHkncyBJbnRlZ3JhdGlvbiBFbmdpbmVlcnMgZm9yIGFjcXVpcmVyIGNvZGUuXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBTZXRBY3F1aXJlckNvZGUoYWNxdWlyZXJDb2RlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fYWNxdWlyZXJDb2RlID0gYWNxdWlyZXJDb2RlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIFNldCB0aGUgYXBpIGtleSB1c2VkIGZvciBhdXRvIGFkZHJlc3MgZGlzY292ZXJ5IGZlYXR1cmVcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgU2V0RGV2aWNlQXBpS2V5KGRldmljZUFwaUtleSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2RldmljZUFwaUtleSA9IGRldmljZUFwaUtleTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgc2VyaWFsIG51bWJlciBvZiB0aGUgRWZ0cG9zXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBTZXRTZXJpYWxOdW1iZXIoc2VyaWFsTnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHdhcyA9IHRoaXMuX3NlcmlhbE51bWJlcjtcbiAgICAgICAgdGhpcy5fc2VyaWFsTnVtYmVyID0gc2VyaWFsTnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5fYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlZCAmJiB0aGlzLkhhc1NlcmlhbE51bWJlckNoYW5nZWQod2FzKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYXV0b1Jlc29sdmVFZnRwb3NBZGRyZXNzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEFsbG93cyB5b3UgdG8gc2V0IHRoZSBhdXRvIGFkZHJlc3MgZGlzY292ZXJ5IGZlYXR1cmUuIFxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICBTZXRBdXRvQWRkcmVzc1Jlc29sdXRpb24oYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuUGFpcmVkQ29ubmVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciB3YXMgPSB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkO1xuICAgICAgICB0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkID0gYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlO1xuICAgICAgICBpZiAoYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlICYmICF3YXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHdlJ3JlIHR1cm5pbmcgaXQgb25cbiAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBDYWxsIHRoaXMgbWV0aG9kIHRvIHNldCB0aGUgY2xpZW50IGxpYnJhcnkgdGVzdCBtb2RlLlxuICAgIC8vLyBTZXQgaXQgdG8gdHJ1ZSBvbmx5IHdoaWxlIHlvdSBhcmUgZGV2ZWxvcGluZyB0aGUgaW50ZWdyYXRpb24uIFxuICAgIC8vLyBJdCBkZWZhdWx0cyB0byBmYWxzZS4gRm9yIGEgcmVhbCBtZXJjaGFudCwgYWx3YXlzIGxlYXZlIGl0IHNldCB0byBmYWxzZS4gXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0ZXN0TW9kZVwiPjwvcGFyYW0+XG4gICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICBTZXRUZXN0TW9kZSh0ZXN0TW9kZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgIT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0ZXN0TW9kZSA9PSB0aGlzLl9pblRlc3RNb2RlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gd2UncmUgY2hhbmdpbmcgbW9kZVxuICAgICAgICB0aGlzLl9pblRlc3RNb2RlID0gdGVzdE1vZGU7XG4gICAgICAgIHRoaXMuX2F1dG9SZXNvbHZlRWZ0cG9zQWRkcmVzcygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBBbGxvd3MgeW91IHRvIHNldCB0aGUgUG9zSWQgd2hpY2ggaWRlbnRpZmllcyB0aGlzIGluc3RhbmNlIG9mIHlvdXIgUE9TLlxuICAgIC8vIENhbiBvbmx5IGJlIGNhbGxlZCBpbiB0aGdlIFVucGFpcmVkIHN0YXRlLiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgU2V0UG9zSWQocG9zSWQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzICE9IFNwaVN0YXR1cy5VbnBhaXJlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLl9wb3NJZCA9IHBvc0lkO1xuICAgICAgICB0aGlzLl9zcGlNZXNzYWdlU3RhbXAuUG9zSWQgPSBwb3NJZDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQWxsb3dzIHlvdSB0byBzZXQgdGhlIFBpblBhZCBhZGRyZXNzLiBTb21ldGltZXMgdGhlIFBpblBhZCBtaWdodCBjaGFuZ2UgSVAgYWRkcmVzcyBcbiAgICAvLyAod2UgcmVjb21tZW5kIHJlc2VydmluZyBzdGF0aWMgSVBzIGlmIHBvc3NpYmxlKS5cbiAgICAvLyBFaXRoZXIgd2F5IHlvdSBuZWVkIHRvIGFsbG93IHlvdXIgVXNlciB0byBlbnRlciB0aGUgSVAgYWRkcmVzcyBvZiB0aGUgUGluUGFkLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBTZXRFZnRwb3NBZGRyZXNzKGFkZHJlc3MpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzID09IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0ZWQgfHwgdGhpcy5fYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWZ0cG9zQWRkcmVzcyA9IGAke1NQSV9VUklfU0NIRU1FfTovLyR7YWRkcmVzc31gO1xuICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgR2V0VmVyc2lvbigpXG4gICAge1xuICAgICAgICByZXR1cm4gU1BJX1ZFUlNJT047XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdXNlZCB0byBpZGVudGlmeSB0aGUgUE9TIHNvZnR3YXJlIHRvIHRoZSBFRlRQT1MgdGVybWluYWwuXG4gICAgICogTXVzdCBiZSBzZXQgYmVmb3JlIHN0YXJ0aW5nIVxuICAgICAqXG4gICAgICogQHBhcmFtIHBvc1ZlbmRvcklkIFZlbmRvciBpZGVudGlmaWVyIG9mIHRoZSBQT1MgaXRzZWxmLlxuICAgICAqIEBwYXJhbSBwb3NWZXJzaW9uICBWZXJzaW9uIHN0cmluZyBvZiB0aGUgUE9TIGl0c2VsZi5cbiAgICAgKi9cbiAgICBTZXRQb3NJbmZvKHBvc1ZlbmRvcklkLCBwb3NWZXJzaW9uKVxuICAgIHtcbiAgICAgICAgdGhpcy5fcG9zVmVuZG9ySWQgPSBwb3NWZW5kb3JJZDtcbiAgICAgICAgdGhpcy5fcG9zVmVyc2lvbiA9IHBvc1ZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsbCB0aGlzIG9uZSB3aGVuIGEgZmxvdyBpcyBmaW5pc2hlZCBhbmQgeW91IHdhbnQgdG8gZ28gYmFjayB0byBpZGxlIHN0YXRlLlxuICAgIC8vIFR5cGljYWxseSB3aGVuIHlvdXIgdXNlciBjbGlja3MgdGhlIFwiT0tcIiBidWJ0dG9uIHRvIGFja25vd2xkZ2UgdGhhdCBwYWlyaW5nIGlzXG4gICAgLy8gZmluaXNoZWQsIG9yIHRoYXQgdHJhbnNhY3Rpb24gaXMgZmluaXNoZWQuXG4gICAgLy8gV2hlbiB0cnVlLCB5b3UgY2FuIGRpc21pc3MgdGhlIGZsb3cgc2NyZWVuIGFuZCBzaG93IGJhY2sgdGhlIGlkbGUgc2NyZWVuLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cmV0dXJucz50cnVlIG1lYW5zIHdlIGhhdmUgbW92ZWQgYmFjayB0byB0aGUgSWRsZSBzdGF0ZS4gZmFsc2UgbWVhbnMgY3VycmVudCBmbG93IHdhcyBub3QgZmluaXNoZWQgeWV0LjwvcmV0dXJucz5cbiAgICBBY2tGbG93RW5kZWRBbmRCYWNrVG9JZGxlKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuSWRsZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBhbHJlYWR5IGlkbGVcblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LlBhaXJpbmcgJiYgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuSWRsZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LlRyYW5zYWN0aW9uICYmIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5JZGxlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGlzIHdpbGwgY29ubmVjdCB0byB0aGUgRWZ0cG9zIGFuZCBzdGFydCB0aGUgcGFpcmluZyBwcm9jZXNzLlxuICAgIC8vIE9ubHkgY2FsbCB0aGlzIGlmIHlvdSBhcmUgaW4gdGhlIFVucGFpcmVkIHN0YXRlLlxuICAgIC8vIFN1YnNjcmliZSB0byB0aGUgUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHBhaXJpbmcgcHJvY2Vzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHJldHVybnM+V2hldGhlciBwYWlyaW5nIGhhcyBpbml0aWF0ZWQgb3Igbm90PC9yZXR1cm5zPlxuICAgIFBhaXIoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyAhPSBTcGlTdGF0dXMuVW5wYWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy53YXJuKFwiVHJpZWQgdG8gUGFpciBidXQgd2UncmUgYWxyZWFkeSBzby5cIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX3Bvc0lkIHx8ICF0aGlzLl9lZnRwb3NBZGRyZXNzKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIlRyaWVkIHRvIFBhaXIgYnV0IG1pc3NpbmcgcG9zSWQgb3IgdXBkYXRlZEVmdHBvc0FkZHJlc3NcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5QYWlyaW5nO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlID0gbmV3IFBhaXJpbmdGbG93U3RhdGVcbiAgICAgICAgKHtcbiAgICAgICAgICAgIFN1Y2Nlc3NmdWw6IGZhbHNlLFxuICAgICAgICAgICAgRmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgTWVzc2FnZTogXCJDb25uZWN0aW5nLi4uXCIsXG4gICAgICAgICAgICBBd2FpdGluZ0NoZWNrRnJvbUVmdHBvczogZmFsc2UsXG4gICAgICAgICAgICBBd2FpdGluZ0NoZWNrRnJvbVBvczogZmFsc2UsXG4gICAgICAgICAgICBDb25maXJtYXRpb25Db2RlOiBcIlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdQYWlyaW5nRmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGV9KSk7XG4gICAgICAgIHRoaXMuX2Nvbm4uQ29ubmVjdCgpOyAvLyBOb24tQmxvY2tpbmdcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsbCB0aGlzIHdoZW4geW91ciB1c2VyIGNsaWNrcyB5ZXMgdG8gY29uZmlybSB0aGUgcGFpcmluZyBjb2RlIG9uIHlvdXIgXG4gICAgLy8gc2NyZWVuIG1hdGNoZXMgdGhlIG9uZSBvbiB0aGUgRWZ0cG9zLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBQYWlyaW5nQ29uZmlybUNvZGUoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tUG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBXZSB3ZXJlbid0IGV4cGVjdGluZyB0aGlzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tUG9zID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBCdXQgd2UgYXJlIHN0aWxsIHdhaXRpbmcgZm9yIGNvbmZpcm1hdGlvbiBmcm9tIEVmdHBvcyBzaWRlLlxuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJQYWlyIENvZGUgQ29uZmlybWVkIGZyb20gUE9TIHNpZGUsIGJ1dCBhbSBzdGlsbCB3YWl0aW5nIGZvciBjb25maXJtYXRpb24gZnJvbSBFZnRwb3MuXCIpO1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5NZXNzYWdlID1cbiAgICAgICAgICAgICAgICBcIkNsaWNrIFlFUyBvbiBFRlRQT1MgaWYgY29kZSBpczogXCIgKyB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkNvbmZpcm1hdGlvbkNvZGU7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQWxyZWFkeSBjb25maXJtZWQgZnJvbSBFZnRwb3MgLSBTbyBhbGwgZ29vZCBub3cuIFdlJ3JlIFBhaXJlZCBhbHNvIGZyb20gdGhlIFBPUyBwZXJzcGVjdGl2ZS5cbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiUGFpciBDb2RlIENvbmZpcm1lZCBmcm9tIFBPUyBzaWRlLCBhbmQgd2FzIGFscmVhZHkgY29uZmlybWVkIGZyb20gRWZ0cG9zIHNpZGUuIFBhaXJpbmcgZmluYWxpc2VkLlwiKTtcbiAgICAgICAgICAgIHRoaXMuX29uUGFpcmluZ1N1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHRoaXMuX29uUmVhZHlUb1RyYW5zYWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDYWxsIHRoaXMgaWYgeW91ciB1c2VyIGNsaWNrcyBDQU5DRUwgb3IgTk8gZHVyaW5nIHRoZSBwYWlyaW5nIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIFBhaXJpbmdDYW5jZWwoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5QYWlyaW5nIHx8IHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tUG9zICYmICF0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgdGhlIEVmdHBvcyBhbHJlYWR5IHRoaW5rcyBpdCdzIHBhaXJlZC5cbiAgICAgICAgICAgIC8vIExldCdzIHRlbGwgaXQgdG8gZHJvcCBrZXlzXG4gICAgICAgICAgICB0aGlzLl9zZW5kKG5ldyBEcm9wS2V5c1JlcXVlc3QoKS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQ2FsbCB0aGlzIHdoZW4geW91ciB1c2VzIGNsaWNrcyB0aGUgVW5wYWlyIGJ1dHRvbi5cbiAgICAvLyBUaGlzIHdpbGwgZGlzY29ubmVjdCBmcm9tIHRoZSBFZnRwb3MgYW5kIGZvcmdldCB0aGUgc2VjcmV0cy5cbiAgICAvLyBUaGUgQ3VycmVudFN0YXRlIGlzIHRoZW4gY2hhbmdlZCB0byBVbnBhaXJlZC5cbiAgICAvLyBDYWxsIHRoaXMgb25seSBpZiB5b3UgYXJlIG5vdCB5ZXQgaW4gdGhlIFVucGFpcmVkIHN0YXRlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBVbnBhaXIoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBCZXN0IGVmZm9ydCBsZXR0aW5nIHRoZSBlZnRwb3Mga25vdyB0aGF0IHdlJ3JlIGRyb3BwaW5nIHRoZSBrZXlzLCBzbyBpdCBjYW4gZHJvcCB0aGVtIGFzIHdlbGwuXG4gICAgICAgIHRoaXMuX3NlbmQobmV3IERyb3BLZXlzUmVxdWVzdCgpLlRvTWVzc2FnZSgpKTtcbiAgICAgICAgdGhpcy5fZG9VbnBhaXIoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZW5kcmVnaW9uXG5cbiAgICAvLyByZWdpb24gVHJhbnNhY3Rpb24gTWV0aG9kc1xuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gSW5pdGlhdGVzIGEgcHVyY2hhc2UgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QWxwaGFudW1lcmljIElkZW50aWZpZXIgZm9yIHlvdXIgcHVyY2hhc2UuPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFtb3VudENlbnRzXCI+QW1vdW50IGluIENlbnRzIHRvIGNoYXJnZTwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+SW5pdGlhdGVUeFJlc3VsdDwvcmV0dXJucz5cbiAgICBJbml0aWF0ZVB1cmNoYXNlVHgocG9zUmVmSWQsIGFtb3VudENlbnRzKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgUGFpcmVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHVyY2hhc2VSZXF1ZXN0ID0gUHVyY2hhc2VIZWxwZXIuQ3JlYXRlUHVyY2hhc2VSZXF1ZXN0KGFtb3VudENlbnRzLCBwb3NSZWZJZCk7XG4gICAgICAgIHB1cmNoYXNlUmVxdWVzdC5Db25maWcgPSB0aGlzLkNvbmZpZztcbiAgICAgICAgdmFyIHB1cmNoYXNlTXNnID0gcHVyY2hhc2VSZXF1ZXN0LlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlB1cmNoYXNlLCBhbW91bnRDZW50cywgcHVyY2hhc2VNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwYXltZW50IHJlcXVlc3QgZm9yICR7YW1vdW50Q2VudHMgLyAxMDAuMH1gKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQocHVyY2hhc2VNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gYWNjZXB0IHBheW1lbnQgZm9yICR7YW1vdW50Q2VudHMgLyAxMDAuMH1gKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQodHJ1ZSwgXCJQdXJjaGFzZSBJbml0aWF0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gSW5pdGlhdGVzIGEgcHVyY2hhc2UgdHJhbnNhY3Rpb24uIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIGdldCB1cGRhdGVzIG9uIHRoZSBwcm9jZXNzLlxuICAgIC8vIDxwYXJhPlRpcCBhbmQgY2FzaG91dCBhcmUgbm90IGFsbG93ZWQgc2ltdWx0YW5lb3VzbHkuPC9wYXJhPlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInBvc1JlZklkXCI+QW4gVW5pcXVlIElkZW50aWZpZXIgZm9yIHlvdXIgT3JkZXIvUHVyY2hhc2U8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicHVyY2hhc2VBbW91bnRcIj5UaGUgUHVyY2hhc2UgQW1vdW50IGluIENlbnRzLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJ0aXBBbW91bnRcIj5UaGUgVGlwIEFtb3VudCBpbiBDZW50czwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJjYXNob3V0QW1vdW50XCI+VGhlIENhc2hvdXQgQW1vdW50IGluIENlbnRzPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cInByb21wdEZvckNhc2hvdXRcIj5XaGV0aGVyIHRvIHByb21wdCB5b3VyIGN1c3RvbWVyIGZvciBjYXNob3V0IG9uIHRoZSBFZnRwb3M8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPlRoZSBTZXR0aW5nIHRvIHNldCBIZWFkZXIgYW5kIEZvb3RlciBmb3IgdGhlIFJlY2VpcHQ8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwic3VyY2hhcmdlQW1vdW50XCI+VGhlIFN1cmNoYXJnZSBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVQdXJjaGFzZVR4VjIocG9zUmVmSWQsIHB1cmNoYXNlQW1vdW50LCB0aXBBbW91bnQsIGNhc2hvdXRBbW91bnQsIHByb21wdEZvckNhc2hvdXQsIG9wdGlvbnMgPSB7fSwgc3VyY2hhcmdlQW1vdW50ID0gMClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcblxuICAgICAgICBpZiAodGlwQW1vdW50ID4gMCAmJiAoY2FzaG91dEFtb3VudCA+IDAgfHwgcHJvbXB0Rm9yQ2FzaG91dCkpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJDYW5ub3QgQWNjZXB0IFRpcHMgYW5kIENhc2hvdXQgYXQgdGhlIHNhbWUgdGltZS5cIik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIFxuICAgICAgICB2YXIgcHVyY2hhc2UgPSBQdXJjaGFzZUhlbHBlci5DcmVhdGVQdXJjaGFzZVJlcXVlc3RWMihwb3NSZWZJZCwgcHVyY2hhc2VBbW91bnQsIHRpcEFtb3VudCwgY2FzaG91dEFtb3VudCwgcHJvbXB0Rm9yQ2FzaG91dCwgc3VyY2hhcmdlQW1vdW50KTtcbiAgICAgICAgcHVyY2hhc2UuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHB1cmNoYXNlLk9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB2YXIgcHVyY2hhc2VNc2cgPSBwdXJjaGFzZS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlB1cmNoYXNlLCBwdXJjaGFzZUFtb3VudCwgcHVyY2hhc2VNc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwYXltZW50IHJlcXVlc3QuICR7cHVyY2hhc2UuQW1vdW50U3VtbWFyeSgpfWApO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChwdXJjaGFzZU1zZykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoYEFza2VkIEVGVFBPUyB0byBhY2NlcHQgcGF5bWVudCBmb3IgJHtwdXJjaGFzZS5BbW91bnRTdW1tYXJ5KCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiUHVyY2hhc2UgSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIHJlZnVuZCB0cmFuc2FjdGlvbi4gQmUgc3Vic2NyaWJlZCB0byBUeEZsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5BbHBoYW51bWVyaWMgSWRlbnRpZmllciBmb3IgeW91ciByZWZ1bmQuPC9wYXJhbT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImFtb3VudENlbnRzXCI+QW1vdW50IGluIENlbnRzIHRvIGNoYXJnZTwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJpc1N1cHByZXNzTWVyY2hhbnRQYXNzd29yZFwiPk1lcmNoYW50IFBhc3N3b3JkIGNvbnRyb2wgaW4gVkFBPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5Jbml0aWF0ZVR4UmVzdWx0PC9yZXR1cm5zPlxuICAgIEluaXRpYXRlUmVmdW5kVHgocG9zUmVmSWQsIGFtb3VudENlbnRzLCBpc1N1cHByZXNzTWVyY2hhbnRQYXNzd29yZCA9IGZhbHNlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgUGFpcmVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5JZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IElkbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVmdW5kUmVxdWVzdCA9IFB1cmNoYXNlSGVscGVyLkNyZWF0ZVJlZnVuZFJlcXVlc3QoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBpc1N1cHByZXNzTWVyY2hhbnRQYXNzd29yZCk7XG4gICAgICAgIHJlZnVuZFJlcXVlc3QuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHZhciByZWZ1bmRNc2cgPSByZWZ1bmRSZXF1ZXN0LlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlJlZnVuZCwgYW1vdW50Q2VudHMsIHJlZnVuZE1zZywgXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSByZWZ1bmQgcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQocmVmdW5kTXNnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgQXNrZWQgRUZUUE9TIHRvIHJlZnVuZCAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlJlZnVuZCBJbml0aWF0ZWRcIik7XG4gICAgfVxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIExldCB0aGUgRUZUUE9TIGtub3cgd2hldGhlciBtZXJjaGFudCBhY2NlcHRlZCBvciBkZWNsaW5lZCB0aGUgc2lnbmF0dXJlXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiYWNjZXB0ZWRcIj53aGV0aGVyIG1lcmNoYW50IGFjY2VwdGVkIHRoZSBzaWduYXR1cmUgZnJvbSBjdXN0b21lciBvciBub3Q8L3BhcmFtPlxuICAgIEFjY2VwdFNpZ25hdHVyZShhY2NlcHRlZClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2spXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gYWNjZXB0IHNpZ25hdHVyZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS5cIik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1pZFR4UmVzdWx0KGZhbHNlLCBcIkFza2VkIHRvIGFjY2VwdCBzaWduYXR1cmUgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVzcG9uZGVkKGFjY2VwdGVkID8gXCJBY2NlcHRpbmcgU2lnbmF0dXJlLi4uXCIgOiBcIkRlY2xpbmluZyBTaWduYXR1cmUuLi5cIik7XG4gICAgICAgIHZhciBzaWdSZXFNc2cgPSB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TaWduYXR1cmVSZXF1aXJlZE1lc3NhZ2U7XG4gICAgICAgIHRoaXMuX3NlbmQoYWNjZXB0ZWRcbiAgICAgICAgICAgID8gbmV3IFNpZ25hdHVyZUFjY2VwdCh0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCkuVG9NZXNzYWdlKClcbiAgICAgICAgICAgIDogbmV3IFNpZ25hdHVyZURlY2xpbmUodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQpLlRvTWVzc2FnZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdCh0cnVlLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBTdWJtaXQgdGhlIENvZGUgb2J0YWluZWQgYnkgeW91ciB1c2VyIHdoZW4gcGhvbmluZyBmb3IgYXV0aC4gXG4gICAgLy8gSXQgd2lsbCByZXR1cm4gaW1tZWRpYXRlbHkgdG8gdGVsbCB5b3Ugd2hldGhlciB0aGUgY29kZSBoYXMgYSB2YWxpZCBmb3JtYXQgb3Igbm90LiBcbiAgICAvLyBJZiB2YWxpZD09dHJ1ZSBpcyByZXR1cm5lZCwgbm8gbmVlZCB0byBkbyBhbnl0aGluZyBlbHNlLiBFeHBlY3QgdXBkYXRlcyB2aWEgc3RhbmRhcmQgY2FsbGJhY2suXG4gICAgLy8gSWYgdmFsaWQ9PWZhbHNlIGlzIHJldHVybmVkLCB5b3UgY2FuIHNob3cgeW91ciB1c2VyIHRoZSBhY2NvbXBhbnlpbmcgbWVzc2FnZSwgYW5kIGludml0ZSB0aGVtIHRvIGVudGVyIGFub3RoZXIgY29kZS4gXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiYXV0aENvZGVcIj5UaGUgY29kZSBvYnRhaW5lZCBieSB5b3VyIHVzZXIgZnJvbSB0aGUgbWVyY2hhbnQgY2FsbCBjZW50cmUuIEl0IHNob3VsZCBiZSBhIDYtY2hhcmFjdGVyIGFscGhhLW51bWVyaWMgdmFsdWUuPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz5XaGV0aGVyIGNvZGUgaGFzIGEgdmFsaWQgZm9ybWF0IG9yIG5vdC48L3JldHVybnM+XG4gICAgU3VibWl0QXV0aENvZGUoYXV0aENvZGUpXG4gICAge1xuICAgICAgICBpZiAoYXV0aENvZGUubGVuZ3RoICE9IDYpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3VibWl0QXV0aENvZGVSZXN1bHQoZmFsc2UsIFwiTm90IGEgNi1kaWdpdCBjb2RlLlwiKTsgICAgXG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQXdhaXRpbmdQaG9uZUZvckF1dGgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gc2VuZCBhdXRoIGNvZGUgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdWJtaXRBdXRoQ29kZVJlc3VsdChmYWxzZSwgXCJXYXMgbm90IHdhaXRpbmcgZm9yIG9uZS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5BdXRoQ29kZVNlbnQoYFN1Ym1pdHRpbmcgQXV0aCBDb2RlICR7YXV0aENvZGV9YCk7XG4gICAgICAgIHRoaXMuX3NlbmQobmV3IEF1dGhDb2RlQWR2aWNlKHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkLCBhdXRoQ29kZSkuVG9NZXNzYWdlKCkpO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IFN1Ym1pdEF1dGhDb2RlUmVzdWx0KHRydWUsIFwiVmFsaWQgQ29kZS5cIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gQXR0ZW1wdHMgdG8gY2FuY2VsIGEgVHJhbnNhY3Rpb24uIFxuICAgIC8vIEJlIHN1YnNjcmliZWQgdG8gVHhGbG93U3RhdGVDaGFuZ2VkIGV2ZW50IHRvIHNlZSBob3cgaXQgZ29lcy5cbiAgICAvLyBXYWl0IGZvciB0aGUgdHJhbnNhY3Rpb24gdG8gYmUgZmluaXNoZWQgYW5kIHRoZW4gc2VlIHdoZXRoZXIgY2FuY2VsbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHJldHVybnM+TWlkVHhSZXN1bHQgLSBmYWxzZSBvbmx5IGlmIHlvdSBjYWxsZWQgaXQgaW4gdGhlIHdyb25nIHN0YXRlPC9yZXR1cm5zPlxuICAgIENhbmNlbFRyYW5zYWN0aW9uKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uIGJ1dCBJIHdhcyBub3QgaW4gdGhlIG1pZGRsZSBvZiBvbmUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNaWRUeFJlc3VsdChmYWxzZSwgXCJBc2tlZCB0byBjYW5jZWwgdHJhbnNhY3Rpb24gYnV0IEkgd2FzIG5vdCBpbiB0aGUgbWlkZGxlIG9mIG9uZS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUSC0xQywgVEgtM0MgLSBNZXJjaGFudCBwcmVzc2VkIGNhbmNlbFxuICAgICAgICBpZiAodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUmVxdWVzdFNlbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjYW5jZWxSZXEgPSBuZXcgQ2FuY2VsVHJhbnNhY3Rpb25SZXF1ZXN0KCk7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5DYW5jZWxsaW5nKFwiQXR0ZW1wdGluZyB0byBDYW5jZWwgVHJhbnNhY3Rpb24uLi5cIik7XG4gICAgICAgICAgICB0aGlzLl9zZW5kKGNhbmNlbFJlcS5Ub01lc3NhZ2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBXZSBIYWQgTm90IEV2ZW4gU2VudCBSZXF1ZXN0IFlldC4gQ29uc2lkZXIgYXMga25vd24gZmFpbGVkLlxuICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmFpbGVkKG51bGwsIFwiVHJhbnNhY3Rpb24gQ2FuY2VsbGVkLiBSZXF1ZXN0IEhhZCBub3QgZXZlbiBiZWVuIHNlbnQgeWV0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICByZXR1cm4gbmV3IE1pZFR4UmVzdWx0KHRydWUsIFwiXCIpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIGNhc2hvdXQgb25seSB0cmFuc2FjdGlvbi4gQmUgc3Vic2NyaWJlZCB0byBUeEZsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5BbHBoYW51bWVyaWMgSWRlbnRpZmllciBmb3IgeW91ciB0cmFuc2FjdGlvbi48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwiYW1vdW50Q2VudHNcIj5BbW91bnQgaW4gQ2VudHMgdG8gY2FzaCBvdXQ8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwic3VyY2hhcmdlQW1vdW50XCI+VGhlIFN1cmNoYXJnZSBBbW91bnQgaW4gQ2VudHM8L3BhcmFtPlxuICAgIC8vIDxyZXR1cm5zPkluaXRpYXRlVHhSZXN1bHQ8L3JldHVybnM+XG4gICAgSW5pdGlhdGVDYXNob3V0T25seVR4KHBvc1JlZklkLCBhbW91bnRDZW50cywgc3VyY2hhcmdlQW1vdW50ID0gMClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgdmFyIGNhc2hvdXRPbmx5UmVxdWVzdCA9IG5ldyBDYXNob3V0T25seVJlcXVlc3QoYW1vdW50Q2VudHMsIHBvc1JlZklkLCBzdXJjaGFyZ2VBbW91bnQpO1xuICAgICAgICBjYXNob3V0T25seVJlcXVlc3QuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHZhciBjYXNob3V0TXNnID0gY2FzaG91dE9ubHlSZXF1ZXN0LlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLkNhc2hvdXRPbmx5LCBhbW91bnRDZW50cywgY2FzaG91dE1zZyxcbiAgICAgICAgICAgIGBXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBzZW5kIGNhc2hvdXQgcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKGNhc2hvdXRNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gZG8gY2FzaG91dCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiQ2FzaG91dCBJbml0aWF0ZWRcIik7XG4gICAgfSAgICBcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEluaXRpYXRlcyBhIE1haWwgT3JkZXIgLyBUZWxlcGhvbmUgT3JkZXIgUHVyY2hhc2UgVHJhbnNhY3Rpb25cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPkFscGhhbnVtZXJpYyBJZGVudGlmaWVyIGZvciB5b3VyIHRyYW5zYWN0aW9uLjwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRDZW50c1wiPkFtb3VudCBpbiBDZW50czwvcGFyYW0+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJzdXJjaGFyZ2VBbW91bnRcIj5UaGUgU3VyY2hhcmdlIEFtb3VudCBpbiBDZW50czwvcGFyYW0+XG4gICAgLy8gPHJldHVybnM+SW5pdGlhdGVUeFJlc3VsdDwvcmV0dXJucz5cbiAgICBJbml0aWF0ZU1vdG9QdXJjaGFzZVR4KHBvc1JlZklkLCBhbW91bnRDZW50cywgc3VyY2hhcmdlQW1vdW50ID0gMClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgdmFyIG1vdG9QdXJjaGFzZVJlcXVlc3QgPSBuZXcgTW90b1B1cmNoYXNlUmVxdWVzdChhbW91bnRDZW50cywgcG9zUmVmSWQsIHN1cmNoYXJnZUFtb3VudCk7XG4gICAgICAgIG1vdG9QdXJjaGFzZVJlcXVlc3QuQ29uZmlnID0gdGhpcy5Db25maWc7XG4gICAgICAgIHZhciBjYXNob3V0TXNnID0gbW90b1B1cmNoYXNlUmVxdWVzdC5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5NT1RPLCBhbW91bnRDZW50cywgY2FzaG91dE1zZyxcbiAgICAgICAgICAgIGBXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBzZW5kIE1PVE8gcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIGlmICh0aGlzLl9zZW5kKGNhc2hvdXRNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgZG8gTU9UTyBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiTU9UTyBJbml0aWF0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gSW5pdGlhdGVzIGEgc2V0dGxlbWVudCB0cmFuc2FjdGlvbi5cbiAgICAvLyBCZSBzdWJzY3JpYmVkIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZCBldmVudCB0byBnZXQgdXBkYXRlcyBvbiB0aGUgcHJvY2Vzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgSW5pdGlhdGVTZXR0bGVUeChwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNldHRsZVJlcXVlc3RNc2cgPSBuZXcgU2V0dGxlUmVxdWVzdChSZXF1ZXN0SWRIZWxwZXIuSWQoXCJzZXR0bGVcIikpLlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlNldHRsZSwgMCwgc2V0dGxlUmVxdWVzdE1zZywgXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBhIHNldHRsZSByZXF1ZXN0YCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlbmQoc2V0dGxlUmVxdWVzdE1zZykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoYEFza2VkIEVGVFBPUyB0byBzZXR0bGUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KHRydWUsIFwiU2V0dGxlIEluaXRpYXRlZFwiKTsgICBcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgSW5pdGlhdGVTZXR0bGVtZW50RW5xdWlyeShwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgdmFyIHN0bEVucU1zZyA9IG5ldyBTZXR0bGVtZW50RW5xdWlyeVJlcXVlc3QoUmVxdWVzdElkSGVscGVyLklkKFwic3RsZW5xXCIpKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5TZXR0bGVtZW50RW5xdWlyeSwgMCwgc3RsRW5xTXNnLFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIGEgc2V0dGxlbWVudCBlbnF1aXJ5XCIpO1xuICAgICAgICBpZiAodGhpcy5fc2VuZChzdGxFbnFNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KFwiQXNrZWQgRUZUUE9TIHRvIG1ha2UgYSBzZXR0bGVtZW50IGVucXVpcnkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlNldHRsZSBJbml0aWF0ZWRcIik7ICAgXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gSW5pdGlhdGVzIGEgR2V0IExhc3QgVHJhbnNhY3Rpb24uIFVzZSB0aGlzIHdoZW4geW91IHdhbnQgdG8gcmV0cmlldmUgdGhlIG1vc3QgcmVjZW50IHRyYW5zYWN0aW9uXG4gICAgLy8gdGhhdCB3YXMgcHJvY2Vzc2VkIGJ5IHRoZSBFZnRwb3MuXG4gICAgLy8gQmUgc3Vic2NyaWJlZCB0byBUeEZsb3dTdGF0ZUNoYW5nZWQgZXZlbnQgdG8gZ2V0IHVwZGF0ZXMgb24gdGhlIHByb2Nlc3MuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIEluaXRpYXRlR2V0TGFzdFR4KClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdsdFJlcXVlc3RNc2cgPSBuZXcgR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCgpLlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRGbG93ID0gU3BpRmxvdy5UcmFuc2FjdGlvbjtcbiAgICAgICAgdmFyIHBvc1JlZklkID0gZ2x0UmVxdWVzdE1zZy5JZDsgLy8gR2V0TGFzdFR4IGlzIG5vdCB0cnlpbmcgdG8gZ2V0IGFueXRoaW5nIHNwZWNpZmljIGJhY2suIFNvIHdlIGp1c3QgdXNlIHRoZSBtZXNzYWdlIGlkLlxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuR2V0TGFzdFRyYW5zYWN0aW9uLCAwLCBnbHRSZXF1ZXN0TXNnLCBcbiAgICAgICAgICAgIFwiV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBhIEdldC1MYXN0LVRyYW5zYWN0aW9uIHJlcXVlc3QuXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX3NlbmQoZ2x0UmVxdWVzdE1zZykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoYEFza2VkIEVGVFBPUyBmb3IgbGFzdCB0cmFuc2FjdGlvbi5gKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIkdMVCBJbml0aWF0ZWRcIik7ICAgXG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBpcyB1c2VmdWwgdG8gcmVjb3ZlciBmcm9tIHlvdXIgUE9TIGNyYXNoaW5nIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi5cbiAgICAvLyBXaGVuIHlvdSByZXN0YXJ0IHlvdXIgUE9TLCBpZiB5b3UgaGFkIHNhdmVkIGVub3VnaCBzdGF0ZSwgeW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIHRvIHJlY292ZXIgdGhlIGNsaWVudCBsaWJyYXJ5IHN0YXRlLlxuICAgIC8vIFlvdSBuZWVkIHRvIGhhdmUgdGhlIHBvc1JlZklkIHRoYXQgeW91IHBhc3NlZCBpbiB3aXRoIHRoZSBvcmlnaW5hbCB0cmFuc2FjdGlvbiwgYW5kIHRoZSB0cmFuc2FjdGlvbiB0eXBlLlxuICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGltbWVkaWF0ZWx5IHdoZXRoZXIgcmVjb3ZlcnkgaGFzIHN0YXJ0ZWQgb3Igbm90LlxuICAgIC8vIElmIHJlY292ZXJ5IGhhcyBzdGFydGVkLCB5b3UgbmVlZCB0byBicmluZyB1cCB0aGUgdHJhbnNhY3Rpb24gbW9kYWwgdG8geW91ciB1c2VyIGEgYmUgbGlzdGVuaW5nIHRvIFR4Rmxvd1N0YXRlQ2hhbmdlZC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJwb3NSZWZJZFwiPlRoZSBpcyB0aGF0IHlvdSBoYWQgYXNzaWduZWQgdG8gdGhlIHRyYW5zYWN0aW9uIHRoYXQgeW91IGFyZSB0cnlpbmcgdG8gcmVjb3Zlci48L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwidHhUeXBlXCI+VGhlIHRyYW5zYWN0aW9uIHR5cGUuPC9wYXJhbT5cbiAgICAvLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgSW5pdGlhdGVSZWNvdmVyeShwb3NSZWZJZCwgdHhUeXBlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudFN0YXR1cyA9PSBTcGlTdGF0dXMuVW5wYWlyZWQpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgUGFpcmVkXCIpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LklkbGUpIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdChmYWxzZSwgXCJOb3QgSWRsZVwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudEZsb3cgPSBTcGlGbG93LlRyYW5zYWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgdmFyIGdsdFJlcXVlc3RNc2cgPSBuZXcgR2V0TGFzdFRyYW5zYWN0aW9uUmVxdWVzdCgpLlRvTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZSA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCB0eFR5cGUsIDAsIGdsdFJlcXVlc3RNc2csIFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBhdHRlbXB0IHJlY292ZXJ5LlwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLl9zZW5kKGdsdFJlcXVlc3RNc2cpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5TZW50KGBBc2tlZCBFRlRQT1MgdG8gcmVjb3ZlciBzdGF0ZS5gKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlJlY292ZXJ5IEluaXRpYXRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBHbHRNYXRjaCBhdHRlbXB0cyB0byBjb25jbHVkZSB3aGV0aGVyIGEgZ2x0UmVzcG9uc2UgbWF0Y2hlcyBhbiBleHBlY3RlZCB0cmFuc2FjdGlvbiBhbmQgcmV0dXJuc1xuICAgIC8vIHRoZSBvdXRjb21lLiBcbiAgICAvLyBJZiBTdWNjZXNzL0ZhaWxlZCBpcyByZXR1cm5lZCwgaXQgbWVhbnMgdGhhdCB0aGUgZ3RsUmVzcG9uc2UgZGlkIG1hdGNoLCBhbmQgdGhhdCB0cmFuc2FjdGlvbiB3YXMgc3VjY2VzZnVsL2ZhaWxlZC5cbiAgICAvLyBJZiBVbmtub3duIGlzIHJldHVybmVkLCBpdCBtZWFucyB0aGF0IHRoZSBnbHRSZXNwb25zZSBkb2VzIG5vdCBtYXRjaCB0aGUgZXhwZWN0ZWQgdHJhbnNhY3Rpb24uIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cImdsdFJlc3BvbnNlXCI+VGhlIEdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlIG1lc3NhZ2UgdG8gY2hlY2s8L3BhcmFtPlxuICAgIC8vIDxwYXJhbSBuYW1lPVwicG9zUmVmSWRcIj5UaGUgUmVmZXJlbmNlIElkIHRoYXQgeW91IHBhc3NlZCBpbiB3aXRoIHRoZSBvcmlnaW5hbCByZXF1ZXN0LjwvcGFyYW0+XG5cbiAgICAvLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgR2x0TWF0Y2goZ2x0UmVzcG9uc2UsIHBvc1JlZklkLCAuLi5kZXByZWNhdGVkQXJncykgXG4gICAge1xuICAgICAgICAvLyBPYnNvbGV0ZSBtZXRob2QgY2FsbCBjaGVja1xuICAgICAgICAvLyBPbGQgaW50ZXJmYWNlOiBHbHRNYXRjaChHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSBnbHRSZXNwb25zZSwgVHJhbnNhY3Rpb25UeXBlIGV4cGVjdGVkVHlwZSwgaW50IGV4cGVjdGVkQW1vdW50LCBEYXRlVGltZSByZXF1ZXN0VGltZSwgc3RyaW5nIHBvc1JlZklkKVxuICAgICAgICBpZihkZXByZWNhdGVkQXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmKGRlcHJlY2F0ZWRBcmdzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJPYnNvbGV0ZSBtZXRob2QgY2FsbCBkZXRlY3RlZDogVXNlIEdsdE1hdGNoKGdsdFJlc3BvbnNlLCBwb3NSZWZJZClcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuR2x0TWF0Y2goZ2x0UmVzcG9uc2UsIGRlcHJlY2F0ZWRBcmdzWzJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2Jzb2xldGUgbWV0aG9kIGNhbGwgd2l0aCB1bmtub3duIGFyZ3M6IFVzZSBHbHRNYXRjaChHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZSBnbHRSZXNwb25zZSwgc3RyaW5nIHBvc1JlZklkKVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvZy5pbmZvKGBHTFQgQ0hFQ0s6IFBvc1JlZklkOiAke3Bvc1JlZklkfS0+JHtnbHRSZXNwb25zZS5HZXRQb3NSZWZJZCgpfWApO1xuXG4gICAgICAgIGlmICghcG9zUmVmSWQgPT0gZ2x0UmVzcG9uc2UuR2V0UG9zUmVmSWQoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFN1Y2Nlc3NTdGF0ZS5Vbmtub3duO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsdFJlc3BvbnNlLkdldFN1Y2Nlc3NTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICBQcmludFJlY2VpcHQoa2V5LCBwYXlsb2FkKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2VuZChuZXcgUHJpbnRpbmdSZXF1ZXN0KGtleSwgcGF5bG9hZCkudG9NZXNzYWdlKCkpO1xuICAgIH1cblxuICAgIEdldFRlcm1pbmFsU3RhdHVzKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NlbmQobmV3IFRlcm1pbmFsU3RhdHVzUmVxdWVzdCgpLlRvTWVzc2FnZSgpKTtcbiAgICB9XG5cbiAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgXG4gICAgLy8gcmVnaW9uIEludGVybmFscyBmb3IgUGFpcmluZyBGbG93XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBIYW5kbGluZyB0aGUgMm5kIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgS2V5UmVxdWVzdC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+aW5jb21pbmcgbWVzc2FnZTwvcGFyYW0+XG4gICAgX2hhbmRsZUtleVJlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiTmVnb3RpYXRpbmcgUGFpcmluZy4uLlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuXG4gICAgICAgIC8vIFVzZSB0aGUgaGVscGVyLiBJdCB0YWtlcyB0aGUgaW5jb21pbmcgcmVxdWVzdCwgYW5kIGdlbmVyYXRlcyB0aGUgc2VjcmV0cyBhbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICB2YXIgcGggICAgICA9IG5ldyBQYWlyaW5nSGVscGVyKCk7XG4gICAgICAgIHZhciByZXN1bHQgID0gcGguR2VuZXJhdGVTZWNyZXRzQW5kS2V5UmVzcG9uc2UobmV3IEtleVJlcXVlc3QobSkpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gcmVzdWx0LlNlY3JldHM7IC8vIHdlIG5vdyBoYXZlIHNlY3JldHMsIGFsdGhvdWdoIHBhaXJpbmcgaXMgbm90IGZ1bGx5IGZpbmlzaGVkIHlldC5cbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSB0aGlzLl9zZWNyZXRzOyAvLyB1cGRhdGluZyBvdXIgc3RhbXAgd2l0aCB0aGUgc2VjcmV0cyBzbyBjYW4gZW5jcnlwdCBtZXNzYWdlcyBsYXRlci5cbiAgICAgICAgdGhpcy5fc2VuZChyZXN1bHQuS2V5UmVzcG9uc2UuVG9NZXNzYWdlKCkpOyAvLyBzZW5kIHRoZSBrZXlfcmVzcG9uc2UsIGkuZS4gaW50ZXJhY3Rpb24gMyBvZiBwYWlyaW5nLlxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA0dGggaW50ZXJhY3Rpb24gb2YgdGhlIHBhaXJpbmcgcHJvY2VzcyBpLmUuIGFuIGluY29taW5nIEtleUNoZWNrLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVLZXlDaGVjayhtKVxuICAgIHtcbiAgICAgICAgdmFyIGtleUNoZWNrID0gbmV3IEtleUNoZWNrKG0pO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkNvbmZpcm1hdGlvbkNvZGUgPSBrZXlDaGVjay5Db25maXJtYXRpb25Db2RlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyBzaG93aW5nIG9uIHRoZSBUZXJtaW5hbFwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsaW5nIHRoZSA1dGggYW5kIGZpbmFsIGludGVyYWN0aW9uIG9mIHRoZSBwYWlyaW5nIHByb2Nlc3MsIGkuZS4gYW4gaW5jb21pbmcgUGFpclJlc3BvbnNlXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVBhaXJSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIHBhaXJSZXNwID0gbmV3IFBhaXJSZXNwb25zZShtKTtcblxuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLkF3YWl0aW5nQ2hlY2tGcm9tRWZ0cG9zID0gZmFsc2U7XG4gICAgICAgIGlmIChwYWlyUmVzcC5TdWNjZXNzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBTdGlsbCBXYWl0aW5nIGZvciBVc2VyIHRvIHNheSB5ZXMgb24gUE9TXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJHb3QgUGFpciBDb25maXJtIGZyb20gRWZ0cG9zLCBidXQgc3RpbGwgd2FpdGluZyBmb3IgdXNlIHRvIGNvbmZpcm0gZnJvbSBQT1MuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ29uZmlybSB0aGF0IHRoZSBmb2xsb3dpbmcgQ29kZSBpcyB3aGF0IHRoZSBFRlRQT1Mgc2hvd2VkXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkdvdCBQYWlyIENvbmZpcm0gZnJvbSBFZnRwb3MsIGFuZCBhbHJlYWR5IGhhZCBjb25maXJtIGZyb20gUE9TLiBOb3cganVzdCB3YWl0aW5nIGZvciBmaXJzdCBwb25nLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblBhaXJpbmdTdWNjZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJIG5lZWQgdG8gcGluZy9sb2dpbiBldmVuIGlmIHRoZSBwb3MgdXNlciBoYXMgbm90IHNhaWQgeWVzIHlldCwgXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG90aGVyd2lzZSB3aXRoaW4gNSBzZWNvbmRzIGNvbm5lY3Rpb25nIHdpbGwgYmUgZHJvcHBlZCBieSBlZnRwb3MuXG4gICAgICAgICAgICB0aGlzLl9zdGFydFBlcmlvZGljUGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb25QYWlyaW5nRmFpbGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlRHJvcEtleXNBZHZpY2UobSlcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiRWZ0cG9zIHdhcyBVbnBhaXJlZC4gSSBzaGFsbCB1bnBhaXIgZnJvbSBteSBlbmQgYXMgd2VsbC5cIik7XG4gICAgICAgIHRoaXMuX2RvVW5wYWlyKCk7XG4gICAgfVxuXG4gICAgX29uUGFpcmluZ1N1Y2Nlc3MoKVxuICAgIHtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5TdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiUGFpcmluZyBTdWNjZXNzZnVsIVwiO1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuUGFpcmVkQ29ubmVjdGVkO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9vblBhaXJpbmdGYWlsZWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29ubi5EaXNjb25uZWN0KCk7XG5cbiAgICAgICAgdGhpcy5DdXJyZW50U3RhdHVzID0gU3BpU3RhdHVzLlVucGFpcmVkO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLk1lc3NhZ2UgPSBcIlBhaXJpbmcgRmFpbGVkXCI7XG4gICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlLlN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5Bd2FpdGluZ0NoZWNrRnJvbVBvcyA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIF9kb1VucGFpcigpXG4gICAge1xuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuVW5wYWlyZWQ7XG4gICAgICAgIHRoaXMuX2Nvbm4uRGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zZWNyZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3BpTWVzc2FnZVN0YW1wLlNlY3JldHMgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnU2VjcmV0c0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zZWNyZXRzfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB0aGUgc2VydmVyIGFza3MgdXMgdG8gcm9sbCBvdXIgc2VjcmV0cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlS2V5Um9sbGluZ1JlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIC8vIHdlIGNhbGN1bGF0ZSB0aGUgbmV3IG9uZXMuLi5cbiAgICAgICAgdmFyIGtyUmVzID0gS2V5Um9sbGluZ0hlbHBlci5QZXJmb3JtS2V5Um9sbGluZyhtLCB0aGlzLl9zZWNyZXRzKTtcbiAgICAgICAgdGhpcy5fc2VjcmV0cyA9IGtyUmVzLk5ld1NlY3JldHM7IC8vIGFuZCB1cGRhdGUgb3VyIHNlY3JldHMgd2l0aCB0aGVtXG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZWNyZXRzID0gdGhpcy5fc2VjcmV0czsgLy8gYW5kIG91ciBzdGFtcFxuICAgICAgICB0aGlzLl9zZW5kKGtyUmVzLktleVJvbGxpbmdDb25maXJtYXRpb24pOyAvLyBhbmQgd2UgdGVsbCB0aGUgc2VydmVyIHRoYXQgYWxsIGlzIHdlbGwuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTZWNyZXRzQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NlY3JldHN9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGEgY3VzdG9tZXIgc2lnbmF0dXJlIGlzIHJlcWlyZWQuXG4gICAgLy8gV2UgbmVlZCB0byBhc2sgdGhlIGN1c3RvbWVyIHRvIHNpZ24gdGhlIGluY29taW5nIHJlY2VpcHQuXG4gICAgLy8gQW5kIHRoZW4gdGVsbCB0aGUgcGlucGFkIHdoZXRoZXIgdGhlIHNpZ25hdHVyZSBpcyBvayBvciBub3QuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZVNpZ25hdHVyZVJlcXVpcmVkKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2lnbmF0dXJlIFJlcXVpcmVkIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2lnbmF0dXJlUmVxdWlyZWQobmV3IFNpZ25hdHVyZVJlcXVpcmVkKG0pLCBcIkFzayBDdXN0b21lciB0byBTaWduIHRoZSBSZWNlaXB0XCIpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCBzZW5kIHVzIHRoaXMgbWVzc2FnZSB3aGVuIGFuIGF1dGggY29kZSBpcyByZXF1aXJlZC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlQXV0aENvZGVSZXF1aXJlZChtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUG9zUmVmSWQgPT0gaW5jb21pbmdQb3NSZWZJZClcbiAgICAgICAge1xuICAgICAgICAgICAgX2xvZy5pbmZvKGBSZWNlaXZlZCBBdXRoIENvZGUgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGhvbmVGb3JBdXRoUmVxdWlyZWQgPSBuZXcgUGhvbmVGb3JBdXRoUmVxdWlyZWQobSk7XG4gICAgICAgIHZhciBtc2cgPSBgQXV0aCBDb2RlIFJlcXVpcmVkLiBDYWxsICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0UGhvbmVOdW1iZXIoKX0gYW5kIHF1b3RlIG1lcmNoYW50IGlkICR7cGhvbmVGb3JBdXRoUmVxdWlyZWQuR2V0TWVyY2hhbnRJZCgpfWA7XG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKHBob25lRm9yQXV0aFJlcXVpcmVkLCBtc2cpO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgUHVyY2hhc2VSZXF1ZXN0IHdpdGggYSBQdXJjaGFzZVJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVQdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUHVyY2hhc2UgcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1cImApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiUHVyY2hhc2UgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGUgUGluUGFkIHNlcnZlciB3aWxsIHJlcGx5IHRvIG91ciBDYXNob3V0T25seVJlcXVlc3Qgd2l0aCBhIENhc2hvdXRPbmx5UmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUNhc2hvdXRPbmx5UmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBDYXNob3V0IFJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiBJbmNvbWluZyBQb3MgUmVmIElEOiAke2luY29taW5nUG9zUmVmSWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJDYXNob3V0IFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhlIFBpblBhZCBzZXJ2ZXIgd2lsbCByZXBseSB0byBvdXIgTW90b1B1cmNoYXNlUmVxdWVzdCB3aXRoIGEgTW90b1B1cmNoYXNlUmVzcG9uc2UuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZU1vdG9QdXJjaGFzZVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkIHx8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgTW90byBSZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gSW5jb21pbmcgUG9zIFJlZiBJRDogJHtpbmNvbWluZ1Bvc1JlZklkfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuICAgICAgICBcbiAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiTW90byBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH0gICBcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoZSBQaW5QYWQgc2VydmVyIHdpbGwgcmVwbHkgdG8gb3VyIFJlZnVuZFJlcXVlc3Qgd2l0aCBhIFJlZnVuZFJlc3BvbnNlLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVSZWZ1bmRSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdmFyIGluY29taW5nUG9zUmVmSWQgPSBtLkRhdGEucG9zX3JlZl9pZDtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8ICF0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Qb3NSZWZJZCA9PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUmVmdW5kIHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3IgdGhpcyBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlJlZnVuZCBUcmFuc2FjdGlvbiBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRPRE86IEhhbmRsZSB0aGUgU2V0dGxlbWVudCBSZXNwb25zZSByZWNlaXZlZCBmcm9tIHRoZSBQaW5QYWRcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBIYW5kbGVTZXR0bGVSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgIT0gU3BpRmxvdy5UcmFuc2FjdGlvbiB8fCB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFJlY2VpdmVkIFNldHRsZSByZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gJHttLkRlY3J5cHRlZEpzb259YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVEgtMUEsIFRILTJBXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJTZXR0bGUgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEhhbmRsZSB0aGUgU2V0dGxlbWVudCBFbnF1aXJ5IFJlc3BvbnNlIHJlY2VpdmVkIGZyb20gdGhlIFBpblBhZFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVTZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgU2V0dGxlbWVudCBFbnF1aXJ5IHJlc3BvbnNlIGJ1dCBJIHdhcyBub3Qgd2FpdGluZyBmb3Igb25lLiAke20uRGVjcnlwdGVkSnNvbn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNvbXBsZXRlZChtLkdldFN1Y2Nlc3NTdGF0ZSgpLCBtLCBcIlNldHRsZW1lbnQgRW5xdWlyeSBFbmRlZC5cIik7XG4gICAgICAgIC8vIFRILTZBLCBUSC02RVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFNvbWV0aW1lcyB3ZSByZWNlaXZlIGV2ZW50IHR5cGUgXCJlcnJvclwiIGZyb20gdGhlIHNlcnZlciwgc3VjaCBhcyB3aGVuIGNhbGxpbmcgY2FuY2VsX3RyYW5zYWN0aW9uIGFuZCB0aGVyZSBpcyBubyB0cmFuc2FjdGlvbiBpbiBwcm9ncmVzcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlRXJyb3JFdmVudChtKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEZsb3cgPT0gU3BpRmxvdy5UcmFuc2FjdGlvblxuICAgICAgICAgICAgJiYgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkXG4gICAgICAgICAgICAmJiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZS5BdHRlbXB0aW5nVG9DYW5jZWxcbiAgICAgICAgICAgICYmIG0uR2V0RXJyb3IoKSA9PSBcIk5PX1RSQU5TQUNUSU9OXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRILTJFXG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgV2FzIHRyeWluZyB0byBjYW5jZWwgYSB0cmFuc2FjdGlvbiBidXQgdGhlcmUgaXMgbm90aGluZyB0byBjYW5jZWwuIENhbGxpbmcgR0xUIHRvIHNlZSB3aGF0J3MgdXBgKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBFcnJvciBFdmVudCBCdXQgRG9uJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggaXQuICR7bS5EZWNyeXB0ZWRKc29ufWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gV2hlbiB0aGUgUGluUGFkIHJldHVybnMgdG8gdXMgd2hhdCB0aGUgTGFzdCBUcmFuc2FjdGlvbiB3YXMuXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibVwiPjwvcGFyYW0+XG4gICAgX2hhbmRsZUdldExhc3RUcmFuc2FjdGlvblJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgdHhTdGF0ZSA9IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IHR4U3RhdGUuRmluaXNoZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFdlIHdlcmUgbm90IGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbiwgd2hvIGNhcmVzP1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEgtNCBXZSB3ZXJlIGluIHRoZSBtaWRkbGUgb2YgYSB0cmFuc2FjdGlvbi5cbiAgICAgICAgLy8gTGV0J3MgYXR0ZW1wdCByZWNvdmVyeS4gVGhpcyBpcyBzdGVwIDQgb2YgVHJhbnNhY3Rpb24gUHJvY2Vzc2luZyBIYW5kbGluZ1xuICAgICAgICB0aGlzLl9sb2cuaW5mbyhgR290IExhc3QgVHJhbnNhY3Rpb24uLmApO1xuICAgICAgICB0eFN0YXRlLkdvdEdsdFJlc3BvbnNlKCk7XG4gICAgICAgIHZhciBndGxSZXNwb25zZSA9IG5ldyBHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZShtKTtcbiAgICAgICAgdHhTdGF0ZS5HTFRSZXNwb25zZVBvc1JlZklkID0gZ3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKTtcbiAgICAgICAgaWYgKCFndGxSZXNwb25zZS5XYXNSZXRyaWV2ZWRTdWNjZXNzZnVsbHkoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGd0bFJlc3BvbnNlLklzU3RpbGxJblByb2dyZXNzKHR4U3RhdGUuUG9zUmVmSWQpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFRILTRFIC0gT3BlcmF0aW9uIEluIFByb2dyZXNzXG5cbiAgICAgICAgICAgICAgICBpZiAoZ3RsUmVzcG9uc2UuSXNXYWl0aW5nRm9yU2lnbmF0dXJlUmVzcG9uc2UoKSAmJiAhdHhTdGF0ZS5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBzaWduYXR1cmUgYWNjZXB0L2RlY2xpbmUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSB1c2VyIGNhbiBvbmx5IHJlYWxseSBkZWNsaW5lIGF0IHRoaXMgc3RhZ2UgYXMgdGhlcmUgaXMgbm8gcmVjZWlwdCB0byBwcmludCBmb3Igc2lnbmluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlNpZ25hdHVyZVJlcXVpcmVkKG5ldyBTaWduYXR1cmVSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIk1JU1NJTkcgUkVDRUlQVFxcbiBERUNMSU5FIEFORCBUUlkgQUdBSU4uXCIpLCBcIlJlY292ZXJlZCBpbiBTaWduYXR1cmUgUmVxdWlyZWQgYnV0IHdlIGRvbid0IGhhdmUgcmVjZWlwdC4gWW91IG1heSBEZWNsaW5lIHRoZW4gUmV0cnkuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5Jc1dhaXRpbmdGb3JBdXRoQ29kZSgpICYmICF0eFN0YXRlLkF3YWl0aW5nUGhvbmVGb3JBdXRoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJFZnRwb3MgaXMgd2FpdGluZyBmb3IgdXMgdG8gc2VuZCBpdCBhdXRoIGNvZGUsIGJ1dCB3ZSB3ZXJlIG5vdCBhd2FyZSBvZiB0aGlzLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlIGNhbiBvbmx5IGNhbmNlbCB0aGUgdHJhbnNhY3Rpb24gYXQgdGhpcyBzdGFnZSBhcyB3ZSBkb24ndCBoYXZlIGVub3VnaCBpbmZvcm1hdGlvbiB0byByZWNvdmVyIGZyb20gdGhpcy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBob25lRm9yQXV0aFJlcXVpcmVkKG5ldyBQaG9uZUZvckF1dGhSZXF1aXJlZCh0eFN0YXRlLlBvc1JlZklkLCBtLklkLCBcIlVOS05PV05cIiwgXCJVTktOT1dOXCIpLCBcIlJlY292ZXJlZCBtaWQgUGhvbmUtRm9yLUF1dGggYnV0IGRvbid0IGhhdmUgZGV0YWlscy4gWW91IG1heSBDYW5jZWwgdGhlbiBSZXRyeS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiT3BlcmF0aW9uIHN0aWxsIGluIHByb2dyZXNzLi4uIHN0YXkgd2FpdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gcHVibGlzaCB0eEZsb3dTdGF0ZUNoYW5nZWQuIENhbiByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChndGxSZXNwb25zZS5XYXNUaW1lT3V0T2ZTeW5jRXJyb3IoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBub3QgZ2l2ZSB1cCBiYXNlZCBvbiBhIFRPT1MgZXJyb3IuXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgbG9nIGl0LCBhbmQgaWdub3JlIGl0LiBcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgVGltZS1PdXQtT2YtU3luYyBlcnJvciBpbiBHZXQgTGFzdCBUcmFuc2FjdGlvbiByZXNwb25zZS4gTGV0J3MgaWdub3JlIGl0IGFuZCB3ZSdsbCB0cnkgYWdhaW4uYCk7XG4gICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBwdWJsaXNoIHR4Rmxvd1N0YXRlQ2hhbmdlZC4gQ2FuIHJldHVybjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtNFggLSBVbmV4cGVjdGVkIFJlc3BvbnNlIHdoZW4gcmVjb3ZlcmluZ1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBVbmV4cGVjdGVkIFJlc3BvbnNlIGluIEdldCBMYXN0IFRyYW5zYWN0aW9uIGR1cmluZyAtIFJlY2VpdmVkIHBvc1JlZklkOiR7Z3RsUmVzcG9uc2UuR2V0UG9zUmVmSWQoKX0gRXJyb3I6JHttLkdldEVycm9yKCl9YCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiVW5leHBlY3RlZCBFcnJvciB3aGVuIHJlY292ZXJpbmcgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eFN0YXRlLlR5cGUgPT0gVHJhbnNhY3Rpb25UeXBlLkdldExhc3RUcmFuc2FjdGlvbilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSElTIFdBUyBBIFBMQUlOIEdFVCBMQVNUIFRSQU5TQUNUSU9OIFJFUVVFU1QsIE5PVCBGT1IgUkVDT1ZFUlkgUFVSUE9TRVMuXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJSZXRyaWV2ZWQgTGFzdCBUcmFuc2FjdGlvbiBhcyBhc2tlZCBkaXJlY3RseSBieSB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgZ3RsUmVzcG9uc2UuQ29weU1lcmNoYW50UmVjZWlwdFRvQ3VzdG9tZXJSZWNlaXB0KCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJMYXN0IFRyYW5zYWN0aW9uIFJldHJpZXZlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC00QSAtIExldCdzIHRyeSB0byBtYXRjaCB0aGUgcmVjZWl2ZWQgbGFzdCB0cmFuc2FjdGlvbiBhZ2FpbnN0IHRoZSBjdXJyZW50IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NTdGF0ZSA9IHRoaXMuR2x0TWF0Y2goZ3RsUmVzcG9uc2UsIHR4U3RhdGUuUG9zUmVmSWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzU3RhdGUgPT0gU3VjY2Vzc1N0YXRlLlVua25vd24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBUSC00TjogRGlkbid0IE1hdGNoIG91ciB0cmFuc2FjdGlvbi4gQ29uc2lkZXIgVW5rbm93biBTdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJEaWQgbm90IG1hdGNoIHRyYW5zYWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKFwiRmFpbGVkIHRvIHJlY292ZXIgVHJhbnNhY3Rpb24gU3RhdHVzLiBDaGVjayBFRlRQT1MuIFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVEgtNFk6IFdlIE1hdGNoZWQsIHRyYW5zYWN0aW9uIGZpbmlzaGVkLCBsZXQncyB1cGRhdGUgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGd0bFJlc3BvbnNlLkNvcHlNZXJjaGFudFJlY2VpcHRUb0N1c3RvbWVyUmVjZWlwdCgpO1xuICAgICAgICAgICAgICAgICAgICB0eFN0YXRlLkNvbXBsZXRlZChzdWNjZXNzU3RhdGUsIG0sIFwiVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHR4U3RhdGV9KSk7XG4gICAgfVxuXG4gICAgLy9XaGVuIHRoZSB0cmFuc2FjdGlvbiBjYW5jZWwgcmVzcG9uc2UgaXMgcmV0dXJuZWQuXG4gICAgX2hhbmRsZUNhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciBpbmNvbWluZ1Bvc1JlZklkID0gbS5EYXRhLnBvc19yZWZfaWQ7XG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuVHJhbnNhY3Rpb24gfHwgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuRmluaXNoZWQgfHwgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09IGluY29taW5nUG9zUmVmSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBSZWNlaXZlZCBDYW5jZWwgUmVxdWlyZWQgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eFN0YXRlID0gdGhpcy5DdXJyZW50VHhGbG93U3RhdGU7XG4gICAgICAgIHZhciBjYW5jZWxSZXNwb25zZSA9IG5ldyBDYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlKG0pO1xuXG4gICAgICAgIGlmIChjYW5jZWxSZXNwb25zZS5TdWNjZXNzKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJGYWlsZWQgdG8gY2FuY2VsIHRyYW5zYWN0aW9uOiByZWFzb249XCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvclJlYXNvbigpICsgXCIsIGRldGFpbD1cIiArIGNhbmNlbFJlc3BvbnNlLkdldEVycm9yRGV0YWlsKCkpO1xuXG4gICAgICAgIHR4U3RhdGUuQ2FuY2VsRmFpbGVkKFwiRmFpbGVkIHRvIGNhbmNlbCB0cmFuc2FjdGlvbjogXCIgKyBjYW5jZWxSZXNwb25zZS5HZXRFcnJvckRldGFpbCgpICsgXCIuIENoZWNrIEVGVFBPUy5cIik7XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0eFN0YXRlfSkpO1xuICAgIH1cblxuICAgIF9oYW5kbGVTZXRQb3NJbmZvUmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHZhciByZXNwb25zZSA9IG5ldyBTZXRQb3NJbmZvUmVzcG9uc2UobSk7XG4gICAgICAgIGlmIChyZXNwb25zZS5pc1N1Y2Nlc3MoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faGFzU2V0SW5mbyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9sb2cuSW5mbyhcIlNldHRpbmcgUE9TIGluZm8gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5XYXJuKFwiU2V0dGluZyBQT1MgaW5mbyBmYWlsZWQ6IHJlYXNvbj1cIiArIHJlc3BvbnNlLmdldEVycm9yUmVhc29uKCkgKyBcIiwgZGV0YWlsPVwiICsgcmVzcG9uc2UuZ2V0RXJyb3JEZXRhaWwoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc3RhcnRUcmFuc2FjdGlvbk1vbml0b3JpbmdUaHJlYWQoKVxuICAgIHtcbiAgICAgICAgdmFyIG5lZWRzUHVibGlzaGluZyA9IGZhbHNlO1xuICAgIFxuICAgICAgICB2YXIgdHhTdGF0ZSA9IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlO1xuICAgICAgICBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LlRyYW5zYWN0aW9uICYmICF0eFN0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB0eFN0YXRlO1xuICAgICAgICAgICAgaWYgKHN0YXRlLkF0dGVtcHRpbmdUb0NhbmNlbCAmJiBEYXRlLm5vdygpID4gc3RhdGUuQ2FuY2VsQXR0ZW1wdFRpbWUgKyB0aGlzLl9tYXhXYWl0Rm9yQ2FuY2VsVHgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtMlQgLSB0b28gbG9uZyBzaW5jZSBjYW5jZWwgYXR0ZW1wdCAtIENvbnNpZGVyIHVua25vd25cbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgQmVlbiB0b28gbG9uZyB3YWl0aW5nIGZvciB0cmFuc2FjdGlvbiB0byBjYW5jZWwuYCk7XG4gICAgICAgICAgICAgICAgdHhTdGF0ZS5Vbmtub3duQ29tcGxldGVkKGBXYWl0ZWQgbG9uZyBlbm91Z2ggZm9yIENhbmNlbCBUcmFuc2FjdGlvbiByZXN1bHQuIENoZWNrIEVGVFBPUy4gYCk7XG4gICAgICAgICAgICAgICAgbmVlZHNQdWJsaXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlLlJlcXVlc3RTZW50ICYmIERhdGUubm93KCkgPiBzdGF0ZS5MYXN0U3RhdGVSZXF1ZXN0VGltZSArIHRoaXMuX2NoZWNrT25UeEZyZXF1ZW5jeSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBUSC0xVCwgVEgtNFQgLSBJdCdzIGJlZW4gYSB3aGlsZSBzaW5jZSB3ZSByZWNlaXZlZCBhbiB1cGRhdGUsIGxldCdzIGNhbGwgYSBHTFRcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgQ2hlY2tpbmcgb24gb3VyIHRyYW5zYWN0aW9uLiBMYXN0IHdlIGFza2VkIHdhcyBhdCAke3N0YXRlLkxhc3RTdGF0ZVJlcXVlc3RUaW1lfS4uLmApO1xuICAgICAgICAgICAgICAgIHR4U3RhdGUuQ2FsbGluZ0dsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxHZXRMYXN0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG5lZWRzUHVibGlzaGluZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zdGFydFRyYW5zYWN0aW9uTW9uaXRvcmluZ1RocmVhZCgpLCB0aGlzLl90eE1vbml0b3JDaGVja0ZyZXF1ZW5jeSk7XG4gICAgfVxuXG4gICAgUHJpbnRpbmdSZXNwb25zZShtKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuIFBsZWFzZSBvdmVyd3JpdGUgdGhpcyBtZXRob2QgaW4geW91ciBQT1MnKTtcbiAgICB9XG5cbiAgICBUZXJtaW5hbFN0YXR1c1Jlc3BvbnNlKG0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4gUGxlYXNlIG92ZXJ3cml0ZSB0aGlzIG1ldGhvZCBpbiB5b3VyIFBPUycpO1xuICAgIH1cblxuICAgIEJhdHRlcnlMZXZlbENoYW5nZWQobSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLiBQbGVhc2Ugb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIHlvdXIgUE9TJyk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVByaW50aW5nUmVzcG9uc2UobSlcbiAgICB7XG4gICAgICAgIHRoaXMuUHJpbnRpbmdSZXNwb25zZShtKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlVGVybWluYWxTdGF0dXNSZXNwb25zZShtKVxuICAgIHtcbiAgICAgICAgdGhpcy5UZXJtaW5hbFN0YXR1c1Jlc3BvbnNlKG0pO1xuICAgIH1cblxuICAgIF9oYW5kbGVCYXR0ZXJ5TGV2ZWxDaGFuZ2VkKG0pXG4gICAge1xuICAgICAgICB0aGlzLkJhdHRlcnlMZXZlbENoYW5nZWQobSk7XG4gICAgfVxuXG4gICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIFxuICAgIC8vIHJlZ2lvbiBJbnRlcm5hbHMgZm9yIENvbm5lY3Rpb24gTWFuYWdlbWVudFxuXG4gICAgX3Jlc2V0Q29ubigpXG4gICAge1xuICAgICAgICAvLyBTZXR1cCB0aGUgQ29ubmVjdGlvblxuICAgICAgICB0aGlzLl9jb25uID0gbmV3IENvbm5lY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fY29ubi5BZGRyZXNzID0gdGhpcy5fZWZ0cG9zQWRkcmVzcztcblxuICAgICAgICAvLyBSZWdpc3RlciBvdXIgRXZlbnQgSGFuZGxlcnNcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQnLCAoZSkgPT4gdGhpcy5fb25TcGlDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZChlLmRldGFpbCkpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNZXNzYWdlUmVjZWl2ZWQnLCAoZSkgPT4gdGhpcy5fb25TcGlNZXNzYWdlUmVjZWl2ZWQoZS5kZXRhaWwpKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRXJyb3JSZWNlaXZlZCcsIChlKSA9PiB0aGlzLl9vbldzRXJyb3JSZWNlaXZlZChlLmRldGFpbCkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhdHVzIGNoYW5nZXMuXG4gICAgLy8gWW91IGFyZSBlbmNvdXJhZ2VkIHRvIGRpc3BsYXkgYSBQaW5QYWQgQ29ubmVjdGlvbiBJbmRpY2F0b3Igb24gdGhlIFBPUyBzY3JlZW4uXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwic3RhdGVcIj48L3BhcmFtPlxuICAgIF9vblNwaUNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkKHN0YXRlKVxuICAgIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZS5Db25uZWN0aW9uU3RhdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEknbSBDb25uZWN0aW5nIHRvIHRoZSBFZnRwb3MgYXQgJHt0aGlzLl9lZnRwb3NBZGRyZXNzfS4uLmApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmV0cmllc1NpbmNlTGFzdERldmljZUFkZHJlc3NSZXNvbHV0aW9uID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuUGFpcmluZyAmJiB0aGlzLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZS5NZXNzYWdlID0gXCJSZXF1ZXN0aW5nIHRvIFBhaXIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1BhaXJpbmdGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5DdXJyZW50UGFpcmluZ0Zsb3dTdGF0ZX0pKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByID0gUGFpcmluZ0hlbHBlci5OZXdQYWlyUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZW5kKHByLlRvTWVzc2FnZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEknbSBDb25uZWN0ZWQgdG8gJHt0aGlzLl9lZnRwb3NBZGRyZXNzfS4uLmApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGlNZXNzYWdlU3RhbXAuU2VjcmV0cyA9IHRoaXMuX3NlY3JldHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0UGVyaW9kaWNQaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ6XG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgcmVzZXQgc29tZSBsaWZlY3ljbGUgcmVsYXRlZCB0byBjb25uZWN0aW9uIHN0YXRlLCByZWFkeSBmb3IgbmV4dCBjb25uZWN0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYEknbSBkaXNjb25uZWN0ZWQgZnJvbSAke3RoaXMuX2VmdHBvc0FkZHJlc3N9Li4uYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBpbmdTZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9taXNzZWRQb25nc0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wUGVyaW9kaWNQaW5nKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzICE9IFNwaVN0YXR1cy5VbnBhaXJlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFN0YXR1cyA9IFNwaVN0YXR1cy5QYWlyZWRDb25uZWN0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuVHJhbnNhY3Rpb24gJiYgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgdHJhbnNhY3Rpb24sIGp1c3Qgc28geW91IGtub3chXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUSC0xRFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYExvc3QgY29ubmVjdGlvbiBpbiB0aGUgbWlkZGxlIG9mIGEgdHJhbnNhY3Rpb24uLi5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm4gPT0gbnVsbCkgcmV0dXJuOyAvLyBUaGlzIG1lYW5zIHRoZSBpbnN0YW5jZSBoYXMgYmVlbiBkaXNwb3NlZC4gQWJvcnRpbmcuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXV0b0FkZHJlc3NSZXNvbHV0aW9uRW5hYmxlZClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiA+PSB0aGlzLl9yZXRyaWVzQmVmb3JlUmVzb2x2aW5nRGV2aWNlQWRkcmVzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXRyaWVzU2luY2VMYXN0RGV2aWNlQWRkcmVzc1Jlc29sdXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JldHJpZXNTaW5jZUxhc3REZXZpY2VBZGRyZXNzUmVzb2x1dGlvbiArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oYFdpbGwgdHJ5IHRvIHJlY29ubmVjdCBpbiAke3RoaXMuX3NsZWVwQmVmb3JlUmVjb25uZWN0TXN9bXMuLi5gKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzICE9IFNwaVN0YXR1cy5VbnBhaXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIG5vbi1ibG9ja2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nvbm4pIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubi5Db25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9zbGVlcEJlZm9yZVJlY29ubmVjdE1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5DdXJyZW50RmxvdyA9PSBTcGlGbG93LlBhaXJpbmcpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkxvc3QgQ29ubmVjdGlvbiBkdXJpbmcgcGFpcmluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFBhaXJpbmdGbG93U3RhdGUuTWVzc2FnZSA9IFwiQ291bGQgbm90IENvbm5lY3QgdG8gUGFpci4gQ2hlY2sgTmV0d29yayBhbmQgVHJ5IEFnYWluLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUGFpcmluZ0ZhaWxlZCgpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnUGFpcmluZ0Zsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRQYWlyaW5nRmxvd1N0YXRlfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biBzdGF0ZTogJyArIHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFRoaXMgaXMgYW4gaW1wb3J0YW50IHBpZWNlIG9mIHRoZSBwdXp6bGUuIEl0J3MgYSBiYWNrZ3JvdW5kIHRocmVhZCB0aGF0IHBlcmlvZGljYWxseVxuICAgIC8vIHNlbmRzIFBpbmdzIHRvIHRoZSBzZXJ2ZXIuIElmIGl0IGRvZXNuJ3QgcmVjZWl2ZSBQb25ncywgaXQgY29uc2lkZXJzIHRoZSBjb25uZWN0aW9uIGFzIGJyb2tlblxuICAgIC8vIHNvIGl0IGRpc2Nvbm5lY3RzLiBcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgX3N0YXJ0UGVyaW9kaWNQaW5nKCkge1xuICAgICAgICB0aGlzLl9zdG9wUGVyaW9kaWNQaW5nKCk7XG4gICAgICAgIHRoaXMuX3BlcmlvZGljUGluZ1RocmVhZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuX3BlcmlvZGljUGluZygpLHRoaXMuX3BpbmdGcmVxdWVuY3kpO1xuICAgICAgICB0aGlzLl9wZXJpb2RpY1BpbmcoKTtcbiAgICB9XG5cbiAgICBfcGVyaW9kaWNQaW5nKCkge1xuICAgICAgICAvLyB3aGlsZSBpJ20gc3RpbGwgY29ubmVjdGVkIEFORCBwYWlyZWQuLi5cbiAgICAgICAgaWYodGhpcy5fY29ubi5Db25uZWN0ZWQgJiYgdGhpcy5fc2VjcmV0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kb1BpbmcoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vc3RSZWNlbnRQaW5nU2VudCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkID09IG51bGwgfHwgdGhpcy5fbW9zdFJlY2VudFBvbmdSZWNlaXZlZC5JZCAhPSB0aGlzLl9tb3N0UmVjZW50UGluZ1NlbnQuSWQpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWlzc2VkUG9uZ3NDb3VudCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBFZnRwb3MgZGlkbid0IHJlcGx5IHRvIG15IFBpbmcuIE1pc3NlZCBDb3VudDogJHt0aGlzLl9taXNzZWRQb25nc0NvdW50fS8ke3RoaXMuX21pc3NlZFBvbmdzVG9EaXNjb25uZWN0fS5gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWlzc2VkUG9uZ3NDb3VudCA8IHRoaXMuX21pc3NlZFBvbmdzVG9EaXNjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIlRyeWluZyBhbm90aGVyIHBpbmcuLi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFBlcmlvZGljUGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHdlIGhhdmUgbm90IHJlY2VpdmVkIGEgcG9uZyBmb3Igb3VyIG1vc3QgcmVjZW50IHBpbmcuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNvbnNpZGVyIHRoaXMgY29ubmVjdGlvbiBhcyBicm9rZW4uXG4gICAgICAgICAgICAgICAgICAgIC8vIExldCdzIERpc2Nvbm5lY3QuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiRGlzY29ubmVjdGluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubi5EaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9taXNzZWRQb25nc0NvdW50ID0gMDtcblxuICAgICAgICAgICAgfSx0aGlzLl9wb25nVGltZW91dCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BQZXJpb2RpY1BpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQ2FuY2VsbGluZyBwZXJpb2RpYyBwaW5nIGFzIHdlcmUgZGlzY29ubmVjdGVkIG9yIG5vdCBwYWlyZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBXZSBjYWxsIHRoaXMgb3Vyc2VsdmVzIGFzIHNvb24gYXMgd2UncmUgcmVhZHkgdG8gdHJhbnNhY3Qgd2l0aCB0aGUgUGluUGFkIGFmdGVyIGEgY29ubmVjdGlvbiBpcyBlc3RhYmxpc2hlZC5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGVmZmVjdGl2ZWx5IGNhbGxlZCBhZnRlciB3ZSByZWNlaXZlZCB0aGUgZmlyc3QgTG9naW4gUmVzcG9uc2UgZnJvbSB0aGUgUGluUGFkLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBfb25SZWFkeVRvVHJhbnNhY3QoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJPbiBSZWFkeSBUbyBUcmFuc2FjdCFcIik7XG5cbiAgICAgICAgLy8gU28sIHdlIGhhdmUganVzdCBtYWRlIGEgY29ubmVjdGlvbiwgcGluZ2VkIGFuZCBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5LlxuICAgICAgICB0aGlzLkN1cnJlbnRTdGF0dXMgPSBTcGlTdGF0dXMuUGFpcmVkQ29ubmVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRGbG93ID09IFNwaUZsb3cuVHJhbnNhY3Rpb24gJiYgIXRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkZpbmlzaGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUmVxdWVzdFNlbnQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtM0EgLSBXZSd2ZSBqdXN0IHJlY29ubmVjdGVkIGFuZCB3ZXJlIGluIHRoZSBtaWRkbGUgb2YgVHguXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgZ2V0IHRoZSBsYXN0IHRyYW5zYWN0aW9uIHRvIGNoZWNrIHdoYXQgd2UgbWlnaHQgaGF2ZSBtaXNzZWQgb3V0IG9uLlxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFR4Rmxvd1N0YXRlLkNhbGxpbmdHbHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsR2V0TGFzdFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVEgtM0FSIC0gV2UgaGFkIG5vdCBldmVuIHNlbnQgdGhlIHJlcXVlc3QgeWV0LiBMZXQncyBkbyB0aGF0IG5vd1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQodGhpcy5DdXJyZW50VHhGbG93U3RhdGUuUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VHhGbG93U3RhdGUuU2VudChgU2VuZGluZyBSZXF1ZXN0IE5vdy4uLmApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzU2V0SW5mbykgeyBcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsU2V0UG9zSW5mbygpOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbGV0J3MgYWxzbyB0ZWxsIHRoZSBlZnRwb3Mgb3VyIGxhdGVzdCB0YWJsZSBjb25maWd1cmF0aW9uLlxuICAgICAgICAgICAgaWYodGhpcy5fc3BpUGF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0LlB1c2hQYXlBdFRhYmxlQ29uZmlnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbFNldFBvc0luZm8oKVxuICAgIHtcbiAgICAgICAgdmFyIHNldFBvc0luZm9SZXF1ZXN0ID0gbmV3IFNldFBvc0luZm9SZXF1ZXN0KHRoaXMuX3Bvc1ZlcnNpb24sIHRoaXMuX3Bvc1ZlbmRvcklkLCBcImpzXCIsIHRoaXMuR2V0VmVyc2lvbigpLCBEZXZpY2VJbmZvLkdldEFwcERldmljZUluZm8oKSk7XG4gICAgICAgIHRoaXMuX3NlbmQoc2V0UG9zSW5mb1JlcXVlc3QudG9NZXNzYWdlKCkpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIFdoZW4gd2UgZGlzY29ubmVjdCwgd2Ugc2hvdWxkIGFsc28gc3RvcCB0aGUgcGVyaW9kaWMgcGluZy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgX3N0b3BQZXJpb2RpY1BpbmcoKSB7XG4gICAgICAgIGlmKHRoaXMuX3BlcmlvZGljUGluZ1RocmVhZCkge1xuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSBhbHJlYWR5IHNldCB1cCwgY2xlYW4gdXAgYmVmb3JlIHJlc3RhcnRpbmcuXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3BlcmlvZGljUGluZ1RocmVhZCk7XG4gICAgICAgICAgICB0aGlzLl9wZXJpb2RpY1BpbmdUaHJlYWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhIFBpbmcgdG8gdGhlIFNlcnZlclxuICAgIF9kb1BpbmcoKVxuICAgIHtcbiAgICAgICAgdmFyIHBpbmcgPSBQaW5nSGVscGVyLkdlbmVyYXRlUGluZ1JlcXVlc3QoKTtcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBpbmdTZW50ID0gcGluZztcbiAgICAgICAgdGhpcy5fc2VuZChwaW5nKTtcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBpbmdTZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gUmVjZWl2ZWQgYSBQb25nIGZyb20gdGhlIHNlcnZlclxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICAvLyA8cGFyYW0gbmFtZT1cIm1cIj48L3BhcmFtPlxuICAgIF9oYW5kbGVJbmNvbWluZ1BvbmcobSlcbiAgICB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFpbnRhaW4gdGhpcyB0aW1lIGRlbHRhIG90aGVyd2lzZSB0aGUgc2VydmVyIHdpbGwgbm90IGFjY2VwdCBvdXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuX3NwaU1lc3NhZ2VTdGFtcC5TZXJ2ZXJUaW1lRGVsdGEgPSBtLkdldFNlcnZlclRpbWVEZWx0YSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tb3N0UmVjZW50UG9uZ1JlY2VpdmVkID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEZpcnN0IHBvbmcgcmVjZWl2ZWQgYWZ0ZXIgYSBjb25uZWN0aW9uLCBhbmQgYWZ0ZXIgdGhlIHBhaXJpbmcgcHJvY2VzcyBpcyBmdWxseSBmaW5hbGlzZWQuXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50U3RhdHVzICE9IFNwaVN0YXR1cy5VbnBhaXJlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhcIkZpcnN0IHBvbmcgb2YgY29ubmVjdGlvbiBhbmQgaW4gcGFpcmVkIHN0YXRlLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblJlYWR5VG9UcmFuc2FjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiRmlyc3QgcG9uZyBvZiBjb25uZWN0aW9uIGJ1dCBwYWlyaW5nIHByb2Nlc3Mgbm90IGZpbmFsaXNlZCB5ZXQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFBvbmdSZWNlaXZlZCA9IG07XG4gICAgICAgIHRoaXMuX2xvZy5kZWJ1ZyhgUG9uZ0xhdGVuY3k6JHtEYXRlLm5vdygpIC0gdGhpcy5fbW9zdFJlY2VudFBpbmdTZW50VGltZX1gKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGUgc2VydmVyIHdpbGwgYWxzbyBzZW5kIHVzIHBpbmdzLiBXZSBuZWVkIHRvIHJlcGx5IHdpdGggYSBwb25nIHNvIGl0IGRvZXNuJ3QgZGlzY29ubmVjdCB1cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgLy8gPHBhcmFtIG5hbWU9XCJtXCI+PC9wYXJhbT5cbiAgICBfaGFuZGxlSW5jb21pbmdQaW5nKG0pXG4gICAge1xuICAgICAgICB2YXIgcG9uZyA9IFBvbmdIZWxwZXIuR2VuZXJhdGVQb25nUmVzc3BvbnNlKG0pO1xuICAgICAgICB0aGlzLl9zZW5kKHBvbmcpO1xuICAgIH1cblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEFzayB0aGUgUGluUGFkIHRvIHRlbGwgdXMgd2hhdCB0aGUgTW9zdCBSZWNlbnQgVHJhbnNhY3Rpb24gd2FzXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIF9jYWxsR2V0TGFzdFRyYW5zYWN0aW9uKClcbiAgICB7XG4gICAgICAgIHZhciBnbHRSZXF1ZXN0ID0gbmV3IEdldExhc3RUcmFuc2FjdGlvblJlcXVlc3QoKTtcbiAgICAgICAgdGhpcy5fc2VuZChnbHRSZXF1ZXN0LlRvTWVzc2FnZSgpKTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciB3ZSByZWNlaXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBDb25uZWN0aW9uXG4gICAgLy8gPC9zdW1tYXJ5PlxuICAgIC8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZUpzb25cIj48L3BhcmFtPlxuICAgIF9vblNwaU1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlSnNvbilcbiAgICB7XG4gICAgICAgIC8vIEZpcnN0IHdlIHBhcnNlIHRoZSBpbmNvbWluZyBtZXNzYWdlXG4gICAgICAgIHZhciBtID0gTWVzc2FnZS5Gcm9tSnNvbihtZXNzYWdlSnNvbi5NZXNzYWdlLCB0aGlzLl9zZWNyZXRzKTtcbiAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJSZWNlaXZlZDpcIiArIG0uRGVjcnlwdGVkSnNvbik7XG5cbiAgICAgICAgaWYgKFNwaVByZWF1dGguSXNQcmVhdXRoRXZlbnQobS5FdmVudE5hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zcGlQcmVhdXRoLl9oYW5kbGVQcmVhdXRoTWVzc2FnZShtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuZCB0aGVuIHdlIHN3aXRjaCBvbiB0aGUgZXZlbnQgdHlwZS5cbiAgICAgICAgc3dpdGNoIChtLkV2ZW50TmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuS2V5UmVxdWVzdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVLZXlSZXF1ZXN0KG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuS2V5Q2hlY2s6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlS2V5Q2hlY2sobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5QYWlyUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUGFpclJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuRHJvcEtleXNBZHZpY2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRHJvcEtleXNBZHZpY2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5QdXJjaGFzZVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVB1cmNoYXNlUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5SZWZ1bmRSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVSZWZ1bmRSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkNhc2hvdXRPbmx5UmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQ2FzaG91dE9ubHlSZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLk1vdG9QdXJjaGFzZVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdG9QdXJjaGFzZVJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuU2lnbmF0dXJlUmVxdWlyZWQ6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlU2lnbmF0dXJlUmVxdWlyZWQobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5BdXRoQ29kZVJlcXVpcmVkOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUF1dGhDb2RlUmVxdWlyZWQobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5HZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVHZXRMYXN0VHJhbnNhY3Rpb25SZXNwb25zZShtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlNldHRsZVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuSGFuZGxlU2V0dGxlUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5TZXR0bGVtZW50RW5xdWlyeVJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVNldHRsZW1lbnRFbnF1aXJ5UmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5QaW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUluY29taW5nUGluZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBvbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlSW5jb21pbmdQb25nKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuS2V5Um9sbFJlcXVlc3Q6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlS2V5Um9sbGluZ1JlcXVlc3QobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5DYW5jZWxUcmFuc2FjdGlvblJlc3BvbnNlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNhbmNlbFRyYW5zYWN0aW9uUmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50cy5TZXRQb3NJbmZvUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlU2V0UG9zSW5mb1Jlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUGF5QXRUYWJsZUdldFRhYmxlQ29uZmlnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGlQYXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmQoUGF5QXRUYWJsZUNvbmZpZy5GZWF0dXJlRGlzYWJsZU1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwicGF0Y29uZlwiKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpUGF0Ll9oYW5kbGVHZXRUYWJsZUNvbmZpZyhtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVHZXRCaWxsRGV0YWlsczpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUdldEJpbGxEZXRhaWxzUmVxdWVzdChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLlBheUF0VGFibGVCaWxsUGF5bWVudDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlQYXQuX2hhbmRsZUJpbGxQYXltZW50QWR2aWNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuUHJpbnRpbmdSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVQcmludGluZ1Jlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuVGVybWluYWxTdGF0dXNSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVUZXJtaW5hbFN0YXR1c1Jlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuQmF0dGVyeUxldmVsQ2hhbmdlZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVCYXR0ZXJ5TGV2ZWxDaGFuZ2VkKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFdmVudHMuRXJyb3I6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3JFdmVudChtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnRzLkludmFsaWRIbWFjU2lnbmF0dXJlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiSSBjb3VsZCBub3QgdmVyaWZ5IG1lc3NhZ2UgZnJvbSBFZnRwb3MuIFlvdSBtaWdodCBoYXZlIHRvIFVuLXBhaXIgRWZ0cG9zIGFuZCB0aGVuIHJlY29ubmVjdC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKGBJIGRvbid0IFVuZGVyc3RhbmQgRXZlbnQ6ICR7bS5FdmVudE5hbWV9LCAke20uRGF0YX0uIFBlcmhhcHMgSSBoYXZlIG5vdCBpbXBsZW1lbnRlZCBpdCB5ZXQuYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25Xc0Vycm9yUmVjZWl2ZWQoZXJyb3IpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2cud2FybihcIlJlY2VpdmVkIFdTIEVycm9yOiBcIiArIGVycm9yLk1lc3NhZ2UpO1xuICAgIH1cblxuICAgIF9zZW5kKG1lc3NhZ2UpXG4gICAge1xuICAgICAgICB2YXIganNvbiA9IG1lc3NhZ2UuVG9Kc29uKHRoaXMuX3NwaU1lc3NhZ2VTdGFtcCk7XG4gICAgICAgIGlmICh0aGlzLl9jb25uLkNvbm5lY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmluZm8oXCJTZW5kaW5nOiBcIiArIG1lc3NhZ2UuRGVjcnlwdGVkSnNvbik7XG4gICAgICAgICAgICB0aGlzLl9jb25uLlNlbmQoanNvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiQXNrZWQgdG8gc2VuZCwgYnV0IG5vdCBjb25uZWN0ZWQ6IFwiICsgbWVzc2FnZS5EZWNyeXB0ZWRKc29uKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEhhc1NlcmlhbE51bWJlckNoYW5nZWQodXBkYXRlZFNlcmlhbE51bWJlcilcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxOdW1iZXIgIT0gdXBkYXRlZFNlcmlhbE51bWJlcjtcbiAgICB9XG5cbiAgICBIYXNFZnRwb3NBZGRyZXNzQ2hhbmdlZCh1cGRhdGVkRWZ0cG9zQWRkcmVzcylcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZnRwb3NBZGRyZXNzICE9IHVwZGF0ZWRFZnRwb3NBZGRyZXNzO1xuICAgIH1cblxuICAgIF9hdXRvUmVzb2x2ZUVmdHBvc0FkZHJlc3MoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvQWRkcmVzc1Jlc29sdXRpb25FbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIFxuICAgICAgICBpZiAoIXRoaXMuX3NlcmlhbE51bWJlcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2VydmljZSA9IG5ldyBEZXZpY2VBZGRyZXNzU2VydmljZSgpO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlLlJldHJpZXZlU2VydmljZSh0aGlzLl9zZXJpYWxOdW1iZXIsIHRoaXMuX2RldmljZUFwaUtleSwgdGhpcy5fYWNxdWlyZXJDb2RlLCB0aGlzLl9pblRlc3RNb2RlKS50aGVuKChyZXNwb25zZSkgPT4gXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkZXZpY2VBZGRyZXNzU3RhdHVzID0gT2JqZWN0LmFzc2lnbihuZXcgRGV2aWNlQWRkcmVzc1N0YXR1cygpLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGlmKCFkZXZpY2VBZGRyZXNzU3RhdHVzIHx8ICFkZXZpY2VBZGRyZXNzU3RhdHVzLkFkZHJlc3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuSGFzRWZ0cG9zQWRkcmVzc0NoYW5nZWQoZGV2aWNlQWRkcmVzc1N0YXR1cy5BZGRyZXNzKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBkZXZpY2UgYW5kIGNvbm5lY3Rpb24gYWRkcmVzc1xuICAgICAgICAgICAgdGhpcy5fZWZ0cG9zQWRkcmVzcyA9IGAke1NQSV9VUklfU0NIRU1FfTovLyR7ZGV2aWNlQWRkcmVzc1N0YXR1cy5BZGRyZXNzfWA7XG4gICAgICAgICAgICB0aGlzLl9jb25uLkFkZHJlc3MgPSB0aGlzLl9lZnRwb3NBZGRyZXNzO1xuXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXMgPSBkZXZpY2VBZGRyZXNzU3RhdHVzO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnRGV2aWNlQWRkcmVzc0NoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXN9KSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkN1cnJlbnREZXZpY2VTdGF0dXM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IHtTcGl9OyIsImltcG9ydCB7U3VjY2Vzc1N0YXRlfSBmcm9tICcuL01lc3NhZ2VzJztcblxuLy8gPHN1bW1hcnk+XG4vLyBSZXByZXNlbnRzIHRoZSAzIFBhaXJpbmcgc3RhdHVzZXMgdGhhdCB0aGUgU3BpIGluc3RhbnhjZSBjYW4gYmUgaW4uXG4vLyA8L3N1bW1hcnk+XG5leHBvcnQgY29uc3QgU3BpU3RhdHVzID0gXG57XG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gUGFpcmVkIGFuZCBDb25uZWN0ZWRcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmVkQ29ubmVjdGVkOiAnUGFpcmVkQ29ubmVjdGVkJyxcbiAgICBcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBQYWlyZWQgYnV0IHRyeWluZyB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIFxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBQYWlyZWRDb25uZWN0aW5nOiAnUGFpcmVkQ29ubmVjdGluZycsXG4gICAgXG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVW5wYWlyZWRcbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgVW5wYWlyZWQ6ICdVbnBhaXJlZCdcbn07XG5cbi8vIDxzdW1tYXJ5PlxuLy8gVGhlIFNwaSBpbnN0YW5jZSBjYW4gYmUgaW4gb25lIG9mIHRoZXNlIGZsb3dzIGF0IGFueSBwb2ludCBpbiB0aW1lLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNvbnN0IFNwaUZsb3cgPSBcbntcbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBDdXJyZW50bHkgZ29pbmcgdGhyb3VnaCB0aGUgUGFpcmluZyBQcm9jZXNzIEZsb3cuXG4gICAgLy8gSGFwcGVucyBkdXJpbmcgdGhlIFVucGFpcmVkIFNwaVN0YXR1cy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgUGFpcmluZzogJ1BhaXJpbmcnLFxuICAgIFxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIEN1cnJlbnRseSBnb2luZyB0aHJvdWdoIHRoZSB0cmFuc2FjdGlvbiBQcm9jZXNzIEZsb3cuXG4gICAgLy8gQ2Fubm90IGhhcHBlbiBpbiB0aGUgVW5wYWlyZWQgU3BpU3RhdHVzLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBUcmFuc2FjdGlvbjogJ1RyYW5zYWN0aW9uJyxcblxuICAgIC8vIDxzdW1tYXJ5PlxuICAgIC8vIE5vdCBpbiBhbnkgb2YgdGhlIG90aGVyIHN0YXRlcy5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgSWRsZTogJ0lkbGUnXG59O1xuXG4vLyA8c3VtbWFyeT5cbi8vIFJlcHJlc2VudHMgdGhlIFBhaXJpbmcgRmxvdyBTdGF0ZSBkdXJpbmcgdGhlIHBhaXJpbmcgcHJvY2VzcyBcbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBQYWlyaW5nRmxvd1N0YXRlXG57XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFNvbWUgdGV4dCB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgaW4gdGhlIFBhaXJpbmcgUHJvY2VzcyBTY3JlZW5cbiAgICAgICAgLy8gdGhhdCBpbmRpY2F0ZXMgd2hhdCB0aGUgcGFpcmluZyBwcm9jZXNzIGlzIHVwIHRvLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuTWVzc2FnZSA9IG51bGw7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdHJ1ZSwgaXQgbWVhbnMgdGhhdCB0aGUgRUZUUE9TIGlzIHNob2luZyB0aGUgY29uZmlybWF0aW9uIGNvZGUsXG4gICAgICAgIC8vIGFuZCB5b3VyIHVzZXIgbmVlZHMgdG8gcHJlc3MgWUVTIG9yIE5PIG9uIHRoZSBFRlRQT1MuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ0NoZWNrRnJvbUVmdHBvcyA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2hlbiB0cnVlLCB5b3UgbmVlZCB0byBkaXNwbGF5IHRoZSBZRVMvTk8gYnV0dG9ucyBvbiB5b3UgcGFpcmluZyBzY3JlZW5cbiAgICAgICAgLy8gZm9yIHlvdXIgdXNlciB0byBjb25maXJtIHRoZSBjb2RlLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXdhaXRpbmdDaGVja0Zyb21Qb3MgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGNvbmZpcm1hdGlvbiBjb2RlIGZvciB0aGUgcGFpcmluZyBwcm9jZXNzLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQ29uZmlybWF0aW9uQ29kZSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIFBhaXJpbmcgRmxvdyBoYXMgZmluaXNoZWQgaXRzIGpvYi5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkZpbmlzaGVkID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciBwYWlyaW5nIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlN1Y2Nlc3NmdWwgPSBudWxsO1xuXG4gICAgICAgIGlmKHN0YXRlKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH0gICBcbn1cblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uVHlwZSA9IFxue1xuICAgIFB1cmNoYXNlOiAnUHVyY2hhc2UnLFxuICAgIFJlZnVuZDogJ1JlZnVuZCcsXG4gICAgQ2FzaG91dE9ubHk6ICdDYXNob3V0T25seScsXG4gICAgTU9UTzogJ01PVE8nLFxuICAgIFNldHRsZTogJ1NldHRsZScsXG4gICAgU2V0dGxlbWVudEVucXVpcnk6ICdTZXR0bGVtZW50RW5xdWlyeScsXG4gICAgR2V0TGFzdFRyYW5zYWN0aW9uOiAnR2V0TGFzdFRyYW5zYWN0aW9uJyxcbiAgICBcbiAgICBQcmVhdXRoOiAnUHJlYXV0aCcsXG4gICAgQWNjb3VudFZlcmlmeTogJ0FjY291bnRWZXJpZnknXG59O1xuXG4vLyA8c3VtbWFyeT5cbi8vIFVzZWQgYXMgYSByZXR1cm4gaW4gdGhlIEluaXRpYXRlVHggbWV0aG9kcyB0byBzaWduaWZ5IHdoZXRoZXIgXG4vLyB0aGUgdHJhbnNhY3Rpb24gd2FzIGluaXRpYXRlZCBvciBub3QsIGFuZCBhIHJlYXNvbiB0byBnbyB3aXRoIGl0LlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIEluaXRpYXRlVHhSZXN1bHRcbntcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWF0ZWQsIG1lc3NhZ2UpXG4gICAge1xuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2hldGhlciB0aGUgdHggd2FzIGluaXRpYXRlZC5cbiAgICAgICAgLy8gV2hlbiB0cnVlLCB5b3UgY2FuIGV4cGVjdCB1cGRhdGVkIHRvIHlvdXIgcmVnaXN0ZXJlZCBjYWxsYmFjay5cbiAgICAgICAgLy8gV2hlbiBmYWxzZSwgeW91IGNhbiByZXRyeSBjYWxsaW5nIHRoZSBJbml0aWF0ZVggbWV0aG9kLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuSW5pdGlhdGVkID0gaW5pdGlhdGVkO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUZXh0IHRoYXQgZ2l2ZXMgcmVhc29uIGZvciB0aGUgSW5pdGlhdGVkIGZsYWcsIGVzcGVjaWFsbHkgaW4gY2FzZSBvZiBmYWxzZS4gXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG59XG5cbi8vIDxzdW1tYXJ5PlxuLy8gVXNlZCBhcyBhIHJldHVybiBpbiBjYWxscyBtaWQgdHJhbnNhY3Rpb24gdG8gbGV0IHlvdSBrbm93XG4vLyB3aGV0aGVyIHRoZSBjYWxsIHdhcyB2YWxpZCBvciBub3QuXG4vLyBUaGVzZSBhdHRyaWJ1dGVzIHdvcmsgZm9yIENPTSBpbnRlcm9wLlxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIE1pZFR4UmVzdWx0XG57XG4gICAgLy8gPHN1bW1hcnk+XG4gICAgLy8gVGhpcyBkZWZhdWx0IHN0dWN0dXJlIHdvcmtzIGZvciBDT00gaW50ZXJvcC5cbiAgICAvLyA8L3N1bW1hcnk+XG4gICAgY29uc3RydWN0b3IodmFsaWQsIG1lc3NhZ2UpXG4gICAge1xuICAgICAgICB0aGlzLlZhbGlkID0gdmFsaWQ7XG4gICAgICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufSAgICBcblxuLy8gPHN1bW1hcnk+XG4vLyBSZXByZXNlbnRzIHRoZSBTdGF0ZSBkdXJpbmcgYSBUcmFuc2FjdGlvbkZsb3dcbi8vIDwvc3VtbWFyeT5cbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbkZsb3dTdGF0ZVxue1xuICAgIGNvbnN0cnVjdG9yKHBvc1JlZklkLCB0eXBlLCBhbW91bnRDZW50cywgbWVzc2FnZSwgbXNnKVxuICAgIHtcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vICBUaGUgaWQgZ2l2ZW4gdG8gdGhpcyB0cmFuc2FjdGlvblxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUG9zUmVmSWQgICA9IHBvc1JlZklkO1xuICAgICAgICB0aGlzLklkICAgICAgICAgPSBwb3NSZWZJZDsgLy8gb2Jzb2xldGUsIGJ1dCBsZXQncyBtYWludGFpbiBpdCBmb3Igbm93LCB0byBtZWFuIHNhbWUgYXMgUG9zUmVmSWQuXG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFB1cmNoYXNlL1JlZnVuZC9TZXR0bGUvLi4uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gQSB0ZXh0IG1lc3NhZ2UgdG8gZGlzcGxheSBvbiB5b3VyIFRyYW5zYWN0aW9uIEZsb3cgU2NyZWVuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gQW1vdW50IGluIGNlbnRzIGZvciB0aGlzIHRyYW5zYWN0aW9uXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5BbW91bnRDZW50cyA9IGFtb3VudENlbnRzO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBXaHRoZXIgdGhlIHJlcXVlc3QgaGFzIGJlZW4gc2VudCB0byB0aGUgRUZUUE9TIHlldCBvciBub3QuXG4gICAgICAgIC8vIEluIHRoZSBQYWlyZWRDb25uZWN0aW5nIHN0YXRlLCB0aGUgdHJhbnNhY3Rpb24gaXMgaW5pdGlhdGVkXG4gICAgICAgIC8vIGJ1dCB0aGUgcmVxdWVzdCBpcyBvbmx5IHNlbnQgb25jZSB0aGUgY29ubmVjdGlvbiBpcyByZWNvdmVyZWQuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5SZXF1ZXN0U2VudCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgdGltZSB3aGVuIHRoZSByZXF1ZXN0IHdhcyBzZW50IHRvIHRoZSBFRlRQT1MuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5SZXF1ZXN0VGltZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgdGltZSB3aGVuIHdlIGxhc3QgYXNrZWQgZm9yIGFuIHVwZGF0ZSwgaW5jbHVkaW5nIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGF0IGZpcnN0XG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5MYXN0U3RhdGVSZXF1ZXN0VGltZSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2hldGhlciB3ZSdyZSBjdXJyZW50bHkgYXR0ZW1wdGluZyB0byBDYW5jZWwgdGhlIHRyYW5zYWN0aW9uLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gbnVsbDtcbiAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZW4gdGhpcyBmbGFnIGlzIG9uLCB5b3UgbmVlZCB0byBkaXNwbGF5IHRoZSBkaWduYXR1cmUgYWNjZXB0L2RlY2xpbmUgYnV0dG9ucyBpbiB5b3VyIFxuICAgICAgICAvLyB0cmFuc2FjdGlvbiBmbG93IHNjcmVlbi5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2sgPSBmYWxzZTtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGZsYWcgaXMgb24sIHlvdSBuZWVkIHRvIHNob3cgeW91ciB1c2VyIHRoZSBwaG9uZSBudW1iZXIgdG8gY2FsbCB0byBnZXQgdGhlIGF1dGhvcmlzYXRpb24gY29kZS5cbiAgICAgICAgLy8gVGhlbiB5b3UgbmVlZCB0byBwcm92aWRlIHlvdXIgdXNlciBtZWFucyB0byBlbnRlciB0aGF0IGdpdmVuIGNvZGUgYW5kIHN1Ym1pdCBpdCB2aWEgU3VibWl0QXV0aENvZGUoKS5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLkF3YWl0aW5nUGhvbmVGb3JBdXRoID0gbnVsbDtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gV2hldGhlciB0aGlzIHRyYW5zYWN0aW9uIGZsb3cgaXMgb3ZlciBvciBub3QuXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgc3VjY2VzcyBzdGF0ZSBvZiB0aGlzIHRyYW5zYWN0aW9uLiBTdGFydHMgb2ZmIGFzIFVua25vd24uXG4gICAgICAgIC8vIFdoZW4gZmluaXNoZWQsIGNhbiBiZSBTdWNjZXNzLCBGYWlsZWQgT1IgVW5rbm93bi5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBTdWNjZXNzU3RhdGUuVW5rbm93bjtcblxuICAgICAgICAvLyA8c3VtbWFyeT5cbiAgICAgICAgLy8gVGhlIHJlc3BvbnNlIGF0IHRoZSBlbmQgb2YgdGhlIHRyYW5zYWN0aW9uLiBcbiAgICAgICAgLy8gTWlnaHQgbm90IGJlIHByZXNlbnQgaW4gYWxsIGVkZ2UgY2FzZXMuXG4gICAgICAgIC8vIFlvdSBjYW4gdGhlbiB0dXJuIHRoaXMgTWVzc2FnZSBpbnRvIHRoZSBhcHByb3ByaWF0ZSBzdHJ1Y3R1cmUsXG4gICAgICAgIC8vIHN1Y2ggYXMgUHVyY2hhc2VSZXNwb25zZSwgUmVmdW5kUmVzcG9uc2UsIGV0Y1xuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVzcG9uc2UgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgbWVzc2FnZSB0aGUgd2UgcmVjZWl2ZWQgZnJvbSBFRlRQT1MgdGhhdCB0b2xkIHVzIHRoYXQgc2lnbmF0dXJlIGlzIHJlcXVpcmVkLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuU2lnbmF0dXJlUmVxdWlyZWRNZXNzYWdlID0gbnVsbDtcbiAgICBcbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSBtZXNzYWdlIHRoZSB3ZSByZWNlaXZlZCBmcm9tIEVGVFBPUyB0aGF0IHRvbGQgdXMgdGhhdCBQaG9uZSBGb3IgQXV0aCBpcyByZXF1aXJlZC5cbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLlBob25lRm9yQXV0aFJlcXVpcmVkTWVzc2FnZSA9IG51bGw7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRoZSB0aW1lIHdoZW4gdGhlIGNhbmNlbCBhdHRlbXB0IHdhcyBtYWRlLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuQ2FuY2VsQXR0ZW1wdFRpbWUgPSBudWxsO1xuXG4gICAgICAgIC8vIDxzdW1tYXJ5PlxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBtZXNzYWdlIHRoYXQgd2UgYXJlIHNlbmRpbmcvc2VudCB0byB0aGUgc2VydmVyLlxuICAgICAgICAvLyA8L3N1bW1hcnk+XG4gICAgICAgIHRoaXMuUmVxdWVzdCA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFdoZXRoZXIgd2UncmUgY3VycmVudGx5IHdhaXRpbmcgZm9yIGEgR2V0IExhc3QgVHJhbnNhY3Rpb24gUmVzcG9uc2UgdG8gZ2V0IGFuIHVwZGF0ZS4gXG4gICAgICAgIC8vIDwvc3VtbWFyeT5cbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gbnVsbDtcblxuICAgICAgICB0aGlzLkdMVFJlc3BvbnNlUG9zUmVmSWQgPSBudWxsO1xuICAgIH1cblxuICAgIFNlbnQobXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0U2VudCA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVxdWVzdFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLkxhc3RTdGF0ZVJlcXVlc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBDYW5jZWxsaW5nKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5DYW5jZWxBdHRlbXB0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgQ2FuY2VsRmFpbGVkKG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgQ2FsbGluZ0dsdCgpXG4gICAge1xuICAgICAgICB0aGlzLkF3YWl0aW5nR2x0UmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICB0aGlzLkxhc3RTdGF0ZVJlcXVlc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBHb3RHbHRSZXNwb25zZSgpXG4gICAge1xuICAgICAgICB0aGlzLkF3YWl0aW5nR2x0UmVzcG9uc2UgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgRmFpbGVkKHJlc3BvbnNlLCBtc2cpXG4gICAge1xuICAgICAgICB0aGlzLlN1Y2Nlc3MgPSBTdWNjZXNzU3RhdGUuRmFpbGVkO1xuICAgICAgICB0aGlzLkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5SZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIFNpZ25hdHVyZVJlcXVpcmVkKHNwaU1lc3NhZ2UsIG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuU2lnbmF0dXJlUmVxdWlyZWRNZXNzYWdlID0gc3BpTWVzc2FnZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5EaXNwbGF5TWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBTaWduYXR1cmVSZXNwb25kZWQobXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1NpZ25hdHVyZUNoZWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuICAgIFxuICAgIFBob25lRm9yQXV0aFJlcXVpcmVkKHNwaU1lc3NhZ2UsIG1zZylcbiAgICB7XG4gICAgICAgIHRoaXMuUGhvbmVGb3JBdXRoUmVxdWlyZWRNZXNzYWdlID0gc3BpTWVzc2FnZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IHRydWU7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuICAgIFxuICAgIEF1dGhDb2RlU2VudChtc2cpXG4gICAge1xuICAgICAgICB0aGlzLkF3YWl0aW5nUGhvbmVGb3JBdXRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgQ29tcGxldGVkKHN0YXRlLCByZXNwb25zZSwgbXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gc3RhdGU7XG4gICAgICAgIHRoaXMuUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgdGhpcy5GaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQXR0ZW1wdGluZ1RvQ2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdHbHRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nU2lnbmF0dXJlQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ1Bob25lRm9yQXV0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLkRpc3BsYXlNZXNzYWdlID0gbXNnO1xuICAgIH1cblxuICAgIFVua25vd25Db21wbGV0ZWQobXNnKVxuICAgIHtcbiAgICAgICAgdGhpcy5TdWNjZXNzID0gU3VjY2Vzc1N0YXRlLlVua25vd247XG4gICAgICAgIHRoaXMuUmVzcG9uc2UgPSBudWxsO1xuICAgICAgICB0aGlzLkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5BdHRlbXB0aW5nVG9DYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5Bd2FpdGluZ0dsdFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXdhaXRpbmdTaWduYXR1cmVDaGVjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLkF3YWl0aW5nUGhvbmVGb3JBdXRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuRGlzcGxheU1lc3NhZ2UgPSBtc2c7XG4gICAgfVxufVxuXG4vLyA8c3VtbWFyeT5cbi8vIFVzZWQgYXMgYSByZXR1cm4gaW4gdGhlIFN1Ym1pdEF1dGhDb2RlIG1ldGhvZCB0byBzaWduaWZ5IHdoZXRoZXIgQ29kZSBpcyB2YWxpZFxuLy8gPC9zdW1tYXJ5PlxuZXhwb3J0IGNsYXNzIFN1Ym1pdEF1dGhDb2RlUmVzdWx0XG57XG4gICAgY29uc3RydWN0b3IodmFsaWRGb3JtYXQsIG1lc3NhZ2UpXG4gICAge1xuICAgICAgICB0aGlzLlZhbGlkRm9ybWF0ID0gdmFsaWRGb3JtYXQ7XG5cbiAgICAgICAgLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vIFRleHQgdGhhdCBnaXZlcyByZWFzb24gZm9yIEludmFsaWRpdHlcbiAgICAgICAgLy8gPC9zdW1tYXJ5PlxuICAgICAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNwaUNvbmZpZ1xue1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlByb21wdEZvckN1c3RvbWVyQ29weU9uRWZ0cG9zICA9IGZhbHNlO1xuICAgICAgICB0aGlzLlNpZ25hdHVyZUZsb3dPbkVmdHBvcyAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLlByaW50TWVyY2hhbnRDb3B5ICAgICAgICAgICAgICA9IGZhbHNlO1xuICAgIH1cblxuICAgIGFkZFJlY2VpcHRDb25maWcobWVzc2FnZURhdGEpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5Qcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcylcbiAgICAgICAge1xuICAgICAgICAgICAgbWVzc2FnZURhdGEucHJvbXB0X2Zvcl9jdXN0b21lcl9jb3B5ID0gdGhpcy5Qcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5TaWduYXR1cmVGbG93T25FZnRwb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhLnByaW50X2Zvcl9zaWduYXR1cmVfcmVxdWlyZWRfdHJhbnNhY3Rpb25zID0gdGhpcy5TaWduYXR1cmVGbG93T25FZnRwb3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuUHJpbnRNZXJjaGFudENvcHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhLnByaW50X21lcmNoYW50X2NvcHkgPSB0aGlzLlByaW50TWVyY2hhbnRDb3B5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlRGF0YTtcbiAgICB9XG5cbiAgICBUb1N0cmluZygpXG4gICAge1xuICAgICAgICByZXR1cm4gYFByb21wdEZvckN1c3RvbWVyQ29weU9uRWZ0cG9zOiR7dGhpcy5Qcm9tcHRGb3JDdXN0b21lckNvcHlPbkVmdHBvc30gU2lnbmF0dXJlRmxvd09uRWZ0cG9zOiR7dGhpcy5TaWduYXR1cmVGbG93T25FZnRwb3N9IFByaW50TWVyY2hhbnRDb3B5OiAke3RoaXMuUHJpbnRNZXJjaGFudENvcHl9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbk9wdGlvbnNcbntcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJSZWNlaXB0SGVhZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJSZWNlaXB0Rm9vdGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0SGVhZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVyY2hhbnRSZWNlaXB0Rm9vdGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBTZXRDdXN0b21lclJlY2VpcHRIZWFkZXIoY3VzdG9tZXJSZWNlaXB0SGVhZGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJSZWNlaXB0SGVhZGVyID0gY3VzdG9tZXJSZWNlaXB0SGVhZGVyO1xuICAgIH1cblxuICAgIFNldEN1c3RvbWVyUmVjZWlwdEZvb3RlcihjdXN0b21lclJlY2VpcHRGb290ZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9jdXN0b21lclJlY2VpcHRGb290ZXIgPSBjdXN0b21lclJlY2VpcHRGb290ZXI7XG4gICAgfVxuICAgIFNldE1lcmNoYW50UmVjZWlwdEhlYWRlcihtZXJjaGFudFJlY2VpcHRIZWFkZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9tZXJjaGFudFJlY2VpcHRIZWFkZXIgPSBtZXJjaGFudFJlY2VpcHRIZWFkZXI7XG4gICAgfVxuICAgIFNldE1lcmNoYW50UmVjZWlwdEZvb3RlcihtZXJjaGFudFJlY2VpcHRGb290ZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9tZXJjaGFudFJlY2VpcHRGb290ZXIgPSBtZXJjaGFudFJlY2VpcHRGb290ZXI7XG4gICAgfVxuICAgIEFkZE9wdGlvbnMobWVzc2FnZURhdGEpXG4gICAge1xuICAgICAgICBtZXNzYWdlRGF0YS5jdXN0b21lcl9yZWNlaXB0X2hlYWRlciA9IHRoaXMuX2N1c3RvbWVyUmVjZWlwdEhlYWRlcjtcbiAgICAgICAgbWVzc2FnZURhdGEuY3VzdG9tZXJfcmVjZWlwdF9mb290ZXIgPSB0aGlzLl9jdXN0b21lclJlY2VpcHRGb290ZXI7XG4gICAgICAgIG1lc3NhZ2VEYXRhLm1lcmNoYW50X3JlY2VpcHRfaGVhZGVyID0gdGhpcy5fbWVyY2hhbnRSZWNlaXB0SGVhZGVyO1xuICAgICAgICBtZXNzYWdlRGF0YS5tZXJjaGFudF9yZWNlaXB0X2Zvb3RlciA9IHRoaXMuX21lcmNoYW50UmVjZWlwdEZvb3RlcjtcblxuICAgICAgICByZXR1cm4gbWVzc2FnZURhdGE7XG4gICAgfVxufSIsImltcG9ydCB7UmVxdWVzdElkSGVscGVyfSBmcm9tICcuL1JlcXVlc3RJZEhlbHBlcic7XG5pbXBvcnQge0JpbGxQYXltZW50LCBQYXlBdFRhYmxlQ29uZmlnLCBQYXltZW50SGlzdG9yeUVudHJ5LCBCaWxsUmV0cmlldmFsUmVzdWx0LCBCaWxsU3RhdHVzUmVzcG9uc2V9IGZyb20gJy4vUGF5QXRUYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBTcGlQYXlBdFRhYmxlXG57ICBcbiAgICBjb25zdHJ1Y3RvcihzcGkpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGkgPSBzcGk7XG4gICAgICAgIHRoaXMuX2xvZyA9IGNvbnNvbGU7XG5cbiAgICAgICAgdGhpcy5Db25maWcgPSBPYmplY3QuYXNzaWduKG5ldyBQYXlBdFRhYmxlQ29uZmlnKCksIHtcbiAgICAgICAgICAgIFBheUF0VGFibGVkRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIE9wZXJhdG9ySWRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgQWxsb3dlZE9wZXJhdG9ySWRzOiBbXSxcbiAgICAgICAgICAgIEVxdWFsU3BsaXRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgU3BsaXRCeUFtb3VudEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBTdW1tYXJ5UmVwb3J0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIFRpcHBpbmdFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgTGFiZWxPcGVyYXRvcklkOiBcIk9wZXJhdG9yIElEXCIsXG4gICAgICAgICAgICBMYWJlbFBheUJ1dHRvbjogXCJQYXkgYXQgVGFibGVcIixcbiAgICAgICAgICAgIExhYmVsVGFibGVJZDogXCJUYWJsZSBOdW1iZXJcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyA8c3VtbWFyeT5cbiAgICAvLyBUaGlzIGRlbGVnYXRlIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIEVmdHBvcyBuZWVkcyB0byBrbm93IHRoZSBjdXJyZW50IHN0YXRlIG9mIGEgYmlsbCBmb3IgYSB0YWJsZS4gXG4gICAgLy8gPHBhcmEgLz5cbiAgICAvLyBQYXJhbWV0ZXJzOjxwYXJhIC8+XG4gICAgLy8gYmlsbElkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBiaWxsLiBJZiBlbXB0eSwgaXQgbWVhbnMgdGhhdCB0aGUgUGF5QXRUYWJsZSBmbG93IG9uIHRoZSBFZnRwb3MgaXMganVzdCBzdGFydGluZywgYW5kIHRoZSBsb29rdXAgaXMgYnkgdGFibGVJZC48cGFyYSAvPlxuICAgIC8vIHRhYmxlSWQgLSBUaGUgaWRlbnRpZmllciBvZiB0aGUgdGFibGUgdGhhdCB0aGUgYmlsbCBpcyBmb3IuIDxwYXJhIC8+XG4gICAgLy8gb3BlcmF0b3JJZCAtIFRoZSBpZCBvZiB0aGUgb3BlcmF0b3IgZW50ZXJlZCBvbiB0aGUgZWZ0cG9zLiA8cGFyYSAvPlxuICAgIC8vIDxwYXJhIC8+XG4gICAgLy8gUmV0dXJuOjxwYXJhIC8+XG4gICAgLy8gWW91IG5lZWQgdG8gcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBiaWxsLlxuICAgIC8vIDwvc3VtbWFyeT5cbiAgICBHZXRCaWxsU3RhdHVzKGJpbGxJZCwgdGFibGVJZCwgb3BlcmF0b3JJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLiBQbGVhc2Ugb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIHlvdXIgUE9TJyk7XG4gICAgfVxuXG4gICAgLy8gQWJzdHJhY3QgbWV0aG9kLCBtdXN0IGltcGxlbWVudCBpbiBQT1Mgc3lzdGVtXG4gICAgQmlsbFBheW1lbnRSZWNlaXZlZChiaWxsUGF5bWVudCwgdXBkYXRlZEJpbGxEYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuIFBsZWFzZSBvdmVyd3JpdGUgdGhpcyBtZXRob2QgaW4geW91ciBQT1MnKTtcbiAgICB9XG5cbiAgICBQdXNoUGF5QXRUYWJsZUNvbmZpZygpXG4gICAge1xuICAgICAgICB0aGlzLl9zcGkuX3NlbmQodGhpcy5Db25maWcuVG9NZXNzYWdlKFJlcXVlc3RJZEhlbHBlci5JZChcInBhdGNvbmZcIikpKTtcbiAgICB9IFxuICAgIFxuICAgIF9oYW5kbGVHZXRCaWxsRGV0YWlsc1JlcXVlc3QobSlcbiAgICB7XG4gICAgICAgIHZhciBvcGVyYXRvcklkID0gbS5EYXRhW1wib3BlcmF0b3JfaWRcIl07XG4gICAgICAgIHZhciB0YWJsZUlkID0gbS5EYXRhW1widGFibGVfaWRcIl07XG5cbiAgICAgICAgLy8gQXNrIFBPUyBmb3IgQmlsbCBEZXRhaWxzIGZvciB0aGlzIHRhYmxlSWQsIGlubHVkaW5nIGVuY29kZWQgUGF5bWVudERhdGFcbiAgICAgICAgdmFyIGJpbGxTdGF0dXMgPSB0aGlzLkdldEJpbGxTdGF0dXMobnVsbCwgdGFibGVJZCwgb3BlcmF0b3JJZCk7XG4gICAgICAgIGJpbGxTdGF0dXMuVGFibGVJZCA9IHRhYmxlSWQ7XG4gICAgICAgIGlmIChiaWxsU3RhdHVzLlRvdGFsQW1vdW50IDw9IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5pbmZvKFwiVGFibGUgaGFzIDAgdG90YWwgYW1vdW50LiBub3Qgc2VuZGluZyBpdCB0byBlZnRwb3MuXCIpO1xuICAgICAgICAgICAgYmlsbFN0YXR1cy5SZXN1bHQgPSBCaWxsUmV0cmlldmFsUmVzdWx0LklOVkFMSURfVEFCTEVfSUQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3NwaS5fc2VuZChiaWxsU3RhdHVzLlRvTWVzc2FnZShtLklkKSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUJpbGxQYXltZW50QWR2aWNlKG0pXG4gICAge1xuICAgICAgICB2YXIgYmlsbFBheW1lbnQgPSBuZXcgQmlsbFBheW1lbnQobSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBc2sgUE9TIGZvciBCaWxsIERldGFpbHMsIGlubHVkaW5nIGVuY29kZWQgUGF5bWVudERhdGFcbiAgICAgICAgdmFyIGV4aXN0aW5nQmlsbFN0YXR1cyA9IHRoaXMuR2V0QmlsbFN0YXR1cyhiaWxsUGF5bWVudC5CaWxsSWQsIGJpbGxQYXltZW50LlRhYmxlSWQsIGJpbGxQYXltZW50Lk9wZXJhdG9ySWQpO1xuICAgICAgICBpZiAoZXhpc3RpbmdCaWxsU3RhdHVzLlJlc3VsdCAhPSBCaWxsUmV0cmlldmFsUmVzdWx0LlNVQ0NFU1MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZy53YXJuKFwiQ291bGQgbm90IHJldHJpZXZlIEJpbGwgU3RhdHVzIGZvciBQYXltZW50IEFkdmljZS4gU2VuZGluZyBFcnJvciB0byBFZnRwb3MuXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3BpLl9zZW5kKGV4aXN0aW5nQmlsbFN0YXR1cy5Ub01lc3NhZ2UobS5JZCkpO1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgZXhpc3RpbmdQYXltZW50SGlzdG9yeSA9IGV4aXN0aW5nQmlsbFN0YXR1cy5nZXRCaWxsUGF5bWVudEhpc3RvcnkoKTtcbiAgIFxuICAgICAgICB2YXIgZm91bmRFeGlzdGluZ0VudHJ5ID0gZXhpc3RpbmdQYXltZW50SGlzdG9yeS5maW5kKHBoZSA9PiBwaGUuR2V0VGVybWluYWxSZWZJZCgpID09IGJpbGxQYXltZW50LlB1cmNoYXNlUmVzcG9uc2UuR2V0VGVybWluYWxSZWZlcmVuY2VJZCgpKTtcbiAgICAgICAgaWYgKGZvdW5kRXhpc3RpbmdFbnRyeSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IHByb2Nlc3NlZCB0aGlzIHBheW1lbnQuXG4gICAgICAgICAgICAvLyBwZXJoYXBzIEVmdHBvcyBkaWQgZ2V0IG91ciBhY2tub3dsZWRnZW1lbnQuXG4gICAgICAgICAgICAvLyBMZXQncyB1cGRhdGUgRWZ0cG9zLlxuICAgICAgICAgICAgdGhpcy5fbG9nLndhcm4oXCJIYWQgYWxyZWFkeSByZWNlaXZlZCB0aGlzIGJpbGxfcGF5bWVtbnQgYWR2aWNlIGZyb20gZWZ0cG9zLiBJZ25vcmluZy5cIik7XG4gICAgICAgICAgICB0aGlzLl9zcGkuX3NlbmQoZXhpc3RpbmdCaWxsU3RhdHVzLlRvTWVzc2FnZShtLklkKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMZXQncyBhZGQgdGhlIG5ldyBlbnRyeSB0byB0aGUgaGlzdG9yeVxuICAgICAgICB2YXIgdXBkYXRlZEhpc3RvcnlFbnRyaWVzID0gZXhpc3RpbmdQYXltZW50SGlzdG9yeTtcbiAgICAgICAgdXBkYXRlZEhpc3RvcnlFbnRyaWVzLnB1c2goXG4gICAgICAgICAgICBuZXcgUGF5bWVudEhpc3RvcnlFbnRyeShiaWxsUGF5bWVudC5QYXltZW50VHlwZS50b0xvd2VyQ2FzZSgpLCBiaWxsUGF5bWVudC5QdXJjaGFzZVJlc3BvbnNlLlRvUGF5bWVudFN1bW1hcnkoKSlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB1cGRhdGVkQmlsbERhdGEgPSBCaWxsU3RhdHVzUmVzcG9uc2UuVG9CaWxsRGF0YSh1cGRhdGVkSGlzdG9yeUVudHJpZXMpO1xuXG4gICAgICAgIC8vIEFkdmlzZSBQT1Mgb2YgbmV3IHBheW1lbnQgYWdhaW5zdCB0aGlzIGJpbGwsIGFuZCB0aGUgdXBkYXRlZCBCaWxsRGF0YSB0byBTYXZlLlxuICAgICAgICB2YXIgdXBkYXRlZEJpbGxTdGF0dXMgPSB0aGlzLkJpbGxQYXltZW50UmVjZWl2ZWQoYmlsbFBheW1lbnQsIHVwZGF0ZWRCaWxsRGF0YSk7XG5cbiAgICAgICAgLy8gSnVzdCBpbiBjYXNlIGNsaWVudCBmb3Jnb3QgdG8gc2V0IHRoZXNlOlxuICAgICAgICB1cGRhdGVkQmlsbFN0YXR1cy5CaWxsSWQgPSBiaWxsUGF5bWVudC5CaWxsSWQ7XG4gICAgICAgIHVwZGF0ZWRCaWxsU3RhdHVzLlRhYmxlSWQgPSBiaWxsUGF5bWVudC5UYWJsZUlkO1xuXG4gICAgICAgIGlmICh1cGRhdGVkQmlsbFN0YXR1cy5SZXN1bHQgIT0gQmlsbFJldHJpZXZhbFJlc3VsdC5TVUNDRVNTKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cud2FybihcIlBPUyBFcnJvcmVkIHdoZW4gYmVpbmcgQWR2aXNlZCBvZiBQYXltZW50LiBMZXR0aW5nIEVGVFBPUyBrbm93LCBhbmQgc2VuZGluZyBleGlzdGluZyBiaWxsIGRhdGEuXCIpO1xuICAgICAgICAgICAgdXBkYXRlZEJpbGxTdGF0dXMuQmlsbERhdGEgPSBleGlzdGluZ0JpbGxTdGF0dXMuQmlsbERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGVkQmlsbFN0YXR1cy5CaWxsRGF0YSA9IHVwZGF0ZWRCaWxsRGF0YTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLl9zcGkuX3NlbmQodXBkYXRlZEJpbGxTdGF0dXMuVG9NZXNzYWdlKG0uSWQpKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZUdldFRhYmxlQ29uZmlnKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9zcGkuX3NlbmQodGhpcy5Db25maWcuVG9NZXNzYWdlKG0uSWQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIFByZWF1dGhFdmVudHMsXG4gICAgQWNjb3VudFZlcmlmeVJlcXVlc3QsIFxuICAgIFByZWF1dGhPcGVuUmVxdWVzdCwgXG4gICAgUHJlYXV0aFRvcHVwUmVxdWVzdCwgXG4gICAgUHJlYXV0aFBhcnRpYWxDYW5jZWxsYXRpb25SZXF1ZXN0LCBcbiAgICBQcmVhdXRoRXh0ZW5kUmVxdWVzdCxcbiAgICBQcmVhdXRoQ29tcGxldGlvblJlcXVlc3QsXG4gICAgUHJlYXV0aENhbmNlbFJlcXVlc3R9IGZyb20gJy4vUHJlYXV0aCc7XG5cbmltcG9ydCB7VHJhbnNhY3Rpb25GbG93U3RhdGUsIFRyYW5zYWN0aW9uVHlwZSwgSW5pdGlhdGVUeFJlc3VsdH0gZnJvbSAnLi9TcGlNb2RlbHMnO1xuXG5leHBvcnQgY2xhc3MgU3BpUHJlYXV0aFxue1xuICAgIGNvbnN0cnVjdG9yKHNwaSlcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwaSA9IHNwaTtcbiAgICAgICAgdGhpcy5fbG9nID0gY29uc29sZTtcbiAgICB9XG5cbiAgICBJbml0aWF0ZUFjY291bnRWZXJpZnlUeChwb3NSZWZJZClcbiAgICB7XG4gICAgICAgIHZhciB2ZXJpZnlNc2cgPSBuZXcgQWNjb3VudFZlcmlmeVJlcXVlc3QocG9zUmVmSWQpLlRvTWVzc2FnZSgpO1xuICAgICAgICB2YXIgdGZzID0gbmV3IFRyYW5zYWN0aW9uRmxvd1N0YXRlKFxuICAgICAgICAgICAgcG9zUmVmSWQsIFRyYW5zYWN0aW9uVHlwZS5BY2NvdW50VmVyaWZ5LCAwLCB2ZXJpZnlNc2csXG4gICAgICAgICAgICBcIldhaXRpbmcgZm9yIEVGVFBPUyBjb25uZWN0aW9uIHRvIG1ha2UgYWNjb3VudCB2ZXJpZnkgcmVxdWVzdFwiKTtcbiAgICAgICAgdmFyIHNlbnRNc2cgPSBcIkFza2VkIEVGVFBPUyB0byB2ZXJpZnkgYWNjb3VudFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhdGVQcmVhdXRoVHgodGZzLCBzZW50TXNnKTtcbiAgICB9XG4gICAgXG4gICAgSW5pdGlhdGVPcGVuVHgocG9zUmVmSWQsIGFtb3VudENlbnRzKVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoT3BlblJlcXVlc3QoYW1vdW50Q2VudHMsIHBvc1JlZklkKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuUHJlYXV0aCwgYW1vdW50Q2VudHMsIG1zZyxcbiAgICAgICAgICAgIGBXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIHByZWF1dGggcmVxdWVzdCBmb3IgJHsoYW1vdW50Q2VudHMgLyAxMDAuMCkudG9GaXhlZCgyKX1gKTtcbiAgICAgICAgdmFyIHNlbnRNc2cgPSBgQXNrZWQgRUZUUE9TIHRvIGNyZWF0ZSBwcmVhdXRoIGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlVG9wdXBUeChwb3NSZWZJZCwgcHJlYXV0aElkLCBhbW91bnRDZW50cylcbiAgICB7XG4gICAgICAgIHZhciBtc2cgPSBuZXcgUHJlYXV0aFRvcHVwUmVxdWVzdChwcmVhdXRoSWQsIGFtb3VudENlbnRzLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIHRvcHVwIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIHZhciBzZW50TXNnID0gYEFza2VkIEVGVFBPUyB0byBtYWtlIHByZWF1dGggdG9wdXAgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYXRlUHJlYXV0aFR4KHRmcywgc2VudE1zZyk7XG4gICAgfVxuXG4gICAgSW5pdGlhdGVQYXJ0aWFsQ2FuY2VsbGF0aW9uVHgocG9zUmVmSWQsIHByZWF1dGhJZCwgYW1vdW50Q2VudHMpXG4gICAge1xuICAgICAgICB2YXIgbXNnID0gbmV3IFByZWF1dGhQYXJ0aWFsQ2FuY2VsbGF0aW9uUmVxdWVzdChwcmVhdXRoSWQsIGFtb3VudENlbnRzLCBwb3NSZWZJZCkuVG9NZXNzYWdlKCk7XG4gICAgICAgIHZhciB0ZnMgPSBuZXcgVHJhbnNhY3Rpb25GbG93U3RhdGUoXG4gICAgICAgICAgICBwb3NSZWZJZCwgVHJhbnNhY3Rpb25UeXBlLlByZWF1dGgsIGFtb3VudENlbnRzLCBtc2csXG4gICAgICAgICAgICBgV2FpdGluZyBmb3IgRUZUUE9TIGNvbm5lY3Rpb24gdG8gbWFrZSBwcmVhdXRoIHBhcnRpYWwgY2FuY2VsbGF0aW9uIHJlcXVlc3QgZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YCk7XG4gICAgICAgIHZhciBzZW50TXNnID0gYEFza2VkIEVGVFBPUyB0byBtYWtlIHByZWF1dGggcGFydGlhbCBjYW5jZWxsYXRpb24gZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYXRlUHJlYXV0aFR4KHRmcywgc2VudE1zZyk7XG4gICAgfVxuXG4gICAgSW5pdGlhdGVFeHRlbmRUeChwb3NSZWZJZCwgcHJlYXV0aElkKVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoRXh0ZW5kUmVxdWVzdChwcmVhdXRoSWQsIHBvc1JlZklkKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuUHJlYXV0aCwgMCwgbXNnLFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIHByZWF1dGggRXh0ZW5kIHJlcXVlc3RcIik7XG4gICAgICAgIHZhciBzZW50TXNnID0gXCJBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIEV4dGVuZCByZXF1ZXN0XCI7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIEluaXRpYXRlQ29tcGxldGlvblR4KHBvc1JlZklkLCBwcmVhdXRoSWQsIGFtb3VudENlbnRzLCBzdXJjaGFyZ2VBbW91bnQpXG4gICAge1xuICAgICAgICB2YXIgbXNnID0gbmV3IFByZWF1dGhDb21wbGV0aW9uUmVxdWVzdChwcmVhdXRoSWQsIGFtb3VudENlbnRzLCBwb3NSZWZJZCwgc3VyY2hhcmdlQW1vdW50KS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuUHJlYXV0aCwgYW1vdW50Q2VudHMsIG1zZyxcbiAgICAgICAgICAgIGBXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIHByZWF1dGggY29tcGxldGlvbiByZXF1ZXN0IGZvciAkeyhhbW91bnRDZW50cyAvIDEwMC4wKS50b0ZpeGVkKDIpfWApO1xuICAgICAgICB2YXIgc2VudE1zZyA9IGBBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIGNvbXBsZXRpb24gZm9yICR7KGFtb3VudENlbnRzIC8gMTAwLjApLnRvRml4ZWQoMil9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYXRlUHJlYXV0aFR4KHRmcywgc2VudE1zZyk7XG4gICAgfVxuXG4gICAgSW5pdGlhdGVDYW5jZWxUeChwb3NSZWZJZCwgcHJlYXV0aElkKVxuICAgIHtcbiAgICAgICAgdmFyIG1zZyA9IG5ldyBQcmVhdXRoQ2FuY2VsUmVxdWVzdChwcmVhdXRoSWQsIHBvc1JlZklkKS5Ub01lc3NhZ2UoKTtcbiAgICAgICAgdmFyIHRmcyA9IG5ldyBUcmFuc2FjdGlvbkZsb3dTdGF0ZShcbiAgICAgICAgICAgIHBvc1JlZklkLCBUcmFuc2FjdGlvblR5cGUuUHJlYXV0aCwgMCwgbXNnLFxuICAgICAgICAgICAgXCJXYWl0aW5nIGZvciBFRlRQT1MgY29ubmVjdGlvbiB0byBtYWtlIHByZWF1dGggY2FuY2VsbGF0aW9uIHJlcXVlc3RcIik7XG4gICAgICAgIHZhciBzZW50TXNnID0gXCJBc2tlZCBFRlRQT1MgdG8gbWFrZSBwcmVhdXRoIGNhbmNlbGxhdGlvbiByZXF1ZXN0XCI7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpO1xuICAgIH1cblxuICAgIF9pbml0aWF0ZVByZWF1dGhUeCh0ZnMsIHNlbnRNc2cpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fc3BpLkN1cnJlbnRTdGF0dXMgPT0gU3BpU3RhdHVzLlVucGFpcmVkKSByZXR1cm4gbmV3IEluaXRpYXRlVHhSZXN1bHQoZmFsc2UsIFwiTm90IFBhaXJlZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5fc3BpLkN1cnJlbnRGbG93ICE9IFNwaUZsb3cuSWRsZSkgcmV0dXJuIG5ldyBJbml0aWF0ZVR4UmVzdWx0KGZhbHNlLCBcIk5vdCBJZGxlXCIpO1xuXG4gICAgICAgIHRoaXMuX3NwaS5DdXJyZW50RmxvdyA9IFNwaUZsb3cuVHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGUgPSB0ZnM7XG4gICAgICAgIGlmICh0aGlzLl9zcGkuX3NlbmQodGZzLlJlcXVlc3QpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlLlNlbnQoc2VudE1zZyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1R4Rmxvd1N0YXRlQ2hhbmdlZCcsIHtkZXRhaWw6IHRoaXMuX3NwaS5DdXJyZW50VHhGbG93U3RhdGV9KSk7XG4gICAgICAgIHJldHVybiBuZXcgSW5pdGlhdGVUeFJlc3VsdCh0cnVlLCBcIlByZWF1dGggSW5pdGlhdGVkXCIpO1xuICAgIH1cblxuICAgIF9oYW5kbGVQcmVhdXRoTWVzc2FnZShtKVxuICAgIHtcbiAgICAgICAgc3dpdGNoIChtLkV2ZW50TmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSBQcmVhdXRoRXZlbnRzLkFjY291bnRWZXJpZnlSZXNwb25zZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBY2NvdW50VmVyaWZ5UmVzcG9uc2UobSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFByZWF1dGhFdmVudHMuUHJlYXV0aE9wZW5SZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoVG9wdXBSZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoUGFydGlhbENhbmNlbGxhdGlvblJlc3BvbnNlOlxuICAgICAgICAgICAgY2FzZSBQcmVhdXRoRXZlbnRzLlByZWF1dGhFeHRlbmRSZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoQ29tcGxldGVSZXNwb25zZTpcbiAgICAgICAgICAgIGNhc2UgUHJlYXV0aEV2ZW50cy5QcmVhdXRoQ2FuY2VsbGF0aW9uUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUHJlYXV0aFJlc3BvbnNlKG0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgSSBkb24ndCBVbmRlcnN0YW5kIFByZWF1dGggRXZlbnQ6ICR7bS5FdmVudE5hbWV9LCAke20uRGF0YX0uIFBlcmhhcHMgSSBoYXZlIG5vdCBpbXBsZW1lbnRlZCBpdCB5ZXQuYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQWNjb3VudFZlcmlmeVJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICB2YXIgY3VycmVudFR4Rmxvd1N0YXRlID0gdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IGN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhY3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgQWNjb3VudCBWZXJpZnkgcmVzcG9uc2UgYnV0IEkgd2FzIG5vdCB3YWl0aW5nIGZvciBvbmUuIEluY29taW5nIFBvcyBSZWYgSUQ6ICR7aW5jb21pbmdQb3NSZWZJZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUSC0xQSwgVEgtMkFcblxuICAgICAgICBjdXJyZW50VHhGbG93U3RhdGUuQ29tcGxldGVkKG0uR2V0U3VjY2Vzc1N0YXRlKCksIG0sIFwiQWNjb3VudCBWZXJpZnkgVHJhbnNhY3Rpb24gRW5kZWQuXCIpO1xuICAgICAgICAvLyBUSC02QSwgVEgtNkVcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdUeEZsb3dTdGF0ZUNoYW5nZWQnLCB7ZGV0YWlsOiB0aGlzLl9zcGkuQ3VycmVudFR4Rmxvd1N0YXRlfSkpO1xuICAgIH1cbiAgICBcbiAgICBfaGFuZGxlUHJlYXV0aFJlc3BvbnNlKG0pXG4gICAge1xuICAgICAgICB2YXIgaW5jb21pbmdQb3NSZWZJZCA9IG0uRGF0YS5wb3NfcmVmX2lkO1xuICAgICAgICB2YXIgY3VycmVudFR4Rmxvd1N0YXRlID0gdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuX3NwaS5DdXJyZW50RmxvdyAhPSBTcGlGbG93LlRyYW5zYWN0aW9uIHx8IGN1cnJlbnRUeEZsb3dTdGF0ZS5GaW5pc2hlZCB8fCAhY3VycmVudFR4Rmxvd1N0YXRlLlBvc1JlZklkID09PSBpbmNvbWluZ1Bvc1JlZklkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sb2cuaW5mbyhgUmVjZWl2ZWQgUHJlYXV0aCByZXNwb25zZSBidXQgSSB3YXMgbm90IHdhaXRpbmcgZm9yIG9uZS4gSW5jb21pbmcgUG9zIFJlZiBJRDogJHtpbmNvbWluZ1Bvc1JlZklkfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRILTFBLCBUSC0yQVxuXG4gICAgICAgIGN1cnJlbnRUeEZsb3dTdGF0ZS5Db21wbGV0ZWQobS5HZXRTdWNjZXNzU3RhdGUoKSwgbSwgXCJQcmVhdXRoIFRyYW5zYWN0aW9uIEVuZGVkLlwiKTtcbiAgICAgICAgLy8gVEgtNkEsIFRILTZFXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnVHhGbG93U3RhdGVDaGFuZ2VkJywge2RldGFpbDogdGhpcy5fc3BpLkN1cnJlbnRUeEZsb3dTdGF0ZX0pKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgSXNQcmVhdXRoRXZlbnQoZXZlbnROYW1lKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50TmFtZS5sYXN0SW5kZXhPZihcInByZWF1dGhcIiwwKSA9PT0gMCBcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5QcmVhdXRoQ29tcGxldGVSZXNwb25zZVxuICAgICAgICAgICAgICAgIHx8IGV2ZW50TmFtZSA9PSBQcmVhdXRoRXZlbnRzLlByZWF1dGhDb21wbGV0ZVJlcXVlc3RcbiAgICAgICAgICAgICAgICB8fCBldmVudE5hbWUgPT0gUHJlYXV0aEV2ZW50cy5BY2NvdW50VmVyaWZ5UmVxdWVzdFxuICAgICAgICAgICAgICAgIHx8IGV2ZW50TmFtZSA9PSBQcmVhdXRoRXZlbnRzLkFjY291bnRWZXJpZnlSZXNwb25zZTtcbiAgICB9XG59XG4iLCJjbGFzcyBUZXJtaW5hbFN0YXR1c1JlcXVlc3RcbntcbiAgICBUb01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcblxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2UoUmVxdWVzdElkSGVscGVyLklkKFwidHJtbmxcIiksIEV2ZW50cy5UZXJtaW5hbFN0YXR1c1JlcXVlc3QsIGRhdGEsIHRydWUpO1xuICAgIH1cbn1cblxuY2xhc3MgVGVybWluYWxTdGF0dXNSZXNwb25zZVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLl9tID0gbTtcbiAgICB9XG4gICAgR2V0U3RhdHVzKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tLkRhdGEuc3RhdHVzO1xuICAgIH1cbiAgICBHZXRCYXR0ZXJ5TGV2ZWwoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX20uRGF0YS5iYXR0ZXJ5X2xldmVsO1xuICAgIH1cbiAgICBJc0NoYXJnaW5nKClcbiAgICB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX20uRGF0YS5jaGFyZ2luZztcbiAgICB9XG59XG5cbmNsYXNzIFRlcm1pbmFsQmF0dGVyeVxue1xuICAgIGNvbnN0cnVjdG9yKG0pXG4gICAge1xuICAgICAgICB0aGlzLkJhdHRlcnlMZXZlbCA9IG0uRGF0YS5iYXR0ZXJ5X2xldmVsO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
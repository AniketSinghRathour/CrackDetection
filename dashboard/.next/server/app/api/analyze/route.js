"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/analyze/route";
exports.ids = ["app/api/analyze/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.js&appDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.js&appDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_arjun_OneDrive_Desktop_front_app_api_analyze_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/analyze/route.js */ \"(rsc)/./app/api/analyze/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/analyze/route\",\n        pathname: \"/api/analyze\",\n        filename: \"route\",\n        bundlePath: \"app/api/analyze/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\arjun\\\\OneDrive\\\\文档\\\\Desktop\\\\front\\\\app\\\\api\\\\analyze\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_arjun_OneDrive_Desktop_front_app_api_analyze_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/analyze/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhbmFseXplJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhbmFseXplJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYW5hbHl6ZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhcmp1biU1Q09uZURyaXZlJTVDJUU2JTk2JTg3JUU2JUExJUEzJTVDRGVza3RvcCU1Q2Zyb250JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNhcmp1biU1Q09uZURyaXZlJTVDJUU2JTk2JTg3JUU2JUExJUEzJTVDRGVza3RvcCU1Q2Zyb250JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMyQjtBQUN4RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2NyYWNrLW1vbml0b3IvPzBmMWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYXJqdW5cXFxcT25lRHJpdmVcXFxc5paH5qGjXFxcXERlc2t0b3BcXFxcZnJvbnRcXFxcYXBwXFxcXGFwaVxcXFxhbmFseXplXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbmFseXplL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYW5hbHl6ZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYW5hbHl6ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFyanVuXFxcXE9uZURyaXZlXFxcXOaWh+aho1xcXFxEZXNrdG9wXFxcXGZyb250XFxcXGFwcFxcXFxhcGlcXFxcYW5hbHl6ZVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYW5hbHl6ZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.js&appDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/analyze/route.js":
/*!**********************************!*\
  !*** ./app/api/analyze/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./lib/cloudinary.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { leftUrl, rightUrl, baselineMm } = body;\n        if (!leftUrl || !rightUrl || !baselineMm) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const FASTAPI_URL = \"http://127.0.0.1:8000\" || 0;\n        const response = await fetch(`${FASTAPI_URL}/analyze-crack`, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                left_path: leftUrl,\n                right_path: rightUrl,\n                baseline_mm: parseFloat(baselineMm)\n            })\n        });\n        if (!response.ok) {\n            const errText = await response.text();\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: `FastAPI error: ${errText}`\n            }, {\n                status: 502\n            });\n        }\n        const result = await response.json();\n        // Upload overlay and heatmap to Cloudinary\n        let overlayUrl = null;\n        let heatmapUrl = null;\n        if (result.overlay) {\n            const overlayBuffer = Buffer.from(result.overlay, \"base64\");\n            const overlayResult = await (0,_lib_cloudinary__WEBPACK_IMPORTED_MODULE_0__.uploadToCloudinary)(overlayBuffer, {\n                folder: \"crack-monitor/overlays\",\n                format: \"png\"\n            });\n            overlayUrl = overlayResult.secure_url;\n        }\n        if (result.heatmap) {\n            const heatmapBuffer = Buffer.from(result.heatmap, \"base64\");\n            const heatmapResult = await (0,_lib_cloudinary__WEBPACK_IMPORTED_MODULE_0__.uploadToCloudinary)(heatmapBuffer, {\n                folder: \"crack-monitor/heatmaps\",\n                format: \"png\"\n            });\n            heatmapUrl = heatmapResult.secure_url;\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            scaleMmPerPixel: result.scale_mm_per_pixel,\n            maxWidthMm: result.max_width_mm,\n            avgWidthMm: result.avg_width_mm,\n            crackAreaMm2: result.crack_area_mm2,\n            overlayUrl,\n            heatmapUrl\n        });\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: err.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FuYWx5emUvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBQ1g7QUFFbkMsZUFBZUUsS0FBS0MsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJO1FBQzNCLE1BQU0sRUFBRUMsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLFVBQVUsRUFBRSxHQUFHSjtRQUUxQyxJQUFJLENBQUNFLFdBQVcsQ0FBQ0MsWUFBWSxDQUFDQyxZQUFZO1lBQ3hDLE9BQU9QLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7Z0JBQUVJLE9BQU87WUFBMEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQy9FO1FBRUEsTUFBTUMsY0FBY0MsdUJBQXVCLElBQUk7UUFFL0MsTUFBTUUsV0FBVyxNQUFNQyxNQUFNLENBQUMsRUFBRUosWUFBWSxjQUFjLENBQUMsRUFBRTtZQUMzREssUUFBUTtZQUNSQyxTQUFTO2dCQUFFLGdCQUFnQjtZQUFtQjtZQUM5Q2IsTUFBTWMsS0FBS0MsU0FBUyxDQUFDO2dCQUNuQkMsV0FBV2Q7Z0JBQ1hlLFlBQVlkO2dCQUNaZSxhQUFhQyxXQUFXZjtZQUMxQjtRQUNGO1FBRUEsSUFBSSxDQUFDTSxTQUFTVSxFQUFFLEVBQUU7WUFDaEIsTUFBTUMsVUFBVSxNQUFNWCxTQUFTWSxJQUFJO1lBQ25DLE9BQU96QixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO2dCQUFFSSxPQUFPLENBQUMsZUFBZSxFQUFFZ0IsUUFBUSxDQUFDO1lBQUMsR0FBRztnQkFBRWYsUUFBUTtZQUFJO1FBQ2pGO1FBRUEsTUFBTWlCLFNBQVMsTUFBTWIsU0FBU1QsSUFBSTtRQUVsQywyQ0FBMkM7UUFDM0MsSUFBSXVCLGFBQWE7UUFDakIsSUFBSUMsYUFBYTtRQUVqQixJQUFJRixPQUFPRyxPQUFPLEVBQUU7WUFDbEIsTUFBTUMsZ0JBQWdCQyxPQUFPQyxJQUFJLENBQUNOLE9BQU9HLE9BQU8sRUFBRTtZQUNsRCxNQUFNSSxnQkFBZ0IsTUFBTWxDLG1FQUFrQkEsQ0FBQytCLGVBQWU7Z0JBQzVESSxRQUFRO2dCQUNSQyxRQUFRO1lBQ1Y7WUFDQVIsYUFBYU0sY0FBY0csVUFBVTtRQUN2QztRQUVBLElBQUlWLE9BQU9XLE9BQU8sRUFBRTtZQUNsQixNQUFNQyxnQkFBZ0JQLE9BQU9DLElBQUksQ0FBQ04sT0FBT1csT0FBTyxFQUFFO1lBQ2xELE1BQU1FLGdCQUFnQixNQUFNeEMsbUVBQWtCQSxDQUFDdUMsZUFBZTtnQkFDNURKLFFBQVE7Z0JBQ1JDLFFBQVE7WUFDVjtZQUNBUCxhQUFhVyxjQUFjSCxVQUFVO1FBQ3ZDO1FBRUEsT0FBT3BDLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFDdkJvQyxpQkFBaUJkLE9BQU9lLGtCQUFrQjtZQUMxQ0MsWUFBWWhCLE9BQU9pQixZQUFZO1lBQy9CQyxZQUFZbEIsT0FBT21CLFlBQVk7WUFDL0JDLGNBQWNwQixPQUFPcUIsY0FBYztZQUNuQ3BCO1lBQ0FDO1FBQ0Y7SUFDRixFQUFFLE9BQU9vQixLQUFLO1FBQ1osT0FBT2hELHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRUksT0FBT3dDLElBQUlDLE9BQU87UUFBQyxHQUFHO1lBQUV4QyxRQUFRO1FBQUk7SUFDakU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2NyYWNrLW1vbml0b3IvLi9hcHAvYXBpL2FuYWx5emUvcm91dGUuanM/OTBjMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1cGxvYWRUb0Nsb3VkaW5hcnkgfSBmcm9tICdAL2xpYi9jbG91ZGluYXJ5J1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpXG4gICAgY29uc3QgeyBsZWZ0VXJsLCByaWdodFVybCwgYmFzZWxpbmVNbSB9ID0gYm9keVxuXG4gICAgaWYgKCFsZWZ0VXJsIHx8ICFyaWdodFVybCB8fCAhYmFzZWxpbmVNbSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdNaXNzaW5nIHJlcXVpcmVkIGZpZWxkcycgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IEZBU1RBUElfVVJMID0gcHJvY2Vzcy5lbnYuRkFTVEFQSV9VUkwgfHwgJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCdcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7RkFTVEFQSV9VUkx9L2FuYWx5emUtY3JhY2tgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBsZWZ0X3BhdGg6IGxlZnRVcmwsXG4gICAgICAgIHJpZ2h0X3BhdGg6IHJpZ2h0VXJsLFxuICAgICAgICBiYXNlbGluZV9tbTogcGFyc2VGbG9hdChiYXNlbGluZU1tKSxcbiAgICAgIH0pLFxuICAgIH0pXG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogYEZhc3RBUEkgZXJyb3I6ICR7ZXJyVGV4dH1gIH0sIHsgc3RhdHVzOiA1MDIgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIC8vIFVwbG9hZCBvdmVybGF5IGFuZCBoZWF0bWFwIHRvIENsb3VkaW5hcnlcbiAgICBsZXQgb3ZlcmxheVVybCA9IG51bGxcbiAgICBsZXQgaGVhdG1hcFVybCA9IG51bGxcblxuICAgIGlmIChyZXN1bHQub3ZlcmxheSkge1xuICAgICAgY29uc3Qgb3ZlcmxheUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHJlc3VsdC5vdmVybGF5LCAnYmFzZTY0JylcbiAgICAgIGNvbnN0IG92ZXJsYXlSZXN1bHQgPSBhd2FpdCB1cGxvYWRUb0Nsb3VkaW5hcnkob3ZlcmxheUJ1ZmZlciwge1xuICAgICAgICBmb2xkZXI6ICdjcmFjay1tb25pdG9yL292ZXJsYXlzJyxcbiAgICAgICAgZm9ybWF0OiAncG5nJyxcbiAgICAgIH0pXG4gICAgICBvdmVybGF5VXJsID0gb3ZlcmxheVJlc3VsdC5zZWN1cmVfdXJsXG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5oZWF0bWFwKSB7XG4gICAgICBjb25zdCBoZWF0bWFwQnVmZmVyID0gQnVmZmVyLmZyb20ocmVzdWx0LmhlYXRtYXAsICdiYXNlNjQnKVxuICAgICAgY29uc3QgaGVhdG1hcFJlc3VsdCA9IGF3YWl0IHVwbG9hZFRvQ2xvdWRpbmFyeShoZWF0bWFwQnVmZmVyLCB7XG4gICAgICAgIGZvbGRlcjogJ2NyYWNrLW1vbml0b3IvaGVhdG1hcHMnLFxuICAgICAgICBmb3JtYXQ6ICdwbmcnLFxuICAgICAgfSlcbiAgICAgIGhlYXRtYXBVcmwgPSBoZWF0bWFwUmVzdWx0LnNlY3VyZV91cmxcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc2NhbGVNbVBlclBpeGVsOiByZXN1bHQuc2NhbGVfbW1fcGVyX3BpeGVsLFxuICAgICAgbWF4V2lkdGhNbTogcmVzdWx0Lm1heF93aWR0aF9tbSxcbiAgICAgIGF2Z1dpZHRoTW06IHJlc3VsdC5hdmdfd2lkdGhfbW0sXG4gICAgICBjcmFja0FyZWFNbTI6IHJlc3VsdC5jcmFja19hcmVhX21tMixcbiAgICAgIG92ZXJsYXlVcmwsXG4gICAgICBoZWF0bWFwVXJsLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnIubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ1cGxvYWRUb0Nsb3VkaW5hcnkiLCJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJsZWZ0VXJsIiwicmlnaHRVcmwiLCJiYXNlbGluZU1tIiwiZXJyb3IiLCJzdGF0dXMiLCJGQVNUQVBJX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsZWZ0X3BhdGgiLCJyaWdodF9wYXRoIiwiYmFzZWxpbmVfbW0iLCJwYXJzZUZsb2F0Iiwib2siLCJlcnJUZXh0IiwidGV4dCIsInJlc3VsdCIsIm92ZXJsYXlVcmwiLCJoZWF0bWFwVXJsIiwib3ZlcmxheSIsIm92ZXJsYXlCdWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwib3ZlcmxheVJlc3VsdCIsImZvbGRlciIsImZvcm1hdCIsInNlY3VyZV91cmwiLCJoZWF0bWFwIiwiaGVhdG1hcEJ1ZmZlciIsImhlYXRtYXBSZXN1bHQiLCJzY2FsZU1tUGVyUGl4ZWwiLCJzY2FsZV9tbV9wZXJfcGl4ZWwiLCJtYXhXaWR0aE1tIiwibWF4X3dpZHRoX21tIiwiYXZnV2lkdGhNbSIsImF2Z193aWR0aF9tbSIsImNyYWNrQXJlYU1tMiIsImNyYWNrX2FyZWFfbW0yIiwiZXJyIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/analyze/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/cloudinary.js":
/*!***************************!*\
  !*** ./lib/cloudinary.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   uploadToCloudinary: () => (/* binding */ uploadToCloudinary)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\ncloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.config({\n    cloud_name: \"dsfrhvi08\",\n    api_key: \"299656415614653\",\n    api_secret: \"ABi5Ez1VuWhcWPXGSizxd__wcWc\"\n});\nasync function uploadToCloudinary(fileBuffer, options = {}) {\n    return new Promise((resolve, reject)=>{\n        const uploadStream = cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.uploader.upload_stream({\n            folder: \"crack-monitor\",\n            resource_type: \"image\",\n            ...options\n        }, (error, result)=>{\n            if (error) reject(error);\n            else resolve(result);\n        });\n        uploadStream.end(fileBuffer);\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2xvdWRpbmFyeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTZDO0FBRTdDQywwQ0FBVUEsQ0FBQ0MsTUFBTSxDQUFDO0lBQ2hCQyxZQUFZQyxXQUFpQztJQUM3Q0csU0FBU0gsaUJBQThCO0lBQ3ZDSyxZQUFZTCw2QkFBaUM7QUFDL0M7QUFFTyxlQUFlTyxtQkFBbUJDLFVBQVUsRUFBRUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsT0FBTyxJQUFJQyxRQUFRLENBQUNDLFNBQVNDO1FBQzNCLE1BQU1DLGVBQWVoQiwwQ0FBVUEsQ0FBQ2lCLFFBQVEsQ0FBQ0MsYUFBYSxDQUNwRDtZQUNFQyxRQUFRO1lBQ1JDLGVBQWU7WUFDZixHQUFHUixPQUFPO1FBQ1osR0FDQSxDQUFDUyxPQUFPQztZQUNOLElBQUlELE9BQU9OLE9BQU9NO2lCQUNiUCxRQUFRUTtRQUNmO1FBRUZOLGFBQWFPLEdBQUcsQ0FBQ1o7SUFDbkI7QUFDRjtBQUVBLGlFQUFlWCwwQ0FBVUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NyYWNrLW1vbml0b3IvLi9saWIvY2xvdWRpbmFyeS5qcz81MDUyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHYyIGFzIGNsb3VkaW5hcnkgfSBmcm9tICdjbG91ZGluYXJ5J1xuXG5jbG91ZGluYXJ5LmNvbmZpZyh7XG4gIGNsb3VkX25hbWU6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQ0xPVURfTkFNRSxcbiAgYXBpX2tleTogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9BUElfS0VZLFxuICBhcGlfc2VjcmV0OiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0FQSV9TRUNSRVQsXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkVG9DbG91ZGluYXJ5KGZpbGVCdWZmZXIsIG9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHVwbG9hZFN0cmVhbSA9IGNsb3VkaW5hcnkudXBsb2FkZXIudXBsb2FkX3N0cmVhbShcbiAgICAgIHtcbiAgICAgICAgZm9sZGVyOiAnY3JhY2stbW9uaXRvcicsXG4gICAgICAgIHJlc291cmNlX3R5cGU6ICdpbWFnZScsXG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICB9LFxuICAgICAgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpXG4gICAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHQpXG4gICAgICB9XG4gICAgKVxuICAgIHVwbG9hZFN0cmVhbS5lbmQoZmlsZUJ1ZmZlcilcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvdWRpbmFyeVxuIl0sIm5hbWVzIjpbInYyIiwiY2xvdWRpbmFyeSIsImNvbmZpZyIsImNsb3VkX25hbWUiLCJwcm9jZXNzIiwiZW52IiwiQ0xPVURJTkFSWV9DTE9VRF9OQU1FIiwiYXBpX2tleSIsIkNMT1VESU5BUllfQVBJX0tFWSIsImFwaV9zZWNyZXQiLCJDTE9VRElOQVJZX0FQSV9TRUNSRVQiLCJ1cGxvYWRUb0Nsb3VkaW5hcnkiLCJmaWxlQnVmZmVyIiwib3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXBsb2FkU3RyZWFtIiwidXBsb2FkZXIiLCJ1cGxvYWRfc3RyZWFtIiwiZm9sZGVyIiwicmVzb3VyY2VfdHlwZSIsImVycm9yIiwicmVzdWx0IiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/cloudinary.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/lodash","vendor-chunks/cloudinary"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.js&appDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Carjun%5COneDrive%5C%E6%96%87%E6%A1%A3%5CDesktop%5Cfront&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
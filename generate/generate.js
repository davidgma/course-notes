"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var promises_1 = require("node:fs/promises");
var LinkNode = /** @class */ (function () {
    function LinkNode(name, link, directory, level) {
        this.name = name;
        this.link = link;
        this.directory = directory;
        this.level = level;
    }
    return LinkNode;
}());
var HtmlFileFinder = /** @class */ (function () {
    function HtmlFileFinder() {
    }
    HtmlFileFinder.prototype.read = function (startDir, dirName, level) {
        var _a, e_1, _b, _c;
        if (dirName === void 0) { dirName = '/'; }
        if (level === void 0) { level = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var files, dir, _d, dir_1, dir_1_1, dirent, path, subDir, _e, _f, e_1_1, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        files = new Array();
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, (0, promises_1.opendir)(startDir)];
                    case 2:
                        dir = _g.sent();
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 12, 13, 18]);
                        _d = true, dir_1 = __asyncValues(dir);
                        _g.label = 4;
                    case 4: return [4 /*yield*/, dir_1.next()];
                    case 5:
                        if (!(dir_1_1 = _g.sent(), _a = dir_1_1.done, !_a)) return [3 /*break*/, 11];
                        _c = dir_1_1.value;
                        _d = false;
                        _g.label = 6;
                    case 6:
                        _g.trys.push([6, , 9, 10]);
                        dirent = _c;
                        path = startDir + '/' + dirent.name;
                        if (dirent.name.endsWith('.html')) {
                            files.push(new LinkNode(dirent.name, path, dirName, level));
                        }
                        if (!(dirent.isDirectory() && dirent.name != 'node_modules')) return [3 /*break*/, 8];
                        files.push(new LinkNode('directory', 'none', dirent.name, level));
                        subDir = startDir + '/' + dirent.name;
                        _f = (_e = files).concat;
                        return [4 /*yield*/, this.read(subDir, dirent.name, level + 1)];
                    case 7:
                        //const subDirFiles = await this.read(subDir);
                        files = _f.apply(_e, [_g.sent()]);
                        _g.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 10: return [3 /*break*/, 4];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _g.trys.push([13, , 16, 17]);
                        if (!(!_d && !_a && (_b = dir_1["return"]))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _b.call(dir_1)];
                    case 14:
                        _g.sent();
                        _g.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        err_1 = _g.sent();
                        console.error('Error with OpenDir: ' + err_1);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/, files];
                }
            });
        });
    };
    HtmlFileFinder.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read('..')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HtmlFileFinder;
}());
var IndexWriter = /** @class */ (function () {
    function IndexWriter() {
        this.finder = new HtmlFileFinder();
    }
    IndexWriter.prototype.write = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, output, _i, _a, line;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.finder.find()];
                    case 1:
                        nodes = _b.sent();
                        output = new Array();
                        output.push('<!DOCTYPE html>');
                        output.push('<html lang="en">');
                        output.push('  <head>');
                        output.push('    <meta charset="UTF-8" />');
                        output.push('    <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
                        output.push('    <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
                        output.push('    <title>Course Notes</title>');
                        output.push('<style>');
                        output.push('    * {');
                        output.push('      box-sizing: border-box;');
                        output.push('    }');
                        output.push('    .link {');
                        output.push('    text-decoration: none;');
                        output.push('    }');
                        output.push('ul {');
                        output.push('list-style-type: none; /* Remove bullets */');
                        output.push('}');
                        output.push('');
                        output.push('</style>');
                        output.push('  </head>');
                        output.push('  <body>');
                        output.push('  <p>');
                        for (_i = 0, _a = this.generateList(nodes); _i < _a.length; _i++) {
                            line = _a[_i];
                            output.push(line);
                        }
                        output.push('  </p>');
                        output.push('');
                        output.push('  </body>');
                        output.push('</html>');
                        //console.log(output);
                        // Write to the index.html file
                        //const indexFH = await open('../index.html');
                        //await indexFH.writeFile(output.join(''));
                        return [4 /*yield*/, (0, promises_1.writeFile)('../index.html', output.join('\n'))];
                    case 2:
                        //console.log(output);
                        // Write to the index.html file
                        //const indexFH = await open('../index.html');
                        //await indexFH.writeFile(output.join(''));
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexWriter.prototype.generateList = function (nodes) {
        var result = new Array();
        var currentLevel = 0;
        result.push('<ul>');
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            // console.log('name: ' + node.name + ', level: ' + node.level.toString());
            if (
            // node.level == 0 ||
            node.directory == 'css' ||
                node.directory == 'images' ||
                node.directory == 'generate') {
            }
            else if (node.name == 'directory') {
                if (node.level > currentLevel) {
                    result.push('<li>' + node.directory + '</li>');
                }
                else if (node.level < currentLevel) {
                    result.push('</ul></ul>');
                    result.push('<ul>');
                    result.push('<li>' + node.directory + '</li>');
                }
                else {
                    result.push('<li>' + node.directory + '</li>');
                }
            }
            else {
                if (node.level > currentLevel) {
                    // console.log('not a directory: ' + JSON.stringify(node));
                    result.push('<ul>');
                }
                result.push('<li><a href="' +
                    node.link +
                    '" class="link">' +
                    node.name +
                    '</a></li>');
            }
            currentLevel = node.level;
        }
        result.push('</ul>');
        return result;
    };
    return IndexWriter;
}());
var writer = new IndexWriter();
writer.write();

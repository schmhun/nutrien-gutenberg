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
        while (_) try {
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.sortWords = exports.wordCounter = exports.parseWord = exports.parseLines = exports.bookParse = void 0;
var axios = require('axios');
function parseWord(word) {
    if (word === '')
        return '';
    // 2.5) have a set of common words to skip inclusion in the final count
    var commonWords = new Set(["the", "of", "to", 'and', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'with', 'as', 'I', 'his', 'they', 'be', 'at', 'one', 'have', 'this', 'from', 'or', 'had', 'by', 'not', 'word', 'but', 'what', 'some', 'we', 'can', 'out', 'other', 'were', 'all', 'there', 'when', 'up', 'use', 'your', 'how', 'said', 'an', 'each', 'she']);
    // send to lowercase
    var lcword = word.toLowerCase();
    // skip if word in setOfCommonWords
    if (commonWords.has(lcword))
        return '';
    return lcword;
}
exports.parseWord = parseWord;
function parseLines(line) {
    var tokens = line.split(/[^A-Za-z0-9']/);
    var validTokens = [];
    tokens.forEach(function (t) {
        var word = parseWord(t);
        if (word)
            validTokens.push(word);
    });
    return validTokens;
}
exports.parseLines = parseLines;
function wordCounter(words) {
    var wordAndCount = new Map();
    words.forEach(function (w) {
        if (wordAndCount.has(w)) {
            wordAndCount.set(w, (wordAndCount.get(w) + 1));
        }
        else {
            wordAndCount.set(w, 1);
        }
    });
    return wordAndCount;
}
exports.wordCounter = wordCounter;
function sortWords(wordMap) {
    var sortedMap = new Map(__spreadArray([], __read(wordMap.entries()), false).sort(function (a, b) { return b[1] - a[1]; }));
    var sortedArr = Array.from(sortedMap, function (_a) {
        var _b = __read(_a, 2), word = _b[0], count = _b[1];
        return ({ word: word, count: count });
    });
    // console.log(sortedArr);
    return sortedArr;
}
exports.sortWords = sortWords;
function bookParse(url) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, parsedWords, wordCount, sortedWords;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get(url)];
                case 1:
                    resp = _a.sent();
                    parsedWords = parseLines(resp.data);
                    wordCount = wordCounter(parsedWords);
                    sortedWords = sortWords(wordCount);
                    return [2 /*return*/, sortedWords];
            }
        });
    });
}
exports.bookParse = bookParse;

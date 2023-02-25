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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeScripts = exports.loadScripts = void 0;
const loadScripts = (sources) => __awaiter(void 0, void 0, void 0, function* () {
    for (const source of sources) {
        yield new Promise((loaded) => {
            const doesNotExist = !!!document.querySelector(`script[src="${source}"]`);
            if (doesNotExist) {
                const scriptTag = document.createElement("script");
                scriptTag.src = source;
                document.body.appendChild(scriptTag);
                scriptTag.addEventListener("load", loaded);
            }
            else {
                loaded(true);
            }
        });
    }
});
exports.loadScripts = loadScripts;
const removeScripts = (sources) => __awaiter(void 0, void 0, void 0, function* () {
    for (const source of sources) {
        const script = document.querySelector(`script[src="${source}"]`);
        if (!!script) {
            document.body.removeChild(script);
        }
    }
});
exports.removeScripts = removeScripts;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const write = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const filepath = path_1.default.join(__dirname + "/environment");
    yield fs_1.default.writeFileSync(filepath, JSON.stringify(data));
});
const System = () => __awaiter(void 0, void 0, void 0, function* () {
    const program = new commander_1.Command();
    program
        .option("-e, --environment <environment>", "Selecciona el entonro de desarrollo ( -D ) o de produccion ( -P ) ");
    program.parse(process.argv);
    const options = program.opts();
    yield write(options);
    return options.environment;
});
exports.System = System;

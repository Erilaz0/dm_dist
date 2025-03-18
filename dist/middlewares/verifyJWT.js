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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const KEY = process.env.JWTKEY || "1234";
const EMAIL = process.env.EMAIL || "erilazerilaz@gmail.com";
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies._dm_admin;
    if (!cookie) {
        res.status(400).json({ ERROR: "ADMIN COOKIE DOESN´ EXISTS" });
    }
    else {
        jsonwebtoken_1.default.verify(cookie, KEY, (error, credentials) => {
            if (error) {
                res.status(400).json({ MESSAGE: "INVALID TOKEN" });
            }
            else {
                credentials.email === EMAIL ? next() : res.status(400).json({ MESSAGE: "BAD AUTHENTICATION" });
            }
        });
    }
});
exports.default = verifyJWT;

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
exports.isValidSession = exports.adminCookie = void 0;
const generaJWT_1 = __importDefault(require("../security_functions/generaJWT"));
const frontHost = process.env.FRONTHOST || "http://localhost:3000";
const adminCookie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info(`Endpoint: /auth/google/callback`);
    if (req.user) {
        const { email, id } = req.user;
        const adminData = {
            email,
            id
        };
        req.logger.info(`Endpoint: /auth/google/callback , creando cookie del administrador`);
        const data = yield (0, generaJWT_1.default)(adminData);
        res.cookie("_dm_admin", data, {
            httpOnly: false,
            secure: false,
            sameSite: true,
        });
        res.redirect(`${frontHost}/admin`);
    }
});
exports.adminCookie = adminCookie;
const isValidSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ MESSAGE: "200OK" });
});
exports.isValidSession = isValidSession;

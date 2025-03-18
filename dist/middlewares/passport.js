"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const inicializaPassport = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        var _a, _b, _c;
        const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
        const envId = (_c = process.env.ID) === null || _c === void 0 ? void 0 : _c.replace(/[,]/g, "");
        const googleId = JSON.stringify(profile.id);
        if (!email || email !== process.env.EMAIL || googleId !== envId) {
            return done(new Error("not email found"), false);
        }
        return done(null, { email, envId });
    }));
};
exports.default = inicializaPassport;

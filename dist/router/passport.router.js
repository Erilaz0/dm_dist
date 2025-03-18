"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("passport-google-oauth20");
const passportController_1 = require("../controllers/passportController");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const router = express_1.default.Router();
router.get("/login", passport_1.default.authenticate("google", { session: false, scope: ["email", "profile"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/" }), passportController_1.adminCookie);
router.get("/api/check-session", verifyJWT_1.default, passportController_1.isValidSession);
exports.default = router;

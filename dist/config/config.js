"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    EMAIL: process.env.EMAIL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    JWTKEY: process.env.JWTKEY,
    FRONTHOST: process.env.FRONTHOST,
    LEVEL: process.env.LEVEL,
    ID: process.env.ID
};

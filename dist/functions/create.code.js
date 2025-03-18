"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = generateRandomCode;
function generateRandomCode(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

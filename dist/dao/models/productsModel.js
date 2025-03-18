"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const productsCollection = "products";
const productsScheme = new mongoose_1.default.Schema({
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    images: [
        { image: { type: String } }
    ],
    category: { type: String },
    sold: { type: Number },
    discount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    stock: { type: Number },
    model: { type: String, default: "none" },
    code: { type: String, unique: false },
    colors: [{
            color: String
        }]
});
productsScheme.plugin(mongoose_paginate_v2_1.default);
const productsModel = mongoose_1.default.model(productsCollection, productsScheme);
exports.default = productsModel;

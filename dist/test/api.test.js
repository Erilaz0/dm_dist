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
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = __importDefault(require("chai"));
const mocha_1 = require("mocha");
const expect = chai_1.default.expect;
const host = (0, supertest_1.default)("http://localhost:8080");
let page = 1;
const date = new Date();
const testProduct = {
    title: "Tablero",
    price: 300,
    description: "Tablero de Winner Express color azul",
    code: "353223435",
    images: [
        {
            image: "none"
        }
    ],
    category: "Tableros",
    stock: 100,
    model: "Winner",
    colors: [{
            color: "Azul",
        }],
    createdAt: date
};
(0, mocha_1.describe)(`Iniciando testing de http://localhost:8080`, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.timeout(10000);
        (0, mocha_1.it)("Iniciando test en /product/pages?page=number", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const request = yield host.get(`/api/products/product/pages?page=${page}`);
                expect(request.body).to.have.property("docs");
                expect(request.body).to.have.property("totalDocs");
                expect(request.body).to.have.property("page").to.equal(page);
                expect(request.body).to.have.property("hasPrevPage");
                expect(request.body).to.have.property("nextPage");
                expect(request.body).to.have.property("categoriesObject");
            });
        });
        (0, mocha_1.it)("Iniciando test en /product/filters", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const request = yield host.get(`/api/products/product/filter?type=category&value=tableros&page=${page}`);
                expect(request.body).to.have.property("docs");
                expect(request.body).to.have.property("totalDocs");
                expect(request.body).to.have.property("page").to.equal(page);
                expect(request.body).to.have.property("hasPrevPage");
                expect(request.body).to.have.property("nextPage");
                expect(request.body).to.have.property("categoriesObject");
            });
        });
        (0, mocha_1.it)("Iniciando test en /product/id/:pid", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const request = yield host.get(`/api/products/product/id/67bcbe424221e5b87df0a5bf`);
                expect(request.body[0]).to.have.property("_id");
                expect(request.body[0]).to.have.property("title");
                expect(request.body[0]).to.have.property("price");
                expect(request.body[0]).to.have.property("description");
                expect(request.body[0]).to.have.property("images");
                expect(request.body[0]).to.have.property("category");
                expect(request.body[0]).to.have.property("stock");
                expect(request.body[0]).to.have.property("model");
                expect(request.body[0]).to.have.property("colors");
                expect(request.body[0]).to.have.property("createdAt");
                expect(request.body[0]).to.have.property("discount");
            });
        });
    });
});

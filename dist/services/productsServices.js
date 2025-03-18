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
const productsDao_1 = __importDefault(require("../dao/productsDao"));
class Products_Services {
    constructor(dao) {
        this.dao = dao;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.createProduct(product);
        });
    }
    ;
    productById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.productById(id);
        });
    }
    getProducts(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page) {
                return yield this.dao.getProducts(page);
            }
            else {
                return yield this.dao.getProducts();
            }
        });
    }
    getFilteredProducts(type, value, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dao.getFilteredProducts(type, value, page);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.deleteProduct(id);
        });
    }
    updateProduct(id, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.updateProduct(id, field, value);
        });
    }
}
const ProductsServices = new Products_Services(new productsDao_1.default());
exports.default = ProductsServices;

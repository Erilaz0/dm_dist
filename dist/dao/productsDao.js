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
const productsModel_1 = __importDefault(require("./models/productsModel"));
let limit = 12;
class ProductsDao {
    constructor() { }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsModel_1.default.create(product);
        });
    }
    ;
    productById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsModel_1.default.find({ _id: id });
        });
    }
    getProducts(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page) {
                return yield productsModel_1.default.find({});
            }
            else {
                //@ts-ignore
                return yield productsModel_1.default.paginate({}, { page, limit });
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsModel_1.default.deleteOne({ _id: id });
        });
    }
    getFilteredProducts(type, value, page) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "category":
                    //@ts-ignore
                    return yield productsModel_1.default.paginate({ category: value }, { page, limit });
                case "price":
                    //@ts-ignore
                    return yield productsModel_1.default.paginate({ price: { $lt: value } }, { page, limit });
                case "more_less":
                    try {
                        const valueToNumber = parseInt(value.toString());
                        if (valueToNumber === 1 || valueToNumber === -1) {
                            //@ts-ignore
                            return yield productsModel_1.default.paginate({}, { page, limit, sort: { price: valueToNumber } });
                        }
                        else {
                            return false;
                        }
                    }
                    catch (error) {
                        return error;
                    }
                case "query":
                    //@ts-ignore
                    return yield productsModel_1.default.paginate({
                        $or: [
                            { title: { $regex: value, $options: "i" } }, // Buscar en el campo "name"
                            { description: { $regex: value, $options: "i" } }, // Buscar en "description"
                            { category: { $regex: value, $options: "i" } }, // Buscar en "category"
                        ]
                    }, { limit, page });
            }
        });
    }
    updateProduct(id, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsModel_1.default.updateOne({ _id: id }, { $set: { [field]: value } });
        });
    }
}
;
exports.default = ProductsDao;

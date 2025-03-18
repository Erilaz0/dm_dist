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
exports.getPreference = exports.updateTheProduct = exports.productDelete = exports.productById = exports.getFilteredProducts = exports.getProducts = exports.productsCreation = void 0;
const productsServices_1 = __importDefault(require("../services/productsServices"));
const mongoose_1 = __importDefault(require("mongoose"));
const mercadopago_1 = require("mercadopago");
const productsCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = req.body;
    req.logger.info("Endpoint: /product/create");
    if (!newProduct || typeof (newProduct === null || newProduct === void 0 ? void 0 : newProduct.price) !== "number" || typeof (newProduct === null || newProduct === void 0 ? void 0 : newProduct.stock) !== "number") {
        res.status(400).json({ INVALID_DATA: "Product includes blacklisted characters or product doesn't exists" });
        req.logger.info("Endpoint: /product/create , data invalida");
    }
    else {
        req.logger.info("Endpoint: /product/create , ");
        const createProduct = yield productsServices_1.default.createProduct(newProduct);
        if (!createProduct) {
            res.status(400).json({ MESSAGE: "Cannot create Product" });
            req.logger.warn("Error, Endpoint: /product/create , createProduct metodo no ah podido crear el producto.");
        }
        else {
            req.logger.info("Endpoint: /product/create , producto creado, enviando confirmación.");
            res.status(200).json({ MESSAGE: "200OK" });
        }
    }
});
exports.productsCreation = productsCreation;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.warn("Endpoint: /product/pages");
    //OBTENEMOS DATOS DEL FRONTEND
    const pageString = req.query.page;
    const page = parseInt(pageString);
    //LLAMADAS A SERVICIOS
    req.logger.warn(`Endpoint: /product/pages , buscamos pagina ${page} y traemos todos los productos`);
    let getPaginationProducts = yield productsServices_1.default.getProducts(page);
    const getAllProducts = yield productsServices_1.default.getProducts();
    if (!getPaginationProducts || !getPaginationProducts.totalDocs || getPaginationProducts.page !== page || !getAllProducts) {
        res.status(400).json({ ERROR: "CANNOT GET PRODUCTS PAGE" });
        req.logger.warn("Error, Endponit: /product/pages, no se puede obtener productos de la db");
    }
    else {
        req.logger.info("Endponit: /product/pages, productos obtenidos");
        //ALMACENAMOS LAS CATEGORIAS PARA ENVIARLAS AL FRONTEND
        const categories = [];
        const categoriesObject = { categories: categories };
        getAllProducts.forEach((item) => {
            const find = categories.find((cat) => cat === item.category);
            if (!find) {
                categories.push(item.category);
            }
        });
        req.logger.info("Endponit: /product/pages , enviado productos y categorias del producto");
        getPaginationProducts = Object.assign(Object.assign({}, getPaginationProducts), { categoriesObject });
        res.status(200).json(getPaginationProducts);
    }
});
exports.getProducts = getProducts;
const getFilteredProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info("Endponit: /product/filter");
    const type = req.query.type;
    const value = req.query.value;
    const page = req.query.page;
    if (!type || !value || !page) {
        res.status(400).json({ MESSAGE: "QUERY DOESN'T EXISTS" });
        req.logger.info("Endponit: /product/filter, faltan querys");
    }
    else {
        req.logger.info("Endponit: /product/filter, querys encontradas, iniciando busqueda en la DB");
        let filter = yield productsServices_1.default.getFilteredProducts(type, value, page);
        if (!filter) {
            req.logger.info("Endponit: /product/filter, no se ah podidio obtener los productos filtrados");
            res.status(400).json({ MESSAGE: "CANNOT FILTER" });
        }
        else {
            req.logger.info("Endponit: /product/filter, inicando creacion de array de categorias");
            const categories = [];
            const categoriesObject = { categories: categories };
            const getAllProducts = yield productsServices_1.default.getProducts();
            if (!getAllProducts) {
                req.logger.warn("Endponit: /product/filter, no se pudo obtener productos para el array de categorias");
                res.status(400).json({ MESSAGE: "CANNOT GET CATEGORIES" });
            }
            else {
                req.logger.info("Endponit: /product/filter, creando array de categorias");
                getAllProducts.forEach((item) => {
                    const find = categories.find((cat) => cat === item.category);
                    if (!find) {
                        categories.push(item.category);
                    }
                });
                filter = Object.assign(Object.assign({}, filter), { categoriesObject });
                req.logger.info("Endponit: /product/filter, datos obtenidos, enviando al cliente");
                res.status(200).json(filter);
            }
        }
    }
});
exports.getFilteredProducts = getFilteredProducts;
const productById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info("Endopint: /product/id/:pid");
    const id = req.params.pid;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid Object PID" });
        req.logger.info("Endopint: /product/id/:pid , id no valido, tal ves no provenga de mongoose.");
    }
    else {
        req.logger.info(`Endopint: /product/id/:pid , Buscando producto con id: ${id}`);
        const product = yield productsServices_1.default.productById(id);
        if (!product) {
            req.logger.info(`Endopint: /product/id/:pid , producto con id ${id} no existe`);
            res.status(400).json({ message: `CANNOT GET PRODUCT BY ID ${id}` });
        }
        else {
            req.logger.info("Endopint: /product/id/:pid , enviando producto");
            res.status(200).json(product);
        }
    }
});
exports.productById = productById;
const productDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info(`Endpoint: /product/delete/:pid`);
    const id = req.params.pid;
    if (!mongoose_1.default.isValidObjectId(id)) {
        req.logger.info(`Endpoint: /product/delete/:pid , el id ${id} no es valido, tal vez no pertenezca a mongoose`);
        res.status(400).json({ ERROR: `INVALID PRODUCT ID ${id}` });
    }
    else {
        req.logger.info(`Endpoint: /product/delete/:pid , eliminando producto con id ${id}`);
        const deleteproduct = yield productsServices_1.default.deleteProduct(id);
        if (!deleteproduct) {
            req.logger.info(`Endpoint: /product/delete/:pid , no se ah podido eliminar el producto`);
            res.status(400).json({ ERROR: `CANNOT FIND OR DELETE PRODUCT BY ID ${id}` });
        }
        else {
            req.logger.info(`Endpoint: /product/delete/:pid , producto eliminado, enviando confirmación`);
            res.status(200).json({ MESSAGE: "Product Deleted" });
        }
    }
});
exports.productDelete = productDelete;
const updateTheProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info(`Endpoint: /product/update`);
    const { id, field, value } = req.query;
    if (!mongoose_1.default.isValidObjectId(id) || typeof id !== "string" || typeof field !== "string" || (typeof value !== "string" && typeof value !== "number")) {
        req.logger.info(`Endpoint: /product/update , error en los datos enviados.`);
        res.status(400).json({ MESSAGE: "Error in data type" });
    }
    else {
        req.logger.info(`Endpoint: /product/update , Actualizando Productos`);
        const update = yield productsServices_1.default.updateProduct(id, field, value);
        if (!update) {
            req.logger.info(`Endpoint: /product/update , no se ah podido actualizar este producto`);
            res.status(400).json({ MESSAGE: "Cannot update product" });
        }
        else {
            req.logger.info(`Endpoint: /product/update , producto actualizado, enviando confirmación`);
            res.status(200).json({ MESSAGE: "Product Updated Succesfully" });
        }
    }
});
exports.updateTheProduct = updateTheProduct;
const getPreference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logger.info(`Endpoint: /get-preference`);
    const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.ACCES_TOKEN });
    req.logger.info(client);
    req.logger.info(req.body);
    try {
        const items = req.body.map((item) => ({
            id: item.product.id,
            title: item.product.name,
            quantity: parseInt(item.product.quantity),
            unit_price: parseInt(item.product.price),
            currency_id: "UY"
        }));
        const body = {
            items: items,
            back_urls: {
                success: "https://dmotos.netlify.app",
                failure: "https://dmotos.netlify.app",
                pending: "https://dmotos.netlify.app"
            },
            auto_return: "approved",
        };
        const preference = new mercadopago_1.Preference(client);
        req.logger.info(preference);
        const result = yield preference.create({ body });
        req.logger.info(result);
        res.status(200).json({ id: result.id });
    }
    catch (error) {
        req.logger.info("Endpoint: /get-preference - ERROR");
        req.logger.info(error);
        res.status(400).json({ message: error });
    }
});
exports.getPreference = getPreference;

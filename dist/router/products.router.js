"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const winstone_1 = require("../logs/winstone");
const router = express_1.default.Router();
router.get("/product/pages", winstone_1.loggerMiddleware, productsController_1.getProducts);
router.get("/product/id/:pid", winstone_1.loggerMiddleware, productsController_1.productById);
router.get("/product/pages", winstone_1.loggerMiddleware, productsController_1.getProducts);
router.get("/product/filter", winstone_1.loggerMiddleware, productsController_1.getFilteredProducts);
router.post("/product/create", verifyJWT_1.default, winstone_1.loggerMiddleware, productsController_1.productsCreation);
router.post("/get-preference", winstone_1.loggerMiddleware, productsController_1.getPreference);
router.put("/product/update", verifyJWT_1.default, winstone_1.loggerMiddleware, productsController_1.updateTheProduct);
router.delete("/product/delete/:pid", verifyJWT_1.default, winstone_1.loggerMiddleware, productsController_1.productDelete);
exports.default = router;

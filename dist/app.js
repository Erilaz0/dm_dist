"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_router_1 = __importDefault(require("./router/products.router"));
const cors_1 = __importDefault(require("cors"));
const passport_router_1 = __importDefault(require("./router/passport.router"));
const config_1 = require("./config/config");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//agregar credenciales de produccion
dotenv_1.default.config({
    override: true,
    path: __dirname + "/.env.sample"
});
const app = (0, express_1.default)();
const PORT = config_1.config.PORT || process.env.PORT;
// O si usas express.json() en lugar de body-parser
app.use(express_1.default.json({ limit: '10mb' })); // Aquí también puedes configurar el límite
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true
}));
app.use("/api/products", products_router_1.default);
app.use("/", passport_router_1.default);
(0, passport_1.default)();
mongoose_1.default.connect(`${config_1.config.MONGODB || process.env.MONGODB}`)
    .then((connection) => console.log("MONGODB SERVER ALREADY RUNNING"))
    .catch((error) => console.log("Error, cannot connect with mongo"));
const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
process.on("SIGINT", () => {
    server.close(() => {
        console.log("SERVER CERRADO POR EL USUARIO");
        process.exit(0);
    });
});

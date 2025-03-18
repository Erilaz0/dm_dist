"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const winston_1 = __importDefault(require("winston"));
const level = process.env.LEVEL || "info";
let logger = null; // Inicialmente `null`
// Función para inicializar el logger correctamente
try {
    // Configurar Winston
    logger = winston_1.default.createLogger({
        level: level,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        transports: [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.simple()
            }),
        ]
    });
    logger.info("Logger inicializado correctamente.");
}
catch (error) {
    console.error("Error al leer el archivo de configuración:", error);
    logger = winston_1.default.createLogger({
        level: "info",
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        transports: [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.simple()
            }),
        ]
    });
}
// Middleware de logger (asegura que `logger` existe)
const loggerMiddleware = (req, res, next) => {
    if (!logger) {
        console.warn("Logger aún no ha sido inicializado. Usando consola por defecto.");
        req.logger = console; // Evita errores asignando un objeto con `log`, `warn`, etc.
    }
    else {
        req.logger = logger;
    }
    next();
};
exports.loggerMiddleware = loggerMiddleware;
// Exportamos la función para inicializar el logger y asegurarnos de que el servidor la use antes de iniciar

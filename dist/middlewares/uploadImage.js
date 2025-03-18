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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicialización de Firebase Admin (asegúrate de que Firebase esté inicializado correctamente)
const bucket = firebase_admin_1.default.storage().bucket(); // Esto es para obtener el bucket de Firebase
const uploadImagesMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.body.images; // Aquí asumo que las imágenes están en el body como Base64
        if (!files || !Array.isArray(files) || files.length === 0) {
            return res.status(400).send('No images provided.');
        }
        const imagesData = []; // Arreglo para almacenar la estructura deseada
        // Usar un array de promesas para manejar la subida de imágenes
        const uploadPromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                // Eliminar el prefijo Base64 de la imagen
                const base64Data = file.replace(/^data:image\/(jpeg|png|gif);base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64'); // Convertir la Base64 a un buffer
                console.log(buffer);
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`; // Generar un nombre único para el archivo
                const firebaseFile = bucket.file(`images/${fileName}`);
                // Crear un stream de escritura para subir el archivo a Firebase Storage
                const stream = firebaseFile.createWriteStream({
                    metadata: {
                        contentType: 'image/jpeg', // Asegúrate de ajustar el tipo MIME si es otro tipo de imagen
                    },
                });
                stream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        // Obtener la URL pública
                        yield firebaseFile.makePublic();
                        const publicUrl = `https://storage.googleapis.com/${bucket.name}/images/${firebaseFile.name}`;
                        console.log();
                        imagesData.push({ image: publicUrl }); // Guardar la URL en el array
                        resolve(true);
                    }
                    catch (error) {
                        console.error('Error making the file public:', error);
                        reject(new Error('Error making the file public.'));
                    }
                }));
                stream.on('error', (error) => {
                    console.error('Error uploading the image:', error);
                    reject(new Error('Error uploading the image.'));
                });
                stream.end(buffer); // Enviar el buffer de la imagen al stream para subirla a Firebase
            });
        });
        // Espera a que todas las imágenes sean procesadas
        yield Promise.all(uploadPromises);
        // Cuando todas las imágenes estén procesadas, continuamos con el siguiente middleware o acción
        req.body.images = imagesData; // Guardar la URL en el cuerpo de la solicitud (NO base64, sino las URLs)
        next(); // Pasar al siguiente middleware
    }
    catch (error) {
        console.error('Error in image upload middleware:', error);
        res.status(500).send('Error processing images.');
    }
});
exports.default = uploadImagesMiddleware;

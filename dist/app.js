"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const logger_middleware_1 = require("./middleware/logger.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_middleware_1.logger);
app.use(express_1.default.json());
// Swagger Documentation Route
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
//     explorer: true,
//     customCss: '.swagger-ui .topbar { display: none }',
//     customSiteTitle: "Your API Documentation",
//     swaggerOptions: {
//         persistAuthorization: true,
//         displayRequestDuration: true,
//         filter: true,
//         tryItOutEnabled: true
//     }
// }));
// Mount the unified route with `/api` prefix here
app.use('/api/v2', logger_middleware_1.logger, routes_1.default);
// ⚠️ IMPORTANT: Error handler must be LAST middleware
// It catches errors from all previous middleware and routes
app.use(error_middleware_1.errorHandler);
exports.default = app;

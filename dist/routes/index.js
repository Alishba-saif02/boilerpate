"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
// import cartRoutes from '../routes/cart.route'
const router = (0, express_1.Router)();
router.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});
router.use('/auth', auth_route_1.default);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.route.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_middleware_1.validateRequest)(auth_validator_1.registerSchema), auth_controller_1.register);
router.post('/login', (0, validate_middleware_1.validateRequest)(auth_validator_1.loginSchema), auth_controller_1.login);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, type = 'body') => {
    return (req, res, next) => {
        const dataToValidate = type === 'body' ? req.body : type === 'params' ? req.params : req.query;
        const result = schema.safeParse(dataToValidate);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }
        // Update the original data
        if (type === 'body')
            req.body = result.data;
        else if (type === 'params')
            req.params = result.data;
        else if (type === 'query')
            req.query = result.data;
        next();
    };
};
exports.validateRequest = validateRequest;

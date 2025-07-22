import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
            contact: {
                name: 'API Support',
                email: 'support@yourapi.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://your-production-url.com',
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User unique identifier'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        phone: {
                            type: 'string',
                            description: 'User phone number',
                            nullable: true
                        },
                        role: {
                            type: 'string',
                            enum: ['USER', 'ADMIN'],
                            description: 'User role'
                        },
                        isEmailVerified: {
                            type: 'boolean',
                            description: 'Email verification status'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Account creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        },
                        message: {
                            type: 'string'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    $ref: '#/components/schemas/User'
                                },
                                tokens: {
                                    type: 'object',
                                    properties: {
                                        accessToken: {
                                            type: 'string'
                                        },
                                        refreshToken: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: {
                                        type: 'string'
                                    },
                                    message: {
                                        type: 'string'
                                    }
                                }
                            },
                            description: 'Validation errors (if any)'
                        }
                    }
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: [
        './src/routes/*.ts',           // For route definitions
        './src/docs/*.ts',             // For swagger documentation
        './src/controllers/*.ts',      // For additional schemas if needed
        './src/models/*.ts'            // For model schemas if needed
    ]
};

export const specs = swaggerJsdoc(options);
export { swaggerUi };
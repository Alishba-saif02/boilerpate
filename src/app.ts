// src/app.ts
import express from 'express';
import routes from './routes';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import { specs, swaggerUi } from './config/swagger';


const app = express();

app.use(express.json());
app.use(logger);


app.use(express.json());

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
app.use('/api/v2', logger,routes);



// ⚠️ IMPORTANT: Error handler must be LAST middleware
// It catches errors from all previous middleware and routes
app.use(errorHandler);

export default app;

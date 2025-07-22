// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.route';

// import cartRoutes from '../routes/cart.route'


const router = Router();

router.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRoutes);
export default router;

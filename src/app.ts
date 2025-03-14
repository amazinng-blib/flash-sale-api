import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorhandler';
import { connectDB } from './config/mongoDbConfig';
import rateLimit from 'express-rate-limit';
import { dailyCheckFlashSale } from './utils/flashSaleSchedularChecker';
import { userAgentBlocker } from './middleware/user-agent-blocker';

import path from 'path';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(userAgentBlocker);
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger/swagger-options';

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist'))
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import { router as authRoutes } from './routes/auth-routes';
import { router as orderRoutes } from './routes/order-routes';
import { router as productRoutes } from './routes/product-routes';
import { router as flashSaleRoutes } from './routes/flash-sale-routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/flash-sale', flashSaleRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Health check testing!!');
});

app.use(errorHandler);
dailyCheckFlashSale();
export default app;

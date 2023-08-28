import express from 'express';
import productRoute from './routes/product.route';
import orderRoute from './routes/order.route';
import loginRoute from './routes/login.route';

const app = express();

app.use(express.json());
app.use('/products', productRoute);
app.use('/', orderRoute);
app.use('/login', loginRoute);

export default app;

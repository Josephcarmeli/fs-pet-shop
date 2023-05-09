import express from 'express';
import petRouter from './routes/petRoute.js';

const app = express();
app.use(express.json());

app.use("/pets", petRouter);

export default app;
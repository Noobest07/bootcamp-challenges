import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { userRouter, favRouter } from './api/routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Dirname ', path.resolve(__dirname, `${process.env.NODE_ENV}.env`));
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

// Connect to db
const dbConnection = process.env.DB_STRING_CONNECTION;

console.log('dbConecction ', dbConnection);
await mongoose.connect(dbConnection);

// Listener to connection error
mongoose.connection.on('error', function (e) {
  console.error('ERROR: ', e);
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', favRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

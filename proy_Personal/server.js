import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { userRouter, taskListRouter } from './api/routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
  });
}

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
app.use('/api', taskListRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

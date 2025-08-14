import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata';
import Container from 'typedi';
import { FirebaseAppService } from './modules/firebase/firebase.service';
import { instructorRouter } from './modules/instructor/router';
import { studentRouter } from './modules/student/router';

const app = express();
dotenv.config();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

Container.get(FirebaseAppService)

app.use('/instructor', instructorRouter )
app.use('/student', studentRouter )

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
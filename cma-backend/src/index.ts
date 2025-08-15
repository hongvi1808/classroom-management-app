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
import { expressjwt } from 'express-jwt';
import { authRoleMiddleware } from './utils/role.middleware';
import { ROLE_INSTRCTOR, ROLE_STUDENT } from './utils/constant';
import { authenRouter } from './modules/authentication/router';

const app = express();
dotenv.config();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

Container.get(FirebaseAppService)

app.use('/auth', authenRouter)
app.use(expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET || '',
  algorithms: ['HS256'],
  credentialsRequired: false,

}))

app.use('/instructor', authRoleMiddleware(ROLE_INSTRCTOR), instructorRouter)
app.use('/student', authRoleMiddleware(ROLE_STUDENT), studentRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata';
import Container from 'typedi';
import { instructorRouter } from './modules/instructor/router';
import { studentRouter } from './modules/student/router';
import { expressjwt } from 'express-jwt';
import { authRoleMiddleware } from './utils/role.middleware';
import { ROLE_INSTRCTOR, ROLE_STUDENT } from './utils/constant';
import { authenRouter } from './modules/authentication/router';
import { FirebaseAppService } from './modules/firebase/firebase.service';
import { errorResponse } from './utils/response';
import http from "http";
import { handleError } from './utils/auth.middleware';
import { SocketService } from './modules/socket/socket.service';
import { initSocketServer } from './modules/socket';
import { Server } from 'socket.io'

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true,   }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

Container.get(FirebaseAppService);
//connect socket 
const httpServer = http.createServer(app);
initSocketServer(httpServer)
app.use('/auth', authenRouter)
app.use(expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET || '',
  algorithms: ['HS256'],
  credentialsRequired: false,
  requestProperty: "user",
}))

app.use('/instructor', authRoleMiddleware(ROLE_INSTRCTOR), instructorRouter)
app.use('/student', authRoleMiddleware(ROLE_STUDENT), studentRouter)



//  socketServer.init(httpServer)
// middleware bắt lỗi
app.use((err: any, req: any, res: any, next: any) => handleError(err, res));
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
// httpServer.listen(parseInt(PORT || '3456'));

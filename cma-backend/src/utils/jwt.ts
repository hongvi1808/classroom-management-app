import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET } = process.env;

export const generateAccessToken = (
  payload: { userId: string; role: string },
  secret?: string,
) => {
  return new Promise((resolve, reject) => {
    const options: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1h',
    };
    jwt.sign(payload,
      secret || ACCESS_TOKEN_SECRET || '',
      options,
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
  });
};
import jwt from 'jsonwebtoken';
import tokenConfig from './tokenConfig';

export default function verifyJwtToken(token) {
  const secretKey = tokenConfig.secret;
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      Buffer.from(secretKey, 'base64'),
      { algorithms: ['HS256'] },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      },
    );
  });
}

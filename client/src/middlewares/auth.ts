import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export interface User {
  id: string;
  name: string;
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, secret) as User;
    return decoded;
  } catch (err) {
    return null;
  }
}

import { verifyToken, User } from './auth';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withAuth(handler: NextApiHandler) {
  return async (req: any, res: NextApiResponse) => {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = verifyToken(token) as User;

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    req.user = user;
    return handler(req, res);
  };
}

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, 'supersecret') as {
      email: string;
      id: string;
    };
    if (!decodedToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

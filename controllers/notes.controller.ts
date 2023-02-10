import { Request, Response } from 'express';

export function getNote(req: Request, res: Response) {
  console.log(req.body);
}

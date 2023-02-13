import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

export const loginController = async (req: Request, res: Response) => {
  console.log(req.body);
};

export const signupController = async (req: Request, res: Response) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  let existingUser: any;

  try {
    existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    let hashedPassword: string;

    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    let user: any;

    try {
      user = await UserModel.create({ email, password: hashedPassword, name });
      await user.save();
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    let token: string;

    try {
      token = jwt.sign({ email: user.email, id: user._id }, 'test', {
        expiresIn: '1h',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Loggin in failed. Try again later' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
};

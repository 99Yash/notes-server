import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, UserDoc } from '../models/user.model';
import bcrypt from 'bcrypt';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }

  let existingUser: any;
  let token: string;
  try {
    existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).send('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }
    token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'supersecret',
      { expiresIn: '1d' }
    );
    res.status(200).send({ existingUser, token });
  } catch (err) {
    return res.status(500).send('Logging in failed. Try again later');
  }
};

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).send('All fields are required');
  }

  let existingUser: any;
  let user: any;
  let token: string;

  try {
    existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }
    let hashedPassword: string;
    hashedPassword = await bcrypt.hash(password, 12);
    user = await UserModel.create({ email, password: hashedPassword, name });
    await user.save();
    token = jwt.sign({ email: user.email, id: user._id }, 'supersecret', {
      expiresIn: '1d',
    });
    res.status(201).send({
      user,
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Logging in failed. Try again later' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user: UserDoc | null;
  try {
    user = await UserModel.findById(id);
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.status(200).send(user);
};

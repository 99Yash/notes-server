import { Request, Response } from 'express';
import { NoteDoc, NoteModel } from '../models/note.model';
import { UserDoc, UserModel } from '../models/user.model';

interface RequestWithUser extends Request {
  user: UserDoc;
}

export const createNoteHandler = async (req: Request, res: Response) => {
  console.log(req.body);

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let createdNote = await NoteModel.create({ title, content });

  // let user: UserDoc | undefined = req.user;

  // let foundUser: UserDoc | null;
  // try {
  //   foundUser = await UserModel.findById(req.user?._id);
  // } catch (err: any) {
  //   return res.status(500).json({ message: 'Something went wrong' });
  // }
  // if (!foundUser) {
  //   return res.status(404).json({ message: 'User not found' });
  // }
  try {
    await createdNote.save();
    // foundUser.notes.push(createdNote);
  } catch (err: any) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  res.status(201).json({
    message: 'Note created successfully',
  });
};

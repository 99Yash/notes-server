import { Request, Response } from 'express';
import { NoteDoc, NoteModel } from '../models/note.model';
import { UserDoc, UserModel } from '../models/user.model';
interface Note {
  _id: string;
  title: string;
  content: string;
  user: string;
}

export const getNotesHandler = async (req: Request, res: Response) => {
  let notes: NoteDoc[] | undefined;
  try {
    notes = await NoteModel.find();
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  res.status(200).send(notes);
};

export const createNoteHandler = async (req: Request, res: Response) => {
  // const authHeader = req.headers.authorization;
  // if (!authHeader) {
  //   return res.status(401).send('Unauthorized');
  // }
  // const token = authHeader.split(' ')[1];
  // try {
  //   const decoded = jwt.verify(token, 'supersecret') as {
  //     email: string;
  //     id: string;
  //   };
  //   const userId = decoded.id;
  //   // const userId = req.body.user.user._id;
  //   const foundUser = await UserModel.findById(userId);
  //   if (!foundUser) {
  //     return res.status(404).send('User not found');
  //   }
  //   const { title, content } = req.body.note;
  //   console.log(req.body);
  //   if (!title || !content) {
  //     return res.status(400).send('All fields are required');
  //   }
  //   const newNoteData: Omit<Note, '_id'> = {
  //     title,
  //     content,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   const newNote = await NoteModel.create(newNoteData);
  //   foundUser.notes.push(newNote);
  //   await foundUser.save();
  //   res.status(201).send(newNote);
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).send('internal server error');
  // }

  let foundUser: UserDoc | null;
  try {
    foundUser = await UserModel.findById(req.body.user.user._id);
  } catch (err: any) {
    return res.status(401).send({ message: 'Something went wrong' });
  }
  if (!foundUser) {
    return res.status(404).send({ message: 'User not found' });
  }

  const { title, content } = req.body.note;
  if (!title || !content) {
    return res.status(400).send('All fields are required');
  }

  const newNoteData: Omit<Note, '_id'> = {
    title,
    content,
    user: foundUser._id,
  };
  let createdNote: any;

  try {
    createdNote = await NoteModel.create(newNoteData);
    await createdNote.save();
  } catch (err: any) {
    return res.status(403).send('Internal server error');
  }
  try {
    foundUser.notes.push(createdNote);
    await foundUser.save();
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  res.status(201).send({
    id: createdNote._id,
    title: createdNote.title,
    content: createdNote.content,
  });
};

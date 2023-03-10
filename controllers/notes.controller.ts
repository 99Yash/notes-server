import { Request, Response } from 'express';
import { NoteDoc, NoteModel } from '../models/note.model';
import { UserDoc, UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
interface Note {
  _id: string;
  title: string;
  content: string;
  user: string;
}

export const getNoteById = async (req: Request, res: Response) => {
  let note: NoteDoc | null;
  try {
    note = await NoteModel.findById(req.params.id);
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  if (!note) {
    return res.status(404).send('Note not found');
  }
  res.status(200).send(note);
};

export const getNotesByUserId = async (req: Request, res: Response) => {
  let notes: NoteDoc[] | undefined;
  try {
    notes = await NoteModel.find({ user: req.params.userId });
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  if (!notes) {
    return res.status(404).send('Notes not found');
  }
  res.status(200).send(notes);
};

export const createNoteHandler = async (req: Request, res: Response) => {
  let foundUser: UserDoc | null;
  try {
    let userId: string;
    userId = req.body.user.user._id || req.body.user.user.user._id;
    foundUser = await UserModel.findById(userId);
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

export const updateNoteHandler = async (req: Request, res: Response) => {
  const { title, content } = req.body.note;
  if (!title || !content) {
    return res.status(400).send('All fields are required');
  }

  let note: NoteDoc | null;
  try {
    note = await NoteModel.findById(req.params.id);
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  if (!note) {
    return res.status(404).send('Note not found');
  }
  const userId = req.body.user.user._id || req.body.user.user.user._id;
  if (note.user.toString() !== userId) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  note.title = title;
  note.content = content;
  try {
    await note.save();
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  res.status(200).send({ message: 'Note updated' });
};

export const deleteNoteHandler = async (req: Request, res: Response) => {
  let note: NoteDoc | null;
  try {
    note = await NoteModel.findById(req.params.id);
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  if (!note) {
    return res.status(404).send('Note not found');
  }
  let decodedToken: { email: string; id: string };
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    decodedToken = jwt.verify(token, 'supersecret') as {
      email: string;
      id: string;
    };
    if (!decodedToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  if (note.user.toString() !== decodedToken.id) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    await note.remove();
  } catch (err: any) {
    return res.status(500).send('Something went wrong');
  }
  res.status(200).send({ message: 'Note deleted' });
};

import { Document, Schema, Types, model } from 'mongoose';

export interface NoteDoc extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: Types.ObjectId;
}

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Note = model<NoteDoc>('Note', noteSchema);

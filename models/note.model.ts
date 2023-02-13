import { Document, Schema, Types, model } from 'mongoose';
import { UserDoc } from './user.model';

export interface NoteDoc extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserDoc['_id'];
}

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // user: { type: Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = model<NoteDoc>('Note', noteSchema);

import { Document, Schema, Types, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { NoteDoc } from './note.model';
export interface UserDoc extends Document {
  email: string;
  name: string;
  password: string;
  notes: NoteDoc['_id'];
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: Types.ObjectId,
      ref: 'Note',
      default: [],
    },
  ],
});

userSchema.plugin(mongooseUniqueValidator);

export const UserModel = model<UserDoc>('User', userSchema);

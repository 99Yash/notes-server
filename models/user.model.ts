import { Document, Schema, Types, model } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  name: string;
  password: string;
  notes: Types.ObjectId[];
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
    },
  ],
});

export const UserModel = model<UserDoc>('User', userSchema);

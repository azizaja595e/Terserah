import { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, {
  timestamps: true,
});

export default userSchema;
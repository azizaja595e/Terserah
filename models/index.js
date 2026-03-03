import mongoose from 'mongoose';
import UserSchema from './schemas/user.js';
// Pastikan menambahkan ekstensi .js jika kamu menjalankan ini di Node.js murni
import PostSchema from './schemas/board.js';

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema, "posts");
export const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");
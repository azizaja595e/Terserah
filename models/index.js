import mongoose from 'mongoose';
import userSchema from './schemas/user.js';
// Pastikan menambahkan ekstensi .js jika kamu menjalankan ini di Node.js murni
import PostSchema from './schemas/board.js';

export const Post = mongoose.model('Post', PostSchema);
export const User = mongoose.model('User', userSchema); 
import mongoose from 'mongoose';
// Pastikan menambahkan ekstensi .js jika kamu menjalankan ini di Node.js murni
import PostSchema from './schemas/board.js';

export const Post = mongoose.model('Post', PostSchema);
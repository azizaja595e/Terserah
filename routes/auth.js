import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import userSchema from '../models/schemas/user.js'; 
import jwt from 'jsonwebtoken';
import { getJwtSecret} from '../config/env.js';

const router = express.Router();
const User = mongoose.model('User', userSchema);


// Fungsi hash sederhana (Latihan)
const hashSHA256 = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

// --- Registrasi ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password: hashSHA256(password)
    });
    await newUser.save();
    res.status(201).json({ message: "User Terdaftar!" });

    let emailSent = false;
    try{
      emailSent = await sendSignupSuccessEmail({
        to: newUser.email,
        username: newUser.name
      });
    } catch (emailError) {
      console.error('Failed to send signup email:', mailError.message);
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Login ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === hashSHA256(password)) {
      const token = jwt.sign(
        { sub: user._id.toString(), username: user.name}, 
        getJwtSecret(),
        { expiresIn: '1h'}
      );
      res.json({result:'success', token});

    } else {
      res.status(401).json({ message: "Email atau Password salah" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
import express from 'express';
import noteRouter from './routes/note.js';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoute.js";
import { Post } from './models/index.js'; // Import named export menggunakan { }
import userRouter from './routes/auth.js';

dotenv.config();

const app = express()

mongoose.connect('mongodb+srv://azizaja595:47474846@aziz.tqem1qd.mongodb.net/?appName=Aziz')
  .then(() => {
    console.log('Berhasil terhubung ke MongoDB');
  })
  .catch((err) => {
    console.error('Gagal koneksi ke MongoDB;', err);
  });

app.use(express.json());
app.use(cors());

// app.options('*', cors());

app.get("/", (req,res) => {
  res.send("Hello Midtrans!");
});



app.use('/auth', userRouter);
app.use('/notes', noteRouter);

app.use('/payment', paymentRoutes);

app.use((req,res,next) => {
    if(false) {
        next(new Error('Kau tuh salah tekak bantah'));
        return;
    }
    next ();
})

app.use((req,res,next) => {
    console.log(`Kau kesini dulu ${req.path}`);
    next();
});

app.get('/',(req,res) => {
    res.send('Hello Ziz!');
});

app.get('/say/:greeting', (req,res) => {
    const { greeting } = req.params;
    res.send( greeting );
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.use((err,req,res,next) => {
    res.send('Error dong');
});

 // Middleware JWT Required
 function jwtRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ada"});
  }

  const token = authHeader.split(" ") [1];
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  
  } catch (err) {
    return res.status(401).json({ message: "Token Tidak Valid"})
  }

 }

app.use('/notes', noteRouter);
export { jwtRequired }



app.use((req, res, next) => {
  res.status(404);
  res.send({
    result: 'fail',
    error: `Page not found ${req.path}`
  });
});

app.listen(3000, () => {
    console.log('Server jalan di http://localhost:3000');
});

export default app;
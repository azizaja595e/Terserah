// routes/note.js
import { Router } from 'express';
import * as Note from '../models/note.js'; // Mengimpor semua named exports sebagai object Note
import { Post } from '../models/index.js';

const router = Router();

// router.get('/', (req, res, next) => {
//   const notes = Note.list();
//   res.json(notes);
// });
router.get("/", async(req, res) => {
  try{
    const notes = await Post.find();
    res.status(200).json(notes);
  }catch(e){
    res.status(500).json({error: "Gagal mengambil data catatan"})
  }
})
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const note = Note.get(id); // Memanggil fungsi get yang sudah di-export
    res.json(note);
  } catch (e) {
    next(e); // Melempar error ke middleware penanganan error
  }
});

router.post('/', async(req, res, next) => {

  const { title, content } = req.body;   // Mengambil data dari body request
  
  if(!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try{
    // const note = Note.create(title, content);      // Memanggil fungsi create dari model
    const note = await Post.create({
      title: title,
      content: content,
    });
    res.status(201).json(note); 
  } catch (e) {
    next (e);
  }
  // res.json(note);      // Mengirimkan hasil catatan baru dalam format JSON
});

router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    // Memanggil logika update dari model
    const note = Note.update(id, title, content);
    res.json(note);
  } catch (e) {
    // Meneruskan error ke middleware penanganan error global
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  
  try {
    // Memanggil fungsi remove yang kita buat di model tadi
    Note.remove(id);
    
    // Memberikan respon sukses jika tidak ada error
    res.json({ result: 'success' });
  } catch (e) {
    // Melempar error 'Note not found' ke handler error global
    next(e);
  }
});

export default router; // Menggunakan default export supaya bisa di-import dengan nama bebas di server.js
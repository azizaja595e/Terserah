// routes/note.js
import { Router } from 'express';
import * as Note from '../models/note.js'; // Mengimpor semua named exports sebagai object Note
import { Post } from '../models/index.js';
import { jwtRequired } from '../index.js';

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

// [Get By id Local]
// router.get('/:id', (req, res, next) => {
//   const id = Number(req.params.id);
//   try {
//     const note = Note.get(id); // Memanggil fungsi get yang sudah di-export
//     res.json(note);
//   } catch (e) {
//     next(e); // Melempar error ke middleware penanganan error
//   }
// });

//[Get By Id MongoDB]
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // Mencari dokumen berdasarkan ID di MongoDB
    const note = await Post.findById(id);

    if (!note) {
      return res.status(404).json({ 
        message: 'Catatan tidak ditemukan' 
      });
    }

    res.json(note);
  } catch (error) {
    // Menangani error jika format ID salah atau masalah koneksi
    next(error);
  }
});

router.post('/', jwtRequired, async(req, res, next) => {

  const { title, content, author } = req.body;   // Mengambil data dari body request
  
  if(!title || !content || !author) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try{
    // const note = Note.create(title, content);      // Memanggil fungsi create dari model
    const note = await Post.create({
      title: title,
      content: content,
      author : author,
    });
    res.status(201).json(note); 
  } catch (e) {
    next (e);
  }
  // res.json(note);      // Mengirimkan hasil catatan baru dalam format JSON
});

//[Put Local]
// router.put('/:id', (req, res, next) => {
//   const id = Number(req.params.id);
//   const { title, content } = req.body;

//   try {
//     // Memanggil logika update dari model
//     const note = Note.update(id, title, content);
//     res.json(note);
//   } catch (e) {
//     // Meneruskan error ke middleware penanganan error global
//     next(e);
//   }
// });

//[Put MongoDB]
router.put('/:id', jwtRequired, async (req, res, next) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    // findByIdAndUpdate(id, data_baru, options)
    const updatedNote = await Post.findByIdAndUpdate(
      id, 
      { title, content, author }, 
      { new: true, runValidators: true } // 'new: true' agar mengembalikan data SETELAH diupdate
    );

    // Jika ID tidak ditemukan di database
    if (!updatedNote) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    res.json(updatedNote);
  } catch (error) {
    // Menangani error validasi atau error database lainnya
    next(error);
  }
});

// [Delete Local]
// router.delete('/:id', (req, res, next) => {
//   const id = Number(req.params.id);
  
//   try {
//     // Memanggil fungsi remove yang kita buat di model tadi
//     Note.remove(id);
    
//     // Memberikan respon sukses jika tidak ada error
//     res.json({ result: 'success' });
//   } catch (e) {
//     // Melempar error 'Note not found' ke handler error global
//     next(e);
//   }
// });

//Delete MongoDB
// Tambahkan async agar bisa menggunakan await
router.delete('/:id', jwtRequired, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Mencari dokumen berdasarkan ID dan langsung menghapusnya
    const deletedNote = await Post.findByIdAndDelete(id);

    // Jika deletedNote null, berarti data dengan ID tersebut tidak ada
    if (!deletedNote) {
      return res.status(404).json({ 
        message: "Catatan tidak ditemukan, gagal menghapus." 
      });
    }

    // Memberikan respon sukses
    res.json({ 
      result: 'success',
      message: `Catatan dengan ID ${id} berhasil dihapus`
    });
  } catch (error) {
    // Melempar error ke middleware penanganan error (misal: format ID salah)
    next(error);
  }
});

export default router; // Menggunakan default export supaya bisa di-import dengan nama bebas di server.js
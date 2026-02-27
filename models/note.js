// models/note.js
let notes = [
  {
    id: 1,
    title: 'first note',
    content: 'My first note is here.'
  }
];

// Menggunakan named export
export const list = () => {
  return notes.map(({ id, title, author }) => ({
    id,
    title,
    author
  }));
};

// Asumsi variabel 'notes' sudah didefinisikan di bagian atas file
export const get = (id) => {
  const note = notes.find(
    (note) => note.id === id
  );
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

// Fungsi untuk membuat catatan baru
export const create = (title, content, author) => {
  // Mengambil ID terakhir dari array notes
  const { id: lastId } = notes[notes.length - 1];
  
  const newNote = {
    id: lastId + 1,
    title,
    content,
    author
  };
  
  notes.push(newNote);
  return newNote;
};

export const update = (id, title, content, author) => {
  // Mencari indeks catatan di dalam array
  const index = notes.findIndex(
    (note) => note.id === id
  );

  // Validasi jika catatan tidak ditemukan
  if (index < 0) {
    throw new Error('Note not found for update');
  }

  // Melakukan pembaruan data pada indeks tersebut
  const note = notes[index];
  note.title = title;
  note.content = content;
  note.author = author;
  
  notes[index] = note;
  return note;
};

// Menggunakan named export 'remove'
export const remove = (id) => {
  // Mengecek apakah ada catatan dengan ID tersebut
  if (!notes.some((note) => note.id === id)) {
    throw new Error('Note not found for delete');
  }

  // Memperbarui array notes dengan membuang note yang ID-nya cocok
  // Pastikan variabel 'notes' didefinisikan dengan 'let' agar bisa diubah
  notes = notes.filter((note) => note.id !== id);
  
  return;
};



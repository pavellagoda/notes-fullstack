import Express from 'express';
import config from './config';
import { NoteItem } from '@notes/common';

const app = Express();

app.use(Express.json());

const notes: NoteItem[] = [
  {
    id: 1,
    content:
      'Content 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 2,
    content:
      'Content 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 3,
    content:
      'Content 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
];

app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === parseInt(id, 10));
  if (!note) {
    return res.status(404).json({
      error: 'Note not found',
    });
  }
  return res.json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const { id, ...rest }: NoteItem = req.body;

  const noteIndex = notes.findIndex((note) => note.id === Number(id));
  if (noteIndex === -1) {
    return res.status(404).json({
      error: 'Note not found',
    });
  }

  notes[noteIndex] = {
    id,
    ...rest,
  };
  return res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { ...note }: NoteItem = req.body;
  notes.push({
    ...note,
    id: notes.length + 1,
  });

  return res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex((note) => note.id === Number(id));
  if (noteIndex === -1) {
    return res.status(404).json({
      error: 'Note not found',
    });
  }

  notes.splice(noteIndex, 1);

  return res.json(notes);
});

app.listen(config.PORT);

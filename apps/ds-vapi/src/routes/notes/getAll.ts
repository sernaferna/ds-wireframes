import express, { Request, Response } from 'express';
import { notesDB } from '../../services/notes-db';
import { Note } from '@devouringscripture/common';

export const getAllNotes = () => {
  const response = notesDB.getObject<Note[]>('/notes');
  return response;
};

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = getAllNotes();
    res.send(response);
  } catch (err) {
    res.send([]);
  }
});

export { router as getAllNotesRouter };

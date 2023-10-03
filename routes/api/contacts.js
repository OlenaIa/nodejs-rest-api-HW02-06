import express from 'express';
import { deleteContact, getAll, getById, patchFavorite, postContact, putContact } from '../../controllers/contacts.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', postContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', putContact);
router.patch('/:contactId/favorite', patchFavorite)

export default router;
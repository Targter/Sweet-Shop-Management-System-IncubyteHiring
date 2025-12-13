import { Router } from 'express';
import { 
  getAllSweets, 
  searchSweets, 
  createSweet, 
  updateSweet, 
  deleteSweet 
} from '../controllers/sweetController';

import { verifyToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public Routes
router.get('/', getAllSweets);
router.get('/search', searchSweets);

// Protected Admin Routes
router.post('/', verifyToken, isAdmin, createSweet);
router.put('/:id', verifyToken, isAdmin, updateSweet);
router.delete('/:id', verifyToken, isAdmin, deleteSweet);

export default router;
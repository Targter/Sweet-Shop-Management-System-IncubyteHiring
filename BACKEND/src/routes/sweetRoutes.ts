import { Router } from 'express';
import { 
  getAllSweets, 
  searchSweets, 
  createSweet, 
  updateSweet, 
  deleteSweet, 
  purchaseSweet,
  restockSweet
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

// 
router.post('/:id/purchase', verifyToken, purchaseSweet); // User or Admin
router.post('/:id/restock', verifyToken, isAdmin, restockSweet); // Admin only

export default router;
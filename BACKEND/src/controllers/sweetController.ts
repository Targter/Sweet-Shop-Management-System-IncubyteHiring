import { Request, Response } from 'express';
import Sweet from '../models/Sweet';

// List all (Public)
export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Search (Public)
export const searchSweets = async (req: Request, res: Response) => {
  try {
     const { q, category, minPrice, maxPrice } = req.query;

    const filter: any = {};

    // Name search
    if (q) {
      filter.name = { $regex: q as string, $options: "i" };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create (Admin)
export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ error: 'Error creating sweet' });
  }
};

// Update (Admin)
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ error: 'Error updating sweet' });
  }
};

// Delete (Admin)
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.json({ message: 'Sweet deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting sweet' });
  }
};
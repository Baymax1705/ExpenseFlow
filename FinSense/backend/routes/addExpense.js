import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/addexpense', async (req, res) => {
  const { userId, date, amount, merchant, category, notes, recurring } = req.body;

  if (!userId || !date || !amount || !merchant || !category || recurring === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const newExpense = {
      date,
      amount,
      merchant,
      category,
      notes,
      recurring,
    };

    user.expenses.push(newExpense);
    await user.save();

    res.status(201).json({ message: 'Expense added successfully.', expense: newExpense });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while adding the expense.' });
  }
});

export default router;
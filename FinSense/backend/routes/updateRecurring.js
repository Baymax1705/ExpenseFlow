import express from "express";
import User from "../models/userModel.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Route to update recurring field to false
router.put("/update-recurring/:expenseId", authenticate, async (req, res) => {
  const { expenseId } = req.params;
  const userId = req.user.id; // Assuming `authenticate` middleware adds `user` to `req`

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const expense = user.expenses.id(expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }

    // Update recurring field to false
    expense.recurring = false;
    await user.save();

    res.status(200).json({ message: "Recurring expense updated successfully.", expense });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the expense." });
  }
});

export default router;
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  recurring: {
    type: Boolean,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [expenseSchema], // Embedded array of expenses
});

export default mongoose.model('User', userSchema);
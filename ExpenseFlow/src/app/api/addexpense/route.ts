import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: 'Authorization token is required or invalid.' }, { status: 401 });
    }

    const { date, amount, merchant, category, notes, recurring } = await req.json();

    if (!date || !amount || !merchant || !category || recurring === undefined) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const newExpense = {
      date,
      amount,
      merchant,
      category,
      notes,
      recurring,
    };

    user.expenses.push(newExpense as any);
    await user.save();

    return NextResponse.json({ message: 'Expense added successfully.', expense: newExpense }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while adding the expense.', details: error.message }, { status: 500 });
  }
}

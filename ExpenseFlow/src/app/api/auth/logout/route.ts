import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    await User.findByIdAndUpdate(decoded.id, { refreshToken: '' });

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

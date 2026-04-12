import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/utils/auth';

export async function GET(req: NextRequest) {
  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: 'No token provided or token invalid' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(decoded.id).select('-password -expenses');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Profile route error:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

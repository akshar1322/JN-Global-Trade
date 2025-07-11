import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  '4b2e25f74cb6df3412c811c5f77b7ceed178f70c29eee2d288c382363e833a1d';

// 👇 Define a default fallback user
const defaultUser = {
  username: 'admin',
  password: 'Bhumiulva1168', // plaintext fallback password (make strong in production)
  role: 'admin',
  isActive: true,
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { identifier, password } = await req.json();

    console.log('Attempt login with:', identifier, password);

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ message: '🕵️ User not found' }, { status: 404 });
    }

    console.log('Found user:', user.username, '| Hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return NextResponse.json({ message: '❌ Incorrect password' }, { status: 401 });
    }

    const token = sign(
      { id: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      message: '✅ Login successful',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

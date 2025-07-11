import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).lean();
    if (!user || Array.isArray(user)) return null;

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };
  } catch {
    return null;
  }
}

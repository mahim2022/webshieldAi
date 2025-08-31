import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' });

    // Clear the JWT cookie
    response.cookies.set({
      name: 'token',      // The name of your JWT cookie
      value: '',          // Empty value
      httpOnly: true,     // HttpOnly flag
      path: '/',          // Cookie valid for the whole site
      maxAge: 0,          // Expire immediately
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;
  } catch (err) {
    console.error('[LOGOUT ERROR]', err);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET /api/users
export async function GET() {
  const client = await clientPromise;
  const db = client.db('thomas_points');
  const users = await db.collection('users').find().sort({ points: -1 }).toArray();

  if (!users || users.length ==0) {
    return NextResponse.json( 
      { error: 'No users found' },
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // returns a list of all users
  return NextResponse.json(
    { users: users },
    { status: 200, headers: { 'Content-Type': 'application/json' } } 
  );
}

// // POST /api/users
// export async function POST(req: NextRequest) {
//   // ...create user logic...
//   return NextResponse.json({ message: 'POST user' });
// }

// // PUT /api/users
// export async function PUT(req: NextRequest) {
//   // ...update user logic...
//   return NextResponse.json({ message: 'PUT user' });
// }

// // PATCH /api/users
// export async function PATCH(req: NextRequest) {
//   // ...partial update user logic...
//   return NextResponse.json({ message: 'PATCH user' });
// }
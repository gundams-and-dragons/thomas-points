import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const client = await clientPromise;
  const db = client.db('thomas_points');
  const user = await db.collection('users').findOne({ name });

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  return NextResponse.json(
    { user },
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
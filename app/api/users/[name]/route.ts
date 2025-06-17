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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const body = await request.json();
    const { name } = await params;
    const client = await clientPromise;

    const db = client.db('thomas_points');

    //increment the points
    const user = await db.collection('users').findOneAndUpdate({ name }, { $inc : { points: body.points }}, { returnDocument: 'after' });
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Error updating points'},
      { status: 500 }
    )
  }
}
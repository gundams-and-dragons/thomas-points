import {  NextResponse, NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  return NextResponse.json(
    { message: `GET user ${name}` },
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

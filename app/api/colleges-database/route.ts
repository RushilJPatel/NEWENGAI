import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const id = searchParams.get('id');

    const dbPath = path.join(process.cwd(), 'data', 'colleges_database.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // If requesting specific college by ID
    if (id) {
      const college = data.colleges.find((c: any) => c.id === id);
      if (college) {
        return NextResponse.json(college);
      }
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    // Search colleges
    if (query) {
      const filtered = data.colleges.filter((college: any) =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.location.toLowerCase().includes(query.toLowerCase())
      );
      return NextResponse.json({ colleges: filtered });
    }

    // Return all colleges
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading colleges database:', error);
    return NextResponse.json({ error: 'Failed to load colleges database' }, { status: 500 });
  }
}


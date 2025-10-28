import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const requirementsPath = path.join(process.cwd(), 'data', 'college_requirements.json');
    const data = JSON.parse(fs.readFileSync(requirementsPath, 'utf8'));

    if (!query) {
      return NextResponse.json(data);
    }

    // Filter colleges based on search query
    const filtered = {
      ...data,
      colleges: data.colleges.filter((college: any) =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.type.toLowerCase().includes(query.toLowerCase())
      )
    };

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error reading college requirements:', error);
    return NextResponse.json({ error: 'Failed to load college data' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { majorId } = await request.json();

    // Load data
    const majorsPath = path.join(process.cwd(), 'data', 'major_tracks.json');
    const coursesPath = path.join(process.cwd(), 'data', 'high_school_courses.json');
    
    const majorsData = JSON.parse(fs.readFileSync(majorsPath, 'utf8'));
    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
    
    const major = majorsData.majors.find((m: any) => m.id === majorId);
    
    if (!major) {
      return NextResponse.json({ error: 'Major not found' }, { status: 404 });
    }

    // Generate AI suggestion
    let aiSuggestion = '';
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are a high school guidance counselor. A student has chosen the ${major.name} track.

Provide brief, encouraging advice (3-4 sentences) about:
1. Key benefits of this track
2. Skills they'll develop
3. College/career opportunities
4. One tip for success

Keep it motivational and specific to ${major.name}.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiSuggestion = response.text();
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      aiSuggestion = `Great choice! The ${major.name} track will prepare you for amazing opportunities. Focus on building strong fundamentals early, stay curious, and don't be afraid to explore related subjects. Your 4-year plan is designed to give you the best foundation for college and beyond!`;
    }

    // Return the schedule
    return NextResponse.json({
      schedule: major.recommendedCourses,
      totalCredits: major.totalCredits,
      majorName: major.name,
      aiSuggestion
    });
  } catch (error) {
    console.error('Error generating schedule:', error);
    return NextResponse.json({ error: 'Failed to generate schedule' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Course {
  id: string;
  name: string;
  prerequisites: string[];
  category: string;
  keywords?: string[];
}

interface College {
  id: string;
  name: string;
  rank: number;
  requiredCourses: string[];
  electiveOptions: string[];
}

export async function POST(request: Request) {
  try {
    const { collegeId, completedCourses, interests } = await request.json();

    // Load data
    const coursesPath = path.join(process.cwd(), 'data', 'courses.json');
    const collegesPath = path.join(process.cwd(), 'data', 'college_curriculums.json');
    
    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
    const collegesData = JSON.parse(fs.readFileSync(collegesPath, 'utf8'));
    
    const allCourses: Course[] = coursesData.courses;
    const college: College | undefined = collegesData.colleges.find((c: College) => c.id === collegeId);
    
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    // Find next courses based on prerequisites
    const nextCourses = suggestNextCourses(completedCourses, allCourses, college);

    // Find electives based on interests using keyword matching
    const keywordElectives = suggestElectivesByKeywords(interests, allCourses, college);

    // Get AI suggestions using Gemini
    let aiSuggestion = '';
    let aiElectives: Course[] = [];
    
    try {
      const geminiResult = await getGeminiSuggestions(
        interests,
        completedCourses,
        allCourses,
        college,
        keywordElectives
      );
      aiSuggestion = geminiResult.suggestion;
      aiElectives = geminiResult.courses;
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to keyword-based suggestions
      aiSuggestion = 'Based on your interests, here are some recommended electives:';
      aiElectives = keywordElectives;
    }

    return NextResponse.json({
      nextCourses,
      suggestedElectives: aiElectives,
      aiSuggestion
    });
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}

function suggestNextCourses(completed: string[], allCourses: Course[], college: College): Course[] {
  const availableCourses = allCourses.filter(course => {
    // Must be in the college's curriculum
    const isInCurriculum = 
      college.requiredCourses.includes(course.id) || 
      college.electiveOptions.includes(course.id);
    
    if (!isInCurriculum) return false;
    
    // Must not be completed
    if (completed.includes(course.id)) return false;
    
    // All prerequisites must be completed
    const prerequisitesMet = course.prerequisites.every(prereq => 
      completed.includes(prereq)
    );
    
    return prerequisitesMet;
  });

  // Prioritize core courses
  const coreCourses = availableCourses
    .filter(c => college.requiredCourses.includes(c.id))
    .slice(0, 6);
  
  return coreCourses;
}

function suggestElectivesByKeywords(interests: string, allCourses: Course[], college: College): Course[] {
  if (!interests.trim()) return [];
  
  const interestKeywords = interests.toLowerCase().split(/[,\s]+/).filter(k => k.length > 2);
  
  const electivesWithScores = allCourses
    .filter(course => college.electiveOptions.includes(course.id))
    .map(course => {
      const keywords = course.keywords || [];
      const matchScore = keywords.reduce((score, keyword) => {
        return score + interestKeywords.filter(interest => 
          keyword.toLowerCase().includes(interest) || 
          interest.includes(keyword.toLowerCase())
        ).length;
      }, 0);
      
      return { course, matchScore };
    })
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)
    .map(item => item.course);
  
  return electivesWithScores;
}

async function getGeminiSuggestions(
  interests: string,
  completedCourses: string[],
  allCourses: Course[],
  college: College,
  keywordSuggestions: Course[]
): Promise<{ suggestion: string; courses: Course[] }> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Get available electives
  const availableElectives = allCourses.filter(course => 
    college.electiveOptions.includes(course.id) && 
    !completedCourses.includes(course.id)
  );

  const prompt = `You are a college CS advisor helping a student at ${college.name}.

Student's interests: ${interests || 'general computer science'}

Available elective courses:
${availableElectives.map(c => `- ${c.id}: ${c.name}`).join('\n')}

Based on the student's interests, recommend 3-5 elective courses and explain why they would be a good fit. Be encouraging and specific about how these courses align with their interests.

Format your response as:
1. A brief personalized message (2-3 sentences)
2. Course recommendations with brief explanations

Keep it concise and friendly.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Return keyword-based suggestions as the courses (Gemini provides explanation)
  const topCourses = keywordSuggestions.length > 0 
    ? keywordSuggestions 
    : availableElectives.slice(0, 5);

  return {
    suggestion: text,
    courses: topCourses
  };
}


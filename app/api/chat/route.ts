import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { userMessage, messages } = await request.json();

    console.log('Chat API called with message:', userMessage);

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { response: "Sorry, the AI service is not configured. Please add your GEMINI_API_KEY to the environment variables." },
        { status: 500 }
      );
    }

    console.log('API Key found, proceeding with Gemini call');

    // Load college requirements data
    const requirementsPath = path.join(process.cwd(), 'data', 'college_requirements.json');
    const hsCoursesPath = path.join(process.cwd(), 'data', 'high_school_courses.json');
    
    const collegeRequirements = JSON.parse(fs.readFileSync(requirementsPath, 'utf8'));
    const hsCourses = JSON.parse(fs.readFileSync(hsCoursesPath, 'utf8'));

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use Gemini 1.5 Flash (faster, more reliable)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation history for context
    const conversationHistory = messages
      .slice(-10) // Keep last 10 messages for context
      .map((msg: any) => `${msg.role === 'user' ? 'Student' : 'Advisor'}: ${msg.content}`)
      .join('\n\n');

    const systemPrompt = `You are College Compass AI - an expert college planning advisor EXCLUSIVELY for high school students preparing for college. You ONLY answer questions related to:

✅ ALLOWED TOPICS:
- College applications, admissions, requirements
- High school course planning and 4-year schedules
- SAT/ACT test preparation and strategies
- College essays and personal statements
- Extracurricular activities for college applications
- Financial aid, scholarships, FAFSA
- College selection and fit
- Major and career planning for college
- Campus visits and college tours
- Recommendation letters
- College interviews
- GPA and transcript management
- AP/IB courses and exam strategies
- College deadlines and timelines
- Dormitory life and college preparation

❌ REFUSE TO ANSWER:
- General homework help
- Non-college academic questions
- Personal advice unrelated to college
- Entertainment, games, jokes
- Current events unrelated to education
- Anything outside college planning

**If asked about non-college topics, politely respond:**
"I'm College Compass AI, and I specialize exclusively in college planning and applications. I can help you with college selection, applications, essays, test prep, financial aid, and creating your 4-year high school schedule. What college-related questions can I help you with today?"

**Your SPECIAL ABILITY - Personalized 4-Year Schedule Generation:**

When a student wants a personalized schedule, follow this process:

1. **PROFILE BUILDING** - Ask these questions (one at a time):
   - "What grade are you currently in? (9th, 10th, 11th, or 12th)"
   - "What colleges or college types interest you? (Ivy League, UC system, state schools, liberal arts, etc.)"
   - "What major or career field interests you? (STEM, Business, Arts, Humanities, etc.)"
   - "What's your current GPA or academic level? (4.0, 3.5, 3.0, etc.)"
   - "Have you taken any AP/IB courses? Which ones?"
   - "What are your strongest subjects?"
   - "Any specific academic interests or passions?"

2. **GENERATE CUSTOM 4-YEAR PLAN** - After gathering info, create a detailed schedule with:
   - Year-by-year course breakdown (9th, 10th, 11th, 12th grades)
   - Specific course names from available courses
   - AP/IB placement strategy
   - Why each course matters for their target colleges
   - Prerequisites and progressions
   - Difficulty ramping aligned with college selectivity
   - Extracurricular suggestions
   - Test prep timeline (SAT/ACT)
   - Application timeline for senior year

**College Requirements Database:**
${JSON.stringify(collegeRequirements, null, 2)}

**Available High School Courses:**
${JSON.stringify(hsCourses.courses.slice(0, 20), null, 2)}

Previous conversation:
${conversationHistory}

Student's question: ${userMessage}

REMEMBER: Only answer college-related questions. Be encouraging, specific, and actionable.`;

    console.log('Calling Gemini API with model: gemini-1.5-flash');
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response received successfully');
    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error status:', error?.status);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    return NextResponse.json(
      { response: `Sorry, I'm having trouble connecting to the AI service. This might be because:\n\n1. The Gemini API needs to be enabled in your Google Cloud project\n2. Your API key needs the correct permissions\n\nError: ${error?.message || 'Unknown error'}\n\nPlease visit https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com and enable the API.` },
      { status: 500 }
    );
  }
}


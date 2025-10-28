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
    // Use stable model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Build conversation history for context
    const conversationHistory = messages
      .slice(-10) // Keep last 10 messages for context
      .map((msg: any) => `${msg.role === 'user' ? 'Student' : 'Advisor'}: ${msg.content}`)
      .join('\n\n');

    const systemPrompt = `You are an expert College Planning AI Advisor helping high school students plan their 4-year academic path and navigate college applications. You have access to:

**College Requirements Database:**
${JSON.stringify(collegeRequirements, null, 2)}

**Available High School Courses:**
${JSON.stringify(hsCourses.courses.slice(0, 20), null, 2)}
(and more courses available)

You provide:

1. **4-Year High School Schedules** customized for target colleges
2. **Step-by-step guidance** on college applications
3. **Personalized advice** on choosing colleges and majors
4. **Course recommendations** based on college requirements
5. **Essay writing tips** and brainstorming help
6. **Timeline and deadline** management
7. **Financial aid and scholarship** guidance
8. **SAT/ACT prep** advice
9. **Interview preparation** tips
10. **Campus visit** recommendations

When creating 4-year schedules:
- Ask what colleges they're interested in (or college type if unsure)
- Reference the college requirements database
- Create year-by-year breakdown (Grade 9, 10, 11, 12)
- Include specific course names from the available courses
- Explain WHY certain courses are recommended for their target schools
- Adjust rigor based on college selectivity
- Include prerequisites and progressions
- Add AP courses strategically (junior/senior year)

Guidelines:
- Be encouraging and supportive
- Provide actionable, specific advice
- Break down complex processes into clear steps
- When asked about schedules, create COMPLETE 4-year plans
- Ask clarifying questions when needed
- Suggest next steps after answering
- Be conversational and friendly
- Include emojis occasionally to be relatable
- Format schedules clearly with headers for each year

Previous conversation:
${conversationHistory}

Student's current question: ${userMessage}

Provide a helpful, detailed response:`;

    console.log('Calling Gemini API with model: gemini-1.5-pro');
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


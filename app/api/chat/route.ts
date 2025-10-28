import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth';
import fs from 'fs';
import path from 'path';
import connectDB from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const { userMessage, messages, saveHistory = false } = await request.json();

    console.log('Chat API called with message:', userMessage);

    // Load user profile for personalized responses
    let userProfile = null;
    if (session?.user?.email) {
      try {
        await connectDB();
        userProfile = await UserProfile.findOne({ email: session.user.email });
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }

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

    // Build personalized context from user profile
    let profileContext = '';
    if (userProfile) {
      profileContext = `
**STUDENT PROFILE:**
- Current Grade: ${userProfile.currentGrade}
- GPA: ${userProfile.currentGPA}
- Target Colleges: ${userProfile.targetColleges.join(', ')}
- Intended Major: ${userProfile.intendedMajor}
- Career Aspirations: ${userProfile.careerAspirations}
- Strongest Subjects: ${userProfile.strongestSubjects.join(', ')}
- Academic Interests: ${userProfile.academicInterests.join(', ')}
- AP/Honors Courses Taken: ${userProfile.apCoursesTaken.join(', ')}
- Study Time Per Day: ${userProfile.studyTimePerDay}
- Homework Load: ${userProfile.homeworkLoad}
- Learning Style: ${userProfile.learningStyle}
- Preferred Locations: ${userProfile.preferredLocation.join(', ')}
- Hobbies: ${userProfile.hobbies.join(', ')}
- Extracurriculars: ${userProfile.extracurriculars.join(', ')}
- Athletic Interest: ${userProfile.athleticInterest ? `Yes - ${userProfile.athleticSport}` : 'No'}
- Financial Aid Needed: ${userProfile.financialAidNeeded ? 'Yes' : 'No'}
- Challenges: ${userProfile.challenges.join(', ')}
- Goals: ${userProfile.goals.join(', ')}

**IMPORTANT:** Use this profile information to provide HIGHLY PERSONALIZED advice. Reference their specific goals, challenges, and interests in your responses.
`;
    }

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

${profileContext}

When generating a 4-year plan, create a COMPREHENSIVE and DETAILED schedule with:
   - **Year-by-year course breakdown** (9th, 10th, 11th, 12th grades or remaining years)
   - **Specific course names** from available courses database
   - **AP/IB/Honors placement strategy** aligned with target college requirements
   - **Course rationale** - explain why each course matters for their target colleges
   - **Prerequisites and progressions** - ensure logical course sequences
   - **Difficulty ramping** - balance rigor with their current workload and study time
   - **Extracurricular recommendations** - aligned with their interests and college goals
   - **Test prep timeline** (SAT/ACT/AP exams) - customized to their schedule
   - **Application timeline** for senior year
   - **Summer activities** - internships, programs, volunteering suggestions
   - **Leadership opportunities** - based on their extracurriculars
   - **Academic competitions** - relevant to their major interest
   
**When creating the plan:**
- ALWAYS reference their profile data (GPA, target colleges, major, etc.)
- Account for their study time availability and current homework load
- Suggest courses that align with their strongest subjects and learning style
- Address their stated challenges and help them achieve their goals
- If they need financial aid, suggest scholarship-relevant activities
- If they have athletic interests, account for practice time
- Adapt the plan to their preferred college locations and types

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


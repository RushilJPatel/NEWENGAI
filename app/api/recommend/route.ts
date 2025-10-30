import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

// Generate personalized advice based on interests
const generateAdvice = (interests: string, courses: Course[]): string => {
  if (!interests || !interests.trim()) {
    return `Great progress so far! Based on your curriculum, here are some recommended electives that will strengthen your foundation and help you explore different areas. Each course is carefully selected to complement your core classes and broaden your skill set.`;
  }
  
  const interestLower = interests.toLowerCase();
  
  if (interestLower.includes('ai') || interestLower.includes('machine learning') || interestLower.includes('artificial intelligence')) {
    return `Excellent choice focusing on AI and machine learning! These recommended electives will give you the mathematical and programming foundation essential for this rapidly growing field. Consider supplementing with online courses in Python and TensorFlow to get hands-on experience with AI frameworks.`;
  }
  
  if (interestLower.includes('web') || interestLower.includes('frontend') || interestLower.includes('backend')) {
    return `Web development is a fantastic area to explore! These electives will help you build full-stack capabilities and understand both client and server-side technologies. Don't forget to build personal projects and deploy them online - nothing beats hands-on experience in web dev!`;
  }
  
  if (interestLower.includes('game') || interestLower.includes('graphics')) {
    return `Game development and graphics - awesome! These courses will give you the computational and mathematical skills needed for this creative field. Start working on small game projects using engines like Unity or Unreal to apply what you learn in class.`;
  }
  
  if (interestLower.includes('security') || interestLower.includes('cyber')) {
    return `Cybersecurity is incredibly important and in high demand! These electives will build your understanding of systems, networks, and secure coding practices. Consider participating in CTF (Capture the Flag) competitions to practice your skills in a fun, competitive environment.`;
  }
  
  if (interestLower.includes('data') || interestLower.includes('analytics') || interestLower.includes('science')) {
    return `Data science is where the future is heading! These courses will strengthen your statistical thinking and programming skills. Start working with real datasets and learn tools like Python, R, and SQL to complement your coursework.`;
  }
  
  if (interestLower.includes('mobile') || interestLower.includes('app')) {
    return `Mobile development is a great choice with huge opportunities! These electives will give you the programming and design skills needed. Consider building and publishing your own app to the App Store or Google Play - it's a fantastic resume builder!`;
  }
  
  // Default advice
  return `Based on your interests in ${interests}, here are electives that align well with your goals. These courses will deepen your expertise and open up new areas of exploration. Remember to work on side projects that showcase your passion and skills!`;
};

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

    // Generate personalized advice
    const aiSuggestion = generateAdvice(interests, keywordElectives);

    return NextResponse.json({
      nextCourses,
      suggestedElectives: keywordElectives,
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


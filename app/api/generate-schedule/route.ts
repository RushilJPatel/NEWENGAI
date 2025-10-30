import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Pre-defined motivational messages for different major categories
const getMajorAdvice = (majorName: string): string => {
  const lowerName = majorName.toLowerCase();
  
  if (lowerName.includes('computer') || lowerName.includes('software') || lowerName.includes('tech')) {
    return `Excellent choice! The ${majorName} track will position you at the forefront of innovation and technology. You'll develop critical problem-solving skills, logical thinking, and hands-on experience with cutting-edge tools. Top tech companies and universities are seeking students with this foundation. Pro tip: Start building a portfolio of projects early - even small personal projects demonstrate your passion and practical skills!`;
  }
  
  if (lowerName.includes('engineer')) {
    return `Outstanding! The ${majorName} track prepares you for a career in one of the most in-demand fields. You'll master both theoretical concepts and practical applications, developing the analytical and creative skills engineers need. This track opens doors to top engineering programs and exciting career opportunities. Pro tip: Join competitions like Science Olympiad or robotics - hands-on experience sets you apart!`;
  }
  
  if (lowerName.includes('bio') || lowerName.includes('health') || lowerName.includes('med')) {
    return `Fantastic choice! The ${majorName} track will give you the scientific foundation needed for careers in healthcare, research, and biotechnology. You'll develop strong analytical skills and deep understanding of life sciences. Medical schools and health science programs highly value this preparation. Pro tip: Seek out research opportunities or volunteer at healthcare facilities to gain real-world exposure!`;
  }
  
  if (lowerName.includes('business') || lowerName.includes('econom')) {
    return `Smart decision! The ${majorName} track develops essential skills in analysis, communication, and strategic thinking valued by top business schools and employers. You'll gain practical knowledge in finance, management, and entrepreneurship. This versatile foundation opens doors across multiple industries. Pro tip: Start a small business or join DECA/FBLA to apply what you learn!`;
  }
  
  if (lowerName.includes('art') || lowerName.includes('design') || lowerName.includes('creative')) {
    return `Wonderful choice! The ${majorName} track nurtures your creativity while developing technical skills and critical thinking. You'll build a strong portfolio and learn to express ideas visually. Art schools and creative programs seek students with diverse skills and unique perspectives. Pro tip: Document your creative process and build an online portfolio to showcase your growth!`;
  }
  
  if (lowerName.includes('humanities') || lowerName.includes('history') || lowerName.includes('literature')) {
    return `Excellent selection! The ${majorName} track develops sophisticated analytical, writing, and critical thinking skills that are highly transferable across careers. You'll learn to understand complex ideas and communicate effectively. Top liberal arts colleges especially value this deep engagement with ideas. Pro tip: Write regularly outside of class assignments and consider entering essay competitions!`;
  }
  
  // Default for any other major
  return `Great choice! The ${majorName} track will prepare you for amazing opportunities in college and beyond. You'll develop strong foundational skills and deep knowledge in your area of interest. This track is designed to give you the best preparation for competitive colleges. Pro tip: Stay curious, ask questions, and seek opportunities to explore your interests beyond the classroom!`;
};

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

    // Get pre-defined advice based on major
    const aiSuggestion = getMajorAdvice(major.name);

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


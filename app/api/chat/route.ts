import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

// Predefined responses for common questions
const getPredefinedResponse = (userMessage: string, userProfile: any): string => {
  const message = userMessage.toLowerCase();
  
  // MIT 4-year schedule
  if (message.includes('mit') && (message.includes('schedule') || message.includes('4-year') || message.includes('four-year'))) {
    return `# 🎓 **Your Personalized 4-Year Plan for MIT**

MIT looks for students who demonstrate exceptional aptitude in STEM, leadership, and innovation. Here's your roadmap:

## **📚 9th Grade - Foundation Building**
**Core Courses:**
- Honors English 9
- Honors Algebra II or Precalculus
- Honors Biology
- Honors World History
- Spanish III or IV
- Computer Science I

**Key Activities:**
- Join robotics club or coding club
- Start a STEM-related project
- Aim for 3.9+ GPA

**Summer:** Attend a STEM summer program (MIT Launch, SSP, etc.)

---

## **📚 10th Grade - Advanced Rigor**
**Core Courses:**
- Honors English 10
- AP Calculus AB
- AP Chemistry
- AP World History
- Spanish IV or AP Spanish
- AP Computer Science A

**Key Activities:**
- Leadership role in STEM clubs
- Enter science fair (Intel ISEF, Regeneron STS)
- Build your maker portfolio
- Take PSAT (aim for National Merit)

**Summer:** Research internship or advanced coding bootcamp

---

## **📚 11th Grade - Peak Performance**
**Core Courses:**
- AP English Language
- AP Calculus BC
- AP Physics C (Mechanics & E&M)
- AP US History
- AP Computer Science Principles
- Elective: Engineering or Advanced CS

**Standardized Tests:**
- SAT (aim for 1550+): March & May
- SAT Subject Tests: Math II (800), Physics (780+)
- AP Exams: Target 5s on all

**Key Activities:**
- Major leadership positions
- Significant research project with publication/patent
- National-level competitions (USACO, USAMO, etc.)
- Start MIT-specific EC (like launching a tech startup)

**Summer:** Competitive research program (RSI, MITES, SSP) or impressive independent project

---

## **📚 12th Grade - Application Excellence**
**Core Courses:**
- AP English Literature
- Multivariable Calculus (or Linear Algebra)
- AP Biology or AP Environmental Science
- AP Government
- Additional CS course or Independent Study

**Application Timeline:**
- August: Finalize essay, request recommendations
- September: Complete MIT portal
- **November 1: Submit Early Action to MIT**
- December: Submit other applications
- January-March: Follow up, additional achievements

**Key Activities:**
- Continue leadership and project work
- Win competitions or publish research
- Maintain perfect grades (no senioritis!)

---

## **🎯 MIT-Specific Requirements**
✅ **Math:** Through multivariable calculus or beyond  
✅ **Science:** 4 years, including AP Physics C  
✅ **English:** 4 years of strong writing  
✅ **Social Studies:** 2+ years  
✅ **Foreign Language:** 2+ years (4 recommended)

## **🏆 What Makes You Stand Out**
- **Spike:** Deep expertise in CS, engineering, or math
- **Maker Portfolio:** Projects, GitHub, patents
- **National Recognition:** USACO Platinum, USAMO, Intel/Regeneron finalist
- **Leadership:** Founding/leading STEM initiatives
- **Passion Projects:** Show genuine curiosity & innovation

## **💡 Pro Tips for MIT**
1. MIT values "match" - show you'll thrive in their collaborative, hands-on environment
2. Demonstrate how you'll contribute to their community
3. Show resilience and learning from failure
4. Take the hardest courses available and excel
5. Your essays should reveal your personality and passion

**You've got this! 🚀 MIT admits ~4%, but with this roadmap and dedication, you'll be a competitive applicant!**`;
  }
  
  // UC Schools
  if ((message.includes('uc ') || message.includes('university of california')) && (message.includes('schedule') || message.includes('courses'))) {
    return `# 🌟 **4-Year Plan for UC Schools (UCLA, Berkeley, etc.)**

The UC system uses a holistic review process and looks for students who excel academically while demonstrating leadership and impact. Here's your path:

## **📚 9th Grade - Strong Start**
**A-G Requirements (UC):**
- English 9 (Honors if available)
- Algebra II or Geometry (Honors)
- Biology or Physical Science (Honors)
- World History or Geography
- Spanish II or III
- Visual/Performing Arts (1 year required)

**GPA Goal:** 3.8+ unweighted, 4.0+ weighted  
**Activities:** Join 2-3 clubs, explore interests

---

## **📚 10th Grade - Building Momentum**
**Core Courses:**
- Honors English 10
- Honors Precalculus or AP Calculus AB
- Honors Chemistry or AP Chemistry
- AP World History or AP European History
- Spanish III or IV
- Elective: Continue Arts or add CS

**Key Milestones:**
- Take PSAT for practice
- Develop leadership in 1-2 activities
- Community service (UC values community engagement)

**Summer:** Volunteer program or academic enrichment

---

## **📚 11th Grade - Maximum Rigor**
**Core Courses:**
- AP English Language
- AP Calculus AB or BC
- AP Biology or AP Physics
- AP US History
- AP Spanish or Spanish IV
- Additional AP: Psychology, CS, or Stats

**Standardized Tests:**
- SAT: March (1400+) and May (1450+)
- Take 2-3 AP exams (aim for 4s and 5s)

**UC Personal Insight Questions (PIQs):**
- Start brainstorming summer before senior year
- 4 essays out of 8 prompts

**Activities:**
- Leadership positions in clubs
- 100+ hours community service
- Summer internship or job

---

## **📚 12th Grade - Finish Strong**
**Core Courses:**
- AP English Literature
- AP Statistics or higher math
- AP Environmental Science or AP Physics
- AP Government & AP Economics
- Elective APs based on major interest

**Application Timeline:**
- August: Complete UC application (opens)
- **November 1-30: UC Application Period**
- December-January: Submit FAFSA for aid
- March: Decisions released
- May 1: Commit to your UC!

---

## **🎯 UC A-G Requirements (Must Complete)**
- **A** - History: 2 years
- **B** - English: 4 years
- **C** - Math: 3 years (4 recommended)
- **D** - Science: 2 years lab science (3 recommended)
- **E** - Language Other Than English: 2 years (3 recommended)
- **F** - Visual & Performing Arts: 1 year
- **G** - College Prep Elective: 1 year

## **📊 UC GPA Calculation**
- UC calculates GPA using only 10th & 11th grade A-G courses
- Up to 8 semesters of honors/AP get extra points
- Target: 4.0+ weighted for UCLA/Berkeley

## **🏆 What UCs Look For**
1. **Academic Excellence:** Challenging courses + strong grades
2. **Leadership & Initiative:** Starting projects, officer roles
3. **Community Impact:** Meaningful service and engagement
4. **Overcoming Challenges:** Personal insight essays
5. **California Residency:** Big advantage for in-state students

## **💰 Financial Aid Tips**
- Submit FAFSA and CA Dream Act (if applicable)
- UCs offer generous aid for CA residents
- Middle Class Scholarship available
- Check each campus for additional scholarships

**Good luck with your UC applications! 🐻💙💛**`;
  }
  
  // Ivy League
  if (message.includes('ivy league') || (message.includes('ivy') && (message.includes('schedule') || message.includes('plan')))) {
    return `# 🎓 **4-Year Plan for Ivy League Colleges**

The Ivy League (Harvard, Yale, Princeton, Columbia, Penn, Brown, Dartmouth, Cornell) looks for exceptional students who combine academic excellence with leadership and unique impact.

## **📚 9th Grade - Establish Excellence**
**Core Courses:**
- Honors English 9
- Honors Algebra II or Geometry
- Honors Biology or Chemistry
- Honors World History
- Foreign Language III
- Elective (consider arts, CS, or additional science)

**GPA Target:** 3.9+ unweighted  
**Activities:** Explore 3-4 different interests  
**Summer:** Academic enrichment or meaningful activity

---

## **📚 10th Grade - Deepen Your Spike**
**Core Courses:**
- Honors English 10 or AP English if available
- Honors Precalculus or AP Calc AB
- AP Chemistry or Honors Chemistry + Honors Physics
- AP World History or AP European History
- Foreign Language IV or AP
- Elective: Continue developing your "spike"

**Key Milestones:**
- Take PSAT seriously (National Merit helps)
- Find your "spike" - area of deep expertise
- Start leadership roles

**Summer:** Selective summer program (TASP, RSI, SSP, etc.)

---

## **📚 11th Grade - Peak Performance Year**
**Most Important Year for GPA!**

**Core Courses:**
- AP English Language
- AP Calculus BC
- 2 AP Sciences (Bio, Chem, or Physics C)
- AP US History
- AP Foreign Language
- Additional AP in your spike area

**Standardized Tests:**
- SAT/ACT: March (1500+/33+), May (1550+/35+)
- SAT Subject Tests if submitting (Math II, Science)
- AP Exams: 5s on most

**Ivy Applications Prep:**
- Summer: Start Common App essay
- Visit campuses
- Build relationships with teachers (for recs)

**Activities:**
- Significant leadership (president, founder)
- National-level recognition in your spike
- 150+ hours meaningful community service
- Research, publication, or major project

**Summer:** Highly competitive program or independent research/startup

---

## **📚 12th Grade - Application Excellence**
**Core Courses:**
- AP English Literature
- Multivariable Calc or AP Statistics
- Additional AP Science
- AP Government, AP Economics
- Continue foreign language or elective APs
- Maintain 7+ APs total senior year courses

**Application Timeline:**
- **August-September:** Finalize essays, request recommendations
- **October:** Complete Common App + supplements
- **November 1:** Submit Early Decision/Early Action
  - Harvard, Yale, Princeton, Dartmouth: REA
  - Columbia, Penn, Cornell, Brown: ED or EA
- **December 15:** Early decisions released
- **January 1:** Regular Decision deadline
- **Late March:** RD decisions
- **May 1:** National Decision Day

**Continue Excellence:**
- No senioritis! Maintain perfect grades
- Update schools with awards/achievements
- Win competitions, publish research

---

## **🎯 What Ivy League Schools Want**
1. **Academic Excellence:**
   - 3.9+ unweighted GPA in hardest courses
   - SAT 1500+ or ACT 34+
   - Multiple AP 5s

2. **Distinctive Spike:**
   - National/international recognition
   - Deep expertise in one area
   - Not just well-rounded, but "well-rounded with a spike"

3. **Leadership & Impact:**
   - Founded organization with measurable impact
   - Leadership in established activities
   - Initiative and innovation

4. **Character & Personal Qualities:**
   - Overcoming adversity
   - Intellectual curiosity
   - Positive contribution to community

5. **Compelling Narrative:**
   - Essays that reveal authentic personality
   - Clear passion and direction
   - Unique perspective or experience

## **🏆 Building Your Ivy-Worthy Profile**

**The Spike Strategy:**
- Computer Science: USACO Gold/Platinum, significant projects
- Science: Intel/Regeneron finalist, research publication
- Math: USAMO qualifier, international competitions
- Humanities: Published writing, policy impact
- Arts: National competitions, performances
- Social Impact: Founded nonprofit, measurable community change

**Strong Extracurricular Profile:**
- 8-10 activities showing depth
- 2-3 with significant leadership
- 1 "wow" factor achievement

**Recommendation Letters:**
- From teachers who know you well
- Ideally from 11th grade
- In your spike area if possible

## **💡 School-Specific Tips**

**Harvard:** Values intellectual curiosity & future leaders  
**Yale:** Strong focus on residential college community  
**Princeton:** Emphasizes undergraduate teaching  
**Columbia:** NYC location & Core Curriculum appeal  
**Penn:** Look for pre-professional focus  
**Brown:** Open Curriculum attracts independent thinkers  
**Dartmouth:** Tight-knit community & outdoor culture  
**Cornell:** Largest Ivy, more specialized programs

## **📊 Reality Check**
- Admission rates: 3-9%
- Apply to 2-3 Ivies max + other top schools
- Have matches and safeties you'd love to attend
- Success = finding the right fit, not just prestige

**Remember: These schools want to see who YOU are, not a perfect robot. Show passion, authenticity, and impact! 🚀**`;
  }
  
  // College essay advice
  if (message.includes('essay') || message.includes('personal statement')) {
    return `# ✍️ **Crafting an Outstanding College Essay**

Your college essay is your chance to show admissions officers who you are beyond grades and test scores. Here's how to write a standout essay:

## **🎯 What Makes a Great College Essay?**

**The essay should be:**
- ✅ **Authentic** - Genuine voice, not what you think they want
- ✅ **Specific** - Concrete details, not generic statements
- ✅ **Revealing** - Shows your character, values, and growth
- ✅ **Engaging** - Hooks reader from the first sentence
- ✅ **Well-written** - Clear, concise, error-free

## **📝 Common App Essay Prompts (Choose 1)**

1. **Background/Identity** - Story central to your identity
2. **Learning from Challenge** - Obstacle you overcame
3. **Questioning a Belief** - When you challenged an idea
4. **Gratitude Moment** - Problem you've solved or want to solve
5. **Accomplishment/Event** - Transition from childhood to adulthood
6. **Engaging Topic** - Something that makes you lose track of time
7. **Any Topic** - Your choice

## **🚫 Common Pitfalls to AVOID**

**DON'T:**
- ❌ Write what you think they want to hear
- ❌ Try to fit your entire life story in 650 words
- ❌ Use clichés ("I learned so much from this experience...")
- ❌ Write about something too generic (sports injury, mission trip)
- ❌ Focus only on the problem, not growth
- ❌ Use vocabulary you'd never say out loud
- ❌ Submit without proofreading (typos = rejected!)

## **✅ Essay Topics That Work**

**Strong Topics:**
- A quirky hobby that reveals your personality
- Small moment that sparked big change
- Cultural tradition that shaped your values
- Overcoming a personal challenge with specific details
- Intellectual curiosity (a question you're obsessed with)
- Relationship that changed your perspective
- Creative project or passion

**Example: Instead of "My mission trip to Guatemala changed my life"**  
**Try:** "The moment I realized my privilege was when 8-year-old Maria asked if she could keep the pencil I handed her..."

## **📐 Essay Structure**

**Opening (Hook - 50-100 words):**
- Start with action, dialogue, or vivid scene
- Make admissions officers want to keep reading
- Avoid: "I have always wanted to..." or "Ever since I was young..."

**Body (Development - 400-500 words):**
- Use specific examples and anecdotes
- Show, don't tell (use sensory details)
- Reveal your thought process
- Demonstrate growth and reflection

**Conclusion (50-100 words):**
- Connect back to opening
- Show insight and maturity
- Look forward, not just backward
- Avoid: summarizing what you already said

## **✨ The "Show, Don't Tell" Rule**

**TELL (Weak):** "I am a hard worker and very determined."

**SHOW (Strong):** "At 4 AM, while my teammates slept, I analyzed game footage frame-by-frame, searching for the pattern in our opponent's defense. Three consecutive state championships later, those pre-dawn sessions were worth every lost hour of sleep."

## **🔧 Revision Process**

**Draft 1:** Just write. Get your ideas on paper. Don't edit yet.

**Draft 2-5:** 
- Cut unnecessary words (aim for 600-650 words)
- Replace weak verbs with strong ones
- Add sensory details
- Check: Does this show who I am?

**Draft 6+:**
- Read aloud (awkward = needs fixing)
- Get feedback from teacher or counselor
- Check grammar & spelling
- Ensure it sounds like YOU

## **💡 Pro Tips**

1. **Start with a story, not a statement**
   - Good: "The flour explosion covered my face, my apron, and somehow, the ceiling."
   - Bad: "Baking has always been my passion."

2. **Use dialogue** to bring scenes to life

3. **Be vulnerable** - admissions officers value authenticity

4. **The mundane can be magical** - everyday moments reveal character

5. **Your essay should pass the "swap test"** - could only YOU have written this?

## **📅 Timeline**

- **Summer before senior year:** Brainstorm & draft
- **August-September:** Write & revise
- **October:** Finalize with feedback
- **November:** Submit with EA/ED apps

## **🎓 Supplemental Essays ("Why This College?")**

**Answer these questions:**
- Why this specific school? (Be specific!)
- What will you contribute?
- What specific programs/professors/opportunities excite you?

**DO YOUR RESEARCH:**
- Mention specific classes, professors, programs
- Show you've visited (in-person or virtually)
- Explain fit, not just prestige

## **✍️ Your Essay Checklist**

Before submitting, ask:
- ☑️ Does this sound like me talking?
- ☑️ Did I show, not tell?
- ☑️ Is there specific detail and reflection?
- ☑️ Does it reveal something meaningful about me?
- ☑️ Is every word earning its place?
- ☑️ Have I proofread multiple times?
- ☑️ Did someone else review it?

**Remember: Your essay is your voice. Make it authentic, specific, and memorable. Good luck! 🚀**`;
  }
  
  // Choosing the right college
  if (message.includes('choose') && (message.includes('college') || message.includes('right'))) {
    return `# 🎓 **How to Choose the Right College**

Choosing a college is one of the most important decisions you'll make. Here's a comprehensive framework to find your perfect fit:

## **🔍 Key Factors to Consider**

### **1. Academic Fit**
**Program Strength:**
- Is your intended major strong at this school?
- What's the student-to-faculty ratio?
- Research opportunities for undergrads?
- Flexibility to change majors?

**Academic Environment:**
- Core curriculum or open curriculum?
- Class sizes (large lectures vs. small seminars)?
- Grade inflation/deflation culture?
- Study abroad programs?

### **2. Financial Fit** 💰
**Critical Questions:**
- What's the net price after financial aid?
- Is merit aid available?
- What's the average debt of graduates?
- Return on investment (ROI)?
- Will you need loans?

**Use Net Price Calculators** on each college's website!

### **3. Social & Cultural Fit**
**Campus Culture:**
- Large university or small college?
- Urban, suburban, or rural?
- Greek life presence?
- Diversity and inclusion?
- Political climate?

**Student Life:**
- Dorm life required?
- Clubs and activities that interest you?
- Weekend scene (party school or not)?
- Athletic culture (D1, D3, or none)?

### **4. Location**
- Distance from home (2 hours or cross-country?)
- Climate preference?
- City size and opportunities?
- Regional culture fit?
- Accessibility for family visits?

### **5. Career Outcomes**
- Employment rate after graduation?
- Strength of alumni network?
- Career services and internship connections?
- Graduate school placement?
- Starting salaries in your field?

## **🎯 College Categories**

### **Reach Schools (10-20% chance)**
- Application rate <20%
- Your GPA/test scores below their median
- Apply to 2-4 reaches
- Don't let prestige drive your list!

### **Target Schools (40-60% chance)**
- Your stats match their middle 50%
- You'd be thrilled to attend
- Apply to 3-5 targets
- **Most important category!**

### **Safety Schools (80%+ chance)**
- Your stats above their 75th percentile
- You'd genuinely be happy attending
- Apply to 2-3 safeties
- **Love your safety!** You might end up there!

## **📊 Building Your College List**

**Balanced List (8-12 schools):**
- 2-4 Reach
- 3-5 Target
- 2-3 Safety

**Consider:**
- Geographic diversity (don't apply only to one region)
- Size variety
- Public vs. private
- Different campus cultures

## **🚶 Virtual & In-Person Visits**

**Virtual Research:**
- Take official virtual tours
- Watch student vlogs on YouTube
- Join admitted student Facebook groups
- Research on r/ApplyingToCollege and College Confidential
- Read student newspaper

**Campus Visits:**
- Schedule official tour + info session
- Sit in on a class
- Eat in the dining hall
- Talk to students (ask honest questions!)
- Walk around campus alone (can you see yourself here?)
- Visit during a regular school day, not just special events

**Questions to Ask:**
- "What do students do on weekends?"
- "What's the workload really like?"
- "What surprised you most about attending here?"
- "Would you choose this school again?"

## **🎓 Types of Schools**

### **Liberal Arts Colleges**
**Pros:** Small classes, close faculty relationships, undergraduate focus  
**Cons:** Less name recognition, fewer majors/resources  
**Examples:** Williams, Amherst, Swarthmore, Pomona

### **Research Universities**
**Pros:** Extensive resources, renowned faculty, diverse programs  
**Cons:** Large classes, less personal attention, grad student TAs  
**Examples:** Stanford, MIT, Berkeley, Michigan

### **Public Universities**
**Pros:** Lower cost (in-state), larger networks, school spirit  
**Cons:** Larger class sizes, less financial aid (out-of-state)  
**Examples:** UCs, UVA, UNC, UT Austin

### **Private Universities**
**Pros:** Smaller classes, generous financial aid, prestige  
**Cons:** Higher sticker price, sometimes intense competition  
**Examples:** Harvard, Duke, Northwestern

## **💡 Red Flags to Watch For**

🚩 Low 4-year graduation rates  
🚩 Poor financial aid packages  
🚩 Unsafe campus or surrounding area  
🚩 You can't articulate why you'd be happy there  
🚩 Choosing solely for prestige or family pressure  
🚩 Limited academic programs (if you might change majors)  

## **✅ Green Flags**

✅ Students seem genuinely happy  
✅ Strong support services (mental health, career, academic)  
✅ Thriving in your intended major  
✅ You can picture yourself there for 4 years  
✅ Affordable without crushing debt  
✅ Active alumni network  

## **🤔 Important Questions**

Ask yourself:
1. **Academically:** Will I be challenged but supported?
2. **Socially:** Can I find "my people" here?
3. **Financially:** Can my family afford this without unmanageable debt?
4. **Professionally:** Will this school open doors for my career?
5. **Gut check:** Do I feel excited or anxious about attending?

## **🎯 Making Your Final Decision**

**After Acceptances (April-May 1):**

1. **Revisit top choices** (admitted student days)
2. **Compare financial aid packages** (appeal if needed)
3. **Consider:**
   - Where do you feel most excited?
   - Where can you see yourself thriving?
   - What's the best value for your education?
4. **Trust your instincts** (don't let others decide for you!)
5. **Commit by May 1** 

## **💰 Financial Aid Comparison Tool**

For each school, calculate:
- Total Cost of Attendance (COA)
- Minus: Grants/scholarships (free money)
- Minus: Work-study
- = **Net Price** (what you'll pay per year)
- × 4 years = **Total Cost**
- Consider: Loan amounts & interest

**Choose the school with best value, not lowest sticker price!**

## **🎓 Remember:**

> **"The best college is the one where YOU will thrive - academically, socially, and financially."**

- There's no single "perfect" school
- Prestige ≠ Happiness
- You can succeed from ANY college with effort
- Focus on fit over rankings
- Trust the process!

**Need help narrowing down your list? Let me know your priorities and I can provide personalized recommendations! 🌟**`;
  }
  
  // Financial aid and scholarships
  if (message.includes('financial aid') || message.includes('scholarship')) {
    return `# 💰 **Financial Aid & Scholarships Guide**

Paying for college doesn't have to mean crushing debt! Here's everything you need to know about financial aid and scholarships:

## **📋 Types of Financial Aid**

### **1. Grants (Free Money - Don't Repay!)**
- **Pell Grant:** Federal grant for low-income students (up to $7,395/year)
- **Federal Supplemental Educational Opportunity Grant (FSEOG)**
- **State Grants:** Vary by state (e.g., Cal Grant in California)
- **Institutional Grants:** Colleges' own need-based aid

### **2. Scholarships (Free Money - Don't Repay!)**
- **Merit-Based:** For academic, athletic, or artistic achievement
- **Need-Based:** For demonstrated financial need
- **Identity-Based:** For specific demographics or backgrounds
- **Field-Specific:** For intended major or career

### **3. Work-Study**
- Part-time jobs on campus
- Earn money while studying
- Limited hours (usually 10-15/week)

### **4. Student Loans (Must Repay)**
- **Federal Subsidized:** Government pays interest while in school
- **Federal Unsubsidized:** Interest accrues immediately
- **Parent PLUS Loans:** Parents borrow for your education
- **Private Loans:** Last resort (higher interest, fewer protections)

## **🎓 Understanding Financial Aid Packages**

**Example Aid Package:**

Total Cost of Attendance: $70,000
- Institutional Grant: -$40,000
- Federal Pell Grant: -$6,000
- Work-Study: -$3,000
- Federal Loans: -$5,500
= Family Contribution: $15,500/year

**Your Goal:** Minimize loans, maximize grants/scholarships!

## **📝 FAFSA (Free Application for Federal Student Aid)**

**What it is:** The form that determines your federal aid eligibility

**Key Info:**
- **Opens:** October 1st every year
- **Deadline:** Varies by state (file ASAP!)
- **Required for:** Federal grants, loans, work-study, most institutional aid
- **You'll need:** Tax returns, W-2s, bank statements

**FAFSA Tips:**
- File ASAP after October 1 (aid is first-come, first-served)
- Use IRS Data Retrieval Tool
- List schools in any order (they can't see each other)
- Update with actual tax data if you filed with estimates

## **📄 CSS Profile**

**What it is:** Additional form for institutional aid (used by ~400 colleges)

**Key Differences from FAFSA:**
- More detailed financial picture
- Considers home equity, assets
- Costs $25 for first school, $16 for each additional
- Required by most private colleges

**Schools that require CSS:** Harvard, Stanford, Duke, Northwestern, etc.

## **🏆 Types of Scholarships**

### **Large National Scholarships**
- **Coca-Cola Scholars:** $20,000
- **Gates Scholarship:** Full ride for minorities
- **Jack Kent Cooke Foundation:** Up to $55,000/year
- **QuestBridge:** Full rides to top colleges
- **National Merit:** Full tuition at partner schools

### **College-Specific Merit Aid**
Many colleges offer automatic scholarships based on stats:
- **GPA + Test Scores = Guaranteed Money**
- Examples: University of Alabama, Ole Miss, Arizona State

### **Local Scholarships**
- Community organizations
- Local businesses
- High school scholarships
- Religious organizations
- Parent's employer

**Tip:** Local scholarships have less competition!

### **Major-Specific Scholarships**
- STEM scholarships
- Arts scholarships
- Nursing scholarships
- Teaching scholarships

## **🔍 Where to Find Scholarships**

**Best Scholarship Websites:**
- Bold.org (no essay required for many!)
- Scholarships.com
- Fastweb.com
- CollegeBoard Scholarship Search
- Cappex
- Niche
- GoingMerry (applies to multiple at once!)

**Other Sources:**
- Your high school counselor
- Local community organizations
- Your parents' employers
- Your intended college's website
- Professional associations in your field

## **✍️ Winning Scholarship Essays**

**Keys to Success:**
- **Be authentic** - tell your unique story
- **Show impact** - how will this scholarship help?
- **Follow directions** - word count, format, deadline
- **Proofread** - typos = automatic disqualification
- **Reuse & customize** - adapt essays for multiple scholarships

**Common Prompts:**
- Why do you deserve this scholarship?
- Describe a challenge you've overcome
- What are your career goals?
- How will you give back to your community?

## **📅 Scholarship Timeline**

**Junior Year:**
- Spring: Start searching for scholarships
- Summer: Begin writing essays

**Senior Year:**
- September-October: Apply to early scholarships
- November-December: Apply to more as they open
- January-March: Peak scholarship season
- April-May: Local scholarships
- Ongoing: Keep applying even after committing!

**Pro Tip:** Treat scholarship applications like a part-time job!

## **💡 Scholarship Application Tips**

1. **Apply to MANY** - scholarship hunting is a numbers game
2. **Start with local** - less competition, better odds
3. **Meet every deadline** - set reminders!
4. **Keep a master file** - common essay, resume, transcript
5. **Apply to "weird" ones** - fewer applicants = better chance
6. **Don't ignore small scholarships** - $500 adds up!
7. **Beware of scams** - never pay to apply

## **🚫 Scholarship Scams - Red Flags**

- ❌ Requires payment to apply
- ❌ "Guaranteed" scholarships
- ❌ Unsolicited offers
- ❌ Pressure to "act now"
- ❌ Asking for credit card or bank info

**Remember: Legitimate scholarships are always free to apply!**

## **🎓 Negotiating Financial Aid**

**Yes, you can negotiate!**

**When to appeal:**
- You have a better offer from a peer school
- Family financial circumstances changed
- You received a significant outside scholarship
- Medical expenses or job loss occurred

**How to appeal:**
1. Call the financial aid office
2. Be polite and professional
3. Provide documentation
4. Explain your situation clearly
5. Follow up in writing

**Script:** "I'm thrilled about my acceptance, but the aid package doesn't make attendance possible for my family. I have a better offer from [peer school]. Is there any additional aid available?"

## **💰 Financial Aid by College Type**

### **Ivy League & Top Privates**
- No loans in aid packages (grants only!)
- Meet 100% of demonstrated need
- Very generous for families <$100k
- Examples: Harvard, Yale, Stanford, MIT

### **State Flagships (In-State)**
- Lower sticker price
- Some merit scholarships
- Limited need-based aid
- Examples: UCs, UVA, Michigan

### **Private Liberal Arts Colleges**
- Often generous merit and need-based aid
- Smaller endowments than big universities
- Examples: Grinnell, Macalester, Denison

### **Colleges with Full-Ride Programs**
- Competitive merit programs
- Examples: UNC (Morehead-Cain), Duke (Robertson), Vanderbilt (Cornelius Vanderbilt)

## **📊 Expected Family Contribution (EFC)**

**How it's calculated:**
- Parent income (major factor)
- Parent assets
- Student income
- Student assets (20% expected contribution)
- Family size
- Number in college

**Strategies to lower EFC:**
- Minimize student assets (put in parents' names or 529 plan)
- Time income strategically
- Report accurate information

## **✅ Financial Aid Checklist**

**Junior Year:**
- [ ] Research scholarship opportunities
- [ ] Create a scholarship tracking spreadsheet
- [ ] Start building your resume

**Senior Year - Fall:**
- [ ] Complete FAFSA (October 1+)
- [ ] Complete CSS Profile if required
- [ ] Apply to scholarships (weekly!)
- [ ] Request tax documents from parents

**Senior Year - Winter:**
- [ ] Submit remaining scholarship apps
- [ ] Compare financial aid offers
- [ ] Appeal if necessary

**Senior Year - Spring:**
- [ ] Accept your best financial aid package
- [ ] Continue applying to scholarships
- [ ] Thank scholarship donors
- [ ] Look for summer employment

## **🎯 Final Tips**

1. **Don't let cost stop you from applying** - many top schools are cheaper after aid than state schools
2. **Fill out FAFSA even if you think you won't qualify** - you might be surprised!
3. **Avoid private loans** - exhaust all federal options first
4. **Consider community college → transfer** - save money on first 2 years
5. **Work during college** - reduces loan burden
6. **Graduate on time** - every extra semester costs thousands

## **📞 Resources**

- **Federal Student Aid:** studentaid.gov
- **FAFSA Help:** 1-800-4-FED-AID
- **College Affordability Calculator:** collegecost.ed.gov
- **Net Price Calculators:** On each college's website

**Remember: College should be affordable. Don't take on more debt than your expected first-year salary! Need help calculating aid or finding scholarships? Let me know! 💪**`;
  }
  
  // Default/general response
  return `I'm your College Planning AI Assistant! I can help you with:

📚 **Academic Planning:**
- 4-year high school schedules tailored to specific colleges (MIT, Ivy League, UCs, etc.)
- Course selection and AP/Honors recommendations
- GPA and transcript management

🎓 **College Applications:**
- College selection and fit
- Application strategy and timeline
- Admissions requirements for specific schools

✍️ **Essays & Personal Statements:**
- Common App essay guidance
- Supplemental essay tips
- Personal statement strategies

📊 **Testing & Prep:**
- SAT/ACT preparation strategies
- Subject test recommendations
- AP exam planning

💰 **Financial Aid:**
- Scholarship opportunities
- FAFSA and CSS Profile help
- Financial aid negotiation

🎯 **Career & Major Planning:**
- Major selection guidance
- Career exploration
- Extracurricular recommendations

**Try asking me:**
- "Create a 4-year schedule for me targeting MIT"
- "I want to apply to UC schools - what courses should I take?"
- "Plan my schedule for Ivy League colleges"
- "What makes a good college essay?"
- "How do I choose the right college?"
- "Tell me about financial aid and scholarships"

What would you like help with today?`;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const { userMessage } = await request.json();

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

    // Get predefined response based on user message
    const responseText = getPredefinedResponse(userMessage, userProfile);

    console.log('Response generated successfully');
    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { response: "I'm sorry, I encountered an error processing your request. Please try again!" },
      { status: 500 }
    );
  }
}


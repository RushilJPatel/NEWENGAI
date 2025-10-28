import mongoose, { Schema, models, Model } from 'mongoose';

export interface IUserProfile {
  email: string;
  currentGrade: string;
  targetColleges: string[];
  intendedMajor: string;
  careerAspirations: string;
  currentGPA: string;
  apCoursesTaken: string[];
  strongestSubjects: string[];
  academicInterests: string[];
  hobbies: string[];
  extracurriculars: string[];
  preferredLocation: string[];
  studyTimePerDay: string;
  homeworkLoad: string;
  learningStyle: string;
  challenges: string[];
  goals: string[];
  financialAidNeeded: boolean;
  athleticInterest: boolean;
  athleticSport?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>({
  email: { type: String, required: true, unique: true, index: true },
  currentGrade: { type: String, default: '' },
  targetColleges: [{ type: String }],
  intendedMajor: { type: String, default: '' },
  careerAspirations: { type: String, default: '' },
  currentGPA: { type: String, default: '' },
  apCoursesTaken: [{ type: String }],
  strongestSubjects: [{ type: String }],
  academicInterests: [{ type: String }],
  hobbies: [{ type: String }],
  extracurriculars: [{ type: String }],
  preferredLocation: [{ type: String }],
  studyTimePerDay: { type: String, default: '' },
  homeworkLoad: { type: String, default: '' },
  learningStyle: { type: String, default: '' },
  challenges: [{ type: String }],
  goals: [{ type: String }],
  financialAidNeeded: { type: Boolean, default: false },
  athleticInterest: { type: Boolean, default: false },
  athleticSport: { type: String },
  onboardingCompleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const UserProfile: Model<IUserProfile> = models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;


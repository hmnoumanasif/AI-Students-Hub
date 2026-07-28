export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type AssignmentStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Graded';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  status: AssignmentStatus;
  notes?: string;
  createdAt: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  resourceLink?: string;
}

export interface RoadmapSection {
  id: string;
  category: 'Programming' | 'Mathematics' | 'Data Analysis' | 'Machine Learning' | 'Deep Learning' | 'AI Specialisations';
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export interface StudySession {
  id: string;
  topic: string;
  date: string;
  durationMinutes: number;
  notes?: string;
  type?: 'Lecture' | 'Coding' | 'Reading' | 'Revision' | 'Project';
}

export interface CourseGrade {
  id: string;
  courseName: string;
  creditHours: number;
  grade: string; // e.g. "A+", "A", "B+", etc.
  gradePoint: number;
}

export type ProjectStatus = 'Idea' | 'In Progress' | 'Completed' | 'Published';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: ProjectStatus;
  startDate: string;
  completedDate?: string;
}

export interface Certificate {
  id: string;
  name: string;
  platform: string;
  completionDate: string;
  credentialUrl?: string;
  skills: string[];
  imageUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Programming' | 'Mathematics' | 'Machine Learning' | 'Data Analysis';
  officialUrl: string;
  tags: string[];
  bookmarked?: boolean;
}

export interface VideoLink {
  id: string;
  title: string;
  channel: string;
  category: string;
  youtubeUrl: string;
  youtubeId: string;
  playlistId?: string;
  thumbnailUrl?: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  watched?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  salaryRange: string;
  demandLevel: 'Very High' | 'High' | 'Growing';
  requiredSkills: { name: string; category: string }[];
  recommendedCourses: { title: string; provider: string; url?: string }[];
  suggestedProjects: { title: string; description: string }[];
  learningSteps: string[];
}

export interface AINewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'LLMs' | 'Breakthroughs' | 'Open Source' | 'Ethics' | 'Robotics' | 'Hardware';
  summary: string;
  url: string;
  readTime: string;
  bookmarked?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface UserSettings {
  darkMode: boolean;
  studentName: string;
  degreeName: string;
  targetGpa: number;
  studyGoalHoursWeekly: number;
  warnOnPageReload: boolean;
  soundEffects: boolean;
}

export type ActiveTab =
  | 'dashboard'
  | 'roadmap'
  | 'assignments'
  | 'planner'
  | 'videos'
  | 'gpa'
  | 'projects'
  | 'certificates'
  | 'resources'
  | 'careers'
  | 'news'
  | 'settings';

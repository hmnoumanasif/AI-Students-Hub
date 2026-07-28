import { Assignment, StudySession, CourseGrade, Project, Certificate, Achievement, UserSettings } from '../types';

export const initialAssignments: Assignment[] = [];

export const initialStudySessions: StudySession[] = [];

export const initialCourses: CourseGrade[] = [];

export const initialProjects: Project[] = [];

export const initialCertificates: Certificate[] = [];

export const initialAchievements: Achievement[] = [
  { id: 'ach-1', title: 'First Step', description: 'Added your first assignment or goal.', iconName: 'CheckCircle2', isUnlocked: true, unlockedAt: '2026-07-01' },
  { id: 'ach-2', title: 'Python Practitioner', description: 'Completed all Python topics in Learning Roadmap.', iconName: 'Code', isUnlocked: true, unlockedAt: '2026-07-10' },
  { id: 'ach-3', title: 'Study Streak Starter', description: 'Logged study sessions 3 days in a row.', iconName: 'Flame', isUnlocked: true, unlockedAt: '2026-07-22' },
  { id: 'ach-4', title: 'GPA Champion', description: 'Calculated and achieved a GPA above 3.5.', iconName: 'GraduationCap', isUnlocked: true, unlockedAt: '2026-07-15' },
  { id: 'ach-5', title: 'Project Builder', description: 'Logged at least 2 completed AI projects.', iconName: 'FolderGit2', isUnlocked: true, unlockedAt: '2026-06-25' },
  { id: 'ach-6', title: 'Cert Collector', description: 'Earned 2 or more certifications.', iconName: 'Award', isUnlocked: true, unlockedAt: '2026-05-15' },
  { id: 'ach-7', title: 'Pomodoro Master', description: 'Completed 5 Pomodoro focus sessions.', iconName: 'Timer', isUnlocked: false },
  { id: 'ach-8', title: 'Roadmap Conqueror', description: 'Complete 50% of the AI Learning Roadmap.', iconName: 'Map', isUnlocked: false }
];

export const initialSettings: UserSettings = {
  darkMode: false,
  studentName: 'Muhammad Nouman Asif',
  degreeName: 'BS Artificial Intelligence',
  targetGpa: 0,
  studyGoalHoursWeekly: 0,
  warnOnPageReload: true,
  soundEffects: true
};

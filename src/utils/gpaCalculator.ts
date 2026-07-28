import { CourseGrade } from '../types';

export const GRADE_POINT_MAP: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

export function getGradePoint(gradeStr: string): number {
  return GRADE_POINT_MAP[gradeStr.toUpperCase().trim()] ?? 0.0;
}

export function formatGpa(gpa: number): string {
  if (typeof gpa !== 'number' || isNaN(gpa)) return '0.0';
  const str = gpa.toString();
  if (!str.includes('.')) {
    return gpa.toFixed(1);
  }
  return str;
}

export function calculateGpaSummary(courses: CourseGrade[]) {
  if (!courses || courses.length === 0) {
    return {
      totalCredits: 0,
      totalPoints: 0,
      gpa: 0,
      formattedGpa: '0.0',
      courseCount: 0,
      gradeDistribution: {} as Record<string, number>
    };
  }

  let totalCredits = 0;
  let totalPoints = 0;
  const gradeDistribution: Record<string, number> = {};

  courses.forEach((course) => {
    const credits = Math.max(1, Number(course.creditHours) || 1);
    const point = getGradePoint(course.grade);
    totalCredits += credits;
    totalPoints += credits * point;

    const gLetter = course.grade.toUpperCase();
    gradeDistribution[gLetter] = (gradeDistribution[gLetter] || 0) + 1;
  });

  const gpa = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;

  return {
    totalCredits,
    totalPoints: parseFloat(totalPoints.toFixed(2)),
    gpa,
    formattedGpa: formatGpa(gpa),
    courseCount: courses.length,
    gradeDistribution
  };
}

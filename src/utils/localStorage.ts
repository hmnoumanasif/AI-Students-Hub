const STORAGE_KEYS = {
  ASSIGNMENTS: 'ai_hub_assignments',
  ROADMAP: 'ai_hub_roadmap_sections',
  PROJECTS: 'ai_hub_projects',
  CERTIFICATES: 'ai_hub_certificates',
  STUDY_SESSIONS: 'ai_hub_study_sessions',
  GPA_COURSES: 'ai_hub_gpa_courses',
  SETTINGS: 'ai_hub_settings',
  RESOURCES_BOOKMARKS: 'ai_hub_resources_bookmarks',
  VIDEOS_WATCHED: 'ai_hub_videos_watched',
  NEWS_BOOKMARKS: 'ai_hub_news_bookmarks',
  ACHIEVEMENTS: 'ai_hub_achievements',
} as const;

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}

export function exportLocalStorageBackup(): string {
  const data: Record<string, unknown> = {};
  Object.values(STORAGE_KEYS).forEach((key) => {
    const val = localStorage.getItem(key);
    if (val !== null) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val;
      }
    }
  });
  return JSON.stringify(data, null, 2);
}

export function importLocalStorageBackup(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString) as Record<string, unknown>;
    if (typeof parsed !== 'object' || parsed === null) return false;

    Object.entries(parsed).forEach(([key, val]) => {
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    });
    return true;
  } catch (error) {
    console.error('Failed to import JSON backup:', error);
    return false;
  }
}

export function clearAllLocalStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export { STORAGE_KEYS };

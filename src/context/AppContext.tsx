import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Assignment,
  RoadmapSection,
  StudySession,
  CourseGrade,
  Project,
  Certificate,
  Resource,
  VideoLink,
  AINewsItem,
  Achievement,
  UserSettings,
  ActiveTab
} from '../types';
import {
  STORAGE_KEYS,
  loadFromLocalStorage,
  saveToLocalStorage,
  clearAllLocalStorage
} from '../utils/localStorage';
import { initialRoadmapSections } from '../data/roadmapData';
import { predefinedResources } from '../data/resourcesData';
import { predefinedVideoLinks } from '../data/videoLinksData';
import { predefinedAINews } from '../data/aiNewsData';
import {
  initialAssignments,
  initialStudySessions,
  initialCourses,
  initialProjects,
  initialCertificates,
  initialAchievements,
  initialSettings
} from '../data/initialData';
import { calculateGpaSummary } from '../utils/gpaCalculator';
import confetti from 'canvas-confetti';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Data State
  assignments: Assignment[];
  roadmapSections: RoadmapSection[];
  studySessions: StudySession[];
  gpaCourses: CourseGrade[];
  projects: Project[];
  certificates: Certificate[];
  resources: Resource[];
  videoLinks: VideoLink[];
  aiNews: AINewsItem[];
  achievements: Achievement[];
  settings: UserSettings;

  // Actions - Assignments
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  toggleAssignmentComplete: (id: string) => void;

  // Actions - Roadmap
  toggleTopicComplete: (sectionId: string, topicId: string) => void;
  overallRoadmapProgress: number;

  // Actions - Study Sessions
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  updateStudySession: (id: string, session: Partial<StudySession>) => void;
  deleteStudySession: (id: string) => void;
  weeklyStudyHours: number;

  // Actions - GPA Courses
  addCourse: (course: Omit<CourseGrade, 'id'>) => void;
  updateCourse: (id: string, course: Partial<CourseGrade>) => void;
  deleteCourse: (id: string) => void;
  gpaSummary: ReturnType<typeof calculateGpaSummary>;

  // Actions - Projects
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Actions - Certificates
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;

  // Actions - Video & Resource Bookmarks
  toggleVideoWatched: (id: string) => void;
  toggleResourceBookmark: (id: string) => void;
  toggleNewsBookmark: (id: string) => void;

  // Settings & Theme
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  toggleDarkMode: () => void;
  resetAllData: () => void;

  // System UI
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load state from localStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    const loaded = loadFromLocalStorage<UserSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
    let updatedName = loaded.studentName;
    if (!updatedName || updatedName === 'Alex Rivera') {
      updatedName = 'Muhammad Nouman Asif';
    }
    let updatedDegree = loaded.degreeName;
    if (!updatedDegree || updatedDegree === 'B.S. Artificial Intelligence & Data Science') {
      updatedDegree = 'BS Artificial Intelligence';
    }
    const hasCustomGoals = localStorage.getItem('ai_hub_goals_customized') === 'true';
    let targetGpa = loaded.targetGpa;
    let studyGoalHoursWeekly = loaded.studyGoalHoursWeekly;
    if (!hasCustomGoals) {
      targetGpa = 0;
      studyGoalHoursWeekly = 0;
    }
    const hasCustomTheme = localStorage.getItem('ai_hub_theme_customized') === 'true';
    if (!hasCustomTheme) {
      return { ...loaded, studentName: updatedName, degreeName: updatedDegree, targetGpa, studyGoalHoursWeekly, darkMode: false };
    }
    return { ...loaded, studentName: updatedName, degreeName: updatedDegree, targetGpa, studyGoalHoursWeekly };
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const hasCustomAssignments = localStorage.getItem('ai_hub_assignments_customized') === 'true';
    if (!hasCustomAssignments) {
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.ASSIGNMENTS, []);
  });

  const [roadmapSections, setRoadmapSections] = useState<RoadmapSection[]>(() => {
    const hasCustomRoadmap = localStorage.getItem('ai_hub_roadmap_customized') === 'true';
    if (!hasCustomRoadmap) {
      return initialRoadmapSections;
    }
    return loadFromLocalStorage(STORAGE_KEYS.ROADMAP, initialRoadmapSections);
  });

  const [studySessions, setStudySessions] = useState<StudySession[]>(() => {
    const hasCustomStudy = localStorage.getItem('ai_hub_study_customized') === 'true';
    if (!hasCustomStudy) {
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.STUDY_SESSIONS, []);
  });

  const [gpaCourses, setGpaCourses] = useState<CourseGrade[]>(() => {
    const hasCustomGpa = localStorage.getItem('ai_hub_gpa_customized') === 'true';
    if (!hasCustomGpa) {
      localStorage.removeItem(STORAGE_KEYS.GPA_COURSES);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.GPA_COURSES, []);
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const hasCustomProjects = localStorage.getItem('ai_hub_projects_customized') === 'true';
    if (!hasCustomProjects) {
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.PROJECTS, []);
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const hasCustomCerts = localStorage.getItem('ai_hub_certs_customized') === 'true';
    if (!hasCustomCerts) {
      localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.CERTIFICATES, []);
  });

  const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<string[]>(() => {
    const hasCustomRes = localStorage.getItem('ai_hub_res_bookmarks_customized') === 'true';
    if (!hasCustomRes) {
      localStorage.removeItem(STORAGE_KEYS.RESOURCES_BOOKMARKS);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.RESOURCES_BOOKMARKS, []);
  });

  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(() => {
    const hasCustomVideos = localStorage.getItem('ai_hub_videos_customized') === 'true';
    if (!hasCustomVideos) {
      localStorage.removeItem(STORAGE_KEYS.VIDEOS_WATCHED);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.VIDEOS_WATCHED, []);
  });

  const [bookmarkedNewsIds, setBookmarkedNewsIds] = useState<string[]>(() => {
    const hasCustomNews = localStorage.getItem('ai_hub_news_bookmarks_customized') === 'true';
    if (!hasCustomNews) {
      localStorage.removeItem(STORAGE_KEYS.NEWS_BOOKMARKS);
      return [];
    }
    return loadFromLocalStorage(STORAGE_KEYS.NEWS_BOOKMARKS, []);
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    loadFromLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements)
  );

  // Sync dark mode class on document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Persist State Changes
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.ASSIGNMENTS, assignments); }, [assignments]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.ROADMAP, roadmapSections); }, [roadmapSections]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.STUDY_SESSIONS, studySessions); }, [studySessions]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.GPA_COURSES, gpaCourses); }, [gpaCourses]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.CERTIFICATES, certificates); }, [certificates]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.RESOURCES_BOOKMARKS, bookmarkedResourceIds); }, [bookmarkedResourceIds]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.VIDEOS_WATCHED, watchedVideoIds); }, [watchedVideoIds]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.NEWS_BOOKMARKS, bookmarkedNewsIds); }, [bookmarkedNewsIds]);
  useEffect(() => { saveToLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements); }, [achievements]);

  // Toasts
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Compute Resources with bookmark flags
  const resources: Resource[] = predefinedResources.map((res) => ({
    ...res,
    bookmarked: bookmarkedResourceIds.includes(res.id)
  }));

  // Compute VideoLinks with watch flags
  const videoLinks: VideoLink[] = predefinedVideoLinks.map((vid) => ({
    ...vid,
    watched: watchedVideoIds.includes(vid.id)
  }));

  // Compute AI News with bookmark flags
  const aiNews: AINewsItem[] = predefinedAINews.map((n) => ({
    ...n,
    bookmarked: bookmarkedNewsIds.includes(n.id)
  }));

  // GPA Summary
  const gpaSummary = calculateGpaSummary(gpaCourses);

  // Overall Roadmap Progress Percentage
  const overallRoadmapProgress = React.useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    roadmapSections.forEach((sec) => {
      sec.topics.forEach((t) => {
        totalTopics += 1;
        if (t.completed) completedTopics += 1;
      });
    });
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  }, [roadmapSections]);

  // Weekly Study Hours (last 7 days)
  const weeklyStudyHours = React.useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const totalMins = studySessions.reduce((acc, sess) => {
      const sessDate = new Date(sess.date);
      if (sessDate >= sevenDaysAgo) {
        return acc + Number(sess.durationMinutes || 0);
      }
      return acc;
    }, 0);

    return parseFloat((totalMins / 60).toFixed(1));
  }, [studySessions]);

  // Check and unlock achievements
  const checkAchievements = useCallback(() => {
    setAchievements((prev) => {
      let changed = false;
      const updated = prev.map((ach) => {
        if (ach.isUnlocked) return ach;

        let unlock = false;
        if (ach.id === 'ach-1' && (assignments.length > 0 || projects.length > 0)) unlock = true;
        if (ach.id === 'ach-5' && projects.filter((p) => p.status === 'Completed').length >= 2) unlock = true;
        if (ach.id === 'ach-6' && certificates.length >= 2) unlock = true;
        if (ach.id === 'ach-4' && gpaSummary.gpa >= 3.5) unlock = true;
        if (ach.id === 'ach-8' && overallRoadmapProgress >= 50) unlock = true;

        if (unlock) {
          changed = true;
          showToast(`Achievement Unlocked: ${ach.title}! 🏆`, 'success');
          triggerConfetti();
          return { ...ach, isUnlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
        }
        return ach;
      });
      return changed ? updated : prev;
    });
  }, [assignments.length, projects, certificates.length, gpaSummary.gpa, overallRoadmapProgress, showToast, triggerConfetti]);

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  // Assignment Actions
  const addAssignment = (data: Omit<Assignment, 'id' | 'createdAt'>) => {
    localStorage.setItem('ai_hub_assignments_customized', 'true');
    const newAsg: Assignment = {
      ...data,
      id: 'asg-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setAssignments((prev) => [newAsg, ...prev]);
    showToast('Assignment added successfully!');
  };

  const updateAssignment = (id: string, data: Partial<Assignment>) => {
    localStorage.setItem('ai_hub_assignments_customized', 'true');
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
    showToast('Assignment updated.');
  };

  const deleteAssignment = (id: string) => {
    localStorage.setItem('ai_hub_assignments_customized', 'true');
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    showToast('Assignment deleted.', 'info');
  };

  const toggleAssignmentComplete = (id: string) => {
    localStorage.setItem('ai_hub_assignments_customized', 'true');
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const isCompleted = a.status === 'Submitted' || a.status === 'Graded';
          const newStatus = isCompleted ? 'In Progress' : 'Submitted';
          if (!isCompleted) triggerConfetti();
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  // Roadmap Actions
  const toggleTopicComplete = (sectionId: string, topicId: string) => {
    localStorage.setItem('ai_hub_roadmap_customized', 'true');
    setRoadmapSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          const updatedTopics = sec.topics.map((t) => {
            if (t.id === topicId) {
              const newCompleted = !t.completed;
              if (newCompleted) triggerConfetti();
              return { ...t, completed: newCompleted };
            }
            return t;
          });
          return { ...sec, topics: updatedTopics };
        }
        return sec;
      })
    );
  };

  // Study Session Actions
  const addStudySession = (sessionData: Omit<StudySession, 'id'>) => {
    localStorage.setItem('ai_hub_study_customized', 'true');
    const newSession: StudySession = {
      ...sessionData,
      id: 'sess-' + Date.now()
    };
    setStudySessions((prev) => [newSession, ...prev]);
    showToast('Study session logged!');
  };

  const updateStudySession = (id: string, data: Partial<StudySession>) => {
    localStorage.setItem('ai_hub_study_customized', 'true');
    setStudySessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast('Study session updated.');
  };

  const deleteStudySession = (id: string) => {
    localStorage.setItem('ai_hub_study_customized', 'true');
    setStudySessions((prev) => prev.filter((s) => s.id !== id));
    showToast('Study session removed.', 'info');
  };

  // GPA Actions
  const addCourse = (courseData: Omit<CourseGrade, 'id'>) => {
    localStorage.setItem('ai_hub_gpa_customized', 'true');
    const newCourse: CourseGrade = {
      ...courseData,
      id: 'crs-' + Date.now()
    };
    setGpaCourses((prev) => [...prev, newCourse]);
    showToast('Course added to GPA calculator.');
  };

  const updateCourse = (id: string, data: Partial<CourseGrade>) => {
    localStorage.setItem('ai_hub_gpa_customized', 'true');
    setGpaCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    showToast('Course updated.');
  };

  const deleteCourse = (id: string) => {
    localStorage.setItem('ai_hub_gpa_customized', 'true');
    setGpaCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('Course deleted from GPA list.', 'info');
  };

  // Project Actions
  const addProject = (projectData: Omit<Project, 'id'>) => {
    localStorage.setItem('ai_hub_projects_customized', 'true');
    const newProj: Project = {
      ...projectData,
      id: 'proj-' + Date.now()
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast('New AI project added!');
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    localStorage.setItem('ai_hub_projects_customized', 'true');
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    showToast('Project updated.');
  };

  const deleteProject = (id: string) => {
    localStorage.setItem('ai_hub_projects_customized', 'true');
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project deleted.', 'info');
  };

  // Certificate Actions
  const addCertificate = (certData: Omit<Certificate, 'id'>) => {
    localStorage.setItem('ai_hub_certs_customized', 'true');
    const newCert: Certificate = {
      ...certData,
      id: 'cert-' + Date.now()
    };
    setCertificates((prev) => [newCert, ...prev]);
    showToast('Certificate added to portfolio!');
    triggerConfetti();
  };

  const updateCertificate = (id: string, data: Partial<Certificate>) => {
    localStorage.setItem('ai_hub_certs_customized', 'true');
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    showToast('Certificate updated.');
  };

  const deleteCertificate = (id: string) => {
    localStorage.setItem('ai_hub_certs_customized', 'true');
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    showToast('Certificate deleted.', 'info');
  };

  // Bookmarks & Watches
  const toggleVideoWatched = (id: string) => {
    localStorage.setItem('ai_hub_videos_customized', 'true');
    setWatchedVideoIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleResourceBookmark = (id: string) => {
    localStorage.setItem('ai_hub_res_bookmarks_customized', 'true');
    setBookmarkedResourceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    showToast('Bookmark toggled.');
  };

  const toggleNewsBookmark = (id: string) => {
    localStorage.setItem('ai_hub_news_bookmarks_customized', 'true');
    setBookmarkedNewsIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    showToast('News item bookmarked.');
  };

  // Settings
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    localStorage.setItem('ai_hub_goals_customized', 'true');
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved.');
  };

  const toggleDarkMode = () => {
    localStorage.setItem('ai_hub_theme_customized', 'true');
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const resetAllData = () => {
    clearAllLocalStorage();
    setAssignments(initialAssignments);
    setRoadmapSections(initialRoadmapSections);
    setStudySessions(initialStudySessions);
    setGpaCourses(initialCourses);
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setBookmarkedResourceIds([]);
    setWatchedVideoIds([]);
    setBookmarkedNewsIds([]);
    setAchievements(initialAchievements);
    setSettings(initialSettings);
    showToast('All app data has been reset to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        assignments,
        roadmapSections,
        studySessions,
        gpaCourses,
        projects,
        certificates,
        resources,
        videoLinks,
        aiNews,
        achievements,
        settings,

        addAssignment,
        updateAssignment,
        deleteAssignment,
        toggleAssignmentComplete,

        toggleTopicComplete,
        overallRoadmapProgress,

        addStudySession,
        updateStudySession,
        deleteStudySession,
        weeklyStudyHours,

        addCourse,
        updateCourse,
        deleteCourse,
        gpaSummary,

        addProject,
        updateProject,
        deleteProject,

        addCertificate,
        updateCertificate,
        deleteCertificate,

        toggleVideoWatched,
        toggleResourceBookmark,
        toggleNewsBookmark,

        updateSettings,
        toggleDarkMode,
        resetAllData,

        toasts,
        showToast,
        removeToast,
        triggerConfetti,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isSidebarCollapsed,
        setIsSidebarCollapsed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

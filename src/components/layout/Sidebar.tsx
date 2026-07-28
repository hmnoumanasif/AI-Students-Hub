import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Map,
  CheckSquare,
  Calendar,
  Youtube,
  Calculator,
  FolderGit2,
  Award,
  BookOpen,
  Compass,
  Newspaper,
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    assignments,
    overallRoadmapProgress
  } = useApp();

  const pendingAssignmentsCount = assignments.filter(
    (a) => a.status === 'Not Started' || a.status === 'In Progress'
  ).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map, badge: `${overallRoadmapProgress}%` },
    { id: 'assignments', label: 'Assignment Tracker', icon: CheckSquare, badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'videos', label: 'Video Links', icon: Youtube },
    { id: 'gpa', label: 'GPA Calculator', icon: Calculator },
    { id: 'projects', label: 'Project Tracker', icon: FolderGit2 },
    { id: 'certificates', label: 'Certificate Tracker', icon: Award },
    { id: 'resources', label: 'Resource Library', icon: BookOpen },
    { id: 'careers', label: 'Career Roadmaps', icon: Compass },
    { id: 'news', label: 'Latest AI News', icon: Newspaper },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 80 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative z-30 flex flex-col h-screen bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border-r border-slate-800/80 text-slate-300 shrink-0 select-none"
    >
      {/* Expand / Collapse Floating Toggle Button */}
      <button
        onClick={() => setIsSidebarCollapsed((prev) => !prev)}
        className="absolute -right-3 top-5 z-40 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-slate-100 shadow-md transition-all hover:scale-110"
        title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* App Header / Logo */}
      <div className="flex items-center h-16 border-b border-slate-800/80 px-4">
        {isSidebarCollapsed ? (
          <div className="flex items-center justify-center w-full">
            <div
              className="relative flex items-center justify-center cursor-pointer group"
              onClick={() => setIsSidebarCollapsed(false)}
              title="AI Student Hub - Click to expand"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-1 -right-1.5 px-1 bg-slate-900 border border-teal-500/60 rounded text-[9px] font-black text-teal-300 shadow-sm leading-none py-0.5">
                AI
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 shrink-0 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-slate-100 tracking-tight text-base whitespace-nowrap flex items-center gap-1.5">
                AI Student Hub
                <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all relative group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/90 to-teal-600/80 text-white shadow-lg shadow-indigo-500/15 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                }`}
              />

              {!isSidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                    isSidebarCollapsed ? 'absolute top-1 right-1 px-1 py-0 text-[10px]' : ''
                  } ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-teal-300 border border-teal-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer info */}
      {!isSidebarCollapsed && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-400">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span>Offline Local Storage</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="mt-1 text-[11px] text-slate-500 truncate">No Auth &bull; Private &bull; Static</p>
        </div>
      )}
    </motion.aside>
  );
};

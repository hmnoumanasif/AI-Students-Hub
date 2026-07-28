import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  BookOpen,
  CheckSquare,
  Clock,
  FolderGit2,
  Award,
  Flame,
  Plus,
  ArrowUpRight,
  Sparkles,
  Quote,
  RefreshCw,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { motivationalQuotes } from '../data/quotesData';
import { Modal } from '../components/common/Modal';
import { PomodoroTimer } from '../components/timer/PomodoroTimer';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DashboardPage: React.FC = () => {
  const {
    setActiveTab,
    assignments,
    roadmapSections,
    overallRoadmapProgress,
    studySessions,
    weeklyStudyHours,
    projects,
    certificates,
    gpaSummary,
    settings,
    achievements
  } = useApp();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const currentQuote = motivationalQuotes[quoteIndex % motivationalQuotes.length];

  const pendingAssignments = assignments.filter((a) => a.status !== 'Submitted' && a.status !== 'Graded');
  const completedProjectsCount = projects.filter((p) => p.status === 'Completed').length;
  const unlockedAchievementsCount = achievements.filter((a) => a.isUnlocked).length;

  // Chart Data 1: Learning Progress per Roadmap Section
  const roadmapCategoryData = {
    labels: roadmapSections.map((s) => s.category),
    datasets: [
      {
        label: 'Completion %',
        data: roadmapSections.map((s) => {
          const total = s.topics.length;
          const done = s.topics.filter((t) => t.completed).length;
          return total > 0 ? Math.round((done / total) * 100) : 0;
        }),
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(20, 184, 166, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: 'rgba(30, 41, 59, 0.8)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  // Chart Data 2: Weekly Study Hours (Last 7 days)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const studyHoursByDay = days.map((_, i) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (6 - i));
    const formatted = targetDate.toISOString().split('T')[0];

    const daySessions = studySessions.filter((s) => s.date === formatted);
    const sumMins = daySessions.reduce((acc, curr) => acc + Number(curr.durationMinutes || 0), 0);
    return parseFloat((sumMins / 60).toFixed(1));
  });

  const weeklyChartData = {
    labels: days,
    datasets: [
      {
        label: 'Study Hours',
        data: studyHoursByDay,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointRadius: 4,
      }
    ]
  };

  // Chart Data 3: Assignment Status Breakdown
  const notStarted = assignments.filter((a) => a.status === 'Not Started').length;
  const inProgress = assignments.filter((a) => a.status === 'In Progress').length;
  const submitted = assignments.filter((a) => a.status === 'Submitted' || a.status === 'Graded').length;

  const assignmentStatusData = {
    labels: ['Not Started', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [notStarted, inProgress, submitted],
        backgroundColor: ['#f43f5e', '#f59e0b', '#10b981'],
        borderWidth: 0,
      }
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-teal-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> AI Academic Operating System
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              Welcome Back, {settings.studentName}! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl leading-relaxed">
              Track your AI curriculum, submit assignments on schedule, build machine learning projects, and maintain top academic performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTimerModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4" /> Start Focus Session
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
            >
              Study Planner
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Widgets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Widget 1: Overall Roadmap */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Roadmap Completed</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-100">{overallRoadmapProgress}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallRoadmapProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Widget 2: Pending Assignments */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Assignments Due</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-100">{pendingAssignments.length}</div>
            <p className="text-xs text-slate-400 mt-1">
              {assignments.length - pendingAssignments.length} submitted / graded
            </p>
          </div>
        </div>

        {/* Widget 3: Weekly Study Hours */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Study Hours (7d)</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-100">{weeklyStudyHours} hrs</div>
            <p className="text-xs text-teal-400 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Goal: {settings.studyGoalHoursWeekly}h / week
            </p>
          </div>
        </div>

        {/* Widget 4: GPA & Projects */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Semester GPA</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-100">{gpaSummary.formattedGpa} / 4.0</div>
            <p className="text-xs text-slate-400 mt-1">
              {completedProjectsCount} completed projects
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Section Completion */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">AI Learning Roadmap Progress</h3>
              <p className="text-xs text-slate-400">Subject mastery breakdown across curriculum sections</p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Open Roadmap <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <Bar
              data={roadmapCategoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8', callback: (v) => `${v}%` }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { size: 10 } }
                  }
                },
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        {/* Chart 2: Assignment Status Doughnut */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-100">Assignment Status</h3>
              <p className="text-xs text-slate-400">Total: {assignments.length} assignments</p>
            </div>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              Manage
            </button>
          </div>
          <div className="h-48 my-auto relative flex items-center justify-center">
            <Doughnut
              data={assignmentStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#cbd5e1', font: { size: 11 }, boxWidth: 12 }
                  }
                },
                cutout: '70%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Lower Row: Study Trend + Motivational Quote + Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Study Hours Line Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Weekly Study Hours Trend</h3>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {weeklyStudyHours} hrs logged
            </span>
          </div>
          <div className="h-48">
            <Line
              data={weeklyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                  }
                },
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        {/* Motivational Quote Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-indigo-400">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-4 h-4" /> Daily AI Wisdom
              </span>
              <button
                onClick={() => setQuoteIndex((prev) => prev + 1)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                title="Next Quote"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-200 italic text-sm leading-relaxed mb-4">
              "{currentQuote.quote}"
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-300">{currentQuote.author}</p>
            <p className="text-[11px] text-slate-400">{currentQuote.role}</p>
          </div>
        </div>

        {/* Upcoming Assignments List */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-100">Upcoming Deadlines</h3>
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-xs text-indigo-400 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingAssignments.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-semibold text-slate-100 truncate max-w-[150px]">{asg.title}</h4>
                    <p className="text-slate-400 mt-0.5">{asg.subject} &bull; Due: {asg.dueDate}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      asg.priority === 'High' || asg.priority === 'Urgent'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {asg.priority}
                  </span>
                </div>
              ))}

              {pendingAssignments.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-4">No pending assignments!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <h3 className="text-sm font-bold text-slate-100 mb-4 uppercase tracking-wider text-slate-400">
          Quick Action Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('assignments')}
            className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all group"
          >
            <Plus className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-100">Add Assignment</div>
            <div className="text-[10px] text-slate-400">Set due date & priority</div>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all group"
          >
            <Clock className="w-4 h-4 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-100">Log Study Session</div>
            <div className="text-[10px] text-slate-400">Track hours & notes</div>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all group"
          >
            <FolderGit2 className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-100">Add AI Project</div>
            <div className="text-[10px] text-slate-400">Save GitHub repo link</div>
          </button>

          <button
            onClick={() => setActiveTab('gpa')}
            className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all group"
          >
            <GraduationCap className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-100">GPA Calculator</div>
            <div className="text-[10px] text-slate-400">Calculate grade points</div>
          </button>
        </div>
      </div>

      {/* Focus Timer Modal */}
      <Modal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        title="Pomodoro Study Focus Timer"
        maxWidth="md"
      >
        <PomodoroTimer onSessionLogged={() => setIsTimerModalOpen(false)} />
      </Modal>
    </div>
  );
};

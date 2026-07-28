import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/Toast';
import { ReloadWarningModal } from './components/common/ReloadWarningModal';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { VideosPage } from './pages/VideosPage';
import { GpaCalculatorPage } from './pages/GpaCalculatorPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CareersPage } from './pages/CareersPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';

import { AnimatePresence, motion } from 'motion/react';
import { Modal } from './components/common/Modal';
import { PomodoroTimer } from './components/timer/PomodoroTimer';

function AppContent() {
  const { activeTab } = useApp();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'planner':
        return <StudyPlannerPage />;
      case 'videos':
        return <VideosPage />;
      case 'gpa':
        return <GpaCalculatorPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'careers':
        return <CareersPage />;
      case 'news':
        return <NewsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 antialiased font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-slate-950">
        <Header onOpenTimerModal={() => setIsTimerModalOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="max-w-7xl mx-auto"
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals & System UI */}
      <ReloadWarningModal />
      <GlobalSearchModal />
      <ToastContainer />

      <Modal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        title="Pomodoro Focus Timer"
        maxWidth="md"
      >
        <PomodoroTimer onSessionLogged={() => setIsTimerModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

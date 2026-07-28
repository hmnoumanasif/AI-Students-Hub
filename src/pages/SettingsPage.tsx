import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Moon, Sun, Download, Upload, RotateCcw, ShieldAlert, Save, Database, User } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { exportLocalStorageBackup, importLocalStorageBackup } from '../utils/localStorage';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, toggleDarkMode, resetAllData, showToast } = useApp();

  const [studentName, setStudentName] = useState(settings.studentName);
  const [degreeName, setDegreeName] = useState(settings.degreeName);
  const [targetGpa, setTargetGpa] = useState<number | string>(settings.targetGpa ? settings.targetGpa : '');
  const [studyGoalHoursWeekly, setStudyGoalHoursWeekly] = useState<number | string>(settings.studyGoalHoursWeekly ? settings.studyGoalHoursWeekly : '');
  const [warnOnPageReload, setWarnOnPageReload] = useState(settings.warnOnPageReload);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      studentName: studentName.trim(),
      degreeName: degreeName.trim(),
      targetGpa: targetGpa === '' ? 0 : Number(targetGpa),
      studyGoalHoursWeekly: studyGoalHoursWeekly === '' ? 0 : Number(studyGoalHoursWeekly),
      warnOnPageReload
    });
  };

  const handleExportBackup = () => {
    const jsonStr = exportLocalStorageBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_student_hub_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON Backup downloaded successfully!');
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) return;
    const success = importLocalStorageBackup(importJsonText);
    if (success) {
      showToast('Data restored from JSON backup! Reloading page...', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      showToast('Invalid JSON Backup file format.', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" /> Application Preferences
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Settings & Local Data Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Customize student profile, theme appearance, JSON data backups, and reset options.
          </p>
        </div>
      </div>

      {/* Profile & Academic Goals */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-indigo-400" /> Student Profile & Target Goals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title</label>
            <input
              type="text"
              value={degreeName}
              onChange={(e) => setDegreeName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target GPA Goal (4.0 Scale)</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="4.0"
              placeholder="e.g. 3.8"
              value={targetGpa}
              onChange={(e) => setTargetGpa(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Weekly Study Target (Hours)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 15"
              value={studyGoalHoursWeekly}
              onChange={(e) => setStudyGoalHoursWeekly(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              checked={warnOnPageReload}
              onChange={(e) => setWarnOnPageReload(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Warn before browser tab close / reload (Prevents accidental session reset)</span>
          </label>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </form>

      {/* Theme Options */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          {settings.darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />} Theme & Interface Mode
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Current Mode: <strong className="text-indigo-400">{settings.darkMode ? 'Dark Mode (Default)' : 'Light Mode'}</strong>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Toggle high-contrast dark theme or clean light theme.</p>
          </div>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            {settings.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            <span>Switch to {settings.darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>

      {/* Data Backup & Local Storage */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Database className="w-4 h-4 text-teal-400" /> Data Backup & Local Storage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export JSON */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-teal-400">
              <Download className="w-4 h-4" /> Export JSON Backup
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Download all your assignments, roadmap completion status, GPA records, projects, and certificates as a portable JSON file.
            </p>
            <button
              onClick={handleExportBackup}
              className="w-full py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download JSON Backup
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-400">
              <Upload className="w-4 h-4" /> Restore From JSON
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Import a previously saved JSON backup file to restore your entire academic dashboard state.
            </p>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" /> Import Backup JSON
            </button>
          </div>
        </div>

        {/* Danger Zone: Reset Local Storage */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-rose-400">
            <ShieldAlert className="w-4 h-4" /> Danger Zone: Clear Local Storage
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Resets all local storage keys back to initial default values. This action cannot be undone unless you have exported a JSON backup.
          </p>
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset All Local Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Confirm Reset Local Storage"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            Are you sure you want to clear all Local Storage data? This will revert all your custom assignments, GPA records, projects, and roadmap progress to default sample state.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetAllData();
                setIsResetConfirmOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>

      {/* Import JSON Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import JSON Backup Data"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Paste the raw contents of your exported JSON backup file below:
          </p>
          <textarea
            rows={8}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='{"ai_hub_assignments": [...], ...}'
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleImportBackup}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
            >
              Restore Data
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

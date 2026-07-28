import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudySession } from '../types';
import { Calendar, Clock, Plus, Trash2, Edit3, BookOpen, Flame, Brain, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { PomodoroTimer } from '../components/timer/PomodoroTimer';

export const StudyPlannerPage: React.FC = () => {
  const { studySessions, addStudySession, updateStudySession, deleteStudySession, weeklyStudyHours } = useApp();

  const [activeView, setActiveView] = useState<'daily' | 'weekly'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [notes, setNotes] = useState('');
  const [sessionType, setSessionType] = useState<StudySession['type']>('Coding');

  const openAddModal = () => {
    setEditingId(null);
    setTopic('');
    setDate(new Date().toISOString().split('T')[0]);
    setDurationMinutes(60);
    setNotes('');
    setSessionType('Coding');
    setIsModalOpen(true);
  };

  const openEditModal = (sess: StudySession) => {
    setEditingId(sess.id);
    setTopic(sess.topic);
    setDate(sess.date);
    setDurationMinutes(sess.durationMinutes);
    setNotes(sess.notes || '');
    setSessionType(sess.type || 'Coding');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    if (editingId) {
      updateStudySession(editingId, {
        topic: topic.trim(),
        date,
        durationMinutes: Number(durationMinutes) || 30,
        notes: notes.trim(),
        type: sessionType
      });
    } else {
      addStudySession({
        topic: topic.trim(),
        date,
        durationMinutes: Number(durationMinutes) || 30,
        notes: notes.trim(),
        type: sessionType
      });
    }
    setIsModalOpen(false);
  };

  // Filter study sessions for Daily vs Weekly
  const todayStr = new Date().toISOString().split('T')[0];
  const dailySessions = studySessions.filter((s) => s.date === todayStr);

  // Group weekly sessions by day
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" /> Productivity & Focus
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Study Planner & Focus Log</h1>
          <p className="text-slate-400 text-sm mt-1">
            Plan revisions, track daily study sessions, and run Pomodoro focus cycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 font-bold text-xs flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{weeklyStudyHours} Hours Logged This Week</span>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-600/25 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" /> Log Session
          </button>
        </div>
      </div>

      {/* Main Grid: Pomodoro Timer + Session Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Pomodoro Timer */}
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>

        {/* Right Col: Daily & Weekly Views */}
        <div className="lg:col-span-2 space-y-4">
          {/* View Switcher */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('daily')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeView === 'daily'
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Today's Sessions ({dailySessions.length})
              </button>
              <button
                onClick={() => setActiveView('weekly')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeView === 'weekly'
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Session Logs ({studySessions.length})
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {activeView === 'daily' && dailySessions.length === 0 && (
              <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
                <Clock className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold">No study sessions logged for today yet!</p>
                <p className="text-xs text-slate-500 mt-1">Start a Pomodoro cycle above or click "Log Session" to record your study time.</p>
              </div>
            )}

            {(activeView === 'daily' ? dailySessions : studySessions).map((sess) => (
              <div
                key={sess.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">{sess.topic}</h3>
                      {sess.type && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-teal-300 border border-slate-700">
                          {sess.type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {sess.date} &bull; <strong>{sess.durationMinutes} mins</strong> ({parseFloat((sess.durationMinutes / 60).toFixed(1))} hrs)
                    </p>
                    {sess.notes && (
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{sess.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditModal(sess)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteStudySession(sess.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-rose-400 border border-slate-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Study Session' : 'Log Study Session'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Subject *</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Backpropagation Math, Linear Algebra vectors"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (Minutes)</label>
              <input
                type="number"
                min={5}
                max={600}
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value as StudySession['type'])}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none"
            >
              <option value="Lecture">Lecture / Video</option>
              <option value="Coding">Coding / Implementation</option>
              <option value="Reading">Textbook Reading</option>
              <option value="Revision">Exam Revision</option>
              <option value="Project">Project Development</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Key Takeaways</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Understood Query, Key, Value matrix multiplication in self-attention."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold shadow-md"
            >
              {editingId ? 'Save Changes' : 'Log Study Session'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Assignment, Priority, AssignmentStatus } from '../types';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit3,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const AssignmentsPage: React.FC = () => {
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleAssignmentComplete
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [status, setStatus] = useState<AssignmentStatus>('Not Started');
  const [notes, setNotes] = useState('');

  const subjects = Array.from(new Set(assignments.map((a) => a.subject)));

  const getLatestDueDate = () => {
    const today = new Date().toISOString().split('T')[0];
    if (assignments.length > 0) {
      const sortedDates = assignments
        .map((a) => a.dueDate)
        .filter(Boolean)
        .sort((a, b) => b.localeCompare(a));
      if (sortedDates.length > 0 && sortedDates[0] > today) {
        return sortedDates[0];
      }
    }
    return today;
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSubject('');
    setDueDate(getLatestDueDate());
    setPriority('Medium');
    setStatus('Not Started');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (asg: Assignment) => {
    setEditingId(asg.id);
    setTitle(asg.title);
    setSubject(asg.subject);
    setDueDate(asg.dueDate);
    setPriority(asg.priority);
    setStatus(asg.status);
    setNotes(asg.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      updateAssignment(editingId, {
        title: title.trim(),
        subject: subject.trim(),
        dueDate,
        priority,
        status,
        notes: notes.trim()
      });
    } else {
      addAssignment({
        title: title.trim(),
        subject: subject.trim(),
        dueDate,
        priority,
        status,
        notes: notes.trim()
      });
    }
    setIsModalOpen(false);
  };

  // Filter & Search Logic
  const filtered = assignments.filter((asg) => {
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'All' || asg.subject === filterSubject;
    const matchesStatus = filterStatus === 'All' || asg.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || asg.priority === filterPriority;

    return matchesSearch && matchesSubject && matchesStatus && matchesPriority;
  });

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const pMap: Record<Priority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" /> Academic Workflows
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Assignment Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage course deliverables, project submissions, priorities, and deadlines.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Assignment
        </button>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or subject..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">All Subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">All Statuses</option>
            <option value="Not Started" className="bg-slate-900 text-white">Not Started</option>
            <option value="In Progress" className="bg-slate-900 text-white">In Progress</option>
            <option value="Submitted" className="bg-slate-900 text-white">Submitted</option>
            <option value="Graded" className="bg-slate-900 text-white">Graded</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">All Priorities</option>
            <option value="Urgent" className="bg-slate-900 text-white">Urgent</option>
            <option value="High" className="bg-slate-900 text-white">High</option>
            <option value="Medium" className="bg-slate-900 text-white">Medium</option>
            <option value="Low" className="bg-slate-900 text-white">Low</option>
          </select>

          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700 text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <button
              onClick={() => setSortBy(sortBy === 'dueDate' ? 'priority' : 'dueDate')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold uppercase"
            >
              {sortBy}
            </button>
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((asg) => {
          const isDone = asg.status === 'Submitted' || asg.status === 'Graded';

          return (
            <div
              key={asg.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-lg ${
                isDone
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {asg.subject}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      asg.priority === 'Urgent'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : asg.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {asg.priority}
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-1.5 ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  {asg.title}
                </h3>

                {asg.notes && (
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed line-clamp-2">
                    {asg.notes}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{asg.dueDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAssignmentComplete(asg.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    }`}
                    title={isDone ? 'Mark as Pending' : 'Mark as Submitted'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditModal(asg)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
                    title="Edit Assignment"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteAssignment(asg.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 border border-slate-700 text-rose-400 transition-colors"
                    title="Delete Assignment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="col-span-full p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            <CheckSquare className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No assignments match your search/filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Click "Add New Assignment" to log a new coursework deadline.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Assignment' : 'Add New Assignment'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement ResNet-18 in PyTorch"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Course</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Deep Learning"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AssignmentStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Graded">Graded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Instructions</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Include validation accuracy plots and upload GitHub URL."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md"
            >
              {editingId ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

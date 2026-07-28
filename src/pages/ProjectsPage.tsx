import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectStatus } from '../types';
import { FolderGit2, Plus, Github, ExternalLink, Trash2, Edit3, Sparkles, Filter } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const ProjectsPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('In Progress');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setTechnologies('');
    setGithubUrl('');
    setDemoUrl('');
    setStatus('In Progress');
    setStartDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingId(proj.id);
    setName(proj.name);
    setDescription(proj.description);
    setTechnologies(proj.technologies.join(', '));
    setGithubUrl(proj.githubUrl || '');
    setDemoUrl(proj.demoUrl || '');
    setStatus(proj.status);
    setStartDate(proj.startDate);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      updateProject(editingId, {
        name: name.trim(),
        description: description.trim(),
        technologies: techArray,
        githubUrl: githubUrl.trim() || undefined,
        demoUrl: demoUrl.trim() || undefined,
        status,
        startDate
      });
    } else {
      addProject({
        name: name.trim(),
        description: description.trim(),
        technologies: techArray,
        githubUrl: githubUrl.trim() || undefined,
        demoUrl: demoUrl.trim() || undefined,
        status,
        startDate
      });
    }
    setIsModalOpen(false);
  };

  const filteredProjects = selectedStatus === 'All'
    ? projects
    : projects.filter((p) => p.status === selectedStatus);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FolderGit2 className="w-4 h-4" /> Portfolio Showcase
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">AI Project Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">
            Build your software engineering portfolio with open-source machine learning projects and web apps.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-600/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add AI Project
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none p-2 rounded-xl bg-slate-900/80 border border-slate-800">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
        {['All', 'Idea', 'In Progress', 'Completed', 'Published'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === st
                ? 'bg-teal-600 text-white shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    proj.status === 'Completed' || proj.status === 'Published'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : proj.status === 'In Progress'
                      ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {proj.status}
                </span>

                <span className="text-[11px] text-slate-500 font-mono">Started: {proj.startDate}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 mb-2">{proj.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">{proj.description}</p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-white visited:text-slate-300 flex items-center gap-1 font-semibold"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-400 hover:text-teal-300 visited:text-teal-400 flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-rose-400 border border-slate-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            <FolderGit2 className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No AI projects logged for this status filter.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Project' : 'Add AI Project'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart Document RAG Assistant"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. RAG web app using LangChain, ChromaDB vector store, and local Llama 3."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used (Comma-separated)</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Python, PyTorch, LangChain, FastAPI, React"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repository URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo Link</label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://my-demo.example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none"
              >
                <option value="Idea">Idea</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
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
              {editingId ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

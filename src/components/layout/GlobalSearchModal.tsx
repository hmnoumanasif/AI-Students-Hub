import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Search, CheckSquare, FolderGit2, Award, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    assignments,
    projects,
    certificates,
    resources,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredAssignments = assignments.filter(
    (a) => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some((tech) => tech.toLowerCase().includes(q))
  );

  const filteredCertificates = certificates.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.platform.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
  );

  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );

  const totalResults =
    filteredAssignments.length +
    filteredProjects.length +
    filteredCertificates.length +
    filteredResources.length;

  const navigateAndClose = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Global AI Student Hub Search" maxWidth="2xl">
      <div className="space-y-4">
        {/* Search input field */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search assignments, projects, certificates, or docs (e.g., PyTorch, CNN, Calculus)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none transition-all shadow-inner"
          />
        </div>

        {/* Results container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-1">
          {q.length === 0 && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Search className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-medium">Type to search across your academic dashboard...</p>
              <p className="text-xs text-slate-500">Search by topic name, framework, subject, or technology tag.</p>
            </div>
          )}

          {q.length > 0 && totalResults === 0 && (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm font-medium">No matching items found for "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for generic keywords like "Python", "Deep Learning", or "Math".</p>
            </div>
          )}

          {/* Assignments Results */}
          {filteredAssignments.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4" /> Assignments ({filteredAssignments.length})
                </span>
                <button
                  onClick={() => navigateAndClose('assignments')}
                  className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {filteredAssignments.slice(0, 4).map((asg) => (
                  <div
                    key={asg.id}
                    onClick={() => navigateAndClose('assignments')}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-100">{asg.title}</h4>
                      <p className="text-xs text-slate-400">{asg.subject} &bull; Due: {asg.dueDate}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20">
                      {asg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4" /> Projects ({filteredProjects.length})
                </span>
                <button
                  onClick={() => navigateAndClose('projects')}
                  className="text-xs text-teal-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {filteredProjects.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateAndClose('projects')}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-100">{p.name}</h4>
                      <p className="text-xs text-slate-400 truncate max-w-md">{p.description}</p>
                    </div>
                    <div className="flex gap-1">
                      {p.technologies.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates Results */}
          {filteredCertificates.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Certificates ({filteredCertificates.length})
                </span>
                <button
                  onClick={() => navigateAndClose('certificates')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {filteredCertificates.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigateAndClose('certificates')}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-100">{c.name}</h4>
                      <p className="text-xs text-slate-400">{c.platform} &bull; Completed {c.completionDate}</p>
                    </div>
                    <span className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      Certified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resource Docs Results */}
          {filteredResources.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Resources & Docs ({filteredResources.length})
                </span>
                <button
                  onClick={() => navigateAndClose('resources')}
                  className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {filteredResources.slice(0, 4).map((res) => (
                  <a
                    key={res.id}
                    href={res.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
                        {res.title} <ExternalLink className="w-3 h-3 text-slate-400" />
                      </h4>
                      <p className="text-xs text-slate-400 truncate max-w-md">{res.description}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-slate-900 text-sky-300 rounded border border-slate-700">
                      {res.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Circle, ExternalLink, Map, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const { roadmapSections, toggleTopicComplete, overallRoadmapProgress } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>(
    roadmapSections.map((s) => s.id)
  );

  const categories = ['All', 'Programming', 'Mathematics', 'Data Analysis', 'Machine Learning', 'Deep Learning', 'AI Specialisations'];

  const filteredSections = selectedCategory === 'All'
    ? roadmapSections
    : roadmapSections.filter((s) => s.category === selectedCategory);

  const toggleSectionExpand = (id: string) => {
    setExpandedSectionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Map className="w-4 h-4" /> Comprehensive AI Degree Roadmap
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Interactive Curriculum Roadmap</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track your mastery across Programming, Math, Data Analysis, Machine Learning, Deep Learning, and AI Specialisations.
          </p>
        </div>

        {/* Overall Progress Gauge */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 min-w-[200px] flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700 stroke-current"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-400 stroke-current transition-all duration-500"
                strokeDasharray={`${overallRoadmapProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-slate-100">{overallRoadmapProgress}%</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Completion</div>
            <div className="text-sm font-bold text-slate-100">AI Curriculum</div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Roadmap Sections List */}
      <div className="space-y-6">
        {filteredSections.map((section) => {
          const total = section.topics.length;
          const completedCount = section.topics.filter((t) => t.completed).length;
          const sectionPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
          const isExpanded = expandedSectionIds.includes(section.id);

          return (
            <div
              key={section.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg overflow-hidden transition-all"
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSectionExpand(section.id)}
                className="group p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors border-b border-slate-800/60 select-none"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {section.category}
                    </span>
                    <h2 className="text-lg font-bold text-slate-100">{section.title}</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{section.description}</p>
                </div>

                {/* Progress Bar & Toggle */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end min-w-[120px]">
                    <span className="text-xs font-bold text-slate-200">{completedCount} / {total} Done ({sectionPercent}%)</span>
                    <div className="w-28 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${sectionPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-slate-100">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Topics Grid */}
              {isExpanded && (
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950/40">
                  {section.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => toggleTopicComplete(section.id, topic.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        topic.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div
                        className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                        title={topic.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                      >
                        {topic.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-sm font-semibold ${topic.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {topic.title}
                          </h3>
                          {topic.resourceLink && (
                            <a
                              href={topic.resourceLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-emerald-400 hover:text-emerald-300 visited:text-emerald-400 flex items-center gap-1 shrink-0"
                            >
                              Docs <ExternalLink className="w-3 h-3 text-emerald-400" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{topic.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

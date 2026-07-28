import React, { useState } from 'react';
import { careerRoadmapsData } from '../data/careerRoadmaps';
import { Compass, CheckCircle2, Circle, DollarSign, TrendingUp, BookOpen, FolderGit2, ArrowRight } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(careerRoadmapsData[0].id);
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({});

  const activeCareer = careerRoadmapsData.find((c) => c.id === selectedCareerId) || careerRoadmapsData[0];

  const toggleSkillCheck = (skillName: string) => {
    setCheckedSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" /> Career Guidance & Industry Paths
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">AI Career Roadmaps</h1>
          <p className="text-slate-400 text-sm mt-1">
            Step-by-step skill requirements, recommended courses, and project ideas for specialized AI job titles.
          </p>
        </div>
      </div>

      {/* Career Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {careerRoadmapsData.map((career) => {
          const isActive = career.id === selectedCareerId;
          return (
            <button
              key={career.id}
              onClick={() => setSelectedCareerId(career.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'bg-teal-600 border-teal-500 text-white shadow-md font-bold'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-xs font-extrabold truncate">{career.title}</div>
              <div className="text-[10px] opacity-80 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {career.demandLevel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Career Detail Panel */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
        {/* Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Target Role Breakdown
            </span>
            <h2 className="text-3xl font-black text-slate-100 mt-2">{activeCareer.title}</h2>
            <p className="text-teal-400 font-semibold text-sm mt-1">{activeCareer.tagline}</p>
            <p className="text-slate-300 text-xs mt-3 max-w-3xl leading-relaxed">{activeCareer.overview}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 min-w-[220px] space-y-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Est. Salary: <strong className="text-slate-100">{activeCareer.salaryRange}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Market Demand: <strong className="text-amber-300">{activeCareer.demandLevel}</strong></span>
            </div>
          </div>
        </div>

        {/* Required Skills Interactive Checklist */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Required Competencies & Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeCareer.requiredSkills.map((skill, idx) => {
              const isChecked = Boolean(checkedSkills[skill.name]);
              return (
                <div
                  key={idx}
                  onClick={() => toggleSkillCheck(skill.name)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <div>
                    <p className={`text-xs font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {skill.name}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">{skill.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-step Learning Order */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-teal-400" /> Step-By-Step Learning Sequence
          </h3>
          <div className="space-y-2.5">
            {activeCareer.learningSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses & Suggested Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          {/* Courses */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Top Industry Courses
            </h3>
            <div className="space-y-2">
              {activeCareer.recommendedCourses.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                  <h4 className="font-bold text-slate-100">{c.title}</h4>
                  <p className="text-slate-400 mt-0.5">{c.provider}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-teal-400" /> Key Capstone Projects
            </h3>
            <div className="space-y-2">
              {activeCareer.suggestedProjects.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                  <h4 className="font-bold text-slate-100">{p.title}</h4>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

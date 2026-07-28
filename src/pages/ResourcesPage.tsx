import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ExternalLink, Bookmark, Search, Filter } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { resources, toggleResourceBookmark } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Mathematics', 'Machine Learning', 'Data Analysis', 'Bookmarks Only'];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'Bookmarks Only') return res.bookmarked;
    if (selectedCategory !== 'All') return res.category === selectedCategory;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Academic Reference Documentation
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Resource Library</h1>
          <p className="text-slate-400 text-sm mt-1">
            Official documentation, interactive courses, and mathematical reference guides.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-sky-400 fill-current" />
          <span>{resources.filter((r) => r.bookmarked).length} Bookmarked Resources</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation or tags..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  {res.category}
                </span>

                <button
                  onClick={() => toggleResourceBookmark(res.id)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    res.bookmarked
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  title={res.bookmarked ? 'Remove Bookmark' : 'Bookmark Resource'}
                >
                  <Bookmark className={`w-4 h-4 ${res.bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-100 mb-2">{res.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{res.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {res.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
              <a
                href={res.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white visited:text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                Official Documentation <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No resources match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

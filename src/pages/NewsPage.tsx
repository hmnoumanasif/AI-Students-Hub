import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Newspaper, ExternalLink, Bookmark, Search, Filter, Sparkles, Clock } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { aiNews, toggleNewsBookmark } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'LLMs', 'Open Source', 'Breakthroughs', 'Robotics', 'Ethics', 'Hardware', 'Bookmarks Only'];

  const filteredNews = aiNews.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'Bookmarks Only') return item.bookmarked;
    if (selectedCategory !== 'All') return item.category === selectedCategory;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" /> Frontier Intelligence & Research
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Latest AI News & Breakthroughs</h1>
          <p className="text-slate-400 text-sm mt-1">
            Curated updates from DeepMind, Meta AI, MIT Tech Review, IEEE Spectrum, and arXiv.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-indigo-400 fill-current" />
          <span>{aiNews.filter((n) => n.bookmarked).length} Saved Articles</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI headlines, papers..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {item.category}
                </span>

                <button
                  onClick={() => toggleNewsBookmark(item.id)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    item.bookmarked
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${item.bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">{item.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px]">
                <span>{item.source}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.readTime}
                </span>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 visited:text-emerald-400 font-semibold flex items-center gap-1"
              >
                Read Article <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="col-span-full p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            <Newspaper className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No AI news items match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Youtube, CheckCircle2, Play, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const VideosPage: React.FC = () => {
  const { videoLinks, toggleVideoWatched } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activePlayerVideoId, setActivePlayerVideoId] = useState<string | null>(null);

  const categories = ['All', 'Deep Learning & LLMs', 'Mathematics for AI', 'Machine Learning', 'Deep Learning', 'Frameworks & Coding', 'Generative AI', 'NLP & LLMs'];

  const filteredVideos = videoLinks.filter((vid) => {
    const matchesCat = selectedCategory === 'All' || vid.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || vid.difficulty === selectedDifficulty;
    return matchesCat && matchesDiff;
  });

  const activeVideo = videoLinks.find((v) => v.youtubeId === activePlayerVideoId);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Youtube className="w-4 h-4" /> Recommended Video Lectures
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">YouTube AI Learning Library</h1>
          <p className="text-slate-400 text-sm mt-1">
            Curated premier video courses from Andrej Karpathy, 3Blue1Brown, MIT, Stanford, and StatQuest.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{videoLinks.filter((v) => v.watched).length} / {videoLinks.length} Watched</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none"
        >
          <option value="All">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className={`rounded-2xl border overflow-hidden transition-all flex flex-col justify-between shadow-lg ${
              vid.watched
                ? 'bg-slate-900/50 border-slate-800/60 opacity-85'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              {/* Thumbnail / Player Launcher */}
              <div
                onClick={() => setActivePlayerVideoId(vid.youtubeId)}
                className="relative aspect-video bg-slate-950 cursor-pointer group overflow-hidden"
              >
                <img
                  src={vid.thumbnailUrl || `https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const currentSrc = target.src;
                    if (currentSrc.includes('i.ytimg.com') && currentSrc.includes('hqdefault')) {
                      target.src = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
                    } else if (vid.thumbnailUrl && currentSrc !== vid.thumbnailUrl) {
                      target.src = vid.thumbnailUrl;
                    } else if (!currentSrc.includes('mqdefault')) {
                      target.src = `https://i.ytimg.com/vi/${vid.youtubeId}/mqdefault.jpg`;
                    } else {
                      target.src = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-slate-200 font-mono">
                  {vid.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 truncate">
                    {vid.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {vid.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 line-clamp-2 mb-1">
                  {vid.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-400 mb-2">{vid.channel}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
              <button
                onClick={() => toggleVideoWatched(vid.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                  vid.watched
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${vid.watched ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{vid.watched ? 'Watched' : 'Mark Watched'}</span>
              </button>

              <a
                href={vid.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-rose-400 hover:text-rose-300 visited:text-rose-400 flex items-center gap-1 font-semibold"
              >
                YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded YouTube Player Modal */}
      <Modal
        isOpen={Boolean(activePlayerVideoId)}
        onClose={() => setActivePlayerVideoId(null)}
        title={activeVideo?.title || 'YouTube Lecture'}
        maxWidth="3xl"
      >
        {activePlayerVideoId && activeVideo && (
          <div className="space-y-4">
            {/* Top Alert & Direct Launch Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {activeVideo.channel.includes('3Blue1Brown')
                    ? "3Blue1Brown's 'Essence of Linear Algebra' is best experienced in high resolution directly on YouTube or via playlist."
                    : "If YouTube restricts embedded playback in this browser preview, watch directly on YouTube."}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>

            {/* Embed Container */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative group">
              <iframe
                src={
                  activeVideo.playlistId
                    ? `https://www.youtube.com/embed/${activeVideo.youtubeId}?list=${activeVideo.playlistId}&autoplay=1&rel=0`
                    : activeVideo.youtubeUrl.includes('list=')
                    ? `https://www.youtube.com/embed/${activeVideo.youtubeId}?list=${activeVideo.youtubeUrl.split('list=')[1]?.split('&')[0]}&autoplay=1&rel=0`
                    : `https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`
                }
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Direct Link Banner Card if video is restricted or for easy access */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs font-bold text-indigo-400">{activeVideo.channel}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{activeVideo.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeVideo.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVideoWatched(activeVideo.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    activeVideo.watched
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${activeVideo.watched ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{activeVideo.watched ? 'Completed' : 'Mark Completed'}</span>
                </button>

                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch Course Series</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, RotateCcw, Coffee, Brain, Volume2, CheckCircle2 } from 'lucide-react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const MODE_TIMES: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const PomodoroTimer: React.FC<{ onSessionLogged?: () => void }> = ({ onSessionLogged }) => {
  const { addStudySession, showToast, triggerConfetti } = useApp();

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(MODE_TIMES.work);
  const [isRunning, setIsRunning] = useState(false);
  const [topic, setTopic] = useState('');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(MODE_TIMES[mode]);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            handleTimerFinished();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handleTimerFinished = () => {
    triggerConfetti();

    if (mode === 'work') {
      setCompletedPomodoros((prev) => prev + 1);
      // Automatically log study session
      addStudySession({
        topic: topic.trim() || 'Pomodoro Study Session',
        date: new Date().toISOString().split('T')[0],
        durationMinutes: 25,
        notes: 'Completed 25-minute Pomodoro focus session.',
        type: 'Coding'
      });
      showToast('🎉 Pomodoro Session Completed! 25 minutes logged.', 'success');
      setMode('shortBreak');
      if (onSessionLogged) onSessionLogged();
    } else {
      showToast('Break finished! Ready for next focus block.', 'info');
      setMode('work');
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_TIMES[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const totalDuration = MODE_TIMES[mode];
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 shadow-xl text-slate-100 flex flex-col items-center">
      {/* Mode Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-6 w-full max-w-sm justify-center">
        <button
          onClick={() => setMode('work')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'work'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Brain className="w-3.5 h-3.5" /> Focus (25m)
        </button>
        <button
          onClick={() => setMode('shortBreak')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'shortBreak'
              ? 'bg-teal-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" /> Break (5m)
        </button>
        <button
          onClick={() => setMode('longBreak')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'longBreak'
              ? 'bg-amber-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" /> Rest (15m)
        </button>
      </div>

      {/* Timer Circle */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-slate-800"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            className={`transition-all duration-500 ${
              mode === 'work' ? 'stroke-indigo-500' : mode === 'shortBreak' ? 'stroke-teal-400' : 'stroke-amber-500'
            }`}
            strokeWidth="6"
            strokeDasharray={276}
            strokeDashoffset={276 - (276 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight font-mono text-slate-100">
            {formattedTime}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">
            {mode === 'work' ? 'Deep Work' : 'Break Time'}
          </span>
        </div>
      </div>

      {/* Topic Input */}
      {mode === 'work' && (
        <div className="w-full max-w-sm mb-6">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Focus Topic:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Backpropagation Math, PyTorch Debugging..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {isRunning ? 'Pause' : 'Start Focus'}
        </button>

        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Completed Pomodoro Counter */}
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>Pomodoros Completed Today: <strong>{completedPomodoros}</strong></span>
      </div>
    </div>
  );
};

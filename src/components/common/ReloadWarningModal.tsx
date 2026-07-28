import React, { useEffect, useState } from 'react';
import { AlertTriangle, Database, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const ReloadWarningModal: React.FC = () => {
  const { settings } = useApp();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!settings.warnOnPageReload) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Standard browser prompt for reload confirmation
      e.preventDefault();
      e.returnValue = 'Warning: If you reload or leave, un-persisted session data may be lost!';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [settings.warnOnPageReload]);

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Page Reload Notice</h3>
            </div>

            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              If you reload this browser page, any unsaved transient progress or active timer sessions might be reset! Data is preserved in Browser Local Storage, but refreshing terminates active focus sessions.
            </p>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 mb-6 flex items-center gap-3 text-xs text-slate-300">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tip: You can backup all your data as a JSON file in <strong>Settings</strong> at any time.</span>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
              >
                I Understand, Stay on App
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

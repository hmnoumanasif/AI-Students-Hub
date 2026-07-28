import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all ${
              toast.type === 'success'
                ? 'bg-slate-900/90 dark:bg-slate-900/95 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-slate-900/90 dark:bg-slate-900/95 border-rose-500/40 text-rose-200'
                : 'bg-slate-900/90 dark:bg-slate-900/95 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0" />}
            <span className="text-sm font-medium flex-1 text-slate-100">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-100 transition-colors rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { Modal } from './Modal';
import { Command } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: 'Ctrl + K  /  Cmd + K', description: 'Global Search across resources, projects & assignments' },
    { key: 'Esc', description: 'Close modals & global search popup' },
    { key: '1', description: 'Jump to Dashboard' },
    { key: '2', description: 'Jump to Learning Roadmap' },
    { key: '3', description: 'Jump to Assignment Tracker' },
    { key: '4', description: 'Jump to Study Planner' },
    { key: '5', description: 'Jump to Video Links' },
    { key: '6', description: 'Jump to GPA Calculator' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" maxWidth="md">
      <div className="space-y-3">
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-sm"
          >
            <span className="text-slate-300 font-medium">{s.description}</span>
            <kbd className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs text-indigo-400 font-mono shadow-sm">
              {s.key}
            </kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
};

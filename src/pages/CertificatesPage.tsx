import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Certificate } from '../types';
import { Award, Plus, ExternalLink, Trash2, Edit3, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const CertificatesPage: React.FC = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().split('T')[0]);
  const [credentialUrl, setCredentialUrl] = useState('');
  const [skills, setSkills] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setPlatform('');
    setCompletionDate(new Date().toISOString().split('T')[0]);
    setCredentialUrl('');
    setSkills('');
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingId(cert.id);
    setName(cert.name);
    setPlatform(cert.platform);
    setCompletionDate(cert.completionDate);
    setCredentialUrl(cert.credentialUrl || '');
    setSkills(cert.skills.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const skillsArray = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingId) {
      updateCertificate(editingId, {
        name: name.trim(),
        platform: platform.trim(),
        completionDate,
        credentialUrl: credentialUrl.trim() || undefined,
        skills: skillsArray
      });
    } else {
      addCertificate({
        name: name.trim(),
        platform: platform.trim(),
        completionDate,
        credentialUrl: credentialUrl.trim() || undefined,
        skills: skillsArray
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" /> Academic Credentials
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Certificate Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">
            Log verified certifications, industry accreditations, and course completions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{certificates.length} Total Certificates</span>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/25 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Certificate
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Certification History Timeline</h2>

        <div className="relative pl-6 border-l-2 border-amber-500/30 space-y-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900 group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{cert.platform}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {cert.completionDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100">{cert.name}</h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-800 text-amber-200 border border-slate-700/80 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => openEditModal(cert)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteCertificate(cert.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-rose-400 border border-slate-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {certificates.length === 0 && (
            <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
              <Award className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold">No certificates added yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Certificate' : 'Add Certificate'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Certificate Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Deep Learning Specialization"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Platform / Institution</label>
              <input
                type="text"
                required
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="e.g. Coursera, edX, Kaggle, Stanford"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Date</label>
              <input
                type="date"
                required
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Credential URL</label>
            <input
              type="url"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://coursera.org/verify/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Skills Verified (Comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Neural Networks, PyTorch, CNNs, Optimization"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold shadow-md"
            >
              {editingId ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

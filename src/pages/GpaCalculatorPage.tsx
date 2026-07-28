import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseGrade } from '../types';
import {
  Calculator,
  Plus,
  Trash2,
  Edit3,
  GraduationCap,
  Award,
  Printer,
  Download,
  ExternalLink,
  Sparkles,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { GRADE_POINT_MAP, getGradePoint } from '../utils/gpaCalculator';

export const GpaCalculatorPage: React.FC = () => {
  const { gpaCourses, addCourse, updateCourse, deleteCourse, gpaSummary, settings } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(3);
  const [grade, setGrade] = useState('A');

  const openAddModal = () => {
    setEditingId(null);
    setCourseName('');
    setCreditHours(3);
    setGrade('A');
    setIsModalOpen(true);
  };

  const openEditModal = (crs: CourseGrade) => {
    setEditingId(crs.id);
    setCourseName(crs.courseName);
    setCreditHours(crs.creditHours);
    setGrade(crs.grade);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim()) return;

    const point = getGradePoint(grade);

    if (editingId) {
      updateCourse(editingId, {
        courseName: courseName.trim(),
        creditHours: Number(creditHours) || 3,
        grade,
        gradePoint: point
      });
    } else {
      addCourse({
        courseName: courseName.trim(),
        creditHours: Number(creditHours) || 3,
        grade,
        gradePoint: point
      });
    }
    setIsModalOpen(false);
  };

  const handlePrintReport = () => {
    setIsPrintModalOpen(true);
  };

  const triggerBrowserPrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Direct print failed, using popup printer:', err);
      openPrintWindow();
    }
  };

  const openPrintWindow = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Academic Transcript - ${settings.studentName}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; background: #fff; }
            .header { border-bottom: 2px solid #135c2d; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
            .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
            .meta-item { display: flex; flex-direction: column; }
            .meta-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; }
            .meta-val { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 2px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: left; padding: 10px 12px; background: #f1f5f9; font-size: 12px; font-weight: 700; color: #334155; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; }
            td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px; background: #a3d5ab; color: #135c2d; }
            .footer { font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 40px; }
            @media print {
              body { padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px; text-align: right;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #135c2d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
          </div>
          <div class="header">
            <div>
              <h1 class="title">Official Academic Transcript & GPA Report</h1>
              <p class="subtitle">AI Student Hub &bull; Academic Performance Operating System</p>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              Date: ${dateStr}
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Student Name</span>
              <span class="meta-val" style="font-size: 15px;">${settings.studentName}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Semester GPA</span>
              <span class="meta-val" style="color: #1b7f3f;">${gpaSummary.formattedGpa} / 4.0</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Total Credits / Points</span>
              <span class="meta-val" style="font-size: 15px;">${gpaSummary.totalCredits} hrs &bull; ${gpaSummary.totalPoints} pts</span>
            </div>
          </div>

          <h3>Course Grades Breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credit Hours</th>
                <th>Grade</th>
                <th>Grade Point</th>
                <th>Quality Points</th>
              </tr>
            </thead>
            <tbody>
              ${gpaCourses
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.courseName}</strong></td>
                  <td>${c.creditHours} hrs</td>
                  <td><span class="badge">${c.grade}</span></td>
                  <td>${getGradePoint(c.grade).toFixed(1)}</td>
                  <td>${(c.creditHours * getGradePoint(c.grade)).toFixed(1)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="footer">
            Generated automatically by AI Student Hub Academic System &bull; Official Student Performance Record
          </div>
        </body>
      </html>
    `;

    try {
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(printContent);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => {
          try {
            printWin.print();
          } catch (e) {
            console.log('Window print deferred', e);
          }
        }, 300);
        return;
      }
    } catch (e) {
      console.error('Window open failed:', e);
    }

    downloadTranscriptHtml();
  };

  const downloadTranscriptHtml = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Academic Transcript - ${settings.studentName}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; background: #fff; }
            .header { border-bottom: 2px solid #7c3aed; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
            .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
            .meta-item { display: flex; flex-direction: column; }
            .meta-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; }
            .meta-val { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 2px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: left; padding: 10px 12px; background: #f1f5f9; font-size: 12px; font-weight: 700; color: #334155; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; }
            td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px; background: #f3e8ff; color: #497d46; }
            .footer { font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Official Academic Transcript & GPA Report</h1>
              <p class="subtitle">AI Student Hub &bull; Academic Performance Operating System</p>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              Date: ${dateStr}
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Student Name</span>
              <span class="meta-val" style="font-size: 15px;">${settings.studentName}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Semester GPA</span>
              <span class="meta-val" style="color: #7c3aed;">${gpaSummary.formattedGpa} / 4.0</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Total Credits / Points</span>
              <span class="meta-val" style="font-size: 15px;">${gpaSummary.totalCredits} hrs &bull; ${gpaSummary.totalPoints} pts</span>
            </div>
          </div>

          <h3>Course Grades Breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credit Hours</th>
                <th>Grade</th>
                <th>Grade Point</th>
                <th>Quality Points</th>
              </tr>
            </thead>
            <tbody>
              ${gpaCourses
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.courseName}</strong></td>
                  <td>${c.creditHours} hrs</td>
                  <td><span class="badge">${c.grade}</span></td>
                  <td>${getGradePoint(c.grade).toFixed(1)}</td>
                  <td>${(c.creditHours * getGradePoint(c.grade)).toFixed(1)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="footer">
            Generated automatically by AI Student Hub Academic System &bull; Official Student Performance Record
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GPA_Report_${settings.studentName.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" /> Academic Performance
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Semester GPA Calculator</h1>
          <p className="text-slate-400 text-sm mt-1">
            Add course grades and credit hours to compute your official Semester & Cumulative GPA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintReport}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm hover:border-slate-600"
          >
            <Printer className="w-4 h-4 text-indigo-400" /> Print Report
          </button>
          <button
            onClick={openAddModal}
            className="h-[42px] px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/30 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Course Grade
          </button>
        </div>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Official GPA */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Semester GPA</span>
            <div className="text-3xl font-black text-slate-100 mt-1">{gpaSummary.formattedGpa}</div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Out of 4.0 Scale</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>

        {/* Card 2: Total Credit Hours */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Credit Hours</span>
            <div className="text-3xl font-black text-slate-100 mt-1">{gpaSummary.totalCredits}</div>
            <p className="text-xs text-slate-400 mt-1 font-medium">{gpaSummary.courseCount} Courses Enrolled</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Award className="w-8 h-8" />
          </div>
        </div>

        {/* Card 3: Quality Points */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Grade Points</span>
            <div className="text-3xl font-black text-slate-100 mt-1">{gpaSummary.totalPoints}</div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Weighted Quality Points</p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Calculator className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100">Enrolled Courses & Letter Grades</h2>
          <span className="text-xs text-slate-400 font-medium">Standard 4.0 Grading Scheme</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Course Name</th>
                <th className="p-4">Credit Hours</th>
                <th className="p-4">Letter Grade</th>
                <th className="p-4">Grade Point</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {gpaCourses.map((crs) => (
                <tr key={crs.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-100">{crs.courseName}</td>
                  <td className="p-4 text-slate-300">{crs.creditHours} hrs</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {crs.grade}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-200">{getGradePoint(crs.grade).toFixed(1)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(crs)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCourse(crs.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-rose-400 border border-slate-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {gpaCourses.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No courses added yet! Click "Add Course Grade" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Points Scale Reference */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Grade Point Reference Scale</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
          {Object.entries(GRADE_POINT_MAP).map(([gLetter, gVal]) => (
            <div key={gLetter} className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 flex justify-between">
              <span className="font-bold text-slate-200">{gLetter}</span>
              <span className="font-mono text-purple-400">{gVal.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Course' : 'Add Course Grade'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Course Name *</label>
            <input
              type="text"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Deep Learning & Neural Networks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Credit Hours</label>
              <input
                type="number"
                min={1}
                max={12}
                required
                value={creditHours}
                onChange={(e) => setCreditHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Letter Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              >
                {Object.keys(GRADE_POINT_MAP).map((g) => (
                  <option key={g} value={g} className="bg-slate-900 text-white font-medium py-1">
                    {g} ({GRADE_POINT_MAP[g].toFixed(1)})
                  </option>
                ))}
              </select>
            </div>
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md"
            >
              {editingId ? 'Save Changes' : 'Add Course'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Print Academic Report Modal */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Official Academic Transcript & GPA Report"
        maxWidth="2xl"
      >
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Ready for printing or downloading as official transcript PDF/HTML.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={triggerBrowserPrint}
                className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={openPrintWindow}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Open in printable new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>New Window</span>
              </button>
              <button
                onClick={downloadTranscriptHtml}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Download HTML file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Printable Document Paper Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-xl space-y-5 text-sm font-sans">
            <div className="border-b border-indigo-600/80 pb-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">
                  AI Student Hub &bull; Academic Transcript
                </div>
                <h2 className="text-xl font-extrabold text-slate-100">Official Semester Performance Report</h2>
              </div>
              <div className="text-right text-xs text-slate-400">
                Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Student Meta Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Student Name</span>
                <span className="font-bold text-slate-100 text-sm mt-0.5 block">{settings.studentName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Semester GPA</span>
                <span className="font-extrabold text-indigo-500 dark:text-indigo-400 text-base mt-0.5 block">{gpaSummary.formattedGpa} / 4.0</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Credits & Points</span>
                <span className="font-bold text-slate-200 text-xs mt-0.5 block">
                  {gpaSummary.totalCredits} Credits &bull; {gpaSummary.totalPoints} Points
                </span>
              </div>
            </div>

            {/* Course Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Course Grades Summary</h3>
              <div className="border border-slate-700/70 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700/70">
                      <th className="p-2.5">Course Name</th>
                      <th className="p-2.5">Credit Hours</th>
                      <th className="p-2.5">Grade</th>
                      <th className="p-2.5">Grade Point</th>
                      <th className="p-2.5 text-right">Weighted Quality Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {gpaCourses.map((c) => (
                      <tr key={c.id}>
                        <td className="p-2.5 font-semibold text-slate-100">{c.courseName}</td>
                        <td className="p-2.5 text-slate-300">{c.creditHours} hrs</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 text-[11px]">
                            {c.grade}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono font-bold text-slate-200">{getGradePoint(c.grade).toFixed(1)}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-slate-100">
                          {(c.creditHours * getGradePoint(c.grade)).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/60 text-center text-[10px] text-slate-400 font-medium">
              Verified by AI Student Hub Academic Operating System &bull; Official Student Performance Record
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};


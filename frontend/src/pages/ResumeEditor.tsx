
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ResumePreview from '../components/ResumePreview';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillForm from '../components/SkillForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import type { Resume } from '../utils/resumeSchema';

export default function ResumeEditor() {
  const { id } = useParams();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiIdx, setAiIdx] = useState<number | null>(null);

  useEffect(() => {
    api.get(`resumes/${id}/`).then(res => {
      setResume(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!resume) return;
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!resume) return;
    setSaving(true);
    await api.put(`resumes/${id}/`, resume);
    setSaving(false);
  };

  // Experience, Education, Skills handlers
  const handleExpChange = (exps: any) => resume && setResume({ ...resume, experiences: exps });
  const handleEdChange = (eds: any) => resume && setResume({ ...resume, educations: eds });
  const handleSkillChange = (skills: any) => resume && setResume({ ...resume, skills });

  // AI bullet enhancement
  const handleEnhance = async (idx: number, text: string) => {
    setAiLoading(true);
    setAiIdx(idx);
    setAiSuggestion(null);
    try {
      const res = await api.post('ai/enhance-bullet/', { bullet_point: text });
      setAiSuggestion(res.data.enhanced_bullet);
    } catch {
      setAiSuggestion('AI enhancement failed.');
    }
    setAiLoading(false);
  };
  const handleAcceptAI = () => {
    if (resume && aiIdx !== null && aiSuggestion) {
      const updated = resume.experiences.map((exp, i) => i === aiIdx ? { ...exp, description: aiSuggestion } : exp);
      setResume({ ...resume, experiences: updated });
    }
    setAiSuggestion(null);
    setAiIdx(null);
  };
  const handleDeclineAI = () => {
    setAiSuggestion(null);
    setAiIdx(null);
  };


  if (loading) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16">
        <div className="bg-white/80 p-8 rounded-2xl shadow text-center text-lg font-semibold">Loading...</div>
      </main>
      <Footer />
    </div>
  );
  if (!resume) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16">
        <div className="bg-white/80 p-8 rounded-2xl shadow text-center text-lg font-semibold">Resume not found.</div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full pt-28 pb-12 px-4">
        {/* Left: Editor */}
        <div className="w-full md:w-1/2 bg-white/90 p-8 rounded-2xl shadow-2xl space-y-8 border border-blue-100">
          <h2 className="text-2xl font-extrabold mb-4 text-blue-700">Edit Resume</h2>
          <div className="space-y-4">
            <input name="title" value={resume.title} onChange={handleChange} placeholder="Title" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="full_name" value={resume.full_name} onChange={handleChange} placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="email" value={resume.email} onChange={handleChange} placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <textarea name="summary" value={resume.summary} onChange={handleChange} placeholder="Summary" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px]" />
          </div>
          <ExperienceForm experiences={resume.experiences} onChange={handleExpChange} onEnhance={handleEnhance} />
          <EducationForm educations={resume.educations} onChange={handleEdChange} />
          <SkillForm skills={resume.skills} onChange={handleSkillChange} />
          <button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
        {/* Right: Live Preview */}
        <div className="w-full md:w-1/2 bg-white/90 p-8 rounded-2xl shadow-2xl border border-blue-100">
          <h2 className="text-2xl font-extrabold mb-4 text-blue-700">Live Preview</h2>
          <ResumePreview data={resume} />
        </div>
      </main>
      {/* AI Suggestion Modal */}
      {aiSuggestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h3 className="font-bold mb-2 text-blue-700">AI Suggestion</h3>
            <p className="mb-4 text-lg">{aiSuggestion}</p>
            <div className="flex gap-2 justify-end">
              <button onClick={handleAcceptAI} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">Accept</button>
              <button onClick={handleDeclineAI} className="bg-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400">Decline</button>
            </div>
          </div>
        </div>
      )}
      {/* AI Loading Overlay */}
      {aiLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-4 rounded-2xl shadow-2xl text-lg font-semibold">Enhancing with AI...</div>
        </div>
      )}
      <Footer />
    </div>
  );
}

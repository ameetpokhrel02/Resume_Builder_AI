import { useState } from 'react';
import type { Experience } from '../utils/resumeSchema';

interface Props {
  experiences: Experience[];
  onChange: (exps: Experience[]) => void;
  onEnhance?: (index: number, text: string) => void;
}

export default function ExperienceForm({ experiences, onChange, onEnhance }: Props) {
  const [newExp, setNewExp] = useState<Experience>({ job_title: '', company: '', start_date: '', end_date: '', description: '' });

  const handleAdd = () => {
    if (!newExp.job_title || !newExp.company) return;
    onChange([...experiences, newExp]);
    setNewExp({ job_title: '', company: '', start_date: '', end_date: '', description: '' });
  };

  const handleRemove = (idx: number) => {
    onChange(experiences.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, field: keyof Experience, value: string) => {
    const updated = experiences.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Experience</h3>
      {experiences.map((exp, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
          <input className="w-full border rounded px-2 py-1" placeholder="Job Title" value={exp.job_title} onChange={e => handleChange(idx, 'job_title', e.target.value)} />
          <input className="w-full border rounded px-2 py-1" placeholder="Company" value={exp.company} onChange={e => handleChange(idx, 'company', e.target.value)} />
          <input className="w-full border rounded px-2 py-1" placeholder="Location" value={exp.location || ''} onChange={e => handleChange(idx, 'location', e.target.value)} />
          <div className="flex gap-2">
            <input className="w-full border rounded px-2 py-1" type="date" value={exp.start_date} onChange={e => handleChange(idx, 'start_date', e.target.value)} />
            <input className="w-full border rounded px-2 py-1" type="date" value={exp.end_date || ''} onChange={e => handleChange(idx, 'end_date', e.target.value)} />
          </div>
          <div className="flex gap-2 items-center">
            <textarea className="w-full border rounded px-2 py-1" placeholder="Description / Bullet Point" value={exp.description} onChange={e => handleChange(idx, 'description', e.target.value)} />
            {onEnhance && (
              <button type="button" className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => onEnhance(idx, exp.description)}>Enhance ✨</button>
            )}
          </div>
          <button type="button" className="text-red-600 hover:underline text-sm" onClick={() => handleRemove(idx)}>Remove</button>
        </div>
      ))}
      <div className="flex gap-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Job Title" value={newExp.job_title} onChange={e => setNewExp({ ...newExp, job_title: e.target.value })} />
        <input className="w-full border rounded px-2 py-1" placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} />
        <button type="button" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

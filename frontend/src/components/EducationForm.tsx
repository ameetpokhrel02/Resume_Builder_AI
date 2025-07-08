import { useState } from 'react';
import type { Education } from '../utils/resumeSchema';

interface Props {
  educations: Education[];
  onChange: (eds: Education[]) => void;
}

export default function EducationForm({ educations, onChange }: Props) {
  const [newEd, setNewEd] = useState<Education>({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '' });

  const handleAdd = () => {
    if (!newEd.institution || !newEd.degree) return;
    onChange([...educations, newEd]);
    setNewEd({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '' });
  };

  const handleRemove = (idx: number) => {
    onChange(educations.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, field: keyof Education, value: string) => {
    const updated = educations.map((ed, i) => i === idx ? { ...ed, [field]: value } : ed);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Education</h3>
      {educations.map((ed, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
          <input className="w-full border rounded px-2 py-1" placeholder="Institution" value={ed.institution} onChange={e => handleChange(idx, 'institution', e.target.value)} />
          <input className="w-full border rounded px-2 py-1" placeholder="Degree" value={ed.degree} onChange={e => handleChange(idx, 'degree', e.target.value)} />
          <input className="w-full border rounded px-2 py-1" placeholder="Field of Study" value={ed.field_of_study} onChange={e => handleChange(idx, 'field_of_study', e.target.value)} />
          <div className="flex gap-2">
            <input className="w-full border rounded px-2 py-1" type="date" value={ed.start_date} onChange={e => handleChange(idx, 'start_date', e.target.value)} />
            <input className="w-full border rounded px-2 py-1" type="date" value={ed.end_date || ''} onChange={e => handleChange(idx, 'end_date', e.target.value)} />
          </div>
          <button type="button" className="text-red-600 hover:underline text-sm" onClick={() => handleRemove(idx)}>Remove</button>
        </div>
      ))}
      <div className="flex gap-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Institution" value={newEd.institution} onChange={e => setNewEd({ ...newEd, institution: e.target.value })} />
        <input className="w-full border rounded px-2 py-1" placeholder="Degree" value={newEd.degree} onChange={e => setNewEd({ ...newEd, degree: e.target.value })} />
        <button type="button" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { Skill } from '../utils/resumeSchema';

interface Props {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillForm({ skills, onChange }: Props) {
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (!newSkill.trim()) return;
    onChange([...skills, { name: newSkill }]);
    setNewSkill('');
  };

  const handleRemove = (idx: number) => {
    onChange(skills.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Skills</h3>
      <div className="flex gap-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Skill name" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
        <button type="button" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={handleAdd}>Add</button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {skills.map((s, idx) => (
          <li key={idx} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1">
            {s.name}
            <button type="button" className="text-red-600 hover:underline text-xs ml-2" onClick={() => handleRemove(idx)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

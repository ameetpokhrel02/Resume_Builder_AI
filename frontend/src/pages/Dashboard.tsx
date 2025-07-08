import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../services/api';
import type { Resume } from '../utils/resumeSchema';
import { Link, useNavigate } from 'react-router-dom';

// ...existing code...

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('resumes/')
      .then(res => {
        setResumes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setResumes([]);
        setError('Failed to load resumes.');
        setLoading(false);
      });
  }, []);

  const handleCreate = async () => {
    try {
      const res = await api.post('resumes/', {
        title: 'Untitled Resume',
        full_name: '',
        email: '',
        experiences: [],
        educations: [],
        skills: [],
      });
      navigate(`/resume/${res.data.id}`);
    } catch (e) {
      setError('Failed to create resume.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-md shadow-md">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">ResumeBuilderAI</Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-gray-700 font-medium">{user || 'User'}</span>
          <Link to="/" className="text-blue-600 hover:underline font-semibold">Home</Link>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mt-8 mb-8 border border-white/40">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome, {user || "User"}!</h1>
          <p className="text-lg text-gray-600 mb-8">Your AI-powered resume dashboard. Create, edit, and enhance your resumes with one click.</p>

          {/* Resume List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 bg-white/80 p-6 rounded-2xl shadow text-center text-lg font-semibold">Loading...</div>
            ) : error ? (
              <div className="col-span-2 bg-red-100 text-red-700 p-6 rounded-2xl shadow text-center font-semibold">{error}</div>
            ) : resumes.length === 0 ? (
              <div className="col-span-2 bg-white/80 p-6 rounded-2xl shadow text-center text-lg">No resumes yet.</div>
            ) : (
              resumes.map(r => (
                <div key={r.id} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{r.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">Last updated: {r.updated_at ? new Date(r.updated_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Link to={`/resume/${r.id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition">Edit</Link>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow hover:scale-105 transition">Delete</button>
                  </div>
                </div>
              ))
            )}
            {/* Add New Resume Card */}
            <button onClick={handleCreate} className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl p-6 hover:bg-blue-50 transition cursor-pointer min-h-[150px]">
              <span className="text-4xl text-blue-400 mb-2">+</span>
              <span className="text-lg font-semibold text-blue-500">Create New Resume</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 bg-white/60 backdrop-blur-md shadow-inner">
        © 2025 ResumeBuilderAI. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;

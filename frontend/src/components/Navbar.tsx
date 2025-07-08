import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm fixed top-0 left-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-extrabold text-blue-700 tracking-tight">ResumeBuilder<span className="text-blue-400">AI</span></Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-blue-700 font-semibold hover:text-blue-500 transition">Dashboard</Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

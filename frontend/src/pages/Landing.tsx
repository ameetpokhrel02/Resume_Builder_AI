import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">Build Your <span className="text-blue-400">AI-Powered</span> Resume</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl text-center">Create, edit, and enhance your professional resume with the help of AI. Modern design, real-time preview, and one-click export.</p>
        <Link to="/register" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition">Get Started Free</Link>
      </main>
      <Footer />
    </div>
  );
}

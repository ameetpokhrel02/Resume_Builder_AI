export default function Footer() {
  return (
    <footer className="w-full bg-white/80 backdrop-blur border-t border-blue-100 shadow-sm py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ResumeBuilderAI. All rights reserved.
      </div>
    </footer>
  );
}

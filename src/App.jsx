import React, { useState } from 'react';
import TeacherApp from './teacher/TeacherApp';
import StudentApp from './student/StudentApp';

const App = () => {
  const [mode, setMode] = useState(null); // null, 'teacher', 'student'

  // 选择界面
  if (mode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">AI Learning Platform</h1>
          <p className="text-gray-400 mb-10">Choose your role to continue</p>
          
          <div className="flex gap-6">
            {/* Teacher Card */}
            <button
              onClick={() => setMode('teacher')}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 w-64"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Teacher</h2>
              <p className="text-sm text-gray-500">Create and manage learning modules</p>
            </button>

            {/* Student Card */}
            <button
              onClick={() => setMode('student')}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 w-64"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Student</h2>
              <p className="text-sm text-gray-500">Learn with interactive conversations</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 根据模式渲染对应 App
  return mode === 'teacher' ? (
    <TeacherApp onBack={() => setMode(null)} />
  ) : (
    <StudentApp onBack={() => setMode(null)} />
  );
};

export default App;
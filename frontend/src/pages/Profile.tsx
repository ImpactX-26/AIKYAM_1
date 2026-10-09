import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    axios.get('http://localhost:3000/profile/me', {
      headers: { 'X-User-Email': email }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-blue-900 shadow-lg border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span className="font-semibold">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-blue-800 pb-24">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            My Applicant Profile
          </h1>
          <p className="text-blue-200 text-lg">
            Review your saved qualifications and application progress.
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-semibold text-lg">Loading Profile...</p>
          </div>
        ) : profile ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 max-w-3xl">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-3xl font-bold text-blue-600">AP</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Demo Applicant</h2>
                <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-full">
                  Status: {profile.qualification_status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Education Level</h3>
                <p className="text-lg font-semibold text-slate-800">{profile.education || 'Not Provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Target Field</h3>
                <p className="text-lg font-semibold text-slate-800">{profile.field || 'Not Provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">CGPA</h3>
                <p className="text-lg font-semibold text-slate-800">{profile.gpa ? profile.gpa : 'Not Provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">English Proficiency</h3>
                <p className="text-lg font-semibold text-slate-800">{profile.english_test || 'Not Provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Contact No.</h3>
                <p className="text-lg font-semibold text-slate-800">{profile.contact_no || 'Not Provided'}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Profile Completeness</h3>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full relative" style={{ width: `${profile.completeness_score}%` }}></div>
              </div>
              <p className="text-right text-sm font-bold text-blue-600 mt-2">{profile.completeness_score}% Complete</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-slate-500">
            Profile not found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

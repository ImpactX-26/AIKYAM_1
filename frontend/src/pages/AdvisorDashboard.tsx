import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdvisorDashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeReminders, setActiveReminders] = useState<string[]>([]); // applicant emails
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Make sure we simulate advisor authorization
    const role = localStorage.getItem('userRole');
    if (role !== 'advisor') {
      navigate('/login');
    }

    axios.get('http://localhost:3000/profile/all')
      .then(res => setProfiles(res.data))
      .catch(err => console.error('Failed to fetch applicants', err))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  // AI Reminder Agent Logic
  useEffect(() => {
    if (profiles.length === 0) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newReminders: string[] = [];

      profiles.forEach(profile => {
        if (profile.preferred_contact_time) {
          const contactTime = new Date(profile.preferred_contact_time).getTime();
          const tenMins = 10 * 60 * 1000;
          // Trigger reminder if within 10 minutes before the call, up to the call time
          if (now >= contactTime - tenMins && now <= contactTime) {
            const email = profile.user?.email || 'Applicant';
            if (!dismissedReminders.has(email) && !activeReminders.includes(email)) {
              newReminders.push(email);
            }
          }
        }
      });

      if (newReminders.length > 0) {
        setActiveReminders(prev => [...prev, ...newReminders]);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [profiles, activeReminders, dismissedReminders]);

  const handleDismissReminder = (email: string) => {
    setActiveReminders(prev => prev.filter(r => r !== email));
    setDismissedReminders(prev => new Set(prev).add(email));
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleReviewApplicant = async (email: string) => {
    try {
      await axios.post('http://localhost:3000/profile/review', { email });
      setProfiles(prev => prev.map(p => {
        if (p.user?.email === email) {
          return { ...p, completeness_score: 100, qualification_status: 'REVIEWED' };
        }
        return p;
      }));
    } catch (error) {
      console.error('Failed to mark as reviewed', error);
      alert('Failed to mark applicant as reviewed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Top Navigation Bar */}
      <nav className="bg-indigo-900 shadow-lg border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <svg className="w-6 h-6 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Educaro Advisor Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-indigo-200 text-sm hidden sm:block">Welcome, Expert Advisor</span>
              <button onClick={handleLogout} className="text-sm bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold shadow-inner border border-indigo-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-indigo-800 pb-24">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Applicant Overview
          </h1>
          <p className="text-indigo-200 text-lg">
            Review live progress, personal details, and qualifications of submitted applications.
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-semibold text-lg">Fetching Applicants...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {profiles.map(profile => (
              <div key={profile.id} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 text-lg shadow-sm border border-indigo-200">
                      {profile.user?.email.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{profile.user?.email || 'Unknown Applicant'}</h2>
                      <p className="text-sm text-slate-500">Applicant ID: {profile.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${profile.completeness_score >= 80 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                      {profile.completeness_score >= 80 ? 'SUBMITTED FOR REVIEW' : 'DRAFT IN PROGRESS'}
                    </span>
                    <p className="text-sm font-semibold text-indigo-600 mt-2">{profile.completeness_score}% Complete</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Personal & Academic Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Contact No.</span>
                      <span className="font-semibold text-slate-800">{profile.contact_no || 'Pending'}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Education Level</span>
                      <span className="font-semibold text-slate-800">{profile.education || 'Pending'}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Field</span>
                      <span className="font-semibold text-slate-800">{profile.field || 'Pending'}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">CGPA / Grades</span>
                      <span className="font-semibold text-slate-800">{profile.gpa ? profile.gpa : 'Pending'}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">English Level</span>
                      <span className="font-semibold text-slate-800">{profile.english_test || 'Pending'}</span>
                    </div>
                  </div>
                </div>
                
                {(profile.support_message || profile.preferred_contact_time) && (
                  <div className="p-6 bg-blue-50 border-t border-blue-100">
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                      Support Request
                    </h3>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 mb-4">
                      <p className="text-slate-700 italic">"{profile.support_message}"</p>
                    </div>
                    {profile.preferred_contact_time && (
                      <div className="flex flex-col gap-1 mt-3">
                        <div className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Scheduled Time: {new Date(profile.preferred_contact_time).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-indigo-600 ml-7">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                          AI Agent is monitoring this time and will alert you 10 mins prior.
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Advisor Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                  {profile.completeness_score === 80 ? (
                    <button 
                      onClick={() => handleReviewApplicant(profile.user?.email)}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Mark as Reviewed
                    </button>
                  ) : profile.completeness_score === 100 ? (
                    <div className="flex items-center gap-2 text-green-700 font-bold bg-green-100 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      File Reviewed
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-slate-500 italic">
                      Application incomplete ({profile.completeness_score}%)
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {profiles.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-slate-500">
                No applicant profiles found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Reminder Popups */}
      {activeReminders.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 animate-fade-in-up">
          {activeReminders.map(email => (
            <div key={email} className="bg-white rounded-xl shadow-2xl border-l-8 border-indigo-600 p-6 max-w-sm flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">AI Reminder</h4>
                <p className="text-sm text-slate-600 mt-1">You have a scheduled support call with <span className="font-bold text-indigo-600">{email}</span> in exactly 10 minutes. Prepare their file!</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleDismissReminder(email)} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold transition-colors">
                    Dismiss
                  </button>
                  <button onClick={() => handleDismissReminder(email)} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm">
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AdvisorDashboard;

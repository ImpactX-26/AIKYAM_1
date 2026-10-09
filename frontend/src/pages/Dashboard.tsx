import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    axios.get('http://localhost:3000/profile/me', {
      headers: { 'X-User-Email': email }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error('Failed to fetch profile', err));
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('userEmail');
      await axios.post('http://localhost:3000/profile/me', 
        { supportMessage, preferredTime },
        { headers: { 'X-User-Email': email } }
      );
      alert('Support request sent successfully! An advisor will contact you.');
      setShowSupportModal(false);
      setSupportMessage('');
      setPreferredTime('');
    } catch (err) {
      console.error(err);
      alert('Failed to send support request');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Top Navigation Bar */}
      <nav className="bg-blue-900 shadow-lg border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Educaro Pathfinder</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-blue-200 text-sm hidden sm:block">Welcome back, Applicant!</span>
              <Link to="/profile" className="text-sm text-blue-100 hover:text-white font-semibold transition-colors">
                My Profile
              </Link>
              <button onClick={handleLogout} className="text-sm bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold shadow-inner border border-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-800 pb-24">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Applicant Dashboard
          </h1>
          <p className="text-blue-200 text-lg">
            Track your journey to studying and working in Germany.
          </p>
        </div>
      </div>

      {/* Main Content Area - overlaps the hero section */}
      <div className="-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Action Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
                {profile?.completeness_score >= 80 ? 'Application Submitted!' : 'Next Best Action'}
              </h2>
              <p className="text-blue-100 mb-6">
                {profile?.completeness_score >= 80 
                  ? 'Your profile is currently under final review by our Educaro Advisor team.' 
                  : 'You need to submit your initial application form so our AI can analyze your profile.'}
              </p>
              {profile?.completeness_score < 80 && (
                <Link to="/application" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-md">
                  Start Application Now
                </Link>
              )}
            </div>
            
            <div className="p-6 sm:p-8 bg-white flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Your Application Steps</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 ${profile?.completeness_score >= 80 ? 'bg-green-100 border-green-500 text-green-600' : 'bg-blue-100 border-blue-600 text-blue-600'}`}>
                    {profile?.completeness_score >= 80 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <span className="font-bold text-sm">1</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className={`font-semibold ${profile?.completeness_score >= 80 ? 'text-green-700' : 'text-slate-900'}`}>Submit Initial Application</p>
                    <p className="text-slate-500 text-sm mt-1">Provide your basic info and goals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 ${profile?.completeness_score >= 80 ? 'bg-green-100 border-green-500 text-green-600' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
                    {profile?.completeness_score >= 80 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <span className="font-bold text-sm">2</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className={`font-semibold ${profile?.completeness_score >= 80 ? 'text-green-700' : 'text-slate-500'}`}>AI Profile Assessment</p>
                    <p className="text-slate-400 text-sm mt-1">Our AI will review your profile and find eligible universities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 ${profile?.completeness_score >= 80 ? 'bg-blue-100 border-blue-600 text-blue-600' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div className="ml-4">
                    <p className={`font-semibold ${profile?.completeness_score >= 80 ? 'text-slate-900' : 'text-slate-500'}`}>Final Review by Advisor</p>
                    <p className="text-slate-400 text-sm mt-1">An Educaro expert will review and finalize your journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-6">
            
            {/* Progress Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">Profile Completeness</h2>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-extrabold text-blue-600">{profile?.completeness_score || 0}%</span>
                <span className="text-slate-500 text-sm pb-1">complete</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full relative transition-all duration-1000" style={{ width: `${profile?.completeness_score || 0}%` }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                {profile?.completeness_score >= 80 
                  ? "Great job! Your profile is almost complete. Hang tight while an advisor reviews it." 
                  : "You're just getting started! Submit your application to unlock the next steps."}
              </p>
            </div>

            {/* Quick Links / Info Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Help & Resources
              </h2>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><Link to="/requirements" className="hover:text-white hover:underline flex items-center justify-between group">University Requirements <span className="text-slate-500 group-hover:text-blue-400 transition-colors">→</span></Link></li>
                <li><Link to="/cv-builder" className="hover:text-white hover:underline flex items-center justify-between group text-blue-300 font-bold">AI CV Builder (Lebenslauf) <span className="text-slate-500 group-hover:text-blue-400 transition-colors">→</span></Link></li>
                <li><Link to="/visa-guide" className="hover:text-white hover:underline flex items-center justify-between group text-green-300 font-bold">Visa Process Guide <span className="text-slate-500 group-hover:text-blue-400 transition-colors">→</span></Link></li>
                <li><button onClick={() => setShowSupportModal(true)} className="hover:text-white hover:underline flex items-center justify-between group w-full text-left">Contact Support <span className="text-slate-500 group-hover:text-blue-400 transition-colors">→</span></button></li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setShowSupportModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Contact Advisor Support</h2>
            <p className="text-slate-500 mb-6 text-sm">Need help, advice, or suggestions? Leave a message and your preferred availability.</p>
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">How can we help?</label>
                <textarea 
                  required 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-0 outline-none resize-none"
                  placeholder="Tell us what you need help with..."
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Contact Time</label>
                <input 
                  type="datetime-local" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-0 outline-none"
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;

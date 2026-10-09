import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [universities, setUniversities] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    education: '',
    gpa: '',
    englishTest: '',
    field: '',
    contactNo: ''
  });

  const handleNext = () => setStep(prev => prev + 1);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => handleNext(), 300);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  useEffect(() => {
    if (step === 6) {
      setIsAnalyzing(true);
      
      const processApplication = async () => {
        try {
          const email = localStorage.getItem('userEmail');
          
          // 1. Save progress to applicant profile
          await axios.post('http://localhost:3000/profile/me', formData, {
            headers: { 'X-User-Email': email }
          });
          
          // 2. Fetch AI Recommendations
          const response = await axios.post('http://localhost:3000/agents/recommend', formData);
          if (response.data && response.data.universities) {
            setUniversities(response.data.universities);
          } else {
            setUniversities([{ name: 'Fallback University', program: 'M.Sc. in ' + formData.field, chance: 'Medium', type: 'Public', reasoning: 'Missing valid response.' } as any]);
          }
        } catch (err) {
          console.error("Failed to fetch recommendations", err);
          // Fallback array if backend fails
          setUniversities([
            { name: 'Fallback University', program: 'M.Sc. in ' + formData.field, chance: 'Medium', type: 'Public', reasoning: 'This is a fallback response. Ensure your backend is running properly.' }
          ]);
        } finally {
          setIsAnalyzing(false);
          setStep(7);
        }
      };
      
      processApplication();
    }
  }, [step]);

  // AI Agent Avatar UI
  const AgentAvatar = () => (
    <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Assessment Agent</h3>
        <p className="text-slate-800 font-medium">Educaro Pathfinder</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
        
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full absolute top-0 left-0">
          <div 
            className="h-full bg-blue-600 transition-all duration-700 ease-out" 
            style={{ width: `${(step / 7) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center">
          
          {step < 6 && <AgentAvatar />}

          {/* Intro Step */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                Hello! Let's find out which German universities you are eligible for.
              </h1>
              <p className="text-slate-500 text-lg mb-8">
                I will ask you 4 quick questions about your academic background to check your eligibility against over 300+ public universities in Germany.
              </p>
              <button 
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Let's Start
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          )}

          {/* Q1 */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                What is your highest level of completed education?
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {['High School / 12th Grade', 'Bachelors Degree', 'Masters Degree'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleOptionSelect('education', opt)}
                    className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 font-semibold text-lg transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2 */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                What was your CGPA or final percentage?
              </h2>
              <form onSubmit={handleInputSubmit} className="flex gap-4">
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={formData.gpa}
                  onChange={e => setFormData({...formData, gpa: e.target.value})}
                  placeholder="e.g. 7.5 CGPA or 82%"
                  className="flex-1 px-6 py-4 text-xl rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-0 outline-none transition-colors text-slate-800"
                />
                <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md">
                  Next
                </button>
              </form>
            </div>
          )}

          {/* Q3 */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                Have you taken an English proficiency test?
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {['IELTS (Score: 6.5+)', 'IELTS (Score: Below 6.5)', 'TOEFL', 'Not taken yet'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleOptionSelect('englishTest', opt)}
                    className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 font-semibold text-lg transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q4 */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                What field of study are you interested in?
              </h2>
              <form onSubmit={handleInputSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={formData.field}
                  onChange={e => setFormData({...formData, field: e.target.value})}
                  placeholder="e.g. Mechanical Engineering, Computer Science"
                  className="w-full px-6 py-4 text-xl rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-0 outline-none transition-colors text-slate-800"
                />
                <button type="submit" className="w-full sm:w-auto self-start bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md">
                  Next
                </button>
              </form>
            </div>
          )}

          {/* Q5 */}
          {step === 5 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                What is your contact number?
              </h2>
              <form onSubmit={handleInputSubmit} className="flex flex-col gap-4">
                <input 
                  type="tel" 
                  autoFocus
                  required
                  value={formData.contactNo}
                  onChange={e => setFormData({...formData, contactNo: e.target.value})}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-6 py-4 text-xl rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-0 outline-none transition-colors text-slate-800"
                />
                <button type="submit" className="w-full sm:w-auto self-start bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md">
                  Analyze My Eligibility
                </button>
              </form>
            </div>
          )}

          {/* Analyzing */}
          {step === 6 && isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">AI Agent is working...</h2>
              
              <div className="space-y-3 w-full max-w-sm">
                <div className="flex items-center gap-3 text-slate-600 animate-pulse">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  <span>Searching the internet for German universities...</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 animate-pulse" style={{ animationDelay: '1s' }}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  <span>Scanning official websites for eligibility criteria...</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 animate-pulse" style={{ animationDelay: '2s' }}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Cross-referencing criteria with your qualifications...</span>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {step === 7 && (
            <div className="animate-fade-in-up py-4">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800">Your Eligibility Report</h2>
                <p className="text-lg text-slate-500 mt-2">We evaluated {universities.length} German universities against your profile.</p>
              </div>

              {/* Search Bar for the 300 results */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search to check a specific university..." 
                  onChange={e => {
                    const term = e.target.value.toLowerCase();
                    const filtered = universities.map(u => ({...u, hidden: !u.name.toLowerCase().includes(term)}));
                    setUniversities(filtered as any);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none text-slate-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-h-[50vh] overflow-y-auto pr-2">
                {universities.filter((u: any) => !u.hidden).map((uni, idx) => (
                  <div key={idx} className={`border rounded-2xl p-5 hover:shadow-md transition-all ${uni.eligible ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50 opacity-80'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-bold text-slate-800">{uni.name}</h3>
                      {uni.eligible ? (
                        <span className="shrink-0 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Eligible</span>
                      ) : (
                        <span className="shrink-0 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Not Eligible</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-3 font-medium">
                      <span className="text-slate-400 font-bold mr-1">AI Note:</span> 
                      {uni.reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition-all shadow-md w-full sm:w-auto"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

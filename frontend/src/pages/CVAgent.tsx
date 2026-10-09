import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CVAgent = () => {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const [cvData, setCvData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDetails: '', // DD.MM.YYYY, Place
    address: '',
    photoUrl: '', // URL for the uploaded photo
    education: '', // Degree, University, MM/YYYY - MM/YYYY
    experience: '', // Role, Company, MM/YYYY - MM/YYYY
    languages: '', // e.g. English (C1), German (B2)
    skills: '', // e.g. Python, MS Office
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCvData({ ...cvData, photoUrl: url });
    }
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 5) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(6);
      }, 3000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const AgentAvatar = () => (
    <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI CV Agent</h3>
        <p className="text-slate-800 font-medium">Lebenslauf Builder</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      {step < 6 ? (
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">

          <div className="h-2 bg-slate-100 w-full absolute top-0 left-0">
            <div
              className="h-full bg-indigo-600 transition-all duration-700 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center">

            {!isGenerating && <AgentAvatar />}

            {step === 0 && (
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                  Let's build your perfect German CV (Lebenslauf).
                </h1>
                <p className="text-slate-500 text-lg mb-8">
                  German universities and employers expect a very specific "tabular" format. I'll collect your details and generate a perfectly formatted PDF-ready CV for you!
                </p>
                <button
                  onClick={() => handleNext()}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg"
                >
                  Start Building
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Persönliche Daten (Personal Data)</h2>
                <form onSubmit={handleNext} className="space-y-4">
                  <input type="text" required placeholder="Full Name" value={cvData.fullName} onChange={e => setCvData({ ...cvData, fullName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <div className="flex gap-4">
                    <input type="email" required placeholder="Email Address" value={cvData.email} onChange={e => setCvData({ ...cvData, email: e.target.value })} className="w-1/2 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                    <input type="tel" required placeholder="Phone Number" value={cvData.phone} onChange={e => setCvData({ ...cvData, phone: e.target.value })} className="w-1/2 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  </div>
                  <input type="text" required placeholder="Address (Street, City, Country)" value={cvData.address} onChange={e => setCvData({ ...cvData, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <input type="text" required placeholder="Date & Place of Birth (e.g. 15.08.2000 in Mumbai, India)" value={cvData.birthDetails} onChange={e => setCvData({ ...cvData, birthDetails: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Bewerbungsfoto (Professional Photo - Optional but recommended)</label>
                    <div className="flex items-center gap-4">
                      {cvData.photoUrl && (
                        <img src={cvData.photoUrl} alt="Preview" className="w-16 h-20 object-cover border border-slate-300 rounded shadow" />
                      )}
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    </div>
                  </div>

                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-md">Next</button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Ausbildung (Education)</h2>
                <p className="text-sm text-slate-500 mb-4">List your most recent education first. Format: MM/YYYY.</p>
                <form onSubmit={handleNext} className="space-y-4">
                  <textarea required placeholder="e.g. 08/2020 - 05/2024: Bachelor of Science in Computer Science, University of Delhi" rows={4} value={cvData.education} onChange={e => setCvData({ ...cvData, education: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-md">Next</button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Praktische Erfahrung (Practical Experience)</h2>
                <p className="text-sm text-slate-500 mb-4">List internships or jobs. Gapless timelines are important in Germany!</p>
                <form onSubmit={handleNext} className="space-y-4">
                  <textarea placeholder="e.g. 06/2023 - 08/2023: Software Engineering Intern, TechCorp India" rows={4} value={cvData.experience} onChange={e => setCvData({ ...cvData, experience: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-md">Next</button>
                </form>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Weitere Fähigkeiten (Skills & Languages)</h2>
                <form onSubmit={handleNext} className="space-y-4">
                  <input type="text" required placeholder="Languages (e.g. English C1, German A2)" value={cvData.languages} onChange={e => setCvData({ ...cvData, languages: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <input type="text" required placeholder="IT Skills (e.g. Python, Java, MS Office)" value={cvData.skills} onChange={e => setCvData({ ...cvData, skills: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-none" />
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-md">Next</button>
                </form>
              </div>
            )}

            {step === 5 && !isGenerating && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Ready to generate your Lebenslauf!</h2>
                <p className="text-slate-600 mb-8">I will now process your data and compile it into a German-compliant tabular format.</p>
                <button onClick={() => handleNext()} className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md">
                  Generate My German CV
                </button>
              </div>
            )}

            {step === 5 && isGenerating && (
              <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Formatting Lebenslauf...</h2>
                <p className="text-slate-500">Applying German tabular structure (tabellarischer Lebenslauf)...</p>
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-md shadow-2xl p-10 sm:p-16 text-slate-800 animate-fade-in-up relative">

          <button onClick={() => navigate('/dashboard')} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <h1 className="text-4xl font-serif font-bold text-center border-b-2 border-slate-800 pb-6 mb-8 uppercase tracking-widest relative">
            Lebenslauf
            {cvData.photoUrl && (
              <img src={cvData.photoUrl} alt="Bewerbungsfoto" className="absolute top-0 right-0 w-[4.5cm] h-[6cm] object-cover border-4 border-white shadow-xl -mt-6" />
            )}
          </h1>

          <div className="grid grid-cols-[1fr_2fr] gap-x-8 gap-y-4 mb-10 text-sm">
            <h2 className="col-span-2 text-xl font-bold border-b border-slate-300 pb-2 mb-2 text-indigo-900">Persönliche Daten</h2>

            <div className="font-bold text-slate-600">Name</div>
            <div>{cvData.fullName}</div>

            <div className="font-bold text-slate-600">Adresse</div>
            <div>{cvData.address}</div>

            <div className="font-bold text-slate-600">Telefon</div>
            <div>{cvData.phone}</div>

            <div className="font-bold text-slate-600">E-Mail</div>
            <div>{cvData.email}</div>

            <div className="font-bold text-slate-600">Geburtsdaten</div>
            <div>{cvData.birthDetails}</div>
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-x-8 gap-y-4 mb-10 text-sm">
            <h2 className="col-span-2 text-xl font-bold border-b border-slate-300 pb-2 mb-2 text-indigo-900">Ausbildung</h2>

            <div className="font-bold text-slate-600">Zeitraum</div>
            <div className="whitespace-pre-line">{cvData.education}</div>
          </div>

          {cvData.experience && (
            <div className="grid grid-cols-[1fr_2fr] gap-x-8 gap-y-4 mb-10 text-sm">
              <h2 className="col-span-2 text-xl font-bold border-b border-slate-300 pb-2 mb-2 text-indigo-900">Praktische Erfahrung</h2>

              <div className="font-bold text-slate-600">Zeitraum</div>
              <div className="whitespace-pre-line">{cvData.experience}</div>
            </div>
          )}

          <div className="grid grid-cols-[1fr_2fr] gap-x-8 gap-y-4 mb-16 text-sm">
            <h2 className="col-span-2 text-xl font-bold border-b border-slate-300 pb-2 mb-2 text-indigo-900">Weitere Fähigkeiten</h2>

            <div className="font-bold text-slate-600">Sprachen</div>
            <div>{cvData.languages}</div>

            <div className="font-bold text-slate-600">IT-Kenntnisse</div>
            <div>{cvData.skills}</div>
          </div>

          <div className="mt-16 pt-8 text-sm text-slate-600 border-t border-slate-200">
            <p>München, den {new Date().toLocaleDateString('de-DE')}</p>
            <div className="mt-8 border-b border-slate-400 w-48"></div>
            <p className="mt-2">(Unterschrift / Signature)</p>
          </div>

          <div className="mt-12 text-center no-print flex justify-center gap-4">
            <button onClick={() => window.print()} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Download PDF
            </button>
            <button onClick={() => navigate('/dashboard')} className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-slate-300">
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVAgent;

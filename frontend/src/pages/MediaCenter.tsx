import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const MediaCenter = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
        setTranscript(null);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
        setTranscript(null);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const generateTranscript = () => {
    if (!videoFile) return;
    setIsTranscribing(true);
    setProgress(0);

    // Simulate AI Transcription process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsTranscribing(false);
      setTranscript(`[00:00:00] AI Agent: Transcript generated successfully.\n[00:00:02] Applicant: "Hello, my name is [Applicant Name]. I am applying for the Master's program in Computer Science."\n[00:00:08] Applicant: "I have always been passionate about software engineering and I believe German universities offer the best practical approach to this field."\n[00:00:15] Applicant: "I look forward to discussing my application with you. Thank you!"`);
    }, 4000);
  };

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
            Media Center
          </h1>
          <p className="text-blue-200 text-lg">
            Upload your introduction video for the Advisor. Our AI will automatically generate a transcript.
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Upload & Preview Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Video Upload</h2>
              
              {!videoFile ? (
                <div 
                  className="border-4 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[300px]"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <p className="text-lg font-bold text-slate-700">Drag & Drop your video here</p>
                  <p className="text-slate-500 mt-2">MP4, WebM, or OGG up to 50MB</p>
                  <button className="mt-6 bg-blue-100 text-blue-700 font-bold py-2 px-6 rounded-lg hover:bg-blue-200 transition-colors">
                    Browse Files
                  </button>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-200">
                    <video 
                      src={videoUrl!} 
                      controls 
                      className="w-full h-auto max-h-[400px] object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 truncate">
                      <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
                      <span className="font-semibold text-slate-700 truncate">{videoFile.name}</span>
                    </div>
                    <button 
                      onClick={() => { setVideoFile(null); setVideoUrl(null); setTranscript(null); }}
                      className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Transcript Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                AI Transcript Generator
              </h2>
              
              {!videoFile ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center h-[300px] flex flex-col justify-center items-center">
                  <p className="text-slate-500 font-medium">Upload a video first to generate an AI transcript.</p>
                </div>
              ) : !transcript && !isTranscribing ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center h-[300px] flex flex-col justify-center items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">Ready for Transcription</h3>
                  <p className="text-indigo-700 text-sm mb-6">Our AI will process your audio and extract the full dialogue.</p>
                  <button 
                    onClick={generateTranscript}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:scale-105"
                  >
                    Generate AI Transcript
                  </button>
                </div>
              ) : isTranscribing ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 h-[300px] flex flex-col justify-center shadow-inner">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-700">Analyzing audio track...</span>
                    <span className="font-bold text-indigo-600">{Math.min(progress, 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-300 relative" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm text-center animate-pulse">Running advanced speech recognition models...</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-[400px] flex flex-col shadow-inner">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Transcript Ready
                    </h3>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-lg">Copy Text</button>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                    {transcript?.split('\n').map((line, idx) => (
                      <div key={idx} className="text-slate-700">
                        {line.startsWith('[') ? (
                          <>
                            <span className="text-indigo-500 font-mono text-xs font-bold mr-2">{line.split(']')[0] + ']'}</span>
                            <span className={line.includes('AI Agent') ? 'italic text-slate-500' : 'font-medium'}>{line.split(']').slice(1).join(']')}</span>
                          </>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCenter;

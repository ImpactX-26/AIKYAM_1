import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const MediaCenter = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
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
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadVideo = async () => {
    if (!videoFile) return;
    setIsUploading(true);
    setUploadSuccess(false);
    
    try {
      const email = localStorage.getItem('userEmail') || 'test@example.com';
      const formData = new FormData();
      formData.append('video', videoFile);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/profile/video`, {
        method: 'POST',
        headers: {
          'x-user-email': email
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload video');
      
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Error uploading video. Please try again.');
    } finally {
      setIsUploading(false);
    }
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
            Upload your introduction video for the Advisor.
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100 max-w-3xl mx-auto">
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Video Upload</h2>
          
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
                  onClick={() => { setVideoFile(null); setVideoUrl(null); setUploadSuccess(false); }}
                  className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 bg-red-50 rounded-lg"
                >
                  Remove
                </button>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  onClick={uploadVideo}
                  disabled={isUploading || uploadSuccess}
                  className={`w-full max-w-sm py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${
                    uploadSuccess 
                      ? 'bg-green-500 cursor-default' 
                      : isUploading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                  }`}
                >
                  {uploadSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Sent to Advisor
                    </span>
                  ) : isUploading ? (
                    'Uploading...'
                  ) : (
                    'Send to Advisor'
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MediaCenter;

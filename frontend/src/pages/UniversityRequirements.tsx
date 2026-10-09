import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface University {
  name: string;
  website?: string;
  courses: string[];
}

const UniversityRequirements = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/catalog/universities')
      .then(res => {
        setUniversities(res.data);
      })
      .catch(err => console.error('Failed to fetch universities', err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredUnis = universities.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">

      {/* Top Navigation */}
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
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            German University Catalog
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Browse through 300+ public and private universities in Germany and explore the popular courses they offer for international students.
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8 border border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search for a university..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 text-lg transition-colors outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-semibold text-lg">Fetching 300+ Universities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUnis.map((uni, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white flex-1">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-4">{uni.name}</h2>

                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Courses Offered:</h3>
                  <ul className="space-y-2 mb-6">
                    {uni.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                {uni.website && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <a href={uni.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1 w-max">
                      Visit Official Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityRequirements;

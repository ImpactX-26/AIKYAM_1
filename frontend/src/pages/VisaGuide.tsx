import { Link } from 'react-router-dom';

const VisaGuide = () => {
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
            Germany Student Visa Guide
          </h1>
          <p className="text-blue-200 text-lg">
            Comprehensive Application & Interview Roadmap for Indian Students (2026)
          </p>
        </div>
      </div>

      <div className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100 max-w-4xl mx-auto">
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 mb-6">Part 1: The Pre-Application Roadmap</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Secure University Admission</h3>
                  <p className="text-slate-600 mt-1">You must possess an unconditional admission letter <em>(Zulassungsbescheid)</em> from a recognized German university. This document dictates your visa category and is strictly required to open your blocked account.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Apply for the APS Certificate (Mandatory)</h3>
                  <p className="text-slate-600 mt-1">The Akademische Prüfstelle (APS) verifies the authenticity of Indian academic documents. You cannot book a visa slot without it. Register online at aps-india.de, pay the non-refundable ₹18,000 fee, and courier your printed application with A4 color photocopies. <strong>Never send original documents to the APS.</strong></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Open a Blocked Account (Sperrkonto)</h3>
                  <p className="text-slate-600 mt-1">Germany requires upfront proof of financial resources. For 2026, you must deposit <strong>€11,904</strong> into a blocked account, which releases a monthly allowance of €992. Use digital providers like Expatrio, Fintiba, or Coracle. Once funded, you will receive a Blocking Confirmation <em>(Sperrbescheinigung)</em>, mandatory for the interview.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Procure Health Insurance</h3>
                  <p className="text-slate-600 mt-1">You must possess valid health insurance. The most efficient method is selecting a "Value Package" from your blocked account provider. This bundles statutory German health insurance for your studies with incoming travel insurance for your first few weeks.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Complete the VIDEX Form & Book Appointment</h3>
                  <p className="text-slate-600 mt-1">Complete the online application via the German Consular Services Portal (VIDEX) and print it. Concurrently, book an in-person visa appointment through VFS Global. Because wait times can be extensive, book as soon as your APS is actively processing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Attend the Visa Interview</h3>
                  <p className="text-slate-600 mt-1">Attend your VFS Global or Consulate appointment in person to submit biometric data, pay the visa fee, and present your dossier. Bring all original documents for verification alongside the required photocopies.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Core Milestone</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Typical Processing Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-800">APS Certificate</td>
                    <td className="px-6 py-4 text-slate-600">₹18,000</td>
                    <td className="px-6 py-4 text-slate-600">3–10 weeks</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-800">Blocked Account</td>
                    <td className="px-6 py-4 text-slate-600">€11,904 + setup fee</td>
                    <td className="px-6 py-4 text-slate-600">3–5 days for international transfer</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-800">Visa Processing</td>
                    <td className="px-6 py-4 text-slate-600">€75</td>
                    <td className="px-6 py-4 text-slate-600">3–6 weeks after interview</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 mb-6">Part 2: The Master Document Checklist</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-semibold text-blue-900">Important Submission Rule</p>
              <p className="text-blue-800 text-sm mt-1">You must bring all <strong>original documents</strong> to the interview, accompanied by <strong>two identical sets of A4-sized photocopies</strong>. Do not staple the documents together, and ensure all copies are legible.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Application & Identification</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>National Visa Application Form (VIDEX):</strong> Printed, completed, and signed (2 copies).</li>
                  <li><strong>Declaration under Section 54 of the Residence Act:</strong> Signed (2 copies).</li>
                  <li><strong>Declaration for Additional Contact Information:</strong> Signed (2 copies).</li>
                  <li><strong>Valid Passport:</strong> Issued within the last 10 years, with at least 2 blank pages.</li>
                  <li><strong>Passport Copies:</strong> A4-sized copies of the data pages (2 copies).</li>
                  <li><strong>Photographs:</strong> 3 recent, identical biometric passport-sized photos.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Academic & Admission Documents</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>APS Certificate:</strong> The original certificate issued by APS India.</li>
                  <li><strong>Letter of Admission (Zulassungsbescheid):</strong> Official university acceptance.</li>
                  <li><strong>Academic Qualifications:</strong> All previous degrees, diplomas, and mark sheets (including 10th and 12th grade).</li>
                  <li><strong>Language Proficiency Certificate:</strong> IELTS, TOEFL, Goethe, or TestDaF results not older than 1 year (unless admission explicitly exempts you).</li>
                  <li><strong>Curriculum Vitae (CV):</strong> Up-to-date summary of your academic/professional history.</li>
                  <li><strong>Motivation Letter:</strong> Signed statement explaining your academic choices.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Financial & Health Documents</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Proof of Financial Means:</strong> Blocked Account confirmation showing €11,904.</li>
                  <li><strong>Proof of Tuition Payment:</strong> If applicable, proof that the first two semesters have been paid.</li>
                  <li><strong>Travel Health Insurance:</strong> Valid medical coverage for your first 90 days.</li>
                  <li><strong>Visa Fee:</strong> €75, payable in INR via accepted methods at the center.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 mb-6">Part 3: Visa Interview Preparation</h2>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <p className="font-bold text-amber-900">Critical Interview Rules</p>
              <ul className="list-disc pl-5 mt-2 text-amber-800 text-sm space-y-1">
                <li><strong>Do not memorize scripts:</strong> Officers are trained to spot rehearsed answers. Speak naturally.</li>
                <li><strong>Know your file:</strong> Ensure your spoken answers exactly match the dates, amounts, and statements in your CV and Motivation Letter.</li>
                <li><strong>Learn basic German facts:</strong> Even for English-taught courses, know basic trivia (e.g., bordering countries, states, current Chancellor) to demonstrate genuine interest.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">1. Motivation and Choice of Study</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-3">
                  <p className="font-bold text-slate-900 mb-1">"Why did you choose Germany over other countries?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Avoid saying "it is cheap." Highlight the high quality of education, practical teaching approaches, research facilities, or strong industry connections in your field.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">"Why did you choose this specific university?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Be specific. Mention a particular professor, unique research facilities, or specific modules in the curriculum. Avoid generic praise.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">2. Academic Background</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-3">
                  <p className="font-bold text-slate-900 mb-1">"What is your educational background and GPA?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Prepare a concise 30-second summary: your previous school, degree, major subjects, and final grade.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-3">
                  <p className="font-bold text-slate-900 mb-1">"Can you explain your final year project or thesis?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Explain it simply in your own words. Reciting a memorized, highly technical abstract often raises red flags.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">"Why is there a gap between your graduation and this application?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Focus on productive activities: work experience, internships, language learning, or intensive exam preparation.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">3. Finances & Future Plans</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-3">
                  <p className="font-bold text-slate-900 mb-1">"How are you funding your studies and living costs?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Be direct. "I have opened a blocked account with [Provider] and deposited €11,904..."</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">"What are your plans after completing your studies?"</p>
                  <p className="text-slate-600 text-sm"><span className="font-semibold text-blue-600">Tip:</span> Emphasizing an intent to return to India to apply your new skills is generally safest, as it reduces the risk of rejection based on primary immigration intent.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VisaGuide;

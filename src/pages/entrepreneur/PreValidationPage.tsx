import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck, RefreshCw, Upload, Loader2, Play } from 'lucide-react';
import { demoBusiness } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function PreValidationPage() {
  const [validating, setValidating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fixed, setFixed] = useState(false);

  const handleValidate = () => {
    setValidating(true);
    setShowResults(false);
    setTimeout(() => {
      setValidating(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFix = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setFixed(true);
    }, 1500);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6">
      <motion.div variants={item} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Application Readiness Check</h1>
        <p className="text-slate-500">Run a pre-validation check before submitting your Pollution Consent application.</p>
      </motion.div>

      {!showResults && !validating && (
        <motion.div variants={item} className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Ready to validate?</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            The system will cross-check your business profile, required documents, and previous submissions to ensure your application is complete.
          </p>
          <button
            onClick={handleValidate}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Play size={18} />
            Run Validation Check
          </button>
        </motion.div>
      )}

      {validating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
        >
          <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Analysing Application Data...</h2>
          <p className="text-slate-500 text-sm">Checking document integrity and business rules.</p>
        </motion.div>
      )}

      <AnimatePresence>
        {showResults && !validating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className={`rounded-2xl border p-8 text-center relative overflow-hidden ${
              fixed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
            }`}>
              {fixed && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent" />
              )}
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`circular-progress ${fixed ? 'text-emerald-500' : 'text-blue-500'}`}>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="opacity-20" />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" stroke="currentColor" strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={fixed ? 0 : 283 * (1 - 0.87)}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="progress-text">
                      {fixed ? '100%' : '87%'}
                    </div>
                  </div>
                </div>
                
                <h2 className={`text-2xl font-bold mb-2 ${fixed ? 'text-emerald-800' : 'text-slate-800'}`}>
                  {fixed ? 'Application is 100% Ready' : 'Application is 87% Ready'}
                </h2>
                <p className={fixed ? 'text-emerald-600' : 'text-slate-500'}>
                  {fixed ? 'All requirements met. You can now submit your application.' : 'Some items require your attention before submission.'}
                </p>

                {fixed && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                  >
                    Submit Application
                  </motion.button>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="surface-card p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Validation Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Business Information Complete</p>
                    <p className="text-xs text-emerald-700 mt-0.5">All required profile fields are populated.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Identity Documents Verified</p>
                    <p className="text-xs text-emerald-700 mt-0.5">PAN ({demoBusiness.pan}) and GST verified successfully.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Land & Project Documents</p>
                    <p className="text-xs text-emerald-700 mt-0.5">MIDC Allotment and DPR are present and verified.</p>
                  </div>
                </div>

                {!fixed ? (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900">Machinery Details Incomplete</p>
                        <p className="text-xs text-amber-700 mt-0.5">The uploaded document appears to be missing page 2.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-red-900">Water Declaration Missing</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded uppercase tracking-wider">Required</span>
                        </div>
                        <p className="text-xs text-red-700 mb-3">This document is mandatory for Pollution Consent.</p>
                        <button
                          onClick={handleFix}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded text-xs font-medium hover:bg-red-50"
                        >
                          <Upload size={14} />
                          Upload Document & Fix All
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-emerald-900">Machinery Details Completed</p>
                        <p className="text-xs text-emerald-700 mt-0.5">Updated document verified.</p>
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-emerald-900">Water Declaration Uploaded</p>
                        <p className="text-xs text-emerald-700 mt-0.5">Mandatory document requirement met.</p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-center pb-8">
              <button 
                onClick={() => { setShowResults(false); setFixed(false); }}
                className="text-sm text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw size={14} />
                Run check again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

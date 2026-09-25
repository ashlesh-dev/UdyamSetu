import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, CheckCircle2, AlertCircle, IndianRupee, FileText, ChevronRight, X } from 'lucide-react';
import { schemes, getDocument } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function SchemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  
  const activeScheme = selectedScheme ? schemes.find(s => s.id === selectedScheme) : null;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title flex items-center gap-2">
          <Gift size={24} className="text-amber-500" />
          Schemes & Incentives
        </h1>
        <p className="text-slate-500 text-sm mt-1">Potential financial support identified for your business profile.</p>
      </motion.div>

      <motion.div variants={item} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Important Note</p>
          <p className="text-xs text-amber-700 mt-1">
            These are potential matches based on simulated data. Final eligibility is always subject to official scheme rules and government verification.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map(scheme => (
          <motion.div variants={item} key={scheme.id} className="surface-card hover:shadow-md transition-all flex flex-col relative overflow-hidden group">
            {/* Match Badge */}
            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
              {scheme.matchPercentage}% Match
            </div>

            <div className="p-6 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">{scheme.category}</span>
              <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{scheme.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{scheme.description}</p>
              
              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg mb-4">
                <IndianRupee size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Max Benefit</p>
                  <p className="text-sm font-semibold text-slate-700 leading-tight">{scheme.maxBenefit}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{scheme.availableDocumentIds.length} of {scheme.requiredDocumentIds.length} docs available</span>
                {scheme.missingDocumentIds.length > 0 ? (
                  <span className="text-amber-600">{scheme.missingDocumentIds.length} missing</span>
                ) : (
                  <span className="text-emerald-600">All docs ready</span>
                )}
              </div>
            </div>

            <button 
              className="w-full p-4 border-t border-slate-100 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              onClick={() => setSelectedScheme(scheme.id)}
            >
              View Eligibility Details
              <ChevronRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedScheme(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Gift size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{activeScheme.name}</h2>
                    <p className="text-xs text-slate-500">{activeScheme.category}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedScheme(null)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Potential Match</p>
                    <p className="text-3xl font-bold text-emerald-600">{activeScheme.matchPercentage}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Max Benefit</p>
                    <p className="text-lg font-bold text-slate-800">{activeScheme.maxBenefit}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Why you matched</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeScheme.matchReasons.map(reason => (
                      <div key={reason} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-emerald-900 font-medium">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Required Documents</h3>
                  <div className="space-y-2">
                    {activeScheme.requiredDocumentIds.map(docId => {
                      const doc = getDocument(docId);
                      const isAvail = activeScheme.availableDocumentIds.includes(docId);
                      return (
                        <div key={docId} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-slate-400" />
                            <span className={`text-sm font-medium ${isAvail ? 'text-slate-800' : 'text-slate-500'}`}>
                              {doc?.name || docId}
                            </span>
                          </div>
                          {isAvail ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                              <CheckCircle2 size={12} /> Available in Vault
                            </span>
                          ) : (
                            <button className="text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                              Upload
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 max-w-sm">{activeScheme.eligibilityNote}</p>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap">
                  Apply for Scheme
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ShieldAlert, User, FileText, Download, Building2, MapPin, Loader2 } from 'lucide-react';
import { applications, demoBusiness } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function RiskScrutinyPage() {
  const app = applications[0]; // PC application with medium risk
  const [reviewing, setReviewing] = useState(false);
  const [decision, setDecision] = useState<string | null>(null);

  const handleDecision = (type: 'approve' | 'query' | 'reject') => {
    setReviewing(true);
    setTimeout(() => {
      setReviewing(false);
      setDecision(type);
    }, 1500);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <ShieldAlert size={24} className="text-rose-500" />
            Application Scrutiny & Risk Assessment
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review system-flagged risk indicators before making a decision.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Risk Assessment Card */}
          <motion.div variants={item} className="surface-card overflow-hidden shadow-sm">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1 block">System Risk Assessment</span>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-500" />
                  <span className="text-xl font-bold text-amber-700">Medium Risk</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">System Recommendation</span>
                <span className="text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                  Manual Review Required
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Risk Indicators</h3>
              <div className="space-y-3">
                {app.riskIndicators.map((indicator, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${
                    indicator.status === 'pass' ? 'bg-emerald-50 border-emerald-100' :
                    indicator.status === 'warning' ? 'bg-amber-50 border-amber-100' :
                    'bg-red-50 border-red-100'
                  }`}>
                    {indicator.status === 'pass' ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> :
                     indicator.status === 'warning' ? <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" /> :
                     <ShieldAlert size={18} className="text-red-500 shrink-0 mt-0.5" />}
                    
                    <div>
                      <p className={`text-sm font-semibold ${
                        indicator.status === 'pass' ? 'text-emerald-800' :
                        indicator.status === 'warning' ? 'text-amber-800' :
                        'text-red-800'
                      }`}>
                        {indicator.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        indicator.status === 'pass' ? 'text-emerald-600' :
                        indicator.status === 'warning' ? 'text-amber-700' :
                        'text-red-700'
                      }`}>
                        {indicator.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4">Officer Decision</h3>
                
                {decision ? (
                  <div className={`p-4 rounded-lg border flex items-center justify-between ${
                    decision === 'approve' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                    decision === 'query' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                    'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={20} />
                      <span className="font-medium">
                        {decision === 'approve' ? 'Application Approved' : 
                         decision === 'query' ? 'Query Raised to Applicant' : 'Application Rejected'}
                      </span>
                    </div>
                    <button onClick={() => setDecision(null)} className="text-xs underline font-medium">Undo</button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                      onClick={() => handleDecision('approve')}
                      disabled={reviewing}
                    >
                      {reviewing ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                      Approve
                    </button>
                    <button 
                      className="px-6 py-2.5 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                      onClick={() => handleDecision('query')}
                      disabled={reviewing}
                    >
                      Raise Query
                    </button>
                    <button 
                      className="px-6 py-2.5 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50"
                      onClick={() => handleDecision('reject')}
                      disabled={reviewing}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <motion.div variants={item} className="surface-card p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Application Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Application ID</p>
                <p className="text-sm font-semibold text-slate-800 font-mono">{app.applicationNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Type</p>
                <p className="text-sm font-medium text-slate-700">Pollution Consent (CTE/CTO)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Submission Date</p>
                <p className="text-sm font-medium text-slate-700">{app.submittedDate}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="surface-card p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Applicant Info</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                <Building2 size={20} className="text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{demoBusiness.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <User size={10} /> {demoBusiness.pan}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
              <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600">{demoBusiness.location}</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="surface-card p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Submitted Documents</h3>
            <div className="space-y-2">
              {['PAN Card', 'GST Certificate', 'Land Document', 'Project Report'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 group">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-700">{doc}</span>
                  </div>
                  <button className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download size={14} />
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between p-2 rounded bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span className="text-sm text-amber-800 font-medium">Machinery Details</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 px-1.5 py-0.5 bg-white rounded uppercase">Flagged</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

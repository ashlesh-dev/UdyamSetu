import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, Send, ChevronRight, PhoneCall, Building2, CheckCircle2 } from 'lucide-react';
import { grievances } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function GrievancePage() {
  const [escalating, setEscalating] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const grievance = grievances[0];

  const handleEscalate = () => {
    setEscalating(true);
    setTimeout(() => {
      setEscalating(false);
      setEscalated(true);
    }, 2500);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title flex items-center gap-2">
          <MessageSquare size={24} className="text-rose-500" />
          Grievance & Escalation
        </h1>
        <p className="text-slate-500 text-sm mt-1">Raise issues or escalate delayed applications beyond SLA timelines.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          {/* Active Grievance Card */}
          <div className="surface-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Application Reference</span>
                <p className="font-bold text-slate-800 font-mono">{grievance.applicationNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  escalated ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {escalated ? 'Escalated to Nodal Officer' : 'Open (SLA Breach)'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-bold text-slate-800 mb-2">Issue: {grievance.issue}</h3>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                Application has been stuck at "{grievance.currentStage}" stage. The mandated SLA is {grievance.slaDays} days, but {grievance.elapsedDays} days have elapsed without progress.
              </p>
            </div>

            {!escalated ? (
              <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-rose-900 mb-1">Escalation Available</h4>
                    <p className="text-sm text-rose-700 mb-4">
                      This application has breached the SLA limit by 2 days. You can now escalate this to the Department Nodal Officer.
                    </p>
                    <button
                      onClick={handleEscalate}
                      disabled={escalating}
                      className="px-6 py-2.5 bg-rose-600 text-white rounded-lg font-medium text-sm hover:bg-rose-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                      {escalating ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <RefreshCw size={16} />
                          </motion.div>
                          Processing Escalation...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Raise Escalation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-amber-600" />
                  Escalation Flow Activated
                </h4>
                <div className="flex flex-col space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-300 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <User size={14} />
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
                      <p className="font-semibold text-slate-800 text-xs mb-1">Applicant</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Building2 size={14} />
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-amber-200 bg-amber-100 shadow-sm">
                      <p className="font-semibold text-amber-900 text-xs mb-1">Nodal Officer</p>
                      <p className="text-[10px] text-amber-700">Currently reviewing</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-200 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <AlertCircle size={14} />
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 bg-slate-50 shadow-sm opacity-50">
                      <p className="font-semibold text-slate-500 text-xs mb-1">Head of Department</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Support Sidebar */}
        <motion.div variants={item} className="space-y-4">
          <button className="w-full surface-card p-4 flex items-center justify-between hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <MessageSquare size={18} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800 text-sm">New Grievance</p>
                <p className="text-xs text-slate-500">Log a new issue</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-500" />
          </button>

          <div className="bg-navy-900 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <PhoneCall size={18} className="text-blue-400" />
              MAITRI Helpdesk
            </h3>
            <p className="text-sm text-navy-200 mb-4">
              For urgent queries, contact the central helpdesk.
            </p>
            <p className="font-mono text-lg font-medium text-blue-300">1800-123-4567</p>
            <p className="text-xs text-navy-400 mt-1">Available 10 AM to 6 PM</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Need to import User
import { User, RefreshCw } from 'lucide-react';

import { motion } from 'framer-motion';
import { Database, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { demoBusiness } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DataReusePage() {
  const b = demoBusiness;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6">
      <motion.div variants={item} className="text-center mb-8">
        <h1 className="page-title flex items-center justify-center gap-2 mb-2">
          <Database size={24} className="text-blue-500" />
          Intelligent Data Pre-fill
        </h1>
        <p className="text-slate-500 text-sm">Demonstrating reuse of verified data across departmental forms.</p>
      </motion.div>

      <motion.div variants={item} className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-900 mb-1">Verified Data Sourced</p>
          <p className="text-xs text-blue-800 leading-relaxed max-w-2xl">
            This form has been automatically populated using data verified during previous applications. Fields marked with a green checkmark are locked and sourced from the central trusted repository.
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="surface-card shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-5 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800">New Application Form</h2>
            <p className="text-xs text-slate-500 mt-0.5">Application for Consent to Operate (CTO)</p>
          </div>
          <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> Auto-filled: 85%
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" /> Enterprise Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Enterprise Name</label>
                  <input type="text" value={b.name} readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none" />
                  <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                </div>
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Constitution of Business</label>
                  <input type="text" value="Private Limited Company" readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none" />
                  <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                </div>
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">CIN Number</label>
                  <input type="text" value={b.cin} readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono focus:outline-none" />
                  <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                </div>
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">PAN Number</label>
                  <input type="text" value={b.pan} readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono focus:outline-none" />
                  <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" /> Location Details
              </h3>
              <div className="grid grid-cols-1 gap-5">
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Registered Address</label>
                  <input type="text" value={`${b.location}, ${b.district}, ${b.state}`} readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none" />
                  <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block">Land Type</label>
                    <input type="text" value={b.landType} readOnly className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none" />
                    <CheckCircle2 size={14} className="absolute right-3 top-[26px] text-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block">Survey / Plot No. (Manual Entry)</label>
                    <input type="text" placeholder="Enter plot number" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
              Cancel
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
              Save & Continue
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

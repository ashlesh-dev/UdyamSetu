import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Search, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { officerInspections } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function GovInspectionPlannerPage() {
  const clusters = officerInspections.filter(i => i.cluster);
  const unclustered = officerInspections.filter(i => !i.cluster);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <CalendarDays size={24} className="text-blue-500" />
            Inspection Planner & Coordination
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage departmental site visits and identify joint inspection opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search locations or businesses..." className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 w-64" />
          </div>
        </div>
      </motion.div>

      {/* Suggested Clusters */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-800">Suggested Inspection Clusters</h2>
          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">SYSTEM IDENTIFIED</span>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><MapPin size={100} /></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Nashik Industrial Cluster — 30 Sep 2026</h3>
                <p className="text-sm text-slate-600">3 businesses in Nashik MIDC require inspections from multiple departments.</p>
              </div>
              <button className="px-5 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-sm">
                Propose Joint Visit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {clusters.map((insp) => (
                <div key={insp.id} className="bg-white/80 backdrop-blur rounded-lg border border-amber-100 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      insp.type === 'Environmental' ? 'bg-emerald-100 text-emerald-700' :
                      insp.type === 'Fire Safety' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {insp.type}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{insp.scheduledTime}</span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-1 truncate" title={insp.businessName}>{insp.businessName}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin size={12} /> {insp.location}
                  </p>
                  
                  {insp.assignedInspector ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      <CheckCircle2 size={12} /> {insp.assignedInspector}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                      <span className="flex items-center gap-1"><ShieldAlert size={12} /> Needs Assigment</span>
                      <button className="text-blue-600 hover:underline">Assign</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Standard Inspections */}
      <motion.div variants={item}>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Standard Inspections Queue</h2>
        <div className="surface-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business & Location</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unclustered.map(insp => (
                <tr key={insp.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">{insp.businessName}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} /> {insp.location}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium">{insp.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700 font-medium">{insp.scheduledDate}</p>
                    <p className="text-xs text-slate-500">{insp.scheduledTime}</p>
                  </td>
                  <td className="px-5 py-4">
                    {insp.assignedInspector ? (
                      <span className="text-sm text-slate-700">{insp.assignedInspector}</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-100">Pending Assignment</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {!insp.assignedInspector && (
                        <button className="text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors">
                          Assign
                        </button>
                      )}
                      <button className="text-xs font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded hover:bg-slate-100 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

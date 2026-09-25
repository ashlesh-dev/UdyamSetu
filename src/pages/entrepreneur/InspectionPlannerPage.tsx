import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, ArrowRight, CheckCircle2, Factory } from 'lucide-react';
import { inspections, demoBusiness, getDepartment } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function InspectionPlannerPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title flex items-center gap-2">
          <CalendarDays size={24} className="text-blue-500" />
          Inspection Planner
        </h1>
        <p className="text-slate-500 text-sm mt-1">Track and manage upcoming site visits and compliance inspections.</p>
      </motion.div>

      {/* Cluster Opportunity Alert */}
      <motion.div variants={item} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute -right-10 -top-10 opacity-10">
          <Factory size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur">
              <Users size={14} />
              System Suggestion
            </div>
            <h2 className="text-2xl font-bold mb-2">Potential Coordinated Inspection</h2>
            <p className="text-blue-100 max-w-xl text-sm leading-relaxed">
              Three inspections for {demoBusiness.name} have overlapping requirements and are scheduled around the same time. The system has suggested a common site visit to minimize business disruption.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {['Environmental', 'Fire Safety', 'Food Safety'].map((dept, i) => (
                <div key={dept} className="flex items-center gap-3">
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-sm font-medium">{dept}</span>
                  </div>
                  {i < 2 && <ArrowRight size={16} className="text-blue-300 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 text-slate-800 shrink-0 min-w-[240px]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Proposed Schedule</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">30</p>
                <p className="text-xs font-medium text-slate-500">SEP 2026</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <p className="text-xl font-bold text-slate-700">10:30</p>
                <p className="text-xs font-medium text-slate-500">AM</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Accept Coordinated Schedule
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Inspections List */}
      <motion.div variants={item}>
        <h3 className="text-base font-semibold text-slate-800 mb-4">All Scheduled Inspections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inspections.map(insp => {
            const dept = getDepartment(insp.departmentId);
            return (
              <div key={insp.id} className="surface-card overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-1.5 ${insp.clusterOpportunity ? 'bg-blue-500' : 'bg-slate-300'}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {dept?.shortName}
                    </span>
                    {insp.clusterOpportunity && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                        <Users size={12} /> Cluster Opp
                      </span>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-slate-800 mb-1">{insp.type}</h4>
                  <p className="text-xs text-slate-500 mb-5 line-clamp-2">Application: {insp.applicationId}</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CalendarDays size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{insp.scheduledDate}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{insp.scheduledTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-slate-700">{insp.location}</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-slate-700">{insp.inspectorName || 'Inspector pending assignment'}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-700">Confirmed</span>
                    </div>
                    <button className="text-xs font-medium text-blue-600 hover:underline">
                      Request Reschedule
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

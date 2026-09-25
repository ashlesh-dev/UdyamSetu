import { motion } from 'framer-motion';
import { FileText, Search, Filter, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { applications, getApproval, getDepartment } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ApplicationsPage() {
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <FileText size={24} className="text-violet-500" />
            Applications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your submitted applications.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-400 w-64"
            />
          </div>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      <motion.div variants={item} className="surface-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Application ID / Approval</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map(app => {
              const approval = getApproval(app.approvalId);
              const dept = getDepartment(app.departmentId);

              return (
                <tr 
                  key={app.id} 
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/applications/${app.id}`)}
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">{app.applicationNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{approval?.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{dept?.shortName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{app.submittedDate}</p>
                    <p className="text-xs text-slate-400 mt-0.5">SLA: {approval?.slaWorkingDays} days</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      app.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                      app.status === 'query_raised' ? 'bg-red-50 text-red-700' :
                      app.status === 'under_review' ? 'bg-amber-50 text-amber-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {app.status === 'approved' ? <CheckCircle2 size={12} /> : 
                       app.status === 'query_raised' ? <AlertCircle size={12} /> : <Clock size={12} />}
                      {app.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${app.status === 'approved' ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${app.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500 w-8">{app.progress}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

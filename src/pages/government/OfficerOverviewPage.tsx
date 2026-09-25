import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, AlertTriangle, TrendingUp, Clock, Filter, ArrowRight } from 'lucide-react';
import { officerStats, monthlyPipelineData, officerApplications } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function OfficerOverviewPage() {
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title flex items-center gap-2">
          <LayoutDashboard size={24} className="text-amber-500" />
          Department Operations Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">Maharashtra Pollution Control Board (MPCB) — Nashik Division</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="kpi-card border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Applications</span>
            <FileText size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{officerStats.totalApplications}</p>
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> +12% from last month
          </p>
        </div>

        <div className="kpi-card border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Review</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{officerStats.pending}</p>
          <p className="text-xs text-slate-500 mt-1">Across all stages</p>
        </div>

        <div className="kpi-card border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA At Risk</span>
            <AlertTriangle size={18} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{officerStats.slaAtRisk}</p>
          <p className="text-xs text-orange-600 mt-1 font-medium">&lt; 3 days remaining</p>
        </div>

        <div className="kpi-card border-l-4 border-l-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA Breached</span>
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{officerStats.slaBreached}</p>
          <p className="text-xs text-red-600 mt-1 font-medium">Requires immediate action</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div variants={item} className="lg:col-span-2 surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-slate-800">Application Pipeline (6 Months)</h2>
            <button className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="received" name="Received" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReceived)" />
                <Area type="monotone" dataKey="approved" name="Approved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorApproved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pipeline Breakdown */}
        <motion.div variants={item} className="surface-card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-6 flex items-center justify-between">
            Current Stage Breakdown
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">Active</span>
          </h2>
          
          <div className="space-y-5">
            {[
              { label: 'Document Verification', value: officerStats.pipeline.verification, total: officerStats.pending, color: 'bg-indigo-500' },
              { label: 'Technical Scrutiny', value: officerStats.pipeline.scrutiny, total: officerStats.pending, color: 'bg-blue-500' },
              { label: 'Inspection / Site Visit', value: officerStats.pipeline.inspection, total: officerStats.pending, color: 'bg-amber-500' },
              { label: 'Final Decision', value: officerStats.pipeline.decision, total: officerStats.pending, color: 'bg-emerald-500' },
            ].map(stage => (
              <div key={stage.label}>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-700">{stage.label}</span>
                  <span className="text-sm font-bold text-slate-800">{stage.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${(stage.value / Math.max(stage.total, 1)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <button 
            className="w-full mt-8 py-2.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 border border-amber-200"
            onClick={() => navigate('/gov/bottlenecks')}
          >
            View Bottleneck Analysis <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Priority Action List */}
      <motion.div variants={item} className="surface-card">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            Priority Action List
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Application</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {officerApplications.filter(a => a.slaStatus !== 'on_track').map(app => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800 font-mono">{app.applicationNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{app.approvalType}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">{app.businessName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{app.district}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium">{app.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      app.riskLevel === 'High' ? 'bg-red-50 text-red-700' :
                      app.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {app.riskLevel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {app.slaStatus === 'breached' ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                        <AlertTriangle size={14} /> Breached
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                        <Clock size={14} /> At Risk
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      className="text-xs font-semibold text-blue-600 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                      onClick={() => navigate('/gov/scrutiny')}
                    >
                      Review
                    </button>
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

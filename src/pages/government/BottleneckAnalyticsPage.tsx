import { motion } from 'framer-motion';
import { BarChart3, TrendingDown, AlertCircle, Search, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { bottleneckData } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function BottleneckAnalyticsPage() {
  // Sort data by delay desc
  const sortedData = [...bottleneckData].sort((a, b) => b.avgDelay - a.avgDelay);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <BarChart3 size={24} className="text-blue-600" />
            Approval Bottleneck Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-1">Identify and resolve systemic delays across the application pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Calendar size={16} className="text-slate-400" />
            Last 30 Days <ChevronDown size={14} />
          </button>
        </div>
      </motion.div>

      {/* Main Insight */}
      <motion.div variants={item} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-0" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <TrendingDown size={24} className="text-blue-600" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle size={12} /> System Insight
            </div>
            <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-3xl">
              <strong>Inspection scheduling</strong> is currently contributing the highest average delay (4.2 days) among tracked processes. Addressing this could improve overall SLA compliance by an estimated 18%.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delay by Process Stage */}
        <motion.div variants={item} className="surface-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-6">Current Bottlenecks (Average Delay)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="process" type="category" tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} axisLine={false} tickLine={false} width={140} />
                <RechartsTooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value ?? 0} days`, 'Avg. Delay']}
                />
                <Bar dataKey="avgDelay" radius={[0, 4, 4, 0]}>
                  {sortedData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bottleneck Data Table */}
        <motion.div variants={item} className="surface-card p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800">Process Delay Details</h2>
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-blue-400 w-32" />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-xs font-semibold text-slate-500">Process Stage</th>
                  <th className="py-2 text-xs font-semibold text-slate-500 text-right">Pending Apps</th>
                  <th className="py-2 text-xs font-semibold text-slate-500 text-right">Avg. Delay (Days)</th>
                  <th className="py-2 text-xs font-semibold text-slate-500 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedData.map((row, i) => (
                  <tr key={row.process}>
                    <td className="py-3 text-sm font-medium text-slate-700">{row.process}</td>
                    <td className="py-3 text-sm text-slate-600 text-right">{row.pending}</td>
                    <td className="py-3 text-sm font-bold text-right">
                      <span className={i === 0 ? 'text-red-600' : i === 1 ? 'text-amber-600' : 'text-slate-700'}>
                        {row.avgDelay}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      {i === 0 ? (
                        <span className="inline-flex bg-red-50 text-red-700 p-1 rounded-full"><AlertCircle size={14} /></span>
                      ) : i === 1 ? (
                        <span className="inline-flex bg-amber-50 text-amber-700 p-1 rounded-full"><AlertCircle size={14} /></span>
                      ) : (
                        <span className="inline-flex bg-emerald-50 text-emerald-600 p-1 rounded-full"><CheckCircle2 size={14} /></span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

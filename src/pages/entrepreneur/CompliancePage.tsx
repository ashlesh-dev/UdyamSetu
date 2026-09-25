import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar as CalendarIcon, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { complianceItems, daysUntil } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function CompliancePage() {
  const [filter, setFilter] = useState('all');

  const filteredItems = complianceItems.filter(c => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  const categories = ['all', 'licences', 'environmental', 'safety', 'labour', 'renewals'];
  
  const complianceHealth = Math.round(
    (complianceItems.filter(c => c.status === 'compliant' || c.status === 'not_applicable').length / complianceItems.length) * 100
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title flex items-center gap-2">
          <Shield size={24} className="text-emerald-500" />
          Compliance Center
        </h1>
        <p className="text-slate-500 text-sm mt-1">Monitor and maintain regulatory compliance and renewals.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <motion.div variants={item} className="surface-card p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-base font-semibold text-slate-800 mb-6">Overall Compliance Health</h2>
          
          <div className="circular-progress text-emerald-500 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="opacity-20" />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" stroke="currentColor" strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 * (1 - (complianceHealth / 100))}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="progress-text text-slate-800">
              {complianceHealth}%
            </div>
          </div>
          
          <p className="text-sm text-slate-500">
            {complianceItems.filter(c => c.status === 'compliant').length} of {complianceItems.filter(c => c.status !== 'not_applicable').length} applicable items are fully compliant.
          </p>
        </motion.div>

        {/* Upcoming Renewals (Next 90 Days) */}
        <motion.div variants={item} className="lg:col-span-2 surface-card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <RefreshCw size={18} className="text-amber-500" />
            Upcoming Actions (Next 90 Days)
          </h2>
          
          <div className="space-y-4">
            {complianceItems
              .filter(c => c.status === 'due_soon' || (c.dueDate && daysUntil(c.dueDate) <= 90 && daysUntil(c.dueDate) > 0))
              .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate))
              .map(item => {
                const days = daysUntil(item.dueDate);
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-amber-100 bg-amber-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                        days <= 30 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        <span className="text-lg font-bold leading-none">{days}</span>
                        <span className="text-[10px] font-medium uppercase mt-0.5">Days</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{item.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Due: {item.dueDate}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      Start Renewal
                    </button>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>

      {/* Compliance Register */}
      <motion.div variants={item} className="surface-card">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-slate-800">Compliance Register</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  filter === cat ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                    {item.renewalPeriodMonths && (
                      <p className="text-[10px] text-slate-400 mt-0.5">Renews every {item.renewalPeriodMonths} months</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 capitalize px-2 py-1 bg-slate-100 rounded">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'compliant' ? 'bg-emerald-50 text-emerald-700' :
                      item.status === 'due_soon' ? 'bg-amber-50 text-amber-700' :
                      item.status === 'not_applicable' ? 'bg-slate-100 text-slate-500' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {item.status === 'compliant' ? <CheckCircle2 size={12} /> : 
                       item.status === 'due_soon' ? <AlertTriangle size={12} /> : 
                       item.status === 'not_applicable' ? null : <AlertTriangle size={12} />}
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.dueDate ? (
                      <p className="text-sm text-slate-700 flex items-center gap-1.5">
                        <CalendarIcon size={14} className="text-slate-400" />
                        {item.dueDate}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">-</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status !== 'not_applicable' && (
                      <button className="text-xs font-medium text-blue-600 hover:underline">
                        View Details
                      </button>
                    )}
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

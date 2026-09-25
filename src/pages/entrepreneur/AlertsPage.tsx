import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Filter, CheckCircle2 } from 'lucide-react';
import { alerts as alertsData } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import type { AlertSeverity } from '../../data/types';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState<'all' | 'unread' | AlertSeverity>('all');
  const navigate = useNavigate();

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !a.read;
    return a.severity === filter;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Bell size={24} className="text-blue-500" />
            Alerts & Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Stay updated on your applications and compliance requirements.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
          >
            Mark all as read
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <Filter size={16} className="text-slate-400 shrink-0 mr-1" />
        {['all', 'unread', 'critical', 'warning', 'info', 'success'].map(f => (
          <button
            key={f}
            className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-navy-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setFilter(f as typeof filter)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Alerts List */}
      <motion.div variants={item} className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="surface-card p-12 text-center">
            <Bell size={40} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No alerts found</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <motion.div
              layout
              key={alert.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 transition-all cursor-pointer ${
                !alert.read ? 'border-blue-200 shadow-sm' : 'border-slate-200 opacity-75 hover:opacity-100'
              }`}
              onClick={() => alert.actionUrl && navigate(alert.actionUrl)}
            >
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <span className={`flex w-3 h-3 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                    alert.severity === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                    alert.severity === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-blue-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h3 className={`font-semibold text-base truncate ${!alert.read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {alert.title}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{alert.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {alert.actionUrl && (
                      <button className="text-xs font-semibold text-blue-600 hover:underline px-3 py-1.5 bg-blue-50 rounded-lg">
                        View Details
                      </button>
                    )}
                    {!alert.read && (
                      <button 
                        className="text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1"
                        onClick={(e) => handleMarkAsRead(alert.id, e)}
                      >
                        <CheckCircle2 size={14} /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

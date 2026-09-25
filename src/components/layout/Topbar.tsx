import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { demoBusiness, alerts } from '../../data/mockData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { setSidebarOpen, setSearchOpen, role } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/90 flex items-center justify-between gap-4 px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          className="lg:hidden p-2 -ml-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <button
          id="global-search-trigger"
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/80 text-slate-500 hover:border-slate-300 hover:bg-white transition-colors min-w-0 flex-1 max-w-md"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={16} className="shrink-0" />
          <span className="text-sm truncate hidden sm:inline">Search applications, documents…</span>
          <span className="text-sm sm:hidden">Search</span>
          <kbd className="ml-auto hidden md:inline text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-medium">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span className="hidden xl:inline text-[10px] font-medium uppercase tracking-wider text-slate-400 border border-slate-200 rounded-md px-2 py-1 bg-slate-50">
          Demo prototype
        </span>

        <div className="relative">
          <button
            id="notifications-trigger"
            type="button"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            onClick={() => setShowNotif(!showNotif)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 min-w-[1rem] h-4 px-0.5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {showNotif && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotif(false)} aria-hidden />
              <div className="absolute right-0 top-11 w-80 surface-card shadow-lg z-40 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                  <span className="text-xs text-slate-400">{unreadAlerts.length} unread</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {alerts.slice(0, 5).map(alert => (
                    <div
                      key={alert.id}
                      className={`px-4 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 ${!alert.read ? 'bg-blue-50/40' : ''}`}
                      onClick={() => { setShowNotif(false); navigate('/alerts'); }}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          alert.severity === 'critical' ? 'bg-red-500' :
                          alert.severity === 'warning' ? 'bg-amber-500' :
                          alert.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{alert.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{alert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center border-t border-slate-100">
                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 hover:underline"
                    onClick={() => { setShowNotif(false); navigate('/alerts'); }}
                  >
                    View all alerts
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden sm:block w-px h-8 bg-slate-200" />

        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 rounded-lg py-1.5 pl-1 pr-2 hover:bg-slate-50 transition-colors text-left"
          onClick={() => navigate(role === 'officer' ? '/gov/overview' : '/business')}
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-white">
            <span className="text-xs font-bold text-slate-700">
              {role === 'officer' ? 'GO' : 'AF'}
            </span>
          </div>
          <div className="hidden md:block max-w-[180px]">
            <p className="text-sm font-medium text-slate-800 truncate">
              {role === 'officer' ? 'Officer Dashboard' : demoBusiness.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {role === 'officer' ? 'MPCB, Nashik Division' : demoBusiness.location}
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}

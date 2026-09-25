import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import {
  LayoutDashboard, Building2, GitBranch, FileText, FolderOpen,
  ClipboardCheck, Shield, Gift, Bell, MessageSquare, FileCheck,
  User, X, BarChart3, AlertTriangle,
  Users, CalendarDays, Landmark, LogOut
} from 'lucide-react';

export default function Sidebar() {
  const { role, sidebarOpen, setSidebarOpen, setRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const entrepreneurLinks = [
    { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
    { to: '/business', icon: Building2, label: 'My Business' },
    { to: '/roadmap', icon: GitBranch, label: 'Approval Roadmap' },
    { to: '/applications', icon: FileText, label: 'Applications' },
    { to: '/documents', icon: FolderOpen, label: 'Documents' },
    { to: '/prevalidation', icon: FileCheck, label: 'Pre-validation' },
    { to: '/inspections', icon: ClipboardCheck, label: 'Inspections' },
    { to: '/compliance', icon: Shield, label: 'Compliance' },
    { to: '/schemes', icon: Gift, label: 'Schemes & Incentives' },
    { to: '/alerts', icon: Bell, label: 'Alerts' },
    { to: '/grievances', icon: MessageSquare, label: 'Grievances' },
  ];

  const officerLinks = [
    { to: '/gov/overview', icon: LayoutDashboard, label: 'Department Overview' },
    { to: '/gov/applications', icon: FileText, label: 'Applications' },
    { to: '/gov/bottlenecks', icon: BarChart3, label: 'Bottleneck Analytics' },
    { to: '/gov/scrutiny', icon: AlertTriangle, label: 'Risk & Scrutiny' },
    { to: '/gov/inspections', icon: CalendarDays, label: 'Inspection Planner' },
    { to: '/gov/prefill', icon: Users, label: 'Data Reuse & Pre-fill' },
  ];

  const links = role === 'officer' ? officerLinks : entrepreneurLinks;

  const handleSwitchRole = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <aside className={`sidebar ${!sidebarOpen ? '-translate-x-full lg:translate-x-0' : ''}`}>
        <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              R
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] font-semibold text-white tracking-tight truncate">RegulaOne</h1>
              <p className="text-[10px] text-navy-400 truncate">Maharashtra · SIH 2026</p>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-md text-navy-400 hover:text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className={`flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg font-medium ${
            role === 'officer'
              ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/25'
              : 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/25'
          }`}>
            {role === 'officer' ? <Landmark size={14} /> : <Building2 size={14} />}
            {role === 'officer' ? 'Government Officer' : 'Entrepreneur'}
          </div>
        </div>

        <nav className="flex-1 py-1 overflow-y-auto">
          <div className="px-4 mb-1.5">
            <p className="text-[10px] text-navy-500 uppercase tracking-wider font-semibold">
              {role === 'officer' ? 'Department' : 'Workspace'}
            </p>
          </div>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive || location.pathname.startsWith(link.to + '/') ? 'active' : ''}`
              }
            >
              <link.icon size={17} strokeWidth={2} />
              <span className="truncate">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <NavLink
            to={role === 'officer' ? '/gov/overview' : '/business'}
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={17} />
            <span>Profile</span>
          </NavLink>
          <button
            type="button"
            onClick={handleSwitchRole}
            className="sidebar-link w-[calc(100%-24px)] mx-3 text-left border-0 bg-transparent cursor-pointer hover:!bg-white/10"
          >
            <LogOut size={17} />
            <span>Switch role</span>
          </button>
        </div>
      </aside>
    </>
  );
}

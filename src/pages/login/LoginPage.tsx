import { useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { Building2, Landmark, ArrowRight, Shield, GitBranch, FileCheck, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const handleLogin = (role: 'entrepreneur' | 'officer') => {
    setRole(role);
    navigate(role === 'officer' ? '/gov/overview' : '/overview');
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white flex-col justify-between p-10 xl:p-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              R
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">RegulaOne</p>
              <p className="text-xs text-navy-300 mt-0.5">Regulatory intelligence layer</p>
            </div>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight max-w-md">
            Streamline industrial approvals without replacing MAITRI or NSWS
          </h1>
          <p className="text-navy-200 text-sm leading-relaxed mt-4 max-w-md">
            An orchestration layer that maps your regulatory roadmap, validates documents, tracks SLAs, and surfaces bottlenecks for government teams.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: GitBranch, text: 'Dynamic approval roadmaps with dependency mapping' },
              { icon: FileCheck, text: 'Document readiness and pre-validation before submission' },
              { icon: BarChart3, text: 'Department analytics and risk-based scrutiny' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-navy-100">
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-blue-300" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-[11px] text-navy-400">
          SIH 2026 Prototype · Problem Statement 26130 · Government of Maharashtra
        </p>
      </div>

      {/* Sign-in panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-lg"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">R</div>
            <span className="text-xl font-bold text-slate-900">RegulaOne</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Choose your workspace</h2>
            <p className="text-slate-500 text-sm mt-2">
              Simulated login for demo — select a role to explore the prototype journey.
            </p>
          </div>

          <div className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Building2 size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Entrepreneur</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Business & industrial unit dashboard</p>
                </div>
              </div>
              <button
                id="login-entrepreneur"
                type="button"
                onClick={() => handleLogin('entrepreneur')}
                className="w-full btn-primary py-3"
              >
                Continue as Entrepreneur
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Landmark size={22} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Government Officer</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Department operations & analytics</p>
                </div>
              </div>
              <button
                id="login-officer"
                type="button"
                onClick={() => handleLogin('officer')}
                className="w-full py-3 rounded-[10px] text-sm font-semibold text-white bg-amber-600 border border-amber-700 hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                Continue as Officer
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs">
            <Shield size={14} className="shrink-0" />
            <span>No real authentication · Mock data only</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

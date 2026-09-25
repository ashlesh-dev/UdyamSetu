import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Factory, Zap, Droplets, Settings2, CheckCircle2, Loader2 } from 'lucide-react';
import { demoBusiness } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function BusinessProfilePage() {
  const [recalculating, setRecalculating] = useState(false);
  const [recalcDone, setRecalcDone] = useState(false);
  const b = demoBusiness;

  const handleRecalculate = () => {
    setRecalculating(true);
    setRecalcDone(false);
    setTimeout(() => {
      setRecalculating(false);
      setRecalcDone(true);
      setTimeout(() => setRecalcDone(false), 3000);
    }, 2500);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="page-title">My Business</h1>
        <p className="page-subtitle">Business profile and regulatory attributes</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <motion.div variants={item} className="lg:col-span-2 surface-card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-blue-500" />
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Business Name', value: b.name },
              { label: 'Industry', value: b.industry },
              { label: 'Location', value: b.location },
              { label: 'Investment', value: b.investmentLabel },
              { label: 'Employees', value: String(b.employees) },
              { label: 'Business Stage', value: b.businessStage },
              { label: 'PAN', value: b.pan },
              { label: 'GST', value: b.gst },
              { label: 'CIN', value: b.cin },
              { label: 'Contact Email', value: b.contactEmail },
            ].map(row => (
              <div key={row.label} className="flex flex-col">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{row.label}</span>
                <span className="text-sm text-slate-700 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Profile */}
        <motion.div variants={item} className="surface-card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Settings2 size={18} className="text-violet-500" />
            Regulatory Profile
          </h2>
          <div className="space-y-3">
            {[
              { label: 'MSME', value: b.msme },
              { label: 'Manufacturing Unit', value: b.manufacturingUnit },
              { label: 'Environmental Review', value: b.environmentalReview, text: 'Required' },
              { label: 'Factory Compliance', value: b.factoryCompliance, text: 'Required' },
              { label: 'Fire Safety Review', value: b.fireSafetyReview, text: 'Required' },
            ].map(attr => (
              <div key={attr.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">{attr.label}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  attr.value ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {attr.text || (attr.value ? 'Yes' : 'No')}
                </span>
              </div>
            ))}
          </div>

          <button
            id="recalculate-roadmap"
            onClick={handleRecalculate}
            disabled={recalculating}
            className="w-full mt-5 py-2.5 rounded-xl bg-navy-800 text-white text-sm font-medium hover:bg-navy-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {recalculating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analysing business profile…
              </>
            ) : recalcDone ? (
              <>
                <CheckCircle2 size={16} />
                Regulatory roadmap updated
              </>
            ) : (
              'Recalculate Regulatory Roadmap'
            )}
          </button>
        </motion.div>
      </div>

      {/* Industrial Information */}
      <motion.div variants={item} className="surface-card p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Factory size={18} className="text-slate-500" />
          Industrial Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: MapPin, label: 'Land Type', value: b.landType },
            { icon: Building2, label: 'Built-up Area', value: b.builtUpArea },
            { icon: Zap, label: 'Power Requirement', value: b.powerRequirement },
            { icon: Droplets, label: 'Water Consumption', value: b.waterConsumption },
            { icon: Factory, label: 'Manufacturing Activity', value: b.manufacturingActivity },
          ].map(info => (
            <div key={info.label} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <info.icon size={18} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{info.label}</p>
                <p className="text-sm text-slate-700 font-medium mt-0.5">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

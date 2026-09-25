import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, UploadCloud, CheckCircle2, AlertCircle, FileText, Plus, Clock } from 'lucide-react';
import { documents } from '../../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DocumentCenterPage() {
  const [filter, setFilter] = useState('all');

  const filteredDocs = documents.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'verified') return d.status === 'verified';
    if (filter === 'missing') return d.status === 'missing';
    return true;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <FolderOpen size={24} className="text-blue-500" />
            Verified Document Vault
          </h1>
          <p className="text-slate-500 text-sm mt-1">Reuse verified business information across applications.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <UploadCloud size={16} />
            Upload Document
          </button>
        </div>
      </motion.div>

      {/* Stats/Filters */}
      <motion.div variants={item} className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-4">
        {['all', 'verified', 'missing'].map(f => (
          <button
            key={f}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
              filter === f ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Documents' : f === 'verified' ? 'Verified Only' : 'Missing'}
          </button>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="surface-card p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
            {doc.status === 'verified' && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  doc.status === 'verified' ? 'bg-emerald-100 text-emerald-600' :
                  doc.status === 'missing' ? 'bg-slate-100 text-slate-400 border border-slate-200 border-dashed' :
                  'bg-blue-50 text-blue-500'
                }`}>
                  {doc.status === 'missing' ? <Plus size={20} /> : <FileText size={20} />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{doc.name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">{doc.type}</p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                doc.status === 'verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                doc.status === 'missing' ? 'bg-red-50 text-red-600 border border-red-100' :
                'bg-blue-50 text-blue-600 border border-blue-100'
              }`}>
                {doc.status === 'verified' && <CheckCircle2 size={12} />}
                {doc.status === 'missing' && <AlertCircle size={12} />}
                {doc.status === 'uploaded' && <Clock size={12} />}
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>

              {doc.fileSize && (
                <span className="text-xs text-slate-500">{doc.fileSize}</span>
              )}
            </div>

            {doc.status === 'verified' ? (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 mb-2">
                  Verified on {doc.verifiedDate}
                </p>
                <div className="bg-slate-50 p-2.5 rounded text-xs text-slate-600 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>This verified document can be reused in <strong>{doc.reusableIn.length} applications</strong>.</span>
                </div>
              </div>
            ) : doc.status === 'missing' ? (
              <div className="pt-3 border-t border-slate-100">
                <button className="w-full py-1.5 border border-dashed border-slate-300 rounded text-xs font-medium text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  Upload Now
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500">
                  Uploaded on {doc.uploadedDate}. Pending verification.
                </p>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

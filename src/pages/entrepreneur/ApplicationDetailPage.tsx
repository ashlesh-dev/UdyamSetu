import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, FileText, CheckCircle2, GitBranch, ExternalLink } from 'lucide-react';
import { getApplication, getApproval, getDepartment, getDocument } from '../../data/mockData';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = getApplication(id || '');
  
  if (!app) return <div>Application not found</div>;

  const approval = getApproval(app.approvalId);
  const dept = getDepartment(app.departmentId);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate('/applications')}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="page-title">{approval?.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500 font-medium">{app.applicationNumber}</p>
            <span className="text-slate-300">•</span>
            <p className="text-sm text-slate-500">{dept?.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Status & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="surface-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  app.status === 'query_raised' ? 'bg-red-50 text-red-600' :
                  app.status === 'under_review' ? 'bg-amber-50 text-amber-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {app.status === 'query_raised' ? <AlertCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-0.5">Current Status</p>
                  <p className="text-lg font-bold text-slate-800 capitalize">{app.status.replace(/_/g, ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-0.5">Progress</p>
                <p className="page-title">{app.progress}%</p>
              </div>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  app.status === 'query_raised' ? 'bg-amber-500' : 'bg-blue-500'
                }`} 
                style={{ width: `${app.progress}%` }} 
              />
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Submitted</p>
                <p className="text-sm font-semibold text-slate-700">{app.submittedDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Expected SLA</p>
                <p className="text-sm font-semibold text-slate-700">{approval?.slaWorkingDays} working days</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Days Elapsed</p>
                <p className={`text-sm font-semibold ${app.daysElapsed > (approval?.slaWorkingDays || 100) ? 'text-red-600' : 'text-slate-700'}`}>
                  {app.daysElapsed} days
                </p>
              </div>
            </div>
          </div>

          {/* Department Query (If any) */}
          {app.queryDetails && (
            <div className="bg-red-50 rounded-xl border border-red-100 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Department Query Raised</h3>
                  <p className="text-sm text-red-700 mb-4 bg-white/50 p-3 rounded border border-red-100">
                    "{app.queryDetails.query}"
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-red-600 mb-4">
                    <span>Raised: {app.queryDetails.raisedDate}</span>
                    <span>•</span>
                    <span>Deadline: {app.queryDetails.responseDeadline}</span>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Respond to Query
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="surface-card p-6">
            <h3 className="text-base font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Clock size={18} className="text-slate-500" />
              Application Timeline
            </h3>
            <div className="ml-2">
              {app.timeline.map((event, i) => (
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot ${event.status}`} />
                  <div className="-mt-1.5 ml-2">
                    <p className="text-xs font-medium text-slate-400 mb-1">{event.date}</p>
                    <p className={`text-sm font-semibold ${event.status === 'upcoming' ? 'text-slate-500' : 'text-slate-800'}`}>
                      {event.title}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Docs & Dependencies */}
        <div className="space-y-6">
          {/* Document Checklist */}
          <div className="surface-card p-6">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-slate-500" />
              Document Checklist
            </h3>
            <div className="space-y-3">
              {approval?.requiredDocumentIds.map(docId => {
                const isSubmitted = app.documentIds.includes(docId);
                const doc = getDocument(docId);
                
                return (
                  <div key={docId} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                    {isSubmitted ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : app.status === 'query_raised' ? (
                      <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${isSubmitted ? 'text-slate-700' : 'text-slate-500'}`}>
                        {doc?.name || docId}
                      </p>
                      {isSubmitted && doc && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            Verified
                          </span>
                          <span className="text-[10px] text-blue-500 flex items-center gap-1 cursor-pointer hover:underline">
                            View <ExternalLink size={10} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dependencies */}
          <div className="surface-card p-6">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <GitBranch size={18} className="text-blue-500" />
              Workflow Dependencies
            </h3>
            
            {approval && approval.dependencies.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Required Before</p>
                <div className="space-y-2">
                  {approval.dependencies.map(dId => {
                    const d = getApproval(dId);
                    return (
                      <div key={dId} className="text-sm px-3 py-2 bg-slate-50 rounded border border-slate-100">
                        {d?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {approval && approval.canParallelWith.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Can proceed in parallel with</p>
                <div className="space-y-2">
                  {approval.canParallelWith.map(dId => {
                    const d = getApproval(dId);
                    return (
                      <div key={dId} className="text-sm px-3 py-2 bg-blue-50 text-blue-800 rounded border border-blue-100">
                        {d?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

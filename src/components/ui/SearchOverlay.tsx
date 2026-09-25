import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Building2, FolderOpen, GitBranch, Gift } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import { applications, documents, approvals, schemes, demoBusiness } from '../../data/mockData';
import type { SearchResult } from '../../data/types';

export default function SearchOverlay() {
  const { setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSearchOpen]);

  const getResults = (): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Applications
    applications.forEach(app => {
      if (app.applicationNumber.toLowerCase().includes(q) || app.status.toLowerCase().includes(q)) {
        results.push({
          type: 'application',
          title: app.applicationNumber,
          subtitle: `Status: ${app.status.replace(/_/g, ' ')}`,
          url: `/applications/${app.id}`,
          id: app.id,
        });
      }
    });

    // Business
    if (demoBusiness.name.toLowerCase().includes(q) || demoBusiness.industry.toLowerCase().includes(q)) {
      results.push({
        type: 'business',
        title: demoBusiness.name,
        subtitle: `${demoBusiness.industry} — ${demoBusiness.location}`,
        url: '/business',
        id: demoBusiness.id,
      });
    }

    // Documents
    documents.forEach(doc => {
      if (doc.name.toLowerCase().includes(q)) {
        results.push({
          type: 'document',
          title: doc.name,
          subtitle: `Status: ${doc.status}`,
          url: '/documents',
          id: doc.id,
        });
      }
    });

    // Approvals
    approvals.forEach(appr => {
      if (appr.name.toLowerCase().includes(q)) {
        results.push({
          type: 'approval',
          title: appr.name,
          subtitle: `Progress: ${appr.progress}%`,
          url: '/roadmap',
          id: appr.id,
        });
      }
    });

    // Schemes
    schemes.forEach(s => {
      if (s.name.toLowerCase().includes(q)) {
        results.push({
          type: 'scheme',
          title: s.name,
          subtitle: `Match: ${s.matchPercentage}%`,
          url: '/schemes',
          id: s.id,
        });
      }
    });

    return results.slice(0, 10);
  };

  const results = getResults();
  const iconMap = {
    application: FileText,
    business: Building2,
    document: FolderOpen,
    approval: GitBranch,
    scheme: Gift,
  };

  return (
    <div className="search-overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
          <Search size={20} className="text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search applications, documents, approvals, schemes..."
            className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={() => setSearchOpen(false)}>
            <X size={18} className="text-slate-400 hover:text-slate-600" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-slate-500">No results found for "{query}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {['application', 'business', 'document', 'approval', 'scheme'].map(type => {
                const typeResults = results.filter(r => r.type === type);
                if (typeResults.length === 0) return null;
                const Icon = iconMap[type as keyof typeof iconMap];
                return (
                  <div key={type}>
                    <div className="px-5 py-1.5">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                        {type === 'application' ? 'Applications' :
                         type === 'business' ? 'Businesses' :
                         type === 'document' ? 'Documents' :
                         type === 'approval' ? 'Approvals' : 'Schemes'}
                      </p>
                    </div>
                    {typeResults.map(result => (
                      <button
                        key={result.id}
                        className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
                        onClick={() => {
                          setSearchOpen(false);
                          navigate(result.url);
                        }}
                      >
                        <Icon size={16} className="text-slate-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{result.title}</p>
                          <p className="text-xs text-slate-500">{result.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="px-5 py-6">
              <p className="text-xs text-slate-400 mb-3">Quick Links</p>
              <div className="flex flex-wrap gap-2">
                {['MH-PC-2026-01842', 'Pollution Consent', 'Factory Licence', 'Aarambh Foods', 'PSI 2024'].map(term => (
                  <button
                    key={term}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

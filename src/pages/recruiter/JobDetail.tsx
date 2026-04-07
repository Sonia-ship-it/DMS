import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Sparkles, Lock, Send, MapPin, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ScoreBar } from '@/components/intore/ScoreBar';
import { ConfidenceBadge } from '@/components/intore/ConfidenceBadge';
import { StrengthChip, GapChip } from '@/components/intore/Chips';
import { BiasWarning } from '@/components/intore/BiasWarning';
import { ChatBubble } from '@/components/intore/ChatBubble';
import { SuggestionChips } from '@/components/intore/SuggestionChips';
import { Avatar } from '@/components/intore/Avatar';
import { Spinner } from '@/components/intore/Spinner';
import { StatusBadge, TypeBadge } from '@/components/intore/Badges';
import { Button } from '@/components/ui/button';
import { mockJobs, mockCandidates, mockScreeningResults, mockChatMessages } from '@/data/mockData';
import { useScreeningStore } from '@/stores/screeningStore';
import { cn } from '@/lib/utils';

const suggestions = ['Compare top 3', 'Show biggest gaps', 'Who almost qualified?', 'Summarize shortlist'];

export default function JobDetail() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : undefined;
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];
  const results = mockScreeningResults;

  const { status, progress, biasWarningDismissed, chatMessages, isUnlocked,
    setStatus, setProgress, dismissBiasWarning, addChatMessage, setChatMessages,
    setIsUnlocked, resetScreening } = useScreeningStore();

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { resetScreening(); }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const runScreening = () => {
    setStatus('running');
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setStatus('complete');
          setIsUnlocked(true);
          setChatMessages(mockChatMessages);
        }, 500);
      } else {
        setProgress(Math.round(p));
      }
    }, 200);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addChatMessage({ id: `u${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString() });
    setChatInput('');
    setTimeout(() => {
      addChatMessage({
        id: `a${Date.now()}`,
        role: 'ai',
        content: "Based on my analysis, I'd recommend focusing on candidates who demonstrate strong practical experience. The top performers share a common trait: consistent contributions to real-world projects alongside their technical skills.",
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  };

  const completedCount = Math.round((progress / 100) * job.applicantCount);

  return (
    <>
      <AppHeader title={job.title} />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Panel */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Job summary bar */}
            <div className="bg-card rounded-xl p-5 shadow-sm border flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <StatusBadge status={job.department} />
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{job.postedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 text-sm font-medium text-brand-700 dark:bg-[rgba(75,123,255,0.1)] dark:text-[#4B7BFF]">
                  <Users className="h-4 w-4" /> {job.applicantCount} applicants
                </span>
                <Button
                  onClick={runScreening}
                  disabled={status === 'running'}
                  className={cn(status === 'running' && 'opacity-70')}
                >
                  {status === 'running' ? <><Spinner size="sm" className="mr-2" /> Screening...</> :
                   status === 'complete' ? <><Sparkles className="h-4 w-4 mr-2" /> Re-run Screening</> :
                   <><Sparkles className="h-4 w-4 mr-2" /> Screen Candidates</>}
                </Button>
              </div>
            </div>

            {/* Progress bar */}
            {status === 'running' && (
              <div className="bg-card rounded-xl p-5 shadow-sm border space-y-3">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Analyzing {job.applicantCount} candidates... ({completedCount}/{job.applicantCount} complete)
                </p>
              </div>
            )}

            {/* Bias Warning */}
            {status === 'complete' && !biasWarningDismissed && (
              <BiasWarning
                message="Ranking may favour candidates with formal degrees. Consider reviewing candidates with strong project portfolios."
                onDismiss={dismissBiasWarning}
              />
            )}
            {status === 'complete' && biasWarningDismissed && (
              <p className="text-xs text-muted-foreground italic">⚠ Bias warning was shown and dismissed</p>
            )}

            {/* Results table */}
            {status === 'complete' && (
              <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        {['Rank', 'Candidate', 'Match Score', 'Strength', 'Gap', 'Confidence', ''].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => {
                        const candidate = mockCandidates.find((c) => c.id === r.candidateId)!;
                        const isExpanded = expandedRow === r.candidateId;
                        return (
                          <React.Fragment key={r.candidateId}>
                            <tr className="border-b last:border-0 group animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                              <td className="px-4 py-3">
                                <span className={cn('font-bold text-sm', r.rank <= 3 ? 'text-primary' : 'text-muted-foreground')}>#{r.rank}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avatar name={candidate.name} color={candidate.avatarColor} size="sm" />
                                  <div>
                                    <p className="text-sm font-medium">{candidate.name}</p>
                                    <p className="text-xs text-muted-foreground">{candidate.currentRole}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 min-w-[140px]"><ScoreBar score={r.matchScore} /></td>
                              <td className="px-4 py-3"><StrengthChip label={r.topStrength} /></td>
                              <td className="px-4 py-3"><GapChip label={r.keyGap} /></td>
                              <td className="px-4 py-3"><ConfidenceBadge level={r.confidence} /></td>
                              <td className="px-4 py-3">
                                <button onClick={() => setExpandedRow(isExpanded ? null : r.candidateId)} className="p-1 rounded hover:bg-muted transition-colors">
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="border-b">
                                <td colSpan={7} className="px-6 py-4 bg-muted/30">
                                  <div className="space-y-3">
                                    <p className="text-sm">{r.reasoning}</p>
                                    <div>
                                      <p className="text-xs font-medium mb-1">Strengths</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {r.strengths.map((s) => <StrengthChip key={s} label={s} />)}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium mb-1">Gaps</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {r.gaps.map((g) => <GapChip key={g} label={g} />)}
                                      </div>
                                    </div>
                                    <p className="text-sm font-semibold">{r.recommendation}</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - AI Chat */}
          <div className="w-full xl:w-[400px] shrink-0">
            <div className="bg-card rounded-xl shadow-sm border flex flex-col h-[calc(100vh-8rem)] sticky top-24">
              <div className="p-4 border-b flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI Recruiter Assistant</h3>
              </div>

              {!isUnlocked ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <Lock className="h-10 w-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">Run screening first to unlock AI analysis</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                    {chatMessages.map((msg) => (
                      <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 border-t space-y-3">
                    <SuggestionChips suggestions={suggestions} onSelect={(s) => sendMessage(s)} />
                    <div className="flex gap-2">
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput); } }}
                        placeholder="Ask about candidates..."
                        rows={1}
                        className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-ring"
                      />
                      <Button size="icon" onClick={() => sendMessage(chatInput)} disabled={!chatInput.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Powered by Gemini</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

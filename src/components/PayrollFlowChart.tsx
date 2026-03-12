import React, { useState } from 'react';
import { CheckCircle2, Circle, XCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { PayrollFlow, PAYROLL_STAGES, StageStatus } from '../types/payrollFlow';

interface PayrollFlowChartProps {
  flow: PayrollFlow;
}

const getStatusBadge = (status: string) => {
  const badges = {
    not_started: 'bg-slate-100 text-slate-700 border border-slate-300',
    in_progress: 'bg-blue-50 text-blue-700 border border-blue-300',
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-300',
    failed: 'bg-red-50 text-red-700 border border-red-300'
  };

  const labels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
    failed: 'Failed'
  };

  return {
    className: badges[status as keyof typeof badges] || badges.not_started,
    label: labels[status as keyof typeof labels] || 'Not Started'
  };
};

export const PayrollFlowChart: React.FC<PayrollFlowChartProps> = ({ flow }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());

  const getStageStatus = (stageName: string): StageStatus => {
    const stageData = flow.stages.find(s => s.stage === stageName);
    return stageData?.status || 'pending';
  };

  const getStageError = (stageName: string): string | undefined => {
    const stageData = flow.stages.find(s => s.stage === stageName);
    return stageData?.error;
  };

  const toggleStage = (stageName: string) => {
    setExpandedStages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stageName)) {
        newSet.delete(stageName);
      } else {
        newSet.add(stageName);
      }
      return newSet;
    });
  };

  const statusBadge = getStatusBadge(flow.status);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white border-b border-slate-200 px-6 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-900">Processing Pipeline</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time payroll computation workflow</p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusBadge.className}`}>
            {statusBadge.label}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 max-h-[600px] overflow-y-auto">
          <div className="relative space-y-2">
            {PAYROLL_STAGES.map((stage, index) => {
              const status = getStageStatus(stage.stage);
              const error = getStageError(stage.stage);
              const isLast = index === PAYROLL_STAGES.length - 1;
              const isStageExpanded = expandedStages.has(stage.stage) || status === 'processing' || status === 'failed';

              return (
                <div key={stage.stage} className="relative">
                  <div className="flex gap-3 items-start">
                    <div className="flex flex-col items-center">
                      <div className={`
                        relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                        ${status === 'completed' ? 'bg-emerald-500 shadow-md shadow-emerald-200' : ''}
                        ${status === 'processing' ? 'bg-blue-500 shadow-md shadow-blue-200' : ''}
                        ${status === 'failed' ? 'bg-red-500 shadow-md shadow-red-200' : ''}
                        ${status === 'pending' ? 'bg-slate-200 border-2 border-slate-300' : ''}
                      `}>
                        {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {status === 'processing' && <Loader2 className="w-4 h-4 text-white animate-spin" />}
                        {status === 'failed' && <XCircle className="w-4 h-4 text-white" />}
                        {status === 'pending' && <Circle className="w-4 h-4 text-slate-400" />}
                      </div>

                      {!isLast && (
                        <div className={`
                          w-0.5 h-full absolute top-8 transition-all duration-300
                          ${status === 'completed' ? 'bg-emerald-300' : 'bg-slate-200'}
                        `} />
                      )}
                    </div>

                    <button
                      onClick={() => toggleStage(stage.stage)}
                      className="flex-1 text-left"
                    >
                      <div className={`
                        bg-white rounded-lg border-2 p-3 transition-all duration-300 hover:shadow-md cursor-pointer
                        ${status === 'completed' ? 'border-emerald-200' : ''}
                        ${status === 'processing' ? 'border-blue-300 shadow-md shadow-blue-100' : ''}
                        ${status === 'failed' ? 'border-red-300' : ''}
                        ${status === 'pending' ? 'border-slate-200' : ''}
                      `}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 truncate">{stage.label}</h4>
                            {status === 'processing' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 flex-shrink-0">
                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                                Processing
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {status === 'completed' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" />
                                Done
                              </span>
                            )}
                            {status === 'failed' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-xs font-medium border border-red-200">
                                <XCircle className="w-3 h-3" />
                                Failed
                              </span>
                            )}
                            {status === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-xs font-medium border border-slate-200">
                                <Circle className="w-3 h-3" />
                                Pending
                              </span>
                            )}
                            {isStageExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {isStageExpanded && (
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>

                            {error && (
                              <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-2">
                                <div className="flex items-start gap-2">
                                  <XCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs font-medium text-red-900">Error Details</p>
                                    <p className="text-xs text-red-700 mt-0.5">{error}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {flow.status === 'failed' && flow.errorMessage && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <div className="bg-red-50 rounded-lg border border-red-200 p-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-red-900 text-sm">Processing Failed</h4>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">{flow.errorMessage}</p>
                    {flow.failedAt && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        Failed Stage: {PAYROLL_STAGES.find(s => s.stage === flow.failedAt)?.label}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

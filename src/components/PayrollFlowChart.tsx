import React from 'react';
import { CheckCircle2, Circle, XCircle, Loader2, ChevronRight } from 'lucide-react';
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
  const getStageStatus = (stageName: string): StageStatus => {
    const stageData = flow.stages.find(s => s.stage === stageName);
    return stageData?.status || 'pending';
  };

  const getStageError = (stageName: string): string | undefined => {
    const stageData = flow.stages.find(s => s.stage === stageName);
    return stageData?.error;
  };

  const statusBadge = getStatusBadge(flow.status);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Processing Pipeline</h3>
            <p className="text-sm text-slate-500 mt-1">Real-time payroll computation workflow</p>
          </div>
          <span className={`px-4 py-2 rounded-lg text-sm font-medium ${statusBadge.className}`}>
            {statusBadge.label}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="relative">
          {PAYROLL_STAGES.map((stage, index) => {
            const status = getStageStatus(stage.stage);
            const error = getStageError(stage.stage);
            const isLast = index === PAYROLL_STAGES.length - 1;

            return (
              <div key={stage.stage} className="relative">
                <div className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`
                      relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                      ${status === 'completed' ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : ''}
                      ${status === 'processing' ? 'bg-blue-500 shadow-lg shadow-blue-200' : ''}
                      ${status === 'failed' ? 'bg-red-500 shadow-lg shadow-red-200' : ''}
                      ${status === 'pending' ? 'bg-slate-200 border-2 border-slate-300' : ''}
                    `}>
                      {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-white" />}
                      {status === 'processing' && <Loader2 className="w-6 h-6 text-white animate-spin" />}
                      {status === 'failed' && <XCircle className="w-6 h-6 text-white" />}
                      {status === 'pending' && <Circle className="w-6 h-6 text-slate-400" />}
                    </div>

                    {!isLast && (
                      <div className={`
                        w-0.5 h-20 my-2 transition-all duration-300
                        ${status === 'completed' ? 'bg-emerald-300' : 'bg-slate-200'}
                      `} />
                    )}
                  </div>

                  <div className="flex-1 pb-20 last:pb-0">
                    <div className={`
                      bg-white rounded-lg border-2 p-5 transition-all duration-300 hover:shadow-md
                      ${status === 'completed' ? 'border-emerald-200 shadow-sm' : ''}
                      ${status === 'processing' ? 'border-blue-300 shadow-md shadow-blue-100' : ''}
                      ${status === 'failed' ? 'border-red-300 shadow-sm' : ''}
                      ${status === 'pending' ? 'border-slate-200' : ''}
                    `}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-base font-semibold text-slate-900">{stage.label}</h4>
                            {status === 'processing' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                Processing
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{stage.description}</p>

                          {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                              <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-red-900">Error Details</p>
                                  <p className="text-sm text-red-700 mt-1">{error}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          {status === 'completed' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Done
                            </span>
                          )}
                          {status === 'failed' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium border border-red-200">
                              <XCircle className="w-3.5 h-3.5" />
                              Failed
                            </span>
                          )}
                          {status === 'pending' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-medium border border-slate-200">
                              <Circle className="w-3.5 h-3.5" />
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {flow.status === 'failed' && flow.errorMessage && (
        <div className="border-t border-slate-200 bg-red-50 px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 text-base">Processing Failed</h4>
              <p className="text-sm text-red-700 mt-1 leading-relaxed">{flow.errorMessage}</p>
              {flow.failedAt && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  Failed Stage: {PAYROLL_STAGES.find(s => s.stage === flow.failedAt)?.label}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

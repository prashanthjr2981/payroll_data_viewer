import React from 'react';
import { CheckCircle2, Circle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { PayrollFlow, PAYROLL_STAGES, StageStatus } from '../types/payrollFlow';

interface PayrollFlowChartProps {
  flow: PayrollFlow;
}

const getStageIcon = (status: StageStatus) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    case 'processing':
      return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
    case 'failed':
      return <XCircle className="w-6 h-6 text-red-600" />;
    default:
      return <Circle className="w-6 h-6 text-gray-300" />;
  }
};

const getStageColor = (status: StageStatus) => {
  switch (status) {
    case 'completed':
      return 'border-green-500 bg-green-50';
    case 'processing':
      return 'border-blue-500 bg-blue-50';
    case 'failed':
      return 'border-red-500 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const getStatusBadge = (status: string) => {
  const badges = {
    not_started: 'bg-gray-100 text-gray-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700'
  };

  return badges[status as keyof typeof badges] || badges.not_started;
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

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payroll Processing Flow</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(flow.status)}`}>
          {flow.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-4">
        {PAYROLL_STAGES.map((stage, index) => {
          const status = getStageStatus(stage.stage);
          const error = getStageError(stage.stage);
          const isLast = index === PAYROLL_STAGES.length - 1;

          return (
            <div key={stage.stage}>
              <div className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${getStageColor(status)}`}>
                <div className="flex-shrink-0 mt-1">
                  {getStageIcon(status)}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{stage.label}</h4>
                    {status === 'processing' && (
                      <span className="text-xs text-blue-600 font-medium">Processing...</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{stage.description}</p>

                  {error && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
                      <span className="font-medium">Error: </span>
                      {error}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {status === 'completed' && (
                    <span className="text-xs text-green-600 font-medium">Done</span>
                  )}
                  {status === 'failed' && (
                    <span className="text-xs text-red-600 font-medium">Failed</span>
                  )}
                  {status === 'pending' && (
                    <span className="text-xs text-gray-400 font-medium">Pending</span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center py-2">
                  <ArrowRight className={`w-5 h-5 ${
                    status === 'completed' ? 'text-green-500' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {flow.status === 'failed' && flow.errorMessage && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900">Processing Failed</h4>
              <p className="text-sm text-red-700 mt-1">{flow.errorMessage}</p>
              {flow.failedAt && (
                <p className="text-xs text-red-600 mt-1">
                  Failed at stage: {PAYROLL_STAGES.find(s => s.stage === flow.failedAt)?.label}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

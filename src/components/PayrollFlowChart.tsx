import React, { useState } from 'react';
import { CheckCircle2, Circle, XCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { PayrollFlow, PAYROLL_STAGES, StageStatus } from '../types/payrollFlow';
import { PayrollData } from '../types/payroll';
import { formatCurrency } from '../services/payrollService';

interface PayrollFlowChartProps {
  flow: PayrollFlow;
  payrollData: PayrollData;
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

const DataItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5">
    <span className="text-xs text-slate-600">{label}</span>
    <span className="text-xs font-semibold text-slate-900">{value}</span>
  </div>
);

export const PayrollFlowChart: React.FC<PayrollFlowChartProps> = ({ flow, payrollData }) => {
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

  const getStageData = (stageName: string) => {
    switch (stageName) {
      case 'INITIALIZATION':
        return (
          <div className="space-y-2">
            <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
              <h5 className="text-xs font-semibold text-blue-900 mb-2">Employee Master (EMPR)</h5>
              <DataItem label="Employee ID" value={payrollData.employee.employee_id} />
              <DataItem label="Name" value={payrollData.employee.name} />
              <DataItem label="Department" value={payrollData.employee.department} />
              <DataItem label="Designation" value={payrollData.employee.designation} />
            </div>
            <div className="bg-purple-50 rounded-md p-3 border border-purple-200">
              <h5 className="text-xs font-semibold text-purple-900 mb-2">Monthly Payroll (MONR)</h5>
              <DataItem label="Basic Salary" value={formatCurrency(payrollData.monthly.basic_salary)} />
              <DataItem label="HRA" value={formatCurrency(payrollData.monthly.hra)} />
              <DataItem label="Special Allowance" value={formatCurrency(payrollData.monthly.special_allowance)} />
              <DataItem label="Other Allowances" value={formatCurrency(payrollData.monthly.other_allowances)} />
              <div className="border-t border-purple-300 my-2 pt-2">
                <DataItem label="Gross Earnings" value={formatCurrency(payrollData.monthly.gross_earnings)} />
              </div>
            </div>
            <div className="bg-amber-50 rounded-md p-3 border border-amber-200">
              <h5 className="text-xs font-semibold text-amber-900 mb-2">Compensation (COMP)</h5>
              <DataItem label="CTC" value={formatCurrency(payrollData.compensation.ctc)} />
              <DataItem label="Fixed Component" value={formatCurrency(payrollData.compensation.fixed_component)} />
              <DataItem label="Variable Component" value={formatCurrency(payrollData.compensation.variable_component)} />
              <DataItem label="Bonus" value={formatCurrency(payrollData.compensation.bonus)} />
            </div>
          </div>
        );

      case 'HRA':
        return (
          <div className="bg-purple-50 rounded-md p-3 border border-purple-200">
            <h5 className="text-xs font-semibold text-purple-900 mb-2">HRA Calculation (MONR)</h5>
            <DataItem label="HRA Amount" value={formatCurrency(payrollData.monthly.hra)} />
            <DataItem label="Basic Salary" value={formatCurrency(payrollData.monthly.basic_salary)} />
            <p className="text-xs text-purple-700 mt-2 italic">Metro classification applied</p>
          </div>
        );

      case 'PROF_TAX':
        return (
          <div className="space-y-2">
            <div className="bg-red-50 rounded-md p-3 border border-red-200">
              <h5 className="text-xs font-semibold text-red-900 mb-2">Professional Tax (PROF)</h5>
              <DataItem label="PT Amount" value={formatCurrency(payrollData.professionalTax.pt_amount)} />
              <DataItem label="PT State" value={payrollData.professionalTax.pt_state} />
            </div>
            <div className="bg-orange-50 rounded-md p-3 border border-orange-200">
              <h5 className="text-xs font-semibold text-orange-900 mb-2">Deductions (DEDR)</h5>
              <DataItem label="PT Deduction" value={formatCurrency(payrollData.deductions.pt_deduction)} />
            </div>
          </div>
        );

      case 'PROVIDENT_FUND':
        return (
          <div className="space-y-2">
            <div className="bg-green-50 rounded-md p-3 border border-green-200">
              <h5 className="text-xs font-semibold text-green-900 mb-2">Provident Fund (PFDR)</h5>
              <DataItem label="Employee Contribution" value={formatCurrency(payrollData.providentFund.employee_contribution)} />
              <DataItem label="Employer Contribution" value={formatCurrency(payrollData.providentFund.employer_contribution)} />
              <DataItem label="PF Account Number" value={payrollData.providentFund.pf_account_number} />
              <div className="border-t border-green-300 my-2 pt-2">
                <DataItem label="Total PF" value={formatCurrency(payrollData.providentFund.employee_contribution + payrollData.providentFund.employer_contribution)} />
              </div>
            </div>
            <div className="bg-orange-50 rounded-md p-3 border border-orange-200">
              <h5 className="text-xs font-semibold text-orange-900 mb-2">Deductions (DEDR)</h5>
              <DataItem label="PF Deduction" value={formatCurrency(payrollData.deductions.pf_deduction)} />
            </div>
          </div>
        );

      case 'INCOME_TAX':
        return (
          <div className="space-y-2">
            <div className="bg-indigo-50 rounded-md p-3 border border-indigo-200">
              <h5 className="text-xs font-semibold text-indigo-900 mb-2">Income Tax (TAXR)</h5>
              <DataItem label="TDS Amount" value={formatCurrency(payrollData.incomeTax.tds_amount)} />
              <DataItem label="Taxable Income" value={formatCurrency(payrollData.incomeTax.taxable_income)} />
              <DataItem label="Tax Regime" value={payrollData.incomeTax.tax_regime} />
            </div>
            <div className="bg-orange-50 rounded-md p-3 border border-orange-200">
              <h5 className="text-xs font-semibold text-orange-900 mb-2">Deductions (DEDR)</h5>
              <DataItem label="TDS Deduction" value={formatCurrency(payrollData.deductions.tds_deduction)} />
            </div>
            <div className="bg-teal-50 rounded-md p-3 border border-teal-200">
              <h5 className="text-xs font-semibold text-teal-900 mb-2">Year-to-Date (YTDR)</h5>
              <DataItem label="YTD Tax" value={formatCurrency(payrollData.ytd.ytd_tax)} />
            </div>
          </div>
        );

      case 'COMPLETED':
        return (
          <div className="space-y-2">
            <div className="bg-emerald-50 rounded-md p-3 border border-emerald-200">
              <h5 className="text-xs font-semibold text-emerald-900 mb-2">Net Payment (NETP)</h5>
              <DataItem label="Gross Amount" value={formatCurrency(payrollData.netPayment.gross_amount)} />
              <DataItem label="Total Deductions" value={formatCurrency(payrollData.netPayment.total_deductions)} />
              <div className="border-t border-emerald-300 my-2 pt-2">
                <DataItem label="Net Amount" value={formatCurrency(payrollData.netPayment.net_amount)} />
              </div>
              <DataItem label="Payment Date" value={new Date(payrollData.netPayment.payment_date).toLocaleDateString('en-IN')} />
              <DataItem label="Payment Status" value={payrollData.netPayment.payment_status} />
            </div>
            <div className="bg-teal-50 rounded-md p-3 border border-teal-200">
              <h5 className="text-xs font-semibold text-teal-900 mb-2">Year-to-Date (YTDR)</h5>
              <DataItem label="YTD Gross" value={formatCurrency(payrollData.ytd.ytd_gross)} />
              <DataItem label="YTD Deductions" value={formatCurrency(payrollData.ytd.ytd_deductions)} />
              <DataItem label="YTD Net Pay" value={formatCurrency(payrollData.ytd.ytd_net)} />
              <DataItem label="YTD Tax" value={formatCurrency(payrollData.ytd.ytd_tax)} />
            </div>
            <div className="bg-orange-50 rounded-md p-3 border border-orange-200">
              <h5 className="text-xs font-semibold text-orange-900 mb-2">All Deductions (DEDR)</h5>
              <DataItem label="PF Deduction" value={formatCurrency(payrollData.deductions.pf_deduction)} />
              <DataItem label="PT Deduction" value={formatCurrency(payrollData.deductions.pt_deduction)} />
              <DataItem label="TDS Deduction" value={formatCurrency(payrollData.deductions.tds_deduction)} />
              <DataItem label="Loan Deduction" value={formatCurrency(payrollData.deductions.loan_deduction)} />
              <DataItem label="Other Deductions" value={formatCurrency(payrollData.deductions.other_deductions)} />
              <div className="border-t border-orange-300 my-2 pt-2">
                <DataItem label="Total Deductions" value={formatCurrency(payrollData.deductions.total_deductions)} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
                          <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
                            <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>

                            {getStageData(stage.stage)}

                            {error && (
                              <div className="bg-red-50 border border-red-200 rounded-md p-2">
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

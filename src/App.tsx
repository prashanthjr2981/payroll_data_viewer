import { useState } from 'react';
import {
  Search,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  PieChart,
  Receipt,
  AlertCircle
} from 'lucide-react';
import { PayrollCard, DataRow } from './components/PayrollCard';
import { getPayrollData, formatCurrency } from './services/payrollService';
import { PayrollData } from './types/payroll';

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [payrollPeriod, setPayrollPeriod] = useState('');
  const [payrollData, setPayrollData] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!employeeId || !payrollPeriod) {
      setError('Please enter both Employee ID and Payroll Period');
      return;
    }

    setLoading(true);
    setError('');
    setPayrollData(null);

    try {
      const data = await getPayrollData(employeeId, payrollPeriod);
      if (data) {
        setPayrollData(data);
      } else {
        setError('No payroll data found for the given Employee ID and Period');
      }
    } catch (err) {
      setError('An error occurred while fetching payroll data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payroll Data Viewer</h1>
          <p className="text-gray-600">Access comprehensive payroll information instantly</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700 mb-2">
                Employee ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g., EMP001"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="payrollPeriod" className="block text-sm font-semibold text-gray-700 mb-2">
                Payroll Period
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="payrollPeriod"
                  type="text"
                  value={payrollPeriod}
                  onChange={(e) => setPayrollPeriod(e.target.value)}
                  placeholder="MM YYYY (e.g., 01 2026)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search Payroll Data'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Available Test Data:</strong> EMP001, EMP002, EMP003 | Periods: 01 2026, 02 2026 (for EMP001)
            </p>
          </div>
        </div>

        {payrollData && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Employee Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="text-lg font-semibold text-gray-900">{payrollData.employee.employee_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{payrollData.employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-lg font-semibold text-gray-900">{payrollData.employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="text-lg font-semibold text-gray-900">{payrollData.employee.designation}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PayrollCard title="Monthly Payroll Data (MONR)" icon={<Calendar className="w-6 h-6" />}>
                <DataRow label="Basic Salary" value={formatCurrency(payrollData.monthly.basic_salary)} />
                <DataRow label="HRA" value={formatCurrency(payrollData.monthly.hra)} />
                <DataRow label="Special Allowance" value={formatCurrency(payrollData.monthly.special_allowance)} />
                <DataRow label="Other Allowances" value={formatCurrency(payrollData.monthly.other_allowances)} />
                <DataRow label="Gross Earnings" value={formatCurrency(payrollData.monthly.gross_earnings)} highlight />
              </PayrollCard>

              <PayrollCard title="Year-to-Date Data (YTDR)" icon={<TrendingUp className="w-6 h-6" />}>
                <DataRow label="Year" value={payrollData.ytd.year} />
                <DataRow label="YTD Gross" value={formatCurrency(payrollData.ytd.ytd_gross)} />
                <DataRow label="YTD Deductions" value={formatCurrency(payrollData.ytd.ytd_deductions)} />
                <DataRow label="YTD Net Pay" value={formatCurrency(payrollData.ytd.ytd_net)} />
                <DataRow label="YTD Tax" value={formatCurrency(payrollData.ytd.ytd_tax)} highlight />
              </PayrollCard>

              <PayrollCard title="Professional Tax" icon={<FileText className="w-6 h-6" />}>
                <DataRow label="PT Amount" value={formatCurrency(payrollData.professionalTax.pt_amount)} />
                <DataRow label="PT State" value={payrollData.professionalTax.pt_state} />
              </PayrollCard>

              <PayrollCard title="Provident Fund" icon={<PieChart className="w-6 h-6" />}>
                <DataRow label="Employee Contribution" value={formatCurrency(payrollData.providentFund.employee_contribution)} />
                <DataRow label="Employer Contribution" value={formatCurrency(payrollData.providentFund.employer_contribution)} />
                <DataRow label="PF Account Number" value={payrollData.providentFund.pf_account_number} />
                <DataRow
                  label="Total PF"
                  value={formatCurrency(payrollData.providentFund.employee_contribution + payrollData.providentFund.employer_contribution)}
                  highlight
                />
              </PayrollCard>

              <PayrollCard title="Income Tax" icon={<Receipt className="w-6 h-6" />}>
                <DataRow label="TDS Amount" value={formatCurrency(payrollData.incomeTax.tds_amount)} />
                <DataRow label="Taxable Income" value={formatCurrency(payrollData.incomeTax.taxable_income)} />
                <DataRow label="Tax Regime" value={payrollData.incomeTax.tax_regime} highlight />
              </PayrollCard>

              <PayrollCard title="Deductions" icon={<CreditCard className="w-6 h-6" />}>
                <DataRow label="PF Deduction" value={formatCurrency(payrollData.deductions.pf_deduction)} />
                <DataRow label="PT Deduction" value={formatCurrency(payrollData.deductions.pt_deduction)} />
                <DataRow label="TDS Deduction" value={formatCurrency(payrollData.deductions.tds_deduction)} />
                <DataRow label="Loan Deduction" value={formatCurrency(payrollData.deductions.loan_deduction)} />
                <DataRow label="Other Deductions" value={formatCurrency(payrollData.deductions.other_deductions)} />
                <DataRow label="Total Deductions" value={formatCurrency(payrollData.deductions.total_deductions)} highlight />
              </PayrollCard>

              <PayrollCard title="Compensation Details" icon={<DollarSign className="w-6 h-6" />}>
                <DataRow label="CTC" value={formatCurrency(payrollData.compensation.ctc)} />
                <DataRow label="Fixed Component" value={formatCurrency(payrollData.compensation.fixed_component)} />
                <DataRow label="Variable Component" value={formatCurrency(payrollData.compensation.variable_component)} />
                <DataRow label="Bonus" value={formatCurrency(payrollData.compensation.bonus)} highlight />
              </PayrollCard>

              <PayrollCard title="Net Payment" icon={<DollarSign className="w-6 h-6" />}>
                <DataRow label="Gross Amount" value={formatCurrency(payrollData.netPayment.gross_amount)} />
                <DataRow label="Total Deductions" value={formatCurrency(payrollData.netPayment.total_deductions)} />
                <DataRow label="Net Amount" value={formatCurrency(payrollData.netPayment.net_amount)} highlight />
                <DataRow label="Payment Date" value={new Date(payrollData.netPayment.payment_date).toLocaleDateString('en-IN')} />
                <DataRow
                  label="Payment Status"
                  value={
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      payrollData.netPayment.payment_status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payrollData.netPayment.payment_status}
                    </span>
                  }
                />
              </PayrollCard>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Gross Earnings</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(payrollData.monthly.gross_earnings)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Deductions</p>
                  <p className="text-3xl font-bold text-red-600">
                    {formatCurrency(payrollData.deductions.total_deductions)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Net Take Home</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(payrollData.netPayment.net_amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

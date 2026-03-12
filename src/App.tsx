import { useState } from 'react';
import { Search, User, Calendar, AlertCircle } from 'lucide-react';
import { PayrollFlowChart } from './components/PayrollFlowChart';
import { getPayrollData } from './services/payrollService';
import { PayrollData } from './types/payroll';
import { PayrollFlow } from './types/payrollFlow';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Payroll Processing System
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="employeeId" className="block text-sm font-semibold text-slate-700 mb-2">
                Employee ID
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                <input
                  id="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g., EMP001"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="payrollPeriod" className="block text-sm font-semibold text-slate-700 mb-2">
                Payroll Period
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                <input
                  id="payrollPeriod"
                  type="text"
                  value={payrollPeriod}
                  onChange={(e) => setPayrollPeriod(e.target.value)}
                  placeholder="01 2026"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50"
                />
              </div>
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'View Payroll'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {payrollData && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Employee Information</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Employee ID</p>
                  <p className="text-sm font-semibold text-slate-900">{payrollData.employee.employee_id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Name</p>
                  <p className="text-sm font-semibold text-slate-900">{payrollData.employee.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Department</p>
                  <p className="text-sm font-semibold text-slate-900">{payrollData.employee.department}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Designation</p>
                  <p className="text-sm font-semibold text-slate-900">{payrollData.employee.designation}</p>
                </div>
              </div>
            </div>

            {payrollData.flow && (
              <PayrollFlowChart flow={payrollData.flow as PayrollFlow} payrollData={payrollData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

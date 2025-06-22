import React, { useState, useEffect } from 'react';
import { Calculator, Church, History, User, Calendar, Clock, TrendingUp, Award, Users } from 'lucide-react';
import { RCCGLogo } from './components/RCCGLogo';

interface CalculationRecord {
  id: string;
  amount: number;
  sixtyFivePercent: number;
  thirtyFivePercent: number;
  userName: string;
  timestamp: string;
  date: string;
  time: string;
}

function App() {
  const [amount, setAmount] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [currentCalculation, setCurrentCalculation] = useState<{
    sixtyFive: number;
    thirtyFive: number;
  } | null>(null);
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('churchCalculatorHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('churchCalculatorHistory', JSON.stringify(history));
  }, [history]);

  const calculatePercentages = (value: number) => {
    const sixtyFive = (value * 65) / 100;
    const thirtyFive = (value * 35) / 100;
    return { sixtyFive, thirtyFive };
  };

  const updateCalculation = () => {
    // Only show calculation if both name and amount are provided
    if (userName.trim() && amount && !isNaN(Number(amount))) {
      const numValue = Number(amount);
      const calculation = calculatePercentages(numValue);
      setCurrentCalculation(calculation);
    } else {
      setCurrentCalculation(null);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };

  // Update calculation whenever name or amount changes
  useEffect(() => {
    updateCalculation();
  }, [userName, amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !userName.trim() || isNaN(Number(amount))) {
      alert('Please enter a valid amount and your name');
      return;
    }

    const numAmount = Number(amount);
    const calculation = calculatePercentages(numAmount);
    const now = new Date();
    
    const newRecord: CalculationRecord = {
      id: Date.now().toString(),
      amount: numAmount,
      sixtyFivePercent: calculation.sixtyFive,
      thirtyFivePercent: calculation.thirtyFive,
      userName: userName.trim(),
      timestamp: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };

    setHistory(prev => [newRecord, ...prev]);
    
    // Reset form
    setAmount('');
    setUserName('');
    setCurrentCalculation(null);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all calculation history?')) {
      setHistory([]);
      localStorage.removeItem('churchCalculatorHistory');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const isCalculationReady = userName.trim() && amount && !isNaN(Number(amount));

  // Calculate summary statistics
  const totalAmount = history.reduce((sum, record) => sum + record.amount, 0);
  const total65Percent = history.reduce((sum, record) => sum + record.sixtyFivePercent, 0);
  const total35Percent = history.reduce((sum, record) => sum + record.thirtyFivePercent, 0);
  const uniqueContributors = new Set(history.map(record => record.userName)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <RCCGLogo size={80} className="drop-shadow-lg" />
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl -z-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  RCCG Builder's Parish
                </h1>
                <p className="text-blue-100 text-xl font-medium">Offering Calculator & Record System</p>
                <p className="text-blue-200 text-sm mt-1 italic">"Building Lives, Building Faith, Building Future"</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            {history.length > 0 && (
              <div className="hidden lg:block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">₦{formatCurrency(totalAmount)}</div>
                  <div className="text-blue-200 text-sm">Total Offerings</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Section - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Calculate Offering Split</h2>
                    <p className="text-blue-100 text-sm">Enter details to calculate the distribution</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600" />
                          Your Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={handleNameChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="Enter your full name"
                        required
                      />
                      {!userName.trim() && amount && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="text-sm text-amber-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Please enter your name to see the calculation
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">₦</span>
                          Offering Amount *
                        </div>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-xl placeholder-gray-400"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {currentCalculation && isCalculationReady && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4 animate-in fade-in duration-500">
                      <div className="flex items-center gap-2 text-blue-900 mb-4">
                        <TrendingUp className="w-5 h-5" />
                        <h3 className="font-bold text-lg">Calculation Preview</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            ₦{formatCurrency(currentCalculation.sixtyFive)}
                          </div>
                          <div className="text-sm font-medium text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                            65% Portion
                          </div>
                        </div>
                        <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
                          <div className="text-3xl font-bold text-orange-600 mb-2">
                            ₦{formatCurrency(currentCalculation.thirtyFive)}
                          </div>
                          <div className="text-sm font-medium text-gray-600 bg-orange-50 px-3 py-1 rounded-full">
                            35% Portion
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCalculationReady && (amount || userName) && (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-center">
                      <div className="text-gray-500 mb-2">
                        <Calculator className="w-8 h-8 mx-auto opacity-50" />
                      </div>
                      <p className="text-gray-600 font-medium">
                        {!userName.trim() && !amount && "Enter your name and amount to see calculation"}
                        {!userName.trim() && amount && "Enter your name to see calculation"}
                        {userName.trim() && !amount && "Enter an amount to see calculation"}
                        {userName.trim() && amount && isNaN(Number(amount)) && "Please enter a valid amount"}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isCalculationReady}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg transform hover:scale-[1.02] ${
                      isCalculationReady
                        ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white hover:shadow-2xl hover:from-blue-700 hover:to-indigo-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isCalculationReady ? (
                      <span className="flex items-center justify-center gap-2">
                        <Award className="w-5 h-5" />
                        Save Calculation
                      </span>
                    ) : (
                      'Complete Form to Save'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* History Section - Enhanced */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 h-fit">
              <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Recent History</h2>
                    <p className="text-green-100 text-sm">{history.length} calculations</p>
                  </div>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-green-100 hover:text-white text-sm underline transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="p-6">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <History className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="font-medium">No calculations yet</p>
                    <p className="text-sm mt-1">Your history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {history.slice(0, 5).map((record) => (
                      <div
                        key={record.id}
                        className="border-2 border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="truncate max-w-24">{record.userName}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              {record.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {record.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-lg font-bold text-gray-800 mb-3 text-center">
                          Total: ₦{formatCurrency(record.amount)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center bg-green-50 border border-green-200 rounded-xl p-3">
                            <div className="text-sm font-semibold text-green-700">
                              ₦{formatCurrency(record.sixtyFivePercent)}
                            </div>
                            <div className="text-xs text-green-600 font-medium">65%</div>
                          </div>
                          <div className="text-center bg-orange-50 border border-orange-200 rounded-xl p-3">
                            <div className="text-sm font-semibold text-orange-700">
                              ₦{formatCurrency(record.thirtyFivePercent)}
                            </div>
                            <div className="text-xs text-orange-600 font-medium">35%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {history.length > 5 && (
                      <div className="text-center py-3">
                        <p className="text-sm text-gray-500">
                          +{history.length - 5} more calculations
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Statistics */}
        {history.length > 0 && (
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-600 px-8 py-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Summary Statistics</h2>
                  <p className="text-yellow-100">Overall offering insights</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {history.length}
                  </div>
                  <div className="text-gray-600 font-medium">Total Calculations</div>
                </div>
                
                <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {uniqueContributors}
                  </div>
                  <div className="text-gray-600 font-medium">Contributors</div>
                </div>
                
                <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">65%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ₦{formatCurrency(total65Percent)}
                  </div>
                  <div className="text-gray-600 font-medium">Total 65% Portion</div>
                </div>
                
                <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">35%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    ₦{formatCurrency(total35Percent)}
                  </div>
                  <div className="text-gray-600 font-medium">Total 35% Portion</div>
                </div>
              </div>
              
              <div className="mt-8 text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  ₦{formatCurrency(totalAmount)}
                </div>
                <div className="text-gray-600 font-semibold text-lg">Grand Total Offerings</div>
                <div className="text-sm text-gray-500 mt-2">
                  "Every good gift and every perfect gift is from above" - James 1:17
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default App;
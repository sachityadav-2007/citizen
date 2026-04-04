import { RefreshCcw, DollarSign, Euro, PoundSterling, Wallet } from 'lucide-react';

const CurrencyCard = ({ state, onRefresh }) => {
  const { data, loading, error } = state;

  const calculateRate = (targetCode) => {
    if (!data || !data.INR || !data[targetCode]) return 0;
    // Base is USD. 1 INR in USD = 1 / data.INR
    // Target rate = (1 / data.INR) * data[targetCode]
    return ((1 / data.INR) * data[targetCode]).toFixed(4);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 flex flex-col h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] delay-[100ms]">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
          Currency <span className="text-xs font-normal bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-500/30">1 INR</span>
        </h2>
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 group"
        >
          <RefreshCcw className={`w-5 h-5 text-slate-300 group-hover:text-white ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading && !data && (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
            {error}
          </div>
        )}

        {data && !error && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-semibold text-slate-200">USD</span>
              </div>
              <span className="text-xl font-mono text-white">{calculateRate('USD')}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Euro className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-semibold text-slate-200">EUR</span>
              </div>
              <span className="text-xl font-mono text-white">{calculateRate('EUR')}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <PoundSterling className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-semibold text-slate-200">GBP</span>
              </div>
              <span className="text-xl font-mono text-white">{calculateRate('GBP')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyCard;

import { RefreshCcw, Lightbulb } from 'lucide-react';

const FactCard = ({ state, onRefresh }) => {
  const { data, loading, error } = state;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 flex flex-col h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] delay-[300ms]">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          City Fact
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
            {error}
          </div>
        )}

        {data && !error && (
          <div className="relative">
            <div className="text-6xl text-white/5 absolute -top-6 -left-2 font-serif select-none">"</div>
            <p className="text-slate-200 text-lg leading-relaxed relative z-10 italic pl-4 border-l-2 border-amber-500/30">
              {data}
            </p>
            <div className="text-6xl text-white/5 absolute -bottom-10 -right-2 font-serif select-none">"</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactCard;

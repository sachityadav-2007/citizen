import { RefreshCcw, Mail, MapPin } from 'lucide-react';

const CitizenCard = ({ state, onRefresh }) => {
  const { data, loading, error } = state;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 flex flex-col h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] delay-[200ms]">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">Citizen Profile</h2>
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
            {error}
          </div>
        )}

        {data && !error && (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur opacity-30 z-0"></div>
              <img 
                src={data.picture.large} 
                alt={`${data.name.first} ${data.name.last}`} 
                className="w-24 h-24 rounded-full border-2 border-white/20 shadow-lg relative z-10"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">
              {data.name.title} {data.name.first} {data.name.last}
            </h3>
            
            <div className="w-full space-y-3 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg justify-start px-4">
                <Mail className="w-4 h-4 text-pink-400" />
                <span className="text-sm truncate" title={data.email}>{data.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg justify-start px-4">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span className="text-sm truncate">{data.location.city}, {data.location.country}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenCard;

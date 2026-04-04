import { RefreshCcw, Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer, CloudFog } from 'lucide-react';

const getWeatherEmoji = (code) => {
  // 0=Clear Sky, 1=Mainly Clear, 2=Partly Cloudy, 3=Overcast, 45=Fog, 61=Rain, 80=Rain Showers, 95=Thunderstorm
  if (code === 0 || code === 1) return { icon: <Sun className="w-12 h-12 text-yellow-400" />, label: 'Clear' };
  if (code === 2) return { icon: <Cloud className="w-12 h-12 text-gray-300" />, label: 'Partly Cloudy' };
  if (code === 3) return { icon: <Cloud className="w-12 h-12 text-gray-400" />, label: 'Overcast' };
  if (code === 45) return { icon: <CloudFog className="w-12 h-12 text-gray-300" />, label: 'Fog' };
  if (code === 61 || code === 80) return { icon: <CloudRain className="w-12 h-12 text-blue-400" />, label: 'Rain' };
  if (code === 95) return { icon: <CloudLightning className="w-12 h-12 text-yellow-300" />, label: 'Thunderstorm' };
  return { icon: <Cloud className="w-12 h-12 text-gray-300" />, label: 'Unknown' };
};

const WeatherCard = ({ state, onRefresh }) => {
  const { data, loading, error } = state;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 flex flex-col h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">Weather</h2>
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 group"
          aria-label="Refresh Weather"
        >
          <RefreshCcw className={`w-5 h-5 text-slate-300 group-hover:text-white ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading && !data && (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}
        
        {error && (
          <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
            {error}
          </div>
        )}

        {data && !error && (
          <div className="flex flex-col items-center">
            {getWeatherEmoji(data.weathercode).icon}
            <div className="text-4xl font-extrabold mt-4 text-white">
              {data.temperature}°C
            </div>
            <div className="text-lg text-blue-200 mt-1 font-medium">
              {getWeatherEmoji(data.weathercode).label}
            </div>
            
            <div className="w-full flex justify-between items-center mt-6 pt-4 border-t border-white/10 text-sm grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 justify-center">
                <Thermometer className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 font-medium">Temp</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 justify-center">
                <Wind className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 font-medium">{data.windspeed} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;

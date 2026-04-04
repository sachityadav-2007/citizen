import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import CurrencyCard from './components/CurrencyCard';
import CitizenCard from './components/CitizenCard';
import FactCard from './components/FactCard';
import Chatbot from './components/Chatbot';

function App() {
  const [weatherData, setWeatherData] = useState({ data: null, loading: true, error: null });
  const [currencyData, setCurrencyData] = useState({ data: null, loading: true, error: null });
  const [citizenData, setCitizenData] = useState({ data: null, loading: true, error: null });
  const [factData, setFactData] = useState({ data: null, loading: true, error: null });

  const fetchWeather = async () => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current_weather=true');
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      setWeatherData({ data: data.current_weather, loading: false, error: null });
    } catch (err) {
      setWeatherData({ data: null, loading: false, error: err.message });
    }
  };

  const fetchCurrency = async () => {
    setCurrencyData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch currency');
      const data = await res.json();
      setCurrencyData({ data: data.rates, loading: false, error: null });
    } catch (err) {
      setCurrencyData({ data: null, loading: false, error: err.message });
    }
  };

  const fetchCitizen = async () => {
    setCitizenData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('https://randomuser.me/api/');
      if (!res.ok) throw new Error('Failed to fetch citizen');
      const data = await res.json();
      setCitizenData({ data: data.results[0], loading: false, error: null });
    } catch (err) {
      setCitizenData({ data: null, loading: false, error: err.message });
    }
  };

  const fetchFact = async () => {
    setFactData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      if (!res.ok) throw new Error('Failed to fetch fact');
      const data = await res.json();
      setFactData({ data: data.text, loading: false, error: null });
    } catch (err) {
      setFactData({ data: null, loading: false, error: err.message });
    }
  };

  const fetchAll = async () => {
    await Promise.allSettled([
      fetchWeather(),
      fetchCurrency(),
      fetchCitizen(),
      fetchFact()
    ]);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      {/* Background decorations for extra glassmorphism feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/40 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/40 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-sm mb-3">
            SmartCity Dashboard
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Real-time urban metrics, local updates, and AI assistance all in one place.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 relative">
          <WeatherCard state={weatherData} onRefresh={fetchWeather} />
          <CurrencyCard state={currencyData} onRefresh={fetchCurrency} />
          <CitizenCard state={citizenData} onRefresh={fetchCitizen} />
          <FactCard state={factData} onRefresh={fetchFact} />
        </main>

        <Chatbot 
          weatherData={weatherData.data} 
          currencyData={currencyData.data} 
          citizenData={citizenData.data} 
          factData={factData.data} 
        />
      </div>
    </div>
  );
}

export default App;

import { KeyboardEvent, useEffect, useState } from 'react';
import './App.css';
import Map from './components/map';
import { Input } from './components/ui/input';
import { useForecast } from './services/forecast';
import ForecastCard from './components/forecast/forecast-card';
import { Spinner } from './components/ui/spinner';

function App() {
  const [q, setQ] = useState('Damascus');
  const [searchQuery, setSearchQuery] = useState('Damascus');
  const [position, setPosition] = useState<[number, number]>([33.5, 36.3]);

  const { data, isLoading, isError } = useForecast(q);

  useEffect(() => {
    if (data) {
      setPosition([data.location.lat, data.location.lon]);
    }
  }, [data]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQ(searchQuery);
    }
  };


  return (
    <div className="h-screen relative">
      {/* Map Component */}
      <Map position={position} />

      {/* Input Box */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[999] w-42 sm:w-80 md:w-96">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type location then press enter."
        />
      </div>

      {/* Forecast */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 absolute bottom-5 left-1/2 -translate-x-1/2 z-[999] w-[90%]'>
        {data?.forecast.forecastday.map((day, index) =>
          <ForecastCard
            key={index}
            date={new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
            maxTemp={day.day.maxtemp_c}
            minTemp={day.day.mintemp_c}
            icon={day.day.condition.icon}
          />
        )}
      </div>

      {/* Error Message */}
      {isError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] text-red-500 bg-red-200 p-3 rounded-lg shadow">
          No matching location found.
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <Spinner />
      )}
    </div>
  );
}

export default App;

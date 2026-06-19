import axios from "axios";
import { useEffect, useState } from "react";

//weather Data type
type WeatherData = {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  clouds: { all: number };
};

const WeatherDataFetch = () => {
  //various states used in this component
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState("");

  const apiKey = "0fb92c3562b1cbbe6aeddb73eaaa63a5"; //unique api key for authorized request to the server.

  useEffect(() => {

    //timer is used to send request every 500ms.
    const timer = setTimeout(async () => {
      if (!search.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: { q: search, appid: apiKey, units: "metric" },
          },
        );
        const weatherData = res.data;
        setWeather(weatherData);
      } catch (err: any) {
        setError(
          err.response?.status === 404
            ? "City not found."
            : "Something went wrong.",
        );
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //a set of array of object to display various weather data and label
  const weatherStats = weather
    ? [
        {
          label: "Feels like",
          value: `${Math.round(weather.main.feels_like)}°`,
        },
        { label: "Humidity", value: `${weather.main.humidity}%` },
        { label: "Pressure", value: `${weather.main.pressure} hPa` },
        { label: "Cloud cover", value: `${weather.clouds?.all ?? "—"}%` },
      ]
    : [];

  return (
    <div className="max-w-sm mx-auto p-4 font-sans">
      {/* Search */}
      <input
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4 outline-none focus:ring-1 focus:ring-gray-300"
        type="text"
        placeholder="Enter city name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-400 text-center py-6">Loading…</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-500 border border-red-100 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Card */}
      {weather && !loading && (
        <div className="border rounded-xl p-4">
          {/* City + temp */}
          <div className="mb-4">
            <p className="text-lg font-medium">{weather.name}</p>
            <p className="text-4xl font-semibold mt-1">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-sm text-gray-400 mt-1">
              H: {Math.round(weather.main.temp_max)}° L:{" "}
              {Math.round(weather.main.temp_min)}°
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2">
            {weatherStats.map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className="text-sm font-medium mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDataFetch;

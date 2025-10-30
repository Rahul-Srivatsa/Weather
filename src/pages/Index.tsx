// import { useState } from "react";
// import { RainEffect } from "@/components/RainEffect";
// import { SnowEffect } from "@/components/SnowEffect";
// import { CloudEffect } from "@/components/CloudEffect";
// import { SunEffect } from "@/components/SunEffect";
// import { ThunderstormEffect } from "@/components/ThunderstormEffect";
// import { FogEffect } from "@/components/FogEffect";
// import { WeatherCard } from "@/components/WeatherCard";
// import { SearchBar } from "@/components/SearchBar";
// import { HourlyForecastChart } from "@/components/HourlyForecastChart";
// import { DailyForecastChart } from "@/components/DailyForecastChart";
// import { motion, Variants } from "framer-motion";
// import Swal from "sweetalert2";

// interface WeatherData {
//   temperature: number;
//   condition: string;
//   humidity: number;
//   windSpeed: number;
//   visibility: number;
//   feelsLike: number;
// }

// const Index = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [city, setCity] = useState("");
//   const [weatherEffect, setWeatherEffect] = useState<string>("thunderstorm");
//   const [hourlyForecast, setHourlyForecast] = useState([]);
//   const [dailyForecast, setDailyForecast] = useState([]);

//   const fetchWeather = async (cityName: string) => {
//     try {
//       const geoResponse = await fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
//           cityName
//         )}&count=1&language=en&format=json`
//       );
//       const geoData = await geoResponse.json();

//       if (!geoData.results || geoData.results.length === 0) {
//         Swal.fire({
//           icon: "error",
//           title: "City Not Found",
//           text: "Please try another city name.",
//           confirmButtonColor: "#3b82f6",
//           background: "#1f2937",
//           color: "#fff",
//         });
//         return;
//       }

//       const { latitude, longitude, name } = geoData.results[0];

//       const weatherResponse = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility&hourly=temperature_2m,precipitation_probability,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code`
//       );

//       const weatherDataResponse = await weatherResponse.json();
//       const current = weatherDataResponse.current;

//       // Set hourly forecast (24h)
//       setHourlyForecast(
//         weatherDataResponse.hourly.time
//           .slice(0, 24)
//           .map((t: string, i: number) => ({
//             time: t.split("T")[1].slice(0, 5),
//             temp: weatherDataResponse.hourly.temperature_2m[i],
//             rainChance: weatherDataResponse.hourly.precipitation_probability[i],
//             humidity: weatherDataResponse.hourly.relative_humidity_2m[i],
//           }))
//       );

//       // Set 7-day forecast
//       const dailyData = weatherDataResponse.daily.time.map(
//         (t: string, i: number) => ({
//           date: t,
//           day: new Date(t).toLocaleDateString("en", { weekday: "short" }),
//           min: weatherDataResponse.daily.temperature_2m_min[i],
//           max: weatherDataResponse.daily.temperature_2m_max[i],
//           rain: weatherDataResponse.daily.precipitation_sum[i],
//           code: weatherDataResponse.daily.weather_code[i],
//         })
//       );
//       setDailyForecast(dailyData.slice(0, 7));

//       // Map weather code to condition
//       const getWeatherCondition = (code: number) => {
//         if (code === 0) return "Clear Sky";
//         if (code <= 3) return "Partly Cloudy";
//         if (code <= 49) return "Foggy";
//         if (code <= 59) return "Drizzle";
//         if (code <= 69) return "Rainy";
//         if (code <= 79) return "Snowy";
//         if (code <= 99) return "Thunderstorm";
//         return "Unknown";
//       };

//       const condition = getWeatherCondition(current.weather_code);

//       // Determine weather effect
//       let effect = "rain";
//       if (current.weather_code === 0) effect = "sun";
//       else if (current.weather_code <= 3) effect = "cloud";
//       else if (current.weather_code <= 49) effect = "fog";
//       else if (current.weather_code <= 59) effect = "rain";
//       else if (current.weather_code <= 69) effect = "rain";
//       else if (current.weather_code <= 79) effect = "snow";
//       else if (current.weather_code <= 99) effect = "thunderstorm";

//       setWeatherData({
//         temperature: current.temperature_2m,
//         condition,
//         humidity: current.relative_humidity_2m,
//         windSpeed: Math.round(current.wind_speed_10m),
//         visibility: Math.round(current.visibility / 1000),
//         feelsLike: current.apparent_temperature,
//       });
//       setCity(name);
//       setWeatherEffect(effect);

//       // Success Alert
//       Swal.fire({
//         icon: "success",
//         title: "Weather Loaded!",
//         text: `Current conditions for ${name}`,
//         timer: 2000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//         toast: true,
//         position: "top-end",
//         background: "#10b981",
//         color: "#fff",
//         customClass: {
//           popup: "shadow-2xl",
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching weather:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load Weather",
//         text: "Please check your connection and try again.",
//         confirmButtonColor: "#ef4444",
//         background: "#1f2937",
//         color: "#fff",
//       });
//     }
//   };

//   const getBackgroundGradient = () => {
//     if (!weatherData) return "from-slate-900 via-blue-900 to-indigo-950";

//     const gradients: Record<string, string> = {
//       sun: "from-yellow-400 via-orange-300 to-amber-500",
//       cloud: "from-gray-400 via-gray-500 to-gray-600",
//       fog: "from-gray-300 via-gray-400 to-gray-500",
//       rain: "from-blue-600 via-blue-700 to-indigo-800",
//       snow: "from-gray-100 via-gray-200 to-gray-300",
//       thunderstorm: "from-slate-800 via-slate-900 to-black",
//     };
//     return (
//       gradients[weatherEffect] || "from-blue-600 via-blue-700 to-indigo-800"
//     );
//   };

//   const renderWeatherEffect = () => {
//     const effects: Record<string, JSX.Element> = {
//       rain: <RainEffect />,
//       snow: <SnowEffect />,
//       cloud: <CloudEffect />,
//       sun: <SunEffect />,
//       thunderstorm: <ThunderstormEffect />,
//       fog: <FogEffect />,
//     };
//     return effects[weatherEffect] || <ThunderstormEffect />;
//   };

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { y: 30, opacity: 0, scale: 0.95 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}
//     >
//       {/* Weather Effect Overlay */}
//       <div className="absolute inset-0 z-0">{renderWeatherEffect()}</div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex flex-col">
//         {/* Header */}
//         <motion.header
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}
//           className="text-center pt-10 pb-6 px-4"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
//             Weather<span className="text-yellow-300">.</span>
//           </h1>
//           <p className="mt-2 text-lg text-white/80 font-medium">
//             Real-time. Beautiful. Accurate.
//           </p>
//         </motion.header>

//         {/* Main Content */}
//         <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Search Bar */}
//             <motion.div
//               variants={itemVariants}
//               className="flex justify-center mb-10 px-4"
//             >
//               <div className="flex justify-center w-full max-w-xl">
//                 <SearchBar onSearch={fetchWeather} />
//               </div>
//             </motion.div>

//             {/* Current Weather */}
//             {weatherData && (
//               <motion.div variants={itemVariants} className="mb-12">
//                 <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
//                   <WeatherCard data={weatherData} city={city} />
//                 </div>
//               </motion.div>
//             )}

//             {/* Forecast Sections */}
//             {(hourlyForecast.length > 0 || dailyForecast.length > 0) && (
//               <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-4">
//                 {/* Hourly */}
//                 {hourlyForecast.length > 0 && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl border border-white/20 p-5"
//                   >
//                     <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
//                       <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
//                       Hourly Forecast (24h)
//                     </h3>
//                     <HourlyForecastChart data={hourlyForecast} />
//                   </motion.div>
//                 )}

//                 {/* 7-Day */}
//                 {dailyForecast.length > 0 && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl border border-white/20 p-5"
//                   >
//                     <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
//                       <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
//                       7-Day Forecast
//                     </h3>
//                     <DailyForecastChart data={dailyForecast} />
//                   </motion.div>
//                 )}
//               </div>
//             )}

//             {/* Empty State */}
//             {!weatherData && (
//               <motion.div variants={itemVariants} className="text-center py-20">
//                 <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-6">
//                   <svg
//                     className="w-12 h-12 text-white/60"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-xl text-white/70 font-medium">
//                   Search for a city to view weather
//                 </p>
//                 <p className="text-sm text-white/50 mt-2">
//                   Powered by Open-Meteo API
//                 </p>
//               </motion.div>
//             )}
//           </motion.div>
//         </main>

//         {/* Footer */}
//         <footer className="py-6 text-center text-white/50 text-sm">
//           <p>Weather App © {new Date().getFullYear()} • Open-Meteo API</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Index;

import { useState } from "react";
import { RainEffect } from "@/components/RainEffect";
import { SnowEffect } from "@/components/SnowEffect";
import { CloudEffect } from "@/components/CloudEffect";
import { SunEffect } from "@/components/SunEffect";
import { ThunderstormEffect } from "@/components/ThunderstormEffect";
import { FogEffect } from "@/components/FogEffect";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBar } from "@/components/SearchBar";
import { HourlyForecastChart } from "@/components/HourlyForecastChart";
import { DailyForecastChart } from "@/components/DailyForecastChart";
import { motion, Variants } from "framer-motion";
import Swal from "sweetalert2";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [weatherEffect, setWeatherEffect] = useState<string>("thunderstorm");
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  /* -------------------------------------------------
     Helper – decide text colour based on effect
  ------------------------------------------------- */
  const getTextColor = () => {
    return weatherEffect === "fog" || weatherEffect === "snow"
      ? "text-black"
      : "";
  };

  const fetchWeather = async (cityName: string) => {
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        Swal.fire({
          icon: "error",
          title: "City Not Found",
          text: "Please try another city name.",
          confirmButtonColor: "#3b82f6",
          background: "#1f2937",
          color: "#fff",
        });
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility&hourly=temperature_2m,precipitation_probability,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code`
      );

      const weatherDataResponse = await weatherResponse.json();
      const current = weatherDataResponse.current;

      // Hourly (24h)
      setHourlyForecast(
        weatherDataResponse.hourly.time
          .slice(0, 24)
          .map((t: string, i: number) => ({
            time: t.split("T")[1].slice(0, 5),
            temp: weatherDataResponse.hourly.temperature_2m[i],
            rainChance: weatherDataResponse.hourly.precipitation_probability[i],
            humidity: weatherDataResponse.hourly.relative_humidity_2m[i],
          }))
      );

      // 7-day
      const dailyData = weatherDataResponse.daily.time.map(
        (t: string, i: number) => ({
          date: t,
          day: new Date(t).toLocaleDateString("en", { weekday: "short" }),
          min: weatherDataResponse.daily.temperature_2m_min[i],
          max: weatherDataResponse.daily.temperature_2m_max[i],
          rain: weatherDataResponse.daily.precipitation_sum[i],
          code: weatherDataResponse.daily.weather_code[i],
        })
      );
      setDailyForecast(dailyData.slice(0, 7));

      const getWeatherCondition = (code: number) => {
        if (code === 0) return "Clear Sky";
        if (code <= 3) return "Partly Cloudy";
        if (code <= 49) return "Foggy";
        if (code <= 59) return "Drizzle";
        if (code <= 69) return "Rainy";
        if (code <= 79) return "Snowy";
        if (code <= 99) return "Thunderstorm";
        return "Unknown";
      };

      const condition = getWeatherCondition(current.weather_code);

      let effect = "rain";
      if (current.weather_code === 0) effect = "sun";
      else if (current.weather_code <= 3) effect = "cloud";
      else if (current.weather_code <= 49) effect = "fog";
      else if (current.weather_code <= 59) effect = "rain";
      else if (current.weather_code <= 69) effect = "rain";
      else if (current.weather_code <= 79) effect = "snow";
      else if (current.weather_code <= 99) effect = "thunderstorm";

      setWeatherData({
        temperature: current.temperature_2m,
        condition,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        visibility: Math.round(current.visibility / 1000),
        feelsLike: current.apparent_temperature,
      });
      setCity(name);
      setWeatherEffect(effect);

      Swal.fire({
        icon: "success",
        title: "Weather Loaded!",
        text: `Current conditions for ${name}`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        background: "#10b981",
        color: "#fff",
        customClass: { popup: "shadow-2xl" },
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Weather",
        text: "Please check your connection and try again.",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  const getBackgroundGradient = () => {
    if (!weatherData) return "from-slate-900 via-blue-900 to-indigo-950";

    const gradients: Record<string, string> = {
      sun: "from-yellow-400 via-orange-300 to-amber-500",
      cloud: "from-gray-400 via-gray-500 to-gray-600",
      fog: "from-gray-300 via-gray-400 to-gray-500",
      rain: "from-blue-600 via-blue-700 to-indigo-800",
      snow: "from-gray-100 via-gray-200 to-gray-300",
      thunderstorm: "from-slate-800 via-slate-900 to-black",
    };
    return (
      gradients[weatherEffect] || "from-blue-600 via-blue-700 to-indigo-800"
    );
  };

  const renderWeatherEffect = () => {
    const effects: Record<string, JSX.Element> = {
      rain: <RainEffect />,
      snow: <SnowEffect />,
      cloud: <CloudEffect />,
      sun: <SunEffect />,
      thunderstorm: <ThunderstormEffect />,
      fog: <FogEffect />,
    };
    return effects[weatherEffect] || <ThunderstormEffect />;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /* -------------------------------------------------
     JSX – apply dynamic text colour everywhere
  ------------------------------------------------- */
  const textCls = getTextColor();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}
    >
      {/* Weather Effect */}
      <div className="absolute inset-0 z-0">{renderWeatherEffect()}</div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center pt-10 pb-6 px-4"
        >
          <h1
            className={`text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl ${textCls} ${
              !textCls ? "text-white" : ""
            }`}
          >
            Weather<span className={`text-yellow-300 ${textCls}`}>.</span>
          </h1>
          <p
            className={`mt-2 text-lg font-medium ${textCls} ${
              !textCls ? "text-white/80" : "text-black/80"
            }`}
          >
            Real-time. Beautiful. Accurate.
          </p>
        </motion.header>

        {/* Main */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-10 px-4"
            >
              <div className="flex justify-center w-full max-w-xl">
                <SearchBar
                  onSearch={fetchWeather}
                  weatherEffect={weatherEffect}
                />
              </div>
            </motion.div>

            {/* Current Weather */}
            {weatherData && (
              <motion.div variants={itemVariants} className="mb-12">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                  <WeatherCard
                    data={weatherData}
                    city={city}
                    weatherEffect={weatherEffect}
                  />
                </div>
              </motion.div>
            )}

            {/* Forecasts */}
            {(hourlyForecast.length > 0 || dailyForecast.length > 0) && (
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-4">
                {/* Hourly */}
                {hourlyForecast.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl border border-white/20 p-5"
                  >
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textCls} ${
                        !textCls ? "text-white" : ""
                      }`}
                    >
                      <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                      Hourly Forecast (24h)
                    </h3>
                    <HourlyForecastChart
                      data={hourlyForecast}
                      weatherEffect={weatherEffect}
                    />
                  </motion.div>
                )}

                {/* 7-Day */}
                {dailyForecast.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl border border-white/20 p-5"
                  >
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textCls} ${
                        !textCls ? "text-white" : ""
                      }`}
                    >
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      7-Day Forecast
                    </h3>
                    <DailyForecastChart
                      data={dailyForecast}
                      weatherEffect={weatherEffect}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!weatherData && (
              <motion.div variants={itemVariants} className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <svg
                    className={`w-12 h-12 ${
                      textCls ? "text-black/60" : "text-white/60"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p
                  className={`text-xl font-medium ${textCls} ${
                    !textCls ? "text-white/70" : "text-black/70"
                  }`}
                >
                  Search for a city to view weather
                </p>
                <p
                  className={`text-sm mt-2 ${textCls} ${
                    !textCls ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Powered by Open-Meteo API
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <footer
          className={`py-6 text-center text-sm ${textCls} ${
            !textCls ? "text-white/50" : "text-black/50"
          }`}
        >
          <p>Weather App © {new Date().getFullYear()} • Open-Meteo API</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

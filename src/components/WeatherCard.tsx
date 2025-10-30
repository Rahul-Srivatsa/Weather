// import { Cloud, Droplets, Wind, Eye } from "lucide-react";
// import { Card } from "./ui/card";

// interface WeatherData {
//   temperature: number;
//   condition: string;
//   humidity: number;
//   windSpeed: number;
//   visibility: number;
//   feelsLike: number;
// }

// interface WeatherCardProps {
//   data: WeatherData;
//   city: string;
// }

// export const WeatherCard = ({ data, city }: WeatherCardProps) => {
//   return (
//     <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-8 animate-fade-in">
//       <div className="space-y-6">
//         <div className="text-center">
//           <h2 className="text-6xl font-bold text-white mb-2">
//             {Math.round(data.temperature)}°
//           </h2>
//           <p className="text-xl text-white/90 mb-1">{city}</p>
//           <p className="text-lg text-white/70">{data.condition}</p>
//           <p className="text-sm text-white/60 mt-2">
//             Feels like {Math.round(data.feelsLike)}°
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
//             <Droplets className="w-5 h-5 text-white/80" />
//             <div>
//               <p className="text-xs text-white/60">Humidity</p>
//               <p className="text-lg font-semibold text-white">
//                 {data.humidity}%
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
//             <Wind className="w-5 h-5 text-white/80" />
//             <div>
//               <p className="text-xs text-white/60">Wind</p>
//               <p className="text-lg font-semibold text-white">
//                 {data.windSpeed} km/h
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
//             <Eye className="w-5 h-5 text-white/80" />
//             <div>
//               <p className="text-xs text-white/60">Visibility</p>
//               <p className="text-lg font-semibold text-white">
//                 {data.visibility} km
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
//             <Cloud className="w-5 h-5 text-white/80" />
//             <div>
//               <p className="text-xs text-white/60">Condition</p>
//               <p className="text-sm font-semibold text-white truncate">
//                 {data.condition}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

import { Cloud, Droplets, Wind, Eye } from "lucide-react";
import { Card } from "./ui/card";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
}

interface WeatherCardProps {
  data: WeatherData;
  city: string;
  weatherEffect: string; // ← NEW PROP
}

export const WeatherCard = ({
  data,
  city,
  weatherEffect,
}: WeatherCardProps) => {
  const isBlackMode = weatherEffect === "fog" || weatherEffect === "snow";

  // Dynamic classes
  const textColor = isBlackMode ? "text-black" : "text-white";
  const mutedText = isBlackMode ? "text-black/60" : "text-white/60";
  const iconColor = isBlackMode ? "text-black/80" : "text-white/80";
  const cardBg = isBlackMode ? "bg-white/20" : "bg-white/10";
  const cardBorder = isBlackMode ? "border-black/30" : "border-white/20";
  const dividerBorder = isBlackMode ? "border-black/20" : "border-white/20";
  const statBg = isBlackMode ? "bg-white/10" : "bg-white/5";

  return (
    <Card
      className={`backdrop-blur-xl ${cardBg} ${cardBorder} border p-8 animate-fade-in transition-all`}
    >
      <div className="space-y-6">
        {/* Main Weather */}
        <div className="text-center">
          <h2 className={`text-6xl font-bold ${textColor} mb-2`}>
            {Math.round(data.temperature)}°
          </h2>
          <p className={`text-xl ${textColor}/90 mb-1`}>{city}</p>
          <p className={`text-lg ${textColor}/70`}>{data.condition}</p>
          <p className={`text-sm ${mutedText} mt-2`}>
            Feels like {Math.round(data.feelsLike)}°
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 gap-4 pt-4 ${dividerBorder} border-t`}
        >
          {/* Humidity */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${statBg} backdrop-blur-sm`}
          >
            <Droplets className={`w-5 h-5 ${iconColor}`} />
            <div>
              <p className={`text-xs ${mutedText}`}>Humidity</p>
              <p className={`text-lg font-semibold ${textColor}`}>
                {data.humidity}%
              </p>
            </div>
          </div>

          {/* Wind */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${statBg} backdrop-blur-sm`}
          >
            <Wind className={`w-5 h-5 ${iconColor}`} />
            <div>
              <p className={`text-xs ${mutedText}`}>Wind</p>
              <p className={`text-lg font-semibold ${textColor}`}>
                {data.windSpeed} km/h
              </p>
            </div>
          </div>

          {/* Visibility */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${statBg} backdrop-blur-sm`}
          >
            <Eye className={`w-5 h-5 ${iconColor}`} />
            <div>
              <p className={`text-xs ${mutedText}`}>Visibility</p>
              <p className={`text-lg font-semibold ${textColor}`}>
                {data.visibility} km
              </p>
            </div>
          </div>

          {/* Condition */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${statBg} backdrop-blur-sm`}
          >
            <Cloud className={`w-5 h-5 ${iconColor}`} />
            <div>
              <p className={`text-xs ${mutedText}`}>Condition</p>
              <p className={`text-sm font-semibold ${textColor} truncate`}>
                {data.condition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

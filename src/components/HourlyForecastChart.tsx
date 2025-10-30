// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Card } from "./ui/card";
// import { CustomTooltip } from "./CustomToolTip";

// export const HourlyForecastChart = ({ data }) => {
//   if (!data?.length) return null;

//   return (
//     <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-8 animate-fade-in">
//       <h2 className="text-2xl font-bold text-white mb-2 text-center">
//         Next 24 Hours
//       </h2>

//       <ResponsiveContainer width="100%" height={250}>
//         <AreaChart data={data}>
//           {/* Soft glowing gradient for temperature line */}
//           <defs>
//             <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
//               <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>

//           {/* Subtle white grid lines */}
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />

//           {/* White X & Y axes */}
//           <XAxis
//             dataKey="time"
//             tick={{ fill: "#ffffff", fontSize: 11 }}
//             axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
//             tickLine={{ stroke: "rgba(255,255,255,0.4)" }}
//           />
//           <YAxis
//             tick={{ fill: "#ffffff", fontSize: 12 }}
//             axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
//             tickLine={{ stroke: "rgba(255,255,255,0.4)" }}
//           />

//           {/* Glass-style tooltip */}
//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{ stroke: "#ffffff30" }}
//           />

//           {/* Blue area with glow gradient */}
//           <Area
//             type="monotone"
//             dataKey="temp"
//             stroke="#3b82f6"
//             fill="url(#tempGradient)"
//             strokeWidth={2}
//             name="Temperature °C"
//             activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/card";
import { CustomTooltip } from "./CustomToolTip";

interface HourlyForecastChartProps {
  data;
  weatherEffect: string; // ← NEW PROP
}

export const HourlyForecastChart = ({
  data,
  weatherEffect,
}: HourlyForecastChartProps) => {
  if (!data?.length) return null;

  const isBlackMode = weatherEffect === "fog" || weatherEffect === "snow";

  // Dynamic colors
  const textColor = isBlackMode ? "#000000" : "#ffffff";
  const axisLineColor = isBlackMode
    ? "rgba(0,0,0,0.4)"
    : "rgba(255,255,255,0.4)";
  const gridColor = isBlackMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)";
  const cursorColor = isBlackMode ? "#00000030" : "#ffffff30";
  const strokeColor = isBlackMode ? "#1f2937" : "#3b82f6"; // dark gray vs blue
  const gradientId = `tempGradient-${isBlackMode ? "dark" : "light"}`;
  const activeDotStroke = isBlackMode ? "#000" : "#fff";

  // Card styles
  const cardBg = isBlackMode ? "bg-white/20" : "bg-white/10";
  const cardBorder = isBlackMode ? "border-black/30" : "border-white/20";

  return (
    <Card
      className={`backdrop-blur-xl ${cardBg} ${cardBorder} border p-8 animate-fade-in transition-all`}
    >
      <h2
        className={`text-2xl font-bold mb-2 text-center ${
          isBlackMode ? "text-black" : "text-white"
        }`}
      >
        Next 24 Hours
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={strokeColor}
                stopOpacity={isBlackMode ? 0.6 : 0.7}
              />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

          {/* X Axis */}
          <XAxis
            dataKey="time"
            tick={{ fill: textColor, fontSize: 11 }}
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
          />

          {/* Tooltip */}
          <Tooltip
            content={<CustomTooltip weatherEffect={weatherEffect} />}
            cursor={{ stroke: cursorColor }}
          />

          {/* Area */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke={strokeColor}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            name="Temperature °C"
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: activeDotStroke,
              fill: strokeColor,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

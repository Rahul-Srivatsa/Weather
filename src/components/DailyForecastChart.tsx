// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Card } from "./ui/card";
// import { CustomTooltip } from "./CustomToolTip";

// export const DailyForecastChart = ({ data }) => {
//   if (!data?.length) return null;

//   return (
//     <Card className="backdrop-blur-xl bg-white/10 border-white/20 p-8 animate-fade-in">
//       <h2 className="text-2xl font-bold text-white mb-2 text-center">
//         7-Day Forecast
//       </h2>

//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart data={data}>
//           {/* Grid lines – softer contrast */}
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />

//           {/* White axis labels */}
//           <XAxis
//             dataKey="date"
//             tick={{ fill: "#ffffff", fontSize: 12 }}
//             axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
//             tickLine={{ stroke: "rgba(255,255,255,0.4)" }}
//           />
//           <YAxis
//             tick={{ fill: "#ffffff", fontSize: 12 }}
//             axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
//             tickLine={{ stroke: "rgba(255,255,255,0.4)" }}
//           />

//           {/* Custom frosted tooltip */}
//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{ stroke: "#ffffff30" }}
//           />

//           {/* Lines with glow effect */}
//           <Line
//             type="monotone"
//             dataKey="max"
//             stroke="#fbbf24"
//             strokeWidth={2}
//             dot={{ r: 3 }}
//             activeDot={{ r: 6 }}
//             name="Max °C"
//           />
//           <Line
//             type="monotone"
//             dataKey="min"
//             stroke="#3b82f6"
//             strokeWidth={2}
//             dot={{ r: 3 }}
//             activeDot={{ r: 6 }}
//             name="Min °C"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/card";
import { CustomTooltip } from "./CustomToolTip";

interface DailyForecastChartProps {
  data: Array<{
    date: string;
    max: number;
    min: number;
    day?: string;
  }>;
  weatherEffect: string;
}

export const DailyForecastChart = ({
  data,
  weatherEffect,
}: DailyForecastChartProps) => {
  if (!data?.length) return null;

  const isBlackMode = weatherEffect === "fog" || weatherEffect === "snow";

  // Dynamic colors
  const textColor = isBlackMode ? "#000000" : "#ffffff";
  const axisLineColor = isBlackMode
    ? "rgba(0, 0, 0, 0.4)"
    : "rgba(255, 255, 255, 0.4)";
  const gridColor = isBlackMode
    ? "rgba(0, 0, 0, 0.2)"
    : "rgba(255, 255, 255, 0.2)";
  const cursorColor = isBlackMode ? "#00000030" : "#ffffff30";

  // Line colors
  const maxLineColor = isBlackMode ? "#1f2937" : "#ff6803ff"; // dark gray / yellow
  const minLineColor = isBlackMode ? "#374151" : "#3b82f6"; // darker gray / blue

  // Card styles
  const cardBg = isBlackMode ? "bg-white/20" : "bg-white/10";
  const cardBorder = isBlackMode ? "border-black/30" : "border-white/20";

  return (
    <Card
      className={`backdrop-blur-xl ${cardBg} ${cardBorder} border p-8 animate-fade-in transition-all duration-300`}
    >
      <h2
        className={`text-2xl font-bold mb-2 text-center ${
          isBlackMode ? "text-black" : "text-white"
        }`}
      >
        7-Day Forecast
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
          />

          {/* Tooltip – shows both max & min */}
          <Tooltip
            content={<CustomTooltip weatherEffect={weatherEffect} />}
            cursor={{ stroke: cursorColor, strokeWidth: 1 }}
            allowEscapeViewBox={{ x: true, y: true }}
          />

          {/* Max Line */}
          <Line
            type="monotone"
            dataKey="max"
            stroke={maxLineColor}
            strokeWidth={2}
            dot={{ r: 3, fill: maxLineColor }}
            activeDot={{
              r: 6,
              stroke: isBlackMode ? "#000" : maxLineColor,
              strokeWidth: 2,
              fill: maxLineColor,
            }}
            name="Max °C"
            isAnimationActive={false}
          />

          {/* Min Line */}
          <Line
            type="monotone"
            dataKey="min"
            stroke={minLineColor}
            strokeWidth={2}
            dot={{ r: 3, fill: minLineColor }}
            activeDot={{
              r: 6,
              stroke: isBlackMode ? "#000" : minLineColor,
              strokeWidth: 2,
              fill: minLineColor,
            }}
            name="Min °C"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

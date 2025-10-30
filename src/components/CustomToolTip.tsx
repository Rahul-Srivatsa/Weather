// import { TooltipProps } from "recharts";

// export const CustomTooltip = ({
//   active,
//   payload,
//   label,
// }: TooltipProps<number, string>) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-xl p-3 shadow-lg">
//         <p className="text-sm font-semibold">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-xs">
//             {entry.name}:{" "}
//             <span className="font-medium">
//               {Number(entry.value).toFixed(1)}°C
//             </span>
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };
// src/components/CustomTooltip.tsx
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    dataKey: string;
    color?: string;
  }>;
  label?: string;
  weatherEffect: string;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  weatherEffect,
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const isBlackMode = weatherEffect === "fog" || weatherEffect === "snow";
  const textColor = isBlackMode ? "text-black" : "text-white";
  const bgColor = isBlackMode ? "bg-white/30" : "bg-white/20";
  const borderColor = isBlackMode ? "border-black/30" : "border-white/30";

  // Determine chart type from first payload's dataKey
  const firstKey = payload[0].dataKey;

  return (
    <div
      className={`
        p-3 rounded-lg backdrop-blur-xl border ${bgColor} ${borderColor}
        shadow-lg min-w-[110px] text-xs font-medium
      `}
    >
      {/* Always show the label (time for hourly, date for daily) */}
      <p className={`font-semibold ${textColor} mb-1`}>{label}</p>

      {/* Hourly chart: only "temp" */}
      {firstKey === "temp" && (
        <p className={textColor}>
          Temp: <span className="font-bold">{payload[0].value}°C</span>
        </p>
      )}

      {/* Daily chart: show "max" and "min" */}
      {(firstKey === "max" || firstKey === "min") && (
        <>
          {payload.find((p) => p.dataKey === "max") && (
            <p className={textColor}>
              Max:{" "}
              <span className="font-bold">
                {payload.find((p) => p.dataKey === "max")!.value}°C
              </span>
            </p>
          )}
          {payload.find((p) => p.dataKey === "min") && (
            <p className={textColor}>
              Min:{" "}
              <span className="font-bold">
                {payload.find((p) => p.dataKey === "min")!.value}°C
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
};

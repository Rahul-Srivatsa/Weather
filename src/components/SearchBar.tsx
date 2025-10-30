// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useState, useEffect, useRef } from "react";
// import { Loader2 } from "lucide-react";

// interface SearchBarProps {
//   onSearch: (city: string) => void;
// }

// interface CitySuggestion {
//   id: number;
//   name: string;
//   admin1?: string;
//   country: string;
//   latitude: number;
//   longitude: number;
// }

// export const SearchBar = ({ onSearch }: SearchBarProps) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Debounce fetch
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (query.trim().length > 2) {
//         fetchSuggestions(query.trim());
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   const fetchSuggestions = async (search: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
//           search
//         )}&count=5&language=en&format=json`
//       );
//       const data = await response.json();
//       setSuggestions(data.results || []);
//       setShowSuggestions(true);
//       setSelectedIndex(-1);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setSuggestions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSelect = (city: CitySuggestion) => {
//     const fullName = city.admin1
//       ? `${city.name}, ${city.admin1}, ${city.country}`
//       : `${city.name}, ${city.country}`;
//     setQuery(fullName);
//     setShowSuggestions(false);
//     onSearch(city.name); // Use just city name for weather API
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       setShowSuggestions(false);
//       onSearch(query.split(",")[0].trim());
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!showSuggestions || suggestions.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev + 1) % suggestions.length);
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setSelectedIndex(
//         (prev) => (prev - 1 + suggestions.length) % suggestions.length
//       );
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       e.preventDefault();
//       handleSelect(suggestions[selectedIndex]);
//     } else if (e.key === "Escape") {
//       setShowSuggestions(false);
//       setSelectedIndex(-1);
//     }
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node) &&
//         inputRef.current &&
//         !inputRef.current.contains(e.target as Node)
//       ) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in">
//       <div className="relative flex-1">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Input
//               ref={inputRef}
//               type="text"
//               placeholder="Search for a city..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
//               className="w-full pl-10 pr-10 backdrop-blur-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
//             />
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
//             {isLoading && (
//               <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 animate-spin" />
//             )}
//           </div>
//           <Button
//             type="submit"
//             className="backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6"
//           >
//             Search
//           </Button>
//         </div>

//         {/* Suggestions Dropdown */}
//         {showSuggestions && suggestions.length > 0 && (
//           <div
//             ref={dropdownRef}
//             className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
//           >
//             {suggestions.map((city, index) => {
//               const label = city.admin1
//                 ? `${city.name}, ${city.admin1}, ${city.country}`
//                 : `${city.name}, ${city.country}`;

//               return (
//                 <button
//                   key={city.id}
//                   onClick={() => handleSelect(city)}
//                   className={`w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-all ${
//                     index === selectedIndex ? "bg-white/20" : ""
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">{city.name}</span>
//                     <span className="text-sm text-white/70">
//                       {city.admin1 && `${city.admin1}, `}
//                       {city.country}
//                     </span>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  weatherEffect: string; // Required: "fog", "snow", etc.
}

interface CitySuggestion {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const SearchBar = ({ onSearch, weatherEffect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic theme based on weather
  const isBlackMode = weatherEffect === "fog" || weatherEffect === "snow";

  // Text & Icon Colors
  const textColor = isBlackMode ? "text-black" : "text-white";
  const placeholderColor = isBlackMode
    ? "placeholder:text-black/50"
    : "placeholder:text-white/50";
  const iconColor = isBlackMode ? "text-black/70" : "text-white/50";

  // Input Styles
  const inputBg = isBlackMode ? "bg-white/20" : "bg-white/10";
  const inputBorder = isBlackMode ? "border-black/30" : "border-white/20";
  const inputFocusBorder = isBlackMode
    ? "focus:border-black/50"
    : "focus:border-white/40";

  // Button Styles
  const buttonBg = isBlackMode ? "bg-white/30" : "bg-white/20";
  const buttonHoverBg = isBlackMode ? "hover:bg-white/40" : "hover:bg-white/30";
  const buttonBorder = isBlackMode ? "border-black/40" : "border-white/30"; // ← FIXED

  // Dropdown Styles
  const dropdownBg = isBlackMode ? "bg-white/20" : "bg-white/10";
  const dropdownBorder = isBlackMode ? "border-black/30" : "border-white/20";
  const itemHoverBg = isBlackMode ? "hover:bg-black/10" : "hover:bg-white/10";
  const itemSelectedBg = isBlackMode ? "bg-black/20" : "bg-white/20";

  // Debounce fetch
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchSuggestions(query.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchSuggestions = async (search: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          search
        )}&count=5&language=en&format=json`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (city: CitySuggestion) => {
    const fullName = city.admin1
      ? `${city.name}, ${city.admin1}, ${city.country}`
      : `${city.name}, ${city.country}`;
    setQuery(fullName);
    setShowSuggestions(false);
    onSearch(city.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query.split(",")[0].trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in">
      <div className="relative flex-1">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className={`
                w-full pl-10 pr-10 backdrop-blur-xl 
                ${inputBg} ${inputBorder} ${textColor} ${placeholderColor}
                ${inputFocusBorder} focus:ring-0 transition-all
              `}
            />
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor}`}
            />
            {isLoading && (
              <Loader2
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor} animate-spin`}
              />
            )}
          </div>

          <Button
            type="submit"
            className={`
              backdrop-blur-xl ${buttonBg} ${buttonHoverBg} 
              ${buttonBorder} border ${textColor} px-6 transition-all
            `}
          >
            Search
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className={`
              absolute top-full left-0 right-0 mt-2 
              ${dropdownBg} backdrop-blur-xl ${dropdownBorder} 
              rounded-xl shadow-2xl overflow-hidden z-50
            `}
          >
            {suggestions.map((city, index) => (
              <button
                key={city.id}
                onClick={() => handleSelect(city)}
                className={`
                  w-full text-left px-4 py-3 ${textColor} ${itemHoverBg} 
                  transition-all ${
                    index === selectedIndex ? itemSelectedBg : ""
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{city.name}</span>
                  <span
                    className={`text-sm ${
                      isBlackMode ? "text-black/70" : "text-white/70"
                    }`}
                  >
                    {city.admin1 && `${city.admin1}, `}
                    {city.country}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

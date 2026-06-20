import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useLocation,
} from "../context/LocationContext";

const LocationSearch = () => {

  const [query, setQuery] =
    useState("");

  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [
    showDropdown,
    setShowDropdown,
  ] = useState(false);

  const debounceRef =
    useRef(null);

  const wrapperRef =
    useRef(null);

  const {
    locationName,
    searchLocation,
    refreshLocation,
  } = useLocation();

  /*
  ==========================================
  Autocomplete
  ==========================================
  */

  const fetchSuggestions =
    async (value) => {

      if (!value.trim()) {

        setSuggestions([
          {
            display_name:
              "📍 Use Current Location",
            currentLocation: true,
          },
        ]);

        return;
      }

      try {

        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              value
            )}&countrycodes=in&format=json&limit=5`
          );

        const data =
          await response.json();

        setSuggestions([
          {
            display_name:
              "📍 Use Current Location",
            currentLocation: true,
          },
          ...data,
        ]);

      } catch (error) {

        console.error(error);

      }
    };

  /*
  ==========================================
  Search
  ==========================================
  */

  const handleSearch =
    async () => {

      if (!query.trim())
        return;

      await searchLocation(
        query
      );

      setQuery("");

      setShowDropdown(false);
    };

  /*
  ==========================================
  Close Dropdown Outside Click
  ==========================================
  */

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(
            event.target
          )
        ) {

          setShowDropdown(false);

        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      clearTimeout(
        debounceRef.current
      );
    };

  }, []);

  return (

    <div
      ref={wrapperRef}
      className="relative"
    >

      <input
        type="text"
        placeholder={
          locationName ||
          "Search city..."
        }
        value={query}
        onFocus={() => {

          setShowDropdown(true);

          if (!query.trim()) {

            setSuggestions([
              {
                display_name:
                  "📍 Use Current Location",
                currentLocation: true,
              },
            ]);
          }
        }}
        onChange={(e) => {

          const value =
            e.target.value;

          setQuery(value);

          clearTimeout(
            debounceRef.current
          );

          debounceRef.current =
            setTimeout(() => {

              fetchSuggestions(
                value
              );

            }, 300);
        }}
        onKeyDown={async (e) => {

          if (
            e.key === "Enter"
          ) {

            await handleSearch();
          }
        }}
        className="
          border
          border-black
          px-2
          py-1
          w-72
        "
      />

      {
        showDropdown &&
        suggestions.length > 0 && (

          <div
            className="
              absolute
              left-0
              top-full
              mt-1
              bg-white
              border
              border-gray-300
              shadow-lg
              w-72
              z-50
              max-h-64
              overflow-y-auto
            "
          >

            {
              suggestions.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      p-2
                      hover:bg-gray-100
                      cursor-pointer
                      text-sm
                    "
                    onClick={
                      async () => {

                        if (
                          item.currentLocation
                        ) {

                          await refreshLocation();

                        } else {

                          await searchLocation(
                            item.display_name
                          );
                        }

                        setQuery("");

                        setShowDropdown(
                          false
                        );
                      }
                    }
                  >

                    {
                      item.display_name
                    }

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
};

export default LocationSearch;
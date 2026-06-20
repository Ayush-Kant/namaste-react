import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useLocation }
  from "../context/LocationContext";

const API_BASE_URL =
  "http://localhost:5000";

const INITIAL_VISIBLE_COUNT = 16;

const useRestaurantData = () => {
  const { lat, lng } =
    useLocation();

  const [
    allRestaurants,
    setAllRestaurants,
  ] = useState([]);

  const [
    filteredRestaurants,
    setFilteredRestaurants,
  ] = useState([]);

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(
    INITIAL_VISIBLE_COUNT
  );

  const [loading, setLoading] =
    useState(true);

  const [
    backendLoading,
    setBackendLoading,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    topRatedOnly,
    setTopRatedOnly,
  ] = useState(false);

  const pollingRef =
    useRef(null);

  const previousCountRef =
    useRef(0);

  /*
  ==========================================
  Recalculate Filters Whenever:
  - Restaurants change
  - Search changes
  - Top Rated changes
  ==========================================
  */

  useEffect(() => {
    let filtered =
      [...allRestaurants];

    if (topRatedOnly) {
      filtered =
        filtered.filter(
          (restaurant) =>
            Number(
              restaurant?.info
                ?.avgRating
            ) > 4
        );
    }

    if (searchText.trim()) {
      filtered =
        filtered.filter(
          (restaurant) =>
            restaurant?.info?.name
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              )
        );
    }

    setFilteredRestaurants(
      filtered
    );
  }, [
    allRestaurants,
    searchText,
    topRatedOnly,
  ]);

  /*
  ==========================================
  Location Changed
  ==========================================
  */

  useEffect(() => {
    if (!lat || !lng) return;

    previousCountRef.current = 0;

    setSearchText("");
    setTopRatedOnly(false);

    fetchRestaurants();

    return () => {
      if (pollingRef.current) {
        clearInterval(
          pollingRef.current
        );

        pollingRef.current =
          null;
      }
    };
  }, [lat, lng]);

  /*
  ==========================================
  Poll Backend Cache
  ==========================================
  */

  const startPolling =
    () => {
      if (
        pollingRef.current
      ) {
        return;
      }

      console.log(
        "Started polling..."
      );

      pollingRef.current =
        setInterval(
          async () => {
            try {
              const response =
                await fetch(
                  `${API_BASE_URL}/api/restaurants/status?lat=${lat}&lng=${lng}`
                );

              const status =
                await response.json();

              console.log(
                "Status:",
                status
              );

              if (
                status.count >
                previousCountRef.current
              ) {
                console.log(
                  `Restaurant count increased: ${previousCountRef.current} -> ${status.count}`
                );

                previousCountRef.current =
                  status.count;

                await fetchRestaurants(
                  false
                );
              }

              if (
                status.loading ===
                false
              ) {
                console.log(
                  "Background fetch completed"
                );

                clearInterval(
                  pollingRef.current
                );

                pollingRef.current =
                  null;

                setBackendLoading(
                  false
                );
              }
            } catch (error) {
              console.error(
                error
              );
            }
          },
          1000
        );
    };

  /*
  ==========================================
  Fetch Restaurants
  ==========================================
  */

  const fetchRestaurants =
    async (
      showLoader = true
    ) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        const response =
          await fetch(
            `${API_BASE_URL}/api/restaurants?lat=${lat}&lng=${lng}`
          );

        const json =
          await response.json();

        const restaurants =
          json.restaurants || [];

        previousCountRef.current =
          json.count || 0;

        setAllRestaurants(
          restaurants
        );

        setBackendLoading(
          json.loading ||
            false
        );

        if (
          json.loading ===
          true
        ) {
          startPolling();
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    };

  /*
  ==========================================
  Manual Refresh
  ==========================================
  */

  const refreshRestaurants =
    async () => {
      await fetchRestaurants();
    };

  /*
  ==========================================
  Search
  ==========================================
  */

  const searchRestaurants =
    (value) => {
      setSearchText(value);

      setVisibleCount(
        INITIAL_VISIBLE_COUNT
      );
    };

  /*
  ==========================================
  Top Rated
  ==========================================
  */

  const filterTopRated =
    () => {
      setTopRatedOnly(true);

      setVisibleCount(
        INITIAL_VISIBLE_COUNT
      );
    };

  /*
  ==========================================
  Reset Filters
  ==========================================
  */

  const resetFilters =
    () => {
      setSearchText("");

      setTopRatedOnly(false);

      setVisibleCount(
        INITIAL_VISIBLE_COUNT
      );
    };

  /*
  ==========================================
  Infinite Scroll
  ==========================================
  */

  const loadMore = () => {
    setVisibleCount(
      (prev) =>
        prev + 16
    );
  };

  const visibleRestaurants =
    filteredRestaurants.slice(
      0,
      visibleCount
    );

  return {
    loading,

    backendLoading,

    lat,
    lng,

    allRestaurants,

    filteredRestaurants,

    visibleRestaurants,

    searchRestaurants,

    filterTopRated,

    resetFilters,

    refreshRestaurants,

    loadMore,

    visibleCount,

    totalRestaurants:
      filteredRestaurants.length,
  };
};

export default useRestaurantData;
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  searchLocationByName,
} from "../utils/geocoding";

import {
  reverseGeocode,
} from "../utils/reverseGeocoding";

const LocationContext =
  createContext(null);

const DEFAULT_LOCATION = {
  lat: 23.3492917,
  lng: 85.334765,
};

export const LocationProvider = ({
  children,
}) => {

  const [
    location,
    setLocation,
  ] = useState(
    DEFAULT_LOCATION
  );

  const [
    locationName,
    setLocationName,
  ] = useState(
    "Loading..."
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    permissionDenied,
    setPermissionDenied,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  /*
  ==========================================
  Reverse Geocode
  ==========================================
  */

  const updateLocationName =
    async (lat, lng) => {

      try {

        const result =
          await reverseGeocode(
            lat,
            lng
          );

        if (!result) return;

        const address =
          result.address || {};

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.county ||
          "";

        const state =
          address.state || "";

        const name =
          [city, state]
            .filter(Boolean)
            .join(", ");

        const finalName =
          name ||
          result.display_name;

        setLocationName(
          finalName
        );

        localStorage.setItem(
          "locationName",
          finalName
        );

      } catch (error) {

        console.error(
          error
        );

      }
    };

  /*
  ==========================================
  Update Location
  ==========================================
  */

  const updateLocation =
    useCallback(
      async (
        lat,
        lng
      ) => {

        const newLocation = {
          lat: Number(lat),
          lng: Number(lng),
        };

        localStorage.setItem(
          "userLocation",
          JSON.stringify(
            newLocation
          )
        );

        setLocation(
          newLocation
        );

        await updateLocationName(
          lat,
          lng
        );
      },
      []
    );

  /*
  ==========================================
  Search By City Name
  ==========================================
  */

  const searchLocation =
    async (query) => {

      try {

        const results =
          await searchLocationByName(
            query
          );

        if (
          !results ||
          results.length === 0
        ) {
          return null;
        }

        const firstResult =
          results[0];

        const lat =
          Number(
            firstResult.lat
          );

        const lng =
          Number(
            firstResult.lon
          );

        await updateLocation(
          lat,
          lng
        );

        return firstResult;

      } catch (error) {

        console.error(
          error
        );

        return null;
      }
    };

  /*
  ==========================================
  Browser Location
  ==========================================
  */

  const getCurrentLocation =
    useCallback(() => {

      console.log(
        "Requesting browser location..."
      );

      if (
        !navigator.geolocation
      ) {

        setError(
          "Geolocation is not supported."
        );

        return;
      }

      setLoading(true);

      navigator.geolocation.getCurrentPosition(

        async (
          position
        ) => {

          const lat =
            position.coords
              .latitude;

          const lng =
            position.coords
              .longitude;

          console.log(
            "Location received:",
            lat,
            lng
          );

          await updateLocation(
            lat,
            lng
          );

          setPermissionDenied(
            false
          );

          setError(null);

          setLoading(
            false
          );
        },

        (err) => {

          console.error(
            "Location error:",
            err
          );

          setPermissionDenied(
            true
          );

          setError(
            err.message
          );

          setLoading(
            false
          );
        },

        {
          enableHighAccuracy:
            true,

          timeout: 15000,

          maximumAge: 0,
        }
      );
    }, [updateLocation]);

  /*
  ==========================================
  Initial Load
  ==========================================
  */

  useEffect(() => {

    try {

      const savedLocation =
        localStorage.getItem(
          "userLocation"
        );

      const savedLocationName =
        localStorage.getItem(
          "locationName"
        );

      if (
        savedLocation
      ) {

        const parsed =
          JSON.parse(
            savedLocation
          );

        setLocation(
          parsed
        );

        if (
          savedLocationName
        ) {

          setLocationName(
            savedLocationName
          );

        } else {

          updateLocationName(
            parsed.lat,
            parsed.lng
          );

        }

        setLoading(
          false
        );

        return;
      }

      getCurrentLocation();

    } catch (error) {

      console.error(
        error
      );

      getCurrentLocation();
    }

  }, [getCurrentLocation]);

  /*
  ==========================================
  Context Value
  ==========================================
  */

  const value = {

    location,

    locationName,

    lat:
      location.lat,

    lng:
      location.lng,

    loading,

    error,

    permissionDenied,

    searchLocation,

    updateLocation,

    refreshLocation:
      getCurrentLocation,
  };

  return (
    <LocationContext.Provider
      value={value}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation =
  () => {

    const context =
      useContext(
        LocationContext
      );

    if (!context) {

      throw new Error(
        "useLocation must be used inside LocationProvider"
      );
    }

    return context;
  };

export default LocationContext;
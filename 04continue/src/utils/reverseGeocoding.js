export const reverseGeocode =
  async (lat, lng) => {
    try {
      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

      const data =
        await response.json();

      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  };
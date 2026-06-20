export const searchLocationByName =
  async (query) => {
    try {
      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=5`
        );

      const data =
        await response.json();

      return data;

    } catch (error) {
      console.error(error);

      return [];
    }
  };
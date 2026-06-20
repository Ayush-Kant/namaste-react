import { useMemo } from "react";
import useRestaurantData from "./useRestaurantData";

const useRestaurantInfo = (resId) => {

  const {
    allRestaurants,
  } = useRestaurantData();

  const restaurant =
    useMemo(() => {

      return allRestaurants.find(
        (restaurant) =>
          String(
            restaurant?.info?.id
          ) === String(resId)
      );

    }, [
      allRestaurants,
      resId,
    ]);

  return restaurant;
};

export default useRestaurantInfo;
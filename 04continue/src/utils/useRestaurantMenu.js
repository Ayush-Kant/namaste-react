import { useEffect, useState } from "react";

const API_BASE_URL =
  "http://localhost:5000";

const useRestaurantMenu = (
  resId
) => {

  const [menu, setMenu] =
    useState(null);

  useEffect(() => {

    if (!resId) return;

    fetchMenu();

  }, [resId]);

  const fetchMenu =
    async () => {

      try {

        const response =
          await fetch(
            `${API_BASE_URL}/api/menu/${resId}`
          );

        const json =
          await response.json();

        const regularCards =
          json?.data?.cards?.find(
            (card) =>
              card?.groupedCard
                ?.cardGroupMap
                ?.REGULAR
          )?.groupedCard
            ?.cardGroupMap
            ?.REGULAR
            ?.cards;

        const categories =
          regularCards
            ?.filter(
              (item) =>
                item?.card?.card?.[
                  "@type"
                ] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
            )
            ?.map(
              (item) =>
                item?.card?.card
            );

        setMenu(
          categories || []
        );

      } catch (error) {

        console.error(
          "Menu Fetch Error:",
          error
        );

        setMenu([]);

      }
    };

  return menu;
};

export default useRestaurantMenu;
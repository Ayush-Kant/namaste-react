import { useEffect, useState } from "react";
import menu1 from "../swiggyMenuDb.json";
import menu2 from "../swiggyMenuDb2.json";

const useRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  function fetchMenu() {
    const json = Number(resId) % 2 === 0 ? menu1 : menu2;

    const regularCards =
      json?.data?.cards?.find(
        (card) => card?.groupedCard?.cardGroupMap?.REGULAR
      )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    const categories = regularCards
      ?.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
      ?.map((item) => item?.card?.card);

    setMenu(categories);
  }

  return menu;
};

export default useRestaurantMenu;
import { useState } from "react";
import { useParams } from "react-router-dom";

import Shimmer from "./Shimmer";
import RestaurantMenuHeader from "./RestaurantMenuHeader";
import RestaurantCategory from "./RestaurantCategory";

import useRestaurantInfo from "../utils/useRestaurantInfo";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const ResturantMenu = () => {

  const { resId } =
    useParams();

  const restaurant =
    useRestaurantInfo(resId);

  const menu =
    useRestaurantMenu(resId);

  const [
    showIndex,
    setShowIndex,
  ] = useState(0);

  if (
    !restaurant ||
    !menu
  ) {
    return <Shimmer />;
  }

  return (
    <div>

      <div
        className="
          my-8
          py-8
          flex
          w-full
          bg-orange-100
        "
      >
        <RestaurantMenuHeader
          {...restaurant.info}
        />
      </div>

      {
        menu.map(
          (
            category,
            index
          ) => (
            <RestaurantCategory
              key={
                category.categoryId ||
                category.title
              }
              category={category}
              showItems={
                index ===
                showIndex
              }
              setShowIndex={() =>
                setShowIndex(
                  index
                )
              }
            />
          )
        )
      }

    </div>
  );
};

export default ResturantMenu;
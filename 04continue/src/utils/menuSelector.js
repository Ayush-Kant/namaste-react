import defaultMenu from "../menus/default.json";
import pizzaMenu from "../menus/pizza.json";
import burgerMenu from "../menus/burger.json";
import chineseMenu from "../menus/chinese.json";
import biryaniMenu from "../menus/biryani.json";
import northIndianMenu from "../menus/north-indian.json";
import southIndianMenu from "../menus/south-indian.json";
import mughlaiMenu from "../menus/mughlai.json";
import italianMenu from "../menus/italian.json";
import fastFoodMenu from "../menus/fast-food.json";

export const getMenuForRestaurant = (
  restaurant
) => {
  const name =
    restaurant?.info?.name
      ?.toLowerCase() || "";

  const cuisines =
    restaurant?.info?.cuisines
      ?.join(" ")
      ?.toLowerCase() || "";

  /*
  ==========================
  Famous Chains First
  ==========================
  */

  if (
    name.includes("kfc")
  )
    return burgerMenu;

  if (
    name.includes("mcdonald")
  )
    return burgerMenu;

  if (
    name.includes("burger king")
  )
    return burgerMenu;

  if (
    name.includes("subway")
  )
    return fastFoodMenu;

  if (
    name.includes("domino")
  )
    return pizzaMenu;

  if (
    name.includes("pizza hut")
  )
    return pizzaMenu;

  if (
    name.includes("lapinoz")
  )
    return pizzaMenu;

  if (
    name.includes("barbeque nation")
  )
    return defaultMenu;

  /*
  ==========================
  Cuisine Matching
  ==========================
  */

  if (
    cuisines.includes("pizza")
  )
    return pizzaMenu;

  if (
    cuisines.includes("burger")
  )
    return burgerMenu;

  if (
    cuisines.includes("chinese")
  )
    return chineseMenu;

  if (
    cuisines.includes("biryani")
  )
    return biryaniMenu;

  if (
    cuisines.includes(
      "north indian"
    )
  )
    return northIndianMenu;

  if (
    cuisines.includes(
      "south indian"
    )
  )
    return southIndianMenu;

  if (
    cuisines.includes(
      "mughlai"
    )
  )
    return mughlaiMenu;

  if (
    cuisines.includes(
      "italian"
    )
  )
    return italianMenu;

  if (
    cuisines.includes(
      "fast food"
    )
  )
    return fastFoodMenu;

  return defaultMenu;
};
import ResturantCard from "./ResturantCards";
import { ResturantCardPromoted } from "./ResturantCards";

import {
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import useRestaurantData from "../utils/useRestaurantData";
import useOnlineStatus from "../utils/useOnlineStatus";

import OfflineStatus from "./offlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [searchText, setSearchText] =
    useState("");

  const loadMoreRef =
    useRef(null);

  const {
    loading,
    backendLoading,

    visibleRestaurants,

    searchRestaurants,

    filterTopRated,

    resetFilters,

    loadMore,

    totalRestaurants,

    visibleCount,

    lat,
    lng,
  } = useRestaurantData();

  const PromotedRestaurants =
    ResturantCardPromoted(
      ResturantCard
    );

  const onlineStatus =
    useOnlineStatus();

  const { userName } =
    useContext(UserContext);

  /*
  ==========================================
  Infinite Scroll
  ==========================================
  */

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const target =
            entries[0];

          if (
            target.isIntersecting &&
            visibleCount <
              totalRestaurants
          ) {
            loadMore();
          }
        },
        {
          threshold: 0.25,
        }
      );

    const currentRef =
      loadMoreRef.current;

    if (currentRef) {
      observer.observe(
        currentRef
      );
    }

    return () => {
      if (currentRef) {
        observer.unobserve(
          currentRef
        );
      }
    };
  }, [
    visibleCount,
    totalRestaurants,
  ]);

  if (!onlineStatus) {
    return (
      <OfflineStatus />
    );
  }

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="body">

      <div
        className="
          text-5xl
          font-serif
          font-bold
          mx-10
          text-orange-500
        "
      >
        <h1>
          Hello {userName},
          let's get hungryyy...
          😉🤤
        </h1>
      </div>

      <div
        className="
          flex
          p-4
          m-4
          items-center
          flex-wrap
        "
      >
        <div className="p-2 m-2">

          <input
            className="
              p-1
              m-1
              border-solid
              border-[1px]
              border-black
            "
            type="text"
            placeholder="Search restaurants"
            value={searchText}
            onChange={(e) => {
              const value =
                e.target.value;

              setSearchText(
                value
              );

              if (
                value.trim() === ""
              ) {
                resetFilters();
              }
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                searchRestaurants(
                  searchText
                );
              }
            }}
          />

          <button
            className="
              p-1
              m-1
              border-[1px]
              border-solid
              border-black
              cursor-pointer
            "
            onClick={() =>
              searchRestaurants(
                searchText
              )
            }
          >
            Search
          </button>

        </div>

        <div
          className="
            p-1
            m-1
            border-solid
            border-black
            border-[1px]
          "
        >
          <button
            onClick={
              filterTopRated
            }
            className="
              cursor-pointer
            "
          >
            Top Rated
          </button>
        </div>

        <div
          className="
            p-1
            m-1
            border-solid
            border-black
            border-[1px]
          "
        >
          <button
            onClick={() => {
              setSearchText("");

              resetFilters();
            }}
            className="
              cursor-pointer
            "
          >
            Reset
          </button>
        </div>

      </div>

      <div
        className="
          flex
          p-2
          m-2
          flex-wrap
        "
      >
        {
          visibleRestaurants.map(
            (restaurant) => {
              const {
                info,
              } = restaurant;

              return (
                <Link
                  key={info.id}
                  to={
                    "/resturants/" +
                    info.id
                  }
                >
                  {
                    info.veg
                      ? (
                        <PromotedRestaurants
                          {...info}
                        />
                      )
                      : (
                        <ResturantCard
                          {...info}
                        />
                      )
                  }
                </Link>
              );
            }
          )
        }

        <div
          ref={loadMoreRef}
          className="
            w-full
            text-center
            py-8
          "
        >
          {
            visibleCount <
            totalRestaurants
              ? (
                <p>
                  Loading more
                  restaurants...
                </p>
              )
              : backendLoading
                ? (
                  <p>
                    Fetching more
                    restaurants from
                    nearby areas...
                  </p>
                )
                : (
                  <p>
                    You've reached
                    the end
                  </p>
                )
          }
        </div>

      </div>

    </div>
  );
};

export default Body;
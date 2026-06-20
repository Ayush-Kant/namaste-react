# Real Swiggy Data Integration Journey - Challenges and Solutions I faced during development

Initially the goal was simple:

Fetch restaurant data directly from Swiggy and display it inside the React application.

Started exploring Swiggy APIs using browser network tab.

Discovered restaurant listing endpoint:

```txt
https://www.swiggy.com/dapi/restaurants/list/v5
```

and menu endpoint:

```txt
https://www.swiggy.com/dapi/menu/pl
```

---

## First Challenge - CORS

When trying to call Swiggy APIs directly from React:

```js
fetch("https://www.swiggy.com/dapi/...")
```

Browser blocked the request.

Error:

```txt
Access to fetch blocked by CORS policy
```

Learned:

Browser security prevents frontend applications from directly consuming many third-party APIs.

---

## Temporary Solution - CORS Proxies

Experimented with:

```txt
corsproxy.io
```

and similar proxy services.

This worked temporarily but had issues:

* Slow responses
* Rate limits
* Unreliable behaviour
* Not production ready

---

## Second Challenge - Limited Restaurants

Even when API calls succeeded:

Only around

```txt
20 - 30 restaurants
```

were returned.

Problem:

Swiggy only returns restaurants around a specific coordinate.

Example:

```txt
lat=23.3492
lng=85.3347
```

returns only nearby restaurants.

Many restaurants from the city were missing.

---

## Third Challenge - Understanding Pagination

While analyzing Swiggy responses discovered:

```json
{
  "nextOffset": "CJhlELQ4KICAt9T28fHbMDCnEzgE"
}
```

Investigated:

```txt
/dapi/restaurants/list/update
```

endpoint.

Learned Swiggy loads more restaurants using offset based pagination.

Experimented with:

* nextOffset
* update endpoint
* pagination requests

Results were inconsistent.

---

## Fourth Challenge - Swiggy Anti Bot Behaviour

Observed strange behaviour:

Same API request sometimes returned:

```txt
200 OK
```

but restaurant data was missing.

Sometimes received:

```txt
202 Accepted
```

Sometimes empty cards.

Sometimes HTML responses.

Learned:

Swiggy likely applies internal request validation and anti-bot protection.

---

## Fifth Challenge - Menu APIs

Restaurant menu endpoint:

```txt
/dapi/menu/pl
```

worked inconsistently.

Observed:

* Empty menus
* Missing categories
* Different structures
* Responses changing frequently

Built multiple retry mechanisms but results remained unreliable.

---

## Solution - Build My Own Backend

Created Express backend.

Architecture:

```txt
React Frontend
        ↓
Node Backend
        ↓
Swiggy APIs
```

Benefits:

* No CORS issues
* Better request control
* Centralized data processing

---

## Solution - Multi Coordinate Discovery

Instead of relying on one coordinate:

Generated multiple coordinates around user location.

Example:

```txt
       *
   *       *

       X

   *       *
       *
```

Where:

```txt
X = User Location
* = Additional Search Points
```

Backend fetches restaurants from all nearby points.

Benefits:

* Much larger restaurant coverage
* More realistic city-wide results

---

## Solution - Restaurant Deduplication

Same restaurant could appear from multiple coordinates.

Implemented:

```js
Map<restaurantId, restaurant>
```

Benefits:

* Automatic duplicate removal
* Unique restaurant list

---

## Solution - Background Fetching

Instead of making user wait:

Step 1:

Return nearby restaurants immediately.

Example:

```txt
25 restaurants
```

Step 2:

Continue searching additional coordinates in background.

Step 3:

Keep updating cache.

Final result:

```txt
100+ restaurants
```

without blocking the UI.

---

## Solution - Frontend Polling

Frontend periodically checks:

```txt
/api/restaurants/status
```

Backend returns:

```json
{
  "loading": true,
  "count": 58
}
```

Whenever count increases:

Frontend refreshes automatically.

Result:

```txt
25 restaurants
↓
42 restaurants
↓
68 restaurants
↓
107 restaurants
```

without page reload.

---

## Final Learning

This project evolved from:
```
Simple React Restaurant UI
```
into: Location Aware Restaurant Discovery System

by solving:

* CORS Issues
* Pagination Problems
* API Inconsistencies
* Geographical Search Limitations
* Duplicate Data
* Background Processing
* Frontend Synchronization
* Dynamic Location Based Discovery




## Let's Dive deep into development Journey

# I Used Parcel for learning React from more root level 

Visit official docs to explore Parcel. some of its core features are :

* Dev Build

* provided Local Server

* HMR (Hot Module Replacement)

* File Watching Algorithm written in C++

* Faster Builds through Caching

* Image Optimization

During Production Build:

* Minification
* Bundling
* Compression
* Consistent Hashing
* Code Splitting
* Differential Bundling
* Diagnostics
* HTTPS Support
* Tree Shaking
* Separate Development and Production Builds

These are performed by different libraries managed internally by Parcel.

Hence React + Parcel together make development faster and production builds optimized.

---

# Phase 1 - Building Basic UI

Created basic components:

* Header
* Body
* Restaurant Card
* Footer

Initially everything was static.

Used hardcoded restaurant data.

Learned:

* JSX
* Components
* Props
* Rendering Lists using map()

---

# Phase 2 - Dynamic Restaurant Cards

Instead of creating restaurant cards manually:

Created reusable RestaurantCard component.

Passed:

* Name
* Cuisine
* Rating
* Delivery Time
* Cost

through props.

Learned:

* Props
* Destructuring
* Reusable UI Design

---

# Phase 3 - Config Driven UI

Stopped hardcoding restaurant cards.

Stored restaurant information inside JSON.

Rendered UI based on data.

Learned:

Frontend should be controlled by data.

---

# Phase 4 - Search Functionality

Added Search Bar.

Implemented:

filter()

on restaurant list.

Users could search restaurants by name.

Learned:

* useState
* Controlled Inputs
* Real Time UI Updates

---

# Phase 5 - Top Rated Filter

Added:

Top Rated Restaurants Button

Condition:

avgRating > 4

Learned:

* State Updates
* Filtering Arrays
* Derived UI State

---

# Phase 6 - React Hooks

Started using:

* useState
* useEffect

Learned:

* Component Lifecycle
* Side Effects
* Data Synchronization

---

# Phase 7 - Shimmer Loading Screen

Problem:

Blank Screen while loading data.

Solution:

Created Shimmer Component.

Displayed skeleton loaders until data arrived.

Improved User Experience.

---

# Phase 8 - Fetching Real Restaurant Data

Removed mock data.

Started fetching live restaurant data.

Learned:

* Fetch API
* Async Await
* API Integration

---

# Phase 9 - Custom Hooks

Moved business logic outside UI.

Created:

### useOnlineStatus()

Detects:

* Online
* Offline

using browser APIs.

---

### useRestaurantData()

Responsible for:

* Restaurant Fetching
* Search
* Filters
* Infinite Scroll
* Backend Polling

---

### useRestaurantInfo()

Fetches restaurant information using restaurant id.

---

### useRestaurantMenu()

Responsible for menu selection and menu generation.

Learned:

* Reusability
* Separation of Concerns
* Cleaner Components

---

# Phase 10 - React Router

Added Routing.

Pages:

* Home
* About
* Restaurant Menu

Used:

* createBrowserRouter()
* RouterProvider
* Outlet
* Link
* useParams()

Example:

/resturants/1087169

↓

Extract Restaurant Id

↓

Render Restaurant Menu

---

# Phase 11 - Restaurant Menu Page

Created dedicated Restaurant Menu screen.

Displayed:

* Restaurant Image
* Restaurant Name
* Rating
* Delivery Time
* Cost
* Cuisine
* Area

Learned:

Dynamic Routing.

---

# Phase 12 - Accordion Menu

Converted Menu Categories into Accordion.

Features:

* Expand Category
* Collapse Category
* Only One Category Open

Implemented by lifting state up.

Learned:

State Sharing Between Components.

---

# Phase 13 - Context API

Created UserContext.

Shared:

* userName
* email

across components.

Avoided Prop Drilling.

Learned:

Global State without Redux.

---

# Phase 14 - Redux Toolkit

Created:

* appStore
* cartSlice

Learned:

* Global Store
* Reducers
* Actions

Prepared application for future cart functionality.

---

# Phase 15 - Swiggy API Exploration

Started exploring Swiggy APIs.

Restaurant Endpoint:

Used restaurant listing APIs.

Challenges Faced:

* CORS Errors
* Inconsistent Responses
* Limited Restaurants

Learned:

Frontend-only architecture has limitations.

---

# Phase 16 - Creating Custom Backend

Created separate backend application.

Architecture:

Frontend

↓

Backend

↓

Swiggy

Benefits:

* CORS Solved
* Better Control
* Centralized Logic

---

# Phase 17 - Location Based Restaurant Discovery

Initially:

One Coordinate

↓

20-30 Restaurants

Problem:

Not enough restaurants.

Solution:

Backend started exploring nearby coordinates.

---

# Phase 18 - Multi Coordinate Discovery Engine

Generated multiple coordinates around user location.

For each coordinate:

* Call Swiggy API
* Collect Restaurants
* Merge Results

Learned:

Geographical Search Expansion.

---

# Phase 19 - Duplicate Restaurant Removal

Problem:

Same restaurant appeared multiple times.

Solution:

Used restaurant id as unique key.

Stored restaurants in Map().

Benefits:

Automatic Deduplication.

---

# Phase 20 - Progressive Restaurant Loading

Instead of waiting for all coordinates:

Step 1:

Return initial restaurants immediately.

Step 2:

Continue fetching in background.

Step 3:

Add newly discovered restaurants to cache.

Result:

Faster perceived loading.

---

# Phase 21 - Backend Polling

Frontend continuously checks:

/api/restaurants/status

Backend responds:

* loading
* count

Whenever count increases:

Frontend automatically refreshes restaurant list.

Example:

23 Restaurants

↓

38 Restaurants

↓

57 Restaurants

↓

107 Restaurants

without page refresh.

---

# Phase 22 - Browser Geolocation

Implemented:

navigator.geolocation.getCurrentPosition()

User can now discover restaurants around current location.

---

# Phase 23 - Location Context

Created dedicated LocationContext.

Stores:

* Latitude
* Longitude
* Location Name
* Search Function
* Refresh Function

Entire application now reacts to location changes automatically.

---

# Phase 24 - Manual Location Search

Users can search:

* Ranchi
* Delhi
* Mumbai
* Bengaluru
* Patna

and instantly load restaurants from that location.

---

# Phase 25 - Reverse Geocoding

Problem:

Coordinates are not user friendly.

Example:

23.3492917, 85.334765

Solution:

Convert coordinates into:

Ranchi, Jharkhand

using OpenStreetMap Reverse Geocoding.

---

# Phase 26 - Location Persistence

Stored:

* Latitude
* Longitude
* Location Name

inside localStorage.

Benefits:

Location survives refresh.

No repeated permission requests.

---

# Phase 27 - Location Autocomplete

Built autocomplete dropdown.

Features:

* Current Location Shortcut
* Search Suggestions
* Click Selection

Powered by OpenStreetMap Nominatim API.

---

# Phase 28 - India Only Search

Restricted autocomplete suggestions to India.

Examples:

Delhi

Mumbai

Kolkata

Ranchi

instead of worldwide locations.

---

# Phase 29 - Debouncing

Problem:

Every keystroke generated API request.

Example:

r

ra

ran

ranc

ranchi

5 requests.

Solution:

300ms debounce.

Result:

Only one request sent.

---

# Phase 30 - Infinite Scroll

Implemented:

Intersection Observer API.

Initially render:

16 restaurants

As user scrolls:

Load 16 more.

Benefits:

* Better Performance
* Better UX
* Less DOM Rendering

---

# Phase 31 - Dynamic Menu Engine

Real Swiggy Menu APIs proved unreliable.

Designed custom menu system.

Menu selected using:

* Restaurant Name
* Restaurant Cuisine

---

# Phase 32 - Chain Detection System

Examples:

KFC

↓

Burger Menu

Dominos

↓

Pizza Menu

Pizza Hut

↓

Pizza Menu

Subway

↓

Fast Food Menu

Burger King

↓

Burger Menu

McDonald's

↓

Burger Menu

---

# Phase 33 - Cuisine Based Menu Mapping

Created separate menu templates:

* Pizza
* Burger
* Chinese
* Biryani
* North Indian
* South Indian
* Mughlai
* Italian
* Fast Food
* Default

Restaurant cuisines automatically determine menu selection.

---

# Current Application Features

✓ Dynamic Restaurant Discovery

✓ Multi Coordinate Restaurant Search

✓ Backend Caching

✓ Current Location Detection

✓ Manual Location Search

✓ Reverse Geocoding

✓ Location Persistence

✓ Autocomplete Suggestions

✓ Debounced Search

✓ Infinite Scroll

✓ Search Restaurants

✓ Top Rated Filter

✓ Dynamic Menus

✓ Accordion Menus

✓ Online / Offline Detection

✓ Context API

✓ Redux Toolkit

✓ React Router

✓ Custom Hooks

✓ Progressive Restaurant Loading

and the project continues to evolve...

# Parcel
- visit official docs

- Dev Build
- provided Local Server
- it is doing HMR -Hot Module Replacement - as we change in our file, it changes on server in realtime without any re running - bcoz it has - File Watching Algorithm->written in c++
- Caching - Faster Builds --it will store cache memory so that
         subsequent builds become faster and faster
- Parcel do Image Optimization


- During deployment t production 


- it will Minification of file
- it will do Bundling
- Compressing
- Consistent Hashing
- Code Splitting 
- Differential Bundling - to support older browsers also
- Diagnostics
- Gives Good Error
- also gives a way to host on HTTPs along with HTTP
- Tree Shaking - remove unused code 
- different dev and production files

-- these are done by different libraries, and thses libraries are managed by parcel

--- hence along with react, parcel or bundlers make the project faster 




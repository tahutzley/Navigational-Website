import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import FlowerDelivery from "./components/FlowerDelivery.tsx";
import Map from "./components/Map.tsx";
import Requests from "./components/Requests.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "", // Define the route for Flower Delivery page
          element: <div></div>,
        },
      ],
    },
    {
      path: "FlowerDelivery", // Define the route for Flower Delivery page
      element: <FlowerDelivery />,
    },
    {
      path: "/map",
      element: <Map />,
    },
    {
      path: "/Requests",
      element: <Requests />,
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col px-20 gap-5">
        <h1>Welcome to your starter code.</h1>
        <Outlet />
      </div>
    );
  }
}

export default App;

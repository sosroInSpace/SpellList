/*
  router.js
*/

import { createBrowserRouter } from "react-router-dom";

import AppLayout from "components/AppLayout";
import NotFoundPage from "components/NotFoundPage";
import RootPage from "components/RootPage";

const router = createBrowserRouter([
  {
    pqath: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/favourites",
        element: <RootPage favourites={true} />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

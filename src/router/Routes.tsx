import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Wrapper from "../layout/Wrapper";
// import LoginPage from "../components/LoginPage";
import ErrorBoundary from "../components/ErrorBoundary";
import withSuspense from "../utils/withSuspense";
import PageNotFound from "../pages/PageNotFound";

/* eslint-disable react-refresh/only-export-components */
const HomePage = lazy(() => import("../pages/HomePage"));
const AuthorPage = lazy(() => import("../components/AuthorPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("../components/BlogDetailsPage"));
const JokePage = lazy(() => import("../pages/JokePage"));
const WeatherPage = lazy(() => import("../pages/WeatherPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "",
        element: withSuspense(HomePage), //lazy loaded
        errorElement: <ErrorBoundary />,
      },
      {
        path: "user/:userId",
        element: withSuspense(AuthorPage),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "blog",
        element: withSuspense(BlogPage),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "blog/:id",
        element: withSuspense(BlogDetailsPage),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "joke",
        element: withSuspense(JokePage),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "weather",
        element: withSuspense(WeatherPage),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   errorElement: <ErrorBoundary />,
  // },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

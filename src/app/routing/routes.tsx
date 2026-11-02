import type { RouteConfig } from "./types";
import { Navigate } from "react-router-dom";
import { homeRoutes } from "@/features/home/routes";
import { productsRoutes } from "@/features/artists/routes";
import { lazyLoad } from "./lazy-loader";

const NotFoundPage = lazyLoad(() => import("@/shared/pages/not-found"));

/**
 * Centralized route configuration.
 * Order matters: specific paths first, catch-all last.
 */
export const routeConfigs: RouteConfig[] = [
  ...homeRoutes,
  ...productsRoutes,
  {
    path: "/artists",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];

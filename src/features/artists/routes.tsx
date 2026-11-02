import type { RouteConfig } from "@/app/routing/types";
import { lazyLoad } from "@/app/routing/lazy-loader";

const ProductsPage = lazyLoad(() => import("@/features/artists/pages"));

export const productsRoutes: RouteConfig[] = [
  {
    path: "/products",
    element: ProductsPage,
  },
];
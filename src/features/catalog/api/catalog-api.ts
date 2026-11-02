import { baseApi } from "@/app/api/base-api";

export interface CatalogBand {
  id: string;
  name: string;
  country: string | null;
  genre: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface CatalogVariant {
  id: string;
  sizeId: string;
  size: string | null;
  color: string;
  sku: string;
  unitPrice: string;
  stockQuantity: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  description: string | null;
  fit: string;
  imageUrl: string | null;
  isActive: boolean;
  band: CatalogBand | null;
  variants: CatalogVariant[];
}

export interface PaginatedProducts {
  total: number;
  page: number;
  perPage: number;
  items: CatalogProduct[];
}

export interface ProductQuery {
  page?: number;
  perPage?: number;
  bandId?: string;
  q?: string;
  order?: "latest" | "oldest";
}

/**
 * Storefront catalog endpoints backed by the FastAPI service.
 */
export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, ProductQuery | void>({
      query: (params) => ({
        url: "/product/",
        params: params ?? undefined,
      }),
    }),
    getBands: builder.query<CatalogBand[], void>({
      query: () => "/band/",
    }),
  }),
});

export const { useGetProductsQuery, useGetBandsQuery } = catalogApi;

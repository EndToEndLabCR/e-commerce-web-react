import { useMemo, useState } from "react";
import { ArtistsHero } from "@/features/artists/components/artists-hero";
import { BandSearch } from "@/features/artists/components/band-search";
import { MerchVault } from "@/features/artists/components/merch-vault";
import {
  useGetProductsQuery,
  type CatalogBand,
  type CatalogProduct,
} from "@/features/catalog/api/catalog-api";

/**
 * Products page (HORDE MERCH // PRODUCT CATALOG).
 */
const ArtistsPage: React.FC = () => {
  const [bandQuery, setBandQuery] = useState("");
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ perPage: 100 });

  const products = useMemo<CatalogProduct[]>(() => data?.items ?? [], [data]);

  const bands = useMemo<CatalogBand[]>(() => {
    const byId = new Map<string, CatalogBand>();
    for (const product of products) {
      if (product.band && !byId.has(product.band.id)) {
        byId.set(product.band.id, product.band);
      }
    }
    return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const allTees = useMemo<CatalogProduct[]>(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products],
  );

  const hasProductNameMatch = useMemo(() => {
    const query = bandQuery.trim().toLowerCase();
    return query.length > 0 && allTees.some((product) => product.name.toLowerCase().includes(query));
  }, [allTees, bandQuery]);

  const filteredTees = useMemo(() => {
    const query = bandQuery.trim().toLowerCase();
    if (!query) return allTees;

    const matchedBand = bands.find((band) => band.name.toLowerCase().includes(query));

    return allTees.filter(
      (product) =>
        (matchedBand ? product.band?.id === matchedBand.id : false) ||
        product.name.toLowerCase().includes(query),
    );
  }, [allTees, bandQuery, bands]);

  return (
    <>
      <ArtistsHero />
      <BandSearch
        bandQuery={bandQuery}
        bands={bands}
        totalProducts={data?.total ?? 0}
        resultCount={filteredTees.length}
        hasProductNameMatch={hasProductNameMatch}
        onBandQueryChange={setBandQuery}
        onReset={() => setBandQuery("")}
      />
      <MerchVault
        products={filteredTees}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />
    </>
  );
};

export default ArtistsPage;

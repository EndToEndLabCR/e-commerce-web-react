import type { CatalogBand } from "@/features/catalog/api/catalog-api";
import styles from "./band-search.module.scss";

interface BandSearchProps {
  bandQuery: string;
  bands: CatalogBand[];
  totalProducts: number;
  resultCount: number;
  hasProductNameMatch: boolean;
  onBandQueryChange: (value: string) => void;
  onReset: () => void;
}

/**
 * Section 2 — SEARCH BAND / PRODUCT console: product/band search with
 * live match badge + product counter and CLEAR.
 */
const BandSearch: React.FC<BandSearchProps> = ({
  bandQuery,
  bands,
  totalProducts,
  resultCount,
  hasProductNameMatch,
  onBandQueryChange,
  onReset,
}) => {
  const hasQuery = bandQuery.trim().length > 0;
  const query = bandQuery.trim().toLowerCase();
  const matches = query ? bands.filter((band) => band.name.toLowerCase().includes(query)) : [];
  const matched = matches[0] ?? null;

  const counterText = hasQuery
    ? `${resultCount} ${resultCount === 1 ? "PRODUCT" : "PRODUCTS"} FOUND`
    : `${totalProducts} PRODUCTS AVAILABLE`;

  const badgeText = hasQuery
    ? matched
      ? `MATCH: ${matched.name}`
      : hasProductNameMatch
        ? "PRODUCT MATCH"
        : "NO MATCHES"
    : "";

  return (
    <section className={styles.section} id="band-search-section">
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.headingTitle}>
            <svg className={styles.headingIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-7.5 6a7.5 7.5 0 0 1 12.9-5.2L19.2 8.5a2 2 0 0 1 .6 1.4V12a2 2 0 0 1-2 2H13.5A7.5 7.5 0 0 1 2.5 10Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            <h2>SEARCH BAND / PRODUCT</h2>
          </div>
          <div className={styles.headingMeta}>
            <span className={styles.counter}>{counterText}</span>
            <button
              type="button"
              className={`${styles.clear}${hasQuery ? ` ${styles.clearVisible}` : ""}`}
              onClick={onReset}
            >
              ✕ CLEAR
            </button>
          </div>
        </div>

        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={bandQuery}
            onChange={(event) => onBandQueryChange(event.target.value)}
            placeholder="TYPE PRODUCT OR BAND NAME (E.G. ÆNEMA TOOL, ASHEN RITES, VOID SCREAMER)..."
            aria-label="Search product or band"
          />
          {badgeText && (
            <span
              className={
                matched || hasProductNameMatch ? styles.matchBadge : styles.matchBadgeMuted
              }
            >
              {badgeText}
            </span>
          )}
        </div>


      </div>
    </section>
  );
};

export default BandSearch;

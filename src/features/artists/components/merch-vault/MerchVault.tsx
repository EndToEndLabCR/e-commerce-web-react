import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/features/catalog/api/catalog-api";
import TeeCard from "./TeeCard";
import styles from "./merch-vault.module.scss";

interface MerchVaultProps {
  products: CatalogProduct[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

const ITEMS_PER_PAGE = 18;

/**
 * Section 4 — Exclusive t-shirt merchandise vault.
 */
const MerchVault: React.FC<MerchVaultProps> = ({ products, isLoading, isError, onRetry }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTees = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showGrid = !isLoading && !isError && products.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {isLoading && <p className={styles.status}>LOADING ARCHIVE…</p>}

        {!isLoading && isError && (
          <div className={styles.status}>
            <span>ARCHIVE UNAVAILABLE. CHECK THE API CONNECTION.</span>
            {onRetry && (
              <button type="button" className={styles.retry} onClick={() => onRetry()}>
                RETRY
              </button>
            )}
          </div>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <p className={styles.status}>NO MERCHANDISE MATCHES THE CURRENT FILTER.</p>
        )}

        {showGrid && (
          <div className={styles.grid}>
            {paginatedTees.map((product) => (
              <TeeCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {showGrid && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREVIOUS
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.pageNumber} ${
                    currentPage === page ? styles.pageNumberActive : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              NEXT
            </button>
          </div>
        )}

        <div className={styles.dispatch}>
          <div className={styles.dispatchInfo}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              GLOBAL ARMORED DISPATCH • HEAVYWEIGHT 240+ GSM COTTON APPAREL
            </span>
          </div>
          <a href="#sizing-dispatch" className={styles.dispatchLink}>
            <span>SIZING &amp; DISPATCH DETAILS</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 12h16m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MerchVault;

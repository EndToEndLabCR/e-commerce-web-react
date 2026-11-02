import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/features/catalog/api/catalog-api";
import styles from "./merch-vault.module.scss";

interface TeeCardProps {
  product: CatalogProduct;
}

const ADDED_RESET_MS = 1400;

const ADD_TO_CART_TEXT = "ADD TO CART";
const ADDED_TEXT = "ADDED TO CART";

const DISPLAY_SIZES = ["S", "M", "L"] as const;

/**
 * Single t-shirt card: band label, mock merch image, price,
 * size picker (L selected by default when available) and an
 * ADD TO CART micro-interaction.
 */
const TeeCard: React.FC<TeeCardProps> = ({ product }) => {
  const sizes = product.variants
    .map((variant) => variant.size)
    .filter((size): size is string => Boolean(size));
  const defaultSize = sizes.includes("L") ? "L" : (sizes[0] ?? "S");
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [added, setAdded] = useState(false);

  const price = product.variants.length
    ? Math.min(...product.variants.map((variant) => Number(variant.unitPrice)))
    : 0;
  const bandName = product.band?.name ?? "UNKNOWN BAND";

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), ADDED_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <span className={styles.tag}>{bandName}</span>
        <div className={styles.imageWrap}>
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.copy}>
          <h3 className={styles.teeName}>{product.name}</h3>
          <p className={styles.teeDesc}>{product.description}</p>
        </div>

        <div className={styles.buy}>
          <div className={styles.buyRow}>
            <span className={styles.price}>${price.toFixed(2)}</span>
            <div className={styles.sizes} role="group" aria-label="Size">
              {DISPLAY_SIZES.map((size) => {
                const available = sizes.includes(size);
                if (!available) {
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.size} ${styles.sizeDisabled}`}
                      disabled
                      aria-label={`${size} unavailable`}
                    >
                      {size}
                    </button>
                  );
                }
                return (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.size}${
                      selectedSize === size ? ` ${styles.sizeActive}` : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            className={`${styles.cart}${added ? ` ${styles.cartAdded}` : ""}`}
            onClick={() => setAdded(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              {added ? (
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 5h2l3 11h8l2.5-8H8M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>{added ? ADDED_TEXT : ADD_TO_CART_TEXT}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default TeeCard;

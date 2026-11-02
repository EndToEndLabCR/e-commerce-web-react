import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/shared/hooks";
import { useGetProductsQuery, type CatalogProduct } from "@/features/catalog/api/catalog-api";
import styles from "./home-products.module.scss";

/** One marquee loop duration; the track advances one group width per loop. */
const MARQUEE_DURATION_MS = 60000;
const MIN_REPEATS = 3;
const MAX_PRODUCTS = 16;

const lowestPrice = (product: CatalogProduct): number => {
  const prices = product.variants.map((variant) => Number(variant.unitPrice));
  return prices.length ? Math.min(...prices) : 0;
};

const HomeProducts: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [repeats, setRepeats] = useState(MIN_REPEATS);
  const [marqueeUnit, setMarqueeUnit] = useState(0);
  const { data, isLoading, isError } = useGetProductsQuery({
    perPage: MAX_PRODUCTS,
    order: "latest",
  });

  const products = useMemo(() => data?.items ?? [], [data]);

  useEffect(() => {
    const container = marqueeRef.current;
    const firstGroup = groupRef.current;
    if (!container || !firstGroup) return;

    const measure = () => {
      const unit = Math.round(firstGroup.getBoundingClientRect().width);
      if (unit <= 0) return;
      const count = Math.max(
        MIN_REPEATS,
        Math.ceil(container.clientWidth / unit) + 1,
      );
      setMarqueeUnit(unit);
      setRepeats(count);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [products.length]);

  // Drive the loop with the Web Animations API so the per-loop distance is an
  // exact measured value, keeping the seam seamless in every browser (incl. Safari).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || marqueeUnit <= 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = track.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${-marqueeUnit}px)` },
      ],
      { duration: MARQUEE_DURATION_MS, iterations: Infinity, easing: "linear" },
    );

    const pause = () => animation.pause();
    const play = () => animation.play();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
      animation.cancel();
    };
  }, [marqueeUnit]);

  const marqueeGroups = Array.from({ length: repeats }, () => products);

  return (
    <section className={styles.section} id="latest" ref={sectionRef}>
      <div className={styles.heading} data-reveal>
        <h2>LATEST ARRIVALS</h2>
        <Link to="/products" className={styles.viewAll}>
          <span>VIEW ALL</span>
          <span className={styles.viewAllArrow}>→</span>
        </Link>
      </div>

      {isLoading && <p className={styles.status}>LOADING LATEST ARRIVALS…</p>}

      {!isLoading && isError && (
        <p className={styles.status}>UNABLE TO LOAD LATEST ARRIVALS. CHECK THE API CONNECTION.</p>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <p className={styles.status}>NO PRODUCTS AVAILABLE.</p>
      )}

      {products.length > 0 && (
        <div className={styles.marquee} ref={marqueeRef}>
          <div className={styles.track} ref={trackRef}>
            {marqueeGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className={styles.group}
                ref={groupIndex === 0 ? groupRef : undefined}
                aria-hidden={groupIndex > 0}
              >
                {group.map((product) => (
                  <article key={product.id} className={styles.card}>
                    <div className={styles.cardMedia}>
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.cardImage}
                        />
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle} title={product.name}>
                        {product.name}
                      </h3>
                      <p className={styles.cardPrice}>${lowestPrice(product).toFixed(2)}</p>
                      <Button
                        type="default"
                        block
                        className={styles.addToCart}
                        tabIndex={groupIndex > 0 ? -1 : undefined}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeProducts;

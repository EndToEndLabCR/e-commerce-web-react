import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";
import { useGetBandsQuery } from "@/features/catalog/api/catalog-api";
import styles from "./home-artist-spotlight.module.scss";

const ARTIST_DURATION_MS = 10000;

/**
 * Artist spotlight driven by the band catalog (`GET /band/`).
 */
const HomeArtistSpotlight: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading, isError } = useGetBandsQuery();

  const artists = useMemo(() => data ?? [], [data]);

  const advance = (direction: number) => {
    if (artists.length === 0) return;
    setActiveIndex(
      (current) => (current + direction + artists.length) % artists.length,
    );
  };

  useEffect(() => {
    if (activeIndex >= artists.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, artists.length]);

  useEffect(() => {
    if (artists.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % artists.length);
    }, ARTIST_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, artists.length]);

  return (
    <section className={styles.section} id="artists">
      {isLoading && <p className={styles.status}>LOADING ARTISTS…</p>}

      {!isLoading && isError && (
        <p className={styles.status}>UNABLE TO LOAD ARTISTS. CHECK THE API CONNECTION.</p>
      )}

      {!isLoading && !isError && artists.length === 0 && (
        <p className={styles.status}>NO ARTISTS AVAILABLE.</p>
      )}

      {artists.length > 0 && (
        <>
          <div className={styles.slides}>
            {artists.map((artist, index) => {
              const nameLines = artist.name.split(" ");

              return (
                <div
                  key={artist.id}
                  className={`${styles.slide}${
                    index === activeIndex ? ` ${styles.slideActive}` : ""
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <div className={styles.mediaGroup}>
                    {artist.imageUrl ? (
                      <div
                        className={styles.portrait}
                        style={{ backgroundImage: `url(${artist.imageUrl})` }}
                        role="img"
                        aria-label={artist.name}
                      />
                    ) : (
                      <div className={styles.portraitFallback} aria-hidden>
                        <span>{artist.name}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.content}>
                    <p className={styles.eyebrow}>ARTIST SPOTLIGHT</p>
                    <h2 className={styles.artistName}>
                      {nameLines.map((line, lineIndex) => (
                        <span key={`${line}-${lineIndex}`}>
                          {line}
                          {lineIndex < nameLines.length - 1 && " "}
                          {lineIndex < nameLines.length - 1 && <br />}
                        </span>
                      ))}
                    </h2>
                    <p className={styles.meta}>
                      {[artist.genre, artist.country].filter(Boolean).join(" • ")}
                    </p>
                    {artist.description && <p className={styles.bio}>{artist.description}</p>}
                    <Button
                      type="default"
                      className={styles.cta}
                      tabIndex={index === activeIndex ? undefined : -1}
                    >
                      VIEW COLLECTION
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {artists.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowPrev}`}
                aria-label="Previous artist"
                onClick={() => advance(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowNext}`}
                aria-label="Next artist"
                onClick={() => advance(1)}
              >
                ›
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default HomeArtistSpotlight;

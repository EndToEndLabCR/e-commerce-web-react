import styles from "./artists-hero.module.scss";

const ArtistsHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h1>FEATURED PRODUCTS</h1>
            <p className={styles.subtitle}>
              OFFICIAL BAND T-SHIRT ARCHIVES. RIGID DISCHARGE SCREENPRINTS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsHero;
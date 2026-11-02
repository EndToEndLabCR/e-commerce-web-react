import { Button } from "antd";
import styles from "./home-hero.module.scss";

const MOSH_PIT_IMAGE = "/images/home/mosh-pit.jpg";

const HomeHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${MOSH_PIT_IMAGE})` }}
        role="img"
        aria-label="A gritty, high-contrast photograph of an intense mosh pit at a heavy metal concert"
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <h1 className={styles.title}>
          WEAR THE NOISE
        </h1>
        <h2 className={styles.subtitle}>
          Experience the chaos and energy of live metal shows through our exclusive apparel.
        </h2>
        <p>
          Our collection captures the raw energy and rebellious spirit of metal music, allowing you to wear your passion proudly.
        </p>
        <Button type="primary" size="large" className={styles.cta} href="#latest">
          SHOP LATEST DROPS
        </Button>
      </div>
    </section>
  );
};

export default HomeHero;
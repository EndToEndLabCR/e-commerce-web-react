import { Layout } from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.scss";

const { Header } = Layout;

const navLinks = [
  { label: "SHOP", to: "/" },
  { label: "PRODUCTS", to: "/products" },
  { label: "COLLECTIONS", to: "#collections" },
  { label: "SALE", to: "#sale" },
];

const AppHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to.startsWith("#")) {
      return false;
    }
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  return (
    <Header className={styles.header}>
      {/* Desktop nav */}
      <div className={styles.nav}>
        <Link to="/" className={styles.brand}>
          HORDE MERCH
        </Link>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`${styles.link} ${isActive(link.to) ? styles.linkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            aria-label="Shopping cart"
            className={styles.actionButton}
          >
            <ShoppingCartOutlined />
          </button>
          <button
            type="button"
            aria-label="Account"
            className={styles.actionButton}
          >
            <UserOutlined />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={styles.navMobile}>
        <Link to="/" className={styles.brandMobile}>
          HORDE MERCH
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          className={styles.menuButton}
        >
          <MenuOutlined />
        </button>
      </div>
    </Header>
  );
};

export default AppHeader;
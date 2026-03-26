import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.scrollToTop}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ↑
    </button>
  );
}

import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist."
};

export default function NotFound() {
  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Study Material Not Found</h1>
      <p className={styles.text}>
        Sorry, the page or PDF note document you are looking for has been moved, renamed, or is temporarily unavailable.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.btnPrimary}>
          Back to Homepage
        </Link>
        <Link href="/about" className={styles.btnSecondary}>
          About Free Pdfs Download
        </Link>
      </div>
    </div>
  );
}

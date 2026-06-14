"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        {/* Brand section */}
        <div className={styles.brandArea}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <span>Free Pdfs download</span>
          </Link>
          <p className={styles.tagline}>
            Free educational notes and study materials in PDF format for high school, undergraduate, and graduate courses.
          </p>
        </div>

        {/* Navigation links */}
        <div className={styles.linksArea}>
          <Link href="/about" className={styles.footerLink}>
            About Us
          </Link>
          <Link href="/contact" className={styles.footerLink}>
            Contact Us
          </Link>
          <Link href="/privacy-policy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className={styles.footerLink}>
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        <div className={styles.copyrightArea}>
          <p className={styles.copyright}>
            &copy; {currentYear} Free Pdfs download. All rights reserved. Built with Next.js App Router.
          </p>
        </div>
      </div>
    </footer>
  );
}

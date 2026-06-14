"use client";

import React from "react";
import Link from "next/link";
import { PDF } from "@/types";
import styles from "./PdfCard.module.css";

interface PdfCardProps {
  pdf: PDF;
}

export default function PdfCard({ pdf }: PdfCardProps) {
  // Format category slug to human-readable
  const categoryLabel = pdf.name;

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <span className={styles.badge}>{categoryLabel}</span>

        {/* We display a premium placeholder document vector for initial state, which is responsive and super fast */}
        <div className={styles.thumbnailPlaceholder}>
          <div className={styles.placeholderIcon}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className={styles.placeholderText}>Educational Notes</span>
        </div>
      </div>

      <div className={styles.infoArea}>
        <Link href={`/pdf/${pdf.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{pdf.title}</h3>
        </Link>
        <p className={styles.description}>{pdf.description}</p>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            {pdf.pageCount} Pages
          </span>
          <span className={styles.metaItem}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {pdf.fileSize}
          </span>
        </div>

        <Link href={`/pdf/${pdf.slug}`} className={styles.buttonLink}>
          <button className={styles.downloadButton} aria-label={`View or Download ${pdf.title}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            View & Download
          </button>
        </Link>
      </div>
    </div>
  );
}

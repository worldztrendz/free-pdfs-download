"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: Category;
  count?: number;
}

export default function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className={styles.card}>
      <div className={styles.iconWrapper}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h3 className={styles.title}>{category.name}</h3>
      <p className={styles.description}>
        {category.description || `Browse quality reference material and PDF notes for ${category.name}.`}
      </p>
      <div className={styles.meta}>
        <span>{count !== undefined ? `${count} ${count === 1 ? "File" : "Files"}` : "Explore Notes"}</span>
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
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </Link>
  );
}

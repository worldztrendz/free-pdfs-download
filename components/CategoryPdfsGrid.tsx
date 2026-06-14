"use client";

import React, { useState } from "react";
import PdfCard from "./PdfCard";
import Pagination from "./Pagination";
import { PDF } from "@/types";
import styles from "@/app/category/[slug]/page.module.css";

interface CategoryPdfsGridProps {
  pdfs: PDF[];
}

const ITEMS_PER_PAGE = 4;

export default function CategoryPdfsGrid({ pdfs }: CategoryPdfsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (pdfs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyTitle}>No notes found</div>
        <p className={styles.emptyText}>We haven&apos;t uploaded any PDF notes in this category yet. Check back soon!</p>
      </div>
    );
  }

  const totalPages = Math.ceil(pdfs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPdfs = pdfs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className={styles.grid}>
        {paginatedPdfs.map((pdf) => (
          <PdfCard key={pdf.id} pdf={pdf} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          // Scroll smoothly to top of grid
          window.scrollTo({
            top: 200,
            behavior: "smooth"
          });
        }}
      />
    </div>
  );
}

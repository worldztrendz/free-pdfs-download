"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PDF } from "@/types";
import pdfsData from "@/data/pdfs.json";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PDF[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const pdfs = pdfsData as PDF[];

  useEffect(() => {
    // Handle click outside to close results dropdown
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      const filtered = pdfs.filter(
        (pdf) =>
          pdf.title.toLowerCase().includes(value.toLowerCase()) ||
          pdf.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/pdf/${results[0].slug}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search notes, topics, PDFs..."
          value={query}
          onChange={handleSearchChange}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
          className={styles.searchInput}
          aria-label="Search PDFs"
        />
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ) : (
          <span className={styles.searchIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        )}
      </form>

      {isOpen && (
        <div className={styles.resultsDropdown}>
          {results.length > 0 ? (
            results.map((pdf) => (
              <Link
                key={pdf.id}
                href={`/pdf/${pdf.slug}`}
                onClick={handleItemClick}
                className={styles.resultItem}
              >
                <div className={styles.resultThumbnail}>
                  {/* Since local images might not exist yet, we use a placeholder styling and layout */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "var(--primary-color)",
                      fontWeight: "bold"
                    }}
                  >
                    PDF
                  </div>
                </div>
                <div className={styles.resultInfo}>
                  <div className={styles.resultTitle}>{pdf.title}</div>
                  <div className={styles.resultCategory}>{pdf.category.replace("-", " ")}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>No notes found for &quot;{query}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}

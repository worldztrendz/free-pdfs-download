import React from "react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import PdfCard from "@/components/PdfCard";
import { getCategories, getFeaturedPdfs, getLatestPdfs, getPdfsByCategory } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  const categories = getCategories();
  const featuredPdfs = getFeaturedPdfs(4);
  const latestPdfs = getLatestPdfs(4);

  // JSON-LD structured data for Home Page (WebSite schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Free Pdfs Download",
    "url": "https://freepdfsdownload.com",
    "description": "Download free educational notes in PDF format for BSc, MSc, Engineering, Computer Science, and Physics.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://freepdfsdownload.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Insert JSON-LD into head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Your Academic Library, Free Forever</h1>
          <p className={styles.heroSubtitle}>
            Access high-quality lecture notes, exam guides, study materials, and reference PDFs uploaded by top educators and students.
          </p>
          <div className={styles.heroSearch}>
            <SearchBar />
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "12px" }}>
            Popular: BSc Physics, Linear Algebra, Data Structures, Organic Chemistry
          </p>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse Categories</h2>
            <p className={styles.sectionDesc}>Select a category to view all available PDF notes</p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((category) => {
              const count = getPdfsByCategory(category.slug).length;
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  count={count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured PDFs Section */}
      <section className="container section">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Notes</h2>
          <p className={styles.sectionDesc}>Highly recommended reference materials for your studies</p>
        </div>
        <div className={styles.pdfsGrid}>
          {featuredPdfs.map((pdf) => (
            <PdfCard key={pdf.id} pdf={pdf} />
          ))}
        </div>
      </section>

      {/* Latest PDFs Section */}
      <section className={`${styles.sectionAlt} section`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recently Added Notes</h2>
              <p className={styles.sectionDesc}>Explore the latest educational PDF uploads</p>
            </div>
          </div>
          <div className={styles.pdfsGrid}>
            {latestPdfs.map((pdf) => (
              <PdfCard key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

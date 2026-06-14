import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryPdfsGrid from "@/components/CategoryPdfsGrid";
import { getCategoryBySlug, getCategories, getPdfsByCategory } from "@/lib/data";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Notes Free Download PDF - Free Pdfs Download`,
    description: category.description || `High-quality lecture notes, books, and reference PDFs for ${category.name}. Free download.`,
    alternates: {
      canonical: `/category/${category.slug}`
    },
    openGraph: {
      title: `${category.name} Notes Free Download PDF - Free Pdfs Download`,
      description: category.description || `High-quality lecture notes, books, and reference PDFs for ${category.name}. Free download.`,
      url: `https://freepdfsdownload.com/category/${category.slug}`,
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const pdfs = getPdfsByCategory(slug);
  const breadcrumbItems = [{ label: category.name }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      
      <header className={styles.header}>
        <h1 className={styles.title}>{category.h1 || `${category.name} Notes`}</h1>
        <p className={styles.description}>
          {category.description || `Explore free high-quality PDF study materials, textbooks, and class notes for ${category.name} students.`}
        </p>
      </header>

      <section style={{ paddingBottom: "60px" }}>
        <CategoryPdfsGrid pdfs={pdfs} />
      </section>
    </div>
  );
}

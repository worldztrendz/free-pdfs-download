import categoriesData from "@/data/categories.json";
import pdfsData from "@/data/pdfs.json";
import { Category, PDF } from "@/types";

// Type assertions to ensure local JSON files match the declared types
const categories = categoriesData as Category[];
const pdfs = pdfsData as PDF[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPdfs(): PDF[] {
  return pdfs;
}

export function getPdfBySlug(slug: string): PDF | undefined {
  return pdfs.find((p) => p.slug === slug);
}

export function getPdfsByCategory(categorySlug: string): PDF[] {
  return pdfs.filter((p) => p.category === categorySlug);
}

export function getLatestPdfs(limit?: number): PDF[] {
  const sorted = [...pdfs].sort((a, b) => {
    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getFeaturedPdfs(limit?: number): PDF[] {
  const featured = pdfs.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getPopularPdfs(limit?: number): PDF[] {
  const popular = pdfs.filter((p) => p.isPopular);
  return limit ? popular.slice(0, limit) : popular;
}

export function getRelatedPdfs(currentPdf: PDF, limit: number = 4): PDF[] {
  // Find PDFs in the same category, excluding the current one
  const related = pdfs.filter((p) => p.category === currentPdf.category && p.id !== currentPdf.id);
  
  if (related.length >= limit) {
    return related.slice(0, limit);
  }
  
  // If not enough related PDFs in the same category, pad with other popular/latest PDFs
  const others = pdfs.filter((p) => p.category !== currentPdf.category && p.id !== currentPdf.id);
  return [...related, ...others].slice(0, limit);
}

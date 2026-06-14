import { MetadataRoute } from "next";
import { getCategories, getPdfs } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freepdfsdownload.com";

  // 1. Static Pages
  const staticPaths = ["", "/about", "/contact", "/privacy-policy", "/terms-conditions"];
  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // 2. Category Dynamic Pages
  const categories = getCategories();
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 3. PDF Detail Dynamic Pages
  const pdfs = getPdfs();
  const pdfUrls = pdfs.map((pdf) => ({
    url: `${baseUrl}/pdf/${pdf.slug}`,
    lastModified: new Date(pdf.dateAdded),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...categoryUrls, ...pdfUrls];
}

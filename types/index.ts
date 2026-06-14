export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface PDF {
  id: number;
  title: string;
  slug: string;
  category: string; // matches Category.slug
  description: string;
  pdfUrl: string;
  thumbnail: string;
  fileSize: string;      // e.g. "1.5 MB"
  pageCount: number;     // e.g. 48
  dateAdded: string;     // e.g. "2026-06-10"
  isFeatured: boolean;
  isPopular: boolean;
  downloadCount: number; // e.g. 1250
  author?: string;
}
